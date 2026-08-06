import { GEO, GEO_BY_STATE, GEO_PLACED_TOWNS, type GeoDistrict, type GeoState, type GeoTown } from "./geo";
import { PROFILES, type StateProfile } from "./stateSeo";
import { cities, serviceCatalog, generateSlug, contactInfo, businessIdentity } from "./localSeo";
import {
  business,
  postalAddressSchema,
  geoCoordinatesSchema,
  openingHoursSchema,
} from "./business";

const SITE = "https://sabkasaathidigitalservices.com";

/*
  The two levels below the state hub:

    /location/<state>                       state hub      (lib/stateSeo)
    /location/<state>/<district>            district hub   (here)
    /location/<state>/<district>/<town>     town page      (here)

  Why the URL carries all three segments: India reuses town names relentlessly.
  Uttar Pradesh has two Bandas, Chhattisgarh has a Patna, and Ramgarh exists in
  Jharkhand, Rajasthan and Jammu & Kashmir at once. A flat /location/<town>
  would collide; the hierarchy also gives every page a real breadcrumb and
  gives crawlers a path from the state down to the smallest town.

  On thin content: these pages are built from facts that genuinely differ page
  to page — the district, its other towns, the state's own economy and what its
  businesses actually buy, and which nearby city has full service pages. That
  is the honest ceiling for a town of four thousand people. Where a town has
  real depth to offer it gets a service×city page instead (lib/localSeo), and
  this page links to it.
*/

export interface TownPageData {
  town: GeoTown;
  district: GeoDistrict;
  state: GeoState;
  displayState: string;
  profile: StateProfile;
  path: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** The two-sentence direct answer AI engines and snippets lift verbatim. */
  answer: string;
  intro: string;
  demandParagraph: string;
  deliveryParagraph: string;
  role: TownRole;
  /** Other towns in the same district. */
  siblings: GeoTown[];
  /** The nearest town that has full service pages, if any. */
  anchorCity: { name: string; slug: string } | null;
  services: { name: string; shortName: string; url: string }[];
  faqs: { q: string; a: string }[];
  schemas: Record<string, unknown>[];
}

export interface DistrictPageData {
  district: GeoDistrict;
  state: GeoState;
  displayState: string;
  profile: StateProfile;
  path: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  answer: string;
  intro: string;
  townCount: number;
  towns: GeoTown[];
  /** Other districts in the same state, for lateral crawl paths. */
  siblingDistricts: { name: string; slug: string; townCount: number }[];
  anchorCity: { name: string; slug: string } | null;
  services: { name: string; shortName: string; url: string }[];
  faqs: { q: string; a: string }[];
  schemas: Record<string, unknown>[];
}

/* ── lookups ─────────────────────────────────────────────────────────────── */

const citySlugs = new Set(cities.map((c) => c.slug));
const citiesByState = new Map<string, typeof cities>();
for (const city of cities) {
  const slug = stateSlugForName(city.state);
  const list = citiesByState.get(slug);
  if (list) list.push(city);
  else citiesByState.set(slug, [city]);
}

/* lib/localSeo stores a city's state as a display string ("Jammu & Kashmir");
   lib/geo keys everything by slug. Normalise once rather than at each call. */
