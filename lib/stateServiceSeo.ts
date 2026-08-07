import { GEO, GEO_BY_STATE } from "./geo";
import { PROFILES } from "./stateSeo";
import {
  services,
  cities,
  generateSlug,
  contactInfo,
  businessIdentity,
  stats,
  type ServiceInfo,
  type PricingTier,
  type ProcessStep,
} from "./localSeo";
import {
  business,
  postalAddressSchema,
  geoCoordinatesSchema,
  openingHoursSchema,
} from "./business";
import { STATE_SERVICE_SLUGS } from "./stateServiceSlugs";

const SITE = "https://sabkasaathidigitalservices.com";

/*
  Service × state pages: /website-development-company-in-bihar

  The tier that was missing. The site had service × city ("…-in-patna") and one
  generic hub per state ("Web Development & Software Company in Bihar"), so a
  search for "app development company in Bihar" — a state-level query with the
  service named — had no page that matched it. Every competitor ranking for
  that query has a page whose title is the query.

  These live on the same flat /{slug} route as the city pages because the slug
  shape is identical (generateSlug(service, place)); app/[slug]/page.tsx tries
  the city lookup first, then industry, then this. Delhi, Chandigarh and
  Puducherry are excluded: their state slug equals a city slug we already
  publish, and for a city-state that city page *is* the state page — two URLs
  for one place would just compete with each other.
*/


const citySlugSet = new Set(cities.map((c) => c.slug));

/** States that get service pages: has a profile, and its slug is not already a city. */
const eligibleStates = GEO.filter(
  (s) => PROFILES[s.slug] && !citySlugSet.has(s.slug)
);

export interface StateServicePageData {
  slug: string;
  serviceSlug: string;
  stateSlug: string;
  service: ServiceInfo;
  serviceName: string;
  stateName: string;
  displayState: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** The two-sentence direct answer AI engines and snippets lift verbatim. */
  answer: string;
  intro: string;
  demandParagraph: string;
  coverageParagraph: string;
  /** Cities in this state that have a full service page for this service. */
  servicedCities: { name: string; slug: string; url: string }[];
  districtCount: number;
  townCount: number;
  hubs: string[];
  process: ProcessStep[];
  pricing: PricingTier[];
  techStack: string[];
  features: string[];
  benefits: string[];
  industries: string[];
  timeline: string;
  /** "Developer vs company vs agency" style intent variants, answered honestly. */
  intentAnswers: { q: string; a: string }[];
  faqs: { q: string; a: string }[];
  relatedServices: { name: string; url: string }[];
  schemas: Record<string, unknown>[];
}

export function stateServicePagesList() {
  const list: { slug: string; serviceSlug: string; stateSlug: string }[] = [];
  for (const state of eligibleStates) {
    for (const serviceSlug of STATE_SERVICE_SLUGS) {
      if (!services[serviceSlug]) continue;
      list.push({
        slug: generateSlug(serviceSlug, state.slug),
        serviceSlug,
        stateSlug: state.slug,
      });
    }
  }
  return list;
}

const bySlug = new Map(stateServicePagesList().map((p) => [p.slug, p]));

