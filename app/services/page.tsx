import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { Footer } from "@/components/Footer";
import { expertiseContent } from "@/lib/content";
import { getCitiesGroupedByState, locationStats, generateSlug } from "@/lib/localSeo";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import { Globe, Smartphone, Cpu, Calculator, Briefcase, Megaphone, Search, CheckCircle2, MapPin, ArrowRight } from "lucide-react";

// Android Icon component fallback (proper SVG, no emoji)
const AndroidIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2v2M5 11h14M6 11c0-3.3 2.7-6 6-6s6 2.7 6 6M6 11v6c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-6M9 19v3M15 19v3M4 12v3M20 12v3" />
  </svg>
);

const iconMap: Record<string, React.ComponentType<any>> = {
  Globe: Globe,
  Smartphone: Smartphone,
  Android: AndroidIcon,
  Cpu: Cpu,
  Calculator: Calculator,
  Briefcase: Briefcase,
  Megaphone: Megaphone,
  Search: Search,
};

import Script from "next/script";

export const metadata: Metadata = {
  title: "Software & Mobile App Development Services in India | Sabka Saathi",
  description: "Explore our software engineering capabilities: custom web development, mobile apps (Android/iOS), SaaS, cloud services, and custom CRM systems designed for growth.",
  alternates: {
    canonical: "https://sabkasaathidigitalservices.com/services",
  },
  openGraph: {
    title: "Software & Mobile App Development Services in India | Sabka Saathi",
    description: "Explore our software engineering capabilities: custom web development, mobile apps, SaaS, cloud services, and custom CRM systems designed for growth.",
    url: "https://sabkasaathidigitalservices.com/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software & Mobile App Development Services in India — Sabka Saathi",
    description: "Explore our software engineering capabilities: custom web development, mobile apps, SaaS, cloud services, and custom CRM systems.",
  },
};

const servicesPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://sabkasaathidigitalservices.com/services#collection",
      "url": "https://sabkasaathidigitalservices.com/services",
      "name": "Software & Mobile App Development Services Catalog",
      "description": "Comprehensive IT services catalog including Mobile App Development, Website Development, Custom CRM & Software, UI/UX Design, and Cloud DevOps.",
      "publisher": { "@id": "https://sabkasaathidigitalservices.com/#organization" }
    },
    {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Mobile App Development (Android & iOS)",
          "url": "https://sabkasaathidigitalservices.com/mobile-app-development-company-in-patna"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Website & Web Application Development",
          "url": "https://sabkasaathidigitalservices.com/website-development-company-in-patna"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Custom CRM & Enterprise Software Development",
          "url": "https://sabkasaathidigitalservices.com/software-development-company-in-patna"
        }
      ]
    }
  ]
};

export default function ServicesPage() {
  const expertiseAreas = Object.values(expertiseContent);
  const locationGroups = getCitiesGroupedByState();
  return (
    <div className="flex min-h-screen flex-col">
      <Script
        id="services-schema-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesPageSchema) }}
      />
      <InteractiveBackground />
      <Navbar />
      <main className="flex-1 pt-0">
        {/* Header Section */}
        <PageHero
          badge="What We Build"
          title="Our Expertise &"
          titleHighlight="Capabilities"
          subtitle="High-performance digital products built with modern stacks to drive real-world business outcomes."
          type="services"
          ctaText="Start a Project"
          ctaHref="/contact"
        />

        {/* Services Grid Section */}
        <section className="py-16 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {expertiseAreas.map((area) => {
              const IconComponent = iconMap[area.icon] || Cpu;
              return (
                <Link key={area.slug} href={`/expertise/${area.slug}`} className="block h-full">
                  <div className="service-card-liquid group relative flex flex-col justify-between h-full bg-white border border-slate-100/80 rounded-[2rem] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.015)] hover:border-transparent hover:shadow-[0_20px_50px_rgba(255,149,0,0.15)] transition-all duration-500 cursor-pointer">
                    
                    {/* Visual Image/Illustration */}
                    <div className="relative w-full h-40 rounded-2xl overflow-hidden mb-6 bg-slate-50 border border-slate-100/50">
                      <img
                        src={`/images/services/${area.slug}.webp`}
                        alt={area.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    {/* Title and Icon */}
                    <div className="flex items-center gap-3 mb-4 z-10 relative">
                      <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600 border border-orange-100/50 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/10 transition-all duration-500 shrink-0">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-black text-slate-800 tracking-tight leading-tight group-hover:text-white transition-colors duration-500">
                        {area.title}
                      </h3>
                    </div>

                    {/* Short Description */}
                    <p className="text-[11px] text-slate-500 font-semibold leading-relaxed mb-5 group-hover:text-orange-50 transition-colors duration-500 z-10 relative">
                      {area.description}
                    </p>

                    {/* Feature Points */}
                    <ul className="space-y-2.5 mb-6 flex-1 z-10 relative">
                      {area.features?.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-[11px] font-bold text-slate-600 group-hover:text-white transition-colors duration-500">
                          <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 group-hover:text-orange-200 transition-colors duration-500 shrink-0" />
                          <span className="truncate">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <div className="mt-auto pt-2 z-10 relative">
                      <div className="w-full py-3 rounded-xl border border-slate-200 bg-slate-50 text-center text-[10px] font-black uppercase tracking-widest text-slate-650 group-hover:bg-white group-hover:text-orange-700 group-hover:border-white transition-all duration-500 shadow-xs">
                        Learn More
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Dynamic Projects Showcase */}
        <section className="py-16 bg-gradient-to-b from-transparent via-orange-50/10 to-transparent border-y border-slate-100/40">
          <ProjectsShowcase />
        </section>

        {/* Service Areas — every covered city links to its local service pages */}
        <section className="py-16 container mx-auto px-4">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <span className="mb-3 block text-xs font-black uppercase tracking-[0.3em] text-orange-600">
              Where We Work
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Service Areas Across India
            </h2>
            <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">
              Website, mobile app, and custom software development for businesses in{" "}
              {locationStats.cityCount}+ cities across {locationStats.stateCount} states. Find your
              city — or{" "}
              <Link href="/locations" className="font-bold text-orange-600 hover:underline">
                browse the full location directory
              </Link>
              .
            </p>
          </div>

          <div className="space-y-8">
            {locationGroups.map((group) => (
              <div key={group.state} className="rounded-3xl border border-slate-100 bg-white p-6 md:p-8 shadow-sm">
                <div className="mb-4 flex items-center gap-2.5">
                  <MapPin className="h-5 w-5 text-orange-600" />
                  <h3 className="text-lg md:text-xl font-black text-slate-900">{group.state}</h3>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-500">
                    {group.cities.length} cities
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.cities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/${generateSlug("website-development", city.slug)}`}
                      prefetch={false}
                      className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-[13px] font-bold capitalize text-slate-600 transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
                    >
                      {city.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-colors hover:bg-orange-600"
            >
              View Full Location Directory
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* <FeaturesSection /> */}
        
        {/* <div className="container mx-auto px-4">
            <ProcessSection />
        </div> */}
{/*         
        <ContactSection /> */}
      </main>
      <Footer />
    </div>
  );
}