# 🤖 Claude Agent Skills Hub (Claude Code Custom Skills & Prompts)

[![GitHub stars](https://img.shields.io/github/stars/navigotechsolutions-labs/claude-agent-skills-hub.svg?style=flat-ring)](https://github.com/navigotechsolutions-labs/claude-agent-skills-hub/stargazers)
[![GitHub license](https://img.shields.io/github/license/navigotechsolutions-labs/claude-agent-skills-hub.svg?style=flat-ring)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude-Code-purple.svg)](https://anthropic.com)
[![Category](https://img.shields.io/badge/Category-AI%20Developer%20Tools-blue.svg)](https://github.com/navigotechsolutions-labs)

A curated collection of custom developer skills and prompt templates for **Claude Code** (Anthropic's terminal-based coding agent). These behavioral profiles and system instructions extend Claude's capabilities across UI/UX design intelligence, WebGPU graphics development, Obsidian markdown integration, lazy-dev problem solving, and automated research workflows.

Ideal for developers and prompt engineers looking to supercharge their terminal AI coding experience.

---

## 🛠️ Installed Skills Directory

This hub integrates several custom skills compiled from verified community extensions and internal optimizations:

| Custom Skill | Source / Inspiration | Description & Capability |
| :--- | :--- | :--- |
| **`taste-skill`** | `leonxlnx/taste-skill` | Injects aesthetic principles, helping the AI make premium design decisions. |
| **`impeccable`** | `pbakaus/impeccable` | Structured design language specifications and layout harnesses. |
| **`ponytail`** | `DietrichGebert/ponytail` | Prompts replicating senior developer thinking patterns, simplifying code. |
| **`notebooklm-py`** | `teng-lin/notebooklm-py` | Python integrations for managing research notebooks and context. |
| **`npxskillui`** | `amaancoderx/npxskillui` | Generates interactive and functional local user interfaces via NPX. |
| **`webgpu-threejs-tsl`** | `dgreenheck/webgpu-claude-skill` | Specialized knowledge base for WebGPU, Three.js, and TSL shader code. |
| **`ui-ux-pro-max-skill`** | `nextlevelbuilder/ui-ux-pro-max` | Injects advanced UI/UX heuristics and design system rules. |
| **`last30days-skill`** | `mvanhorn/last30days-skill` | Scopes Reddit, X, YouTube, and HackerNews for recent technology shifts. |
| **`obsidian-skills`** | `kepano/obsidian-skills` | Obsidian note linking, markdown styling, and CLI command automations. |
| **`brandkit`** | Derived from `taste-skill` | Dynamically generates custom branding presets and visual assets. |
| **`stitch-skill`** | Derived from `taste-skill` | Integrates Google Stitch design guidelines and component patterns. |
| **`brutalist-skill`** | Derived from `taste-skill` | Guides the AI in building bold, brutalist visual layouts. |
| **`minimalist-skill`** | Derived from `taste-skill` | Focuses UI output on clean, minimal layouts with high contrast. |
| **`json-canvas`** | Derived from `obsidian-skills` | Encodes skills to read and output the Obsidian infinite JSON Canvas format. |
| **`defuddle`** | Derived from `obsidian-skills` | Simplifies bloated code blocks and clarifies complex logic structures. |

---

## ⚙️ How Claude Code Uses Skills

Claude Code automatically discovers and loads custom skills from its local configuration directory:
* **Global configuration root**: `~/.claude/skills/` (e.g. `C:\Users\<username>\.claude\config\skills` on Windows, or `~/.config/claude/skills` on Unix systems).
* Each skill subdirectory contains a `SKILL.md` file (which includes YAML frontmatter with `name` and `description`) and optional supporting scripts or reference guides.

---

## 🚀 Setup & Installation

To load all these custom skills into your local Claude Code terminal session:

1. Clone this repository:
   ```bash
   git clone https://github.com/navigotechsolutions-labs/claude-agent-skills-hub.git
   ```

2. Copy the skill subdirectories to your local Claude configuration folder:
   ```bash
   # On macOS/Linux:
   cp -r claude-agent-skills-hub/* ~/.claude/skills/
   
   # On Windows (PowerShell):
   Copy-Item -Recurse -Force claude-agent-skills-hub\* C:\Users\<YourUsername>\.claude\skills\
   ```

3. Restart your Claude Code terminal session. The skills will be auto-loaded on startup!

---

## 📄 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for details.
