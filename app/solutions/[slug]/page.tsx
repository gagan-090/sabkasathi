import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Plug, Clock, Wallet, AlertTriangle, MapPin, ArrowRight } from "lucide-react";
import { RoyalFooter } from "@/components/royal/RoyalFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSolutionPage, solutionParams } from "@/lib/solutionSeo";
import { business, telHref, whatsappHref, ogImage } from "@/lib/business";

/*
  /solutions/<slug> — one page per named product people search for by name.

  63 pages, all prerendered: this tier is small, high-intent and the pages are
  the head terms the long tail links up to, so they should be static.
*/

export const dynamicParams = false;

export function generateStaticParams() {
  return solutionParams;
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getSolutionPage(slug);
  if (!page) return { title: "Not Found" };

  const url = `https://sabkasaathidigitalservices.com${page.path}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: [
      `${page.name.toLowerCase()} development company`,
      `${page.name.toLowerCase()} developer`,
      `custom ${page.name.toLowerCase()} development`,
      `${page.name.toLowerCase()} development cost`,
      ...page.aka,
    ],
    alternates: { canonical: url },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      siteName: "Sabka Saathi",
      type: "website",
      locale: "en_IN",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const page = getSolutionPage(slug);
  if (!page) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        <JsonLd schemas={page.schemas} />

        <section className="border-b border-slate-100 bg-gradient-to-b from-orange-50/60 to-white">
          <div className="container mx-auto max-w-5xl px-4 py-14 md:py-20">
            <nav aria-label="Breadcrumb" className="mb-5 text-xs font-semibold text-slate-500">
              <Link href="/" className="hover:text-orange-600">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/solutions" className="hover:text-orange-600">Solutions</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-800">{page.name}</span>
            </nav>

            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-700">
              {page.category}
            </span>

            <h1 className="mt-4 text-3xl font-black leading-tight text-slate-900 md:text-5xl">
              {page.name} <span className="text-orange-600">Development Company</span>
            </h1>

            <p className="ai-overview-snippet mt-5 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
              {page.answer}
            </p>

            <div className="mt-6 flex flex-wrap gap-6 text-sm">
              <span className="inline-flex items-center gap-2 font-bold text-slate-700">
                <Wallet className="h-4 w-4 text-orange-600" /> From {page.priceFrom}
              </span>
              <span className="inline-flex items-center gap-2 font-bold text-slate-700">
                <Clock className="h-4 w-4 text-orange-600" /> {page.timeline}
              </span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href={telHref} className="rounded-xl bg-orange-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-700">
                Call {business.phone.display}
              </a>
              <a
                href={whatsappHref(`Hi, I want to build a ${page.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-orange-300 hover:text-orange-700"
              >
                WhatsApp
              </a>
            </div>

            {page.aka.length > 0 && (
              <p className="mt-6 text-sm text-slate-500">
                Also searched as: {page.aka.join(" · ")}
              </p>
            )}
          </div>
        </section>

        {/* Modules */}
        <section className="container mx-auto max-w-5xl px-4 py-12">
          <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
            What a {page.name.toLowerCase()} includes
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
            Built for {page.buyer}. These are the modules that make up a realistic first version.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {page.modules.map((m) => (
              <li key={m} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" />
                <span className="text-sm font-semibold text-slate-700">{m}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-10 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-800">
            <Plug className="h-4 w-4 text-orange-600" /> Integrations it normally needs
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {page.integrations.map((i) => (
              <span key={i} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700">
                {i}
              </span>
            ))}
          </div>
        </section>

        {/* Scope + the honest warning */}
        <section className="border-t border-slate-100 bg-slate-50/60">
          <div className="container mx-auto max-w-5xl px-4 py-12">
            <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
              Where to start, and what to watch
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-sm font-black uppercase tracking-wider text-orange-700">
                  Sensible first release
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{page.mvpScope}</p>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-6">
                <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-amber-800">
                  <AlertTriangle className="h-4 w-4" /> What usually goes wrong
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{page.watchOut}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Intent cluster */}
        <section className="container mx-auto max-w-3xl px-4 py-12">
          <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
            Cost, customisation and fit
          </h2>
          <dl className="mt-6 space-y-6">
            {page.intentAnswers.map((item) => (
              <div key={item.q}>
                <dt className="text-base font-bold text-slate-900">{item.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-600">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Local intent */}
        <section className="border-t border-slate-100 bg-slate-50/60">
          <div className="container mx-auto max-w-5xl px-4 py-12">
            <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
              {page.name} development, city by city
            </h2>
            <p className="mt-3 max-w-3xl text-base text-slate-600">
              We build remotely from {business.address.locality}, Bihar for clients across India.
              These are cities where we publish local pricing and process in detail.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {page.cityLinks.map((c) => (
                <Link
                  key={c.url}
                  href={c.url}
                  prefetch={false}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-orange-300 hover:text-orange-700"
                >
                  <MapPin className="h-3.5 w-3.5 text-orange-500" />
                  {c.name}
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/locations" className="inline-flex items-center gap-2 text-sm font-black text-orange-600 hover:text-orange-700">
                Every location we serve
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="container mx-auto max-w-3xl px-4 py-12">
          <h2 className="text-2xl font-black text-slate-900 md:text-3xl">Frequently asked questions</h2>
          <dl className="mt-6 space-y-6">
            {page.faqs.map((f) => (
              <div key={f.q}>
                <dt className="text-base font-bold text-slate-900">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Related */}
        {page.related.length > 0 && (
          <section className="border-t border-slate-100 bg-slate-50/60">
            <div className="container mx-auto max-w-5xl px-4 py-12">
              <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
                Related {page.category.toLowerCase()} solutions
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {page.related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/solutions/${r.slug}`}
                    className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-orange-300 hover:shadow-sm"
                  >
                    <span className="text-sm font-bold text-slate-800">{r.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <RoyalFooter />
    </div>
  );
}
