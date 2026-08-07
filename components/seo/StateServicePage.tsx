import Link from "next/link";
import { MapPin, CheckCircle2, ArrowRight, Phone, Mail, Clock } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { business, telHref, mailHref, whatsappHref } from "@/lib/business";
import type { StateServicePageData } from "@/lib/stateServiceSeo";

/*
  Service × state page — /website-development-company-in-bihar

  Structurally this sits between the state hub (all services, one state) and
  the service × city page (one service, one city). Its job is to be the page
  that matches "<service> company in <state>", which nothing on the site did
  before, and then hand the visitor down to the city page nearest them.

  The "Choosing a …" section deliberately answers the developer/company/agency,
  best/affordable/custom variants in prose instead of spawning a page per
  phrase. That is the clustering the owner's own keyword note calls for, and it
  is also just a more useful page.
*/

export function StateServicePage({ page }: { page: StateServicePageData }) {
  const {
    serviceName,
    displayState,
    servicedCities,
    districtCount,
    townCount,
  } = page;

  return (
    <div className="bg-white">
      <JsonLd schemas={page.schemas} />

      {/* Hero + answer block */}
      <section className="border-b border-slate-100 bg-gradient-to-b from-orange-50/60 to-white">
        <div className="container mx-auto max-w-5xl px-4 py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="mb-5 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/locations" className="hover:text-orange-600">Locations</Link>
            <span className="mx-2">/</span>
            <Link href={`/location/${page.stateSlug}`} className="hover:text-orange-600">
              {displayState}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-800">{serviceName}</span>
          </nav>

          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-700">
            <MapPin className="h-3 w-3" />
            {districtCount} districts · {townCount.toLocaleString("en-IN")} towns
          </span>

          <h1 className="mt-4 text-3xl font-black leading-tight text-slate-900 md:text-5xl">
            {serviceName} Company in <span className="text-orange-600">{displayState}</span>
          </h1>

          <p className="ai-overview-snippet mt-5 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            {page.answer}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={telHref}
              className="rounded-xl bg-orange-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-700"
            >
              Call {business.phone.display}
            </a>
            <a
              href={whatsappHref(`Hi, I need ${serviceName.toLowerCase()} for my business in ${displayState}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-orange-300 hover:text-orange-700"
            >
              WhatsApp
            </a>
            <Link
              href="/contact"
              className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-orange-300 hover:text-orange-700"
            >
              Get a fixed quote
            </Link>
          </div>
        </div>
      </section>

      {/* Why this state */}
      <section className="container mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
          {serviceName} for {displayState} businesses
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">{page.intro}</p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
          {page.demandParagraph}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {page.features.slice(0, 6).map((f) => (
            <div key={f} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" />
              <span className="text-sm font-semibold text-slate-700">{f}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Choosing — the intent-variant cluster */}
      <section className="border-t border-slate-100 bg-slate-50/60">
        <div className="container mx-auto max-w-3xl px-4 py-12">
          <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
            Choosing a {serviceName.toLowerCase()} partner in {displayState}
          </h2>
          <dl className="mt-6 space-y-6">
            {page.intentAnswers.map((item) => (
              <div key={item.q}>
                <dt className="text-base font-bold text-slate-900">{item.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-600">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Process */}
      <section className="container mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-black text-slate-900 md:text-3xl">How we deliver</h2>
        <p className="mt-3 text-sm font-semibold text-slate-500">
          Typical timeline: {page.timeline}
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {page.process.map((step) => (
            <div key={step.step} className="rounded-2xl border border-slate-200 p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-600 to-amber-600 text-sm font-black text-white">
                {step.step}
              </div>
              <h3 className="mt-4 text-base font-black text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>

        <h3 className="mt-10 text-sm font-black uppercase tracking-wider text-slate-800">
          Technologies we use
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {page.techStack.map((t) => (
            <span
              key={t}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-slate-100 bg-slate-50/60">
        <div className="container mx-auto max-w-5xl px-4 py-12">
          <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
            {serviceName} pricing in {displayState}
          </h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <caption className="sr-only">
                {serviceName} pricing tiers, scope and support for {displayState}
              </caption>
              <thead>
                <tr className="border-b border-slate-200">
                  <th scope="col" className="py-3 pr-4 font-black text-slate-900">Tier</th>
                  <th scope="col" className="py-3 pr-4 font-black text-slate-900">Indicative price</th>
                  <th scope="col" className="py-3 pr-4 font-black text-slate-900">Best for</th>
                  <th scope="col" className="py-3 font-black text-slate-900">Support</th>
                </tr>
              </thead>
              <tbody>
                {page.pricing.map((tier) => (
                  <tr key={tier.name} className="border-b border-slate-100 align-top">
                    <th scope="row" className="py-4 pr-4 font-bold text-slate-800">{tier.name}</th>
                    <td className="py-4 pr-4 font-semibold text-slate-700">{tier.priceRange}</td>
                    <td className="py-4 pr-4 text-slate-600">{tier.scope}</td>
                    <td className="py-4 text-slate-600">{tier.support}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Indicative ranges — the final number is fixed against a written scope before work starts.{" "}
            <Link href="/contact" className="font-bold text-orange-600">Get a free estimate</Link>.
          </p>
        </div>
      </section>

      {/* Cities — the onward paths */}
      {servicedCities.length > 0 && (
        <section className="container mx-auto max-w-5xl px-4 py-12">
          <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
            {serviceName} city by city in {displayState}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
            {page.coverageParagraph}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {servicedCities.map((c) => (
              <Link
                key={c.slug}
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
            <Link
              href={`/location/${page.stateSlug}`}
              className="inline-flex items-center gap-2 text-sm font-black text-orange-600 transition hover:text-orange-700"
            >
              Every district and town in {displayState}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="container mx-auto max-w-5xl px-4 pb-12">
        <div className="rounded-3xl border border-orange-100 bg-orange-50/50 p-6 md:p-8">
          <h2 className="text-lg font-black text-slate-900">
            Talk to us about your {displayState} project
          </h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Call / WhatsApp</dt>
                <dd className="text-sm font-bold text-slate-800">
                  <a href={telHref} className="hover:text-orange-700">{business.phone.display}</a>
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Email</dt>
                <dd className="text-sm text-slate-700">
                  <a href={mailHref} className="break-all hover:text-orange-700">{business.email}</a>
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Open</dt>
                <dd className="text-sm text-slate-700">{business.hours.display}</dd>
              </div>
            </div>
          </dl>
          <address className="mt-5 not-italic text-sm leading-relaxed text-slate-600">
            {business.address.full}
          </address>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-slate-100 bg-slate-50/60">
        <div className="container mx-auto max-w-3xl px-4 py-12">
          <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
            Frequently asked questions
          </h2>
          <dl className="mt-6 space-y-6">
            {page.faqs.map((f) => (
              <div key={f.q}>
                <dt className="text-base font-bold text-slate-900">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Related services in the same state */}
      {page.relatedServices.length > 0 && (
        <section className="container mx-auto max-w-5xl px-4 py-12">
          <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
            Other services we provide in {displayState}
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {page.relatedServices.map((s) => (
              <Link
                key={s.url}
                href={s.url}
                prefetch={false}
                className="rounded-2xl border border-slate-200 p-4 transition hover:border-orange-300 hover:shadow-sm"
              >
                <span className="text-sm font-bold text-slate-800">{s.name}</span>
                <span className="mt-1 block text-xs text-slate-500">in {displayState}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
