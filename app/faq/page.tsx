"use client";

import { useState } from "react";
import { PageHero } from "@/components/PageHero"; // adjust path to wherever you saved PageHero.tsx
import { ChevronDown } from "lucide-react";
import { RoyalFooter } from "@/components/royal/RoyalFooter";
import { primaryFaqs } from "@/lib/faqs";

const faqStyles = `
  .faq-wrap { background: #f2f2f4; padding: clamp(2.5rem,6vw,4.5rem) clamp(1.25rem,4vw,3rem) clamp(4rem,8vw,6rem); }
  .faq-shell { max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem; }

  .faq-item {
    position: relative; border-radius: 22px; overflow: hidden;
    background: rgba(255,255,255,0.78);
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
    box-shadow: 0 2px 16px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04);
    transition: box-shadow 0.35s ease, transform 0.35s ease;
  }
  .faq-item::before {
    content: ''; position: absolute; inset: -1px; border-radius: 23px; padding: 1.3px; z-index: 0;
    pointer-events: none;
    background: linear-gradient(140deg,
      rgba(255,255,255,0.85) 0%, rgba(255, 210, 0, 0.30) 30%,
      rgba(224, 102, 0, 0.10) 55%, rgba(224, 102, 0, 0.30) 80%, rgba(255,255,255,0.7) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    opacity: 0.55; transition: opacity 0.35s ease;
  }
  .faq-item.open { box-shadow: 0 8px 26px rgba(224, 102, 0, 0.10), 0 2px 8px rgba(0,0,0,0.05); }
  .faq-item.open::before { opacity: 1; }

  .faq-q {
    position: relative; z-index: 1; width: 100%; text-align: left;
    display: flex; align-items: center; justify-content: space-between; gap: 1rem;
    padding: 1.15rem 1.4rem; background: none; border: none; cursor: pointer;
    font-family: var(--font-dm-sans), sans-serif; font-weight: 600; font-size: 0.95rem;
    color: #1d1d1f; letter-spacing: -0.01em;
  }
  .faq-icon {
    flex-shrink: 0; width: 30px; height: 30px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255, 149, 0, 0.10); color: #d2540a;
    transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), background 0.3s ease;
  }
  .faq-item.open .faq-icon { transform: rotate(180deg); background: rgba(255, 149, 0, 0.16); }

  .faq-a-wrap {
    position: relative; z-index: 1; display: grid;
    grid-template-rows: 0fr; transition: grid-template-rows 0.42s cubic-bezier(0.16,1,0.3,1);
  }
  .faq-item.open .faq-a-wrap { grid-template-rows: 1fr; }
  .faq-a-inner { overflow: hidden; }
  .faq-a {
    padding: 0 1.4rem 1.25rem;
    font-family: var(--font-dm-sans), sans-serif; font-size: 0.88rem; line-height: 1.7;
    color: rgba(29,29,31,0.58); font-weight: 400;
  }

  @media (prefers-reduced-motion: reduce) {
    .faq-item, .faq-icon, .faq-a-wrap { transition: none; }
  }
`;

/* Single source of truth: lib/faqs.ts. The chat assistant reads the same
   list, so an edit there updates this page and the bot together. */
const FAQS = primaryFaqs;

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="faq-wrap">
      <style dangerouslySetInnerHTML={{ __html: faqStyles }} />
      <div className="faq-shell">
        {FAQS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className={`faq-item${isOpen ? " open" : ""}`}>
              <button
                className="faq-q"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <span className="faq-icon"><ChevronDown className="w-4 h-4" /></span>
              </button>
              <div className="faq-a-wrap">
                <div className="faq-a-inner">
                  <p className="faq-a">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function FaqPage() {
  return (
    <>
      <PageHero
        type="faq"
        badge="Got Questions?"
        title="Frequently Asked"
        titleHighlight="Questions"
        subtitle="Everything you need to know about our services, process, and pricing — answered clearly, no jargon."
        trustPoints={["Quick Response", "No Hidden Costs", "Real Answers"]}
        ctaText="Still have a question?"
        ctaHref="/#contact"
      />
      <FaqAccordion />
      <RoyalFooter />
    </>
  );
}