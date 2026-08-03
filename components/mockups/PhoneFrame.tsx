"use client";

import { useEffect, useRef, useState } from "react";

/*
  The phone body every mockup is rendered inside.

  Lifted verbatim out of PortfolioShowcase's PhoneCard so the industry rows in
  IndustriesSection get the same device rather than a second, slightly different
  one drawn from memory. The tricky parts are load-bearing and are documented
  where they sit: the derived corner radius, the WebKit clipping workaround, and
  measuring the screen instead of computing it from the breakpoint classes.

  What stays outside this component is the app itself and whatever decides when
  it is "active" — a carousel's IntersectionObserver in one case, a category tab
  in the other.
*/

/* The virtual viewport each screen is composed at before being scaled down into
   the frame — an iPhone 14's CSS width. Every app in this folder and in
   components/industries is written against this width in plain pixel values, so
   the frame can be any size and the composition stays identical rather than
   needing a breakpoint for each one. */
export const PHONE_VIEWPORT_WIDTH = 390;

/* Height of the two reserved bands inside the screen: the status bar the clock
   sits in, and the strip the home indicator sits on. The mockup gets everything
   between them, so nothing ever renders under the clock. */
const STATUS_BAR_HEIGHT = 30;
const HOME_BAR_HEIGHT = 16;

/* Proportions follow a Galaxy S25 Ultra rather than an iPhone: a ~5-6px bezel
   (about 1.5mm at this scale) and a noticeably squarer corner — Ultra bodies
   round at roughly 11% of their width where an iPhone is nearer 14%. Both
   numbers are per-breakpoint because a 5px bezel reads as thicker on a 250px
   frame than on a 280px one. */
export const PHONE_SIZE_DEFAULT =
  "w-[250px] h-[530px] [--bezel:5px] [--radius:28px] " +
  "sm:w-[268px] sm:h-[568px] sm:[--bezel:5px] sm:[--radius:30px] " +
  "md:w-[280px] md:h-[592px] md:[--bezel:6px] md:[--radius:32px]";

/** The size that fits inside an industry card in a four-column grid. */
export const PHONE_SIZE_MINI =
  "w-[196px] h-[416px] [--bezel:4px] [--radius:22px] " +
  "sm:w-[208px] sm:h-[442px] sm:[--bezel:4px] sm:[--radius:24px]";

/** A shorter body for rows that sit inside a section rather than a carousel. */
export const PHONE_SIZE_COMPACT =
  "w-[228px] h-[484px] [--bezel:5px] [--radius:26px] " +
  "sm:w-[240px] sm:h-[510px] sm:[--bezel:5px] sm:[--radius:28px] " +
  "md:w-[252px] md:h-[534px] md:[--bezel:5px] md:[--radius:29px]";

export function PhoneFrame({
  accent,
  badge = "Live",
  clock = "9:41",
  sizeClass = PHONE_SIZE_DEFAULT,
  onHold,
  children,
}: {
  accent: string;
  /** The pill in the status bar. `null` removes it. */
  badge?: string | null;
  clock?: string;
  sizeClass?: string;
  /** Fires as a pointer enters/leaves the screen, so an auto-scrolling track
      can stop creeping while someone is tapping around inside an app. */
  onHold?: (holding: boolean) => void;
  children: React.ReactNode;
}) {
  const [screen, setScreen] = useState({ width: 0, height: 0 });
  const screenRef = useRef<HTMLDivElement>(null);

  /* Measured rather than computed from the breakpoint classes: the frame width
     comes from Tailwind, so the scale would silently go wrong the moment one of
     those sizes is edited. */
  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;
    const update = () => setScreen({ width: el.offsetWidth, height: el.offsetHeight });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scale = screen.width ? screen.width / PHONE_VIEWPORT_WIDTH : 0;

  return (
    /* --bezel and --radius drive the whole frame. The screen's corner radius is
       derived from them (`--radius` minus the bezel it sits inside) rather than
       being a second hand-picked value, which is what makes the two curves
       concentric instead of a mismatched pair. The card's height is the
       screen's 390x844 ratio plus the bezel, top and bottom, so the demo is
       never letterboxed inside its own frame. */
    <div className={`relative flex-shrink-0 snap-center select-none ${sizeClass}`}>
      <div
        className="w-full h-full rounded-[var(--radius)] p-[var(--bezel)]
                   bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950"
        style={{
          boxShadow: `0 25px 50px -12px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.06) inset, 0 0 18px ${accent}1a`,
        }}
      >
        {/* The clipping box for everything on the screen. `isolation` plus a
            forced compositing layer keep the scaled subtree clipped to the
            rounded corners in WebKit, which otherwise lets a transformed child
            paint straight through its rounded `overflow: hidden` ancestor.
            The other half of that is below — the scale lives on a wrapper
            <div>, never on the mockup's own root. */}
        <div
          className="relative w-full h-full overflow-hidden flex flex-col select-none"
          style={{
            borderRadius: "calc(var(--radius) - var(--bezel))",
            /* Matches the mockups' own base so the status and home bars read as
               part of the same screen rather than two grey margins. */
            background: "#05080d",
            isolation: "isolate",
            transform: "translateZ(0)",
          }}
        >
          {/* Centred punch-hole camera. An island pill belongs to an iPhone; on
              a frame this slim it also ate most of the status bar. */}
          <div className="absolute top-[7px] left-1/2 -translate-x-1/2 w-[9px] h-[9px] rounded-full bg-black z-30 pointer-events-none ring-1 ring-white/10">
            <span className="absolute inset-[2px] rounded-full bg-slate-800/80" />
          </div>

          <div
            className="shrink-0 flex justify-between items-center px-3.5 pt-1.5 text-[9px] font-bold z-20 pointer-events-none text-white/85"
            style={{ height: STATUS_BAR_HEIGHT }}
          >
            <span>{clock}</span>
            {badge && (
              <span
                className="flex items-center gap-1 text-[7px] font-black uppercase tracking-[0.14em] px-1.5 py-[2px] rounded-full"
                style={{
                  color: accent,
                  background: `${accent}24`,
                  border: `1px solid ${accent}44`,
                }}
              >
                <span className="w-[3px] h-[3px] rounded-full" style={{ background: accent }} />
                {badge}
              </span>
            )}
          </div>

          {/* The app inside is genuinely interactive — tabs, filters, steppers,
              tel: and WhatsApp links. Pointer events are stopped here so a tap
              on a button is not swallowed by a parent drag handler; the bezel
              around the screen still drags the track. */}
          <div
            ref={screenRef}
            className="relative flex-1 min-h-0 overflow-hidden"
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onPointerEnter={() => onHold?.(true)}
            onPointerLeave={() => onHold?.(false)}
          >
            {scale > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: PHONE_VIEWPORT_WIDTH,
                  height: screen.height / scale,
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
              >
                {children}
              </div>
            )}
          </div>

          <div
            className="shrink-0 flex items-end justify-center pb-1.5 z-20 pointer-events-none"
            style={{ height: HOME_BAR_HEIGHT }}
          >
            <span className="w-24 h-[4px] bg-white/25 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
