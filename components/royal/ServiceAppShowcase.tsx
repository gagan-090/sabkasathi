"use client";

/* ─────────────────────────────────────────────────────────────────────────
   The three-phone screen showcase, on the home page.

   Same composition the service and city pages already run in
   components/seo/SeoAppShowcase — a tilted phone either side of a taller
   centre one, over a soft disc — but re-skinned in the home page's warm
   palette and driven off SERVICE_SCREENS, so the tabs are our eight service
   lines rather than six app verticals. The service cards above render the
   centre phone of each trio, which is what ties the two sections together.

   Only the active trio is mounted. Six phones' worth of app markup sitting
   in the DOM to show three of them would cost more than the transition is
   worth, and AnimatePresence lets the outgoing one leave properly anyway.
   ───────────────────────────────────────────────────────────────────────── */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PhoneFrame, PHONE_SIZE_DEFAULT, PHONE_SIZE_MINI } from "@/components/mockups/PhoneFrame";
import { SERVICE_SCREENS } from "./serviceScreens";
import { EASE, Reveal } from "./motion";

/** The orange the phone bezels and status pills are lit with. */
const ACCENT = "#f38200";

export function ServiceAppShowcase() {
  const [activeIndex, setActiveIndex] = useState(SERVICE_SCREENS[0].index);
  const active = SERVICE_SCREENS.find((s) => s.index === activeIndex) ?? SERVICE_SCREENS[0];

  return (
    <div className="rh-screens">
      <Reveal>
        <div className="rh-screens-tabs" role="tablist" aria-label="Service screens">
          {SERVICE_SCREENS.map((item) => {
            const isActive = item.index === activeIndex;
            return (
              <button
                key={item.index}
                type="button"
                role="tab"
                id={`rh-screens-tab-${item.index}`}
                aria-selected={isActive}
                aria-controls="rh-screens-panel"
                className={`rh-screens-tab${isActive ? " is-active" : ""}`}
                onClick={() => setActiveIndex(item.index)}
              >
                <span className="rh-screens-tab-index">{item.index}</span>
                {item.tab}
              </button>
            );
          })}
        </div>
      </Reveal>

      <div
        className="rh-screens-stage"
        id="rh-screens-panel"
        role="tabpanel"
        aria-labelledby={`rh-screens-tab-${active.index}`}
      >
        {/* The disc behind the phones. Static — it does not swap with the
            trio, so the phones read as changing against a fixed backdrop. */}
        <span className="rh-screens-disc" aria-hidden="true" />

        <AnimatePresence mode="wait">
          <motion.div
            key={active.index}
            className="rh-screens-row"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.98 }}
            transition={{ duration: 0.38, ease: EASE }}
          >
            {/* Only the centre phone takes a wheel gesture. The flanking two
                are tilted away and half-covered — they are the composition,
                not something anyone is going to read — and every scrollable
                phone is a patch of page that will not scroll. One is a demo;
                three in a row is a trap. */}
            <div className="rh-screens-side rh-screens-side-left">
              <PhoneFrame
                accent={ACCENT}
                badge="App Screen"
                sizeClass={PHONE_SIZE_MINI}
                interactive={false}
              >
                {active.left}
              </PhoneFrame>
            </div>

            <div className="rh-screens-hero">
              <PhoneFrame accent={ACCENT} badge="App Screen" sizeClass={PHONE_SIZE_DEFAULT}>
                {active.center}
              </PhoneFrame>
            </div>

            <div className="rh-screens-side rh-screens-side-right">
              <PhoneFrame
                accent={ACCENT}
                badge="App Screen"
                sizeClass={PHONE_SIZE_MINI}
                interactive={false}
              >
                {active.right}
              </PhoneFrame>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="rh-screens-panel">
        <p className="rh-screens-caption">{active.caption}</p>
        <ul className="rh-screens-features">
          {active.features.map((feature) => (
            <li className="rh-screens-feature" key={feature}>
              <span className="rh-screens-feature-tick" aria-hidden="true">
                <TickIcon />
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TickIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m5 12.5 4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
