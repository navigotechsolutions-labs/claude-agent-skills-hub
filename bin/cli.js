#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const SKILLS = [
  // BUILD
  { name: 'superpowers', group: 'BUILD', desc: 'Plans and debugs thoroughly before it writes code', dir: 'superpowers' },
  { name: 'gstack', group: 'BUILD', desc: 'Garry Tan AI engineering team with 23+ specialized agent roles', dir: 'gstack' },
  { name: 'caveman', group: 'BUILD', desc: 'No-fluff, direct answers with zero boilerplate or padding', dir: 'caveman' },
  { name: 'ponytail', group: 'BUILD', desc: 'Replicates senior developer thinking patterns, simplifying code', dir: 'ponytail' },
  { name: 'codex', group: 'BUILD', desc: 'Runs Codex commands and synthesis inside Claude Code', dir: 'codex' },
  { name: 'i-have-adhd', group: 'BUILD', desc: 'Stops Claude from burying key answers under paragraphs', dir: 'i-have-adhd' },

  // DESIGN & FRONTEND AESTHETICS
  { name: 'superdesign-skill', group: 'DESIGN', desc: 'System rules and prompt heuristics for modern UI/UX superdesigns', dir: 'superdesign-skill' },
  { name: 'better-design', group: 'DESIGN', desc: 'Curated design guidelines, component best practices & anti-patterns', dir: 'better-design' },
  { name: 'design-taste', group: 'DESIGN', desc: 'Aesthetic rules, font pairing, color harmony and layout elevation', dir: 'design-taste' },
  { name: 'canvas-ui', group: 'DESIGN', desc: 'Component primitives and canvas-based interactive UI elements', dir: 'canvas-ui' },
  { name: 'paper-shaders', group: 'DESIGN', desc: 'Paper design WebGL / GLSL shaders for tactile web surfaces', dir: 'paper-shaders' },
  { name: 'ui-layouts', group: 'DESIGN', desc: 'Collection of modern responsive UI layouts and grid structures', dir: 'ui-layouts' },
  { name: 'hyperiux-components', group: 'DESIGN', desc: 'Immersive spatial UI components, glassmorphism and 3D interactions', dir: 'hyperiux-components' },
  { name: 'motion-primitives', group: 'DESIGN', desc: 'Advanced UI animation and motion primitives built on Framer Motion', dir: 'motion-primitives' },
  { name: 'cursify', group: 'DESIGN', desc: 'Interactive custom cursor animations and hover effect harnesses', dir: 'cursify' },
  { name: 'trickle-ui-kit', group: 'DESIGN', desc: 'Lightweight, modern UI kit components and design specifications', dir: 'trickle-ui-kit' },
  { name: 'ui-ux-pro-max', group: 'DESIGN', desc: 'Palettes, typography scales, spacing heuristics & UI design rules', dir: 'ui-ux-pro-max' },
  { name: 'taste-skill', group: 'DESIGN', desc: 'Injects aesthetic design principles & layout decisions', dir: 'taste-skill' },
  { name: 'impeccable', group: 'DESIGN', desc: 'Structured design language specifications & harnesses', dir: 'impeccable' },
  { name: 'hyperframes', group: 'DESIGN', desc: 'Turns web pages and UI components into video animations', dir: 'hyperframes' },
  { name: 'emil', group: 'DESIGN', desc: 'Signature UI motion principles and interface transitions', dir: 'emil' },
  { name: 'gsap', group: 'DESIGN', desc: 'Specialized guidelines for smooth GreenSock web animations', dir: 'gsap' },
  { name: 'brandkit', group: 'DESIGN', desc: 'Dynamically generates custom branding presets & visual assets', dir: 'brandkit' },
  { name: 'stitch-skill', group: 'DESIGN', desc: 'Google Stitch design guidelines & component patterns', dir: 'stitch-skill' },
  { name: 'brutalist-skill', group: 'DESIGN', desc: 'Guides AI in building bold, brutalist visual layouts', dir: 'brutalist-skill' },
  { name: 'minimalist-skill', group: 'DESIGN', desc: 'Clean, minimal layouts with high contrast typography', dir: 'minimalist-skill' },

  // RESEARCH
  { name: 'skill-creator', group: 'RESEARCH', desc: 'Official Anthropic skill for crafting and testing custom skills', dir: 'skill-creator' },
  { name: 'graphify', group: 'RESEARCH', desc: 'Converts documentation and notes into visual knowledge maps', dir: 'graphify' },
  { name: 'last30days', group: 'RESEARCH', desc: 'Scopes Reddit, X, YouTube, HN for recent tech shifts', dir: 'last30days' },
  { name: 'agent-browser', group: 'RESEARCH', desc: 'Lets Claude navigate and interact with any website headlessly', dir: 'agent-browser' },
  { name: 'find-skills', group: 'RESEARCH', desc: 'Finds and auto-discovers skills for any development task', dir: 'find-skills' },
  { name: 'claude-hud', group: 'RESEARCH', desc: 'Heads-up display showing Claude tasks and status in real time', dir: 'claude-hud' },
  { name: 'notebooklm-py', group: 'RESEARCH', desc: 'Python integrations for managing research notebooks', dir: 'notebooklm-py' },
  { name: 'obsidian-skills', group: 'RESEARCH', desc: 'Obsidian note linking, markdown styling & CLI automation', dir: 'obsidian-cli' },
  { name: 'json-canvas', group: 'RESEARCH', desc: 'Encodes skills to read/output Obsidian JSON Canvas format', dir: 'json-canvas' },

  // MARKETING
  { name: 'remotion', group: 'MARKETING', desc: 'Build full programmatic motion videos in React', dir: 'remotion' },
  { name: 'marketingskills', group: 'MARKETING', desc: '40+ specialized marketing and copywriting skills in one pack', dir: 'marketingskills' },
  { name: 'humanizer', group: 'MARKETING', desc: 'Strips AI tells, cliches, and robotic padding from text', dir: 'humanizer' },
  { name: 'social-media-skills', group: 'MARKETING', desc: 'High-engagement organic social media content pack', dir: 'social-media-skills' },

  // SPECIALTY
  { name: 'webgpu-threejs-tsl', group: 'SPECIALTY', desc: 'Specialized knowledge base for WebGPU, Three.js & TSL shaders', dir: 'webgpu-threejs-tsl' },
  { name: 'llm-council', group: 'SPECIALTY', desc: 'Five AI advisors debate, peer-review & provide verdicts', dir: 'llm-council' },
  { name: 'defuddle', group: 'SPECIALTY', desc: 'Simplifies bloated code blocks and clarifies complex logic', dir: 'defuddle' },
  { name: 'npxskillui', group: 'SPECIALTY', desc: 'Interactive and functional local user interfaces via NPX', dir: 'npxskillui' }
];

