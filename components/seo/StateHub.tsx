import Link from "next/link";
import { MapPin } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceList, type StateHubPage } from "@/lib/stateSeo";

/*
  A state hub — the top of the location tree.

  Its job is threefold, in this order:
    1. Answer "who builds websites in <state>" in the first paragraph, in a
       form an AI engine can quote without the rest of the page.
    2. Give every district and town in lib/geo.ts a crawlable internal link, so
       the long tail is discoverable without each town needing a thin page of
       its own. This is what the tiered plan trades those pages for.
    3. Point at the service × city pages that already exist, which are the
       pages with somewhere further to go.

  Server component on purpose: lib/geo.ts is ~140 KB of town names and must
  never reach the browser.
*/

/*
  Nine states still hold their towns as one alphabetical list rather than
  grouped under districts (see the `flat` flag in lib/geo.ts). The town names
  are real; only the district assignment is missing, and guessing it would put
  factual errors on a public page. Until that data exists, group them A–Z so a
  three-hundred-name run is scannable instead of a wall of text.
*/
function groupByInitial(towns: { name: string; slug: string }[]) {
  const buckets = new Map<string, { name: string; slug: string }[]>();
  for (const town of towns) {
    const initial = town.name[0].toUpperCase();
    const bucket = buckets.get(initial);
    if (bucket) bucket.push(town);
    else buckets.set(initial, [town]);
  }
  return [...buckets.entries()].sort(([a], [b]) => a.localeCompare(b));
}

export function StateHub({ page }: { page: StateHubPage }) {
  const { displayName, profile, geo, districtCount, townCount, servicedCities } = page;
  const districts = geo.districts.filter((d) => !d.flat);
  const looseTowns = geo.districts.filter((d) => d.flat).flatMap((d) => d.towns);

  return (
    <div className="bg-white">
      <JsonLd schemas={page.schemas} />

      <section className="border-b border-slate-100 bg-gradient-to-b from-orange-50/60 to-white">
        <div className="container mx-auto max-w-5xl px-4 py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="mb-5 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/locations" className="hover:text-orange-600">Locations</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-800">{displayName}</span>
          </nav>

          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-700">
            <MapPin className="h-3 w-3" />
            {districtCount ? `${districtCount} districts` : "State-wide"} · {townCount.toLocaleString("en-IN")} towns
          </span>

          <h1 className="mt-4 text-3xl font-black leading-tight text-slate-900 md:text-5xl">
            Web Development &amp; Software Company in{" "}
            <span className="text-orange-600">{displayName}</span>
          </h1>

          {/* The answer block. First thing after the H1, quotable on its own. */}
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            {page.answer}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-orange-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-700"
            >
              Get a fixed quote
            </Link>
            <Link
              href="/locations"
              className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-orange-300 hover:text-orange-700"
            >
              All locations
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
          What we build for businesses in {displayName}
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          {displayName} is {profile.economy}. The businesses we work with here are usually{" "}
          {profile.buyers} — and what they most often need is {profile.demand}.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {serviceList.map((s) => (
            <Link
              key={s.slug}
              href={page.serviceHref(s.slug)}
              className="rounded-2xl border border-slate-200 p-4 transition hover:border-orange-300 hover:shadow-sm"
            >
              <span className="text-sm font-bold text-slate-800">{s.name}</span>
              <span className="mt-1 block text-xs text-slate-500">in {displayName}</span>
            </Link>
          ))}
        </div>
      </section>

      {servicedCities.length > 0 && (
        <section className="border-t border-slate-100 bg-slate-50/60">
          <div className="container mx-auto max-w-5xl px-4 py-12">
            <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
              Cities in {displayName} with full service pages
            </h2>
            <p className="mt-3 max-w-3xl text-base text-slate-600">
              Each of these has its own page for every service we offer, with local pricing,
              timelines and FAQs.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {servicedCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/website-development-company-in-${c.slug}`}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-orange-300 hover:text-orange-700"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* The long tail. Every town in the state gets named and linked here
          rather than getting a thin page of its own. */}
      <section className="container mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
          Towns we serve across {displayName}
        </h2>
        <p className="mt-3 max-w-3xl text-base text-slate-600">
          We work remotely with clients in all {townCount.toLocaleString("en-IN")} towns below
          {districtCount ? `, across ${districtCount} districts` : ""}. Same process, same pricing,
          no travel charged.
        </p>

        {districts.length > 0 && (
          <div className="mt-8 space-y-7">
            {districts.map((d) => (
              <div key={d.slug}>
                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-orange-700">
                  {d.name} district
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {d.towns.map((t) => t.name).join(" · ")}
                </p>
              </div>
            ))}
          </div>
        )}

        {looseTowns.length > 0 && (
          <div className="mt-8 space-y-6">
            {groupByInitial(looseTowns).map(([initial, towns]) => (
              <div key={initial}>
                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-orange-700">
                  {initial}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {towns.map((t) => t.name).join(" · ")}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

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
    </div>
  );
}
