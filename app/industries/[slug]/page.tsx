import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Building2, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { Button } from "@/components/ui/LiquidButton";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_URL,
  getIndustryBySlug,
  getServicesGroupedByGroup,
  generateIndustrySlug,
  industries,
  industryStats,
} from "@/lib/industrySeo";

/*
  The hub for one industry: every service we build for that sector, grouped the
  way the catalog is grouped.

  This is the page that makes the industry axis crawlable. Without it, 1,325
  service × industry pages would be reachable only from each other's sibling
  lists — which is exactly the orphaned-cluster shape that reads as a doorway
  farm. With it, every leaf is two clicks from /industries.
*/

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return { title: "Not Found" };

  const title = `Software Development for ${industry.label} | Sabka Saathi`;
  const description =
    `${industryStats.serviceCount} software services built for ${industry.plural} — apps, websites, ERP, CRM, ` +
    `billing, POS, inventory, AI automation and more. Delivered remotely across India. Get a free quote.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/industries/${industry.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/industries/${industry.slug}`,
      siteName: "Sabka Saathi",
      type: "website",
      locale: "en_IN",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function IndustryHubPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const grouped = getServicesGroupedByGroup();
  const related = industries.filter((i) => i.group === industry.group && i.slug !== industry.slug);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Industries", item: `${SITE_URL}/industries` },
      {
        "@type": "ListItem",
        position: 3,
        name: industry.label,
        item: `${SITE_URL}/industries/${industry.slug}`,
      },
    ],
  };

  /* An ItemList of every service page below. This is what lets an answer engine
     enumerate the cluster without crawling all 25 leaves first. */
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Software services for ${industry.label}`,
    numberOfItems: industryStats.serviceCount,
    itemListElement: grouped.flatMap((g) =>
      g.services.map((svc) => ({
        "@type": "ListItem",
        name: `${industry.name} ${svc.name}`,
        url: `${SITE_URL}/${generateIndustrySlug(industry.slug, svc.slug)}`,
      }))
    ),
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <InteractiveBackground />
      <Navbar />

      <JsonLd schemas={[breadcrumbSchema, itemListSchema]} />

      <main className="flex-1">
        <nav aria-label="Breadcrumb" className="container mx-auto px-4 max-w-5xl pt-24 md:pt-28">
          <ol className="flex items-center gap-2 text-xs md:text-sm font-bold text-slate-400">
            <li>
              <Link href="/" className="hover:text-orange-600 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="w-4 h-4" />
            </li>
            <li>
              <Link href="/industries" className="hover:text-orange-600 transition-colors">
                Industries
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="w-4 h-4" />
            </li>
            <li className="text-orange-600 font-extrabold">{industry.label}</li>
          </ol>
        </nav>

        <section className="pt-10 pb-14 md:pt-16 md:pb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/5 blur-3xl rounded-full -mr-40 -mt-40 pointer-events-none" />
          <div className="container mx-auto px-4 max-w-5xl relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-black uppercase tracking-widest mb-7">
              <Building2 className="w-4 h-4" />
              {industry.group}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.06] max-w-4xl mb-7">
              Software for <span className="text-orange-600 italic">{industry.label}</span>
            </h1>
            <p className="text-slate-500 font-medium text-base md:text-xl max-w-2xl leading-relaxed mb-10">
              In {industry.label.toLowerCase()}, {industry.context}. Every one of the{" "}
              {industryStats.serviceCount} services below is built around that, not adapted from a
              generic template.
            </p>
            <Link href="/contact">
              <Button
                variant="primary"
                size="lg"
                className="rounded-2xl shadow-xl shadow-orange-600/15 text-base px-8 py-4"
              >
                Get a Free Quote
              </Button>
            </Link>
          </div>
        </section>

        {/* What the sector needs */}
        <section className="py-14 md:py-20 bg-slate-50/60 border-y border-slate-100">
          <div className="container mx-auto px-4 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <span className="text-sm font-black uppercase tracking-[0.3em] text-orange-600 block mb-4">
                What gets in the way
              </span>
              <ul className="space-y-4">
                {industry.pains.map((pain) => (
                  <li key={pain} className="flex items-start gap-3">
                    <span
                      className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-sm md:text-base font-bold text-slate-700">{pain}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-sm font-black uppercase tracking-[0.3em] text-orange-600 block mb-4">
                What actually helps
              </span>
              <ul className="space-y-4">
                {industry.systems.map((sys) => (
                  <li key={sys} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base font-bold text-slate-700">{sys}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* The 25 services */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="mb-14">
              <span className="text-sm font-black uppercase tracking-[0.3em] text-orange-600 block mb-3">
                <Sparkles className="w-4 h-4 inline mr-1.5" />
                Services
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                {industryStats.serviceCount} services for {industry.plural}
              </h2>
            </div>

            <div className="space-y-12">
              {grouped.map((group) => (
                <div key={group.group}>
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-5 pb-3 border-b border-slate-100">
                    {group.group}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {group.services.map((svc) => (
                      <Link
                        key={svc.slug}
                        href={`/${generateIndustrySlug(industry.slug, svc.slug)}`}
                        className="group flex items-start justify-between gap-3 rounded-2xl border border-slate-100 bg-white p-5 hover:border-orange-200 hover:shadow-sm transition-all"
                      >
                        <div>
                          <span className="block text-base font-black text-slate-900 group-hover:text-orange-600 transition-colors leading-snug">
                            {industry.name} {svc.name}
                          </span>
                          <span className="block text-xs text-slate-400 font-bold mt-1.5">
                            {svc.timeline} · {svc.priceBand}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-orange-600 flex-shrink-0 mt-1 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="py-14 md:py-20 bg-slate-50/60 border-y border-slate-100">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-7 leading-tight">
                Related industries in {industry.group}
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/industries/${rel.slug}`}
                    className="text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:border-orange-300 hover:text-orange-600 rounded-full px-4 py-2 transition-colors"
                  >
                    {rel.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-16 md:py-24 bg-slate-900">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              Not sure which one you need?
            </h2>
            <p className="text-slate-400 font-medium text-base md:text-lg leading-relaxed mb-10">
              Tell us how your {industry.label.toLowerCase()} business runs today. We will tell you
              what is worth building, what is not, and what it costs — before you commit to anything.
            </p>
            <Link href="/contact">
              <Button
                variant="primary"
                size="lg"
                className="rounded-2xl text-base px-8 py-4 shadow-xl shadow-orange-600/20"
              >
                Book a Free Discovery Call
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
