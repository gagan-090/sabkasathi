"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Scale,
  MapPin,
  Globe,
  Building2,
  Smartphone,
  Cloud,
  Gem,
  Settings,
  Zap,
  ArrowUpRight,
} from "lucide-react";

const styles = `

  .ft-wrap { position: relative; overflow: hidden; background: #f2f2f4; padding: clamp(4rem, 9vw, 8rem) clamp(1.25rem, 4vw, 3rem); }

  .ft-grain {
    position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: 0.02;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 200px 200px;
  }
  .ft-glow-a { position: absolute; top: -8%; left: -10%; z-index: 0; pointer-events: none; width: 38vw; height: 38vw; max-width: 520px; max-height: 520px; border-radius: 50%; background: radial-gradient(circle, rgba(255, 149, 0, 0.09) 0%, transparent 70%); filter: blur(8px); }
  .ft-glow-b { position: absolute; bottom: -10%; right: -8%; z-index: 0; pointer-events: none; width: 34vw; height: 34vw; max-width: 480px; max-height: 480px; border-radius: 50%; background: radial-gradient(circle, rgba(224, 102, 0, 0.08) 0%, transparent 70%); filter: blur(8px); }

  .ft-inner { position: relative; z-index: 1; max-width: 1180px; margin: 0 auto; }

  /* ── Header ───────────────────────────────────────────── */
  .ft-head { text-align: center; margin-bottom: clamp(2.8rem, 5.5vw, 4.4rem); display: flex; flex-direction: column; align-items: center; }

  .ft-badge {
    position: relative; display: inline-flex; align-items: center; gap: 0.6rem;
    border-radius: 999px; padding: 0.44rem 1.25rem 0.44rem 0.9rem;
    background: rgba(255,255,255,0.76); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
    color: rgba(0,0,0,0.56); font-family: var(--font-dm-sans), sans-serif; font-size: 0.78rem; font-weight: 400;
    margin-bottom: 1.5rem; box-shadow: 0 2px 16px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);
    opacity: 0; transform: translateY(14px) scale(0.94);
    transition: opacity 0.72s cubic-bezier(0.16,1,0.3,1), transform 0.72s cubic-bezier(0.16,1,0.3,1);
  }
  .ft-badge.show { opacity: 1; transform: translateY(0) scale(1); }
  .ft-badge::before {
    content: ''; position: absolute; inset: -1px; border-radius: 999px; padding: 1.5px;
    background: linear-gradient(135deg, rgba(255,255,255,0.80) 0%, rgba(255, 149, 0, 0.55) 28%, rgba(224, 102, 0, 0.20) 52%, rgba(224, 102, 0, 0.60) 76%, rgba(255,255,255,0.72) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
  }
  .ft-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #f38200; box-shadow: 0 0 8px rgba(255, 149, 0, 0.70); flex-shrink: 0; animation: ftDotPulse 2.4s ease-in-out infinite; }
  @keyframes ftDotPulse { 0%,100% { box-shadow: 0 0 8px rgba(255, 149, 0, .7), 0 0 0 0 rgba(255, 149, 0, .3); } 50% { box-shadow: 0 0 14px rgba(255, 149, 0, .9), 0 0 0 5px rgba(255, 149, 0, 0); } }

  .ft-title-wrap { perspective: 800px; display: flex; flex-wrap: wrap; justify-content: center; gap: 0.18em 0.26em; max-width: 760px; margin-bottom: 1rem; }
  .ft-title-word {
    font-family: var(--font-dm-sans), sans-serif; font-weight: 500; font-size: clamp(2rem, 4.6vw, 3.4rem);
    color: #1d1d1f; letter-spacing: -0.02em; line-height: 1.1; display: inline-block;
    opacity: 0; transform: translateY(36px) rotateX(-18deg); transform-origin: 50% 100%;
    transition: opacity 0.78s cubic-bezier(0.16,1,0.3,1), transform 0.78s cubic-bezier(0.16,1,0.3,1);
  }
  .ft-title-word.show { opacity: 1; transform: translateY(0) rotateX(0deg); }
  .ft-title-word.accent { background: linear-gradient(135deg, #ffd200 0%, #d2540a 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-style: italic; }

  .ft-sub { max-width: 560px; font-family: var(--font-dm-sans), sans-serif; font-weight: 400; font-size: clamp(0.88rem, 1.2vw, 1rem); color: rgba(29,29,31,0.50); line-height: 1.7; opacity: 0; transform: translateY(16px); transition: opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s; }
  .ft-sub.show { opacity: 1; transform: translateY(0); }

  /* ── Glass / liquid card primitives ──────────────────────── */
  .ft-card {
    position: relative; border-radius: 28px;
    background: rgba(255,255,255,0.62);
    backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6);
    border: 1px solid rgba(255,255,255,0.5);
    transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease, background 0.5s ease;
  }
  .ft-card:hover { transform: translateY(-4px); background: rgba(255,255,255,0.82); box-shadow: 0 16px 40px rgba(255, 149, 0, 0.08), 0 4px 12px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.7); }

  .ft-reveal { opacity: 0; transform: translateY(26px); transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1); }
  .ft-reveal.show { opacity: 1; transform: translateY(0); }

  /* ── Bento grid ───────────────────────────────────────────── */
  .ft-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: clamp(1rem, 2vw, 1.6rem); margin-bottom: clamp(5rem, 9vw, 7.5rem); }
  .ft-span-4 { grid-column: span 6; } .ft-span-2 { grid-column: span 6; }
  @media (min-width: 1024px) { .ft-span-4 { grid-column: span 4; } .ft-span-2 { grid-column: span 2; } .ft-span-3 { grid-column: span 3; } }
  .ft-span-3 { grid-column: span 6; }

  .ft-card-pad { padding: clamp(1.5rem, 2.6vw, 2.1rem); height: 100%; display: flex; flex-direction: column; justify-content: space-between; }

  .ft-icon-pill { width: 36px; height: 36px; border-radius: 12px; background: linear-gradient(135deg, rgba(255, 149, 0, 0.12) 0%, rgba(224, 102, 0, 0.10) 100%); color: #d2540a; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .ft-card-title { font-family: var(--font-dm-sans), sans-serif; font-weight: 600; font-size: 1.08rem; color: #1d1d1f; letter-spacing: -0.01em; }

  /* ── iOS-style liquid pill buttons (location chips) ──────────── */
  .ft-pill-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.6rem; }
  @media (min-width: 640px) { .ft-pill-grid { grid-template-columns: repeat(4, 1fr); } }

  .ft-pill {
    position: relative; overflow: hidden;
    display: flex; flex-direction: column; justify-content: center; gap: 0.1rem;
    padding: 0.7rem 0.85rem; border-radius: 16px;
    font-family: var(--font-dm-sans), sans-serif; text-decoration: none;
    background: rgba(255,255,255,0.55); backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.6);
    box-shadow: 0 1px 4px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.7);
    transition: transform 0.4s cubic-bezier(0.25,1,0.5,1), box-shadow 0.4s ease, background 0.4s ease;
  }
  .ft-pill:hover { transform: translateY(-2px) scale(1.02); background: rgba(255,255,255,0.85); box-shadow: 0 8px 18px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8); }
  .ft-pill:active { transform: scale(0.97); }
  .ft-pill-name { font-size: 0.72rem; font-weight: 700; color: #1d1d1f; line-height: 1.25; }
  .ft-pill-sub { font-size: 0.56rem; font-weight: 600; color: rgba(0,0,0,0.34); text-transform: uppercase; letter-spacing: 0.08em; }

  .ft-pill.main {
    background: linear-gradient(135deg, #ffd200 0%, #f38200 38%, #d2540a 72%, #a8420a 100%);
    border-color: transparent; box-shadow: 0 4px 16px rgba(224, 102, 0, 0.30), inset 0 1px 0 rgba(255,255,255,0.25);
  }
  .ft-pill.main .ft-pill-name { color: #fff; }
  .ft-pill.main .ft-pill-sub { color: rgba(255,255,255,0.78); }
  .ft-pill.main:hover { box-shadow: 0 10px 26px rgba(224, 102, 0, 0.36), inset 0 1px 0 rgba(255,255,255,0.3); }

  .ft-pill.disabled { opacity: 0.42; cursor: not-allowed; pointer-events: none; }
  .ft-pill.disabled .ft-pill-name { color: rgba(0,0,0,0.42); }

  .ft-pill-ripple { position: absolute; border-radius: 50%; background: rgba(255,255,255,0.4); transform: scale(0); pointer-events: none; animation: ftPillRipple 0.5s ease-out forwards; }
  .ft-pill.main .ft-pill-ripple { background: rgba(255,255,255,0.3); }
  @keyframes ftPillRipple { to { transform: scale(4); opacity: 0; } }

  /* ── Registration & address mini-stats ───────────────────────── */
  .ft-statlabel { font-family: var(--font-dm-sans), sans-serif; font-size: 0.62rem; font-weight: 600; color: rgba(0,0,0,0.36); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.2rem; }
  .ft-statval { font-family: var(--font-dm-sans), sans-serif; font-size: 0.84rem; font-weight: 700; color: #1d1d1f; }
  .ft-gst { font-family: var(--font-dm-sans), monospace; font-weight: 700; font-size: 1.05rem; letter-spacing: -0.02em; background: linear-gradient(135deg, #f38200 0%, #d2540a 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

  .ft-livedot { width: 6px; height: 6px; border-radius: 50%; background: #2ecc71; box-shadow: 0 0 6px rgba(46,204,113,0.7); animation: ftLive 2s ease-in-out infinite; }
  @keyframes ftLive { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

  /* ── Divider header for expertise block ───────────────────── */
  .ft-divider-wrap { text-align: center; padding: 2.4rem 0; margin-bottom: clamp(2.4rem, 4vw, 3.2rem); position: relative; }
  .ft-divider-line { position: absolute; left: 50%; top: 0; transform: translateX(-50%); width: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(255, 149, 0, 0.4), rgba(224, 102, 0, 0.4), transparent); transition: width 1.2s cubic-bezier(0.16,1,0.3,1); }
  .ft-divider-wrap.show .ft-divider-line { width: 280px; }
  .ft-divider-line.bottom { position: absolute; left: 50%; bottom: 0; top: auto; transform: translateX(-50%); }

  /* ── Expertise grid cards ─────────────────────────────────── */
  .ft-exp-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: clamp(0.85rem, 1.6vw, 1.2rem); }
  @media (min-width: 768px) { .ft-exp-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (min-width: 1100px) { .ft-exp-grid { grid-template-columns: repeat(6, 1fr); } }

  .ft-exp-card {
    position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between;
    border-radius: 22px; padding: clamp(1.2rem, 2vw, 1.5rem);
    background: rgba(255,255,255,0.6); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.55);
    box-shadow: 0 3px 14px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6);
    text-decoration: none; height: 100%;
    transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease, background 0.5s ease;
  }
  .ft-exp-card:hover {
    transform: translateY(-5px) scale(1.012);
    background: rgba(255,255,255,0.9);
    box-shadow: 0 18px 38px rgba(255, 149, 0, 0.12), 0 4px 14px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.75);
  }

  .ft-exp-icon {
    width: 46px; height: 46px; border-radius: 16px;
    background: linear-gradient(135deg, #ffd200 0%, #f38200 38%, #d2540a 100%);
    color: #fff; display: flex; align-items: center; justify-content: center;
    box-shadow: 0 8px 20px rgba(224, 102, 0, 0.20), inset 0 1px 0 rgba(255,255,255,0.25);
    transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
  }
  .ft-exp-card:hover .ft-exp-icon { transform: scale(1.08) rotate(8deg); }

  .ft-exp-title { font-family: var(--font-dm-sans), sans-serif; font-weight: 700; font-size: 0.92rem; color: #1d1d1f; letter-spacing: -0.01em; line-height: 1.3; margin-top: 1rem; }
  .ft-exp-desc { font-family: var(--font-dm-sans), sans-serif; font-weight: 400; font-size: 0.74rem; color: rgba(29,29,31,0.52); line-height: 1.55; margin-top: 0.5rem; }

  .ft-exp-link { display: flex; align-items: center; gap: 0.35rem; margin-top: 1.1rem; }
  .ft-exp-link-line { height: 2px; border-radius: 2px; width: 18px; background: linear-gradient(90deg, #ffd200, #d2540a); transition: width 0.45s cubic-bezier(0.16,1,0.3,1); }
  .ft-exp-card:hover .ft-exp-link-line { width: 32px; }
  .ft-exp-link-text { font-family: var(--font-dm-sans), sans-serif; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(0,0,0,0.34); transition: color 0.4s ease; }
  .ft-exp-card:hover .ft-exp-link-text { color: #d2540a; }
  .ft-exp-arrow { margin-left: auto; color: rgba(0,0,0,0.22); transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), color 0.4s ease; }
  .ft-exp-card:hover .ft-exp-arrow { transform: translate(2px,-2px); color: #d2540a; }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
`;

