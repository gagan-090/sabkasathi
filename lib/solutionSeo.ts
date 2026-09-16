import { solutions, solutionBySlug, type Solution } from "./solutionsCatalog";
import { cities, generateSlug, businessIdentity } from "./localSeo";
import {
  business,
  postalAddressSchema,
  geoCoordinatesSchema,
  openingHoursSchema,
} from "./business";

const SITE = "https://sabkasaathidigitalservices.com";

/*
  Page data for the solutions tier: /solutions/<slug>

  These answer "who builds a Zomato clone / school ERP / WhatsApp bot" — named
  products, as opposed to the service tier ("mobile app development") and the
  industry tier ("software for restaurants"). The 61,182-keyword file the owner
  supplied decomposes to 84 topics; roughly 55 of them were products with no
  page anywhere on the site, and this closes that.

  Deliberately national rather than per-city. "Zomato clone app development
  company" is searched nationally and the answer does not change by city, so
  63 real pages beat 63 × 242 = 15,246 near-identical ones — which is both the
  doorway-page pattern and, at this site's size, an output-bundle problem that
  has already broken a deploy once. City intent is served by linking each
  solution to the city pages that already rank.
*/

export interface SolutionPageData extends Solution {
  path: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** The two-sentence direct answer AI engines and snippets lift verbatim. */
  answer: string;
  /** Search-intent variants clustered onto this page rather than split across pages. */
  intentAnswers: { q: string; a: string }[];
  faqs: { q: string; a: string }[];
  related: { name: string; slug: string }[];
  /** Cities we publish app/software pages for, for local intent. */
  cityLinks: { name: string; url: string }[];
  schemas: Record<string, unknown>[];
}

export const solutionParams = solutions.map((s) => ({ slug: s.slug }));

/* The cities used for the local-intent strip. Kept to a readable number and
   taken from the real serviced list, so every link resolves to a page that
   exists. */
const FEATURED_CITY_SLUGS = [
  "patna", "gaya", "muzaffarpur", "bhagalpur", "ranchi", "jamshedpur",
  "lucknow", "varanasi", "kanpur", "noida", "delhi", "gurugram",
  "mumbai", "pune", "bengaluru", "hyderabad", "ahmedabad", "jaipur",
  "kolkata", "chennai",
];

function serviceSlugFor(solution: Solution): string {
  /* Which existing service page a solution's city links should point at, so
     "…in Patna" intent lands on a page with real local substance. */
  if (/Software|ERP|LMS|CRM|HRMS/i.test(solution.name)) return "software-development";
  if (/Portal|Marketplace|Website|Web/i.test(solution.name)) return "website-development";
  return "mobile-app-development";
}

