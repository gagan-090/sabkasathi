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
    benefits: [
      "A sales channel you own, instead of renting your customers from a marketplace",
      "Push notifications that reach people without paying for the impression",
      "Repeat orders from an icon already sitting on the home screen",
      "Customer behaviour data that stays yours",
    ],
    useCases: [
      "On-demand booking and service-request apps",
      "Local delivery and order-ahead apps",
      "Loyalty and rewards apps for retail chains",
      "Field staff and job-tracking apps",
      "Membership and community apps",
    ],
    tiers: [
      {
        name: "Starter",
        priceRange: "₹18,000 – ₹35,000",
        highlight: false,
        scope: "Single-platform app with a core feature set",
        features: [
          "Customer-facing Android and iOS app from a single codebase",
          "Admin panel for catalogue, pricing and content, editable without a developer",
        ],
        support: "1 month support",
      },
      {
        name: "Growth",
        priceRange: "₹35,000 – ₹65,000",
        highlight: true,
        scope: "Cross-platform app with payments and admin panel",
        features: [
          "Customer-facing Android and iOS app from a single codebase",
          "Admin panel for catalogue, pricing and content, editable without a developer",
          "Push notifications tied to real events, not broadcast blasts",
          "UPI and card payments through Razorpay with reconciliation built in",
        ],
        support: "3 months support",
      },
      {
        name: "Enterprise",
        priceRange: "₹65,000 – ₹1,00,000+",
        highlight: false,
        scope: "Multi-role app with backend automation and integrations",
        features: [
          "Customer-facing Android and iOS app from a single codebase",
          "Admin panel for catalogue, pricing and content, editable without a developer",
          "Push notifications tied to real events, not broadcast blasts",
          "UPI and card payments through Razorpay with reconciliation built in",
          "Offline handling so the app still works on a weak connection",
        ],
        support: "6 months support",
      },
    ],
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
    benefits: [
      "Traffic that arrives from search instead of from ad spend",
      "Pages that load fast enough to keep the visitor who clicked",
      "Enquiries landing in WhatsApp and email automatically",
      "Content you can update without calling a developer",
    ],
    useCases: [
      "Business and corporate websites that rank locally",
      "Lead-generation landing pages for campaigns",
      "Catalogue sites for dealers and distributors",
      "Booking and appointment sites",
      "Multi-page content sites built for search",
    ],
    tiers: [
      {
        name: "Starter",
        priceRange: "₹12,000 – ₹25,000",
        highlight: false,
        scope: "Up to 6 pages with enquiry forms",
        features: [
          "Next.js build with server rendering, so every page is indexable",
          "Mobile-first layouts tested on the low-end phones your customers use",
        ],
        support: "1 month support",
      },
      {
        name: "Growth",
        priceRange: "₹25,000 – ₹45,000",
        highlight: true,
        scope: "Up to 15 pages with CMS and blog",
        features: [
          "Next.js build with server rendering, so every page is indexable",
          "Mobile-first layouts tested on the low-end phones your customers use",
          "Structured data and metadata for search and AI answer engines",
          "Enquiry forms wired to WhatsApp and email, with lead capture",
        ],
        support: "3 months support",
      },
      {
        name: "Enterprise",
        priceRange: "₹45,000 – ₹60,000+",
        highlight: false,
        scope: "Large site with custom modules and integrations",
        features: [
          "Next.js build with server rendering, so every page is indexable",
          "Mobile-first layouts tested on the low-end phones your customers use",
          "Structured data and metadata for search and AI answer engines",
          "Enquiry forms wired to WhatsApp and email, with lead capture",
          "Content pages you can add and edit yourself",
        ],
        support: "6 months support",
      },
    ],
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
    benefits: [
      "A process that survives an employee leaving",
      "One number everyone agrees on, instead of four spreadsheets",
      "New staff trained on a system rather than an oral tradition",
      "Reporting that takes seconds instead of a day of compiling",
    ],
    useCases: [
      "Replacing spreadsheet-and-WhatsApp operations",
      "Job and workflow tracking across a team",
      "Internal tools for a process no product covers",
      "Consolidating several disconnected tools into one",
      "Digitising a paper register that has outgrown itself",
    ],
    tiers: [
      {
        name: "Starter",
        priceRange: "₹35,000 – ₹75,000",
        highlight: false,
        scope: "Single workflow with core reporting",
        features: [
          "Process mapping before any code — we document how the work happens today",
          "Role-based access so each person sees only their own part of the workflow",
        ],
        support: "1 month support",
      },
      {
        name: "Growth",
        priceRange: "₹75,000 – ₹1,50,000",
        highlight: true,
        scope: "Multi-module system with roles and dashboards",
        features: [
          "Process mapping before any code — we document how the work happens today",
          "Role-based access so each person sees only their own part of the workflow",
          "Reporting on the numbers you already track manually",
          "Data import from your existing spreadsheets and registers",
        ],
        support: "3 months support",
      },
      {
        name: "Enterprise",
        priceRange: "₹1,50,000 – ₹2,50,000+",
        highlight: false,
        scope: "Company-wide system with integrations and migration",
        features: [
          "Process mapping before any code — we document how the work happens today",
          "Role-based access so each person sees only their own part of the workflow",
          "Reporting on the numbers you already track manually",
          "Data import from your existing spreadsheets and registers",
          "Audit trail on every record change",
        ],
        support: "6 months support",
      },
    ],
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
    benefits: [
      "Software that fits your process instead of the other way round",
      "No per-seat licence that grows every time you hire",
      "Features nobody else has, because nobody else works like you",
      "Source code you own outright at handover",
    ],
    useCases: [
      "Businesses whose process no off-the-shelf product fits",
      "Replacing an expensive licence with something owned",
      "Consolidating tools that refuse to talk to each other",
      "Rebuilding a legacy system that can no longer be maintained",
      "Automating a competitive advantage you do not want to standardise",
    ],
    tiers: [
      {
        name: "Starter",
        priceRange: "₹50,000 – ₹1,20,000",
        highlight: false,
        scope: "One custom module built around an existing process",
        features: [
          "Requirement workshops with the people who will use it daily",
          "A working prototype before full development is committed",
        ],
        support: "1 month support",
      },
      {
        name: "Growth",
        priceRange: "₹1,20,000 – ₹2,50,000",
        highlight: true,
        scope: "Multi-module custom platform with integrations",
        features: [
          "Requirement workshops with the people who will use it daily",
          "A working prototype before full development is committed",
          "Integrations with the tools you already refuse to give up",
          "Source code and documentation handed to you at the end",
        ],
        support: "3 months support",
      },
      {
        name: "Enterprise",
        priceRange: "₹2,50,000 – ₹4,00,000+",
        highlight: false,
        scope: "Full custom platform with migration and long-term support",
        features: [
          "Requirement workshops with the people who will use it daily",
          "A working prototype before full development is committed",
          "Integrations with the tools you already refuse to give up",
          "Source code and documentation handed to you at the end",
          "A migration plan off whatever you are running today",
        ],
        support: "6 months support",
      },
    ],
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
    benefits: [
      "Stock, sales and accounts that finally agree with each other",
      "Month-end close measured in hours rather than weeks",
      "Branch performance visible without waiting for reports",
      "GST documentation that is correct at the point of entry",
    ],
    useCases: [
      "Manufacturers tracking material through production stages",
      "Distributors running multi-warehouse stock",
      "Multi-branch retail needing consolidated reporting",
      "Businesses replacing three disconnected systems with one",
      "Companies outgrowing entry-level accounting packages",
    ],
    tiers: [
      {
        name: "Starter",
        priceRange: "₹80,000 – ₹1,80,000",
        highlight: false,
        scope: "Core inventory, purchase and sales modules",
        features: [
          "Master data for items, parties, taxes and locations",
          "Purchase-to-payment and order-to-cash flows end to end",
        ],
        support: "1 month support",
      },
      {
        name: "Growth",
        priceRange: "₹1,80,000 – ₹3,50,000",
        highlight: true,
        scope: "Full ERP with accounts, production and multi-location",
        features: [
          "Master data for items, parties, taxes and locations",
          "Purchase-to-payment and order-to-cash flows end to end",
          "Stock valuation that ties to the accounts, not a separate sheet",
          "GST-ready documents and returns-friendly exports",
        ],
        support: "3 months support",
      },
      {
        name: "Enterprise",
        priceRange: "₹3,50,000 – ₹6,00,000+",
        highlight: false,
        scope: "Enterprise ERP with custom modules and data migration",
        features: [
          "Master data for items, parties, taxes and locations",
          "Purchase-to-payment and order-to-cash flows end to end",
          "Stock valuation that ties to the accounts, not a separate sheet",
          "GST-ready documents and returns-friendly exports",
          "Branch and warehouse handling with consolidated reporting",
        ],
        support: "6 months support",
      },
    ],
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
    benefits: [
      "No enquiry lost because nobody owned it",
      "Proof of which marketing spend actually produced revenue",
      "Follow-ups that happen on time without being chased",
      "A customer history that outlives the salesperson",
    ],
    useCases: [
      "Consolidating leads from website, WhatsApp, calls and social",
      "Sales teams needing pipeline visibility",
      "Businesses running long, multi-visit sales cycles",
      "Measuring true cost per acquired customer by channel",
      "Handing over accounts without losing context",
    ],
    tiers: [
      {
        name: "Starter",
        priceRange: "₹30,000 – ₹60,000",
        highlight: false,
        scope: "Lead capture, stages and follow-up reminders",
        features: [
          "Lead capture from website, WhatsApp, calls and social in one inbox",
          "Ownership, stages and follow-up reminders per lead",
        ],
        support: "1 month support",
      },
      {
        name: "Growth",
        priceRange: "₹60,000 – ₹1,20,000",
        highlight: true,
        scope: "Full pipeline with quotations and reporting",
        features: [
          "Lead capture from website, WhatsApp, calls and social in one inbox",
          "Ownership, stages and follow-up reminders per lead",
          "Quotation and proposal generation from the lead record",
          "Source-wise conversion and revenue reporting",
        ],
        support: "3 months support",
      },
      {
        name: "Enterprise",
        priceRange: "₹1,20,000 – ₹2,00,000+",
        highlight: false,
        scope: "Multi-team CRM with automation and integrations",
        features: [
          "Lead capture from website, WhatsApp, calls and social in one inbox",
          "Ownership, stages and follow-up reminders per lead",
          "Quotation and proposal generation from the lead record",
          "Source-wise conversion and revenue reporting",
          "Call and message history attached to each contact",
        ],
        support: "6 months support",
      },
    ],
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
    benefits: [
      "Correct GST on every bill without a mental calculation",
      "Bills delivered to WhatsApp before the customer leaves",
      "Outstanding known exactly, per party, at any moment",
      "Return filing that starts from clean data",
    ],
    useCases: [
      "Retail counters needing fast, compliant billing",
      "Service businesses raising recurring invoices",
      "Wholesalers tracking party-wise outstanding",
      "Businesses moving off handwritten bill books",
      "Anyone whose accountant re-keys their invoices",
    ],
    tiers: [
      {
        name: "Starter",
        priceRange: "₹25,000 – ₹50,000",
        highlight: false,
        scope: "GST invoicing with print and party ledgers",
        features: [
          "GST invoices with HSN, CGST/SGST/IGST split and e-invoice-ready formats",
          "Recurring and part-payment billing with outstanding tracking",
        ],
        support: "1 month support",
      },
      {
        name: "Growth",
        priceRange: "₹50,000 – ₹95,000",
        highlight: true,
        scope: "Billing with payments, reminders and reporting",
        features: [
          "GST invoices with HSN, CGST/SGST/IGST split and e-invoice-ready formats",
          "Recurring and part-payment billing with outstanding tracking",
          "Thermal and A4 print, plus WhatsApp and email delivery",
          "Party ledgers and ageing reports",
        ],
        support: "3 months support",
      },
      {
        name: "Enterprise",
        priceRange: "₹95,000 – ₹1,50,000+",
        highlight: false,
        scope: "Multi-branch billing with e-invoice and integrations",
        features: [
          "GST invoices with HSN, CGST/SGST/IGST split and e-invoice-ready formats",
          "Recurring and part-payment billing with outstanding tracking",
          "Thermal and A4 print, plus WhatsApp and email delivery",
          "Party ledgers and ageing reports",
          "Tally-friendly and CSV exports for your accountant",
        ],
        support: "6 months support",
      },
    ],
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
    benefits: [
      "Job status answerable without making three phone calls",
      "Work distributed visibly instead of informally",
      "Evidence of completion attached to every job",
      "Daily summaries that arrive without being asked for",
    ],
    useCases: [
      "Service teams tracking jobs across staff and sites",
      "Businesses coordinating work across departments",
      "Operations running on WhatsApp groups today",
      "Managers who cannot see workload until it slips",
      "Any process where 'what is the status' is a daily question",
    ],
    tiers: [
      {
        name: "Starter",
        priceRange: "₹30,000 – ₹65,000",
        highlight: false,
        scope: "Task and job tracking with owners",
        features: [
          "Task, job and assignment tracking with owners and due dates",
          "Customer and vendor records with full interaction history",
        ],
        support: "1 month support",
      },
      {
        name: "Growth",
        priceRange: "₹65,000 – ₹1,20,000",
        highlight: true,
        scope: "Full operations system with dashboards",
        features: [
          "Task, job and assignment tracking with owners and due dates",
          "Customer and vendor records with full interaction history",
          "Staff-wise workload and completion dashboards",
          "Document and photo attachments against each job",
        ],
        support: "3 months support",
      },
      {
        name: "Enterprise",
        priceRange: "₹1,20,000 – ₹2,00,000+",
        highlight: false,
        scope: "Multi-department platform with automation",
        features: [
          "Task, job and assignment tracking with owners and due dates",
          "Customer and vendor records with full interaction history",
          "Staff-wise workload and completion dashboards",
          "Document and photo attachments against each job",
          "Daily and weekly summary reports, delivered automatically",
        ],
        support: "6 months support",
      },
    ],
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
    benefits: [
      "A queue that moves at the speed of the barcode scanner",
      "Stock that updates itself at the moment of sale",
      "Day-close figures that match the cash drawer",
      "Billing that keeps working when the internet does not",
    ],
    useCases: [
      "Retail counters with high transaction volume",
      "Restaurants needing KOT and table billing",
      "Pharmacies billing by batch and expiry",
      "Multi-outlet chains needing consolidated sales data",
      "Shops replacing a cash register with something that reports",
    ],
    tiers: [
      {
        name: "Starter",
        priceRange: "₹30,000 – ₹60,000",
        highlight: false,
        scope: "Single-counter POS with stock deduction",
        features: [
          "Barcode and quick-key billing built for speed at the counter",
          "Split payments across cash, UPI and card on one bill",
        ],
        support: "1 month support",
      },
      {
        name: "Growth",
        priceRange: "₹60,000 – ₹1,10,000",
        highlight: true,
        scope: "Multi-counter POS with reporting and offline mode",
        features: [
          "Barcode and quick-key billing built for speed at the counter",
          "Split payments across cash, UPI and card on one bill",
          "Stock deduction at the moment of sale",
          "Day-close, shift-wise and cashier-wise sales reports",
        ],
        support: "3 months support",
      },
      {
        name: "Enterprise",
        priceRange: "₹1,10,000 – ₹1,80,000+",
        highlight: false,
        scope: "Multi-outlet POS with central control and integrations",
        features: [
          "Barcode and quick-key billing built for speed at the counter",
          "Split payments across cash, UPI and card on one bill",
          "Stock deduction at the moment of sale",
          "Day-close, shift-wise and cashier-wise sales reports",
          "Offline mode that syncs when the connection returns",
        ],
        support: "6 months support",
      },
    ],
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
    benefits: [
      "Reorder alerts before a customer finds the shelf empty",
      "Dead stock identified while it still has value",
      "Stock value that ties to the books without adjustment",
      "Transfers between locations that leave a trail",
    ],
    useCases: [
      "Multi-warehouse and multi-branch stock control",
      "Batch and expiry-sensitive goods",
      "Businesses whose physical count never matches the register",
      "Distributors managing thousands of SKUs",
      "Anyone ordering stock from memory today",
    ],
    tiers: [
      {
        name: "Starter",
        priceRange: "₹30,000 – ₹65,000",
        highlight: false,
        scope: "Single-location stock with reorder alerts",
        features: [
          "Item masters with batch, expiry and serial tracking where it matters",
          "Multi-location and multi-warehouse stock with transfers",
        ],
        support: "1 month support",
      },
      {
        name: "Growth",
        priceRange: "₹65,000 – ₹1,25,000",
        highlight: true,
        scope: "Multi-location stock with transfers and valuation",
        features: [
          "Item masters with batch, expiry and serial tracking where it matters",
          "Multi-location and multi-warehouse stock with transfers",
          "Reorder levels with automatic purchase suggestions",
          "Physical stock-take with variance reporting",
        ],
        support: "3 months support",
      },
      {
        name: "Enterprise",
        priceRange: "₹1,25,000 – ₹2,00,000+",
        highlight: false,
        scope: "Enterprise inventory with batch, serial and integrations",
        features: [
          "Item masters with batch, expiry and serial tracking where it matters",
          "Multi-location and multi-warehouse stock with transfers",
          "Reorder levels with automatic purchase suggestions",
          "Physical stock-take with variance reporting",
          "Stock valuation, movement and ageing reports",
        ],
        support: "6 months support",
      },
    ],
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
    benefits: [
      "Books that are current, not reconstructed at year end",
      "Receivables chased automatically instead of forgotten",
      "GST summaries generated rather than compiled",
      "A P&L you can look at any day of the month",
    ],
    useCases: [
      "Businesses whose accounts lag operations by weeks",
      "Companies reconciling bank statements by hand",
      "Multi-entity groups needing consolidated books",
      "Firms whose accountant re-enters everything",
      "Anyone discovering their margin after the quarter ends",
    ],
    tiers: [
      {
        name: "Starter",
        priceRange: "₹50,000 – ₹1,10,000",
        highlight: false,
        scope: "Ledgers, vouchers and basic reporting",
        features: [
          "Double-entry ledgers with vouchers, journals and bank entries",
          "Receivables and payables with ageing and reminder automation",
        ],
        support: "1 month support",
      },
      {
        name: "Growth",
        priceRange: "₹1,10,000 – ₹2,00,000",
        highlight: true,
        scope: "Full accounting with GST and reconciliation",
        features: [
          "Double-entry ledgers with vouchers, journals and bank entries",
          "Receivables and payables with ageing and reminder automation",
          "GST summaries and returns-ready exports",
          "Bank reconciliation against imported statements",
        ],
        support: "3 months support",
      },
      {
        name: "Enterprise",
        priceRange: "₹2,00,000 – ₹3,00,000+",
        highlight: false,
        scope: "Multi-entity accounting with custom reporting",
        features: [
          "Double-entry ledgers with vouchers, journals and bank entries",
          "Receivables and payables with ageing and reminder automation",
          "GST summaries and returns-ready exports",
          "Bank reconciliation against imported statements",
          "P&L, balance sheet and cash-flow reporting",
        ],
        support: "6 months support",
      },
    ],
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
    benefits: [
      "Payroll that takes an afternoon instead of three days",
      "Statutory deductions computed by rule, not by hand",
      "Leave balances employees can check themselves",
      "Attendance that cannot be quietly rewritten",
    ],
    useCases: [
      "Companies processing payroll on spreadsheets",
      "Businesses with shift or field-based attendance",
      "Organisations needing PF, ESI and TDS compliance",
      "Multi-location teams with different leave policies",
      "HR teams answering the same payslip question weekly",
    ],
    tiers: [
      {
        name: "Starter",
        priceRange: "₹45,000 – ₹95,000",
        highlight: false,
        scope: "Attendance, leave and payslip generation",
        features: [
          "Biometric, mobile or geo-tagged attendance capture",
          "Leave policy, approval chain and balance tracking",
        ],
        support: "1 month support",
      },
      {
        name: "Growth",
        priceRange: "₹95,000 – ₹1,70,000",
        highlight: true,
        scope: "Full HRMS with statutory compliance and self-service",
        features: [
          "Biometric, mobile or geo-tagged attendance capture",
          "Leave policy, approval chain and balance tracking",
          "Salary structures with PF, ESI, TDS and professional tax",
          "Payslip generation and direct bank transfer files",
        ],
        support: "3 months support",
      },
      {
        name: "Enterprise",
        priceRange: "₹1,70,000 – ₹2,50,000+",
        highlight: false,
        scope: "Enterprise HRMS with multi-entity payroll and integrations",
        features: [
          "Biometric, mobile or geo-tagged attendance capture",
          "Leave policy, approval chain and balance tracking",
          "Salary structures with PF, ESI, TDS and professional tax",
          "Payslip generation and direct bank transfer files",
          "Employee self-service for payslips, leave and documents",
        ],
        support: "6 months support",
      },
    ],
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
    benefits: [
      "Reach on the platform roughly 95% of Indian users are on",
      "An app that runs on the phones your customers own today",
      "Play Store presence that lends credibility",
      "Low data and battery use, which is why people keep it installed",
    ],
    useCases: [
      "Consumer apps targeting the Indian mass market",
      "Field-staff apps used on company-issued budget phones",
      "Delivery and logistics apps for riders",
      "Retail loyalty apps for walk-in customers",
      "Apps that must work on older Android versions",
    ],
    tiers: [
      {
        name: "Starter",
        priceRange: "₹15,000 – ₹32,000",
        highlight: false,
        scope: "Core Android app with a focused feature set",
        features: [
          "Play Store listing, assets and release management handled for you",
          "Tested down to entry-level devices and older Android versions",
        ],
        support: "1 month support",
      },
      {
        name: "Growth",
        priceRange: "₹32,000 – ₹60,000",
        highlight: true,
        scope: "Full Android app with payments and admin panel",
        features: [
          "Play Store listing, assets and release management handled for you",
          "Tested down to entry-level devices and older Android versions",
          "APK size and battery use kept deliberately low",
          "Push notifications through Firebase Cloud Messaging",
        ],
        support: "3 months support",
      },
      {
        name: "Enterprise",
        priceRange: "₹60,000 – ₹90,000+",
        highlight: false,
        scope: "Complex Android app with backend and integrations",
        features: [
          "Play Store listing, assets and release management handled for you",
          "Tested down to entry-level devices and older Android versions",
          "APK size and battery use kept deliberately low",
          "Push notifications through Firebase Cloud Messaging",
          "Crash reporting and analytics wired in from day one",
        ],
        support: "6 months support",
      },
    ],
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
    benefits: [
      "Access to the segment with the highest average order value",
      "An app that passes App Store review the first time",
      "Native feel that meets the expectations iPhone users have",
      "Apple Pay and Sign in with Apple where they help conversion",
    ],
    useCases: [
      "Premium and lifestyle brands",
      "Apps where iPhone users are the paying segment",
      "Businesses needing parity with an existing Android app",
      "Products requiring Apple ecosystem integration",
      "Apps targeting international audiences",
    ],
    tiers: [
      {
        name: "Starter",
        priceRange: "₹20,000 – ₹40,000",
        highlight: false,
        scope: "Core iOS app with a focused feature set",
        features: [
          "App Store submission, privacy declarations and review handling",
          "iOS design language — gestures, haptics and typography that fit",
        ],
        support: "1 month support",
      },
      {
        name: "Growth",
        priceRange: "₹40,000 – ₹70,000",
        highlight: true,
        scope: "Full iOS app with payments and admin panel",
        features: [
          "App Store submission, privacy declarations and review handling",
          "iOS design language — gestures, haptics and typography that fit",
          "Sign in with Apple and Apple Pay where relevant",
          "iPad layouts where the use case justifies them",
        ],
        support: "3 months support",
      },
      {
        name: "Enterprise",
        priceRange: "₹70,000 – ₹1,00,000+",
        highlight: false,
        scope: "Complex iOS app with backend and integrations",
        features: [
          "App Store submission, privacy declarations and review handling",
          "iOS design language — gestures, haptics and typography that fit",
          "Sign in with Apple and Apple Pay where relevant",
          "iPad layouts where the use case justifies them",
          "TestFlight builds so you can try each version before release",
        ],
        support: "6 months support",
      },
    ],
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
    benefits: [
      "Both platforms for close to the cost of one",
      "Features that can never drift apart between Android and iOS",
      "One bug list and one team instead of two",
      "A single design system across both stores",
    ],
    useCases: [
      "Startups needing both platforms on a limited budget",
      "Products where feature parity across platforms matters",
      "Rebuilding two separate apps that have diverged",
      "Apps with heavy custom UI",
      "Teams that cannot maintain two native codebases",
    ],
    tiers: [
      {
        name: "Starter",
        priceRange: "₹20,000 – ₹45,000",
        highlight: false,
        scope: "Core cross-platform app",
        features: [
          "Single codebase targeting Android and iOS from day one",
          "Shared design system so both platforms stay visually identical",
        ],
        support: "1 month support",
      },
      {
        name: "Growth",
        priceRange: "₹45,000 – ₹80,000",
        highlight: true,
        scope: "Full cross-platform app with payments and admin",
        features: [
          "Single codebase targeting Android and iOS from day one",
          "Shared design system so both platforms stay visually identical",
          "Native module bridging where a platform feature demands it",
          "Both store listings prepared and submitted",
        ],
        support: "3 months support",
      },
      {
        name: "Enterprise",
        priceRange: "₹80,000 – ₹1,20,000+",
        highlight: false,
        scope: "Complex cross-platform app with native modules",
        features: [
          "Single codebase targeting Android and iOS from day one",
          "Shared design system so both platforms stay visually identical",
          "Native module bridging where a platform feature demands it",
          "Both store listings prepared and submitted",
          "Over-the-air update path for non-native changes",
        ],
        support: "6 months support",
      },
    ],
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
    benefits: [
      "Routine queries answered by the portal, not by your staff",
      "Customers and partners served outside office hours",
      "Every user seeing exactly what they are entitled to",
      "A record of who did what, and when",
    ],
    useCases: [
      "Customer self-service and status tracking",
      "Vendor and partner onboarding portals",
      "Employee and internal information portals",
      "Member portals for associations and institutions",
      "Document submission and approval workflows",
    ],
    tiers: [
      {
        name: "Starter",
        priceRange: "₹40,000 – ₹85,000",
        highlight: false,
        scope: "Single-role portal with core self-service",
        features: [
          "Role-based logins for each type of user",
          "Self-service records, documents and status tracking",
        ],
        support: "1 month support",
      },
      {
        name: "Growth",
        priceRange: "₹85,000 – ₹1,60,000",
        highlight: true,
        scope: "Multi-role portal with workflows and notifications",
        features: [
          "Role-based logins for each type of user",
          "Self-service records, documents and status tracking",
          "Notification and email flows tied to real status changes",
          "Search and filtering across large record sets",
        ],
        support: "3 months support",
      },
      {
        name: "Enterprise",
        priceRange: "₹1,60,000 – ₹2,50,000+",
        highlight: false,
        scope: "Enterprise portal with integrations and SSO",
        features: [
          "Role-based logins for each type of user",
          "Self-service records, documents and status tracking",
          "Notification and email flows tied to real status changes",
          "Search and filtering across large record sets",
          "Admin controls for onboarding and permissions",
        ],
        support: "6 months support",
      },
    ],
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
    benefits: [
      "Decisions made from a live number, not last week's export",
      "Drill-down from any figure to the records behind it",
      "Reports that send themselves on schedule",
      "Operations staff able to act without a developer",
    ],
    useCases: [
      "Management dashboards for multi-branch businesses",
      "Admin panels for an existing app or website",
      "Operations consoles for support and fulfilment teams",
      "Investor and board reporting views",
      "Replacing a weekly manual reporting ritual",
    ],
    tiers: [
      {
        name: "Starter",
        priceRange: "₹25,000 – ₹55,000",
        highlight: false,
        scope: "Core dashboard with key metrics",
        features: [
          "Live KPI tiles chosen with you, not a default template",
          "Drill-down from any summary figure to the underlying records",
        ],
        support: "1 month support",
      },
      {
        name: "Growth",
        priceRange: "₹55,000 – ₹1,00,000",
        highlight: true,
        scope: "Full admin panel with management actions",
        features: [
          "Live KPI tiles chosen with you, not a default template",
          "Drill-down from any summary figure to the underlying records",
          "Bulk actions and record management for your operations team",
          "Scheduled report exports to email or WhatsApp",
        ],
        support: "3 months support",
      },
      {
        name: "Enterprise",
        priceRange: "₹1,00,000 – ₹1,50,000+",
        highlight: false,
        scope: "Multi-role console with custom analytics",
        features: [
          "Live KPI tiles chosen with you, not a default template",
          "Drill-down from any summary figure to the underlying records",
          "Bulk actions and record management for your operations team",
          "Scheduled report exports to email or WhatsApp",
          "Access control so each role sees an appropriate view",
        ],
        support: "6 months support",
      },
    ],
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
    benefits: [
      "Hours of skilled attention returned to the people who have it",
      "Accuracy measured against a baseline, not asserted",
      "A pilot that proves value before the full spend",
      "Cost per run visible, so the economics stay honest",
    ],
    useCases: [
      "Document and invoice data extraction at volume",
      "Classification and routing of incoming work",
      "Search across a large internal knowledge base",
      "Quality inspection from images",
      "Summarising long records for faster decisions",
    ],
    tiers: [
      {
        name: "Starter",
        priceRange: "₹60,000 – ₹1,50,000",
        highlight: false,
        scope: "Scoped pilot on a single workflow",
        features: [
          "A scoped pilot on one workflow before any wider commitment",
          "Document, image or text processing tuned to your own data",
        ],
        support: "1 month support",
      },
      {
        name: "Growth",
        priceRange: "₹1,50,000 – ₹3,00,000",
        highlight: true,
        scope: "Production AI feature with human review",
        features: [
          "A scoped pilot on one workflow before any wider commitment",
          "Document, image or text processing tuned to your own data",
          "Human-in-the-loop review so nothing ships unchecked",
          "Accuracy measured against a real baseline you agree upfront",
        ],
        support: "3 months support",
      },
      {
        name: "Enterprise",
        priceRange: "₹3,00,000 – ₹5,00,000+",
        highlight: false,
        scope: "Multi-workflow AI system with monitoring",
        features: [
          "A scoped pilot on one workflow before any wider commitment",
          "Document, image or text processing tuned to your own data",
          "Human-in-the-loop review so nothing ships unchecked",
          "Accuracy measured against a real baseline you agree upfront",
          "Cost-per-run monitoring so the economics stay visible",
        ],
        support: "6 months support",
      },
    ],
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
    benefits: [
      "Instant answers at 2am without staffing 2am",
      "Your team seeing only the enquiries worth their time",
      "Answers drawn from your real catalogue and policies",
      "Leads captured inside the conversation",
    ],
    useCases: [
      "WhatsApp enquiry handling at scale",
      "Website support and pre-sales questions",
      "Order and booking status queries",
      "Internal helpdesk over company documents",
      "Qualifying leads before a human picks up",
    ],
    tiers: [
      {
        name: "Starter",
        priceRange: "₹25,000 – ₹55,000",
        highlight: false,
        scope: "Website chatbot on your own content",
        features: [
          "Trained on your own documents, catalogue and past answers",
          "WhatsApp Business API and website widget from one brain",
        ],
        support: "1 month support",
      },
      {
        name: "Growth",
        priceRange: "₹55,000 – ₹1,10,000",
        highlight: true,
        scope: "WhatsApp plus website with CRM handover",
        features: [
          "Trained on your own documents, catalogue and past answers",
          "WhatsApp Business API and website widget from one brain",
          "Explicit handover to a human with full conversation context",
          "Lead capture inside the conversation, pushed to your CRM",
        ],
        support: "3 months support",
      },
      {
        name: "Enterprise",
        priceRange: "₹1,10,000 – ₹1,80,000+",
        highlight: false,
        scope: "Multi-channel assistant with custom actions",
        features: [
          "Trained on your own documents, catalogue and past answers",
          "WhatsApp Business API and website widget from one brain",
          "Explicit handover to a human with full conversation context",
          "Lead capture inside the conversation, pushed to your CRM",
          "Answer-quality logs so you can see what it got wrong",
        ],
        support: "6 months support",
      },
    ],
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
    benefits: [
      "Work that stops being done by a person at all",
      "Data moving between systems without copy and paste",
      "Failures that raise an alert instead of disappearing",
      "An audit of where staff hours go, before anything is built",
    ],
    useCases: [
      "Moving data between systems that do not integrate",
      "Extracting data from invoices, forms and PDFs",
      "Automated follow-up on real business triggers",
      "Report compilation that happens manually today",
      "Order and enquiry routing across teams",
    ],
    tiers: [
      {
        name: "Starter",
        priceRange: "₹35,000 – ₹85,000",
        highlight: false,
        scope: "One automated workflow end to end",
        features: [
          "An audit of where staff hours currently go, before anything is built",
          "Automated data flow between the systems you already run",
        ],
        support: "1 month support",
      },
      {
        name: "Growth",
        priceRange: "₹85,000 – ₹1,80,000",
        highlight: true,
        scope: "Several connected automations with monitoring",
        features: [
          "An audit of where staff hours currently go, before anything is built",
          "Automated data flow between the systems you already run",
          "Document extraction from invoices, forms and PDFs",
          "Trigger-based alerts and follow-ups on real business events",
        ],
        support: "3 months support",
      },
      {
        name: "Enterprise",
        priceRange: "₹1,80,000 – ₹3,00,000+",
        highlight: false,
        scope: "Company-wide automation layer with AI extraction",
        features: [
          "An audit of where staff hours currently go, before anything is built",
          "Automated data flow between the systems you already run",
          "Document extraction from invoices, forms and PDFs",
          "Trigger-based alerts and follow-ups on real business events",
          "A failure path that notifies a human instead of silently dropping work",
        ],
        support: "6 months support",
      },
    ],
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
    benefits: [
      "Revenue that does not require more of your hours",
      "A hundredth customer costing no more effort than the second",
      "Subscription billing that runs itself",
      "Infrastructure that survives the growth you are hoping for",
    ],
    useCases: [
      "Turning an internal tool into a sellable product",
      "Launching a subscription product from scratch",
      "Productising a service business",
      "Multi-tenant platforms for an industry vertical",
      "Marketplaces with recurring seller subscriptions",
    ],
    tiers: [
      {
        name: "Starter",
        priceRange: "₹1,00,000 – ₹2,50,000",
        highlight: false,
        scope: "MVP SaaS with subscriptions and one core module",
        features: [
          "Multi-tenant architecture with hard data isolation per customer",
          "Subscription billing, plans, trials and dunning",
        ],
        support: "1 month support",
      },
      {
        name: "Growth",
        priceRange: "₹2,50,000 – ₹5,00,000",
        highlight: true,
        scope: "Full SaaS with self-serve onboarding and analytics",
        features: [
          "Multi-tenant architecture with hard data isolation per customer",
          "Subscription billing, plans, trials and dunning",
          "Self-serve signup and onboarding without your involvement",
          "Usage metering and per-tenant analytics",
        ],
        support: "3 months support",
      },
      {
        name: "Enterprise",
        priceRange: "₹5,00,000 – ₹8,00,000+",
        highlight: false,
        scope: "Scalable multi-tenant platform with enterprise features",
        features: [
          "Multi-tenant architecture with hard data isolation per customer",
          "Subscription billing, plans, trials and dunning",
          "Self-serve signup and onboarding without your involvement",
          "Usage metering and per-tenant analytics",
          "Infrastructure that scales without a rewrite at 10x",
        ],
        support: "6 months support",
      },
    ],
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
    benefits: [
      "The 20–30% marketplace commission staying with you",
      "Buyer contact details that belong to your business",
      "Repeat purchase campaigns you can actually run",
      "Pricing and promotion decisions nobody else controls",
    ],
    useCases: [
      "Brands moving off marketplace dependence",
      "Multi-vendor marketplaces with commission settlement",
      "D2C storefronts with UPI and COD",
      "B2B ordering portals for dealers",
      "Retailers taking their catalogue online",
    ],
    tiers: [
      {
        name: "Starter",
        priceRange: "₹40,000 – ₹1,00,000",
        highlight: false,
        scope: "Single-vendor store with payments and orders",
        features: [
          "Catalogue, variants, pricing rules and inventory sync",
          "UPI, card, netbanking and cash-on-delivery checkout",
        ],
        support: "1 month support",
      },
      {
        name: "Growth",
        priceRange: "₹1,00,000 – ₹2,20,000",
        highlight: true,
        scope: "Full store with shipping, returns and campaigns",
        features: [
          "Catalogue, variants, pricing rules and inventory sync",
          "UPI, card, netbanking and cash-on-delivery checkout",
          "Order, shipping and returns workflow through to delivery",
          "Multi-vendor onboarding, commission and settlement, where needed",
        ],
        support: "3 months support",
      },
      {
        name: "Enterprise",
        priceRange: "₹2,20,000 – ₹4,00,000+",
        highlight: false,
        scope: "Multi-vendor marketplace with settlement",
        features: [
          "Catalogue, variants, pricing rules and inventory sync",
          "UPI, card, netbanking and cash-on-delivery checkout",
          "Order, shipping and returns workflow through to delivery",
          "Multi-vendor onboarding, commission and settlement, where needed",
          "Abandoned-cart and re-order flows over WhatsApp",
        ],
        support: "6 months support",
      },
    ],
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
    benefits: [
      "Money reconciled by the system rather than by a person",
      "Data that stops being re-typed between tools",
      "Webhooks that survive retries without double-charging",
      "Integrations documented for whoever maintains them next",
    ],
    useCases: [
      "Adding UPI, card and netbanking to an existing product",
      "Settlement and refund reconciliation",
      "Connecting to logistics and shipping partners",
      "WhatsApp Business API and SMS integration",
      "Government and GST portal integrations",
    ],
    tiers: [
      {
        name: "Starter",
        priceRange: "₹15,000 – ₹35,000",
        highlight: false,
        scope: "Single gateway or API integration",
        features: [
          "Razorpay, PayU, Cashfree, Stripe and UPI integration",
          "Webhook handling that survives retries and duplicate events",
        ],
        support: "1 month support",
      },
      {
        name: "Growth",
        priceRange: "₹35,000 – ₹75,000",
        highlight: true,
        scope: "Multiple integrations with reconciliation",
        features: [
          "Razorpay, PayU, Cashfree, Stripe and UPI integration",
          "Webhook handling that survives retries and duplicate events",
          "Settlement and refund reconciliation against your own records",
          "Logistics, SMS, WhatsApp and GST portal integrations",
        ],
        support: "3 months support",
      },
      {
        name: "Enterprise",
        priceRange: "₹75,000 – ₹1,20,000+",
        highlight: false,
        scope: "Complex integration layer with documentation",
        features: [
          "Razorpay, PayU, Cashfree, Stripe and UPI integration",
          "Webhook handling that survives retries and duplicate events",
          "Settlement and refund reconciliation against your own records",
          "Logistics, SMS, WhatsApp and GST portal integrations",
          "API documentation and a sandbox for your own team",
        ],
        support: "6 months support",
      },
    ],
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
    benefits: [
      "Billing that continues when the connection drops",
      "Cloud access to the same data from anywhere",
      "Updates that install without an IT visit",
      "Backups that are tested, not just configured",
    ],
    useCases: [
      "Counters in areas with unreliable connectivity",
      "Businesses needing speed a browser cannot match",
      "Hardware-connected systems — scales, printers, scanners",
      "Existing desktop software needing a cloud layer",
      "Multi-branch operations syncing to a central office",
    ],
    tiers: [
      {
        name: "Starter",
        priceRange: "₹60,000 – ₹1,40,000",
        highlight: false,
        scope: "Desktop application with local database",
        features: [
          "Windows desktop application with a local database",
          "Cloud sync with conflict resolution when a device reconnects",
        ],
        support: "1 month support",
      },
      {
        name: "Growth",
        priceRange: "₹1,40,000 – ₹2,60,000",
        highlight: true,
        scope: "Desktop plus cloud sync and web access",
        features: [
          "Windows desktop application with a local database",
          "Cloud sync with conflict resolution when a device reconnects",
          "Cloud hosting, backups and restore testing",
          "Automatic desktop updates without an IT visit",
        ],
        support: "3 months support",
      },
      {
        name: "Enterprise",
        priceRange: "₹2,60,000 – ₹4,00,000+",
        highlight: false,
        scope: "Full hybrid platform with multi-branch sync",
        features: [
          "Windows desktop application with a local database",
          "Cloud sync with conflict resolution when a device reconnects",
          "Cloud hosting, backups and restore testing",
          "Automatic desktop updates without an IT visit",
          "The same data visible from a browser wherever you are",
        ],
        support: "6 months support",
      },
    ],
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
    benefits: [
      "Someone accountable when it breaks at the worst moment",
      "Security patches applied before they become incidents",
      "Problems found by monitoring rather than by customers",
      "Small improvements that keep arriving instead of stalling",
    ],
    useCases: [
      "Taking over software whose original developer left",
      "Keeping a live system patched and monitored",
      "Fixing and stabilising an inherited codebase",
      "Ongoing small enhancements without a new project",
      "Uptime and incident response for a business-critical system",
    ],
    tiers: [
      {
        name: "Starter",
        priceRange: "₹8,000 – ₹18,000 / month",
        highlight: false,
        scope: "Monitoring, patching and bug fixes",
        features: [
          "Takeover audit of an existing codebase, however it was left",
          "Security patching and dependency updates on a schedule",
        ],
        support: "1 month support",
      },
      {
        name: "Growth",
        priceRange: "₹18,000 – ₹35,000 / month",
        highlight: true,
        scope: "Maintenance plus a monthly change budget",
        features: [
          "Takeover audit of an existing codebase, however it was left",
          "Security patching and dependency updates on a schedule",
          "Uptime monitoring with alerts before your customers notice",
          "Defined response times for issues, in writing",
        ],
        support: "3 months support",
      },
      {
        name: "Enterprise",
        priceRange: "₹35,000 – ₹60,000 / month",
        highlight: false,
        scope: "Priority support with defined response times",
        features: [
          "Takeover audit of an existing codebase, however it was left",
          "Security patching and dependency updates on a schedule",
          "Uptime monitoring with alerts before your customers notice",
          "Defined response times for issues, in writing",
          "A monthly change budget for small improvements",
        ],
        support: "6 months support",
      },
    ],
  },
];
