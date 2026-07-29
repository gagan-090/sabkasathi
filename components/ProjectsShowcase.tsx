"use client";

import React, { useEffect, useState, useRef } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ExternalLink } from "lucide-react";

const styles = `

  .pj-root { font-family: var(--font-dm-sans), sans-serif; position: relative; }

  .pj-blob {
    position: absolute; z-index: 0; pointer-events: none; filter: blur(80px);
    background: linear-gradient(135deg, rgba(255, 210, 0, 0.14), rgba(224, 102, 0, 0.1));
    animation: pjMorph 22s ease-in-out infinite;
  }
  .pj-blob-a { top: -6%; left: 4%; width: 30vw; height: 30vw; max-width: 420px; max-height: 420px; }
  .pj-blob-b {
    bottom: -10%; right: 2%; width: 26vw; height: 26vw; max-width: 360px; max-height: 360px;
    background: linear-gradient(135deg, rgba(224, 102, 0, 0.08), rgba(255, 210, 0, 0.12));
    animation-duration: 26s;
  }
  @keyframes pjMorph {
    0%, 100% { border-radius: 42% 58% 65% 35% / 45% 40% 60% 55%; transform: scale(1) rotate(0deg); }
    50%      { border-radius: 58% 42% 38% 62% / 60% 55% 45% 40%; transform: scale(1.06) rotate(8deg); }
  }
  @media (prefers-reduced-motion: reduce) { .pj-blob { animation: none; } }

  .pj-eyebrow {
    position: relative; display: inline-flex; align-items: center; gap: 0.5rem;
    border-radius: 999px; padding: 0.4rem 1.05rem 0.4rem 0.8rem;
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
    font-weight: 500; font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(29,29,31,0.6);
  }
  .pj-eyebrow::before {
    content: ''; position: absolute; inset: 0; z-index: -1; border-radius: 999px; padding: 1px;
    background: linear-gradient(135deg, rgba(255,255,255,0.80) 0%, rgba(255, 149, 0, 0.45) 30%, rgba(224, 102, 0, 0.18) 55%, rgba(224, 102, 0, 0.50) 80%, rgba(255,255,255,0.70) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
  }
  .pj-eyebrow-dot {
    width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
    background: #f38200; box-shadow: 0 0 8px rgba(255, 149, 0, 0.7);
    animation: pjDotPulse 2.4s ease-in-out infinite;
  }
  @keyframes pjDotPulse {
    0%,100% { box-shadow: 0 0 6px rgba(255, 149, 0, .7), 0 0 0 0 rgba(255, 149, 0, .3); }
    50%     { box-shadow: 0 0 12px rgba(255, 149, 0, .9), 0 0 0 4px rgba(255, 149, 0, 0); }
  }

  .pj-title { color: #1d1d1f; letter-spacing: -0.025em; font-weight: 600; }
  .pj-sub { color: rgba(29,29,31,0.5); font-weight: 400; }

  /* ── Project card ───────────────────────────────────────── */
  .pj-card {
    position: relative; overflow: hidden; isolation: isolate;
    background: rgba(255,255,255,0.55);
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
    border: 1px solid rgba(255,255,255,0.7);
    box-shadow: 0 14px 36px rgba(29,29,31,0.07);
    border-radius: 22px;
    transition: transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s ease, border-color 0.4s ease;
  }
  .pj-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 24px 54px rgba(224, 102, 0, 0.16), 0 6px 16px rgba(0,0,0,0.07);
  }
  .pj-card-fill {
    position: absolute; inset: 0; z-index: 0;
    background: linear-gradient(135deg, #ffd200 0%, #f38200 40%, #d2540a 75%, #a8420a 100%);
    transform: translateY(100%);
    transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
  }
  .pj-card:hover .pj-card-fill { transform: translateY(0); }

  .pj-card-inner { position: relative; z-index: 1; display: flex; flex-direction: column; justify-content: space-between; height: 100%; }

  .pj-cat {
    display: inline-block; width: fit-content;
    font-weight: 500; font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase;
    border-radius: 999px; padding: 0.3rem 0.75rem;
    background: rgba(255, 210, 0, 0.10); color: #d2540a;
    border: 1px solid rgba(224, 102, 0, 0.14);
    transition: background 0.4s ease, color 0.4s ease, border-color 0.4s ease;
  }
  .pj-card:hover .pj-cat { background: rgba(255,255,255,0.18); color: #fff; border-color: rgba(255,255,255,0.25); }

  .pj-name { color: #1d1d1f; font-weight: 600; letter-spacing: -0.015em; transition: color 0.4s ease; }
  .pj-card:hover .pj-name { color: #fff; }

  .pj-desc { color: rgba(29,29,31,0.5); font-weight: 400; transition: color 0.4s ease; }
  .pj-card:hover .pj-desc { color: rgba(255,255,255,0.85); }

  .pj-tech {
    font-weight: 500; font-size: 0.62rem;
    background: rgba(0,0,0,0.03); color: rgba(29,29,31,0.55);
    border: 1px solid rgba(0,0,0,0.06);
    border-radius: 7px; padding: 0.2rem 0.5rem;
    transition: background 0.4s ease, color 0.4s ease, border-color 0.4s ease;
  }
  .pj-card:hover .pj-tech { background: rgba(255,255,255,0.14); color: #fff; border-color: rgba(255,255,255,0.2); }
  .pj-tech-more { color: rgba(29,29,31,0.32); transition: color 0.4s ease; }
  .pj-card:hover .pj-tech-more { color: rgba(255,255,255,0.7); }

  .pj-cta {
    width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.4rem;
    font-weight: 600; font-size: 0.66rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: #fff; padding: 0.75rem 0; border-radius: 12px;
    background: linear-gradient(135deg, #ffd200, #d2540a);
    transition: background 0.35s ease, color 0.35s ease, transform 0.35s cubic-bezier(0.25,1,0.5,1);
  }
  .pj-cta svg { transition: transform 0.35s cubic-bezier(0.25,1,0.5,1); }
  .pj-cta:hover svg { transform: translate(2px, -2px); }
  .pj-card:hover .pj-cta { background: #fff; color: #d2540a; }
  .pj-card:hover .pj-cta:hover { background: rgba(255,255,255,0.92); }

  /* ── Loading ── */
  .pj-loading-spinner { width: 26px; height: 26px; position: relative; }
  .pj-tick {
    position: absolute; top: 0; left: 50%; width: 2px; height: 7px;
    margin-left: -1px; border-radius: 1px;
    background: #d2540a;
    transform-origin: 1px 13px;
    animation: pjFade 1.1s linear infinite;
  }
  @keyframes pjFade { 0% { opacity: 1; } 100% { opacity: 0.12; } }
  .pj-loading-label { color: rgba(29,29,31,0.4); font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; }
`;

