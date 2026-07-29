export interface DetailedContent {
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  longDescription: string;
  features: string[];
  benefits: string[];
  technologies?: string[];
  deliverable?: string;
  gradient?: string;
}

export const processContent: Record<string, DetailedContent> = {
  discovery: {
    slug: "discovery",
    title: "Discovery Phase",
    subtitle: "Requirement Analysis & Feasibility",
    icon: "Brain",
    description: "Deep dive into your business goals, target audience, and project feasibility.",
    longDescription: "The Discovery phase is the most critical part of our journey. It's where we move from a vague idea to a concrete technical roadmap. We conduct stakeholder interviews, analyze market competitors, and define the 'Minimum Viable Product' (MVP) that will bring maximum value to your business in the shortest time. We don't just ask what you want; we ask why you want it, ensuring every feature serves a business purpose.",
    features: [
      "Stakeholder Interview Sessions",
      "Competitive Market Analysis",
      "User Persona Development",
      "Technical Feasibility Study",
      "Budget & Timeline Estimation"
    ],
    benefits: [
      "Eliminate project ambiguity",
      "Reduce long-term development costs",
      "Align business goals with technical strategy",
      "Identify potential risks early"
    ],
    technologies: ["Miro", "FigJam", "Jira", "Confluence"],
    deliverable: "Software Requirement Specification (SRS) Document",
    gradient: "from-blue-600 to-amber-500"
  },
  strategy: {
    slug: "strategy",
    title: "Strategy & Planning",
    subtitle: "Architecture & SEO Roadmap",
    icon: "PuzzleIcon",
    description: "Mapping the technical architecture and growth strategy for your product.",
    longDescription: "Strategic planning ensures your software is built to scale. We define the sitemap, choose the right technology stack (like Next.js vs. React), and map out the internal logic of the system. This phase also includes an 'SEO Roadmap'—planning the site's structure so it ranks on Google from Day 1. We treat your software not just as a code repository, but as a business growth engine.",
    features: [
      "High-level System Architecture",
      "Database Schema Mapping",
      "SEO Keyword & Structure Strategy",
      "Content Strategy Planning",
      "Phased Development Roadmap"
    ],
    benefits: [
      "Scale-ready application structure",
      "Pre-optimized search engine presence",
      "Clear technical milestones",
      "Efficient resource allocation"
    ],
    technologies: ["Next.js", "Prisma", "Lucidchart", "Ahrefs"],
    deliverable: "Technical Project Roadmap & Architecture Plan",
    gradient: "from-orange-600 to-pink-500"
  },
  "ui-ux": {
    slug: "ui-ux",
    title: "UI/UX Design",
    subtitle: "High-Fidelity Visual Identity",
    icon: "Palette",
    description: "Creating premium, intuitive user interfaces that convert users into loyal customers.",
    longDescription: "Design is more than just aesthetics; it's about the feeling of using your product. We follow a 'Mobile-First' approach, ensuring that your software looks stunning on every device. Our UI/UX designers create high-fidelity prototypes that allow you to virtually 'walk through' your app before we write a single line of code. We focus on accessibility, speed, and conversion-optimized layouts.",
    features: [
      "Interactive Wireframes",
      "Custom UI Design System",
      "User Journey Mapping",
      "Prototyping & Flow Analysis",
      "Accessibility (WCAG) Compliance"
    ],
    benefits: [
      "Higher user engagement & retention",
      "Reduced user friction and training time",
      "Premium brand perception",
      "Intuitive navigation patterns"
    ],
    technologies: ["Figma", "Adobe XD", "Spline (3D)", "Framer"],
    deliverable: "Interactive Figma High-Fidelity Prototype",
    gradient: "from-orange-600 to-amber-600"
  },
  frontend: {
    slug: "frontend",
    title: "Frontend Development",
    subtitle: "Interactive & Fast User Interface",
    icon: "MonitorSmartphone",
    description: "Building ultra-fast, responsive interactive UIs with modern tech stacks.",
    longDescription: "We use Next.js—the gold standard of React frameworks—to build your frontend. This ensures your site is blazingly fast and SEO-friendly out of the box. Our frontend development focuses on 'UX Polish'—adding those subtle animations and micro-interactions that make your software feel like a premium product. We don't just build pages; we build experiences that load instantly and perform flawlessly.",
    features: [
      "Next.js App Router Architecture",
      "Server-Side Rendering (SSR)",
      "Dynamic Framer Motion Animations",
      "Responsive Layouts (All Devices)",
      "Performance Optimization (Lighthouse Core Web Vitals)"
    ],
    benefits: [
      "Instant page load speeds",
      "Perfect SEO performance",
      "Fluid, app-like interactions",
      "Secure and maintainable code"
    ],
    technologies: ["Next.js 15", "Tailwind CSS", "TypeScript", "Framer Motion"],
    deliverable: "Live Production-Grade UI",
    gradient: "from-emerald-500 to-teal-400"
  },
  backend: {
    slug: "backend",
    title: "Backend Development",
    subtitle: "Robust Systems & Secure Data",
    icon: "Wrench",
    description: "Architecting secure APIs and scalable database systems for high-traffic apps.",
    longDescription: "The backend is the engine of your application. We build robust, scalable server-side logic using Node.js and modern database systems like MongoDB or PostgreSQL. Security is our top priority—we implement advanced authentication systems, data encryption, and rate limiting to keep your business data safe. Our backends are designed to handle thousands of concurrent users without breaking a sweat.",
    features: [
      "Scalable API Architecture",
      "Secure Database Design",
      "OAuth & JWT Authentication",
      "Real-time Data Processing",
      "Serverless Functions & Edge Logic"
    ],
    benefits: [
      "Military-grade data security",
      "Seamless data management",
      "Unlimited horizontal scaling",
      "99.9% application uptime"
    ],
    technologies: ["Node.js", "MongoDB", "PostgreSQL", "tRPC"],
    deliverable: "Full-Stack Logical Infrastructure",
    gradient: "from-slate-700 to-slate-900"
  },
  integration: {
    slug: "integration",
    title: "System Integration",
    subtitle: "Unified Business Ecosystem",
    icon: "Link2",
    description: "Connecting your software with payments, emails, and third-party tools.",
    longDescription: "No software exists in a vacuum. We specialize in connecting your application to the tools your business already uses. From Razorpay/Stripe for payments to SendGrid for automated emails and AWS for storage, we handle all API integrations. We ensure that data flows seamlessly between your new platform and your existing business workflow, creating a unified ecosystem.",
    features: [
      "Payment Gateway Integration",
      "Third-Party API Connections",
      "Automated Email/SMS Systems",
      "External CRM Syncing",
      "Cloud Storage (AWS/S3) Setup"
    ],
    benefits: [
      "Automated revenue collection",
      "Reduced manual data entry",
      "Enhanced communication flows",
      "Centralized business operations"
    ],
    technologies: ["Razorpay", "Stripe", "AWS", "Twilio", "Zapier"],
    deliverable: "Fully Connected & Automated Ecosystem",
    gradient: "from-cyan-500 to-blue-600"
  },
  testing: {
    slug: "testing",
    title: "Testing & QA",
    subtitle: "Zero-Bugs Quality Guarantee",
    icon: "FlaskConical",
    description: "Rigorous automated and manual testing to ensure rock-solid stability.",
    longDescription: "We don't launch software; we launch polished products. Our Quality Assurance (QA) team runs your application through hundreds of test cases. We perform Unit Testing for code logic, Integration Testing for APIs, and User Acceptance Testing (UAT) to see how real people use the product. We also run stress tests to ensure the application stays fast even under heavy load.",
    features: [
      "Automated Unit & Integration Tests",
      "Cross-Browser Compatibility Testing",
      "Mobile Device Testing",
      "Security Audits & Pen-Testing",
      "Load & Stress Performance Testing"
    ],
    benefits: [
      "Bugs-free user experience",
      "Consistent performance across browsers",
      "Verified data security",
      "High customer confidence"
    ],
    technologies: ["Jest", "Cypress", "Playwright", "Sentry"],
    deliverable: "QA Audit Report & Stable Build",
    gradient: "from-amber-600 to-orange-500"
  },
  deployment: {
    slug: "deployment",
    title: "CI/CD & Deployment",
    subtitle: "Secure Cloud Launch",
    icon: "Rocket",
    description: "Launching your product on high-performance cloud servers with CI/CD.",
    longDescription: "Deployment is an art. We set up professional CI/CD (Continuous Integration / Continuous Deployment) pipelines so that your software can be updated instantly without downtime. We deploy on premium cloud providers like Vercel, AWS, or DigitalOcean, ensuring your app is served from the nearest server to your user. We also handle SSL certificates, domain configuration, and CDN setup.",
    features: [
      "Cloud Infrastructure Setup",
      "CI/CD Pipeline Configuration",
      "SSL & Security Certification",
      "CDN & Caching Strategy",
      "Server Monitoring & Logging"
    ],
    benefits: [
      "Global low-latency delivery",
      "Zero-downtime updates",
      "Highly secure hosting environment",
      "Real-time health monitoring"
    ],
    technologies: ["AWS", "Vercel", "Docker", "GitHub Actions"],
    deliverable: "Live, Publicly Accessible Product",
    gradient: "from-sky-500 to-blue-400"
  },
  "crm-system": {
    slug: "crm-system",
    title: "CRM & Automation",
    subtitle: "The Business Growth Engine",
    icon: "BarChart3",
    description: "Custom admin dashboards and automation tools to manage leads and revenue.",
    longDescription: "This is our 'Special Sauce'. Most agencies build a site and stop. We build a built-in CRM (Customer Relationship Management) system that allows you to manage your entire business from a single dashboard. Track leads, automate customer follow-ups, and see real-time revenue analytics. We turn your software into a 24/7 salesperson that never sleeps.",
    features: [
      "Custom Admin Dashboard",
      "Lead Management System",
      "Automated WhatsApp/Email Workflows",
      "Revenue Analytics & Visuals",
      "Role-Based Access Control"
    ],
    benefits: [
      "Drastic increase in lead conversion",
      "Full transparency into business data",
      "Reduced administrative overhead",
      "Data-driven decision making"
    ],
    technologies: ["Next.js", "Chart.js", "React Query", "Tailwind"],
    deliverable: "Custom CRM & Business Hub",
    gradient: "from-orange-700 to-amber-700"
  },
  maintenance: {
    slug: "maintenance",
    title: "Maintenance & Scaling",
    subtitle: "Long-term Partnership",
    icon: "RefreshCw",
    description: "Ongoing support, security updates, and scaling your app as you grow.",
    longDescription: "Technology evolves, and so should your software. Our relationship doesn't end at launch. We provide ongoing maintenance to ensure your site stays up-to-date with the latest security patches. As your user base grows, we help you scale your infrastructure to handle the traffic. We are your long-term technology partner, here to help you upgrade and add new features whenever needed.",
    features: [
      "Monthly Security Audits",
      "Infrastructure Scaling Support",
      "Performance Tune-ups",
      "New Feature Development",
      "Priority Technical Support"
    ],
    benefits: [
      "Future-proof application",
      "No technical debt buildup",
      "Peace of mind with 24/7 monitoring",
      "Scalable as business expands"
    ],
    technologies: ["New Relic", "Sentry", "Cloudwatch", "Kubernetes"],
    deliverable: "Ongoing Support & Growth Strategy",
    gradient: "from-emerald-600 to-green-500"
  }
};

