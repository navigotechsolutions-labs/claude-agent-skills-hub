# Contributing to Claude Agent Skills Hub

First off, thank you for considering contributing! 🎉

We are building the largest, most developer-friendly open-source collection of custom skills, prompt harnesses, and MCP servers for **Claude Code** and AI coding agents.

Whether you're submitting a brand-new skill, improving documentation, fixing a typo, or adding translations, **all contributions are warmly welcomed!**

---

## ⚡ Fast-Track: 3 Ways to Contribute in Under 10 Minutes

### 1. Submit a New Custom Skill (Easiest)
Have a custom prompt profile or skill you use with Claude Code? Share it!
1. Create a folder under the repo root: `/<your-skill-name>/`
2. Add a `SKILL.md` or `prompt.md` describing its role, instructions, and prompt harness.
3. Add a 1-line entry in the `README.md` table.
4. Submit a Pull Request!

### 2. Add or Suggest an MCP Server
Found an awesome Model Context Protocol (MCP) server?
- Open an issue using the [Submit MCP Server](https://github.com/navigotechsolutions-labs/claude-agent-skills-hub/issues/new?template=02_submit_mcp.yml) template, or
- Add it directly to `mcp_data.json` and submit a PR.

### 3. Claim a "Good First Issue"
Browse our open [Good First Issues](https://github.com/navigotechsolutions-labs/claude-agent-skills-hub/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) and comment `I would like to work on this!`. We will assign it to you right away.

---

## 🏆 Contributor Recognition

Every merged pull request gets:
1. **Listed in the Contributors Hall of Fame** in the README via [All-Contributors](https://allcontributors.org).
2. **Fast-track review**: Maintainers review and merge clean community PRs within **24 hours**.
3. **Portfolio proof**: Showcase your open-source contributions to future employers and AI grant evaluators.

---

## 🛠️ Step-by-Step Contribution Workflow

### Step 1: Fork & Clone
```bash
git clone https://github.com/<your-username>/claude-agent-skills-hub.git
cd claude-agent-skills-hub
git checkout -b feat/my-new-skill
```

### Step 2: Skill Directory Format
Each skill should have its own directory:
```text
my-cool-skill/
├── SKILL.md          # Main prompt instructions and workflow
└── README.md         # (Optional) Overview, screenshots, or test examples
```

#### Example `SKILL.md`:
```markdown
# My Cool Skill

## Role & Purpose
Describe what this skill helps Claude do.

## Activation Rules
When should Claude trigger this skill?

## System Instructions & Guidelines
Provide clear, actionable guidelines for the agent.
```

### Step 3: Test with CLI (Optional)
If you have Node.js installed, test the local catalog:
```bash
node bin/cli.js list
```

### Step 4: Commit and Push
```bash
git add .
git commit -m "feat(skills): add my-cool-skill"
git push origin feat/my-new-skill
```

### Step 5: Open a Pull Request
- Go to [navigotechsolutions-labs/claude-agent-skills-hub](https://github.com/navigotechsolutions-labs/claude-agent-skills-hub)
- Click **Compare & pull request**
- Fill out the short checklist in the PR template!

---

## 📋 Code of Conduct
Please review and adhere to our [Code of Conduct](CODE_OF_CONDUCT.md) in all discussions and pull requests.

Happy hacking! 🚀
