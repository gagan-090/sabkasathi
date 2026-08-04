"use client";

import { useForm, ValidationError } from "@formspree/react";
import { useEffect, useRef, useState } from "react";

const styles = `

  /* ── Section shell ── */
  .cs-section {
    position: relative; overflow: hidden;
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    padding: clamp(5rem,10vw,7rem) 0 clamp(4rem,8vw,6rem);
    font-family: var(--font-dm-sans), sans-serif;
  }

  /* ── Video BG ── */
  .cs-video {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    opacity: 0; transition: opacity 5.2s ease;
    will-change: opacity; z-index: 0;
  }
  .cs-video.show { opacity: 1; }

  /* ── Same overlays as Hero ── */
  .cs-overlay {
    position: absolute; inset: 0; z-index: 1; pointer-events: none;
    background:
      linear-gradient(to bottom,
        rgba(242,242,244,0.88) 0%,
        rgba(242,242,244,0.18) 30%,
        rgba(242,242,244,0.18) 65%,
        rgba(242,242,244,0.92) 100%
      ),
      linear-gradient(to right,  rgba(242,242,244,0.72) 0%, transparent 38%),
      linear-gradient(to left,   rgba(242,242,244,0.72) 0%, transparent 38%);
  }
  .cs-grain {
    position: absolute; inset: 0; z-index: 2; pointer-events: none; opacity: 0.022;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 200px 200px;
    /* grain animation removed — was repainting full section every ~0.26s */
  }
  @keyframes csGrain {
    0%   { background-position:   0px   0px; }
    25%  { background-position: -30px  12px; }
    50%  { background-position:  14px -22px; }
    75%  { background-position: -18px  28px; }
  }

  /* ── Content layer ── */
  .cs-inner {
    position: relative; z-index: 3;
    width: 100%; max-width: 1100px;
    margin: 0 auto;
    padding: 0 clamp(1.25rem,4vw,2.5rem);
  }

  /* ── Section header ── */
  .cs-header {
    text-align: center;
    margin-bottom: clamp(2.5rem,5vw,4rem);
    opacity: 0; transform: translateY(28px);
    transition: opacity 0.82s ease, transform 0.82s cubic-bezier(0.16,1,0.3,1);
  }
  .cs-header.vis { opacity: 1; transform: translateY(0); }

  .cs-eyebrow {
    display: inline-flex; align-items: center; gap: 0.55rem;
    font-size: 0.68rem; font-weight: 500;
    letter-spacing: 0.3em; text-transform: uppercase;
    color: rgba(0,0,0,0.36); margin-bottom: 1rem;
  }
  .cs-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: #f38200; box-shadow: 0 0 8px rgba(255, 149, 0, 0.7);
    animation: csDotPulse 2.4s ease-in-out infinite;
  }
  @keyframes csDotPulse {
    0%,100% { box-shadow: 0 0 8px rgba(255, 149, 0, .7), 0 0 0 0 rgba(255, 149, 0, .3); }
    50%     { box-shadow: 0 0 14px rgba(255, 149, 0, .9), 0 0 0 6px rgba(255, 149, 0, 0); }
  }
  .cs-h2 {
    font-size: clamp(2rem,4.5vw,3.4rem); font-weight: 500;
    letter-spacing: -0.025em; line-height: 1.1;
    color: #1d1d1f; margin: 0 0 0.9rem;
  }
  .cs-h2 em {
    font-style: normal;
    background: linear-gradient(135deg, #ffd200 0%, #d2540a 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .cs-sub {
    font-size: clamp(0.88rem,1.2vw,1rem);
    color: rgba(29,29,31,0.50); line-height: 1.75;
    max-width: 540px; margin: 0 auto;
  }

  /* ── Card wrapper with 3-D tilt ── */
  .cs-card-wrap {
    perspective: 1200px;
    opacity: 0; transform: translateY(36px);
    transition: opacity 0.9s ease 0.15s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s;
  }
  .cs-card-wrap.vis { opacity: 1; transform: translateY(0); }

  .cs-card {
    background: rgba(255,255,255,0.78);
    border: 1px solid rgba(255,255,255,0.90);
    border-radius: 2.5rem;
    overflow: hidden;
    /* subtle inner light ring */
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.60) inset,
      0 8px 40px rgba(0,0,0,0.10),
      0 2px 8px rgba(0,0,0,0.06);
    transform-style: preserve-3d;
    transition: transform 0.08s ease, box-shadow 0.4s ease;
    will-change: transform;
  }
  .cs-card:hover {
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.80) inset,
      0 20px 60px rgba(0,0,0,0.13),
      0 4px 12px rgba(0,0,0,0.07);
  }

  /* ── Grid inside card ── */
  .cs-grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    min-height: 600px;
  }
  @media (max-width: 860px) {
    .cs-grid { grid-template-columns: 1fr; }
  }

  /* ── Left trust panel ── */
  .cs-trust {
    background: linear-gradient(145deg, #0f172a 0%, #1e293b 100%);
    padding: clamp(2rem,4vw,3rem);
    display: flex; flex-direction: column; justify-content: space-between;
    position: relative; overflow: hidden;
    border-radius: 2.5rem 0 0 2.5rem;
  }
  @media (max-width: 860px) {
    .cs-trust { border-radius: 2.5rem 2.5rem 0 0; }
  }
  .cs-trust-glow-a {
    position: absolute; top: -80px; right: -80px;
    width: 280px; height: 280px; border-radius: 50%;
    background: rgba(255, 149, 0, 0.12); filter: blur(60px);
    pointer-events: none;
  }
  .cs-trust-glow-b {
    position: absolute; bottom: -80px; left: -60px;
    width: 220px; height: 220px; border-radius: 50%;
    background: rgba(59,130,246,0.10); filter: blur(60px);
    pointer-events: none;
  }
  .cs-trust-badge {
    display: inline-flex; align-items: center; gap: 0.4rem;
    padding: 0.3rem 0.85rem; border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.05);
    font-size: 0.6rem; font-weight: 600;
    letter-spacing: 0.22em; text-transform: uppercase; color: #ffd200;
    margin-bottom: 1.2rem;
  }
  .cs-trust h3 {
    font-size: clamp(1.5rem,2.6vw,2.1rem); font-weight: 500;
    line-height: 1.18; letter-spacing: -0.02em; color: #fff;
    margin: 0 0 0.9rem;
  }
  .cs-trust h3 span {
    background: linear-gradient(135deg,#ffd200,#ffd200);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .cs-trust-desc {
    font-size: 0.78rem; color: rgba(255,255,255,0.45);
    line-height: 1.75; margin: 0;
  }

  .cs-trust-pts { margin: 2rem 0; display: flex; flex-direction: column; gap: 1.4rem; }
  .cs-trust-pt { display: flex; gap: 0.9rem; align-items: flex-start; }
  .cs-trust-pt-icon {
    width: 34px; height: 34px; flex-shrink: 0;
    border-radius: 10px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.10);
    display: flex; align-items: center; justify-content: center;
    margin-top: 1px;
  }
  .cs-trust-pt-icon svg { width: 16px; height: 16px; stroke: #ffd200; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
  .cs-trust-pt-title {
    font-size: 0.7rem; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase; color: #fff;
    margin: 0 0 0.2rem;
  }
  .cs-trust-pt-desc {
    font-size: 0.7rem; color: rgba(255,255,255,0.38); line-height: 1.65; margin: 0;
  }

  .cs-trust-footer {
    padding-top: 1.4rem;
    border-top: 1px solid rgba(255,255,255,0.07);
    display: flex; flex-direction: column; gap: 0.4rem;
  }
  .cs-online {
    display: flex; align-items: center; gap: 0.5rem;
    font-size: 0.72rem; font-weight: 500; color: rgba(255,255,255,0.60);
  }
  .cs-online-dot {
    width: 7px; height: 7px; border-radius: 50%; background: #22c55e;
    animation: csPulse 2s ease-in-out infinite;
  }
  @keyframes csPulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
    50%      { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
  }
  .cs-sla {
    font-size: 0.6rem; font-weight: 500;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: rgba(255,255,255,0.25);
  }

  /* ── Right form panel ── */
  .cs-form-panel {
    padding: clamp(2rem,4vw,3rem);
    display: flex; flex-direction: column; justify-content: center;
  }
  .cs-form-head { margin-bottom: 1.8rem; }
  .cs-form-label-top {
    font-size: 0.62rem; font-weight: 600;
    letter-spacing: 0.28em; text-transform: uppercase;
    color: #f38200; margin: 0 0 0.4rem;
  }
  .cs-form-h { 
    font-size: clamp(1.4rem,2.4vw,1.9rem); font-weight: 500;
    letter-spacing: -0.02em; color: #1d1d1f; margin: 0 0 0.35rem;
  }
  .cs-form-sub {
    font-size: 0.78rem; color: rgba(29,29,31,0.46);
    line-height: 1.65; margin: 0;
  }

  /* ── Fields ── */
  .cs-form { display: flex; flex-direction: column; gap: 1rem; }
  .cs-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  @media (max-width: 560px) { .cs-row { grid-template-columns: 1fr; } }

  .cs-field { display: flex; flex-direction: column; gap: 0.3rem; }
  .cs-field label {
    font-size: 0.62rem; font-weight: 600;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: rgba(0,0,0,0.36); padding-left: 2px;
  }
  .cs-field input,
  .cs-field select,
  .cs-field textarea {
    width: 100%; box-sizing: border-box;
    padding: 0.78rem 1rem;
    border-radius: 12px;
    border: 1px solid rgba(0,0,0,0.09);
    background: rgba(248,248,250,0.70);
    font-family: var(--font-dm-sans), sans-serif;
    font-size: 0.84rem; font-weight: 400;
    color: #1d1d1f;
    outline: none;
    transition: border-color 0.22s, background 0.22s, box-shadow 0.22s;
    -webkit-appearance: none; appearance: none;
  }
  .cs-field input::placeholder,
  .cs-field textarea::placeholder { color: rgba(0,0,0,0.28); }
  .cs-field input:focus,
  .cs-field select:focus,
  .cs-field textarea:focus {
    border-color: rgba(255, 149, 0, 0.55);
    background: #fff;
    box-shadow: 0 0 0 4px rgba(255, 149, 0, 0.07);
  }
  .cs-field textarea { resize: none; }
  .cs-select-wrap { position: relative; }
  .cs-select-wrap select { padding-right: 2.2rem; cursor: pointer; }
  .cs-select-wrap::after {
    content: '';
    position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
    width: 10px; height: 10px;
    border-right: 1.5px solid rgba(0,0,0,0.35);
    border-bottom: 1.5px solid rgba(0,0,0,0.35);
    transform: translateY(-65%) rotate(45deg);
    pointer-events: none;
  }
  .cs-verr {
    font-size: 0.62rem; font-weight: 600; color: #d2540a;
    padding-left: 2px;
  }

  /* ── Timeline pills ── */
  .cs-timeline { display: flex; flex-wrap: wrap; gap: 0.55rem; }
  .cs-timeline-opt {
    position: relative;
    display: flex; align-items: center; justify-content: center;
    padding: 0.55rem 1rem; border-radius: 10px;
    border: 1px solid rgba(0,0,0,0.09);
    background: rgba(248,248,250,0.70);
    font-size: 0.72rem; font-weight: 500;
    color: rgba(29,29,31,0.60);
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s;
    user-select: none;
  }
  .cs-timeline-opt input { position: absolute; opacity: 0; pointer-events: none; }
  .cs-timeline-opt.selected {
    background: rgba(255, 149, 0, 0.07);
    border-color: rgba(255, 149, 0, 0.45);
    color: #d2540a;
    box-shadow: 0 0 0 3px rgba(255, 149, 0, 0.08);
  }

  /* ── Submit button ── */
  .cs-btn {
    position: relative; overflow: hidden;
    width: 100%; padding: 1rem 2rem;
    border: none; border-radius: 14px; cursor: pointer;
    font-family: var(--font-dm-sans), sans-serif;
    font-size: 0.93rem; font-weight: 600;
    color: #fff; letter-spacing: 0.01em;
    background: linear-gradient(135deg, #ffd200 0%, #f38200 38%, #d2540a 72%, #a8420a 100%);
    box-shadow: 0 4px 20px rgba(224, 102, 0, 0.30), 0 1px 4px rgba(0,0,0,0.10),
      inset 0 1px 0 rgba(255,255,255,0.20);
    transition: transform 0.35s cubic-bezier(0.25,1,0.5,1), box-shadow 0.35s ease;
  }
  .cs-btn::before {
    content: ''; position: absolute; inset: 0; border-radius: 14px;
    background: linear-gradient(160deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 52%);
    pointer-events: none;
  }
  .cs-btn::after {
    content: ''; position: absolute;
    top: 0; left: 10%; right: 10%; height: 1px;
    background: rgba(255,255,255,0.44); pointer-events: none;
  }
  .cs-btn:hover:not(:disabled) {
    transform: translateY(-2px) scale(1.018);
    box-shadow: 0 10px 32px rgba(224, 102, 0, 0.36), 0 2px 8px rgba(0,0,0,0.12),
      inset 0 1px 0 rgba(255,255,255,0.26);
  }
  .cs-btn:active:not(:disabled) { transform: scale(0.97) translateY(1px); }
  .cs-btn:disabled { opacity: 0.65; cursor: not-allowed; }
  .cs-btn-inner { position: relative; z-index: 1; }

  /* ── Success state ── */
  .cs-success {
    display: flex; flex-direction: column; align-items: center;
    text-align: center; padding: clamp(3rem,8vw,6rem) 2rem;
    gap: 1.2rem;
  }
  .cs-success-icon {
    width: 68px; height: 68px; border-radius: 50%;
    background: rgba(34,197,94,0.12);
    border: 1px solid rgba(34,197,94,0.25);
    display: flex; align-items: center; justify-content: center;
    animation: csPopIn 0.5s cubic-bezier(0.16,1,0.3,1);
  }
  @keyframes csPopIn {
    from { transform: scale(0.5); opacity: 0; }
    to   { transform: scale(1);   opacity: 1; }
  }
  .cs-success-icon svg { width: 32px; height: 32px; stroke: #22c55e; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .cs-success h3 { font-size: 1.7rem; font-weight: 500; color: #1d1d1f; letter-spacing: -0.02em; margin: 0; }
  .cs-success p  { font-size: 0.88rem; color: rgba(29,29,31,0.50); line-height: 1.7; max-width: 380px; margin: 0; }
  .cs-wa-btn {
    display: inline-flex; align-items: center; gap: 0.6rem;
    padding: 0.85rem 2rem; border-radius: 14px;
    background: #22c55e; color: #fff;
    font-family: var(--font-dm-sans), sans-serif; font-size: 0.88rem; font-weight: 600;
    text-decoration: none;
    box-shadow: 0 6px 24px rgba(34,197,94,0.28);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .cs-wa-btn:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 10px 32px rgba(34,197,94,0.34); }
  .cs-wa-btn svg  { width: 18px; height: 18px; fill: #fff; }

  .cs-another {
    background: none; border: 1px solid rgba(0,0,0,0.12); border-radius: 10px;
    padding: 0.55rem 1.4rem; cursor: pointer;
    font-family: var(--font-dm-sans), sans-serif; font-size: 0.72rem; font-weight: 500;
    color: rgba(29,29,31,0.50);
    transition: background 0.2s, color 0.2s;
  }
  .cs-another:hover { background: rgba(0,0,0,0.04); color: rgba(29,29,31,0.70); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
`;

