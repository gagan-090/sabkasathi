import type { ThemeName } from "./theme";

/*
  Five phone screens for each of the eight industry categories.

  These are concept screens, not case studies. Every masthead names a trade
  ("Dental Clinic", "Kirana & General Store") rather than a business, and the
  status bar carries a CONCEPT badge, because inventing plausible client names
  and putting published-looking numbers under them would be a portfolio of
  companies that do not exist. The three screens that DO name a business are the
  real clients — they carry a LIVE badge and a link to the site instead, and
  their apps live in components/mockups.

  Prices, slots and counts below are illustrative of the trade, chosen to make
  the interaction legible: the point of the screen is the shape of the product,
  not the price of a kilo of dal.

  Pairing: each entry picks an archetype (the interaction model) and a theme
  (the look). No two screens in a category share both, so a row never reads as
  one template rendered five times.
*/

export type Archetype =
  | "booking"
  | "storefront"
  | "menu"
  | "portal"
  | "catalog"
  | "studio";

interface Stat {
  to: number;
  suffix?: string;
  decimals?: number;
  label: string;
}

interface Base {
  id: string;
  category: string;
  /** The trade, shown in the masthead. Never an invented company. */
  industry: string;
  /** Small caps line above the headline. */
  kicker: string;
  headline: string;
  /** Second headline line, set in the accent. */
  headlineAccent: string;
  blurb: string;
  accent: string;
  theme: ThemeName;
  stats: [Stat, Stat, Stat];
  /** Label on the bottom bar. */
  cta: string;
}

export type IndustryScreen = Base &
  (
    | {
        archetype: "booking";
        /** Picking one rewrites the slot list and the CTA. */
        services: { n: string; meta: string; price: string }[];
        days: string[];
        slots: string[];
      }
    | {
        archetype: "storefront";
        tabs: string[];
        items: { n: string; meta: string; price: number; unit: string; tab: string }[];
      }
    | {
        archetype: "menu";
        sections: string[];
        items: { n: string; meta: string; price: number; veg: boolean; section: string }[];
      }
    | {
        archetype: "portal";
        filters: string[];
        rows: { code: string; title: string; meta: string; status: string; filter: string }[];
      }
    | {
        archetype: "catalog";
        filters: string[];
        listings: { title: string; meta: string; price: string; tag: string; filter: string }[];
      }
    | {
        archetype: "studio";
        tabs: string[];
        works: { title: string; meta: string; tab: string }[];
      }
  );

/** A real Sabka Saathi client, rendered by its own app in components/mockups. */
export interface LiveScreen {
  id: string;
  category: string;
  kind: "live";
  /** Hostname key into the mockups registry. */
  host: "phulwari.co.in" | "smartedgeeducationconsultancy.com" | "gravitypointtutorial.com";
  title: string;
  trade: string;
  url: string;
  accent: string;
}

export type RowEntry = IndustryScreen | LiveScreen;

export const isLive = (e: RowEntry): e is LiveScreen =>
  (e as LiveScreen).kind === "live";

/* ── Business & Retail ────────────────────────────────────────────────────── */

const businessRetail: RowEntry[] = [
  {
    id: "kirana",
    category: "Business & Retail",
    industry: "Kirana & General Store",
    kicker: "Neighbourhood grocery",
    headline: "Your shop,",
    headlineAccent: "open after closing.",
    blurb: "Regulars reorder their usual basket from home and collect on the way back.",
    accent: "#f97316",
    theme: "bright",
    archetype: "storefront",
    tabs: ["Daily", "Grains & Dal", "Home care"],
    items: [
      { n: "Toned milk", meta: "500 ml pouch", price: 28, unit: "pouch", tab: "Daily" },
      { n: "Farm eggs", meta: "Tray of 12", price: 84, unit: "tray", tab: "Daily" },
      { n: "Curd", meta: "400 g cup", price: 45, unit: "cup", tab: "Daily" },
      { n: "Sona masoori rice", meta: "Loose, cleaned", price: 62, unit: "kg", tab: "Grains & Dal" },
      { n: "Toor dal", meta: "Unpolished", price: 148, unit: "kg", tab: "Grains & Dal" },
      { n: "Chakki atta", meta: "10 kg bag", price: 430, unit: "bag", tab: "Grains & Dal" },
      { n: "Detergent powder", meta: "1 kg pack", price: 110, unit: "pack", tab: "Home care" },
      { n: "Dishwash bar", meta: "Pack of 3", price: 60, unit: "pack", tab: "Home care" },
      { n: "Floor cleaner", meta: "1 litre", price: 85, unit: "bottle", tab: "Home care" },
    ],
    stats: [
      { to: 850, suffix: "+", label: "Items listed" },
      { to: 45, suffix: " min", label: "Delivery" },
      { to: 68, suffix: "%", label: "Reorders" },
    ],
    cta: "Send basket",
  },
  {
    id: "boutique",
    category: "Business & Retail",
    industry: "Fashion Boutique",
    kicker: "Ready-to-wear & tailoring",
    headline: "A rack that",
    headlineAccent: "never shuts.",
    blurb: "New arrivals go up the morning they land, with measurements taken over chat.",
    accent: "#9d174d",
    theme: "paper",
    archetype: "catalog",
    filters: ["Occasion", "Everyday", "Bridal"],
    listings: [
      { title: "Banarasi silk saree", meta: "Handloom · 6.3 m · blouse piece included", price: "₹8,400", tag: "New in", filter: "Occasion" },
      { title: "Anarkali set", meta: "Georgette · dupatta · semi-stitched", price: "₹4,250", tag: "3 left", filter: "Occasion" },
      { title: "Cotton kurta", meta: "Block print · sizes S–XXL", price: "₹1,150", tag: "Restocked", filter: "Everyday" },
      { title: "Chikankari top", meta: "Hand embroidery · Lucknow", price: "₹1,890", tag: "Bestseller", filter: "Everyday" },
      { title: "Lehenga, bridal", meta: "Made to measure · 4 week lead", price: "₹32,000", tag: "Trial slot", filter: "Bridal" },
      { title: "Reception gown", meta: "Custom fit · 3 fittings", price: "₹18,500", tag: "Made to order", filter: "Bridal" },
      { title: "Sharara set", meta: "Georgette · sequin work · dupatta", price: "₹6,700", tag: "New in", filter: "Occasion" },
      { title: "Palazzo & kurti", meta: "Rayon · 6 colours · sizes S–XXL", price: "₹1,340", tag: "In stock", filter: "Everyday" },
      { title: "Bridal blouse", meta: "Hand work · 3 fittings", price: "₹9,800", tag: "Made to order", filter: "Bridal" },
    ],
    stats: [
      { to: 340, suffix: "+", label: "Pieces" },
      { to: 4, suffix: " wk", label: "Custom lead" },
      { to: 3, label: "Fittings" },
    ],
    cta: "Ask for measurements",
  },
  {
    id: "wholesale",
    category: "Business & Retail",
    industry: "Wholesale & Distribution",
    kicker: "Bulk supply",
    headline: "Every retailer's",
    headlineAccent: "order, in one board.",
    blurb: "Standing orders, credit days and dispatch status stop living in a diary.",
    accent: "#6366f1",
    theme: "midnight",
    archetype: "portal",
    filters: ["Open", "Dispatched", "Credit due"],
    rows: [
      { code: "PO-4471", title: "Retail counter · Ward 6", meta: "42 cartons · mixed SKU", status: "Picking", filter: "Open" },
      { code: "PO-4472", title: "Provision store · Market Rd", meta: "18 cartons · staples", status: "Packed", filter: "Open" },
      { code: "PO-4468", title: "Supermarket · Bypass", meta: "96 cartons · full load", status: "On vehicle", filter: "Dispatched" },
      { code: "PO-4465", title: "General store · Station", meta: "24 cartons · delivered 9:40", status: "Signed", filter: "Dispatched" },
      { code: "PO-4402", title: "Retail counter · Ward 2", meta: "₹48,200 · 30 day terms", status: "Day 27", filter: "Credit due" },
      { code: "PO-4399", title: "Wholesale sub-stockist", meta: "₹1,12,000 · 45 day terms", status: "Day 41", filter: "Credit due" },
      { code: "PO-4473", title: "Kirana counter · Bus Stand", meta: "9 cartons · beverages", status: "Awaiting stock", filter: "Open" },
      { code: "PO-4470", title: "Provision store · Ward 9", meta: "31 cartons · left dock 7:05", status: "In transit", filter: "Dispatched" },
      { code: "PO-4388", title: "Retail counter · Mandi", meta: "₹22,400 · 15 day terms", status: "Overdue 3d", filter: "Credit due" },
    ],
    stats: [
      { to: 214, label: "Retailers" },
      { to: 96, suffix: "%", label: "On-time" },
      { to: 30, suffix: " day", label: "Terms" },
    ],
    cta: "Open order book",
  },
  {
    id: "hardware",
    category: "Business & Retail",
    industry: "Hardware & Electricals",
    kicker: "Trade counter",
    headline: "Contractors order",
    headlineAccent: "from the site.",
    blurb: "Rate list, stock and a running total, so a site engineer never calls to ask.",
    accent: "#0ea5e9",
    theme: "glass",
    archetype: "storefront",
    tabs: ["Electricals", "Plumbing", "Fasteners"],
    items: [
      { n: "PVC conduit pipe", meta: "25 mm · ISI", price: 62, unit: "length", tab: "Electricals" },
      { n: "Copper wire", meta: "1.5 sq mm · 90 m coil", price: 1980, unit: "coil", tab: "Electricals" },
      { n: "Modular switch", meta: "6 A · 1 way", price: 95, unit: "piece", tab: "Electricals" },
      { n: "CPVC pipe", meta: "1 inch · 3 m", price: 340, unit: "length", tab: "Plumbing" },
      { n: "Ball valve, brass", meta: "3/4 inch", price: 285, unit: "piece", tab: "Plumbing" },
      { n: "Teflon tape", meta: "Box of 10", price: 90, unit: "box", tab: "Plumbing" },
      { n: "Anchor bolt", meta: "10 mm · pack of 50", price: 420, unit: "pack", tab: "Fasteners" },
      { n: "Self-tapping screw", meta: "8 x 1.5 · 100 pc", price: 175, unit: "pack", tab: "Fasteners" },
      { n: "Wall plug", meta: "Assorted · 200 pc", price: 240, unit: "pack", tab: "Fasteners" },
    ],
    stats: [
      { to: 2400, suffix: "+", label: "SKUs" },
      { to: 24, suffix: " hr", label: "Site drop" },
      { to: 15, suffix: " day", label: "Trade credit" },
    ],
    cta: "Request quote",
  },
  {
    id: "printing",
    category: "Business & Retail",
    industry: "Printing & Signage",
    kicker: "Print, press & display",
    headline: "Artwork in,",
    headlineAccent: "proof out.",
    blurb: "Files arrive, a proof goes back, and the job moves without a single visit.",
    accent: "#db2777",
    theme: "bright",
    archetype: "studio",
    tabs: ["Print", "Signage", "Branding"],
    works: [
      { title: "Wedding card, foil", meta: "300 gsm · gold foil · 500 pc", tab: "Print" },
      { title: "Visiting cards", meta: "Matte lamination · 1,000 pc", tab: "Print" },
      { title: "Bill books", meta: "Carbonless · 3 part · numbered", tab: "Print" },
      { title: "Flex hoarding", meta: "20 x 10 ft · star flex", tab: "Signage" },
      { title: "Acrylic letters", meta: "Backlit · shopfront", tab: "Signage" },
      { title: "Vehicle wrap", meta: "Cast vinyl · full body", tab: "Signage" },
      { title: "Logo suite", meta: "Mark · wordmark · usage sheet", tab: "Branding" },
      { title: "Menu design", meta: "Print + laminate · 8 page", tab: "Branding" },
      { title: "Packaging label", meta: "Die-cut · food grade", tab: "Branding" },
    ],
    stats: [
      { to: 48, suffix: " hr", label: "Proof back" },
      { to: 1000, suffix: "+", label: "Jobs a year" },
      { to: 6, label: "Finishes" },
    ],
    cta: "Upload artwork",
  },
];

