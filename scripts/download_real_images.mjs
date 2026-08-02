import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const imagesToDownload = [
  // Core Services
  {
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85',
    targets: [
      'public/images/services/web-development.webp',
      'public/images/services/web-development.png'
    ]
  },
  {
    url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=85',
    targets: [
      'public/images/services/mobile-app.webp',
      'public/images/services/mobile-app.png'
    ]
  },
  {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85',
    targets: [
      'public/images/services/custom-software.webp',
      'public/images/services/custom-software.png'
    ]
  },
  {
    url: 'https://images.unsplash.com/photo-1556742049-0a67568d049f?auto=format&fit=crop&w=1200&q=85',
    targets: [
      'public/images/services/delivery.webp',
      'public/images/services/delivery.png'
    ]
  },
  {
    url: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=85',
    targets: [
      'public/images/services/ui-ux.webp',
      'public/images/service-uiux.png'
    ]
  },
  {
    url: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=1200&q=85',
    targets: [
      'public/images/services/cloud-solutions.webp',
      'public/images/service-cloud.png'
    ]
  },
  {
    url: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&w=1200&q=85',
    targets: [
      'public/images/services/seo-services.webp',
      'public/images/service-seo.png'
    ]
  },
  {
    url: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1200&q=85',
    targets: [
      'public/images/services/digital-marketing.webp',
      'public/images/service-marketing.png'
    ]
  },
  // Sub Services
  {
    url: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=1200&q=85',
    targets: ['public/images/services/android-app.webp']
  },
  {
    url: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1200&q=85',
    targets: ['public/images/services/ios-app.webp']
  },
  {
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85',
    targets: ['public/images/services/erp-crm.webp']
  },
  {
    url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=85',
    targets: ['public/images/services/billing-system.webp']
  },
  {
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85',
    targets: ['public/images/services/hosting.webp']
  },
  {
    url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=85',
    targets: ['public/images/services/maintenance.webp']
  },
  // Projects
  {
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85',
    targets: ['public/projects/web-1.webp']
  },
  {
    url: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=85',
    targets: ['public/projects/web-2.webp']
  },
  {
    url: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=85',
    targets: ['public/projects/mobile-1.webp']
  },
  {
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85',
    targets: ['public/projects/mobile-2.webp']
  },
  // Hero & Page Banners
  {
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85',
    targets: ['public/images/services_hero.webp']
  },
  {
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
    targets: ['public/images/industries_hero.webp']
  },
  {
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=85',
    targets: ['public/images/about_hero.webp']
  },
  {
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=85',
    targets: ['public/images/faq_hero.webp']
  },
  {
    url: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1600&q=85',
    targets: ['public/images/contact_hero.webp']
  },
  {
    url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=85',
    targets: ['public/images/hero-poster.jpg']
  },
  {
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
    targets: ['public/images/contact-poster.jpg']
  }
];

async function download() {
  console.log('Downloading real photorealistic images...');
  for (const item of imagesToDownload) {
    try {
      const res = await fetch(item.url);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      for (const targetPath of item.targets) {
        const fullPath = path.resolve(rootDir, targetPath);
        const dir = path.dirname(fullPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(fullPath, buffer);
        console.log(`Saved: ${targetPath}`);
      }
    } catch (err) {
      console.error(`Failed to download ${item.url}:`, err);
    }
  }
  console.log('Done downloading all images!');
}

download();
