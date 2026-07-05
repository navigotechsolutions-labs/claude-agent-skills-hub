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

<!-- mcp-catalog-start -->

## 🔌 Model Context Protocol (MCP) Servers Catalog
A dynamically updated list of Model Context Protocol (MCP) servers, automatically discovered, categorized, and cloned into this repository.

### 📂 Categories
* [🗄️ Databases & Storage (1)](#-databases)
* [💬 Collaboration & Productivity (1)](#-collaboration)
* [🛠️ Developer Tools & APIs (12)](#-dev_tools)
* [🌐 Web, Search & Browsing (8)](#-browser_search)
* [🧠 AI, LLMs & Reasoning (30)](#-ai_llm)
* [⚙️ System & Utilities (5)](#-utilities)

---

### 🗄️ Databases & Storage <a name="-databases"></a>

| Server | Stars | Description | Location in Repo |
| :--- | :---: | :--- | :--- |
| [XHS-Downloader](https://github.com/JoeanAmier/XHS-Downloader) | ⭐ 11,822 | 小红书（XiaoHongShu、RedNote）链接提取/作品采集工具：提取账号发布、收藏、点赞、专辑作品链接；提取搜索结果作品、用户链接；采集小红书作品信息；提取小红书作品下载地址；下载小红书作品文件 | [`/mcp-servers/databases/XHS-Downloader`](mcp-servers/databases/XHS-Downloader) |

### 💬 Collaboration & Productivity <a name="-collaboration"></a>

| Server | Stars | Description | Location in Repo |
| :--- | :---: | :--- | :--- |
| [TrendRadar](https://github.com/sansan0/TrendRadar) | ⭐ 60,262 | ⭐AI-driven public opinion & trend monitor with multi-platform aggregation, RSS, and smart alerts.🎯 告别信息过载，你的 AI 舆情监控助手与热点筛选工具！聚合多平台热点 +  RSS 订阅，支持关键词精准筛选。AI 智能筛选新闻 + AI 翻译 +  AI 分析简报直推手机，也支持接入 MCP 架构，赋能 AI 自然语言对话分析、情感洞察与趋势预测等。支持 Docker ，数据本地/云端自持。集成微信/飞书/钉钉/Telegram/邮件/ntfy/bark/slack 等渠道智能推送。 | [`/mcp-servers/collaboration/TrendRadar`](mcp-servers/collaboration/TrendRadar) |

### 🛠️ Developer Tools & APIs <a name="-dev_tools"></a>

| Server | Stars | Description | Location in Repo |
| :--- | :---: | :--- | :--- |
| [n8n](https://github.com/n8n-io/n8n) | ⭐ 195,252 | Fair-code workflow automation platform with native AI capabilities. Combine visual building with custom code, self-host or cloud, 400+ integrations. | [`/Not cloned (size exceeds 100MB)`](Not cloned (size exceeds 100MB)) |
| [gemini-cli](https://github.com/google-gemini/gemini-cli) | ⭐ 105,754 | An open-source AI agent that brings the power of Gemini directly into your terminal. | [`/Not cloned (size exceeds 100MB)`](Not cloned (size exceeds 100MB)) |
| [github-mcp-server](https://github.com/github/github-mcp-server) | ⭐ 31,203 | GitHub's official MCP Server | [`/mcp-servers/dev_tools/github-mcp-server`](mcp-servers/dev_tools/github-mcp-server) |
| [mcp-for-beginners](https://github.com/microsoft/mcp-for-beginners) | ⭐ 16,685 | This open-source curriculum introduces the fundamentals of Model Context Protocol (MCP) through real-world, cross-language examples in .NET, Java, TypeScript, JavaScript, Rust and Python. Designed for developers, it focuses on practical techniques for building modular, scalable, and secure AI workflows from session setup to service orchestration. | [`/Not cloned (size exceeds 100MB)`](Not cloned (size exceeds 100MB)) |
| [Skill_Seekers](https://github.com/yusufkaraaslan/Skill_Seekers) | ⭐ 14,365 | Convert documentation websites, GitHub repositories, and PDFs into Claude AI skills with automatic conflict detection | [`/mcp-servers/dev_tools/Skill_Seekers`](mcp-servers/dev_tools/Skill_Seekers) |
| [nginx-ui](https://github.com/0xJacky/nginx-ui) | ⭐ 11,266 | Yet another WebUI for Nginx | [`/mcp-servers/dev_tools/nginx-ui`](mcp-servers/dev_tools/nginx-ui) |
| [mcp](https://github.com/awslabs/mcp) | ⭐ 9,389 | Open source MCP Servers for AWS | [`/mcp-servers/dev_tools/mcp`](mcp-servers/dev_tools/mcp) |
| [lamda](https://github.com/firerpa/lamda) | ⭐ 7,857 | Android Full-Stack Device Control Platform: WebRTC/H.264 remote desktop, UI/OCR/image-matching automation, one-click MITM, built-in Frida, proxy/VPN/frp/P2P networking, MCP/Agent, 160+ APIs, designed for multi-device clusters and engineered deployments. | [`/mcp-servers/dev_tools/lamda`](mcp-servers/dev_tools/lamda) |
| [Awesome-MCP-ZH](https://github.com/yzfly/Awesome-MCP-ZH) | ⭐ 7,395 | MCP 资源精选， MCP指南，Claude MCP，MCP Servers, MCP Clients | [`/mcp-servers/dev_tools/Awesome-MCP-ZH`](mcp-servers/dev_tools/Awesome-MCP-ZH) |
| [awesome-mcp-clients](https://github.com/punkpeye/awesome-mcp-clients) | ⭐ 6,504 | A collection of MCP clients. | [`/Not cloned (size exceeds 100MB)`](Not cloned (size exceeds 100MB)) |
| [klavis](https://github.com/Klavis-AI/klavis) | ⭐ 5,764 | Klavis AI:  MCP integration platforms that let AI agents use tools reliably at any scale | [`/Not cloned (size exceeds 100MB)`](Not cloned (size exceeds 100MB)) |
| [server-git](https://github.com/modelcontextprotocol/servers/tree/main/src/git) | ⭐ 2,500 | Official Model Context Protocol server providing git integration. | [`/mcp-servers/official-servers/src/git`](mcp-servers/official-servers/src/git) |

### 🌐 Web, Search & Browsing <a name="-browser_search"></a>

| Server | Stars | Description | Location in Repo |
| :--- | :---: | :--- | :--- |
| [Scrapling](https://github.com/D4Vinci/Scrapling) | ⭐ 68,137 | 🕷️ An adaptive Web Scraping framework that handles everything from a single request to a full-scale crawl! | [`/mcp-servers/browser_search/Scrapling`](mcp-servers/browser_search/Scrapling) |
| [chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) | ⭐ 45,906 | Chrome DevTools for coding agents | [`/mcp-servers/browser_search/chrome-devtools-mcp`](mcp-servers/browser_search/chrome-devtools-mcp) |
| [gpt-researcher](https://github.com/assafelovic/gpt-researcher) | ⭐ 28,078 | An autonomous agent that conducts deep research on any data using any LLM providers | [`/mcp-servers/browser_search/gpt-researcher`](mcp-servers/browser_search/gpt-researcher) |
| [QuantDinger](https://github.com/brokermr810/QuantDinger) | ⭐ 9,236 | AI quantitative trading platform for crypto, stocks, and forex with backtesting, live trading, market data, and multi-agent research.vibe-trading ,trading-agents,ai-trader,ai-trading | [`/mcp-servers/browser_search/QuantDinger`](mcp-servers/browser_search/QuantDinger) |
| [browser-tools-mcp](https://github.com/AgentDeskAI/browser-tools-mcp) | ⭐ 7,262 | Monitor browser logs directly from Cursor and other MCP compatible IDEs. | [`/mcp-servers/browser_search/browser-tools-mcp`](mcp-servers/browser_search/browser-tools-mcp) |
| [firecrawl-mcp-server](https://github.com/firecrawl/firecrawl-mcp-server) | ⭐ 6,832 | 🔥 Official Firecrawl MCP Server - Adds powerful web scraping and search to Cursor, Claude and any other LLM clients. | [`/mcp-servers/browser_search/firecrawl-mcp-server`](mcp-servers/browser_search/firecrawl-mcp-server) |
| [mcp](https://github.com/BrowserMCP/mcp) | ⭐ 6,766 | Browser MCP is a Model Context Provider (MCP) server that allows AI applications to control your browser | [`/mcp-servers/browser_search/mcp`](mcp-servers/browser_search/mcp) |
| [server-fetch](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch) | ⭐ 2,500 | Official Model Context Protocol server providing fetch integration. | [`/mcp-servers/official-servers/src/fetch`](mcp-servers/official-servers/src/fetch) |

### 🧠 AI, LLMs & Reasoning <a name="-ai_llm"></a>

| Server | Stars | Description | Location in Repo |
| :--- | :---: | :--- | :--- |
| [ruflo](https://github.com/ruvnet/ruflo) | ⭐ 63,067 | 🌊 The leading agent meta-harness. Deploy intelligent multi-player swarms, coordinate autonomous workflows, and build conversational AI systems. Features adaptive memory, self-learning intelligence, RAG integration, and native Claude Code / Codex / Hermes and many more Integrated | [`/mcp-servers/ai_llm/ruflo`](mcp-servers/ai_llm/ruflo) |
| [context7](https://github.com/upstash/context7) | ⭐ 58,597 | Context7 Platform -- Up-to-date code documentation for LLMs and AI code editors | [`/mcp-servers/ai_llm/context7`](mcp-servers/ai_llm/context7) |
| [UI-TARS-desktop](https://github.com/bytedance/UI-TARS-desktop) | ⭐ 37,684 | The Open-Source Multimodal AI Agent Stack: Connecting Cutting-Edge AI Models and Agent Infra | [`/mcp-servers/ai_llm/UI-TARS-desktop`](mcp-servers/ai_llm/UI-TARS-desktop) |
| [codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp) | ⭐ 26,427 | High-performance code intelligence MCP server. Indexes codebases into a persistent knowledge graph — average repo in milliseconds. 158 languages, sub-ms queries, 99% fewer tokens. Single static binary, zero dependencies. | [`/Not cloned (size exceeds 100MB)`](Not cloned (size exceeds 100MB)) |
| [serena](https://github.com/oraios/serena) | ⭐ 26,110 | A powerful MCP toolkit for coding, providing semantic retrieval and editing capabilities  - the IDE for your agent | [`/mcp-servers/ai_llm/serena`](mcp-servers/ai_llm/serena) |
| [fastmcp](https://github.com/PrefectHQ/fastmcp) | ⭐ 25,976 | 🚀 The fast, Pythonic way to build MCP servers and clients. | [`/mcp-servers/ai_llm/fastmcp`](mcp-servers/ai_llm/fastmcp) |
| [activepieces](https://github.com/activepieces/activepieces) | ⭐ 23,125 | AI Agents & MCPs & AI Workflow Automation • (~400 MCP servers for AI agents) • AI Automation / AI Agent with MCPs • AI Workflows & AI Agents • MCPs for AI Agents | [`/Not cloned (size exceeds 100MB)`](Not cloned (size exceeds 100MB)) |
| [MaxKB](https://github.com/1Panel-dev/MaxKB) | ⭐ 21,835 | 🔥 MaxKB is an open-source platform for building enterprise-grade agents.  强大易用的开源企业级智能体平台。 | [`/mcp-servers/ai_llm/MaxKB`](mcp-servers/ai_llm/MaxKB) |
| [FunASR](https://github.com/modelscope/FunASR) | ⭐ 18,904 | Industrial-grade speech recognition toolkit: 170x realtime, 50+ languages, speaker diarization, emotion detection, streaming, and OpenAI-compatible API. | [`/mcp-servers/ai_llm/FunASR`](mcp-servers/ai_llm/FunASR) |
| [nuclear](https://github.com/nukeop/nuclear) | ⭐ 17,985 | Streaming music player that finds free music for you | [`/mcp-servers/ai_llm/nuclear`](mcp-servers/ai_llm/nuclear) |
| [trigger.dev](https://github.com/triggerdotdev/trigger.dev) | ⭐ 15,568 | Trigger.dev – build and deploy fully‑managed AI agents and workflows | [`/mcp-servers/ai_llm/trigger.dev`](mcp-servers/ai_llm/trigger.dev) |
| [OpenMetadata](https://github.com/open-metadata/OpenMetadata) | ⭐ 14,389 | The Open Context Layer for Data and AI ,  OpenMetadata is the open platform for building trusted data context and business semantics for humans, AI assistants, and agents. | [`/Not cloned (size exceeds 100MB)`](Not cloned (size exceeds 100MB)) |
| [Auto-claude-code-research-in-sleep](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep) | ⭐ 13,009 | ARIS ⚔️ (Auto-Research-In-Sleep) — Lightweight Markdown-only skills for autonomous ML research: cross-model review loops, idea discovery, and experiment automation. No framework, no lock-in — works with Claude Code, Codex, OpenClaw, or any LLM agent. | [`/mcp-servers/ai_llm/Auto-claude-code-research-in-sleep`](mcp-servers/ai_llm/Auto-claude-code-research-in-sleep) |
| [fastapi_mcp](https://github.com/tadata-org/fastapi_mcp) | ⭐ 11,937 | Expose your FastAPI endpoints as Model Context Protocol (MCP) tools, with Auth! | [`/mcp-servers/ai_llm/fastapi_mcp`](mcp-servers/ai_llm/fastapi_mcp) |
| [unity-mcp](https://github.com/CoplayDev/unity-mcp) | ⭐ 11,774 | Unity MCP acts as a bridge between AI assistants and your Unity Editor. Give your LLM tools to manage assets, control scenes, edit scripts, and automate tasks within Unity. | [`/mcp-servers/ai_llm/unity-mcp`](mcp-servers/ai_llm/unity-mcp) |
| [mcp-use](https://github.com/mcp-use/mcp-use) | ⭐ 10,246 | The fullstack MCP framework to develop MCP Apps for ChatGPT / Claude & MCP Servers for AI Agents. | [`/mcp-servers/ai_llm/mcp-use`](mcp-servers/ai_llm/mcp-use) |
| [hexstrike-ai](https://github.com/0x4m4/hexstrike-ai) | ⭐ 10,152 | HexStrike AI MCP Agents is an advanced MCP server that lets AI agents (Claude, GPT, Copilot, etc.) autonomously run 150+ cybersecurity tools for automated pentesting, vulnerability discovery, bug bounty automation, and security research. Seamlessly bridge LLMs with real-world offensive security capabilities. | [`/mcp-servers/ai_llm/hexstrike-ai`](mcp-servers/ai_llm/hexstrike-ai) |
| [ida-pro-mcp](https://github.com/mrexodia/ida-pro-mcp) | ⭐ 9,889 | AI-powered reverse engineering assistant that bridges IDA Pro with language models through MCP. | [`/mcp-servers/ai_llm/ida-pro-mcp`](mcp-servers/ai_llm/ida-pro-mcp) |
| [mcp-agent](https://github.com/lastmile-ai/mcp-agent) | ⭐ 8,401 | Build effective agents using Model Context Protocol and simple workflow patterns | [`/mcp-servers/ai_llm/mcp-agent`](mcp-servers/ai_llm/mcp-agent) |
| [Upsonic](https://github.com/Upsonic/Upsonic) | ⭐ 7,905 | Build autonomous AI agents in Python. | [`/mcp-servers/ai_llm/Upsonic`](mcp-servers/ai_llm/Upsonic) |
| [cursor-talk-to-figma-mcp](https://github.com/grab/cursor-talk-to-figma-mcp) | ⭐ 6,874 | TalkToFigma: MCP integration between AI Agent (Cursor, Claude Code, Codex) and Figma, allowing Agentic AI to communicate with Figma for reading designs and modifying them programmatically. | [`/mcp-servers/ai_llm/cursor-talk-to-figma-mcp`](mcp-servers/ai_llm/cursor-talk-to-figma-mcp) |
| [osaurus](https://github.com/osaurus-ai/osaurus) | ⭐ 6,739 | Own your AI. The native macOS harness for AI agents -- any model, persistent memory, autonomous execution, cryptographic identity. Built in Swift. Fully offline. Open source. | [`/mcp-servers/ai_llm/osaurus`](mcp-servers/ai_llm/osaurus) |
| [unstract](https://github.com/Zipstack/unstract) | ⭐ 6,688 | LLM-Driven Extraction of Unstructured Data — Built for API Deployments & ETL Pipeline Workflows | [`/mcp-servers/ai_llm/unstract`](mcp-servers/ai_llm/unstract) |
| [bifrost](https://github.com/maximhq/bifrost) | ⭐ 6,267 | Fastest enterprise AI gateway (50x faster than LiteLLM) with adaptive load balancer, cluster mode, guardrails, 1000+ models support & <100 µs overhead at 5k RPS. | [`/Not cloned (size exceeds 100MB)`](Not cloned (size exceeds 100MB)) |
| [XcodeBuildMCP](https://github.com/getsentry/XcodeBuildMCP) | ⭐ 6,033 | A Model Context Protocol (MCP) server and CLI that provides tools for agent use when working on iOS and macOS projects. | [`/mcp-servers/ai_llm/XcodeBuildMCP`](mcp-servers/ai_llm/XcodeBuildMCP) |
| [awesome-mcp-servers](https://github.com/appcypher/awesome-mcp-servers) | ⭐ 5,670 | Awesome MCP Servers - A curated list of Model Context Protocol servers | [`/mcp-servers/ai_llm/awesome-mcp-servers`](mcp-servers/ai_llm/awesome-mcp-servers) |
| [server-everything](https://github.com/modelcontextprotocol/servers/tree/main/src/everything) | ⭐ 2,500 | Official Model Context Protocol server providing everything integration. | [`/mcp-servers/official-servers/src/everything`](mcp-servers/official-servers/src/everything) |
| [server-memory](https://github.com/modelcontextprotocol/servers/tree/main/src/memory) | ⭐ 2,500 | Official Model Context Protocol server providing memory integration. | [`/mcp-servers/official-servers/src/memory`](mcp-servers/official-servers/src/memory) |
| [server-sequentialthinking](https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking) | ⭐ 2,500 | Official Model Context Protocol server providing sequentialthinking integration. | [`/mcp-servers/official-servers/src/sequentialthinking`](mcp-servers/official-servers/src/sequentialthinking) |
| [server-time](https://github.com/modelcontextprotocol/servers/tree/main/src/time) | ⭐ 2,500 | Official Model Context Protocol server providing time integration. | [`/mcp-servers/official-servers/src/time`](mcp-servers/official-servers/src/time) |

### ⚙️ System & Utilities <a name="-utilities"></a>

| Server | Stars | Description | Location in Repo |
| :--- | :---: | :--- | :--- |
| [n8n-mcp](https://github.com/czlonkowski/n8n-mcp) | ⭐ 22,147 | A MCP for Claude Desktop / Claude Code / Windsurf / Cursor to build n8n workflows for you  | [`/Not cloned (size exceeds 100MB)`](Not cloned (size exceeds 100MB)) |
| [context-mode](https://github.com/mksglu/context-mode) | ⭐ 18,581 | Context window optimization for AI coding agents. Sandboxes tool output (98% reduction), persists session memory, and   enforces routing across 17 platforms via MCP + hooks. | [`/mcp-servers/utilities/context-mode`](mcp-servers/utilities/context-mode) |
| [xiaohongshu-mcp](https://github.com/xpzouying/xiaohongshu-mcp) | ⭐ 14,515 | MCP for xiaohongshu.com | [`/mcp-servers/utilities/xiaohongshu-mcp`](mcp-servers/utilities/xiaohongshu-mcp) |
| [xiaozhi-esp32-server](https://github.com/xinnan-tech/xiaozhi-esp32-server) | ⭐ 9,977 | 本项目为xiaozhi-esp32提供后端服务，帮助您快速搭建ESP32设备控制服务器。Backend service for xiaozhi-esp32, helps you quickly build an ESP32 device control server. | [`/Not cloned (size exceeds 100MB)`](Not cloned (size exceeds 100MB)) |
| [server-filesystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) | ⭐ 2,500 | Official Model Context Protocol server providing filesystem integration. | [`/mcp-servers/official-servers/src/filesystem`](mcp-servers/official-servers/src/filesystem) |

<!-- mcp-catalog-end -->

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
