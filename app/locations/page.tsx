import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ChevronRight, MapPin, Sparkles, Globe, Building2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { RoyalFooter } from "@/components/royal/RoyalFooter";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { Button } from "@/components/ui/LiquidButton";
import {
  getCitiesGroupedByState,
  locationStats,
  serviceCatalog,
  generateSlug,
} from "@/lib/localSeo";
import { GEO } from "@/lib/geo";
import { stateHubSlugs } from "@/lib/stateSeo";
import { business, telHref, ogImage } from "@/lib/business";

const SITE = "https://sabkasaathidigitalservices.com";

export const metadata: Metadata = {
  title:
    "Web, App & Software Development Company — Service Locations Across India | Sabka Saathi",
  description:
    "Sabka Saathi delivers website development, mobile app development, and custom software to businesses across Bihar, Uttar Pradesh, Jharkhand, West Bengal, Delhi NCR, and Karnataka. Browse our service coverage city by city.",
  alternates: {
    canonical: `${SITE}/locations`,
  },
  openGraph: {
    title: "Service Locations Across India | Sabka Saathi",
    description:
      "Website, mobile app, and custom software development for businesses across India. Find your city.",
    url: `${SITE}/locations`,
    siteName: "Sabka Saathi",
    type: "website",
    locale: "en_IN",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Locations Across India | Sabka Saathi",
    description:
      "Website, mobile app, and custom software development for businesses across India. Find your city.",
  },
};

