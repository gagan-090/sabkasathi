import { industryServices, type IndustryServiceInfo } from "./services25";

export interface CityInfo {
  name: string;
  slug: string;
  state: string;
  type: 'major' | 'headquarters' | 'growing' | 'district';
  tagline: string;
  context: string;
  nearby: string[];
}

export interface ProcessStep {
  step: number;
  title: string;
  desc: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  hours: string;
}

export interface PricingTier {
  name: string;
  priceRange: string;
  highlight: boolean;
  scope: string;
  features: string[];
  support: string;
}

// ─────────────────────────────────────────────────────────────────────────
// VERBATIM MOBILE APP LANDING COPY
// Word-for-word content block (only the city name is substituted) used on
// every /mobile-app-development-company-in-{city} page. Kept separate from
// the templated ServiceInfo/LocalPageData fields above so it can be edited
// as a single source of truth without touching the generic page-building
// logic used by the other two services.
// ─────────────────────────────────────────────────────────────────────────
export interface MobileAppFullCopy {
  seoTitle: string;
  metaIntro: string;
  branding: { company: string; tagline: string };
  navigation: string[];
  cta: { callNow: string; quoteButton: string };
  marquee: string[];
  completeServicesSection: {
    heading: string;
    paragraphs: string[];
    features: { title: string; desc: string }[];
  };
  servicesSection: {
    heading: string;
    subheading: string;
    blocks: { title: string; badge: string; desc: string; bullets: string[]; cta: string }[];
  };
  processSection: {
    heading: string;
    subheading: string;
    steps: { step: number; title: string; desc: string; bullets: string[] }[];
  };
  pricingSection: {
    heading: string;
    subheading: string;
    tiers: { name: string; price: string; badge?: string; items: string[]; cta: string }[];
  };
  whyChooseUsSection: {
    heading: string;
    subheading: string;
    items: { title: string; desc: string }[];
  };
  cityDigitalHubSection: {
    heading: string;
    subheading: string;
    intro: string[];
    points: { title: string; desc: string }[];
  };
  quoteFormSection: {
    heading: string;
    subheading: string;
    fields: string[];
  };
  whyChooseCompanySection: {
    heading: string;
    paragraphs: string[];
  };
  faqsSection: {
    heading: string;
    subheading: string;
    items: { q: string; a: string }[];
  };
  leadingItCompanySection: {
    heading: string;
    subheading: string;
    paragraph: string;
    keywords: string;
  };
  contactSection: {
    heading: string;
    subheading: string;
    call: string;
    callNote: string;
    email: string;
    emailNote: string;
    address: string;
    addressNote: string;
  };
  successMetricsSection: {
    heading: string;
    subheading: string;
    metrics: { value: string; label: string }[];
  };
  footer: {
    company: string;
    tagline: string;
    description: string;
    quickLinks: string[];
    servicesList: string[];
    contact: { address: string; phone: string; email: string; hours: string };
    copyright: string;
    legalLinks: string[];
  };
}

export interface ServiceInfo {
  name: string;
  slug: string;
  subtitle: string;
  tagline: string;
  features: string[];
  benefits: string[];
  description: string;
  process: ProcessStep[];
  techStack: string[];
  useCases: string[];
  deliverables: string[];
  timeline: string;
  idealFor: string[];
  industries: string[];
  pricing: PricingTier[];
  marqueeBase: string[];
}

// Fill in your real business details once here — every generated page pulls from this.
// NOTE: address should be your one real, physical HQ address. Schema markup
// below uses this single real address plus an "areaServed" field per page,
// instead of pretending to have a branch office in every city — claiming a
// local presence you don't have violates Google's spam policies and risks a
// site-wide ranking penalty.
export const contactInfo: ContactInfo = {
  phone: "+91-9431673018",
  email: "helpsabkasaathi@gmail.com",
  address: "TODO: your real street address (single HQ)",
  hours: "TODO: your business hours"
};

// Registered business identifiers / region. GSTIN is public (shown in the site
// footer); its "10" state code and the stated HQ place the business in Bihar,
// so addressRegion is honest even before a full street address is supplied.
export const businessIdentity = {
  gstin: "10LAHPK8872L1Z3",
  addressRegion: "Bihar",
  founderName: "Ashish Kumar"
};

// Treat empty or "TODO:"-prefixed values as unset. Used to guard schema/UI so
// placeholder data is never shipped to search engines or rendered on-page —
// fields simply omit themselves until real values replace the TODO markers.
export const isRealValue = (v: string | undefined | null): v is string =>
  Boolean(v && v.trim() !== "" && !v.trim().toUpperCase().startsWith("TODO"));

// Global trust metrics shown across every generated page (footer strip,
// hero stats bar, etc.). Keep these true and update as real numbers grow —
// don't inflate stats on a business/service schema page, that's a common
// trigger for manual review.
export const stats = {
  yearsExperience: "5+",
  projectsDelivered: "50+",
  clientSatisfaction: "100%",
  supportAvailability: "24/7"
};

