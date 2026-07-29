"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Globe, Loader2, Phone, MapPin, ShieldCheck, AlertTriangle } from "lucide-react";

/* ══════════════════════════════════════════════
   ICONS (outline, matches Hero's inline-svg style)
══════════════════════════════════════════════ */
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

/* ══════════════════════════════════════════════
   STYLES — liquid-glass system, ported 1:1 from Hero
══════════════════════════════════════════════ */
const styles = `

  .tc-root { background: #f2f2f4; position: relative; font-family: var(--font-dm-sans), sans-serif; }

  .tc-noise {
    position: absolute; inset: 0; pointer-events: none; opacity: 0.022; z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 200px 200px;
  }

  .tc-shell { position: relative; z-index: 1; max-width: 1180px; margin: 0 auto; padding: clamp(3rem,7vw,6rem) clamp(1.25rem,4vw,2.5rem); }

  /* ── Ambient blobs ── */
  .tc-blob { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; z-index: 0; }
  .tc-blob.a { width: 420px; height: 420px; top: -80px; right: -120px; background: rgba(255, 149, 0, 0.10); }
  .tc-blob.b { width: 360px; height: 360px; bottom: 10%; left: -140px; background: rgba(224, 102, 0, 0.08); }

  /* ── Badge (pill, gradient-ring) ── */
  .tc-badge {
    position: relative; display: inline-flex; align-items: center; gap: 0.6rem;
    border-radius: 999px; padding: 0.44rem 1.2rem 0.44rem 0.9rem;
    background: rgba(255,255,255,0.76);
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
    color: rgba(0,0,0,0.58); font-size: 0.72rem; font-weight: 500;
    letter-spacing: 0.14em; text-transform: uppercase;
    box-shadow: 0 2px 16px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);
  }
  .tc-badge::before {
    content: ''; position: absolute; inset: -1px; border-radius: 999px; padding: 1.5px;
    background: linear-gradient(135deg, rgba(255,255,255,0.80) 0%, rgba(255, 149, 0, 0.55) 28%,
      rgba(224, 102, 0, 0.20) 52%, rgba(224, 102, 0, 0.60) 76%, rgba(255,255,255,0.72) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
  }
  .tc-badge-dot {
    width: 6px; height: 6px; border-radius: 50%; background: #f38200;
    box-shadow: 0 0 8px rgba(255, 149, 0, 0.70); flex-shrink: 0;
    animation: tcDotPulse 2.4s ease-in-out infinite;
  }
  @keyframes tcDotPulse {
    0%,100% { box-shadow: 0 0 8px rgba(255, 149, 0, .7), 0 0 0 0 rgba(255, 149, 0, .3); }
    50%     { box-shadow: 0 0 14px rgba(255, 149, 0, .9), 0 0 0 5px rgba(255, 149, 0, 0); }
  }

  /* ── Section header ── */
  .tc-header { text-align: center; max-width: 720px; margin: 0 auto clamp(3rem,6vw,4.5rem); display: flex; flex-direction: column; align-items: center; gap: 1.4rem; }
  .tc-h1 {
    font-weight: 500; letter-spacing: -0.025em; line-height: 1.08;
    font-size: clamp(2.4rem, 5.6vw, 4.2rem); color: #1d1d1f;
  }
  .tc-accent {
    background: linear-gradient(135deg, #ffd200 0%, #d2540a 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .tc-lede { font-size: clamp(0.95rem, 1.3vw, 1.1rem); line-height: 1.7; color: rgba(29,29,31,0.52); font-weight: 400; }

  .tc-eyebrow {
    display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.68rem; font-weight: 600;
    letter-spacing: 0.16em; text-transform: uppercase; color: rgba(0,0,0,0.36); margin-bottom: 0.7rem;
  }
  .tc-eyebrow-dot { width: 5px; height: 5px; border-radius: 50%; background: #f38200; }

  /* ── Glass card (core signature element) ── */
  .tc-card {
    position: relative; border-radius: 32px; background: rgba(255,255,255,0.68);
    backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
    box-shadow: 0 4px 28px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6);
    overflow: hidden;
  }
  .tc-card::before {
    content: ''; position: absolute; inset: -1px; border-radius: 33px; padding: 1px; z-index: 0;
    background: linear-gradient(150deg, rgba(255,255,255,0.85) 0%, rgba(255, 210, 0, 0.28) 30%,
      rgba(224, 102, 0, 0.08) 55%, rgba(224, 102, 0, 0.22) 80%, rgba(255,255,255,0.6) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
  }
  .tc-card-pad { position: relative; z-index: 1; padding: clamp(1.75rem,3.4vw,3rem); }

  /* ── Grid ── */
  .tc-grid-main { display: grid; grid-template-columns: 1.6fr 1fr; gap: 1.6rem; margin-bottom: 1.6rem; }
  .tc-grid-two { display: grid; grid-template-columns: 1fr 1fr; gap: 1.6rem; margin-bottom: 1.6rem; }
  @media (max-width: 860px) { .tc-grid-main, .tc-grid-two { grid-template-columns: 1fr; } }

  .tc-card-title {
    font-size: clamp(1.4rem,2vw,1.7rem); font-weight: 500; color: #1d1d1f;
    letter-spacing: -0.01em; margin-bottom: 1.6rem; display: flex; align-items: center; gap: 0.8rem;
  }
  .tc-icon-chip {
    width: 42px; height: 42px; border-radius: 13px; display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, rgba(255, 210, 0, 0.16), rgba(224, 102, 0, 0.14));
    color: #d2540a; flex-shrink: 0;
  }

  /* ── Founder card ── */
  .tc-quote {
    font-size: clamp(1.15rem,1.7vw,1.4rem); font-weight: 500; font-style: italic;
    color: #1d1d1f; line-height: 1.5; margin-bottom: 1.3rem; letter-spacing: -0.01em;
  }
  .tc-body { font-size: 0.98rem; line-height: 1.75; color: rgba(29,29,31,0.58); font-weight: 400; margin-bottom: 0.9rem; }
  .tc-body strong { color: #1d1d1f; font-weight: 600; }

  .tc-founder-row { display: grid; grid-template-columns: 1fr 200px; gap: 2.2rem; align-items: start; }
  @media (max-width: 700px) { .tc-founder-row { grid-template-columns: 1fr; } }
  .tc-founder-photo { position: relative; aspect-ratio: 3/4; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 34px rgba(0,0,0,0.14); border: 3px solid rgba(255,255,255,0.9); }
  .tc-founder-name { text-align: center; margin-top: 0.8rem; font-weight: 700; font-size: 0.9rem; color: #1d1d1f; }
  .tc-founder-role { text-align: center; font-size: 0.66rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #f38200; }

  .tc-cta-strip {
    margin-top: 1.8rem; padding: 1.3rem 1.5rem; border-radius: 20px;
    background: rgba(255,255,255,0.55); border: 1px solid rgba(255,255,255,0.7);
    display: flex; align-items: center; justify-content: space-between; gap: 1.2rem; flex-wrap: wrap;
  }
  .tc-cta-strip span { font-weight: 600; color: rgba(29,29,31,0.75); font-size: 0.92rem; }

  /* ── Buttons (ported from Hero) ── */
  .tc-btn {
    position: relative; overflow: hidden; font-weight: 500; font-size: 0.86rem;
    padding: 0.78rem 1.7rem; border-radius: 13px; text-decoration: none; cursor: pointer;
    display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; white-space: nowrap;
    transition: transform 0.34s cubic-bezier(0.25,1,0.5,1), box-shadow 0.34s ease;
    border: none;
  }
  .tc-btn:active { transform: scale(0.96); }
  .tc-btn.primary {
    color: #fff;
    background: linear-gradient(135deg, #ffd200 0%, #f38200 38%, #d2540a 72%, #a8420a 100%);
    box-shadow: 0 2px 12px rgba(224, 102, 0, 0.28), inset 0 1px 0 rgba(255,255,255,0.22);
  }
  .tc-btn.primary:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 8px 26px rgba(224, 102, 0, 0.32); }
  .tc-btn.light {
    color: #1d1d1f; background: #ffffff;
    box-shadow: 0 2px 14px rgba(0,0,0,0.08);
  }
  .tc-btn.light:hover { transform: translateY(-2px) scale(1.02); background: #fff7f2; }

  /* ── Company details list ── */
  .tc-dl { display: flex; flex-direction: column; }
  .tc-dl-row { display: flex; justify-content: space-between; gap: 1rem; padding: 0.85rem 0; border-bottom: 1px solid rgba(0,0,0,0.07); }
  .tc-dl-row:last-child { border-bottom: none; }
  .tc-dl-key { font-size: 0.82rem; color: rgba(0,0,0,0.42); font-weight: 400; flex-shrink: 0; }
  .tc-dl-val { font-size: 0.88rem; font-weight: 600; color: #1d1d1f; text-align: right; }
  .tc-dl-val a { color: #d2540a; text-decoration: none; }
  .tc-dl-val a:hover { text-decoration: underline; }

  .tc-verify-row { display: flex; align-items: center; gap: 0.7rem; padding: 0.7rem 0.9rem; border-radius: 13px; background: rgba(255,255,255,0.55); margin-top: 0.6rem; }
  .tc-verify-check { width: 20px; height: 20px; border-radius: 50%; background: rgba(46,196,120,0.16); color: #1e9e5a; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.7rem; font-weight: 700; }
  .tc-verify-row span { font-size: 0.82rem; font-weight: 600; color: rgba(29,29,31,0.72); }

  /* ── Stat blocks ── */
  .tc-stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem; margin-bottom: 1.6rem; }
  .tc-stat-block { border-radius: 18px; padding: 1.2rem 1.3rem; background: rgba(255,255,255,0.55); border: 1px solid rgba(255,255,255,0.7); }
  .tc-stat-block.wide { grid-column: 1 / -1; }
  .tc-stat-num { font-size: 1.7rem; font-weight: 600; color: #1d1d1f; letter-spacing: -0.02em; line-height: 1; margin-bottom: 0.3rem; }
  .tc-stat-num.sm { font-size: 1.25rem; }
  .tc-stat-label { font-size: 0.76rem; font-weight: 500; color: rgba(0,0,0,0.42); }

  /* ── Commitment list ── */
  .tc-commit-list { display: flex; flex-direction: column; gap: 0.9rem; }
  .tc-commit-item { display: flex; align-items: flex-start; gap: 0.7rem; }
  .tc-mark { flex-shrink: 0; font-weight: 700; font-size: 1.05rem; line-height: 1.5; margin-top: -0.05rem; }
  .tc-mark.no { color: #d2540a; }
  .tc-mark.yes { color: #1e9e5a; }
  .tc-commit-item p { font-size: 0.92rem; line-height: 1.6; color: rgba(29,29,31,0.62); font-weight: 400; }

  /* ── Developers ── */
  .tc-dev-head { text-align: center; margin-bottom: 2.2rem; display: flex; flex-direction: column; align-items: center; gap: 0.9rem; }
  .tc-dev-title { font-size: clamp(1.6rem,3.2vw,2.4rem); font-weight: 500; letter-spacing: -0.02em; color: #1d1d1f; }
  .tc-dev-sub { font-size: 0.88rem; color: rgba(29,29,31,0.5); max-width: 480px; line-height: 1.6; }

  .tc-dev-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.2rem; }
  @media (max-width: 980px) { .tc-dev-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .tc-dev-grid { grid-template-columns: 1fr; } }

  .tc-dev-card {
    position: relative; border-radius: 24px; overflow: hidden; background: rgba(255,255,255,0.7);
    backdrop-filter: blur(14px); box-shadow: 0 3px 18px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.6);
    display: flex; flex-direction: column; transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease;
  }
  .tc-dev-card::before {
    content: ''; position: absolute; inset: -1px; border-radius: 25px; padding: 1px; z-index: 0;
    background: linear-gradient(150deg, rgba(255,255,255,0.85) 0%, rgba(255, 210, 0, 0.22) 35%, rgba(255,255,255,0.5) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
  }
  .tc-dev-card:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(224, 102, 0, 0.12); }
  .tc-dev-photo { position: relative; width: 100%; height: 190px; background: rgba(0,0,0,0.03); z-index: 1; }
  .tc-dev-photo-empty { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 0.66rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(0,0,0,0.25); }
  .tc-dev-body { position: relative; z-index: 1; padding: 1rem 1.1rem 1.15rem; display: flex; flex-direction: column; flex: 1; }
  .tc-dev-name { font-size: 0.96rem; font-weight: 700; color: #1d1d1f; margin-bottom: 0.15rem; }
  .tc-dev-role { font-size: 0.63rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #f38200; margin-bottom: 0.55rem; }
  .tc-dev-desc { font-size: 0.78rem; line-height: 1.55; color: rgba(29,29,31,0.55); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 0.7rem; }
  .tc-dev-skills { display: flex; flex-wrap: wrap; gap: 0.32rem; margin-bottom: 0.75rem; margin-top: auto; }
  .tc-chip { font-size: 0.6rem; font-weight: 600; padding: 0.22rem 0.5rem; border-radius: 7px; background: rgba(255, 149, 0, 0.08); color: rgba(29,29,31,0.55); border: 1px solid rgba(255, 149, 0, 0.12); }
  .tc-dev-socials { display: flex; gap: 0.5rem; padding-top: 0.65rem; border-top: 1px solid rgba(0,0,0,0.06); }
  .tc-social-btn {
    width: 30px; height: 30px; border-radius: 9px; background: rgba(0,0,0,0.04); color: rgba(0,0,0,0.4);
    display: flex; align-items: center; justify-content: center; transition: all 0.25s ease;
  }
  .tc-social-btn:hover { background: #f38200; color: #fff; }

  .tc-empty-card { text-align: center; padding: 3.5rem 1.5rem; }
  .tc-empty-card p { font-size: 0.86rem; font-weight: 600; color: rgba(29,29,31,0.4); }
  .tc-loading { display: flex; align-items: center; justify-content: center; padding: 3.5rem 0; color: #f38200; }

  /* ── Notice banner ── */
  .tc-notice {
    display: flex; align-items: center; gap: 1.1rem; padding: 1.4rem 1.7rem; border-radius: 22px;
    background: rgba(255, 210, 0, 0.09); border: 1px solid rgba(255, 149, 0, 0.18); margin-bottom: 1.6rem;
  }
  .tc-notice-icon { width: 44px; height: 44px; border-radius: 13px; background: rgba(255, 149, 0, 0.16); color: #d2540a; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .tc-notice h4 { font-size: 1rem; font-weight: 700; color: #1d1d1f; margin-bottom: 0.25rem; }
  .tc-notice p { font-size: 0.85rem; font-weight: 400; color: rgba(29,29,31,0.6); line-height: 1.5; }

  /* ── Legal list ── */
  .tc-legal-eyebrow { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(0,0,0,0.35); margin-bottom: 1.1rem; }
  .tc-legal-list { display: flex; flex-direction: column; gap: 0.85rem; }
  .tc-legal-item { display: flex; align-items: flex-start; gap: 0.65rem; }
  .tc-legal-dot { width: 5px; height: 5px; border-radius: 50%; background: #f38200; margin-top: 0.5rem; flex-shrink: 0; }
  .tc-legal-item p { font-size: 0.88rem; line-height: 1.6; color: rgba(29,29,31,0.6); font-weight: 400; }

  /* ── Dark CTA card ── */
  .tc-dark {
    position: relative; border-radius: 40px; background: #1d1d1f; color: #fff; overflow: hidden;
    padding: clamp(2.2rem,5vw,3.6rem);
  }
  .tc-dark-blob-a { position: absolute; width: 460px; height: 460px; border-radius: 50%; top: -140px; right: -140px; background: rgba(255, 149, 0, 0.16); filter: blur(90px); pointer-events: none; }
  .tc-dark-blob-b { position: absolute; width: 360px; height: 360px; border-radius: 50%; bottom: -120px; left: -120px; background: rgba(80,120,255,0.14); filter: blur(80px); pointer-events: none; }
  .tc-dark-grid { position: relative; z-index: 1; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 2.5rem; align-items: center; }
  @media (max-width: 860px) { .tc-dark-grid { grid-template-columns: 1fr; } }
  .tc-dark-title { font-size: clamp(1.9rem,3.6vw,2.9rem); font-weight: 500; letter-spacing: -0.02em; margin-bottom: 1.1rem; }
  .tc-dark-lede { font-size: clamp(0.95rem,1.3vw,1.05rem); color: rgba(255,255,255,0.56); line-height: 1.7; margin-bottom: 1.8rem; font-weight: 400; }
  .tc-dark-phone {
    display: inline-flex; align-items: center; gap: 0.9rem; padding: 0.9rem 1.3rem; border-radius: 18px;
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(6px); margin-bottom: 1.4rem;
  }
  .tc-dark-phone-icon { width: 42px; height: 42px; border-radius: 12px; background: linear-gradient(135deg,#ffd200,#d2540a); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .tc-dark-phone .label { font-size: 0.66rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 0.15rem; }
  .tc-dark-phone a { font-size: 1.35rem; font-weight: 700; color: #fff; text-decoration: none; }
  .tc-dark-checks { display: flex; flex-direction: column; gap: 0.6rem; }
  .tc-dark-checks li { list-style: none; display: flex; align-items: center; gap: 0.6rem; font-size: 0.9rem; color: rgba(255,255,255,0.72); font-weight: 400; }
  .tc-dark-checks .c { color: #4ade80; }

  .tc-loc-card { border-radius: 26px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(8px); padding: 2.1rem 1.8rem; text-align: center; max-width: 380px; margin-left: auto; margin-right: auto; }
  .tc-loc-icon { width: 52px; height: 52px; border-radius: 16px; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.1rem; color: #ff9c6b; }
  .tc-loc-card h4 { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.7rem; }
  .tc-loc-card p { font-size: 0.86rem; color: rgba(255,255,255,0.5); line-height: 1.6; margin-bottom: 1.5rem; }

  @media (max-width: 600px) {
    .tc-founder-row { grid-template-columns: 1fr; }
    .tc-founder-photo { max-width: 220px; margin: 0 auto; }
  }
`;

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
interface Developer {
  id: string;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  skills: string[];
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  order: number;
}

