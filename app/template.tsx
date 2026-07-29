"use client";

/* ─────────────────────────────────────────────────────────────────────────
   Route transition.

   A `template.tsx` (unlike a layout) is re-keyed and remounted on every
   navigation, which is exactly what an enter animation needs — the new route
   mounts with `initial` applied and animates in on its own.

   Two constraints shape this file:

   • It animates opacity ONLY. This element wraps every page on the site, and
     an ancestor carrying a transform becomes the containing block for
     `position: fixed` descendants — which would strand the sticky admin
     toolbars and any fixed overlay inside a page for the length of the
     animation. Opacity has no such side effect. The vertical movement people
     associate with a page transition is done one level down, by the reveals
     inside each page.

   • It mirrors the flex box it replaced. Page roots are `min-h-screen
     flex flex-col` children of a `flex flex-col` body; a plain <div> in
     between would swallow that chain, so the wrapper is a column flex item
     that grows, leaving every page laid out exactly as before.
   ───────────────────────────────────────────────────────────────────────── */

import { motion, useReducedMotion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0.12 : 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "flex", flexDirection: "column", flex: "1 0 auto", minWidth: 0 }}
    >
      {children}
    </motion.div>
  );
}