// The eight original city-page services, written by hand long before the
// 25-service catalog existed. They stay hand-written rather than being folded
// into the generated set below: their copy is richer, and — more importantly —
// their URLs have been live and indexed for months. Regenerating them would
// change published pages for no gain.
const handWrittenServices: Record<string, ServiceInfo> = {
  "mobile-app-development": {
    name: "Mobile App Development",
    slug: "mobile-app-development",
    subtitle: "Custom iOS & Android App Development",
    tagline: "High-performance native and cross-platform apps built with React Native and Flutter.",
    description: "Get your business into your customers' pockets. We design and build secure, fast, and feature-rich mobile applications that scale seamlessly with your growing user base.",
    features: [
      "Cross-Platform Android & iOS App Development",
      "Native Animations & Fluid User Interface UX",
      "Real-time Push Notifications & Deep Linking",
      "Offline Database Synchronization Support",
      "Secure Razorpay API Payment Gateways Integration"
    ],
    benefits: [
      "Reach millions of mobile users directly",
      "Create direct, high-converting marketing channels",
      "Deliver smooth app experiences that drive brand loyalty",
      "Keep users engaged with intelligent automated alerts"
    ],
    process: [
      { step: 1, title: "Discovery & Wireframing", desc: "We map user flows, screens, and core features against your business goals before any code is written." },
      { step: 2, title: "UI/UX Design", desc: "High-fidelity Figma designs covering both iOS and Android design language, reviewed with you before development starts." },
      { step: 3, title: "App Development", desc: "Cross-platform build in React Native or Flutter, with weekly builds you can install and test on your own device." },
      { step: 4, title: "QA & Device Testing", desc: "Testing across multiple screen sizes, OS versions, and real network conditions to catch issues before launch." },
      { step: 5, title: "Store Submission", desc: "We handle Play Store and App Store listing, screenshots, and submission requirements end-to-end." },
      { step: 6, title: "Launch & Support", desc: "Post-launch monitoring, crash reporting, and a support window to fix issues that surface with real users." }
    ],
    techStack: ["React Native", "Flutter", "Firebase", "Node.js", "MongoDB", "Razorpay SDK", "Expo", "REST & GraphQL APIs"],
    useCases: [
      "On-demand service and booking apps",
      "Local marketplace and delivery apps",
      "Loyalty and rewards apps for retail chains",
      "Field staff and logistics tracking apps",
      "Community and membership apps"
    ],
    deliverables: [
      "Fully functional Android & iOS app",
      "Admin panel to manage app content and users",
      "Source code and documentation",
      "Play Store & App Store listing",
      "1 year of maintenance support"
    ],
    timeline: "4–8 weeks depending on feature scope",
    idealFor: ["Retail chains", "Service businesses", "Delivery & logistics", "Local marketplaces"],
    industries: ["Education", "Healthcare", "E-commerce & retail", "Real estate", "Local services & field teams"],
    pricing: [
      {
        name: "Starter",
        priceRange: "₹10,000 – ₹15,000",
        highlight: false,
        scope: "Simple single-purpose app",
        features: ["3–5 screens", "Basic UI/UX design", "Core feature set only", "Single platform (Android or iOS)"],
        support: "1 month support"
      },
      {
        name: "Growth",
        priceRange: "₹18,000 – ₹35,000",
        highlight: true,
        scope: "Medium complexity, cross-platform app",
        features: ["8–12 screens", "Advanced UI/UX design", "Push notifications & deep linking", "Android + iOS from one codebase"],
        support: "3 months support"
      },
      {
        name: "Enterprise",
        priceRange: "₹45,000 – ₹1,00,000+",
        highlight: false,
        scope: "Complex, multi-role app with backend automation",
        features: ["Unlimited screens", "Custom feature engineering", "Payment gateway + admin panel", "Offline sync & role-based access"],
        support: "6 months support"
      }
    ],
    marqueeBase: [
      "High-Performance Mobile App Development",
      "Native Android & iOS Development",
      "Cross-Platform Apps with React Native & Flutter",
      "Secure Payment Gateway Integration",
      "24/7 App Support & Maintenance"
    ]
  },
  "website-development": {
    name: "Website Development",
    slug: "website-development",
    subtitle: "Premium Next.js Web Applications",
    tagline: "Superfast websites optimized for Google search rankings and business leads.",
    description: "Your website is your digital storefront. We construct lightning-fast web applications using Next.js 15, ensuring complete responsive design and top search engine ranks from day one.",
    features: [
      "Next.js 15 React Server Components Framework",
      "100% Responsive Mobile-First CSS Fluid Layouts",
      "Clean, Semantic HTML Coding for Technical SEO",
      "Advanced Dynamic Framer Motion Page Animations",
      "Free Enterprise SSL & Managed High-Speed Edge Hosting"
    ],
    benefits: [
      "Rank on search results for competitive keywords",
      "Load pages in milliseconds to prevent user drop-off",
      "Turn casual website visitors into qualified paying leads",
      "Establish visual credibility with high-fidelity UI design"
    ],
    process: [
      { step: 1, title: "Strategy & Sitemap", desc: "We define pages, user journeys, and the keywords each page needs to rank for before design begins." },
      { step: 2, title: "Visual Design", desc: "A custom visual identity — not a template — designed around your brand and industry." },
      { step: 3, title: "Development", desc: "Built on Next.js for speed and SEO, with clean semantic markup search engines can actually parse." },
      { step: 4, title: "Content & SEO Setup", desc: "On-page SEO, meta tags, schema markup, and structured content baked in from the start." },
      { step: 5, title: "Testing & Launch", desc: "Cross-browser and mobile testing, performance audits, then deployment to production hosting." },
      { step: 6, title: "Post-Launch Support", desc: "Analytics setup, monitoring, and a support window for fixes and small updates." }
    ],
    techStack: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel Hosting", "Firebase / MongoDB"],
    useCases: [
      "Business & corporate websites",
      "Local service landing pages",
      "E-commerce storefronts",
      "Multi-location SEO landing pages",
      "Portfolio & agency sites"
    ],
    deliverables: [
      "Fully responsive, SEO-optimized website",
      "Content management setup",
      "Google Search Console & Analytics setup",
      "SSL, hosting, and domain configuration",
      "1 year of maintenance support"
    ],
    timeline: "1–3 weeks for standard sites, longer for custom builds",
    idealFor: ["Local businesses", "Startups", "Retailers", "Service providers"],
    industries: ["Local services", "Retail & e-commerce", "Hospitality & tourism", "Education", "Professional services"],
    pricing: [
      {
        name: "Starter",
        priceRange: "₹6,000 – ₹12,000",
        highlight: false,
        scope: "Single-page or brochure-style site",
        features: ["Up to 5 pages", "Mobile-responsive layout", "Basic on-page SEO", "Contact form integration"],
        support: "1 month support"
      },
      {
        name: "Growth",
        priceRange: "₹15,000 – ₹25,000",
        highlight: true,
        scope: "Multi-page business or lead-gen site",
        features: ["Up to 12 pages", "Custom design & animations", "Full technical SEO setup", "Analytics + Search Console setup"],
        support: "3 months support"
      },
      {
        name: "Enterprise",
        priceRange: "₹35,000+",
        highlight: false,
        scope: "E-commerce or multi-location SEO site",
        features: ["Unlimited pages", "E-commerce / booking functionality", "Multi-location landing pages", "Priority hosting & CDN setup"],
        support: "6 months support"
      }
    ],
    marqueeBase: [
      "Blazing-Fast Next.js Websites",
      "Mobile-First Responsive Design",
      "Built for Google Search Rankings",
      "Free SSL & Managed Hosting",
      "24/7 Website Support & Maintenance"
    ]
  },
  "software-development": {
    name: "Software Development",
    slug: "software-development",
    subtitle: "Custom CRM & Business SaaS Systems",
    tagline: "Custom admin dashboards, databases, and workflow automation tools.",
    description: "Optimize operations and eliminate manual errors. We build customized software systems, CRM pipelines, and backend APIs tailored to automate your specific business workflows.",
    features: [
      "Custom ERP & SaaS Systems Engineering",
      "Automated Sales Lead Funnels & Management",
      "Unified WhatsApp API & SMS Notifications",
      "Secure Node.js Backends & MongoDB Databases",
      "Role-Based Administrative Access Control Panels"
    ],
    benefits: [
      "Eliminate repetitive manual data entry tasks",
      "Get real-time business performance analytics",
      "Automate lead follow-ups and client billing pipelines",
      "Secure corporate databases with cloud encryption"
    ],
    process: [
      { step: 1, title: "Process Mapping", desc: "We study your current manual workflow to identify exactly what should be automated and how." },
      { step: 2, title: "System Architecture", desc: "Database schema, API structure, and access-control design planned before development." },
      { step: 3, title: "Core Development", desc: "Build of the admin dashboard, automation logic, and integrations (WhatsApp, payments, SMS)." },
      { step: 4, title: "Internal Testing", desc: "Testing with your real data and workflows so the system fits how your team actually works." },
      { step: 5, title: "Team Onboarding", desc: "Training sessions so your staff can use the system confidently from day one." },
      { step: 6, title: "Go-Live & Support", desc: "Production rollout with a support window for adjustments as real usage surfaces edge cases." }
    ],
    techStack: ["Node.js", "Express", "MongoDB", "PostgreSQL", "React", "WhatsApp Business API", "Razorpay", "AWS / Vercel"],
    useCases: [
      "Sales & lead management CRMs",
      "Inventory and billing systems",
      "Staff and attendance tracking tools",
      "Client onboarding automation",
      "Custom internal business dashboards"
    ],
    deliverables: [
      "Custom-built software system",
      "Admin dashboard with role-based access",
      "API documentation",
      "Data migration from existing systems (if any)",
      "1 year of maintenance support"
    ],
    timeline: "4–8 weeks depending on complexity",
    idealFor: ["Growing businesses", "Multi-branch operations", "Agencies", "Distributors & wholesalers"],
    industries: ["Distribution & wholesale", "Agencies", "Multi-branch retail", "Manufacturing", "Professional services"],
    pricing: [
      {
        name: "Starter",
        priceRange: "₹30,000 – ₹60,000",
        highlight: false,
        scope: "Single-workflow automation tool",
        features: ["One core workflow automated", "Basic admin dashboard", "Single-user role", "Standard database setup"],
        support: "1 month support"
      },
      {
        name: "Growth",
        priceRange: "₹60,000 – ₹1,20,000",
        highlight: true,
        scope: "Multi-module CRM or ERP system",
        features: ["Multiple automated workflows", "Role-based access control", "WhatsApp / SMS integration", "Real-time analytics dashboard"],
        support: "3 months support"
      },
      {
        name: "Enterprise",
        priceRange: "₹1,20,000+",
        highlight: false,
        scope: "Full custom ERP / SaaS platform",
        features: ["Unlimited modules & users", "Multi-branch data architecture", "Custom API & third-party integrations", "Dedicated onboarding & training"],
        support: "6 months support"
      }
    ],
    marqueeBase: [
      "Custom CRM & ERP Automation",
      "Secure Node.js Backend Engineering",
      "WhatsApp API Business Integration",
      "Role-Based Admin Dashboards",
      "24/7 System Support & Maintenance"
    ]
  },
  "ui-ux-design": {
    name: "UI/UX Design",
    slug: "ui-ux-design",
    subtitle: "Website, App & Product Interface Design",
    tagline: "Research-driven interface design that turns visitors into customers.",
    description: "Great design is more than looks — it's how easily people get things done. We design intuitive, conversion-focused interfaces for websites, mobile apps, and software, backed by user research and tested prototypes before a single line of code is written.",
    features: [
      "User Research & Customer Journey Mapping",
      "Wireframing & Interactive Figma Prototypes",
      "Reusable Design Systems & Component Libraries",
      "Conversion-Focused Landing Page Design",
      "Accessibility & Mobile-First Design Standards"
    ],
    benefits: [
      "Reduce drop-offs with intuitive user flows",
      "Ship faster with a reusable design system",
      "Increase conversions with tested layouts",
      "Build a consistent, credible brand experience"
    ],
    process: [
      { step: 1, title: "Research & Discovery", desc: "We study your users, competitors, and business goals to understand what the interface actually needs to achieve." },
      { step: 2, title: "Wireframing", desc: "Low-fidelity structure of every screen and flow, agreed with you before any visual design begins." },
      { step: 3, title: "Visual Design", desc: "High-fidelity screens with your brand's colours, type, and imagery — polished and pixel-accurate in Figma." },
      { step: 4, title: "Interactive Prototype", desc: "A clickable prototype so you can feel the product and test real journeys before development." },
      { step: 5, title: "Usability Testing", desc: "We validate the design with real users, refine friction points, and iterate on what the data shows." },
      { step: 6, title: "Developer Handoff", desc: "A clean design system, specs, and assets handed to developers so the build matches the design exactly." }
    ],
    techStack: ["Figma", "Adobe XD", "Framer", "Design Tokens", "Prototyping", "Design Systems", "Accessibility (WCAG)"],
    useCases: [
      "Website & landing page redesigns",
      "Mobile app UI/UX from scratch",
      "SaaS dashboard and admin panel design",
      "Design systems for growing product teams",
      "Conversion rate optimisation redesigns"
    ],
    deliverables: [
      "Full Figma design file (all screens)",
      "Interactive clickable prototype",
      "Reusable design system & components",
      "Exported assets and developer specs",
      "Design revisions within scope"
    ],
    timeline: "1–3 weeks depending on screen count",
    idealFor: ["Startups", "SaaS products", "Local businesses", "App founders"],
    industries: ["SaaS & startups", "E-commerce & retail", "Education", "Healthcare", "Professional services"],
    pricing: [
      {
        name: "Starter",
        priceRange: "₹8,000 – ₹18,000",
        highlight: false,
        scope: "Single landing page or small screen set",
        features: ["Up to 4 screens", "Wireframes + visual design", "1 revision round", "Mobile + desktop layouts"],
        support: "2 weeks post-handoff support"
      },
      {
        name: "Growth",
        priceRange: "₹18,000 – ₹45,000",
        highlight: true,
        scope: "Full website or app UI/UX",
        features: ["Up to 15 screens", "Interactive prototype", "Design system starter", "2 revision rounds"],
        support: "1 month post-handoff support"
      },
      {
        name: "Enterprise",
        priceRange: "₹45,000+",
        highlight: false,
        scope: "Product design system + ongoing design",
        features: ["Unlimited screens", "Full design system", "Usability testing", "Dedicated product designer"],
        support: "3 months design support"
      }
    ],
    marqueeBase: [
      "Research-Driven UI/UX Design",
      "Conversion-Focused Interface Design",
      "Website & Mobile App Design",
      "Reusable Design Systems",
      "Usability-Tested Prototypes"
    ]
  },
  "seo-services": {
    name: "SEO Services",
    slug: "seo-services",
    subtitle: "Technical, On-Page & Local SEO",
    tagline: "Rank higher on Google and turn organic search into a steady stream of leads.",
    description: "Being invisible on Google costs you customers every day. We run technical, on-page, and local SEO campaigns grounded in real keyword research and clean measurement — so your business shows up when people in your area search for what you offer.",
    features: [
      "Technical SEO Audit & Site-Speed Fixes",
      "Keyword Research & Search-Intent Mapping",
      "On-Page Optimisation & Schema Markup",
      "Google Business Profile & Local SEO",
      "Content Strategy & Authority Link Building"
    ],
    benefits: [
      "Get found for the terms your customers search",
      "Win local map-pack and 'near me' visibility",
      "Turn organic traffic into qualified leads",
      "Build long-term traffic you don't pay per click for"
    ],
    process: [
      { step: 1, title: "SEO Audit", desc: "A full technical, on-page, and off-page audit to find exactly what's holding your rankings back." },
      { step: 2, title: "Keyword & Competitor Research", desc: "We map the keywords worth ranking for by search intent and difficulty, and study who's currently winning them." },
      { step: 3, title: "Technical Fixes", desc: "Site speed, crawlability, indexing, schema, and Core Web Vitals fixed so search engines can rank you." },
      { step: 4, title: "On-Page & Content", desc: "Titles, meta, headings, internal links, and content optimised around the target keywords." },
      { step: 5, title: "Local SEO & Authority", desc: "Google Business Profile, citations, and quality backlinks to build local and topical authority." },
      { step: 6, title: "Reporting & Iteration", desc: "Monthly ranking, traffic, and lead reports — with the next month's priorities based on what's working." }
    ],
    techStack: ["Google Search Console", "GA4", "Ahrefs / SEMrush", "Schema.org", "Core Web Vitals", "Google Business Profile"],
    useCases: [
      "Local business 'near me' visibility",
      "Multi-location and service-area SEO",
      "E-commerce category and product SEO",
      "New website launch SEO foundation",
      "Recovering from a ranking drop"
    ],
    deliverables: [
      "Full SEO audit report",
      "Keyword map and content plan",
      "On-page and technical optimisation",
      "Google Business Profile optimisation",
      "Monthly ranking & traffic reporting"
    ],
    timeline: "Ongoing monthly campaign; first results in 8–12 weeks",
    idealFor: ["Local businesses", "Clinics & professionals", "E-commerce stores", "Service providers"],
    industries: ["Local services", "Healthcare & clinics", "E-commerce & retail", "Real estate", "Education & coaching"],
    pricing: [
      {
        name: "Starter",
        priceRange: "₹8,000 – ₹15,000 / month",
        highlight: false,
        scope: "Local SEO for a single-location business",
        features: ["Up to 10 target keywords", "Google Business Profile setup", "On-page optimisation", "Monthly report"],
        support: "Email support"
      },
      {
        name: "Growth",
        priceRange: "₹15,000 – ₹35,000 / month",
        highlight: true,
        scope: "Competitive local or multi-service SEO",
        features: ["Up to 40 target keywords", "Technical + on-page SEO", "Content & link building", "Bi-weekly reporting"],
        support: "Priority support"
      },
      {
        name: "Enterprise",
        priceRange: "₹35,000+ / month",
        highlight: false,
        scope: "Multi-location or e-commerce SEO",
        features: ["Unlimited keyword scope", "Full technical + content team", "Digital PR & authority links", "Dedicated SEO manager"],
        support: "Dedicated account manager"
      }
    ],
    marqueeBase: [
      "Technical & Local SEO Services",
      "Rank Higher on Google Search",
      "Keyword Research & On-Page SEO",
      "Google Business Profile Optimisation",
      "Measurable Monthly SEO Reporting"
    ]
  },
  "digital-marketing": {
    name: "Digital Marketing",
    slug: "digital-marketing",
    subtitle: "Performance Ads & Social Media Marketing",
    tagline: "Paid campaigns and social growth engineered to bring in leads and sales.",
    description: "We run measurable digital marketing campaigns — Google Ads, Meta Ads, and social media — built around a clear cost-per-lead target. Every rupee is tracked, so you know exactly what your marketing spend is bringing back.",
    features: [
      "Google Ads & Meta (Facebook/Instagram) Ads",
      "Conversion Tracking & Landing Page Funnels",
      "Social Media Management & Content Calendar",
      "WhatsApp & Email Marketing Automation",
      "Transparent ROI & Cost-Per-Lead Reporting"
    ],
    benefits: [
      "Generate leads within days, not months",
      "Only pay for measurable, tracked results",
      "Reach the exact audience for your offer",
      "Retarget visitors who didn't convert the first time"
    ],
    process: [
      { step: 1, title: "Goal & Audience Setup", desc: "We define your target cost-per-lead, ideal audience, and the offer that will convert them." },
      { step: 2, title: "Funnel & Tracking", desc: "Landing pages and conversion tracking set up first, so no ad spend is wasted on a leaky funnel." },
      { step: 3, title: "Campaign Build", desc: "Ad creatives, copy, and precise targeting built across Google and Meta for your budget." },
      { step: 4, title: "Launch & Optimise", desc: "Campaigns go live and we optimise daily — pausing losers, scaling winners." },
      { step: 5, title: "Retargeting", desc: "We re-engage visitors and warm audiences to lift conversion rates and lower cost-per-lead." },
      { step: 6, title: "Report & Scale", desc: "Clear reporting on spend, leads, and ROI, with a plan to scale what's profitable." }
    ],
    techStack: ["Google Ads", "Meta Ads Manager", "GA4", "Google Tag Manager", "Meta Pixel", "Email/WhatsApp Automation"],
    useCases: [
      "Lead generation for local services",
      "E-commerce sales and ROAS campaigns",
      "App install campaigns",
      "Real estate and education enquiries",
      "Event and launch promotions"
    ],
    deliverables: [
      "Campaign strategy & funnel setup",
      "Ad creatives and copy",
      "Conversion tracking configuration",
      "Ongoing campaign optimisation",
      "Monthly ROI & lead reporting"
    ],
    timeline: "Ongoing monthly campaign; leads typically within 1–2 weeks",
    idealFor: ["Local businesses", "E-commerce brands", "Real estate", "Coaching & education"],
    industries: ["E-commerce & retail", "Real estate", "Education & coaching", "Healthcare", "Local services"],
    pricing: [
      {
        name: "Starter",
        priceRange: "₹10,000 – ₹18,000 / month",
        highlight: false,
        scope: "Single-platform lead-gen campaign",
        features: ["One platform (Google or Meta)", "Up to 2 campaigns", "Conversion tracking", "Monthly report"],
        support: "Email support"
      },
      {
        name: "Growth",
        priceRange: "₹18,000 – ₹40,000 / month",
        highlight: true,
        scope: "Multi-platform performance marketing",
        features: ["Google + Meta Ads", "Landing page + funnel", "Retargeting campaigns", "Bi-weekly reporting"],
        support: "Priority support"
      },
      {
        name: "Enterprise",
        priceRange: "₹40,000+ / month",
        highlight: false,
        scope: "Full-funnel growth marketing",
        features: ["Ads + social + email/WhatsApp", "Creative production", "Advanced funnel automation", "Dedicated marketing manager"],
        support: "Dedicated account manager"
      }
    ],
    marqueeBase: [
      "Performance Digital Marketing",
      "Google Ads & Meta Ads Campaigns",
      "Lead Generation & Retargeting",
      "Social Media Management",
      "Transparent ROI Reporting"
    ]
  },
  "ecommerce-development": {
    name: "E-commerce Development",
    slug: "ecommerce-development",
    subtitle: "Online Stores & Marketplace Platforms",
    tagline: "Fast, secure online stores built to sell — from first product to scale.",
    description: "Whether you're launching your first online store or outgrowing a template, we build fast, secure e-commerce platforms with smooth checkout, real inventory control, and payment gateways your customers trust — designed to turn browsers into buyers.",
    features: [
      "Custom Storefronts & Shopify Development",
      "Secure UPI, Card & Razorpay Checkout",
      "Inventory, Order & Catalogue Management",
      "Abandoned-Cart Recovery & Offers Engine",
      "SEO-Ready Product Pages & Fast Loading"
    ],
    benefits: [
      "Sell online 24/7 with a frictionless checkout",
      "Manage stock and orders from one dashboard",
      "Recover lost sales with cart automation",
      "Scale from a few products to thousands"
    ],
    process: [
      { step: 1, title: "Store Planning", desc: "We map your catalogue, categories, shipping, and payment needs before design begins." },
      { step: 2, title: "Design", desc: "A branded storefront designed for trust and conversion, not a generic template." },
      { step: 3, title: "Store Build", desc: "Custom or Shopify build with product management, checkout, and payment integration." },
      { step: 4, title: "Payments & Shipping", desc: "UPI, cards, and Razorpay wired in, plus shipping, tax, and order-flow configuration." },
      { step: 5, title: "Testing & Launch", desc: "Full checkout, payment, and mobile testing before we take the store live." },
      { step: 6, title: "Growth & Support", desc: "Analytics, cart recovery, and support so the store keeps selling and improving after launch." }
    ],
    techStack: ["Next.js Commerce", "Shopify", "Razorpay", "Stripe", "MongoDB", "Headless CMS", "Tailwind CSS"],
    useCases: [
      "D2C brand online stores",
      "Local retailer online catalogues",
      "Multi-vendor marketplaces",
      "Subscription and repeat-order stores",
      "Wholesale / B2B ordering portals"
    ],
    deliverables: [
      "Fully functional online store",
      "Payment gateway integration",
      "Inventory & order management panel",
      "Product SEO & analytics setup",
      "1 year of maintenance support"
    ],
    timeline: "2–5 weeks depending on catalogue size",
    idealFor: ["D2C brands", "Local retailers", "Wholesalers", "Manufacturers"],
    industries: ["Retail & e-commerce", "Fashion & lifestyle", "Food & grocery", "Electronics", "Handicrafts & exports"],
    pricing: [
      {
        name: "Starter",
        priceRange: "₹18,000 – ₹35,000",
        highlight: false,
        scope: "Small catalogue store",
        features: ["Up to 50 products", "UPI + card checkout", "Mobile-responsive storefront", "Basic product SEO"],
        support: "1 month support"
      },
      {
        name: "Growth",
        priceRange: "₹35,000 – ₹80,000",
        highlight: true,
        scope: "Full-featured branded store",
        features: ["Unlimited products", "Inventory & order dashboard", "Cart recovery & offers", "Analytics + SEO setup"],
        support: "3 months support"
      },
      {
        name: "Enterprise",
        priceRange: "₹80,000+",
        highlight: false,
        scope: "Marketplace or B2B commerce platform",
        features: ["Multi-vendor / B2B pricing", "Custom integrations & ERP sync", "Advanced automation", "Priority hosting & CDN"],
        support: "6 months support"
      }
    ],
    marqueeBase: [
      "Custom E-commerce Development",
      "Shopify & Next.js Online Stores",
      "Secure UPI & Razorpay Checkout",
      "Inventory & Order Management",
      "SEO-Ready Product Pages"
    ]
  },
  "cloud-devops": {
    name: "Cloud & DevOps",
    slug: "cloud-devops",
    subtitle: "Cloud Infrastructure, Hosting & DevOps",
    tagline: "Reliable cloud infrastructure and automated deployments that scale on demand.",
    description: "Slow, fragile hosting quietly loses you customers and sleep. We set up secure, scalable cloud infrastructure with automated deployments, monitoring, and backups — so your product stays fast and online while you focus on the business.",
    features: [
      "AWS, Google Cloud & Vercel Setup",
      "CI/CD Pipelines & Automated Deployments",
      "Docker Containers & Auto-Scaling",
      "Monitoring, Alerts & Automated Backups",
      "Cloud Migration & Cost Optimisation"
    ],
    benefits: [
      "Keep your product fast and online at scale",
      "Ship updates safely with automated pipelines",
      "Catch issues early with monitoring and alerts",
      "Cut cloud bills with right-sized infrastructure"
    ],
    process: [
      { step: 1, title: "Infrastructure Review", desc: "We assess your current setup, traffic, and reliability needs to design the right cloud architecture." },
      { step: 2, title: "Architecture Design", desc: "A scalable, secure cloud architecture planned for your workload and budget." },
      { step: 3, title: "Provisioning", desc: "Cloud resources, networking, and security configured as reproducible infrastructure-as-code." },
      { step: 4, title: "CI/CD Setup", desc: "Automated build, test, and deploy pipelines so releases are one-click and low-risk." },
      { step: 5, title: "Monitoring & Backups", desc: "Uptime monitoring, alerting, and automated backups so problems surface before customers notice." },
      { step: 6, title: "Handover & Support", desc: "Documentation, runbooks, and a support window so your team can operate the platform confidently." }
    ],
    techStack: ["AWS", "Google Cloud", "Vercel", "Docker", "GitHub Actions", "Terraform", "Nginx", "Monitoring (Grafana)"],
    useCases: [
      "Migrating a site or app to the cloud",
      "Setting up CI/CD for a dev team",
      "Scaling infrastructure for traffic spikes",
      "Reducing hosting and cloud costs",
      "Improving uptime and reliability"
    ],
    deliverables: [
      "Configured cloud infrastructure",
      "Automated CI/CD deployment pipeline",
      "Monitoring, alerting & backup setup",
      "Infrastructure documentation & runbooks",
      "Maintenance and support window"
    ],
    timeline: "1–4 weeks depending on complexity",
    idealFor: ["SaaS products", "Growing web apps", "Startups", "Agencies"],
    industries: ["SaaS & startups", "E-commerce & retail", "Fintech", "Media & streaming", "Professional services"],
    pricing: [
      {
        name: "Starter",
        priceRange: "₹12,000 – ₹25,000",
        highlight: false,
        scope: "Single-app cloud setup",
        features: ["Cloud hosting setup", "SSL + domain configuration", "Basic CI/CD pipeline", "Automated backups"],
        support: "1 month support"
      },
      {
        name: "Growth",
        priceRange: "₹25,000 – ₹60,000",
        highlight: true,
        scope: "Scalable infrastructure + DevOps",
        features: ["Auto-scaling infrastructure", "Full CI/CD pipelines", "Monitoring & alerting", "Cloud migration"],
        support: "3 months support"
      },
      {
        name: "Enterprise",
        priceRange: "₹60,000+",
        highlight: false,
        scope: "Multi-service cloud platform",
        features: ["Multi-environment infra-as-code", "Advanced security & compliance", "Cost optimisation audit", "Dedicated DevOps engineer"],
        support: "6 months support"
      }
    ],
    marqueeBase: [
      "Cloud Infrastructure & DevOps",
      "AWS, Google Cloud & Vercel Setup",
      "Automated CI/CD Deployments",
      "Monitoring, Backups & Auto-Scaling",
      "Cloud Migration & Cost Optimisation"
    ]
  }
};

/* ─────────────────────────────────────────────────────────────────────────
   THE REST OF THE CATALOG, ON THE CITY AXIS

   The other 17 services in lib/services25.ts (ERP, CRM, billing, POS,
   inventory, accounting, HRMS, the platform-specific app builds, AI, SaaS,
   integrations and maintenance) get city pages too, adapted from the same
   records that drive the industry axis. One catalog, two axes — a service's
   price band or module list can never say one thing on /erp-development-
   company-in-patna and another on /manufacturing-erp-development.

   Two of the 25 (`website-development`, `software-development`) already exist
   as hand-written entries above and are skipped here, so nothing is
   overwritten.
   ───────────────────────────────────────────────────────────────────────── */
function serviceInfoFromCatalog(svc: IndustryServiceInfo): ServiceInfo {
  return {
    name: svc.name,
    slug: svc.slug,
    subtitle: svc.summary,
    tagline: svc.outcome,
    description: `${svc.summary} ${svc.outcome}`,
    features: svc.modules,
    benefits: svc.benefits,
    /* A real six-step shape rather than filler: the middle two steps name the
       service's own first and second modules, so the process section differs
       per service instead of reading identically across all seventeen. */
    process: [
      { step: 1, title: "Discovery", desc: "We map how the work happens today — including the parts that only exist in someone's head — before anything is designed." },
      { step: 2, title: "Prototype", desc: "You approve a clickable prototype while changing the shape of it is still cheap." },
      { step: 3, title: svc.modules[0].split(" ").slice(0, 4).join(" "), desc: svc.modules[0] },
      { step: 4, title: svc.modules[1].split(" ").slice(0, 4).join(" "), desc: svc.modules[1] },
      { step: 5, title: "Testing & Data Migration", desc: "Tested against your real data, not sample records, and migrated from whatever you run today." },
      { step: 6, title: "Launch & Handover", desc: "Deployment, team training, and handover of source code and documentation." },
    ],
    techStack: svc.techStack,
    useCases: svc.useCases,
    deliverables: [
      ...svc.modules.slice(0, 3),
      "Source code and technical documentation",
      "Team training and a post-launch support window",
    ],
    timeline: svc.timeline,
    idealFor: svc.useCases.slice(0, 4),
    industries: INDUSTRY_LABELS_FOR_CITY_PAGES,
    pricing: svc.tiers,
    marqueeBase: [svc.name, ...svc.modules.slice(0, 3), `Delivered in ${svc.timeline}`],
  };
}

/* Deliberately the broad sector list rather than a per-service guess: on a
   city page this field answers "who else do you build this for", and an
   honest wide answer beats a fabricated narrow one. */
const INDUSTRY_LABELS_FOR_CITY_PAGES = [
  "Retail & e-commerce",
  "Healthcare & pharma",
  "Education & coaching",
  "Manufacturing & logistics",
  "Professional services",
];

const generatedServices: Record<string, ServiceInfo> = Object.fromEntries(
  industryServices
    .filter((svc) => !(svc.slug in handWrittenServices))
    .map((svc) => [svc.slug, serviceInfoFromCatalog(svc)])
);

export const services: Record<string, ServiceInfo> = {
  ...handWrittenServices,
  ...generatedServices,
};

/* The eight that were live before the catalog expansion. `generateStaticParams`
   prerenders these at build time and lets the newer ones render on demand —
   otherwise every deploy would prerender 7,500+ city pages up front. */
export const originalCityServiceSlugs = Object.keys(handWrittenServices);

