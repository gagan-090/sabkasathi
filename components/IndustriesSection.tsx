"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import {
  ShoppingBag,
  Heart,
  GraduationCap,
  Briefcase,
  Home as HomeIcon,
  Factory,
  Camera,
  Utensils,
  Globe,
} from "lucide-react";

const styles = `

  .ind-section { font-family: var(--font-dm-sans), sans-serif; }

  /* ambient liquid blobs, same recipe as hero */
  .ind-blob {
    position: absolute; border-radius: 50%; pointer-events: none;
    filter: blur(110px);
    animation: indDrift 16s ease-in-out infinite;
  }
  @keyframes indDrift {
    0%, 100% { transform: translate(0,0) scale(1); }
    50%      { transform: translate(3%,-4%) scale(1.08); }
  }

  /* glass badge — identical construction to hr-badge */
  .ind-badge {
    position: relative; display: inline-flex; align-items: center; gap: 0.55rem;
    border-radius: 999px; padding: 0.42rem 1.2rem;
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
    box-shadow: 0 2px 16px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);
  }
  .ind-badge::before {
    content: ''; position: absolute; inset: -1px; border-radius: 999px; padding: 1.4px;
    background: linear-gradient(135deg,
      rgba(255,255,255,0.80) 0%, rgba(255, 149, 0, 0.55) 28%,
      rgba(224, 102, 0, 0.20) 52%, rgba(224, 102, 0, 0.60) 76%, rgba(255,255,255,0.72) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    pointer-events: none;
  }
  .ind-badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #f38200; box-shadow: 0 0 8px rgba(255, 149, 0, 0.7);
    animation: dotPulse 2.4s ease-in-out infinite;
  }
  @keyframes dotPulse {
    0%,100% { box-shadow: 0 0 8px rgba(255, 149, 0, .7), 0 0 0 0 rgba(255, 149, 0, .3); }
    50%     { box-shadow: 0 0 14px rgba(255, 149, 0, .9), 0 0 0 5px rgba(255, 149, 0, 0); }
  }

  /* glass filter pills */
  .ind-pill {
    position: relative; font-family: var(--font-dm-sans), sans-serif; font-weight: 500;
    border-radius: 999px; padding: 0.55rem 1.3rem; font-size: 0.72rem;
    letter-spacing: 0.04em; text-transform: uppercase;
    transition: transform 0.3s cubic-bezier(0.25,1,0.5,1), box-shadow 0.3s ease, color 0.3s ease;
    cursor: pointer; border: 1px solid transparent;
  }
  .ind-pill.inactive {
    color: rgba(29,29,31,0.55);
    background: rgba(255,255,255,0.65);
    backdrop-filter: blur(10px);
    box-shadow: 0 1px 6px rgba(0,0,0,0.05);
  }
  .ind-pill.inactive:hover {
    color: #d2540a; transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(255, 149, 0, 0.14);
  }
  .ind-pill.active {
    color: #fff;
    background: linear-gradient(135deg, #ffd200 0%, #f38200 38%, #d2540a 72%, #a8420a 100%);
    box-shadow: 0 4px 18px rgba(224, 102, 0, 0.30), inset 0 1px 0 rgba(255,255,255,0.25);
    transform: translateY(-1px) scale(1.02);
  }

  /* liquid glass card */
  .ind-card {
    position: relative; overflow: hidden;
    background: rgba(255,255,255,0.72);
    backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.6);
    box-shadow: 0 4px 22px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.6);
    transition: transform 0.4s cubic-bezier(0.25,1,0.5,1), box-shadow 0.4s ease, border-color 0.4s ease;
  }
  .ind-card:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 149, 0, 0.30);
    box-shadow: 0 14px 34px rgba(224, 102, 0, 0.12), inset 0 1px 0 rgba(255,255,255,0.7);
  }
  .ind-icon-wrap {
    background: linear-gradient(135deg, rgba(255, 210, 0, 0.16), rgba(224, 102, 0, 0.16));
    color: #d2540a;
  }

  .ind-accent {
    background: linear-gradient(135deg, #ffd200 0%, #d2540a 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .ind-cta {
    position: relative; overflow: hidden;
    font-family: var(--font-dm-sans), sans-serif; font-weight: 500;
    color: #fff; border-radius: 14px; padding: 0.9rem 2.2rem;
    background: linear-gradient(135deg, #ffd200 0%, #f38200 38%, #d2540a 72%, #a8420a 100%);
    box-shadow: 0 2px 12px rgba(224, 102, 0, 0.28), inset 0 1px 0 rgba(255,255,255,0.22);
    transition: transform 0.38s cubic-bezier(0.25,1,0.5,1), box-shadow 0.38s ease;
  }
  .ind-cta:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 26px rgba(224, 102, 0, 0.32), inset 0 1px 0 rgba(255,255,255,0.26);
  }

  .ind-quote {
    position: relative; overflow: hidden;
    background: rgba(255,255,255,0.62);
    backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(255,255,255,0.7);
    box-shadow: 0 8px 30px rgba(224, 102, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.7);
  }
`;

const categoryIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Business & Retail": ShoppingBag,
  "Medical & Wellness": Heart,
  "Education": GraduationCap,
  "Professional": Briefcase,
  "Home & Local": HomeIcon,
  "Industrial": Factory,
  "Creative & Media": Camera,
  "Food & Hospitality": Utensils,
};

const categories = [
  "All",
  "Business & Retail",
  "Medical & Wellness",
  "Education",
  "Professional",
  "Home & Local",
  "Industrial",
  "Creative & Media",
];

const industries = [
  { id: 1, category: "Business & Retail", icon: "🚀", title: "Startups & New Businesses", desc: "Digital setup, branding, and growth strategies for new ideas." },
  { id: 2, category: "Medical & Wellness", icon: "🏥", title: "Medical & Healthcare", desc: "Patient reach and management for clinics and hospitals." },
  { id: 3, category: "Education", icon: "🎓", title: "Education & Coaching", desc: "Management systems for schools and coaching centers." },
  { id: 4, category: "Business & Retail", icon: "🛒", title: "E-commerce & Retail", desc: "Online store development and marketing for sales growth." },
  { id: 5, category: "Business & Retail", icon: "🏪", title: "Local Shops", desc: "Attracting nearby customers through local digital presence." },
  { id: 6, category: "Professional", icon: "🧑‍💼", title: "Service Providers", desc: "Branding and lead generation for consultants and freelancers." },
  { id: 7, category: "Professional", icon: "🏗️", title: "Real Estate", desc: "Property listing platforms and lead systems for builders." },
  { id: 8, category: "Food & Hospitality", icon: "🍽️", title: "Food & Restaurant", desc: "Online menus and ordering systems to boost growth." },
  { id: 9, category: "Food & Hospitality", icon: "🏨", title: "Hotels & Hospitality", desc: "Websites and booking systems for stays and guest houses." },
  { id: 10, category: "Food & Hospitality", icon: "✈️", title: "Travel & Tourism", desc: "Digital platforms for agencies to attract more clients." },
  { id: 11, category: "Home & Local", icon: "🚗", title: "Automobile & Services", desc: "Online presence for vehicle dealers and service centers." },
  { id: 12, category: "Medical & Wellness", icon: "🏋️", title: "Fitness & Gym", desc: "Websites and marketing for wellness centers and trainers." },
  { id: 13, category: "Medical & Wellness", icon: "💄", title: "Beauty & Salon", desc: "Booking systems for salons and beauty professionals." },
  { id: 14, category: "Industrial", icon: "📦", title: "Logistics & Delivery", desc: "Solutions for courier, transport, and supply chain." },
  { id: 15, category: "Business & Retail", icon: "🧵", title: "Fashion & Clothing", desc: "E-commerce and branding for boutiques and fashion brands." },
  { id: 16, category: "Professional", icon: "🏢", title: "Corporate & Offices", desc: "Professional websites and systems for modern companies." },
  { id: 17, category: "Professional", icon: "🧾", title: "Finance & Accounting", desc: "Digital tools and presence for CA firms and advisors." },
  { id: 18, category: "Home & Local", icon: "🏠", title: "Home Services", desc: "Lead generation for electricians, plumbers, and local fixers." },
  { id: 19, category: "Home & Local", icon: "🎤", title: "Event Management", desc: "Online presence and booking systems for event planners." },
  { id: 20, category: "Creative & Media", icon: "🎨", title: "Personal Brands", desc: "Brand building and growth for public figures and creators." },
  { id: 21, category: "Industrial", icon: "🏭", title: "Manufacturing", desc: "Digital solutions for factories and production units." },
  { id: 22, category: "Education", icon: "📚", title: "Book Stores", desc: "Online platforms for book sellers and publishers." },
  { id: 23, category: "Medical & Wellness", icon: "🧪", title: "Pharma & Distributors", desc: "Systems for medicine distributors and pharma businesses." },
  { id: 24, category: "Industrial", icon: "🐄", title: "Agriculture", desc: "Digital tools for agri-business, farmers, and dairy." },
  { id: 25, category: "Medical & Wellness", icon: "🐾", title: "Pet Care", desc: "Websites and booking systems for pet services." },
  { id: 26, category: "Professional", icon: "🏫", title: "NGOs", desc: "Digital presence for social organizations and trusts." },
  { id: 27, category: "Professional", icon: "⚖️", title: "Legal Services", desc: "Professional websites for lawyers and legal advisors." },
  { id: 28, category: "Education", icon: "🧠", title: "Competitive Exam", desc: "Online systems for UPSC, SSC, and banking coaching." },
  { id: 29, category: "Professional", icon: "🏦", title: "Banking & Finance", desc: "Digital support for financial institutions and advisors." },
  { id: 30, category: "Business & Retail", icon: "🛍️", title: "Wholesale Businesses", desc: "Online systems for bulk sellers and distributors." },
  { id: 31, category: "Business & Retail", icon: "🧰", title: "Hardware Shops", desc: "Digital presence for hardware and electrical stores." },
  { id: 32, category: "Home & Local", icon: "🪑", title: "Furniture & Interior", desc: "Showcase and marketing for furniture businesses." },
  { id: 33, category: "Home & Local", icon: "🏡", title: "Home Decor", desc: "Online branding for home decor products and services." },
  { id: 34, category: "Medical & Wellness", icon: "🧴", title: "Cosmetics", desc: "E-commerce and marketing for beauty products." },
  { id: 35, category: "Home & Local", icon: "🧼", title: "Cleaning Services", desc: "Lead generation and booking for cleaning businesses." },
  { id: 36, category: "Industrial", icon: "🧯", title: "Security Services", desc: "Systems for security agencies and CCTV providers." },
  { id: 37, category: "Creative & Media", icon: "📸", title: "Photography", desc: "Portfolio websites for photographers and studios." },
  { id: 38, category: "Creative & Media", icon: "🎬", title: "Media & Production", desc: "Digital presence for video and media companies." },
  { id: 39, category: "Creative & Media", icon: "🎧", title: "Music & Audio", desc: "Platforms for music studios and professionals." },
  { id: 40, category: "Education", icon: "🧑‍🏫", title: "Online Tutors", desc: "Personal websites and systems for educators." },
  { id: 41, category: "Industrial", icon: "🧳", title: "Import & Export", desc: "Global business platforms for international traders." },
  { id: 42, category: "Industrial", icon: "🧊", title: "Cold Storage", desc: "Visibility solutions for storage and warehousing." },
  { id: 43, category: "Industrial", icon: "🚚", title: "Transport Services", desc: "Digital systems for transport and logistics fleets." },
  { id: 44, category: "Professional", icon: "🏢", title: "Co-working Spaces", desc: "Websites and booking systems for shared offices." },
  { id: 45, category: "Business & Retail", icon: "🖨️", title: "Printing Shops", desc: "Online presence for printing and advertising services." },
  { id: 46, category: "Home & Local", icon: "🪪", title: "ID Services", desc: "Platforms for ID card and documentation providers." },
  { id: 47, category: "Home & Local", icon: "🧑‍🔧", title: "Repair Services", desc: "Online booking and lead systems for repair services." },
  { id: 48, category: "Home & Local", icon: "🧑‍🌾", title: "Nursery & Plants", desc: "E-commerce and branding for nursery businesses." },
  { id: 49, category: "Food & Hospitality", icon: "🧑‍🍳", title: "Catering Services", desc: "Online booking and promotion for catering." },
  { id: 50, category: "Education", icon: "🧑‍🏭", title: "Skill Training", desc: "Websites and systems for vocational institutes." },
  { id: 51, category: "Creative & Media", icon: "🎯", title: "Digital Creators", desc: "Brand building and growth for YouTubers and creators." },
  { id: 52, category: "Professional", icon: "🧑‍💻", title: "IT & Tech Firms", desc: "Advanced digital solutions for technology companies." },
  { id: 53, category: "Professional", icon: "🧾", title: "Tax Consultants", desc: "Professional platforms for tax and GST advisors." },
  { id: 54, category: "Professional", icon: "🧍", title: "HR Agencies", desc: "Online systems for recruitment and staffing." },
  { id: 55, category: "Business & Retail", icon: "🏪", title: "Franchise Businesses", desc: "Multi-location management and branding." },
];

