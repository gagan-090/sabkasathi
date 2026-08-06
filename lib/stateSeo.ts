import { GEO, GEO_BY_STATE, type GeoState } from "./geo";
import {
  services,
  cities,
  contactInfo,
  businessIdentity,
} from "./localSeo";
import {
  postalAddressSchema,
  geoCoordinatesSchema,
  openingHoursSchema,
} from "./business";

const SITE = "https://sabkasaathidigitalservices.com";

/*
  State hub pages — the top of the location tree.

  This exists because the site had 1,936 service×city pages and only three
  state pages (bihar, gujarat, maharashtra, in lib/content.ts). "Web development
  in Bihar" is a state-level query; it is answered by a state page with real
  substance, not by four hundred town pages. Every state now has one.

  The profile below is hand-written per state — economy, the cities that
  actually matter, and what local businesses are usually buying. That is
  deliberate: a state hub assembled purely from a template would be the same
  thin page the tiered plan exists to avoid. Anything derived (district counts,
  town lists, nearby links) comes from lib/geo.ts so it cannot drift.
*/

export interface StateProfile {
  /** How the state is normally searched for, if not the formal name. */
  aka?: string;
  /** One sentence answering "what is this place, commercially". */
  economy: string;
  /** The business types that actually buy software here. */
  buyers: string;
  /** Named hubs, used in prose and in the answer block. */
  hubs: string[];
  /** The concrete thing this state's businesses most often ask us for. */
  demand: string;
}

/* Exported because the district and town pages below the state hub build their
   copy from the same hand-written economics. A town page that invented its own
   idea of what the state's businesses buy would contradict the hub above it. */
