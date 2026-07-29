"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

/* ══════════════════════════════════════════════
   Ambient orbs — soft, slow-drifting radial glows
   in the same orange→red palette as Hero / PageHero
══════════════════════════════════════════════ */
const orbs = [
  { top: "4%",  left: "8%",  size: "26rem", delay: 0,   duration: 22, colorA: "rgba(255, 210, 0, 0.16)",  colorB: "rgba(224, 102, 0, 0.06)" },
  { top: "62%", left: "82%", size: "22rem", delay: 3,   duration: 26, colorA: "rgba(224, 102, 0, 0.14)",   colorB: "rgba(255, 210, 0, 0.05)" },
  { top: "78%", left: "6%",  size: "18rem", delay: 6,   duration: 24, colorA: "rgba(255, 149, 0, 0.12)",  colorB: "transparent" },
  { top: "20%", left: "70%", size: "16rem", delay: 1.5, duration: 28, colorA: "rgba(255, 210, 0, 0.12)",  colorB: "transparent" },
];

export function InteractiveBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const hasPointer = useRef(false);

  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 140 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 140 });

  useEffect(() => {
    const isMobile =
      window.matchMedia("(max-width: 768px)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    if (isMobile) return;

    const onMove = (event: MouseEvent) => {
      if (!hasPointer.current) {
        hasPointer.current = true;
        mouseX.jump(event.clientX);
        mouseY.jump(event.clientY);
      }
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const cursorGlowTransform = useMotionTemplate`translate3d(calc(${smoothX}px - 10rem), calc(${smoothY}px - 10rem), 0)`;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#f2f2f4]">
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes ibOrbDrift {
            0%   { transform: translate(0,0) scale(1); }
            33%  { transform: translate(2.5%, -3%) scale(1.06); }
            66%  { transform: translate(-2%, 2.5%) scale(0.96); }
            100% { transform: translate(0,0) scale(1); }
          }
          .ib-orb { position: absolute; border-radius: 9999px; filter: blur(40px); will-change: transform; animation-name: ibOrbDrift; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
          @media (prefers-reduced-motion: reduce) {
            .ib-orb { animation: none !important; }
          }
        `,
        }}
      />

      {/* Base canvas tone, matching Hero/PageHero exactly */}
      <div className="absolute inset-0 bg-[#f2f2f4]" />

      {/* Drifting ambient orbs */}
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="ib-orb"
          style={{
            top: orb.top,
            left: orb.left,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.colorA} 0%, ${orb.colorB} 60%, transparent 75%)`,
            animationDelay: `${orb.delay}s`,
            animationDuration: `${orb.duration}s`,
          }}
        />
      ))}

      {/* Cursor-following glow (desktop only) */}
      <motion.div
        aria-hidden
        className="absolute h-[20rem] w-[20rem] rounded-full blur-2xl"
        style={{
          transform: cursorGlowTransform,
          background:
            "radial-gradient(circle, rgba(255, 149, 0, 0.14) 0%, rgba(224, 102, 0, 0.06) 38%, transparent 70%)",
        }}
      />

      {/* Fine grain texture, identical formula to Hero/PageHero */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.02,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Gentle top/bottom vignette to keep content readable over the orbs */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(242,242,244,0.55) 0%, rgba(242,242,244,0) 22%, rgba(242,242,244,0) 78%, rgba(242,242,244,0.6) 100%)",
        }}
      />
    </div>
  );
}