/* ── Medical & Wellness ───────────────────────────────────────────────────── */

const medical: RowEntry[] = [
  {
    id: "dental",
    category: "Medical & Wellness",
    industry: "Dental Clinic",
    kicker: "Dental surgery",
    headline: "Book a chair",
    headlineAccent: "in thirty seconds.",
    blurb: "Patients pick the treatment and a slot themselves — the front desk stops taking calls.",
    accent: "#0d9488",
    theme: "bright",
    archetype: "booking",
    services: [
      { n: "Consultation", meta: "Exam + X-ray if needed", price: "₹300" },
      { n: "Scaling & polish", meta: "45 min · single sitting", price: "₹1,200" },
      { n: "Root canal", meta: "2 sittings · includes cap", price: "₹6,500" },
    ],
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    slots: ["10:30", "11:15", "12:00", "4:30", "5:15", "6:00"],
    stats: [
      { to: 12, suffix: "+", label: "Years" },
      { to: 4800, suffix: "+", label: "Patients" },
      { to: 2, label: "Chairs" },
    ],
    cta: "Confirm appointment",
  },
  {
    id: "lab",
    category: "Medical & Wellness",
    industry: "Diagnostic Lab",
    kicker: "Pathology & imaging",
    headline: "Reports reach",
    headlineAccent: "the phone first.",
    blurb: "Collection, processing and release tracked per sample, with a download when it clears.",
    accent: "#2563eb",
    theme: "glass",
    archetype: "portal",
    filters: ["Collected", "Processing", "Ready"],
    rows: [
      { code: "SM-2214", title: "Complete blood count", meta: "Home collection · 7:20 am", status: "In transit", filter: "Collected" },
      { code: "SM-2215", title: "Lipid profile", meta: "Fasting · walk-in", status: "Received", filter: "Collected" },
      { code: "SM-2208", title: "Thyroid panel", meta: "T3 · T4 · TSH", status: "On analyser", filter: "Processing" },
      { code: "SM-2209", title: "HbA1c", meta: "Quarterly review", status: "Verification", filter: "Processing" },
      { code: "SM-2196", title: "Vitamin D & B12", meta: "Released 9:05 am", status: "Download", filter: "Ready" },
      { code: "SM-2194", title: "Liver function test", meta: "Released 8:40 am", status: "Download", filter: "Ready" },
      { code: "SM-2216", title: "Urine routine", meta: "Walk-in · 8:05 am", status: "Received", filter: "Collected" },
      { code: "SM-2210", title: "Blood sugar, post-meal", meta: "2 hr sample", status: "On analyser", filter: "Processing" },
      { code: "SM-2190", title: "Serum electrolytes", meta: "Released 8:15 am", status: "Download", filter: "Ready" },
    ],
    stats: [
      { to: 120, suffix: "+", label: "Tests" },
      { to: 6, suffix: " hr", label: "Routine TAT" },
      { to: 0, label: "Counter queue" },
    ],
    cta: "Book home collection",
  },
  {
    id: "gym",
    category: "Medical & Wellness",
    industry: "Gym & Fitness Studio",
    kicker: "Strength & conditioning",
    headline: "Pick a class,",
    headlineAccent: "hold the slot.",
    blurb: "Capacity per class is real, so a full floor at 6 pm stops being a surprise.",
    accent: "#a3e635",
    theme: "midnight",
    archetype: "booking",
    services: [
      { n: "Open gym", meta: "Floor access · trainer on call", price: "₹1,500 /mo" },
      { n: "Personal training", meta: "1-on-1 · 12 sessions", price: "₹8,000" },
      { n: "Group HIIT", meta: "45 min · 14 spots", price: "₹2,200 /mo" },
    ],
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    slots: ["5:30 am", "6:30 am", "7:30 am", "5:30 pm", "6:30 pm", "7:30 pm"],
    stats: [
      { to: 14, label: "Spots a class" },
      { to: 6, label: "Trainers" },
      { to: 18, suffix: " hr", label: "Open daily" },
    ],
    cta: "Hold my spot",
  },
  {
    id: "salon",
    category: "Medical & Wellness",
    industry: "Beauty Salon & Spa",
    kicker: "Hair, skin & spa",
    headline: "The chair you",
    headlineAccent: "always ask for.",
    blurb: "Service, stylist and time chosen together, so nobody waits on a Sunday morning.",
    accent: "#be185d",
    theme: "paper",
    archetype: "booking",
    services: [
      { n: "Cut & blow-dry", meta: "60 min · wash included", price: "₹700" },
      { n: "Hair colour", meta: "Global · 2 hr · patch test", price: "₹3,200" },
      { n: "Facial & cleanup", meta: "75 min · skin consult first", price: "₹1,800" },
    ],
    days: ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    slots: ["11:00", "12:30", "2:00", "3:30", "5:00", "6:30"],
    stats: [
      { to: 8, label: "Stylists" },
      { to: 30, suffix: " min", label: "Avg wait" },
      { to: 74, suffix: "%", label: "Rebook" },
    ],
    cta: "Book with stylist",
  },
  {
    id: "pharmacy",
    category: "Medical & Wellness",
    industry: "Pharmacy & Distribution",
    kicker: "Chemist & supply",
    headline: "Refills that",
    headlineAccent: "remember themselves.",
    blurb: "A monthly prescription becomes a standing order instead of a monthly phone call.",
    accent: "#16a34a",
    theme: "glass",
    archetype: "storefront",
    tabs: ["Prescription", "OTC", "Devices"],
    items: [
      { n: "Metformin 500 mg", meta: "Strip of 15 · Rx required", price: 42, unit: "strip", tab: "Prescription" },
      { n: "Amlodipine 5 mg", meta: "Strip of 10 · Rx required", price: 38, unit: "strip", tab: "Prescription" },
      { n: "Thyroxine 50 mcg", meta: "Strip of 30 · Rx required", price: 128, unit: "strip", tab: "Prescription" },
      { n: "Paracetamol 650", meta: "Strip of 10", price: 30, unit: "strip", tab: "OTC" },
      { n: "ORS sachet", meta: "Pack of 5", price: 110, unit: "pack", tab: "OTC" },
      { n: "Antacid syrup", meta: "200 ml", price: 145, unit: "bottle", tab: "OTC" },
      { n: "Digital BP monitor", meta: "Upper arm · 2 yr warranty", price: 1850, unit: "unit", tab: "Devices" },
      { n: "Glucometer kit", meta: "With 25 strips", price: 1200, unit: "kit", tab: "Devices" },
      { n: "Nebuliser", meta: "Compressor type", price: 1650, unit: "unit", tab: "Devices" },
    ],
    stats: [
      { to: 30, suffix: " day", label: "Refill cycle" },
      { to: 90, suffix: " min", label: "Local drop" },
      { to: 100, suffix: "%", label: "Rx verified" },
    ],
    cta: "Start refill",
  },
];

