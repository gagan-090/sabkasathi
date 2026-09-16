/*
  The solutions catalog — product types people search for by name.

  Derived from a 61,182-keyword file for Gaya, which decomposes to 84 topics
  × 504 machine permutations (6 modifiers × 14 roles × 6 suffixes: "Hire
  Video Calling App Cost in Gaya Provider"). The permutations are filler with
  no search demand and must never become pages. The *topics* are real, and
  roughly 55 of them had no page anywhere on the site.

  A solution is not a service and not an industry. "Mobile App Development"
  (service) and "Restaurants" (industry) already exist; "Zomato Clone App" is
  a third thing — a named product someone wants built, with its own screens,
  integrations and price expectation. That is why each entry below carries its
  own modules, integrations and buyer, rather than being generated from a
  pattern: a Zomato clone and a hospital management system share almost
  nothing beyond being software.

  `priceFrom` figures are the same tiers quoted elsewhere on the site; they are
  starting points for a real scope, never a fixed price for an unseen brief.
*/

export interface Solution {
  slug: string;
  /** Search-facing name, exactly as people type it. */
  name: string;
  /** Grouping for the index page and cross-links. */
  category: SolutionCategory;
  /** Other names people search for the same thing. */
  aka: string[];
  /** One sentence: what this product actually is. */
  whatItIs: string;
  /** Who commissions it — used for the "who this is for" copy. */
  buyer: string;
  /** The screens/modules that make up a realistic first version. */
  modules: string[];
  /** Third-party services it normally has to talk to. */
  integrations: string[];
  /** Build order for an MVP, in plain language. */
  mvpScope: string;
  priceFrom: string;
  timeline: string;
  /** The thing that most often goes wrong or gets underestimated. */
  watchOut: string;
}

export type SolutionCategory =
  | "On-demand & delivery"
  | "Marketplace & e-commerce"
  | "Transport & logistics"
  | "Healthcare"
  | "Education"
  | "Fintech"
  | "Real estate"
  | "Social & communication"
  | "Booking & services"
  | "Media & entertainment"
  | "Jobs & recruitment"
  | "Business software";

export const SOLUTION_CATEGORIES: SolutionCategory[] = [
  "On-demand & delivery",
  "Marketplace & e-commerce",
  "Transport & logistics",
  "Healthcare",
  "Education",
  "Fintech",
  "Real estate",
  "Social & communication",
  "Booking & services",
  "Media & entertainment",
  "Jobs & recruitment",
  "Business software",
];