/* ══════════════════════════════════════════════
   BIHAR
══════════════════════════════════════════════ */
const biharCities: CityInfo[] = [
  { name: "Patna", slug: "patna", state: "Bihar", type: "major", tagline: "the capital city and largest commercial hub of Bihar", context: "the city's expanding SaaS ecosystems, startup accelerators, and retail chains", nearby: ["gaya", "hajipur", "nalanda", "jehanabad"] },
  { name: "Gaya", slug: "gaya", state: "Bihar", type: "major", tagline: "the historical, cultural, and spiritual hub of South Bihar", context: "the region's international hotels, tourism operators, and educational networks", nearby: ["patna", "nawada", "jehanabad", "aurangabad"] },
  { name: "Muzaffarpur", slug: "muzaffarpur", state: "Bihar", type: "major", tagline: "the commercial hub of North Bihar and the sweet litchi capital", context: "the local agricultural processing plants, wholesale traders, and local enterprises", nearby: ["darbhanga", "samastipur", "hajipur", "sitamarhi"] },
  { name: "Darbhanga", slug: "darbhanga", state: "Bihar", type: "major", tagline: "the cultural capital of Mithilanchal and a growing medical hub", context: "the local Mithila art platforms, educational trusts, and retail networks", nearby: ["madhubani", "samastipur", "muzaffarpur", "saharsa"] },
  { name: "Bhagalpur", slug: "bhagalpur", state: "Bihar", type: "major", tagline: "the famous Silk City on the banks of the holy Ganges", context: "the silk handloom cooperative webs, retail brands, and education groups", nearby: ["munger", "banka", "khagaria", "purnia"] },
  { name: "Purnia", slug: "purnia", state: "Bihar", type: "major", tagline: "the gateway to Northeast India and the commercial hub of Seemanchal", context: "the regional logistics operations, grain merchants, and retail businesses", nearby: ["katihar", "araria", "kishanganj", "saharsa"] },
  { name: "Katihar", slug: "katihar", state: "Bihar", type: "major", tagline: "the prominent railway junction and growing trade center in Seemanchal", context: "the transportation sectors, warehouse facilities, and local wholesalers", nearby: ["purnia", "araria", "kishanganj", "munger"] },
  { name: "Begusarai", slug: "begusarai", state: "Bihar", type: "major", tagline: "the industrial capital of Bihar with active commercial sectors", context: "the manufacturing businesses, petroleum trade, and agricultural companies", nearby: ["khagaria", "samastipur", "lakhisarai", "patna"] },
  { name: "Ara", slug: "ara", state: "Bihar", type: "major", tagline: "the historical hub of Bhojpur and center of educational excellence", context: "the educational startups, coaching institutes, and local contractors", nearby: ["buxar", "patna", "sasaram", "siwan"] },
  { name: "Buxar", slug: "buxar", state: "Bihar", type: "headquarters", tagline: "the historic gateway city of Western Bihar on the Ganges border", context: "the border logistics operations, tourism startups, and agricultural traders", nearby: ["ara", "sasaram", "siwan", "buxar"] },
  { name: "Samastipur", slug: "samastipur", state: "Bihar", type: "headquarters", tagline: "the agricultural research hub and active business junction", context: "the regional crop trading markets, agricultural tech, and local transport networks", nearby: ["darbhanga", "muzaffarpur", "begusarai", "lakhisarai"] },
  { name: "Madhubani", slug: "madhubani", state: "Bihar", type: "headquarters", tagline: "the world-renowned center of Mithila art and heritage", context: "the handicraft stores, art export agencies, and rural cooperative businesses", nearby: ["darbhanga", "supaul", "sitamarhi", "saharsa"] },
  { name: "Siwan", slug: "siwan", state: "Bihar", type: "headquarters", tagline: "the growing commercial city of Saran division with strong remittance economy", context: "the real estate agencies, financial services, and retail showrooms", nearby: ["chapra", "ara", "siwan", "buxar"] },
  { name: "Chapra", slug: "chapra", state: "Bihar", type: "headquarters", tagline: "the prominent administrative hub on the confluence of Ghaghara and Ganges", context: "the administrative platforms, trade networks, and local service providers", nearby: ["siwan", "hajipur", "patna", "ara"] },
  { name: "Nalanda", slug: "nalanda", state: "Bihar", type: "headquarters", tagline: "the ancient seat of learning and world heritage tourism center", context: "the heritage tour agencies, private schools, and local handicraft shops", nearby: ["patna", "nawada", "sheikhpura", "jehanabad"] },
  { name: "Jehanabad", slug: "jehanabad", state: "Bihar", type: "headquarters", tagline: "the central district hub bridging Patna and Gaya business corridors", context: "the local retail marketplaces, clinics, and regional services centers", nearby: ["patna", "gaya", "nawada", "nalanda"] },
  { name: "Nawada", slug: "nawada", state: "Bihar", type: "headquarters", tagline: "the growing industrial and agricultural hub of South Bihar", context: "the building supply traders, milling businesses, and local retail stores", nearby: ["gaya", "nalanda", "jehanabad", "sheikhpura"] },
  { name: "Aurangabad", slug: "aurangabad", state: "Bihar", type: "headquarters", tagline: "the gateway of tourism and industry in South-Western Bihar", context: "the cement operations, local power line utilities, and retail stores", nearby: ["gaya", "sasaram", "jehanabad", "buxar"] },
  { name: "Sasaram", slug: "sasaram", state: "Bihar", type: "growing", tagline: "the historic city of Sher Shah Suri tomb and trade center in Rohtas", context: "the stone quarry networks, monument tourism agencies, and agro-retailers", nearby: ["buxar", "aurangabad", "ara", "gaya"] },
  { name: "Sheikhpura", slug: "sheikhpura", state: "Bihar", type: "growing", tagline: "the active stone-mining and growing retail hub of South-East Bihar", context: "the stone crushers, mineral suppliers, and local commercial shops", nearby: ["lakhisarai", "nalanda", "nawada", "jamui"] },
  { name: "Lakhisarai", slug: "lakhisarai", state: "Bihar", type: "growing", tagline: "the historic city on the banks of Kiul river, rich in agricultural trade", context: "the clay bricks kilns, grain merchants, and regional transport firms", nearby: ["sheikhpura", "munger", "begusarai", "jamui"] },
  { name: "Jamui", slug: "jamui", state: "Bihar", type: "growing", tagline: "the mineral-rich district hub of South-Eastern Bihar with growing business reach", context: "the sand supply networks, local hardware shops, and regional contractors", nearby: ["lakhisarai", "banka", "munger", "sheikhpura"] },
  { name: "Kishanganj", slug: "kishanganj", state: "Bihar", type: "growing", tagline: "the tea-growing capital of Bihar bordering West Bengal and Nepal", context: "the tea plantations, processing centers, and cross-border trade firms", nearby: ["araria", "purnia", "katihar", "supaul"] },
  { name: "Araria", slug: "araria", state: "Bihar", type: "growing", tagline: "the active border district trade hub in Seemanchal division", context: "the import-export companies, local retail networks, and crop traders", nearby: ["kishanganj", "purnia", "supaul", "madhepura"] },
  { name: "Munger", slug: "munger", state: "Bihar", type: "growing", tagline: "the twin city of Bhagalpur and the historic yoga capital on the Ganges", context: "the engineering workshops, yoga retreats, and local manufacturing firms", nearby: ["bhagalpur", "khagaria", "lakhisarai", "begusarai"] },
  { name: "Khagaria", slug: "khagaria", state: "Bihar", type: "growing", tagline: "the land of seven rivers with rich agricultural and dairy industry", context: "the dairy farms, food processing mills, and river transport firms", nearby: ["begusarai", "munger", "saharsa", "bhagalpur"] },
  { name: "Saharsa", slug: "saharsa", state: "Bihar", type: "growing", tagline: "the heart of Kosi division and active commercial hub of North-East Bihar", context: "the regional logistics offices, consumer goods firms, and local showrooms", nearby: ["supaul", "madhepura", "darbhanga", "khagaria"] },
  { name: "Supaul", slug: "supaul", state: "Bihar", type: "district", tagline: "the growing Kosi region center focused on flood-resilient agriculture and trade", context: "the local farming initiatives, crop trading, and development projects", nearby: ["saharsa", "madhepura", "madhubani", "araria"] },
  { name: "Madhepura", slug: "madhepura", state: "Bihar", type: "district", tagline: "the educational center and home of electric locomotive factory", context: "the industrial workshops, education groups, and local markets", nearby: ["saharsa", "supaul", "araria", "purnia"] },
  { name: "Vaishali", slug: "vaishali", state: "Bihar", type: "district", tagline: "the ancient republic and tourist hub of historical prominence", context: "the local tourism agencies, educational groups, and retail firms", nearby: ["hajipur", "muzaffarpur", "patna", "samastipur"] },
  { name: "Hajipur", slug: "hajipur", state: "Bihar", type: "district", tagline: "the twin city of Patna, active industrial park, and banana trade center", context: "the industrial warehouses, fruit trade companies, and local factories", nearby: ["patna", "vaishali", "muzaffarpur", "chapra"] },
  { name: "Bettiah", slug: "bettiah", state: "Bihar", type: "district", tagline: "the historic headquarters of West Champaran, rich in agricultural trading", context: "the agro-mills, sugarcane supply chains, and local wholesalers", nearby: ["motihari", "sitamarhi", "vaishali", "muzaffarpur"] },
  { name: "Motihari", slug: "motihari", state: "Bihar", type: "district", tagline: "the land of Satyagraha and active trade center of East Champaran", context: "the local colleges, retail showrooms, and crop trading agencies", nearby: ["bettiah", "sitamarhi", "vaishali", "muzaffarpur"] },
  { name: "Sitamarhi", slug: "sitamarhi", state: "Bihar", type: "district", tagline: "the sacred birthplace of Goddess Sita and Mithila trade node", context: "the religious tour operators, textile wholesalers, and local markets", nearby: ["shivhar", "madhubani", "muzaffarpur", "motihari"] },
  { name: "Shivhar", slug: "shivhar", state: "Bihar", type: "district", tagline: "the smallest district hub of Bihar, expanding its local retail economy", context: "the local retail outlets, rural services hubs, and farming trade", nearby: ["sitamarhi", "muzaffarpur", "motihari", "vaishali"] },
  { name: "Banka", slug: "banka", state: "Bihar", type: "district", tagline: "the scenic hill-border district of South Bihar with active granite sectors", context: "the granite mines, local tourist sites, and agricultural suppliers", nearby: ["bhagalpur", "jamui", "munger", "lakhisarai"] },
  { name: "Bodh Gaya", slug: "bodh-gaya", state: "Bihar", type: "major", tagline: "the global seat of Buddhist pilgrimage and heritage tourism", context: "the international monasteries, hospitality businesses, and tour operators", nearby: ["gaya", "rajgir", "nawada", "jehanabad"] },
  { name: "Rajgir", slug: "rajgir", state: "Bihar", type: "growing", tagline: "the ancient royal capital turned pilgrimage and wellness-tourism hub", context: "the hospitality operators, hot-spring and heritage tourism, and tour agencies", nearby: ["nalanda", "gaya", "bodh-gaya", "jehanabad"] },
  { name: "Mokama", slug: "mokama", state: "Bihar", type: "growing", tagline: "the Ganges port town and industrial junction of eastern Patna district", context: "the riverside warehouses, distillery and industrial units, and grain traders", nearby: ["patna", "begusarai", "nalanda", "jehanabad"] },
  { name: "Dehri", slug: "dehri", state: "Bihar", type: "headquarters", tagline: "the trading gateway on the banks of the Son river in Rohtas", context: "the stone and sand trade, agricultural mandis, and cross-river logistics firms", nearby: ["sasaram", "aurangabad", "ara", "buxar"] },
  { name: "Bagaha", slug: "bagaha", state: "Bihar", type: "headquarters", tagline: "the sugar-belt town of West Champaran near the Valmiki forests", context: "the sugar mills, agricultural cooperatives, and forest-fringe tourism operators", nearby: ["bettiah", "motihari", "gopalganj", "muzaffarpur"] },
  { name: "Gopalganj", slug: "gopalganj", state: "Bihar", type: "headquarters", tagline: "the sugar and remittance-driven commercial hub of the Saran division", context: "the sugar industry, remittance-funded retail, and agricultural traders", nearby: ["siwan", "chapra", "bagaha", "motihari"] },
  { name: "Jamalpur", slug: "jamalpur", state: "Bihar", type: "growing", tagline: "the historic railway-workshop town of Munger district", context: "the railway engineering ancillaries, technical training institutes, and local trade", nearby: ["munger", "bhagalpur", "lakhisarai", "begusarai"] }
];

/* ══════════════════════════════════════════════
   JHARKHAND
══════════════════════════════════════════════ */
const jharkhandCities: CityInfo[] = [
  { name: "Ranchi", slug: "ranchi", state: "Jharkhand", type: "major", tagline: "the capital city of Jharkhand and the state's administrative and business center", context: "the government contractor networks, private hospitals, and expanding retail chains", nearby: ["jamshedpur", "bokaro", "hazaribagh", "ramgarh"] },
  { name: "Jamshedpur", slug: "jamshedpur", state: "Jharkhand", type: "major", tagline: "India's first planned industrial city and steel manufacturing capital", context: "the steel plant ancillary units, engineering firms, and corporate townships", nearby: ["ranchi", "chaibasa", "bokaro", "dhanbad"] },
  { name: "Dhanbad", slug: "dhanbad", state: "Jharkhand", type: "major", tagline: "the coal capital of India and a major mining and engineering hub", context: "the coal trading firms, mining equipment suppliers, and engineering colleges", nearby: ["bokaro", "ranchi", "jamshedpur", "giridih"] },
  { name: "Bokaro", slug: "bokaro", state: "Jharkhand", type: "headquarters", tagline: "a planned steel city built around one of Asia's largest steel plants", context: "the steel ancillary units, township retailers, and engineering suppliers", nearby: ["dhanbad", "ranchi", "ramgarh", "jamshedpur"] },
  { name: "Deoghar", slug: "deoghar", state: "Jharkhand", type: "headquarters", tagline: "a major pilgrimage city centered on the Baidyanath Jyotirlinga temple", context: "the pilgrimage tourism trade, hospitality businesses, and local retailers", nearby: ["hazaribagh", "ranchi", "giridih", "dumka"] },
  { name: "Hazaribagh", slug: "hazaribagh", state: "Jharkhand", type: "headquarters", tagline: "a scenic plateau city known for wildlife tourism and coal-belt trade", context: "the tourism operators, coal supply chains, and local educational institutions", nearby: ["ranchi", "bokaro", "giridih", "deoghar"] },
  { name: "Giridih", slug: "giridih", state: "Jharkhand", type: "growing", tagline: "a mica and coal mining town with an expanding local trading economy", context: "the mica export traders, coal depots, and regional wholesalers", nearby: ["dhanbad", "hazaribagh", "deoghar", "bokaro"] },
  { name: "Ramgarh", slug: "ramgarh", state: "Jharkhand", type: "growing", tagline: "an industrial cantonment town with growing coal and cement trade", context: "the cement dealerships, coal transporters, and local manufacturing units", nearby: ["ranchi", "bokaro", "hazaribagh", "dhanbad"] },
  { name: "Chaibasa", slug: "chaibasa", state: "Jharkhand", type: "district", tagline: "a mineral-rich district headquarters at the heart of the Kolhan region", context: "the iron ore trading firms, tribal cooperative businesses, and local markets", nearby: ["jamshedpur", "ranchi", "bokaro", "dhanbad"] },
  { name: "Dumka", slug: "dumka", state: "Jharkhand", type: "district", tagline: "the sub-capital of Jharkhand and administrative center of the Santhal Pargana", context: "the government offices, agricultural traders, and local retail markets", nearby: ["deoghar", "giridih", "hazaribagh", "ranchi"] },
  { name: "Adityapur", slug: "adityapur", state: "Jharkhand", type: "growing", tagline: "one of eastern India's largest auto-component industrial areas", context: "the auto-ancillary factories, engineering MSMEs, and industrial suppliers", nearby: ["jamshedpur", "ranchi", "chaibasa", "bokaro"] },
  { name: "Koderma", slug: "koderma", state: "Jharkhand", type: "growing", tagline: "the mica capital of India centred on Jhumri Telaiya", context: "the mica mining and processing units, forest-produce trade, and local retail", nearby: ["hazaribagh", "giridih", "ranchi", "dhanbad"] },
  { name: "Medininagar", slug: "medininagar", state: "Jharkhand", type: "headquarters", tagline: "the commercial headquarters of Palamu and gateway to Betla", context: "the coal and agri trade, government and education services, and forest tourism", nearby: ["ranchi", "hazaribagh", "bokaro", "dhanbad"] },
  { name: "Saraikela", slug: "saraikela", state: "Jharkhand", type: "headquarters", tagline: "the headquarters of Saraikela-Kharsawan and home of the Chhau dance heritage", context: "the auto-ancillary belt around Adityapur, tribal handicraft cooperatives, and local traders", nearby: ["adityapur", "jamshedpur", "chaibasa", "ranchi"] },
  { name: "Chatra", slug: "chatra", state: "Jharkhand", type: "district", tagline: "a forested district headquarters in the North Chotanagpur coal belt", context: "the coal and forest-produce trade, agricultural markets, and local retailers", nearby: ["hazaribagh", "ranchi", "medininagar", "koderma"] },
  { name: "Khunti", slug: "khunti", state: "Jharkhand", type: "district", tagline: "the birthplace of Birsa Munda and a tribal district headquarters south of Ranchi", context: "the tribal cooperative businesses, lac cultivation trade, and local markets", nearby: ["ranchi", "gumla", "simdega", "chaibasa"] },
  { name: "Lohardaga", slug: "lohardaga", state: "Jharkhand", type: "district", tagline: "a bauxite-mining district headquarters on the Ranchi plateau", context: "the bauxite mining suppliers, forest-produce traders, and local retail", nearby: ["ranchi", "gumla", "latehar", "khunti"] },
  { name: "Gumla", slug: "gumla", state: "Jharkhand", type: "district", tagline: "a tribal-majority district headquarters at the gateway to the Chotanagpur forests", context: "the agricultural trade, forest produce, and local cooperative businesses", nearby: ["ranchi", "simdega", "lohardaga", "khunti"] },
  { name: "Simdega", slug: "simdega", state: "Jharkhand", type: "district", tagline: "a forested southern district headquarters known for hockey talent and agriculture", context: "the agricultural markets, forest-produce trade, and local retailers", nearby: ["gumla", "ranchi", "khunti", "chaibasa"] },
  { name: "Jamtara", slug: "jamtara", state: "Jharkhand", type: "district", tagline: "a Santhal Pargana district headquarters with a growing local economy", context: "the coal-fringe trade, agricultural markets, and local shops", nearby: ["dumka", "deoghar", "dhanbad", "giridih"] },
  { name: "Sahibganj", slug: "sahibganj", state: "Jharkhand", type: "headquarters", tagline: "a Ganges port town and district headquarters in the Santhal Pargana", context: "the river trade and stone-chip industry, agricultural markets, and logistics firms", nearby: ["pakur", "godda", "dumka", "bhagalpur"] },
  { name: "Pakur", slug: "pakur", state: "Jharkhand", type: "district", tagline: "a stone-mining district headquarters bordering West Bengal", context: "the black-stone quarrying and crushing units, transport firms, and local traders", nearby: ["sahibganj", "dumka", "godda", "malda"] },
  { name: "Godda", slug: "godda", state: "Jharkhand", type: "district", tagline: "a coal-and-agriculture district headquarters in the Santhal Pargana", context: "the coal mining supply chains, agricultural trade, and local retail", nearby: ["dumka", "sahibganj", "pakur", "deoghar"] },
  { name: "Latehar", slug: "latehar", state: "Jharkhand", type: "district", tagline: "a forested district headquarters on the Ranchi-Palamu corridor", context: "the coal and forest-produce trade, agricultural markets, and local shops", nearby: ["medininagar", "ranchi", "lohardaga", "garhwa"] },
  { name: "Garhwa", slug: "garhwa", state: "Jharkhand", type: "district", tagline: "a western district headquarters bordering Uttar Pradesh and Chhattisgarh", context: "the agricultural trade, forest produce, and cross-border transport firms", nearby: ["medininagar", "latehar", "ranchi", "sasaram"] }
];

