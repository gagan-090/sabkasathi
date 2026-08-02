/* ─────────────────────────────────────────────────────────────────────────
   INDUSTRY × SERVICE PAGE GENERATOR

   The second programmatic axis of the site. `lib/localSeo.ts` owns
   service × city (`/website-development-company-in-patna`); this file owns
   service × industry (`/restaurant-billing-software-development`).

   Why two axes and not three: the full service × industry × city matrix is
   25 × 53 × 242 ≈ 320,000 URLs. That is the exact shape Google's doorway-page
   policy targets, it blows past the 50,000-URL sitemap limit six times over,
   and no amount of templating makes 320,000 pages individually useful. Two
   independent axes that link to each other cover the same query space with
   pages a human would actually read.

   Every page here is assembled from two hand-written records — one industry,
   one service — that each carry their own specifics (what the sector actually
   runs on, what the service actually ships). The generator's job is to weave
   them, not to keyword-swap a single template: an industry's `pains` and
   `systems` drive different sentences than another industry's, so
   `restaurant-pos-software-development` and `pharma-pos-software-development`
   argue for different things rather than differing by one noun.

   Three search surfaces are covered on every page:
     SEO  classic — title/description, H1/H2 hierarchy, internal links
     AEO  answer engines — a direct-answer block and FAQPage schema written
          to be quotable verbatim by an AI overview
     GEO  geographic — Service schema with a real areaServed list and links
          into the matching city pages on the other axis
   ───────────────────────────────────────────────────────────────────────── */

import {
  businessIdentity,
  cities,
  contactInfo,
  generateSlug,
  isRealValue,
  stats,
  type CityInfo,
} from "./localSeo";
import { industryServices, type IndustryServiceInfo } from "./services25";

// Re-exported so consumers can treat this module as the entry point for the
// industry axis without needing to know the catalog was split out to break an
// import cycle with localSeo.
export { industryServices };
export type { IndustryServiceInfo };

export const SITE_URL = "https://sabkasaathidigitalservices.com";

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface IndustryInfo {
  /** Short keyword form used in headings and slugs — "Restaurant". */
  name: string;
  /** The full category as the business would describe itself. */
  label: string;
  slug: string;
  group: string;
  /** "restaurants" — used mid-sentence where a plural reads better. */
  plural: string;
  /** Who actually signs off on the project. */
  audience: string;
  /** One clause on how the sector operates day to day. Drives the intro. */
  context: string;
  /** Three concrete operational problems. These become the "why" sections. */
  pains: string[];
  /** What the sector needs the software to actually do. */
  systems: string[];
}


