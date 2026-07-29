"use client";

import { motion } from "framer-motion";

const styles = `

  .sh-section { font-family: var(--font-dm-sans), sans-serif; }

  .sh-panel {
    position: relative; overflow: hidden;
    background: rgba(255,255,255,0.55);
    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 24px 60px rgba(29,29,31,0.07);
  }
  .sh-panel::before {
    content: ''; position: absolute; inset: -1px; z-index: 0; border-radius: inherit; padding: 1px;
    background: linear-gradient(140deg,
      rgba(255,255,255,0.85) 0%, rgba(255, 210, 0, 0.34) 24%,
      rgba(224, 102, 0, 0.10) 50%, rgba(224, 102, 0, 0.30) 78%, rgba(255,255,255,0.7) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    pointer-events: none;
  }

  .sh-blob {
    position: absolute; z-index: 0; pointer-events: none; filter: blur(70px);
    background: linear-gradient(135deg, rgba(255, 210, 0, 0.22), rgba(224, 102, 0, 0.16));
    animation: shMorph 17s ease-in-out infinite;
  }
  .sh-blob-a { top: -16%; left: 10%; width: 50%; height: 70%; }
  .sh-blob-b {
    bottom: -20%; right: 6%; width: 36%; height: 60%;
    background: linear-gradient(135deg, rgba(224, 102, 0, 0.14), rgba(255, 210, 0, 0.18));
    animation-duration: 21s;
  }
  @keyframes shMorph {
    0%, 100% { border-radius: 42% 58% 65% 35% / 45% 40% 60% 55%; transform: scale(1) rotate(0deg); }
    50%      { border-radius: 58% 42% 38% 62% / 60% 55% 45% 40%; transform: scale(1.08) rotate(8deg); }
  }
  @media (prefers-reduced-motion: reduce) { .sh-blob { animation: none; } }

  .sh-eyebrow {
    position: relative;
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
    color: rgba(29,29,31,0.6);
  }
  .sh-eyebrow::before {
    content: ''; position: absolute; inset: 0; z-index: -1; border-radius: 999px; padding: 1px;
    background: linear-gradient(135deg,
      rgba(255,255,255,0.80) 0%, rgba(255, 149, 0, 0.45) 30%,
      rgba(224, 102, 0, 0.18) 55%, rgba(224, 102, 0, 0.50) 80%, rgba(255,255,255,0.70) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
  }
  .sh-eyebrow-dot {
    background: #f38200; box-shadow: 0 0 8px rgba(255, 149, 0, 0.7);
    animation: shDotPulse 2.4s ease-in-out infinite;
  }
  @keyframes shDotPulse {
    0%,100% { box-shadow: 0 0 6px rgba(255, 149, 0, .7), 0 0 0 0 rgba(255, 149, 0, .3); }
    50%     { box-shadow: 0 0 12px rgba(255, 149, 0, .9), 0 0 0 4px rgba(255, 149, 0, 0); }
  }

  .sh-title { color: #1d1d1f; letter-spacing: -0.03em; }
  .sh-title em {
    font-style: normal;
    background: linear-gradient(135deg, #ffd200 0%, #d2540a 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .sh-desc { color: rgba(29,29,31,0.52); }
`;

export function ServicesHero() {
  return (
    <section className="sh-section relative overflow-hidden pt-8 pb-4 md:pt-12 max-w-5xl mx-auto px-4 z-10">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="sh-panel relative rounded-[2rem] px-6 py-12 md:py-16 text-center">
        <div className="sh-blob sh-blob-a" aria-hidden="true" />
        <div className="sh-blob sh-blob-b" aria-hidden="true" />

        <div className="relative z-10 flex flex-col items-center gap-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="sh-eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-medium uppercase tracking-[0.18em]"
          >
            <span className="sh-eyebrow-dot w-1.5 h-1.5 rounded-full flex-shrink-0" />
            Capabilities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="sh-title text-3xl sm:text-5xl md:text-7xl font-semibold tracking-tight leading-tight"
          >
            Our <em>Expertise</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="sh-desc text-xs sm:text-sm md:text-lg leading-relaxed font-normal max-w-xl mx-auto px-2"
          >
            High-performance digital products built with modern stacks to drive real-world business outcomes.
          </motion.p>
        </div>
      </div>
    </section>
  );
}