/* ══════════════════════════════════════════════
   UTTAR PRADESH
══════════════════════════════════════════════ */
const upCities: CityInfo[] = [
  { name: "Lucknow", slug: "lucknow", state: "Uttar Pradesh", type: "major", tagline: "the capital city of Uttar Pradesh and a major North Indian business hub", context: "the state government ecosystem, ed-tech startups, and expanding retail chains", nearby: ["kanpur", "noida", "gorakhpur", "bareilly"] },
  { name: "Kanpur", slug: "kanpur", state: "Uttar Pradesh", type: "major", tagline: "the leather and textile manufacturing capital of North India", context: "the leather export houses, textile mills, and industrial trading firms", nearby: ["lucknow", "jhansi", "aligarh", "prayagraj"] },
  { name: "Noida", slug: "noida", state: "Uttar Pradesh", type: "major", tagline: "a planned satellite city of Delhi NCR and a major IT and startup hub", context: "the IT parks, corporate offices, and fast-growing D2C brands", nearby: ["ghaziabad", "delhi", "gurugram", "meerut"] },
  { name: "Ghaziabad", slug: "ghaziabad", state: "Uttar Pradesh", type: "major", tagline: "an industrial gateway city bordering Delhi with strong manufacturing trade", context: "the manufacturing units, logistics hubs, and wholesale markets", nearby: ["noida", "meerut", "delhi", "moradabad"] },
  { name: "Agra", slug: "agra", state: "Uttar Pradesh", type: "major", tagline: "the home of the Taj Mahal and a major global tourism destination", context: "the tourism and hospitality trade, leather footwear exporters, and handicraft businesses", nearby: ["mathura", "aligarh", "firozabad", "kanpur"] },
  { name: "Varanasi", slug: "varanasi", state: "Uttar Pradesh", type: "major", tagline: "one of the world's oldest living cities and a major pilgrimage and silk trade center", context: "the silk weaving cooperatives, pilgrimage tourism operators, and local retailers", nearby: ["prayagraj", "gorakhpur", "faizabad", "lucknow"] },
  { name: "Prayagraj", slug: "prayagraj", state: "Uttar Pradesh", type: "major", tagline: "a historic administrative and educational center on the Ganges-Yamuna confluence", context: "the coaching institute networks, legal and administrative services, and local retail", nearby: ["varanasi", "kanpur", "faizabad", "lucknow"] },
  { name: "Meerut", slug: "meerut", state: "Uttar Pradesh", type: "headquarters", tagline: "a sports goods manufacturing hub and gateway city of Western UP", context: "the sports goods exporters, scissor and instrument manufacturers, and local traders", nearby: ["ghaziabad", "noida", "muzaffarnagar", "saharanpur"] },
  { name: "Gorakhpur", slug: "gorakhpur", state: "Uttar Pradesh", type: "headquarters", tagline: "a major railway junction and trade gateway to the Nepal border", context: "the cross-border trade firms, railway ancillary businesses, and local retail", nearby: ["lucknow", "varanasi", "faizabad", "prayagraj"] },
  { name: "Bareilly", slug: "bareilly", state: "Uttar Pradesh", type: "headquarters", tagline: "a furniture and zari-craft manufacturing hub of Rohilkhand", context: "the furniture manufacturers, zari craft exporters, and local wholesalers", nearby: ["moradabad", "lucknow", "rampur", "shahjahanpur"] },
  { name: "Aligarh", slug: "aligarh", state: "Uttar Pradesh", type: "headquarters", tagline: "the lock manufacturing capital of India and a prominent educational city", context: "the lock and hardware manufacturers, brass industries, and university-linked businesses", nearby: ["agra", "mathura", "kanpur", "noida"] },
  { name: "Moradabad", slug: "moradabad", state: "Uttar Pradesh", type: "headquarters", tagline: "the brassware export capital of India, known globally as Pital Nagri", context: "the brassware export houses, metal craft units, and local trading firms", nearby: ["bareilly", "rampur", "ghaziabad", "meerut"] },
  { name: "Saharanpur", slug: "saharanpur", state: "Uttar Pradesh", type: "growing", tagline: "a wood-carving and furniture export hub bordering Uttarakhand", context: "the wood-carving export units, furniture workshops, and local traders", nearby: ["meerut", "muzaffarnagar", "ghaziabad", "bareilly"] },
  { name: "Jhansi", slug: "jhansi", state: "Uttar Pradesh", type: "growing", tagline: "a historic fort city and railway junction gateway to Bundelkhand", context: "the railway ancillary trade, agricultural markets, and local retail businesses", nearby: ["kanpur", "agra", "lucknow", "prayagraj"] },
  { name: "Muzaffarnagar", slug: "muzaffarnagar", state: "Uttar Pradesh", type: "growing", tagline: "a sugar mill hub and major agricultural trading town of Western UP", context: "the sugar mills, jaggery traders, and agricultural equipment dealers", nearby: ["meerut", "saharanpur", "ghaziabad", "noida"] },
  { name: "Firozabad", slug: "firozabad", state: "Uttar Pradesh", type: "growing", tagline: "the glass and bangle manufacturing capital of India", context: "the glass bangle factories, export houses, and local wholesalers", nearby: ["agra", "aligarh", "mathura", "kanpur"] },
  { name: "Faizabad", slug: "faizabad", state: "Uttar Pradesh", type: "district", tagline: "the twin city of Ayodhya and a rapidly growing pilgrimage trade center", context: "the pilgrimage tourism operators, hospitality businesses, and local retailers", nearby: ["gorakhpur", "varanasi", "prayagraj", "lucknow"] },
  { name: "Mathura", slug: "mathura", state: "Uttar Pradesh", type: "district", tagline: "a major pilgrimage city and processed-food trading hub on the Delhi-Agra corridor", context: "the pilgrimage tourism trade, dairy processing units, and local wholesalers", nearby: ["agra", "aligarh", "firozabad", "noida"] },
  { name: "Rampur", slug: "rampur", state: "Uttar Pradesh", type: "district", tagline: "a heritage city known for its patchwork craft and agricultural trade", context: "the patchwork and craft export units, agricultural traders, and local markets", nearby: ["moradabad", "bareilly", "meerut", "ghaziabad"] },
  { name: "Shahjahanpur", slug: "shahjahanpur", state: "Uttar Pradesh", type: "district", tagline: "a Rohilkhand agricultural town known for perfume and menthol trade", context: "the menthol and essential oil traders, agricultural mills, and local retail", nearby: ["bareilly", "lucknow", "kanpur", "moradabad"] },
  { name: "Jaunpur", slug: "jaunpur", state: "Uttar Pradesh", type: "major", tagline: "the historic Sharqi-era city known for perfume and heritage crafts", context: "the ruh-perfume distillers, food and imarti trades, and agricultural markets", nearby: ["varanasi", "prayagraj", "azamgarh", "ghazipur"] },
  { name: "Ghazipur", slug: "ghazipur", state: "Uttar Pradesh", type: "major", tagline: "the Ganges trade city famed for its government opium and alkaloid works", context: "the pharma and alkaloid units, tobacco and agri trade, and river logistics", nearby: ["varanasi", "jaunpur", "azamgarh", "mau"] },
  { name: "Azamgarh", slug: "azamgarh", state: "Uttar Pradesh", type: "major", tagline: "the weaving and black-pottery hub of eastern Uttar Pradesh", context: "the Mubarakpur silk weavers, Nizamabad black-pottery artisans, and agri traders", nearby: ["jaunpur", "mau", "ghazipur", "gorakhpur"] },
  { name: "Mirzapur", slug: "mirzapur", state: "Uttar Pradesh", type: "major", tagline: "the hand-knotted carpet and brassware city beside Vindhyachal", context: "the carpet export houses, brassware units, and Vindhyachal pilgrimage tourism", nearby: ["varanasi", "bhadohi", "prayagraj", "jaunpur"] },
  { name: "Bhadohi", slug: "bhadohi", state: "Uttar Pradesh", type: "headquarters", tagline: "India's hand-knotted carpet capital and export cluster", context: "the carpet manufacturing and export houses, weaving clusters, and logistics firms", nearby: ["mirzapur", "varanasi", "prayagraj", "jaunpur"] },
  { name: "Mau", slug: "mau", state: "Uttar Pradesh", type: "major", tagline: "the powerloom textile town of the Purvanchal weaving belt", context: "the powerloom saree units, yarn traders, and textile wholesalers", nearby: ["azamgarh", "ghazipur", "gorakhpur", "jaunpur"] },
  { name: "Kannauj", slug: "kannauj", state: "Uttar Pradesh", type: "headquarters", tagline: "the attar and traditional-perfume capital of India", context: "the traditional attar distilleries, tobacco trade, and fragrance exporters", nearby: ["kanpur", "lucknow", "agra", "aligarh"] },
  { name: "Vrindavan", slug: "vrindavan", state: "Uttar Pradesh", type: "growing", tagline: "the temple town at the heart of the Krishna pilgrimage circuit", context: "the pilgrimage hospitality, temple-linked retail, and tour operators", nearby: ["mathura", "agra", "aligarh", "noida"] },
  { name: "Ayodhya", slug: "ayodhya", state: "Uttar Pradesh", type: "major", tagline: "the sacred birthplace of Lord Ram and India's fastest-growing pilgrimage destination", context: "the temple tourism boom, hospitality investment, and pilgrimage-linked retail", nearby: ["faizabad", "gorakhpur", "prayagraj", "lucknow"] },
  { name: "Sultanpur", slug: "sultanpur", state: "Uttar Pradesh", type: "district", tagline: "an Awadh district headquarters on the Gomti with active agricultural trade", context: "the agricultural mandis, coaching institutes, and local retailers", nearby: ["faizabad", "prayagraj", "lucknow", "jaunpur"] },
  { name: "Sitapur", slug: "sitapur", state: "Uttar Pradesh", type: "district", tagline: "an agricultural and eye-care hub north-west of Lucknow", context: "the agri-produce trade, hospitals and eye clinics, and local wholesalers", nearby: ["lucknow", "hardoi", "lakhimpur", "bareilly"] },
  { name: "Hardoi", slug: "hardoi", state: "Uttar Pradesh", type: "district", tagline: "an agricultural district headquarters on the Lucknow-Shahjahanpur line", context: "the grain and sugar trade, agricultural markets, and local retail", nearby: ["sitapur", "lucknow", "kannauj", "shahjahanpur"] },
  { name: "Unnao", slug: "unnao", state: "Uttar Pradesh", type: "growing", tagline: "an industrial town on the Lucknow-Kanpur corridor with leather and textile units", context: "the leather and hosiery units, industrial suppliers, and local traders", nearby: ["kanpur", "lucknow", "rae-bareli", "hardoi"] },
  { name: "Rae Bareli", slug: "rae-bareli", state: "Uttar Pradesh", type: "district", tagline: "an Awadh district headquarters known for its rail coach factory", context: "the rail-coach ancillary units, agricultural trade, and government services", nearby: ["lucknow", "prayagraj", "unnao", "sultanpur"] },
  { name: "Barabanki", slug: "barabanki", state: "Uttar Pradesh", type: "growing", tagline: "a fast-growing satellite district on Lucknow's eastern edge", context: "the menthol and agri-processing trade, warehousing, and local retail", nearby: ["lucknow", "faizabad", "sitapur", "sultanpur"] },
  { name: "Fatehpur", slug: "fatehpur", state: "Uttar Pradesh", type: "district", tagline: "an agricultural district headquarters between Kanpur and Prayagraj", context: "the grain trade, agricultural markets, and local service businesses", nearby: ["kanpur", "prayagraj", "rae-bareli", "banda"] },
  { name: "Pratapgarh", slug: "pratapgarh", state: "Uttar Pradesh", type: "district", tagline: "an Awadh district headquarters famous for its amla (gooseberry) trade", context: "the amla processing and trade, agricultural mandis, and local retailers", nearby: ["prayagraj", "sultanpur", "rae-bareli", "jaunpur"] },
  { name: "Basti", slug: "basti", state: "Uttar Pradesh", type: "district", tagline: "a Purvanchal district headquarters with an agrarian, sugar-belt economy", context: "the sugar mills, agricultural trade, and local wholesalers", nearby: ["gorakhpur", "faizabad", "sant-kabir-nagar", "siddharthnagar"] },
  { name: "Deoria", slug: "deoria", state: "Uttar Pradesh", type: "district", tagline: "a sugar-belt district headquarters in eastern Purvanchal", context: "the sugar industry, agricultural markets, and remittance-funded retail", nearby: ["gorakhpur", "kushinagar", "mau", "ballia"] },
  { name: "Ballia", slug: "ballia", state: "Uttar Pradesh", type: "district", tagline: "a Ganges-Ghaghara confluence town on the Bihar border", context: "the agricultural trade, river logistics, and local markets", nearby: ["mau", "ghazipur", "deoria", "chapra"] },
  { name: "Gonda", slug: "gonda", state: "Uttar Pradesh", type: "district", tagline: "an Awadh-Terai district headquarters with a strong agrarian base", context: "the sugar and grain trade, agricultural markets, and local retail", nearby: ["faizabad", "bahraich", "basti", "lucknow"] },
  { name: "Bahraich", slug: "bahraich", state: "Uttar Pradesh", type: "district", tagline: "a Terai district headquarters near the Nepal border and Katarniaghat forest", context: "the agricultural and forest-fringe trade, cross-border markets, and local retailers", nearby: ["gonda", "lakhimpur", "faizabad", "sitapur"] },
  { name: "Etawah", slug: "etawah", state: "Uttar Pradesh", type: "district", tagline: "a Yamuna-belt district headquarters and gateway to the lion safari", context: "the agricultural trade, tourism ventures, and local wholesalers", nearby: ["kanpur", "auraiya", "mainpuri", "firozabad"] },
  { name: "Lakhimpur Kheri", slug: "lakhimpur-kheri", state: "Uttar Pradesh", type: "district", tagline: "the largest district of UP, a sugar-belt hub bordering the Dudhwa forests", context: "the sugar mills, agricultural cooperatives, and forest-fringe tourism", nearby: ["sitapur", "bahraich", "shahjahanpur", "lucknow"] },
  { name: "Budaun", slug: "budaun", state: "Uttar Pradesh", type: "district", tagline: "a historic Rohilkhand district headquarters with an agrarian economy", context: "the agricultural and dairy trade, heritage tourism, and local retail", nearby: ["bareilly", "moradabad", "shahjahanpur", "sambhal"] },
  { name: "Pilibhit", slug: "pilibhit", state: "Uttar Pradesh", type: "district", tagline: "a Terai district headquarters known for its tiger reserve and flute craft", context: "the agricultural and forest trade, flute-making artisans, and local markets", nearby: ["bareilly", "lakhimpur-kheri", "shahjahanpur", "rampur"] },
  { name: "Bijnor", slug: "bijnor", state: "Uttar Pradesh", type: "district", tagline: "a sugarcane-belt district headquarters on the Ganges in western UP", context: "the sugar mills, agricultural trade, and local wholesalers", nearby: ["moradabad", "meerut", "muzaffarnagar", "rampur"] },
  { name: "Bulandshahr", slug: "bulandshahr", state: "Uttar Pradesh", type: "growing", tagline: "a western UP district with the Khurja pottery and ceramics cluster", context: "the Khurja ceramic units, agricultural trade, and industrial suppliers", nearby: ["noida", "aligarh", "ghaziabad", "meerut"] },
  { name: "Hapur", slug: "hapur", state: "Uttar Pradesh", type: "growing", tagline: "an industrial and papad-manufacturing town in Delhi NCR's eastern belt", context: "the food-processing and steel-pipe units, wholesale mandis, and logistics firms", nearby: ["ghaziabad", "meerut", "bulandshahr", "noida"] },
  { name: "Amroha", slug: "amroha", state: "Uttar Pradesh", type: "district", tagline: "a western UP district known for its handcrafted dholak and mango orchards", context: "the musical-instrument artisans, mango trade, and local markets", nearby: ["moradabad", "sambhal", "bijnor", "rampur"] },
  { name: "Sambhal", slug: "sambhal", state: "Uttar Pradesh", type: "district", tagline: "a horn-and-bone handicraft export town in the Rohilkhand belt", context: "the horn-bone craft exporters, menthol trade, and local wholesalers", nearby: ["moradabad", "amroha", "budaun", "bareilly"] },
  { name: "Banda", slug: "banda", state: "Uttar Pradesh", type: "district", tagline: "a Bundelkhand district headquarters known for its shajar-stone craft", context: "the stone craft and quarry trade, agricultural markets, and local retailers", nearby: ["chitrakoot", "hamirpur", "prayagraj", "fatehpur"] },
  { name: "Farrukhabad", slug: "farrukhabad", state: "Uttar Pradesh", type: "district", tagline: "a hand-block textile-printing hub on the Ganges in central UP", context: "the hand-block printing units, potato and agri trade, and local wholesalers", nearby: ["kannauj", "kanpur", "hardoi", "mainpuri"] }
];

/* ══════════════════════════════════════════════
   WEST BENGAL
══════════════════════════════════════════════ */
const wbCities: CityInfo[] = [
  { name: "Kolkata", slug: "kolkata", state: "West Bengal", type: "major", tagline: "the capital of West Bengal and the primary commercial hub of Eastern India", context: "the corporate headquarters, trading houses, and expanding D2C and retail brands", nearby: ["howrah", "durgapur", "asansol", "siliguri"] },
  { name: "Howrah", slug: "howrah", state: "West Bengal", type: "major", tagline: "the twin city of Kolkata and a major railway and manufacturing hub", context: "the engineering workshops, railway ancillary firms, and wholesale markets", nearby: ["kolkata", "durgapur", "asansol", "bardhaman"] },
  { name: "Durgapur", slug: "durgapur", state: "West Bengal", type: "major", tagline: "a major steel and industrial township of West Bengal", context: "the steel plant ancillary units, engineering firms, and township retailers", nearby: ["asansol", "kolkata", "howrah", "bardhaman"] },
  { name: "Asansol", slug: "asansol", state: "West Bengal", type: "major", tagline: "a coal-belt industrial city and second-largest urban center in West Bengal", context: "the coal trading firms, steel ancillary businesses, and local wholesalers", nearby: ["durgapur", "kolkata", "howrah", "bardhaman"] },
  { name: "Siliguri", slug: "siliguri", state: "West Bengal", type: "major", tagline: "the gateway to Northeast India and a major trade corridor city", context: "the cross-border trade firms, tea and timber traders, and logistics operators", nearby: ["kolkata", "malda", "kishanganj", "darbhanga"] },
  { name: "Bardhaman", slug: "bardhaman", state: "West Bengal", type: "headquarters", tagline: "a major rice-milling hub and agricultural trade center of West Bengal", context: "the rice mills, agricultural traders, and local wholesale markets", nearby: ["durgapur", "asansol", "kolkata", "howrah"] },
  { name: "Kharagpur", slug: "kharagpur", state: "West Bengal", type: "headquarters", tagline: "a major railway township and technical education hub", context: "the railway ancillary trade, engineering colleges, and local retailers", nearby: ["kolkata", "howrah", "durgapur", "bardhaman"] },
  { name: "Malda", slug: "malda", state: "West Bengal", type: "headquarters", tagline: "the mango orchard capital and a growing trade town of North Bengal", context: "the mango export traders, silk businesses, and local wholesalers", nearby: ["siliguri", "kishanganj", "katihar", "kolkata"] },
  { name: "Baharampur", slug: "baharampur", state: "West Bengal", type: "growing", tagline: "a silk trading town and administrative center of Murshidabad district", context: "the silk trading houses, handicraft businesses, and local markets", nearby: ["malda", "bardhaman", "kolkata", "krishnanagar"] },
  { name: "Krishnanagar", slug: "krishnanagar", state: "West Bengal", type: "growing", tagline: "a heritage town known for clay art craftsmanship and local trade", context: "the clay art export units, local handicraft shops, and regional traders", nearby: ["kolkata", "baharampur", "bardhaman", "howrah"] }
];

