"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/LiquidButton";

interface StatItem {
  val: string;
  label: string;
}

interface TrustCardItem {
  title: string;
  desc: string;
}

interface PageHeroProps {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  type: "services" | "industries" | "about" | "faq" | "contact";
  stats?: StatItem[];
  trustCards?: TrustCardItem[];
  trustPoints?: string[];
  ctaText?: string;
  ctaHref?: string;
}

export function PageHero({
  badge,
  title,
  titleHighlight,
  subtitle,
  type,
  stats,
  trustCards,
  trustPoints,
  ctaText,
  ctaHref,
}: PageHeroProps) {
  // Render corresponding vector SVG illustrations based on the page type
  const getImagePath = () => {
    switch (type) {
      case "services":
        return "/images/services_hero.webp";
      case "industries":
        return "/images/industries_hero.webp";
      case "about":
        return "/images/about_hero.webp";
      case "faq":
        return "/images/faq_hero.webp";
      case "contact":
        return "/images/contact_hero.webp";
      default:
        return "/images/services_hero.webp";
    }
  };

  const getAltText = () => {
    switch (type) {
      case "services":
        return "Custom software and app development services illustration";
      case "industries":
        return "Industries served by Sabka Saathi Digital Services illustration";
      case "about":
        return "Sabka Saathi company vision and teamwork illustration";
      case "faq":
        return "Frequently asked questions and support illustration";
      case "contact":
        return "Business consultation and support illustration";
      default:
        return "Sabka Saathi Digital Services illustration";
    }
  };

  const renderIllustration = () => {
    return (
      <div className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[400px] aspect-[4/3] lg:aspect-square mx-auto flex items-center justify-center rounded-[1.5rem] overflow-hidden shadow-lg border border-white bg-white/20">
        <Image
          src={getImagePath()}
          alt={getAltText()}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(max-width: 768px) 280px, (max-width: 1024px) 340px, 400px"
          className="object-cover"
        />
      </div>
    );
  };

  return (
    <section className="relative overflow-hidden pt-2 pb-4 md:pt-4 max-w-6xl mx-auto px-4 z-10">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/45 px-5 py-6 md:py-12 md:px-12 shadow-[0_20px_50px_rgba(39,83,166,0.04)] backdrop-blur-xl">
        
        {/* Subtle grid patterns */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{
            backgroundImage: "radial-gradient(#f38200 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }} 
        />
        
        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-600/10 border border-orange-600/20 text-orange-700 text-[9px] font-black uppercase tracking-widest"
            >
              {badge}
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="text-3xl sm:text-5xl md:text-6.5xl font-black text-slate-950 tracking-tight leading-tight"
            >
              {title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 italic font-black">{titleHighlight}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-xs sm:text-sm md:text-base leading-relaxed text-slate-600 font-medium max-w-xl"
            >
              {subtitle}
            </motion.p>

            {ctaText && ctaHref && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="mt-1"
              >
                <Link href={ctaHref}>
                  <Button className="font-bold uppercase tracking-wider text-xs">
                    {ctaText}
                  </Button>
                </Link>
              </motion.div>
            )}

            {/* Custom Interactive Elements based on page types */}
            {stats && stats.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-3 gap-6 pt-4 w-full border-t border-slate-200/50 mt-2"
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <p className="text-2xl sm:text-3xl font-black text-orange-700 tracking-tight">{stat.val}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {trustCards && trustCards.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 w-full border-t border-slate-200/50 mt-2"
              >
                {trustCards.map((card) => (
                  <div key={card.title} className="p-3 bg-white/70 border border-slate-100 rounded-xl shadow-sm text-left">
                    <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wider">{card.title}</h4>
                    <p className="text-[9px] text-slate-500 font-medium leading-normal mt-0.5">{card.desc}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {trustPoints && trustPoints.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center lg:justify-start gap-4 pt-3 w-full border-t border-slate-200/50 mt-2"
              >
                {trustPoints.map((pt) => (
                  <div key={pt} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{pt}</span>
                  </div>
                ))}
              </motion.div>
            )}

          </div>

          {/* Right Column: Visual illustration vector */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="w-full lg:col-span-5 mt-6 lg:mt-0 flex justify-center"
          >
            {renderIllustration()}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