export function TrustContent() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveDevelopers = async () => {
      try {
        const q = query(collection(db, "developers"), where("status", "==", "active"));
        const snapshot = await getDocs(q);
        const activeDevs: Developer[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          activeDevs.push({
            id: docSnap.id,
            name: data.name || "",
            role: data.role || "",
            description: data.description || "",
            imageUrl: data.imageUrl || "",
            skills: data.skills || [],
            linkedinUrl: data.linkedinUrl || "",
            githubUrl: data.githubUrl || "",
            portfolioUrl: data.portfolioUrl || "",
            order: typeof data.order === "number" ? data.order : 0,
          });
        });
        activeDevs.sort((a, b) => a.order - b.order);
        setDevelopers(activeDevs);
      } catch (err) {
        console.error("Error fetching active developers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchActiveDevelopers();
  }, []);

  return (
    <div className="tc-root">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="tc-noise" aria-hidden="true" />
      <div className="tc-blob a" aria-hidden="true" />
      <div className="tc-blob b" aria-hidden="true" />

      <div className="tc-shell">

        {/* ── Header ── */}
        <div className="tc-header">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="tc-badge"><span className="tc-badge-dot" />Verified &amp; Trusted</span>
          </motion.div>
          <motion.h1 className="tc-h1" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.08 }}>
            Trust &amp; <span className="tc-accent">Transparency</span>
          </motion.h1>
          <motion.p className="tc-lede" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.14 }}>
            We believe in honest communication, clear processes, and building long-term trust with every client. No false promises, just real work.
          </motion.p>
        </div>

        {/* ── Founder + Company details ── */}
        <div className="tc-grid-main">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="tc-card">
              <div className="tc-card-pad">
                <div className="tc-card-title"><span className="tc-icon-chip">💼</span>About Founder</div>
                <div className="tc-founder-row">
                  <div>
                    <p className="tc-quote">&quot;Sabka Saathi Digital Services was started with a simple vision — to make digital growth accessible for every business, especially those in small towns and local markets.&quot;</p>
                    <p className="tc-body"><strong>Ashish Kumar</strong> recognized that many businesses &amp; startups have the potential to grow but lack the right digital support. This platform was built to bridge that gap and provide simple, effective, and practical digital solutions.</p>
                    <p className="tc-body">The goal is clear — to empower thousands of businesses to build a strong online presence and unlock new growth opportunities.</p>
                  </div>
                  <div>
                    <div className="tc-founder-photo">
                      <Image src="/team/ashish-kumar.webp" alt="Ashish Kumar - Founder" fill className="object-cover" />
                    </div>
                    <div className="tc-founder-name">Ashish Kumar</div>
                    <div className="tc-founder-role">Founder &amp; CEO</div>
                  </div>
                </div>
                <div className="tc-cta-strip">
                  <span>Want to take your business online?</span>
                  <Link href="/#contact"><span className="tc-btn primary">Connect with us today</span></Link>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
            <div className="tc-card" style={{ height: "100%" }}>
              <div className="tc-card-pad">
                <div className="tc-card-title"><span className="tc-icon-chip">🏢</span>Company Details</div>
                <div className="tc-dl">
                  <div className="tc-dl-row"><span className="tc-dl-key">Business Name</span><span className="tc-dl-val">Sabka Saathi Digital Services</span></div>
                  <div className="tc-dl-row"><span className="tc-dl-key">Founder</span><span className="tc-dl-val">Ashish Kumar</span></div>
                  <div className="tc-dl-row"><span className="tc-dl-key">Type</span><span className="tc-dl-val">Proprietorship</span></div>
                  <div className="tc-dl-row"><span className="tc-dl-key">Location</span><span className="tc-dl-val">India</span></div>
                  <div className="tc-dl-row"><span className="tc-dl-key">Contact</span><span className="tc-dl-val"><a href="tel:9431673018">9431673018</a></span></div>
                  <div className="tc-dl-row"><span className="tc-dl-key">Email</span><span className="tc-dl-val"><a href="mailto:helpsabkasaathi@gmail.com">helpsabkasaathi@gmail.com</a></span></div>
                </div>
                <div className="tc-verify-row"><span className="tc-verify-check">✓</span><span>Verified Business Presence</span></div>
                <div className="tc-verify-row"><span className="tc-verify-check">✓</span><span>Professional Service Provider</span></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Social Proof + Commitment ── */}
        <div className="tc-grid-two">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="tc-card" style={{ height: "100%" }}>
              <div className="tc-card-pad">
                <div className="tc-card-title"><span className="tc-icon-chip">📊</span>Social Proof &amp; Results</div>
                <div className="tc-stat-grid">
                  <div className="tc-stat-block"><div className="tc-stat-num">100+</div><div className="tc-stat-label">Businesses Served</div></div>
                  <div className="tc-stat-block"><div className="tc-stat-num">50+</div><div className="tc-stat-label">Digital Projects</div></div>
                  <div className="tc-stat-block wide"><div className="tc-stat-num sm">Pan-India</div><div className="tc-stat-label">Growing Client Network</div></div>
                </div>
                <p className="tc-body" style={{ marginBottom: 0 }}>We focus on consistent results and long-term client relationships to ensure growth.</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="tc-card" style={{ height: "100%" }}>
              <div className="tc-card-pad">
                <div className="tc-card-title"><span className="tc-icon-chip">🚫</span>Service Commitment</div>
                <p className="tc-quote" style={{ fontSize: "1.02rem" }}>&quot;We believe in real work, not false promises.&quot;</p>
                <div className="tc-commit-list">
                  <div className="tc-commit-item"><span className="tc-mark no">×</span><p>We do not make unrealistic guarantees.</p></div>
                  <div className="tc-commit-item"><span className="tc-mark yes">✓</span><p>Results may vary depending on business type, market conditions, and implementation.</p></div>
                  <div className="tc-commit-item"><span className="tc-mark yes">✓</span><p>Our focus is on strategy, consistency, and long-term growth.</p></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Developers ── */}
        <div style={{ marginBottom: "1.6rem" }}>
          <div className="tc-dev-head">
            <motion.span className="tc-badge" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              Our Technical Workforce
            </motion.span>
            <h2 className="tc-dev-title">Meet Our Developers</h2>
            <p className="tc-dev-sub">The people behind our digital products, websites, apps, and business solutions.</p>
          </div>

          {loading ? (
            <div className="tc-loading"><Loader2 className="w-7 h-7 animate-spin" /></div>
          ) : developers.length === 0 ? (
            <div className="tc-card tc-empty-card"><p>Our team profiles will be updated soon.</p></div>
          ) : (
            <div className="tc-dev-grid">
              {developers.map((dev, index) => (
                <motion.div key={dev.id} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }}>
                  <div className="tc-dev-card">
                    <div className="tc-dev-photo">
                      {dev.imageUrl ? (
                        <Image src={dev.imageUrl} alt={dev.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 25vw" loading="lazy" />
                      ) : (
                        <div className="tc-dev-photo-empty">No Image</div>
                      )}
                    </div>
                    <div className="tc-dev-body">
                      <div className="tc-dev-name">{dev.name}</div>
                      <div className="tc-dev-role">{dev.role}</div>
                      <p className="tc-dev-desc">{dev.description}</p>
                      {dev.skills?.length > 0 && (
                        <div className="tc-dev-skills">
                          {dev.skills.slice(0, 3).map((skill, i) => <span key={i} className="tc-chip">{skill}</span>)}
                        </div>
                      )}
                      {(dev.linkedinUrl || dev.githubUrl || dev.portfolioUrl) && (
                        <div className="tc-dev-socials">
                          {dev.linkedinUrl && <a href={dev.linkedinUrl} target="_blank" rel="noopener noreferrer" className="tc-social-btn"><LinkedinIcon className="w-3.5 h-3.5" /></a>}
                          {dev.githubUrl && <a href={dev.githubUrl} target="_blank" rel="noopener noreferrer" className="tc-social-btn"><GithubIcon className="w-3.5 h-3.5" /></a>}
                          {dev.portfolioUrl && <a href={dev.portfolioUrl} target="_blank" rel="noopener noreferrer" className="tc-social-btn"><Globe className="w-3.5 h-3.5" /></a>}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* ── Notice ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="tc-notice">
            <div className="tc-notice-icon"><AlertTriangle className="w-5 h-5" /></div>
            <div>
              <h4>Important Notice</h4>
              <p>Beware of fake agencies. Sabka Saathi Digital Services is a verified and trusted service provider focused on delivering genuine digital solutions.</p>
            </div>
          </div>
        </motion.div>

        {/* ── Legal ── */}
        <div className="tc-grid-two">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="tc-card">
              <div className="tc-card-pad">
                <div className="tc-card-title"><span className="tc-icon-chip">📜</span>Privacy Policy</div>
                <div className="tc-legal-eyebrow">We respect your privacy</div>
                <div className="tc-legal-list">
                  <div className="tc-legal-item"><span className="tc-legal-dot" /><p>Personal details like name, phone number, and email are used only for communication and service purposes.</p></div>
                  <div className="tc-legal-item"><span className="tc-legal-dot" /><p>We do not sell, rent, or share your data with third parties.</p></div>
                  <div className="tc-legal-item"><span className="tc-legal-dot" /><p>All information shared with us is handled securely.</p></div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="tc-card">
              <div className="tc-card-pad">
                <div className="tc-card-title"><span className="tc-icon-chip">📄</span>Terms &amp; Conditions</div>
                <div className="tc-legal-eyebrow">Clearly defined scope</div>
                <div className="tc-legal-list">
                  <div className="tc-legal-item"><span className="tc-legal-dot" /><p>All services are provided based on a clearly defined scope of work.</p></div>
                  <div className="tc-legal-item"><span className="tc-legal-dot" /><p>Project timelines may vary depending on requirements and communication.</p></div>
                  <div className="tc-legal-item"><span className="tc-legal-dot" /><p>Any additional requests beyond the agreed scope will be handled separately.</p></div>
                  <div className="tc-legal-item"><span className="tc-legal-dot" /><p>We ensure professional standards in every project we deliver.</p></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.75 }}>
          <div className="tc-dark">
            <div className="tc-dark-blob-a" aria-hidden="true" />
            <div className="tc-dark-blob-b" aria-hidden="true" />
            <div className="tc-dark-grid">
              <div>
                <h2 className="tc-dark-title">Support &amp; Presence</h2>
                <p className="tc-dark-lede">We operate across India and serve clients remotely with smooth communication and delivery. Have questions or want to start your project?</p>
                <div className="tc-dark-phone">
                  <div className="tc-dark-phone-icon"><Phone className="w-5 h-5 text-white" /></div>
                  <div>
                    <div className="label">Call / WhatsApp</div>
                    <a href="tel:9431673018">9431673018</a>
                  </div>
                </div>
                <ul className="tc-dark-checks">
                  <li><span className="c">✓</span> Quick Response</li>
                  <li><span className="c">✓</span> Professional Guidance</li>
                </ul>
              </div>
              <div className="tc-loc-card">
                <div className="tc-loc-icon"><MapPin className="w-6 h-6" /></div>
                <h4>Location</h4>
                <p>Location details available upon request for detailed project discussions.</p>
                <Link href="/#contact"><span className="tc-btn light" style={{ width: "100%", padding: "0.95rem 1.5rem" }}>Talk to an Expert →</span></Link>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}