export function getStateServiceBySlug(slug: string): StateServicePageData | null {
  const entry = bySlug.get(slug);
  if (!entry) return null;

  const geo = GEO_BY_STATE[entry.stateSlug];
  const profile = PROFILES[entry.stateSlug];
  const service = services[entry.serviceSlug];
  if (!geo || !profile || !service) return null;

  const displayState = profile.aka ?? geo.state;
  const serviceName = service.name;
  const lower = serviceName.toLowerCase();

  const districtCount = geo.districts.filter((d) => !d.flat).length;
  const townCount = geo.districts.reduce((n, d) => n + d.towns.length, 0);

  /* Real, linkable cities in this state — the page's onward paths, and the
     evidence behind "we cover the state" rather than a bare claim. */
  const servicedCities = cities
    .filter((c) => c.state === geo.state)
    .map((c) => ({
      name: c.name,
      slug: c.slug,
      url: `/${generateSlug(entry.serviceSlug, c.slug)}`,
    }));

  const hubList = profile.hubs.slice(0, 4).join(", ");

  const metaTitle = `${serviceName} Company in ${displayState} | Sabka Saathi`;
  const metaDescription =
    `Looking for a ${lower} company in ${displayState}? Sabka Saathi builds and supports ${lower} ` +
    `projects across ${hubList} and ${townCount.toLocaleString("en-IN")} towns. Fixed scope, fixed price, ` +
    `GST-registered. Call ${business.phone.display}.`;

  const answer =
    `Sabka Saathi is a GST-registered ${lower} company serving ${displayState}, covering ${hubList} and ` +
    `${townCount.toLocaleString("en-IN")} towns across ${districtCount} districts. ` +
    `${service.description} Projects run remotely from our ${business.address.locality} office on fixed written ` +
    `scope and price, typically ${service.timeline.toLowerCase()}.`;

  const intro =
    `${displayState} is ${profile.economy}. That shapes what ${lower} actually has to do here: the businesses ` +
    `buying it are mostly ${profile.buyers}, and what they ask for most often is ${profile.demand}. ` +
    `We scope each ${displayState} project against that rather than selling a fixed package.`;

  const demandParagraph =
    `Whether you search for a ${lower} developer, a ${lower} company, or a ${lower} agency in ${displayState}, ` +
    `you are usually after the same three things: someone who will quote a real number, commit to a date, and ` +
    `still answer the phone after launch. We work to a written scope agreed before the project starts, ship a ` +
    `build you can open every week, and stay reachable on ${business.phone.display} ${business.hours.short}.`;

  const coverageParagraph =
    servicedCities.length > 0
      ? `We deliver ${lower} to businesses in ${servicedCities.slice(0, 6).map((c) => c.name).join(", ")}` +
        `${servicedCities.length > 6 ? ` and ${servicedCities.length - 6} more ${displayState} cities` : ""}, ` +
        `plus every district town in the state. Delivery is remote — discovery calls, shared design files and ` +
        `weekly builds — so there is no travel cost on a ${displayState} project wherever you are in it.`
      : `We deliver ${lower} remotely to businesses across ${displayState} — discovery calls, shared design ` +
        `files and weekly builds, with no travel cost added.`;

  /* The "developer vs company vs agency vs best vs affordable" cluster. These
     are real questions people type; answering them plainly on one page is what
     the owner's own keyword note asks for — cluster the variants, don't mint a
     page per phrase. */
  const intentAnswers = [
    {
      q: `${serviceName} developer or ${lower} company — which do you need in ${displayState}?`,
      a:
        `A freelance developer is cheaper and fine for a small, well-defined job. A company costs more but ` +
        `covers design, testing, deployment and support, and does not disappear when one person gets busy. ` +
        `We are a small registered company (GSTIN ${businessIdentity.gstin}), so you get a written scope, a GST ` +
        `invoice and a named point of contact — which matters if the project has to survive a procurement review.`,
    },
    {
      q: `What does the "best" ${lower} company in ${displayState} actually mean?`,
      a:
        `Ignore anyone claiming to be "the best" — including us. Judge on things you can check: will they put ` +
        `the scope in writing, will they show you work in progress weekly, do they issue GST invoices, and will ` +
        `they hand over the source code. Ask for those four in writing before paying anything.`,
    },
    {
      q: `Is affordable ${lower} in ${displayState} realistic, or does cheap mean bad?`,
      a:
        `Affordable is realistic; free is not. Our ${lower} work starts at ${service.pricing[0]?.priceRange ?? "₹10,000"} ` +
        `for a genuinely small scope. What makes a cheap project go wrong is not the price — it is an unwritten ` +
        `scope, so the work expands and the quote does not. We fix scope and price together before starting.`,
    },
    {
      q: `Do you do custom ${lower}, or only templates?`,
      a:
        `Custom. We start from your workflow, not a theme. Templates are faster and we will say so when one ` +
        `genuinely fits your budget and needs — but the default is a build designed around how your business ` +
        `already runs.`,
    },
  ];

  const faqs = [
    {
      q: `Do you provide ${lower} services across ${displayState}?`,
      a:
        `Yes — ${hubList} and every district town in ${displayState}, ${townCount.toLocaleString("en-IN")} in total. ` +
        `Work is delivered remotely from our office at ${business.address.full}, so location within the state ` +
        `does not change the price or the process.`,
    },
    {
      q: `How much does ${lower} cost in ${displayState}?`,
      a:
        service.pricing
          .map((t) => `${t.name}: ${t.priceRange} (${t.scope.toLowerCase()})`)
          .join(". ") +
        `. Every quote is fixed against a written scope before work starts, so the number does not move mid-project.`,
    },
    {
      q: `How long does a ${lower} project take?`,
      a: `${service.timeline}. You get a build to test each week rather than waiting until the end to see it.`,
    },
    {
      q: `What technologies do you use?`,
      a: `${service.techStack.join(", ")}. We pick from these based on what the project needs, not on what we feel like using.`,
    },
    {
      q: `Which industries in ${displayState} do you build for?`,
      a: `${service.industries.join(", ")} — and the businesses we see most in ${displayState} are ${profile.buyers}.`,
    },
    {
      q: `Do I own the code and the accounts?`,
      a:
        `Yes. Source code, hosting, domain and app-store accounts are yours and stay in your name. ` +
        `We hand over credentials at launch — you are never locked in to us to make a change.`,
    },
    {
      q: `Do you offer support after launch?`,
      a:
        `Yes. Every project includes a support window, and ongoing maintenance is available after it. ` +
        `Reach us on ${business.phone.display} or ${business.email}, ${business.hours.display}.`,
    },
    {
      q: `Can you work in Hindi as well as English?`,
      a:
        `Yes — calls, WhatsApp and written updates in whichever your team prefers, and bilingual sites where ` +
        `your customers need them.`,
    },
    {
      q: `How do I get a quote for a ${displayState} project?`,
      a:
        `Call or WhatsApp ${business.phone.display}, or email ${business.email}. Describe what you need in a ` +
        `sentence or two and you get a fixed written quote with a timeline. There is no charge for the estimate.`,
    },
  ];

  const relatedServices = STATE_SERVICE_SLUGS.filter(
    (s) => s !== entry.serviceSlug && services[s]
  )
    .slice(0, 8)
    .map((s) => ({
      name: services[s].name,
      url: `/${generateSlug(s, entry.stateSlug)}`,
    }));

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
    "@id": `${SITE}/${entry.slug}#service`,
    name: `${serviceName} in ${displayState}`,
    description: metaDescription,
    provider: { "@id": `${SITE}/#organization` },
    serviceType: serviceName,
    /* One real office, an honest service area — no fabricated branch in the
       state, and no invented rating. */
    areaServed: {
      "@type": "AdministrativeArea",
      name: geo.state,
      containedInPlace: { "@type": "Country", name: "India" },
    },
    offers: service.pricing.map((tier) => ({
      "@type": "Offer",
      name: tier.name,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      description: `${tier.scope} — ${tier.priceRange}`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE}/locations` },
      { "@type": "ListItem", position: 3, name: displayState, item: `${SITE}/location/${entry.stateSlug}` },
      { "@type": "ListItem", position: 4, name: `${serviceName} in ${displayState}`, item: `${SITE}/${entry.slug}` },
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
    slug: entry.slug,
    serviceSlug: entry.serviceSlug,
    stateSlug: entry.stateSlug,
    service,
    serviceName,
    stateName: geo.state,
    displayState,
    metaTitle,
    metaDescription,
    h1: `${serviceName} Company in ${displayState}`,
    answer,
    intro,
    demandParagraph,
    coverageParagraph,
    servicedCities,
    districtCount,
    townCount,
    hubs: profile.hubs,
    process: service.process,
    pricing: service.pricing,
    techStack: service.techStack,
    features: service.features,
    benefits: service.benefits,
    industries: service.industries,
    timeline: service.timeline,
    intentAnswers,
    faqs,
    relatedServices,
    schemas: [organizationSchema, serviceSchema, breadcrumbSchema, faqSchema],
  };
}

export const stateServiceStats = {
  pageCount: stateServicePagesList().length,
  stateCount: eligibleStates.length,
  serviceCount: STATE_SERVICE_SLUGS.length,
};

export { stats };
