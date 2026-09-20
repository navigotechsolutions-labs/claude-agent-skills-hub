#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const SKILLS = [
  { name: 'taste-skill', desc: 'Injects aesthetic design principles & layout decisions', dir: 'taste-skill' },
  { name: 'impeccable', desc: 'Structured design language specifications & harnesses', dir: 'impeccable' },
  { name: 'ponytail', desc: 'Replicates senior developer thinking patterns to simplify code', dir: 'ponytail' },
  { name: 'notebooklm-py', desc: 'Python integrations for managing research notebooks', dir: 'notebooklm-py' },
  { name: 'npxskillui', desc: 'Interactive and functional local user interfaces via NPX', dir: 'npxskillui' },
  { name: 'webgpu-threejs-tsl', desc: 'Specialized knowledge base for WebGPU, Three.js & TSL shaders', dir: 'webgpu-threejs-tsl' },
  { name: 'ui-ux-pro-max-skill', desc: 'Advanced UI/UX heuristics and design system rules', dir: 'ui-ux-pro-max-skill' },
  { name: 'last30days', desc: 'Scopes Reddit, X, YouTube, HN for recent tech shifts', dir: 'last30days' },
  { name: 'obsidian-skills', desc: 'Obsidian note linking, markdown styling & CLI automation', dir: 'obsidian-cli' },
  { name: 'brandkit', desc: 'Dynamically generates custom branding presets & visual assets', dir: 'brandkit' },
  { name: 'stitch-skill', desc: 'Google Stitch design guidelines & component patterns', dir: 'stitch-skill' },
  { name: 'brutalist-skill', desc: 'Guides AI in building bold, brutalist visual layouts', dir: 'brutalist-skill' },
  { name: 'minimalist-skill', desc: 'Clean, minimal layouts with high contrast typography', dir: 'minimalist-skill' },
  { name: 'json-canvas', desc: 'Encodes skills to read/output Obsidian JSON Canvas format', dir: 'json-canvas' },
  { name: 'defuddle', desc: 'Simplifies bloated code blocks and clarifies complex logic', dir: 'defuddle' },
  { name: 'llm-council', desc: 'Five AI advisors debate, peer-review & provide verdicts', dir: 'llm-council' },
  { name: 'gstack', desc: 'AI engineering team containing 23+ specialized agent roles', dir: 'gstack' }
];

function printBanner() {
  console.log('\x1b[35m' + `
   ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗
  ██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝
  ██║     ██║     ███████║██║   ██║██║  ██║█████╗  
  ██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝  
  ╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗
   ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
   Claude Agent Skills Hub (v1.1.0)
  ` + '\x1b[0m');
  console.log('\x1b[36mOpen-source skills, prompt harnesses & MCP catalog for Claude Code\x1b[0m\n');
}

function printHelp() {
  printBanner();
  console.log(`Usage:
  npx claude-agent-skills-hub <command> [options]

Commands:
  list                 List all available custom skills
  info <skill-name>    View details and instructions for a skill
  install <skill-name> Install a skill to your project or .claude/skills/
  mcp                  Browse MCP servers in the catalog
  help                 Display this help information

Examples:
  npx claude-agent-skills-hub list
  npx claude-agent-skills-hub info taste-skill
  npx claude-agent-skills-hub install taste-skill
  npx claude-agent-skills-hub mcp
`);
}

function listSkills() {
  printBanner();
  console.log('\x1b[1mAvailable Skills in Hub:\x1b[0m\n');
  SKILLS.forEach((s, idx) => {
    console.log(`  \x1b[32m${(idx + 1).toString().padStart(2, ' ')}. ${s.name.padEnd(24)}\x1b[0m : ${s.desc}`);
  });
  console.log(`\n\x1b[90mTip: Run 'npx claude-agent-skills-hub info <name>' for full details.\x1b[0m\n`);
}

