"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/LiquidButton";

const styles = `

  .ts-section { position: relative; overflow: hidden; font-family: var(--font-dm-sans), sans-serif; padding: clamp(4rem, 9vw, 7rem) 0; }

  .ts-blob {
    position: absolute; z-index: 0; pointer-events: none; filter: blur(70px);
    background: linear-gradient(135deg, rgba(255, 210, 0, 0.18), rgba(224, 102, 0, 0.14));
    animation: tsMorph 19s ease-in-out infinite;
  }
  .ts-blob-a { top: -8%; left: 6%; width: 34vw; height: 34vw; max-width: 480px; max-height: 480px; }
  .ts-blob-b {
    bottom: -10%; right: 4%; width: 28vw; height: 28vw; max-width: 400px; max-height: 400px;
    background: linear-gradient(135deg, rgba(224, 102, 0, 0.12), rgba(255, 210, 0, 0.16));
    animation-duration: 23s;
  }
  @keyframes tsMorph {
    0%, 100% { border-radius: 42% 58% 65% 35% / 45% 40% 60% 55%; transform: scale(1) rotate(0deg); }
    50%      { border-radius: 58% 42% 38% 62% / 60% 55% 45% 40%; transform: scale(1.06) rotate(8deg); }
  }
  @media (prefers-reduced-motion: reduce) { .ts-blob { animation: none; } }

  .ts-eyebrow {
    display: inline-flex; align-items: center; gap: 0.5rem;
    border-radius: 999px; padding: 0.4rem 1.05rem 0.4rem 0.8rem;
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(224, 102, 0, 0.16);
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
    font-weight: 500; font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(29,29,31,0.6);
  }
  .ts-eyebrow-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #f38200; box-shadow: 0 0 8px rgba(255, 149, 0, 0.7);
  }

  .ts-heading {
    font-weight: 600; letter-spacing: -0.03em; color: #1d1d1f;
  }

  .ts-card {
    position: relative; overflow: hidden;
    background: rgba(255,255,255,0.66);
    backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.75);
    box-shadow: 0 24px 60px rgba(29,29,31,0.10), 0 4px 16px rgba(224, 102, 0, 0.07);
    border-radius: 28px;
  }
  .ts-card::before {
    content: ''; position: absolute; inset: -1px; border-radius: 29px; padding: 1px;
    background: linear-gradient(140deg,
      rgba(255,255,255,0.85) 0%, rgba(255, 210, 0, 0.40) 24%,
      rgba(224, 102, 0, 0.10) 50%, rgba(224, 102, 0, 0.34) 78%, rgba(255,255,255,0.7) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    pointer-events: none;
  }

  .ts-quote-mark {
    font-family: var(--font-dm-sans), sans-serif; font-weight: 700; line-height: 1;
    background: linear-gradient(135deg, #ffd200, #d2540a);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    opacity: 0.85;
  }

  .ts-feedback { color: rgba(29,29,31,0.68); font-weight: 400; }
  .ts-name { color: #1d1d1f; font-weight: 600; letter-spacing: -0.01em; }
  .ts-role { color: rgba(29,29,31,0.42); font-weight: 400; }

  .ts-star { color: #ffd200; }
  .ts-star.off { color: rgba(0,0,0,0.12); }

  .ts-dots { display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
  .ts-dot {
    height: 7px; border-radius: 999px; background: rgba(0,0,0,0.14);
    width: 7px; cursor: pointer; border: none; padding: 0;
    transition: width 0.4s cubic-bezier(0.25,1,0.5,1), background 0.3s ease;
  }
  .ts-dot.active {
    width: 22px;
    background: linear-gradient(135deg, #ffd200, #d2540a);
  }

  .ts-arrow {
    width: 2.7rem; height: 2.7rem; border-radius: 50%;
    display: inline-flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,0.72);
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(0,0,0,0.06);
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    color: #1d1d1f; cursor: pointer;
    transition: transform 0.35s cubic-bezier(0.25,1,0.5,1), box-shadow 0.35s ease, background 0.3s ease;
  }
  .ts-arrow:hover {
    transform: translateY(-2px);
    background: rgba(255,255,255,0.92);
    box-shadow: 0 8px 20px rgba(255, 149, 0, 0.16);
  }
`;

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Founder, Retail SaaS",
    feedback:
      "Sabka Saathi transformed our legacy systems into a modern SaaS platform. Their expertise is unmatched.",
    rating: 5,
  },
  {
    name: "Nisha Rao",
    role: "Product Lead, Consumer App",
    feedback:
      "The mobile app they built for us is fast, intuitive, and loved by our users. Highly recommend their team.",
    rating: 5,
  },
  {
    name: "Ishan Kapoor",
    role: "CTO, Logistics Platform",
    feedback:
      "Scaling our cloud infrastructure was seamless with their help. Professional and dedicated engineers.",
    rating: 4,
  },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center justify-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill={i < rating ? "currentColor" : "none"}
          className={`ts-star ${i < rating ? "" : "off"}`}
        >
          <path
            d="M8 1.2L9.8 5.6L14.6 6L11 9.2L12 14L8 11.6L4 14L5 9.2L1.4 6L6.2 5.6L8 1.2Z"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  const go = (dir: 1 | -1) => {
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="ts-section">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="ts-blob ts-blob-a" aria-hidden="true" />
      <div className="ts-blob ts-blob-b" aria-hidden="true" />

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="ts-eyebrow mb-5">
            <span className="ts-eyebrow-dot" />
            Testimonials
          </div>
          <h2 className="ts-heading text-3xl md:text-5xl">Trusted by industry leaders</h2>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="ts-card p-8 md:p-12 text-center">
                <span className="ts-quote-mark text-5xl block mb-2">&ldquo;</span>
                <p className="ts-feedback text-lg leading-8 -mt-4">{current.feedback}</p>

                <div className="mt-7 flex flex-col items-center gap-2.5">
                  <StarRow rating={current.rating} />
                  <p className="ts-name text-lg">{current.name}</p>
                  <p className="ts-role text-sm">{current.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button className="ts-arrow" onClick={() => go(-1)} aria-label="Previous testimonial">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2.5L4 7L9 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="ts-dots">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  className={`ts-dot${i === index ? " active" : ""}`}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button className="ts-arrow" onClick={() => go(1)} aria-label="Next testimonial">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2.5L10 7L5 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}