/* ── Education ────────────────────────────────────────────────────────────── */

const education: RowEntry[] = [
  {
    id: "live-gravity",
    category: "Education",
    kind: "live",
    host: "gravitypointtutorial.com",
    title: "Gravity Point Tutorial",
    trade: "Coaching institute",
    url: "https://gravitypointtutorial.com",
    accent: "#ec4899",
  },
  {
    id: "live-smartedge",
    category: "Education",
    kind: "live",
    host: "smartedgeeducationconsultancy.com",
    title: "SmartEdge Education",
    trade: "Education consultancy",
    url: "https://smartedgeeducationconsultancy.com",
    accent: "#0ea5e9",
  },
  {
    id: "school",
    category: "Education",
    industry: "School & Admissions",
    kicker: "K–12 administration",
    headline: "Admissions without",
    headlineAccent: "the paper queue.",
    blurb: "Enquiry, form, fee and section allotment tracked as one file per child.",
    accent: "#1d4ed8",
    theme: "bright",
    archetype: "portal",
    filters: ["Enquiry", "Form in", "Confirmed"],
    rows: [
      { code: "AD-118", title: "Class I · sibling", meta: "Enquiry 2 days ago", status: "Call back", filter: "Enquiry" },
      { code: "AD-119", title: "Class VI · transfer", meta: "Needs TC from old school", status: "Docs pending", filter: "Enquiry" },
      { code: "AD-112", title: "Class IX · science", meta: "Form + fee receipt in", status: "Interview", filter: "Form in" },
      { code: "AD-113", title: "Class XI · commerce", meta: "Marksheet verified", status: "Seat held", filter: "Form in" },
      { code: "AD-104", title: "Class III", meta: "Section B · roll 24", status: "Enrolled", filter: "Confirmed" },
      { code: "AD-106", title: "Class VII", meta: "Section A · bus route 3", status: "Enrolled", filter: "Confirmed" },
      { code: "AD-121", title: "Class XI · science", meta: "Walk-in yesterday", status: "Prospectus sent", filter: "Enquiry" },
      { code: "AD-115", title: "Class IV", meta: "Fee part paid · 1st instalment", status: "Verification", filter: "Form in" },
      { code: "AD-108", title: "Class X", meta: "Section C · roll 11", status: "Enrolled", filter: "Confirmed" },
    ],
    stats: [
      { to: 1200, suffix: "+", label: "Students" },
      { to: 3, suffix: " day", label: "Form to seat" },
      { to: 0, label: "Paper forms" },
    ],
    cta: "Start application",
  },
  {
    id: "exam",
    category: "Education",
    industry: "Competitive Exam Academy",
    kicker: "UPSC · SSC · Banking",
    headline: "One batch,",
    headlineAccent: "one clear seat.",
    blurb: "Batch, timing and test series picked up front, so counselling is a formality.",
    accent: "#f59e0b",
    theme: "midnight",
    archetype: "booking",
    services: [
      { n: "Foundation batch", meta: "11 months · prelims + mains", price: "₹48,000" },
      { n: "Weekend batch", meta: "For working aspirants", price: "₹32,000" },
      { n: "Test series only", meta: "40 tests · evaluated", price: "₹6,500" },
    ],
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    slots: ["6:00 am", "8:00 am", "10:00 am", "2:00 pm", "4:00 pm", "6:00 pm"],
    stats: [
      { to: 40, label: "Tests" },
      { to: 60, label: "Seats a batch" },
      { to: 11, suffix: " mo", label: "Course" },
    ],
    cta: "Reserve a seat",
  },
  {
    id: "skills",
    category: "Education",
    industry: "Skill Training Institute",
    kicker: "Vocational & certification",
    headline: "A trade you can",
    headlineAccent: "start on Monday.",
    blurb: "Course length, fee and what the certificate is worth, stated before anyone enrols.",
    accent: "#7c3aed",
    theme: "glass",
    archetype: "catalog",
    filters: ["Computer", "Technical", "Language"],
    listings: [
      { title: "Tally with GST", meta: "3 months · 2 hr daily · certificate", price: "₹6,000", tag: "Job oriented", filter: "Computer" },
      { title: "Advanced Excel", meta: "6 weeks · pivot, macros, dashboards", price: "₹4,500", tag: "Evening", filter: "Computer" },
      { title: "Graphic design", meta: "4 months · portfolio on completion", price: "₹12,000", tag: "Portfolio", filter: "Computer" },
      { title: "Electrician, ITI aligned", meta: "6 months · workshop + theory", price: "₹9,000", tag: "Hands-on", filter: "Technical" },
      { title: "Mobile repair", meta: "3 months · board level", price: "₹8,500", tag: "Toolkit incl.", filter: "Technical" },
      { title: "Spoken English", meta: "3 months · daily practice batch", price: "₹3,500", tag: "Small batch", filter: "Language" },
      { title: "DTP & desktop publishing", meta: "2 months · CorelDraw, PageMaker", price: "₹3,800", tag: "Evening", filter: "Computer" },
      { title: "AC & refrigeration", meta: "4 months · service and install", price: "₹10,500", tag: "Tools incl.", filter: "Technical" },
      { title: "Hindi typing & shorthand", meta: "3 months · speed certification", price: "₹2,800", tag: "Govt exam", filter: "Language" },
      { title: "Basic communication", meta: "6 weeks · interview practice", price: "₹2,200", tag: "Weekend", filter: "Language" },
    ],
    stats: [
      { to: 18, label: "Courses" },
      { to: 3, suffix: " mo", label: "Typical" },
      { to: 24, label: "Per batch" },
    ],
    cta: "Enrol in course",
  },
];

/* ── Professional ─────────────────────────────────────────────────────────── */

