"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { fetchProjectsByType, Project } from "@/lib/project";
import { AppScreen } from "@/components/mockups";
import { PhoneFrame } from "@/components/mockups/PhoneFrame";

/* The device itself — bezel, punch-hole, status bar and the scale down from the
   390px virtual viewport — now lives in components/mockups/PhoneFrame, because
   the industry rows in IndustriesSection render into the same phone and two
   hand-maintained copies of that frame would drift.

   Until this section was rewritten it scaled a live <iframe> of each client's
   site. That is gone: three third-party sites were booting inside our home
   page, each with its own fonts, analytics and hero images, and every card sat
   on "Loading Demo…" until they did. What runs in the frames now are real React
   apps built from those clients' own content — see components/mockups. Nothing
   in this section touches the network. */

interface PhoneCardProps {
  project: Project;
  /** False until the card has been scrolled into the carousel — see below. */
  isActive: boolean;
  /** Called as a pointer enters/leaves the screen, so the carousel can stop
      creeping while someone is tapping around inside an app. */
  onHold: (holding: boolean) => void;
}

function PhoneCard({ project, isActive, onHold }: PhoneCardProps) {
  return (
    <PhoneFrame accent={project.accentColor ?? "#f38200"} badge="Live" onHold={onHold}>
      <AppScreen project={project} active={isActive} />
    </PhoneFrame>
  );
}

