"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import CardSwap, { Card } from "./CardSwap";
import {
  Utensils,
  GraduationCap,
  Activity,
  ShoppingCart,
  Layers,
} from "lucide-react";

const styles = `

  .ss-section {
    position: relative; overflow: hidden;
    background: #f2f2f4;
    padding: clamp(5rem, 10vw, 7rem) 0 clamp(4rem, 8vw, 6rem);
    font-family: var(--font-dm-sans), sans-serif;
  }
  .ss-orb { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(80px); }
  .ss-orb-1 {
    width: 480px; height: 480px;
    background: radial-gradient(circle, rgba(255, 149, 0, 0.07) 0%, transparent 70%);
    top: -160px; left: -160px;
    animation: ssOrbDrift 20s ease-in-out infinite alternate;
  }
  .ss-orb-2 {
    width: 340px; height: 340px;
    background: radial-gradient(circle, rgba(224, 102, 0, 0.05) 0%, transparent 70%);
    bottom: -100px; right: -80px;
    animation: ssOrbDrift 26s ease-in-out infinite alternate-reverse;
  }
  @keyframes ssOrbDrift {
    from { transform: translate(0,0) scale(1); }
    to   { transform: translate(28px,18px) scale(1.07); }
  }
  .ss-grain {
    position: absolute; inset: 0; pointer-events: none; z-index: 1; opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 200px 200px;
    /* grain animation removed — was repainting full section every ~0.26s */
  }
  @keyframes ssGrain {
    0%  { background-position: 0 0; }   25% { background-position: -28px 14px; }
    50% { background-position: 12px -20px; } 75% { background-position: -16px 26px; }
  }
  .ss-inner {
    position: relative; z-index: 2;
    max-width: 1080px; margin: 0 auto;
    padding: 0 clamp(1.25rem, 4vw, 3rem);
    display: grid; grid-template-columns: 1fr 1fr;
    gap: clamp(2.5rem, 5vw, 5rem); align-items: center;
  }
  @media (max-width: 900px) { .ss-inner { grid-template-columns: 1fr; } .ss-right { display: none; } }
  .ss-left { display: flex; flex-direction: column; align-items: flex-start; }
  .ss-eyebrow {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-size: 0.68rem; font-weight: 500;
    letter-spacing: 0.3em; text-transform: uppercase; color: rgba(0,0,0,0.36);
    margin-bottom: 1.2rem;
    opacity: 0; transform: translateY(12px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .ss-eyebrow.ss-vis { opacity: 1; transform: translateY(0); }
  .ss-eyebrow-dot {
    width: 5px; height: 5px; border-radius: 50%; background: #f38200;
    box-shadow: 0 0 8px rgba(255, 149, 0, 0.7);
    animation: ssDotPulse 2.4s ease-in-out infinite;
  }
  @keyframes ssDotPulse {
    0%,100% { box-shadow: 0 0 8px rgba(255, 149, 0, .7), 0 0 0 0 rgba(255, 149, 0, .3); }
    50%     { box-shadow: 0 0 14px rgba(255, 149, 0, .9), 0 0 0 5px rgba(255, 149, 0, 0); }
  }
  .ss-h2 {
    font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 500;
    letter-spacing: -0.025em; line-height: 1.1; color: #1d1d1f;
    margin: 0 0 1.2rem;
    opacity: 0; transform: translateY(18px);
    transition: opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s;
  }
  .ss-h2.ss-vis { opacity: 1; transform: translateY(0); }
  .ss-h2 em {
    font-style: normal;
    background: linear-gradient(135deg, #ffd200 0%, #d2540a 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .ss-body {
    font-size: clamp(0.88rem, 1.2vw, 1rem); font-weight: 400;
    color: rgba(29,29,31,0.5); line-height: 1.75; max-width: 480px; margin: 0 0 2.2rem;
    opacity: 0; transform: translateY(14px);
    transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
  }
  .ss-body.ss-vis { opacity: 1; transform: translateY(0); }
  .ss-list { list-style: none; margin: 0 0 2.4rem; padding: 0; display: flex; flex-direction: column; gap: 0.85rem; }
  .ss-list-item {
    display: flex; align-items: center; gap: 0.85rem;
    font-size: 0.88rem; font-weight: 500; color: rgba(29,29,31,0.72);
    opacity: 0; transform: translateX(-12px);
    transition: opacity 0.65s ease, transform 0.65s cubic-bezier(0.16,1,0.3,1);
  }
  .ss-list-item.ss-vis { opacity: 1; transform: translateX(0); }
  .ss-check {
    width: 20px; height: 20px; border-radius: 50%; flex-shrink: 0;
    background: rgba(255, 149, 0, 0.08);
    display: flex; align-items: center; justify-content: center;
  }
  .ss-check svg { width: 10px; height: 10px; }
  .ss-btns {
    display: flex; flex-wrap: wrap; gap: 0.9rem;
    opacity: 0; transform: translateY(14px);
    transition: opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s;
  }
  .ss-btns.ss-vis { opacity: 1; transform: translateY(0); }
  .ss-btn {
    position: relative; overflow: hidden;
    font-family: var(--font-dm-sans), sans-serif; font-weight: 500;
    font-size: clamp(0.82rem, 1.05vw, 0.9rem);
    padding: 0.8rem 2rem; border-radius: 12px;
    text-decoration: none; cursor: pointer;
    display: inline-flex; align-items: center; justify-content: center;
    transition: transform 0.36s cubic-bezier(0.25,1,0.5,1), box-shadow 0.36s ease;
  }
  .ss-btn:active { transform: scale(0.96) translateY(1px) !important; }
  .ss-btn.primary {
    color: #fff;
    background: linear-gradient(135deg, #ffd200 0%, #f38200 38%, #d2540a 72%, #a8420a 100%);
    box-shadow: 0 2px 12px rgba(224, 102, 0, 0.26), 0 1px 3px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.22);
  }
  .ss-btn.primary::before {
    content: ''; position: absolute; inset: 0; border-radius: 12px;
    background: linear-gradient(160deg, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0) 52%);
    pointer-events: none;
  }
  .ss-btn.primary:hover { transform: translateY(-2px) scale(1.025); box-shadow: 0 8px 26px rgba(224, 102, 0, 0.32), 0 2px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.26); }
  .ss-btn.secondary {
    color: rgba(29,29,31,0.76); background: rgba(255,255,255,0.72);
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 2px 14px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.05); border: 1px solid transparent;
  }
  .ss-btn.secondary::before {
    content: ''; position: absolute; inset: -1px; border-radius: 13px; padding: 1px;
    background: linear-gradient(140deg, rgba(255,255,255,0.88) 0%, rgba(255, 210, 0, 0.50) 22%, rgba(224, 102, 0, 0.12) 50%, rgba(224, 102, 0, 0.42) 78%, rgba(255,255,255,0.70) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
  }
  .ss-btn.secondary:hover { color: rgba(29,29,31,0.92); transform: translateY(-2px) scale(1.025); background: rgba(255,255,255,0.88); box-shadow: 0 6px 22px rgba(255, 149, 0, 0.13), 0 2px 6px rgba(0,0,0,0.07); }

  /* ── Right column: entrance + ambient float ── */
  .ss-right {
    position: relative; height: clamp(460px, 52vw, 580px);
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transform: translateY(28px) scale(0.94);
    transition: opacity 1s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.15s;
  }
  .ss-right.ss-vis { opacity: 1; transform: translateY(0) scale(1); }
  .ss-right-float {
    width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
    animation: ssFloat 6.5s ease-in-out infinite;
    animation-play-state: paused;
  }
  .ss-right.ss-vis .ss-right-float { animation-play-state: running; }
  @keyframes ssFloat {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-10px); }
  }

  .ss-divider { position: absolute; bottom: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(255, 149, 0, 0.15), transparent); pointer-events: none; }

  /* ── Apple card internals ── */
  .ac-card {
    width: 100%; height: 100%;
    display: flex; flex-direction: column; background: #fff;
    font-family: -apple-system, 'SF Pro Display', var(--font-dm-sans), sans-serif;
  }
  .ac-top {
    flex-shrink: 0; height: 192px; position: relative; overflow: hidden;
    display: flex; align-items: flex-end; justify-content: center;
  }
  .ac-top::before {
    content: ''; position: absolute; inset: 0; pointer-events: none;
    background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: 20px 20px;
  }
  .ac-mockup {
    position: relative; z-index: 1;
    width: 86%; height: 80%;
    background: rgba(255,255,255,0.055);
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 13px 13px 0 0;
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    padding: 12px 12px 0;
    display: flex; flex-direction: column; gap: 8px; overflow: hidden;
  }
  .ac-mrow { display: flex; align-items: center; gap: 8px; }
  .ac-micon {
    width: 24px; height: 24px; border-radius: 6px;
    background: rgba(255,255,255,0.11); flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.75);
  }
  .ac-mbar { height: 6px; border-radius: 3px; background: rgba(255,255,255,0.12); }
  .ac-mgrid { display: grid; gap: 5px; }
  .ac-mgrid.c3 { grid-template-columns: repeat(3,1fr); }
  .ac-mgrid.c2 { grid-template-columns: repeat(2,1fr); }
  .ac-mcell {
    background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.07);
    border-radius: 7px; padding: 6px 7px;
    display: flex; flex-direction: column; justify-content: space-between; gap: 3px;
  }
  .ac-mcell-label { font-size: 7px; color: rgba(255,255,255,0.45); font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; }
  .ac-mcell-val   { font-size: 11px; color: #fff; font-weight: 600; letter-spacing: -0.02em; line-height: 1; }
  .ac-mlistrow {
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(255,255,255,0.07); border-radius: 6px; padding: 5px 7px;
  }
  .ac-mlistrow-label { font-size: 8px; color: rgba(255,255,255,0.7); font-weight: 500; }
  .ac-mlistrow-val   { font-size: 8px; color: #fff; font-weight: 600; }
  .ac-mbadge { font-size: 7px; font-weight: 600; padding: 2px 5px; border-radius: 4px; background: rgba(52,211,153,0.20); color: #6ee7b7; letter-spacing: 0.03em; }
  .ac-mflow { display: flex; align-items: center; justify-content: center; gap: 5px; flex: 1; }
  .ac-mflow-node {
    height: 30px; flex: 1; border-radius: 6px;
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.10);
    display: flex; align-items: center; justify-content: center;
    font-size: 7px; color: rgba(255,255,255,0.7); font-weight: 500; letter-spacing: 0.02em;
  }
  .ac-mflow-arr { font-size: 9px; color: rgba(255,255,255,0.28); flex-shrink: 0; }
  .ac-mlines { display: flex; flex-direction: column; gap: 5px; justify-content: center; height: 100%; }
  .ac-mline  { height: 6px; border-radius: 3px; background: rgba(255,255,255,0.11); }

  /* Card body */
  .ac-body {
    flex: 1; padding: 16px 18px 18px;
    display: flex; flex-direction: column; gap: 5px;
    border-top: 1px solid rgba(0,0,0,0.055);
  }
  .ac-label {
    font-size: 9.5px; font-weight: 600;
    letter-spacing: 0.09em; text-transform: uppercase;
    color: rgba(0,0,0,0.32); margin-bottom: 1px;
  }
  .ac-title {
    font-size: 15px; font-weight: 600;
    letter-spacing: -0.018em; line-height: 1.22;
    color: #1d1d1f; margin: 0;
  }
  .ac-desc {
    font-size: 12px; font-weight: 400;
    color: rgba(0,0,0,0.42); line-height: 1.55; margin: 1px 0 0;
  }
  .ac-chips { display: flex; flex-wrap: wrap; gap: 4px; margin-top: auto; padding-top: 10px; }
  .ac-chip {
    font-size: 9.5px; font-weight: 500; letter-spacing: -0.01em;
    color: rgba(0,0,0,0.46);
    background: rgba(0,0,0,0.04); border: 0.5px solid rgba(0,0,0,0.08);
    padding: 3px 8px; border-radius: 20px;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
`;

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const CARDS = [
  { bg: "#161616", accentLine: "#f38200", label: "SaaS Dashboard",  title: "Restaurant Management", desc: "Live kitchen tracking, table reservations, and real-time order flow.",          tech: ["Next.js","Node.js","MySQL","Tailwind"],            icon: <Utensils className="w-3 h-3" />,     window: "restaurant" },
  { bg: "#0c111e", accentLine: "#6366f1", label: "School ERP",       title: "School Management",     desc: "Attendance, fee collection, exams, and staff records in one portal.",       tech: ["React","TypeScript","Node.js","PostgreSQL"],       icon: <GraduationCap className="w-3 h-3" />, window: "school"     },
  { bg: "#180910", accentLine: "#d2540a", label: "Medical App",       title: "Healthcare Platform",   desc: "Appointments, digital prescriptions, and patient record management.",        tech: ["Next.js","Flutter","Supabase","Serverless"],       icon: <Activity className="w-3 h-3" />,     window: "health"     },
  { bg: "#061410", accentLine: "#10b981", label: "E-commerce",        title: "Online Store",          desc: "High-converting storefronts, digital catalogs, and fast checkouts.",        tech: ["Next.js","Tailwind CSS","Vercel","MongoDB"],       icon: <ShoppingCart className="w-3 h-3" />, window: "ecom"       },
  { bg: "#090e1c", accentLine: "#3b82f6", label: "Enterprise Tool",   title: "Business Automation",   desc: "CRM, workflow automation, analytics dashboards, productivity systems.",      tech: ["React","TypeScript","Node.js","Docker"],           icon: <Layers className="w-3 h-3" />,       window: "auto"       },
];