const professional: RowEntry[] = [
  {
    id: "legal",
    category: "Professional",
    industry: "Legal Chambers",
    kicker: "Advocates & advisory",
    headline: "Counsel, without",
    headlineAccent: "the first visit.",
    blurb: "Practice areas and a written intake, so the first meeting starts with the facts.",
    accent: "#1e3a8a",
    theme: "paper",
    archetype: "studio",
    tabs: ["Civil", "Corporate", "Family"],
    works: [
      { title: "Property title", meta: "Search · mutation · chain of deed", tab: "Civil" },
      { title: "Cheque bounce", meta: "Section 138 · notice to trial", tab: "Civil" },
      { title: "Consumer matter", meta: "District & state commission", tab: "Civil" },
      { title: "Company incorporation", meta: "MOA · AOA · ROC filing", tab: "Corporate" },
      { title: "Contract drafting", meta: "Vendor · employment · lease", tab: "Corporate" },
      { title: "Compliance notice", meta: "Reply drafting & representation", tab: "Corporate" },
      { title: "Mutual divorce", meta: "Petition · settlement · decree", tab: "Family" },
      { title: "Succession certificate", meta: "Legal heir · asset transfer", tab: "Family" },
      { title: "Will & probate", meta: "Drafting · registration", tab: "Family" },
    ],
    stats: [
      { to: 22, suffix: "+", label: "Years at bar" },
      { to: 9, label: "Practice areas" },
      { to: 48, suffix: " hr", label: "First reply" },
    ],
    cta: "Send case brief",
  },
  {
    id: "ca",
    category: "Professional",
    industry: "CA & Tax Practice",
    kicker: "Audit · GST · advisory",
    headline: "Every deadline,",
    headlineAccent: "on one screen.",
    blurb: "Returns across every client tracked against the statutory date, not a memory.",
    accent: "#0f766e",
    theme: "bright",
    archetype: "portal",
    filters: ["This week", "Filed", "Awaiting docs"],
    rows: [
      { code: "GSTR-3B", title: "Retail client · Nov", meta: "Due 20th · 3 days left", status: "Ready to file", filter: "This week" },
      { code: "TDS-26Q", title: "Manufacturing client · Q3", meta: "Due 31st · challans matched", status: "Review", filter: "This week" },
      { code: "GSTR-1", title: "Distributor · Nov", meta: "Filed 11th · ARN generated", status: "Filed", filter: "Filed" },
      { code: "ITR-4", title: "Professional · AY 25-26", meta: "Filed & e-verified", status: "Filed", filter: "Filed" },
      { code: "GSTR-9", title: "Trading client · annual", meta: "Purchase register pending", status: "Chased 2x", filter: "Awaiting docs" },
      { code: "ROC-AOC4", title: "Pvt Ltd · FY 24-25", meta: "Signed balance sheet awaited", status: "Chased 1x", filter: "Awaiting docs" },
      { code: "PTRC", title: "Firm · monthly", meta: "Due 21st · computed", status: "Ready to file", filter: "This week" },
      { code: "TDS-24Q", title: "Salary TDS · Q2", meta: "Filed & acknowledged", status: "Filed", filter: "Filed" },
      { code: "ITR-6", title: "Pvt Ltd · AY 25-26", meta: "Bank statements awaited", status: "Chased 3x", filter: "Awaiting docs" },
    ],
    stats: [
      { to: 180, suffix: "+", label: "Clients" },
      { to: 0, label: "Missed dates" },
      { to: 4, label: "Reminders sent" },
    ],
    cta: "Open compliance board",
  },
  {
    id: "realestate",
    category: "Professional",
    industry: "Real Estate & Builders",
    kicker: "Plots, flats & projects",
    headline: "Site visits that",
    headlineAccent: "start online.",
    blurb: "Inventory, floor and price shown honestly, so a visit is the second step.",
    accent: "#ea580c",
    theme: "glass",
    archetype: "catalog",
    filters: ["Ready", "Under build", "Plots"],
    listings: [
      { title: "3 BHK · Tower B", meta: "1,450 sq ft · 7th floor · east", price: "₹62 L", tag: "Ready", filter: "Ready" },
      { title: "2 BHK · Tower A", meta: "1,080 sq ft · 3rd floor · corner", price: "₹44 L", tag: "2 left", filter: "Ready" },
      { title: "Shop · ground floor", meta: "420 sq ft · main road facing", price: "₹38 L", tag: "Commercial", filter: "Ready" },
      { title: "3 BHK · Phase II", meta: "Possession Dec 2027 · RERA listed", price: "₹58 L", tag: "Pre-launch", filter: "Under build" },
      { title: "Duplex · Phase II", meta: "2,100 sq ft · private terrace", price: "₹86 L", tag: "6 units", filter: "Under build" },
      { title: "Residential plot", meta: "2,400 sq ft · gated · corner", price: "₹28 L", tag: "Clear title", filter: "Plots" },
      { title: "1 BHK · Tower C", meta: "620 sq ft · 2nd floor · park view", price: "₹26 L", tag: "Ready", filter: "Ready" },
      { title: "2 BHK · Phase II", meta: "980 sq ft · possession Jun 2027", price: "₹41 L", tag: "Pre-launch", filter: "Under build" },
      { title: "Commercial plot", meta: "3,600 sq ft · highway facing", price: "₹52 L", tag: "Clear title", filter: "Plots" },
      { title: "Corner plot, gated", meta: "1,800 sq ft · park facing", price: "₹21 L", tag: "4 left", filter: "Plots" },
    ],
    stats: [
      { to: 3, label: "Live projects" },
      { to: 148, label: "Units" },
      { to: 100, suffix: "%", label: "RERA listed" },
    ],
    cta: "Book site visit",
  },
  {
    id: "itfirm",
    category: "Professional",
    industry: "IT & Software Firm",
    kicker: "Product & platform",
    headline: "The work,",
    headlineAccent: "not the buzzwords.",
    blurb: "What was built, what it runs on, and what it moved — three lines per engagement.",
    accent: "#22d3ee",
    theme: "midnight",
    archetype: "studio",
    tabs: ["Platform", "Mobile", "Data"],
    works: [
      { title: "Order management", meta: "Node · Postgres · 40k orders/mo", tab: "Platform" },
      { title: "Dealer portal", meta: "Next.js · SSO · 12 regions", tab: "Platform" },
      { title: "Billing engine", meta: "Idempotent · GST compliant", tab: "Platform" },
      { title: "Field app", meta: "Offline-first · sync on signal", tab: "Mobile" },
      { title: "Delivery app", meta: "Live tracking · proof of delivery", tab: "Mobile" },
      { title: "Attendance app", meta: "Geofenced · payroll export", tab: "Mobile" },
      { title: "Sales warehouse", meta: "Nightly ETL · 6 sources", tab: "Data" },
      { title: "Ops dashboard", meta: "Near-real-time · role scoped", tab: "Data" },
      { title: "Forecast model", meta: "Demand planning · weekly", tab: "Data" },
    ],
    stats: [
      { to: 99.9, decimals: 1, suffix: "%", label: "Uptime" },
      { to: 12, label: "Engineers" },
      { to: 2, suffix: " wk", label: "Sprint" },
    ],
    cta: "Scope a build",
  },
  {
    id: "hr",
    category: "Professional",
    industry: "HR & Staffing Agency",
    kicker: "Recruitment & payroll",
    headline: "Candidates stop",
    headlineAccent: "falling through.",
    blurb: "Every mandate, every candidate, every stage — with the client seeing the same board.",
    accent: "#7c3aed",
    theme: "bright",
    archetype: "portal",
    filters: ["Sourcing", "Interview", "Offer"],
    rows: [
      { code: "MD-31", title: "Accounts executive · 4 roles", meta: "18 profiles screened", status: "Shortlist sent", filter: "Sourcing" },
      { code: "MD-34", title: "Field sales · 12 roles", meta: "Walk-in drive Saturday", status: "Sourcing", filter: "Sourcing" },
      { code: "MD-28", title: "Production supervisor", meta: "Round 2 · plant head", status: "Scheduled", filter: "Interview" },
      { code: "MD-29", title: "Backend developer", meta: "Technical round cleared", status: "HR round", filter: "Interview" },
      { code: "MD-22", title: "Branch manager", meta: "CTC agreed · docs verified", status: "Offer out", filter: "Offer" },
      { code: "MD-24", title: "Store incharge", meta: "Joining 1st · BGV clear", status: "Accepted", filter: "Offer" },
      { code: "MD-36", title: "Telecaller · 8 roles", meta: "Post live · 42 applications", status: "Screening", filter: "Sourcing" },
      { code: "MD-30", title: "QA engineer", meta: "Assignment submitted", status: "Panel round", filter: "Interview" },
      { code: "MD-26", title: "Area sales manager", meta: "Negotiation closed", status: "Offer out", filter: "Offer" },
    ],
    stats: [
      { to: 21, suffix: " day", label: "Avg close" },
      { to: 86, suffix: "%", label: "Offer accept" },
      { to: 40, suffix: "+", label: "Live roles" },
    ],
    cta: "Post a mandate",
  },
];

