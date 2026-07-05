import os
import sys
import shutil
import re
import subprocess
import argparse
import requests
import yaml
import urllib3
from dotenv import load_dotenv

# Disable SSL warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Load environment variables from .env file
load_dotenv()

def parse_args():
    parser = argparse.ArgumentParser(description="Discover, clone, categorize, and catalog MCP servers.")
    parser.add_argument("--dry-run", action="store_true", help="Perform discovery and write README, but do not clone or commit/push.")
    parser.add_argument("--limit", type=int, default=None, help="Limit the number of repositories to clone/process.")
    return parser.parse_args()

def load_config():
    config_path = os.path.join(os.path.dirname(__file__), "config.yaml")
    if not os.path.exists(config_path):
        print(f"Error: Config file not found at {config_path}")
        sys.exit(1)
    with open(config_path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)

def get_github_headers():
    token = os.getenv("GITHUB_TOKEN")
    headers = {"Accept": "application/vnd.github.v3+json"}
    if token:
        headers["Authorization"] = f"token {token}"
        print("GitHub Token loaded from environment.")
    else:
        print("Warning: GITHUB_TOKEN not found in environment. API rate limits will be low.")
    return headers

def fetch_awesome_list_repos(headers):
    print("Fetching community servers from awesome-mcp-servers list...")
    url = "https://raw.githubusercontent.com/punkpeye/awesome-mcp-servers/main/README.md"
    try:
        response = requests.get(url, timeout=10, verify=False)
        if response.status_code != 200:
            print("Failed to fetch awesome list README.")
            return []
            
        content = response.text
        # Regex to find GitHub repo links
        pattern = r"https://github\.com/([a-zA-Z0-9\-_\.]+)/([a-zA-Z0-9\-_\.]+)"
        matches = re.findall(pattern, content)
        
        repos = []
        seen = set()
        for owner, repo in matches:
            repo = repo.rstrip(").,/;:")
            if repo.endswith(".git"):
                repo = repo[:-4]
                
            # Filter out common pages/links
            if repo.lower() in ['pulls', 'issues', 'actions', 'projects', 'wiki', 'releases', 'settings', 'discussions', 'mcp-server', 'servers', 'spec']:
                continue
                
            full_name = f"{owner}/{repo}".lower()
            if full_name not in seen:
                seen.add(full_name)
                repos.append({
                    'owner': owner,
                    'repo': repo,
                    'full_name': f"{owner}/{repo}"
                })
        print(f"Found {len(repos)} potential repositories in awesome list.")
        return repos
    except Exception as e:
        print(f"Error fetching awesome list: {e}")
        return []

def search_github_topics(headers):
    print("Searching GitHub for MCP servers...")
    repos = []
    queries = ["topic:mcp-server", "topic:model-context-protocol"]
    seen = set()
    
    for q in queries:
        url = f"https://api.github.com/search/repositories?q={q}&sort=stars&order=desc&per_page=100"
        try:
            response = requests.get(url, headers=headers, timeout=15, verify=False)
            if response.status_code == 200:
                items = response.json().get('items', [])
                for item in items:
                    full_name = item['full_name'].lower()
                    if full_name not in seen:
                        seen.add(full_name)
                        repos.append({
                            'name': item['name'],
                            'full_name': item['full_name'],
                            'description': item['description'],
                            'html_url': item['html_url'],
                            'clone_url': item['clone_url'],
                            'stars': item['stargazers_count'],
                            'topics': item.get('topics', []),
                            'owner_name': item['owner']['login']
                        })
            else:
                print(f"GitHub Search API returned status {response.status_code} for query {q}")
        except Exception as e:
            print(f"Error searching GitHub for {q}: {e}")
            
    print(f"Found {len(repos)} repositories via GitHub Search.")
    return repos