function stateSlugForName(name: string): string {
  const match = GEO.find((s) => s.state === name);
  if (match) return match.slug;
  return name.toLowerCase().replace(/&/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/* Only states with a hand-written profile get pages below them. A district hub
   whose state has no economic profile would have nothing true to say. */
function resolve(stateSlug: string) {
  const state = GEO_BY_STATE[stateSlug];
  const profile = PROFILES[stateSlug];
  if (!state || !profile) return null;
  return { state, profile, displayState: profile.aka ?? state.state };
}

export function getDistrict(stateSlug: string, districtSlug: string) {
  const base = resolve(stateSlug);
  if (!base) return null;
  const district = base.state.districts.find((d) => d.slug === districtSlug && !d.flat);
  if (!district) return null;
  return { ...base, district };
}

/* ── static params ───────────────────────────────────────────────────────── */

export const districtParams = GEO.filter((s) => PROFILES[s.slug]).flatMap((state) =>
  state.districts
    .filter((d) => !d.flat)
    .map((district) => ({ state: state.slug, district: district.slug }))
);

export const townParams = GEO_PLACED_TOWNS.filter(({ state }) => PROFILES[state.slug]).map(
  ({ state, district, town }) => ({
    state: state.slug,
    district: district.slug,
    town: town.slug,
  })
);

/*
  Prerendered at build time: one town per district — the district's own
  headquarters, which is the town in each district most likely to be searched.
  The rest render on first request and are then cached, the same trade the
  service×city axis makes in app/[slug]/page.tsx. Prerendering all 6,800 would
  add minutes to every deploy for pages that are, by construction, long tail.
*/
export const primaryTownParams = GEO.filter((s) => PROFILES[s.slug]).flatMap((state) =>
  state.districts
    .filter((d) => !d.flat && d.towns.length > 0)
    .map((district) => ({
      state: state.slug,
      district: district.slug,
      town: (district.towns.find((t) => t.slug === district.slug) ?? district.towns[0]).slug,
    }))
);

/* ── shared copy helpers ─────────────────────────────────────────────────── */

type TownRole = "headquarters" | "serviced" | "hub" | "town";

function townRole(town: GeoTown, district: GeoDistrict, profile: StateProfile): TownRole {
  if (citySlugs.has(town.slug)) return "serviced";
  if (profile.hubs.includes(town.name)) return "hub";
  if (town.slug === district.slug || town.name === district.name) return "headquarters";
  return "town";
}

/* The nearest town we publish full service pages for. Same district first,
   then anywhere in the state — this is what turns a town page from a dead end
   into a route to a page with real depth. */
function anchorCityFor(stateSlug: string, district: GeoDistrict) {
  const inState = citiesByState.get(stateSlug) ?? [];
  const inDistrict = inState.find((c) => district.towns.some((t) => t.slug === c.slug));
  const chosen = inDistrict ?? inState[0];
  return chosen ? { name: chosen.name, slug: chosen.slug } : null;
}

/* Service links point at the anchor city's real service pages where one
   exists, and at the service index otherwise — never at an interpolated slug
   that would 404. */
function serviceLinks(anchor: { slug: string } | null) {
  return serviceCatalog.slice(0, 8).map((svc) => ({
    name: svc.name,
    shortName: svc.shortName,
    url: anchor ? `/${generateSlug(svc.slug, anchor.slug)}` : `/services`,
  }));
}

function organizationSchema() {
  return {
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
}

function breadcrumbSchema(
  trail: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE}/locations` },
      ...trail.map((t, i) => ({
        "@type": "ListItem",
        position: i + 3,
        name: t.name,
        item: `${SITE}${t.path}`,
      })),
    ],
  };
}

function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/* ── district page ───────────────────────────────────────────────────────── */

export function getDistrictPage(
  stateSlug: string,
  districtSlug: string
): DistrictPageData | null {
  const found = getDistrict(stateSlug, districtSlug);
  if (!found) return null;

  const { state, district, profile, displayState } = found;
  const path = `/location/${state.slug}/${district.slug}`;
  const townCount = district.towns.length;
  const named = district.towns.slice(0, 5).map((t) => t.name);
  const anchorCity = anchorCityFor(state.slug, district);

  const metaTitle = `Website & Software Development Company in ${district.name} District, ${displayState} | Sabka Saathi`;
  const metaDescription =
    `Web development, mobile apps, custom software and SEO for businesses across ${district.name} district, ` +
    `${displayState} — ${named.slice(0, 3).join(", ")} and ${Math.max(townCount - 3, 0)} more towns. ` +
    `Fixed scope, fixed timeline, GST-registered.`;

  const answer =
    `Sabka Saathi is a GST-registered software and web development company serving ${district.name} district in ` +
    `${displayState}, covering ${named.slice(0, 3).join(", ")} and ${townCount} towns in total. ` +
    `We work remotely from our office in ${business.address.locality}, Bihar — discovery calls, design reviews and ` +
    `weekly builds — so there is no travel cost added to a ${district.name} project, and quotes are fixed before work starts.`;

  const intro =
    `${displayState} is ${profile.economy}. Within it, ${district.name} district covers ${townCount} ` +
    `towns including ${named.join(", ")}. The businesses that come to us from this district are typically ` +
    `${profile.buyers} — and the thing they most often need is ${profile.demand}.`;

  const siblingDistricts = state.districts
    .filter((d) => !d.flat && d.slug !== district.slug)
    .map((d) => ({ name: d.name, slug: d.slug, townCount: d.towns.length }));

  const faqs = [
    {
      q: `Do you work with businesses in ${district.name} district?`,
      a:
        `Yes. We cover all ${townCount} towns in ${district.name} district, from ${named[0]} outward. ` +
        `Delivery is remote — calls, shared design files and weekly builds you can open yourself — which is ` +
        `how we serve ${displayState} without charging travel or site-visit costs.`,
    },
    {
      q: `What does a website cost for a business in ${district.name}?`,
      a:
        `A starter business website runs ₹10,000–₹15,000, a larger custom site or web app ₹18,000–₹35,000, ` +
        `and a full platform with payments, roles and an admin panel from ₹45,000. Every quote is fixed ` +
        `against a written scope before work begins, so the number does not move mid-project.`,
    },
    {
      q: `How long does a project take?`,
      a:
        `Two to three weeks for a standard business website, four to eight weeks for a mobile app or ` +
        `custom software build, depending on how many features are in scope. You get a build to test each week ` +
        `rather than waiting until the end to see it.`,
    },
    {
      q: `Can you handle work in Hindi as well as English?`,
      a:
        `Yes — calls, WhatsApp and written updates in Hindi or English, whichever your team prefers. ` +
        `Sites can ship bilingual where your customers need it. Reach us on ${business.phone.display} ` +
        `between ${business.hours.display.toLowerCase()}.`,
    },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE}${path}#service`,
    name: `Web & Software Development in ${district.name} District`,
    description: metaDescription,
    provider: { "@id": `${SITE}/#organization` },
    serviceType: "Web development, mobile app development, custom software, e-commerce and SEO",
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${district.name} district`,
      containedInPlace: { "@type": "AdministrativeArea", name: state.state },
    },
  };

  return {
    district,
    state,
    displayState,
    profile,
    path,
    metaTitle,
    metaDescription,
    h1: `Website & Software Development Company in ${district.name} District`,
    answer,
    intro,
    townCount,
    towns: district.towns,
    siblingDistricts,
    anchorCity,
    services: serviceLinks(anchorCity),
    faqs,
    schemas: [
      organizationSchema(),
      serviceSchema,
      breadcrumbSchema([
        { name: displayState, path: `/location/${state.slug}` },
        { name: `${district.name} district`, path },
      ]),
      faqSchema(faqs),
    ],
  };
}

/* ── town page ───────────────────────────────────────────────────────────── */

export function getTownPage(
  stateSlug: string,
  districtSlug: string,
  townSlug: string
): TownPageData | null {
  const found = getDistrict(stateSlug, districtSlug);
  if (!found) return null;

  const { state, district, profile, displayState } = found;
  const town = district.towns.find((t) => t.slug === townSlug);
  if (!town) return null;

  const path = `/location/${state.slug}/${district.slug}/${town.slug}`;
  const role = townRole(town, district, profile);
  const siblings = district.towns.filter((t) => t.slug !== town.slug);
  const anchorCity = anchorCityFor(state.slug, district);

  const metaTitle = `Website & Software Development Company in ${town.name}, ${displayState} | Sabka Saathi`;
  const metaDescription =
    `Looking for a website, mobile app or custom software company in ${town.name}, ${district.name} district, ` +
    `${displayState}? Sabka Saathi builds and supports them remotely — fixed scope, fixed price, GST-registered. ` +
    `Call ${business.phone.display}.`;

  /* Role decides the framing so a district headquarters, a town we already
     publish full service pages for, and a small town do not open with the same
     sentence. */
  const roleFraming: Record<TownRole, string> = {
    headquarters: `${town.name} is the headquarters of ${district.name} district, which concentrates the administrative and trading activity of the towns around it`,
    serviced: `${town.name} is one of the ${displayState} towns we publish full service pages for, with its own pricing, timelines and FAQs for each service`,
    hub: `${town.name} is one of ${displayState}'s named commercial centres`,
    town: `${town.name} sits in ${district.name} district, ${displayState}`,
  };

  const answer =
    `Sabka Saathi builds websites, mobile apps and custom business software for companies in ${town.name}, ` +
    `${district.name} district, ${displayState}. We are a GST-registered studio working remotely from ` +
    `${business.address.locality}, Bihar, open ${business.hours.short} — so a ${town.name} business gets ` +
    `the same fixed-scope quote and weekly build schedule as one in a metro, with no travel charged.`;

  const intro =
    `${roleFraming[role]}. ${displayState} as a whole is ${profile.economy}, and that shapes what technology ` +
    `local businesses actually need — not generic software, but tools that fit how they already trade.`;

  const demandParagraph =
    `The businesses we work with in and around ${town.name} are usually ${profile.buyers}. What they ask us for ` +
    `most often is ${profile.demand}. We scope each project against that reality rather than selling a package, ` +
    `which is why a ${town.name} quote is written after a call, not before one.`;

  const deliveryParagraph =
    `Everything is delivered remotely: a discovery call to agree scope, designs you review before any code is ` +
    `written, then a build each week you can open on your own phone. Payments, invoices and support run over ` +
    `WhatsApp and email. Our office is at ${business.address.full}, open ${business.hours.display} — ` +
    `call or message ${business.phone.display} to start.`;

  const nearbyNames = siblings.slice(0, 6).map((t) => t.name);

  const faqs = [
    {
      q: `Do you build websites for businesses in ${town.name}?`,
      a:
        `Yes. We build business websites, e-commerce stores, mobile apps and custom software for clients in ` +
        `${town.name} and across ${district.name} district. Work is done remotely from our ` +
        `${business.address.locality} office, so there is no travel cost on a ${town.name} project.`,
    },
    {
      q: `What does a website cost in ${town.name}?`,
      a:
        `₹10,000–₹15,000 for a starter business site, ₹18,000–₹35,000 for a larger custom site or web app, ` +
        `and from ₹45,000 for a platform with payments, user roles and an admin panel. The quote is fixed ` +
        `against a written scope, so it does not change partway through.`,
    },
    {
      q: `Which other towns near ${town.name} do you cover?`,
      a: nearbyNames.length
        ? `We work across the whole of ${district.name} district — including ${nearbyNames.join(", ")} — and ` +
          `every district of ${displayState}.`
        : `We work across ${district.name} district and every other district of ${displayState}.`,
    },
    {
      q: `How do I get a quote?`,
      a:
        `Call or WhatsApp ${business.phone.display}, or email ${business.email}. We are open ` +
        `${business.hours.display}. Describe what you need in a sentence or two and you get a fixed written ` +
        `quote with a timeline — no charge for the estimate.`,
    },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE}${path}#service`,
    name: `Website & Software Development in ${town.name}`,
    description: metaDescription,
    provider: { "@id": `${SITE}/#organization` },
    serviceType: "Web development, mobile app development, custom software, e-commerce and SEO",
    /* One real office, an honest service area. There is no branch in this
       town and the markup does not claim one — a fabricated per-town
       LocalBusiness is the fastest way to a manual action. */
    areaServed: {
      "@type": "City",
      name: town.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: `${district.name} district`,
        containedInPlace: { "@type": "AdministrativeArea", name: state.state },
      },
    },
  };

  return {
    town,
    district,
    state,
    displayState,
    profile,
    path,
    metaTitle,
    metaDescription,
    h1: `Website & Software Development Company in ${town.name}`,
    answer,
    intro,
    demandParagraph,
    deliveryParagraph,
    role,
    siblings,
    anchorCity,
    services: serviceLinks(anchorCity),
    faqs,
    schemas: [
      organizationSchema(),
      serviceSchema,
      breadcrumbSchema([
        { name: displayState, path: `/location/${state.slug}` },
        { name: `${district.name} district`, path: `/location/${state.slug}/${district.slug}` },
        { name: town.name, path },
      ]),
      faqSchema(faqs),
    ],
  };
}

/* ── counts for hub copy ─────────────────────────────────────────────────── */

export const townSeoStats = {
  districtPages: districtParams.length,
  townPages: townParams.length,
};

export { contactInfo };
