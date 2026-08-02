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

const maps = [
  { src: erpSrc, dests: ['public/images/services/erp-crm.webp', 'public/images/services/erp-crm.png'] },
  { src: iosSrc, dests: ['public/images/services/ios-app.webp', 'public/images/services/ios-app.png'] },
  { src: softwareSrc, dests: ['public/images/services/custom-software.webp', 'public/images/services/custom-software.png', 'public/images/services/cloud-solutions.webp'] },
  { src: billingSrc, dests: ['public/images/services/billing-system.webp', 'public/images/services/billing-system.png'] }
];

for (const entry of maps) {
  if (fs.existsSync(entry.src)) {
    const buffer = fs.readFileSync(entry.src);
    for (const relDest of entry.dests) {
      const fullPath = path.resolve(rootDir, relDest);
      fs.writeFileSync(fullPath, buffer);
      console.log(`Overwritten ${relDest} (${buffer.length} bytes)`);
    }
  }
}

// Clear .next cache completely
const nextCache = path.resolve(rootDir, '.next');
if (fs.existsSync(nextCache)) {
  fs.rmSync(nextCache, { recursive: true, force: true });
  console.log('Completely wiped .next build directory!');
}

console.log('Done overwriting public/images/services files!');
