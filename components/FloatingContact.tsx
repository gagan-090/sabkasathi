"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const WHATSAPP_NUMBER = "919431673018";
const CALL_NUMBER = "+919431673018";

const styles = `
  /* Bottom 6rem, not 1.6rem: <ChatWidget /> owns the actual corner (54px tall,
     1.5rem from the edge) and this stack sits above it. If the chat widget is
     ever moved to the left side, this can go back to 1.6rem / 1.1rem. */
  .fc-wrap {
    position: fixed; bottom: 6rem; right: 1.6rem; z-index: 9999;
    display: flex; flex-direction: column; align-items: flex-end; gap: 0.85rem;
    pointer-events: none;
  }

  /* ── Liquid glass pill button ───────────────────────────── */
  .fc-btn {
    position: relative; pointer-events: auto;
    display: flex; align-items: center; justify-content: center;
    width: 56px; height: 56px; border-radius: 18px;
    text-decoration: none; overflow: hidden;
    background: rgba(255,255,255,0.55);
    backdrop-filter: blur(18px) saturate(180%);
    -webkit-backdrop-filter: blur(18px) saturate(180%);
    box-shadow:
      0 8px 28px rgba(0,0,0,0.14),
      0 1px 3px rgba(0,0,0,0.08),
      inset 0 1px 0 rgba(255,255,255,0.65),
      inset 0 -1px 6px rgba(0,0,0,0.04);
  }

  /* gradient hairline border, same recipe as hero badge/buttons */
  .fc-btn::before {
    content: ''; position: absolute; inset: -1px; border-radius: 19px; padding: 1.4px;
    pointer-events: none;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    transition: background 0.4s ease;
  }

  /* soft glow puddle under the icon — the "liquid" part */
  .fc-btn::after {
    content: ''; position: absolute; left: 50%; top: 50%; z-index: 0;
    width: 120%; height: 120%;
    transform: translate(-50%,-50%);
    border-radius: 50%;
    opacity: 0.55; filter: blur(10px);
    transition: opacity 0.4s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1);
  }

  .fc-icon { position: relative; z-index: 2; width: 24px; height: 24px; }

  .fc-btn:hover { }
  .fc-btn:active .fc-icon { transform: scale(0.92); }

  /* WhatsApp variant */
  .fc-btn.wa::before {
    background: linear-gradient(140deg,
      rgba(255,255,255,0.85) 0%,
      rgba(110,225,150,0.55) 30%,
      rgba(37,211,102,0.20) 55%,
      rgba(37,211,102,0.65) 80%,
      rgba(255,255,255,0.70) 100%);
  }
  .fc-btn.wa::after { background: radial-gradient(circle, rgba(37,211,102,0.34) 0%, transparent 70%); }
  .fc-btn.wa .fc-icon { color: #1f9e52; }
  .fc-btn.wa:hover::after { opacity: 0.85; transform: translate(-50%,-50%) scale(1.12); }

  /* Call variant — matches the orange/coral hero gradient */
  .fc-btn.call::before {
    background: linear-gradient(140deg,
      rgba(255,255,255,0.85) 0%,
      rgba(255, 210, 0, 0.55) 30%,
      rgba(224, 102, 0, 0.20) 55%,
      rgba(224, 102, 0, 0.65) 80%,
      rgba(255,255,255,0.70) 100%);
  }
  .fc-btn.call::after { background: radial-gradient(circle, rgba(255, 149, 0, 0.34) 0%, transparent 70%); }
  .fc-btn.call .fc-icon { color: #d9472f; }
  .fc-btn.call:hover::after { opacity: 0.85; transform: translate(-50%,-50%) scale(1.12); }

  /* gentle ambient pulse ring, WhatsApp only */
  .fc-pulse {
    position: absolute; inset: 0; border-radius: 18px; z-index: 0;
    background: rgba(37,211,102,0.30);
    animation: fcPulse 2.6s cubic-bezier(0.4,0,0.2,1) infinite;
  }
  @keyframes fcPulse {
    0%   { transform: scale(1);   opacity: 0.55; }
    70%  { transform: scale(1.55); opacity: 0; }
    100% { transform: scale(1.55); opacity: 0; }
  }

  /* ── tooltip ────────────────────────────────────────────── */
  .fc-tip {
    position: absolute; right: calc(100% + 0.7rem); top: 50%;
    transform: translateY(-50%) translateX(4px);
    background: rgba(29,29,31,0.92);
    backdrop-filter: blur(8px);
    color: #fff;
    font-family: var(--font-dm-sans), sans-serif; font-weight: 500; font-size: 0.74rem;
    letter-spacing: 0.01em; white-space: nowrap;
    padding: 0.42rem 0.8rem; border-radius: 9px;
    opacity: 0; pointer-events: none;
    transition: opacity 0.25s ease, transform 0.25s ease;
  }
  .fc-btn:hover .fc-tip { opacity: 1; transform: translateY(-50%) translateX(0); }

  @media (max-width: 600px) {
    .fc-wrap { bottom: 5.2rem; right: 1.1rem; gap: 0.7rem; }
    .fc-btn { width: 50px; height: 50px; border-radius: 16px; }
    .fc-icon { width: 21px; height: 21px; }
    .fc-tip { display: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .fc-pulse { animation: none; display: none; }
  }
`;

export function FloatingContact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const buttons = [
    {
      id: "whatsapp",
      variant: "wa",
      label: "WhatsApp",
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=Hello,%20Can%20I%20get%20more%20info%20on%20this?`,
      external: true,
      pulse: true,
      icon: (
        <svg viewBox="0 0 24 24" className="fc-icon" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.993c-.001 5.45-4.436 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      id: "call",
      variant: "call",
      label: "Call Us",
      href: `tel:${CALL_NUMBER}`,
      external: false,
      pulse: false,
      icon: (
        <svg viewBox="0 0 24 24" className="fc-icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="fc-wrap">
        <AnimatePresence>
          {isVisible &&
            buttons.map((btn, i) => (
              <motion.a
                key={btn.id}
                href={btn.href}
                target={btn.external ? "_blank" : undefined}
                rel={btn.external ? "noopener noreferrer" : undefined}
                aria-label={btn.label}
                className={`fc-btn ${btn.variant}`}
                initial={{ opacity: 0, scale: 0.4, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.4, y: 24 }}
                transition={{ type: "spring", stiffness: 320, damping: 22, delay: i * 0.08 }}
                whileHover={{ y: -3, scale: 1.06 }}
                whileTap={{ scale: 0.92 }}
              >
                {btn.pulse && <span className="fc-pulse" aria-hidden="true" />}
                {btn.icon}
                <span className="fc-tip">{btn.label}</span>
              </motion.a>
            ))}
        </AnimatePresence>
      </div>
    </>
  );
}