export function IndustriesSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredIndustries =
    activeCategory === "All"
      ? industries
      : industries.filter((item) => item.category === activeCategory);

  return (
    <section
      className="ind-section py-24 relative overflow-hidden bg-[#f2f2f4] scroll-mt-48"
      id="industries"
    >
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* Ambient liquid blobs, matching hero */}
      <div
        className="ind-blob"
        style={{ width: 420, height: 420, top: "-8%", left: "-6%", background: "radial-gradient(circle, rgba(255, 210, 0, 0.18), transparent 70%)" }}
      />
      <div
        className="ind-blob"
        style={{ width: 380, height: 380, bottom: "-10%", right: "-8%", background: "radial-gradient(circle, rgba(224, 102, 0, 0.14), transparent 70%)", animationDelay: "2s" }}
      />

      <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="ind-badge mb-5">
              <span className="ind-badge-dot" />
              <span className="relative z-10 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-700">
                Our Footprint
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium text-[#1d1d1f] mb-6 tracking-tight">
              Industries We <span className="ind-accent font-semibold italic">Serve</span>
            </h2>
            <p className="text-lg text-slate-500 font-normal leading-relaxed">
              We provide customized digital solutions for businesses across a wide range of industries.
              From startups to established enterprises — we help you grow with the right technology.
            </p>
          </motion.div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn("ind-pill", activeCategory === cat ? "active" : "inactive")}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Industries Grid */}
        <div className="relative min-h-[400px]">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredIndustries.map((item) => {
                const IconComponent = categoryIconMap[item.category] || Globe;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Card className="ind-card p-5 h-full rounded-3xl border-0">
                      <div className="flex items-start gap-4">
                        <div className="ind-icon-wrap w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#1d1d1f] mb-1 text-sm md:text-base">
                            {item.title}
                          </h4>
                          <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide mb-2">
                            {item.category}
                          </p>
                          <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-normal">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Support Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="ind-quote mt-20 p-8 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-medium text-[#1d1d1f] italic">
              &quot;Every business is unique — and we create solutions that fit your goals.&quot;
            </h3>
            <p className="font-semibold text-[#d2540a] flex items-center gap-2 justify-center md:justify-start">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f38200] animate-pulse" />
              Serving Local Shops, Startups & Large Enterprises
            </p>
          </div>
          <div className="flex flex-col gap-3 min-w-[200px]">
            <a href="#contact" className="ind-cta text-center">
              Launch Online →
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" />
    </section>
  );
}