"use client";

/* ─────────────────────────────────────────────────────────────────────────
   Site-wide smooth scrolling (Lenis).

   Lenis intercepts wheel/keyboard input and eases the real window scroll
   position toward the target every frame. Because it drives the *native*
   scroll position — rather than translating a wrapper — everything that
   reads scroll keeps working untouched: framer-motion's `useScroll`,
   IntersectionObserver reveals, `content-visibility`, anchor offsets.

   Four deliberate choices:

   1. `syncTouch: false` — touchscreens already have momentum scrolling in
      hardware. Re-implementing it in JS on top makes phones feel laggy, so
      touch stays native and only wheel/keys are eased.
   2. `anchors: true` — hands `#services`-style jumps to Lenis, since the CSS
      `scroll-behavior: smooth` path is disabled while Lenis owns scrolling.
   3. Reduced motion tears the instance down entirely rather than shortening
      it. Someone who asked for no motion should get the browser's own scroll.
   4. The `prevent` hook exempts any subtree marked `data-lenis-prevent`
      (dropdowns, the chat log, the city list), so their inner scrollbars keep
      behaving normally instead of bubbling into the page ease.
   ───────────────────────────────────────────────────────────────────────── */

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      // ~1s glide with a quintic ease-out — the same curve the page's
      // framer-motion transitions use, so scrolling and reveals feel related.
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 5),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      anchors: { offset: -104 }, // clears the fixed navbar, like scroll-padding-top
      autoRaf: true,
      prevent: (node) => node.hasAttribute?.("data-lenis-prevent") ?? false,
    });

    // Marks the document while Lenis is live. The stylesheet uses it to hand
    // scroll-behaviour over (native smooth + Lenis fight each other).
    document.documentElement.classList.add("lenis");

    // Published so components that need to move the page (the back-to-top
    // button) can hand the job to Lenis rather than calling window.scrollTo,
    // which Lenis would otherwise fight for control of.
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    return () => {
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
      document.documentElement.classList.remove("lenis", "lenis-smooth", "lenis-scrolling");
    };
  }, []);

  return null;
}