export const expertiseContent: Record<string, DetailedContent> = {
  "web-development": {
    slug: "web-development",
    title: "Website Development",
    subtitle: "High-Performance Business Websites",
    icon: "Globe",
    description: "Custom React and Next.js websites tailored for rapid business scaling.",
    longDescription: "We build web applications that are as fast as they are beautiful. Using the latest technologies like Next.js 15, we ensure your site is optimized for speed, SEO, and user experience. Whether it's a simple landing page or a complex SaaS platform, we deliver clean code and premium designs.",
    features: [
      "Custom Component Architecture",
      "Full On-Page SEO Optimization",
      "Responsive & Mobile-First Layout",
      "CMS & Headless Integrations"
    ],
    benefits: [
      "Instant Page Load Speeds",
      "Superior Google Search Rankings",
      "High Conversion Rates"
    ],
    technologies: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "Node.js"],
    gradient: "from-blue-600 to-amber-500"
  },
  "mobile-app": {
    slug: "mobile-app",
    title: "Mobile App Development",
    subtitle: "Cross-Platform Mobile Apps",
    icon: "Smartphone",
    description: "Cross-platform iOS and Android apps using React Native and Flutter.",
    longDescription: "Get your business into your customers' pockets. We build mobile apps using React Native or Flutter, providing a native look and feel on both iOS and Android with a single codebase. Focus on performance and smooth animations.",
    features: [
      "Cross-Platform Codebase",
      "Native Device Features Access",
      "Push Notifications System",
      "App Store & Play Store Deployment"
    ],
    benefits: [
      "Reach iOS and Android Customers",
      "Consistent Performance",
      "Offline Mode Functionality"
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    gradient: "from-amber-600 to-orange-600"
  },
  "android-app": {
    slug: "android-app",
    title: "Android App Development",
    subtitle: "Custom Android Operations",
    icon: "Android",
    description: "Tailored Android applications optimized for Google Play store ecosystem.",
    longDescription: "We craft robust native Android apps designed to offer fluid navigation, deep device integration, and seamless deployment on the Google Play Store. Leverage the latest Android APIs for your corporate goals.",
    features: [
      "Google Play Store Compliance",
      "Material Design Guidelines",
      "Background Tasks & Services",
      "Local DB & Cache Management"
    ],
    benefits: [
      "Optimized Android Integration",
      "Deep Device Compatibility",
      "High-Performance Native Code"
    ],
    technologies: ["Kotlin", "Java", "Android SDK", "Firebase", "SQLite"],
    gradient: "from-emerald-500 to-teal-400"
  },
  "ios-app": {
    slug: "ios-app",
    title: "iOS App Development",
    subtitle: "Native Apple Ecosystem Apps",
    icon: "IOS",
    description: "Native, high-performance iOS applications built for the App Store ecosystem.",
    longDescription: "We build native iOS applications using Swift and modern Apple frameworks, designed to feel completely at home on iPhone and iPad. From smooth SwiftUI interfaces to deep integration with Apple's ecosystem (Push Notifications, Face ID, Apple Pay), we deliver apps that meet Apple's strict App Store guidelines and your users' expectations for polish and reliability.",
    features: [
      "Native Swift & SwiftUI Development",
      "App Store Review & Compliance",
      "Apple Ecosystem Integrations (Apple Pay, Face ID)",
      "Push Notifications & Background Tasks"
    ],
    benefits: [
      "Buttery-Smooth Native Performance",
      "Full App Store Compliance",
      "Deep Integration with Apple Devices"
    ],
    technologies: ["Swift", "SwiftUI", "Xcode", "CoreData", "Firebase"],
    gradient: "from-slate-700 to-slate-900"
  },
  "custom-software": {
    slug: "custom-software",
    title: "Custom Software Development",
    subtitle: "Enterprise-Grade Softwares",
    icon: "Cpu",
    description: "Tailor-made software products to automate operations and drive growth.",
    longDescription: "Automate and optimize your internal workflows with robust custom software built specifically for your business processes. We map database structures and design systems to match your operations.",
    features: [
      "Tailored Software Architecture",
      "Automated Operations Workflows",
      "Robust Third-Party Integrations",
      "Enterprise-Level Data Security"
    ],
    benefits: [
      "Streamlined Business Systems",
      "Reduced System Overhead",
      "Scales with Your Organization"
    ],
    technologies: ["Node.js", "Python", "PostgreSQL", "Docker", "AWS"],
    gradient: "from-orange-600 to-orange-500"
  },
  "billing-system": {
    slug: "billing-system",
    title: "Billing & Management System",
    subtitle: "Automated Financial Workflows",
    icon: "Calculator",
    description: "Secure and automated invoice generation, payment tracking, and analytics dashboards.",
    longDescription: "Say goodbye to manual tracking. We deploy automated billing platforms that process digital payments, auto-generate invoices, and present visual dashboards showing key financial insights.",
    features: [
      "Automated Invoice Generation",
      "Secure Payment Integrations",
      "Real-Time Revenue Metrics",
      "Multi-Currency Payments"
    ],
    benefits: [
      "Faster Payment Collection",
      "Error-Free Invoicing",
      "Clear Revenue Visibility"
    ],
    technologies: ["Stripe", "Razorpay", "React", "Node.js", "MongoDB"],
    gradient: "from-amber-600 to-orange-500"
  },
  "erp-crm": {
    slug: "erp-crm",
    title: "ERP & CRM Solutions",
    subtitle: "Integrated Enterprise Systems",
    icon: "Briefcase",
    description: "Centralized customer relationship and resource planning platforms for modern business.",
    longDescription: "Integrate customer relationship management with resource planning into a single source of truth. Manage employee permissions, project resource allocation, and automated lead generation seamlessly.",
    features: [
      "Lead Tracking & Pipelines",
      "Centralized Customer Data",
      "Inventory & Resource Allocation",
      "Automated WhatsApp / Email Alerts"
    ],
    benefits: [
      "Increased Sales Conversions",
      "Data-Driven Decisions",
      "Better Staff Collaboration"
    ],
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS", "REST APIs"],
    gradient: "from-orange-700 to-amber-700"
  },
  "digital-marketing": {
    slug: "digital-marketing",
    title: "Digital Marketing Services",
    subtitle: "ROI-Focused Marketing Campaigns",
    icon: "Megaphone",
    description: "Data-driven performance marketing campaigns to maximize lead generation.",
    longDescription: "Generate qualified leads and double conversions using automated ad setups and target mapping. We design ad landing pages and write ad copies that convert cold clicks into paying clients.",
    features: [
      "Paid Search Ads (PPC)",
      "Social Media Campaigns",
      "Conversion Optimization (CRO)",
      "Weekly ROI & Analytics Reports"
    ],
    benefits: [
      "Predictable Lead Stream",
      "Enhanced Brand Presence",
      "Higher Return on Ad Spend"
    ],
    technologies: ["Google Ads", "Meta Ads", "Google Analytics", "Hotjar"],
    gradient: "from-sky-500 to-blue-400"
  },
  "seo-services": {
    slug: "seo-services",
    title: "SEO Services",
    subtitle: "Dominating Search Rankings",
    icon: "Search",
    description: "Organic search engine optimization to place your business on Google's first page.",
    longDescription: "Boost your organic visibility and secure steady customer traffic. We optimize site speeds, create high-quality content structure schemas, and run link-building audits to raise your search domain authority.",
    features: [
      "In-Depth Keyword Research",
      "Technical SEO Diagnostics",
      "Content & Link Authority Building",
      "Competitor Visibility Audits"
    ],
    benefits: [
      "Free Organic Web Traffic",
      "Long-Term Lead Generation",
      "Established Search Authority"
    ],
    technologies: ["Ahrefs", "SEMrush", "Google Search Console", "Screaming Frog"],
    gradient: "from-teal-500 to-emerald-500"
  },
  "cloud-solutions": {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    subtitle: "Scalable Cloud-Native Infrastructure",
    icon: "Cloud",
    description: "Scalable infrastructure and cloud-native services built to grow with your traffic.",
    longDescription: "We design and manage cloud infrastructure that scales automatically as your business grows, instead of forcing you to predict capacity in advance. From containerized deployments to serverless functions, we choose the right cloud-native pattern for your workload — keeping costs predictable while your application stays fast under real-world traffic spikes.",
    features: [
      "Auto-Scaling Infrastructure Setup",
      "Containerized Deployments (Docker)",
      "Serverless Functions & Edge Compute",
      "Cloud Storage & CDN Configuration",
      "Multi-Region Failover Planning"
    ],
    benefits: [
      "Handles traffic spikes without downtime",
      "Pay only for what you actually use",
      "Faster load times for global users",
      "Disaster-recovery ready from day one"
    ],
    technologies: ["AWS", "Vercel", "Docker", "Cloudflare", "DigitalOcean"],
    deliverable: "Production-Ready Cloud Infrastructure",
    gradient: "from-emerald-500 to-teal-400"
  },
  "hosting": {
    slug: "hosting",
    title: "Premium Hosting",
    subtitle: "Complimentary High-Performance Hosting",
    icon: "Gem",
    description: "1 year of high-performance hosting at zero cost with every project we deliver.",
    longDescription: "Every project we ship includes a full year of premium hosting at no extra cost — so you're not stuck choosing between a slow shared server and an expensive enterprise plan. We configure SSL, caching, and CDN delivery out of the box, and monitor uptime continuously so your site stays fast and online without you having to think about infrastructure.",
    features: [
      "1 Year Complimentary Hosting",
      "Free SSL Certificate & HTTPS Setup",
      "Global CDN for Faster Load Times",
      "Automated Daily Backups",
      "99.9% Uptime Monitoring"
    ],
    benefits: [
      "Zero hosting cost in year one",
      "No technical setup required on your end",
      "Consistent fast performance for visitors",
      "Peace of mind with active monitoring"
    ],
    technologies: ["Vercel", "AWS", "Cloudflare", "Let's Encrypt"],
    deliverable: "Live, Monitored Hosting Environment",
    gradient: "from-orange-600 to-orange-500"
  },
  "maintenance": {
    slug: "maintenance",
    title: "Maintenance & Support",
    subtitle: "Complimentary Ongoing Maintenance",
    icon: "Settings",
    description: "1 year of complimentary maintenance covering updates, fixes, and support.",
    longDescription: "Software needs upkeep the same way a storefront needs cleaning — and we don't disappear after launch. Every project includes a year of complimentary maintenance covering dependency updates, security patches, and bug fixes, so the product you launched with stays exactly as reliable six months later as it was on day one.",
    features: [
      "1 Year Complimentary Maintenance",
      "Regular Dependency & Security Updates",
      "Bug Fixes & Stability Patches",
      "Priority Email & WhatsApp Support",
      "Minor Content & Copy Updates"
    ],
    benefits: [
      "No surprise maintenance bills in year one",
      "Security patches applied proactively",
      "Direct line to the team that built it",
      "Software that stays reliable as it ages"
    ],
    technologies: ["Sentry", "GitHub Actions", "Uptime Robot", "Cloudwatch"],
    deliverable: "Ongoing Support & Update Coverage",
    gradient: "from-amber-600 to-orange-500"
  },
  "delivery": {
    slug: "delivery",
    title: "Ultra-Fast Delivery",
    subtitle: "Rapid, On-Time Development Cycles",
    icon: "Zap",
    description: "Rapid development cycles and on-time delivery for every project milestone.",
    longDescription: "Long timelines aren't a sign of thoroughness — they're usually a sign of an unclear process. We run tight, milestone-based sprints with clear deliverables at each checkpoint, so you always know exactly what's shipping and when. Most standard projects move from kickoff to launch in days, not months, without cutting corners on quality.",
    features: [
      "Milestone-Based Sprint Planning",
      "Daily Progress Visibility",
      "Parallel Design & Development Tracks",
      "Rapid Revision Turnaround",
      "Fixed Launch-Date Commitments"
    ],
    benefits: [
      "Get to market faster than competitors",
      "Always know what's shipping and when",
      "Fewer delays from unclear requirements",
      "Quality maintained despite the speed"
    ],
    technologies: ["Next.js", "Linear", "GitHub Actions", "Vercel"],
    deliverable: "On-Time Milestone Delivery Plan",
    gradient: "from-sky-500 to-blue-400"
  }
};

