"use client";

import { motion } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { fetchProjectsByType, Project } from "@/lib/project";

const LockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="8" height="8" viewBox="0 0 10 10" fill="none" {...props}>
    <rect x="2" y="4.2" width="6" height="4.4" rx="1" stroke="#10b981" strokeWidth="1" />
    <path d="M3.2 4.2V3a1.8 1.8 0 0 1 3.6 0v1.2" stroke="#10b981" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

interface LaptopCardProps {
  project: Project;
  isDragging: boolean;
  isActive: boolean;
}

function LaptopCard({ project, isDragging, isActive }: LaptopCardProps) {
  const [iframeLoading, setIframeLoading] = useState(true);

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        if (isDragging) {
          e.preventDefault();
        }
      }}
      className="w-full flex flex-col items-center hover:scale-[1.01] transition-transform duration-300 cursor-pointer select-none"
    >
      <div className="w-full aspect-[16/10] relative rounded-t-xl sm:rounded-t-2xl border-[5px] sm:border-[8px] border-slate-800 bg-slate-900 overflow-hidden shadow-2xl flex flex-col z-10">
        <div className="h-6 sm:h-8 bg-slate-50 border-b border-slate-200/80 flex items-center px-2.5 sm:px-4 justify-between shrink-0 select-none z-20">
          <div className="flex gap-1 sm:gap-1.5 shrink-0">
            <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-slate-300" />
            <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-slate-300" />
            <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-slate-300" />
          </div>

          <div className="bg-white border border-slate-200/60 rounded px-2 sm:px-3 py-0.5 text-[8px] sm:text-[10px] text-slate-400 font-medium truncate max-w-[120px] sm:max-w-[280px] text-center flex items-center justify-center gap-1 shadow-sm">
            <LockIcon />
            <span className="truncate">{project.url.replace("https://", "")}</span>
          </div>

          <div className="w-8 sm:w-12" />
        </div>

        <div className="relative w-full flex-1 bg-white overflow-hidden z-10">
          {isActive ? (
            <>
              {iframeLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-20 pointer-events-none">
                  <Loader2 className="w-5 h-5 sm:w-7 sm:h-7 text-orange-600 animate-spin mb-2" />
                  <span className="text-[8px] sm:text-[10px] uppercase font-bold tracking-widest text-slate-400">Loading Live Preview...</span>
                </div>
              )}

              <iframe
                src={project.url}
                title={project.title}
                className="w-full h-full border-none block bg-white"
                /* This frame is only mounted for the active card, i.e. it is
                   already on screen — lazy just delays the preview the user
                   is looking at. */
                loading="eager"
                onLoad={() => setIframeLoading(false)}
                style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
              />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-50 to-orange-50/20 flex flex-col items-center justify-center p-4 text-center select-none">
              <div className="w-10 h-10 rounded-2xl bg-orange-600/10 flex items-center justify-center text-orange-700 mb-2">
                <Sparkles className="w-5 h-5" />
              </div>
              <h5 className="text-[10px] sm:text-xs font-black text-slate-800 tracking-tight">{project.title}</h5>
              <p className="text-[8px] sm:text-[9px] text-slate-400 mt-0.5 font-medium max-w-[150px]">{project.description}</p>
              <span className="mt-2 text-[8px] font-black uppercase tracking-widest text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                Activate Preview
              </span>
            </div>
          )}

          <div className="absolute inset-0 z-10 bg-transparent" />
        </div>
      </div>

      <div className="w-full h-2 sm:h-3 bg-slate-800 rounded-b-lg sm:rounded-b-xl shadow-lg border-t border-slate-700 flex justify-center items-start shrink-0 z-20">
        <div className="w-12 sm:w-20 h-0.5 sm:h-1 bg-slate-950/40 rounded-b-md" />
      </div>

      <div className="text-center mt-3 select-none">
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{project.category}</span>
        <h4 className="text-xs sm:text-sm font-black text-slate-800 mt-0.5">{project.title}</h4>
      </div>
    </a>
  );
}

