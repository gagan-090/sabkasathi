/* Copy and figures for the home page. Kept next to RoyalHome rather than in
   lib/ because nothing else renders it.

   Image rule: every `src` on this page is used exactly once. The page used to
   cycle the same four /projects shots through Services, Solutions and Work,
   which made three distinct sections read as one repeated card. */

import type { ReactNode } from "react";

const HEADLINE: { text: string; accent?: boolean }[][] = [
  [{ text: "Software" }, { text: "worthy" }],
  [{ text: "of" }, { text: "the" }, { text: "business" }],
  [{ text: "you’re" }, { text: "building.", accent: true }],
];

/* The stagger runs continuously across lines, so each word's delay is derived
   from its position in the whole headline rather than within its own line. */
export const HEADLINE_LINES = HEADLINE.map((line, lineIndex) => {
  const before = HEADLINE.slice(0, lineIndex).reduce((n, l) => n + l.length, 0);
  return line.map((word, i) => ({ ...word, delay: 0.24 + (before + i) * 0.07 }));
});

export const FACTS = [
  { value: "30", label: "Specialists" },
  { value: "17", label: "Engineers" },
  { value: "13", label: "Designers" },
  { value: "2 hr", label: "Response SLA" },
];

/* `to` drives the count-up; `prefix`/`suffix` keep the rendered string identical
   to what the label used to be hard-coded as. */
export const NUMBERS = [
  { to: 242, suffix: "+", label: "Cities served" },
  { to: 20, suffix: "", label: "States covered" },
  { to: 8, suffix: "", label: "Service lines" },
  { to: 100, suffix: "%", label: "GST compliant" },
];

export const STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Flutter",
  "React Native",
  "Node.js",
  "MongoDB",
  "Firebase",
  "Razorpay",
  "Stripe",
  "AWS",
  "WhatsApp Cloud API",
];

/* Real brand marks, generated from the simple-icons set (CC0-1.0) into
   /public/logos. `label` is what we call the technology, which is not always
   the icon's own title — React Native and React share one mark. */
export type TechLogo = { label: string; file: string };

export const TECH_LOGOS: TechLogo[] = [
  { label: "Next.js", file: "nextdotjs" },
  { label: "React", file: "react" },
  { label: "TypeScript", file: "typescript" },
  { label: "JavaScript", file: "javascript" },
  { label: "Node.js", file: "nodedotjs" },
  { label: "Express", file: "express" },
  { label: "MongoDB", file: "mongodb" },
  { label: "PostgreSQL", file: "postgresql" },
  { label: "MySQL", file: "mysql" },
  { label: "Redis", file: "redis" },
  { label: "Prisma", file: "prisma" },
  { label: "GraphQL", file: "graphql" },
  { label: "Firebase", file: "firebase" },
  { label: "Supabase", file: "supabase" },
  { label: "Google Cloud", file: "googlecloud" },
  { label: "Docker", file: "docker" },
  { label: "Kubernetes", file: "kubernetes" },
  { label: "Vercel", file: "vercel" },
  { label: "GitHub", file: "github" },
  { label: "Flutter", file: "flutter" },
  { label: "Swift", file: "swift" },
  { label: "Kotlin", file: "kotlin" },
  { label: "Python", file: "python" },
  { label: "Go", file: "go" },
  { label: "Tailwind CSS", file: "tailwindcss" },
  { label: "Sass", file: "sass" },
  { label: "TensorFlow", file: "tensorflow" },
  { label: "Figma", file: "figma" },
  { label: "Razorpay", file: "razorpay" },
  { label: "Stripe", file: "stripe" },
  { label: "WhatsApp API", file: "whatsapp" },
];

/* Split into two rows that scroll in opposite directions. Halving by index
   keeps both rows a similar width so neither runs out mid-viewport. */
export const TECH_ROW_A = TECH_LOGOS.filter((_, i) => i % 2 === 0);
export const TECH_ROW_B = TECH_LOGOS.filter((_, i) => i % 2 === 1);

