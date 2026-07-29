"use client";

/* ─────────────────────────────────────────────────────────────────────────
   Two views of the same stack.

   `TechMarquee` — two glass rows scrolling in opposite directions. The
   scroll itself is a CSS keyframe rather than a JS loop, so it runs on the
   compositor and costs nothing on the main thread.

   `TechRing`   — a 3D cylinder you can grab and spin. Only the ring's single
   `rotateY` is animated; the faces are statically positioned around it, so
   spinning 14 logos is one transform per frame, not fourteen.
   ───────────────────────────────────────────────────────────────────────── */

import Image from "next/image";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { TECH_LOGOS, TECH_ROW_A, TECH_ROW_B, type TechLogo } from "./data";

/* ── marquee ──────────────────────────────────────────────────────────── */

export function TechMarquee() {
  return (
    <div className="tm" aria-label="Technologies we build with">
      <MarqueeRow items={TECH_ROW_A} direction="left" />
      <MarqueeRow items={TECH_ROW_B} direction="right" />
    </div>
  );
}

function MarqueeRow({ items, direction }: { items: TechLogo[]; direction: "left" | "right" }) {
  return (
    <div className="tm-row">
      {/* The set is rendered twice so the -50% keyframe wraps seamlessly. The
          duplicate is hidden from assistive tech to avoid a doubled reading. */}
      <div className={`tm-track tm-track-${direction}`}>
        {[0, 1].map((copy) => (
          <div className="tm-set" key={copy} aria-hidden={copy === 1}>
            {items.map((item) => (
              <TechChip item={item} key={`${copy}-${item.file}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function TechChip({ item }: { item: TechLogo }) {
  return (
    <div className="tm-chip">
      <span className="tm-chip-logo">
        <Image src={`/logos/${item.file}.svg`} alt="" width={26} height={26} aria-hidden="true" />
      </span>
      <span className="tm-chip-label">{item.label}</span>
    </div>
  );
}

/* ── 3D ring ──────────────────────────────────────────────────────────── */

/* Fourteen reads as a full ring without the faces overlapping at the front. */
const RING = TECH_LOGOS.filter((t) =>
  [
    "nextdotjs",
    "react",
    "typescript",
    "nodedotjs",
    "mongodb",
    "postgresql",
    "firebase",
    "flutter",
    "docker",
    "kubernetes",
    "python",
    "tailwindcss",
    "figma",
    "stripe",
  ].includes(t.file),
);

const STEP = 360 / RING.length;
/* Degrees per second when idle. Slow enough to read a label as it passes. */
const IDLE_SPEED = 9;

export function TechRing() {
  const rotation = useMotionValue(0);
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);

  const dragging = useRef(false);
  const lastX = useRef(0);

  useAnimationFrame((_, delta) => {
    if (reduce || paused || dragging.current) return;
    rotation.set(rotation.get() + (IDLE_SPEED * delta) / 1000);
  });

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    lastX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging.current) return;
      // 0.35 deg per px keeps a flick feeling proportional rather than twitchy.
      rotation.set(rotation.get() + (e.clientX - lastX.current) * 0.35);
      lastX.current = e.clientX;
    },
    [rotation],
  );

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }, []);

  return (
    <div
      className="tr-stage"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="group"
      aria-label="Rotating carousel of our core technologies"
    >
      <div className="tr-glow" aria-hidden="true" />
      <motion.div className="tr-ring" style={{ rotateY: rotation }}>
        {RING.map((item, i) => (
          <div
            className="tr-face"
            key={item.file}
            style={{ transform: `rotateY(${i * STEP}deg) translateZ(var(--tr-radius))` }}
          >
            <div className="tr-card">
              <Image
                src={`/logos/${item.file}.svg`}
                alt={item.label}
                width={38}
                height={38}
                className="tr-card-logo"
              />
              <span className="tr-card-label">{item.label}</span>
            </div>
          </div>
        ))}
      </motion.div>

      <p className="tr-hint">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 3.5 19 11l-6.2 1.9L10.6 19 5 3.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
        Drag to spin · hover to pause
      </p>
    </div>
  );
}
