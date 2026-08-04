"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { RoyalFooter } from "@/components/royal/RoyalFooter";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { Button } from "@/components/ui/LiquidButton";

const styles = `

  .nf-root { font-family: var(--font-dm-sans), sans-serif; background: #f2f2f4; }

  .nf-blob {
    position: absolute; z-index: 0; pointer-events: none; filter: blur(70px);
    background: linear-gradient(135deg, rgba(255, 210, 0, 0.22), rgba(224, 102, 0, 0.16));
    animation: nfMorph 18s ease-in-out infinite;
  }
  .nf-blob-a { top: 6%; right: -8%; width: 38vw; height: 38vw; max-width: 520px; max-height: 520px; }
  .nf-blob-b {
    bottom: -4%; left: -10%; width: 30vw; height: 30vw; max-width: 420px; max-height: 420px;
    background: linear-gradient(135deg, rgba(224, 102, 0, 0.14), rgba(255, 210, 0, 0.18));
    animation-duration: 22s;
  }
  @keyframes nfMorph {
    0%, 100% { border-radius: 42% 58% 65% 35% / 45% 40% 60% 55%; transform: scale(1) rotate(0deg); }
    50%      { border-radius: 58% 42% 38% 62% / 60% 55% 45% 40%; transform: scale(1.06) rotate(8deg); }
  }
  @media (prefers-reduced-motion: reduce) { .nf-blob { animation: none; } }

  .nf-icon-ring {
    border: 1.5px solid transparent;
    background:
      radial-gradient(circle at 30% 25%, rgba(255,255,255,0.9), rgba(255,255,255,0.55)) padding-box,
      linear-gradient(135deg, #ffd200, #d2540a) border-box;
  }

  .nf-digits {
    font-family: var(--font-dm-sans), sans-serif; font-weight: 600;
    letter-spacing: -0.045em; line-height: 0.95;
    background: linear-gradient(135deg, #1d1d1f 0%, #1d1d1f 55%, #d2540a 130%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .nf-eyebrow {
    display: inline-flex; align-items: center; gap: 0.5rem;
    border-radius: 999px; padding: 0.4rem 1.05rem 0.4rem 0.8rem;
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(224, 102, 0, 0.16);
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
    font-weight: 500; font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(29,29,31,0.6);
  }
  .nf-eyebrow-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #f38200; box-shadow: 0 0 8px rgba(255, 149, 0, 0.7);
  }

  .nf-card {
    background: rgba(255,255,255,0.62);
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.7);
    transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease, background 0.4s ease;
  }
  .nf-card-grid:hover .nf-card { background: rgba(255,255,255,0.85); }
  .nf-card:hover { transform: translateY(-3px); box-shadow: 0 10px 26px rgba(0,0,0,0.07); }
  .nf-card svg { color: #d2540a; }
  .nf-card-label {
    font-family: var(--font-dm-sans), sans-serif; font-weight: 500; font-size: 0.62rem;
    letter-spacing: 0.12em; text-transform: uppercase; color: rgba(29,29,31,0.42);
  }
`;

export default function NotFound() {
  return (
    <div className="nf-root flex min-h-screen flex-col">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <InteractiveBackground />
      <Navbar />

      <main className="flex-1 flex items-center justify-center pt-32 pb-24 relative z-10 px-4 overflow-hidden">
        <div className="nf-blob nf-blob-a" aria-hidden="true" />
        <div className="nf-blob nf-blob-b" aria-hidden="true" />

        <div className="max-w-xl w-full text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-10"
          >
            

            <div className="nf-eyebrow mb-6">
              <span className="nf-eyebrow-dot" />
              Error 404
            </div>

            <h1 className="nf-digits text-7xl md:text-9xl mb-6">404</h1>
            <h2 className="text-xl md:text-2xl font-semibold text-[#1d1d1f] mb-5 tracking-tight">
              Page not found
            </h2>
            <p className="text-base text-[rgba(29,29,31,0.52)] mb-10 leading-relaxed max-w-md mx-auto">
              The page you&rsquo;re looking for might have been removed, renamed,
              or is temporarily unavailable.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/">
                <Button size="lg" className="rounded-2xl px-10 py-6 text-base font-semibold shadow-xl shadow-orange-600/20">
                  Return home
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1.5 inline-block">
                    <path d="M3.5 8H12.5M12.5 8L9 4.5M12.5 8L9 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" className="rounded-2xl px-10 py-6 text-base font-semibold border border-slate-200">
                  Contact support
                </Button>
              </Link>
            </div>
          </motion.div>

          <div className="nf-card-grid grid grid-cols-2 gap-4 mt-16 max-w-md mx-auto">
            <div className="nf-card p-5 rounded-2xl text-left">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mb-3">
                <path d="M4 21V9L12 3L20 9V21" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M9 21V13H15V21" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
              <span className="nf-card-label block">Path not found</span>
            </div>
            <div className="nf-card p-5 rounded-2xl text-left">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mb-3">
                <path d="M9.5 14.5L4 20M4 20H8M4 20V16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.5 9.5L20 4M20 4H16M20 4V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="nf-card-label block">Broken link</span>
            </div>
          </div>
        </div>
      </main>

      <RoyalFooter />
    </div>
  );
}