export const TECH = [
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "Firebase",
  "Supabase",
  "Flutter",
  "React Native",
  "Swift",
  "AWS",
  "Docker",
  "Kubernetes",
  "GitHub",
  "TypeScript",
  "JavaScript",
  "Python",
  "Go",
  "Tailwind CSS",
  "Vercel",
  "Figma",
  "TensorFlow",
];

export type Service = {
  index: string;
  title: string;
  body: string;
  tags: string[];
  href: string;
  icon: ReactNode;
  src: string;
};

export const SERVICES: Service[] = [
  {
    index: "01",
    title: "Website Development",
    body: "Next.js sites and web apps built for speed and search — storefronts, portals and dashboards that hold up under real traffic.",
    tags: ["Next.js", "SSR & SEO", "Headless"],
    href: "/services",
    icon: <IconWindow />,
    src: "/images/services/web-development.webp",
  },
  {
    index: "02",
    title: "Mobile App Development",
    body: "Android and iOS from one Flutter or React Native codebase, shipped to the stores with analytics and crash reporting in place.",
    tags: ["Flutter", "React Native", "Play & App Store"],
    href: "/services",
    icon: <IconPhone />,
    src: "/images/services/mobile-app.webp",
  },
  {
    index: "03",
    title: "Software Development",
    body: "Custom ERP, CRM and internal tools that map to how your business actually runs, not how a template thinks it should.",
    tags: ["ERP", "CRM", "Automation"],
    href: "/services",
    icon: <IconFlow />,
    src: "/images/services/custom-software.webp",
  },
  {
    index: "04",
    title: "E-commerce Development",
    body: "Catalogues, checkout, UPI and card payments, inventory sync and the order pipeline behind them — all in one system.",
    tags: ["Razorpay", "Inventory", "Checkout"],
    href: "/services",
    icon: <IconCart />,
    src: "/images/services/delivery.webp",
  },
  {
    index: "05",
    title: "UI/UX Design",
    body: "Clickable Figma prototypes agreed before development starts, so the build is a matter of execution, not guesswork.",
    tags: ["Figma", "Design system", "Prototypes"],
    href: "/services",
    icon: <IconPen />,
    src: "/images/service-uiux.png",
  },
  {
    index: "06",
    title: "Cloud & DevOps",
    body: "Deployment pipelines, monitoring and infrastructure that keeps running without someone watching it at 2am.",
    tags: ["AWS", "Docker", "CI/CD"],
    href: "/services",
    icon: <IconCloud />,
    src: "/images/service-cloud.png",
  },
  {
    index: "07",
    title: "SEO Services",
    body: "Technical SEO, structured data and local pages that put you in front of customers searching in your own city.",
    tags: ["Technical SEO", "Local", "Schema"],
    href: "/services",
    icon: <IconSearch />,
    src: "/images/service-seo.png",
  },
  {
    index: "08",
    title: "Digital Marketing",
    body: "Campaigns measured against revenue rather than impressions, with reporting you can read without a translator.",
    tags: ["Performance", "Content", "Analytics"],
    href: "/services",
    icon: <IconMega />,
    src: "/images/service-marketing.png",
  },
];

export const SOLUTIONS = [
  {
    label: "SaaS Dashboard",
    title: "Restaurant Management",
    desc: "Live kitchen tracking, table reservations and real-time order flow.",
    tech: ["Next.js", "Node.js", "MySQL"],
    src: "/projects/web-1.webp",
  },
  {
    label: "School ERP",
    title: "School Management",
    desc: "Attendance, fee collection, exams and staff records in one portal.",
    tech: ["React", "TypeScript", "PostgreSQL"],
    src: "/images/services/erp-crm.webp",
  },
  {
    label: "Medical App",
    title: "Healthcare Platform",
    desc: "Appointments, digital prescriptions and patient record management.",
    tech: ["Next.js", "Flutter", "Supabase"],
    src: "/images/services/ios-app.webp",
  },
  {
    label: "E-commerce",
    title: "Online Store",
    desc: "High-converting storefronts, digital catalogues and fast checkouts.",
    tech: ["Next.js", "MongoDB", "Vercel"],
    src: "/projects/web-2.webp",
  },
  {
    label: "Enterprise Tool",
    title: "Business Automation",
    desc: "CRM, workflow automation and analytics dashboards in one place.",
    tech: ["React", "Node.js", "Docker"],
    src: "/images/services/cloud-solutions.webp",
  },
  {
    label: "Billing System",
    title: "Inventory & Invoicing",
    desc: "GST invoices, stock movement and distributor ledgers, reconciled daily.",
    tech: ["Next.js", "MongoDB", "PDF"],
    src: "/images/services/billing-system.webp",
  },
];

