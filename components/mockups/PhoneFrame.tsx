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
  interactive = true,
  onHold,
  children,
}: {
  accent: string;
  /** The pill in the status bar. `null` removes it. */
  badge?: string | null;
  clock?: string;
  sizeClass?: string;
  /**
   * `false` makes the screen a still preview: it cannot be scrolled, and it is
   * transparent to the pointer so wheel events land on whatever the phone is
   * sitting in.
   *
   * That second half is the load-bearing one. The page runs Lenis with
   * `allowNestedScroll`, which walks the composed path of every wheel event
   * and, on finding any scrollable element, drops the gesture so the browser
   * can scroll that element natively. A scrollable phone screen is therefore a
   * hole in the page's own scrolling — fine for one demo you meant to be
   * scrubbed, but a section tiled with phones becomes a page that will not
   * move. `pointer-events: none` keeps these frames out of the composed path
   * entirely, so Lenis never sees them. Clearing `overflow` alone would not:
   * `overflow-x: auto` on a carousel inside a mockup computes `overflow-y` to
   * `auto` as well, and Lenis would still find it.
   *
   * Set it `false` for phones used as artwork; leave it on for the one or two
   * a visitor is actually invited to scroll.
   */
  interactive?: boolean;
  /** Fires as a pointer enters/leaves the screen, so an auto-scrolling track
      can stop creeping while someone is tapping around inside an app. */
  onHold?: (holding: boolean) => void;
  children: React.ReactNode;
}) {
  const [screen, setScreen] = useState({ width: 0, height: 0 });
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  /* Measured frame size for exact viewport scaling */
  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;
    const update = () => setScreen({ width: el.offsetWidth, height: el.offsetHeight });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Measures actual scrollHeight of child app screen to allow native vertical scrolling */
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const update = () => setContentHeight(el.scrollHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [children]);

  const scale = screen.width ? screen.width / PHONE_VIEWPORT_WIDTH : 0;
  const scaledViewportHeight = scale > 0 ? screen.height / scale : 0;
  const effectiveUnscaledHeight = contentHeight ? Math.max(contentHeight, scaledViewportHeight) : scaledViewportHeight;

  return (
    <div className={`relative flex-shrink-0 snap-center select-none ${sizeClass}`}>
      <div
        className="w-full h-full rounded-[var(--radius)] p-[var(--bezel)]
                   bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950"
        style={{
          boxShadow: `0 25px 50px -12px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.06) inset, 0 0 18px ${accent}1a`,
        }}
      >
        <div
          className="relative w-full h-full overflow-hidden flex flex-col select-none"
          style={{
            borderRadius: "calc(var(--radius) - var(--bezel))",
            background: "#05080d",
            isolation: "isolate",
            transform: "translateZ(0)",
          }}
        >
          {/* Centred punch-hole camera */}
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

          {/* Interactive & Scrollable screen area inside phone */}
          <div
            ref={screenRef}
            className={`relative flex-1 min-h-0 overflow-x-hidden ${
              interactive
                ? "overflow-y-auto scrollbar-none touch-pan-y"
                : "overflow-y-hidden pointer-events-none"
            }`}
            onMouseDown={interactive ? (e) => e.stopPropagation() : undefined}
            onTouchStart={interactive ? (e) => e.stopPropagation() : undefined}
            onPointerEnter={interactive ? () => onHold?.(true) : undefined}
            onPointerLeave={interactive ? () => onHold?.(false) : undefined}
          >
            {scale > 0 && (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: effectiveUnscaledHeight * scale,
                }}
              >
                <div
                  ref={contentRef}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: PHONE_VIEWPORT_WIDTH,
                    minHeight: scaledViewportHeight,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                  }}
                >
                  {children}
                </div>
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