function MockupWindow({ type }: { type: string }) {
  if (type === "restaurant") return (
    <>
      <div className="ac-mrow">
        <div className="ac-micon"><Utensils className="w-3 h-3" /></div>
        <div className="ac-mbar" style={{ width: "5rem" }} />
      </div>
      <div className="ac-mgrid c3">
        {[["Orders","142"],["Tables","12/15"],["Revenue","₹48K"]].map(([l,v]) => (
          <div className="ac-mcell" key={l}>
            <span className="ac-mcell-label">{l}</span>
            <span className="ac-mcell-val">{v}</span>
          </div>
        ))}
      </div>
    </>
  );
  if (type === "school") return (
    <>
      <div className="ac-mrow">
        <div className="ac-micon"><GraduationCap className="w-3 h-3" /></div>
        <div className="ac-mbar" style={{ width: "6rem" }} />
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:"5px" }}>
        <div className="ac-mlistrow"><span className="ac-mlistrow-label">Std 10 — Science</span><span className="ac-mbadge">Active</span></div>
        <div className="ac-mlistrow"><span className="ac-mlistrow-label">Fees Collected</span><span className="ac-mlistrow-val">₹3.8L</span></div>
      </div>
    </>
  );
  if (type === "health") return (
    <>
      <div className="ac-mrow">
        <div className="ac-micon"><Activity className="w-3 h-3" /></div>
        <div className="ac-mbar" style={{ width: "5rem" }} />
      </div>
      <div className="ac-mgrid c2">
        <div className="ac-mcell"><span className="ac-mcell-label">Queue</span><span className="ac-mcell-val">4 Waiting</span></div>
        <div className="ac-mlines">{[100,76,52].map((w,i) => <div key={i} className="ac-mline" style={{ width:`${w}%` }} />)}</div>
      </div>
    </>
  );
  if (type === "ecom") return (
    <>
      <div className="ac-mrow">
        <div className="ac-micon"><ShoppingCart className="w-3 h-3" /></div>
        <div className="ac-mbar" style={{ width: "4.5rem" }} />
      </div>
      <div className="ac-mgrid c2">
        {[1,2,3,4].map(i => (
          <div className="ac-mcell" key={i} style={{ gap:"4px" }}>
            <div style={{ width:"100%", height:"16px", background:"rgba(255,255,255,0.12)", borderRadius:"3px" }} />
            <div style={{ height:"5px", width:i%2===0?"2.4rem":"3rem", background:"rgba(255,255,255,0.09)", borderRadius:"3px" }} />
          </div>
        ))}
      </div>
    </>
  );
  return (
    <>
      <div className="ac-mrow">
        <div className="ac-micon"><Layers className="w-3 h-3" /></div>
        <div className="ac-mbar" style={{ width: "5rem" }} />
      </div>
      <div className="ac-mflow">
        {["Trigger","Action","Sync"].map((label, i, arr) => (
          <React.Fragment key={label}>
            <div className="ac-mflow-node">{label}</div>
            {i < arr.length - 1 && <span className="ac-mflow-arr">›</span>}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

export function StatsShowcase() {
  const { ref, inView } = useInView(0.15);
  const FEATURES = ["Website Development", "Mobile App Development", "Custom Software Solutions"];

  return (
    <section className="ss-section" id="impact">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="ss-orb ss-orb-1" aria-hidden="true" />
      <div className="ss-orb ss-orb-2" aria-hidden="true" />
      <div className="ss-grain" aria-hidden="true" />

      <div className="ss-inner" ref={ref}>
        <div className="ss-left">
          <p className={`ss-eyebrow${inView ? " ss-vis" : ""}`}>
            <span className="ss-eyebrow-dot" />
            Our Impact
          </p>
          <h2 className={`ss-h2${inView ? " ss-vis" : ""}`}>
            Empowering Local<br />Businesses <em>Across India</em>
          </h2>
          <p className={`ss-body${inView ? " ss-vis" : ""}`}>
            Helping startups, retailers, service providers, and regional enterprises
            build scalable websites, mobile apps, and custom software solutions.
          </p>
          <ul className="ss-list">
            {FEATURES.map((f, i) => (
              <li key={f} className={`ss-list-item${inView ? " ss-vis" : ""}`} style={{ transitionDelay: inView ? `${0.28 + i * 0.1}s` : "0s" }}>
                <span className="ss-check">
                  <svg viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="#f38200" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {f}
              </li>
            ))}
          </ul>
          <div className={`ss-btns${inView ? " ss-vis" : ""}`}>
            <Link href="/contact" className="ss-btn primary">Start a Project</Link>
            <Link href="/services" className="ss-btn secondary">View Portfolio</Link>
          </div>
        </div>

        <div className={`ss-right${inView ? " ss-vis" : ""}`}>
          <div className="ss-right-float">
            <CardSwap width={320} height={418} cardDistance={40} verticalDistance={48} delay={4500} pauseOnHover={true} easing="elastic" skewAmount={3}>
              {CARDS.map((c, idx) => (
                <Card key={idx} className="p-0 overflow-hidden">
                  <div className="ac-card">
                    <div className="ac-top" style={{ background: c.bg, boxShadow: `inset 0 -1px 0 ${c.accentLine}28` }}>
                      <div className="ac-mockup">
                        <MockupWindow type={c.window} />
                      </div>
                    </div>
                    <div className="ac-body">
                      <span className="ac-label">{c.label}</span>
                      <p className="ac-title">{c.title}</p>
                      <p className="ac-desc">{c.desc}</p>
                      <div className="ac-chips">
                        {c.tech.map(t => <span key={t} className="ac-chip">{t}</span>)}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </div>

      <div className="ss-divider" aria-hidden="true" />
    </section>
  );
}