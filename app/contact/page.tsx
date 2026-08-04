import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { ContactSection } from "@/components/ContactSection";
import { PageHero } from "@/components/PageHero";
import { RoyalFooter } from "@/components/royal/RoyalFooter";
import { Building2, Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Start Your Project - Sabka Saathi Digital Services",
  description: "Get in touch with Sabka Saathi for web development, app development, and digital marketing services. Ready to help you launch and grow your business.",
  alternates: {
    canonical: "https://sabkasaathidigitalservices.com/contact",
  },
  openGraph: {
    title: "Contact Us | Start Your Project - Sabka Saathi Digital Services",
    description: "Get in touch with Sabka Saathi for web development, app development, and digital marketing services. Ready to help you launch and grow your business.",
    url: "https://sabkasaathidigitalservices.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Start Your Project - Sabka Saathi Digital Services",
    description: "Get in touch with Sabka Saathi for web development, app development, and digital marketing services. Ready to help you launch and grow your business.",
  },
};

export default function ContactPage() {
  const trustPointsData = [
    "Response within 24 Hours",
    "Free Initial Consultation",
    "Dedicated Support Team",
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <InteractiveBackground />
      <Navbar />
      <main className="flex-1 pt-0">
        {/* Header Section */}
        <PageHero
          badge="Get In Touch"
          title="Let's Build Something"
          titleHighlight="Together"
          subtitle="Ready to take your business online? Our software engineers and consultants are standing by to help you launch, optimize, and grow."
          type="contact"
          trustPoints={trustPointsData}
          ctaText="Go to Form"
          ctaHref="#contact-form"
        />

        <div id="contact-form">
          <ContactSection />
        </div>

        {/* Global Support info */}
        <section className="py-16 container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-8 bg-white/75 border border-slate-100 rounded-[2.5rem] shadow-sm backdrop-blur-sm flex flex-col items-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl w-fit">
                        <Building2 className="w-8 h-8" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Registered Office</h3>
                    <p className="text-slate-500 font-medium">Sabka Saathi Digital Services<br/>India</p>
                </div>
                <div className="p-8 bg-white/75 border border-slate-100 rounded-[2.5rem] shadow-sm backdrop-blur-sm flex flex-col items-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl w-fit">
                        <Mail className="w-8 h-8" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Email Us</h3>
                    <p className="text-slate-500 font-medium">helpsabkasaathi@gmail.com</p>
                </div>
                <div className="p-8 bg-white/75 border border-slate-100 rounded-[2.5rem] shadow-sm backdrop-blur-sm flex flex-col items-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl w-fit">
                        <Phone className="w-8 h-8" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Call/WhatsApp</h3>
                    <p className="text-slate-500 font-medium">+91 9431673018</p>
                </div>
            </div>
        </section>
      </main>
      <RoyalFooter />
    </div>
  );
}