export const PROFILES: Record<string, StateProfile> = {
  bihar: {
    economy:
      "an agrarian economy shifting fast toward retail, education and services, with Patna as its commercial and administrative centre",
    buyers:
      "coaching institutes, clinics and diagnostic labs, kirana and wholesale traders, real-estate builders and agri-input dealers",
    hubs: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga", "Purnia"],
    demand:
      "a website that ranks for their own town's name, and a way to take enquiries on WhatsApp instead of losing them to a missed call",
  },
  "uttar-pradesh": {
    economy:
      "India's largest state by population, with distinct industrial belts — leather in Kanpur, IT and services in Noida, brassware in Moradabad, and carpets around Bhadohi",
    buyers:
      "manufacturers and exporters, hospitals and pathology chains, coaching centres, distributors and hospitality operators",
    hubs: ["Lucknow", "Kanpur", "Noida", "Ghaziabad", "Agra", "Varanasi", "Prayagraj"],
    demand:
      "export-ready catalogue sites, dealer and distributor portals, and local SEO that separates them from a crowded market",
  },
  jharkhand: {
    economy:
      "a mineral and heavy-industry state built around steel, coal and mining services, with Ranchi and Jamshedpur as its commercial poles",
    buyers:
      "mining and fabrication suppliers, transport and logistics fleets, coaching institutes, hospitals and equipment dealers",
    hubs: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro Steel City", "Deoghar", "Hazaribag"],
    demand:
      "vendor and tender-facing company sites, RFQ capture, and fleet or dispatch tracking their customers can check themselves",
  },
  maharashtra: {
    economy:
      "India's largest state economy, spanning financial services in Mumbai, IT and manufacturing in Pune, and agro-processing across Nashik and Marathwada",
    buyers:
      "SaaS and fintech startups, manufacturers and auto-component suppliers, hospitality groups, clinics and D2C brands",
    hubs: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Chhatrapati Sambhajinagar"],
    demand:
      "enterprise-grade platforms, custom ERP and dealer portals, and product-led websites that stand up to national competition",
  },
  rajasthan: {
    economy:
      "a tourism, textile and stone-and-mineral economy, with Jaipur's gem and handicraft trade and Jodhpur's furniture export cluster",
    buyers:
      "handicraft and furniture exporters, hotels and travel operators, marble and stone processors, coaching institutes in Kota",
    hubs: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner"],
    demand:
      "export catalogues with enquiry capture, direct hotel booking that avoids OTA commission, and English-language sites for overseas buyers",
  },
  "madhya-pradesh": {
    economy:
      "an agri-processing and manufacturing economy centred on Indore's trade and pharma, Bhopal's institutions, and soybean and wheat belts across the Malwa plateau",
    buyers:
      "agri traders and processors, pharma distributors, education institutions, auto dealers and hospitality operators",
    hubs: ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar"],
    demand:
      "mandi-rate and dealer-facing tools, distributor order portals, and websites that rank across a wide spread of district towns",
  },
  haryana: {
    economy:
      "an auto-manufacturing, IT-services and agri-belt economy, with Gurugram's corporate corridor and the Faridabad–Manesar industrial belt",
    buyers:
      "corporate and IT firms, auto-component manufacturers, real-estate builders, hospitals and staffing agencies",
    hubs: ["Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal", "Hisar"],
    demand:
      "corporate-grade sites, B2B lead capture that survives a procurement review, and NCR-competitive local SEO",
  },
  punjab: {
    economy:
      "an agriculture, hosiery and light-engineering economy, with Ludhiana's textile and cycle-parts clusters and Jalandhar's sports-goods trade",
    buyers:
      "hosiery and sports-goods exporters, agri-machinery dealers, immigration and IELTS consultancies, hospitality operators",
    hubs: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali"],
    demand:
      "export-facing catalogues, overseas-education and visa consultancy funnels, and bilingual sites for a diaspora audience",
  },
  delhi: {
    aka: "Delhi NCR",
    economy:
      "India's capital and its densest concentration of trade, government and services, from Chandni Chowk's wholesale markets to Nehru Place's technology trade",
    buyers:
      "wholesale traders, D2C brands, clinics and specialty hospitals, consultancies, restaurants and event companies",
    hubs: ["Connaught Place", "Dwarka", "Rohini", "Saket", "Karol Bagh", "Nehru Place"],
    demand:
      "locality-level SEO that wins a specific neighbourhood, fast e-commerce, and booking flows that cut phone traffic",
  },
  assam: {
    economy:
      "a tea, oil and cross-border trade economy, with Guwahati as the commercial gateway to the whole North-East",
    buyers:
      "tea estates and traders, oil-and-gas service suppliers, hospitals, tourism operators and regional distributors",
    hubs: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Tezpur", "Nagaon"],
    demand:
      "regional distribution portals, tourism booking, and sites that load properly on patchy mobile connections",
  },
  chhattisgarh: {
    economy:
      "a steel, power and mining economy built around Raipur's trade and the Bhilai–Durg industrial belt",
    buyers:
      "steel and cement traders, mining-equipment suppliers, rice millers, hospitals and education institutions",
    hubs: ["Raipur", "Bhilai Nagar", "Bilaspur", "Korba", "Durg", "Jagdalpur"],
    demand:
      "industrial catalogues with RFQ capture, dealer networks, and plant-facing dashboards",
  },
  uttarakhand: {
    economy:
      "a tourism, pilgrimage and SIDCUL-manufacturing economy, from the Char Dham circuit to the Haridwar–Rudrapur industrial belt",
    buyers:
      "hotels and tour operators, Ayurveda and wellness brands, SIDCUL manufacturers, schools and adventure-sports operators",
    hubs: ["Dehradun", "Haridwar", "Rishikesh", "Haldwani", "Rudrapur", "Roorkee"],
    demand:
      "direct booking engines for stays and yatra packages, and seasonal campaign sites that hold up under peak traffic",
  },
  goa: {
    economy:
      "a tourism, hospitality and real-estate economy with a strong seasonal cycle and a growing remote-work population",
    buyers:
      "hotels, villas and homestays, restaurants and beach shacks, tour and water-sports operators, real-estate agents",
    hubs: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Calangute", "Ponda"],
    demand:
      "commission-free direct booking, multilingual pages for domestic and foreign visitors, and fast seasonal landing pages",
  },
  "jammu-kashmir": {
    aka: "Jammu & Kashmir",
    economy:
      "a horticulture, handicraft and pilgrimage-tourism economy, with the apple and saffron trade alongside pashmina and papier-mâché exports",
    buyers:
      "handicraft and dry-fruit exporters, houseboat and hotel operators, tour operators, horticulture traders",
    hubs: ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur", "Katra"],
    demand:
      "export storefronts that reach buyers outside the valley, and booking flows resilient to connectivity interruptions",
  },
  chandigarh: {
    economy:
      "a planned union territory and the shared capital of Punjab and Haryana, with an IT park, education institutions and a services economy",
    buyers:
      "IT and consulting firms, coaching and test-prep institutes, clinics, restaurants and retail chains",
    hubs: ["Chandigarh", "IT Park", "Mani Majra", "Industrial Area", "Maloya", "Dhanas"],
    demand:
      "polished corporate sites, sector-level local SEO, and booking or admission funnels",
  },
  "west-bengal": {
    economy:
      "an eastern trade, jute and services economy anchored by Kolkata's port, wholesale markets and IT corridor",
    buyers:
      "wholesale traders, jute and leather exporters, hospitals, education institutions and hospitality operators",
    hubs: ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Darjeeling"],
    demand:
      "Bengali-and-English sites, wholesale order portals, and local SEO across a dense metro",
  },
  karnataka: {
    economy:
      "India's technology capital, with Bengaluru's software and startup economy alongside Mysuru's manufacturing and coastal trade",
    buyers:
      "software startups and SaaS firms, hospitals, education institutions, D2C brands and manufacturers",
    hubs: ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi"],
    demand:
      "product-grade engineering, scalable cloud architecture, and design that competes with funded startups",
  },
  gujarat: {
    economy:
      "India's most industrialised state, spanning Surat's diamond and textile trade, Ahmedabad's manufacturing, and the Kandla–Mundra port economy",
    buyers:
      "diamond and textile exporters, chemical and pharma manufacturers, traders, logistics operators and D2C brands",
    hubs: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Bhavnagar"],
    demand:
      "custom ERP and order management at scale, export catalogues, and B2B portals for large dealer networks",
  },
  "tamil-nadu": {
    economy:
      "a manufacturing and export economy, with Chennai's auto and IT corridor, Coimbatore's engineering cluster and Tiruppur's knitwear trade",
    buyers:
      "auto-component and engineering manufacturers, knitwear exporters, hospitals, education institutions",
    hubs: ["Chennai", "Coimbatore", "Madurai", "Tiruppur", "Salem", "Tiruchirappalli"],
    demand:
      "export-facing catalogues, manufacturing and production dashboards, and Tamil-and-English sites",
  },
  telangana: {
    economy:
      "a pharma, IT and services economy centred on Hyderabad's HITEC City and the Genome Valley life-sciences cluster",
    buyers:
      "pharma and life-sciences firms, IT services companies, hospitals, real-estate developers",
    hubs: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
    demand:
      "compliance-aware platforms, enterprise integrations, and product design for a competitive tech market",
  },
  "andhra-pradesh": {
    economy:
      "an agriculture, aquaculture and port-logistics economy, with Visakhapatnam's industrial base and a long coastal trade corridor",
    buyers:
      "aqua exporters, agri traders, port and logistics operators, hospitals, education institutions",
    hubs: ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati", "Kakinada"],
    demand:
      "export documentation and catalogue sites, logistics tracking, and Telugu-and-English local SEO",
  },
  kerala: {
    economy:
      "a services, tourism and remittance-driven economy, with Kochi's port and IT parks and a spice-and-seafood export trade",
    buyers:
      "tourism and Ayurveda operators, spice and seafood exporters, hospitals, education and overseas-recruitment agencies",
    hubs: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Kollam", "Alappuzha"],
    demand:
      "direct booking for stays and wellness packages, export storefronts, and NRI-facing service portals",
  },
  odisha: {
    economy:
      "a mineral, metals and port economy, with Bhubaneswar's services and IT growth alongside Paradip's port trade",
    buyers:
      "mining and metals suppliers, handloom and handicraft exporters, hospitals, education institutions",
    hubs: ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Puri", "Berhampur"],
    demand:
      "industrial supplier catalogues, tender-facing company sites, and Odia-and-English local pages",
  },
  "himachal-pradesh": {
    economy:
      "a tourism, horticulture and pharmaceutical economy, with the Baddi–Barotiwala drug-manufacturing belt and an apple trade running the length of the hills",
    buyers:
      "hotels and homestay operators, pharma and packaging units in Baddi, apple growers and traders, schools and adventure-tourism companies",
    hubs: ["Shimla", "Dharamshala", "Solan", "Baddi", "Mandi", "Kullu"],
    demand:
      "direct booking that avoids OTA commission, GMP-aware manufacturer sites, and pages that rank for a hill town before the aggregators do",
  },
  sikkim: {
    economy:
      "a tourism, pharmaceutical and organic-farming economy — India's first fully organic state, with a large drug-formulation cluster around Gangtok",
    buyers:
      "hotels and trek operators, pharmaceutical formulation units, organic cardamom and ginger exporters, taxi and transport fleets",
    hubs: ["Gangtok", "Namchi", "Rangpo", "Singtam", "Gyalshing", "Mangan"],
    demand:
      "permit-and-booking flows for visitors, export-facing organic produce catalogues, and sites that load on hill-town connections",
  },
  "arunachal-pradesh": {
    economy:
      "a hydropower, horticulture and border-trade economy spread thinly across India's largest north-eastern state",
    buyers:
      "construction and hydropower contractors, government suppliers, orange and kiwi growers, tour and trekking operators",
    hubs: ["Itanagar", "Naharlagun", "Pasighat", "Tezu", "Bomdila", "Ziro"],
    demand:
      "tender-facing company profiles, permit and tour enquiry capture, and lightweight sites that work on limited bandwidth",
  },
  nagaland: {
    economy:
      "a trade-and-services economy with Dimapur as its commercial gateway and Kohima as its administrative centre",
    buyers:
      "wholesale traders and distributors, transport fleets, hospitality and festival-tourism operators, schools and colleges",
    hubs: ["Dimapur", "Kohima", "Mokokchung", "Wokha", "Tuensang", "Zunheboto"],
    demand:
      "distributor and stockist portals, event-and-festival booking pages, and a credible online presence for a largely offline market",
  },
  manipur: {
    economy:
      "a handloom, horticulture and border-trade economy centred on the Imphal Valley and the Moreh crossing into Myanmar",
    buyers:
      "handloom and handicraft producers, border traders, clinics and diagnostic centres, coaching institutes",
    hubs: ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Kakching", "Moreh"],
    demand:
      "craft storefronts that sell outside the state, WhatsApp-first enquiry capture, and bilingual local pages",
  },
  mizoram: {
    economy:
      "a horticulture, handloom and services economy with one of India's highest literacy rates and a heavily digital young population",
    buyers:
      "horticulture and bamboo traders, handloom producers, retail chains in Aizawl, schools and church-run institutions",
    hubs: ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib", "Saiha"],
    demand:
      "simple online storefronts, appointment and enquiry capture, and English-language sites for a young, connected market",
  },
  tripura: {
    economy:
      "a rubber, bamboo and border-trade economy, with Agartala sitting on one of India's busiest land crossings into Bangladesh",
    buyers:
      "rubber and bamboo processors, border-trade exporters and CHAs, hospitals and diagnostic chains, education institutions",
    hubs: ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar", "Belonia", "Khowai"],
    demand:
      "export and customs-facing company sites, catalogue pages for processors, and Bengali-and-English local SEO",
  },
  meghalaya: {
    economy:
      "a tourism, mining and horticulture economy, with Shillong as the north-east's long-standing education and hospitality hub",
    buyers:
      "hotels, homestays and tour operators, limestone and cement suppliers, schools and colleges, retail chains",
    hubs: ["Shillong", "Tura", "Jowai", "Nongpoh", "Baghmara", "Williamnagar"],
    demand:
      "direct booking for stays and tours, supplier and tender-facing sites, and pages that rank for a Khasi or Garo hills town by name",
  },
  puducherry: {
    aka: "Puducherry",
    economy:
      "a tourism, textile and education economy across four coastal enclaves — Puducherry and Karaikal on the Coromandel coast, Mahe in Kerala and Yanam in Andhra",
    buyers:
      "boutique hotels and cafés, garment and textile units, wellness and yoga centres, colleges and medical institutions",
    hubs: ["Puducherry", "Karaikal", "Oulgaret", "Villianur", "Mahe", "Yanam"],
    demand:
      "direct booking that avoids OTA commission, heritage-and-wellness brand sites, and Tamil-and-English local SEO",
  },
  "andaman-nicobar": {
    aka: "Andaman & Nicobar Islands",
    economy:
      "an island tourism, fisheries and shipping economy, with Port Blair as the archipelago's single commercial and administrative centre",
    buyers:
      "resorts, dive schools and tour operators, ferry and shipping agents, fisheries exporters, government suppliers",
    hubs: ["Port Blair", "Havelock Island", "Neil Island", "Rangat", "Mayabunder", "Diglipur"],
    demand:
      "direct booking with ferry and permit logistics built in, and sites fast enough for island connectivity",
  },
  lakshadweep: {
    economy:
      "a coconut, coir and fisheries economy across ten inhabited islands, with a tightly permit-controlled tourism trade",
    buyers:
      "coir and coconut processors, fisheries co-operatives, resort and permit-handling tour operators, government departments",
    hubs: ["Kavaratti", "Agatti", "Minicoy", "Andrott", "Amini", "Kadmat"],
    demand:
      "permit-aware booking enquiry flows, produce catalogues that reach mainland buyers, and very lightweight pages",
  },
  "dadra-nagar-haveli-daman-diu": {
    aka: "Dadra & Nagar Haveli and Daman & Diu",
    economy:
      "a manufacturing and coastal-tourism UT, with Silvassa's textile, plastics and engineering estates alongside the beach trade at Daman and Diu",
    buyers:
      "textile, plastics and engineering manufacturers, packaging units, hotels and resorts, logistics operators serving the Mumbai–Surat corridor",
    hubs: ["Silvassa", "Daman", "Diu", "Khanvel", "Nani Daman", "Ghoghla"],
    demand:
      "B2B manufacturer catalogues and RFQ capture, plus direct booking for weekend-tourism operators",
  },
  ladakh: {
    economy:
      "a high-altitude tourism, handicraft and defence-logistics economy across the Leh and Kargil districts",
    buyers:
      "hotels, camps and trekking outfitters, pashmina and handicraft producers, transport fleets, government and defence suppliers",
    hubs: ["Leh", "Kargil", "Diskit", "Drass", "Padum", "Nubra"],
    demand:
      "season-aware booking and itinerary enquiry, pashmina and craft storefronts that sell year-round, and pages that load on thin connections",
  },
};