/* ── Home & Local ─────────────────────────────────────────────────────────── */

const homeLocal: RowEntry[] = [
  {
    id: "live-phulwari",
    category: "Home & Local",
    kind: "live",
    host: "phulwari.co.in",
    title: "Phulwari",
    trade: "Nursery & plants",
    url: "https://phulwari.co.in",
    accent: "#22c55e",
  },
  {
    id: "repair",
    category: "Home & Local",
    industry: "Home Repair Services",
    kicker: "Electrician · plumber · carpenter",
    headline: "A fixer, booked",
    headlineAccent: "for a real hour.",
    blurb: "Job type and a time window chosen up front — no waiting all afternoon.",
    accent: "#f97316",
    theme: "bright",
    archetype: "booking",
    services: [
      { n: "Electrical fault", meta: "Wiring, MCB, points · visit + fix", price: "₹350 visit" },
      { n: "Plumbing leak", meta: "Tap, trap, flush tank", price: "₹300 visit" },
      { n: "Carpentry", meta: "Hinge, lock, shelf, repair", price: "₹400 visit" },
    ],
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    slots: ["9–11", "11–1", "1–3", "3–5", "5–7", "7–9"],
    stats: [
      { to: 90, suffix: " min", label: "Arrival" },
      { to: 30, suffix: " day", label: "Work warranty" },
      { to: 40, suffix: "+", label: "Verified hands" },
    ],
    cta: "Book this slot",
  },
  {
    id: "furniture",
    category: "Home & Local",
    industry: "Furniture & Interiors",
    kicker: "Made & fitted",
    headline: "Seen in the room",
    headlineAccent: "before it's built.",
    blurb: "Material, finish and lead time on every piece, custom or off the floor.",
    accent: "#92400e",
    theme: "paper",
    archetype: "catalog",
    filters: ["Living", "Bedroom", "Modular"],
    listings: [
      { title: "Sheesham sofa, 3+2", meta: "Solid wood · fabric of choice", price: "₹42,000", tag: "In stock", filter: "Living" },
      { title: "TV unit, wall hung", meta: "8 ft · matte laminate", price: "₹18,500", tag: "3 week", filter: "Living" },
      { title: "Dining set, 6 seat", meta: "Teak finish · glass top option", price: "₹36,000", tag: "In stock", filter: "Living" },
      { title: "Bed with storage", meta: "Queen · hydraulic lift", price: "₹28,000", tag: "2 week", filter: "Bedroom" },
      { title: "Wardrobe, 4 door", meta: "Mirror panel · internal drawers", price: "₹52,000", tag: "Custom", filter: "Bedroom" },
      { title: "Modular kitchen", meta: "L-shape · 10 x 8 · soft close", price: "₹1,85,000", tag: "Site survey", filter: "Modular" },
      { title: "Shoe rack & console", meta: "4 ft · closed storage", price: "₹12,400", tag: "In stock", filter: "Living" },
      { title: "Dressing unit", meta: "Mirror · drawers · stool", price: "₹16,800", tag: "2 week", filter: "Bedroom" },
      { title: "Walk-in wardrobe", meta: "Custom · loft included", price: "₹2,40,000", tag: "Site survey", filter: "Modular" },
      { title: "Study & storage unit", meta: "Wall to wall · cable management", price: "₹64,000", tag: "3 week", filter: "Modular" },
    ],
    stats: [
      { to: 3, suffix: " wk", label: "Lead time" },
      { to: 5, suffix: " yr", label: "Warranty" },
      { to: 12, label: "Finishes" },
    ],
    cta: "Request site survey",
  },
  {
    id: "cleaning",
    category: "Home & Local",
    industry: "Cleaning Services",
    kicker: "Deep clean & upkeep",
    headline: "Clean on a",
    headlineAccent: "date you choose.",
    blurb: "Property size sets the crew and the hours, so the quote holds at the door.",
    accent: "#06b6d4",
    theme: "glass",
    archetype: "booking",
    services: [
      { n: "Full home deep clean", meta: "2 BHK · 4 hr · 3 person crew", price: "₹3,200" },
      { n: "Kitchen deep clean", meta: "Degrease · chimney · cabinets", price: "₹1,400" },
      { n: "Sofa & carpet", meta: "Shampoo + vacuum extraction", price: "₹1,100" },
    ],
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    slots: ["8:00", "10:00", "12:00", "2:00", "4:00", "6:00"],
    stats: [
      { to: 3, label: "Crew size" },
      { to: 4, suffix: " hr", label: "Typical job" },
      { to: 100, suffix: "%", label: "Own supplies" },
    ],
    cta: "Confirm booking",
  },
  {
    id: "events",
    category: "Home & Local",
    industry: "Event Management",
    kicker: "Weddings & functions",
    headline: "The day,",
    headlineAccent: "planned in public.",
    blurb: "Past setups, what each included, and what a date actually costs to hold.",
    accent: "#d946ef",
    theme: "midnight",
    archetype: "studio",
    tabs: ["Wedding", "Corporate", "Private"],
    works: [
      { title: "Mandap & stage", meta: "Floral · 400 guests · 2 day", tab: "Wedding" },
      { title: "Haldi setup", meta: "Marigold · daylight · open lawn", tab: "Wedding" },
      { title: "Reception", meta: "LED backdrop · live counters", tab: "Wedding" },
      { title: "Annual day", meta: "Auditorium · AV · 600 seats", tab: "Corporate" },
      { title: "Dealer meet", meta: "Hall · branding · catering", tab: "Corporate" },
      { title: "Product launch", meta: "Press wall · lighting · stream", tab: "Corporate" },
      { title: "Birthday, themed", meta: "Balloon arch · props · host", tab: "Private" },
      { title: "Anniversary", meta: "Intimate · 60 guests · dinner", tab: "Private" },
      { title: "Naming ceremony", meta: "Home setup · half day", tab: "Private" },
    ],
    stats: [
      { to: 240, suffix: "+", label: "Events" },
      { to: 400, label: "Guests handled" },
      { to: 21, suffix: " day", label: "Notice needed" },
    ],
    cta: "Check my date",
  },
];

/* ── Industrial ───────────────────────────────────────────────────────────── */

