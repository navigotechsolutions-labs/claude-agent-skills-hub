const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const resolved = JSON.parse(fs.readFileSync(path.join(__dirname, 'resolved_skills.json'), 'utf8'));
const rootDir = path.resolve(__dirname, '..');

async function syncAll() {
  for (const item of resolved) {
    const skillDirName = item.name;
    const targetDir = path.join(rootDir, skillDirName);

    // If already exists and has content, skip
    if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
      console.log(`[EXISTS] ${skillDirName} already present at ${targetDir}`);
      continue;
    }

    if (!item.githubUrl) {
      console.log(`[SKIP] No GitHub URL for ${item.name}`);
      continue;
    }

    console.log(`[CLONING] ${item.name} from ${item.githubUrl}...`);
    const tempDir = path.join(rootDir, `_temp_${skillDirName}`);
    try {
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
      execSync(`git clone --depth 1 ${item.githubUrl} "${tempDir}"`, { stdio: 'inherit' });

      // Remove .git directory so it becomes regular files
      const gitDir = path.join(tempDir, '.git');
      if (fs.existsSync(gitDir)) {
        fs.rmSync(gitDir, { recursive: true, force: true });
      }

      // Rename to targetDir
      if (fs.existsSync(targetDir)) {
        fs.rmSync(targetDir, { recursive: true, force: true });
      }
      fs.renameSync(tempDir, targetDir);
      console.log(`✔ [DONE] ${skillDirName} synced successfully!`);
    } catch (err) {
      console.error(`❌ [ERROR] Failed to clone ${item.name}: ${err.message}`);
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    }
  }
}

syncAll();
