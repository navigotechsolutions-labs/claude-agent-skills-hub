# 🗓️ 30-Day Automated Growth Schedule (Month Plan)

> **Objective:** Systematically achieve **20+ Unique External Contributors with Merged PRs** within 30 days to qualify for the **Anthropic Open Source Contributor Program**, while simultaneously scaling npm downloads and OpenSSF score.

---

## ⚡ Automated CI/CD Engine Schedule

The following GitHub Action workflows run automatically on schedule to power repository growth:

| Automation Workflow | Schedule / Trigger | Purpose |
| :--- | :--- | :--- |
| **`weekly-bounty-generator.yml`** | Every Monday @ 08:00 UTC | Automatically releases 2–3 new `good first issue` bounties from the backlog |
| **`auto-all-contributors.yml`** | On every merged PR (`closed`) | Automatically extracts contributor info and updates `README.md` Hall of Fame |
| **`pr-triage.yml`** | On PR opened / synchronized | Labels incoming PRs (`skill`, `mcp`, `documentation`) and enforces checklists |
| **`welcome-contributor.yml`** | On PR opened | Greets first-time contributors with friendly review SLA (<24h) |
| **`scorecard.yml`** | Every Monday @ 04:00 UTC | OpenSSF security audit and badge score recalculation |
| **`validate-contributions.yml`** | On push / pull request | Automated linting and structure tests on all contributed skills |

---

## 📅 Day-by-Day 30-Day Master Calendar

### 🟩 Week 1: Foundation, Seed Distribution & First 5 Contributors (Days 1–7)

| Day | Automation / Event | Action Item | Target Milestone |
| :---: | :--- | :--- | :---: |
| **Day 1** | CLI & Scaffolding Live | Publish to NPM: `npm publish --access public`. Post announcement on `r/ClaudeAI`. | Repo indexed on npm |
| **Day 2** | Seed Issues Active | Share live issues (Docker, Rust, Next.js, Spanish docs) on Twitter/X with `#ClaudeCode`. | 10+ stars |
| **Day 3** | First PR Watch | Monitor incoming PRs; merge within 24h. Auto-welcome bot greets contributors. | Contributor #1 merged |
| **Day 4** | Aggregator Indexing | Submit repo to `goodfirstissue.dev` and `up-for-grabs.net`. | Good First Issue crawl |
| **Day 5** | MCP Showcase | Post MCP catalog highlight in Anthropic & MCP Discord `#projects-showcase`. | Contributor #2–3 merged |
| **Day 6** | HN Launch | Submit `Show HN: Claude Agent Skills Hub` to Hacker News. | 25+ stars |
| **Day 7** | **Week 1 Review** | Run `node scripts/growth_scheduler.js` to inspect milestone progress. | **🎯 Milestone: 5 Contributors** |

---

### 🟦 Week 2: Scaling Outreach & International Translation Drive (Days 8–14)

| Day | Automation / Event | Action Item | Target Milestone |
| :---: | :--- | :--- | :---: |
| **Day 8** | 🤖 **Automated Cron** | `weekly-bounty-generator.yml` creates Tailwind/Shadcn & Postgres optimizer issues. | Fresh issues live |
| **Day 9** | Developer Article | Publish *"10 Essential Custom Skills for Claude Code"* on Dev.to & Hashnode. | Inbound traffic surge |
| **Day 10** | Global Translation Push | Tweet invitation to bilingual developers to contribute German/French README translations. | Contributor #6–7 merged |
| **Day 11** | Fast Review Sprint | Review & merge PRs in evening batch. Check that `auto-all-contributors.yml` ran. | Contributor #8 merged |
| **Day 12** | Community Deep-Dive | Post UI/UX Heuristics skill breakdown in Reddit `r/webdev` and `r/Frontend`. | 50+ stars |
| **Day 13** | Issue Refresh | Check open issues; comment encouragement on in-progress contributor branches. | Contributor #9 merged |
| **Day 14** | **Week 2 Review** | Celebrate 10 contributors on X; tag contributors to boost visibility. | **🎯 Milestone: 10 Contributors** |