interface SubmissionData {
  name: string; email: string; phone: string; company: string;
  service: string; budget: string; timeline: string; message: string;
}

function buildWaUrl(d: SubmissionData) {
  const lines = [
    `🔔 *New Project Inquiry — Sabka Saathi*`, ``,
    `👤 *Name:* ${d.name}`, `📧 *Email:* ${d.email}`,
    `📱 *Phone:* ${d.phone || "Not provided"}`, `🏢 *Company:* ${d.company || "Not provided"}`, ``,
    `🛠️ *Service:* ${d.service}`, `💰 *Budget:* ${d.budget}`, `⏳ *Timeline:* ${d.timeline}`, ``,
    `💬 *Message:*`, d.message, ``, `_Submitted from sabkasaathi.com_ 🌐`,
  ];
  return `https://wa.me/919431673018?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function ContactSection() {
  const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "xlgoknzw";
  const [state, handleSubmit] = useForm(FORMSPREE_ID);
  const [lastSubmission, setLastSubmission] = useState<SubmissionData | null>(null);
  const [phone, setPhone] = useState("");
  const [timeline, setTimeline] = useState("");
  const [headerVis, setHeaderVis] = useState(false);
  const [cardVis, setCardVis] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);

  /* intersection observer for header + card */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setHeaderVis(true), 80);
        setTimeout(() => setCardVis(true), 220);
        obs.disconnect();
      }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* 3-D tilt on card (rAF-throttled; skipped on coarse pointers) */
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const MAX = 6;
    let frame = 0, rx = 0, ry = 0;
    const apply = () => { frame = 0; card.style.transform = `rotateY(${ry}deg) rotateX(${rx}deg)`; };
    const onMove = (e: MouseEvent) => {
      const r  = card.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
      const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
      ry = dx * MAX; rx = -dy * MAX;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => { if (frame) { cancelAnimationFrame(frame); frame = 0; } card.style.transform = "rotateY(0deg) rotateX(0deg)"; };
    card.addEventListener("mousemove", onMove, { passive: true });
    card.addEventListener("mouseleave", onLeave);
    return () => { if (frame) cancelAnimationFrame(frame); card.removeEventListener("mousemove", onMove); card.removeEventListener("mouseleave", onLeave); };
  }, [cardVis]);

  /* WA redirect on success */
  useEffect(() => {
    if (state.succeeded && lastSubmission) {
      const t = setTimeout(() => window.open(buildWaUrl(lastSubmission), "_blank"), 1500);
      return () => clearTimeout(t);
    }
  }, [state.succeeded, lastSubmission]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as unknown as SubmissionData;
    setLastSubmission(data);
    handleSubmit(e);
  };

  return (
    <section id="contact" ref={sectionRef} className="cs-section">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* Static bg image replacing animated video */}
      <img
        src="/images/contact-poster.jpg"
        className="cs-video show"
        alt=""
        style={{ objectFit: "cover" }}
      />

      {/* Overlays matching hero */}
      <div className="cs-overlay" aria-hidden="true" />
      <div className="cs-grain"   aria-hidden="true" />

      <div className="cs-inner">

        {/* Section heading */}
        <div className={`cs-header${headerVis ? " vis" : ""}`}>
          <p className="cs-eyebrow"><span className="cs-dot" />Contact Us</p>
          <h2 className="cs-h2">Let&apos;s build something <em>extraordinary</em></h2>
          <p className="cs-sub">
            Partner with India&apos;s professional technology agency — high-performance web apps,
            mobile solutions, and CRM automation tailored to your goals.
          </p>
        </div>

        {/* 3-D tilt card */}
        <div className={`cs-card-wrap${cardVis ? " vis" : ""}`}>
          <div className="cs-card" ref={cardRef}>

            {state.succeeded ? (
              /* ── Success ── */
              <div className="cs-success">
                <div className="cs-success-icon">
                  <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <h3>Inquiry Submitted!</h3>
                <p>We&apos;ve received your message. Opening WhatsApp automatically — if it didn&apos;t open, tap below.</p>
                {lastSubmission && (
                  <a href={buildWaUrl(lastSubmission)} target="_blank" rel="noopener noreferrer" className="cs-wa-btn">
                    <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.444h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.48-8.447z"/></svg>
                    Open WhatsApp Chat
                  </a>
                )}
                <button className="cs-another" onClick={() => setLastSubmission(null)}>
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <div className="cs-grid">

                {/* ── Left trust panel ── */}
                <div className="cs-trust">
                  <div className="cs-trust-glow-a" aria-hidden="true" />
                  <div className="cs-trust-glow-b" aria-hidden="true" />

                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div className="cs-trust-badge">Partner With Us</div>
                    <h3>Let&apos;s build <br />something <span>extraordinary.</span></h3>
                    <p className="cs-trust-desc">
                      Collaborate with India&apos;s professional technology agency. Get high-performance
                      custom web development, mobile apps, and automated workflows.
                    </p>
                  </div>

                  <div className="cs-trust-pts" style={{ position: "relative", zIndex: 1 }}>
                    {[
                      {
                        title: "GST Registered Agency",
                        desc: "Transparent corporate billing, contracts, and compliant timelines.",
                        icon: (
                          <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                        ),
                      },
                      {
                        title: "Free Maintenance Policy",
                        desc: "Complete bug fixes and code monitoring post-launch without fees.",
                        icon: (
                          <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                        ),
                      },
                      {
                        title: "Direct Access to Engineers",
                        desc: "Direct coordination with your dev squad via Slack or WhatsApp.",
                        icon: (
                          <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                        ),
                      },
                    ].map((pt, i) => (
                      <div className="cs-trust-pt" key={i}>
                        <div className="cs-trust-pt-icon">{pt.icon}</div>
                        <div>
                          <p className="cs-trust-pt-title">{pt.title}</p>
                          <p className="cs-trust-pt-desc">{pt.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="cs-trust-footer" style={{ position: "relative", zIndex: 1 }}>
                    <div className="cs-online">
                      <span className="cs-online-dot" />
                      Office Hotline: 9431673018
                    </div>
                    <div className="cs-sla">Average SLA: Under 2 Hours</div>
                  </div>
                </div>

                {/* ── Right form panel ── */}
                <div className="cs-form-panel">
                  <div className="cs-form-head">
                    <p className="cs-form-label-top">Get In Touch</p>
                    <h2 className="cs-form-h">Talk to our experts</h2>
                    <p className="cs-form-sub">Tell us about your project goals. We&apos;ll build a customised roadmap.</p>
                  </div>

                  <form onSubmit={onSubmit} className="cs-form">
                    <div className="cs-row">
                      <div className="cs-field">
                        <label htmlFor="cs-name">Full Name</label>
                        <input id="cs-name" name="name" placeholder="e.g. Parth Patel" required />
                        <ValidationError prefix="Name" field="name" errors={state.errors} className="cs-verr" />
                      </div>
                      <div className="cs-field">
                        <label htmlFor="cs-email">Email Address</label>
                        <input id="cs-email" name="email" type="email" placeholder="parth@example.com" required />
                        <ValidationError prefix="Email" field="email" errors={state.errors} className="cs-verr" />
                      </div>
                    </div>

                    <div className="cs-row">
                      <div className="cs-field">
                        <label htmlFor="cs-phone">Phone / WhatsApp</label>
                        <input
                          id="cs-phone" name="phone" type="tel"
                          placeholder="9876543210" required
                          maxLength={10} pattern="[0-9]{10}"
                          value={phone}
                          onChange={e => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        />
                        <ValidationError prefix="Phone" field="phone" errors={state.errors} className="cs-verr" />
                      </div>
                      <div className="cs-field">
                        <label htmlFor="cs-company">Company Name</label>
                        <input id="cs-company" name="company" placeholder="Your Business Name" />
                        <ValidationError prefix="Company" field="company" errors={state.errors} className="cs-verr" />
                      </div>
                    </div>

                    <div className="cs-row">
                      <div className="cs-field">
                        <label htmlFor="cs-service">Interested In</label>
                        <div className="cs-select-wrap">
                          <select id="cs-service" name="service" required defaultValue="">
                            <option value="" disabled>Select a service</option>
                            <option>Web Development</option>
                            <option>Mobile App Development</option>
                            <option>Cloud Solutions</option>
                            <option>CRM &amp; Automation</option>
                            <option>UI/UX Design</option>
                            <option>Free Maintenance Policy</option>
                            <option>Other Query</option>
                          </select>
                        </div>
                        <ValidationError prefix="Service" field="service" errors={state.errors} className="cs-verr" />
                      </div>
                      <div className="cs-field">
                        <label htmlFor="cs-budget">Project Budget</label>
                        <div className="cs-select-wrap">
                          <select id="cs-budget" name="budget" required defaultValue="">
                            <option value="" disabled>Select budget range</option>
                            <option>Under ₹50,000</option>
                            <option>₹50,000 – ₹2,00,000</option>
                            <option>₹2,00,000 – ₹5,00,000</option>
                            <option>₹5,00,000+</option>
                            <option>Not Decided yet</option>
                          </select>
                        </div>
                        <ValidationError prefix="Budget" field="budget" errors={state.errors} className="cs-verr" />
                      </div>
                    </div>

                    <div className="cs-field">
                      <label>Timeline</label>
                      <input type="hidden" name="timeline" value={timeline} required />
                      <div className="cs-timeline">
                        {["Immediate", "1–2 Months", "3+ Months", "Just Exploring"].map(opt => (
                          <div
                            key={opt}
                            className={`cs-timeline-opt${timeline === opt ? " selected" : ""}`}
                            onClick={() => setTimeline(opt)}
                            role="radio"
                            aria-checked={timeline === opt}
                            tabIndex={0}
                            onKeyDown={e => e.key === "Enter" && setTimeline(opt)}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="cs-field">
                      <label htmlFor="cs-message">Detailed Message</label>
                      <textarea
                        id="cs-message" name="message" rows={3} required
                        placeholder="Tell us about your project goals or specific features you need..."
                      />
                      <ValidationError prefix="Message" field="message" errors={state.errors} className="cs-verr" />
                    </div>

                    <button type="submit" className="cs-btn" disabled={state.submitting}>
                      <span className="cs-btn-inner">
                        {state.submitting ? "Processing inquiry…" : "Submit Project Inquiry"}
                      </span>
                    </button>
                  </form>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}