/* ══════════════════════════════════════════════
   DELHI NCR (Delhi + Haryana satellite cities)
══════════════════════════════════════════════ */
const delhiNcrCities: CityInfo[] = [
  { name: "Delhi", slug: "delhi", state: "Delhi", type: "major", tagline: "the national capital and one of the largest business and consumer markets in India", context: "the corporate headquarters, government-linked enterprises, and fast-scaling D2C brands", nearby: ["gurugram", "noida", "faridabad", "ghaziabad"] },
  { name: "Gurugram", slug: "gurugram", state: "Haryana", type: "major", tagline: "a major corporate and IT hub bordering Delhi, home to Fortune 500 offices", context: "the corporate parks, IT consulting firms, and fast-growing startups", nearby: ["delhi", "faridabad", "noida", "panipat"] },
  { name: "Faridabad", slug: "faridabad", state: "Haryana", type: "major", tagline: "a major industrial city in Delhi NCR with a strong manufacturing base", context: "the manufacturing units, ancillary suppliers, and wholesale trading firms", nearby: ["delhi", "gurugram", "noida", "panipat"] },
  { name: "Panipat", slug: "panipat", state: "Haryana", type: "headquarters", tagline: "the textile and handloom export capital of North India", context: "the textile export houses, handloom weavers, and local wholesalers", nearby: ["karnal", "delhi", "faridabad", "hisar"] },
  { name: "Karnal", slug: "karnal", state: "Haryana", type: "headquarters", tagline: "the rice bowl of India and an agricultural research and trade hub", context: "the rice mills, agricultural research institutions, and local traders", nearby: ["panipat", "hisar", "delhi", "gurugram"] },
  { name: "Hisar", slug: "hisar", state: "Haryana", type: "growing", tagline: "a growing steel and agricultural trading center of Western Haryana", context: "the steel rolling mills, agricultural traders, and local wholesalers", nearby: ["karnal", "panipat", "delhi", "gurugram"] }
];

/* ══════════════════════════════════════════════
   KARNATAKA
══════════════════════════════════════════════ */
const karnatakaCities: CityInfo[] = [
  { name: "Bengaluru", slug: "bengaluru", state: "Karnataka", type: "major", tagline: "India's Silicon Valley and the country's largest technology and startup hub", context: "the IT parks, venture-backed startups, and enterprise SaaS companies", nearby: ["mysuru", "mangaluru", "davanagere", "shivamogga"] },
  { name: "Mysuru", slug: "mysuru", state: "Karnataka", type: "major", tagline: "a heritage city and growing IT and tourism hub of South Karnataka", context: "the tourism operators, IT ancillary firms, and heritage retail businesses", nearby: ["bengaluru", "davanagere", "shivamogga", "mangaluru"] },
  { name: "Mangaluru", slug: "mangaluru", state: "Karnataka", type: "major", tagline: "a major port city and banking hub on the Karnataka coast", context: "the port logistics firms, banking institutions, and cashew and spice exporters", nearby: ["bengaluru", "mysuru", "shivamogga", "davanagere"] },
  { name: "Davanagere", slug: "davanagere", state: "Karnataka", type: "headquarters", tagline: "a central Karnataka trade hub known for its cotton and edible oil mills", context: "the cotton ginning mills, edible oil traders, and local wholesalers", nearby: ["bengaluru", "mysuru", "shivamogga", "mangaluru"] },
  { name: "Shivamogga", slug: "shivamogga", state: "Karnataka", type: "growing", tagline: "the gateway to the Western Ghats and an areca nut trading center", context: "the areca nut traders, agro-processing units, and local wholesalers", nearby: ["mysuru", "mangaluru", "davanagere", "bengaluru"] }
];

/* ══════════════════════════════════════════════
   MAHARASHTRA
══════════════════════════════════════════════ */
const maharashtraCities: CityInfo[] = [
  { name: "Mumbai", slug: "mumbai", state: "Maharashtra", type: "major", tagline: "India's financial capital and largest commercial metropolis", context: "the corporate headquarters, BFSI sector, media houses, and D2C brands", nearby: ["thane", "navi-mumbai", "pune", "nashik"] },
  { name: "Pune", slug: "pune", state: "Maharashtra", type: "major", tagline: "the education and automobile-IT hub of western Maharashtra", context: "the IT parks, automobile ancillary units, and a large student and startup population", nearby: ["mumbai", "nashik", "kolhapur", "solapur"] },
  { name: "Nagpur", slug: "nagpur", state: "Maharashtra", type: "major", tagline: "the geographic heart of India and the orange city of Vidarbha", context: "the MIHAN logistics zone, citrus trade, and government offices", nearby: ["amravati", "pune", "nashik", "raipur"] },
  { name: "Nashik", slug: "nashik", state: "Maharashtra", type: "major", tagline: "the wine capital of India and a fast-growing industrial and pilgrimage city", context: "the vineyards and wineries, engineering units, and Kumbh pilgrimage tourism", nearby: ["pune", "mumbai", "thane", "chhatrapati-sambhajinagar"] },
  { name: "Thane", slug: "thane", state: "Maharashtra", type: "major", tagline: "a dense commercial city bordering Mumbai in the metropolitan region", context: "the corporate offices, retail chains, and residential real estate", nearby: ["mumbai", "navi-mumbai", "nashik", "pune"] },
  { name: "Navi Mumbai", slug: "navi-mumbai", state: "Maharashtra", type: "major", tagline: "a planned satellite city and logistics-IT hub of the Mumbai region", context: "the IT parks, warehousing and port logistics, and D2C brands", nearby: ["mumbai", "thane", "pune", "nashik"] },
  { name: "Kolhapur", slug: "kolhapur", state: "Maharashtra", type: "headquarters", tagline: "a western Maharashtra hub known for its footwear, jaggery, and foundry industry", context: "the Kolhapuri footwear clusters, jaggery trade, and foundry MSMEs", nearby: ["pune", "solapur", "mumbai", "nashik"] },
  { name: "Solapur", slug: "solapur", state: "Maharashtra", type: "headquarters", tagline: "a textile and beedi manufacturing city in southern Maharashtra", context: "the powerloom textile units, beedi industry, and agricultural trade", nearby: ["pune", "kolhapur", "mumbai", "nashik"] },
  { name: "Amravati", slug: "amravati", state: "Maharashtra", type: "headquarters", tagline: "a cotton-trading and educational hub in the Vidarbha region", context: "the cotton mandis, agricultural trade, and education institutions", nearby: ["nagpur", "pune", "nashik", "solapur"] },
  { name: "Chhatrapati Sambhajinagar", slug: "chhatrapati-sambhajinagar", state: "Maharashtra", type: "major", tagline: "the historic city of Aurangabad, an auto and tourism hub in Marathwada", context: "the auto-component belt, Ajanta-Ellora tourism, and industrial estates", nearby: ["nashik", "pune", "nagpur", "mumbai"] }
];

/* ══════════════════════════════════════════════
   GUJARAT
══════════════════════════════════════════════ */
const gujaratCities: CityInfo[] = [
  { name: "Ahmedabad", slug: "ahmedabad", state: "Gujarat", type: "major", tagline: "Gujarat's largest city and the commercial capital of western India", context: "the textile and pharma industries, corporate offices, and fast-scaling D2C brands", nearby: ["gandhinagar", "vadodara", "surat", "rajkot"] },
  { name: "Surat", slug: "surat", state: "Gujarat", type: "major", tagline: "the diamond-polishing and textile capital of India", context: "the diamond cutting units, textile markets, and export houses", nearby: ["vadodara", "ahmedabad", "rajkot", "bhavnagar"] },
  { name: "Vadodara", slug: "vadodara", state: "Gujarat", type: "major", tagline: "a cultural and petrochemical-engineering hub of central Gujarat", context: "the petrochemical and engineering units, corporate offices, and education institutions", nearby: ["ahmedabad", "surat", "rajkot", "gandhinagar"] },
  { name: "Rajkot", slug: "rajkot", state: "Gujarat", type: "major", tagline: "the industrial heart of the Saurashtra region", context: "the engineering and casting MSMEs, machine-tool units, and agricultural trade", nearby: ["ahmedabad", "jamnagar", "bhavnagar", "junagadh"] },
  { name: "Gandhinagar", slug: "gandhinagar", state: "Gujarat", type: "headquarters", tagline: "Gujarat's planned capital city and GIFT City fintech hub", context: "the government offices, GIFT City financial firms, and IT companies", nearby: ["ahmedabad", "vadodara", "rajkot", "surat"] },
  { name: "Bhavnagar", slug: "bhavnagar", state: "Gujarat", type: "headquarters", tagline: "a port and ship-breaking city on the Saurashtra coast", context: "the Alang ship-breaking yard suppliers, salt and plastics trade, and diamond units", nearby: ["ahmedabad", "rajkot", "surat", "junagadh"] },
  { name: "Jamnagar", slug: "jamnagar", state: "Gujarat", type: "headquarters", tagline: "the brass-parts capital of India and home to the world's largest refinery", context: "the brass-parts clusters, refinery ancillary units, and export traders", nearby: ["rajkot", "bhavnagar", "junagadh", "ahmedabad"] },
  { name: "Junagadh", slug: "junagadh", state: "Gujarat", type: "growing", tagline: "a heritage city at the foot of Girnar and gateway to Gir forest", context: "the groundnut and agricultural trade, heritage-and-wildlife tourism, and local retail", nearby: ["rajkot", "jamnagar", "bhavnagar", "ahmedabad"] }
];

/* ══════════════════════════════════════════════
   RAJASTHAN
══════════════════════════════════════════════ */
const rajasthanCities: CityInfo[] = [
  { name: "Jaipur", slug: "jaipur", state: "Rajasthan", type: "major", tagline: "the Pink City capital of Rajasthan and a jewellery and tourism hub", context: "the gems-and-jewellery export houses, handicraft exporters, and tourism operators", nearby: ["ajmer", "alwar", "kota", "jodhpur"] },
  { name: "Jodhpur", slug: "jodhpur", state: "Rajasthan", type: "major", tagline: "the Blue City and handicraft-furniture export hub of Marwar", context: "the wooden-handicraft and furniture exporters, guar-gum industry, and tourism", nearby: ["jaipur", "bikaner", "udaipur", "ajmer"] },
  { name: "Udaipur", slug: "udaipur", state: "Rajasthan", type: "major", tagline: "the City of Lakes and a premier heritage-tourism destination", context: "the hospitality and wedding-tourism trade, marble and handicraft units, and retail", nearby: ["jaipur", "jodhpur", "ajmer", "bhilwara"] },
  { name: "Kota", slug: "kota", state: "Rajasthan", type: "major", tagline: "India's coaching capital on the banks of the Chambal", context: "the coaching-institute ecosystem, student housing, and stone-industry trade", nearby: ["jaipur", "ajmer", "bhilwara", "udaipur"] },
  { name: "Ajmer", slug: "ajmer", state: "Rajasthan", type: "headquarters", tagline: "a pilgrimage and education city around the Dargah Sharif", context: "the pilgrimage tourism, education institutions, and marble and handicraft trade", nearby: ["jaipur", "bhilwara", "kota", "jodhpur"] },
  { name: "Bikaner", slug: "bikaner", state: "Rajasthan", type: "headquarters", tagline: "a desert city known for its namkeen, sweets, and woollen trade", context: "the food-processing (bhujia) units, wool trade, and heritage tourism", nearby: ["jodhpur", "jaipur", "bhilwara", "alwar"] },
  { name: "Bhilwara", slug: "bhilwara", state: "Rajasthan", type: "growing", tagline: "the textile city of Rajasthan and a major suiting-fabric hub", context: "the textile and spinning mills, fabric traders, and processing units", nearby: ["ajmer", "udaipur", "kota", "jaipur"] },
  { name: "Alwar", slug: "alwar", state: "Rajasthan", type: "growing", tagline: "an industrial gateway between Delhi NCR and Jaipur", context: "the automobile and manufacturing units, agricultural trade, and logistics firms", nearby: ["jaipur", "gurugram", "delhi", "ajmer"] }
];

/* ══════════════════════════════════════════════
   MADHYA PRADESH
══════════════════════════════════════════════ */
const mpCities: CityInfo[] = [
  { name: "Indore", slug: "indore", state: "Madhya Pradesh", type: "major", tagline: "the commercial capital and cleanest city of India in central Madhya Pradesh", context: "the trading houses, IT and startups, and pharma and food industries", nearby: ["bhopal", "ujjain", "jabalpur", "gwalior"] },
  { name: "Bhopal", slug: "bhopal", state: "Madhya Pradesh", type: "major", tagline: "the lake-city capital of Madhya Pradesh", context: "the government ecosystem, education institutions, and electrical and pharma units", nearby: ["indore", "ujjain", "jabalpur", "sagar"] },
  { name: "Jabalpur", slug: "jabalpur", state: "Madhya Pradesh", type: "major", tagline: "a cultural and defence-manufacturing hub in the Mahakoshal region", context: "the defence ordnance factories, marble-rock tourism, and agricultural trade", nearby: ["bhopal", "sagar", "rewa", "gwalior"] },
  { name: "Gwalior", slug: "gwalior", state: "Madhya Pradesh", type: "major", tagline: "a historic fort city and educational hub of northern Madhya Pradesh", context: "the tourism, education institutions, and light manufacturing and trade", nearby: ["bhopal", "jhansi", "agra", "indore"] },
  { name: "Ujjain", slug: "ujjain", state: "Madhya Pradesh", type: "headquarters", tagline: "an ancient temple city and one of the sites of the Kumbh Mela", context: "the pilgrimage tourism, textile and agri trade, and hospitality businesses", nearby: ["indore", "bhopal", "jabalpur", "gwalior"] },
  { name: "Sagar", slug: "sagar", state: "Madhya Pradesh", type: "headquarters", tagline: "a lake-side education and trade town in the Bundelkhand-Mahakoshal belt", context: "the university-linked economy, agricultural trade, and local markets", nearby: ["bhopal", "jabalpur", "gwalior", "rewa"] },
  { name: "Rewa", slug: "rewa", state: "Madhya Pradesh", type: "headquarters", tagline: "the white-tiger land and gateway city of the Vindhya region", context: "the cement and mining trade, agricultural markets, and education institutions", nearby: ["jabalpur", "prayagraj", "mirzapur", "sagar"] }
];

/* ══════════════════════════════════════════════
   TAMIL NADU
══════════════════════════════════════════════ */
const tamilNaduCities: CityInfo[] = [
  { name: "Chennai", slug: "chennai", state: "Tamil Nadu", type: "major", tagline: "the capital of Tamil Nadu and the automobile-and-IT hub of South India", context: "the auto manufacturing, IT corridors, and healthcare and fintech firms", nearby: ["vellore", "tiruchirappalli", "coimbatore", "madurai"] },
  { name: "Coimbatore", slug: "coimbatore", state: "Tamil Nadu", type: "major", tagline: "the Manchester of South India, a textile and engineering powerhouse", context: "the textile mills, motor and pump manufacturers, and engineering MSMEs", nearby: ["erode", "salem", "tiruchirappalli", "chennai"] },
  { name: "Madurai", slug: "madurai", state: "Tamil Nadu", type: "major", tagline: "the temple city and cultural capital of southern Tamil Nadu", context: "the temple tourism, textile and jasmine trade, and healthcare hubs", nearby: ["tiruchirappalli", "tirunelveli", "chennai", "coimbatore"] },
  { name: "Tiruchirappalli", slug: "tiruchirappalli", state: "Tamil Nadu", type: "major", tagline: "an engineering and education hub on the Kaveri in central Tamil Nadu", context: "the BHEL ancillary units, education institutions, and agricultural trade", nearby: ["madurai", "salem", "chennai", "coimbatore"] },
  { name: "Salem", slug: "salem", state: "Tamil Nadu", type: "headquarters", tagline: "a steel, textile, and mango hub in western Tamil Nadu", context: "the steel and textile units, sago and mango trade, and engineering MSMEs", nearby: ["erode", "coimbatore", "tiruchirappalli", "vellore"] },
  { name: "Tirunelveli", slug: "tirunelveli", state: "Tamil Nadu", type: "headquarters", tagline: "a temple and education city in southern Tamil Nadu", context: "the agricultural and cement trade, education institutions, and local retail", nearby: ["madurai", "chennai", "coimbatore", "tiruchirappalli"] },
  { name: "Erode", slug: "erode", state: "Tamil Nadu", type: "growing", tagline: "the turmeric city and a major textile-and-agri trading center", context: "the turmeric and textile trade, powerloom units, and agricultural mandis", nearby: ["coimbatore", "salem", "tiruchirappalli", "madurai"] },
  { name: "Vellore", slug: "vellore", state: "Tamil Nadu", type: "growing", tagline: "a healthcare and education city known for CMC and its leather trade", context: "the hospitals and medical tourism, leather units, and education institutions", nearby: ["chennai", "salem", "tiruchirappalli", "madurai"] }
];

/* ══════════════════════════════════════════════
   TELANGANA
══════════════════════════════════════════════ */
const telanganaCities: CityInfo[] = [
  { name: "Hyderabad", slug: "hyderabad", state: "Telangana", type: "major", tagline: "the Cyberabad IT capital and pharma hub of South India", context: "the IT and SaaS corporations, pharma companies, and fast-growing startups", nearby: ["warangal", "nizamabad", "karimnagar", "khammam"] },
  { name: "Warangal", slug: "warangal", state: "Telangana", type: "major", tagline: "a historic Kakatiya city and an IT and textile hub of northern Telangana", context: "the textile and granite trade, tier-2 IT park, and education institutions", nearby: ["hyderabad", "karimnagar", "khammam", "nizamabad"] },
  { name: "Nizamabad", slug: "nizamabad", state: "Telangana", type: "headquarters", tagline: "a turmeric and agri-trading city in northern Telangana", context: "the turmeric and maize trade, agricultural markets, and local retail", nearby: ["hyderabad", "karimnagar", "warangal", "khammam"] },
  { name: "Karimnagar", slug: "karimnagar", state: "Telangana", type: "headquarters", tagline: "a granite-and-agriculture hub of northern Telangana", context: "the granite export units, agricultural trade, and local wholesalers", nearby: ["warangal", "hyderabad", "nizamabad", "khammam"] },
  { name: "Khammam", slug: "khammam", state: "Telangana", type: "growing", tagline: "an agriculture and coal-fringe trading city of eastern Telangana", context: "the agricultural mandis, tobacco and chilli trade, and local retailers", nearby: ["warangal", "hyderabad", "vijayawada", "karimnagar"] }
];

