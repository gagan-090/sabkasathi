"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  Compass,
  Palette,
  Code2,
  Server,
  Link2,
  ShieldCheck,
  Rocket,
  BarChart3,
  RefreshCw,
  Zap,
} from "lucide-react";

const styles = `

  .ps-section {
    position: relative; overflow: hidden;
    background: #f2f2f4;
    padding: clamp(5rem, 10vw, 7rem) 0 clamp(4rem, 8vw, 6rem);
    font-family: var(--font-dm-sans), sans-serif;
  }

  .ps-orb { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(80px); }
  .ps-orb-1 {
    width: 480px; height: 480px;
    background: radial-gradient(circle, rgba(255, 149, 0, 0.07) 0%, transparent 70%);
    top: -160px; left: -160px;
    animation: psOrbDrift 20s ease-in-out infinite alternate;
  }
  .ps-orb-2 {
    width: 340px; height: 340px;
    background: radial-gradient(circle, rgba(224, 102, 0, 0.05) 0%, transparent 70%);
    bottom: -100px; right: -80px;
    animation: psOrbDrift 26s ease-in-out infinite alternate-reverse;
  }
  @keyframes psOrbDrift {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(28px, 18px) scale(1.07); }
  }

  .ps-grain {
    position: absolute; inset: 0; pointer-events: none; z-index: 1; opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 200px 200px;
    /* grain animation removed — was repainting full section every ~0.26s */
  }
  @keyframes psGrain {
    0%   { background-position: 0 0; }
    25%  { background-position: -28px 14px; }
    50%  { background-position: 12px -20px; }
    75%  { background-position: -16px 26px; }
  }

  .ps-inner {
    position: relative; z-index: 2;
    max-width: 1080px; margin: 0 auto;
    padding: 0 clamp(1.25rem, 4vw, 3rem);
  }

  /* ── Header ── */
  .ps-header {
    display: flex; flex-direction: column; align-items: center;
    text-align: center; margin-bottom: clamp(3rem, 6vw, 4.5rem);
  }

  .ps-eyebrow {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-size: 0.68rem; font-weight: 500;
    letter-spacing: 0.3em; text-transform: uppercase; color: rgba(0,0,0,0.36);
    margin-bottom: 1.2rem;
    opacity: 0; transform: translateY(12px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .ps-eyebrow.ps-vis { opacity: 1; transform: translateY(0); }

  .ps-eyebrow-dot {
    width: 5px; height: 5px; border-radius: 50%; background: #f38200;
    box-shadow: 0 0 8px rgba(255, 149, 0, 0.7);
    animation: psDotPulse 2.4s ease-in-out infinite;
  }
  @keyframes psDotPulse {
    0%,100% { box-shadow: 0 0 8px rgba(255, 149, 0, .7), 0 0 0 0 rgba(255, 149, 0, .3); }
    50%     { box-shadow: 0 0 14px rgba(255, 149, 0, .9), 0 0 0 5px rgba(255, 149, 0, 0); }
  }

  .ps-h2 {
    font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 500;
    letter-spacing: -0.025em; line-height: 1.1; color: #1d1d1f;
    margin-bottom: 1rem;
    opacity: 0; transform: translateY(18px);
    transition: opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s;
  }
  .ps-h2.ps-vis { opacity: 1; transform: translateY(0); }
  .ps-h2 em {
    font-style: normal;
    background: linear-gradient(135deg, #ffd200 0%, #d2540a 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .ps-subtitle {
    font-size: clamp(0.88rem, 1.2vw, 1rem); font-weight: 400;
    color: rgba(29,29,31,0.5); line-height: 1.75; max-width: 520px;
    opacity: 0; transform: translateY(14px);
    transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
  }
  .ps-subtitle.ps-vis { opacity: 1; transform: translateY(0); }

  /* ── Phase label ── */
  .ps-phase {
    display: flex; align-items: center; gap: 0.75rem;
    margin-bottom: 1.5rem;
    opacity: 0; transform: translateY(10px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .ps-phase.ps-vis { opacity: 1; transform: translateY(0); }

  .ps-phase-badge {
    display: inline-flex; align-items: center; justify-content: center;
    width: 26px; height: 26px; border-radius: 8px; flex-shrink: 0;
    background: linear-gradient(135deg, #ffd200 0%, #d2540a 100%);
    color: #fff; font-size: 0.7rem; font-weight: 600;
  }

  .ps-phase-label {
    font-size: 0.9rem; font-weight: 600;
    color: #1d1d1f; letter-spacing: -0.01em;
  }

  /* ── Marquee track ── */
  .ps-track-wrap {
    position: relative; overflow: hidden; width: 100%;
    margin-bottom: clamp(2rem, 4vw, 3rem);
  }

  .ps-track-fade-l,
  .ps-track-fade-r {
    position: absolute; top: 0; bottom: 0; width: 80px; z-index: 10; pointer-events: none;
  }
  .ps-track-fade-l { left: 0;  background: linear-gradient(to right, #f2f2f4, transparent); }
  .ps-track-fade-r { right: 0; background: linear-gradient(to left,  #f2f2f4, transparent); }

  .ps-track {
    display: flex; gap: 1.25rem;
    padding: 1rem 0.5rem 1.5rem;
    width: max-content;
  }
  .ps-track.ps-left  { animation: psMarqueeLeft  38s linear infinite; }
  .ps-track.ps-right { animation: psMarqueeRight 38s linear infinite; }
  .ps-track:hover    { animation-play-state: paused; }

  @keyframes psMarqueeLeft  { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
  @keyframes psMarqueeRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }

  /* ── Card ── */
  .ps-card {
    width: 280px; flex-shrink: 0;
    background: rgba(255,255,255,0.82);
    border: 1px solid rgba(0,0,0,0.06);
    border-radius: 22px;
    padding: 1.25rem 1.3rem 1.15rem;
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
    box-shadow: 0 2px 16px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04);
    transition: transform 0.38s cubic-bezier(0.25,1,0.5,1), box-shadow 0.38s ease;
    cursor: default;
    display: flex; flex-direction: column; gap: 0.6rem;
  }
  .ps-card:hover {
    transform: translateY(-4px) scale(1.015);
    box-shadow: 0 8px 30px rgba(255, 149, 0, 0.12), 0 2px 8px rgba(0,0,0,0.06);
  }
  .ps-card.ps-hot {
    border-color: rgba(255, 149, 0, 0.28);
    background: rgba(248, 246, 255, 0.90);
  }

  .ps-card-top {
    display: flex; align-items: center; justify-content: space-between; gap: 0.75rem;
  }
  .ps-card-icon-wrap { display: flex; align-items: center; gap: 0.65rem; }

  .ps-card-icon {
    width: 38px; height: 38px; border-radius: 11px; flex-shrink: 0;
    background: rgba(255, 149, 0, 0.08);
    display: flex; align-items: center; justify-content: center; color: #f38200;
    transition: transform 0.3s ease, background 0.3s ease;
  }
  .ps-card:hover .ps-card-icon {
    transform: scale(1.1) rotate(6deg);
    background: rgba(255, 149, 0, 0.14);
  }

  .ps-card-meta    { display: flex; flex-direction: column; gap: 1px; }
  .ps-card-step    { font-size: 0.6rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #f38200; }
  .ps-card-title   { font-size: 0.88rem; font-weight: 600; color: #1d1d1f; letter-spacing: -0.015em; line-height: 1.2; }

  .ps-hot-badge {
    display: inline-flex; align-items: center; gap: 3px;
    background: linear-gradient(135deg, #ffd200 0%, #d2540a 100%);
    color: #fff; font-size: 0.55rem; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    padding: 3px 7px; border-radius: 20px; flex-shrink: 0;
    animation: psHotPulse 2s ease-in-out infinite;
  }
  @keyframes psHotPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.7; } }

  .ps-card-desc {
    font-size: 0.76rem; font-weight: 400;
    color: rgba(29,29,31,0.52); line-height: 1.6;
  }

  .ps-card-footer {
    display: flex; align-items: center; justify-content: space-between;
    border-top: 1px solid rgba(0,0,0,0.06); padding-top: 0.65rem; margin-top: 0.1rem;
  }
  .ps-card-deliverable { display: flex; align-items: center; gap: 0.4rem; }
  .ps-card-del-label   { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #f38200; }
  .ps-card-del-val     { font-size: 0.7rem; font-weight: 600; color: #1d1d1f; }
  .ps-card-num         { font-size: 0.7rem; font-weight: 600; color: rgba(0,0,0,0.14); }

  .ps-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 149, 0, 0.15), transparent);
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
`;

