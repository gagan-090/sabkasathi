import { Metadata } from "next";
import Link from "next/link";
import { getIndustriesGroupedByGroup, industryStats } from "@/lib/industrySeo";
import { IndustriesSection } from "@/components/IndustriesSection";
import { Navbar } from "@/components/Navbar";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { ContactSection } from "@/components/ContactSection";
import { RoyalFooter } from "@/components/royal/RoyalFooter";
import { PageHero } from "@/components/PageHero";
import { ogImage } from "@/lib/business";

export const metadata: Metadata = {
  title: "Industries We Serve | Sector-Specific Digital Solutions - Sabka Saathi",
  description: "Browse 50+ industries served by Sabka Saathi, including healthcare, education, retail, real estate, and finance. High-performance software solutions for business sectors.",
  alternates: {
    canonical: "https://sabkasaathidigitalservices.com/industries",
  },
  openGraph: {
    title: "Industries We Serve | Sector-Specific Digital Solutions - Sabka Saathi",
    description: "Browse 50+ industries served by Sabka Saathi, including healthcare, education, retail, real estate, and finance. High-performance software solutions for business sectors.",
    url: "https://sabkasaathidigitalservices.com/industries",
    type: "website",
    images: [ogImage],
    },
  twitter: {
    card: "summary_large_image",
    title: "Industries We Serve | Sector-Specific Digital Solutions - Sabka Saathi",
    description: "Browse 50+ industries served by Sabka Saathi, including healthcare, education, retail, real estate, and finance. High-performance software solutions for business sectors.",
  },
};

export default function IndustriesPage() {
  // Derived from the real dataset so the headline figures can never drift out
  // of sync with the number of pages actually published.
  const statsData = [
    { val: `${industryStats.industryCount}`, label: "Business Sectors" },
    { val: `${industryStats.serviceCount}`, label: "Services Per Sector" },
    { val: "24/7", label: "Sector Support" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <InteractiveBackground />
      <Navbar />
      <main className="flex-1 pt-0">
        {/* Header Section */}
        <PageHero
          badge="Market Reach"
          title="Industries We"
          titleHighlight="Empower"
          subtitle="Explore 50+ industry-specific digital solutions designed to help your business unlock its full potential. From medical and education to e-commerce and local shops, we drive sector-wide innovation."
          type="industries"
          stats={statsData}
          ctaText="Explore Sectors"
          ctaHref="#sectors"
        />

        <div id="sectors">
          <IndustriesSection />
        </div>

        {/* The crawlable index into the industry axis. IndustriesSection above
            is the visual pitch; this is the part that gives every one of the
            1,325 service × industry pages a real path in from the site root,
            grouped so it reads as a directory rather than a link dump. */}
        <section className="py-16 md:py-24 border-t border-slate-100">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="mb-12">
              <span className="text-sm font-black uppercase tracking-[0.3em] text-orange-600 block mb-3">
                Full directory
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
                {industryStats.industryCount} industries, {industryStats.serviceCount} services each
              </h2>
              <p className="text-base text-slate-500 font-medium leading-relaxed max-w-2xl">
                Pick your sector to see every service we build for it, with indicative timelines and
                pricing on each.
              </p>
            </div>

            <div className="space-y-10">
              {getIndustriesGroupedByGroup().map((group) => (
                <div key={group.group}>
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 pb-3 border-b border-slate-100">
                    {group.group}
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {group.industries.map((industry) => (
                      <Link
                        key={industry.slug}
                        href={`/industries/${industry.slug}`}
                        className="text-sm font-bold text-slate-600 bg-slate-50 border border-slate-200 hover:border-orange-300 hover:text-orange-600 rounded-full px-4 py-2 transition-colors"
                      >
                        {industry.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <RoyalFooter />
    </div>
  );
}
