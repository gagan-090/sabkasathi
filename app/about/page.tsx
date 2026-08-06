import { Metadata } from "next";
import { FounderSection } from "@/components/FounderSection";
import { StatsShowcase } from "@/components/StatsShowcase";
import { Navbar } from "@/components/Navbar";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { ContactSection } from "@/components/ContactSection";
import { RoyalFooter } from "@/components/royal/RoyalFooter";
import { PageHero } from "@/components/PageHero";
import { ogImage } from "@/lib/business";

export const metadata: Metadata = {
  title: "About Us | Our Story, Team & Vision - Sabka Saathi Digital Services",
  description: "Learn about the mission of Sabka Saathi, our commitment to growth, our modern technology stacks, and our expert software development team.",
  alternates: {
    canonical: "https://sabkasaathidigitalservices.com/about",
  },
  openGraph: {
    title: "About Us | Our Story, Team & Vision - Sabka Saathi Digital Services",
    description: "Learn about the mission of Sabka Saathi, our commitment to growth, our modern technology stacks, and our expert software development team.",
    url: "https://sabkasaathidigitalservices.com/about",
    type: "website",
    images: [ogImage],
    },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Our Story, Team & Vision - Sabka Saathi Digital Services",
    description: "Learn about the mission of Sabka Saathi, our commitment to growth, our modern technology stacks, and our expert software development team.",
  },
};

export default function AboutPage() {
  const trustCardsData = [
    { title: "Startup Focused", desc: "Tailored structures to launch and scale rapidly." },
    { title: "Modern Tech Stack", desc: "Using React, Next.js, and cloud native architectures." },
    { title: "Business Growth", desc: "Aligned with real-world outcomes and user metrics." },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <InteractiveBackground />
      <Navbar />
      <main className="flex-1 pt-0">
        {/* Header Section */}
        <PageHero
          badge="Corporate Mission"
          title="Who We Are & Our"
          titleHighlight="Vision"
          subtitle="A team of passionate digital experts committed to making growth accessible for businesses of all sizes across India. We engineer custom software that elevates brands."
          type="about"
          trustCards={trustCardsData}
          ctaText="Learn More"
          ctaHref="#founder"
        />

        <div id="founder">
          <FounderSection />
        </div>
        
        <div className="container mx-auto px-4 pb-24">
          <StatsShowcase />
        </div>

        <ContactSection />
      </main>
      <RoyalFooter />
    </div>
  );
}
