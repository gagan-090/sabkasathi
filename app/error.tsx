"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { Button, ButtonLink } from "@/components/ui/LiquidButton";

const styles = `

  .er-root { font-family: var(--font-dm-sans), sans-serif; background: #f2f2f4; }

  .er-blob {
    position: absolute; z-index: 0; pointer-events: none; filter: blur(70px);
    background: linear-gradient(135deg, rgba(224, 102, 0, 0.20), rgba(255, 210, 0, 0.14));
    animation: erMorph 18s ease-in-out infinite;
  }
  .er-blob-a { top: 4%; left: -8%; width: 38vw; height: 38vw; max-width: 520px; max-height: 520px; }
  .er-blob-b {
    bottom: -6%; right: -10%; width: 30vw; height: 30vw; max-width: 420px; max-height: 420px;
    background: linear-gradient(135deg, rgba(255, 210, 0, 0.16), rgba(224, 102, 0, 0.14));
    animation-duration: 22s;
  }
  @keyframes erMorph {
    0%, 100% { border-radius: 42% 58% 65% 35% / 45% 40% 60% 55%; transform: scale(1) rotate(0deg); }
    50%      { border-radius: 58% 42% 38% 62% / 60% 55% 45% 40%; transform: scale(1.06) rotate(8deg); }
  }
  @media (prefers-reduced-motion: reduce) { .er-blob { animation: none; } }

  .er-icon-ring {
    border: 1.5px solid transparent;
    background:
      radial-gradient(circle at 30% 25%, rgba(255,255,255,0.92), rgba(255,255,255,0.55)) padding-box,
      linear-gradient(135deg, #d2540a, #ffd200) border-box;
  }

  .er-eyebrow {
    display: inline-flex; align-items: center; gap: 0.5rem;
    border-radius: 999px; padding: 0.4rem 1.05rem 0.4rem 0.8rem;
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(224, 102, 0, 0.16);
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
    font-weight: 500; font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(29,29,31,0.6);
  }
  .er-eyebrow-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #d2540a; box-shadow: 0 0 8px rgba(224, 102, 0, 0.7);
    animation: erDotPulse 2.2s ease-in-out infinite;
  }
  @keyframes erDotPulse {
    0%,100% { box-shadow: 0 0 6px rgba(224, 102, 0, .7), 0 0 0 0 rgba(224, 102, 0, .3); }
    50%     { box-shadow: 0 0 12px rgba(224, 102, 0, .9), 0 0 0 4px rgba(224, 102, 0, 0); }
  }

  .er-em {
    font-style: normal;
    background: linear-gradient(135deg, #d2540a 0%, #ffd200 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .er-debug {
    background: rgba(255,255,255,0.58);
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.7);
  }
  .er-debug-label { color: rgba(29,29,31,0.46); }
  .er-debug-id { color: rgba(29,29,31,0.6); }
`;

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Critical Runtime Error:", error);
  }, [error]);

  return (
    <div className="er-root flex min-h-screen flex-col">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <InteractiveBackground />
      <Navbar />

      <main className="flex-1 flex items-center justify-center pt-32 pb-24 relative z-10 px-4 overflow-hidden">
        <div className="er-blob er-blob-a" aria-hidden="true" />
        <div className="er-blob er-blob-b" aria-hidden="true" />

        <div className="max-w-xl w-full text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-10"
          >
            <div className="er-icon-ring inline-flex items-center justify-center w-24 h-24 rounded-full shadow-[0_8px_30px_rgba(232,68,90,0.14)] mb-8 mx-auto">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3.5L21.5 19.5H2.5L12 3.5Z"
                  stroke="url(#er-grad)"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path d="M12 9.5V13.5" stroke="url(#er-grad)" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="12" cy="16.4" r="1" fill="#d2540a" />
                <defs>
                  <linearGradient id="er-grad" x1="2.5" y1="3.5" x2="21.5" y2="19.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#d2540a" />
                    <stop offset="1" stopColor="#ffd200" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="er-eyebrow mb-6">
              <span className="er-eyebrow-dot" />
              Runtime error
            </div>

            <h1 className="text-3xl md:text-5xl font-semibold text-[#1d1d1f] mb-6 tracking-tight">
              Something went <em className="er-em">wrong</em>
            </h1>
            <p className="text-base text-[rgba(29,29,31,0.52)] mb-10 leading-relaxed max-w-md mx-auto">
              A temporary issue prevented us from loading the requested page.
              Our engineers have been notified.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button onClick={() => reset()} variant="dark" size="lg" className="rounded-2xl">
                Try again
              </Button>
              <ButtonLink href="/" variant="secondary" size="lg" className="rounded-2xl">
                Back to home
              </ButtonLink>
            </div>
          </motion.div>

          <div className="er-debug mt-12 p-5 rounded-2xl text-left font-mono text-[10px] overflow-hidden">
            <div className="er-debug-label flex items-center gap-2 mb-2 font-semibold uppercase tracking-widest text-[8px]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
              Debug ID
            </div>
            <span className="er-debug-id">{error.digest || "ERR_RUNTIME_FATAL"}</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}