function showSkillInfo(name) {
  const skill = SKILLS.find(s => s.name.toLowerCase() === name.toLowerCase());
  if (!skill) {
    console.error(`\x1b[31mError: Skill '${name}' not found.\x1b[0m`);
    console.log(`Run 'npx claude-agent-skills-hub list' to see all skills.`);
    process.exit(1);
  }

  const skillPath = path.join(rootDir, skill.dir);
  console.log(`\n\x1b[1mSkill: \x1b[32m${skill.name}\x1b[0m`);
  console.log(`\x1b[36mDescription:\x1b[0m ${skill.desc}`);
  console.log(`\x1b[36mDirectory:\x1b[0m ${skillPath}\n`);

  // Check for SKILL.md or README.md
  let content = null;
  const candidates = ['SKILL.md', 'skill.md', 'README.md', 'prompt.md', 'system_prompt.md'];
  for (const c of candidates) {
    const candidatePath = path.join(skillPath, c);
    if (fs.existsSync(candidatePath)) {
      content = fs.readFileSync(candidatePath, 'utf8');
      console.log(`\x1b[90m--- Showing ${c} preview ---\x1b[0m\n`);
      const lines = content.split('\n').slice(0, 35).join('\n');
      console.log(lines);
      if (content.split('\n').length > 35) {
        console.log(`\n\x1b[90m... (${content.split('\n').length - 35} more lines)\x1b[0m`);
      }
      break;
    }
  }

  if (!content) {
    console.log(`(No preview file found in ${skill.dir})`);
  }
}

function installSkill(name, targetDir) {
  const skill = SKILLS.find(s => s.name.toLowerCase() === name.toLowerCase());
  if (!skill) {
    console.error(`\x1b[31mError: Skill '${name}' not found.\x1b[0m`);
    process.exit(1);
  }

  const srcPath = path.join(rootDir, skill.dir);
  const destPath = targetDir || path.resolve(process.cwd(), skill.name);

  if (!fs.existsSync(srcPath)) {
    console.error(`\x1b[31mSource folder ${srcPath} not found.\x1b[0m`);
    process.exit(1);
  }

  copyFolderSync(srcPath, destPath);
  console.log(`\x1b[32m✔ Successfully installed '${skill.name}' into: ${destPath}\x1b[0m`);
  console.log(`You can now reference these instructions directly in your Claude Code / Agent prompts!`);
}

function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach(element => {
    if (element === '.git') return;
    const stat = fs.lstatSync(path.join(from, element));
    if (stat.isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else if (stat.isDirectory()) {
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
}

function browseMcp() {
  const dataPath = path.join(rootDir, 'mcp_data.json');
  if (!fs.existsSync(dataPath)) {
    console.error('mcp_data.json not found.');
    return;
  }
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  printBanner();
  console.log('\x1b[1mModel Context Protocol (MCP) Catalog Summary:\x1b[0m\n');
  Object.entries(data.categories || {}).forEach(([catKey, cat]) => {
    console.log(`\x1b[33m${cat.label}\x1b[0m (${cat.servers.length} servers):`);
    cat.servers.slice(0, 5).forEach(s => {
      console.log(`  • \x1b[32m${s.name}\x1b[0m (⭐ ${s.stars.toLocaleString()}) - ${s.description ? s.description.slice(0, 70) + '...' : ''}`);
    });
    if (cat.servers.length > 5) {
      console.log(`    \x1b[90m+ ${cat.servers.length - 5} more in repository\x1b[0m`);
    }
    console.log('');
  });
}

// CLI Dispatcher
const args = process.argv.slice(2);
const command = args[0] || 'list';

switch (command) {
  case 'list':
  case 'ls':
    listSkills();
    break;
  case 'info':
    if (!args[1]) {
      console.error('Please specify a skill name. Example: npx claude-agent-skills-hub info taste-skill');
      process.exit(1);
    }
    showSkillInfo(args[1]);
    break;
  case 'install':
  case 'add':
    if (!args[1]) {
      console.error('Please specify a skill name. Example: npx claude-agent-skills-hub install taste-skill');
      process.exit(1);
    }
    installSkill(args[1], args[2]);
    break;
  case 'mcp':
    browseMcp();
    break;
  case 'help':
  case '--help':
  case '-h':
    printHelp();
    break;
  default:
    console.log(`Unknown command: ${command}`);
    printHelp();
    break;
}