/* ── Types ── */
interface Step {
  step: string;
  title: string;
  subtitle: string;
  desc: string;
  output: string;
  icon: React.ReactNode;
  hot?: boolean;
}

/* ── Data ── */
const PHASE_1: Step[] = [
  {
    step: "Step 01", title: "Discovery", subtitle: "Requirement Phase",
    desc: "Understand needs, audience, and budget. Produces an SRS document.",
    output: "SRS Document",
    icon: <Search size={16} strokeWidth={1.75} />,
  },
  {
    step: "Step 02", title: "Strategy", subtitle: "Sitemap & Features",
    desc: "Plan features, tech stack (Next.js), and SEO roadmap.",
    output: "Roadmap",
    icon: <Compass size={16} strokeWidth={1.75} />,
  },
  {
    step: "Step 03", title: "UI / UX", subtitle: "High-Fidelity",
    desc: "Figma design with a mobile-first, premium branding approach.",
    output: "Final Design",
    icon: <Palette size={16} strokeWidth={1.75} />,
  },
  {
    step: "Step 04", title: "Frontend", subtitle: "Interactive UI",
    desc: "Next.js UI development with smooth animations and UX polish.",
    output: "Live UI",
    icon: <Code2 size={16} strokeWidth={1.75} />,
  },
  {
    step: "Step 05", title: "Backend", subtitle: "Database & Logic",
    desc: "API build, authentication, and database (MongoDB) setup.",
    output: "Full Logic",
    icon: <Server size={16} strokeWidth={1.75} />,
  },
];