export function getSolutionPage(slug: string): SolutionPageData | null {
  const s = solutionBySlug.get(slug);
  if (!s) return null;

  const path = `/solutions/${s.slug}`;
  const lower = s.name.toLowerCase();

  const metaTitle = `${s.name} Development Company in India | Sabka Saathi`;
  const metaDescription =
    `${s.whatItIs.slice(0, 110)}… Built by Sabka Saathi from ${s.priceFrom}, ${s.timeline}. ` +
    `Fixed scope, fixed price, GST-registered. Call ${business.phone.display}.`;

  const answer =
    `Sabka Saathi builds ${lower} platforms for ${s.buyer}. ${s.whatItIs} ` +
    `A working first version starts at ${s.priceFrom} and typically takes ${s.timeline.toLowerCase()}, ` +
    `scoped and priced in writing before development begins.`;

  const svc = serviceSlugFor(s);
  const cityLinks = FEATURED_CITY_SLUGS.map((citySlug) => {
    const city = cities.find((c) => c.slug === citySlug);
    return city ? { name: city.name, url: `/${generateSlug(svc, city.slug)}` } : null;
  }).filter((x): x is { name: string; url: string } => x !== null);

  /* Same clustering principle used on the city and state tiers: the keyword
     file expands every topic by {Best, Affordable, Custom, Professional, Hire}
     × {Developer, Company, Agency, Services}. Those are one page's worth of
     intent, answered here. */
  const intentAnswers = [
    {
      q: `How much does ${lower} development cost?`,
      a:
        `A realistic first version starts at ${s.priceFrom}. The range depends on how many of the modules below you ` +
        `actually need on day one — ${s.mvpScope} We quote a fixed price against a written scope, so the number does ` +
        `not move mid-project.`,
    },
    {
      q: `Can I get a cheap or ready-made ${lower}?`,
      a:
        `Ready-made scripts exist and are cheap, and for a pure test they can be reasonable. What they cost you later ` +
        `is control: unfamiliar code, no documentation, and integrations that fight your workflow. We will tell you ` +
        `honestly when a script is the sensible choice and when it is a false economy.`,
    },
    {
      q: `Do you build custom ${lower}, or from a template?`,
      a:
        `Custom, built around how you plan to operate. ${s.whatItIs} The generic version of that is rarely what any ` +
        `specific business needs — the differences show up in ${s.modules[0].toLowerCase()} and in the admin tooling.`,
    },
    {
      q: `Who is this ${lower} for?`,
      a: `Typically ${s.buyer}. If your situation is different, the discovery call is where we work out whether this shape of product fits at all.`,
    },
    {
      q: `What usually goes wrong with a ${lower} project?`,
      a: s.watchOut,
    },
  ];

  const faqs = [
    {
      q: `How long does ${lower} development take?`,
      a: `${s.timeline}. You get a build to test every week rather than waiting until the end.`,
    },
    {
      q: `What is included in the first version?`,
      a: `${s.mvpScope} The full module list is above — anything not in the first release is scheduled, not dropped.`,
    },
    {
      q: `Which integrations does a ${lower} need?`,
      a: `Usually ${s.integrations.join(", ")}. We confirm exact providers during scoping, since commercial terms differ.`,
    },
    {
      q: `Do I own the code?`,
      a:
        `Yes. Source code, hosting, domain and app-store accounts are yours, in your name, handed over at launch. ` +
        `You are never locked in to us to make a change.`,
    },
    {
      q: `Do you provide support after launch?`,
      a:
        `Yes — every project includes a support window, with ongoing maintenance available after it. ` +
        `Reach us on ${business.phone.display} or ${business.email}, ${business.hours.display}.`,
    },
    {
      q: `Can you work with businesses outside Bihar?`,
      a:
        `Yes. We work remotely with clients across India from our office in ${business.address.locality}, Bihar — ` +
        `discovery calls, shared design files and weekly builds. Location does not change the price.`,
    },
  ];

  const related = solutions
    .filter((x) => x.category === s.category && x.slug !== s.slug)
    .slice(0, 6)
    .map((x) => ({ name: x.name, slug: x.slug }));

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    name: business.legalName,
    url: `${SITE}/`,
    telephone: business.phone.e164,
    email: business.email,
    taxID: businessIdentity.gstin,
    founder: { "@type": "Person", name: businessIdentity.founderName },
    address: postalAddressSchema,
    geo: geoCoordinatesSchema,
    openingHoursSpecification: openingHoursSchema,
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE}${path}#service`,
    name: `${s.name} Development`,
    description: s.whatItIs,
    provider: { "@id": `${SITE}/#organization` },
    serviceType: `${s.name} development`,
    areaServed: { "@type": "Country", name: "India" },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      description: `${s.name} development from ${s.priceFrom}, ${s.timeline}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Solutions", item: `${SITE}/solutions` },
      { "@type": "ListItem", position: 3, name: s.name, item: `${SITE}${path}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [...intentAnswers, ...faqs].map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return {
    ...s,
    path,
    metaTitle,
    metaDescription,
    h1: `${s.name} Development Company`,
    answer,
    intentAnswers,
    faqs,
    related,
    cityLinks,
    schemas: [organizationSchema, serviceSchema, breadcrumbSchema, faqSchema],
  };
}
