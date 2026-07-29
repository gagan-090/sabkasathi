"use client";

import Link from "next/link";
import { cities, services, generateSlug } from "@/lib/localSeo";

const seoStyles = `
  .seo-card {
    position: relative;
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid rgba(255,255,255,0.7);
    box-shadow: 0 2px 16px rgba(224, 102, 0, 0.06), 0 1px 3px rgba(29,29,31,0.04);
    transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease;
  }
  .seo-card::before {
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
    opacity: 0.7; transition: opacity 0.4s ease;
  }
  .seo-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(224, 102, 0, 0.12), 0 2px 8px rgba(29,29,31,0.06);
  }
  .seo-card:hover::before { opacity: 1; }

  .seo-liquid-btn {
    position: relative; overflow: hidden; z-index: 0;
    transition: color 0.35s ease, border-color 0.35s ease, transform 0.3s ease;
  }
  .seo-liquid-btn::before {
    content: ''; position: absolute; inset: 0; z-index: -1; border-radius: inherit;
    background: linear-gradient(135deg, #ffd200 0%, #f38200 45%, #d2540a 100%);
    transform: scaleX(0); transform-origin: left center;
    transition: transform 0.42s cubic-bezier(0.16,1,0.3,1);
  }
  .seo-liquid-btn:hover {
    color: #fff !important;
    border-color: transparent !important;
  }
  .seo-liquid-btn:hover::before { transform: scaleX(1); }

  .seo-cat-title {
    background: linear-gradient(100deg, #1d1d1f 0%, #f38200 40%, #1d1d1f 60%);
    background-size: 220% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (prefers-reduced-motion: reduce) {
    .seo-card, .seo-liquid-btn, .seo-liquid-btn::before { transition: none; }
  }
`;

export function BiharServicesSEO() {
  const majorCities = cities.filter((c) => c.type === "major");
  const hqCities = cities.filter((c) => c.type === "headquarters");
  const growingCities = cities.filter((c) => c.type === "growing");
  const districtCities = cities.filter((c) => c.type === "district");

  const categories = [
    { title: "Major Cities", list: majorCities },
    { title: "District Capitals", list: hqCities },
    { title: "Other Important Cities", list: growingCities },
    { title: "Nearby Districts", list: districtCities }
  ];

  return (
    <section className="bg-[#f2f2f4] border-t border-black/5 py-16 md:py-24 relative overflow-hidden select-none">
      <style dangerouslySetInnerHTML={{ __html: seoStyles }} />

      {/* Decorative background glow — matches hero accent gradient */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-[#ffd200]/10 to-[#d2540a]/10 blur-3xl rounded-full -mr-40 -mb-40 pointer-events-none" />
      <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-[#ffd200]/10 to-[#d2540a]/10 blur-3xl rounded-full -ml-40 -mt-40 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="mb-12 text-center">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-[#d2540a] block mb-2">
            Local Reach
          </span>
          <h2 className="text-3xl font-black text-[#1d1d1f] mb-4">
            Our Services Across{" "}
            <span className="bg-gradient-to-r from-[#ffd200] to-[#d2540a] bg-clip-text text-transparent">
              Bihar
            </span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-[#ffd200] to-[#d2540a] mx-auto rounded-full mb-4" />
          <p className="text-xs md:text-sm text-[#1d1d1f]/55 font-medium max-w-2xl mx-auto leading-relaxed">
            We provide premium website development, mobile app development, and custom software
            automation across all 36 major cities and districts of Bihar, driving regional digital
            transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="seo-card p-6 rounded-[2rem] flex flex-col h-fit"
            >
              <div className="text-center mb-6">
                <h3 className="seo-cat-title text-xs md:text-sm font-black tracking-wider uppercase inline-block pb-1">
                  {cat.title}
                </h3>
                <div className="w-8 h-0.5 bg-gradient-to-r from-[#ffd200] to-[#d2540a] mx-auto mt-1" />
              </div>
              <div className="flex flex-col gap-6">
                {cat.list.map((city) => (
                  <div key={city.slug} className="flex flex-col gap-2">
                    {Object.keys(services).map((sKey) => {
                      const service = services[sKey]!;
                      const slug = generateSlug(sKey, city.slug);
                      return (
                        <Link
                          key={sKey}
                          href={`/${slug}`}
                          className="seo-liquid-btn w-full text-center py-2.5 px-3 rounded-xl border border-black/10 text-[11px] font-semibold text-[#1d1d1f]/75 bg-white block"
                          title={`${service.name} Company in ${city.name}`}
                        >
                          {service.name} in {city.name}
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Required by Next.js: app/seo/page.tsx must have exactly one default export
   that is a React component. This wraps the named component above. */
export default function SeoPage() {
  return <BiharServicesSEO />;
}