const PHASE_2: Step[] = [
  {
    step: "Step 06", title: "Integration", subtitle: "Connection",
    desc: "Payment gateways (Razorpay / Stripe) and email systems connected.",
    output: "Connected App",
    icon: <Link2 size={16} strokeWidth={1.75} />,
  },
  {
    step: "Step 07", title: "Testing", subtitle: "Quality Check",
    desc: "Rigorous bug, speed, and security testing for a stable build.",
    output: "Stable Build",
    icon: <ShieldCheck size={16} strokeWidth={1.75} />,
  },
  {
    step: "Step 08", title: "Deployment", subtitle: "Launch",
    desc: "VPS / Cloud setup with domain, SSL, and CI/CD pipelines.",
    output: "Live Product",
    icon: <Rocket size={16} strokeWidth={1.75} />,
  },
  {
    step: "Step 09", title: "CRM System", subtitle: "Revenue Core",
    desc: "Admin dashboard, workflow automation, and analytics — the growth engine of your app.",
    output: "Growth Engine",
    icon: <BarChart3 size={16} strokeWidth={1.75} />,
    hot: true,
  },
  {
    step: "Step 10", title: "Scaling", subtitle: "Maintenance",
    desc: "Regular updates, backups, and future scaling upgrades.",
    output: "Long-term Value",
    icon: <RefreshCw size={16} strokeWidth={1.75} />,
  },
];

/* ── Intersection hook ── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── Single card ── */
function ProcessCard({ step }: { step: Step }) {
  return (
    <div className={`ps-card${step.hot ? " ps-hot" : ""}`}>
      <div className="ps-card-top">
        <div className="ps-card-icon-wrap">
          <div className="ps-card-icon">{step.icon}</div>
          <div className="ps-card-meta">
            <span className="ps-card-step">{step.step}</span>
            <span className="ps-card-title">{step.title}</span>
          </div>
        </div>
        {step.hot && (
          <span className="ps-hot-badge">
            <Zap size={8} fill="currentColor" strokeWidth={0} />
            Hot
          </span>
        )}
      </div>
      <p className="ps-card-desc">{step.desc}</p>
      <div className="ps-card-footer">
        <div className="ps-card-deliverable">
          <span className="ps-card-del-label">Deliverable:</span>
          <span className="ps-card-del-val">{step.output}</span>
        </div>
        <span className="ps-card-num">{step.step.split(" ")[1]}</span>
      </div>
    </div>
  );
}

/* ── Marquee row ── */
function MarqueeRow({ steps, direction }: { steps: Step[]; direction: "left" | "right" }) {
  const doubled = [...steps, ...steps];
  return (
    <div className="ps-track-wrap">
      <div className="ps-track-fade-l" aria-hidden="true" />
      <div className="ps-track-fade-r" aria-hidden="true" />
      <div className={`ps-track ps-${direction}`}>
        {doubled.map((step, i) => (
          <ProcessCard key={`${step.step}-${i}`} step={step} />
        ))}
      </div>
    </div>
  );
}

/* ── Main export ── */
export function ProcessSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="ps-section" id="process" ref={ref as React.RefObject<HTMLElement>}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="ps-orb ps-orb-1" aria-hidden="true" />
      <div className="ps-orb ps-orb-2" aria-hidden="true" />
      <div className="ps-grain"        aria-hidden="true" />

      <div className="ps-inner">

        {/* Header */}
        <div className="ps-header">
          <p className={`ps-eyebrow${inView ? " ps-vis" : ""}`}>
            <span className="ps-eyebrow-dot" />
            How We Work
          </p>
          <h2 className={`ps-h2${inView ? " ps-vis" : ""}`}>
            From Idea to <em>Live Product</em>
          </h2>
          <p className={`ps-subtitle${inView ? " ps-vis" : ""}`}>
            A proven 10-step process that takes your project from requirements to a
            revenue-generating product — on time, every time.
          </p>
        </div>

        {/* Phase 01 */}
        <div
          className={`ps-phase${inView ? " ps-vis" : ""}`}
          style={{ transitionDelay: "0.3s" }}
        >
          <span className="ps-phase-badge">01</span>
          <span className="ps-phase-label">Core Development</span>
        </div>
        <MarqueeRow steps={PHASE_1} direction="left" />

        {/* Phase 02 */}
        <div
          className={`ps-phase${inView ? " ps-vis" : ""}`}
          style={{ transitionDelay: "0.45s" }}
        >
          <span className="ps-phase-badge">02</span>
          <span className="ps-phase-label">Growth & Scaling</span>
        </div>
        <MarqueeRow steps={PHASE_2} direction="right" />

      </div>

      <div className="ps-divider" aria-hidden="true" />
    </section>
  );
}