"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const styles = `

  /* ══════════════════════════════════════════════
     SPLASH
  ══════════════════════════════════════════════ */
  .sp-wrap {
    position: fixed; inset: 0; z-index: 400;
    background: #f2f2f4;
    display: flex; align-items: center; justify-content: center;
  }
  .sp-wrap.gone {
    transform: translateY(-100%);
    transition: transform 0.7s cubic-bezier(0.76, 0, 0.24, 1);
    pointer-events: none;
  }

  .sp-inner { display: flex; flex-direction: column; align-items: center; gap: 1.1rem; }

  .sp-word {
    display: inline-block;
    font-family: var(--font-dm-sans), sans-serif; font-weight: 600;
    font-size: clamp(2.6rem, 7.5vw, 6.4rem);
    color: #1d1d1f; letter-spacing: -0.04em; line-height: 1.04;
    opacity: 0; transform: translateY(48px) rotateX(-25deg);
    transform-origin: 50% 100%;
    transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .sp-word.show { opacity: 1; transform: translateY(0) rotateX(0deg); }
  .sp-headline-row {
    display: flex; gap: 0.3em; perspective: 600px;
    flex-wrap: wrap; justify-content: center;
  }

  .sp-line {
    width: 0; height: 1.5px;
    background: linear-gradient(90deg,
      transparent 0%, rgba(255, 149, 0, 0.55) 40%,
      rgba(224, 102, 0, 0.55) 60%, transparent 100%
    );
    border-radius: 2px; opacity: 0;
    transition: width 0.6s cubic-bezier(0.25, 1, 0.5, 1) 0.18s,
                opacity 0.3s ease 0.18s;
  }
  .sp-line.show { width: 220px; opacity: 1; }

  .sp-sub {
    font-family: var(--font-dm-sans), sans-serif;
    font-size: clamp(0.62rem, 1.15vw, 0.76rem); font-weight: 400;
    color: rgba(0,0,0,0.36); letter-spacing: 0.32em; text-transform: uppercase;
    opacity: 0; transform: translateY(8px);
    transition: opacity 0.45s ease 0.3s, transform 0.45s ease 0.3s;
  }
  .sp-sub.show { opacity: 1; transform: translateY(0); }

  /* ══════════════════════════════════════════════
     HERO WRAPPER
  ══════════════════════════════════════════════ */
  .hr-wrap {
  padding-top: 5.8rem; ;
    position: relative; min-height: 100vh; overflow: hidden;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    background: #f2f2f4;
  }

  .hr-video {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; opacity: 0;
    transition: opacity 1.2s ease; will-change: opacity;
  }
  .hr-video.show { opacity: 1; }

  .hr-overlay {
    position: absolute; inset: 0; z-index: 1; pointer-events: none;
    background:
      linear-gradient(to bottom,
        rgba(242,242,244,0.90) 0%,
        rgba(242,242,244,0.00) 30%,
        rgba(242,242,244,0.00) 65%,
        rgba(242,242,244,0.95) 100%
      ),
      linear-gradient(to right,
        rgba(242,242,244,0.75) 0%, transparent 35%
      ),
      linear-gradient(to left,
        rgba(242,242,244,0.75) 0%, transparent 35%
      );
  }

  /* Static film grain — the previous infinite background-position animation
     repainted the whole viewport ~4x/second and was a major CPU/GPU drain. */
  .hr-grain {
    position: absolute; inset: 0; z-index: 2; pointer-events: none; opacity: 0.022;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 200px 200px;
  }

  /* ══════════════════════════════════════════════
     CONTENT
  ══════════════════════════════════════════════ */
  .hr-content {
    position: relative; z-index: 3; width: 100%;
    max-width: 1080px; padding: clamp(1.5rem, 4vw, 3rem);
    display: flex; flex-direction: column; align-items: center;
    text-align: center; margin-top: -2rem;
  }

  /* ── BADGE ──────────────────────────────────────────────── */
  .hr-badge {
    position: relative;
    display: inline-flex; align-items: center; gap: 0.62rem;
    border-radius: 999px;
    padding: 0.46rem 1.35rem 0.46rem 0.92rem;
    background: rgba(255,255,255,0.76);
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
    color: rgba(0,0,0,0.58);
    font-family: var(--font-dm-sans), sans-serif;
    font-size: clamp(0.7rem, 1vw, 0.82rem); font-weight: 400;
    letter-spacing: 0.015em;
    margin-bottom: clamp(1.5rem, 3vw, 2.2rem);
    border: 1px solid transparent; cursor: default;
    box-shadow: 0 2px 16px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);
    opacity: 0; transform: translateY(14px) scale(0.92);
    transition: opacity 0.78s ease, transform 0.78s cubic-bezier(0.16,1,0.3,1),
                box-shadow 0.4s ease, color 0.3s ease;
  }
  .hr-badge.show { opacity: 1; transform: translateY(0) scale(1); }
  .hr-badge::before {
    content: ''; position: absolute; inset: -1px;
    border-radius: 999px; padding: 1.5px;
    background: linear-gradient(135deg,
      rgba(255,255,255,0.80)  0%,
      rgba(255, 149, 0, 0.55)  28%,
      rgba(224, 102, 0, 0.20)   52%,
      rgba(224, 102, 0, 0.60)   76%,
      rgba(255,255,255,0.72) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    pointer-events: none; transition: background 0.4s ease;
  }
  .hr-badge:hover {
    color: rgba(0,0,0,0.80);
    box-shadow: 0 4px 22px rgba(255, 149, 0, 0.14), 0 1px 4px rgba(0,0,0,0.06);
  }

  .hr-badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #f38200; box-shadow: 0 0 8px rgba(255, 149, 0, 0.70);
    flex-shrink: 0; opacity: 0; transform: translateX(-6px) scale(0);
    transition: opacity 0.5s ease 0.15s, transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.15s;
    animation: dotPulse 2.4s ease-in-out infinite 1s;
  }
  .hr-badge.show .hr-badge-dot { opacity: 1; transform: translateX(0) scale(1); }
  @keyframes dotPulse {
    0%,100% { box-shadow: 0 0 8px rgba(255, 149, 0, .7),  0 0 0 0 rgba(255, 149, 0, .3); }
    50%     { box-shadow: 0 0 14px rgba(255, 149, 0, .9), 0 0 0 5px rgba(255, 149, 0, 0); }
  }
  .hr-badge-text { position: relative; z-index: 1; }

  /* ── STATS ROW ──────────────────────────────────────────── */
  .hr-stats {
    display: flex; align-items: center; gap: 2.4rem;
    margin-bottom: clamp(1.4rem, 2.6vw, 2rem);
    opacity: 0; transform: translateY(14px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .hr-stats.show { opacity: 1; transform: translateY(0); }
  .hr-stat { display: flex; flex-direction: column; align-items: center; gap: 0.18rem; }
  .hr-stat-num {
    font-family: var(--font-dm-sans), sans-serif; font-weight: 600;
    font-size: clamp(1.35rem, 2.2vw, 1.8rem);
    color: #1d1d1f; letter-spacing: -0.03em; line-height: 1;
  }
  .hr-stat-label {
    font-family: var(--font-dm-sans), sans-serif; font-weight: 400;
    font-size: clamp(0.58rem, 0.85vw, 0.7rem);
    color: rgba(0,0,0,0.38); letter-spacing: 0.08em; text-transform: uppercase;
    white-space: nowrap;
  }
  .hr-stat-divider {
    width: 1px; height: 2.4rem;
    background: rgba(0,0,0,0.10); flex-shrink: 0;
  }

  /* ── HEADLINE ───────────────────────────────────────────── */
  .hr-title-wrap {
    perspective: 800px;
    display: flex; flex-wrap: wrap; justify-content: center;
    gap: 0.2em 0.28em; max-width: 900px;
    margin-bottom: clamp(1.6rem, 3vw, 2.2rem);
  }

  .hr-title-word {
    font-family: var(--font-dm-sans), sans-serif; font-weight: 500;
    font-size: clamp(2.4rem, 6.4vw, 5.8rem);
    color: #1d1d1f; letter-spacing: -0.02em; line-height: 1.09;
    display: inline-block;
    opacity: 0; transform: translateY(44px) rotateX(-20deg);
    transform-origin: 50% 100%;
    transition: opacity 0.82s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.82s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .hr-title-word.show { opacity: 1; transform: translateY(0) rotateX(0deg); }

  /* gradient accent on last word */
  .hr-title-word.accent {
    background: linear-gradient(135deg, #ffd200 0%, #d2540a 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── DESCRIPTION ────────────────────────────────────────── */
  .hr-desc-wrap {
    max-width: 680px;
    opacity: 0; transform: translateY(20px);
    transition: opacity 0.9s ease, transform 0.9s ease;
  }
  .hr-desc-wrap.show { opacity: 1; transform: translateY(0); }

  .hr-desc {
    font-family: var(--font-dm-sans), sans-serif; font-weight: 400;
    font-size: clamp(0.9rem, 1.32vw, 1.08rem);
    color: rgba(29,29,31,0.52); line-height: 1.7;
  }

  /* ── TRUST STRIP ────────────────────────────────────────── */
  .hr-trust {
    display: flex; align-items: center; gap: 1.2rem; flex-wrap: wrap;
    justify-content: center;
    margin-top: 1.2rem;
    opacity: 0; transform: translateY(10px);
    transition: opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s;
  }
  .hr-trust.show { opacity: 1; transform: translateY(0); }
  .hr-trust-chip {
    display: inline-flex; align-items: center; gap: 0.38rem;
    font-family: var(--font-dm-sans), sans-serif; font-weight: 400;
    font-size: clamp(0.64rem, 0.9vw, 0.72rem);
    color: rgba(0,0,0,0.42); letter-spacing: 0.01em;
  }
  .hr-trust-chip svg { flex-shrink: 0; opacity: 0.55; }
  .hr-trust-sep { width: 3px; height: 3px; border-radius: 50%; background: rgba(0,0,0,0.16); }

  /* ══════════════════════════════════════════════
     BUTTONS
  ══════════════════════════════════════════════ */
  .hr-btns {
    display: flex; flex-wrap: wrap; gap: 1.1rem; justify-content: center;
    margin-top: clamp(2rem, 4vw, 2.8rem);
    opacity: 0; transform: translateY(28px);
    transition: opacity 0.9s ease, transform 0.9s ease;
  }
  .hr-btns.show { opacity: 1; transform: translateY(0); }

  .hr-btn {
    position: relative; overflow: hidden;
    font-family: var(--font-dm-sans), sans-serif; font-weight: 500;
    font-size: clamp(0.84rem, 1.1vw, 0.93rem);
    padding: 0.9rem 2.4rem; border-radius: 14px;
    text-decoration: none; cursor: pointer;
    display: inline-flex; align-items: center; justify-content: center;
    gap: 0.45rem;
    transition: transform 0.38s cubic-bezier(0.25,1,0.5,1),
                box-shadow 0.38s ease;
  }
  .hr-btn:active { transform: scale(0.96) translateY(1px) !important; }

  .hr-btn-inner {
    position: relative; z-index: 2;
    pointer-events: none;
    transition: transform 0.38s cubic-bezier(0.25,1,0.5,1);
  }

  .hr-btn-ripple {
    position: absolute; border-radius: 50%;
    transform: scale(0); pointer-events: none;
    animation: btnRipple 0.52s ease-out forwards;
  }
  @keyframes btnRipple { to { transform: scale(4); opacity: 0; } }

  /* Primary */
  .hr-btn.primary {
    color: #fff;
    background: linear-gradient(135deg,
      #ffd200 0%, #f38200 38%, #d2540a 72%, #a8420a 100%
    );
    box-shadow:
      0 2px 12px rgba(224, 102, 0, 0.28),
      0 1px 3px  rgba(0,0,0,0.10),
      inset 0 1px 0 rgba(255,255,255,0.22);
  }
  .hr-btn.primary::before {
    content: ''; position: absolute; inset: 0; z-index: 1; border-radius: 14px;
    background: linear-gradient(160deg,
      rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.00) 52%
    );
    pointer-events: none; transition: opacity 0.35s ease;
  }
  .hr-btn.primary::after {
    content: ''; position: absolute; top: 0; left: 10%; right: 10%; height: 1px; z-index: 3;
    background: rgba(255,255,255,0.48); border-radius: 1px; pointer-events: none;
  }
  .hr-btn.primary .hr-btn-ripple { background: rgba(255,255,255,0.22); }
  .hr-btn.primary:hover {
    transform: translateY(-2px) scale(1.025);
    box-shadow:
      0 8px 28px rgba(224, 102, 0, 0.34),
      0 2px 8px  rgba(0,0,0,0.12),
      inset 0 1px 0 rgba(255,255,255,0.26);
  }
  .hr-btn.primary:hover::before { opacity: 0.72; }

  /* Secondary */
  .hr-btn.secondary {
    color: rgba(29,29,31,0.78);
    background: rgba(255,255,255,0.72);
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 2px 14px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.05);
    border: 1px solid transparent;
  }
  .hr-btn.secondary::before {
    content: ''; position: absolute; inset: -1px; border-radius: 15px; padding: 1px;
    background: linear-gradient(140deg,
      rgba(255,255,255,0.88)  0%,
      rgba(255, 210, 0, 0.50)  22%,
      rgba(224, 102, 0, 0.12)   50%,
      rgba(224, 102, 0, 0.42)   78%,
      rgba(255,255,255,0.70) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    pointer-events: none; transition: background 0.38s ease;
  }
  .hr-btn.secondary::after {
    content: ''; position: absolute; inset: 0; z-index: 0; border-radius: 14px;
    background: radial-gradient(ellipse 80% 60% at 50% 110%,
      rgba(255, 149, 0, 0.10) 0%, transparent 70%
    );
    pointer-events: none; opacity: 0.5; transition: opacity 0.38s ease;
  }
  .hr-btn.secondary .hr-btn-ripple { background: rgba(255, 149, 0, 0.10); }
  .hr-btn.secondary:hover {
    color: rgba(29,29,31,0.92);
    transform: translateY(-2px) scale(1.025);
    background: rgba(255,255,255,0.88);
    box-shadow: 0 6px 24px rgba(255, 149, 0, 0.14), 0 2px 6px rgba(0,0,0,0.07);
  }
  .hr-btn.secondary:hover::before {
    background: linear-gradient(140deg,
      rgba(255,255,255,0.96)  0%,
      rgba(255, 210, 0, 0.75)  22%,
      rgba(224, 102, 0, 0.22)   50%,
      rgba(224, 102, 0, 0.68)   78%,
      rgba(255,255,255,0.90) 100%
    );
  }
  .hr-btn.secondary:hover::after { opacity: 0.85; }

  /* ══════════════════════════════════════════════
     SCROLL HINT
  ══════════════════════════════════════════════ */
  .hr-scroll {
    position: absolute; bottom: clamp(1.6rem,3.5vh,2.8rem); left: 50%;
    transform: translateX(-50%); z-index: 3;
    display: flex; align-items: center; gap: 1.3rem;
    color: rgba(0,0,0,0.28);
    font-family: var(--font-dm-sans), sans-serif; font-size: 0.6rem; font-weight: 400;
    letter-spacing: 0.12rem; white-space: nowrap;
    opacity: 0; transition: opacity 1.1s ease;
  }
  .hr-scroll.show { opacity: 1; }
  .hr-scroll-line { width: 56px; height: 1px; background: rgba(0,0,0,0.10); flex-shrink: 0; }
  .hr-mouse {
    width: 16px; height: 23px;
    border: 1.5px solid rgba(0,0,0,0.18); border-radius: 20px;
    display: flex; justify-content: center; align-items: flex-start;
    padding-top: 5px; flex-shrink: 0;
  }
  .hr-mouse-dot {
    width: 2px; height: 4px; border-radius: 2px;
    background: rgba(0,0,0,0.38);
    animation: hrMouseDot 2s ease-in-out infinite;
  }
  @keyframes hrMouseDot {
    0%   { transform: translateY(0);   opacity: 1; }
    70%  { transform: translateY(8px); opacity: 0; }
    71%  { transform: translateY(0);   opacity: 0; }
    100% { transform: translateY(0);   opacity: 1; }
  }

  /* ══════════════════════════════════════════════
     RESPONSIVE
  ══════════════════════════════════════════════ */
  @media (max-width: 600px) {
    .hr-btns {
      flex-direction: column; align-items: stretch;
      width: 100%; max-width: 280px; margin-inline: auto; gap: 0.9rem;
    }
    .hr-btn { padding: 0.9rem 1.6rem; }
    .hr-scroll-line { width: 32px; }
    .hr-scroll { gap: 0.85rem; }
    .hr-stats { gap: 1.4rem; }
    .hr-trust { gap: 0.9rem; }
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

/* ── Timing constants (ms) ─────────────────────────────────────────
   Trimmed to a ~1.2s brand flourish (was ~3.3s). The splash is a quick
   flourish, not a loading gate. */
const T = {
  SPLASH_TEXT : 60,
  SPLASH_LINE : 240,
  SPLASH_SUB  : 340,
  SPLASH_UP   : 900,
  HERO        : 1080,
} as const;

// Updated to match real brand positioning
const HEADLINE_WORDS    = ["Next-Gen", "Software", "for", "Every", "Business"];
const ACCENT_INDEX      = 4; // "Business" gets the gradient
const SPLASH_WORDS_TEXT = ["Building", "Digital", "Excellence..."];

export default function Hero() {
  const [splashWords, setSplashWords] = useState<boolean[]>(SPLASH_WORDS_TEXT.map(() => false));
  const [splashLine,  setSplashLine]  = useState(false);
  const [splashSub,   setSplashSub]   = useState(false);
  const [splashGone,  setSplashGone]  = useState(false);
  const [videoShow,   setVideoShow]   = useState(false);
  const [badge,       setBadge]       = useState(false);
  const [titleWords,  setTitleWords]  = useState<boolean[]>(HEADLINE_WORDS.map(() => false));
  const [desc,        setDesc]        = useState(false);
  const [trust,       setTrust]       = useState(false);
  const [btns,        setBtns]        = useState(false);
  const [scroll,      setScroll]      = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef  = useRef<HTMLDivElement>(null);
  const btn1Ref  = useRef<HTMLAnchorElement>(null);
  const btn2Ref  = useRef<HTMLAnchorElement>(null);

  /* ── Sequence ── */
  useEffect(() => {
    const at = (fn: () => void, ms: number) => setTimeout(fn, ms);

    const splashWordIds = SPLASH_WORDS_TEXT.map((_, i) =>
      at(() => setSplashWords(prev => { const next = [...prev]; next[i] = true; return next; }),
        T.SPLASH_TEXT + i * 70)
    );

    const ids = [
      at(() => setSplashLine(true),  T.SPLASH_LINE),
      at(() => setSplashSub(true),   T.SPLASH_SUB),
      at(() => setVideoShow(true),   T.SPLASH_UP - 400),
      at(() => setSplashGone(true),  T.SPLASH_UP),
      at(() => setBadge(true),       T.HERO),
      ...HEADLINE_WORDS.map((_, i) =>
        at(() => setTitleWords(prev => { const next = [...prev]; next[i] = true; return next; }),
          T.HERO + 140 + i * 80)
      ),
      at(() => setDesc(true),   T.HERO + 140 + HEADLINE_WORDS.length * 80 + 60),
      at(() => setTrust(true),  T.HERO + 140 + HEADLINE_WORDS.length * 80 + 120),
      at(() => setBtns(true),   T.HERO + 140 + HEADLINE_WORDS.length * 80 + 220),
      at(() => setScroll(true), T.HERO + 620),
    ];

    return () => [...splashWordIds, ...ids].forEach(clearTimeout);
  }, []);

  /* ── Parallax video (pointer-driven, rAF-throttled so we write the
        transform at most once per frame instead of on every mousemove) ── */
  useEffect(() => {
    const wrap = wrapRef.current;
    const vid  = videoRef.current;
    if (!wrap || !vid) return;
    // Skip the parallax work entirely on touch / coarse-pointer devices.
    if (window.matchMedia("(hover: none)").matches) return;

    let frame = 0;
    let nextX = 0;
    let nextY = 0;
    const apply = () => {
      frame = 0;
      vid.style.transform = `translate(${nextX}px,${nextY}px) scale(1.06)`;
    };
    const onMove = (e: MouseEvent) => {
      nextX = (e.clientX / window.innerWidth  - 0.5) * 14;
      nextY = (e.clientY / window.innerHeight - 0.5) * 10;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      if (frame) { cancelAnimationFrame(frame); frame = 0; }
      vid.style.transform = "translate(0,0) scale(1.04)";
    };
    wrap.addEventListener("mousemove", onMove, { passive: true });
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* ── Magnetic + ripple ── */
  const makeMagnetic = useCallback((ref: { current: HTMLAnchorElement | null }) => {
    const btn = ref.current;
    if (!btn) return;
    const inner = btn.querySelector<HTMLElement>(".hr-btn-inner");

    // rAF-throttle the transform writes to one per frame.
    let frame = 0;
    let dx = 0;
    let dy = 0;
    const apply = () => {
      frame = 0;
      btn.style.transform = `translate(${dx}px,${dy}px) scale(1.04)`;
      if (inner) inner.style.transform = `translate(${dx * 0.5}px,${dy * 0.5}px)`;
    };
    const onMove = (e: MouseEvent) => {
      const r  = btn.getBoundingClientRect();
      dx = (e.clientX - r.left - r.width  / 2) * 0.30;
      dy = (e.clientY - r.top  - r.height / 2) * 0.30;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      if (frame) { cancelAnimationFrame(frame); frame = 0; }
      btn.style.transform = "";
      if (inner) inner.style.transform = "";
    };
    const onClick = (e: MouseEvent) => {
      const r      = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "hr-btn-ripple";
      const size = Math.max(r.width, r.height);
      ripple.style.cssText =
        `width:${size}px;height:${size}px;` +
        `left:${e.clientX - r.left - size / 2}px;` +
        `top:${e.clientY - r.top  - size / 2}px`;
      btn.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    };

    btn.addEventListener("mousemove",  onMove, { passive: true });
    btn.addEventListener("mouseleave", onLeave);
    btn.addEventListener("click",      onClick);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      btn.removeEventListener("mousemove",  onMove);
      btn.removeEventListener("mouseleave", onLeave);
      btn.removeEventListener("click",      onClick);
    };
  }, []);

  useEffect(() => {
    const c1 = makeMagnetic(btn1Ref);
    const c2 = makeMagnetic(btn2Ref);
    return () => { c1?.(); c2?.(); };
  }, [btns, makeMagnetic]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* ── SPLASH ─────────────────────────────────────────── */}
      <div className={`sp-wrap${splashGone ? " gone" : ""}`} aria-hidden="true">
        <div className="sp-inner">
          <div className="sp-headline-row">
            {SPLASH_WORDS_TEXT.map((word, i) => (
              <span
                key={i}
                className={`sp-word${splashWords[i] ? " show" : ""}`}
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                {word}
              </span>
            ))}
          </div>
          <div className={`sp-line${splashLine ? " show" : ""}`} />
          <div className={`sp-sub${splashSub  ? " show" : ""}`}>
            Sabka Saathi Digital Services
          </div>
        </div>
      </div>

      {/* ── HERO ───────────────────────────────────────────── */}
      <div className="hr-wrap" ref={wrapRef}>

        <video
          ref={videoRef}
          className={`hr-video${videoShow ? " show" : ""}`}
          autoPlay muted loop playsInline aria-hidden="true"
          poster="/images/hero-poster.jpg"
          preload="auto"
          style={{ transition: "opacity 1.2s ease, transform 0.12s ease" }}
        >
          <source src="/images/herobagourdveido.mp4" type="video/mp4" />
        </video>

        <div className="hr-overlay" aria-hidden="true" />
        <div className="hr-grain"   aria-hidden="true" />

        <main className="hr-content">

          {/* Badge */}
          <div className={`hr-badge${badge ? " show" : ""}`}>
            <span className="hr-badge-dot" />
            <span className="hr-badge-text">GST Registered Agency · 30 Experts · Under 2hr SLA</span>
          </div>

          {/* Stats row
          <div className={`hr-stats${stats ? " show" : ""}`} aria-hidden="true">
            <div className="hr-stat">
              <span className="hr-stat-num">17+</span>
              <span className="hr-stat-label">Developers</span>
            </div>
            <div className="hr-stat-divider" />
            <div className="hr-stat">
              <span className="hr-stat-num">13+</span>
              <span className="hr-stat-label">Designers</span>
            </div>
            <div className="hr-stat-divider" />
            <div className="hr-stat">
              <span className="hr-stat-num">Live</span>
              <span className="hr-stat-label">Projects Running</span>
            </div>
            <div className="hr-stat-divider" />
            <div className="hr-stat">
              <span className="hr-stat-num">3</span>
              <span className="hr-stat-label">Regional Hubs</span>
            </div>
          </div> */}

          {/* Headline */}
          <div className="hr-title-wrap" role="heading" aria-level={1}>
            {HEADLINE_WORDS.map((word, i) => (
              <span
                key={i}
                className={`hr-title-word${titleWords[i] ? " show" : ""}${i === ACCENT_INDEX ? " accent" : ""}`}
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                {word}
              </span>
            ))}
          </div>

          {/* Description */}
          <div className={`hr-desc-wrap${desc ? " show" : ""}`}>
            <p className="hr-desc">
              We build high-performance Next.js web applications, native mobile apps, and
              CRM automation systems that help startups, retailers, and local enterprises
              across India scale faster and compete smarter.
            </p>
          </div>

          {/* Trust chips */}
          <div className={`hr-trust${trust ? " show" : ""}`}>
            <span className="hr-trust-chip">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1L7.5 4.5H11L8.5 6.8L9.5 10.5L6 8.5L2.5 10.5L3.5 6.8L1 4.5H4.5L6 1Z" fill="#f38200"/>
              </svg>
              Next.js · React · Flutter
            </span>
            <span className="hr-trust-sep" />
            <span className="hr-trust-chip">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="#f38200" strokeWidth="1.4"/>
                <path d="M4 6L5.5 7.5L8 4.5" stroke="#f38200" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Razorpay · Stripe · MongoDB
            </span>
            <span className="hr-trust-sep" />
            <span className="hr-trust-chip">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="1.5" y="2.5" width="9" height="7" rx="1.5" stroke="#f38200" strokeWidth="1.4"/>
                <path d="M1.5 5h9" stroke="#f38200" strokeWidth="1.4"/>
              </svg>
              Bihar · Pune · Gujarat
            </span>
          </div>

          {/* CTA Buttons */}
          <div className={`hr-btns${btns ? " show" : ""}`}>
            <a href="#contact" className="hr-btn primary" ref={btn1Ref}>
              <span className="hr-btn-inner">Start Your Project</span>
            </a>
            <a href="#portfolio" className="hr-btn secondary" ref={btn2Ref}>
              <span className="hr-btn-inner">View Portfolio</span>
            </a>
          </div>

        </main> 
        <br /><br />

        {/* Scroll hint */}
        <div className={`hr-scroll${scroll ? " show" : ""}`} aria-hidden="true">
          <span>Scroll Down</span>
          <div className="hr-scroll-line" />
          <div className="hr-mouse"><div className="hr-mouse-dot" /></div>
          <div className="hr-scroll-line" />
          <span>to see projects</span>
        </div>

      </div>
    </>
  );
}