/* ══════════════════════════════════════════════
   Reveal hook — IntersectionObserver, fires once
══════════════════════════════════════════════ */
function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShow(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, show };
}

function pillRipple(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const ripple = document.createElement("span");
  ripple.className = "ft-pill-ripple";
  const size = Math.max(r.width, r.height);
  ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
  el.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
}

const TITLE_WORDS = ["About", "Our", "Company"];
const ACCENT_INDEX = 2;

const features = [
  { icon: Globe, title: "Web Development", description: "Modern, responsive web applications built with React & Next.js, focused on scalability and world-class UX.", slug: "web-development" },
  { icon: Smartphone, title: "Mobile Apps", description: "Native and cross-platform mobile apps for iOS and Android.", slug: "mobile-app" },
  { icon: Cloud, title: "Cloud Solutions", description: "Scalable infrastructure and cloud-native services.", slug: "cloud-solutions" },
  { icon: Gem, title: "Premium Hosting", description: "1 year of high-performance hosting at zero cost.", slug: "hosting" },
  { icon: Settings, title: "Maintenance", description: "1 year of complimentary maintenance.", slug: "maintenance" },
  { icon: Zap, title: "Ultra-Fast Delivery", description: "Rapid development cycles and on-time delivery for every project milestone.", slug: "delivery" },
];

