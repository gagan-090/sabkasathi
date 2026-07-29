"use client";

import { useState } from "react";

interface Faq {
  q: string;
  a: string;
}

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3 max-w-3xl mx-auto">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="rounded-2xl border border-black/10 bg-white overflow-hidden transition-shadow"
            style={{ boxShadow: isOpen ? "0 4px 20px rgba(224, 102, 0, 0.08)" : "none" }}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d2540a] focus-visible:outline-offset-2"
            >
              <span className="text-sm md:text-base font-bold text-[#1d1d1f]">{faq.q}</span>
              <span
                className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-black transition-transform"
                style={{
                  background: "linear-gradient(135deg, #ffd200, #d2540a)",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)"
                }}
              >
                +
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-4 text-sm text-[#1d1d1f]/70 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}