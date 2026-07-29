"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const styles = `

  /* ══════════════════════════════════════════════
     SECTION SHELL
  ══════════════════════════════════════════════ */
  .fd-section {
    position: relative; overflow: hidden;
    background: #f2f2f4;
    padding: clamp(4rem, 9vw, 7.5rem) 0;
  }

  .fd-grain {
    position: absolute; inset: 0; z-index: 1; pointer-events: none; opacity: 0.022;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 200px 200px;
    /* grain animation removed — was repainting full section every ~0.26s */
  }
  @keyframes fdGrain {
    0%   { background-position:   0px   0px; }
    25%  { background-position: -30px  12px; }
    50%  { background-position:  14px -22px; }
    75%  { background-position: -18px  28px; }
    100% { background-position:   0px   0px; }
  }

  /* ── Liquid blobs (signature element) ──────────────────────── */
  .fd-blob {
    position: absolute; z-index: 0; pointer-events: none;
    filter: blur(60px);
    will-change: transform, border-radius;
  }
  .fd-blob-a {
    top: -12%; right: -10%; width: 46vw; height: 46vw; max-width: 620px; max-height: 620px;
    background: linear-gradient(135deg, rgba(255, 210, 0, 0.30), rgba(224, 102, 0, 0.22));
    animation: fdMorphA 17s ease-in-out infinite;
  }
  .fd-blob-b {
    bottom: -16%; left: -8%; width: 38vw; height: 38vw; max-width: 480px; max-height: 480px;
    background: linear-gradient(135deg, rgba(224, 102, 0, 0.16), rgba(255, 210, 0, 0.22));
    animation: fdMorphB 21s ease-in-out infinite;
  }
  @keyframes fdMorphA {
    0%, 100% { border-radius: 42% 58% 65% 35% / 45% 40% 60% 55%; transform: translate(0,0) rotate(0deg); }
    33%      { border-radius: 58% 42% 38% 62% / 60% 55% 45% 40%; transform: translate(-22px, 24px) rotate(8deg); }
    66%      { border-radius: 35% 65% 55% 45% / 40% 60% 38% 62%; transform: translate(16px, -18px) rotate(-6deg); }
  }
  @keyframes fdMorphB {
    0%, 100% { border-radius: 55% 45% 40% 60% / 38% 62% 45% 55%; transform: translate(0,0) rotate(0deg); }
    50%      { border-radius: 38% 62% 58% 42% / 60% 40% 55% 45%; transform: translate(20px, -14px) rotate(10deg); }
  }
  @media (prefers-reduced-motion: reduce) {
    .fd-blob-a, .fd-blob-b { animation: none; }
  }

  .fd-container {
    position: relative; z-index: 3;
    width: 100%; max-width: 1180px; margin: 0 auto;
    padding: 0 clamp(1.25rem, 4vw, 2.5rem);
  }

  .fd-grid {
    display: grid; grid-template-columns: 0.85fr 1.15fr; gap: clamp(2.5rem, 6vw, 5rem);
    align-items: center;
  }
  @media (max-width: 880px) {
    .fd-grid { grid-template-columns: 1fr; gap: 3rem; }
  }

  /* ══════════════════════════════════════════════
     PHOTO — liquid glass frame
  ══════════════════════════════════════════════ */
  .fd-photo-col {
    display: flex; justify-content: center;
    opacity: 0; transform: translateY(28px) scale(0.97);
    transition: opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1);
  }
  .fd-photo-col.show { opacity: 1; transform: translateY(0) scale(1); }

  .fd-photo-wrap {
    position: relative; width: 100%; max-width: 340px;
  }

  .fd-photo-liquid {
    position: absolute; inset: -14px; z-index: 0;
    background: linear-gradient(150deg, rgba(255, 210, 0, 0.55), rgba(224, 102, 0, 0.45));
    filter: blur(2px);
    animation: fdLiquidBorder 12s ease-in-out infinite;
    opacity: 0.85;
  }
  @keyframes fdLiquidBorder {
    0%, 100% { border-radius: 48% 52% 60% 40% / 42% 46% 54% 58%; }
    25%      { border-radius: 60% 40% 44% 56% / 56% 60% 40% 44%; }
    50%      { border-radius: 40% 60% 56% 44% / 48% 40% 60% 52%; }
    75%      { border-radius: 54% 46% 40% 60% / 60% 52% 48% 40%; }
  }

  .fd-photo-frame {
    position: relative; z-index: 1;
    aspect-ratio: 4 / 5; overflow: hidden;
    border-radius: 38px;
    background: #1d1d1f;
    border: 1px solid rgba(255,255,255,0.6);
    box-shadow: 0 24px 60px rgba(29,29,31,0.16), 0 4px 16px rgba(224, 102, 0, 0.10);
    transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
  }
  .fd-photo-wrap:hover .fd-photo-frame { transform: translateY(-4px); }

  .fd-photo-frame::before {
    content: ''; position: absolute; inset: 0; z-index: 2; pointer-events: none;
    background: linear-gradient(to top, rgba(29,29,31,0.55) 0%, rgba(29,29,31,0.0) 38%);
  }

  .fd-photo-img {
    object-fit: cover; filter: grayscale(0.55);
    transition: filter 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1);
  }
  .fd-photo-wrap:hover .fd-photo-img { filter: grayscale(0); transform: scale(1.04); }

  .fd-photo-badge {
    position: absolute; left: 1.1rem; right: 1.1rem; bottom: 1.1rem; z-index: 3;
    background: rgba(20,20,22,0.62);
    backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 16px; padding: 0.9rem 1.05rem;
    text-align: left;
  }
  .fd-photo-name {
    font-family: var(--font-dm-sans), sans-serif; font-weight: 600; font-size: 1.05rem;
    color: #fff; letter-spacing: -0.01em; line-height: 1.1;
  }
  .fd-photo-role {
    font-family: var(--font-dm-sans), sans-serif; font-weight: 500; font-size: 0.62rem;
    letter-spacing: 0.16em; text-transform: uppercase; margin-top: 0.3rem;
    background: linear-gradient(135deg, #ffd200, #d2540a);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .fd-photo-verified {
    margin-top: 0.55rem; display: flex; align-items: center; gap: 0.4rem;
  }
  .fd-dot-pulse {
    width: 6px; height: 6px; border-radius: 50%;
    background: #34d399; box-shadow: 0 0 8px rgba(52,211,153,0.7);
    animation: fdDotPulse 2.4s ease-in-out infinite;
    flex-shrink: 0;
  }
  @keyframes fdDotPulse {
    0%,100% { box-shadow: 0 0 6px rgba(52,211,153,.7), 0 0 0 0 rgba(52,211,153,.3); }
    50%     { box-shadow: 0 0 12px rgba(52,211,153,.9), 0 0 0 4px rgba(52,211,153,0); }
  }
  .fd-photo-verified span {
    font-family: var(--font-dm-sans), sans-serif; font-weight: 500; font-size: 0.58rem;
    letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.62);
  }

  /* ══════════════════════════════════════════════
     CONTENT
  ══════════════════════════════════════════════ */
  .fd-content { display: flex; flex-direction: column; gap: 1.6rem; }

  .fd-eyebrow {
    opacity: 0; transform: translateY(12px);
    transition: opacity 0.8s ease, transform 0.8s ease;
    display: inline-flex; align-items: center; gap: 0.55rem; width: fit-content;
    border-radius: 999px; padding: 0.4rem 1.05rem 0.4rem 0.8rem;
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(224, 102, 0, 0.16);
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  }
  .fd-eyebrow.show { opacity: 1; transform: translateY(0); }
  .fd-eyebrow-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #f38200; box-shadow: 0 0 8px rgba(255, 149, 0, 0.7);
  }
  .fd-eyebrow-text {
    font-family: var(--font-dm-sans), sans-serif; font-weight: 500; font-size: 0.68rem;
    letter-spacing: 0.18em; text-transform: uppercase; color: rgba(29,29,31,0.62);
  }

  .fd-heading {
    font-family: var(--font-dm-sans), sans-serif; font-weight: 600;
    font-size: clamp(2rem, 4.4vw, 3.4rem);
    color: #1d1d1f; letter-spacing: -0.03em; line-height: 1.1;
    opacity: 0; transform: translateY(20px);
    transition: opacity 0.9s ease 0.08s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.08s;
  }
  .fd-heading.show { opacity: 1; transform: translateY(0); }
  .fd-heading em {
    font-style: normal;
    background: linear-gradient(135deg, #ffd200 0%, #d2540a 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .fd-quote {
    position: relative; padding-left: 1.15rem;
    border-left: 2px solid transparent;
    border-image: linear-gradient(to bottom, #ffd200, #d2540a) 1;
    opacity: 0; transform: translateY(16px);
    transition: opacity 0.9s ease 0.16s, transform 0.9s ease 0.16s;
  }
  .fd-quote.show { opacity: 1; transform: translateY(0); }
  .fd-quote p {
    font-family: var(--font-dm-sans), sans-serif; font-weight: 400; font-style: italic;
    font-size: clamp(0.98rem, 1.3vw, 1.12rem);
    color: rgba(29,29,31,0.66); line-height: 1.65;
  }

  .fd-body {
    opacity: 0; transform: translateY(16px);
    transition: opacity 0.9s ease 0.22s, transform 0.9s ease 0.22s;
    display: flex; flex-direction: column; gap: 1rem;
  }
  .fd-body.show { opacity: 1; transform: translateY(0); }
  .fd-body p {
    font-family: var(--font-dm-sans), sans-serif; font-weight: 400;
    font-size: clamp(0.9rem, 1.1vw, 1rem);
    color: rgba(29,29,31,0.56); line-height: 1.75;
  }
  .fd-body p.fd-emph {
    color: #1d1d1f; font-weight: 600;
  }

  /* ── Liquid stat pills ─────────────────────────────────── */
  .fd-stats {
    display: flex; flex-wrap: wrap; gap: 0.85rem;
    opacity: 0; transform: translateY(16px);
    transition: opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s;
  }
  .fd-stats.show { opacity: 1; transform: translateY(0); }

  .fd-pill {
    position: relative; overflow: hidden;
    display: flex; align-items: baseline; gap: 0.45rem;
    padding: 0.7rem 1.15rem; border-radius: 999px;
    background: rgba(255,255,255,0.66);
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.7);
    box-shadow: 0 2px 14px rgba(0,0,0,0.05);
    transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease;
  }
  .fd-pill:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 22px rgba(255, 149, 0, 0.16), 0 2px 8px rgba(0,0,0,0.06);
  }
  .fd-pill-num {
    font-family: var(--font-dm-sans), sans-serif; font-weight: 700; font-size: 1.05rem;
    background: linear-gradient(135deg, #ffd200, #d2540a);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .fd-pill-label {
    font-family: var(--font-dm-sans), sans-serif; font-weight: 400; font-size: 0.7rem;
    color: rgba(29,29,31,0.5); letter-spacing: 0.01em;
  }

  /* ── CTA ──────────────────────────────────────────────── */
  .fd-cta {
    margin-top: 0.4rem;
    opacity: 0; transform: translateY(18px);
    transition: opacity 0.9s ease 0.36s, transform 0.9s ease 0.36s;
  }
  .fd-cta.show { opacity: 1; transform: translateY(0); }

  .fd-btn {
    position: relative; overflow: hidden;
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-family: var(--font-dm-sans), sans-serif; font-weight: 500; font-size: 0.86rem;
    color: rgba(29,29,31,0.8);
    padding: 0.85rem 1.7rem; border-radius: 13px;
    text-decoration: none; cursor: pointer;
    background: rgba(255,255,255,0.74);
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 2px 14px rgba(0,0,0,0.06);
    transition: transform 0.38s cubic-bezier(0.25,1,0.5,1), box-shadow 0.38s ease, color 0.3s ease;
  }
  .fd-btn::before {
    content: ''; position: absolute; inset: -1px; border-radius: 14px; padding: 1px;
    background: linear-gradient(140deg, rgba(255,255,255,0.9) 0%, rgba(255, 210, 0, 0.55) 30%, rgba(224, 102, 0, 0.55) 75%, rgba(255,255,255,0.85) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    pointer-events: none;
  }
  .fd-btn:hover {
    color: #1d1d1f; transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 24px rgba(255, 149, 0, 0.16), 0 2px 8px rgba(0,0,0,0.07);
  }
  .fd-btn svg { transition: transform 0.35s cubic-bezier(0.25,1,0.5,1); }
  .fd-btn:hover svg { transform: translateX(3px); }
`;

const STATS = [
  { num: "30+", label: "Businesses guided" },
  { num: "3", label: "Regional hubs" },
  { num: "2hr", label: "Average response" },
];

export function FounderSection() {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="fd-section" ref={ref}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="fd-blob fd-blob-a" aria-hidden="true" />
      <div className="fd-blob fd-blob-b" aria-hidden="true" />
      <div className="fd-grain" aria-hidden="true" />

      <div className="fd-container">
        <div className="fd-grid">

          {/* Photo */}
          <div className={`fd-photo-col${show ? " show" : ""}`}>
            <div className="fd-photo-wrap">
              <div className="fd-photo-liquid" aria-hidden="true" />
              <div className="fd-photo-frame">
                <Image
                  src="/team/ashish-kumar.webp"
                  alt="Ashish Kumar - Founder of Sabka Saathi"
                  fill
                  sizes="(max-width: 768px) 320px, 384px"
                  className="fd-photo-img"
                />
                <div className="fd-photo-badge">
                  <div className="fd-photo-name">Ashish Kumar</div>
                  <div className="fd-photo-role">Founder, Sabka Saathi</div>
                  <div className="fd-photo-verified">
                    <span className="fd-dot-pulse" />
                    <span>Verified identity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="fd-content">
            <div className={`fd-eyebrow${show ? " show" : ""}`}>
              <span className="fd-eyebrow-dot" />
              <span className="fd-eyebrow-text">Our Vision</span>
            </div>

            <h2 className={`fd-heading${show ? " show" : ""}`}>
              Making digital growth <em>accessible</em>
            </h2>

            <div className={`fd-quote${show ? " show" : ""}`}>
              <p>
                &ldquo;Sabka Saathi Digital Services was started with a simple vision —
                to make digital growth accessible for every business, especially
                those in small towns and local markets.&rdquo;
              </p>
            </div>

            <div className={`fd-body${show ? " show" : ""}`}>
              <p>
                <strong>Ashish Kumar</strong> recognized that many businesses and
                startups have the potential to grow but lack the right digital
                support. This platform was built to bridge that gap and provide
                simple, effective, and practical digital solutions.
              </p>
              <p className="fd-emph">
                The goal is clear — to empower thousands of businesses to build a
                strong online presence and unlock new growth opportunities.
              </p>
            </div>

            <div className={`fd-stats${show ? " show" : ""}`}>
              {STATS.map((s) => (
                <div className="fd-pill" key={s.label}>
                  <span className="fd-pill-num">{s.num}</span>
                  <span className="fd-pill-label">{s.label}</span>
                </div>
              ))}
            </div>

            <div className={`fd-cta${show ? " show" : ""}`}>
              <Link href="/trust" className="fd-btn">
                Legal &amp; trust info
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}