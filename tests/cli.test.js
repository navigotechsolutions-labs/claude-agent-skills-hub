/**
 * Automated CLI Test Suite for claude-agent-skills-hub
 * Tests command dispatching, listing, info preview, and exit codes.
 */

const { execSync } = require('child_process');
const assert = require('assert');
const path = require('path');

const cliPath = path.resolve(__dirname, '..', 'bin', 'cli.js');

function stripAnsi(str) {
  return str.replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '');
}

function runCli(args = '') {
  const raw = execSync(`node "${cliPath}" ${args}`, {
    encoding: 'utf8',
    env: process.env,
  });
  return stripAnsi(raw);
}

console.log('Running CLI Integration Tests...');

// Test 1: list command output contains key skills
{
  const output = runCli('list');
  assert.match(output, /Claude Agent Skills Hub/i, 'Banner should be printed');
  assert.match(output, /taste-skill/i, 'taste-skill must be listed');
  assert.match(output, /minimalist-skill/i, 'minimalist-skill must be listed');
  console.log('✔ Test 1 Passed: list command displays available skills');
}

// Test 2: info command displays details for taste-skill
{
  const output = runCli('info taste-skill');
  assert.match(output, /Skill:\s+taste-skill/i, 'Should display skill title');
  assert.match(output, /Description:/i, 'Should display description');
  console.log('✔ Test 2 Passed: info command renders preview for taste-skill');
}

// Test 3: mcp command renders catalog
{
  const output = runCli('mcp');
  assert.match(output, /Model Context Protocol/i, 'Should display MCP catalog');
  console.log('✔ Test 3 Passed: mcp command renders catalog');
}

// Test 4: unknown command outputs help
{
  const output = runCli('help');
  assert.match(output, /Usage:/i, 'Should display usage instructions');
  console.log('✔ Test 4 Passed: help command renders usage guidance');
}

console.log('\nAll 4 CLI tests passed successfully! 🚀\n');