def fetch_official_servers(headers, config):
    print("Fetching official MCP servers directory structure...")
    url = "https://api.github.com/repos/modelcontextprotocol/servers/contents/src"
    try:
        response = requests.get(url, headers=headers, timeout=10, verify=False)
        if response.status_code != 200:
            print(f"Failed to fetch official servers from GitHub. Status: {response.status_code}")
            return []
            
        items = response.json()
        official_servers = []
        for item in items:
            if item['type'] == 'dir':
                name = item['name']
                # Create a virtual repository entry for each subfolder server
                full_name = f"modelcontextprotocol/server-{name}"
                official_servers.append({
                    'name': f"server-{name}",
                    'full_name': full_name,
                    'description': f"Official Model Context Protocol server providing {name} integration.",
                    'html_url': f"https://github.com/modelcontextprotocol/servers/tree/main/src/{name}",
                    'clone_url': "https://github.com/modelcontextprotocol/servers.git",
                    'stars': 2500,  # High stars representative of official repository
                    'topics': ['mcp-server', 'official', name],
                    'is_official_subfolder': True,
                    'subfolder_name': name,
                    'local_path': f"mcp-servers/official-servers/src/{name}"
                })
        print(f"Identified {len(official_servers)} official servers.")
        return official_servers
    except Exception as e:
        print(f"Error fetching official servers: {e}")
        return []

def get_repo_details(full_name, headers):
    url = f"https://api.github.com/repos/{full_name}"
    try:
        response = requests.get(url, headers=headers, timeout=10, verify=False)
        if response.status_code == 200:
            item = response.json()
            return {
                'name': item['name'],
                'full_name': item['full_name'],
                'description': item['description'],
                'html_url': item['html_url'],
                'clone_url': item['clone_url'],
                'stars': item['stargazers_count'],
                'topics': item.get('topics', []),
                'owner_name': item['owner']['login']
            }
    except Exception as e:
        print(f"Error fetching repo details for {full_name}: {e}")
    return None

def classify_repo(repo, config):
    full_name = repo['full_name']
    
    # Check manual overrides first
    if full_name in config.get('overrides', {}):
        return config['overrides'][full_name]
        
    # Build text block to search keywords
    text_to_search = (
        repo['name'] + " " +
        (repo['description'] or "") + " " +
        " ".join(repo.get('topics', []))
    ).lower()
    
    scores = {}
    for cat_key, cat_data in config['categories'].items():
        score = 0
        for kw in cat_data['keywords']:
            # Search word boundaries or simple substring
            if kw.lower() in text_to_search:
                score += 1
        if score > 0:
            scores[cat_key] = score
            
    if scores:
        # Return category with highest matching keywords score
        return max(scores, key=scores.get)
        
    return 'utilities'  # fallback category

def clone_and_clean_repo(clone_url, target_dir):
    try:
        if os.path.exists(target_dir):
            print(f"Directory {target_dir} already exists. Skipping clone.")
            return True
            
        print(f"Cloning {clone_url} into {target_dir}...")
        # Clone with depth 1
        res = subprocess.run(["git", "clone", "--depth", "1", clone_url, target_dir], capture_output=True, text=True)
        if res.returncode != 0:
            print(f"Failed to clone {clone_url}: {res.stderr}")
            return False
            
        # Remove nested git metadata to prevent submodule or nested repo issues
        git_dir = os.path.join(target_dir, ".git")
        if os.path.exists(git_dir):
            if os.name == 'nt':
                # Windows command to delete directory silently
                subprocess.run(["rmdir", "/s", "/q", git_dir], shell=True, check=True)
            else:
                shutil.rmtree(git_dir)
        print(f"Cloned and removed git history for {target_dir}")
        return True
    except Exception as e:
        print(f"Exception during cloning of {clone_url}: {e}")
        return False

