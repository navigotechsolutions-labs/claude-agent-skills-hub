const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const frontendSkills = [
  {
    name: 'superdesign-skill',
    desc: 'Prompt heuristics and system rules for modern UI/UX superdesigns',
    githubUrl: 'https://github.com/superdesigndev/superdesign-skill',
    folder: 'superdesign-skill'
  },
  {
    name: 'better-design',
    desc: 'Curated design guidelines, component best practices & anti-patterns',
    githubUrl: 'https://github.com/marvkr/better-design',
    folder: 'better-design'
  },
  {
    name: 'design-taste',
    desc: 'Aesthetic rules, font pairing, color harmony and layout elevation',
    githubUrl: 'https://github.com/madebymustafa/design-taste',
    folder: 'design-taste'
  },
  {
    name: 'canvas-ui',
    desc: 'Component primitives and canvas-based interactive UI elements',
    githubUrl: 'https://github.com/DavidHDev/canvas-ui',
    folder: 'canvas-ui'
  },
  {
    name: 'paper-shaders',
    desc: 'Paper design WebGL / GLSL shaders for tactile web surfaces',
    githubUrl: 'https://github.com/paper-design/shaders',
    folder: 'paper-shaders'
  },
  {
    name: 'ui-layouts',
    desc: 'Collection of modern responsive UI layouts and grid structures',
    githubUrl: 'https://github.com/ui-layouts/uilayouts',
    folder: 'ui-layouts'
  },
  {
    name: 'hyperiux-components',
    desc: 'Immersive spatial UI components, glassmorphism and 3D interactions',
    githubUrl: 'https://github.com/Hyperiux-Immersion-Labs/hyperiux-components',
    folder: 'hyperiux-components'
  },
  {
    name: 'motion-primitives',
    desc: 'Advanced UI animation and motion primitives built on Framer Motion',
    githubUrl: 'https://github.com/ibelick/motion-primitives',
    folder: 'motion-primitives'
  },
  {
    name: 'cursify',
    desc: 'Interactive custom cursor animations and hover effect harnesses',
    githubUrl: 'https://github.com/ui-layouts/cursify',
    folder: 'cursify'
  },
  {
    name: 'trickle-ui-kit',
    desc: 'Lightweight, modern UI kit components and design specifications',
    githubUrl: 'https://github.com/akaieuan/trickle-UI-kit',
    folder: 'trickle-ui-kit'
  }
];

async function syncFrontendSkills() {
  for (const item of frontendSkills) {
    const targetDir = path.join(rootDir, item.folder);

    if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
      console.log(`[EXISTS] ${item.folder} already present at ${targetDir}`);
      continue;
    }

    console.log(`[CLONING] ${item.name} from ${item.githubUrl}...`);
    const tempDir = path.join(rootDir, `_temp_${item.folder}`);
    try {
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
      execSync(`git clone --depth 1 ${item.githubUrl} "${tempDir}"`, { stdio: 'inherit' });

      // Remove .git directory
      const gitDir = path.join(tempDir, '.git');
      if (fs.existsSync(gitDir)) {
        fs.rmSync(gitDir, { recursive: true, force: true });
      }

      if (fs.existsSync(targetDir)) {
        fs.rmSync(targetDir, { recursive: true, force: true });
      }
      fs.renameSync(tempDir, targetDir);
      console.log(`✔ [DONE] ${item.name} synced successfully!`);
    } catch (err) {
      console.error(`❌ [ERROR] Failed to clone ${item.name}: ${err.message}`);
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    }
  }
}

syncFrontendSkills();
