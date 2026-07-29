"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/cn";

/* ══════════════════════════════════════════════
   Shared design tokens — mirrors Hero.tsx exactly
   (DM Sans, orange→red gradient, #f2f2f4 canvas)
══════════════════════════════════════════════ */
const styles = `

  .fq-wrap {
    position: relative;
    background: #f2f2f4;
    padding: clamp(4rem, 9vw, 8rem) clamp(1.25rem, 4vw, 3rem);
    overflow: hidden;
  }

  .fq-grain {
    position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 200px 200px;
  }

  .fq-glow {
    position: absolute; top: -10%; right: -8%; z-index: 0; pointer-events: none;
    width: 46vw; height: 46vw; max-width: 620px; max-height: 620px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 149, 0, 0.10) 0%, rgba(224, 102, 0, 0.05) 45%, transparent 72%);
    filter: blur(10px);
  }

  .fq-inner { position: relative; z-index: 1; max-width: 820px; margin: 0 auto; }

  /* ── Header ───────────────────────────────────────────── */
  .fq-head { text-align: center; margin-bottom: clamp(2.6rem, 5vw, 4rem); }

  .fq-badge {
    position: relative;
    display: inline-flex; align-items: center; gap: 0.6rem;
    border-radius: 999px;
    padding: 0.42rem 1.2rem 0.42rem 0.85rem;
    background: rgba(255,255,255,0.76);
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
    color: rgba(0,0,0,0.55);
    font-family: var(--font-dm-sans), sans-serif; font-size: 0.78rem; font-weight: 400;
    letter-spacing: 0.015em;
    margin-bottom: 1.4rem;
    box-shadow: 0 2px 16px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);
    opacity: 0; transform: translateY(14px) scale(0.94);
    transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
  }
  .fq-badge.show { opacity: 1; transform: translateY(0) scale(1); }
  .fq-badge::before {
    content: ''; position: absolute; inset: -1px; border-radius: 999px; padding: 1.5px;
    background: linear-gradient(135deg, rgba(255,255,255,0.80) 0%, rgba(255, 149, 0, 0.55) 28%, rgba(224, 102, 0, 0.20) 52%, rgba(224, 102, 0, 0.60) 76%, rgba(255,255,255,0.72) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
  }
  .fq-badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #f38200; box-shadow: 0 0 8px rgba(255, 149, 0, 0.70); flex-shrink: 0;
    animation: fqDotPulse 2.4s ease-in-out infinite;
  }
  @keyframes fqDotPulse {
    0%,100% { box-shadow: 0 0 8px rgba(255, 149, 0, .7), 0 0 0 0 rgba(255, 149, 0, .3); }
    50%     { box-shadow: 0 0 14px rgba(255, 149, 0, .9), 0 0 0 5px rgba(255, 149, 0, 0); }
  }

  .fq-title-wrap {
    perspective: 800px;
    display: flex; flex-wrap: wrap; justify-content: center; gap: 0.18em 0.26em;
    margin-bottom: 1.1rem;
  }
  .fq-title-word {
    font-family: var(--font-dm-sans), sans-serif; font-weight: 500;
    font-size: clamp(1.9rem, 4.4vw, 3.2rem);
    color: #1d1d1f; letter-spacing: -0.02em; line-height: 1.1;
    display: inline-block;
    opacity: 0; transform: translateY(34px) rotateX(-18deg);
    transform-origin: 50% 100%;
    transition: opacity 0.78s cubic-bezier(0.16,1,0.3,1), transform 0.78s cubic-bezier(0.16,1,0.3,1);
  }
  .fq-title-word.show { opacity: 1; transform: translateY(0) rotateX(0deg); }
  .fq-title-word.accent {
    background: linear-gradient(135deg, #ffd200 0%, #d2540a 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .fq-sub {
    max-width: 520px; margin: 0 auto;
    font-family: var(--font-dm-sans), sans-serif; font-weight: 400;
    font-size: clamp(0.88rem, 1.2vw, 1rem);
    color: rgba(29,29,31,0.50); line-height: 1.65;
    opacity: 0; transform: translateY(16px);
    transition: opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s;
  }
  .fq-sub.show { opacity: 1; transform: translateY(0); }

  /* ── Accordion list ───────────────────────────────────── */
  .fq-list { display: flex; flex-direction: column; gap: 0.85rem; }

  .fq-item {
    opacity: 0; transform: translateY(22px);
    transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
  }
  .fq-item.show { opacity: 1; transform: translateY(0); }

  .fq-card {
    position: relative;
    border-radius: 20px;
    background: rgba(255,255,255,0.72);
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
    box-shadow: 0 2px 14px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);
    overflow: hidden;
    transition: box-shadow 0.4s ease, background 0.4s ease;
  }
  .fq-card::before {
    content: ''; position: absolute; inset: -1px; border-radius: 21px; padding: 1px;
    background: linear-gradient(140deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.0) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    pointer-events: none; transition: background 0.4s ease;
  }
  .fq-card.open {
    background: rgba(255,255,255,0.92);
    box-shadow: 0 10px 32px rgba(224, 102, 0, 0.10), 0 2px 8px rgba(0,0,0,0.06);
  }
  .fq-card.open::before {
    background: linear-gradient(140deg, rgba(255,255,255,0.85) 0%, rgba(255, 210, 0, 0.45) 24%, rgba(224, 102, 0, 0.10) 52%, rgba(224, 102, 0, 0.40) 80%, rgba(255,255,255,0.7) 100%);
  }

  .fq-q-btn {
    width: 100%; display: flex; align-items: center; justify-content: space-between;
    gap: 1rem; padding: 1.2rem 1.4rem; background: transparent; border: none; cursor: pointer;
    text-align: left; font-family: var(--font-dm-sans), sans-serif;
  }
  .fq-q-text {
    font-size: clamp(0.92rem, 1.25vw, 1.04rem); font-weight: 500;
    color: #1d1d1f; letter-spacing: -0.01em; line-height: 1.45;
    transition: color 0.3s ease;
  }
  .fq-card.open .fq-q-text {
    background: linear-gradient(135deg, #f38200 0%, #d2540a 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .fq-icon {
    flex-shrink: 0; width: 30px; height: 30px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    background: rgba(0,0,0,0.05); color: rgba(0,0,0,0.45);
    transition: transform 0.45s cubic-bezier(0.16,1,0.3,1), background 0.4s ease, color 0.4s ease;
  }
  .fq-card.open .fq-icon {
    transform: rotate(180deg);
    background: linear-gradient(135deg, #ffd200 0%, #d2540a 100%);
    color: #fff;
  }
  .fq-icon svg { width: 14px; height: 14px; }

  .fq-a-wrap {
    display: grid; grid-template-rows: 0fr; opacity: 0;
    transition: grid-template-rows 0.42s cubic-bezier(0.16,1,0.3,1), opacity 0.32s ease;
  }
  .fq-card.open .fq-a-wrap { grid-template-rows: 1fr; opacity: 1; }
  .fq-a-inner { overflow: hidden; }
  .fq-a {
    margin: 0; padding: 0 1.4rem 1.3rem 1.4rem;
    font-family: var(--font-dm-sans), sans-serif; font-weight: 400;
    font-size: clamp(0.86rem, 1.1vw, 0.94rem);
    color: rgba(29,29,31,0.58); line-height: 1.7;
    border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.9rem;
  }

  /* ── CTA panel ────────────────────────────────────────── */
  .fq-cta {
    position: relative; margin-top: clamp(3rem, 5vw, 4.2rem);
    border-radius: 28px; overflow: hidden;
    background: linear-gradient(160deg, #1d1d1f 0%, #161618 100%);
    padding: clamp(2.4rem, 5vw, 3.4rem) clamp(1.5rem, 4vw, 2.5rem);
    text-align: center;
    opacity: 0; transform: translateY(28px);
    transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1);
  }
  .fq-cta.show { opacity: 1; transform: translateY(0); }
  .fq-cta-glow {
    position: absolute; top: -30%; right: -10%; width: 60%; height: 140%;
    background: radial-gradient(circle, rgba(255, 149, 0, 0.16) 0%, transparent 68%);
    pointer-events: none;
  }
  .fq-cta-title {
    position: relative; font-family: var(--font-dm-sans), sans-serif; font-weight: 600;
    font-size: clamp(1.4rem, 2.6vw, 1.9rem); color: #fff; letter-spacing: -0.02em;
    margin-bottom: 0.7rem;
  }
  .fq-cta-sub {
    position: relative; font-family: var(--font-dm-sans), sans-serif; font-weight: 400;
    font-size: clamp(0.86rem, 1.1vw, 0.96rem); color: rgba(255,255,255,0.46);
    max-width: 460px; margin: 0 auto 1.8rem auto; line-height: 1.65;
  }

  .fq-cta-btn {
    position: relative; overflow: hidden; z-index: 1;
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-family: var(--font-dm-sans), sans-serif; font-weight: 500; font-size: 0.92rem;
    color: #fff; text-decoration: none; padding: 0.85rem 2.2rem; border-radius: 14px;
    background: linear-gradient(135deg, #ffd200 0%, #f38200 38%, #d2540a 72%, #a8420a 100%);
    box-shadow: 0 2px 12px rgba(224, 102, 0, 0.30), inset 0 1px 0 rgba(255,255,255,0.22);
    transition: transform 0.38s cubic-bezier(0.25,1,0.5,1), box-shadow 0.38s ease;
  }
  .fq-cta-btn:hover { transform: translateY(-2px) scale(1.025); box-shadow: 0 8px 26px rgba(224, 102, 0, 0.38), inset 0 1px 0 rgba(255,255,255,0.26); }
  .fq-cta-btn:active { transform: scale(0.96) translateY(1px); }
  .fq-cta-ripple { position: absolute; border-radius: 50%; background: rgba(255,255,255,0.22); transform: scale(0); pointer-events: none; animation: fqRipple 0.52s ease-out forwards; }
  @keyframes fqRipple { to { transform: scale(4); opacity: 0; } }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
`;