const industrial: RowEntry[] = [
  {
    id: "logistics",
    category: "Industrial",
    industry: "Logistics & Courier",
    kicker: "Parcel & freight",
    headline: "Where is it",
    headlineAccent: "answers itself.",
    blurb: "Every consignment scannable by the consignee, so the office phone stops ringing.",
    accent: "#fb7185",
    theme: "midnight",
    archetype: "portal",
    filters: ["Booked", "In transit", "Delivered"],
    rows: [
      { code: "CN-88214", title: "Docket · 3 pcs · 42 kg", meta: "Picked from shipper 6:10 pm", status: "At origin hub", filter: "Booked" },
      { code: "CN-88219", title: "Docket · 1 pc · 8 kg", meta: "Pickup scheduled today", status: "Awaiting pickup", filter: "Booked" },
      { code: "CN-88190", title: "Docket · 12 pcs · 310 kg", meta: "Line-haul · left hub 11:20 pm", status: "On route", filter: "In transit" },
      { code: "CN-88186", title: "Docket · 2 pcs · 19 kg", meta: "Out for delivery 8:05 am", status: "Last mile", filter: "In transit" },
      { code: "CN-88141", title: "Docket · 5 pcs · 64 kg", meta: "Received by consignee", status: "POD signed", filter: "Delivered" },
      { code: "CN-88132", title: "Docket · 1 pc · 3 kg", meta: "Delivered 2:40 pm", status: "POD signed", filter: "Delivered" },
      { code: "CN-88221", title: "Docket · 4 pcs · 55 kg", meta: "Manifested for evening run", status: "At origin hub", filter: "Booked" },
      { code: "CN-88175", title: "Docket · 8 pcs · 140 kg", meta: "Reached destination hub 5:30 am", status: "At destination", filter: "In transit" },
      { code: "CN-88120", title: "Docket · 3 pcs · 27 kg", meta: "Delivered 11:15 am", status: "POD signed", filter: "Delivered" },
    ],
    stats: [
      { to: 2400, suffix: "+", label: "Parcels/mo" },
      { to: 94, suffix: "%", label: "On time" },
      { to: 6, label: "Routes" },
    ],
    cta: "Track a docket",
  },
  {
    id: "transport",
    category: "Industrial",
    industry: "Transport Fleet",
    kicker: "Trucks on hire",
    headline: "A vehicle,",
    headlineAccent: "held for your load.",
    blurb: "Body type and route picked first, so the rate quoted is the rate paid.",
    accent: "#eab308",
    theme: "glass",
    archetype: "booking",
    services: [
      { n: "Tata Ace", meta: "Up to 750 kg · city runs", price: "₹18 /km" },
      { n: "14 ft closed body", meta: "Up to 3.5 T · intercity", price: "₹32 /km" },
      { n: "22 ft container", meta: "Up to 9 T · full truck load", price: "₹58 /km" },
    ],
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    slots: ["6 am", "9 am", "12 pm", "3 pm", "6 pm", "9 pm"],
    stats: [
      { to: 48, label: "Vehicles" },
      { to: 100, suffix: "%", label: "GPS fitted" },
      { to: 2, suffix: " hr", label: "Placement" },
    ],
    cta: "Book vehicle",
  },
  {
    id: "manufacturing",
    category: "Industrial",
    industry: "Manufacturing Unit",
    kicker: "Fabrication & supply",
    headline: "A catalogue",
    headlineAccent: "buyers can quote from.",
    blurb: "Grades, tolerances and MOQ published, so an RFQ arrives already specified.",
    accent: "#64748b",
    theme: "bright",
    archetype: "catalog",
    filters: ["Sheet metal", "Machined", "Assemblies"],
    listings: [
      { title: "Laser-cut brackets", meta: "MS / SS 304 · 1–6 mm · ±0.1 mm", price: "MOQ 100", tag: "Drawing based", filter: "Sheet metal" },
      { title: "Press components", meta: "Progressive tool · up to 60 T", price: "MOQ 1,000", tag: "Tooling ready", filter: "Sheet metal" },
      { title: "Enclosures", meta: "Powder coated · IP54 option", price: "MOQ 50", tag: "Custom", filter: "Sheet metal" },
      { title: "CNC turned parts", meta: "EN8 / EN19 · ±0.02 mm", price: "MOQ 250", tag: "Inspection report", filter: "Machined" },
      { title: "VMC milled housings", meta: "Aluminium 6061 · 4 axis", price: "MOQ 100", tag: "First article", filter: "Machined" },
      { title: "Sub-assemblies", meta: "Fit, weld, test · serial marked", price: "MOQ 25", tag: "Traceable", filter: "Assemblies" },
      { title: "Bending & forming", meta: "Up to 3 m · CNC press brake", price: "MOQ 200", tag: "Drawing based", filter: "Sheet metal" },
      { title: "Wire EDM parts", meta: "Tool steel · ±0.01 mm", price: "MOQ 50", tag: "Inspection report", filter: "Machined" },
      { title: "Panel wiring", meta: "Wired to schematic · tested", price: "MOQ 10", tag: "Traceable", filter: "Assemblies" },
      { title: "Weldments, jigged", meta: "MIG · fixture held · DP tested", price: "MOQ 40", tag: "Traceable", filter: "Assemblies" },
    ],
    stats: [
      { to: 3, suffix: " wk", label: "Lead time" },
      { to: 9001, label: "ISO certified" },
      { to: 98, suffix: "%", label: "First pass" },
    ],
    cta: "Send an RFQ",
  },
  {
    id: "coldstorage",
    category: "Industrial",
    industry: "Cold Storage",
    kicker: "Controlled atmosphere",
    headline: "Every chamber,",
    headlineAccent: "on the record.",
    blurb: "Temperature and occupancy per chamber, logged where the depositor can see it.",
    accent: "#0891b2",
    theme: "glass",
    archetype: "portal",
    filters: ["Chambers", "Inward", "Outward"],
    rows: [
      { code: "CH-01", title: "Potato · seed grade", meta: "Set 2.5 °C · holding 2.6 °C", status: "92% full", filter: "Chambers" },
      { code: "CH-02", title: "Apple · CA store", meta: "Set 0.5 °C · O₂ 2.1%", status: "78% full", filter: "Chambers" },
      { code: "CH-04", title: "Frozen · dairy", meta: "Set −18 °C · holding −18.4 °C", status: "64% full", filter: "Chambers" },
      { code: "IN-3382", title: "Inward · 640 bags", meta: "Depositor lot 118 · weighed", status: "Stacked CH-01", filter: "Inward" },
      { code: "OUT-2210", title: "Outward · 180 bags", meta: "Gate pass issued 7:15 am", status: "Loaded", filter: "Outward" },
      { code: "OUT-2211", title: "Outward · 95 bags", meta: "Pending dues cleared", status: "Ready", filter: "Outward" },
      { code: "CH-06", title: "Onion · ventilated", meta: "Set 4.0 °C · holding 4.1 °C", status: "45% full", filter: "Chambers" },
      { code: "IN-3385", title: "Inward · 220 bags", meta: "Depositor lot 121 · weighed", status: "Stacked CH-02", filter: "Inward" },
      { code: "IN-3379", title: "Inward · 410 bags", meta: "Depositor lot 117 · grading done", status: "Stacked CH-04", filter: "Inward" },
      { code: "OUT-2214", title: "Outward · 340 bags", meta: "Vehicle at dock 3", status: "Loading", filter: "Outward" },
    ],
    stats: [
      { to: 8, label: "Chambers" },
      { to: 12000, label: "MT capacity" },
      { to: 24, suffix: " hr", label: "Logged" },
    ],
    cta: "Check my lot",
  },
  {
    id: "security",
    category: "Industrial",
    industry: "Security & CCTV",
    kicker: "Guarding & surveillance",
    headline: "Cover you can",
    headlineAccent: "actually audit.",
    blurb: "Deployment, beat and camera coverage set out before a contract is signed.",
    accent: "#ef4444",
    theme: "midnight",
    archetype: "studio",
    tabs: ["Manned", "CCTV", "Access"],
    works: [
      { title: "Factory gate", meta: "3 shifts · frisk + vehicle log", tab: "Manned" },
      { title: "Apartment complex", meta: "2 gates · night patrol · visitor app", tab: "Manned" },
      { title: "Warehouse", meta: "Armed escort on dispatch days", tab: "Manned" },
      { title: "Perimeter cameras", meta: "IP · 4 MP · 30 day retention", tab: "CCTV" },
      { title: "Shop floor", meta: "Dome + PTZ · remote view", tab: "CCTV" },
      { title: "ANPR at gate", meta: "Plate capture · in/out log", tab: "CCTV" },
      { title: "Boom barrier", meta: "RFID tags · resident vs guest", tab: "Access" },
      { title: "Biometric attendance", meta: "Face + card · payroll export", tab: "Access" },
      { title: "Visitor kiosk", meta: "Photo · host approval · pass", tab: "Access" },
    ],
    stats: [
      { to: 3, label: "Shifts" },
      { to: 30, suffix: " day", label: "Footage kept" },
      { to: 15, suffix: " min", label: "Supervisor round" },
    ],
    cta: "Request a survey",
  },
];

/* ── Creative & Media ─────────────────────────────────────────────────────── */