export function PortfolioShowcase({
  initialProjects = [],
}: {
  initialProjects?: Project[];
}) {
  // See BrowserPortfolioShowcase — server-supplied projects skip the fetch
  // entirely so the phones are on screen immediately.
  const [phoneProjects, setPhoneProjects] = useState<Project[]>(initialProjects);
  const [loadingProjects, setLoadingProjects] = useState(initialProjects.length === 0);

  const hasServerData = initialProjects.length > 0;

  useEffect(() => {
    if (hasServerData) return;
    (async () => {
      try {
        const data = await fetchProjectsByType("mobile");
        setPhoneProjects(data.sort((a, b) => a.order - b.order));
      } catch (err) {
        console.error("Failed to load mobile projects", err);
      } finally {
        setLoadingProjects(false);
      }
    })();
  }, [hasServerData]);

  /* Which card is centred. Drives the arrow buttons; `visibleIndex`, which used
     to shadow it with an identical value, went with the activation window. */
  const [activeIndex, setActiveIndex] = useState(0);

  /* Which cards have been seen, and so may run their intro animation. Every
     phone is fully rendered from the start — there is nothing to load — this
     only decides when the meters sweep up and the activity line draws, so the
     motion happens where someone can watch it.
     Asking the browser which cards are actually visible gets this right at
     every breakpoint, where an index-based window ("the centred card ± 1")
     left the third phone on a desktop sitting inert beside two animated ones.
     Activation stays one-way on purpose: replaying the sweep every time the
     carousel drifts past would be a twitch, not a flourish. */
  const [activated, setActivated] = useState<Set<number>>(new Set());
  const [isPaused, setIsPaused] = useState(false);
  /* True while a pointer is inside one of the phone screens. The apps in there
     are tappable, and a track that keeps creeping sideways under your finger
     makes them miserable to use. */
  const [isHolding, setIsHolding] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const dragTicking = useRef(false);
  const scrollTicking = useRef(false);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const [paddingStyle, setPaddingStyle] = useState({ paddingLeft: '20px', paddingRight: '20px' });

  /* The track is padded so the row of phones lands centred in the section.
     Each entry is the width of the phones on screen at that breakpoint plus the
     gaps between them — so these numbers are a direct function of the card
     widths and the `gap-*` classes on the track, and have to move whenever
     either does. They were already drifting (270/280 for cards that are 268/280,
     a 20px gap for a track set to 24) which is what pulled the row slightly off
     centre; the table below is derived rather than hand-tuned. */
  useEffect(() => {
    const updatePadding = () => {
      const width = window.innerWidth;

      // [card width at this breakpoint, gap on the track, phones on screen]
      const [card, gap, count] =
        width < 640 ? [250, 32, 1]        // base card, gap-8
        : width < 768 ? [268, 32, 1]      // sm card, gap-8
        : width < 1024 ? [280, 48, 2]     // md card, md:gap-12
        : width < 1440 ? [280, 48, 3]
        : [280, 48, 4];

      const row = card * count + gap * (count - 1);
      const inset = `calc((100% - ${row}px) / 2)`;
      setPaddingStyle({ paddingLeft: inset, paddingRight: inset });
    };
    updatePadding();
    window.addEventListener('resize', updatePadding);
    return () => window.removeEventListener('resize', updatePadding);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || phoneProjects.length === 0) return;

    const cards = Array.from(slider.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const arrived = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => cards.indexOf(entry.target as HTMLElement))
          .filter((index) => index >= 0);

        if (arrived.length === 0) return;
        setActivated((prev) => {
          const next = new Set(prev);
          arrived.forEach((index) => next.add(index));
          return next.size === prev.size ? prev : next;
        });
      },
      // Scoped to the slider, not the window: a card can be scrolled out of the
      // carousel while the section itself is still in full view.
      { root: slider, threshold: 0.35 },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [phoneProjects.length]);

  const triggerPause = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 1200);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || phoneProjects.length === 0) return;

    let animationFrameId: number;
    let lastTime = 0;
    const speed = 0.045;

    const step = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const elapsed = timestamp - lastTime;
      lastTime = timestamp;

      if (!isMouseDown && !isPaused && !isHolding && slider) {
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        if (maxScroll > 0) {
          let next = slider.scrollLeft + speed * elapsed;
          if (next >= maxScroll) next = maxScroll;
          slider.scrollLeft = next;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };
    animationFrameId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [isMouseDown, isPaused, isHolding, phoneProjects.length]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    e.preventDefault();
    setIsMouseDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeftState(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    triggerPause();
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

          if (closestIndex !== activeIndex) {
            setActiveIndex(closestIndex);
          }
        }
        scrollTicking.current = false;
      });
      scrollTicking.current = true;
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    triggerPause();
    const targetIndex = direction === 'left' ? activeIndex - 1 : activeIndex + 1;
    if (targetIndex >= 0 && targetIndex < phoneProjects.length) {
      scrollToCard(targetIndex);
    }
  };

  const scrollToCard = (index: number) => {
    if (sliderRef.current) {
      triggerPause();
      const cards = sliderRef.current.children;
      if (cards[index]) {
        const card = cards[index] as HTMLElement;
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
      <section className="rh-showcase rh-showcase-skeleton" aria-busy="true" aria-label="Loading app demos">
        <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
      </section>
    );
  }

  if (phoneProjects.length === 0) {
    return null;
  }

  return (
    <section id="portfolio" className="rh-showcase relative overflow-hidden">
      <style jsx global>{`
        #portfolio, #portfolio * { font-family: var(--font-dm-sans), sans-serif; }
        #portfolio .slider-track::-webkit-scrollbar { display: none; }
        /* The apps inside the frames scroll their own screens. A real phone
           does not draw a scrollbar down the middle of its UI, and the one
           here would also be sitting on a 0.64 scale. */
        #portfolio .phone-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        #portfolio .phone-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="container mx-auto max-w-5xl px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="rh-eyebrow">Mobile app concepts</span>
            <h2 className="rh-display rh-showcase-title">
              The same business, as an app.
            </h2>
          </div>
          <p className="rh-lead max-w-sm">
            Every screen is drawn from a real client&apos;s site — their words, their
            offerings, their published numbers — reimagined in glass. Open the live
            site under any phone to compare.
          </p>
        </div>

        <div className="relative group/slider max-w-5xl mx-auto">
          <button
            onClick={() => scroll('left')}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md border border-slate-100 shadow-xl items-center justify-center text-slate-800 hover:text-orange-600 hover:scale-110 active:scale-95 transition-all opacity-0 group-hover/slider:opacity-100 hidden md:flex cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md border border-slate-100 shadow-xl items-center justify-center text-slate-800 hover:text-orange-600 hover:scale-110 active:scale-95 transition-all opacity-0 group-hover/slider:opacity-100 hidden md:flex cursor-pointer"
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
            className={`slider-track relative flex w-full gap-8 md:gap-12 overflow-x-auto snap-x snap-mandatory py-8 cursor-grab select-none ${
              isMouseDown ? 'cursor-grabbing' : ''
            }`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              paddingLeft: paddingStyle.paddingLeft,
              paddingRight: paddingStyle.paddingRight,
              scrollPaddingLeft: paddingStyle.paddingLeft,
              scrollPaddingRight: paddingStyle.paddingRight,
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)'
            }}
          >
            {phoneProjects.map((project, index) => {
              const isActive = activated.has(index);
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  className="flex-shrink-0 snap-center flex flex-col items-center"
                  style={{
                    willChange: 'transform',
                    transform: 'translate3d(0, 0, 0)'
                  }}
                >
                  <PhoneCard project={project} isActive={isActive} onHold={setIsHolding} />

                  <div className="text-center mt-4 select-none">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{project.category}</span>
                    <h4 className="text-sm font-black text-slate-800 mt-0.5">{project.title}</h4>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-extrabold hover:underline inline-flex items-center gap-1 mt-1"
                      style={{ color: project.accentColor ?? "#f38200" }}
                    >
                      Open live site
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                        <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>

          
        </div>
      </div>
    </section>
  );
}