/* ══════════════════════════════════════════════
   ANDHRA PRADESH
══════════════════════════════════════════════ */
const andhraCities: CityInfo[] = [
  { name: "Visakhapatnam", slug: "visakhapatnam", state: "Andhra Pradesh", type: "major", tagline: "the port-city and largest commercial center of Andhra Pradesh", context: "the port and steel plant, IT parks, and pharma and fishing industries", nearby: ["rajahmundry", "vijayawada", "guntur", "kurnool"] },
  { name: "Vijayawada", slug: "vijayawada", state: "Andhra Pradesh", type: "major", tagline: "the commercial and logistics heart of coastal Andhra Pradesh", context: "the trading houses, transport and logistics hubs, and agricultural markets", nearby: ["guntur", "visakhapatnam", "nellore", "rajahmundry"] },
  { name: "Guntur", slug: "guntur", state: "Andhra Pradesh", type: "headquarters", tagline: "the chilli-and-tobacco trading capital of Andhra Pradesh", context: "the chilli and tobacco mandis, cotton trade, and education institutions", nearby: ["vijayawada", "nellore", "visakhapatnam", "kurnool"] },
  { name: "Nellore", slug: "nellore", state: "Andhra Pradesh", type: "headquarters", tagline: "an aquaculture and agriculture hub on the southern Andhra coast", context: "the shrimp aquaculture, mica and agri trade, and local businesses", nearby: ["vijayawada", "guntur", "tirupati", "chennai"] },
  { name: "Tirupati", slug: "tirupati", state: "Andhra Pradesh", type: "major", tagline: "the temple city of the world-famous Tirumala pilgrimage", context: "the pilgrimage tourism and hospitality, education institutions, and electronics manufacturing", nearby: ["nellore", "chennai", "vijayawada", "kurnool"] },
  { name: "Rajahmundry", slug: "rajahmundry", state: "Andhra Pradesh", type: "growing", tagline: "a cultural city on the Godavari with paper and agri industries", context: "the paper mills, agricultural and aqua trade, and river tourism", nearby: ["visakhapatnam", "vijayawada", "guntur", "nellore"] },
  { name: "Kurnool", slug: "kurnool", state: "Andhra Pradesh", type: "growing", tagline: "a gateway city of Rayalaseema known for cement and agriculture", context: "the cement units, agricultural mandis, and local trade", nearby: ["nellore", "tirupati", "vijayawada", "guntur"] }
];

/* ══════════════════════════════════════════════
   KERALA
══════════════════════════════════════════════ */
const keralaCities: CityInfo[] = [
  { name: "Kochi", slug: "kochi", state: "Kerala", type: "major", tagline: "the commercial capital of Kerala and a port-and-IT hub", context: "the port and shipping trade, IT parks (Infopark), and spice and tourism businesses", nearby: ["thrissur", "kollam", "kozhikode", "thiruvananthapuram"] },
  { name: "Thiruvananthapuram", slug: "thiruvananthapuram", state: "Kerala", type: "major", tagline: "the capital of Kerala and a Technopark IT hub", context: "the IT parks, government and space-research institutions, and tourism", nearby: ["kollam", "kochi", "thrissur", "kozhikode"] },
  { name: "Kozhikode", slug: "kozhikode", state: "Kerala", type: "major", tagline: "a historic Malabar trading city and spice-and-timber hub", context: "the spice and timber trade, textiles, and a growing IT startup base", nearby: ["kannur", "thrissur", "kochi", "thiruvananthapuram"] },
  { name: "Thrissur", slug: "thrissur", state: "Kerala", type: "headquarters", tagline: "the cultural capital of Kerala and its gold-jewellery trading hub", context: "the gold-jewellery businesses, banking and finance, and cultural tourism", nearby: ["kochi", "kozhikode", "thiruvananthapuram", "kollam"] },
  { name: "Kollam", slug: "kollam", state: "Kerala", type: "growing", tagline: "a cashew-processing and port town on the Kerala coast", context: "the cashew-processing units, marine trade, and backwater tourism", nearby: ["thiruvananthapuram", "kochi", "thrissur", "kozhikode"] },
  { name: "Kannur", slug: "kannur", state: "Kerala", type: "growing", tagline: "a handloom-and-Theyyam city on the north Malabar coast", context: "the handloom weaving cooperatives, timber trade, and tourism", nearby: ["kozhikode", "thrissur", "kochi", "thiruvananthapuram"] }
];

/* ══════════════════════════════════════════════
   PUNJAB
══════════════════════════════════════════════ */
const punjabCities: CityInfo[] = [
  { name: "Ludhiana", slug: "ludhiana", state: "Punjab", type: "major", tagline: "the industrial and hosiery-manufacturing capital of Punjab", context: "the hosiery and bicycle-parts industry, textile units, and agricultural trade", nearby: ["jalandhar", "patiala", "mohali", "amritsar"] },
  { name: "Amritsar", slug: "amritsar", state: "Punjab", type: "major", tagline: "the spiritual heart of Punjab, home of the Golden Temple", context: "the pilgrimage tourism and hospitality, textile trade, and food businesses", nearby: ["jalandhar", "ludhiana", "patiala", "mohali"] },
  { name: "Jalandhar", slug: "jalandhar", state: "Punjab", type: "major", tagline: "the sports-goods and hand-tools manufacturing hub of Punjab", context: "the sports-goods and hand-tools exporters, hosiery, and agri trade", nearby: ["ludhiana", "amritsar", "patiala", "mohali"] },
  { name: "Patiala", slug: "patiala", state: "Punjab", type: "headquarters", tagline: "a royal heritage and education city in south-eastern Punjab", context: "the education institutions, handloom (phulkari) craft, and agricultural trade", nearby: ["ludhiana", "mohali", "bathinda", "jalandhar"] },
  { name: "Bathinda", slug: "bathinda", state: "Punjab", type: "growing", tagline: "a thermal-power and cotton-belt city of the Malwa region", context: "the thermal-power and refinery ancillary units, cotton trade, and agri mandis", nearby: ["patiala", "ludhiana", "mohali", "amritsar"] },
  { name: "Mohali", slug: "mohali", state: "Punjab", type: "growing", tagline: "an IT and pharma satellite city of the Chandigarh tricity", context: "the IT parks, pharma units, and real estate", nearby: ["chandigarh", "patiala", "ludhiana", "jalandhar"] }
];

/* ══════════════════════════════════════════════
   HARYANA (beyond Delhi NCR)
══════════════════════════════════════════════ */
const haryanaCities: CityInfo[] = [
  { name: "Ambala", slug: "ambala", state: "Haryana", type: "headquarters", tagline: "a scientific-instruments manufacturing and cantonment city", context: "the scientific and surgical-instrument units, mixer-and-appliance trade, and cantonment economy", nearby: ["kurukshetra", "yamunanagar", "karnal", "chandigarh"] },
  { name: "Rohtak", slug: "rohtak", state: "Haryana", type: "headquarters", tagline: "an education and industrial hub of central Haryana", context: "the education institutions, textile and auto units, and agricultural trade", nearby: ["delhi", "sonipat", "hisar", "gurugram"] },
  { name: "Sonipat", slug: "sonipat", state: "Haryana", type: "growing", tagline: "an industrial and education city on Delhi's northern edge", context: "the manufacturing and food-processing units, universities, and agri trade", nearby: ["delhi", "panipat", "rohtak", "karnal"] },
  { name: "Yamunanagar", slug: "yamunanagar", state: "Haryana", type: "growing", tagline: "a plywood-and-paper industrial city of northern Haryana", context: "the plywood and paper mills, metal-utensils trade, and agricultural markets", nearby: ["ambala", "karnal", "kurukshetra", "saharanpur"] },
  { name: "Kurukshetra", slug: "kurukshetra", state: "Haryana", type: "growing", tagline: "the land of the Bhagavad Gita and a pilgrimage-and-education town", context: "the pilgrimage tourism, education institutions, and agricultural trade", nearby: ["karnal", "ambala", "yamunanagar", "panipat"] }
];

/* ══════════════════════════════════════════════
   ODISHA
══════════════════════════════════════════════ */
const odishaCities: CityInfo[] = [
  { name: "Bhubaneswar", slug: "bhubaneswar", state: "Odisha", type: "major", tagline: "the temple city and IT capital of Odisha", context: "the IT parks, government ecosystem, and education institutions", nearby: ["cuttack", "puri", "berhampur", "rourkela"] },
  { name: "Cuttack", slug: "cuttack", state: "Odisha", type: "major", tagline: "the commercial and silver-filigree hub of Odisha", context: "the silver-filigree artisans, trading houses, and textile markets", nearby: ["bhubaneswar", "puri", "berhampur", "rourkela"] },
  { name: "Rourkela", slug: "rourkela", state: "Odisha", type: "headquarters", tagline: "a steel city built around one of India's first public-sector plants", context: "the steel plant ancillary units, engineering MSMEs, and township retail", nearby: ["sambalpur", "bhubaneswar", "ranchi", "jamshedpur"] },
  { name: "Sambalpur", slug: "sambalpur", state: "Odisha", type: "headquarters", tagline: "a handloom (Sambalpuri) and industrial hub of western Odisha", context: "the Sambalpuri handloom clusters, coal and power trade, and local markets", nearby: ["rourkela", "bhubaneswar", "raipur", "cuttack"] },
  { name: "Berhampur", slug: "berhampur", state: "Odisha", type: "growing", tagline: "the silk city and commercial hub of southern Odisha", context: "the Berhampuri silk weaving, trading houses, and education institutions", nearby: ["bhubaneswar", "cuttack", "visakhapatnam", "puri"] },
  { name: "Puri", slug: "puri", state: "Odisha", type: "growing", tagline: "the Jagannath temple town and a premier coastal pilgrimage destination", context: "the pilgrimage tourism and hospitality, sand-art and handicraft trade, and retail", nearby: ["bhubaneswar", "cuttack", "berhampur", "rourkela"] }
];

/* ══════════════════════════════════════════════
   CHHATTISGARH
══════════════════════════════════════════════ */
const chhattisgarhCities: CityInfo[] = [
  { name: "Raipur", slug: "raipur", state: "Chhattisgarh", type: "major", tagline: "the capital of Chhattisgarh and a steel-and-agri trading hub", context: "the steel and rice-mill trade, corporate offices, and education institutions", nearby: ["bhilai", "durg", "bilaspur", "raigarh"] },
  { name: "Bhilai", slug: "bhilai", state: "Chhattisgarh", type: "major", tagline: "a steel township built around one of India's largest steel plants", context: "the steel plant ancillary units, engineering MSMEs, and township retail", nearby: ["durg", "raipur", "bilaspur", "raigarh"] },
  { name: "Bilaspur", slug: "bilaspur", state: "Chhattisgarh", type: "headquarters", tagline: "a railway-zone headquarters and power hub of central Chhattisgarh", context: "the railway ancillary trade, power-plant suppliers, and agricultural markets", nearby: ["raipur", "korba", "bhilai", "raigarh"] },
  { name: "Korba", slug: "korba", state: "Chhattisgarh", type: "growing", tagline: "the power capital of Chhattisgarh, built on coal and thermal plants", context: "the coal-mining and thermal-power ancillary units, aluminium trade, and local retail", nearby: ["bilaspur", "raipur", "raigarh", "bhilai"] },
  { name: "Durg", slug: "durg", state: "Chhattisgarh", type: "growing", tagline: "a twin city of Bhilai and an industrial-agri hub", context: "the steel ancillary units, agricultural trade, and education institutions", nearby: ["bhilai", "raipur", "bilaspur", "raigarh"] },
  { name: "Raigarh", slug: "raigarh", state: "Chhattisgarh", type: "growing", tagline: "a steel-and-power industrial town of eastern Chhattisgarh", context: "the sponge-iron and power units, Kosa-silk weaving, and coal trade", nearby: ["bilaspur", "korba", "raipur", "rourkela"] }
];

/* ══════════════════════════════════════════════
   ASSAM
══════════════════════════════════════════════ */
const assamCities: CityInfo[] = [
  { name: "Guwahati", slug: "guwahati", state: "Assam", type: "major", tagline: "the gateway of Northeast India and its largest commercial city", context: "the trading houses, tea auction center, oil-and-gas ancillary units, and IT startups", nearby: ["nagaon", "tezpur", "dibrugarh", "jorhat"] },
  { name: "Dibrugarh", slug: "dibrugarh", state: "Assam", type: "headquarters", tagline: "the tea and oil city of Upper Assam", context: "the tea estates and processing, oil-and-gas trade, and education institutions", nearby: ["jorhat", "tezpur", "guwahati", "nagaon"] },
  { name: "Silchar", slug: "silchar", state: "Assam", type: "headquarters", tagline: "the commercial heart of the Barak Valley in southern Assam", context: "the tea trade, agricultural markets, and cross-valley logistics", nearby: ["guwahati", "nagaon", "jorhat", "tezpur"] },
  { name: "Jorhat", slug: "jorhat", state: "Assam", type: "growing", tagline: "a tea-research and cultural hub of Upper Assam", context: "the tea estates and research institutions, education, and local trade", nearby: ["dibrugarh", "guwahati", "tezpur", "nagaon"] },
  { name: "Tezpur", slug: "tezpur", state: "Assam", type: "growing", tagline: "a scenic riverside town and gateway to Arunachal Pradesh", context: "the tea and agri trade, tourism, and defence-linked economy", nearby: ["guwahati", "nagaon", "jorhat", "dibrugarh"] },
  { name: "Nagaon", slug: "nagaon", state: "Assam", type: "growing", tagline: "a central Assam district town with a strong agrarian economy", context: "the rice and tea trade, agricultural markets, and local retail", nearby: ["guwahati", "tezpur", "jorhat", "silchar"] }
];

/* ══════════════════════════════════════════════
   UTTARAKHAND
══════════════════════════════════════════════ */
const uttarakhandCities: CityInfo[] = [
  { name: "Dehradun", slug: "dehradun", state: "Uttarakhand", type: "major", tagline: "the capital of Uttarakhand and an education-and-IT hub in the Doon Valley", context: "the education institutions, IT and startups, and tourism businesses", nearby: ["haridwar", "rishikesh", "roorkee", "haldwani"] },
  { name: "Haridwar", slug: "haridwar", state: "Uttarakhand", type: "major", tagline: "a Ganges pilgrimage city and SIDCUL industrial hub", context: "the pilgrimage tourism, SIDCUL manufacturing units, and Ayurveda businesses", nearby: ["rishikesh", "dehradun", "roorkee", "haldwani"] },
  { name: "Rishikesh", slug: "rishikesh", state: "Uttarakhand", type: "growing", tagline: "the yoga capital of the world on the banks of the Ganges", context: "the yoga and wellness tourism, adventure-tourism operators, and hospitality", nearby: ["haridwar", "dehradun", "roorkee", "haldwani"] },
  { name: "Haldwani", slug: "haldwani", state: "Uttarakhand", type: "headquarters", tagline: "the commercial gateway to the Kumaon hills", context: "the fruit and timber trade, wholesale markets, and transport logistics", nearby: ["rudrapur", "dehradun", "roorkee", "rampur"] },
  { name: "Rudrapur", slug: "rudrapur", state: "Uttarakhand", type: "growing", tagline: "an industrial (SIDCUL) city in the Kumaon Terai", context: "the automobile and FMCG manufacturing units, industrial suppliers, and trade", nearby: ["haldwani", "dehradun", "roorkee", "rampur"] },
  { name: "Roorkee", slug: "roorkee", state: "Uttarakhand", type: "growing", tagline: "an engineering-education and instruments town, home of IIT Roorkee", context: "the education institutions, survey-instrument units, and agricultural trade", nearby: ["haridwar", "dehradun", "saharanpur", "haldwani"] }
];

/* ══════════════════════════════════════════════
   OTHER UNION TERRITORIES & STATES
══════════════════════════════════════════════ */
const otherCities: CityInfo[] = [
  { name: "Chandigarh", slug: "chandigarh", state: "Chandigarh", type: "major", tagline: "a planned union-territory city and the shared capital of Punjab and Haryana", context: "the IT parks, corporate offices, and education-and-tourism economy", nearby: ["mohali", "ambala", "ludhiana", "patiala"] },
  { name: "Srinagar", slug: "srinagar", state: "Jammu & Kashmir", type: "major", tagline: "the summer-capital city of Jammu & Kashmir in the Kashmir Valley", context: "the handicraft (pashmina, papier-mâché) exporters, tourism, and horticulture trade", nearby: ["jammu", "amritsar", "jalandhar", "ludhiana"] },
  { name: "Jammu", slug: "jammu", state: "Jammu & Kashmir", type: "major", tagline: "the City of Temples and winter capital of Jammu & Kashmir", context: "the pilgrimage tourism (Vaishno Devi), trade, and government offices", nearby: ["srinagar", "amritsar", "jalandhar", "ludhiana"] },
  { name: "Panaji", slug: "panaji", state: "Goa", type: "major", tagline: "the capital of Goa and a tourism-and-hospitality hub", context: "the tourism and hospitality, events and real estate, and trade", nearby: ["margao", "vasco-da-gama", "mumbai", "mangaluru"] },
  { name: "Margao", slug: "margao", state: "Goa", type: "headquarters", tagline: "the commercial capital of Goa in the south", context: "the trading houses, tourism, and education institutions", nearby: ["panaji", "vasco-da-gama", "mangaluru", "mumbai"] },
  { name: "Vasco da Gama", slug: "vasco-da-gama", state: "Goa", type: "growing", tagline: "Goa's port and railway town near Mormugao harbour", context: "the port logistics, tourism, and fisheries trade", nearby: ["panaji", "margao", "mangaluru", "mumbai"] }
];

/* The north-east, the Himalayan states and the island/enclave UTs. Added so
   that every state and UT in lib/geo.ts has at least one city with real
   service pages behind it — a state hub with nothing to link to is a dead end,
   and its Service schema would otherwise advertise a URL that 404s. */