const creative: RowEntry[] = [
  {
    id: "photography",
    category: "Creative & Media",
    industry: "Photography Studio",
    kicker: "Stills & albums",
    headline: "The portfolio",
    headlineAccent: "does the pitching.",
    blurb: "Work first, package second — and the date checked before either conversation.",
    accent: "#a16207",
    theme: "paper",
    archetype: "studio",
    tabs: ["Wedding", "Portrait", "Commercial"],
    works: [
      { title: "Full wedding", meta: "2 shooters · 2 days · 600 edits", tab: "Wedding" },
      { title: "Pre-wedding", meta: "Half day · 1 location · 60 edits", tab: "Wedding" },
      { title: "Album design", meta: "30 spreads · lay-flat print", tab: "Wedding" },
      { title: "Family portrait", meta: "Studio · 1 hr · 20 retouched", tab: "Portrait" },
      { title: "Newborn", meta: "At home · props · 2 hr", tab: "Portrait" },
      { title: "Corporate headshot", meta: "On site · per head pricing", tab: "Portrait" },
      { title: "Product catalogue", meta: "White background · 50 SKU/day", tab: "Commercial" },
      { title: "Food & menu", meta: "Styled · natural light", tab: "Commercial" },
      { title: "Architecture", meta: "Interiors · wide + detail", tab: "Commercial" },
    ],
    stats: [
      { to: 600, suffix: "+", label: "Edited frames" },
      { to: 21, suffix: " day", label: "Delivery" },
      { to: 2, label: "Shooters" },
    ],
    cta: "Check my date",
  },
  {
    id: "video",
    category: "Creative & Media",
    industry: "Video & Media Production",
    kicker: "Film & post",
    headline: "Packages with",
    headlineAccent: "the deliverables listed.",
    blurb: "Shoot days, cuts and formats stated up front, so a quote is comparable.",
    accent: "#8b5cf6",
    theme: "midnight",
    archetype: "catalog",
    filters: ["Brand", "Social", "Event"],
    listings: [
      { title: "Brand film", meta: "1 shoot day · 90 sec · 2 revisions", price: "₹85,000", tag: "Script incl.", filter: "Brand" },
      { title: "Product video", meta: "Studio · 30 sec · 3 cutdowns", price: "₹42,000", tag: "Motion GFX", filter: "Brand" },
      { title: "Founder interview", meta: "2 cam · 5 min · subtitles", price: "₹35,000", tag: "Podcast ready", filter: "Brand" },
      { title: "Reels retainer", meta: "12 reels a month · vertical", price: "₹48,000 /mo", tag: "Monthly", filter: "Social" },
      { title: "Ad cutdowns", meta: "6 / 15 / 30 sec · 3 aspect ratios", price: "₹22,000", tag: "From footage", filter: "Social" },
      { title: "Event film", meta: "Full coverage · 4 min highlight", price: "₹60,000", tag: "Same-week", filter: "Event" },
      { title: "Testimonial set", meta: "3 customers · 60 sec each", price: "₹55,000", tag: "On location", filter: "Brand" },
      { title: "Shorts pack", meta: "20 shorts · cut from long form", price: "₹26,000", tag: "From footage", filter: "Social" },
      { title: "Conference coverage", meta: "2 day · daily recap cut", price: "₹95,000", tag: "Multi-cam", filter: "Event" },
      { title: "Wedding film", meta: "Full day · 6 min highlight · teaser", price: "₹75,000", tag: "Two shooters", filter: "Event" },
    ],
    stats: [
      { to: 4, label: "Camera bodies" },
      { to: 14, suffix: " day", label: "Post" },
      { to: 3, label: "Aspect ratios" },
    ],
    cta: "Get a quote",
  },
  {
    id: "music",
    category: "Creative & Media",
    industry: "Music & Audio Studio",
    kicker: "Record · mix · master",
    headline: "Studio hours,",
    headlineAccent: "booked like a room.",
    blurb: "The console, the booth and the engineer are one bookable block, not three calls.",
    accent: "#f472b6",
    theme: "midnight",
    archetype: "booking",
    services: [
      { n: "Recording session", meta: "Live room + booth · engineer incl.", price: "₹1,800 /hr" },
      { n: "Mixing", meta: "Per track · 2 revisions", price: "₹6,000" },
      { n: "Voice-over & dub", meta: "Booth · cleaned & delivered", price: "₹1,200 /hr" },
    ],
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    slots: ["10 am", "12 pm", "2 pm", "4 pm", "6 pm", "8 pm"],
    stats: [
      { to: 2, label: "Live rooms" },
      { to: 24, suffix: " bit", label: "Capture" },
      { to: 48, suffix: " hr", label: "Rough mix" },
    ],
    cta: "Block studio time",
  },
  {
    id: "creator",
    category: "Creative & Media",
    industry: "Personal Brand & Creator",
    kicker: "Audience & deals",
    headline: "Numbers a brand",
    headlineAccent: "will actually read.",
    blurb: "Reach, watch time and audience split in a media kit that updates itself.",
    accent: "#14b8a6",
    theme: "glass",
    archetype: "portal",
    filters: ["Reach", "Audience", "Deals"],
    rows: [
      { code: "IG", title: "Instagram", meta: "Reels-led · 3 posts a week", status: "142k reach", filter: "Reach" },
      { code: "YT", title: "YouTube", meta: "Long form · weekly", status: "38k watch hr", filter: "Reach" },
      { code: "AGE", title: "18–34 years", meta: "Core band", status: "68%", filter: "Audience" },
      { code: "GEO", title: "Tier 2 & 3 cities", meta: "Hindi + English", status: "54%", filter: "Audience" },
      { code: "BR-12", title: "Integration · 60 sec", meta: "Brief received · slot open", status: "Available", filter: "Deals" },
      { code: "BR-09", title: "Series · 3 videos", meta: "Rate card sent", status: "In talks", filter: "Deals" },
      { code: "FB", title: "Facebook page", meta: "Reshares · community posts", status: "61k reach", filter: "Reach" },
      { code: "GEN", title: "Men 57% · women 43%", meta: "Split across platforms", status: "57 / 43", filter: "Audience" },
      { code: "BR-15", title: "Story series · 5 frames", meta: "Slot open next month", status: "Available", filter: "Deals" },
    ],
    stats: [
      { to: 142, suffix: "k", label: "Monthly reach" },
      { to: 6.4, decimals: 1, suffix: "%", label: "Engagement" },
      { to: 3, label: "Platforms" },
    ],
    cta: "Download media kit",
  },
  {
    id: "branding",
    category: "Creative & Media",
    industry: "Design & Branding",
    kicker: "Identity & systems",
    headline: "Identity, shown",
    headlineAccent: "as it gets used.",
    blurb: "Not logos on a wall — the sign, the pack and the invoice they end up on.",
    accent: "#e11d48",
    theme: "bright",
    archetype: "studio",
    tabs: ["Identity", "Packaging", "Digital"],
    works: [
      { title: "Logo & wordmark", meta: "3 routes · 2 revisions · files", tab: "Identity" },
      { title: "Brand guidelines", meta: "Colour · type · spacing · usage", tab: "Identity" },
      { title: "Stationery", meta: "Card · letterhead · invoice", tab: "Identity" },
      { title: "Label design", meta: "FSSAI compliant · die-line", tab: "Packaging" },
      { title: "Carton & sleeve", meta: "Structural + print ready", tab: "Packaging" },
      { title: "Shelf mockups", meta: "How it reads at 3 feet", tab: "Packaging" },
      { title: "Website design", meta: "Responsive · handed to dev", tab: "Digital" },
      { title: "Social templates", meta: "Editable · 12 layouts", tab: "Digital" },
      { title: "Ad creatives", meta: "Static + motion · sized", tab: "Digital" },
    ],
    stats: [
      { to: 3, label: "Routes shown" },
      { to: 2, suffix: " wk", label: "First look" },
      { to: 100, suffix: "%", label: "Source files" },
    ],
    cta: "Start a brief",
  },
];

/* ── Food & Hospitality ───────────────────────────────────────────────────── */