export interface StateHubData {
  slug: string;
  state: string;
  /** Search-facing name, e.g. "Jammu & Kashmir". */
  displayName: string;
  profile: StateProfile;
  geo: GeoState;
  districtCount: number;
  townCount: number;
  /** Towns in this state that already have full service pages. */
  servicedCities: { name: string; slug: string }[];
  /**
   * Where this state's "<service> in <state>" links point. Every state in
   * lib/geo.ts currently has at least one serviced city, but a state added
   * without one must not silently emit `/web-development-company-in-` or a
   * Service schema advertising a URL that 404s — so this falls back to the
   * services index instead of interpolating an empty slug.
   */
  serviceHref: (serviceSlug: string) => string;
}

const cityBySlug = new Map(cities.map((c) => [c.slug, c]));

export function getStateHub(slug: string): StateHubData | null {
  const geo = GEO_BY_STATE[slug];
  const profile = PROFILES[slug];
  if (!geo || !profile) return null;

  const districts = geo.districts.filter((d) => !d.flat);
  const townCount = geo.districts.reduce((n, d) => n + d.towns.length, 0);

  /* Towns that already carry service pages are what the hub links to first —
     they are the pages with somewhere to go. */
  const servicedCities = geo.districts
    .flatMap((d) => d.towns)
    .filter((t) => cityBySlug.has(t.slug))
    .map((t) => ({ name: t.name, slug: t.slug }));

  const primaryCity = servicedCities[0];

  return {
    slug,
    state: geo.state,
    displayName: profile.aka ?? geo.state,
    profile,
    geo,
    districtCount: districts.length,
    townCount,
    servicedCities,
    serviceHref: (serviceSlug: string) =>
      primaryCity ? `/${serviceSlug}-company-in-${primaryCity.slug}` : "/services",
  };
}