def update_readme(repo_dir, categorized_servers, config):
    readme_path = os.path.join(repo_dir, "README.md")
    if not os.path.exists(readme_path):
        print(f"Error: README.md not found at {readme_path}")
        return
        
    with open(readme_path, "r", encoding="utf-8") as f:
        readme_content = f.read()
        
    start_tag = "<!-- mcp-catalog-start -->"
    end_tag = "<!-- mcp-catalog-end -->"
    
    catalog_lines = []
    catalog_lines.append("\n## 🔌 Model Context Protocol (MCP) Servers Catalog\n")
    catalog_lines.append("A dynamically updated list of Model Context Protocol (MCP) servers, automatically discovered, categorized, and cloned into this repository.\n\n")
    
    # Categories TOC
    catalog_lines.append("### 📂 Categories\n")
    for cat_key, cat_data in config['categories'].items():
        label = cat_data['label']
        count = len(categorized_servers.get(cat_key, []))
        if count > 0:
            catalog_lines.append(f"* [{label} ({count})](#-{cat_key})\n")
    catalog_lines.append("\n---\n")
    
    # Output each category table
    for cat_key, cat_data in config['categories'].items():
        servers = categorized_servers.get(cat_key, [])
        if not servers:
            continue
            
        label = cat_data['label']
        catalog_lines.append(f"\n### {label} <a name=\"-{cat_key}\"></a>\n\n")
        catalog_lines.append("| Server | Stars | Description | Location in Repo |\n")
        catalog_lines.append("| :--- | :---: | :--- | :--- |\n")
        
        # Sort servers by stars descending
        servers.sort(key=lambda x: x.get('stars', 0), reverse=True)
        
        for s in servers:
            name = s['name']
            stars = s['stars']
            desc = s['description'] or "No description provided."
            desc = desc.replace("\r", "").replace("\n", " ").replace("|", "\\|")
            html_url = s['html_url']
            
            # Format target path url (forward slashes for markdown)
            local_path = s.get('local_path', f"mcp-servers/{cat_key}/{name}")
            local_path_url = local_path.replace("\\", "/")
            
            catalog_lines.append(f"| [{name}]({html_url}) | ⭐ {stars:,} | {desc} | [`/{local_path_url}`]({local_path_url}) |\n")
            
    catalog_content = "".join(catalog_lines)
    
    # Regex replacement or section insertion
    if start_tag in readme_content and end_tag in readme_content:
        pattern = f"{start_tag}.*?{end_tag}"
        new_readme = re.sub(pattern, f"{start_tag}\n{catalog_content}\n{end_tag}", readme_content, flags=re.DOTALL)
    else:
        target_section = "## ⚙️ How Claude Code Uses Skills"
        if target_section in readme_content:
            new_readme = readme_content.replace(target_section, f"{start_tag}\n{catalog_content}\n{end_tag}\n\n{target_section}")
        else:
            new_readme = f"{readme_content}\n\n{start_tag}\n{catalog_content}\n{end_tag}"
            
    with open(readme_path, "w", encoding="utf-8") as f:
        f.write(new_readme)
    print("README.md updated successfully.")

def get_current_branch(repo_dir):
    res = subprocess.run(["git", "branch", "--show-current"], cwd=repo_dir, capture_output=True, text=True)
    return res.stdout.strip() or "master"

def git_commit_and_push(token, repo_dir):
    try:
        print("Checking git status...")
        # Check if there are changes
        status = subprocess.run(["git", "status", "--porcelain"], cwd=repo_dir, capture_output=True, text=True, check=True)
        if not status.stdout.strip():
            print("No new changes detected. Nothing to commit.")
            return
            
        print("Staging all changes...")
        subprocess.run(["git", "add", "."], cwd=repo_dir, check=True)
        
        print("Committing changes...")
        subprocess.run(["git", "commit", "-m", "chore: auto-sync and categorize MCP servers"], cwd=repo_dir, check=True)
        
        # Get current origin URL
        origin_url_proc = subprocess.run(["git", "remote", "get-url", "origin"], cwd=repo_dir, capture_output=True, text=True, check=True)
        origin_url = origin_url_proc.stdout.strip()
        
        # Embed token if needed
        if "github.com" in origin_url and not f"{token}@" in origin_url:
            new_url = origin_url.replace("https://github.com/", f"https://{token}@github.com/")
            subprocess.run(["git", "remote", "set-url", "origin", new_url], cwd=repo_dir, check=True)
            
        current_branch = get_current_branch(repo_dir)
        print(f"Pushing updates to origin branch: {current_branch}...")
        subprocess.run(["git", "push", "origin", current_branch], cwd=repo_dir, check=True)
        print("Git push completed successfully.")
    except Exception as e:
        print(f"Error executing Git operations: {e}")