const food: RowEntry[] = [
  {
    id: "restaurant",
    category: "Food & Hospitality",
    industry: "Restaurant & Cafe",
    kicker: "Dine-in & takeaway",
    headline: "The menu, minus",
    headlineAccent: "the commission.",
    blurb: "Orders land straight in the kitchen instead of through an aggregator's cut.",
    accent: "#dc2626",
    theme: "midnight",
    archetype: "menu",
    sections: ["Starters", "Main course", "Breads & rice"],
    items: [
      { n: "Paneer tikka", meta: "8 pc · charcoal grill", price: 260, veg: true, section: "Starters" },
      { n: "Chilli chicken", meta: "Semi-dry · 8 pc", price: 290, veg: false, section: "Starters" },
      { n: "Veg spring roll", meta: "6 pc · sweet chilli dip", price: 180, veg: true, section: "Starters" },
      { n: "Dal makhani", meta: "Slow cooked · overnight", price: 240, veg: true, section: "Main course" },
      { n: "Butter chicken", meta: "Half / full · boneless", price: 380, veg: false, section: "Main course" },
      { n: "Kadhai paneer", meta: "Fresh paneer · capsicum", price: 300, veg: true, section: "Main course" },
      { n: "Tandoori roti", meta: "Butter optional", price: 25, veg: true, section: "Breads & rice" },
      { n: "Garlic naan", meta: "Hand stretched", price: 70, veg: true, section: "Breads & rice" },
      { n: "Veg biryani", meta: "Dum · served with raita", price: 260, veg: true, section: "Breads & rice" },
    ],
    stats: [
      { to: 0, suffix: "%", label: "Commission" },
      { to: 25, suffix: " min", label: "Kitchen time" },
      { to: 48, label: "Covers" },
    ],
    cta: "Place order",
  },
  {
    id: "cloudkitchen",
    category: "Food & Hospitality",
    industry: "Cloud Kitchen & Delivery",
    kicker: "Delivery-first kitchen",
    headline: "Your own app,",
    headlineAccent: "your own customers.",
    blurb: "Repeat orders and phone numbers stay yours instead of the platform's.",
    accent: "#f97316",
    theme: "bright",
    archetype: "menu",
    sections: ["Meal boxes", "Combos", "Sides"],
    items: [
      { n: "North Indian thali", meta: "Dal · sabzi · 4 roti · rice", price: 140, veg: true, section: "Meal boxes" },
      { n: "Chicken rice bowl", meta: "Boneless · gravy · salad", price: 190, veg: false, section: "Meal boxes" },
      { n: "Rajma chawal", meta: "Homestyle · pickle · onion", price: 120, veg: true, section: "Meal boxes" },
      { n: "Biryani + drink", meta: "Choice of veg or chicken", price: 260, veg: false, section: "Combos" },
      { n: "Two thali pack", meta: "For two · saves ₹40", price: 240, veg: true, section: "Combos" },
      { n: "Office lunch, 5 day", meta: "Weekly plan · one delivery slot", price: 650, veg: true, section: "Combos" },
      { n: "Boondi raita", meta: "150 ml", price: 40, veg: true, section: "Sides" },
      { n: "Masala papad", meta: "2 pc", price: 50, veg: true, section: "Sides" },
      { n: "Gulab jamun", meta: "2 pc · warm", price: 60, veg: true, section: "Sides" },
    ],
    stats: [
      { to: 35, suffix: " min", label: "Door time" },
      { to: 5, label: "Day plans" },
      { to: 100, suffix: "%", label: "Your data" },
    ],
    cta: "Order now",
  },
  {
    id: "hotel",
    category: "Food & Hospitality",
    industry: "Hotel & Guest House",
    kicker: "Rooms & stays",
    headline: "Direct bookings,",
    headlineAccent: "at your own rate.",
    blurb: "Room types and tariffs published, so a guest books without a middle party.",
    accent: "#0f766e",
    theme: "paper",
    archetype: "catalog",
    filters: ["Rooms", "Suites", "Long stay"],
    listings: [
      { title: "Deluxe double", meta: "AC · 2 beds · breakfast included", price: "₹2,400 /night", tag: "6 rooms", filter: "Rooms" },
      { title: "Standard twin", meta: "AC · work desk · city view", price: "₹1,800 /night", tag: "8 rooms", filter: "Rooms" },
      { title: "Family room", meta: "Sleeps 4 · extra bed on request", price: "₹3,200 /night", tag: "3 rooms", filter: "Rooms" },
      { title: "Executive suite", meta: "Living area · balcony", price: "₹4,800 /night", tag: "2 suites", filter: "Suites" },
      { title: "Honeymoon suite", meta: "King · decor on request", price: "₹5,600 /night", tag: "1 suite", filter: "Suites" },
      { title: "Monthly stay", meta: "Serviced · laundry · housekeeping", price: "₹32,000 /mo", tag: "Corporate", filter: "Long stay" },
      { title: "Junior suite", meta: "Sofa bed · 2 adults + 1 child", price: "₹3,900 /night", tag: "2 suites", filter: "Suites" },
      { title: "Weekly rate", meta: "7 nights · daily housekeeping", price: "₹12,600 /week", tag: "Direct only", filter: "Long stay" },
      { title: "Group block", meta: "5+ rooms · single invoice", price: "On request", tag: "Block booking", filter: "Long stay" },
    ],
    stats: [
      { to: 19, label: "Keys" },
      { to: 0, suffix: "%", label: "OTA cut" },
      { to: 24, suffix: " hr", label: "Front desk" },
    ],
    cta: "Check availability",
  },
  {
    id: "travel",
    category: "Food & Hospitality",
    industry: "Travel & Tour Agency",
    kicker: "Packages & transfers",
    headline: "Itineraries with",
    headlineAccent: "nothing hidden.",
    blurb: "Days, inclusions and what is genuinely extra — printed before anyone pays.",
    accent: "#0284c7",
    theme: "glass",
    archetype: "catalog",
    filters: ["Pilgrimage", "Hills", "Weekend"],
    listings: [
      { title: "Char Dham, 11 days", meta: "Transport · stay · darshan assist", price: "₹28,500", tag: "Group of 24", filter: "Pilgrimage" },
      { title: "Varanasi & Gaya, 4 days", meta: "AC coach · 3 star stay", price: "₹9,800", tag: "Weekly", filter: "Pilgrimage" },
      { title: "Shimla–Manali, 7 days", meta: "Volvo · sightseeing · breakfast", price: "₹18,900", tag: "Family", filter: "Hills" },
      { title: "Darjeeling, 5 days", meta: "Toy train · Tiger Hill sunrise", price: "₹15,400", tag: "Popular", filter: "Hills" },
      { title: "Netarhat, 2 days", meta: "Own vehicle · guide included", price: "₹4,200", tag: "Short break", filter: "Weekend" },
      { title: "Bodh Gaya, 2 days", meta: "Day trip option available", price: "₹3,600", tag: "Any Saturday", filter: "Weekend" },
      { title: "Vaishno Devi, 6 days", meta: "Train · stay · helicopter option", price: "₹16,200", tag: "Monthly", filter: "Pilgrimage" },
      { title: "Nainital & Mussoorie, 6 days", meta: "AC coach · lake tour", price: "₹17,600", tag: "Family", filter: "Hills" },
      { title: "Rajgir & Nalanda, 2 days", meta: "Ropeway · guide · lunch", price: "₹3,900", tag: "Any Sunday", filter: "Weekend" },
    ],
    stats: [
      { to: 14, label: "Packages" },
      { to: 24, label: "Seater coach" },
      { to: 0, label: "Hidden extras" },
    ],
    cta: "Hold seats",
  },
  {
    id: "catering",
    category: "Food & Hospitality",
    industry: "Catering Services",
    kicker: "Functions & bulk meals",
    headline: "Per plate,",
    headlineAccent: "per date, per menu.",
    blurb: "Headcount and date set the quote, and the date is either free or it isn't.",
    accent: "#ca8a04",
    theme: "bright",
    archetype: "booking",
    services: [
      { n: "Standard veg menu", meta: "2 starters · 4 mains · dessert", price: "₹380 /plate" },
      { n: "Premium menu", meta: "Live counters · 6 mains · 2 sweets", price: "₹650 /plate" },
      { n: "Breakfast & tea", meta: "Corporate · 3 items + beverage", price: "₹160 /plate" },
    ],
    days: ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed"],
    slots: ["Breakfast", "Lunch", "Hi-tea", "Dinner", "Late", "Full day"],
    stats: [
      { to: 1200, label: "Plates a day" },
      { to: 7, suffix: " day", label: "Notice" },
      { to: 14, label: "Service staff" },
    ],
    cta: "Get per-plate quote",
  },
];

/* What the "All" pill shows. Picked for spread rather than favouritism: five
   different archetypes, and the two real clients up front so the default view
   leads with work that actually shipped. */
const allPicks: RowEntry[] = [
  education[0], // Gravity Point — live
  homeLocal[0], // Phulwari — live
  businessRetail[0], // storefront
  medical[0], // booking
  food[0], // menu
];

/* The order here is the order the pills are in, so a row is one lookup. */
export const INDUSTRY_ROWS: Record<string, RowEntry[]> = {
  All: allPicks,
  "Business & Retail": businessRetail,
  "Medical & Wellness": medical,
  Education: education,
  Professional: professional,
  "Home & Local": homeLocal,
  Industrial: industrial,
  "Creative & Media": creative,
  "Food & Hospitality": food,
};