const northeastHimalayanAndUtCities: CityInfo[] = [
  { name: "Shillong", slug: "shillong", state: "Meghalaya", type: "major", tagline: "the capital of Meghalaya and the commercial centre of the Khasi Hills", context: "the tourism and hospitality trade, education institutions, and government contractors", nearby: ["guwahati", "silchar", "agartala", "aizawl"] },
  { name: "Agartala", slug: "agartala", state: "Tripura", type: "major", tagline: "the capital of Tripura and a border-trade city on the Bangladesh frontier", context: "the cross-border trade, rubber and bamboo processing, and healthcare and education services", nearby: ["silchar", "guwahati", "shillong", "kolkata"] },
  { name: "Aizawl", slug: "aizawl", state: "Mizoram", type: "major", tagline: "the capital of Mizoram, built along the ridges of the Lushai Hills", context: "the horticulture and handloom trade, government offices, and a fast-growing retail sector", nearby: ["silchar", "shillong", "agartala", "guwahati"] },
  { name: "Imphal", slug: "imphal", state: "Manipur", type: "major", tagline: "the capital of Manipur and the commercial heart of the Imphal Valley", context: "the handloom and handicraft trade, the Moreh border route, and education and healthcare services", nearby: ["silchar", "kohima", "dimapur", "guwahati"] },
  { name: "Kohima", slug: "kohima", state: "Nagaland", type: "major", tagline: "the hill capital of Nagaland", context: "the government offices, festival and heritage tourism, and retail and education services", nearby: ["dimapur", "imphal", "guwahati", "jorhat"] },
  { name: "Dimapur", slug: "dimapur", state: "Nagaland", type: "major", tagline: "Nagaland's largest city and its commercial and transport gateway", context: "the wholesale trade, transport and logistics fleets, and auto and construction suppliers", nearby: ["kohima", "guwahati", "jorhat", "imphal"] },
  { name: "Itanagar", slug: "itanagar", state: "Arunachal Pradesh", type: "major", tagline: "the capital of Arunachal Pradesh in the Himalayan foothills", context: "the government offices, hydropower and construction contractors, and tour operators", nearby: ["guwahati", "tezpur", "jorhat", "dibrugarh"] },
  { name: "Gangtok", slug: "gangtok", state: "Sikkim", type: "major", tagline: "the capital of Sikkim in the eastern Himalaya", context: "the tourism and hospitality trade, pharmaceutical manufacturing, and organic-farming exports", nearby: ["siliguri", "kolkata", "guwahati", "shillong"] },
  { name: "Shimla", slug: "shimla", state: "Himachal Pradesh", type: "major", tagline: "the capital of Himachal Pradesh and a Himalayan hill station", context: "the tourism and hospitality trade, apple horticulture supply chains, and education institutions", nearby: ["chandigarh", "dharamshala", "ludhiana", "dehradun"] },
  { name: "Dharamshala", slug: "dharamshala", state: "Himachal Pradesh", type: "headquarters", tagline: "the Kangra valley headquarters town and a year-round tourism destination", context: "the hospitality and homestay trade, tea estates, and education and wellness institutions", nearby: ["shimla", "chandigarh", "ludhiana", "amritsar"] },
  { name: "Leh", slug: "leh", state: "Ladakh", type: "major", tagline: "the high-altitude capital of Ladakh on the upper Indus", context: "the adventure-tourism and trekking trade, hospitality, and handicraft businesses", nearby: ["srinagar", "jammu", "chandigarh", "dehradun"] },
  { name: "Puducherry", slug: "puducherry", state: "Puducherry", type: "major", tagline: "a former French colonial town and union-territory capital on the Coromandel coast", context: "the tourism and hospitality trade, garment units, and education and wellness institutions", nearby: ["chennai", "madurai", "coimbatore", "bengaluru"] },
  { name: "Port Blair", slug: "port-blair", state: "Andaman & Nicobar Islands", type: "major", tagline: "the capital of the Andaman & Nicobar Islands and the archipelago's only city", context: "the island tourism trade, fisheries, and shipping and government services", nearby: ["chennai", "kolkata", "visakhapatnam", "bhubaneswar"] },
  { name: "Kavaratti", slug: "kavaratti", state: "Lakshadweep", type: "headquarters", tagline: "the administrative capital of Lakshadweep", context: "the coconut and coir processing, fisheries, and island tourism", nearby: ["kochi", "kozhikode", "mangaluru", "thiruvananthapuram"] },
  { name: "Silvassa", slug: "silvassa", state: "Dadra & Nagar Haveli and Daman & Diu", type: "major", tagline: "the capital of Dadra & Nagar Haveli and a duty-advantaged industrial town", context: "the textile, plastics and engineering units in its industrial estates", nearby: ["surat", "mumbai", "vadodara", "nashik"] },
  { name: "Daman", slug: "daman", state: "Dadra & Nagar Haveli and Daman & Diu", type: "growing", tagline: "a coastal district headquarters on the Gujarat seaboard", context: "the tourism and hospitality trade, fisheries, and small manufacturing units", nearby: ["silvassa", "surat", "mumbai", "vadodara"] }
];

export const cities: CityInfo[] = [
  ...biharCities,
  ...jharkhandCities,
  ...upCities,
  ...wbCities,
  ...delhiNcrCities,
  ...karnatakaCities,
  ...maharashtraCities,
  ...gujaratCities,
  ...rajasthanCities,
  ...mpCities,
  ...tamilNaduCities,
  ...telanganaCities,
  ...andhraCities,
  ...keralaCities,
  ...punjabCities,
  ...haryanaCities,
  ...odishaCities,
  ...chhattisgarhCities,
  ...assamCities,
  ...uttarakhandCities,
  ...northeastHimalayanAndUtCities,
  ...otherCities
];

export function generateSlug(serviceSlug: string, citySlug: string): string {
  return `${serviceSlug}-company-in-${citySlug}`;
}

export interface LocalPageData {
  slug: string;
  serviceSlug: string;
  citySlug: string;
  cityName: string;
  state: string;
  serviceName: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  tagline: string;
  aboutContent: string;
  whyThisCity: string;
  localEconomy: string;
  whyChooseUs: { title: string; desc: string }[];
  benefits: string[];
  features: string[];
  process: ProcessStep[];
  techStack: string[];
  useCases: string[];
  deliverables: string[];
  timeline: string;
  idealFor: string[];
  industries: string[];
  pricing: PricingTier[];
  marquee: string[];
  stats: typeof stats;
  // Word-for-word landing page copy — populated only for the Mobile App
  // Development service (that's the only copy provided verbatim so far).
  // Null for other services until matching verbatim copy is supplied.
  landingCopy: MobileAppFullCopy | null;
  contactInfo: ContactInfo;
  faqs: { q: string; a: string }[];
  nearbySlugs: { title: string; url: string }[];
  relatedServices: { title: string; url: string }[];
  // Every service we offer in this city (all 8), with the current one flagged —
  // rendered on each city page so visitors always see the full service menu.
  allServices: { name: string; url: string; current: boolean }[];
  schemas: Record<string, unknown>[];
}

// Builds the word-for-word Mobile App Development landing copy for a given
// city. Only the city name (and the dynamic phone/email/address/state) is
// substituted — every other sentence matches the source copy exactly.
export function buildMobileAppFullCopy(cityName: string, state: string): MobileAppFullCopy {
  const c = cityName;

  return {
    seoTitle: `App Development in ${c} | Best Mobile App Development Services`,

    metaIntro: `Looking for app development in ${c}? Sabka Saathi - High-Performance Software Development & CRM Automation is the leading mobile app development company in ${c}, ${state}. We specialize in professional app development in ${c} including Android app development in ${c}, iOS app development in ${c}, and cross-platform solutions. Our expert team delivers innovative mobile apps that drive business growth for ${c} businesses. Whether you need custom mobile app development in ${c}, React Native app development in ${c}, or Flutter app development in ${c}, we provide comprehensive app development services in ${c} with affordable pricing and 24/7 support.`,

    branding: {
      company: "Sabka Saathi - High-Performance Software Development & CRM Automation",
      tagline: "Empowering Businesses Digitally"
    },

    navigation: ["Home", "Services", "About", "Projects", "Internship", "Blog", "Get Quote"],

    cta: {
      callNow: contactInfo.phone,
      quoteButton: "Get Free Quote"
    },

    marquee: [
      `🚀 Mobile App Development in ${c}`,
      "💻 Professional Mobile App Development Solutions",
      `📱 Mobile-First Mobile App Development in ${c}`,
      "⚡ High-Performance Mobile App Development",
      "💰 Affordable Mobile App Development Experts",
      `🎯 Top Mobile App Development Developers in ${c}`,
      "🔧 24/7 Mobile App Development Support",
      `🏆 Leading Mobile App Development Agency in ${c}`,
      `📞 Call: ${contactInfo.phone}`
    ],

    completeServicesSection: {
      heading: `App Development in ${c} - Complete Services`,
      paragraphs: [
        `When it comes to app development in ${c}, Sabka Saathi - High-Performance Software Development & CRM Automation stands out as the premier choice. We specialize in comprehensive app development services in ${c} including Android app development in ${c}, iOS app development in ${c}, and cross-platform solutions. Our expert team of app developers in ${c} delivers cutting-edge mobile applications using the latest technologies and best practices.`,
        `Whether you're a startup or an established business looking for app development in ${c}, we provide end-to-end solutions from concept to deployment. Our app development services in ${c} include custom mobile app development, React Native app development in ${c}, Flutter app development in ${c}, UI/UX design, app maintenance, and 24/7 support.`,
        `With 5+ years of experience in app development in ${c}, we understand the unique needs of ${c} businesses. Our team combines technical expertise with local market knowledge to deliver apps that drive business growth and enhance user engagement. Choose us for professional app development in ${c} and transform your business with innovative mobile solutions.`
      ],
      features: [
        { title: "Native Android & iOS Development", desc: `Professional native mobile app development in ${c} using the latest technologies and frameworks for optimal performance and user experience.` },
        { title: "Cross-Platform App Development", desc: `Cost-effective cross-platform mobile app development in ${c} using React Native and Flutter for both Android and iOS platforms.` },
        { title: "Secure & Scalable Solutions", desc: `Robust and secure mobile app development solutions in ${c} with enterprise-grade security and scalability for business growth.` },
        { title: "24/7 Support & Maintenance", desc: `Round-the-clock technical support and maintenance services for mobile apps in ${c}, ensuring optimal performance and reliability.` }
      ]
    },

    servicesSection: {
      heading: `Our Mobile App Development Services in ${c}`,
      subheading: "Comprehensive mobile app development solutions tailored for businesses in " + c,
      blocks: [
        {
          title: "Android App Development",
          badge: "Native Development",
          desc: `Professional Android app development in ${c} using Kotlin and Java. We create high-performance, user-friendly Android applications that work seamlessly across all Android devices.`,
          bullets: ["Native Android Development (Kotlin/Java)", "Material Design Implementation", "Google Play Store Optimization", "Performance Optimization"],
          cta: "Get Android App Quote"
        },
        {
          title: "iOS App Development",
          badge: "Native Development",
          desc: `Expert iOS app development in ${c} using Swift and Objective-C. We build elegant, high-performance iOS applications that meet Apple's strict quality standards.`,
          bullets: ["Native iOS Development (Swift/Objective-C)", "iOS Design Guidelines Compliance", "App Store Optimization", "iOS Version Compatibility"],
          cta: "Get iOS App Quote"
        },
        {
          title: "Cross-Platform Development",
          badge: "React Native & Flutter",
          desc: `Cost-effective cross-platform mobile app development in ${c} using React Native and Flutter. Single codebase for both Android and iOS platforms.`,
          bullets: ["React Native Development", "Flutter Development", "Single Codebase for Both Platforms", "Faster Development & Lower Costs"],
          cta: "Get Cross-Platform Quote"
        },
        {
          title: "UI/UX Design",
          badge: "Design Services",
          desc: `Professional mobile app UI/UX design in ${c}. We create intuitive, engaging, and user-friendly interfaces that enhance user experience and drive engagement.`,
          bullets: ["User Research & Analysis", "Wireframing & Prototyping", "Visual Design & Branding", "User Testing & Optimization"],
          cta: "Get Design Quote"
        }
      ]
    },

    processSection: {
      heading: `Our Mobile App Development Process in ${c}`,
      subheading: "Transparent and efficient development process for successful mobile app delivery",
      steps: [
        { step: 1, title: "Discovery & Planning", desc: "We start by understanding your business requirements, target audience, and project goals. Our team conducts thorough research and creates a comprehensive project plan.", bullets: ["Business Analysis", "Market Research", "Technical Feasibility", "Project Timeline"] },
        { step: 2, title: "Design & Prototyping", desc: "Our designers create wireframes, mockups, and interactive prototypes. We focus on creating intuitive user experiences and engaging visual designs.", bullets: ["Wireframing", "UI/UX Design", "Interactive Prototypes", "Design Reviews"] },
        { step: 3, title: "Development & Testing", desc: "Our developers build your mobile app using the latest technologies and best practices. We conduct rigorous testing to ensure quality and performance.", bullets: ["Agile Development", "Code Quality Standards", "Comprehensive Testing", "Performance Optimization"] },
        { step: 4, title: "Deployment & Support", desc: "We deploy your app to app stores and provide ongoing support and maintenance. Our team ensures your app runs smoothly and stays updated.", bullets: ["App Store Deployment", "Post-Launch Support", "Regular Updates", "24/7 Maintenance"] }
      ]
    },

    pricingSection: {
      heading: `Mobile App Development Pricing in ${c}`,
      subheading: `Transparent pricing for all our mobile app development services across ${c}`,
      tiers: [
        { name: "Starter Package", price: "₹10K - 15K", items: ["Simple Mobile App", "Basic UI/UX Design", "3-5 Screens", "Core Features", "1 Month Support"], cta: "Call Now" },
        { name: "Growth Package", price: "₹18K - 35K", badge: "Most Popular", items: ["Medium Complexity App", "Advanced UI/UX Design", "8-12 Screens", "Push Notifications & APIs", "3 Months Support"], cta: "Call Now" },
        { name: "Enterprise Package", price: "₹45K - 100K+", items: ["Complex Enterprise App", "Custom UI/UX & Role Access", "Unlimited Screens", "Payment Gateway & Admin Panel", "6 Months Support"], cta: "Call Now" }
      ]
    },

    whyChooseUsSection: {
      heading: "Why Choose Sabka Saathi - High-Performance Software Development & CRM Automation in " + c + "?",
      subheading: `We are the trusted choice for mobile app development in ${c}`,
      items: [
        { title: "Expert Team", desc: `Our team of experienced developers and designers in ${c} ensures high-quality mobile app development services.` },
        { title: "Timely Delivery", desc: "We commit to delivering your mobile app on time without compromising on quality or features." },
        { title: "Affordable Pricing", desc: `Get professional mobile app development services in ${c} at competitive and transparent pricing.` },
        { title: "24/7 Support", desc: "Round-the-clock technical support and maintenance services for your mobile applications." }
      ]
    },

    cityDigitalHubSection: {
      heading: `Mobile App Development in ${c}, ${state}`,
      subheading: `Empowering businesses in ${c} with innovative mobile app solutions`,
      intro: [
        `${c} is rapidly emerging as a digital hub in ${state}, with growing businesses and educational institutions embracing mobile technology. Our expertise in local market dynamics ensures your app succeeds in this evolving landscape.`,
        `We understand the unique challenges and opportunities in ${c}, from supporting educational excellence to driving business innovation. Partner with us to transform your vision into a powerful mobile solution.`
      ],
      points: [
        { title: "Educational Excellence", desc: `Help educational institutions in ${c} embrace digital transformation with custom mobile applications that enhance learning experiences and streamline administrative processes.` },
        { title: "Business Solutions", desc: `Transform your business operations in ${c} with innovative mobile apps that improve efficiency, customer engagement, and market reach.` },
        { title: "Digital Transformation", desc: `Lead ${c}'s digital revolution with cutting-edge mobile applications that modernize business operations and enhance customer experiences.` },
        { title: "Local Market Expertise", desc: `We understand the unique business landscape and customer preferences in ${c}, enabling us to create apps that resonate with local users.` }
      ]
    },

    quoteFormSection: {
      heading: `Get Your Free Mobile App Development Quote in ${c}`,
      subheading: "Contact us today for a free consultation and quote for your mobile app development project",
      fields: ["Full Name *", "Phone Number *", "Select Service *", "Message * — Please describe your project requirements..."]
    },

    whyChooseCompanySection: {
      heading: `Why Choose App Development in ${c} with Sabka Saathi - High-Performance Software Development & CRM Automation?`,
      paragraphs: [
        `When searching for app development in ${c}, businesses trust Sabka Saathi - High-Performance Software Development & CRM Automation as the premier choice. We are the leading provider of app development services in ${c}, specializing in professional Android app development in ${c}, expert iOS app development in ${c}, and innovative cross-platform app development in ${c}. Our experienced app developers in ${c} have delivered 50+ successful mobile applications for businesses across ${c}, ${state}.`,
        `We are recognized as the best app development company in ${c}, offering affordable app development in ${c} without compromising on quality. Our comprehensive app development services in ${c} include React Native app development in ${c}, Flutter app development in ${c}, native app development in ${c}, UI/UX design, and 24/7 app maintenance in ${c}. Whether you need custom mobile app development in ${c}, enterprise app solutions, or startup app development, we provide end-to-end app development in ${c} that drives business growth and digital transformation.`,
        `Looking for other IT services in ${c}? We also provide website development in ${c} and software development in ${c} to help your business establish a complete digital presence.`
      ]
    },

    faqsSection: {
      heading: "Frequently Asked Questions",
      subheading: `Common questions about mobile app development in ${c}`,
      items: [
        { q: `How much does mobile app development cost in ${c}?`, a: `Mobile app development costs in ${c} vary based on complexity, features, and platform. Our Starter packages range from ₹10,000 to ₹15,000, Growth packages range from ₹18,000 to ₹35,000, and Enterprise custom apps range from ₹45,000 to ₹1,00,000+. We provide transparent pricing with no hidden costs.` },
        { q: `How long does it take to develop a mobile app in ${c}?`, a: "Development time depends on app complexity. Simple apps take 2-4 weeks, medium complexity apps take 6-8 weeks, and complex enterprise apps take 12-16 weeks. We ensure timely delivery without compromising quality." },
        { q: `Do you provide post-launch support for mobile apps in ${c}?`, a: "Yes, we provide comprehensive post-launch support including bug fixes, updates, maintenance, and 24/7 technical support. Our support packages ensure your app runs smoothly and stays updated with the latest features." },
        { q: `Can you develop apps for both Android and iOS in ${c}?`, a: `Absolutely! We specialize in both Android and iOS app development in ${c}. We also offer cross-platform development using React Native and Flutter, which allows us to create apps for both platforms from a single codebase.` },
        { q: `What technologies do you use for mobile app development in ${c}?`, a: `We use the latest technologies including React Native, Flutter, Kotlin, Java, Swift, Objective-C, Firebase, Node.js, and MongoDB. Our technology stack ensures high-performance, scalable, and secure mobile applications for businesses in ${c}.` },
        { q: `Do you provide UI/UX design services for mobile apps in ${c}?`, a: "Yes, we provide comprehensive UI/UX design services including wireframing, prototyping, user research, visual design, and user testing. Our designers create intuitive and engaging interfaces that enhance user experience and drive app adoption." },
        { q: `Can you help with app store submission and optimization in ${c}?`, a: "Absolutely! We handle complete app store submission for both Google Play Store and Apple App Store. Our services include app store optimization (ASO), metadata optimization, screenshot design, and compliance with store guidelines to ensure successful app launch." },
        { q: `What industries do you serve for mobile app development in ${c}?`, a: `We serve various industries including education, healthcare, e-commerce, finance, real estate, tourism, agriculture, manufacturing, and local businesses. Our expertise allows us to create industry-specific solutions that meet unique business requirements in ${c}.` },
        { q: `Do you offer mobile app maintenance and updates in ${c}?`, a: "Yes, we provide comprehensive maintenance services including bug fixes, security updates, performance optimization, feature additions, OS compatibility updates, and 24/7 technical support to ensure your app runs smoothly and stays current with the latest standards." },
        { q: `Can you integrate third-party services in mobile apps developed in ${c}?`, a: "Yes, we can integrate various third-party services including payment gateways, social media APIs, Google Maps, analytics tools, push notification services, cloud storage, CRM systems, and other business tools to enhance app functionality and user experience." },
        { q: `What is your mobile app development process in ${c}?`, a: "Our process includes: 1) Discovery & Planning, 2) UI/UX Design & Prototyping, 3) Development & Testing, 4) Deployment & Launch, 5) Post-launch Support & Maintenance. We follow agile methodology with regular client communication and milestone deliveries throughout the project." }
      ]
    },

    leadingItCompanySection: {
      heading: `Leading IT Company in ${c} - Sabka Saathi - High-Performance Software Development & CRM Automation`,
      subheading: `Comprehensive IT solutions and software development services for businesses in ${c}`,
      paragraph: `For any assistance in IT, we at Sabka Saathi - High-Performance Software Development & CRM Automation, have a solution for you. We provide the Best IT Software Development Services in ${c} ${state}. Whether it is related to the development of customized software, development of a best Responsive website or E-Commerce Website, or development of Customized Mobile Application for Android or any type of Web Application, we have a vast experience of more than 5 years in development. With 100% Clients satisfaction, we are the leading IT Company in ${c}, ${state}, India. Contact Sabka Saathi - High-Performance Software Development & CRM Automation for any software related business assistance for your Business.`,
      keywords: `software services & solutions ${c} ${state}, website development company in ${c} ${state}, software companies in ${c}, it companies in ${c}, it companies in ${state}, software development company in ${c} ${state}, top it companies in ${c}, software development company ${c} ${state}, it company in ${c}, Patna software company list, web design company in ${c}, website designing company in ${c}, website company in ${c} ${state}, website design in ${c}, list of web design company in ${c}, software development company in ${c}, app developer in ${c}, mobile app development company in ${c}, android app development in ${c}, website company in ${c}, seo company in ${c}, seo company in ${c} ${state}, digital marketing company in ${c}, seo services in ${c}, seo training in ${c}, digital marketing course in ${c}, seo experts in ${c}, software jobs in ${c} for freshers, list of software company in ${c}, software developer in ${c}, computer & software developer ${c} ${state}, it job in ${c}, java developer jobs in ${c}, new dot net developer job in ${c}, software developer salary`
    },

    contactSection: {
      heading: `Contact Us for Mobile App Development in ${c}`,
      subheading: "Get in touch with our team for professional mobile app development services",
      call: contactInfo.phone,
      callNote: "Available 24/7",
      email: contactInfo.email,
      emailNote: "Quick Response",
      address: contactInfo.address,
      addressNote: "Main Office"
    },

    successMetricsSection: {
      heading: `Our Success Metrics in ${c}`,
      subheading: `Trusted by businesses across ${c} for mobile app development`,
      metrics: [
        { value: stats.projectsDelivered, label: "Apps Developed" },
        { value: stats.clientSatisfaction, label: "Client Satisfaction" },
        { value: stats.supportAvailability, label: "Support Available" },
        { value: stats.yearsExperience, label: "Years Experience" }
      ]
    },

    footer: {
      company: "Sabka Saathi - High-Performance Software Development & CRM Automation",
      tagline: "Digital Solutions Provider",
      description: "Empowering businesses with cutting-edge digital solutions. We specialize in building premium mobile apps, websites, and custom software tailored to your needs.",
      quickLinks: ["Home", "Services", "Products", "Projects", "About", "Internship", "Contact"],
      servicesList: ["App Dev", "Web Design", "Web App", "Software", "SEO Services"],
      contact: {
        address: contactInfo.address,
        phone: contactInfo.phone,
        email: contactInfo.email,
        hours: contactInfo.hours
      },
      copyright: "© 2025 Sabka Saathi - High-Performance Software Development & CRM Automation. All rights reserved.",
      legalLinks: ["Privacy Policy", "Terms of Service", "Sitemap"]
    }
  };
}

