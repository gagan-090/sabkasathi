"use client";

/* ─────────────────────────────────────────────────────────────────────────
   The home page's motion vocabulary.

   Three rules hold everywhere in this file, because they are what keeps a
   heavily animated page smooth:

   1. Only `transform` and `opacity` are ever animated. Both composite on the
      GPU, so no animation here can trigger layout or paint.
   2. Scroll reveals use `whileInView` with `once: true`. Nothing re-animates
      when you scroll back up, so the page gets cheaper the further you read.
   3. Pointer-driven effects (tilt, magnetism) bail out on coarse pointers.
      There is no hover on a phone, so that work would be pure cost.

   Every export also honours `useReducedMotion`, which framer-motion wires to
   the OS-level `prefers-reduced-motion` setting.
   ───────────────────────────────────────────────────────────────────────── */

import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/* One easing shared by everything, so the whole page decelerates identically. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Reveal ───────────────────────────────────────────────────────────────
   The workhorse: fades and lifts a block into place as it enters view. */

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait after the element enters view. */
  delay?: number;
  /** Travel distance in px. Direction is set by `from`. */
  distance?: number;
  from?: "bottom" | "top" | "left" | "right";
  duration?: number;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "section" | "article" | "li" | "span";
};

export function Reveal({
  children,
  delay = 0,
  distance = 26,
  from = "bottom",
  duration = 0.72,
  className,
  style,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  const offset =
    from === "bottom"
      ? { y: distance }
      : from === "top"
        ? { y: -distance }
        : from === "left"
          ? { x: -distance }
          : { x: distance };

  return (
    <Tag
      className={className}
      style={style}
      /* Marks this as starting hidden. The no-JS stylesheet in app/layout.tsx
         keys off it so the page is still readable if the bundle never runs. */
      data-reveal=""
      initial={reduce ? { opacity: 0 } : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -80px 0px" }}
      transition={{ duration: reduce ? 0.3 : duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/* ── Stagger ──────────────────────────────────────────────────────────────
   A parent that releases its children one after another. Children must be
   `StaggerItem`s (or any motion element using the `staggerItem` variants). */

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Stagger({
  children,
  className,
  gap = 0.08,
  delay = 0,
  style,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Seconds between each child. */
  gap?: number;
  delay?: number;
  style?: CSSProperties;
  /**
   * The element to render. Matters more than it looks: variant labels only
   * propagate through motion components, so a plain <ul> sitting between this
   * parent and its `StaggerItem` <li>s would swallow the "show" label and
   * leave every item stuck at opacity 0. Render the list itself as the
   * stagger parent instead.
   */
  as?: "div" | "ul" | "ol" | "section";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  /* The orchestration has to live in the parent's own `variants` — a bare
     `transition={{ staggerChildren }}` prop only schedules the parent's
     animation, and variant labels propagate reliably from a parent that
     actually declares them. Getting this wrong leaves children parked at
     opacity 0, so it is deliberately explicit. */
  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : gap,
        delayChildren: delay,
      },
    },
  };

  return (
    <Tag
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -60px 0px" }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  style,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "article" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      style={style}
      data-reveal=""
      variants={reduce ? { hidden: { opacity: 0 }, show: { opacity: 1 } } : staggerItem}
    >
      {children}
    </Tag>
  );
}

/* ── Counter ──────────────────────────────────────────────────────────────
   Counts up once, when scrolled into view.

   The final value is what renders on the server, so crawlers and no-JS
   visitors see "242+" rather than "0+". The client resets it to zero on mount
   and animates from there. */

export function Counter({
  to,
  prefix = "",
  suffix = "",
  duration = 1.9,
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const reduce = useReducedMotion();

  // Zero out before paint so the server-rendered final value never flashes.
  useEffect(() => {
    if (reduce || !ref.current) return;
    ref.current.textContent = `${prefix}0${suffix}`;
  }, [prefix, suffix, reduce]);

  useEffect(() => {
    if (!inView || reduce) return;
    // Written straight to the DOM rather than through state: a count-up ticks
    // every frame, and re-rendering React 100+ times for a label is waste.
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, duration, prefix, suffix, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {to}
      {suffix}
    </span>
  );
}

/* ── Magnetic ─────────────────────────────────────────────────────────────
   Pulls an element a few pixels toward the cursor while it is nearby. */

export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  /** Fraction of the cursor's offset the element travels. Keep well under 1. */
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.4 });

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      const box = el.getBoundingClientRect();
      x.set((e.clientX - (box.left + box.width / 2)) * strength);
      y.set((e.clientY - (box.top + box.height / 2)) * strength);
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength, x, y, reduce]);

  return (
    <motion.div ref={ref} className={className} style={{ x: sx, y: sy, display: "inline-flex" }}>
      {children}
    </motion.div>
  );
}

/* ── Tilt ─────────────────────────────────────────────────────────────────
   Card-scale 3D tilt toward the pointer, with a light sheen that tracks it. */

export function Tilt({
  children,
  className,
  max = 8,
  lift = 6,
  style,
}: {
  children: ReactNode;
  className?: string;
  /** Peak rotation in degrees at the card's corners. */
  max?: number;
  /**
   * Px the card rises on hover. Lives here rather than in CSS because this
   * element carries an inline `transform` from the tilt, and an inline
   * transform beats a `:hover` rule in a stylesheet — the two have to be
   * composed by the same system or one silently wins.
   */
  lift?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const spring = { stiffness: 220, damping: 20, mass: 0.5 };
  const srx = useSpring(rx, spring);
  const sry = useSpring(ry, spring);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      const box = el.getBoundingClientRect();
      const px = (e.clientX - box.left) / box.width - 0.5;
      const py = (e.clientY - box.top) / box.height - 0.5;
      rx.set(-py * max * 2);
      ry.set(px * max * 2);
      el.style.setProperty("--mx", `${((e.clientX - box.left) / box.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - box.top) / box.height) * 100}%`);
    };
    const onLeave = () => {
      rx.set(0);
      ry.set(0);
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [max, rx, ry, reduce]);

  return (
    <motion.div
      ref={ref}
      className={className}
      whileHover={reduce ? undefined : { y: -lift }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      style={{
        ...style,
        rotateX: srx,
        rotateY: sry,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── Parallax ─────────────────────────────────────────────────────────────
   Drifts a layer against the scroll direction across its own viewport pass. */

export function Parallax({
  children,
  distance = 60,
  className,
  style,
}: {
  children: ReactNode;
  /** Total px of travel across the whole scroll pass. */
  distance?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={className} style={style}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/* ── ScrollProgressLine ───────────────────────────────────────────────────
   Draws the process timeline's rail left-to-right as the section scrolls
   past. The measured element is the surrounding section rather than the rail
   itself, since a 1px-tall rail has no meaningful scroll range of its own. */

export function ScrollProgressLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 65%"],
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <motion.span style={{ scaleX: reduce ? 1 : scaleX, transformOrigin: "left" }} />
    </div>
  );
}

/* ── ScrollProgress ───────────────────────────────────────────────────────
   The hairline across the very top of the window that fills as you read.
   Spring-smoothed so it glides past the raw scroll value instead of tracking
   it exactly — the small lag is what makes it feel like momentum. */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.35 });

  /* Not gated on `useReducedMotion` even though everything else here is.
     That hook reads `matchMedia` during the first client render but not on
     the server, so returning null for it would hand React a different tree
     than the HTML it is hydrating. A progress indicator is a readout of
     scroll position rather than decoration, so it stays either way — and a
     bound motion value is not an animation, so it is untouched by the
     MotionConfig reduced-motion policy. */
  return (
    <motion.div
      className="rh-progress"
      aria-hidden="true"
      style={{ scaleX, transformOrigin: "0% 50%" }}
    />
  );
}

/* ── Words ────────────────────────────────────────────────────────────────
   A headline that assembles itself word by word: each word sits in its own
   overflow-hidden mask and swings up from below the line as the block enters
   view. Same construction as the hero's h1, generalised so every section
   title can use it.

   The text is split on spaces and rejoined with real spacing in CSS, so the
   rendered string still reads normally to a screen reader and to a crawler
   — this is one <h2> with words inside it, not a pile of divs. */

export function Words({
  text,
  className,
  as = "h2",
  delay = 0,
  stagger = 0.055,
  duration = 0.85,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Seconds to wait after the block enters view. */
  delay?: number;
  /** Seconds between consecutive words. */
  stagger?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const words = text.split(" ");

  if (reduce) {
    return (
      <Tag
        className={className}
        data-reveal=""
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.3 }}
      >
        {text}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      data-reveal=""
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -60px 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="rh-word-mask">
            <motion.span
              className="rh-word"
              variants={{
                hidden: { y: "108%", opacity: 0, rotate: 2.5 },
                show: { y: "0%", opacity: 1, rotate: 0, transition: { duration, ease: EASE } },
              }}
            >
              {word}
            </motion.span>
          </span>
          {/* A real space between the words, not a CSS margin. The heading's
              textContent is what a crawler, a screen reader and a copy-paste
              all read, and spacing the words apart with `margin-right` alone
              would hand every one of them "Eightpractices.Onedeliveryteam."
              It also lets the line wrap at the spaces, like normal text. */}
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}

/* ── Scene ────────────────────────────────────────────────────────────────
   Scroll-linked depth for a whole block: it drifts, scales and fades across
   its own pass through the viewport. Unlike `Reveal` (a one-shot on entry)
   this stays bound to scroll position the entire time the block is on screen,
   which is what gives the page its sense of layers moving at different rates.

   Every output is spring-smoothed, so a flicked trackpad doesn't snap the
   layer to its new value. */

export function Scene({
  children,
  className,
  style,
  /** Px of vertical drift across the full pass. Positive = moves up as you scroll. */
  y = 40,
  /** How much the block grows on its way through. 0 disables. */
  scale = 0,
  /** Degrees of rotation across the pass. 0 disables. */
  rotate = 0,
  /** Fade in and back out at the edges of the pass. */
  fade = false,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  y?: number;
  scale?: number;
  rotate?: number;
  fade?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const soft = { stiffness: 90, damping: 26, mass: 0.5 };
  const ySpring = useSpring(useTransform(scrollYProgress, [0, 1], [y, -y]), soft);
  const scaleSpring = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [1 - scale, 1, 1 - scale]),
    soft,
  );
  const rotateSpring = useSpring(useTransform(scrollYProgress, [0, 1], [rotate, -rotate]), soft);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0.35, 1, 1, 0.35]);

  return (
    <div ref={ref} className={className} style={style}>
      <motion.div
        style={
          reduce
            ? undefined
            : {
                y: y ? ySpring : undefined,
                scale: scale ? scaleSpring : undefined,
                rotate: rotate ? rotateSpring : undefined,
                opacity: fade ? opacity : undefined,
              }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── Curtain ──────────────────────────────────────────────────────────────
   Uncovers an image by sliding a panel off it, rather than by animating a
   clip-path. Both look identical; only one of them is a pure transform, and
   a clip-path reveal repaints the element on every frame of a 1s animation
   while a dozen cards do the same thing on the way down the page. */

export function Curtain({
  children,
  className,
  from = "bottom",
  duration = 1,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  from?: "bottom" | "left";
  duration?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  /* The panel is always rendered, and reduced motion starts it already open
     rather than removing it. Dropping the element instead would give React a
     different tree on the client than the server sent, since the media query
     behind `useReducedMotion` only exists in the browser. */
  const closed = from === "bottom" ? { scaleY: 1 } : { scaleX: 1 };
  const open = from === "bottom" ? { scaleY: 0 } : { scaleX: 0 };

  return (
    <div className={`rh-curtain ${className ?? ""}`.trim()}>
      {children}
      <motion.span
        className="rh-curtain-panel"
        aria-hidden="true"
        initial={reduce ? open : closed}
        whileInView={open}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration, delay, ease: EASE }}
        style={{ transformOrigin: from === "bottom" ? "top center" : "right center" }}
      />
    </div>
  );
}

/* ── Float ────────────────────────────────────────────────────────────────
   A slow idle bob. Used on decorative chrome only — anything carrying text
   that a person might be reading stays still. */

export function Float({
  children,
  className,
  amplitude = 10,
  duration = 6,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Px travelled from the top of the bob to the bottom. */
  amplitude?: number;
  duration?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      animate={reduce ? undefined : { y: [0, -amplitude, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── Pop ──────────────────────────────────────────────────────────────────
   Spring press-and-lift for anything clickable. Wraps in an inline-flex span
   so it can sit inside a sentence or a button row without changing layout. */

export function Pop({
  children,
  className,
  hover = 1.035,
  tap = 0.97,
  lift = 0,
}: {
  children: ReactNode;
  className?: string;
  hover?: number;
  tap?: number;
  /** Px the element rises on hover, on top of the scale. */
  lift?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={className}
      style={{ display: "inline-flex" }}
      whileHover={reduce ? undefined : { scale: hover, y: -lift }}
      whileTap={reduce ? undefined : { scale: tap }}
      transition={{ type: "spring", stiffness: 380, damping: 22, mass: 0.5 }}
    >
      {children}
    </motion.span>
  );
}

/* ── Spotlight ────────────────────────────────────────────────────────────
   A soft warm glow that follows the cursor across a section. Writes CSS
   custom properties straight to the node instead of going through React
   state — this fires on every pointermove, and a re-render per move would
   be the most expensive thing on the page.

   Coarse pointers get nothing at all: there is no cursor to follow, and the
   layer would just be one more composited surface for a phone to carry. */

export function Spotlight({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const host = el.parentElement;
    if (!host) return;

    const onMove = (e: PointerEvent) => {
      const box = host.getBoundingClientRect();
      el.style.setProperty("--sx", `${e.clientX - box.left}px`);
      el.style.setProperty("--sy", `${e.clientY - box.top}px`);
      el.style.opacity = "1";
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce]);

  /* Rendered unconditionally — the effect above is what opts out. The layer
     ships at opacity 0 and only the pointer handler ever raises it, so on a
     touchscreen or under reduced motion it stays an empty, invisible box
     instead of becoming a tree the server and client disagree about. */
  return <div ref={ref} className={`rh-spotlight ${className ?? ""}`.trim()} aria-hidden="true" />;
}

/* ── BackToTop ────────────────────────────────────────────────────────────
   Appears once you are a screen and a half down, with a ring that traces how
   far through the page you are. Uses the Lenis instance when it is running
   so the trip back up is eased like every other scroll, and falls back to
   the native smooth scroll when it is not. */

export function BackToTop() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(false);
  const ring = useSpring(scrollYProgress, { stiffness: 150, damping: 30, mass: 0.4 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setShown(v > 0.12);
  });

  const toTop = () => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: number) => void } }).lenis;
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {shown && (
        <motion.button
          type="button"
          className="rh-totop"
          onClick={toTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 14 }}
          whileHover={reduce ? undefined : { scale: 1.08 }}
          whileTap={reduce ? undefined : { scale: 0.92 }}
          transition={{ type: "spring", stiffness: 340, damping: 24 }}
        >
          <svg className="rh-totop-ring" viewBox="0 0 44 44" aria-hidden="true">
            <circle className="rh-totop-track" cx="22" cy="22" r="20" />
            {/* pathLength lets the dash be driven as a 0–1 value directly. */}
            <motion.circle
              className="rh-totop-fill"
              cx="22"
              cy="22"
              r="20"
              style={{ pathLength: reduce ? 1 : ring }}
            />
          </svg>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M8 12.5v-9M4 7.5l4-4 4 4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
