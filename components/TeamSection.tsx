"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/LiquidButton";
import Link from "next/link";
import Image from "next/image";
import { User, ShieldCheck, Zap, MessageSquare, Target } from "lucide-react";

const teamMembers = [
  {
    name: "Ashish Kumar",
    role: "Founder & CEO",
    image: "/team/ashish-kumar.webp",
    description: "The driving force behind the vision of making digital services accessible for every business. Focused on strategy, execution, and client success.",
    color: "bg-orange-600",
  },
  {
    name: "Parth Patel",
    role: "DevOps & Full Stack Developer",
    image: "/team/parth-patel.webp",
    description: "Handles infrastructure and development with efficiency. Responsible for deployment, server management, and building scalable applications.",
    color: "bg-blue-500",
  },
  {
    name: "Vishal Vyas",
    role: "Full Stack Developer",
    image: "/team/generic-dev-1.webp",
    description: "Handles both frontend and backend development with precision. Focused on building scalable, fast, and user-friendly applications.",
    color: "bg-emerald-500",
  },
  {
    name: "Ravi Ranjan Kumar",
    role: "DevOps & Full Stack Developer",
    image: "/team/parth-patel.webp",
    description: "Brings a powerful combination of development and infrastructure expertise. Works on building complete systems from development to deployment.",
    color: "bg-amber-500",
  },
  {
    name: "Rahul Kumar",
    role: "Web Developer",
    image: "/team/generic-dev-1.webp",
    description: "Specializes in creating modern, responsive, and high-performing websites that help businesses build a strong online presence.",
    color: "bg-amber-600",
  },
  {
    name: "Anant Gaur",
    role: "Full Stack Developer",
    image: "/team/parth-patel.webp",
    description: "Focused on developing dynamic and feature-rich applications. Ensures smooth functionality and seamless user experience across platforms.",
    color: "bg-cyan-500",
  },
  {
    name: "Shah-E-Alam",
    role: "Web Developer",
    image: "/team/generic-dev-1.webp",
    description: "Works on designing and developing clean, responsive websites with a focus on performance, usability, and user engagement.",
    color: "bg-amber-600",
  },
  {
    name: "Piyush Kumar",
    role: "Business Development Executive",
    image: "/team/generic-biz-1.webp",
    description: "Focused on building strong client relationships and driving business growth. Works closely with clients to connect them with solutions.",
    color: "bg-orange-500",
  },
];

const commitments = [
  { icon: <ShieldCheck className="w-5 h-5" />, label: "Professional Work Approach" },
  { icon: <Zap className="w-5 h-5" />, label: "Timely Delivery" },
  { icon: <MessageSquare className="w-5 h-5" />, label: "Clear Communication" },
  { icon: <Target className="w-5 h-5" />, label: "Focus on Real Results" },
];

export function TeamSection() {
  return (
    <div className="py-16">
      <div className="flex flex-col items-center mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest mb-4"
        >
          Our Workforce
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Meet Our <span className="text-orange-600 italic">Experts</span>
        </h2>
        <p className="text-slate-500 font-medium max-w-2xl">
          Behind Sabka Saathi Digital Services is a dedicated team of professionals working together to deliver powerful digital solutions and real business growth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="group h-full p-6 bg-white/50 backdrop-blur-md border border-slate-100 rounded-3xl hover:shadow-2xl hover:shadow-orange-600/10 transition-all duration-500 hover:-translate-y-2">
              <div className="relative mb-6">
                <div className={`absolute -inset-1 rounded-2xl ${member.color} opacity-20 blur group-hover:opacity-40 transition-opacity`} />
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-500 bg-slate-100 flex items-center justify-center">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      (e.target as any).style.display = 'none';
                    }}
                  />
                  <User className="w-12 h-12 text-slate-300" />
                </div>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-orange-700 transition-colors">{member.name}</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{member.role}</p>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {member.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-[3rem] bg-gradient-to-br from-slate-900 to-slate-950 p-8 md:p-12 overflow-hidden shadow-2xl border border-white/5"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 blur-[100px] rounded-full pointer-events-none -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none -ml-48 -mb-48" />
        
        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
                <span className="p-2 rounded-xl bg-white/10 text-orange-500">🤝</span>
                Team Commitment
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {commitments.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                    <div className="text-orange-500">{item.icon}</div>
                    <span className="text-sm font-bold text-slate-200">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:text-right">
              <blockquote className="text-2xl md:text-3xl font-black text-white italic leading-tight mb-8">
                &quot;A strong team builds strong digital solutions.&quot;
              </blockquote>
              <Link href="/#contact">
                 <Button className="rounded-2xl px-10 py-7 text-lg shadow-xl shadow-orange-600/20">Work With Our Team</Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
