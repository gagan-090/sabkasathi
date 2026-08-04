import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { RoyalFooter } from "@/components/royal/RoyalFooter";
import { PageHero } from "@/components/PageHero";
import { expertiseContent } from "@/lib/content";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Cpu, Globe, Smartphone, Calculator, Briefcase, Megaphone, Search, Cloud, Gem, Settings, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Software & Engineering Expertise | Sabka Saathi",
  description: "Explore our full range of technical expertise: web development, mobile apps, custom software, ERP, CRM, and cloud engineering.",
  alternates: {
    canonical: "https://sabkasaathidigitalservices.com/expertise",
  },
};

const iconMap: Record<string, React.ComponentType<any>> = {
  Globe,
  Smartphone,
  Cpu,
  Calculator,
  Briefcase,
  Megaphone,
  Search,
  Cloud,
  Gem,
  Settings,
  Zap,
};

export default function ExpertiseOverviewPage() {
  const items = Object.values(expertiseContent);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <InteractiveBackground />
      <Navbar />
      <main className="flex-1 pt-0">
        <PageHero
          badge="Specialized Capabilities"
          title="Our Technical"
          titleHighlight="Expertise"
          subtitle="Enterprise-grade software development capabilities tailored for rapid scale and long-term security."
          type="services"
          ctaText="Consult Our Engineers"
          ctaHref="/contact"
        />

        <section className="py-16 container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => {
              const IconComponent = iconMap[item.icon] || Cpu;
              return (
                <Link key={item.slug} href={`/expertise/${item.slug}`} className="block group">
                  <div className="h-full bg-white border border-slate-100/90 rounded-[2rem] p-7 shadow-sm hover:border-orange-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight leading-snug">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                        {item.description}
                      </p>
                      <ul className="space-y-2 mb-6">
                        {item.features?.slice(0, 3).map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black uppercase tracking-wider text-orange-600 group-hover:text-orange-700">
                      <span>Explore Capability</span>
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
