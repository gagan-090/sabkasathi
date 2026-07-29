import type { Metadata } from "next";
import { Poppins, DM_Sans, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "./royal.css";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Display face for the Royal Amethyst headings (.rh-display and the section
// titles that borrow it). Loaded here so every route can use it, not just home.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

// Self-hosted via next/font (no render-blocking external Google Fonts request).
// Exposed as --font-dm-sans and consumed by component styles across the site.
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sabkasaathidigitalservices.com"),
  title: "Software Development Company in India | Web, App & SaaS — Sabka Saathi",
  description:
    "Sabka Saathi is a software development company serving businesses across India. We build custom web apps, mobile apps, SaaS platforms, CRM & automation — delivered remotely, nationwide.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Software Development Company in India | Web, App & SaaS — Sabka Saathi",
    description: "Custom web, mobile, SaaS & CRM development for businesses across India. Remote-first delivery, nationwide.",
    url: "https://sabkasaathidigitalservices.com",
    siteName: "Sabka Saathi Digital Services",
    images: [{ url: "/logo.png", width: 800, height: 600 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Development Company in India — Sabka Saathi",
    description: "Custom software, web, app, SaaS & CRM automation for businesses across India.",
    images: ["/logo.png"],
  },
  other: {
    "geo.region": "IN-BR",
    "geo.placename": "Patna, Bihar",
    "geo.position": "25.5941;85.1376",
    "ICBM": "25.5941, 85.1376",
    "ai-content-declaration": "verified-expert-author",
    "citation_publisher": "Sabka Saathi Digital Services",
  },
};

// Consolidated @graph: Organization, ProfessionalService, ITService plus WebSite node.
const organizationSchema = {
  "@type": ["Organization", "ProfessionalService", "ITService"],
  "@id": "https://sabkasaathidigitalservices.com/#organization",
  "name": "Sabka Saathi Digital Services",
  "url": "https://sabkasaathidigitalservices.com/",
  "logo": {
    "@type": "ImageObject",
    "url": "https://sabkasaathidigitalservices.com/logo.png",
  },
  "description":
    "Premier software development company serving businesses across India with custom web apps, mobile apps (Android/iOS), SaaS, CRM & automation solutions.",
  "email": "helpsabkasaathi@gmail.com",
  "taxID": "10LAHPK8872L1Z3",
  "priceRange": "₹₹ - ₹₹₹",
  "founder": { "@id": "https://sabkasaathidigitalservices.com/#founder" },
  "areaServed": [
    { "@type": "Country", "name": "India" },
    { "@type": "State", "name": "Bihar" },
    { "@type": "State", "name": "Uttar Pradesh" },
    { "@type": "State", "name": "Jharkhand" },
    { "@type": "City", "name": "Patna" },
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Patna",
    "addressRegion": "Bihar",
    "postalCode": "800001",
    "addressCountry": "IN",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "25.5941",
    "longitude": "85.1376",
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9431673018",
    "contactType": "customer service",
    "areaServed": "IN",
    "availableLanguage": ["en", "hi"],
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "IT & Software Development Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Mobile App Development",
          "description": "Native Android, iOS, and Flutter cross-platform mobile application development.",
        },
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Website & Web Application Development",
          "description": "High-performance Next.js full-stack web applications and enterprise web portals.",
        },
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Software & CRM Development",
          "description": "Tailored ERP, CRM automation, inventory, and SaaS business platforms.",
        },
      },
    ],
  },
};

const founderSchema = {
  "@type": "Person",
  "@id": "https://sabkasaathidigitalservices.com/#founder",
  "name": "Ashish Kumar",
  "jobTitle": "Founder",
  "worksFor": { "@id": "https://sabkasaathidigitalservices.com/#organization" },
};

const websiteSchema = {
  "@type": "WebSite",
  "@id": "https://sabkasaathidigitalservices.com/#website",
  "url": "https://sabkasaathidigitalservices.com/",
  "name": "Sabka Saathi Digital Services",
  "publisher": { "@id": "https://sabkasaathidigitalservices.com/#organization" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://sabkasaathidigitalservices.com/services?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const speakableSchema = {
  "@type": "WebPage",
  "@id": "https://sabkasaathidigitalservices.com/#webpage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".ai-overview-snippet", ".hero-heading", ".service-summary"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [organizationSchema, founderSchema, websiteSchema, speakableSchema],
};

import { FloatingContact } from "@/components/FloatingContact";
import { Navbar } from "@/components/Navbar";
import ChatWidget from "@/components/ChatWidget";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MotionProvider } from "@/components/MotionProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${dmSans.variable} ${instrumentSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* The blocking `hasPreloaded` script that used to sit here drove the
            old hero's preloader overlay. That hero is gone, so the script was
            costing every page a synchronous head execution for nothing. */}
        <link rel="author" href="https://sabkasaathidigitalservices.com/llms.txt" />
        {/* Scroll reveals are framer-motion, which server-renders its `initial`
            state — so every revealed block ships as opacity:0 and only becomes
            visible once the bundle hydrates. If JS never runs, this puts the
            page back. A stylesheet `!important` outranks framer's inline style,
            which is what makes the override stick. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Eases wheel/keyboard scrolling site-wide. Renders nothing, and
            bows out entirely under prefers-reduced-motion. */}
        <SmoothScroll />
        <MotionProvider>
          <Navbar />
          {children}
          <FloatingContact />
          <ChatWidget />
        </MotionProvider>
        <Script
          id="service-worker-registration"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}