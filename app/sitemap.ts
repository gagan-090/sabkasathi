import { MetadataRoute } from 'next';
import { locationContent, expertiseContent, processContent } from '@/lib/content';
import { blogPosts } from '@/lib/blogs';
import { getPagesList } from '@/lib/localSeo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sabkasaathidigitalservices.com';

  // A single stable "site last updated" date instead of `new Date()` on every
  // build. Stamping every URL with the build timestamp is a false freshness
  // signal; bump this when content materially changes (or wire it to a real
  // per-page date once the content model carries one).
  const lastModified = new Date('2026-07-16');

  const dynamicRoutes = [
    ...Object.keys(locationContent).map((slug) => ({
      url: `${baseUrl}/location/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...Object.keys(expertiseContent).map((slug) => ({
      url: `${baseUrl}/expertise/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...Object.keys(processContent).map((slug) => ({
      url: `${baseUrl}/process/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...Object.keys(blogPosts).map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/trust`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  const localSeoPages = getPagesList().map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...dynamicRoutes, ...localSeoPages];
}
