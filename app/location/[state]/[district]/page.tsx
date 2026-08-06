import { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoyalFooter } from "@/components/royal/RoyalFooter";
import { DistrictHub } from "@/components/seo/LocalityPage";
import { districtParams, getDistrictPage } from "@/lib/townSeo";
import { ogImage } from "@/lib/business";

/*
  /location/<state>/<district> — the district hub.

  Every district is prerendered: there are ~780 of them, they are the pages
  that make the 6,800 town pages beneath them discoverable, and they are cheap
  to build. `dynamicParams = false` so a mistyped district 404s rather than
  rendering an empty hub.
*/

type Props = { params: Promise<{ state: string; district: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return districtParams;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state, district } = await params;
  const page = getDistrictPage(state, district);
  if (!page) return { title: "Not Found" };

  const url = `https://sabkasaathidigitalservices.com${page.path}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      siteName: "Sabka Saathi",
      type: "website",
      locale: "en_IN",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default async function DistrictPage({ params }: Props) {
  const { state, district } = await params;
  const page = getDistrictPage(state, district);
  if (!page) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <DistrictHub page={page} />
      </main>
      <RoyalFooter />
    </div>
  );
}