export const WORK = [
  { name: "Synergy Analytics", kind: "SaaS Dashboard", src: "/images/about_hero.webp" },
  { name: "Glowve Commerce", kind: "Mobile Commerce", src: "/projects/mobile-1.webp" },
  { name: "Field Service CRM", kind: "Custom Software", src: "/projects/mobile-2.webp" },
  { name: "Aurora Retail", kind: "Web Storefront", src: "/images/industries_hero.webp" },
];

export const STEPS = [
  {
    kicker: "Step 01",
    title: "Understand",
    body: "A working call, not a questionnaire. We map what the business actually does before proposing anything.",
  },
  {
    kicker: "Step 02",
    title: "Design",
    body: "Screens and flows you can click through, agreed before a single line of production code is written.",
  },
  {
    kicker: "Step 03",
    title: "Build",
    body: "Two-week cycles with a live staging link. You see progress on real hardware, every fortnight.",
  },
  {
    kicker: "Step 04",
    title: "Run",
    body: "Launch, monitoring, and a team that answers within two hours — long after the invoice is settled.",
  },
];

export const INCLUDED = [
  {
    title: "One year of hosting",
    body: "High-performance hosting included with every build, at no extra cost for the first year.",
  },
  {
    title: "One year of maintenance",
    body: "Fixes, updates and dependency upgrades covered for twelve months after launch.",
  },
  {
    title: "GST-compliant invoicing",
    body: "A registered agency with proper tax invoices — clean books for your accountant.",
  },
  {
    title: "Under two-hour response",
    body: "A real person replies within two working hours, on WhatsApp, email or a call.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Aarav Mehta",
    role: "Founder, Retail SaaS",
    avatar: "/team/parth-patel.webp",
    feedback:
      "Sabka Saathi transformed our legacy systems into a modern SaaS platform. Their expertise is unmatched.",
    rating: 5,
  },
  {
    name: "Nisha Rao",
    role: "Product Lead, Consumer App",
    avatar: "/team/generic-biz-1.webp",
    feedback:
      "The mobile app they built for us is fast, intuitive, and loved by our users. Highly recommend their team.",
    rating: 5,
  },
  {
    name: "Ishan Kapoor",
    role: "CTO, Logistics Platform",
    avatar: "/team/generic-dev-1.webp",
    feedback:
      "Scaling our cloud infrastructure was seamless with their help. Professional and dedicated engineers.",
    rating: 5,
  },
];

export const PLACES = [
  "Patna",
  "Gaya",
  "Muzaffarpur",
  "Darbhanga",
  "Bhagalpur",
  "Ranchi",
  "Varanasi",
  "Lucknow",
  "Kolkata",
  "Delhi NCR",
  "Pune",
  "Mumbai",
  "Ahmedabad",
  "Surat",
  "Bengaluru",
  "Hyderabad",
];

/* ── icons ──────────────────────────────────────────────────────────────── */

export function IconWindow() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconPhone() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="6" y="2.5" width="12" height="19" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 18.5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconFlow() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="2.6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="18" r="2.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 8.6v6.4a3 3 0 0 0 3 3h6.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8.6 6H15a3 3 0 0 1 3 3v6.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconCart() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2.5 3.5h2.2l2.3 11h10.2l2.3-8H6.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="19" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="19" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconPen() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20h4L20 8a2.8 2.8 0 0 0-4-4L4 16v4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M14.5 5.5 18.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconCloud() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 18h10.5a3.5 3.5 0 0 0 .4-6.98A6 6 0 0 0 6.3 9.6 4.2 4.2 0 0 0 7 18Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconSearch() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconMega() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 9v6h3l7 4V5L7 9H4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M18 9.5a4 4 0 0 1 0 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
