"use client";

import { useEffect, useRef, useState } from "react";
import { PhoneFrame, PHONE_SIZE_MINI } from "@/components/mockups/PhoneFrame";
import { GravityPointApp } from "@/components/mockups/GravityPointApp";
import { PhulwariApp } from "@/components/mockups/PhulwariApp";
import { SmartEdgeApp } from "@/components/mockups/SmartEdgeApp";
import { IndustryApp } from "./archetypes";
import { SCREEN_BY_ID } from "./registry";
import { isLive, type LiveScreen } from "./screens";

/*
  The phone that sits inside a single industry card.

  Mounting is deferred, and that is the whole reason this component exists.
  Selecting "All" puts 55 cards on the page; 55 phone apps mounted at once is
  55 scroll containers, hundreds of framer-motion nodes and 165 counters, which
  janks the page badly on a mid-range Android — exactly the device most of these
  screens are arguing for.

  So two thresholds, from one observer:
    · `near`  — within a screen's height of the viewport. Mounts the app.
    · `seen`  — actually on screen. Releases the counters and intro animations.

  Before it mounts, a placeholder holds the phone's exact box so nothing below
  it shifts when the real thing arrives.
*/

const LIVE_APPS: Record<LiveScreen["host"], (p: { active: boolean }) => React.JSX.Element> = {
  "phulwari.co.in": PhulwariApp,
  "smartedgeeducationconsultancy.com": SmartEdgeApp,
  "gravitypointtutorial.com": GravityPointApp,
};

/* Rendered as an element, never called as a function — calling it would run a
   client app's hooks inside this component's own hook order. */
function LiveApp({ host, active }: { host: LiveScreen["host"]; active: boolean }) {
  const App = LIVE_APPS[host];
  return <App active={active} />;
}

export function IndustryCardPhone({ screenId }: { screenId: string }) {
  const entry = SCREEN_BY_ID[screenId];
  const holderRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = holderRef.current;
    if (!el) return;

    // Mount early, animate late — two observers because they need different
    // root margins, and one observer cannot carry two.
    const mountObserver = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          mountObserver.disconnect();
        }
      },
      { rootMargin: "100% 0px" },
    );
    const seenObserver = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          seenObserver.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    mountObserver.observe(el);
    seenObserver.observe(el);
    return () => {
      mountObserver.disconnect();
      seenObserver.disconnect();
    };
  }, []);

  if (!entry) return null;

  const accent = entry.accent;

  return (
    <div ref={holderRef} className="flex justify-center">
      {near ? (
        <PhoneFrame
          accent={accent}
          badge={isLive(entry) ? "Live" : "Concept"}
          sizeClass={PHONE_SIZE_MINI}
        >
          {isLive(entry) ? (
            <LiveApp host={entry.host} active={seen} />
          ) : (
            <IndustryApp screen={entry} active={seen} />
          )}
        </PhoneFrame>
      ) : (
        /* Same box as the frame, so mounting never moves the card. */
        <div
          className={`${PHONE_SIZE_MINI} rounded-[var(--radius)] bg-slate-200/45`}
          aria-hidden
        />
      )}
    </div>
  );
}
