import { MetadataRoute } from 'next';
import { getAllSitemapEntries, SITEMAP_CHUNK_SIZE } from '@/lib/sitemapData';

/* The catalog crossed 30,000+ URLs once the city-tier expanded past ~800
   real cities, so a single sitemap.xml risked hitting the protocol's 50,000
   URL cap. generateSitemaps splits it into <=SITEMAP_CHUNK_SIZE files at
   /sitemap/[id].xml; app/robots.ts lists every chunk it produces so crawlers
   discover all of them, not just the first. */
export async function generateSitemaps() {
  const total = getAllSitemapEntries().length;
  const chunkCount = Math.max(1, Math.ceil(total / SITEMAP_CHUNK_SIZE));
  return Array.from({ length: chunkCount }, (_, id) => ({ id: String(id) }));
}

export default async function sitemap({
  id,
}: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const chunkId = Number(await id);
  const start = chunkId * SITEMAP_CHUNK_SIZE;
  const end = start + SITEMAP_CHUNK_SIZE;
  return getAllSitemapEntries().slice(start, end);
}
