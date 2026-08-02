"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

/*
  Shared parts for the phone mockups in `components/mockups/`.

  Deliberately small. Each client app in this folder is meant to look like it
  came from a different studio — its own shape language, navigation model and
  type — so anything that would push the three toward a house style (card
  components, a spacing scale, a colour ramp) stays out of here. What is left
  is behaviour: counting numbers, a clock, scrollable screens and the two link
  helpers, none of which have a look of their own.

  Everything is laid out against a 390px virtual viewport (see
  PortfolioShowcase) and scaled down into the frame, so sizes elsewhere in this
  folder are written as plain pixel values.
*/

/** Every screen is a real phone number away from its client. */
export const tel = (number: string) => `tel:+91${number}`;
export const whatsapp = (number: string, message?: string) =>
  `https://wa.me/91${number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

/* ── a shared 30s clock ─────────────────────────────────────────────────────
   One interval for the whole carousel rather than one per phone, exposed
   through useSyncExternalStore. That is not ceremony: `Date.now()` read during
   render would differ between the server and the browser and break hydration,
   and the useEffect-then-setState version of the same thing is a cascading
   render. getServerSnapshot returns 0, so anything time-dependent renders a
   placeholder on the server and the real value the moment it mounts.

   The snapshot has to be a cached value, not a fresh `Date.now()` — React
   compares snapshots between renders and a number that changes on every read
   loops forever. */
let cachedNow = 0;
const clockListeners = new Set<() => void>();
let clockTimer: ReturnType<typeof setInterval> | null = null;

function subscribeClock(onChange: () => void) {
  cachedNow = Date.now();
  clockListeners.add(onChange);
  if (!clockTimer) {
    clockTimer = setInterval(() => {
      cachedNow = Date.now();
      clockListeners.forEach((fn) => fn());
    }, 30_000);
  }
  return () => {
    clockListeners.delete(onChange);
    if (clockListeners.size === 0 && clockTimer) {
      clearInterval(clockTimer);
      clockTimer = null;
    }
  };
}

/** Wall-clock milliseconds, refreshed every 30s. `0` during SSR. */
export function useClock(): number {
  return useSyncExternalStore(
    subscribeClock,
    () => cachedNow,
    () => 0,
  );
}

/**
 * A number that counts up from zero — on mount, and again whenever `resetKey`
 * changes, so a KPI re-counts when you switch tab or pick a different batch.
 *
 * It writes to the DOM node directly instead of holding the value in state.
 * Sixty renders a second, times three counters, times three phones on a
 * desktop, is a lot of React for an animation that only ever changes one text
 * node — and the state version cannot avoid a setState inside an effect.
 */
export function Counter({
  to,
  run,
  decimals = 0,
  duration = 1000,
  resetKey = 0,
  prefix = "",
  suffix = "",
  className = "",
}: {
  to: number;
  /** False holds it at zero — used to wait until the card is on screen. */
  run: boolean;
  decimals?: number;
  duration?: number;
  resetKey?: string | number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const write = (n: number) => {
      const body = decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString("en-IN");
      el.textContent = `${prefix}${body}${suffix}`;
    };

    if (!run) {
      write(0);
      return;
    }

    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / duration);
      // easeOutCubic: fast off the mark, settles rather than stops.
      write(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, run, decimals, duration, resetKey, prefix, suffix]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {decimals > 0 ? (0).toFixed(decimals) : 0}
      {suffix}
    </span>
  );
}

/**
 * The scrolling body of a phone screen.
 *
 * The page runs Lenis, which takes the wheel over globally, so a plain
 * `overflow-y: auto` here would do nothing — the gesture would scroll the
 * website instead of the phone. What makes it work is `allowNestedScroll` in
 * components/SmoothScroll: Lenis then scrolls this element while it still has
 * somewhere to go and hands the gesture back to the page at either end.
 *
 * Note what is deliberately absent: `data-lenis-prevent`. That marks a subtree
 * as none of Lenis's business, which sounds right and is not — Lenis drops the
 * event without scrolling anything, so the whole page seizes up whenever the
 * cursor is over a phone. The nested-scroll path is the one that chains.
 * For the same reason `overscroll-behavior` must stay `auto`: `contain` is the
 * signal Lenis reads as "never chain out of here".
 */
export function Screen({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`phone-scroll flex-1 min-h-0 overflow-y-auto overflow-x-hidden ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