export const solutions: Solution[] = [
  /* ── On-demand & delivery ─────────────────────────────────────────────── */
  {
    slug: "zomato-clone-app",
    name: "Zomato Clone App",
    category: "On-demand & delivery",
    aka: ["food ordering app like Zomato", "restaurant discovery app", "Zomato like app"],
    whatItIs:
      "A restaurant discovery and food-ordering platform with three sides — customers browsing and ordering, restaurants managing menus and accepting orders, and delivery riders picking up and dropping off.",
    buyer: "restaurant aggregators, cloud-kitchen groups and local food-delivery startups",
    modules: [
      "Customer app: search, filters, restaurant pages, cart, order tracking",
      "Restaurant panel: menu and price management, order accept/reject, timings",
      "Rider app: order assignment, pickup/drop navigation, earnings",
      "Admin panel: commissions, payouts, disputes, promo codes",
      "Ratings, reviews and reorder history",
    ],
    integrations: ["Razorpay/UPI", "Google Maps & routing", "SMS/WhatsApp order alerts", "Push notifications"],
    mvpScope:
      "Start with one city, one cuisine set and a manual rider assignment. Automated dispatch and surge logic are the second release, not the first.",
    priceFrom: "₹45,000",
    timeline: "6–10 weeks for a working three-sided MVP",
    watchOut:
      "Delivery economics, not the app, decide whether this works. Model commission and rider cost before commissioning the build.",
  },
  {
    slug: "swiggy-clone-app",
    name: "Swiggy Clone App",
    category: "On-demand & delivery",
    aka: ["food delivery app like Swiggy", "Swiggy like app", "on-demand food app"],
    whatItIs:
      "A delivery-first food ordering platform where the operator owns the rider fleet and dispatch, rather than leaving delivery to the restaurant.",
    buyer: "delivery operators, dark-kitchen chains and regional food-tech startups",
    modules: [
      "Customer app: live order tracking on map, ETA, scheduled orders",
      "Rider app with shift management and cash-collection reconciliation",
      "Dispatch dashboard: assign, reassign, monitor late orders",
      "Restaurant panel with prep-time control",
      "Admin: payouts, refunds, zone and radius settings",
    ],
    integrations: ["Payment gateway & UPI", "Live location tracking", "Route optimisation", "WhatsApp notifications"],
    mvpScope:
      "Single zone, fixed delivery radius, manual dispatch — then add auto-assignment once real order density exists.",
    priceFrom: "₹50,000",
    timeline: "7–11 weeks",
    watchOut:
      "Live tracking is the expensive part. Cheap builds fake it with periodic refreshes, which customers notice immediately.",
  },
  {
    slug: "blinkit-clone-app",
    name: "Blinkit Clone App",
    category: "On-demand & delivery",
    aka: ["quick commerce app", "10 minute delivery app", "instant grocery app"],
    whatItIs:
      "A quick-commerce grocery app built around dark stores and very short delivery promises, where inventory accuracy matters more than catalogue size.",
    buyer: "quick-commerce startups, supermarket chains and dark-store operators",
    modules: [
      "Customer app: category browse, instant search, slot-free checkout",
      "Real-time inventory per dark store",
      "Picker app for in-store order assembly",
      "Rider app with short-hop batching",
      "Admin: stock, pricing, store radius, substitutions",
    ],
    integrations: ["POS/inventory sync", "Payment gateway", "Maps & geofencing", "SMS/push alerts"],
    mvpScope:
      "One dark store, a few hundred SKUs, honest delivery windows. Sub-10-minute promises need store density you will not have on day one.",
    priceFrom: "₹55,000",
    timeline: "8–12 weeks",
    watchOut:
      "Out-of-stock handling makes or breaks retention. Decide the substitution and refund policy before development starts.",
  },
  {
    slug: "zepto-clone-app",
    name: "Zepto Clone App",
    category: "On-demand & delivery",
    aka: ["instant delivery app", "quick grocery delivery app", "10 min grocery app"],
    whatItIs:
      "An instant-delivery grocery app optimised for a small, fast-moving SKU set and very tight picking and dispatch workflows.",
    buyer: "hyperlocal grocery startups and retail chains piloting quick commerce",
    modules: [
      "Customer app with sub-minute checkout flow",
      "Micro-warehouse inventory management",
      "Picker and packer workflow with barcode scanning",
      "Rider dispatch with batching",
      "Admin: SKU velocity, wastage, zone performance",
    ],
    integrations: ["Barcode scanning", "Payment gateway & UPI", "Maps", "Inventory/ERP sync"],
    mvpScope:
      "A tight SKU list, one micro-warehouse, and honest ETAs. Expand catalogue only after picking times are stable.",
    priceFrom: "₹55,000",
    timeline: "8–12 weeks",
    watchOut:
      "Picking speed, not app speed, sets the delivery promise. Build the picker workflow before polishing the customer UI.",
  },
  {
    slug: "food-delivery-app",
    name: "Food Delivery App",
    category: "On-demand & delivery",
    aka: ["online food ordering app", "restaurant delivery app", "food ordering system"],
    whatItIs:
      "An ordering and delivery app for a single restaurant or a small group, avoiding aggregator commission on repeat customers.",
    buyer: "individual restaurants, cafe chains and cloud kitchens",
    modules: [
      "Menu with variants, add-ons and combos",
      "Cart, checkout, and order status",
      "Kitchen order screen or printed tickets",
      "Own-rider assignment or pickup-only mode",
      "Loyalty, coupons and reorder",
    ],
    integrations: ["UPI & card payments", "WhatsApp order confirmations", "Printer/KOT", "Google Maps"],
    mvpScope:
      "Menu, ordering and payment first. Delivery tracking only if you run your own riders — otherwise pickup and phone dispatch is enough.",
    priceFrom: "₹18,000",
    timeline: "3–6 weeks",
    watchOut:
      "The hard part is getting existing customers to install it. Budget for table-tent QR codes and a launch offer, not just the build.",
  },
  {
    slug: "grocery-delivery-app",
    name: "Grocery Delivery App",
    category: "On-demand & delivery",
    aka: ["kirana app", "online grocery app", "supermarket delivery app"],
    whatItIs:
      "An online storefront for a grocery or kirana business, with slot-based delivery and a catalogue that reflects real stock.",
    buyer: "kirana stores, supermarkets and regional grocery chains",
    modules: [
      "Category catalogue with weights and variants",
      "Slot-based delivery scheduling",
      "Stock management and low-stock alerts",
      "Repeat order and shopping lists",
      "Delivery staff app or route list",
    ],
    integrations: ["UPI & COD", "WhatsApp order updates", "Inventory/billing software", "SMS"],
    mvpScope:
      "Catalogue, slots and payment. Start with a delivery radius you can actually service the same day.",
    priceFrom: "₹20,000",
    timeline: "4–7 weeks",
    watchOut:
      "A catalogue that drifts from real stock is the fastest way to lose a grocery customer. Plan how stock gets updated daily.",
  },
  {
    slug: "restaurant-app",
    name: "Restaurant App",
    category: "On-demand & delivery",
    aka: ["restaurant mobile app", "cafe app", "dine-in ordering app"],
    whatItIs:
      "A branded app for a restaurant covering dine-in ordering, takeaway, table booking and loyalty in one place.",
    buyer: "restaurants, cafes, bars and small hospitality groups",
    modules: [
      "QR dine-in ordering from the table",
      "Takeaway and pre-order",
      "Table reservation",
      "Loyalty points and offers",
      "Feedback capture",
    ],
    integrations: ["POS/billing", "UPI payments", "WhatsApp", "Printer/KOT"],
    mvpScope: "QR dine-in ordering usually pays for itself first; add loyalty and reservations after.",
    priceFrom: "₹18,000",
    timeline: "3–6 weeks",
    watchOut:
      "If it does not talk to your existing billing system, staff will keep double-entering orders and quietly stop using it.",
  },

  /* ── Marketplace & e-commerce ─────────────────────────────────────────── */
  {
    slug: "ecommerce-app",
    name: "Ecommerce App",
    category: "Marketplace & e-commerce",
    aka: ["online shopping app", "online store app", "shopping mobile app"],
    whatItIs:
      "A branded shopping app for a single seller — catalogue, cart, payments, and order tracking under your own name.",
    buyer: "D2C brands, retailers and wholesalers selling direct",
    modules: [
      "Catalogue with variants, filters and search",
      "Cart, checkout and multiple payment options",
      "Order tracking and returns",
      "Wishlist, coupons and abandoned-cart nudges",
      "Admin: products, orders, stock, reports",
    ],
    integrations: ["Razorpay/UPI/cards", "Shiprocket or courier APIs", "GST invoicing", "WhatsApp & SMS"],
    mvpScope: "Catalogue, checkout and shipping first. Personalisation and recommendations are a later release.",
    priceFrom: "₹25,000",
    timeline: "4–8 weeks",
    watchOut:
      "Returns and COD reconciliation cause more support load than anything else. Design those flows before launch.",
  },
  {
    slug: "multi-vendor-marketplace",
    name: "Multi Vendor Marketplace",
    category: "Marketplace & e-commerce",
    aka: ["multi seller ecommerce", "marketplace platform", "vendor marketplace app"],
    whatItIs:
      "A marketplace where many independent sellers list and fulfil their own orders while you take a commission and control the experience.",
    buyer: "marketplace operators, trade bodies and retail groups aggregating sellers",
    modules: [
      "Seller onboarding, KYC and storefronts",
      "Per-seller catalogue and inventory",
      "Split orders across sellers in one cart",
      "Commission, settlement and payout ledger",
      "Admin: approvals, disputes, category control",
    ],
    integrations: ["Payment gateway with split settlement", "Courier aggregators", "GST invoicing per seller", "KYC"],
    mvpScope:
      "Onboard a handful of sellers manually first. Self-serve onboarding and automated payouts come once the model is proven.",
    priceFrom: "₹60,000",
    timeline: "10–16 weeks",
    watchOut:
      "Payouts are the real complexity, not the storefront. Settlement rules and dispute handling must be decided up front.",
  },
  {
    slug: "amazon-clone",
    name: "Amazon Clone",
    category: "Marketplace & e-commerce",
    aka: ["Amazon like app", "large marketplace platform", "ecommerce marketplace like Amazon"],
    whatItIs:
      "A large-catalogue marketplace with multiple sellers, warehousing concepts, and search built to handle deep product taxonomies.",
    buyer: "funded marketplace startups and large retail groups",
    modules: [
      "Deep category tree with attribute-based search",
      "Multi-seller listings on one product page",
      "Warehouse/fulfilment options",
      "Reviews, Q&A and seller ratings",
      "Commission, settlement and returns management",
    ],
    integrations: ["Search infrastructure", "Payment split settlement", "Logistics APIs", "GST invoicing"],
    mvpScope:
      "Pick two or three categories and do them properly. A shallow clone of everything ranks and converts worse than a deep niche.",
    priceFrom: "₹80,000",
    timeline: "12–20 weeks",
    watchOut:
      "Search quality is the product. Budget for it explicitly instead of assuming a database LIKE query will do.",
  },
  {
    slug: "flipkart-clone",
    name: "Flipkart Clone",
    category: "Marketplace & e-commerce",
    aka: ["Flipkart like app", "Indian marketplace app", "online marketplace platform"],
    whatItIs:
      "An India-focused marketplace with COD, regional language support and courier integrations suited to tier-2 and tier-3 delivery.",
    buyer: "regional marketplace operators and retail groups",
    modules: [
      "Seller panel with bulk catalogue upload",
      "COD with reconciliation",
      "Exchange and return workflows",
      "Offers, coupons and sale events",
      "Admin: pricing, categories, payouts",
    ],
    integrations: ["COD-capable couriers", "UPI/cards/netbanking", "GST invoicing", "SMS/WhatsApp"],
    mvpScope: "COD reconciliation from day one — it is not an add-on in the Indian market.",
    priceFrom: "₹80,000",
    timeline: "12–20 weeks",
    watchOut:
      "COD return rates can exceed 30% in some categories. The finance workflow matters as much as the storefront.",
  },
  {
    slug: "olx-clone",
    name: "OLX Clone",
    category: "Marketplace & e-commerce",
    aka: ["classified ads app", "buy sell app", "listings marketplace"],
    whatItIs:
      "A classifieds platform where users post items for sale and buyers contact them directly, with no cart or payment in the middle.",
    buyer: "classifieds operators, local media groups and community marketplaces",
    modules: [
      "Post a listing with photos and category attributes",
      "Location-based browse and search",
      "In-app chat between buyer and seller",
      "Listing moderation and spam control",
      "Featured/promoted listing payments",
    ],
    integrations: ["Image hosting & compression", "Maps/geolocation", "OTP verification", "Payments for promotions"],
    mvpScope: "Listings, search and chat. Monetisation via promoted listings comes once there is real supply.",
    priceFrom: "₹40,000",
    timeline: "6–10 weeks",
    watchOut:
      "Spam and fake listings kill classifieds fast. Moderation tooling is a launch requirement, not a nice-to-have.",
  },
  {
    slug: "b2b-marketplace",
    name: "B2B Marketplace",
    category: "Marketplace & e-commerce",
    aka: ["wholesale marketplace", "trade portal", "B2B ecommerce platform"],
    whatItIs:
      "A trade platform for business buyers, built around quotations, bulk pricing, credit terms and GST-compliant invoicing rather than retail checkout.",
    buyer: "distributors, wholesalers, manufacturers and trade associations",
    modules: [
      "Buyer verification and GST capture",
      "Request for quote and negotiated pricing",
      "Tiered/slab pricing per buyer group",
      "Credit terms and outstanding tracking",
      "Bulk ordering and repeat orders",
    ],
    integrations: ["GST invoicing", "Tally or accounting export", "Payment gateway", "Logistics"],
    mvpScope: "RFQ and price lists first. Online payment often matters less than credit tracking in B2B.",
    priceFrom: "₹60,000",
    timeline: "10–14 weeks",
    watchOut:
      "B2B buyers abandon anything slower than a phone call. The quote flow has to beat WhatsApp for speed.",
  },

  /* ── Transport & logistics ────────────────────────────────────────────── */
  {
    slug: "uber-clone-app",
    name: "Uber Clone App",
    category: "Transport & logistics",
    aka: ["ride hailing app", "taxi app like Uber", "cab aggregator app"],
    whatItIs:
      "A ride-hailing platform with rider and driver apps, live matching, fare calculation and trip tracking.",
    buyer: "taxi fleet operators and regional ride-hailing startups",
    modules: [
      "Rider app: book, track, fare estimate, rate",
      "Driver app: accept, navigate, earnings, duty toggle",
      "Matching and dispatch engine",
      "Fare rules: base, per-km, waiting, surge",
      "Admin: drivers, documents, commissions, disputes",
    ],
    integrations: ["Maps, routing & ETA", "Payment gateway & wallet", "OTP verification", "SMS/push"],
    mvpScope:
      "One city, one vehicle class, cash plus UPI. Surge pricing and pooling need volume you will not have at launch.",
    priceFrom: "₹60,000",
    timeline: "10–14 weeks",
    watchOut:
      "Driver supply is the hard problem, not the app. Onboarding and payout speed decide whether drivers stay.",
  },
  {
    slug: "rapido-clone-app",
    name: "Rapido Clone App",
    category: "Transport & logistics",
    aka: ["bike taxi app", "two wheeler ride app", "bike ride hailing app"],
    whatItIs:
      "A bike-taxi platform, structurally similar to a cab app but with shorter trips, lower fares and much tighter unit economics.",
    buyer: "bike-taxi operators and last-mile mobility startups",
    modules: [
      "Rider app with quick-book flow",
      "Captain app with helmet/document checks",
      "Short-trip fare rules",
      "Cash and UPI settlement",
      "Admin: onboarding, incentives, zones",
    ],
    integrations: ["Maps & routing", "UPI/wallet", "OTP & KYC", "Push notifications"],
    mvpScope: "Short-radius trips in one zone, cash-first. Incentive engines come later.",
    priceFrom: "₹55,000",
    timeline: "9–13 weeks",
    watchOut:
      "Bike-taxi regulation differs by state. Confirm the legal position locally before investing in the build.",
  },
  {
    slug: "cab-booking-app",
    name: "Cab Booking App",
    category: "Transport & logistics",
    aka: ["taxi booking app", "car rental booking app", "cab service app"],
    whatItIs:
      "A booking app for a taxi business with its own fleet — pre-booked and on-demand rides, without a driver marketplace.",
    buyer: "local taxi operators, travel agencies and corporate cab providers",
    modules: [
      "Instant and scheduled bookings",
      "Fleet and driver assignment",
      "Outstation and package fares",
      "Corporate accounts and monthly billing",
      "Trip history and invoices",
    ],
    integrations: ["Maps", "Payment gateway", "SMS/WhatsApp confirmations", "Invoicing"],
    mvpScope:
      "Scheduled bookings and manual assignment first — most local operators need dispatch discipline more than live matching.",
    priceFrom: "₹30,000",
    timeline: "5–9 weeks",
    watchOut:
      "Outstation fare rules are fiddly (night charges, driver allowance, return fare). Pin them down in writing early.",
  },
  {
    slug: "taxi-booking-app",
    name: "Taxi Booking App",
    category: "Transport & logistics",
    aka: ["online taxi booking", "taxi dispatch app", "local taxi app"],
    whatItIs:
      "A dispatch and booking system for taxi stands and operators, replacing phone-and-register dispatch with an app and dashboard.",
    buyer: "taxi stands, tour operators and city taxi unions",
    modules: [
      "Customer booking (app or web)",
      "Dispatcher dashboard with queue",
      "Driver app with job accept",
      "Fare and commission tracking",
      "Daily settlement reports",
    ],
    integrations: ["Maps", "UPI/cash reconciliation", "SMS alerts"],
    mvpScope: "Dispatcher dashboard plus driver app. The customer app can follow once dispatch is reliable.",
    priceFrom: "₹28,000",
    timeline: "5–8 weeks",
    watchOut:
      "Drivers who dislike the app will keep taking phone bookings. Involve them in the pilot or adoption stalls.",
  },
  {
    slug: "logistics-app",
    name: "Logistics App",
    category: "Transport & logistics",
    aka: ["transport management app", "fleet tracking app", "trucking app"],
    whatItIs:
      "A consignment and fleet management platform covering load assignment, trip tracking, proof of delivery and freight billing.",
    buyer: "transporters, fleet owners and freight brokers",
    modules: [
      "Consignment booking and LR generation",
      "Vehicle and driver assignment",
      "Trip tracking with checkpoints",
      "ePOD with photo and signature",
      "Freight billing and outstanding",
    ],
    integrations: ["GPS/telematics", "GST e-way bill", "Accounting export", "SMS/WhatsApp"],
    mvpScope: "Booking, assignment and ePOD. Live telematics only if vehicles already have trackers fitted.",
    priceFrom: "₹45,000",
    timeline: "8–12 weeks",
    watchOut:
      "Drivers with limited connectivity need the app to work offline and sync later, or the data never arrives.",
  },
  {
    slug: "courier-app",
    name: "Courier App",
    category: "Transport & logistics",
    aka: ["parcel delivery app", "courier management software", "last mile delivery app"],
    whatItIs:
      "A parcel booking and last-mile delivery system with tracking numbers, delivery runs and proof of delivery.",
    buyer: "courier companies, local delivery services and e-commerce fulfilment operators",
    modules: [
      "Parcel booking with AWB generation",
      "Barcode scan at each hub",
      "Delivery-run assignment",
      "Customer tracking page",
      "COD collection and reconciliation",
    ],
    integrations: ["Barcode/QR scanning", "SMS tracking updates", "Payment/COD reconciliation", "Maps"],
    mvpScope: "Booking, scanning and tracking. Hub-to-hub routing logic can wait until volumes justify it.",
    priceFrom: "₹35,000",
    timeline: "6–10 weeks",
    watchOut:
      "COD cash reconciliation is where courier businesses leak money. Build that ledger properly from the start.",
  },

  /* ── Healthcare ───────────────────────────────────────────────────────── */
  {
    slug: "doctor-appointment-app",
    name: "Doctor Appointment App",
    category: "Healthcare",
    aka: ["doctor booking app", "clinic appointment app", "online doctor appointment system"],
    whatItIs:
      "An appointment booking system for clinics and doctors, with slot management, reminders and patient records.",
    buyer: "clinics, polyclinics, individual practitioners and diagnostic centres",
    modules: [
      "Doctor profiles, specialities and availability",
      "Slot booking with rescheduling",
      "Patient records and visit history",
      "SMS/WhatsApp reminders",
      "Billing and receipts",
    ],
    integrations: ["WhatsApp/SMS reminders", "UPI payments", "Calendar sync"],
    mvpScope: "Slots, booking and reminders. Prescriptions and records can follow once booking is adopted.",
    priceFrom: "₹20,000",
    timeline: "4–7 weeks",
    watchOut:
      "No-shows are the actual problem being solved. Reminder timing matters more than any other feature here.",
  },
  {
    slug: "telemedicine-app",
    name: "Telemedicine App",
    category: "Healthcare",
    aka: ["online consultation app", "video doctor consultation app", "teleconsultation platform"],
    whatItIs:
      "A remote consultation platform with video calls, digital prescriptions and follow-up scheduling.",
    buyer: "clinics, hospital groups and health startups",
    modules: [
      "Video consultation with waiting room",
      "Digital prescription generation",
      "Patient history and reports upload",
      "Payment before consultation",
      "Follow-up scheduling",
    ],
    integrations: ["Video SDK", "Payment gateway", "Secure file storage", "SMS/WhatsApp"],
    mvpScope: "Booking, payment and a reliable video call. Prescription templates are the immediate second step.",
    priceFrom: "₹40,000",
    timeline: "7–11 weeks",
    watchOut:
      "Patient data carries legal obligations. Storage, consent and access control need to be settled before launch.",
  },
  {
    slug: "pharmacy-app",
    name: "Pharmacy App",
    category: "Healthcare",
    aka: ["medicine delivery app", "online pharmacy app", "chemist app"],
    whatItIs:
      "A medicine ordering and delivery app with prescription upload, stock checks and substitution handling.",
    buyer: "pharmacies, chemist chains and medicine delivery startups",
    modules: [
      "Medicine catalogue with salt search",
      "Prescription upload and verification",
      "Stock and substitute suggestions",
      "Refill reminders for chronic medication",
      "Delivery and pickup",
    ],
    integrations: ["Payment gateway", "Prescription storage", "Inventory/billing", "WhatsApp"],
    mvpScope: "Prescription upload plus manual verification. Automated salt matching comes later.",
    priceFrom: "₹28,000",
    timeline: "5–9 weeks",
    watchOut:
      "Scheduled medicines have legal dispensing rules. The verification step cannot be designed away.",
  },
  {
    slug: "hospital-management-software",
    name: "Hospital Management Software",
    category: "Healthcare",
    aka: ["HMS software", "hospital ERP", "clinic management system"],
    whatItIs:
      "An operations system covering patient registration, OPD/IPD, billing, pharmacy, lab and discharge in one place.",
    buyer: "hospitals, nursing homes and multi-speciality clinics",
    modules: [
      "Registration, OPD and IPD management",
      "Bed and ward allocation",
      "Billing with insurance/TPA handling",
      "Pharmacy and lab modules",
      "Discharge summary and reports",
    ],
    integrations: ["Lab machines/LIS where applicable", "Payment and billing", "SMS", "Accounting export"],
    mvpScope:
      "Registration, OPD and billing first. Pharmacy, lab and IPD are separate phases with their own training.",
    priceFrom: "₹80,000",
    timeline: "12–20 weeks",
    watchOut:
      "Staff training decides success far more than features. Budget for on-site rollout time, not just development.",
  },

  /* ── Education ────────────────────────────────────────────────────────── */
  {
    slug: "school-erp",
    name: "School ERP",
    category: "Education",
    aka: ["school management software", "school management system", "school administration software"],
    whatItIs:
      "A school administration system covering admissions, attendance, fees, timetable, exams and parent communication.",
    buyer: "schools, school chains and educational trusts",
    modules: [
      "Student admission and records",
      "Attendance (staff and student)",
      "Fee collection with receipts and dues",
      "Timetable and substitution",
      "Exams, marks and report cards",
      "Parent app with notices",
    ],
    integrations: ["Payment gateway for fees", "SMS/WhatsApp to parents", "Biometric attendance", "Accounting export"],
    mvpScope:
      "Fees and attendance deliver value fastest. Exams and report cards should land before the next assessment cycle.",
    priceFrom: "₹50,000",
    timeline: "8–14 weeks",
    watchOut:
      "Fee structures are more complex than they look — concessions, siblings, transport, late fines. Map them before quoting.",
  },
  {
    slug: "college-erp",
    name: "College ERP",
    category: "Education",
    aka: ["college management software", "university ERP", "campus management system"],
    whatItIs:
      "A campus system handling admissions, semester registration, credits, internal assessment, attendance and results.",
    buyer: "colleges, universities and autonomous institutions",
    modules: [
      "Admission and enrolment",
      "Semester and elective registration",
      "Credit and grade calculation",
      "Internal assessment and attendance rules",
      "Result processing and transcripts",
    ],
    integrations: ["Payment gateway", "University affiliation formats", "Email/SMS", "Document generation"],
    mvpScope: "Admissions and attendance first; result processing needs the exact regulation rules in writing.",
    priceFrom: "₹70,000",
    timeline: "10–16 weeks",
    watchOut:
      "Grading and attendance rules vary by affiliating university and change by circular. Build them as configuration, not code.",
  },
  {
    slug: "coaching-management-software",
    name: "Coaching Management Software",
    category: "Education",
    aka: ["coaching institute software", "tuition management software", "coaching centre ERP"],
    whatItIs:
      "A management system for coaching institutes covering batches, fees, attendance, tests and parent updates.",
    buyer: "coaching institutes, tuition centres and test-prep chains",
    modules: [
      "Batch and schedule management",
      "Enquiry and admission funnel",
      "Fee instalments and dues tracking",
      "Test scores and rank lists",
      "Parent/student notifications",
    ],
    integrations: ["Payment gateway", "WhatsApp/SMS", "Biometric or QR attendance"],
    mvpScope: "Enquiries, fees and batches. Test analytics follow once the basics are running.",
    priceFrom: "₹30,000",
    timeline: "5–9 weeks",
    watchOut:
      "Instalment tracking and follow-up is where most institutes lose money. Make dues visible and chaseable.",
  },
  {
    slug: "lms-development",
    name: "LMS",
    category: "Education",
    aka: ["learning management system", "online course platform", "e-learning portal"],
    whatItIs:
      "A learning platform for delivering courses — lessons, assessments, progress tracking and certificates.",
    buyer: "training companies, institutes, and businesses running internal training",
    modules: [
      "Course and lesson structure",
      "Video, PDF and quiz content",
      "Progress tracking and completion rules",
      "Assessments and certificates",
      "Instructor and learner dashboards",
    ],
    integrations: ["Video hosting/streaming", "Payment gateway", "Email notifications", "SSO where needed"],
    mvpScope: "Course delivery and progress tracking. Live classes and gamification are separate phases.",
    priceFrom: "₹35,000",
    timeline: "6–10 weeks",
    watchOut:
      "Video hosting cost scales with viewing, not signups. Pick the streaming approach with real numbers in mind.",
  },
  {
    slug: "e-learning-app",
    name: "E Learning App",
    category: "Education",
    aka: ["online education app", "study app", "learning app"],
    whatItIs:
      "A mobile-first learning app with lessons, practice questions and offline access for patchy connectivity.",
    buyer: "ed-tech startups, publishers and coaching brands",
    modules: [
      "Lesson library with downloads",
      "Practice questions and mock tests",
      "Progress and streaks",
      "Doubt submission",
      "Subscription or per-course purchase",
    ],
    integrations: ["Video streaming with DRM", "Payment/subscription", "Push notifications", "Analytics"],
    mvpScope: "One subject done well, with offline downloads. Breadth before depth kills retention here.",
    priceFrom: "₹35,000",
    timeline: "6–10 weeks",
    watchOut:
      "Content piracy is a real risk. Decide the DRM and screenshot-protection position before building the player.",
  },

  /* ── Fintech ──────────────────────────────────────────────────────────── */
  {
    slug: "fintech-app",
    name: "Fintech App",
    category: "Fintech",
    aka: ["finance app", "financial services app", "banking app"],
    whatItIs:
      "A regulated-adjacent financial product — payments, savings, lending or investment — built with audit trails and compliance in mind.",
    buyer: "fintech startups, NBFCs and financial service providers",
    modules: [
      "KYC and onboarding",
      "Account/ledger with audit trail",
      "Transactions and statements",
      "Limits, holds and reconciliation",
      "Admin with role-based access",
    ],
    integrations: ["KYC providers", "Payment/banking partner APIs", "Credit bureau where relevant", "Secure storage"],
    mvpScope:
      "The regulatory position decides the architecture. Confirm licensing or partner arrangements before development.",
    priceFrom: "₹1,00,000",
    timeline: "14–24 weeks",
    watchOut:
      "Fintech is compliance-first. A build that ignores RBI/partner requirements has to be redone, not patched.",
  },
  {
    slug: "wallet-app",
    name: "Wallet App",
    category: "Fintech",
    aka: ["digital wallet app", "prepaid wallet", "closed loop wallet"],
    whatItIs:
      "A stored-value wallet, most commonly a closed-loop wallet usable within one business or network.",
    buyer: "retail chains, campuses, transport operators and loyalty programmes",
    modules: [
      "Wallet balance and top-up",
      "Transaction history and statements",
      "Merchant/branch redemption",
      "Refunds and reversals",
      "Admin ledger and reconciliation",
    ],
    integrations: ["Payment gateway for top-up", "QR generation/scanning", "SMS/OTP"],
    mvpScope:
      "Closed-loop wallets are straightforward. Open wallets require RBI authorisation — that is a legal question first.",
    priceFrom: "₹45,000",
    timeline: "7–12 weeks",
    watchOut:
      "Every paisa must reconcile. The ledger design is the whole product; the UI is comparatively trivial.",
  },
  {
    slug: "upi-app",
    name: "UPI App",
    category: "Fintech",
    aka: ["UPI payment app", "UPI integration", "payment app"],
    whatItIs:
      "UPI collection and payout flows inside your product — usually via a PSP rather than building a UPI app from scratch.",
    buyer: "businesses collecting payments, marketplaces and billers",
    modules: [
      "UPI collect and intent flows",
      "QR generation (static and dynamic)",
      "Payment status and webhooks",
      "Refunds and settlement reports",
      "Reconciliation dashboard",
    ],
    integrations: ["Razorpay/PhonePe/Cashfree or bank PSP", "Webhook handling", "Accounting export"],
    mvpScope:
      "Integrate through a licensed PSP. Becoming a UPI app in your own right requires NPCI participation and a bank partner.",
    priceFrom: "₹15,000",
    timeline: "2–4 weeks for integration",
    watchOut:
      "Webhook reliability, not the payment UI, is what breaks. Handle retries and duplicate callbacks properly.",
  },
  {
    slug: "loan-app",
    name: "Loan App",
    category: "Fintech",
    aka: ["lending app", "loan management software", "digital lending platform"],
    whatItIs:
      "A lending workflow covering application, KYC, underwriting, disbursement, repayment schedules and collections.",
    buyer: "NBFCs, microfinance institutions and lending startups",
    modules: [
      "Application and document capture",
      "KYC and credit checks",
      "Underwriting rules and approval workflow",
      "Disbursement and repayment schedule",
      "Collections, reminders and overdue tracking",
    ],
    integrations: ["KYC and credit bureau", "Bank/NBFC disbursement APIs", "eNACH/mandates", "SMS/WhatsApp"],
    mvpScope:
      "Lending requires a licensed entity or partnership. Confirm that before any development spend.",
    priceFrom: "₹1,00,000",
    timeline: "14–22 weeks",
    watchOut:
      "Digital lending rules are strict and actively enforced. Legal review is a prerequisite, not a formality.",
  },
  {
    slug: "trading-app",
    name: "Trading App",
    category: "Fintech",
    aka: ["stock trading app", "investment app", "broking app"],
    whatItIs:
      "An investment or trading interface — typically built on a licensed broker's APIs rather than as an exchange member.",
    buyer: "brokers, wealth advisors and investment platforms",
    modules: [
      "Watchlists and market data",
      "Order placement and status",
      "Portfolio and P&L",
      "Funds add/withdraw",
      "Reports and statements",
    ],
    integrations: ["Broker/exchange APIs", "Market data feed", "KYC", "Payment/banking"],
    mvpScope: "Build on a licensed broker's API. Direct exchange membership is a different business entirely.",
    priceFrom: "₹1,00,000",
    timeline: "14–22 weeks",
    watchOut:
      "Market data licensing costs real money and has redistribution rules. Price it before designing the screens.",
  },

  /* ── Real estate ──────────────────────────────────────────────────────── */
  {
    slug: "real-estate-app",
    name: "Real Estate App",
    category: "Real estate",
    aka: ["property app", "real estate mobile app", "property listing app"],
    whatItIs:
      "A property browsing and enquiry app for builders or agencies, with listings, media and lead capture.",
    buyer: "builders, real-estate agencies and brokers",
    modules: [
      "Property listings with photos, floor plans and video",
      "Search by locality, budget and configuration",
      "Site-visit booking and enquiry capture",
      "Agent assignment and follow-up",
      "Project/inventory status",
    ],
    integrations: ["Maps", "WhatsApp/SMS lead alerts", "CRM", "Media hosting"],
    mvpScope: "Listings and lead capture. Booking and payment flows only if you actually sell online.",
    priceFrom: "₹25,000",
    timeline: "4–8 weeks",
    watchOut:
      "Lead response time decides conversion. Route enquiries to a person within minutes or the app changes nothing.",
  },
  {
    slug: "property-portal",
    name: "Property Portal",
    category: "Real estate",
    aka: ["real estate portal", "property listing website", "99acres like portal"],
    whatItIs:
      "A multi-agent property marketplace where owners, brokers and builders list, and buyers search and enquire.",
    buyer: "portal operators, broker networks and local real-estate groups",
    modules: [
      "Multi-source listings with verification",
      "Advanced search and saved alerts",
      "Broker and builder accounts",
      "Featured listing monetisation",
      "Lead distribution and tracking",
    ],
    integrations: ["Maps & locality data", "Payments for listings", "SMS/WhatsApp", "Image processing"],
    mvpScope: "Listings, search and lead routing. Verification workflow matters more than listing volume.",
    priceFrom: "₹55,000",
    timeline: "9–14 weeks",
    watchOut:
      "Stale and duplicate listings destroy trust. Plan expiry, re-verification and dedupe from the start.",
  },
  {
    slug: "housing-society-app",
    name: "Housing Society App",
    category: "Real estate",
    aka: ["apartment management app", "society management software", "RWA app"],
    whatItIs:
      "A society management app covering maintenance billing, visitor entry, complaints, notices and facility booking.",
    buyer: "apartment associations, RWAs and facility management companies",
    modules: [
      "Maintenance billing and dues",
      "Visitor and gate management",
      "Complaint/ticket tracking",
      "Notices and polls",
      "Amenity booking",
    ],
    integrations: ["Payment gateway", "SMS/WhatsApp", "Gate/intercom hardware where present", "Accounting export"],
    mvpScope: "Billing and visitor management deliver value immediately; amenities and polls can follow.",
    priceFrom: "₹25,000",
    timeline: "4–8 weeks",
    watchOut:
      "Adoption depends on the guard at the gate as much as residents. Keep the gate flow extremely simple.",
  },

  /* ── Social & communication ───────────────────────────────────────────── */
  {
    slug: "dating-app",
    name: "Dating App",
    category: "Social & communication",
    aka: ["matchmaking app", "dating platform", "social discovery app"],
    whatItIs:
      "A profile-and-match app with discovery, mutual matching, chat and safety controls.",
    buyer: "consumer app startups and community/dating operators",
    modules: [
      "Profile creation with photo verification",
      "Discovery feed and swipe/match",
      "Chat after mutual match",
      "Report, block and moderation",
      "Subscription or boosts",
    ],
    integrations: ["Push notifications", "Payment/subscription", "Image moderation", "Phone/OTP verification"],
    mvpScope: "Matching and chat, plus real moderation tooling. Launch in one city to solve the cold-start problem.",
    priceFrom: "₹45,000",
    timeline: "8–12 weeks",
    watchOut:
      "Safety and fake profiles are existential here. Verification and reporting cannot be a later release.",
  },
  {
    slug: "tinder-clone-app",
    name: "Tinder Clone App",
    category: "Social & communication",
    aka: ["swipe dating app", "Tinder like app", "match making app"],
    whatItIs:
      "A swipe-based discovery app where mutual right-swipes open a chat.",
    buyer: "dating and social startups",
    modules: [
      "Swipe deck with location and preference filters",
      "Mutual match and chat unlock",
      "Super-like/boost monetisation",
      "Photo verification",
      "Moderation and reporting",
    ],
    integrations: ["Geolocation", "Payment/subscription", "Push", "Image moderation"],
    mvpScope: "Swipe, match, chat. Recommendation tuning needs users before it means anything.",
    priceFrom: "₹45,000",
    timeline: "8–12 weeks",
    watchOut:
      "Gender ratio imbalance breaks these apps quickly. Plan seeding and moderation before marketing spend.",
  },
  {
    slug: "bumble-clone-app",
    name: "Bumble Clone App",
    category: "Social & communication",
    aka: ["women first dating app", "Bumble like app", "safe dating app"],
    whatItIs:
      "A swipe dating app with a women-message-first rule and stronger verification and safety design.",
    buyer: "dating startups positioning on safety",
    modules: [
      "Swipe and match with message-first rules",
      "Time-limited match expiry",
      "Photo/ID verification",
      "Safety tools: block, report, hide",
      "Subscription tiers",
    ],
    integrations: ["Geolocation", "Verification provider", "Payment/subscription", "Push"],
    mvpScope: "The message-first and expiry rules are the product. Get those exact before anything else.",
    priceFrom: "₹45,000",
    timeline: "8–12 weeks",
    watchOut:
      "Safety claims create real obligations. If you promise verification, it has to actually work.",
  },
  {
    slug: "matrimony-app",
    name: "Matrimony App",
    category: "Social & communication",
    aka: ["matrimonial site", "shaadi app", "marriage bureau software"],
    whatItIs:
      "A matrimonial platform with detailed profiles, family involvement, filtered search and paid contact access.",
    buyer: "matrimonial bureaus, community organisations and regional matrimony startups",
    modules: [
      "Detailed profiles (community, education, horoscope fields)",
      "Filtered search and match suggestions",
      "Interest/request workflow",
      "Paid plans to view contacts",
      "Profile verification and moderation",
    ],
    integrations: ["Payment gateway", "SMS/WhatsApp", "Document/photo verification"],
    mvpScope:
      "Profiles, search and interest flow. Community-specific fields matter more than clever algorithms here.",
    priceFrom: "₹35,000",
    timeline: "6–10 weeks",
    watchOut:
      "Privacy expectations are high — photo and contact visibility rules must be granular and obvious.",
  },
  {
    slug: "social-media-app",
    name: "Social Media App",
    category: "Social & communication",
    aka: ["social networking app", "community app", "social platform"],
    whatItIs:
      "A social platform with profiles, a feed, posting, following and engagement — usually for a specific community rather than the general public.",
    buyer: "community organisations, creator platforms and niche network startups",
    modules: [
      "Profiles and follow graph",
      "Feed with posts, images and video",
      "Likes, comments and shares",
      "Notifications",
      "Moderation and reporting",
    ],
    integrations: ["Media storage/CDN", "Push notifications", "Content moderation", "Analytics"],
    mvpScope: "Pick one community and one core interaction. General-purpose social networks do not start from zero.",
    priceFrom: "₹50,000",
    timeline: "9–14 weeks",
    watchOut:
      "Media storage and moderation are ongoing costs that scale with usage, not one-off build items.",
  },
  {
    slug: "chat-app",
    name: "Chat App",
    category: "Social & communication",
    aka: ["messaging app", "WhatsApp like app", "instant messaging app"],
    whatItIs:
      "A real-time messaging app with one-to-one and group chat, media sharing and delivery/read state.",
    buyer: "businesses needing internal or customer messaging, and community platforms",
    modules: [
      "One-to-one and group chat",
      "Media and document sharing",
      "Delivery and read receipts",
      "Push notifications and unread counts",
      "Search and history",
    ],
    integrations: ["Realtime infrastructure", "Media storage", "Push notifications", "Optional encryption"],
    mvpScope: "Reliable delivery and ordering first. Fancy features mean nothing if messages arrive out of order.",
    priceFrom: "₹35,000",
    timeline: "6–10 weeks",
    watchOut:
      "Offline delivery and message ordering are the genuinely hard parts. Do not underestimate them.",
  },
  {
    slug: "video-calling-app",
    name: "Video Calling App",
    category: "Social & communication",
    aka: ["video conferencing app", "video chat app", "online meeting app"],
    whatItIs:
      "A real-time video calling product — one-to-one or group — usually built on an established WebRTC platform.",
    buyer: "healthcare, education and consulting businesses needing calls inside their own product",
    modules: [
      "One-to-one and group video calls",
      "Screen sharing and chat",
      "Waiting room and host controls",
      "Recording where required",
      "Call quality fallback",
    ],
    integrations: ["WebRTC platform (Agora/Twilio/LiveKit)", "Push for incoming calls", "Storage for recordings"],
    mvpScope:
      "Use a managed video SDK. Building media servers from scratch is rarely justified for a first product.",
    priceFrom: "₹35,000",
    timeline: "5–9 weeks",
    watchOut:
      "Per-minute SDK costs scale with usage. Model them before launch or the unit economics surprise you.",
  },

  /* ── Booking & services ───────────────────────────────────────────────── */
  {
    slug: "salon-booking-app",
    name: "Salon Booking App",
    category: "Booking & services",
    aka: ["salon appointment app", "spa booking app", "beauty parlour app"],
    whatItIs:
      "An appointment app for salons and spas with stylist-wise slots, service menus and reminders.",
    buyer: "salons, spas, barbershops and beauty chains",
    modules: [
      "Service menu with durations and prices",
      "Stylist-wise availability and slots",
      "Booking, rescheduling and cancellation",
      "Reminders and no-show handling",
      "Loyalty and packages",
    ],
    integrations: ["UPI/payments", "WhatsApp/SMS reminders", "POS/billing"],
    mvpScope: "Slots and reminders first; packages and memberships once bookings are steady.",
    priceFrom: "₹18,000",
    timeline: "3–6 weeks",
    watchOut:
      "Service durations vary by stylist and customer. Fixed slot lengths cause double-booking complaints.",
  },
  {
    slug: "service-booking-app",
    name: "Service Booking App",
    category: "Booking & services",
    aka: ["appointment booking app", "booking system", "online booking app"],
    whatItIs:
      "A general appointment and booking system for any service business with staff, slots and payments.",
    buyer: "clinics, studios, tutors, consultants and repair services",
    modules: [
      "Service catalogue and durations",
      "Staff/resource availability",
      "Online booking with payment or deposit",
      "Reminders and rescheduling",
      "Reports on utilisation",
    ],
    integrations: ["Payment gateway", "Calendar sync", "WhatsApp/SMS"],
    mvpScope: "Booking and reminders. Deposits reduce no-shows and are worth including early.",
    priceFrom: "₹18,000",
    timeline: "3–6 weeks",
    watchOut:
      "Timezone and double-booking bugs are the classic failure. Get the availability model right first.",
  },
  {
    slug: "home-services-app",
    name: "Home Services App",
    category: "Booking & services",
    aka: ["Urban Company clone", "handyman app", "home repair booking app"],
    whatItIs:
      "A marketplace connecting customers with vetted home-service professionals — cleaning, repairs, salon-at-home — with scheduling and payment.",
    buyer: "home-services startups and facility/service aggregators",
    modules: [
      "Service catalogue with fixed-price packages",
      "Professional onboarding and verification",
      "Slot booking and job assignment",
      "Professional app with job flow and checklist",
      "Payments, commission and ratings",
    ],
    integrations: ["Payment gateway", "Maps", "KYC/verification", "WhatsApp/SMS"],
    mvpScope: "One or two service categories in one city, with manual assignment while supply is thin.",
    priceFrom: "₹50,000",
    timeline: "9–13 weeks",
    watchOut:
      "Quality control is the brand. Vetting, checklists and a redo policy matter more than app features.",
  },
  {
    slug: "hotel-booking-app",
    name: "Hotel Booking App",
    category: "Booking & services",
    aka: ["hotel reservation system", "room booking app", "OYO like app"],
    whatItIs:
      "A room booking system with availability, rates, and direct reservations that avoid OTA commission.",
    buyer: "hotels, resorts, homestays and small hotel groups",
    modules: [
      "Room types, rates and availability calendar",
      "Direct booking with payment or pay-at-hotel",
      "Seasonal and dynamic pricing",
      "Booking management and cancellations",
      "Guest communication",
    ],
    integrations: ["Payment gateway", "Channel manager/OTA sync", "Email/SMS confirmations"],
    mvpScope: "Direct booking with accurate availability. Channel-manager sync is the key second step.",
    priceFrom: "₹28,000",
    timeline: "5–9 weeks",
    watchOut:
      "Overbooking between your site and OTAs is the classic failure. Sync availability or restrict inventory.",
  },
  {
    slug: "travel-portal",
    name: "Travel Portal",
    category: "Booking & services",
    aka: ["travel booking website", "tour package portal", "travel agency software"],
    whatItIs:
      "A booking portal for tour packages, hotels and transport, with itineraries, quotations and payments.",
    buyer: "travel agencies, tour operators and DMCs",
    modules: [
      "Package builder with day-wise itinerary",
      "Quotation generation and versioning",
      "Booking with advance/part payment",
      "Supplier and voucher management",
      "Customer documents and vouchers",
    ],
    integrations: ["Payment gateway", "Supplier/GDS APIs where used", "PDF generation", "WhatsApp"],
    mvpScope: "Quotations and itineraries first — that is where agency time actually goes.",
    priceFrom: "₹35,000",
    timeline: "6–10 weeks",
    watchOut:
      "Live inventory APIs are expensive and contract-bound. Most agencies do better with managed packages.",
  },
  {
    slug: "flight-booking-app",
    name: "Flight Booking App",
    category: "Booking & services",
    aka: ["air ticket booking app", "flight reservation system", "airline booking portal"],
    whatItIs:
      "A flight search and ticketing interface built on a GDS or consolidator API, with fare rules and ticket issuance.",
    buyer: "travel agencies and OTA startups",
    modules: [
      "Flight search with filters",
      "Fare rules and baggage display",
      "Passenger details and seat/meal selection",
      "Payment and ticket issuance",
      "Cancellation and refund workflow",
    ],
    integrations: ["GDS/consolidator API (Amadeus, TBO etc.)", "Payment gateway", "Email/SMS ticketing"],
    mvpScope:
      "API access and commercial terms come first — the integration partner determines what is possible.",
    priceFrom: "₹60,000",
    timeline: "10–16 weeks",
    watchOut:
      "Cancellation and refund handling is where support costs live. Design it before launch, not after complaints.",
  },

  /* ── Media & entertainment ────────────────────────────────────────────── */
  {
    slug: "ott-app",
    name: "OTT App",
    category: "Media & entertainment",
    aka: ["streaming platform", "video on demand app", "OTT platform development"],
    whatItIs:
      "A subscription video platform with a content library, playback across devices, and content protection.",
    buyer: "production houses, regional content owners and media startups",
    modules: [
      "Content library with categories and search",
      "Adaptive streaming playback",
      "Subscription plans and entitlements",
      "Watchlist and continue-watching",
      "Multi-device support",
    ],
    integrations: ["Video encoding & CDN", "DRM", "Payment/subscription", "Analytics"],
    mvpScope: "Web plus Android first. TV apps have their own review cycles and should be a later phase.",
    priceFrom: "₹80,000",
    timeline: "12–18 weeks",
    watchOut:
      "Streaming bandwidth and DRM are recurring costs that scale with viewers. Model them before committing.",
  },
  {
    slug: "video-streaming-app",
    name: "Video Streaming App",
    category: "Media & entertainment",
    aka: ["live streaming app", "video app", "streaming platform development"],
    whatItIs:
      "A video platform for live or recorded content, with playback, and optionally live chat and monetisation.",
    buyer: "creators, education platforms, events companies and media businesses",
    modules: [
      "Live and recorded video playback",
      "Streaming ingest for live events",
      "Live chat/reactions",
      "Subscriptions or pay-per-view",
      "Creator dashboard",
    ],
    integrations: ["Streaming infrastructure", "CDN", "Payment", "Push notifications"],
    mvpScope: "Use managed streaming infrastructure. Self-hosting media servers is rarely worth it initially.",
    priceFrom: "₹55,000",
    timeline: "9–14 weeks",
    watchOut:
      "Live streaming failures are public and unforgiving. Test at realistic concurrency before any launch event.",
  },
  {
    slug: "music-streaming-app",
    name: "Music Streaming App",
    category: "Media & entertainment",
    aka: ["audio streaming app", "music app", "podcast app"],
    whatItIs:
      "An audio streaming app with a catalogue, playlists, offline downloads and background playback.",
    buyer: "labels, regional music catalogues and audio startups",
    modules: [
      "Audio catalogue with artists and albums",
      "Playlists and library",
      "Background and offline playback",
      "Subscription or ad-supported tiers",
      "Recommendations",
    ],
    integrations: ["Audio hosting/CDN", "DRM/licensing controls", "Payment", "Analytics"],
    mvpScope: "Playback reliability and offline downloads first. Recommendation quality needs listening data.",
    priceFrom: "₹55,000",
    timeline: "9–14 weeks",
    watchOut:
      "Music licensing is the gating factor, not the app. Secure rights before building the catalogue.",
  },
  {
    slug: "fantasy-sports-app",
    name: "Fantasy Sports App",
    category: "Media & entertainment",
    aka: ["Dream11 clone", "fantasy cricket app", "fantasy league app"],
    whatItIs:
      "A fantasy sports platform with contests, team selection, live scoring and prize distribution.",
    buyer: "sports and gaming startups",
    modules: [
      "Match listings and contest creation",
      "Team selection with credit budget",
      "Live scoring and leaderboards",
      "Wallet, entry fees and payouts",
      "KYC and responsible-play controls",
    ],
    integrations: ["Live sports data feed", "Payment gateway & payouts", "KYC", "Push notifications"],
    mvpScope:
      "The legal position varies by state and is actively litigated. Get legal advice before any build spend.",
    priceFrom: "₹90,000",
    timeline: "12–20 weeks",
    watchOut:
      "Real-money gaming is restricted or banned in several Indian states. This is a legal question first, technical second.",
  },
  {
    slug: "cricket-app",
    name: "Cricket App",
    category: "Media & entertainment",
    aka: ["live cricket score app", "cricket scoring app", "sports score app"],
    whatItIs:
      "A cricket scores and coverage app — live scores, commentary and statistics, or a scoring tool for local matches.",
    buyer: "sports media, local leagues and cricket associations",
    modules: [
      "Live score display and ball-by-ball",
      "Match schedules and results",
      "Player and team statistics",
      "Local match scoring interface",
      "Notifications for followed teams",
    ],
    integrations: ["Sports data feed or manual scoring input", "Push notifications", "Analytics"],
    mvpScope:
      "For local leagues, the manual scoring tool is the product. Licensed live data for major matches costs real money.",
    priceFrom: "₹30,000",
    timeline: "5–9 weeks",
    watchOut:
      "Official match data is licensed. Scraping it is both fragile and legally risky.",
  },
  {
    slug: "tournament-software",
    name: "Tournament Software",
    category: "Media & entertainment",
    aka: ["tournament management system", "league management software", "sports event software"],
    whatItIs:
      "A tournament organiser's system covering registration, fixtures, scoring, standings and results publishing.",
    buyer: "sports academies, leagues, schools and event organisers",
    modules: [
      "Team/player registration and fees",
      "Fixture generation (knockout, league, group)",
      "Score entry and standings",
      "Public results page",
      "Certificates and reports",
    ],
    integrations: ["Payment for registration", "PDF/certificate generation", "SMS/WhatsApp"],
    mvpScope: "Registration and fixtures. Live scoring can be added per sport once the core works.",
    priceFrom: "₹25,000",
    timeline: "4–8 weeks",
    watchOut:
      "Fixture rules differ by sport and format. Confirm the exact tournament structure before building the generator.",
  },

  /* ── Jobs & recruitment ───────────────────────────────────────────────── */
  {
    slug: "job-portal",
    name: "Job Portal",
    category: "Jobs & recruitment",
    aka: ["job board", "recruitment portal", "naukri like portal"],
    whatItIs:
      "A job marketplace where employers post vacancies and candidates apply, with search, filters and application tracking.",
    buyer: "recruitment agencies, job-board operators and industry bodies",
    modules: [
      "Employer accounts and job posting",
      "Candidate profiles and resume upload",
      "Search and filtering by role, location, salary",
      "Application tracking for both sides",
      "Paid job promotion",
    ],
    integrations: ["Resume parsing", "Payment for postings", "Email/SMS alerts", "File storage"],
    mvpScope: "Posting, search and apply. Resume parsing and matching are the second phase.",
    priceFrom: "₹40,000",
    timeline: "7–11 weeks",
    watchOut:
      "Job boards face a two-sided cold start. Seed with real vacancies before opening to candidates.",
  },
  {
    slug: "recruitment-software",
    name: "Recruitment Software",
    category: "Jobs & recruitment",
    aka: ["ATS", "applicant tracking system", "hiring software"],
    whatItIs:
      "An applicant tracking system managing candidates through sourcing, screening, interviews and offers.",
    buyer: "staffing agencies and companies hiring at volume",
    modules: [
      "Candidate database with resume parsing",
      "Pipeline stages and status",
      "Interview scheduling and feedback",
      "Offer and onboarding handoff",
      "Reports on time-to-hire and source",
    ],
    integrations: ["Email/calendar sync", "Resume parsing", "Job board posting", "HRMS handoff"],
    mvpScope: "Pipeline and scheduling. Reporting matters once there is enough hiring data to read.",
    priceFrom: "₹40,000",
    timeline: "7–11 weeks",
    watchOut:
      "Recruiters abandon tools that add clicks. Bulk actions and email integration are not optional.",
  },
  {
    slug: "freelancer-marketplace",
    name: "Freelancer Marketplace",
    category: "Jobs & recruitment",
    aka: ["Upwork clone", "freelance platform", "gig marketplace"],
    whatItIs:
      "A marketplace matching clients with freelancers, including proposals, milestones, escrow-style payments and reviews.",
    buyer: "marketplace startups and industry-specific talent networks",
    modules: [
      "Freelancer profiles and portfolios",
      "Job posting and proposals",
      "Milestones and payment release",
      "Messaging and file sharing",
      "Ratings and dispute handling",
    ],
    integrations: ["Payment gateway with hold/release", "KYC", "File storage", "Notifications"],
    mvpScope: "Proposals and milestone payments. Escrow mechanics need clear legal and payment-partner terms.",
    priceFrom: "₹55,000",
    timeline: "9–14 weeks",
    watchOut:
      "Users transacting off-platform is the core threat. Payment protection has to be genuinely worth the fee.",
  },

  /* ── Business software & AI ───────────────────────────────────────────── */
  {
    slug: "startup-mvp-development",
    name: "Startup MVP",
    category: "Business software",
    aka: ["MVP development", "minimum viable product", "prototype development"],
    whatItIs:
      "A deliberately minimal first version of a product, built to test whether the core idea works before larger investment.",
    buyer: "founders, and businesses validating a new line before committing budget",
    modules: [
      "One core user journey, end to end",
      "The minimum admin needed to operate it",
      "Analytics to measure whether it works",
      "Payments only if the test requires them",
      "Deliberately deferred: settings, roles, edge cases",
    ],
    integrations: ["Analytics", "Payment (only if central to the test)", "Email/WhatsApp"],
    mvpScope:
      "Pick the single riskiest assumption and build only what tests it. Everything else is postponed on purpose.",
    priceFrom: "₹35,000",
    timeline: "4–8 weeks",
    watchOut:
      "The common failure is an MVP that is not minimal. Cut scope hard or it becomes a slow v1.",
  },
  {
    slug: "ai-agent-development",
    name: "AI Agent",
    category: "Business software",
    aka: ["AI automation agent", "autonomous agent", "AI assistant development"],
    whatItIs:
      "A task-performing AI system that uses your tools and data to complete work — answering with your content, updating records or triggering actions.",
    buyer: "businesses automating support, operations or repetitive back-office work",
    modules: [
      "Knowledge base ingestion from your documents and data",
      "Tool/function calling into your systems",
      "Conversation memory and context handling",
      "Human handoff and escalation",
      "Logging, evaluation and guardrails",
    ],
    integrations: ["LLM provider APIs", "Your CRM/database", "WhatsApp/web chat", "Vector search"],
    mvpScope:
      "Start with one narrow task and a human check. Broad autonomy without evaluation is how these fail publicly.",
    priceFrom: "₹40,000",
    timeline: "5–10 weeks",
    watchOut:
      "Per-token cost scales with usage. Model the monthly bill at real volume before committing to a design.",
  },
  {
    slug: "voice-ai-agent",
    name: "Voice AI Agent",
    category: "Business software",
    aka: ["AI calling agent", "voice bot", "IVR AI assistant"],
    whatItIs:
      "A speech-based assistant that answers or makes calls — handling enquiries, bookings or reminders in natural conversation.",
    buyer: "clinics, service businesses and call-heavy operations",
    modules: [
      "Speech-to-text and text-to-speech",
      "Conversation flow with interruption handling",
      "Booking/lookup against your systems",
      "Human transfer on failure",
      "Call recordings and transcripts",
    ],
    integrations: ["Telephony provider", "Speech and LLM APIs", "Your booking/CRM system"],
    mvpScope:
      "One call type — appointment booking or status enquiry — done reliably, with fast fallback to a person.",
    priceFrom: "₹50,000",
    timeline: "6–12 weeks",
    watchOut:
      "Latency ruins voice. Anything over about a second of silence and callers hang up or talk over it.",
  },
  {
    slug: "whatsapp-bot-development",
    name: "WhatsApp Bot",
    category: "Business software",
    aka: ["WhatsApp chatbot", "WhatsApp Business API integration", "WhatsApp automation"],
    whatItIs:
      "An automated WhatsApp assistant on the official Business API — answering questions, capturing leads, sending updates and taking orders.",
    buyer: "any business whose customers already message on WhatsApp",
    modules: [
      "Automated replies and menu flows",
      "Lead capture into your CRM",
      "Order or booking taking",
      "Template messages for updates",
      "Human handoff to an agent inbox",
    ],
    integrations: ["WhatsApp Business API via a BSP", "Your CRM/database", "Payment links"],
    mvpScope:
      "Start with FAQs and lead capture. Business verification and template approval take time — begin those early.",
    priceFrom: "₹20,000",
    timeline: "2–5 weeks",
    watchOut:
      "Meta charges per conversation and template messages need pre-approval. Both shape what is worth automating.",
  },
  {
    slug: "openai-integration",
    name: "OpenAI Integration",
    category: "Business software",
    aka: ["ChatGPT integration", "LLM integration", "GPT API integration"],
    whatItIs:
      "Adding language-model capability to an existing product — summarising, drafting, classifying or answering from your own content.",
    buyer: "software products and businesses adding AI features to what they already run",
    modules: [
      "Retrieval over your own documents",
      "Prompt design and output validation",
      "Streaming responses in your UI",
      "Cost controls and rate limiting",
      "Evaluation against real examples",
    ],
    integrations: ["LLM provider APIs", "Vector database", "Your existing application"],
    mvpScope: "One feature, measured against real examples, with a cost ceiling in place from day one.",
    priceFrom: "₹25,000",
    timeline: "3–6 weeks",
    watchOut:
      "Without output validation, models produce confident wrong answers. Decide what gets checked before shipping.",
  },
];

export const solutionBySlug = new Map(solutions.map((s) => [s.slug, s]));

export const solutionsByCategory = SOLUTION_CATEGORIES.map((category) => ({
  category,
  items: solutions.filter((s) => s.category === category),
})).filter((g) => g.items.length > 0);

export const solutionStats = {
  count: solutions.length,
  categoryCount: solutionsByCategory.length,
};