export interface IndustryPageData {
  slug: string;
  industrySlug: string;
  serviceSlug: string;
  industryName: string;
  industryLabel: string;
  industryGroup: string;
  serviceName: string;
  serviceGroup: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  tagline: string;
  /** AEO: the paragraph written to be lifted verbatim into an AI answer. */
  directAnswer: string;
  intro: string;
  whyThisIndustry: string;
  howItWorks: string;
  modules: string[];
  pains: { pain: string; fix: string }[];
  systems: string[];
  techStack: string[];
  timeline: string;
  priceBand: string;
  keyTakeaways: string[];
  specs: { label: string; value: string }[];
  faqs: { q: string; a: string }[];
  /** GEO: the same service, in the cities we publish city pages for. */
  cityLinks: { name: string; state: string; url: string }[];
  /** Other services for this same industry. */
  siblingServices: { name: string; url: string; group: string }[];
  /** The same service for adjacent industries in the same group. */
  siblingIndustries: { name: string; url: string }[];
  stats: typeof stats;
  contactInfo: typeof contactInfo;
  schemas: Record<string, unknown>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// THE INDUSTRIES
// (the 25 services they pair with live in ./services25)
// ═══════════════════════════════════════════════════════════════════════════

export const industries: IndustryInfo[] = [
  // ── Business & Retail ───────────────────────────────────────────────────
  {
    name: "Startup",
    label: "Startup & New Business",
    slug: "startup",
    group: "Business & Retail",
    plural: "startups",
    audience: "founders and early teams",
    context:
      "you are proving an idea with limited runway, and every week spent building the wrong thing is a week you cannot buy back",
    pains: [
      "Requirements change faster than a fixed-scope contract can absorb",
      "No in-house engineering team to hand a specification to",
      "Investors want a working product, not a deck describing one",
    ],
    systems: [
      "An MVP narrow enough to launch and honest enough to learn from",
      "Analytics that show what users actually do, not what you hoped",
      "An architecture that survives the first traction spike",
      "A codebase a future in-house team can take over cleanly",
    ],
  },
  {
    name: "Retail & E-commerce",
    label: "E-commerce & Retail",
    slug: "retail",
    group: "Business & Retail",
    plural: "retail and e-commerce businesses",
    audience: "store owners and online sellers",
    context:
      "you sell across a shop counter, a marketplace listing and a WhatsApp catalogue at the same time, and stock has to be right in all three",
    pains: [
      "Marketplace commissions eat the margin you priced for",
      "Online and offline stock disagree, so orders get cancelled",
      "Customer data lives with the marketplace, not with you",
    ],
    systems: [
      "One stock figure shared by store, website and marketplace",
      "Your own storefront where the margin stays with you",
      "Order and returns handling through to delivery",
      "Repeat-purchase campaigns to customers you own",
    ],
  },
  {
    name: "Local Shop",
    label: "Local Shops",
    slug: "local-shop",
    group: "Business & Retail",
    plural: "local shops",
    audience: "shop owners and counter staff",
    context:
      "billing happens with a queue waiting, and the day's accounts get worked out from the cash drawer after closing",
    pains: [
      "Handwritten bills mean no record of what actually sold",
      "Credit given to regulars is tracked in a notebook, or in memory",
      "You cannot tell which items earn and which just occupy shelf space",
    ],
    systems: [
      "Counter billing fast enough not to slow the queue",
      "Customer credit and udhaar ledgers that reconcile",
      "Item-wise sales so you stock what actually moves",
      "A digital presence for customers searching your area",
    ],
  },
  {
    name: "Wholesale",
    label: "Wholesale Businesses",
    slug: "wholesale",
    group: "Business & Retail",
    plural: "wholesale businesses",
    audience: "distributors and wholesale traders",
    context:
      "you sell in bulk to retailers on credit, and your working capital is trapped in outstanding invoices",
    pains: [
      "Party-wise outstanding is known roughly, never exactly",
      "Rate lists differ per buyer and get applied from memory",
      "Order-taking by phone produces disputes at delivery",
    ],
    systems: [
      "Party-wise ledgers with ageing and credit limits",
      "Buyer-specific rate lists applied automatically",
      "A retailer ordering app that removes the phone call",
      "Dispatch and delivery-challan tracking",
    ],
  },
  {
    name: "Hardware Shop",
    label: "Hardware Shops",
    slug: "hardware-shop",
    group: "Business & Retail",
    plural: "hardware and building-material shops",
    audience: "hardware and building-material dealers",
    context:
      "you carry thousands of low-value SKUs in sizes and grades that customers ask for by local name, not catalogue name",
    pains: [
      "SKU counts are too large to track on paper accurately",
      "Contractors buy on running credit across many small visits",
      "Rate changes from suppliers do not reach the counter in time",
    ],
    systems: [
      "Item masters that handle size, grade and local naming",
      "Contractor accounts with running credit and periodic settlement",
      "Fast counter billing with quick-key access to common items",
      "Reorder alerts on fast-moving lines",
    ],
  },
  {
    name: "Fashion & Clothing",
    label: "Fashion & Clothing",
    slug: "fashion",
    group: "Business & Retail",
    plural: "fashion and clothing businesses",
    audience: "boutique owners and clothing retailers",
    context:
      "the same design exists in six sizes and four colours, and the one the customer wants is the one you cannot find",
    pains: [
      "Size-colour matrix stock is nearly impossible to track manually",
      "Seasonal inventory left unsold ties up the next season's cash",
      "Customers browse on Instagram and buy wherever it is easiest",
    ],
    systems: [
      "Variant-level stock across size, colour and style",
      "A catalogue that syncs to Instagram and WhatsApp",
      "Season-wise sell-through reporting before markdown decisions",
      "Online storefront with easy exchange handling",
    ],
  },
  {
    name: "Franchise",
    label: "Franchise Businesses",
    slug: "franchise",
    group: "Business & Retail",
    plural: "franchise networks",
    audience: "franchisors and multi-outlet operators",
    context:
      "every outlet is run by a different owner, and the brand's consistency depends on visibility you currently do not have",
    pains: [
      "Each outlet reports numbers in its own format, late",
      "Royalty calculation depends on self-declared sales",
      "Brand standards drift outlet by outlet with no early warning",
    ],
    systems: [
      "One billing system across all outlets, reporting to a single dashboard",
      "Automatic royalty computation from actual sales data",
      "Outlet-wise performance comparison",
      "Centrally controlled pricing, offers and catalogue",
    ],
  },

  // ── Medical & Wellness ──────────────────────────────────────────────────
  {
    name: "Healthcare",
    label: "Medical & Healthcare",
    slug: "healthcare",
    group: "Medical & Wellness",
    plural: "clinics and hospitals",
    audience: "doctors, clinic owners and hospital administrators",
    context:
      "patients arrive without appointments, records live in paper files, and the doctor's time is the scarcest resource in the building",
    pains: [
      "Waiting rooms fill up because there is no real appointment system",
      "Patient history is a paper file that cannot be found quickly",
      "Follow-up appointments are missed because nobody reminds anyone",
    ],
    systems: [
      "Appointment booking with slot control and reminders",
      "Digital patient records with history, prescriptions and reports",
      "Billing that handles consultation, procedures and insurance",
      "Follow-up and medication reminders over WhatsApp or SMS",
    ],
  },
  {
    name: "Pharma",
    label: "Pharma & Distributors",
    slug: "pharma",
    group: "Medical & Wellness",
    plural: "pharmacies and pharma distributors",
    audience: "chemists, stockists and pharma distributors",
    context:
      "you handle batch numbers and expiry dates on every strip, and an expired item on the shelf is both a loss and a liability",
    pains: [
      "Batch and expiry tracking is impossible on paper at real volume",
      "Near-expiry stock is discovered too late to return to the supplier",
      "Schedule-H and narcotics records must be defensible under inspection",
    ],
    systems: [
      "Batch-wise and expiry-wise stock with early alerts",
      "Supplier return handling for near-expiry goods",
      "Substitute and generic suggestion at the counter",
      "Compliance-ready registers and audit trails",
    ],
  },
  {
    name: "Gym & Fitness",
    label: "Fitness & Gym",
    slug: "gym",
    group: "Medical & Wellness",
    plural: "gyms and fitness studios",
    audience: "gym owners and fitness trainers",
    context:
      "your revenue is a stack of memberships that silently expire, and the member who stopped coming in month two will not renew in month twelve",
    pains: [
      "Expiring memberships are noticed after they lapse, not before",
      "Attendance drop-off is the first sign of churn and nobody tracks it",
      "Trainer schedules and class capacity are managed on a whiteboard",
    ],
    systems: [
      "Membership plans with automatic expiry and renewal reminders",
      "Attendance capture that flags members going cold",
      "Class and personal-training scheduling with capacity limits",
      "Diet and workout plans delivered to a member app",
    ],
  },
  {
    name: "Salon & Beauty",
    label: "Beauty & Salon",
    slug: "salon",
    group: "Medical & Wellness",
    plural: "salons and beauty studios",
    audience: "salon owners and stylists",
    context:
      "customers ask for a specific stylist at a specific time, and your chair utilisation decides whether the month works",
    pains: [
      "Phone bookings collide and walk-ins are turned away at empty chairs",
      "Stylist-wise commission is calculated manually every month",
      "Regulars are not reminded when they are due for a repeat visit",
    ],
    systems: [
      "Online booking by service, stylist and slot",
      "Stylist-wise revenue and commission calculation",
      "Package and membership tracking with balance sessions",
      "Automatic rebooking reminders based on service cycle",
    ],
  },
  {
    name: "Cosmetics",
    label: "Cosmetics",
    slug: "cosmetics",
    group: "Medical & Wellness",
    plural: "cosmetics businesses",
    audience: "cosmetics retailers and brand owners",
    context:
      "you carry many shades and variants with real expiry dates, and customers research online before buying anywhere",
    pains: [
      "Shade-level stock is deep and hard to track accurately",
      "Expiry-dated stock loses value quietly on the shelf",
      "Buyers compare on marketplaces where you compete only on price",
    ],
    systems: [
      "Shade and variant-level inventory with expiry alerts",
      "A branded store where you compete on more than price",
      "Loyalty and repeat-purchase programmes",
      "Content and catalogue that answers what buyers search for",
    ],
  },
  {
    name: "Pet Care",
    label: "Pet Care",
    slug: "pet-care",
    group: "Medical & Wellness",
    plural: "pet care businesses",
    audience: "veterinary clinics, groomers and pet-store owners",
    context:
      "each pet has an owner, a medical history and a vaccination schedule, and the reminder is what brings them back",
    pains: [
      "Vaccination due dates are tracked in a register nobody checks",
      "Pet history is not linked to the owner's contact details",
      "Grooming and boarding bookings clash with clinic appointments",
    ],
    systems: [
      "Pet profiles linked to owners, with full medical history",
      "Vaccination and deworming schedules with automatic reminders",
      "Combined booking for clinic, grooming and boarding",
      "Product sales and prescription billing in one place",
    ],
  },

  // ── Education ───────────────────────────────────────────────────────────
  {
    name: "Coaching Institute",
    label: "Education & Coaching",
    slug: "coaching",
    group: "Education",
    plural: "schools and coaching institutes",
    audience: "school and coaching-institute owners",
    context:
      "you run batches on fixed fee cycles, and both attendance and fee collection determine whether the term closes in profit",
    pains: [
      "Fee follow-up is a manual phone-call exercise every month",
      "Parents have no visibility into attendance or performance",
      "Batch, faculty and room scheduling conflicts are found on the day",
    ],
    systems: [
      "Student records with batch, fee plan and attendance",
      "Automated fee reminders and online payment collection",
      "A parent app showing attendance, marks and notices",
      "Timetable and faculty allocation without clashes",
    ],
  },
  {
    name: "Competitive Exam Institute",
    label: "Competitive Exam",
    slug: "competitive-exam",
    group: "Education",
    plural: "competitive exam institutes",
    audience: "exam-prep institute owners and faculty",
    context:
      "students are judged by rank, so your product is really the test series and the analysis that comes after it",
    pains: [
      "Mock tests are conducted on paper and evaluated for days",
      "Students cannot see where they stand against the cohort",
      "Question banks live in individual teachers' folders",
    ],
    systems: [
      "Online test engine with real exam-pattern timing and negative marking",
      "Instant rank, percentile and topic-wise weakness analysis",
      "A shared, tagged question bank with difficulty levels",
      "Recorded lectures and notes gated by enrolment",
    ],
  },
  {
    name: "Skill Training",
    label: "Skill Training",
    slug: "skill-training",
    group: "Education",
    plural: "skill training centres",
    audience: "vocational and skill-training centre operators",
    context:
      "you run short certified courses where completion and placement are the outcomes anyone actually asks about",
    pains: [
      "Batch completion and certification records are kept manually",
      "Placement outcomes are not tracked, so they cannot be marketed",
      "Government and scheme reporting requires re-compiling data each time",
    ],
    systems: [
      "Batch enrolment, attendance and completion tracking",
      "Digital certificates with verifiable IDs",
      "Placement tracking and employer records",
      "Scheme-ready reporting exports",
    ],
  },
  {
    name: "Online Tutor",
    label: "Online Tutors",
    slug: "online-tutor",
    group: "Education",
    plural: "online tutors and tutoring businesses",
    audience: "independent tutors and small tutoring teams",
    context:
      "you teach one-to-one or in tiny groups, and administration eats the hours you are not paid for",
    pains: [
      "Scheduling across time zones and cancellations is done by message",
      "Payment collection and reminders are a personal chore",
      "Course material is scattered across drives and chat threads",
    ],
    systems: [
      "A booking page students schedule against your real availability",
      "Automatic payment collection per session or package",
      "One place for notes, recordings and assignments",
      "Progress records per student",
    ],
  },
  {
    name: "Bookstore",
    label: "Book Stores",
    slug: "bookstore",
    group: "Education",
    plural: "book stores",
    audience: "bookshop owners and academic-book dealers",
    context:
      "you carry a long tail of titles by ISBN, with demand that spikes hard around admission and exam season",
    pains: [
      "Title-level stock across thousands of ISBNs is unmanageable on paper",
      "Seasonal demand is met by guesswork and ends in dead stock",
      "Customers check online prices while standing in your shop",
    ],
    systems: [
      "ISBN-based catalogue with fast search at the counter",
      "Season-aware reorder suggestions from last year's actuals",
      "An online catalogue with local delivery",
      "School and institution bulk-order handling",
    ],
  },

  // ── Professional Services ───────────────────────────────────────────────
  {
    name: "Service Business",
    label: "Service Providers",
    slug: "service-business",
    group: "Professional Services",
    plural: "service businesses",
    audience: "service business owners and operations managers",
    context:
      "you sell people's time against jobs, and the gap between a job quoted and a job delivered is where the margin goes",
    pains: [
      "Job status is known only by whoever is doing it",
      "Quotes are prepared from scratch each time, inconsistently",
      "Invoicing lags delivery by weeks, so cash arrives late",
    ],
    systems: [
      "Job cards with assignment, status and completion evidence",
      "Quotation templates that convert directly into invoices",
      "Staff-wise utilisation and job-wise profitability",
      "Customer history so repeat work starts with context",
    ],
  },
  {
    name: "Corporate Office",
    label: "Corporate & Offices",
    slug: "corporate",
    group: "Professional Services",
    plural: "corporate offices",
    audience: "operations heads and office administrators",
    context:
      "several departments each run their own spreadsheet, and the version anyone quotes depends on who they asked",
    pains: [
      "Approvals move by email and stall without anyone noticing",
      "Departmental data never reconciles into one company view",
      "Onboarding a new employee means access to eleven separate tools",
    ],
    systems: [
      "Approval workflows with visible status and escalation",
      "A single company dashboard fed by every department",
      "Role-based access managed centrally",
      "Document management with version control",
    ],
  },
  {
    name: "Accounting Firm",
    label: "Finance & Accounting",
    slug: "accounting-firm",
    group: "Professional Services",
    plural: "accounting and finance firms",
    audience: "chartered accountants and finance practice owners",
    context:
      "you serve many clients against statutory deadlines, and the cost of missing one is not yours to absorb",
    pains: [
      "Client document collection is a monthly chase over WhatsApp",
      "Deadline tracking across dozens of clients relies on memory",
      "Work allocation across juniors is invisible until something slips",
    ],
    systems: [
      "A client portal for secure document upload",
      "Compliance calendar with per-client deadline alerts",
      "Task allocation and review workflow across the team",
      "Client-wise billing and realisation tracking",
    ],
  },
  {
    name: "Banking & Finance",
    label: "Banking & Finance",
    slug: "banking",
    group: "Professional Services",
    plural: "banking and finance businesses",
    audience: "NBFC, cooperative and lending operators",
    context:
      "you lend money and collect it back in instalments, and every rupee must be traceable to a document and a date",
    pains: [
      "EMI collection and default tracking run on separate registers",
      "KYC documents are collected but not systematically retrievable",
      "Interest and penalty calculations differ between staff",
    ],
    systems: [
      "Loan origination with KYC capture and verification",
      "EMI schedules, collection tracking and overdue escalation",
      "Interest and penalty computed by rule, not by hand",
      "Audit-ready records against every disbursement",
    ],
  },
  {
    name: "Tax Consultant",
    label: "Tax Consultants",
    slug: "tax-consultant",
    group: "Professional Services",
    plural: "tax consultancies",
    audience: "tax practitioners and GST consultants",
    context:
      "your workload is shaped entirely by filing calendars, and the fortnight before a due date decides the quarter",
    pains: [
      "Client data arrives in a different format from every client",
      "Filing status across the client base is not visible at a glance",
      "Fee collection lags the work by months",
    ],
    systems: [
      "Client-wise filing status board across GST, TDS and ITR",
      "Standardised data collection templates and upload portal",
      "Automated reminders to clients before each due date",
      "Fee billing tied to filings completed",
    ],
  },
  {
    name: "Law Firm",
    label: "Legal Services",
    slug: "law-firm",
    group: "Professional Services",
    plural: "law firms and legal practices",
    audience: "advocates and legal practice managers",
    context:
      "each matter has hearings, documents and deadlines that span years, and the file is the practice's entire memory",
    pains: [
      "Hearing dates are tracked in a diary that only one person reads",
      "Case documents are scattered across drives, email and paper",
      "Billable time is reconstructed from memory at month end",
    ],
    systems: [
      "Matter management with parties, stages and hearing calendar",
      "Document repository organised per matter with search",
      "Time capture against matters as work happens",
      "Client billing with itemised time and expenses",
    ],
  },
  {
    name: "HR Agency",
    label: "HR Agencies",
    slug: "hr-agency",
    group: "Professional Services",
    plural: "HR and recruitment agencies",
    audience: "recruitment consultants and staffing agency owners",
    context:
      "you match a pipeline of candidates to a pipeline of openings, and speed to shortlist is the whole competitive advantage",
    pains: [
      "Résumés pile up in email and are never searchable later",
      "Candidate status across multiple clients is tracked in spreadsheets",
      "Placement invoicing depends on someone remembering the joining date",
    ],
    systems: [
      "Searchable candidate database with parsed résumé data",
      "Openings pipeline with stage tracking per client",
      "Interview scheduling and feedback capture",
      "Placement and invoice tracking tied to joining dates",
    ],
  },
  {
    name: "NGO",
    label: "NGOs",
    slug: "ngo",
    group: "Professional Services",
    plural: "NGOs and non-profits",
    audience: "NGO founders and programme managers",
    context:
      "you answer to donors for how every rupee was spent and what changed because of it",
    pains: [
      "Beneficiary data is collected on paper in the field",
      "Donor reporting requires re-compiling records from scratch",
      "Grant utilisation is tracked separately from actual spending",
    ],
    systems: [
      "Field data collection that works offline on a phone",
      "Beneficiary records with intervention history",
      "Grant-wise budget and utilisation tracking",
      "Donor-ready impact reports generated from real data",
    ],
  },
  {
    name: "IT Company",
    label: "IT & Tech Firms",
    slug: "it-company",
    group: "Professional Services",
    plural: "IT and technology firms",
    audience: "IT services founders and delivery managers",
    context:
      "you bill against project milestones and staff utilisation, and both are known precisely only after the fact",
    pains: [
      "Project profitability is calculated after delivery, too late to act",
      "Resource allocation across projects is negotiated informally",
      "Client change requests are absorbed rather than billed",
    ],
    systems: [
      "Project and sprint tracking with effort against estimate",
      "Resource allocation and utilisation across the bench",
      "Change-request logging tied to billing",
      "Client-facing status portal",
    ],
  },
  {
    name: "Co-working Space",
    label: "Co-working Spaces",
    slug: "coworking",
    group: "Professional Services",
    plural: "co-working spaces",
    audience: "co-working operators and community managers",
    context:
      "you sell the same square feet repeatedly on different terms — hot desk, cabin, day pass — and occupancy is the only number that matters",
    pains: [
      "Desk and cabin availability is tracked on a shared spreadsheet",
      "Meeting room double-bookings are found when both parties arrive",
      "Monthly invoicing across mixed plan types is done manually",
    ],
    systems: [
      "Live seat and cabin inventory with plan-wise allocation",
      "Meeting room booking with credits and conflict prevention",
      "Automated recurring invoicing across plan types",
      "Member app for access, bookings and community",
    ],
  },

  // ── Food & Hospitality ──────────────────────────────────────────────────
  {
    name: "Restaurant",
    label: "Food & Restaurant",
    slug: "restaurant",
    group: "Food & Hospitality",
    plural: "restaurants and cafes",
    audience: "restaurant owners and cloud-kitchen operators",
    context:
      "orders arrive from the dine-in floor, the phone and three aggregator tablets at once, and the kitchen has to see all of them as one queue",
    pains: [
      "Aggregator commissions of 20–30% erase the margin on every delivery order",
      "Separate tablets per platform mean orders are re-keyed by hand",
      "Food cost per dish is estimated rather than measured",
    ],
    systems: [
      "Direct ordering that bypasses aggregator commission",
      "One kitchen display fed by dine-in, takeaway and delivery",
      "Recipe-linked inventory so consumption is measured, not guessed",
      "Table, KOT and billing flow that survives a full house",
    ],
  },
  {
    name: "Hotel",
    label: "Hotels & Hospitality",
    slug: "hotel",
    group: "Food & Hospitality",
    plural: "hotels and guest houses",
    audience: "hotel owners and front-office managers",
    context:
      "rooms are a perishable inventory — an unsold night is revenue that can never be recovered — and OTAs take a cut of every one they fill",
    pains: [
      "OTA commissions take 15–25% of the room rate",
      "Rates and availability are updated on each channel separately",
      "Guest history is not retained, so repeat guests get no recognition",
    ],
    systems: [
      "Direct booking engine on your own website",
      "Channel manager keeping rates and inventory in sync",
      "Front-desk check-in, folio and billing",
      "Guest profiles with stay history and preferences",
    ],
  },
  {
    name: "Travel & Tourism",
    label: "Travel & Tourism",
    slug: "travel",
    group: "Food & Hospitality",
    plural: "travel agencies and tour operators",
    audience: "travel agents and tour operators",
    context:
      "each booking is a bundle of flights, hotels, transfers and permits from different suppliers, priced as one number to the customer",
    pains: [
      "Itinerary documents are rebuilt in Word for every enquiry",
      "Supplier costs and customer pricing are reconciled after the trip",
      "Enquiries go cold because follow-up is inconsistent",
    ],
    systems: [
      "Itinerary builder producing branded documents in minutes",
      "Package costing with supplier rates and real margin visible",
      "Enquiry pipeline with structured follow-up",
      "Payment collection in instalments against a trip",
    ],
  },
  {
    name: "Catering",
    label: "Catering Services",
    slug: "catering",
    group: "Food & Hospitality",
    plural: "catering businesses",
    audience: "caterers and event food operators",
    context:
      "you quote per plate for an expected headcount, buy raw material against it, and absorb the difference when the count changes",
    pains: [
      "Per-plate costing is estimated, so quoted margin is a guess",
      "Multiple events on the same date strain staff and equipment invisibly",
      "Advance and balance payments are tracked on paper",
    ],
    systems: [
      "Menu costing that computes per-plate cost from real rates",
      "Event calendar with staff and equipment allocation",
      "Quotation to advance to balance payment tracking",
      "Raw material purchase planning per confirmed event",
    ],
  },

  // ── Home & Local ────────────────────────────────────────────────────────
  {
    name: "Home Services",
    label: "Home Services",
    slug: "home-service",
    group: "Home & Local",
    plural: "home service businesses",
    audience: "home service operators and field team managers",
    context:
      "your technicians are out at customer addresses all day, and you find out how the job went when they get back",
    pains: [
      "Job assignment happens over phone calls with no record",
      "Technicians collect cash that is reconciled days later",
      "Customers have no way to know when someone will actually arrive",
    ],
    systems: [
      "Job scheduling with technician assignment by area and skill",
      "A technician mobile app with job details and completion photos",
      "On-site payment collection with instant digital receipts",
      "Customer notifications with arrival windows",
    ],
  },
  {
    name: "Furniture & Interior",
    label: "Furniture & Interior",
    slug: "furniture",
    group: "Home & Local",
    plural: "furniture and interior businesses",
    audience: "furniture retailers and interior contractors",
    context:
      "projects run for weeks across measurement, design, production and installation, with payments staged against each",
    pains: [
      "Project stage and pending payment are tracked on separate sheets",
      "Customisation quotes are prepared manually and inconsistently",
      "Site measurements and design revisions get lost between people",
    ],
    systems: [
      "Project pipeline from measurement through installation",
      "Quotation builder with material and labour costing",
      "Stage-wise payment milestones with reminders",
      "Design files and site photos attached per project",
    ],
  },
  {
    name: "Home Decor",
    label: "Home Decor",
    slug: "home-decor",
    group: "Home & Local",
    plural: "home decor businesses",
    audience: "home decor retailers and studio owners",
    context:
      "customers buy visually — they need to see the piece in a room before they believe it belongs in theirs",
    pains: [
      "A physical showroom limits you to people who walk past it",
      "Fragile, varied stock is hard to track by variant",
      "Discovery happens on Instagram but selling there is manual",
    ],
    systems: [
      "A visual online catalogue built for browsing, not searching",
      "Variant-level stock with breakage and returns handling",
      "Instagram and WhatsApp catalogue sync",
      "Local delivery and installation scheduling",
    ],
  },
  {
    name: "Cleaning Service",
    label: "Cleaning Services",
    slug: "cleaning-service",
    group: "Home & Local",
    plural: "cleaning service businesses",
    audience: "cleaning service operators",
    context:
      "you run recurring contracts and one-off deep cleans with rotating staff across many addresses",
    pains: [
      "Recurring schedules are maintained manually and get missed",
      "Staff attendance at a customer site is taken on trust",
      "Contract renewals lapse without anyone noticing",
    ],
    systems: [
      "Recurring schedule generation with staff rostering",
      "Geo-tagged check-in and check-out at customer sites",
      "Contract and renewal tracking with alerts",
      "Customer feedback captured after each visit",
    ],
  },
  {
    name: "Repair Service",
    label: "Repair Services",
    slug: "repair-service",
    group: "Home & Local",
    plural: "repair and service centres",
    audience: "repair centre owners and service managers",
    context:
      "customers hand over a device and want to know when it will be ready, and the honest answer is currently a shrug",
    pains: [
      "Job status requires physically finding the item to check",
      "Warranty terms per item are recorded on a paper slip",
      "Spare part availability is discovered mid-repair",
    ],
    systems: [
      "Job cards with intake condition, photos and estimate",
      "Status tracking customers can check themselves",
      "Warranty records tied to job and serial number",
      "Spare parts inventory with reorder alerts",
    ],
  },
  {
    name: "ID & Document Services",
    label: "ID Services",
    slug: "id-service",
    group: "Home & Local",
    plural: "ID and document service centres",
    audience: "CSC operators and document service centre owners",
    context:
      "people come to you to get a government form filled and a document produced, and each service has its own portal, fee and turnaround",
    pains: [
      "Application status across many portals is tracked on paper",
      "Customers keep returning to ask whether their document has arrived",
      "Service-wise fee collection and commission is reconciled manually",
    ],
    systems: [
      "Application register with service type, status and turnaround",
      "SMS or WhatsApp status updates to the applicant",
      "Document scanning and retrieval per applicant",
      "Service-wise collection and commission reporting",
    ],
  },
  {
    name: "Event Management",
    label: "Event Management",
    slug: "event-management",
    group: "Home & Local",
    plural: "event management companies",
    audience: "event planners and wedding managers",
    context:
      "one event pulls together venue, decor, catering, sound and staff on a date that cannot move",
    pains: [
      "Vendor coordination happens across dozens of WhatsApp groups",
      "Budget versus actual is only known after the event",
      "Double-booking of staff or equipment surfaces on the day",
    ],
    systems: [
      "Event checklist with vendor, task and deadline per element",
      "Budget tracking against actual vendor costs",
      "Staff and equipment allocation across concurrent events",
      "Client-facing plan and payment schedule",
    ],
  },
  {
    name: "Plant Nursery",
    label: "Nursery & Plants",
    slug: "plant-nursery",
    group: "Home & Local",
    plural: "nurseries and plant businesses",
    audience: "nursery owners and landscaping businesses",
    context:
      "your stock is alive, seasonal and sold by size and variety, and demand swings hard with weather and festivals",
    pains: [
      "Living stock changes in size and value and cannot be counted like goods",
      "Seasonal demand is met by instinct rather than last year's data",
      "Delivery of large plants needs scheduling you do not have a tool for",
    ],
    systems: [
      "Variety and size-wise stock with mortality tracking",
      "Season-aware planning from previous years' sales",
      "An online catalogue with local delivery scheduling",
      "Maintenance contracts for corporate and landscaping clients",
    ],
  },

  // ── Industrial ──────────────────────────────────────────────────────────
  {
    name: "Manufacturing",
    label: "Manufacturing",
    slug: "manufacturing",
    group: "Industrial",
    plural: "manufacturing units",
    audience: "factory owners and production managers",
    context:
      "raw material becomes finished goods through stages, and the cost of a unit is only truly known once all of them are accounted for",
    pains: [
      "Work-in-progress stock is invisible between stages",
      "Actual production cost per unit is calculated long after the fact",
      "Machine downtime and rejection rates are recorded on shop-floor paper",
    ],
    systems: [
      "Bill of materials and stage-wise production tracking",
      "Work-in-progress and finished goods stock",
      "Job costing with material, labour and overhead",
      "Quality checks and rejection recording per batch",
    ],
  },
  {
    name: "Logistics & Delivery",
    label: "Logistics & Delivery",
    slug: "logistics",
    group: "Industrial",
    plural: "logistics and delivery companies",
    audience: "logistics operators and fleet managers",
    context:
      "consignments move between hands and locations, and the person who wants to know where it is calls you rather than looks it up",
    pains: [
      "Consignment status requires calling the driver to find out",
      "Proof of delivery is a signed paper slip that gets lost",
      "Route and vehicle utilisation is planned from experience alone",
    ],
    systems: [
      "Consignment booking with tracking numbers customers can check",
      "Driver app with digital proof of delivery and photos",
      "Route and vehicle assignment with load planning",
      "Freight billing and party-wise outstanding",
    ],
  },
  {
    name: "Transport",
    label: "Transport Services",
    slug: "transport",
    group: "Industrial",
    plural: "transport businesses",
    audience: "transport operators and fleet owners",
    context:
      "every vehicle is a cost centre with fuel, driver, maintenance and permits against the trips it runs",
    pains: [
      "Per-vehicle and per-trip profitability is not calculated",
      "Permit, insurance and fitness expiries are missed",
      "Fuel and maintenance spend is recorded in a diary",
    ],
    systems: [
      "Trip records with revenue, fuel, toll and driver cost",
      "Vehicle-wise profitability reporting",
      "Document expiry alerts for permits, insurance and fitness",
      "Driver records with trip history and advances",
    ],
  },
  {
    name: "Cold Storage",
    label: "Cold Storage",
    slug: "cold-storage",
    group: "Industrial",
    plural: "cold storage facilities",
    audience: "cold storage operators",
    context:
      "you rent space by weight and duration to many depositors, and their goods must be findable and correctly billed months later",
    pains: [
      "Chamber-wise and lot-wise occupancy is tracked on a board",
      "Rent calculation across variable durations is done by hand",
      "Depositors ask for lot status and it takes a physical check",
    ],
    systems: [
      "Lot and chamber-wise inward, storage and outward records",
      "Automatic rent computation by weight, rate and duration",
      "Depositor-wise ledger with outstanding",
      "Temperature log records against each chamber",
    ],
  },
  {
    name: "Agriculture",
    label: "Agriculture",
    slug: "agriculture",
    group: "Industrial",
    plural: "agriculture businesses",
    audience: "agri-input dealers, FPOs and agri-traders",
    context:
      "you deal with seasonal crops, government rates and farmers who buy on credit and pay after harvest",
    pains: [
      "Farmer credit extends across a full season with no formal record",
      "Input stock is seasonal and expires or degrades",
      "Procurement rates and weights are recorded on slips",
    ],
    systems: [
      "Farmer accounts with season-long credit tracking",
      "Input stock with batch and expiry handling",
      "Procurement entry with weight, rate and deduction",
      "Season-wise purchase and sale reporting",
    ],
  },
  {
    name: "Import & Export",
    label: "Import & Export",
    slug: "import-export",
    group: "Industrial",
    plural: "import and export businesses",
    audience: "exporters, importers and trading houses",
    context:
      "every shipment carries a stack of documents that must agree with each other, in currencies that move while goods are in transit",
    pains: [
      "Shipment documents are prepared separately and disagree",
      "Landed cost per consignment is calculated after clearance",
      "Currency movement between order and payment is not tracked",
    ],
    systems: [
      "Shipment records with document checklist per consignment",
      "Landed cost computation including duty, freight and clearing",
      "Multi-currency invoicing and realisation tracking",
      "Buyer and supplier ledgers across shipments",
    ],
  },
  {
    name: "Security Agency",
    label: "Security Services",
    slug: "security-agency",
    group: "Industrial",
    plural: "security agencies",
    audience: "security agency owners and deployment managers",
    context:
      "you deploy guards on shifts at client sites around the clock, and billing depends on proving who was actually there",
    pains: [
      "Guard attendance at client sites is self-reported",
      "Shift replacement for absentees is arranged over phone calls",
      "Client billing is disputed because deployment records are weak",
    ],
    systems: [
      "Site-wise shift rosters with guard allocation",
      "Geo-tagged attendance at the deployment site",
      "Replacement management for absentees",
      "Client billing generated from verified deployment data",
    ],
  },

  // ── Creative & Media ────────────────────────────────────────────────────
  {
    name: "Photography",
    label: "Photography",
    slug: "photography",
    group: "Creative & Media",
    plural: "photography studios",
    audience: "photographers and studio owners",
    context:
      "you shoot on dates that cannot be repeated and deliver hundreds of files that clients then want to select from",
    pains: [
      "Date availability and advance bookings are tracked in a diary",
      "Photo selection happens over WhatsApp with files losing quality",
      "Delivery of final albums drags on for months",
    ],
    systems: [
      "Booking calendar with date blocking and advance tracking",
      "Client gallery for viewing, selecting and approving shots",
      "Package and add-on pricing with payment stages",
      "Delivery tracking through to final album",
    ],
  },
  {
    name: "Media Production",
    label: "Media & Production",
    slug: "media-production",
    group: "Creative & Media",
    plural: "media and production houses",
    audience: "production house owners and producers",
    context:
      "projects run through pre-production, shoot and post with crew, equipment and budget committed against each phase",
    pains: [
      "Project budget versus actual is reconciled after wrap",
      "Crew and equipment scheduling clashes across projects",
      "Client feedback on cuts arrives across email, calls and messages",
    ],
    systems: [
      "Project phases with budget and actual tracking",
      "Crew and equipment allocation across concurrent projects",
      "Review portal with timestamped client feedback on cuts",
      "Invoice milestones tied to delivery phases",
    ],
  },
  {
    name: "Music Studio",
    label: "Music & Audio",
    slug: "music-studio",
    group: "Creative & Media",
    plural: "music and audio studios",
    audience: "studio owners and audio producers",
    context:
      "you sell studio hours and engineering time, and an unbooked hour is gone",
    pains: [
      "Studio time is booked over phone with frequent no-shows",
      "Project files and versions are scattered across drives",
      "Royalty and credit splits are agreed verbally",
    ],
    systems: [
      "Online studio booking with deposits against slots",
      "Project file and version management per session",
      "Client review and approval on mixes",
      "Contract and split records per release",
    ],
  },
  {
    name: "Personal Brand",
    label: "Personal Brands",
    slug: "personal-brand",
    group: "Creative & Media",
    plural: "personal brands",
    audience: "consultants, coaches and independent professionals",
    context:
      "you are the product, and every enquiry, booking and payment currently routes through you personally",
    pains: [
      "Discovery calls are scheduled through a chain of messages",
      "Audience lives on platforms that can change the rules overnight",
      "Payments and invoices are handled personally, one at a time",
    ],
    systems: [
      "A booking page tied to your real calendar",
      "An owned website and email list, independent of any platform",
      "Digital product or course delivery with access control",
      "Automated invoicing and payment collection",
    ],
  },
  {
    name: "Digital Creator",
    label: "Digital Creators",
    slug: "digital-creator",
    group: "Creative & Media",
    plural: "digital creators",
    audience: "creators, YouTubers and content businesses",
    context:
      "your income comes from brands, platforms and your own audience at once, on schedules none of them coordinate",
    pains: [
      "Brand deal deliverables and payment terms live in email threads",
      "Audience data belongs to the platform, not to you",
      "Content calendar and actual publishing drift apart",
    ],
    systems: [
      "Brand deal pipeline with deliverables and payment tracking",
      "An owned website, email list and member area",
      "Content calendar with publishing status",
      "Merchandise or digital product storefront",
    ],
  },

  // ── Real Estate ─────────────────────────────────────────────────────────
  {
    name: "Real Estate",
    label: "Real Estate",
    slug: "real-estate",
    group: "Real Estate",
    plural: "real estate businesses",
    audience: "builders, brokers and property developers",
    context:
      "a single sale takes months of site visits and negotiation, and inventory is a finite list of units that must never be sold twice",
    pains: [
      "Enquiries from portals, hoardings and referrals are never consolidated",
      "Unit availability is confirmed by calling the sales head",
      "Site visit follow-up is inconsistent, so warm leads go cold",
    ],
    systems: [
      "Lead capture from every portal and channel into one pipeline",
      "Live unit inventory with hold, booking and sold states",
      "Site visit scheduling with follow-up reminders",
      "Booking, payment milestone and demand-letter tracking",
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// LOOKUPS
// ═══════════════════════════════════════════════════════════════════════════

const industryBySlug = new Map(industries.map((i) => [i.slug, i]));
const serviceBySlug = new Map(industryServices.map((s) => [s.slug, s]));

/** `restaurant` + `billing-software-development` → `restaurant-billing-software-development`. */
export function generateIndustrySlug(industrySlug: string, serviceSlug: string): string {
  return `${industrySlug}-${serviceSlug}`;
}

/* Resolving a flat slug back into its two parts is ambiguous by construction —
   both halves contain hyphens. Rather than guessing at split points, the pair
   list is built once and indexed by its own generated slug, so a lookup is a
   map hit and a slug can never resolve to the wrong pair. */
export interface IndustryPageRef {
  slug: string;
  industrySlug: string;
  serviceSlug: string;
}

const pageIndex: Map<string, IndustryPageRef> = (() => {
  const map = new Map<string, IndustryPageRef>();
  for (const industry of industries) {
    for (const service of industryServices) {
      const slug = generateIndustrySlug(industry.slug, service.slug);
      map.set(slug, { slug, industrySlug: industry.slug, serviceSlug: service.slug });
    }
  }
  return map;
})();

export function getIndustryPagesList(): IndustryPageRef[] {
  return [...pageIndex.values()];
}

export function isIndustryPageSlug(slug: string): boolean {
  return pageIndex.has(slug);
}

export const industryStats = {
  industryCount: industries.length,
  serviceCount: industryServices.length,
  pageCount: pageIndex.size,
  groupCount: new Set(industries.map((i) => i.group)).size,
};

/* GEO: the cities each industry page points at. Every city page exists on the
   other axis, so these are real internal links to real pages — not a keyword
   list. Capped at 24 because a link block longer than that stops being
   navigation and starts being a footer dump. */
const geoCities: CityInfo[] = cities.filter((c) => c.type === "major").slice(0, 24);

// ═══════════════════════════════════════════════════════════════════════════
// PAGE BUILDER
// ═══════════════════════════════════════════════════════════════════════════

/** Which of the 8 city-page services this industry service maps onto, for
    cross-axis linking. Falls back to software development. */
function cityServiceFor(service: IndustryServiceInfo): string {
  const s = service.slug;
  if (s.includes("website") || s.includes("web-portal")) return "website-development";
  if (s.includes("app-development")) return "mobile-app-development";
  if (s.includes("ecommerce")) return "ecommerce-development";
  if (s.includes("cloud") || s.includes("api-payment")) return "cloud-devops";
  if (s.includes("dashboard")) return "ui-ux-design";
  return "software-development";
}

export function getIndustryContentBySlug(slug: string): IndustryPageData | null {
  const ref = pageIndex.get(slug);
  if (!ref) return null;

  const industry = industryBySlug.get(ref.industrySlug)!;
  const service = serviceBySlug.get(ref.serviceSlug)!;

  /* "a POS system" → "POS system". Used anywhere the service is referred to
     mid-sentence. Lowercasing `service.name` there instead would produce
     "the pos software development", which is both ungrammatical and destroys
     the acronyms the pages are meant to rank for. */
  const bare = service.article.replace(/^(a|an|the) /i, "");

  const title = `${industry.name} ${service.name}`;
  const h1 = title;
  const metaTitle = `${title} Company in India | Sabka Saathi`;
  const metaDescription =
    `${service.name} built specifically for ${industry.plural}. ${service.summary} ` +
    `Delivered remotely across India in ${service.timeline}. Get a free quote from Sabka Saathi.`;

  const tagline = `${service.summary} Built around how ${industry.plural} actually operate.`;

  /* AEO. Written as a self-contained answer so an AI overview can quote the
     paragraph without needing the rest of the page for context: it names who
     it is for, what is built, on what stack, in what time, at what price. */
  const directAnswer =
    `Sabka Saathi builds ${service.article} for ${industry.plural} in India. ` +
    `${service.summary} For ${industry.plural} specifically, that means ${lowerFirst(industry.systems[0])}, ` +
    `${lowerFirst(industry.systems[1])}, and ${lowerFirst(industry.systems[2])}. ` +
    `Typical delivery is ${service.timeline} at ${service.priceBand}, built on ${service.techStack.slice(0, 3).join(", ")}, ` +
    `and delivered remotely to ${industry.audience} anywhere in India.`;

  const intro =
    `${service.name} for ${industry.plural} is not the same project as it is for any other sector. ` +
    `In ${industry.label.toLowerCase()}, ${industry.context}. ` +
    `That single fact changes what the software has to get right — and it is the thing generic, ` +
    `off-the-shelf products are least willing to accommodate. We build ${service.article} around it instead.`;

  const whyThisIndustry =
    `Most ${industry.plural} do not fail to adopt software because they dislike technology. ` +
    `They fail because the product on offer was designed for a different business and asks them to ` +
    `change their process to suit it. We start from your process. ${capitalise(industry.audience)} ` +
    `tell us how the work happens today — including the parts that only exist in someone's head — and ` +
    `the ${bare} is shaped to that. ${service.outcome}`;

  const howItWorks =
    `We start with a discovery call to map how your ${industry.label.toLowerCase()} operation runs today. ` +
    `You then see a clickable prototype before development is committed, so the shape of the thing is ` +
    `agreed while changing it is still cheap. Development runs in weekly builds you can open and use — ` +
    `not a black box that reappears at the end. Delivery takes ${service.timeline} for a typical ` +
    `${industry.name.toLowerCase()} project, and we hand over source code, documentation and training.`;

  /* Pain → fix pairs. The pain is the industry's own; the fix is written from
     the service's modules, so the same industry reads differently under a POS
     brief than under a chatbot brief. */
  const pains = industry.pains.map((pain, i) => ({
    pain,
    fix: `${service.modules[i % service.modules.length]} — built into the ${bare} rather than bolted on afterwards.`,
  }));

  const keyTakeaways = [
    `Built specifically for ${industry.plural}, not adapted from a generic template`,
    `${service.modules[0]}`,
    `${service.modules[1]}`,
    `Delivered in ${service.timeline}, remotely, anywhere in India`,
    `Source code, documentation and team training handed over at the end`,
  ];

  const specs = [
    { label: "Industry", value: industry.label },
    { label: "Service", value: service.name },
    { label: "Primary stack", value: service.techStack.slice(0, 3).join(", ") },
    { label: "Typical timeline", value: service.timeline },
    { label: "Indicative price", value: service.priceBand },
    { label: "Delivery model", value: "Remote & hybrid, pan-India" },
  ];

  /* AEO: six questions phrased the way they are actually typed or spoken,
     each answered in a single self-contained paragraph. These become FAQPage
     schema verbatim, so they must read correctly with no surrounding page. */
  const faqs = [
    {
      q: `How much does ${title} cost in India?`,
      a:
        `${title} from Sabka Saathi typically costs ${service.priceBand}, depending on scope. ` +
        `A focused build covering ${lowerFirst(service.modules[0])} sits at the lower end; ` +
        `a full system including ${lowerFirst(service.modules[3] ?? service.modules[1])} sits at the upper end. ` +
        `We quote a fixed price against an agreed scope after a free discovery call, so there is no hourly billing surprise.`,
    },
    {
      q: `How long does it take to build ${service.article} for ${industry.plural}?`,
      a:
        `A typical ${industry.name.toLowerCase()} ${bare} project takes ${service.timeline} from ` +
        `discovery to launch. You see a working prototype in the first two weeks and weekly builds after that, ` +
        `so progress is visible throughout rather than only at the end.`,
    },
    {
      q: `Why do ${industry.plural} need ${service.article} specifically?`,
      a:
        `Because ${industry.context}. The direct consequence is one most ${industry.plural} will recognise: ` +
        `${lowerFirst(industry.pains[0])}. A generic product does not solve that — it needs ` +
        `${lowerFirst(industry.systems[0])}. ${service.outcome}`,
    },
    {
      q: `What technology is used to build it?`,
      a:
        `We build on ${service.techStack.join(", ")}. These are mainstream, well-documented technologies chosen ` +
        `deliberately so that any competent developer can maintain the system later — you are not locked into us. ` +
        `Source code and documentation are handed over at project close.`,
    },
    {
      q: `Do you work with ${industry.plural} outside major cities?`,
      a:
        `Yes. Delivery is remote — discovery calls, design reviews and weekly builds all happen online — so we work ` +
        `with ${industry.plural} across ${industryStats.industryCount > 0 ? `${cities.length}+ cities in ${new Set(cities.map((c) => c.state)).size} states` : "India"}, ` +
        `including district towns and smaller centres, on the same terms as metro clients.`,
    },
    {
      q: `Can it integrate with the software we already use?`,
      a:
        `Usually yes. We integrate with GST billing tools, Tally exports, payment gateways, WhatsApp Business API, ` +
        `logistics partners and most systems that expose an API or a file export. Where a system does not, we ` +
        `plan a migration path rather than forcing you to run both in parallel indefinitely.`,
    },
  ];

  // GEO: the same service, in the cities that have their own pages.
  const citySvc = cityServiceFor(service);
  const cityLinks = geoCities.map((city) => ({
    name: city.name,
    state: city.state,
    url: `/${generateSlug(citySvc, city.slug)}`,
  }));

  const siblingServices = industryServices
    .filter((s) => s.slug !== service.slug)
    .map((s) => ({
      name: `${industry.name} ${s.name}`,
      url: `/${generateIndustrySlug(industry.slug, s.slug)}`,
      group: s.group,
    }));

  const siblingIndustries = industries
    .filter((i) => i.slug !== industry.slug && i.group === industry.group)
    .map((i) => ({
      name: `${i.name} ${service.name}`,
      url: `/${generateIndustrySlug(i.slug, service.slug)}`,
    }));

  // ── Structured data ───────────────────────────────────────────────────
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Sabka Saathi",
    url: `${SITE_URL}/`,
    telephone: contactInfo.phone,
    taxID: businessIdentity.gstin,
    founder: { "@type": "Person", name: businessIdentity.founderName },
    ...(isRealValue(contactInfo.email) ? { email: contactInfo.email } : {}),
    address: {
      "@type": "PostalAddress",
      ...(isRealValue(contactInfo.address) ? { streetAddress: contactInfo.address } : {}),
      addressRegion: businessIdentity.addressRegion,
      addressCountry: "IN",
    },
  };

  /* GEO. areaServed is India plus the cities we genuinely publish pages for.
     No fabricated per-city LocalBusiness — this is a service-area business
     with one real HQ, and claiming branch offices it does not have is the
     fastest route to a manual action. */
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/${slug}#service`,
    name: title,
    description: metaDescription,
    provider: { "@id": `${SITE_URL}/#organization` },
    serviceType: service.name,
    audience: { "@type": "BusinessAudience", name: industry.label },
    areaServed: [
      { "@type": "Country", name: "India" },
      ...geoCities.map((c) => ({
        "@type": "City",
        name: c.name,
        containedInPlace: { "@type": "AdministrativeArea", name: c.state },
      })),
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${title} deliverables`,
      itemListElement: service.modules.map((m, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: { "@type": "Service", name: m },
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Industries", item: `${SITE_URL}/industries` },
      { "@type": "ListItem", position: 3, name: industry.label, item: `${SITE_URL}/industries/${industry.slug}` },
      { "@type": "ListItem", position: 4, name: title, item: `${SITE_URL}/${slug}` },
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

  /* AEO: an explicit summary object. Answer engines weight a page that states
     its own conclusion in machine-readable form over one they must infer it
     from. */
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How ${title} is delivered`,
    description: howItWorks,
    totalTime: "P30D",
    step: [
      { "@type": "HowToStep", position: 1, name: "Discovery", text: `We map how your ${industry.label.toLowerCase()} operation runs today.` },
      { "@type": "HowToStep", position: 2, name: "Prototype", text: "You approve a clickable prototype before development is committed." },
      { "@type": "HowToStep", position: 3, name: "Build", text: "Development runs in weekly builds you can open and test yourself." },
      { "@type": "HowToStep", position: 4, name: "Launch", text: "We deploy, train your team, and hand over source code and documentation." },
    ],
  };

  return {
    slug,
    industrySlug: industry.slug,
    serviceSlug: service.slug,
    industryName: industry.name,
    industryLabel: industry.label,
    industryGroup: industry.group,
    serviceName: service.name,
    serviceGroup: service.group,
    metaTitle,
    metaDescription,
    h1,
    tagline,
    directAnswer,
    intro,
    whyThisIndustry,
    howItWorks,
    modules: service.modules,
    pains,
    systems: industry.systems,
    techStack: service.techStack,
    timeline: service.timeline,
    priceBand: service.priceBand,
    keyTakeaways,
    specs,
    faqs,
    cityLinks,
    siblingServices,
    siblingIndustries,
    stats,
    contactInfo,
    schemas: [organizationSchema, serviceSchema, breadcrumbSchema, faqSchema, howToSchema],
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// HUB HELPERS (for /industries and the sitemap)
// ═══════════════════════════════════════════════════════════════════════════

export function getIndustriesGroupedByGroup(): { group: string; industries: IndustryInfo[] }[] {
  const order: string[] = [];
  const byGroup = new Map<string, IndustryInfo[]>();
  for (const industry of industries) {
    if (!byGroup.has(industry.group)) {
      byGroup.set(industry.group, []);
      order.push(industry.group);
    }
    byGroup.get(industry.group)!.push(industry);
  }
  return order.map((group) => ({ group, industries: byGroup.get(group)! }));
}

export function getServicesGroupedByGroup(): { group: string; services: IndustryServiceInfo[] }[] {
  const order: string[] = [];
  const byGroup = new Map<string, IndustryServiceInfo[]>();
  for (const service of industryServices) {
    if (!byGroup.has(service.group)) {
      byGroup.set(service.group, []);
      order.push(service.group);
    }
    byGroup.get(service.group)!.push(service);
  }
  return order.map((group) => ({ group, services: byGroup.get(group)! }));
}

/** All 25 service links for one industry — powers /industries/[slug]. */
export function industryServiceLinks(industry: IndustryInfo) {
  return industryServices.map((service) => ({
    slug: service.slug,
    name: service.name,
    group: service.group,
    title: `${industry.name} ${service.name}`,
    url: `/${generateIndustrySlug(industry.slug, service.slug)}`,
  }));
}

export function getIndustryBySlug(slug: string): IndustryInfo | undefined {
  return industryBySlug.get(slug);
}

// ═══════════════════════════════════════════════════════════════════════════
// small text helpers
// ═══════════════════════════════════════════════════════════════════════════

function lowerFirst(s: string): string {
  // Leaves acronyms alone — "GST invoices" must not become "gST invoices".
  if (s.length > 1 && s[1] === s[1].toUpperCase() && s[1] !== s[1].toLowerCase()) return s;
  return s.charAt(0).toLowerCase() + s.slice(1);
}

function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