---

### 🟨 Week 3: Acceleration, Framework Skills & Editor Expansion (Days 15–21)

| Day | Automation / Event | Action Item | Target Milestone |
| :---: | :--- | :--- | :---: |
| **Day 15** | 🤖 **Automated Cron** | `weekly-bounty-generator.yml` releases PyTorch/CUDA & Neo4j MCP guide issues. | Fresh bounties live |
| **Day 16** | LocalLLaMA & AI Hub | Share modular skill architecture with open-source AI community on `r/LocalLLaMA`. | Contributor #11–12 merged |
| **Day 17** | Contributor Audit | Run `node scripts/growth_scheduler.js` to verify unique GitHub usernames. | Contributor #13 merged |
| **Day 18** | Cursor & Windsurf Bridge | Post quickstart guide for using these skills across Cursor, Windsurf, and Claude. | Contributor #14 merged |
| **Day 19** | Direct Author Outreach | Reach out to 5 authors of trending prompts on GitHub to invite PRs for their skills. | Contributor #15 merged |
| **Day 20** | Sprint to 20 Launch | Announce "Sprint to 20": 5 open spots remaining in the Contributors Hall of Fame! | Contributor #16–17 merged |
| **Day 21** | **Week 3 Review** | Verify test coverage & ensure zero unreviewed PRs older than 12 hours. | **🎯 Milestone: 17 Contributors** |

---

### 🟧 Week 4: Final Sprint, Audit & Anthropic Grant Application (Days 22–30)

| Day | Automation / Event | Action Item | Target Milestone |
| :---: | :--- | :--- | :---: |
| **Day 22** | 🤖 **Automated Cron** | `weekly-bounty-generator.yml` creates final polish issues (documentation & CLI tests). | Last starter issues live |
| **Day 23** | **Milestone Crossing!** | Merge pull requests for the remaining 3 contributors! 🎯 | **🎯 20 UNIQUE CONTRIBUTORS HIT!** |
| **Day 24** | Automated Audit | Run `gh pr list --state merged` verification script to produce verifiable proof list. | 20 unique IDs confirmed |
| **Day 25** | OpenSSF Scorecard Check | Run `.github/workflows/scorecard.yml` manually to ensure security score is green. | OpenSSF scorecard green |
| **Day 26** | Application Compilation | Compile dossier: Repo URL, list of 20 merged contributor PRs, npm download metrics. | Application package ready |
| **Day 27** | **Submit Application** | Submit official application to the **Anthropic Open Source Contributor Program**! | Application submitted 🚀 |
| **Day 28** | Ongoing Community Ops | Keep weekly automations active; thank all 20+ contributors in a GitHub Discussion. | Sustainable growth |
| **Day 29** | v1.2.0 GitHub Release | Tag release `v1.2.0` documenting community additions and full contributor list. | Official release published |
| **Day 30** | Program Onboarding | Follow up on Anthropic approval and celebrate with community! | 🎉 Full Claude OSS Access |

---

## 🖥️ Live Milestone Tracking Command

Run this command at any time from the repository root to get real-time progress towards the 20-contributor threshold:

```bash
node scripts/growth_scheduler.js
```

Example Output:
```text
=====================================================
  📅 30-DAY OSS GROWTH AUTOMATION ENGINE
  Target: 20 Unique External Contributors for Anthropic OSS Grant
=====================================================

Current Timeline: Day 1 / 30
Current Phase:    Launch & Foundation
Today's Focus:    NPM Publish & Reddit/HN Announcement
Action Item:      Launch Announcement on r/ClaudeAI & Hacker News

Progress Meter:
  [████████░░░░░░░░░░░░░░░░░] 35% (7 / 20 unique external contributors)
```