/* ══════════════════════════════════════════════
   Data
══════════════════════════════════════════════ */
export const faqs = [
  { question: "How long does it take to complete a website or app?", answer: "The timeline depends on your requirements and project complexity. Most standard websites are completed within a few days, while advanced projects may take longer. We always aim for fast delivery without compromising quality." },
  { question: "I don't have technical knowledge. Can I still work with you?", answer: "Absolutely. Our process is simple and beginner-friendly. We guide you step-by-step and handle all technical aspects so you can focus on your business." },
  { question: "Will my website be mobile-friendly?", answer: "Yes. Every website we create is fully responsive and optimized for mobile, tablet, and desktop devices." },
  { question: "Can I update or manage my website later?", answer: "Yes. We build user-friendly systems so you can easily update content. We also provide guidance if you need help managing your website." },
  { question: "Do you provide support after project completion?", answer: "Yes. We provide support and assistance even after delivery to ensure everything runs smoothly." },
  { question: "Will my business get customers through your services?", answer: "Our goal is to help you build a strong online presence and reach the right audience. Results depend on multiple factors like your business type, market, and consistency." },
  { question: "Do you provide digital marketing services?", answer: "Yes. We offer digital marketing solutions to help your business grow and attract more customers online." },
  { question: "What information do I need to get started?", answer: "You only need basic details like: Business name, Services/products, and Contact details. We guide you with everything else." },
  { question: "Can you create custom solutions for my business?", answer: "Yes. Every business is different, so we provide customized solutions based on your goals and requirements." },
  { question: "Is my data safe with you?", answer: "Yes. We maintain strict privacy and security standards. Your information is kept confidential and used only for service purposes." },
  { question: "Do you work with clients outside my city?", answer: "Yes. We work with clients across India through online communication and smooth delivery processes." },
  { question: "What makes your service different?", answer: "We focus on simple and practical solutions, clear communication, and real results—not false promises." },
  { question: "Can I request changes during the project?", answer: "Yes. Minor changes can be discussed during the development process. We ensure your final product matches your expectations." },
  { question: "Do you help with business growth strategy?", answer: "Yes. We don't just build — we guide you with strategies to grow your business online." },
  { question: "How do I get started?", answer: "It's simple: Contact us → Discuss your requirement → Get started." },
];

