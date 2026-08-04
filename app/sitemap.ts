import { MetadataRoute } from 'next';
import { expertiseContent, processContent } from '@/lib/content';
import { stateHubSlugs } from '@/lib/stateSeo';
import { blogPosts } from '@/lib/blogs';
import { getPagesList } from '@/lib/localSeo';
import { getIndustryPagesList, industries } from '@/lib/industrySeo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sabkasaathidigitalservices.com';

  // A single stable "site last updated" date instead of `new Date()` on every
  // build. Stamping every URL with the build timestamp is a false freshness
  // signal; bump this when content materially changes (or wire it to a real
  // per-page date once the content model carries one).
  const lastModified = new Date('2026-07-16');

  const dynamicRoutes = [
    /* State hubs come from lib/stateSeo (23 of them), not from
       lib/content.locationContent — that only ever held three states, so
       twenty hubs would have been missing from the sitemap entirely. They rank
       high here because they are the entry point into the whole location
       tree. */
    ...stateHubSlugs.map((slug) => ({
      url: `${baseUrl}/location/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
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

  // The industry axis: one hub per sector, plus every service × industry leaf.
  // Hubs rank above the leaves because they are the pages we want crawled and
  // recrawled first — they are how the 1,300+ leaves get discovered at all.
  const industryHubs = industries.map((industry) => ({
    url: `${baseUrl}/industries/${industry.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const industryServicePages = getIndustryPagesList().map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  /* Total is ~8,900 URLs. The sitemap protocol caps a single file at 50,000
     URLs / 50 MB, so this still fits in one — but it is within one order of
     magnitude of the limit. If the catalog grows again, split this into a
     sitemap index (Next supports it via generateSitemaps) rather than letting
     the file silently truncate. */
  return [
    ...staticRoutes,
    ...dynamicRoutes,
    ...industryHubs,
    ...localSeoPages,
    ...industryServicePages,
  ];
}