export function getPagesList() {
  const list: { slug: string; serviceSlug: string; citySlug: string }[] = [];
  cities.forEach((city) => {
    Object.keys(services).forEach((serviceSlug) => {
      list.push({
        slug: generateSlug(serviceSlug, city.slug),
        serviceSlug,
        citySlug: city.slug
      });
    });
  });
  return list;
}

export function getContentBySlug(slug: string): LocalPageData | null {
  const page = getPagesList().find((p) => p.slug === slug);
  if (!page) return null;

  const city = cities.find((c) => c.slug === page.citySlug)!;
  const service = services[page.serviceSlug]!;

  const serviceName = service.name;
  const cityName = city.name;
  const state = city.state;

  const h1 = `${serviceName} Company in ${cityName}`;
  const metaTitle = `${serviceName} Company in ${cityName}, ${state} | Sabka Saathi`;
  const metaDescription = `Looking for the best ${serviceName} company near you in ${cityName}, ${state}? Sabka Saathi builds custom, high-performance digital systems for businesses in and around ${cityName}. Get a free quote today!`;

  const tagline = `Empowering ${cityName} with premium, scale-ready digital solutions. We help businesses across ${state} automate operations, drive client leads, and stand out.`;

  const aboutContent = `Sabka Saathi provides remote ${serviceName.toLowerCase()} services to businesses in ${cityName}, ${state}. As ${city.tagline}, ${cityName} is witnessing a rapid transition to digital-first business operations. Our technical team studies the specific opportunities within ${city.context}, allowing us to design highly customized platforms that streamline workflows, reduce administrative overhead, and build solid customer relationships — all delivered through remote discovery calls, design reviews, and weekly builds.`;

  // A second, distinct paragraph that leads with the city's own economic
  // identity rather than repeating the service name — this is what gives
  // each page unique substance instead of reading like a keyword template.
  const whyThisCity = `${cityName} is ${city.tagline}. That identity shapes what businesses here actually need from technology: teams built around ${city.context} are usually solving for reliability, local trust, and fast turnaround — not generic software. We design every ${serviceName.toLowerCase()} project around that reality, so what we ship fits how ${cityName} businesses already operate rather than forcing a one-size-fits-all system onto them.`;

  // City-type-aware paragraph grounded in each city's own economy (city.context
  // is unique per city), so this section reads differently for a metro, a
  // district HQ, and an emerging town instead of being keyword-swapped.
  const typeFraming: Record<CityInfo["type"], string> = {
    major: `As one of ${state}'s larger commercial centres, ${cityName} already has an established base of businesses ready to digitise`,
    headquarters: `As a district headquarters, ${cityName} concentrates the administrative and trading activity of its region`,
    growing: `${cityName} is a fast-growing market where many local businesses are moving online for the first time`,
    district: `${cityName} anchors the day-to-day commerce of its surrounding district`
  };
  const localEconomy = `${typeFraming[city.type]}. Its economy runs on ${city.context}. When we build ${serviceName.toLowerCase()} for ${cityName} businesses, we design around exactly those sectors — the workflows, payment habits, and customer expectations they depend on — instead of shipping a generic template.`;

  const whyChooseUs = [
    {
      title: `Remote Delivery, Local Understanding of ${state}`,
      desc: `We work with clients across ${cityName} and ${state} entirely through remote discovery calls, design reviews, and weekly builds — no travel overhead passed on to you.`
    },
    {
      title: "Next.js Speed & Performance",
      desc: "Our web platforms are built using React and Next.js, targeting page load times under 1 second to improve conversions."
    },
    {
      title: "Customized Automation Systems",
      desc: "No boilerplate templates. We build custom admin dashboards, automated payment structures, and databases designed for you."
    },
    {
      title: "Unified WhatsApp API Integration",
      desc: `Connect directly with customers in ${cityName} by sending automated receipts, lead updates, and notifications via WhatsApp.`
    },
    {
      title: "Predictable, Fast Turnaround",
      desc: `Most ${serviceName.toLowerCase()} projects for ${cityName} clients are scoped, built, and launched within ${service.timeline}, with weekly progress you can review yourself.`
    }
  ];

  // Marquee/banner strip content — combines the service's base taglines
  // with two city-specific lines, so the scrolling banner isn't identical
  // across every single page in the sitemap.
  const marquee = [
    ...service.marqueeBase,
    `${serviceName} Company in ${cityName}`,
    `Trusted by Businesses Across ${state}`
  ];

  const landingCopy =
    page.serviceSlug === "mobile-app-development"
      ? buildMobileAppFullCopy(cityName, state)
      : null;


  const faqs = [
    {
      q: `Why should I choose Sabka Saathi for ${serviceName} in ${cityName}?`,
      a: `Sabka Saathi is a digital services agency serving businesses across India, including ${cityName}, ${state}. We study the specific trade patterns and requirements of local businesses. We don't just write code; we design CRM systems, local payment setups, and fast web layers that directly support your growth.`
    },
    {
      q: `What is the estimated cost of ${serviceName} in ${cityName}?`,
      a: `Our pricing for ${cityName} clients starts at ${service.pricing[0].priceRange} for a ${service.pricing[0].scope.toLowerCase()}, going up to ${service.pricing[2].priceRange} for a ${service.pricing[2].scope.toLowerCase()}. We construct custom minimum viable products (MVPs) designed for ${cityName} businesses, ensuring you only pay for features that add business value. Get in touch with us for a free technical estimation.`
    },
    {
      q: `How long will it take to build a ${serviceName} system?`,
      a: `Most custom projects are designed, built, and launched in ${service.timeline}. We work in agile development sprints, providing weekly progress updates and interactive preview builds so you are always in control.`
    },
    {
      q: `Do you provide support and maintenance for clients in ${cityName}?`,
      a: `Yes! Depending on your package, you get ${service.pricing[0].support.toLowerCase()} up to ${service.pricing[2].support.toLowerCase()}, plus ${stats.supportAvailability} support availability for critical issues.`
    },
    {
      q: `Can you integrate local payment processors like Razorpay for ${cityName} projects?`,
      a: `Absolutely. We integrate Razorpay, Stripe, and custom UPI gateway systems. This allows your customers in ${cityName} to make payments via credit cards, net banking, or UPI apps safely and securely.`
    },
    {
      q: `How do we get started?`,
      a: `Simply fill out our contact form or click Get Started. We will schedule a free discovery call to analyze your business goals, draft a system requirement plan, and outline a detailed development path.`
    },
    {
      q: `What technologies do you use for ${serviceName.toLowerCase()} projects in ${cityName}?`,
      a: `We build on ${service.techStack.slice(0, 4).join(", ")}, among other tools chosen for the specific project. Our stack is picked for performance and long-term maintainability, not just what's trendy.`
    },
    {
      q: `Which industries in ${cityName} do you typically work with?`,
      a: `We've delivered ${serviceName.toLowerCase()} projects for businesses across ${service.industries.slice(0, 3).join(", ")}, and other sectors. If your business doesn't fit neatly into a category, we still start with the same discovery process to understand what you actually need.`
    },
    {
      q: `Can I find a ${serviceName.toLowerCase()} company near me in ${cityName}?`,
      a: `Yes. Sabka Saathi works with businesses across ${cityName} and the surrounding ${state} region. We deliver remotely from a single HQ — so you're not paying for a local office — while giving you a dedicated ${serviceName.toLowerCase()} team that understands the ${cityName} market. Calls, design reviews, and progress builds all happen online, so a top ${serviceName.toLowerCase()} partner is effectively right next to you wherever you are in ${cityName}.`
    },
    {
      q: `Do you have a physical office in ${cityName}?`,
      a: `No — we run one HQ and serve clients across India, including ${cityName}, remotely. Discovery calls, design reviews, and weekly builds all happen online, so you get the same close working process regardless of location.`
    },
    {
      q: `What happens after the support window ends?`,
      a: `You're never locked out. You keep full source code and documentation, and you can renew a maintenance plan, bring in your own developer, or move to a different provider — the system is built to be maintainable by anyone, not just us.`
    },
    {
      q: `What does the ${serviceName.toLowerCase()} package for ${cityName} businesses include?`,
      a: `Our ${service.pricing[1].name} package (${service.pricing[1].priceRange}) — the most popular for ${cityName} clients — includes ${service.pricing[1].features.slice(0, 3).join(", ").toLowerCase()}, and more. See the pricing table on this page for the full breakdown across all three tiers.`
    },
    {
      q: `Is ${serviceName} in ${cityName} suitable for a small or early-stage business?`,
      a: `Yes. We scope every project to the client's stage — our ${service.pricing[0].name} package starts at ${service.pricing[0].priceRange} for a ${service.pricing[0].scope.toLowerCase()}, and ${service.idealFor.slice(0, 2).join(" and ").toLowerCase()} are among the businesses we work with most. We're happy to start small and grow the system with you.`
    }
  ];

  // Defensive: filter out any `nearby` slug that doesn't resolve to a real
  // city, instead of crashing the whole static build if the data drifts
  // out of sync (e.g. a nearby slug referencing a city that was never
  // added to, or was removed from, the `cities` array).
  const nearbySlugs = city.nearby
    .map((nearbySlug) => cities.find((c) => c.slug === nearbySlug))
    .filter((c): c is CityInfo => Boolean(c))
    .map((nearbyCity) => ({
      title: `${serviceName} in ${nearbyCity.name}`,
      url: `/${generateSlug(page.serviceSlug, nearbyCity.slug)}`
    }));

  const relatedServices = Object.keys(services)
    .filter((sSlug) => sSlug !== page.serviceSlug)
    .map((sSlug) => {
      const relService = services[sSlug]!;
      return {
        title: `${relService.name} in ${cityName}`,
        url: `/${generateSlug(sSlug, page.citySlug)}`
      };
    });

  // Full service menu for this city (all 8), current service flagged. Order
  // follows serviceCatalog so it's consistent with the rest of the site.
  const allServices = serviceCatalog.map((svc) => ({
    name: svc.name,
    url: `/${generateSlug(svc.slug, page.citySlug)}`,
    current: svc.slug === page.serviceSlug
  }));

  // Honest schema: a single real Organization/HQ, with the page's relevance
  // to this city expressed through "areaServed" rather than a fabricated
  // LocalBusiness address per city. This matches how Google expects
  // service-area businesses (no branch office in every city) to mark up
  // location-targeted pages, and avoids the doorway-page / fake-listing
  // spam pattern that risks a manual action against the whole domain.
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://sabkasaathidigitalservices.com/#organization",
    "name": "Sabka Saathi",
    "url": "https://sabkasaathidigitalservices.com/",
    "telephone": contactInfo.phone,
    "taxID": businessIdentity.gstin,
    "founder": { "@type": "Person", "name": businessIdentity.founderName },
    // Only emit email / streetAddress once real values replace the TODO
    // placeholders — never ship placeholder NAP data into structured data.
    ...(isRealValue(contactInfo.email) ? { email: contactInfo.email } : {}),
    "address": {
      "@type": "PostalAddress",
      ...(isRealValue(contactInfo.address) ? { streetAddress: contactInfo.address } : {}),
      "addressRegion": businessIdentity.addressRegion,
      "addressCountry": "IN"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://sabkasaathidigitalservices.com/${slug}#service`,
    "name": `${serviceName} in ${cityName}`,
    "description": metaDescription,
    "provider": { "@id": "https://sabkasaathidigitalservices.com/#organization" },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "148",
      "bestRating": "5",
      "worstRating": "1"
    },
    "areaServed": {
      "@type": "City",
      "name": cityName,
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": state
      }
    },
    "serviceType": serviceName,
    "offers": service.pricing.map((tier) => ({
      "@type": "Offer",
      "name": tier.name,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "description": `${tier.scope} — ${tier.priceRange}`
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://sabkasaathidigitalservices.com" },
      { "@type": "ListItem", "position": 2, "name": `${serviceName} in ${cityName}`, "item": `https://sabkasaathidigitalservices.com/${slug}` }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a }
    }))
  };

  return {
    slug,
    serviceSlug: page.serviceSlug,
    citySlug: page.citySlug,
    cityName,
    state,
    serviceName,
    metaTitle,
    metaDescription,
    h1,
    tagline,
    aboutContent,
    whyThisCity,
    localEconomy,
    whyChooseUs,
    benefits: service.benefits,
    features: service.features,
    process: service.process,
    techStack: service.techStack,
    useCases: service.useCases,
    deliverables: service.deliverables,
    timeline: service.timeline,
    idealFor: service.idealFor,
    industries: service.industries,
    pricing: service.pricing,
    marquee,
    stats,
    landingCopy,
    contactInfo,
    faqs,
    nearbySlugs,
    relatedServices,
    allServices,
    schemas: [organizationSchema, serviceSchema, breadcrumbSchema, faqSchema]
  };
}

// ─────────────────────────────────────────────────────────────────────────
// LOCATION DIRECTORY HUB HELPERS
// Powers /locations — a single crawlable index that links every covered city
// to each of its service pages, grouped by state. This is the legitimate,
// Google-safe way to expose location reach: one genuine internal-link hub over
// real, differentiated pages, NOT a spray of thin per-village doorway pages
// (which trigger the doorway-page spam policy and a site-wide demotion).
// ─────────────────────────────────────────────────────────────────────────

// The three core services in the order we want them presented on the hub.
// Names are inlined so this list never depends on `services` key ordering.
const coreServiceCatalog: { slug: string; name: string; shortName: string }[] = [
  { slug: "website-development", name: "Website Development", shortName: "Website" },
  { slug: "mobile-app-development", name: "Mobile App Development", shortName: "Mobile App" },
  { slug: "software-development", name: "Software Development", shortName: "Software" },
  { slug: "ui-ux-design", name: "UI/UX Design", shortName: "UI/UX" },
  { slug: "seo-services", name: "SEO Services", shortName: "SEO" },
  { slug: "digital-marketing", name: "Digital Marketing", shortName: "Marketing" },
  { slug: "ecommerce-development", name: "E-commerce Development", shortName: "E-commerce" },
  { slug: "cloud-devops", name: "Cloud & DevOps", shortName: "Cloud" }
];

/* The full menu shown on the hub: the eight core lines first, in the order
   above, then the rest of the catalog. `shortName` drops the trailing
   "Development"/"Software Development" so the chips stay one line on mobile. */
export const serviceCatalog: { slug: string; name: string; shortName: string }[] = [
  ...coreServiceCatalog,
  ...industryServices
    .filter((svc) => !coreServiceCatalog.some((c) => c.slug === svc.slug))
    .map((svc) => ({
      slug: svc.slug,
      name: svc.name,
      shortName: svc.name
        .replace(/ Software Development$/, "")
        .replace(/ Development$/, "")
        .replace(/ Solutions$/, ""),
    })),
];

// Groups every covered city under its state, preserving the order each state
// first appears in the `cities` array (Bihar first, then Jharkhand, UP, …).
export function getCitiesGroupedByState(): { state: string; cities: CityInfo[] }[] {
  const order: string[] = [];
  const byState = new Map<string, CityInfo[]>();
  for (const city of cities) {
    if (!byState.has(city.state)) {
      byState.set(city.state, []);
      order.push(city.state);
    }
    byState.get(city.state)!.push(city);
  }
  return order.map((state) => ({ state, cities: byState.get(state)! }));
}

// Headline counts for the hub's hero/intro copy and schema. Derived from the
// real dataset so they can never drift out of sync with what's actually built.
export const locationStats = {
  cityCount: cities.length,
  stateCount: new Set(cities.map((c) => c.state)).size,
  serviceCount: serviceCatalog.length,
  pageCount: cities.length * serviceCatalog.length
};

// Convenience: all { title, url } service links for one city, used by the hub.
export function cityServiceLinks(city: CityInfo) {
  return serviceCatalog.map((svc) => ({
    slug: svc.slug,
    shortName: svc.shortName,
    name: svc.name,
    url: `/${generateSlug(svc.slug, city.slug)}`
  }));
}