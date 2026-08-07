import { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoyalFooter } from "@/components/royal/RoyalFooter";
import { DistrictHub } from "@/components/seo/LocalityPage";
import { getDistrictPage } from "@/lib/townSeo";
import { ogImage } from "@/lib/business";

/*
  /location/<state>/<district> — the district hub.

  Rendered on first request and then cached for a day, not prerendered.
  Prerendering all 781 was the original plan and it built fine locally, but
  together with the town pages it put ~470 MB and 18,000 files into the output
  bundle — enough that the deploy dropped the public/ directory and every image
  on the site 404'd. Serving these through ISR costs one slow first request per
  district and nothing after that.

  getDistrictPage returns null for anything not in lib/geo.ts, so a mistyped
  district still 404s.
*/

export const revalidate = 86400;

type Props = { params: Promise<{ state: string; district: string }> };

export async function generateStaticParams() {
  return [];
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
