#!/usr/bin/env node

/**
 * Backlog of high-conversion community issues to release automatically each week.
 */
const { execSync } = require('child_process');

const ISSUE_BACKLOG = [
  {
    title: "[Skill Request] Add Tailwind CSS & Shadcn/UI speed-builder skill",
    labels: "good first issue,help wanted,skill",
    body: `### 💡 Overview\nCreate a custom Claude Code skill in \`tailwind-shadcn-skill/\` with a \`SKILL.md\` file.\n\n### Requirements\n- Provide system prompts guiding Claude on modern Tailwind CSS v4 patterns, Shadcn/UI component conventions, Lucide icons, and accessible styling.\n- Add an entry to \`README.md\`.\n\n### How to contribute\n1. Fork the repo and create branch \`feat/tailwind-skill\`.\n2. Add \`tailwind-shadcn-skill/SKILL.md\`.\n3. Open a PR! Maintainers review within 24 hours.`
  },
  {
    title: "[Skill Request] Add PostgreSQL & SQL Query Performance skill",
    labels: "good first issue,help wanted,skill",
    body: `### 💡 Overview\nCreate a custom Claude Code skill in \`postgres-optimizer-skill/\` with a \`SKILL.md\` file.\n\n### Requirements\n- System prompts for EXPLAIN ANALYZE interpretation, index selection (B-tree, GIN, BRIN), connection pooling, and CTE optimization.\n- Add an entry to \`README.md\`.\n\n### How to contribute\n1. Fork the repo and create branch \`feat/postgres-skill\`.\n2. Add \`postgres-optimizer-skill/SKILL.md\`.\n3. Open a PR! Maintainers review within 24 hours.`
  },
  {
    title: "[Docs] Translate README to German (README.de.md)",
    labels: "good first issue,help wanted,documentation",
    body: `### 💡 Overview\nTranslate \`README.md\` into German (\`README.de.md\`) to expand reach to European developers!\n\n### How to contribute\n1. Fork the repo and create branch \`docs/german-readme\`.\n2. Add \`README.de.md\`.\n3. Open a PR! Maintainers review within 24 hours.`
  },
  {
    title: "[Skill Request] Add PyTorch & CUDA memory debugging skill",
    labels: "good first issue,help wanted,skill",
    body: `### 💡 Overview\nCreate a custom Claude Code skill in \`pytorch-cuda-skill/\` with a \`SKILL.md\` file.\n\n### Requirements\n- Guidelines for diagnosing CUDA Out of Memory (OOM), gradient checkpointing, mixed-precision (AMP), and distributed training setups (DDP/FSDP).\n- Add an entry to \`README.md\`.\n\n### How to contribute\n1. Fork the repo and create branch \`feat/pytorch-skill\`.\n2. Add \`pytorch-cuda-skill/SKILL.md\`.\n3. Open a PR! Maintainers review within 24 hours.`
  },
  {
    title: "[Docs] Translate README to French (README.fr.md)",
    labels: "good first issue,help wanted,documentation",
    body: `### 💡 Overview\nTranslate \`README.md\` into French (\`README.fr.md\`) to expand international reach!\n\n### How to contribute\n1. Fork the repo and create branch \`docs/french-readme\`.\n2. Add \`README.fr.md\`.\n3. Open a PR! Maintainers review within 24 hours.`
  },
  {
    title: "[MCP] Add Neo4j Graph Database MCP Server integration guide",
    labels: "good first issue,help wanted,mcp",
    body: `### 💡 Overview\nAdd an integration guide and configuration template for connecting Claude Code with Neo4j Knowledge Graph MCP.\n\n### Requirements\n- Provide setup snippet in \`mcp-servers/\` showing config with Cypher query tools.\n- Document sample prompts for entity extraction and knowledge graph querying.\n\n### How to contribute\n1. Fork the repo and create branch \`feat/mcp-neo4j\`.\n2. Add guide/config.\n3. Open a PR! Maintainers review within 24 hours.`
  }
];

// Check open issues to avoid duplicates
let existingTitles = [];
try {
  const issuesJson = execSync('gh issue list -R navigotechsolutions-labs/claude-agent-skills-hub --limit 50 --json title', { encoding: 'utf8' });
  existingTitles = JSON.parse(issuesJson).map(i => i.title.toLowerCase());
} catch (e) {
  console.log('Could not fetch existing issues:', e.message);
}

// Find candidates from backlog that are not yet created
const candidates = ISSUE_BACKLOG.filter(item => !existingTitles.includes(item.title.toLowerCase()));

if (candidates.length === 0) {
  console.log('All backlog issues have already been created or are active!');
  process.exit(0);
}

// Take up to 2 items per run
const toCreate = candidates.slice(0, 2);
console.log(`Creating ${toCreate.length} fresh scheduled community issues...`);

toCreate.forEach(item => {
  try {
    const cmd = `gh issue create -R navigotechsolutions-labs/claude-agent-skills-hub --title "${item.title}" --label "${item.labels}" --body "${item.body.replace(/"/g, '\\"')}"`;
    const out = execSync(cmd, { encoding: 'utf8' });
    console.log(`✔ Created: ${item.title} -> ${out.trim()}`);
  } catch (err) {
    console.error(`Failed to create issue: ${err.message}`);
  }
});
