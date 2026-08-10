"use client";

import { useEffect, useRef, useState } from "react";

/*
  The desktop browser window the website mockups are rendered inside.

  The counterpart to PhoneFrame, and deliberately built the same way: the site
  is written against a fixed virtual viewport in plain pixel values and then
  scaled down into whatever box the frame is given, so one composition serves a
  260px card and a 900px section without a single breakpoint.

  It exists because a service called "Website Development" showing a phone is
  the wrong artwork. Everything else in components/mockups is an app; this is
  the one frame that is a browser.
*/

/* The virtual viewport every site in this folder is composed at — a small
   desktop, wide enough that a real header, a hero and a product grid all lay
   out horizontally the way they would on a laptop. Going wider (1440) buys
   nothing but a smaller scale factor, which is the one thing that makes the
   mockup unreadable in a card. */
export const SITE_VIEWPORT_WIDTH = 1180;

export function BrowserFrame({
  accent,
  url,
  badge = "Live",
  viewportWidth = SITE_VIEWPORT_WIDTH,
  /* 16:10 rather than 16:9 — a browser viewport is a monitor minus its chrome
     and its own toolbar, so it is always squarer than the panel it sits on. */
  aspect = 16 / 10,
  interactive = false,
  className = "",
  children,
}: {
  accent: string;
  /** Shown in the address pill. Scheme is drawn for you. */
  url: string;
  /** The pill on the right of the toolbar. `null` removes it. */
  badge?: string | null;
  viewportWidth?: number;
  /** width / height of the viewport, not of the whole window. */
  aspect?: number;
  /**
   * `false` makes the page a still preview: it cannot be scrolled, and it is
   * transparent to the pointer so wheel events land on whatever the window is
   * sitting in.
   *
   * Same reasoning as PhoneFrame's flag, and the same trap. Lenis walks the
   * composed path of every wheel event and hands the gesture to the first
   * scrollable element it finds, so a scrollable mockup is a patch of page
   * that will not scroll. Leave this off for artwork.
   */
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const [screenWidth, setScreenWidth] = useState(0);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  /* The frame is fluid — it takes the width of the card it is dropped into —
     so the scale factor has to be measured rather than computed. */
  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;
    const update = () => setScreenWidth(el.offsetWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const update = () => setContentHeight(el.scrollHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [children]);

  const scale = screenWidth ? screenWidth / viewportWidth : 0;
  /* The viewport's own height comes from its aspect ratio, so in the site's
     own coordinates the fold always falls at the same place no matter how
     small the frame is drawn. */
  const visibleUnscaledHeight = viewportWidth / aspect;
  const effectiveUnscaledHeight = contentHeight
    ? Math.max(contentHeight, visibleUnscaledHeight)
    : visibleUnscaledHeight;

  /* How much of the page is on screen, as a fraction — the fake scrollbar's
     thumb is sized from it, so a long page reads as a long page. */
  const visibleFraction =
    effectiveUnscaledHeight > 0
      ? Math.min(1, visibleUnscaledHeight / effectiveUnscaledHeight)
      : 1;

  return (
    <div className={`relative w-full select-none ${className}`}>
      {/* Monitor body. Thinner than the phone's bezel and lit along the top
          edge, so it reads as a laptop lid rather than a slab. */}
      <div
        className="w-full rounded-[14px] p-[5px] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950"
        style={{
          boxShadow: `0 25px 50px -12px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.07) inset, 0 0 18px ${accent}1a`,
        }}
      >
        <div
          className="relative w-full overflow-hidden rounded-[9px] flex flex-col"
          style={{ background: "#fff", isolation: "isolate", transform: "translateZ(0)" }}
        >
          {/* ── toolbar ── */}
          <div className="shrink-0 flex items-center gap-[6px] px-[8px] h-[26px] bg-slate-100 border-b border-slate-200/90">
            <span className="flex gap-[3.5px] shrink-0">
              <span className="w-[6px] h-[6px] rounded-full bg-[#ff5f57]" />
              <span className="w-[6px] h-[6px] rounded-full bg-[#febc2e]" />
              <span className="w-[6px] h-[6px] rounded-full bg-[#28c840]" />
            </span>

            <span className="flex-1 min-w-0 flex items-center justify-center">
              <span className="flex items-center gap-[4px] max-w-[70%] px-[8px] py-[2px] rounded-full bg-white border border-slate-200 shadow-sm">
                <LockGlyph />
                <span className="truncate text-[8px] font-semibold text-slate-500 tracking-tight">
                  {url}
                </span>
              </span>
            </span>

            {badge ? (
              <span
                className="shrink-0 flex items-center gap-[3px] text-[6.5px] font-black uppercase tracking-[0.14em] px-[5px] py-[2px] rounded-full"
                style={{ color: accent, background: `${accent}1f`, border: `1px solid ${accent}3d` }}
              >
                <span className="w-[3px] h-[3px] rounded-full" style={{ background: accent }} />
                {badge}
              </span>
            ) : (
              <span className="w-[18px]" />
            )}
          </div>

          {/* ── viewport ── */}
          <div
            ref={screenRef}
            /* `min-h-0` is load-bearing: this is a column flex item, so its
               automatic minimum size is its content height — without it the
               window grows to the full length of the page and the aspect
               ratio, and with it the fold, is ignored. */
            className={`relative w-full min-h-0 overflow-x-hidden bg-white ${
              interactive
                ? "overflow-y-auto scrollbar-none touch-pan-y"
                : "overflow-y-hidden pointer-events-none"
            }`}
            style={{ aspectRatio: `${aspect}` }}
            onMouseDown={interactive ? (e) => e.stopPropagation() : undefined}
            onTouchStart={interactive ? (e) => e.stopPropagation() : undefined}
          >
            {scale > 0 && (
              <div
                style={{ position: "relative", width: "100%", height: effectiveUnscaledHeight * scale }}
              >
                <div
                  ref={contentRef}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: viewportWidth,
                    minHeight: visibleUnscaledHeight,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                  }}
                >
                  {children}
                </div>
              </div>
            )}

            {/* A page that is cut off at the fold but has no scrollbar reads as
                a picture of a website. This is the one pixel of chrome that
                makes it read as a window onto one. */}
            {!interactive && visibleFraction < 1 && (
              <span className="absolute top-0 right-0 w-[3px] h-full bg-slate-200/60 pointer-events-none">
                <span
                  className="absolute top-0 left-0 w-full rounded-full bg-slate-400/60"
                  style={{ height: `${visibleFraction * 100}%` }}
                />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LockGlyph() {
  return (
    <svg width="7" height="7" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <rect x="2" y="4.2" width="6" height="4.4" rx="1" stroke="#10b981" strokeWidth="1.1" />
      <path d="M3.2 4.2V3a1.8 1.8 0 0 1 3.6 0v1.2" stroke="#10b981" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}
