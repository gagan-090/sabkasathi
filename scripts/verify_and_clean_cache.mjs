import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Delete Next.js image cache
const nextCacheDir = path.resolve(rootDir, '.next', 'cache');
if (fs.existsSync(nextCacheDir)) {
  fs.rmSync(nextCacheDir, { recursive: true, force: true });
  console.log('Cleared .next/cache directory!');
}

console.log('Verified and cleaned Next.js cache successfully.');
