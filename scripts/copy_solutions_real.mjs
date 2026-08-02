import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const schoolPath = 'C:\\Users\\saras\\.gemini\\antigravity-ide\\brain\\06f422c0-62b2-4bc5-8c5a-468318b6f5ee\\school_erp_real_1785655033436.png';
const medicalPath = 'C:\\Users\\saras\\.gemini\\antigravity-ide\\brain\\06f422c0-62b2-4bc5-8c5a-468318b6f5ee\\medical_app_real_1785655048320.png';
const billingPath = 'C:\\Users\\saras\\.gemini\\antigravity-ide\\brain\\06f422c0-62b2-4bc5-8c5a-468318b6f5ee\\billing_system_real_1785655063838.png';

const copies = [
  { src: schoolPath, dests: ['public/images/services/erp-crm.webp', 'public/images/services/erp-crm.png'] },
  { src: medicalPath, dests: ['public/images/services/ios-app.webp', 'public/images/services/ios-app.png'] },
  { src: billingPath, dests: ['public/images/services/billing-system.webp', 'public/images/services/billing-system.png'] }
];

for (const item of copies) {
  if (fs.existsSync(item.src)) {
    const data = fs.readFileSync(item.src);
    for (const dest of item.dests) {
      const fullDest = path.resolve(rootDir, dest);
      fs.writeFileSync(fullDest, data);
      console.log(`Copied to ${dest}`);
    }
  } else {
    console.error(`Source not found: ${item.src}`);
  }
}
console.log('Finished updating solution real images!');
