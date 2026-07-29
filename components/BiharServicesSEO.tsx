"use client";

import { JSX, useMemo, useState } from "react";
import Link from "next/link";
import { cities, services, stats, generateSlug } from "@/lib/localSeo";

const seoStyles = `
  .seo-panel {
    position: relative;
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid rgba(255,255,255,0.7);
    box-shadow: 0 2px 16px rgba(224, 102, 0, 0.06), 0 1px 3px rgba(29,29,31,0.04);
  }

  .seo-service-card {
    position: relative;
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid rgba(255,255,255,0.7);
    box-shadow: 0 2px 16px rgba(224, 102, 0, 0.06), 0 1px 3px rgba(29,29,31,0.04);
    transition: box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1);
  }
  /* No aspect-ratio here on purpose. A square tile pins the card height to its
     width, and the longer service copy (3 features + explainer) no longer fits
     inside that box — it spilled out past the rounded bottom edge. Cards are
     instead stretched to the tallest card in their grid row (see items-stretch
     on the grid), so every row lines up and nothing ever overflows. */
  .seo-service-card::before {
    content: ''; position: absolute; inset: -1px; border-radius: inherit; padding: 1.3px;
    pointer-events: none;
    background: linear-gradient(140deg,
      rgba(255,255,255,0.85) 0%,
      rgba(255, 210, 0, 0.35) 30%,
      rgba(224, 102, 0, 0.10) 55%,
      rgba(224, 102, 0, 0.35) 80%,
      rgba(255,255,255,0.75) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    opacity: 0.6; transition: opacity 0.4s ease;
  }
  .seo-service-card:hover { box-shadow: 0 10px 30px rgba(224, 102, 0, 0.12), 0 2px 8px rgba(29,29,31,0.06); transform: translateY(-3px); }
  .seo-service-card:hover::before { opacity: 1; }
  .seo-service-card[data-open="true"] { box-shadow: 0 12px 34px rgba(224, 102, 0, 0.14), 0 2px 8px rgba(29,29,31,0.06); transform: none; }

  .seo-icon-badge {
    background: linear-gradient(135deg, #ffd200 0%, #f38200 45%, #d2540a 100%);
  }

  .seo-expand-btn {
    position: relative; overflow: hidden; z-index: 0;
    transition: color 0.3s ease, border-color 0.3s ease;
  }
  .seo-expand-btn::before {
    content: ''; position: absolute; inset: 0; z-index: -1; border-radius: inherit;
    background: linear-gradient(135deg, #ffd200 0%, #f38200 45%, #d2540a 100%);
    transform: scaleX(0); transform-origin: left center;
    transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
  }
  .seo-expand-btn:hover { color: #fff !important; border-color: transparent !important; }
  .seo-expand-btn:hover::before { transform: scaleX(1); }
  .seo-expand-btn[data-open="true"] { color: #fff; border-color: transparent; }
  .seo-expand-btn[data-open="true"]::before { transform: scaleX(1); }

  .seo-chip {
    position: relative; overflow: hidden; z-index: 0;
    transition: color 0.25s ease, border-color 0.25s ease, transform 0.2s ease;
  }
  .seo-chip::before {
    content: ''; position: absolute; inset: 0; z-index: -1; border-radius: inherit;
    background: linear-gradient(135deg, #ffd200 0%, #f38200 45%, #d2540a 100%);
    transform: scaleX(0); transform-origin: left center;
    transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
  }
  .seo-chip:hover { color: #fff !important; border-color: transparent !important; transform: translateY(-1px); }
  .seo-chip:hover::before { transform: scaleX(1); }

  .seo-search {
    transition: border-color 0.25s ease, box-shadow 0.25s ease;
  }
  .seo-search:focus-within {
    border-color: rgba(224, 102, 0, 0.5);
    box-shadow: 0 0 0 3px rgba(224, 102, 0, 0.08);
  }

  .seo-state-label {
    background: linear-gradient(100deg, #1d1d1f 0%, #f38200 40%, #1d1d1f 60%);
    background-size: 220% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .seo-panel-enter {
    animation: seoPanelIn 0.35s cubic-bezier(0.16,1,0.3,1);
  }
  @keyframes seoPanelIn {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .seo-service-card, .seo-service-card::before, .seo-expand-btn, .seo-expand-btn::before,
    .seo-chip, .seo-chip::before, .seo-search, .seo-panel-enter { transition: none; animation: none; }
  }
`;

