"use client";

import { motion } from "framer-motion";

const styles = `

  .ld-root { font-family: var(--font-dm-sans), sans-serif; background: #fbfbfc; }

  .ld-word {
    color: #1d1d1f; letter-spacing: -0.02em;
  }
  .ld-word em {
    font-style: normal;
    background: linear-gradient(135deg, #ffd200 0%, #d2540a 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  /* Apple-style indeterminate spinner: 12 fading ticks */
  .ld-spinner { width: 28px; height: 28px; position: relative; }
  .ld-tick {
    position: absolute; top: 0; left: 50%; width: 2px; height: 8px;
    margin-left: -1px; border-radius: 1px;
    background: rgba(29,29,31,0.5);
    transform-origin: 1px 14px;
    animation: ldFade 1.1s linear infinite;
  }
  @keyframes ldFade { 0% { opacity: 1; } 100% { opacity: 0.12; } }
`;

const TICKS = Array.from({ length: 12 });

export default function Loading() {
  return (
    <div className="ld-root fixed inset-0 z-[100] flex flex-col items-center justify-center">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="ld-spinner mb-7" aria-hidden="true">
        {TICKS.map((_, i) => (
          <span
            key={i}
            className="ld-tick"
            style={{
              transform: `rotate(${i * 30}deg)`,
              animationDelay: `${-(1.1 - (i * 1.1) / 12)}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="ld-word text-[15px] font-medium"
      >
        Sabka <em>Saathi</em>
      </motion.div>
    </div>
  );
}