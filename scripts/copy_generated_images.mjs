import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const deliveryPath = 'C:\\Users\\saras\\.gemini\\antigravity-ide\\brain\\06f422c0-62b2-4bc5-8c5a-468318b6f5ee\\delivery_real_1785652674241.png';
const cloudPath = 'C:\\Users\\saras\\.gemini\\antigravity-ide\\brain\\06f422c0-62b2-4bc5-8c5a-468318b6f5ee\\cloud_real_1785652715675.png';

const copies = [
  { src: deliveryPath, dests: ['public/images/services/delivery.webp', 'public/images/services/delivery.png'] },
  { src: cloudPath, dests: ['public/images/services/cloud-solutions.webp', 'public/images/service-cloud.png'] }
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
console.log('Finished copying generated images!');