function printBanner() {
  console.log('\x1b[35m' + `
   ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗
  ██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝
  ██║     ██║     ███████║██║   ██║██║  ██║█████╗  
  ██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝  
  ╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗
   ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
   Claude Agent Skills Hub (v1.2.0)
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
  console.log('\x1b[1mAvailable Skills in Hub (Grouped by Category):\x1b[0m\n');

  const groups = ['BUILD', 'DESIGN', 'RESEARCH', 'MARKETING', 'SPECIALTY'];
  const groupIcons = {
    'BUILD': '🏗️  BUILD',
    'DESIGN': '🎨  DESIGN',
    'RESEARCH': '🔬  RESEARCH & KNOWLEDGE',
    'MARKETING': '📢  MARKETING & CONTENT',
    'SPECIALTY': '⚡  SPECIALTY & INTELLIGENCE'
  };

  let count = 1;
  groups.forEach(g => {
    const matching = SKILLS.filter(s => s.group === g);
    if (matching.length > 0) {
      console.log(`\x1b[33m--- ${groupIcons[g] || g} ---\x1b[0m`);
      matching.forEach(s => {
        console.log(`  \x1b[32m${count.toString().padStart(2, ' ')}. ${s.name.padEnd(22)}\x1b[0m : ${s.desc}`);
        count++;
      });
      console.log('');
    }
  });

  console.log(`\x1b[90mTip: Run 'npx claude-agent-skills-hub info <name>' or 'install <name>'.\x1b[0m\n`);
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