export const stateHubSlugs = GEO.filter((s) => PROFILES[s.slug]).map((s) => s.slug);

/* ── page assembly ────────────────────────────────────────────────────────── */

export interface StateFaq {
  q: string;
  a: string;
}

export interface StateHubPage extends StateHubData {
  metaTitle: string;
  metaDescription: string;
  /** The two-sentence direct answer AI engines and snippets lift verbatim. */
  answer: string;
  faqs: StateFaq[];
  schemas: Record<string, unknown>[];
}

export function getStateHubPage(slug: string): StateHubPage | null {
  const hub = getStateHub(slug);
  if (!hub) return null;

  const { displayName, profile, districtCount, townCount } = hub;
  const namedHubs = profile.hubs.slice(0, 4);
  const hubList = namedHubs.join(", ");

  /* Subtract the hubs actually named in the sentence, not the whole hubs
     array — and never go below zero. The previous form subtracted all six
     hubs from a town count that could be smaller, so small states shipped a
     live meta description reading "and -1+ other towns". */
  const otherTowns = Math.max(townCount - namedHubs.length, 0);
  const otherTownsPhrase = otherTowns > 0 ? ` and ${otherTowns}+ other towns` : "";

  const metaTitle = `Web Development & Software Company in ${displayName} | Sabka Saathi`;
  const metaDescription =
    `Website development, software, e-commerce and SEO services across ${displayName} — ` +
    `${hubList}${otherTownsPhrase}. Fixed scope, fixed timeline, GST-registered.`;

  /* Answer-first: a direct response in the first two sentences, with the
     numbers stated plainly. This is the block that gets quoted, so it must be
     true without the surrounding page for context. */
  const answer =
    `Sabka Saathi is a GST-registered software and web development company serving ${displayName}, ` +
    `covering ${hubList} and ${townCount.toLocaleString("en-IN")} towns` +
    `${districtCount ? ` across ${districtCount} districts` : ""}. ` +
    `We build websites, e-commerce stores, custom software and SEO for ${profile.buyers.split(",")[0].trim()} ` +
    `and other local businesses, with a fixed scope and a fixed timeline agreed before work starts.`;

  const faqs: StateFaq[] = [
    {
      q: `Which is the best web development company in ${displayName}?`,
      a:
        `Sabka Saathi builds websites and custom software for businesses across ${displayName}, including ${hubList}. ` +
        `We work remotely with clients in all ${townCount.toLocaleString("en-IN")} towns we list, so there is no travel cost added to your quote, ` +
        `and every project is scoped with a written deliverable list and timeline before it begins.`,
    },
    {
      q: `How much does a website cost in ${displayName}?`,
      a:
        `Pricing depends on scope rather than location — a business website, an e-commerce store and a custom platform are very different builds. ` +
        `Each service page lists three tiers with indicative price ranges and what is included, so you can compare before contacting us. ` +
        `We quote a fixed price for an agreed scope rather than billing hourly.`,
    },
    {
      q: `Do you work with businesses in smaller towns in ${displayName}?`,
      a:
        `Yes. We run one HQ and serve clients across ${displayName} remotely — discovery calls, design reviews and weekly builds all happen online. ` +
        `District towns get the same process and pricing as ${profile.hubs[0]}.`,
    },
    {
      q: `What kind of businesses in ${displayName} do you usually work with?`,
      a: `Most often ${profile.buyers}. What they typically need is ${profile.demand}.`,
    },
  ];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    name: "Sabka Saathi",
    url: `${SITE}/`,
    telephone: contactInfo.phone,
    taxID: businessIdentity.gstin,
    founder: { "@type": "Person", name: businessIdentity.founderName },
    email: contactInfo.email,
    address: postalAddressSchema,
    geo: geoCoordinatesSchema,
    openingHoursSpecification: openingHoursSchema,
  };

  /* areaServed is the whole point of a state hub: one real HQ, an honest
     service area. Deliberately no aggregateRating here — review counts we
     cannot evidence are exactly what triggers a manual action. */
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE}/location/${slug}#service`,
    name: `Web & Software Development in ${displayName}`,
    description: metaDescription,
    provider: { "@id": `${SITE}/#organization` },
    serviceType: "Web development, software development, e-commerce and SEO",
    areaServed: {
      "@type": "AdministrativeArea",
      name: hub.state,
      containedInPlace: { "@type": "Country", name: "India" },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Services in ${displayName}`,
      itemListElement: serviceList.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: `${s.name} in ${displayName}` },
        url: `${SITE}${hub.serviceHref(s.slug)}`,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE}/locations` },
      { "@type": "ListItem", position: 3, name: displayName, item: `${SITE}/location/${slug}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return {
    ...hub,
    metaTitle,
    metaDescription,
    answer,
    faqs,
    schemas: [organizationSchema, serviceSchema, breadcrumbSchema, faqSchema],
  };
}

export const serviceList = Object.values(services).map((s) => ({
  slug: s.slug,
  name: s.name,
}));