export function BrowserPortfolioShowcase({
  initialProjects = [],
}: {
  initialProjects?: Project[];
}) {
  // When app/page.tsx supplies the projects they are already in the HTML, so
  // the demo paints on first frame — no Firestore round-trip, no skeleton.
  const [portfolioProjects, setPortfolioProjects] = useState<Project[]>(initialProjects);
  const [loadingProjects, setLoadingProjects] = useState(initialProjects.length === 0);

  const hasServerData = initialProjects.length > 0;

  useEffect(() => {
    if (hasServerData) return;
    (async () => {
      try {
        const data = await fetchProjectsByType("desktop");
        setPortfolioProjects(data.sort((a, b) => a.order - b.order));
      } catch (err) {
        console.error("Failed to load desktop projects", err);
      } finally {
        setLoadingProjects(false);
      }
    })();
  }, [hasServerData]);

  const infiniteProjects = [...portfolioProjects, ...portfolioProjects, ...portfolioProjects];

  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleIndex, setVisibleIndex] = useState(portfolioProjects.length);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const dragTicking = useRef(false);
  const scrollTicking = useRef(false);

  const [isInteracting, setIsInteracting] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  const triggerPause = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 1200);
  };

  useEffect(() => {
    if (sliderRef.current && portfolioProjects.length > 0) {
      const singleSetWidth = sliderRef.current.scrollWidth / 3;
      sliderRef.current.scrollLeft = singleSetWidth;
      setVisibleIndex(portfolioProjects.length);
    }
  }, [portfolioProjects.length]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || portfolioProjects.length === 0) return;

    let animationFrameId: number;
    let lastTime = 0;
    const speed = 0.11;

    const scrollStep = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const elapsed = timestamp - lastTime;
      lastTime = timestamp;

      if (!isInteracting && !isPaused && slider.scrollWidth > 0) {
        slider.scrollLeft += speed * elapsed;

        const singleSetWidth = slider.scrollWidth / 3;
        if (singleSetWidth > 0) {
          if (slider.scrollLeft >= singleSetWidth * 2) {
            slider.scrollLeft -= singleSetWidth;
          } else if (slider.scrollLeft <= 0) {
            slider.scrollLeft += singleSetWidth;
          }
        }
      }

      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, [isInteracting, isPaused, portfolioProjects.length]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    e.preventDefault();
    setIsInteracting(true);
    setStartX(e.pageX);
    setScrollLeftState(sliderRef.current.scrollLeft);
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isInteracting) {
      setIsInteracting(false);
      setIsDragging(false);
      handleScroll();
    }
  };

  const handleMouseUp = () => {
    if (isInteracting) {
      setIsInteracting(false);
      triggerPause();
      setTimeout(() => {
        handleScroll();
      }, 50);
      setTimeout(() => {
        setIsDragging(false);
      }, 50);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isInteracting || !sliderRef.current) return;
    e.preventDefault();

    const pageX = e.pageX;

    if (!dragTicking.current) {
      requestAnimationFrame(() => {
        if (sliderRef.current && isInteracting) {
          const walk = pageX - startX;
          sliderRef.current.scrollLeft = scrollLeftState - walk;
          if (Math.abs(walk) > 5) {
            setIsDragging(true);
          }
        }
        dragTicking.current = false;
      });
      dragTicking.current = true;
    }
  };

  const handleScroll = () => {
    if (!sliderRef.current || portfolioProjects.length === 0) return;
    if (isInteracting) return;

    if (!scrollTicking.current) {
      requestAnimationFrame(() => {
        if (sliderRef.current && !isInteracting) {
          const { scrollLeft, clientWidth } = sliderRef.current;
          const cards = sliderRef.current.children;
          let closestIndex = portfolioProjects.length;
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

          if (closestIndex !== visibleIndex) {
            setVisibleIndex(closestIndex);
          }

          const normalizedIndex = closestIndex % portfolioProjects.length;
          if (normalizedIndex !== activeIndex) {
            setActiveIndex(normalizedIndex);
          }

          const singleSetWidth = sliderRef.current.scrollWidth / 3;
          if (singleSetWidth > 0) {
            if (scrollLeft >= singleSetWidth * 2) {
              sliderRef.current.scrollLeft -= singleSetWidth;
            } else if (scrollLeft <= 2) {
              sliderRef.current.scrollLeft += singleSetWidth;
            }
          }
        }
        scrollTicking.current = false;
      });
      scrollTicking.current = true;
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      triggerPause();
      const singleCardWidth = sliderRef.current.clientWidth * 0.42;
      const targetScroll = direction === 'left'
        ? sliderRef.current.scrollLeft - singleCardWidth
        : sliderRef.current.scrollLeft + singleCardWidth;

      sliderRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  const scrollToCard = (index: number) => {
    if (sliderRef.current) {
      triggerPause();
      const cards = sliderRef.current.children;
      const targetIdx = index + portfolioProjects.length;
      if (cards[targetIdx]) {
        const card = cards[targetIdx] as HTMLElement;
        const containerWidth = sliderRef.current.clientWidth;
        const targetScroll = card.offsetLeft - (containerWidth - card.clientWidth) / 2;

        sliderRef.current.scrollTo({
          left: targetScroll,
          behavior: 'smooth',
        });
        setActiveIndex(index);
      }
    }
  };

  if (loadingProjects) {
    return (
      <section className="rh-showcase rh-showcase-tint rh-showcase-skeleton" aria-busy="true" aria-label="Loading website demos">
        <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
      </section>
    );
  }

  if (portfolioProjects.length === 0) {
    return null;
  }

  return (
    <section id="browser-portfolio" className="rh-showcase rh-showcase-tint relative overflow-hidden">
      <style jsx global>{`
        #browser-portfolio, #browser-portfolio * { font-family: var(--font-dm-sans), sans-serif; }
        #browser-portfolio .cursor-grab::-webkit-scrollbar { display: none; }

        @media (max-width: 400px) {
          #browser-portfolio .slider-track {
            padding-left: calc((100% - 92vw) / 2) !important;
            padding-right: calc((100% - 92vw) / 2) !important;
            scroll-padding-left: calc((100% - 92vw) / 2) !important;
            scroll-padding-right: calc((100% - 92vw) / 2) !important;
          }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          #browser-portfolio .slider-track {
            padding-left: calc((100% - 62vw) / 2) !important;
            padding-right: calc((100% - 62vw) / 2) !important;
            scroll-padding-left: calc((100% - 62vw) / 2) !important;
            scroll-padding-right: calc((100% - 62vw) / 2) !important;
          }
        }
        @media (min-width: 1024px) and (max-width: 1439px) {
          #browser-portfolio .slider-track {
            padding-left: calc((100% - 42vw) / 2) !important;
            padding-right: calc((100% - 42vw) / 2) !important;
            scroll-padding-left: calc((100% - 42vw) / 2) !important;
            scroll-padding-right: calc((100% - 42vw) / 2) !important;
          }
        }
        @media (min-width: 1440px) {
          #browser-portfolio .slider-track {
            padding-left: calc((100% - 34vw) / 2) !important;
            padding-right: calc((100% - 34vw) / 2) !important;
            scroll-padding-left: calc((100% - 34vw) / 2) !important;
            scroll-padding-right: calc((100% - 34vw) / 2) !important;
          }
        }
      `}</style>

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">

        <div className="flex flex-col items-center justify-center text-center mb-10 max-w-3xl mx-auto">
          <span className="rh-eyebrow">Live website demos</span>
          <h2 className="rh-display rh-showcase-title">
            Real sites, running right here.
          </h2>
          <p className="rh-lead max-w-xl">
            Every site below is live. Scroll the frames, click through the pages — this is
            the finished work, not a mockup of it.
          </p>
        </div>

        <div className="relative group/slider max-w-7xl mx-auto">
          <button
            onClick={() => scroll('left')}
            className="absolute left-1 lg:left-3 top-[42%] -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/65 shadow-xl items-center justify-center text-slate-800 hover:text-orange-600 hover:scale-110 active:scale-95 transition-all opacity-0 group-hover/slider:opacity-100 hidden md:flex cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-1 lg:right-3 top-[42%] -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/65 shadow-xl items-center justify-center text-slate-800 hover:text-orange-600 hover:scale-110 active:scale-95 transition-all opacity-0 group-hover/slider:opacity-100 hidden md:flex cursor-pointer"
            aria-label="Next Slide"
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
            onTouchStart={() => setIsInteracting(true)}
            onTouchEnd={() => {
              setIsInteracting(false);
              triggerPause();
            }}
            className={`slider-track relative flex w-full gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory py-4 cursor-grab select-none ${
              isInteracting ? 'cursor-grabbing' : ''
            }`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              paddingLeft: 'calc((100vw - 88vw) / 2)',
              paddingRight: 'calc((100vw - 88vw) / 2)',
              scrollPaddingLeft: 'calc((100vw - 88vw) / 2)',
              scrollPaddingRight: 'calc((100vw - 88vw) / 2)',
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)'
            }}
          >
            {infiniteProjects.map((project, index) => {
              const isActive = Math.abs(index - visibleIndex) <= 1;
              return (
                <motion.div
                  key={`${project.id}-${index}`}
                  className="flex-shrink-0 snap-center w-[88vw] sm:w-[62vw] lg:w-[42vw] 2xl:w-[34vw] flex flex-col items-center"
                  style={{
                    willChange: 'transform',
                    transform: 'translate3d(0, 0, 0)'
                  }}
                >
                  <LaptopCard
                    project={project}
                    isDragging={isDragging}
                    isActive={isActive}
                  />
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-center items-center gap-2.5 mt-8 relative z-20">
            {portfolioProjects.map((project, idx) => (
              <button
                key={`${project.id}-dot`}
                onClick={() => scrollToCard(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx
                    ? 'w-5 bg-orange-600'
                    : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        
      </div>
    </section>
  );
}