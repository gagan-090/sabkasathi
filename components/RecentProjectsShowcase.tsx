"use client";

import { motion } from "framer-motion";
import {
  Sparkles, ChevronLeft, ChevronRight, Loader2,
  Monitor, Smartphone, ArrowUpRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { fetchRecentProjects, RecentProject } from "@/lib/recentProject";

const LockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="7" height="7" viewBox="0 0 10 10" fill="none" {...props}>
    <rect x="2" y="4.2" width="6" height="4.4" rx="1" stroke="#10b981" strokeWidth="1" />
    <path d="M3.2 4.2V3a1.8 1.8 0 0 1 3.6 0v1.2" stroke="#10b981" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const recentProjectsStyles = `
  .rp-card-shell {
    position: relative;
    background: #fff;
    border: 1px solid rgba(15,23,42,0.06);
    box-shadow: 0 2px 16px rgba(224, 102, 0, 0.05), 0 1px 3px rgba(15,23,42,0.04);
    transition: box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1);
  }
  .rp-card-shell::before {
    content: ''; position: absolute; inset: -1px; border-radius: inherit; padding: 1.3px;
    pointer-events: none;
    background: linear-gradient(140deg,
      rgba(255,255,255,0.9) 0%,
      rgba(255, 210, 0, 0.30) 30%,
      rgba(224, 102, 0, 0.08) 55%,
      rgba(224, 102, 0, 0.30) 80%,
      rgba(255,255,255,0.8) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    opacity: 0; transition: opacity 0.4s ease;
  }
  .rp-card-shell:hover { box-shadow: 0 20px 44px rgba(224, 102, 0, 0.14), 0 4px 12px rgba(15,23,42,0.06); transform: translateY(-5px); }
  .rp-card-shell:hover::before { opacity: 1; }

  .rp-nav-btn {
    transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease, color 0.25s ease;
  }
  .rp-nav-btn:hover { transform: translateY(-50%) scale(1.08); }
  .rp-nav-btn:active { transform: translateY(-50%) scale(0.96); }

  .rp-dot { transition: width 0.3s cubic-bezier(0.16,1,0.3,1), background-color 0.3s ease; }

  @media (prefers-reduced-motion: reduce) {
    .rp-card-shell, .rp-card-shell::before, .rp-nav-btn, .rp-dot { transition: none; }
  }
`;

// Fixed "virtual viewport" the live site renders at before being scaled
// down to fit the card — this is what makes the iframe preview look like a
// shrunk desktop screenshot instead of a huge zoomed-in crop of the page.
const IFRAME_VIEWPORT_WIDTH = 1440;
const IFRAME_VIEWPORT_HEIGHT = 900;

// Image previews are static screenshots — they use object-cover, so any
// aspect ratio is safe (it just crops). Tune this freely.
const IMAGE_PREVIEW_ASPECT_RATIO = "aspect-[4/3]";

// Live iframe previews MUST stay at 8:5 (== 1440:900, the virtual viewport
// above). If this ever drifts from the viewport's own ratio, the scaled
// iframe will be a different shape than its box — leaving a gap on one
// side instead of filling it edge-to-edge.
const IFRAME_PREVIEW_ASPECT_RATIO = "aspect-[8/5]";

// Fallback used for the "no image yet" placeholder state.
const PLACEHOLDER_ASPECT_RATIO = "aspect-[8/5]";

interface RecentCardProps {
  project: RecentProject;
  isDragging: boolean;
  isActive: boolean;
}

function RecentCard({ project, isDragging, isActive }: RecentCardProps) {
  const [iframeLoading, setIframeLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [previewWidth, setPreviewWidth] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);
  const isMobile = project.type === "mobile";
  const accent = project.accentColor || "#f38200";
  const hasImage = Boolean(project.imageUrl);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    const update = () => setPreviewWidth(el.offsetWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const iframeScale = previewWidth ? previewWidth / IFRAME_VIEWPORT_WIDTH : 0;

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        if (isDragging) e.preventDefault();
      }}
      className="group relative flex-shrink-0 w-[290px] sm:w-[340px] snap-center select-none"
    >
      <div className="rp-card-shell relative rounded-[1.75rem] overflow-hidden">
        {/* Chrome bar */}
        <div className="h-8 sm:h-9 bg-slate-50 border-b border-slate-200/70 flex items-center px-3.5 justify-between shrink-0">
          <div className="flex gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            <span className="w-2 h-2 rounded-full bg-slate-300" />
          </div>
          <div className="bg-white border border-slate-200/60 rounded-md px-2.5 py-1 text-[9px] sm:text-[10px] text-slate-400 font-semibold truncate max-w-[160px] flex items-center justify-center gap-1.5">
            <LockIcon />
            <span className="truncate">{project.url.replace("https://", "")}</span>
          </div>
          <div className="w-6 sm:w-8" />
        </div>

        {/* Preview — image and iframe modes each get their own aspect
            ratio (see constants above), since only the iframe has a hard
            requirement to match its 1440x900 virtual viewport.
            NOTE: overflow-hidden + border-radius + a transformed <iframe>
            is a known Safari/WebKit clipping bug — the iframe's content can
            render at full, unscaled size outside this box instead of being
            clipped (this is what caused the huge unclipped page bleeding
            through under the card). `isolation: isolate` + a forced
            compositing layer (`translateZ(0)`) make Safari actually respect
            the clip. The other half of the fix is below: the scale
            transform now lives on a wrapper <div>, not the <iframe> itself. */}
        <div
          ref={previewRef}
          className={`relative w-full ${
            hasImage
              ? IMAGE_PREVIEW_ASPECT_RATIO
              : isActive
              ? IFRAME_PREVIEW_ASPECT_RATIO
              : PLACEHOLDER_ASPECT_RATIO
          } bg-white overflow-hidden`}
          style={{ isolation: "isolate", transform: "translateZ(0)" }}
        >
          {hasImage ? (
            <>
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-10 pointer-events-none">
                  <Loader2 className="w-5 h-5 text-orange-600 animate-spin" />
                </div>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover object-top block transition-transform duration-500 group-hover:scale-[1.04]"
                loading="lazy"
                onLoad={() => setImageLoading(false)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/15 via-transparent to-transparent pointer-events-none" />
            </>
          ) : isActive ? (
            <>
              {iframeLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-10 pointer-events-none">
                  <Loader2 className="w-5 h-5 text-orange-600 animate-spin mb-2" />
                  <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400">
                    Loading Preview...
                  </span>
                </div>
              )}
              {previewWidth > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${IFRAME_VIEWPORT_WIDTH}px`,
                    height: `${IFRAME_VIEWPORT_HEIGHT}px`,
                    transform: `scale(${iframeScale})`,
                    transformOrigin: "top left",
                  }}
                >
                  <iframe
                    src={project.url}
                    title={project.title}
                    loading="lazy"
                    onLoad={() => setIframeLoading(false)}
                    style={{
                      pointerEvents: "none",
                      border: 0,
                      display: "block",
                      background: "#fff",
                      width: `${IFRAME_VIEWPORT_WIDTH}px`,
                      height: `${IFRAME_VIEWPORT_HEIGHT}px`,
                    }}
                  />
                </div>
              )}
              {/* transparent overlay so the card, not the iframe, receives drag/click */}
              <div className="absolute inset-0 z-10" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-50 to-orange-50/30 flex flex-col items-center justify-center p-4 text-center">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center mb-2.5"
                style={{ backgroundColor: `${accent}1a`, color: accent }}
              >
                <Sparkles className="w-4.5 h-4.5" />
              </div>
              <h5 className="text-xs sm:text-sm font-black text-slate-800 tracking-tight">
                {project.title}
              </h5>
            </div>
          )}
        </div>

        {/* Type badge */}
        <div className="absolute top-11 sm:top-12 right-3 z-20">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200/70 text-[9px] font-black uppercase tracking-widest text-slate-500 shadow-sm">
            {isMobile ? <Smartphone className="w-3 h-3" /> : <Monitor className="w-3 h-3" />}
            {project.type}
          </span>
        </div>

        {/* Meta */}
        <div className="flex items-start justify-between p-5 pt-4">
          <div className="min-w-0">
            <span
              className="text-[10px] font-black uppercase tracking-widest"
              style={{ color: accent }}
            >
              {project.category}
            </span>
            <h4 className="text-base font-black text-slate-900 mt-1 leading-snug truncate">
              {project.title}
            </h4>
          </div>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 ml-3 transition-transform duration-300 group-hover:rotate-45"
            style={{ backgroundColor: `${accent}16`, color: accent }}
          >
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </a>
  );
}

export function RecentProjectsShowcase() {
  const [recentProjects, setRecentProjects] = useState<RecentProject[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // Pulls from the independent `recentProjects` collection, in the
        // exact order the admin set — nothing here is time-based, and
        // nothing here reads from the `projects` collection.
        const data = await fetchRecentProjects();
        setRecentProjects(data);
      } catch (err) {
        console.error("Failed to load recent projects", err);
        setLoadError(true);
      } finally {
        setLoadingProjects(false);
      }
    })();
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const dragTicking = useRef(false);
  const scrollTicking = useRef(false);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  const triggerPause = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 1200);
  };

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    e.preventDefault();
    setIsMouseDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeftState(sliderRef.current.scrollLeft);
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    triggerPause();
    setTimeout(() => setIsDragging(false), 50);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !sliderRef.current) return;
    e.preventDefault();
    const pageX = e.pageX;
    const offsetLeft = sliderRef.current.offsetLeft;

    if (!dragTicking.current) {
      requestAnimationFrame(() => {
        if (sliderRef.current && isMouseDown) {
          const x = pageX - offsetLeft;
          const walk = x - startX;
          sliderRef.current.scrollLeft = scrollLeftState - walk;
          if (Math.abs(walk) > 5) setIsDragging(true);
        }
        dragTicking.current = false;
      });
      dragTicking.current = true;
    }
  };

  const handleScroll = () => {
    if (!sliderRef.current) return;
    if (!scrollTicking.current) {
      requestAnimationFrame(() => {
        if (sliderRef.current) {
          const { scrollLeft, clientWidth } = sliderRef.current;
          const cards = sliderRef.current.children;
          let closestIndex = 0;
          let closestDistance = Infinity;
          const containerCenter = scrollLeft + clientWidth / 2;

          for (let i = 0; i < cards.length; i++) {
            const card = cards[i] as HTMLElement;
            const cardCenter = card.offsetLeft + card.clientWidth / 2;
            const distance = Math.abs(cardCenter - containerCenter);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = i;
            }
          }

          if (closestIndex !== visibleIndex) setVisibleIndex(closestIndex);
          if (closestIndex !== activeIndex) setActiveIndex(closestIndex);
        }
        scrollTicking.current = false;
      });
      scrollTicking.current = true;
    }
  };

  const scroll = (direction: "left" | "right") => {
    triggerPause();
    const targetIndex = direction === "left" ? activeIndex - 1 : activeIndex + 1;
    if (targetIndex >= 0 && targetIndex < recentProjects.length) {
      scrollToCard(targetIndex);
    }
  };

  const scrollToCard = (index: number) => {
    if (!sliderRef.current) return;
    triggerPause();
    const cards = sliderRef.current.children;
    if (cards[index]) {
      const card = cards[index] as HTMLElement;
      const containerWidth = sliderRef.current.clientWidth;
      const targetScroll = card.offsetLeft - (containerWidth - card.clientWidth) / 2;
      sliderRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
      setActiveIndex(index);
    }
  };

  if (loadingProjects) {
    return (
      <section className="rh-showcase rh-showcase-skeleton" aria-busy="true" aria-label="Loading recent projects">
        <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
      </section>
    );
  }

  // Fail quietly — don't show a broken section if Firestore errors or there's no data yet.
  if (loadError || recentProjects.length === 0) return null;

  return (
    <section id="recent-projects" className="rh-showcase relative overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: recentProjectsStyles }} />
      <style jsx global>{`
        #recent-projects, #recent-projects * { font-family: var(--font-dm-sans), sans-serif; }
        #recent-projects .slider-track::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="absolute top-0 left-0 w-[32rem] h-[32rem] bg-orange-50/70 rounded-full blur-[130px] -ml-56 -mt-56 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-amber-50/60 rounded-full blur-[120px] -mr-48 -mb-48 pointer-events-none" />

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-7">
          <div>
            <span className="rh-eyebrow">Fresh off the build</span>
            <h2 className="rh-display rh-showcase-title">
              Recent projects.
            </h2>
          </div>
          <p className="rh-lead max-w-sm">
            A hand-picked selection of our favourite work across desktop and mobile.
          </p>
        </div>

        <div className="relative group/slider">
          <button
            onClick={() => scroll("left")}
            disabled={activeIndex === 0}
            className="rp-nav-btn absolute left-[-18px] top-[42%] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/95 backdrop-blur-md border border-slate-100 shadow-xl items-center justify-center text-slate-800 hover:text-orange-600 hover:shadow-2xl active:scale-95 opacity-0 group-hover/slider:opacity-100 hidden md:flex cursor-pointer disabled:opacity-0"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={activeIndex === recentProjects.length - 1}
            className="rp-nav-btn absolute right-[-18px] top-[42%] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/95 backdrop-blur-md border border-slate-100 shadow-xl items-center justify-center text-slate-800 hover:text-orange-600 hover:shadow-2xl active:scale-95 opacity-0 group-hover/slider:opacity-100 hidden md:flex cursor-pointer disabled:opacity-0"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onScroll={handleScroll}
            onTouchStart={() => setIsMouseDown(true)}
            onTouchEnd={() => {
              setIsMouseDown(false);
              triggerPause();
            }}
            className={`slider-track relative flex w-full gap-6 md:gap-7 overflow-x-auto snap-x snap-mandatory py-4 cursor-grab select-none px-1 ${
              isMouseDown ? "cursor-grabbing" : ""
            }`}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {recentProjects.map((project, index) => {
              const isActive = Math.abs(index - visibleIndex) <= 2;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.4 }}
                >
                  <RecentCard project={project} isDragging={isDragging} isActive={isActive} />
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-center items-center gap-2.5 mt-10">
            {recentProjects.map((project, idx) => (
              <button
                key={`${project.id}-dot`}
                onClick={() => scrollToCard(idx)}
                className={`rp-dot h-2 rounded-full cursor-pointer ${
                  activeIndex === idx ? "w-6 bg-orange-600" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}