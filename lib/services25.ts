/* ─────────────────────────────────────────────────────────────────────────
   THE 25-SERVICE CATALOG

   Shared by both programmatic axes, and therefore deliberately free of
   imports:
     lib/localSeo.ts     service × city      /erp-development-company-in-patna
     lib/industrySeo.ts  service × industry  /restaurant-erp-development

   If this file ever imports from either of those, the cycle breaks the build.
   localSeo is the lower layer (cities, contact details, schema primitives)
   and industrySeo sits on top of it; this sits under both.

   Each record carries what BOTH axes need: `modules` describe what is
   actually built, `benefits` and `useCases` give the city pages body copy
   that is specific rather than generic, and `tiers` drives the pricing table
   and the Offer schema on both.
   ───────────────────────────────────────────────────────────────────────── */

export interface ServiceTier {
  name: string;
  priceRange: string;
  highlight: boolean;
  scope: string;
  features: string[];
  support: string;
}

export interface IndustryServiceInfo {
  name: string;
  slug: string;
  group: string;
  /** "a mobile app", "a billing system" — reads naturally after "we build". */
  article: string;
  /** One sentence: what this service is. */
  summary: string;
  /** One sentence: what changes in the business once it ships. */
  outcome: string;
  /** Five things that are actually built. */
  modules: string[];
  /** What the buyer gets out of it, stated in their terms rather than ours. */
  benefits: string[];
  /** Concrete situations this actually gets bought for. */
  useCases: string[];
  techStack: string[];
  timeline: string;
  priceBand: string;
  tiers: ServiceTier[];
}

