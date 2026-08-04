import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { RoyalFooter } from "@/components/royal/RoyalFooter";
import { PageHero } from "@/components/PageHero";
import { processContent } from "@/lib/content";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Brain, Puzzle, Palette, MonitorSmartphone, Wrench, Link2, FlaskConical, Rocket, BarChart3, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Software Development Process & Methodology | Sabka Saathi",
  description: "Learn about our 10-phase software development lifecycle: discovery, design, development, QA testing, deployment, and ongoing maintenance.",
  alternates: {
    canonical: "https://sabkasaathidigitalservices.com/process",
  },
};

const iconMap: Record<string, React.ComponentType<any>> = {
  Brain,
  PuzzleIcon: Puzzle,
  Palette,
  MonitorSmartphone,
  Wrench,
  Link2,
  FlaskConical,
  Rocket,
  BarChart3,
  RefreshCw,
};

export default function ProcessOverviewPage() {
  const steps = Object.values(processContent);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <InteractiveBackground />
      <Navbar />
      <main className="flex-1 pt-0">
        <PageHero
          badge="Agile Methodology"
          title="Our Development"
          titleHighlight="Process"
          subtitle="A structured, transparent 10-step software lifecycle engineered to eliminate delays and deliver production-ready software."
          type="services"
          ctaText="Start Your Project"
          ctaHref="/contact"
        />

        <section className="py-16 container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const IconComponent = iconMap[step.icon] || Brain;
              return (
                <Link key={step.slug} href={`/process/${step.slug}`} className="block group">
                  <div className="h-full bg-white border border-slate-100/90 rounded-[2rem] p-7 shadow-sm hover:border-orange-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-4 right-6 text-4xl font-black text-slate-100 select-none group-hover:text-orange-100 transition-colors">
                      0{index + 1}
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">Phase 0{index + 1}</span>
                          <h3 className="text-xl font-black text-slate-900 tracking-tight leading-snug">
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-xs font-bold text-slate-400 mb-3">{step.subtitle}</p>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                        {step.description}
                      </p>
                      <ul className="space-y-2 mb-6">
                        {step.features?.slice(0, 3).map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black uppercase tracking-wider text-orange-600 group-hover:text-orange-700">
                      <span>View Phase Details</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <RoyalFooter />
    </div>
  );
}