interface Project {
  id: string;
  name: string;
  category: string;
  projectUrl: string;
  description: string;
  technologies: string[];
  status: "active" | "hidden";
  order: number;
}

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="pj-card w-[285px] sm:w-[320px] shrink-0 p-6 h-full">
      <div className="pj-card-fill" aria-hidden="true" />
      <div className="pj-card-inner">
        <div>
          <div className="pj-cat mb-4">{project.category}</div>

          <h3 className="pj-name text-base sm:text-lg leading-snug mb-2 truncate">
            {project.name}
          </h3>

          <p className="pj-desc text-xs leading-relaxed line-clamp-2 mb-4">
            {project.description}
          </p>
        </div>

        <div>
          <div className="flex flex-wrap gap-1.5 mb-5 max-h-[32px] overflow-hidden">
            {project.technologies.slice(0, 4).map((tech, idx) => (
              <span key={idx} className="pj-tech">
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="pj-tech-more text-[9px] font-medium px-1.5 py-0.5">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pj-cta"
          >
            View project
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ items, direction = "left" }: { items: Project[]; direction: "left" | "right" }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const updateScrollBounds = () => {
      if (containerRef.current) {
        const scrollW = containerRef.current.scrollWidth;
        const clientW = containerRef.current.clientWidth;
        setMaxScroll(Math.max(0, scrollW - clientW));
      }
    };

    updateScrollBounds();
    window.addEventListener("resize", updateScrollBounds);
    return () => window.removeEventListener("resize", updateScrollBounds);
  }, [items]);

  const animationClass = direction === "left" ? "animate-mirror-left" : "animate-mirror-right";

  return (
    <div className="w-full overflow-hidden" ref={containerRef}>
      <div
        className={`${animationClass} flex gap-6 py-2`}
        style={{ "--max-scroll": `-${maxScroll}px` } as React.CSSProperties}
      >
        {items.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export function ProjectsShowcase() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(
          collection(db, "projects"),
          where("active", "==", true)
        );
        const snapshot = await getDocs(q);
        const fetched: Project[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          fetched.push({
            id: doc.id,
            name: data.name || "",
            category: data.category || "",
            projectUrl: data.projectUrl || "",
            description: data.description || "",
            technologies: data.technologies || [],
            status: data.status || "active",
            order: typeof data.order === "number" ? data.order : 0,
          });
        });
        fetched.sort((a, b) => a.order - b.order);
        setProjects(fetched);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="pj-root flex flex-col items-center justify-center py-16 gap-3">
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <div className="pj-loading-spinner" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="pj-tick"
              style={{ transform: `rotate(${i * 30}deg)`, animationDelay: `${-(1.1 - (i * 1.1) / 12)}s` }}
            />
          ))}
        </div>
        <p className="pj-loading-label text-[10px]">Loading projects</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return null;
  }

  const isMarqueeEnabled = projects.length >= 7;
  const row1 = projects.slice(0, 7);
  const row2 = projects.slice(7);

  return (
    <div className="pj-root w-full overflow-hidden py-6">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="pj-blob pj-blob-a" aria-hidden="true" />
      <div className="pj-blob pj-blob-b" aria-hidden="true" />

      {/* Title */}
      <div className="container mx-auto px-4 mb-12 text-center max-w-[1400px] relative z-10">
        <span className="pj-eyebrow">
          <span className="pj-eyebrow-dot" />
          Portfolio
        </span>
        <h2 className="pj-title text-3xl md:text-4xl mt-4">
          Our recent projects
        </h2>
        <p className="pj-sub text-xs md:text-sm mt-2 max-w-lg mx-auto">
          Explore real projects delivered for businesses, startups, and local brands.
        </p>
      </div>

      {/* Desktop */}
      <div className="hidden md:block max-w-[1400px] mx-auto px-4 relative z-10">
        {isMarqueeEnabled ? (
          <div className="flex flex-col gap-6 relative w-full overflow-hidden">
            <MarqueeRow items={row1} direction="right" />
            {row2.length > 0 && <MarqueeRow items={row2} direction="left" />}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="flex md:hidden w-full overflow-x-auto snap-x snap-mandatory gap-6 px-4 py-4 scrollbar-none relative z-10">
        {projects.map((project) => (
          <div key={project.id} className="snap-start shrink-0">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}