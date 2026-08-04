"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneFrame, PHONE_SIZE_DEFAULT, PHONE_SIZE_MINI } from "@/components/mockups/PhoneFrame";
import { Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

import { GroceryApp } from "@/components/mockups/GroceryApp";
import { HomeServiceApp } from "@/components/mockups/HomeServiceApp";
import { FoodDeliveryApp } from "@/components/mockups/FoodDeliveryApp";
import { BusinessApp } from "@/components/mockups/BusinessApp";
import { FashionApp } from "@/components/mockups/FashionApp";
import { EducationApp } from "@/components/mockups/EducationApp";

interface AppCategory {
  id: string;
  label: string;
  features: string[];
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
}

const CATEGORIES: AppCategory[] = [
  {
    id: "grocery",
    label: "Grocery & Supermarket",
    features: ["8-Min Quick Delivery", "Smart Address Picker", "Festive Finds & Deals", "Live Order Tracking"],
    left: <GroceryApp screen="category" />,
    center: <GroceryApp screen="home" />,
    right: <GroceryApp screen="cart" />,
  },
  {
    id: "services",
    label: "Home Service App",
    features: ["Time Slot Booking", "Service Estimator", "Professional Dispatch", "Rating & Feedback"],
    left: <HomeServiceApp screen="booking" />,
    center: <HomeServiceApp screen="home" />,
    right: <HomeServiceApp screen="profile" />,
  },
  {
    id: "food",
    label: "Food Delivery App",
    features: ["Digital Menu & Cart", "Veg / Non-Veg Badges", "20-Min Delivery ETA", "Table Reservations"],
    left: <FoodDeliveryApp screen="restaurant" />,
    center: <FoodDeliveryApp screen="home" />,
    right: <FoodDeliveryApp screen="menu" />,
  },
  {
    id: "web",
    label: "Website & Business App",
    features: ["SEO & High Speed", "Voice & Camera Search", "Deals of the Day", "Payment Gateway"],
    left: <BusinessApp screen="deals" />,
    center: <BusinessApp screen="home" />,
    right: <BusinessApp screen="product" />,
  },
  {
    id: "fashion",
    label: "Fashion & Store",
    features: ["Rich Product Catalogs", "Category Stories", "Wishlist & Cart Sync", "Discount Badging"],
    left: <FashionApp screen="category" />,
    center: <FashionApp screen="home" />,
    right: <FashionApp screen="product" />,
  },
  {
    id: "education",
    label: "Education & Coaching",
    features: ["LIVE Interactive Class", "Streak Counter & Goals", "Daily Practice Quizzes", "Recorded Video Library"],
    left: <EducationApp screen="live" />,
    center: <EducationApp screen="home" />,
    right: <EducationApp screen="course" />,
  },
];

export function SeoAppShowcase({
  cityName,
  serviceName,
}: {
  cityName?: string;
  serviceName?: string;
}) {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0].id);

  const currentCategory = CATEGORIES.find((c) => c.id === activeTab) || CATEGORIES[0];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/50 border-y border-slate-100 overflow-hidden relative">
      {/* Background glow discs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Top Header stats badge */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-4 px-5 py-2 rounded-full bg-white border border-slate-200/80 shadow-sm mb-6">
            <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
              <Zap className="w-3.5 h-3.5 text-orange-600 fill-orange-600" />
              <span>200+ PROJECTS DELIVERED</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>99% CLIENT SATISFACTION</span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto">
            Mobile App UI Screens &amp; Interfaces
          </h2>
          <p className="text-slate-500 font-medium text-base md:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            Preview high-performance mobile application interfaces built for businesses in{" "}
            <span className="text-orange-600 font-bold">{cityName || "India"}</span>. Select an app category below to explore live screen mockups.
          </p>
        </div>

        {/* Tab Selector Pills */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 max-w-4xl mx-auto mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === activeTab;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-lg shadow-blue-600/25 scale-105"
                    : "bg-white text-slate-600 border border-slate-200/80 hover:border-blue-300 hover:text-blue-600 hover:bg-slate-50/80 shadow-xs"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 3-Phone Showcase Display */}
        <div className="relative flex flex-col items-center justify-center min-h-[460px] sm:min-h-[580px] py-4">
          {/* Circular backdrop disc */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[480px] sm:h-[480px] md:w-[560px] md:h-[560px] rounded-full bg-gradient-to-tr from-slate-100/90 via-orange-50/40 to-blue-50/50 border border-slate-200/60 shadow-inner -z-10 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex items-center justify-center gap-3 sm:gap-6 md:gap-10 w-full px-2"
            >
              {/* Left Phone */}
              <div className="hidden sm:block transition-all duration-500 transform -rotate-6 -mr-6 sm:-mr-8 md:-mr-10 opacity-95 hover:rotate-0 hover:z-30 hover:scale-105">
                <PhoneFrame accent="#f38200" badge="App Screen" sizeClass={PHONE_SIZE_MINI}>
                  {currentCategory.left}
                </PhoneFrame>
              </div>

              {/* Center Phone (Elevated & Primary) */}
              <div className="z-20 transition-all duration-500 transform hover:scale-105 shadow-2xl rounded-[32px]">
                <PhoneFrame accent="#f38200" badge="App Screen" sizeClass={PHONE_SIZE_DEFAULT}>
                  {currentCategory.center}
                </PhoneFrame>
              </div>

              {/* Right Phone */}
              <div className="hidden sm:block transition-all duration-500 transform rotate-6 -ml-6 sm:-ml-8 md:-ml-10 opacity-95 hover:rotate-0 hover:z-30 hover:scale-105">
                <PhoneFrame accent="#f38200" badge="App Screen" sizeClass={PHONE_SIZE_MINI}>
                  {currentCategory.right}
                </PhoneFrame>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Feature Highlights Grid beneath Phones */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl shadow-slate-200/40 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-orange-600 mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Built-in Capabilities for {currentCategory.label}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {currentCategory.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
