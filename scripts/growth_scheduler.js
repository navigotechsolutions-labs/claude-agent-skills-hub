#!/usr/bin/env node

/**
 * 30-Day Growth Schedule & Status Tracker
 * Automates tracking towards the 20 Unique External Contributors goal.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const START_DATE = new Date('2026-09-21T00:00:00Z');
const GOAL_CONTRIBUTORS = 20;

function getTodayDayNumber() {
  const now = new Date();
  const diffTime = Math.abs(now - START_DATE);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.min(Math.max(diffDays, 1), 30);
}

const SCHEDULE = {
  1: { phase: 'Launch & Foundation', focus: 'NPM Publish & Reddit/HN Announcement', post: 'Launch Announcement on r/ClaudeAI & Hacker News' },
  2: { phase: 'Launch & Foundation', focus: 'Seed Issue Discovery', post: 'Share Good First Issues on Twitter/X & Anthropic Discord' },
  3: { phase: 'Launch & Foundation', focus: 'First PR Reviews (<24h)', post: 'Celebrate first community PR merged on X / LinkedIn' },
  4: { phase: 'Community Magnet', focus: 'Aggregator Indexing', post: 'Submit repo to goodfirstissue.dev, up-for-grabs.net' },
  5: { phase: 'Community Magnet', focus: 'MCP Spotlight', post: 'Post MCP server catalog highlight in MCP Discord channel' },
  6: { phase: 'Community Magnet', focus: 'Weekly Review 1', post: 'Target: 5 Unique Contributors merged' },
  7: { phase: 'Community Magnet', focus: 'Contributor Shoutouts', post: 'Tweet weekly Contributors Hall of Fame update' },

  8: { phase: 'Scaling Outreach', focus: 'Automated Week 2 Bounty Drops', post: 'GitHub Actions releases 3 new Good First Issues' },
  9: { phase: 'Scaling Outreach', focus: 'Dev.to & Hashnode Article', post: 'Publish "10 Essential Custom Skills for Claude Code" tutorial' },
  10: { phase: 'Scaling Outreach', focus: 'Translation Drive', post: 'Outreach to bilingual devs for Spanish/Chinese READMEs' },
  11: { phase: 'Scaling Outreach', focus: 'PR Merging Blitz', post: 'Fast-track review all pending submissions' },
  12: { phase: 'Scaling Outreach', focus: 'Subreddit Follow-up', post: 'Post deep-dive on UI/UX heuristics skill on r/webdev' },
  13: { phase: 'Scaling Outreach', focus: 'Weekly Review 2', post: 'Target: 10 Unique Contributors merged' },
  14: { phase: 'Scaling Outreach', focus: 'Milestone Celebration', post: 'Share 10-contributor milestone badge on GitHub & X' },

  15: { phase: 'Acceleration', focus: 'Automated Week 3 Bounty Drops', post: 'GitHub Actions drops Framework & Cloud skill bounties' },
  16: { phase: 'Acceleration', focus: 'LocalLLaMA & Open Source AI push', post: 'Share agent-skill architecture with LLM community' },
  17: { phase: 'Acceleration', focus: 'PR Triage & All-Contributors Sync', post: 'Auto-verify all avatars in Hall of Fame table' },
  18: { phase: 'Acceleration', focus: 'Cursor & Windsurf Cross-Pollination', post: 'Share MCP integration guide in editor communities' },
  19: { phase: 'Acceleration', focus: 'Outreach to Skill Authors', post: 'Invite authors of popular prompts to submit their skills' },
  20: { phase: 'Acceleration', focus: 'Weekly Review 3', post: 'Target: 16 Unique Contributors merged' },
  21: { phase: 'Acceleration', focus: 'Sprint to 20', post: 'Direct call for the final 4 contributors to hit 20!' },

  22: { phase: 'Final Sprint & Qualification', focus: 'Automated Week 4 Bounty Drops', post: 'Release final translation & polish issues' },
  23: { phase: 'Final Sprint & Qualification', focus: 'PR Merging & Verification', post: 'Merge 20th unique external contributor PR! 🎯' },
  24: { phase: 'Final Sprint & Qualification', focus: 'Unique Contributor Audit', post: 'Run audit script to verify 20 distinct GitHub user IDs' },
  25: { phase: 'Final Sprint & Qualification', focus: 'OpenSSF Scorecard Audit', post: 'Ensure OpenSSF scorecard action runs clean & green' },
  26: { phase: 'Final Sprint & Qualification', focus: 'Application Dossier Prep', post: 'Compile repo stats, PR links, and download numbers' },
  27: { phase: 'Final Sprint & Qualification', focus: 'Anthropic OSS Grant Submit', post: 'Submit official application to Anthropic OSS program' },
  28: { phase: 'Sustained Growth', focus: 'Continuous Automation', post: 'Maintain weekly cron syncs for ongoing community PRs' },
  29: { phase: 'Sustained Growth', focus: 'Version 1.2.0 Tag & Release', post: 'Publish v1.2.0 release note citing all 20+ contributors' },
  30: { phase: 'Sustained Growth', focus: 'Program Acceptance & Scaling', post: 'Receive Claude OSS access and scale the ecosystem!' }
};

function fetchGitHubStats() {
  try {
    const prData = execSync('gh pr list -R navigotechsolutions-labs/claude-agent-skills-hub --state merged --json author --limit 100', { encoding: 'utf8' });
    const prs = JSON.parse(prData);
    const authors = new Set();
    prs.forEach(p => {
      if (p.author && p.author.login && p.author.login !== 'navigotechsolutions-labs' && !p.author.login.includes('[bot]')) {
        authors.add(p.author.login);
      }
    });
    return {
      uniqueContributors: authors.size,
      contributorList: Array.from(authors)
    };
  } catch (err) {
    return { uniqueContributors: 0, contributorList: [] };
  }
}

const dayNum = getTodayDayNumber();
const scheduleToday = SCHEDULE[dayNum] || SCHEDULE[1];
const stats = fetchGitHubStats();

console.log('\x1b[35m' + `
=====================================================
  📅 30-DAY OSS GROWTH AUTOMATION ENGINE
  Target: 20 Unique External Contributors for Anthropic OSS Grant
=====================================================
` + '\x1b[0m');

console.log(`\x1b[1mCurrent Timeline:\x1b[0m Day \x1b[33m${dayNum}\x1b[0m / 30`);
console.log(`\x1b[1mCurrent Phase:\x1b[0m    \x1b[36m${scheduleToday.phase}\x1b[0m`);
console.log(`\x1b[1mToday's Focus:\x1b[0m    ${scheduleToday.focus}`);
console.log(`\x1b[1mAction Item:\x1b[0m      ${scheduleToday.post}\n`);

console.log(`\x1b[1mProgress Meter:\x1b[0m`);
const percent = Math.min(Math.round((stats.uniqueContributors / GOAL_CONTRIBUTORS) * 100), 100);
const barLength = 25;
const filled = Math.round((percent / 100) * barLength);
const bar = '█'.repeat(filled) + '░'.repeat(barLength - filled);
console.log(`  [${bar}] ${percent}% (${stats.uniqueContributors} / ${GOAL_CONTRIBUTORS} unique external contributors)`);

if (stats.contributorList.length > 0) {
  console.log(`\n\x1b[32mActive External Contributors:\x1b[0m ${stats.contributorList.join(', ')}`);
} else {
  console.log(`\n\x1b[90m(Awaiting first external PR merges. 6 starter issues are currently live on GitHub!)\x1b[0m`);
}

console.log(`\n\x1b[90mRun 'node scripts/growth_scheduler.js' anytime to check live milestone status.\x1b[0m\n`);