const TITLE_WORDS = ["Frequently", "Asked", "Questions"];
const ACCENT_INDEX = 2;

/* ══════════════════════════════════════════════
   Scroll reveal hook — IntersectionObserver, Apple-style
   "reveal once and stay" behaviour matching Hero.tsx
══════════════════════════════════════════════ */
function useReveal<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, show };
}

function RippleButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = ref.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "fq-cta-ripple";
    const size = Math.max(r.width, r.height);
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
    btn.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  }, []);

  return (
    <a href={href} ref={ref} className="fq-cta-btn" onClick={onClick}>
      {children}
    </a>
  );
}

/* ══════════════════════════════════════════════
   Main component
══════════════════════════════════════════════ */
export function FAQSection({ limit }: { limit?: number }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const displayFaqs = limit ? faqs.slice(0, limit) : faqs;

  const head = useReveal<HTMLDivElement>();
  const cta = useReveal<HTMLDivElement>(0.25);

  return (
    <section className="fq-wrap">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="fq-grain" aria-hidden="true" />
      <div className="fq-glow" aria-hidden="true" />

      <div className="fq-inner">
        {/* Header */}
        <div className="fq-head" ref={head.ref}>
          <div className={`fq-badge${head.show ? " show" : ""}`}>
            <span className="fq-badge-dot" />
            <span>Got Questions?</span>
          </div>

          <div className="fq-title-wrap" role="heading" aria-level={2}>
            {TITLE_WORDS.map((word, i) => (
              <span
                key={i}
                className={`fq-title-word${head.show ? " show" : ""}${i === ACCENT_INDEX ? " accent" : ""}`}
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                {word}
              </span>
            ))}
          </div>

          <p className={`fq-sub${head.show ? " show" : ""}`}>
            Everything you need to know before getting started. Can&apos;t find your
            answer? Reach out and we&apos;ll get back to you fast.
          </p>
        </div>

        {/* Accordion list */}
        <div className="fq-list">
          {displayFaqs.map((faq, index) => (
            <FAQItem
              key={index}
              index={index}
              faq={faq}
              open={activeIndex === index}
              onToggle={() => setActiveIndex(activeIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* CTA */}
        {!limit && (
          <div className={`fq-cta${cta.show ? " show" : ""}`} ref={cta.ref}>
            <div className="fq-cta-glow" aria-hidden="true" />
            <h3 className="fq-cta-title">Still Have Questions?</h3>
            <p className="fq-cta-sub">
              Feel free to reach out — we&apos;re here to help you at every step.
            </p>
            <RippleButton href="tel:9431673018">
              +91 9431673018
            </RippleButton>
          </div>
        )}
      </div>
    </section>
  );
}

function FAQItem({
  faq,
  index,
  open,
  onToggle,
}: {
  faq: { question: string; answer: string };
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const { ref, show } = useReveal<HTMLDivElement>(0.12);

  return (
    <div
      className={`fq-item${show ? " show" : ""}`}
      ref={ref}
      style={{ transitionDelay: `${Math.min(index, 8) * 0.05}s` }}
    >
      <div className={cn("fq-card", open && "open")}>
        <button className="fq-q-btn" onClick={onToggle} aria-expanded={open}>
          <span className="fq-q-text">{faq.question}</span>
          <span className="fq-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </button>
        <div className="fq-a-wrap">
          <div className="fq-a-inner">
            <p className="fq-a">{faq.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}