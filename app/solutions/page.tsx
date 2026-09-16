import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RoyalFooter } from "@/components/royal/RoyalFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { solutionsByCategory, solutionStats } from "@/lib/solutionsCatalog";
import { business, telHref, ogImage } from "@/lib/business";

const SITE = "https://sabkasaathidigitalservices.com";

/*
  /solutions — the index that makes the solution tier crawlable.

  Without this, 63 solution pages would be reachable only from each other's
  "related" lists, which is the orphaned-cluster shape that reads as a doorway
  farm. With it, every solution is two clicks from the home page.
*/

export const metadata: Metadata = {
  title: "Ready-to-Build Software Solutions | Sabka Saathi",
  description:
    `${solutionStats.count} products we build end to end — delivery apps, marketplaces, ERPs, booking systems, ` +
    `fintech and AI agents. Fixed scope, fixed price, GST-registered. Call ${business.phone.display}.`,
  alternates: { canonical: `${SITE}/solutions` },
  openGraph: {
    title: "Ready-to-Build Software Solutions | Sabka Saathi",
    description: `${solutionStats.count} products we build end to end, with real scope, timelines and starting prices.`,
    url: `${SITE}/solutions`,
    siteName: "Sabka Saathi",
    type: "website",
    locale: "en_IN",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ready-to-Build Software Solutions | Sabka Saathi",
    description: `${solutionStats.count} products we build end to end.`,
  },
};

export default function SolutionsIndexPage() {
  const all = solutionsByCategory.flatMap((g) => g.items);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Software solutions built by Sabka Saathi",
    numberOfItems: all.length,
    itemListElement: all.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${s.name} Development`,
      url: `${SITE}/solutions/${s.slug}`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Solutions", item: `${SITE}/solutions` },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        <JsonLd schemas={[itemListSchema, breadcrumbSchema]} />

        <section className="border-b border-slate-100 bg-gradient-to-b from-orange-50/60 to-white">
          <div className="container mx-auto max-w-5xl px-4 py-14 md:py-20">
            <nav aria-label="Breadcrumb" className="mb-5 text-xs font-semibold text-slate-500">
              <Link href="/" className="hover:text-orange-600">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-800">Solutions</span>
            </nav>

            <h1 className="text-3xl font-black leading-tight text-slate-900 md:text-5xl">
              Software we build, <span className="text-orange-600">by product</span>
            </h1>

            <p className="ai-overview-snippet mt-5 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
              {solutionStats.count} products across {solutionStats.categoryCount} categories — delivery and
              marketplace platforms, ERPs, booking systems, fintech and AI agents. Each page states what the
              product actually includes, what it integrates with, a realistic first release, a starting price
              and the thing that most often goes wrong. Built remotely from {business.address.locality}, Bihar
              for clients across India.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href={telHref} className="rounded-xl bg-orange-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-700">
                Call {business.phone.display}
              </a>
              <Link href="/contact" className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-orange-300 hover:text-orange-700">
                Get a fixed quote
              </Link>
            </div>
          </div>
        </section>

        {solutionsByCategory.map((group) => (
          <section
            key={group.category}
            className="py-12 [&:nth-child(even)]:border-y [&:nth-child(even)]:border-slate-100 [&:nth-child(even)]:bg-slate-50/60"
          >
            <div className="container mx-auto max-w-5xl px-4">
              <h2 className="text-2xl font-black text-slate-900 md:text-3xl">{group.category}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/solutions/${s.slug}`}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-orange-300 hover:shadow-sm"
                  >
                    <span className="flex items-center justify-between text-sm font-black text-slate-900">
                      {s.name}
                      <ArrowRight className="h-4 w-4 text-orange-500 opacity-0 transition group-hover:opacity-100" />
                    </span>
                    <span className="mt-2 block text-xs leading-relaxed text-slate-500">
                      {s.whatItIs.length > 110 ? `${s.whatItIs.slice(0, 110)}…` : s.whatItIs}
                    </span>
                    <span className="mt-3 block text-xs font-bold text-orange-700">
                      From {s.priceFrom} · {s.timeline}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
      <RoyalFooter />
    </div>
  );
}
