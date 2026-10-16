const https = require("https");

const skillsList = [
  { group: "BUILD", name: "superpowers", desc: "plans and debugs before it writes", url: "https://lnkd.in/eppbgRaK", stars: "259k★" },
  { group: "BUILD", name: "gstack", desc: "23 skills in one setup", url: "https://lnkd.in/e8PYQ2z6", stars: "124k★" },
  { group: "BUILD", name: "caveman", desc: "no-fluff answers, no padding", url: "https://lnkd.in/e4nxpEJi", stars: "92k★" },
  { group: "BUILD", name: "ponytail", desc: "says nothing, writes one line", url: "https://lnkd.in/eYzPcnAR", stars: "88k★" },
  { group: "BUILD", name: "codex", desc: "runs Codex inside Claude Code", url: "https://lnkd.in/eTweEPmw", stars: "30k★" },
  { group: "BUILD", name: "i-have-adhd", desc: "stops it burying the answer", url: "https://lnkd.in/eQEJZeMN", stars: "9k★" },

  { group: "DESIGN", name: "ui-ux-pro-max", desc: "palettes and fonts that work", url: "https://lnkd.in/eh5s-T6t", stars: "109k★" },
  { group: "DESIGN", name: "taste-skill", desc: "makes a page look expensive", url: "https://lnkd.in/emKJrHrX", stars: "66k★" },
  { group: "DESIGN", name: "impeccable", desc: "the polish pass on any front end", url: "https://lnkd.in/eMSX587R", stars: "49k★" },
  { group: "DESIGN", name: "hyperframes", desc: "turns a web page into a video", url: "https://lnkd.in/ed-wSdsx", stars: "37k★" },
  { group: "DESIGN", name: "emil", desc: "beautiful interface animations", url: "https://lnkd.in/eWebzpnh", stars: "20k★" },
  { group: "DESIGN", name: "gsap", desc: "smooth web animations", url: "https://lnkd.in/e6avMtKZ", stars: "12k★" },

  { group: "RESEARCH", name: "skill-creator", desc: "build your own skills", url: "https://lnkd.in/er2tG4ZB", stars: "163k★" },
  { group: "RESEARCH", name: "graphify", desc: "turns notes into a map", url: "https://lnkd.in/eT9f97nW", stars: "94k★" },
  { group: "RESEARCH", name: "last30days", desc: "what the internet said this month", url: "https://lnkd.in/e6uRrEnT", stars: "53k★" },
  { group: "RESEARCH", name: "agent-browser", desc: "lets Claude use any website", url: "https://lnkd.in/eUS4cxjs", stars: "39k★" },
  { group: "RESEARCH", name: "find-skills", desc: "finds any skill for you", url: "https://lnkd.in/eFcmubhq", stars: "27k★" },
  { group: "RESEARCH", name: "claude-hud", desc: "shows what Claude is doing live", url: "https://lnkd.in/ecU6_AC9", stars: "27k★" },

  { group: "MARKETING", name: "remotion", desc: "build full videos in React", url: "https://lnkd.in/ecX3gdvr", stars: "54k★" },
  { group: "MARKETING", name: "marketingskills", desc: "40 marketing skills in one pack", url: "https://lnkd.in/egt-7ZwM", stars: "41k★" },
  { group: "MARKETING", name: "humanizer", desc: "strips the AI tells from your writing", url: "https://lnkd.in/eekWNVYm", stars: "31k★" },
  { group: "MARKETING", name: "social-media-skills", desc: "my own content pack, free", url: "https://lnkd.in/emDvetxm", stars: "mine" }
];

function fetchInterstitialTarget(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        // Look for data-tracking-control-name="external_url_click" href="..."
        const match = data.match(/href="([^"]+)"[^>]*data-tracking-control-name="external_url_click"/i)
          || data.match(/data-tracking-control-name="external_url_click"[^>]*href="([^"]+)"/i)
          || data.match(/<a[^>]+href="(https:\/\/github\.com\/[^"]+)"/i);
        if (match) {
          resolve(match[1]);
        } else {
          // Fallback search for any https://github.com link
          const ghMatch = data.match(/https:\/\/github\.com\/[a-zA-Z0-9_\-\.\/]+/);
          resolve(ghMatch ? ghMatch[0] : null);
        }
      });
    }).on("error", () => resolve(null));
  });
}

async function main() {
  const resolved = [];
  for (const s of skillsList) {
    const target = await fetchInterstitialTarget(s.url);
    resolved.push({
      ...s,
      githubUrl: target
    });
    console.log(`${s.name.padEnd(20)} -> ${target}`);
  }
  const fs = require('fs');
  fs.writeFileSync('scripts/resolved_skills.json', JSON.stringify(resolved, null, 2));
}

main();
