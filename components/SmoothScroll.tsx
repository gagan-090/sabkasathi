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
      (dropdowns, the chat log, the city list) — Lenis ignores the gesture
      there entirely. Use it only for panes that must never pass a scroll on to
      the page; `allowNestedScroll` below is the right tool for an inner
      scroller that should chain out at its ends.
   ───────────────────────────────────────────────────────────────────────── */

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      /* Measure the page from <body>, not <html>.

         Lenis's default `content` is document.documentElement, and it keeps
         the page height current by holding a ResizeObserver on it. Our <html>
         carries `h-full` (app/layout.tsx), so its box is pinned to the
         viewport height and that observer can never fire — Lenis is left with
         the one measurement it took in its own constructor, which on a
         client-rendered page is taken before most of the page exists. It had
         been measuring the document as 900px tall against a real 22,000px,
         giving `limit = 0`: every scroll clamped to zero, the whole page
         frozen. <body> is `min-h-full` and grows with its content, so the
         observer fires and the limit tracks the real page. */
      content: document.body,

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
      // Lets a scrollable element under the cursor take the gesture until it
      // reaches its own end, then hands it back to the page — the behaviour
      // the browser gives you for free and that owning the wheel takes away.
      // Required by the phone demos in components/mockups, whose app screens
      // scroll inside the frame; without it the page stalls whenever the
      // pointer is over one. See the note in mockups/kit.tsx.
      allowNestedScroll: true,
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