const branches = [
  { name: "Bihar", slug: "bihar", isMain: true },
  { name: "Gujarat", slug: "gujarat" },
  { name: "Maharashtra", slug: "maharashtra" },
  { name: "Uttar Pradesh" },
  { name: "Haryana" },
  { name: "Uttarakhand" },
  { name: "Madhya Pradesh" },
  { name: "Delhi" },
  { name: "Goa" },
  { name: "Jharkhand" },
  { name: "Chattisgarh" },
  { name: "Rajasthan" },
  { name: "West Bengal" },
];

export function FeaturesSection() {
  const head = useReveal<HTMLDivElement>();
  const branchCard = useReveal<HTMLDivElement>();
  const gstCard = useReveal<HTMLDivElement>(0.2);
  const principalCard = useReveal<HTMLDivElement>(0.2);
  const regionalCard = useReveal<HTMLDivElement>(0.2);
  const divider = useReveal<HTMLDivElement>(0.3);

  return (
    <section id="features" className="ft-wrap">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="ft-grain" aria-hidden="true" />
      <div className="ft-glow-a" aria-hidden="true" />
      <div className="ft-glow-b" aria-hidden="true" />

      <div className="ft-inner">
        {/* Header */}
        <div className="ft-head" ref={head.ref}>
          <div className={`ft-badge${head.show ? " show" : ""}`}>
            <span className="ft-badge-dot" />
            <span>Corporate Identity</span>
          </div>
          <div className="ft-title-wrap" role="heading" aria-level={2}>
            {TITLE_WORDS.map((word, i) => (
              <span key={i} className={`ft-title-word${head.show ? " show" : ""}${i === ACCENT_INDEX ? " accent" : ""}`} style={{ transitionDelay: `${i * 0.07}s` }}>
                {word}
              </span>
            ))}
          </div>
          <p className={`ft-sub${head.show ? " show" : ""}`}>
            A GST registered agency committed to delivering premium digital solutions across India with verified legal and administrative transparency.
          </p>
        </div>

        {/* Main info grid */}
        <div className="ft-grid">

          {/* Branch network */}
          <div className={`ft-span-4 ft-reveal${branchCard.show ? " show" : ""}`} ref={branchCard.ref}>
            <div className="ft-card ft-card-pad">
              <div style={{ marginBottom: "1.4rem", display: "flex", alignItems: "center", gap: "0.65rem" }}>
                <span className="ft-icon-pill"><Globe size={17} strokeWidth={2.2} /></span>
                <span className="ft-card-title">Our Strategic Locations</span>
              </div>
              <div className="ft-pill-grid">
                {branches.map((branch) =>
                  branch.slug ? (
                    <Link key={branch.name} href={`/location/${branch.slug}`} onClick={pillRipple} className={`ft-pill${branch.isMain ? " main" : ""}`}>
                      <span className="ft-pill-name">{branch.name}</span>
                      {branch.isMain && <span className="ft-pill-sub">Main Hub</span>}
                    </Link>
                  ) : (
                    <div key={branch.name} className="ft-pill disabled">
                      <span className="ft-pill-name">{branch.name}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* GST registration */}
          <div className={`ft-span-2 ft-reveal${gstCard.show ? " show" : ""}`} ref={gstCard.ref}>
            <div className="ft-card ft-card-pad">
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span className="ft-livedot" />
                    <span className="ft-statlabel" style={{ marginBottom: 0, color: "#2ecc71" }}>Verified Legal Info</span>
                  </div>
                  <span className="ft-icon-pill"><Scale size={16} strokeWidth={2.2} /></span>
                </div>
                <span className="ft-card-title">Official Registration</span>
              </div>
              <div style={{ marginTop: "1.6rem" }}>
                <p className="ft-statlabel">GST Identification Number</p>
                <p className="ft-gst">10LAHPK8872L1Z3</p>
              </div>
            </div>
          </div>

          {/* Principal place */}
          <div className={`ft-span-3 ft-reveal${principalCard.show ? " show" : ""}`} ref={principalCard.ref}>
            <div className="ft-card ft-card-pad">
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1.4rem" }}>
                <span className="ft-icon-pill"><Building2 size={17} strokeWidth={2.2} /></span>
                <span className="ft-card-title">Principal Place of Business</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  { label: "Building No.", val: "0241" },
                  { label: "Street", val: "Bypass Road" },
                  { label: "Locality", val: "Maharani Puram", span: true },
                  { label: "District", val: "Sheikhpura" },
                  { label: "State", val: "Bihar" },
                ].map((item) => (
                  <div key={item.label} style={item.span ? { gridColumn: "span 2" } : undefined}>
                    <p className="ft-statlabel">{item.label}</p>
                    <p className="ft-statval">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

         
        </div>

        {/* Expertise divider */}
        <div className={`ft-divider-wrap${divider.show ? " show" : ""}`} ref={divider.ref}>
          <span className="ft-divider-line top" />
          <h2 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 500, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#1d1d1f", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            Design{" "}
            <span style={{ background: "linear-gradient(135deg, #ffd200 0%, #d2540a 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontStyle: "italic" }}>
              Redefined.
            </span>
          </h2>
          <span className="ft-divider-line bottom" />
        </div>

        {/* Expertise grid */}
        <div className="ft-exp-grid">
          {features.map((feature, index) => (
            <ExpertiseCard key={feature.slug} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpertiseCard({
  feature,
  index,
}: {
  feature: { icon: typeof Globe; title: string; description: string; slug: string };
  index: number;
}) {
  const { ref, show } = useReveal<HTMLDivElement>(0.12);
  const Icon = feature.icon;

  return (
    <div ref={ref} className={`ft-reveal${show ? " show" : ""}`} style={{ transitionDelay: `${Math.min(index, 6) * 0.06}s` }}>
      <Link href={`/expertise/${feature.slug}`} className="ft-exp-card">
        <div>
          <span className="ft-exp-icon"><Icon size={20} strokeWidth={2.2} /></span>
          <h3 className="ft-exp-title">{feature.title}</h3>
          <p className="ft-exp-desc">{feature.description}</p>
        </div>
        <div className="ft-exp-link">
          <span className="ft-exp-link-line" />
          <span className="ft-exp-link-text">Learn More</span>
          <ArrowUpRight size={13} strokeWidth={2.4} className="ft-exp-arrow" />
        </div>
      </Link>
    </div>
  );
}