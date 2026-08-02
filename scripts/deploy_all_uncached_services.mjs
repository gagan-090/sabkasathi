import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const copies = [
  { src: 'public/images/services/web-development.webp', dest: 'public/projects/web-dev-real.webp' },
  { src: 'public/images/services/mobile-app.webp', dest: 'public/projects/mobile-app-real.webp' },
  { src: 'public/images/services/custom-software.webp', dest: 'public/projects/software-dev-real.webp' },
  { src: 'public/images/services/delivery.webp', dest: 'public/projects/ecom-dev-real.webp' },
  { src: 'public/images/services/ui-ux.webp', dest: 'public/projects/uiux-real.webp' },
  { src: 'public/images/services/cloud-solutions.webp', dest: 'public/projects/cloud-real.webp' },
  { src: 'public/images/services/seo-services.webp', dest: 'public/projects/seo-real.webp' },
  { src: 'public/images/services/digital-marketing.webp', dest: 'public/projects/marketing-real.webp' }
];

for (const item of copies) {
  const fullSrc = path.resolve(rootDir, item.src);
  const fullDest = path.resolve(rootDir, item.dest);
  if (fs.existsSync(fullSrc)) {
    const data = fs.readFileSync(fullSrc);
    fs.writeFileSync(fullDest, data);
    console.log(`Copied ${item.src} -> ${item.dest} (${data.length} bytes)`);
  } else {
    console.error(`Missing ${item.src}`);
  }
}

console.log('Finished copying uncached service images!');
