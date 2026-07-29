import { Metadata } from "next";
import { IndustriesSection } from "@/components/IndustriesSection";
import { Navbar } from "@/components/Navbar";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Industries We Serve | Sector-Specific Digital Solutions - Sabka Saathi",
  description: "Browse 50+ industries served by Sabka Saathi, including healthcare, education, retail, real estate, and finance. High-performance software solutions for business sectors.",
  alternates: {
    canonical: "https://sabkasaathidigitalservices.com/industries",
  },
  openGraph: {
    title: "Industries We Serve | Sector-Specific Digital Solutions - Sabka Saathi",
    description: "Browse 50+ industries served by Sabka Saathi, including healthcare, education, retail, real estate, and finance. High-performance software solutions for business sectors.",
    url: "https://sabkasaathidigitalservices.com/industries",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries We Serve | Sector-Specific Digital Solutions - Sabka Saathi",
    description: "Browse 50+ industries served by Sabka Saathi, including healthcare, education, retail, real estate, and finance. High-performance software solutions for business sectors.",
  },
};

export default function IndustriesPage() {
  const statsData = [
    { val: "50+", label: "Business Sectors" },
    { val: "100%", label: "Startup Focused" },
    { val: "24/7", label: "Sector Support" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <InteractiveBackground />
      <Navbar />
      <main className="flex-1 pt-0">
        {/* Header Section */}
        <PageHero
          badge="Market Reach"
          title="Industries We"
          titleHighlight="Empower"
          subtitle="Explore 50+ industry-specific digital solutions designed to help your business unlock its full potential. From medical and education to e-commerce and local shops, we drive sector-wide innovation."
          type="industries"
          stats={statsData}
          ctaText="Explore Sectors"
          ctaHref="#sectors"
        />

        <div id="sectors">
          <IndustriesSection />
        </div>
        
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
