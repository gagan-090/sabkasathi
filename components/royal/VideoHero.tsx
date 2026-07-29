"use client";

/* ─────────────────────────────────────────────────────────────────────────
   The video hero.

   The clip is a 10s 720p h264 loop at ~385kbps (≈480KB), so it is cheap
   enough to autoplay without gating on connection type. Two guards keep it
   honest anyway:

   • It pauses whenever it scrolls out of view, so reading the rest of the
     page costs no decode work.
   • Under `prefers-reduced-motion` it never plays at all — the poster frame
     stands in, and the poster is what paints for LCP either way.
   ───────────────────────────────────────────────────────────────────────── */

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Counter, EASE, Magnetic } from "./motion";
import { FACTS, HEADLINE_LINES } from "./data";

export function VideoHero() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  /* Scroll-linked depth: the video drifts and dims slightly while the copy
     lifts away faster, so the two layers separate as you scroll off. */
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  /* Play only while visible. A background video decoding behind three
     screenfuls of content is the kind of thing that quietly drains a phone. */
  useEffect(() => {
    const video = videoRef.current;
    const root = rootRef.current;
    if (!video || !root) return;

    if (reduce) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Autoplay can still be refused (low-power mode); the poster covers it.
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [reduce]);

  return (
    <header className="vh" ref={rootRef}>
      {/* ── layer 1: the footage ── */}
      <motion.div className="vh-media" style={reduce ? undefined : { y: videoY, scale: videoScale }}>
        <video
          ref={videoRef}
          className="vh-video"
          poster="/images/hero-poster.jpg"
          muted
          loop
          playsInline
          autoPlay={!reduce}
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
        >
          <source src="/images/herobagourdveido.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* ── layer 2: scrims. Two of them: a warm brand wash for colour, and a
             bottom-weighted dark ramp that guarantees text contrast. ── */}
      <div className="vh-scrim" aria-hidden="true" />
      <div className="vh-scrim-warm" aria-hidden="true" />
      <div className="vh-grain" aria-hidden="true" />

      {/* ── layer 3: copy ── */}
      <motion.div
        className="vh-inner"
        style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <motion.span
          className="vh-badge"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
        >
          <span className="vh-badge-dot" />
          Operating from Bihar, India 🇮🇳 · Available Globally
        </motion.span>

        <h1 className="vh-title">
          {HEADLINE_LINES.map((line, li) => (
            <span className="vh-line" key={li}>
              {line.map((word) => (
                <span className="vh-word-mask" key={word.text}>
                  <motion.span
                    className="vh-word"
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ duration: 0.95, delay: word.delay, ease: EASE }}
                  >
                    {word.accent ? <em className="vh-accent">{word.text}</em> : word.text}
                  </motion.span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          className="vh-lead"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
        >
          We are a software studio building high-performance web platforms, mobile apps, and custom
          enterprise CRM automation for founders, retailers, and enterprises across India and around
          the world.
        </motion.p>

        <motion.div
          className="vh-cta"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.94, ease: EASE }}
        >
          <Magnetic>
            <a href="#contact" className="rh-btn rh-btn-primary">
              Start a project
              <Arrow />
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a href="#work" className="rh-btn rh-btn-glass">
              See the work
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          className="vh-facts"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 1.08, ease: EASE }}
        >
          {FACTS.map((fact) => (
            <div className="vh-fact" key={fact.label}>
              <span className="vh-fact-value">{fact.value}</span>
              <span className="vh-fact-label">{fact.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── layer 4: floating glass chips. Decorative, desktop only (hidden in
             CSS below the lg breakpoint so they never crowd a phone). ── */}
      <FloatingChip
        className="vh-chip vh-chip-a"
        delay={1.3}
        label="Uptime"
        value={<Counter to={99} suffix=".9%" />}
      />
      <FloatingChip className="vh-chip vh-chip-b" delay={1.45} label="Cities served" value={<Counter to={242} suffix="+" />} />
      <FloatingChip className="vh-chip vh-chip-c" delay={1.6} label="Response" value="< 2 hrs" />

      <motion.a
        href="#services"
        className="vh-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.7 }}
        aria-label="Scroll to services"
      >
        <span className="vh-scroll-track">
          <motion.span
            className="vh-scroll-dot"
            animate={reduce ? undefined : { y: [0, 16, 0] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        Scroll
      </motion.a>
    </header>
  );
}

function FloatingChip({
  className,
  delay,
  label,
  value,
}: {
  className: string;
  delay: number;
  label: string;
  value: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.86, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      aria-hidden="true"
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -9, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay }}
      >
        <span className="vh-chip-value">{value}</span>
        <span className="vh-chip-label">{label}</span>
      </motion.div>
    </motion.div>
  );
}

function Arrow() {
  return (
    <svg className="rh-btn-arrow" width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 8h9M8.5 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