export const locationContent: Record<string, DetailedContent> = {
  bihar: {
    slug: "bihar",
    title: "Software Company in Bihar",
    subtitle: "Leading Digital Growth in the East",
    icon: "MapPin",
    description: "Expert software development services in Patna, Gaya, and across Bihar.",
    longDescription: "Bihar is emerging as a tech hub, and Sabka Saathi is at the forefront of this digital revolution. Based in Patna, we provide high-end software solutions to local businesses and government sectors. Our goal is to empower Bihar's entrepreneurs with technology that competes on a global scale.",
    features: ["Localized Support", "Patna Hub", "Government Projects", "Regional Talent"],
    benefits: ["On-Site Consultations", "Local Market Knowledge", "Affordable Excellence"],
    gradient: "from-orange-600 to-amber-600"
  },
  gujarat: {
    slug: "gujarat",
    title: "Software Company in Gujarat",
    subtitle: "Innovation for India's Business Hub",
    icon: "MapPin",
    description: "Premium tech solutions in Ahmedabad, Surat, and Gandhinagar.",
    longDescription: "Gujarat is the entrepreneurial heart of India. We serve the business community of Gujarat with custom ERPs, CRM systems, and e-commerce platforms designed for massive scale. From the diamond industry of Surat to the tech parks of Ahmedabad, we are Gujarat's trusted tech partner.",
    features: ["Business Automation", "Surat/Ahmedabad Network", "Industrial Tech", "SaaS Experts"],
    benefits: ["Scale with Industry", "Trusted by Enterprises", "World-Class UX"],
    gradient: "from-blue-600 to-amber-500"
  },
  maharashtra: {
    slug: "maharashtra",
    title: "Software Company in Maharashtra",
    subtitle: "Enterprise Solutions in Pune & Mumbai",
    icon: "MapPin",
    description: "Modern software development in Pune, Mumbai, and Nagpur.",
    longDescription: "Serving the powerhouse of India's economy. In Maharashtra, we focus on enterprise-grade software and SaaS innovation. Whether you are a startup in Pune or a multinational in Mumbai, our technical expertise in Next.js and Cloud architecture ensures your business stays ahead.",
    features: ["Enterprise SaaS", "Pune Tech Reach", "Financial Systems", "Cloud Migration"],
    benefits: ["High-Security Focus", "Scalable for Millions", "Modern Tech Stack"],
    gradient: "from-emerald-500 to-teal-400"
  }
};