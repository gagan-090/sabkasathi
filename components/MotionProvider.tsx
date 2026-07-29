"use client";

/* ─────────────────────────────────────────────────────────────────────────
   One motion policy for the whole site.

   `useReducedMotion()` only helps where a component thought to call it. The
   home page now carries dozens of inline `motion.*` reveals — star ratings,
   step markers, card icons, the CTA rings — and gating every one of them by
   hand is the kind of thing that is right on the day it is written and wrong
   six commits later.

   `reducedMotion="user"` makes framer-motion enforce it centrally instead:
   when the OS asks for reduced motion, transform and layout animations are
   dropped everywhere below this provider and only opacity is allowed
   through, whether or not the component asked.

   No default `transition` is set here on purpose — that would silently
   restyle every animation on the site that doesn't name its own.
   ───────────────────────────────────────────────────────────────────────── */

import { MotionConfig } from "framer-motion";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
