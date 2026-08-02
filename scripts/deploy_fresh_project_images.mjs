import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const erpSrc = 'C:\\Users\\saras\\.gemini\\antigravity-ide\\brain\\06f422c0-62b2-4bc5-8c5a-468318b6f5ee\\erp_crm_photorealistic_1785655449118.png';
const iosSrc = 'C:\\Users\\saras\\.gemini\\antigravity-ide\\brain\\06f422c0-62b2-4bc5-8c5a-468318b6f5ee\\ios_app_photorealistic_1785655471292.png';
const softwareSrc = 'C:\\Users\\saras\\.gemini\\antigravity-ide\\brain\\06f422c0-62b2-4bc5-8c5a-468318b6f5ee\\custom_software_photorealistic_1785655494694.png';
const billingSrc = 'C:\\Users\\saras\\.gemini\\antigravity-ide\\brain\\06f422c0-62b2-4bc5-8c5a-468318b6f5ee\\billing_system_photorealistic_1785655514905.png';

const newFiles = [
  { src: erpSrc, dest: 'public/projects/school-erp-real.webp' },
  { src: iosSrc, dest: 'public/projects/healthcare-real.webp' },
  { src: softwareSrc, dest: 'public/projects/automation-real.webp' },
  { src: billingSrc, dest: 'public/projects/billing-real.webp' }
];

for (const item of newFiles) {
  if (fs.existsSync(item.src)) {
    const data = fs.readFileSync(item.src);
    const fullDest = path.resolve(rootDir, item.dest);
    fs.writeFileSync(fullDest, data);
    console.log(`Saved fresh file: ${item.dest} (${data.length} bytes)`);
  } else {
    console.error(`Source missing: ${item.src}`);
  }
}

// Clear .next directory cache completely if exists
const nextCache = path.resolve(rootDir, '.next', 'cache');
if (fs.existsSync(nextCache)) {
  fs.rmSync(nextCache, { recursive: true, force: true });
  console.log('Wiped .next/cache directory!');
}

console.log('Finished deploying fresh project image files!');
