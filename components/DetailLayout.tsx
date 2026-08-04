"use client";

import { motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { InteractiveBackground } from "./InteractiveBackground";
import { Card } from "./ui/Card";
import { Button, ButtonLink } from "./ui/LiquidButton";
import Link from "next/link";
import { Footer } from "./Footer";
import { DetailedContent } from "@/lib/content";
import { SeoAppShowcase } from "./seo/SeoAppShowcase";

interface DetailLayoutProps {
  content: DetailedContent;
  category: string;
}

const styles = `

  .dl-root { font-family: var(--font-dm-sans), sans-serif; }

  .dl-blob {
    position: absolute; z-index: 0; pointer-events: none; filter: blur(80px);
    background: linear-gradient(135deg, rgba(255, 210, 0, 0.16), rgba(224, 102, 0, 0.12));
    animation: dlMorph 20s ease-in-out infinite;
  }
  .dl-blob-a { top: 4%; right: -6%; width: 32vw; height: 32vw; max-width: 460px; max-height: 460px; }
  .dl-blob-b {
    top: 60%; left: -8%; width: 26vw; height: 26vw; max-width: 380px; max-height: 380px;
    background: linear-gradient(135deg, rgba(224, 102, 0, 0.10), rgba(255, 210, 0, 0.14));
    animation-duration: 24s;
  }
  @media (prefers-reduced-motion: reduce) { .dl-blob { animation: none; } }
  @keyframes dlMorph {
    0%, 100% { border-radius: 42% 58% 65% 35% / 45% 40% 60% 55%; transform: scale(1) rotate(0deg); }
    50%      { border-radius: 58% 42% 38% 62% / 60% 55% 45% 40%; transform: scale(1.06) rotate(8deg); }
  }

  .dl-crumb {
    position: relative; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase;
    background: rgba(255,255,255,0.62);
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(0,0,0,0.05);
    color: rgba(29,29,31,0.4);
  }
  .dl-crumb a { color: inherit; transition: color 0.3s ease; }
  .dl-crumb a:hover { color: #d2540a; }
  .dl-crumb-current { color: #d2540a; }

  .dl-eyebrow {
    position: relative; display: inline-flex; align-items: center; gap: 0.55rem;
    border-radius: 999px; padding: 0.42rem 1.1rem 0.42rem 0.9rem;
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
    font-weight: 500; font-size: 0.68rem; letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(29,29,31,0.62);
  }
  .dl-eyebrow::before {
    content: ''; position: absolute; inset: 0; z-index: -1; border-radius: 999px; padding: 1px;
    background: linear-gradient(135deg, rgba(255,255,255,0.80) 0%, rgba(255, 149, 0, 0.45) 30%, rgba(224, 102, 0, 0.18) 55%, rgba(224, 102, 0, 0.50) 80%, rgba(255,255,255,0.70) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
  }
  .dl-eyebrow-dot {
    width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
    background: #f38200; box-shadow: 0 0 8px rgba(255, 149, 0, 0.7);
    animation: dlDotPulse 2.4s ease-in-out infinite;
  }
  @keyframes dlDotPulse {
    0%,100% { box-shadow: 0 0 6px rgba(255, 149, 0, .7), 0 0 0 0 rgba(255, 149, 0, .3); }
    50%     { box-shadow: 0 0 12px rgba(255, 149, 0, .9), 0 0 0 4px rgba(255, 149, 0, 0); }
  }

  .dl-h1 { color: #1d1d1f; letter-spacing: -0.03em; font-weight: 600; }
  .dl-icon-wrap { display: inline-flex; vertical-align: middle; color: #d2540a; }

  .dl-desc { color: rgba(29,29,31,0.56); font-weight: 400; }

  .dl-deliverable {
    background: rgba(255,255,255,0.6);
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
    border: 1px solid rgba(255,255,255,0.75);
    box-shadow: 0 8px 24px rgba(29,29,31,0.06);
  }
  .dl-deliverable-label {
    font-weight: 500; font-size: 0.62rem; letter-spacing: 0.16em; text-transform: uppercase;
    background: linear-gradient(135deg, #ffd200, #d2540a);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .dl-deliverable-val { color: #1d1d1f; font-weight: 600; }

  /* ── Feature card ── */
  .dl-feature-card { position: relative; }
  .dl-feature-bar {
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #ffd200, #d2540a);
  }
  .dl-feature-title { color: #1d1d1f; font-weight: 600; letter-spacing: -0.015em; }
  .dl-feature-icon {
    background: linear-gradient(135deg, rgba(255, 210, 0, 0.14), rgba(224, 102, 0, 0.10));
    color: #d2540a;
  }
  .dl-feature-item {
    transition: background 0.3s ease, border-color 0.3s ease;
    border: 1px solid transparent;
  }
  .dl-feature-item:hover { background: rgba(255,255,255,0.5); border-color: rgba(255,255,255,0.7); }
  .dl-feature-check {
    background: linear-gradient(135deg, #ffd200, #d2540a);
    box-shadow: 0 2px 8px rgba(224, 102, 0, 0.25);
  }
  .dl-feature-text { color: rgba(29,29,31,0.7); font-weight: 500; }

  /* ── Deep dive cards ── */
  .dl-grid-card { background: linear-gradient(160deg, rgba(255,255,255,0.78), rgba(255,255,255,0.42)); }
  .dl-grid-icon {
    border-radius: 1.25rem; display: flex; align-items: center; justify-content: center;
  }
  .dl-grid-icon.blue   { background: rgba(99,102,241,0.08); color: #6366f1; border: 1px solid rgba(99,102,241,0.14); }
  .dl-grid-icon.purple { background: rgba(168,85,247,0.08); color: #a855f7; border: 1px solid rgba(168,85,247,0.14); }
  .dl-grid-title { color: #1d1d1f; font-weight: 600; letter-spacing: -0.015em; }
  .dl-benefit { color: rgba(29,29,31,0.66); font-weight: 500; }
  .dl-benefit-dot { background: #6366f1; }

  .dl-tech-pill {
    background: rgba(255,255,255,0.85);
    border: 1px solid rgba(0,0,0,0.06);
    color: #1d1d1f; font-weight: 600; letter-spacing: 0.06em;
    transition: transform 0.3s cubic-bezier(0.25,1,0.5,1), border-color 0.3s ease, box-shadow 0.3s ease;
  }
  .dl-tech-pill:hover { transform: translateY(-2px); border-color: rgba(224, 102, 0, 0.3); box-shadow: 0 8px 18px rgba(224, 102, 0, 0.12); }

  .dl-infra-box {
    background: #16161a; color: rgba(255,255,255,0.7);
  }
  .dl-infra-label { color: #fff; font-weight: 600; }

  /* ── Dark CTA panel ── */
  .dl-cta-panel { background: #15151a; }
  .dl-cta-blob-a { background: radial-gradient(circle, rgba(255, 210, 0, 0.22) 0%, transparent 70%); }
  .dl-cta-blob-b { background: radial-gradient(circle, rgba(99,102,241,0.16) 0%, transparent 70%); }
  .dl-cta-h2 { color: #fff; font-weight: 600; letter-spacing: -0.025em; }
  .dl-cta-accent {
    background: linear-gradient(135deg, #ffd200, #d2540a);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .dl-cta-body { color: rgba(255,255,255,0.6); font-weight: 400; }
  .dl-cta-panel-right {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.10);
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  }
  .dl-cta-panel-title { color: #fff; font-weight: 600; }
  .dl-cta-panel-body { color: rgba(255,255,255,0.5); }
`;

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
      <path d="M3 7.5L5.5 10L11 3.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 3L13.8 9.2L20 11L13.8 12.8L12 19L10.2 12.8L4 11L10.2 9.2L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

function ToolsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M14.7 6.3a4 4 0 015.6 5.6L13 19.2 4.8 21l1.8-8.2 7.3-7.3a4 4 0 011-1.2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9.5 9.5L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function DetailLayout({ content, category }: DetailLayoutProps) {
  const gradient = content.gradient || "from-orange-600 to-amber-600";

  return (
    <div className="dl-root flex min-h-screen flex-col selection:bg-orange-100 selection:text-orange-950">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <InteractiveBackground />
      <Navbar />

      <main className="flex-1 pt-36 pb-24 relative z-10 overflow-hidden">
        <div className="dl-blob dl-blob-a" aria-hidden="true" />
        <div className="dl-blob dl-blob-b" aria-hidden="true" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">

          {/* Breadcrumbs */}
          <nav className="dl-crumb mb-12 flex items-center gap-3 text-xs w-fit px-6 py-3 rounded-full relative z-20">
            <Link href="/">Home</Link>
            <span className="opacity-40">/</span>
            <span>{category}</span>
            <span className="opacity-40">/</span>
            <span className="dl-crumb-current">{content.title}</span>
          </nav>

          {/* Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <div className="dl-eyebrow mb-8">
                <span className="dl-eyebrow-dot" />
                {content.subtitle}
              </div>

              <h1 className="dl-h1 text-5xl md:text-7xl mb-8 leading-[1.05]">
                {content.title}{" "}
                <span className="dl-icon-wrap hover:scale-110 hover:rotate-12 transition-transform duration-300">
                  {content.icon}
                </span>
              </h1>

              <p className="dl-desc text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
                {content.longDescription}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-5">
                <ButtonLink href="/#contact" variant="primary" size="lg" className="w-full sm:w-auto rounded-2xl">
                  Start your project
                </ButtonLink>
                {content.deliverable && (
                  <div className="dl-deliverable flex items-center gap-4 px-7 py-4 rounded-2xl w-full sm:w-auto">
                    <div className="flex flex-col">
                      <span className="dl-deliverable-label mb-1">Deliverable</span>
                      <span className="dl-deliverable-val text-sm">{content.deliverable}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-5 relative"
            >
              <div className={`absolute -inset-10 bg-gradient-to-br ${gradient} opacity-15 blur-3xl rounded-full`} aria-hidden="true" />
              <Card className="dl-feature-card relative overflow-hidden rounded-[2.5rem] p-9">
                <div className={`dl-feature-bar`} />
                <h3 className="dl-feature-title text-xl mb-7 flex items-center gap-3.5">
                  <span className="dl-feature-icon flex items-center justify-center h-10 w-10 rounded-xl">
                    <SparkleIcon />
                  </span>
                  Key features
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {content.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                      className="dl-feature-item flex items-start gap-3.5 p-3.5 rounded-xl cursor-default"
                    >
                      <div className="dl-feature-check flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5">
                        <CheckIcon />
                      </div>
                      <p className="dl-feature-text text-sm leading-snug pt-1">{feature}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* 3-Phone Interactive App Showcase */}
          <div className="mb-20">
            <SeoAppShowcase serviceName={content.title} />
          </div>

          {/* Deep dive grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card hoverable className="dl-grid-card h-full p-9 rounded-[2.5rem]">
                <div className="dl-grid-icon blue h-14 w-14 mb-7">
                  <TargetIcon />
                </div>
                <h4 className="dl-grid-title text-xl mb-6">Core benefits</h4>
                <ul className="space-y-4">
                  {content.benefits.map((benefit) => (
                    <li key={benefit} className="dl-benefit text-sm flex items-start gap-3.5">
                      <div className="dl-benefit-dot mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" />
                      <span className="leading-snug">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card hoverable className="dl-grid-card h-full p-9 rounded-[2.5rem] flex flex-col justify-between">
                <div>
                  <div className="dl-grid-icon purple h-14 w-14 mb-7">
                    <ToolsIcon />
                  </div>
                  <h4 className="dl-grid-title text-xl mb-6">Technology stack &amp; tools</h4>
                  <div className="flex flex-wrap gap-2.5">
                    {(content.technologies || ["Next.js", "Tailwind", "TypeScript", "Framer Motion", "MongoDB"]).map((tech) => (
                      <span key={tech} className="dl-tech-pill px-5 py-2.5 rounded-xl text-xs uppercase cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="dl-infra-box mt-9 p-6 rounded-[1.5rem] text-sm leading-relaxed">
                  <span className="dl-infra-label block mb-2 text-base">Enterprise-grade infrastructure</span>
                  We use robust technologies so your {content.title.toLowerCase()} is functional, future-proof, and
                  secure — staying current with industry standards to support real scale.
                </p>
              </Card>
            </motion.div>
          </div>

          {/* Dark CTA panel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="dl-cta-panel relative overflow-hidden p-10 md:p-20 rounded-[3rem] border border-white/10 shadow-2xl"
          >
            <div className="dl-cta-blob-a absolute top-0 right-0 w-[500px] h-[500px] blur-[120px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
            <div className="dl-cta-blob-b absolute bottom-0 left-0 w-[400px] h-[400px] blur-[100px] rounded-full pointer-events-none -translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="dl-cta-h2 text-4xl md:text-5xl mb-8 leading-[1.1]">
                  Why choose Sabka Saathi for <span className="dl-cta-accent">{content.title}</span>?
                </h2>
                <div className="space-y-5 dl-cta-body text-base md:text-lg leading-relaxed">
                  <p>
                    In the digital age, {content.title.toLowerCase()} is more than a technical requirement — it&apos;s a
                    strategic advantage. At Sabka Saathi, we approach every {content.slug} project with a blend of
                    creativity and engineering rigor. As a GST-registered agency, we bring corporate transparency
                    and high-fidelity results.
                  </p>
                  <p>
                    Our process for {content.slug} is rooted in industry research and user-centric design. Whether
                    building a complex SaaS platform or a localized CRM, we make sure the final product drives
                    actual business revenue.
                  </p>
                </div>
              </div>

              <div className="dl-cta-panel-right p-9 rounded-[2rem]">
                <h5 className="dl-cta-panel-title text-xl mb-3.5">Ready to deep dive?</h5>
                <p className="dl-cta-panel-body mb-9 text-base leading-relaxed">
                  Let&apos;s discuss how {content.title} can transform your business operations and accelerate your
                  growth.
                </p>

                <ButtonLink href="/#contact" variant="secondary" size="lg" className="w-full rounded-2xl">
                  Book a strategy call
                  <svg width="15" height="15" viewBox="0 0 14 14" fill="none" className="ml-1">
                    <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </ButtonLink>
              </div>
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}