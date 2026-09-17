import { MetadataRoute } from 'next';
import { getAllSitemapEntries, SITEMAP_CHUNK_SIZE, SITE_BASE_URL } from '@/lib/sitemapData';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_BASE_URL;

  // The sitemap is chunked (see app/sitemap.ts) once the catalog crosses
  // SITEMAP_CHUNK_SIZE URLs, so list every chunk here — a crawler that only
  // ever sees /sitemap/0.xml will never discover the rest of the site.
  const chunkCount = Math.max(1, Math.ceil(getAllSitemapEntries().length / SITEMAP_CHUNK_SIZE));
  const sitemaps =
    chunkCount === 1
      ? `${baseUrl}/sitemap.xml`
      : Array.from({ length: chunkCount }, (_, id) => `${baseUrl}/sitemap/${id}.xml`);

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/private/', '/_next/'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Claude-Web',
          'Google-Extended',
          'Applebot-Extended',
          'Amazonbot',
          'Bytespider',
          'CCBot',
          'Diffbot',
        ],
        allow: '/',
        disallow: ['/admin', '/api', '/private/', '/_next/'],
      },
    ],
    sitemap: sitemaps,
    host: baseUrl,
  };
}
