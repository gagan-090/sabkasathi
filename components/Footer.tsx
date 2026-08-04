"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  ArrowUpRight,
  Code2,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

const PLATFORM_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/locations", label: "Locations" },
  { href: "/industries", label: "Industries" },
  { href: "/trust", label: "Legal & Trust" },
  { href: "/about", label: "About Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/seo", label: "SEO" },
];

const HUBS = [
  { href: "/location/bihar", name: "Bihar", cities: "Patna, Muzaffarpur, Gaya, Bhagalpur" },
  { href: "/location/maharashtra", name: "Maharashtra", cities: "Pune, Mumbai, Nagpur" },
  { href: "/location/gujarat", name: "Gujarat", cities: "Ahmedabad, Surat, Vadodara" },
];

export function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/5 bg-slate-950 py-16 text-white md:py-24">
      {/* Watermark */}
      <div className="pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center overflow-hidden opacity-[0.02] sm:opacity-[0.025]">
        <svg viewBox="0 0 1000 300" className="h-full max-h-[85%] w-full">
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-none stroke-white stroke-[2] text-[110px] font-black tracking-[0.2em] sm:text-[130px]"
          >
            SABKA SAATHI
          </text>
        </svg>
      </div>

      <div className="container relative z-20 mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-12 lg:gap-16">

          {/* Logo column */}
          <motion.div
            className="col-span-2 text-left md:col-span-4"
            
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            custom={0}
          >
            <h3 className="mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-2xl font-black uppercase tracking-tight text-transparent">
              SABKA SAATHI
            </h3>
            <p className="mb-6 max-w-sm text-sm font-medium leading-relaxed text-slate-400">
              Premium software development agency specializing in Next.js, CRM automation, and high-fidelity digital transformation.
            </p>
            <div className="flex gap-3">
              {[
                { href: "tel:+919431673018", label: "Call Sabka Saathi", Icon: Phone },
                { href: "mailto:helpsabkasaathi@gmail.com", label: "Email Sabka Saathi", Icon: Mail },
                { href: "https://wa.me/919431673018", label: "WhatsApp Sabka Saathi", Icon: MessageCircle, external: true },
              ].map(({ href, label, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-600 hover:bg-orange-600 hover:text-white hover:shadow-orange-600/20 active:scale-95"
                >
                  <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Platform */}
          <motion.div
            className="col-span-1 text-left md:col-span-2"
           
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            custom={1}
          >
            <h4 className="mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">Platform</h4>
            <ul className="space-y-3.5 text-xs font-bold text-slate-350">
              {PLATFORM_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex items-center gap-1 transition-all duration-300 hover:translate-x-1.5 hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="col-span-1 text-left md:col-span-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            custom={2}
          >
            <h4 className="mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">Contact</h4>
            <ul className="space-y-3.5 text-xs font-bold text-slate-350">
              <li>
                <Link href="/contact" className="inline-flex items-center gap-1 transition-all duration-300 hover:translate-x-1.5 hover:text-white">
                  Get a Quote
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/919431673018"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-all duration-300 hover:translate-x-1.5 hover:text-white"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-orange-600/70" />
                  WhatsApp Support
                </a>
              </li>
              <li className="flex items-center gap-1.5 select-all font-medium text-slate-500">
                <a href="tel:+919431673018" className="inline-flex items-center gap-1.5 transition-all duration-300 hover:translate-x-1.5 hover:text-white">
                  <Phone className="h-3.5 w-3.5 text-orange-600/70" />
                  +91 94316 73018
                </a>
              </li>
              <li className="flex items-center gap-1.5 overflow-hidden text-ellipsis select-all font-medium lowercase text-slate-500">
                <a href="mailto:helpsabkasaathi@gmail.com" className="inline-flex items-center gap-1.5 transition-all duration-300 hover:translate-x-1.5 hover:text-white">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-orange-600/70" />
                  helpsabkasaathi@gmail.com
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Regional hubs */}
          <motion.div
            className="col-span-2 text-left md:col-span-3"
        
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            custom={3}
          >
            <h4 className="mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">Regional Hubs</h4>
            <ul className="space-y-4 text-xs font-bold text-slate-350">
              {HUBS.map((hub) => (
                <li key={hub.href} className="flex flex-col gap-0.5">
                  <Link
                    href={hub.href}
                    className="group inline-flex items-center gap-1.5 transition-colors hover:text-white"
                  >
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-orange-600/70 transition-transform duration-300 group-hover:scale-110" />
                    {hub.name}
                  </Link>
                  <span className="pl-5 text-[10px] font-medium text-slate-500">{hub.cities}</span>
                </li>
              ))}
              <li>
                <Link
                  href="/locations"
                  className="group inline-flex items-center gap-1.5 text-orange-500 transition-colors hover:text-orange-300"
                >
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  Browse all cities
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 sm:flex-row"

          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          custom={4}
        >
          <p>© 2026 SABKA SAATHI. ALL RIGHTS RESERVED.</p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <p className="rounded-lg border border-white/5 bg-white/5 px-3 py-1.5 text-slate-400">
              GSTIN: 10LAHPK8872L1Z3
            </p>

          </div>
        </motion.div>
      </div>

      {/* Decorative ambient blobs */}
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-orange-600/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-500/5 blur-[100px]" />
    </footer>
  );
}