export default function LocationsPage() {
  const grouped = getCitiesGroupedByState();
  const allCities = grouped.flatMap((g) => g.cities);

  /* The location tree, for the state browser below. Only states that have a
     hub page are listed — linking to a state with no hub would 404. */
  const stateIndex = GEO.filter((s) => stateHubSlugs.includes(s.slug)).map((s) => ({
    name: s.state,
    slug: s.slug,
    districtCount: s.districts.filter((d) => !d.flat).length,
    townCount: s.districts.reduce((n, d) => n + d.towns.length, 0),
  }));
  const districtCount = stateIndex.reduce((n, s) => n + s.districtCount, 0);
  const townCount = stateIndex.reduce((n, s) => n + s.townCount, 0);

  // ItemList: a structured index of every covered city, each pointing at its
  // primary (website development) service page. Gives search engines a clean
  // map of the location hub instead of relying on crawl discovery alone.
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sabka Saathi — Software & Web Development Service Locations",
    numberOfItems: allCities.length,
    itemListElement: allCities.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `Software & Web Development in ${c.name}, ${c.state}`,
      url: `${SITE}/${generateSlug("website-development", c.slug)}`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE}/locations` },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <InteractiveBackground />
      <Navbar />

      <Script
        id="locations-itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Script
        id="locations-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="flex-1 select-none">
        {/* Breadcrumbs */}
        <nav className="container mx-auto max-w-6xl px-4 pt-24 md:pt-28">
          <ol className="flex items-center gap-2 text-xs font-bold text-slate-400 md:text-sm">
            <li>
              <Link href="/" className="transition-colors hover:text-orange-600">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="h-4 w-4" />
            </li>
            <li className="font-extrabold text-orange-600">Locations</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="relative overflow-hidden pb-14 pt-10 md:pb-20 md:pt-16">
          <div className="pointer-events-none absolute right-0 top-0 -mr-40 -mt-40 h-80 w-80 rounded-full bg-orange-600/5 blur-3xl" />
          <div className="container relative z-10 mx-auto max-w-6xl px-4">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-orange-700">
                <Sparkles className="h-4 w-4" />
                Nationwide Coverage
              </div>
              <h1 className="mb-6 text-4xl font-black leading-[1.05] tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                Web, App &amp; Software Development{" "}
                <span className="italic text-orange-600">Across India</span>
              </h1>
              <p className="mb-8 text-base font-medium leading-relaxed text-slate-500 md:text-xl">
                We build websites, mobile apps, and custom software for businesses in{" "}
                <strong className="text-slate-700">{locationStats.cityCount} cities</strong> across{" "}
                <strong className="text-slate-700">{locationStats.stateCount} states</strong> — from
                our Bihar base out to Delhi NCR, Uttar Pradesh, Jharkhand, West Bengal, and Karnataka.
                Pick your city below to see the exact service, pricing, and process for your region.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button
                    variant="primary"
                    size="lg"
                    className="rounded-2xl px-8 py-4 text-base shadow-xl shadow-orange-600/15"
                  >
                    Start a Project
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="rounded-2xl border-slate-200 px-8 py-4 text-base"
                  >
                    View All Services
                  </Button>
                </Link>
              </div>

              {/* Honest service-area note */}
              <p className="mt-8 max-w-2xl text-sm font-medium leading-relaxed text-slate-400">
                Sabka Saathi is a remote-first service-area business: we run one HQ in Bihar and serve
                every city below through online discovery calls, design reviews, and weekly builds —
                so you get the same close working process wherever you are.
              </p>
            </div>

            {/* Quick service jump */}
            <div className="mt-10 flex flex-wrap gap-3">
              {serviceCatalog.map((svc) => (
                <Link
                  key={svc.slug}
                  href={`/${generateSlug(svc.slug, "patna")}`}
                  prefetch={false}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:border-orange-300 hover:text-orange-700"
                >
                  <Globe className="h-3.5 w-3.5 text-orange-500" />
                  {svc.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* State jump index */}
        <section className="border-y border-slate-100/60 bg-slate-50/40 py-8">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2.5">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                Jump to state:
              </span>
              {grouped.map((g) => (
                <a
                  key={g.state}
                  href={`#${g.state.toLowerCase().replace(/\s+/g, "-")}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-slate-600 shadow-sm ring-1 ring-slate-100 transition-colors hover:text-orange-600"
                >
                  <MapPin className="h-3 w-3 text-orange-500" />
                  {g.state}
                  <span className="text-slate-300">({g.cities.length})</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* State → district → town browser.
            Until this existed, /locations linked only to service×city pages
            and never to a single state hub — so the whole location tree
            (36 hubs, {districtCount} districts, {townCount} towns) had no
            entry point from the page that is supposed to be its index. */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.3em] text-orange-600">
              Full Coverage Map
            </span>
            <h2 className="text-2xl font-black text-slate-900 md:text-4xl">
              Browse every state, district and town
            </h2>
            <p className="mt-4 max-w-3xl text-base font-medium leading-relaxed text-slate-500">
              Each state hub opens onto its districts, and each district onto its towns —{" "}
              <strong className="text-slate-700">
                {townCount.toLocaleString("en-IN")} towns
              </strong>{" "}
              across{" "}
              <strong className="text-slate-700">{districtCount} districts</strong> in total, every
              one with a page of its own.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {stateIndex.map((s) => (
                <Link
                  key={s.slug}
                  href={`/location/${s.slug}`}
                  prefetch={false}
                  className="rounded-2xl border border-slate-200 bg-white p-4 transition-colors hover:border-orange-300 hover:bg-orange-50/40"
                >
                  <span className="flex items-center gap-2 text-sm font-black text-slate-800">
                    <MapPin className="h-3.5 w-3.5 text-orange-500" />
                    {s.name}
                  </span>
                  <span className="mt-1 block text-xs font-medium text-slate-500">
                    {s.districtCount > 0 ? `${s.districtCount} districts · ` : ""}
                    {s.townCount.toLocaleString("en-IN")} towns
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Per-state city directory */}
        {grouped.map((group) => (
          <section
            key={group.state}
            id={group.state.toLowerCase().replace(/\s+/g, "-")}
            className="scroll-mt-28 py-14 md:py-20 [&:nth-child(even)]:bg-slate-50/40 [&:nth-child(even)]:border-y [&:nth-child(even)]:border-slate-100/50"
          >
            <div className="container mx-auto max-w-6xl px-4">
              <div className="mb-10 flex items-end justify-between gap-4">
                <div>
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.3em] text-orange-600">
                    Service Area
                  </span>
                  <h2 className="flex items-center gap-3 text-2xl font-black text-slate-900 md:text-4xl">
                    <Building2 className="h-7 w-7 text-orange-500" />
                    {group.state}
                  </h2>
                </div>
                <span className="shrink-0 rounded-full bg-slate-100 px-4 py-1.5 text-xs font-bold text-slate-500">
                  {group.cities.length} cities
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {group.cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/${generateSlug("website-development", city.slug)}`}
                    prefetch={false}
                    title={`Web, app & software development in ${city.name}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold capitalize text-slate-700 shadow-sm transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
                  >
                    <MapPin className="h-3.5 w-3.5 text-orange-500" />
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Coverage note + CTA */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-slate-950 to-slate-900 p-10 text-center shadow-2xl md:p-16">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: "radial-gradient(#f38200 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="pointer-events-none absolute right-0 top-0 -mr-40 -mt-40 h-80 w-80 rounded-full bg-orange-600/10 blur-[120px]" />
              <h2 className="mb-5 text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
                Don&apos;t see your town listed?
              </h2>
              <p className="mx-auto mb-10 max-w-2xl px-4 text-base leading-relaxed text-slate-300 md:text-lg">
                We serve businesses everywhere in India remotely. If your town isn&apos;t among the{" "}
                {townCount.toLocaleString("en-IN")} above, we still build, launch, and support your
                project the same way — tell us where you are and what you need. Call or WhatsApp{" "}
                <a href={telHref} className="font-bold text-orange-400 hover:text-orange-300">
                  {business.phone.display}
                </a>
                , {business.hours.display}.
              </p>
              <Link href="/contact">
                <Button
                  variant="primary"
                  size="lg"
                  className="rounded-2xl px-12 py-5 text-lg font-black shadow-xl shadow-orange-600/20"
                >
                  Get a Free Estimate
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <RoyalFooter />
    </div>
  );
}
