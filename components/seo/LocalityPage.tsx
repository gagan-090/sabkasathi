import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { business, telHref, mailHref, whatsappHref } from "@/lib/business";
import type { DistrictPageData, TownPageData } from "@/lib/townSeo";

/*
  Shared rendering for the two levels below a state hub: the district hub and
  the town page. They carry the same furniture — breadcrumb, answer block,
  service links, sideways links to neighbours, NAP, FAQs — and differ only in
  which body copy and which link sets they are handed, so one component with
  two thin entry points beats two near-identical files that drift apart.

  Server components. lib/geo.ts is ~300 KB of town names and must never reach
  the browser.
*/

function Breadcrumb({
  trail,
}: {
  trail: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5 text-xs font-semibold text-slate-500">
      <Link href="/" className="hover:text-orange-600">Home</Link>
      <span className="mx-2">/</span>
      <Link href="/locations" className="hover:text-orange-600">Locations</Link>
      {trail.map((item) => (
        <span key={item.label}>
          <span className="mx-2">/</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-orange-600">{item.label}</Link>
          ) : (
            <span className="text-slate-800">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/* The NAP card. The footer carries the same details on every page, but a
   location page is where a visitor is actually deciding whether we are near
   enough to work with — so the address, hours and number are stated in the
   body too, in the same words the schema uses. */
function ContactCard({ place }: { place: string }) {
  return (
    <div className="rounded-3xl border border-orange-100 bg-orange-50/50 p-6 md:p-8">
      <h2 className="text-lg font-black text-slate-900">
        Talk to us about your {place} project
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        Call or WhatsApp for a fixed written quote. No charge for the estimate.
      </p>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
          <div>
            <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Office</dt>
            <dd>
              <address className="not-italic text-sm leading-relaxed text-slate-700">
                {business.address.lines.map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
              </address>
            </dd>
          </div>
        </div>

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

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={whatsappHref(`Hi, I need a website/app for my business in ${place}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-700"
        >
          WhatsApp us
        </a>
        <Link
          href="/contact"
          className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-orange-300 hover:text-orange-700"
        >
          Send a brief
        </Link>
      </div>
    </div>
  );
}

function ServiceGrid({
  services,
  place,
}: {
  services: { name: string; shortName: string; url: string }[];
  place: string;
}) {
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s) => (
        <Link
          key={s.name}
          href={s.url}
          className="rounded-2xl border border-slate-200 p-4 transition hover:border-orange-300 hover:shadow-sm"
        >
          <span className="text-sm font-bold text-slate-800">{s.name}</span>
          <span className="mt-1 block text-xs text-slate-500">for {place} businesses</span>
        </Link>
      ))}
    </div>
  );
}

function ChipLinks({ items }: { items: { label: string; href: string }[] }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-orange-300 hover:text-orange-700"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

function Faqs({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <section className="border-t border-slate-100 bg-slate-50/60">
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
          Frequently asked questions
        </h2>
        <dl className="mt-6 space-y-6">
          {faqs.map((f) => (
            <div key={f.q}>
              <dt className="text-base font-bold text-slate-900">{f.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ── district hub ────────────────────────────────────────────────────────── */

export function DistrictHub({ page }: { page: DistrictPageData }) {
  const { district, state, displayState, townCount } = page;

  return (
    <div className="bg-white">
      <JsonLd schemas={page.schemas} />

      <section className="border-b border-slate-100 bg-gradient-to-b from-orange-50/60 to-white">
        <div className="container mx-auto max-w-5xl px-4 py-14 md:py-20">
          <Breadcrumb
            trail={[
              { label: displayState, href: `/location/${state.slug}` },
              { label: `${district.name} district` },
            ]}
          />

          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-700">
            <MapPin className="h-3 w-3" />
            {townCount} towns · {displayState}
          </span>

          <h1 className="mt-4 text-3xl font-black leading-tight text-slate-900 md:text-5xl">
            Website &amp; Software Development Company in{" "}
            <span className="text-orange-600">{district.name}</span> District
          </h1>

          {/* The answer block. First thing after the H1, quotable on its own. */}
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
            <Link
              href={`/location/${state.slug}`}
              className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-orange-300 hover:text-orange-700"
            >
              All of {displayState}
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
          What we build for businesses in {district.name}
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">{page.intro}</p>
        <ServiceGrid services={page.services} place={district.name} />
      </section>

      <section className="border-t border-slate-100 bg-slate-50/60">
        <div className="container mx-auto max-w-5xl px-4 py-12">
          <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
            Towns we serve in {district.name} district
          </h2>
          <p className="mt-3 max-w-3xl text-base text-slate-600">
            Each town below has its own page. Same process, same pricing, no travel charged.
          </p>
          <ChipLinks
            items={page.towns.map((t) => ({
              label: t.name,
              href: `/location/${state.slug}/${district.slug}/${t.slug}`,
            }))}
          />
        </div>
      </section>

      <section className="container mx-auto max-w-5xl px-4 py-12">
        <ContactCard place={`${district.name} district`} />
      </section>

      {page.siblingDistricts.length > 0 && (
        <section className="container mx-auto max-w-5xl px-4 pb-12">
          <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
            Other districts in {displayState}
          </h2>
          <ChipLinks
            items={page.siblingDistricts.map((d) => ({
              label: d.name,
              href: `/location/${state.slug}/${d.slug}`,
            }))}
          />
          <div className="mt-8">
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 text-sm font-black text-orange-600 transition hover:text-orange-700"
            >
              Browse every location we serve
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}

      <Faqs faqs={page.faqs} />
    </div>
  );
}

/* ── town page ───────────────────────────────────────────────────────────── */

export function TownPage({ page }: { page: TownPageData }) {
  const { town, district, state, displayState } = page;

  return (
    <div className="bg-white">
      <JsonLd schemas={page.schemas} />

      <section className="border-b border-slate-100 bg-gradient-to-b from-orange-50/60 to-white">
        <div className="container mx-auto max-w-5xl px-4 py-14 md:py-20">
          <Breadcrumb
            trail={[
              { label: displayState, href: `/location/${state.slug}` },
              { label: `${district.name} district`, href: `/location/${state.slug}/${district.slug}` },
              { label: town.name },
            ]}
          />

          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-700">
            <MapPin className="h-3 w-3" />
            {district.name} district · {displayState}
          </span>

          <h1 className="mt-4 text-3xl font-black leading-tight text-slate-900 md:text-5xl">
            Website &amp; Software Development Company in{" "}
            <span className="text-orange-600">{town.name}</span>
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
              href={whatsappHref(`Hi, I need a website/app for my business in ${town.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-orange-300 hover:text-orange-700"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
          Software and web development for {town.name} businesses
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">{page.intro}</p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
          {page.demandParagraph}
        </p>
        <ServiceGrid services={page.services} place={town.name} />
        {page.anchorCity && (
          <p className="mt-6 text-sm text-slate-500">
            Each link above opens our full{" "}
            <Link
              href={`/website-development-company-in-${page.anchorCity.slug}`}
              className="font-bold text-orange-600 hover:text-orange-700"
            >
              {page.anchorCity.name}
            </Link>{" "}
            service page — same team, same pricing, and the nearest town to {town.name} where we
            publish detailed scope, timelines and FAQs for every service.
          </p>
        )}
      </section>

      <section className="border-t border-slate-100 bg-slate-50/60">
        <div className="container mx-auto max-w-5xl px-4 py-12">
          <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
            How we work with {town.name}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
            {page.deliveryParagraph}
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-5xl px-4 py-12">
        <ContactCard place={town.name} />
      </section>

      {page.siblings.length > 0 && (
        <section className="container mx-auto max-w-5xl px-4 pb-12">
          <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
            Other towns in {district.name} district
          </h2>
          <p className="mt-3 max-w-3xl text-base text-slate-600">
            We cover the whole district — {page.siblings.length} more towns around {town.name}.
          </p>
          <ChipLinks
            items={page.siblings.map((t) => ({
              label: t.name,
              href: `/location/${state.slug}/${district.slug}/${t.slug}`,
            }))}
          />
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={`/location/${state.slug}/${district.slug}`}
              className="inline-flex items-center gap-2 text-sm font-black text-orange-600 transition hover:text-orange-700"
            >
              {district.name} district hub
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/location/${state.slug}`}
              className="inline-flex items-center gap-2 text-sm font-black text-orange-600 transition hover:text-orange-700"
            >
              All of {displayState}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}

      <Faqs faqs={page.faqs} />
    </div>
  );
}
