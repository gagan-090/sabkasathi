import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  MapPin,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { RoyalFooter } from "@/components/royal/RoyalFooter";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { Button } from "@/components/ui/LiquidButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { SeoAppShowcase } from "@/components/seo/SeoAppShowcase";
import type { IndustryPageData } from "@/lib/industrySeo";

/*
  The industry × service page — the second programmatic axis (the first,
  service × city, is rendered inline in app/[slug]/page.tsx).

  Deliberately built in the same visual language as the city pages rather than
  a new one: both are reached from the same search results and the same
  internal links, and a visitor moving between them should not feel handed to
  a different company.

  Section order is chosen for answer engines as much as for readers. The
  direct-answer block sits above the fold and immediately after the H1, because
  that is the passage an AI overview will quote; everything below it exists to
  substantiate that passage rather than to restate it.
*/

export function IndustryServicePage({ data }: { data: IndustryPageData }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <InteractiveBackground />
      <Navbar />

      <JsonLd schemas={data.schemas} />

      <main className="flex-1">
        {/* ── Breadcrumbs ───────────────────────────────────────────────── */}
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
            <li>
              <Link
                href={`/industries/${data.industrySlug}`}
                className="hover:text-orange-600 transition-colors"
              >
                {data.industryLabel}
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="w-4 h-4" />
            </li>
            <li className="text-orange-600 font-extrabold truncate max-w-[160px] md:max-w-none">
              {data.serviceName}
            </li>
          </ol>
        </nav>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="pt-10 pb-14 md:pt-16 md:pb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/5 blur-3xl rounded-full -mr-40 -mt-40 pointer-events-none" />
          <div className="container mx-auto px-4 max-w-5xl relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-black uppercase tracking-widest mb-7">
              <Sparkles className="w-4 h-4" />
              {data.industryGroup} · {data.serviceGroup}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.06] max-w-4xl mb-7">
              {data.industryName}{" "}
              <span className="text-orange-600 italic">{data.serviceName}</span>
            </h1>
            <p className="text-slate-500 font-medium text-base md:text-xl max-w-2xl leading-relaxed mb-10">
              {data.tagline}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button
                  variant="primary"
                  size="lg"
                  className="rounded-2xl shadow-xl shadow-orange-600/15 text-base px-8 py-4"
                >
                  Get a Free Quote
                </Button>
              </Link>
              <Link href="#how">
                <Button
                  variant="secondary"
                  size="lg"
                  className="rounded-2xl border-slate-200 text-base px-8 py-4"
                >
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── AEO: the quotable direct answer ───────────────────────────── */}
        <section
          aria-label="Direct answer summary"
          className="container mx-auto px-4 max-w-5xl"
        >
          <div className="rounded-3xl border border-cyan-500/20 bg-slate-900 p-6 md:p-9 shadow-xl">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                Direct answer
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {data.industryLabel} · India
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
              What is {data.industryName} {data.serviceName}?
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8">
              {data.directAnswer}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-cyan-300 uppercase tracking-wider mb-3">
                  Key points
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  {data.keyTakeaways.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold" aria-hidden="true">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-cyan-300 uppercase tracking-wider mb-3">
                  At a glance
                </h3>
                <dl className="divide-y divide-white/10 text-sm">
                  {data.specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between gap-4 py-2">
                      <dt className="text-slate-400">{spec.label}</dt>
                      <dd className="text-slate-200 font-semibold text-right">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* 3-Phone Interactive App Showcase */}
        <SeoAppShowcase serviceName={data.serviceName} />

        {/* ── Why this industry ─────────────────────────────────────────── */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-orange-600 text-xs font-black uppercase tracking-widest mb-4">
                <Building2 className="w-4 h-4" />
                Built for {data.industryLabel}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-7 leading-tight">
                Why {data.industryName.toLowerCase()} projects are different
              </h2>
              <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed mb-6">
                {data.intro}
              </p>
              <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
                {data.whyThisIndustry}
              </p>
            </div>
          </div>
        </section>

        {/* ── Pain → fix ────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-slate-50/60 border-y border-slate-100">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-14">
              <span className="text-sm font-black uppercase tracking-[0.3em] text-orange-600 block mb-3">
                The problems this solves
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                What {data.industryName.toLowerCase()} teams actually struggle with
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.pains.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl bg-white border border-slate-100 p-7 shadow-sm"
                >
                  <span className="inline-block text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                    Problem {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 leading-snug mb-4">
                    {item.pain}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.fix}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── What gets built ───────────────────────────────────────────── */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
              <div className="md:col-span-6">
                <div className="inline-flex items-center gap-2 text-orange-600 text-xs font-black uppercase tracking-widest mb-4">
                  <Wrench className="w-4 h-4" />
                  What gets built
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-7 leading-tight">
                  Included in every {data.serviceName.toLowerCase()} project
                </h2>
                <ul className="space-y-4">
                  {data.modules.map((mod, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base font-bold text-slate-700">{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-6">
                <div className="inline-flex items-center gap-2 text-orange-600 text-xs font-black uppercase tracking-widest mb-4">
                  <MapPin className="w-4 h-4" />
                  What {data.industryName.toLowerCase()} businesses need it to do
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-7 leading-tight">
                  Shaped around your operation
                </h2>
                <ul className="space-y-4">
                  {data.systems.map((sys, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base font-bold text-slate-700">{sys}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-14">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-5">
                Technology we build it on
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {data.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-sm font-bold text-slate-600 bg-slate-100 rounded-full px-4 py-2"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── How it works ──────────────────────────────────────────────── */}
        <section id="how" className="py-16 md:py-24 bg-slate-50/60 border-y border-slate-100">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="max-w-3xl">
              <span className="text-sm font-black uppercase tracking-[0.3em] text-orange-600 block mb-3">
                How we deliver
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-7 leading-tight">
                From first call to handover
              </h2>
              <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
                {data.howItWorks}
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { n: "01", t: "Discovery", d: "We map how the work happens today." },
                { n: "02", t: "Prototype", d: "You approve the shape before we build it." },
                { n: "03", t: "Build", d: "Weekly builds you can open and use." },
                { n: "04", t: "Handover", d: "Training, source code and documentation." },
              ].map((step) => (
                <div key={step.n} className="rounded-2xl bg-white border border-slate-100 p-6">
                  <span className="block text-2xl font-black text-orange-600 mb-3">{step.n}</span>
                  <h3 className="text-base font-black text-slate-900 mb-2">{step.t}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ (mirrors the FAQPage schema above) ────────────────────── */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 text-orange-600 text-xs font-black uppercase tracking-widest mb-4">
                <HelpCircle className="w-4 h-4" />
                Questions
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                {data.industryName} {data.serviceName} FAQs
              </h2>
            </div>
            <div className="space-y-4">
              {data.faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
                  open={idx === 0}
                >
                  <summary className="cursor-pointer list-none text-base md:text-lg font-black text-slate-900 flex items-start justify-between gap-4">
                    {faq.q}
                    <ChevronRight
                      className="w-5 h-5 flex-shrink-0 text-orange-600 transition-transform group-open:rotate-90"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="mt-4 text-sm md:text-base text-slate-500 font-medium leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── GEO: the same service, by city ────────────────────────────── */}
        <section className="py-16 md:py-24 bg-slate-50/60 border-y border-slate-100">
          <div className="container mx-auto px-4 max-w-5xl">
            <span className="text-sm font-black uppercase tracking-[0.3em] text-orange-600 block mb-3">
              Where we deliver
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
              {data.serviceName} in your city
            </h2>
            <p className="text-base text-slate-500 font-medium leading-relaxed max-w-2xl mb-9">
              Delivery is remote, so location is never a constraint. These are the cities with a
              dedicated page covering local context, pricing and process.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {data.cityLinks.map((city) => (
                <Link
                  key={city.url}
                  href={city.url}
                  className="text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:border-orange-300 hover:text-orange-600 rounded-full px-4 py-2 transition-colors"
                >
                  {city.name}
                </Link>
              ))}
            </div>
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 mt-8 text-sm font-black text-orange-600 hover:underline"
            >
              See all cities we cover
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ── Internal linking: the rest of both axes ───────────────────── */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-14">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 leading-tight">
                Other services for {data.industryLabel.toLowerCase()}
              </h2>
              <ul className="space-y-2.5">
                {data.siblingServices.slice(0, 12).map((svc) => (
                  <li key={svc.url}>
                    <Link
                      href={svc.url}
                      className="text-sm font-bold text-slate-600 hover:text-orange-600 transition-colors"
                    >
                      {svc.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/industries/${data.industrySlug}`}
                className="inline-flex items-center gap-2 mt-6 text-sm font-black text-orange-600 hover:underline"
              >
                All {data.siblingServices.length + 1} services for {data.industryName.toLowerCase()}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {data.siblingIndustries.length > 0 && (
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 leading-tight">
                  {data.serviceName} for related industries
                </h2>
                <ul className="space-y-2.5">
                  {data.siblingIndustries.map((ind) => (
                    <li key={ind.url}>
                      <Link
                        href={ind.url}
                        className="text-sm font-bold text-slate-600 hover:text-orange-600 transition-colors"
                      >
                        {ind.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/industries"
                  className="inline-flex items-center gap-2 mt-6 text-sm font-black text-orange-600 hover:underline"
                >
                  Browse all industries
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-slate-900">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              Talk to us about your {data.industryName.toLowerCase()} project
            </h2>
            <p className="text-slate-400 font-medium text-base md:text-lg leading-relaxed mb-10">
              A free discovery call, a fixed quote against an agreed scope, and a prototype before
              you commit to the build. Typical delivery {data.timeline}.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button
                  variant="primary"
                  size="lg"
                  className="rounded-2xl text-base px-8 py-4 shadow-xl shadow-orange-600/20"
                >
                  Get a Free Quote
                </Button>
              </Link>
              <a
                href={`tel:${data.contactInfo.phone}`}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 text-white font-black text-base px-8 py-4 hover:bg-white/5 transition-colors"
              >
                Call {data.contactInfo.phone}
              </a>
            </div>
          </div>
        </section>
      </main>

      <RoyalFooter />
    </div>
  );
}