def main():
    args = parse_args()
    config = load_config()
    headers = get_github_headers()
    
    # Determine directories relative to script location
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_dir = os.path.dirname(script_dir)  # Parent dir is target repository root
    
    # Configure git to allow long paths on Windows
    subprocess.run(["git", "config", "--global", "core.longpaths", "true"], check=False)
    subprocess.run(["git", "config", "core.longpaths", "true"], cwd=repo_dir, check=False)
    
    servers_dir = os.path.join(repo_dir, "mcp-servers")
    
    # 1. Fetch Official Servers
    official_servers = fetch_official_servers(headers, config)
    
    # 2. Search GitHub topics for mcp servers
    search_repos = search_github_topics(headers)
    
    # 3. Fetch from Awesome list
    awesome_repos = fetch_awesome_list_repos(headers)
    
    # 4. Consolidate list of repositories
    # Start with official servers (always processed)
    consolidated_repos = {r['full_name'].lower(): r for r in search_repos}
    
    # Exclude list
    exclude_list = {r.lower() for r in config.get('exclude_repos', [])}
    
    # Process awesome list repos (fetch metadata only if not already found in search to save API rate limit)
    awesome_added = 0
    max_awesome_to_fetch = 20  # Limit API calls for awesome list details
    for r in awesome_repos:
        full_name = r['full_name'].lower()
        if full_name in exclude_list:
            continue
            
        if full_name not in consolidated_repos:
            if awesome_added >= max_awesome_to_fetch:
                continue
            print(f"Fetching details for community server: {r['full_name']}...")
            details = get_repo_details(r['full_name'], headers)
            if details:
                consolidated_repos[full_name] = details
                awesome_added += 1
                
    # Filter consolidated list
    final_repos = []
    for full_name, repo in consolidated_repos.items():
        if full_name in exclude_list:
            continue
        # Check if it has the required keyword/topic configuration
        final_repos.append(repo)
        
    # Sort final repos by stars descending
    final_repos.sort(key=lambda x: x.get('stars', 0), reverse=True)
    
    # Limit number of repositories to clone
    limit = args.limit if args.limit is not None else config.get('max_repos', 50)
    final_repos = final_repos[:limit]
    
    print(f"Total community servers selected for sync: {len(final_repos)}")
    
    # Categorize everything
    categorized_servers = {cat: [] for cat in config['categories'].keys()}
    
    # First, handle official servers if they exist
    official_cloned = False
    if official_servers:
        official_repo_url = "https://github.com/modelcontextprotocol/servers.git"
        official_dest_dir = os.path.join(servers_dir, "official-servers")
        
        # Clone official monorepo once
        if not args.dry_run:
            os.makedirs(servers_dir, exist_ok=True)
            if clone_and_clean_repo(official_repo_url, official_dest_dir):
                official_cloned = True
        else:
            print(f"[Dry-Run] Would clone official monorepo to {official_dest_dir}")
            official_cloned = True
            
        if official_cloned:
            for s in official_servers:
                cat = classify_repo(s, config)
                if cat in categorized_servers:
                    categorized_servers[cat].append(s)
                else:
                    categorized_servers['utilities'].append(s)
                    
    # Next, clone and categorize community servers
    for repo in final_repos:
        cat = classify_repo(repo, config)
        repo_name = repo['name']
        dest_dir = os.path.join(servers_dir, cat, repo_name)
        
        # Register local path for README
        repo['local_path'] = f"mcp-servers/{cat}/{repo_name}"
        
        if not args.dry_run:
            os.makedirs(os.path.join(servers_dir, cat), exist_ok=True)
            clone_and_clean_repo(repo['clone_url'], dest_dir)
        else:
            print(f"[Dry-Run] Would clone {repo['clone_url']} to {dest_dir}")
            
        if cat in categorized_servers:
            categorized_servers[cat].append(repo)
        else:
            categorized_servers['utilities'].append(repo)
            
    # Update README
    update_readme(repo_dir, categorized_servers, config)
    
    # Commit and Push if token is available and not in dry-run
    token = os.getenv("GITHUB_TOKEN")
    if not args.dry_run and token:
        git_commit_and_push(token, repo_dir)
    elif args.dry_run:
        print("[Dry-Run] Script finished. No modifications committed.")
    else:
        print("Sync complete. GITHUB_TOKEN not found or git push not initiated.")

if __name__ == "__main__":
    main()
