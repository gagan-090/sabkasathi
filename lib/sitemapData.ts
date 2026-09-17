import { MetadataRoute } from 'next';
import { expertiseContent, processContent } from '@/lib/content';
import { stateHubSlugs } from '@/lib/stateSeo';
import { blogPosts } from '@/lib/blogs';
import { getPagesList } from '@/lib/localSeo';
import { getIndustryPagesList, industries } from '@/lib/industrySeo';
import { districtParams, townParams } from '@/lib/townSeo';
import { stateServicePagesList } from '@/lib/stateServiceSeo';
import { solutionParams } from '@/lib/solutionSeo';

export const SITE_BASE_URL = 'https://sabkasaathidigitalservices.com';

/* Sitemap protocol caps a single file at 50,000 URLs / 50MB. We chunk well
   under that so growth (more cities, more services) doesn't require another
   emergency migration — see generateSitemaps in app/sitemap.ts. */
export const SITEMAP_CHUNK_SIZE = 20000;

/** The full, unchunked list of every URL in the sitemap. Both app/sitemap.ts
 *  (which slices it into <=SITEMAP_CHUNK_SIZE files) and app/robots.ts (which
 *  needs to know how many chunk files to list) read from this single source
 *  of truth, so the two can never drift out of sync. */
export function getAllSitemapEntries(): MetadataRoute.Sitemap {
  const baseUrl = SITE_BASE_URL;

  // A single stable "site last updated" date instead of `new Date()` on every
  // build. Stamping every URL with the build timestamp is a false freshness
  // signal; bump this when content materially changes (or wire it to a real
  // per-page date once the content model carries one).
  const lastModified = new Date('2026-09-17');

  const dynamicRoutes = [
    /* State hubs come from lib/stateSeo (33+ of them), not from
       lib/content.locationContent — that only ever held three states, so
       twenty-plus hubs would have been missing from the sitemap entirely.
       They rank high here because they are the entry point into the whole
       location tree. */
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

  /* Solutions — named products ("Zomato clone app", "school ERP"). High
     priority: these are national head terms with real search demand, and they
     are the entry point into the solution cluster. */
  const solutionPages = [
    { url: `${baseUrl}/solutions`, lastModified, changeFrequency: 'monthly' as const, priority: 0.9 },
    ...solutionParams.map((p) => ({
      url: `${baseUrl}/solutions/${p.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];

  /* Service × state — "<service> company in <state>". High priority: these are
     head-term commercial pages, and they sit above the city pages that feed
     off them. */
  const stateServicePages = stateServicePagesList().map((p) => ({
    url: `${baseUrl}/${p.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  /* The location tree below each state hub: district hubs and town pages.
     Districts outrank towns here because a district hub is how its towns get
     discovered and recrawled — and because a district page has more to say
     than any single small town in it. */
  const districtPages = districtParams.map((p) => ({
    url: `${baseUrl}/location/${p.state}/${p.district}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const townPages = townParams.map((p) => ({
    url: `${baseUrl}/location/${p.state}/${p.district}/${p.town}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...dynamicRoutes,
    ...industryHubs,
    ...localSeoPages,
    ...industryServicePages,
    ...stateServicePages,
    ...solutionPages,
    ...districtPages,
    ...townPages,
  ];
}
