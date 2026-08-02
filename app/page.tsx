import type { Metadata } from "next";
import { RoyalHome } from "@/components/royal/RoyalHome";
import { RoyalFooter } from "@/components/royal/RoyalFooter";
import { BiharServicesSEO } from "@/components/BiharServicesSEO";
import { RecentProjectsShowcase } from "@/components/RecentProjectsShowcase";
import { PortfolioShowcase } from "@/components/PortfolioShowcase";
import { BrowserPortfolioShowcase } from "@/components/BrowserPortfolioShowcase";
import { fetchProjectsByType } from "@/lib/project";

export const metadata: Metadata = {
  title: "Sabka Saathi - High-Performance Software Development & CRM Automation",
  description:
    "Accelerate your business with Sabka Saathi. We build custom Next.js web applications, mobile apps, and CRM systems for startups and local businesses across India.",
  keywords: [
    "software development company",
    "next.js development",
    "custom software bihar",
    "software agency pune",
    "web development gujarat",
    "CRM automation india",
    "mobile app development",
    "startup website builders",
    "GST registered software agency",
    "hire nextjs developers",
    "flutter app development agency",
    "react native developer india",
    "whatsapp api integration services",
    "custom erp systems",
    "saas development company",
    "enterprise software development",
    "web development company bihar",
    "app development company patna",
    "crm solutions for startups"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sabka Saathi - High-Performance Software Development & CRM Automation",
    description:
      "Accelerate your business with Sabka Saathi. We build custom Next.js web applications, mobile apps, and CRM systems for startups and local businesses across India.",
    url: "https://sabkasaathidigitalservices.com",
    siteName: "Sabka Saathi",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Sabka Saathi Digital Services Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sabka Saathi - High-Performance Software Development & CRM Automation",
    description:
      "Accelerate your business with Sabka Saathi. Custom Next.js web applications, mobile apps, and CRM systems.",
    images: ["/logo.png"],
  },
};

/*
  The "Royal Amethyst" home page.

  RoyalHome carries the hero through the closing CTA. The live website and app
  demos are passed into its `showcase` slot, which renders them as the work
  section itself — that is where the hero's "See the work" link lands, so they
  belong there rather than stranded below the closing CTA.

  RecentProjectsShowcase and BiharServicesSEO are kept from the previous home
  page because they are what ranks for the Bihar/city queries, and the footer
  renders last so those sections sit above it.
*/
// The showcase projects are fetched here rather than in the browser so the
// demos ship inside the HTML and paint immediately. Revalidating hourly keeps
// admin edits flowing through without giving up static delivery.
export const revalidate = 3600;

export default async function Home() {
  // fetchProjectsByType swallows its own errors and returns [], so a Firestore
  // outage degrades to the client-side fetch path instead of failing the page.
  const [desktopProjects, mobileProjects] = await Promise.all([
    fetchProjectsByType("desktop"),
    fetchProjectsByType("mobile"),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <RoyalHome
        showcase={
          <>
            <BrowserPortfolioShowcase initialProjects={desktopProjects} />
            <PortfolioShowcase initialProjects={mobileProjects} />
          </>
        }
      />
      <RecentProjectsShowcase />
      <BiharServicesSEO />
      <RoyalFooter />
    </div>
  );
}