const serviceIcons: Record<string, JSX.Element> = {
  "mobile-app-development": (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <path d="M11 18h2" />
    </svg>
  ),
  "website-development": (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 9h20" />
      <circle cx="5.5" cy="6.5" r="0.6" fill="#fff" />
      <circle cx="7.5" cy="6.5" r="0.6" fill="#fff" />
    </svg>
  ),
  "software-development": (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
      <path d="m9 9 3 3-3 3" />
      <path d="M13 15h2" />
    </svg>
  )
};

// Fuller, plain-English explanation for each service so the card content
// stands on its own even before someone expands it.
const serviceExplainers: Record<string, string> = {
  "website-development":
    "We design and build fast, responsive websites — from marketing sites to full web platforms — that load quickly, rank well on Google, and turn visitors into customers.",
  "mobile-app-development":
    "We build native and cross-platform mobile apps for iOS and Android, covering everything from UI/UX design to launch on the App Store and Play Store.",
  "software-development":
    "We build custom software and automation tools tailored to how your business actually works, replacing manual processes with reliable, scalable systems."
};

function ServiceDirectory({ serviceKey }: { serviceKey: string }) {
  const [query, setQuery] = useState("");
  const service = services[serviceKey]!;

  const states = useMemo(() => {
    const order: string[] = [];
    cities.forEach((c) => {
      if (!order.includes(c.state)) order.push(c.state);
    });
    return order;
  }, []);

  const q = query.trim().toLowerCase();

  const grouped = useMemo(() => {
    return states
      .map((state) => ({
        state,
        list: cities
          .filter((c) => c.state === state)
          .filter((c) => (q ? c.name.toLowerCase().includes(q) : true))
          .sort((a, b) => a.name.localeCompare(b.name))
      }))
      .filter((g) => g.list.length > 0);
  }, [states, q]);

  const visibleCount = grouped.reduce((sum, g) => sum + g.list.length, 0);

  return (
    <div className="seo-panel-enter pt-6 mt-6 border-t border-black/5">
      <label className="seo-search flex items-center gap-2 w-full bg-white border border-black/10 rounded-full px-5 py-3 mb-5">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#1d1d1f]/40 shrink-0" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${cities.length}+ cities`}
          className="w-full text-sm bg-transparent outline-none placeholder:text-[#1d1d1f]/35 text-[#1d1d1f]"
          aria-label={`Search cities for ${service.name}`}
        />
      </label>

      {visibleCount === 0 ? (
        <p className="text-sm font-semibold text-[#1d1d1f]/50 text-center py-6">
          No cities match "{query}".{" "}
          <button type="button" onClick={() => setQuery("")} className="text-[#d2540a] underline underline-offset-2">
            Clear search
          </button>
        </p>
      ) : (
        /* A plain comment, not {/* … *\/}: this is the branch of a ternary, so
           the parens hold one expression and a braced JSX comment in front of
           the element parses as an object literal.

           data-lenis-prevent keeps this list's own scrollbar native — without
           it the page's smooth-scroll instance swallows the wheel gesture and
           the city list never moves. */
        <div data-lenis-prevent="" className="flex flex-col gap-5 max-h-[420px] overflow-y-auto pr-1">
          {grouped.map(({ state, list }) => (
            <div key={state}>
              <div className="flex items-baseline justify-between mb-2.5">
                <h4 className="seo-state-label text-sm font-black uppercase tracking-wider">{state}</h4>
                <span className="text-xs font-semibold text-[#1d1d1f]/35">{list.length}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {list.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/${generateSlug(serviceKey, city.slug)}`}
                    title={`${service.name} Company in ${city.name}`}
                    className="seo-chip px-3.5 py-2 rounded-lg border border-black/10 bg-white text-sm font-semibold text-[#1d1d1f]/75"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function BiharServicesSEO() {
  const serviceKeys = Object.keys(services);
  const [openService, setOpenService] = useState<string | null>(null);

  const totalPages = cities.length * serviceKeys.length;
  const stateCount = useMemo(() => new Set(cities.map((c) => c.state)).size, []);

  const heroStats = [
    { value: stats.yearsExperience, label: "Years Experience" },
    { value: stats.projectsDelivered, label: "Projects Delivered" },
    { value: stats.clientSatisfaction, label: "Client Satisfaction" },
    { value: stats.supportAvailability, label: "Support Available" }
  ];

  return (
    <section className="bg-[#f2f2f4] border-t border-black/5 py-16 md:py-24 relative overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: seoStyles }} />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-[#ffd200]/10 to-[#d2540a]/10 blur-3xl rounded-full -mr-48 -mb-48 pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#ffd200]/10 to-[#d2540a]/10 blur-3xl rounded-full -ml-48 -mt-48 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="text-sm font-black uppercase tracking-[0.3em] text-[#d2540a] block mb-3">
            Local Reach
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#1d1d1f] mb-5">
            Our Services Across{" "}
            <span className="bg-gradient-to-r from-[#ffd200] to-[#d2540a] bg-clip-text text-transparent">
              India
            </span>
          </h2>
          <div className="w-16 h-1.5 bg-gradient-to-r from-[#ffd200] to-[#d2540a] mx-auto rounded-full mb-5" />
          <p className="text-base md:text-lg text-[#1d1d1f]/60 font-medium max-w-2xl mx-auto leading-relaxed">
            Premium website development, mobile app development, and custom software automation —
            delivered remotely to businesses across {cities.length}+ cities in {stateCount} states.
          </p>
        </div>

        {/* Big stats strip */}
        <div className="seo-panel rounded-[2rem] grid grid-cols-2 md:grid-cols-4 divide-x divide-black/5 mb-12 overflow-hidden">
          {heroStats.map((s) => (
            <div key={s.label} className="px-4 py-7 text-center">
              <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#ffd200] to-[#d2540a] bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="text-xs md:text-sm font-semibold text-[#1d1d1f]/50 uppercase tracking-wide mt-1.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Service cards — equal-height tiles that explain each service */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {serviceKeys.map((key) => {
            const service = services[key]!;
            const isOpen = openService === key;
            const startingPrice = service.pricing[0]?.priceRange;

            return (
              <div
                key={key}
                data-open={isOpen}
                className={`seo-service-card rounded-[2rem] p-8 flex flex-col ${isOpen ? "md:col-span-3" : ""}`}
              >
                <div className={isOpen ? "md:grid md:grid-cols-[320px_1fr] md:gap-10" : "flex flex-col flex-1 min-w-0"}>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div className="seo-icon-badge w-16 h-16 rounded-2xl flex items-center justify-center shrink-0">
                        {serviceIcons[key]}
                      </div>
                      {startingPrice && (
                        <div className="text-right shrink-0">
                          <div className="text-xs font-bold uppercase tracking-wide text-[#1d1d1f]/40">Starting at</div>
                          <div className="text-xl font-black text-[#1d1d1f]">{startingPrice.split("–")[0].split("-")[0].trim()}</div>
                        </div>
                      )}
                    </div>

                    <h3 className="text-2xl font-black text-[#1d1d1f] mb-3 text-balance break-words">{service.name}</h3>
                    <p className="text-base text-[#1d1d1f]/70 leading-relaxed mb-5">
                      {serviceExplainers[key] ?? service.tagline}
                    </p>

                    <ul className="flex flex-col gap-2.5 mb-6">
                      {service.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm font-medium text-[#1d1d1f]/75">
                          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#ffd200] to-[#d2540a] mt-2 shrink-0" />
                          <span className="min-w-0 break-words">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      data-open={isOpen}
                      onClick={() => setOpenService(isOpen ? null : key)}
                      className="seo-expand-btn mt-auto w-full text-center py-3.5 px-4 rounded-xl border border-black/10 text-sm font-bold text-[#1d1d1f]/80"
                    >
                      {isOpen ? "Hide locations" : `Explore ${cities.length}+ locations`}
                    </button>
                  </div>

                  {isOpen && (
                    <div className="md:mt-0">
                      <ServiceDirectory serviceKey={key} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm font-semibold text-[#1d1d1f]/40 mt-10">
          {totalPages}+ location pages across {serviceKeys.length} services
        </p>
      </div>
    </section>
  );
}

/* Required by Next.js: app/seo/page.tsx must have exactly one default export
   that is a React component. This wraps the named component above. */
export default function SeoPage() {
  return <BiharServicesSEO />;
}