export const industryServices: IndustryServiceInfo[] = [
  // ── Core development ────────────────────────────────────────────────────
  {
    name: "App Development",
    slug: "app-development",
    group: "Core Development",
    article: "a mobile app",
    summary:
      "A mobile app your customers install once and use as the main way they deal with your business.",
    outcome:
      "Orders, bookings and enquiries arrive through a channel you own, instead of through a marketplace that rents you your own customers.",
    modules: [
      "Customer-facing Android and iOS app from a single codebase",
      "Admin panel for catalogue, pricing and content, editable without a developer",
      "Push notifications tied to real events, not broadcast blasts",
      "UPI and card payments through Razorpay with reconciliation built in",
      "Offline handling so the app still works on a weak connection",
    ],
    techStack: ["React Native", "Flutter", "Node.js", "MongoDB", "Firebase", "Razorpay"],
    timeline: "4–8 weeks",
    priceBand: "₹18,000 – ₹1,00,000+",
  },
  {
    name: "Website Development",
    slug: "website-development",
    group: "Core Development",
    article: "a website",
    summary:
      "A fast, search-indexed website that explains what you do and turns visitors into enquiries.",
    outcome:
      "You stop paying for every lead — the site earns its own traffic from search and keeps earning it.",
    modules: [
      "Next.js build with server rendering, so every page is indexable",
      "Mobile-first layouts tested on the low-end phones your customers use",
      "Structured data and metadata for search and AI answer engines",
      "Enquiry forms wired to WhatsApp and email, with lead capture",
      "Content pages you can add and edit yourself",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    timeline: "2–5 weeks",
    priceBand: "₹12,000 – ₹60,000+",
  },
  {
    name: "Software Development",
    slug: "software-development",
    group: "Core Development",
    article: "a software system",
    summary:
      "A system built around how your business actually runs, replacing the spreadsheets and WhatsApp threads holding it together.",
    outcome:
      "The process stops living in one person's head and starts living in a system anyone on the team can be trained on.",
    modules: [
      "Process mapping before any code — we document how the work happens today",
      "Role-based access so each person sees only their own part of the workflow",
      "Reporting on the numbers you already track manually",
      "Data import from your existing spreadsheets and registers",
      "Audit trail on every record change",
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "MongoDB", "Docker"],
    timeline: "6–12 weeks",
    priceBand: "₹35,000 – ₹2,50,000+",
  },
  {
    name: "Custom Software Development",
    slug: "custom-software-development",
    group: "Core Development",
    article: "custom software",
    summary:
      "Software written for one business — yours — when nothing off the shelf fits the way you work.",
    outcome:
      "You stop bending your process to fit a product's assumptions and stop paying per-seat for features you never use.",
    modules: [
      "Requirement workshops with the people who will use it daily",
      "A working prototype before full development is committed",
      "Integrations with the tools you already refuse to give up",
      "Source code and documentation handed to you at the end",
      "A migration plan off whatever you are running today",
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Redis", "Docker"],
    timeline: "8–16 weeks",
    priceBand: "₹50,000 – ₹4,00,000+",
  },
  {
    name: "ERP Development",
    slug: "erp-development",
    group: "Core Development",
    article: "an ERP",
    summary:
      "One system across purchase, stock, production, sales, accounts and payroll, so the same number means the same thing everywhere.",
    outcome:
      "Month-end stops being a reconciliation exercise between four disagreeing registers.",
    modules: [
      "Master data for items, parties, taxes and locations",
      "Purchase-to-payment and order-to-cash flows end to end",
      "Stock valuation that ties to the accounts, not a separate sheet",
      "GST-ready documents and returns-friendly exports",
      "Branch and warehouse handling with consolidated reporting",
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS"],
    timeline: "10–20 weeks",
    priceBand: "₹80,000 – ₹6,00,000+",
  },
  {
    name: "CRM Development",
    slug: "crm-development",
    group: "Core Development",
    article: "a CRM",
    summary:
      "A single place where every enquiry lands, gets owned by someone, and is followed up until it closes or dies.",
    outcome:
      "Leads stop leaking between phone, WhatsApp, Instagram and walk-ins — and you can finally see which source actually pays.",
    modules: [
      "Lead capture from website, WhatsApp, calls and social in one inbox",
      "Ownership, stages and follow-up reminders per lead",
      "Quotation and proposal generation from the lead record",
      "Source-wise conversion and revenue reporting",
      "Call and message history attached to each contact",
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "WhatsApp Cloud API", "Redis"],
    timeline: "5–10 weeks",
    priceBand: "₹30,000 – ₹2,00,000+",
  },

  // ── Business management ─────────────────────────────────────────────────
  {
    name: "Billing Software Development",
    slug: "billing-software-development",
    group: "Business Management",
    article: "a billing system",
    summary:
      "GST-compliant invoicing that produces a correct bill in seconds and a correct return at the end of the month.",
    outcome:
      "Billing stops being the bottleneck at your counter and stops being an argument with your accountant.",
    modules: [
      "GST invoices with HSN, CGST/SGST/IGST split and e-invoice-ready formats",
      "Recurring and part-payment billing with outstanding tracking",
      "Thermal and A4 print, plus WhatsApp and email delivery",
      "Party ledgers and ageing reports",
      "Tally-friendly and CSV exports for your accountant",
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Razorpay", "WhatsApp Cloud API"],
    timeline: "4–8 weeks",
    priceBand: "₹25,000 – ₹1,50,000+",
  },
  {
    name: "Management Software Development",
    slug: "management-software-development",
    group: "Business Management",
    article: "a management system",
    summary:
      "The day-to-day operating system for your business — who is doing what, for whom, by when, and whether it got done.",
    outcome:
      "You can answer 'what is the status of that' without calling three people.",
    modules: [
      "Task, job and assignment tracking with owners and due dates",
      "Customer and vendor records with full interaction history",
      "Staff-wise workload and completion dashboards",
      "Document and photo attachments against each job",
      "Daily and weekly summary reports, delivered automatically",
    ],
    techStack: ["Next.js", "Node.js", "MongoDB", "Firebase", "Tailwind CSS"],
    timeline: "5–10 weeks",
    priceBand: "₹30,000 – ₹2,00,000+",
  },
  {
    name: "POS Software Development",
    slug: "pos-software-development",
    group: "Business Management",
    article: "a POS system",
    summary:
      "A counter system that takes payment, prints the bill and moves stock in one action, fast enough for a queue.",
    outcome:
      "The till, the stock register and the day's sales figure stop being three separate truths.",
    modules: [
      "Barcode and quick-key billing built for speed at the counter",
      "Split payments across cash, UPI and card on one bill",
      "Stock deduction at the moment of sale",
      "Day-close, shift-wise and cashier-wise sales reports",
      "Offline mode that syncs when the connection returns",
    ],
    techStack: ["React", "Electron", "Node.js", "SQLite", "PostgreSQL", "Razorpay"],
    timeline: "5–9 weeks",
    priceBand: "₹30,000 – ₹1,80,000+",
  },
  {
    name: "Inventory Management Software Development",
    slug: "inventory-management-software-development",
    group: "Business Management",
    article: "an inventory system",
    summary:
      "Live stock across every location, with reorder alerts before you run out rather than after a customer asks.",
    outcome:
      "Dead stock and stockouts both shrink, because you are working from the real number instead of a memory of it.",
    modules: [
      "Item masters with batch, expiry and serial tracking where it matters",
      "Multi-location and multi-warehouse stock with transfers",
      "Reorder levels with automatic purchase suggestions",
      "Physical stock-take with variance reporting",
      "Stock valuation, movement and ageing reports",
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Docker"],
    timeline: "5–10 weeks",
    priceBand: "₹30,000 – ₹2,00,000+",
  },
  {
    name: "Accounting Software Development",
    slug: "accounting-software-development",
    group: "Business Management",
    article: "an accounting system",
    summary:
      "Books that stay current because entries come from the actual transactions rather than being re-keyed later.",
    outcome:
      "Your accountant gets clean data on the first of the month instead of a shoebox in the third week.",
    modules: [
      "Double-entry ledgers with vouchers, journals and bank entries",
      "Receivables and payables with ageing and reminder automation",
      "GST summaries and returns-ready exports",
      "Bank reconciliation against imported statements",
      "P&L, balance sheet and cash-flow reporting",
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Docker"],
    timeline: "8–14 weeks",
    priceBand: "₹50,000 – ₹3,00,000+",
  },
  {
    name: "HRMS & Payroll Software Development",
    slug: "hrms-payroll-software-development",
    group: "Business Management",
    article: "an HRMS and payroll system",
    summary:
      "Attendance, leave, salary and statutory compliance in one place, so payroll is a review rather than a rebuild each month.",
    outcome:
      "Salary day stops consuming three days of somebody's time.",
    modules: [
      "Biometric, mobile or geo-tagged attendance capture",
      "Leave policy, approval chain and balance tracking",
      "Salary structures with PF, ESI, TDS and professional tax",
      "Payslip generation and direct bank transfer files",
      "Employee self-service for payslips, leave and documents",
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS"],
    timeline: "7–12 weeks",
    priceBand: "₹45,000 – ₹2,50,000+",
  },

  // ── Mobile & web ────────────────────────────────────────────────────────
  {
    name: "Android App Development",
    slug: "android-app-development",
    group: "Mobile & Web",
    article: "an Android app",
    summary:
      "A native-quality Android app built for the devices your customers actually hold, not the flagship in a demo video.",
    outcome:
      "You reach the roughly 95% of Indian smartphone users on Android without asking them to fight your app.",
    modules: [
      "Play Store listing, assets and release management handled for you",
      "Tested down to entry-level devices and older Android versions",
      "APK size and battery use kept deliberately low",
      "Push notifications through Firebase Cloud Messaging",
      "Crash reporting and analytics wired in from day one",
    ],
    techStack: ["Kotlin", "React Native", "Flutter", "Firebase", "Node.js"],
    timeline: "4–8 weeks",
    priceBand: "₹15,000 – ₹90,000+",
  },
  {
    name: "iOS App Development",
    slug: "ios-app-development",
    group: "Mobile & Web",
    article: "an iOS app",
    summary:
      "An iPhone app that meets Apple's review standards the first time and feels native on iOS rather than ported to it.",
    outcome:
      "You reach the segment that spends the most per order, on the platform they judge you by.",
    modules: [
      "App Store submission, privacy declarations and review handling",
      "iOS design language — gestures, haptics and typography that fit",
      "Sign in with Apple and Apple Pay where relevant",
      "iPad layouts where the use case justifies them",
      "TestFlight builds so you can try each version before release",
    ],
    techStack: ["Swift", "React Native", "Flutter", "Firebase", "Node.js"],
    timeline: "4–9 weeks",
    priceBand: "₹20,000 – ₹1,00,000+",
  },
  {
    name: "Flutter App Development",
    slug: "flutter-app-development",
    group: "Mobile & Web",
    article: "a Flutter app",
    summary:
      "One Flutter codebase compiled to Android and iOS — one build, one bug list, one bill.",
    outcome:
      "You get both platforms for close to the cost and time of one, and they never drift apart in features.",
    modules: [
      "Single codebase targeting Android and iOS from day one",
      "Shared design system so both platforms stay visually identical",
      "Native module bridging where a platform feature demands it",
      "Both store listings prepared and submitted",
      "Over-the-air update path for non-native changes",
    ],
    techStack: ["Flutter", "Dart", "Firebase", "Node.js", "MongoDB"],
    timeline: "4–8 weeks",
    priceBand: "₹20,000 – ₹1,20,000+",
  },
  {
    name: "Web Portal Development",
    slug: "web-portal-development",
    group: "Mobile & Web",
    article: "a web portal",
    summary:
      "A logged-in portal where your customers, staff or partners do their business with you themselves.",
    outcome:
      "The queries that used to arrive by phone get answered by the portal, at 2am, without anyone picking up.",
    modules: [
      "Role-based logins for each type of user",
      "Self-service records, documents and status tracking",
      "Notification and email flows tied to real status changes",
      "Search and filtering across large record sets",
      "Admin controls for onboarding and permissions",
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS"],
    timeline: "6–12 weeks",
    priceBand: "₹40,000 – ₹2,50,000+",
  },
  {
    name: "Dashboard & Admin Panel Development",
    slug: "dashboard-admin-panel-development",
    group: "Mobile & Web",
    article: "a dashboard and admin panel",
    summary:
      "The control room for your business — the numbers that matter on one screen, and the controls to act on them.",
    outcome:
      "Decisions get made from a live figure rather than from last week's exported spreadsheet.",
    modules: [
      "Live KPI tiles chosen with you, not a default template",
      "Drill-down from any summary figure to the underlying records",
      "Bulk actions and record management for your operations team",
      "Scheduled report exports to email or WhatsApp",
      "Access control so each role sees an appropriate view",
    ],
    techStack: ["Next.js", "React", "PostgreSQL", "Recharts", "Tailwind CSS"],
    timeline: "3–7 weeks",
    priceBand: "₹25,000 – ₹1,50,000+",
  },

  // ── AI & automation ─────────────────────────────────────────────────────
  {
    name: "AI Software Development",
    slug: "ai-software-development",
    group: "AI & Automation",
    article: "an AI-powered system",
    summary:
      "AI applied to one specific, expensive problem in your business — not sprinkled over the product as a feature list.",
    outcome:
      "A task that consumed hours of skilled attention every day gets done in seconds, with a human reviewing rather than doing.",
    modules: [
      "A scoped pilot on one workflow before any wider commitment",
      "Document, image or text processing tuned to your own data",
      "Human-in-the-loop review so nothing ships unchecked",
      "Accuracy measured against a real baseline you agree upfront",
      "Cost-per-run monitoring so the economics stay visible",
    ],
    techStack: ["Python", "Claude API", "Node.js", "PostgreSQL", "pgvector", "AWS"],
    timeline: "6–14 weeks",
    priceBand: "₹60,000 – ₹5,00,000+",
  },
  {
    name: "AI Chatbot Development",
    slug: "ai-chatbot-development",
    group: "AI & Automation",
    article: "an AI chatbot",
    summary:
      "A chatbot that answers from your actual catalogue, pricing and policies — on your site and on WhatsApp — and hands over to a human when it should.",
    outcome:
      "The repetitive 80% of enquiries get answered instantly at any hour, and your team only sees the ones worth their time.",
    modules: [
      "Trained on your own documents, catalogue and past answers",
      "WhatsApp Business API and website widget from one brain",
      "Explicit handover to a human with full conversation context",
      "Lead capture inside the conversation, pushed to your CRM",
      "Answer-quality logs so you can see what it got wrong",
    ],
    techStack: ["Claude API", "Node.js", "pgvector", "WhatsApp Cloud API", "Next.js"],
    timeline: "3–7 weeks",
    priceBand: "₹25,000 – ₹1,80,000+",
  },
  {
    name: "AI Business Automation Solutions",
    slug: "ai-business-automation",
    group: "AI & Automation",
    article: "an automation layer",
    summary:
      "The manual chain of copy, paste, forward and follow-up between your existing tools, replaced by something that just runs.",
    outcome:
      "Work that was being done because 'someone has to' stops being done by a person at all.",
    modules: [
      "An audit of where staff hours currently go, before anything is built",
      "Automated data flow between the systems you already run",
      "Document extraction from invoices, forms and PDFs",
      "Trigger-based alerts and follow-ups on real business events",
      "A failure path that notifies a human instead of silently dropping work",
    ],
    techStack: ["Python", "Claude API", "Node.js", "PostgreSQL", "Docker", "AWS"],
    timeline: "4–10 weeks",
    priceBand: "₹35,000 – ₹3,00,000+",
  },

  // ── Enterprise & digital ────────────────────────────────────────────────
  {
    name: "SaaS Development",
    slug: "saas-development",
    group: "Enterprise & Digital",
    article: "a SaaS product",
    summary:
      "A multi-tenant subscription product, built so the hundredth customer costs you no more effort than the second.",
    outcome:
      "You stop selling your time and start selling a product that earns while you sleep.",
    modules: [
      "Multi-tenant architecture with hard data isolation per customer",
      "Subscription billing, plans, trials and dunning",
      "Self-serve signup and onboarding without your involvement",
      "Usage metering and per-tenant analytics",
      "Infrastructure that scales without a rewrite at 10x",
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Stripe", "Razorpay", "AWS"],
    timeline: "12–24 weeks",
    priceBand: "₹1,00,000 – ₹8,00,000+",
  },
  {
    name: "E-commerce & Marketplace Development",
    slug: "ecommerce-marketplace-development",
    group: "Enterprise & Digital",
    article: "an online store or marketplace",
    summary:
      "Your own storefront — or a multi-vendor marketplace — where you keep the customer relationship and the margin.",
    outcome:
      "You stop paying 20–30% of every order to a platform that owns your buyer's data.",
    modules: [
      "Catalogue, variants, pricing rules and inventory sync",
      "UPI, card, netbanking and cash-on-delivery checkout",
      "Order, shipping and returns workflow through to delivery",
      "Multi-vendor onboarding, commission and settlement, where needed",
      "Abandoned-cart and re-order flows over WhatsApp",
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Razorpay", "Shiprocket API", "Redis"],
    timeline: "6–14 weeks",
    priceBand: "₹40,000 – ₹4,00,000+",
  },
  {
    name: "API & Payment Gateway Integration",
    slug: "api-payment-gateway-integration",
    group: "Enterprise & Digital",
    article: "an integration",
    summary:
      "Connecting your system to the payment gateways, logistics partners, government portals and third-party tools it needs to talk to.",
    outcome:
      "Data stops being re-typed between systems, and money stops being reconciled by hand.",
    modules: [
      "Razorpay, PayU, Cashfree, Stripe and UPI integration",
      "Webhook handling that survives retries and duplicate events",
      "Settlement and refund reconciliation against your own records",
      "Logistics, SMS, WhatsApp and GST portal integrations",
      "API documentation and a sandbox for your own team",
    ],
    techStack: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "Razorpay", "Stripe"],
    timeline: "2–6 weeks",
    priceBand: "₹15,000 – ₹1,20,000+",
  },
  {
    name: "Cloud & Desktop Software Development",
    slug: "cloud-desktop-software-development",
    group: "Enterprise & Digital",
    article: "cloud and desktop software",
    summary:
      "Software that runs on the counter machine when the internet is down and syncs to the cloud when it is back.",
    outcome:
      "Bad connectivity stops being a reason your business cannot bill, book or dispatch.",
    modules: [
      "Windows desktop application with a local database",
      "Cloud sync with conflict resolution when a device reconnects",
      "Cloud hosting, backups and restore testing",
      "Automatic desktop updates without an IT visit",
      "The same data visible from a browser wherever you are",
    ],
    techStack: ["Electron", "React", "SQLite", "Node.js", "PostgreSQL", "AWS", "Docker"],
    timeline: "8–16 weeks",
    priceBand: "₹60,000 – ₹4,00,000+",
  },
  {
    name: "Software Maintenance & Support",
    slug: "software-maintenance-support",
    group: "Enterprise & Digital",
    article: "ongoing maintenance and support",
    summary:
      "Keeping what you already run alive, patched and improving — including software somebody else built and walked away from.",
    outcome:
      "The system stops degrading quietly between the day it launched and the day it broke.",
    modules: [
      "Takeover audit of an existing codebase, however it was left",
      "Security patching and dependency updates on a schedule",
      "Uptime monitoring with alerts before your customers notice",
      "Defined response times for issues, in writing",
      "A monthly change budget for small improvements",
    ],
    techStack: ["Next.js", "Node.js", "Docker", "AWS", "GitHub Actions", "Sentry"],
    timeline: "Ongoing, monthly",
    priceBand: "₹8,000 – ₹60,000 / month",
  },
];
