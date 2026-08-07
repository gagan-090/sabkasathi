import { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoyalFooter } from "@/components/royal/RoyalFooter";
import { TownPage } from "@/components/seo/LocalityPage";
import { getTownPage } from "@/lib/townSeo";
import { ogImage } from "@/lib/business";

/*
  /location/<state>/<district>/<town> — the smallest unit of the location tree.

  Nothing here is prerendered. Every town renders on first request and is then
  cached for a day. `dynamicParams` stays at its default of true, and
  getTownPage returns null for any town not really in lib/geo.ts — so an
  invented URL 404s rather than rendering a page about a place that does not
  exist.

  Prerendering even one town per district (781 pages) alongside the district
  hubs pushed the output bundle to ~3 GB across 66,000 files. That deploy
  silently shipped without the public/ directory, so every image on the site
  404'd. Build output size is a correctness constraint here, not just a speed
  one — keep this route's static params empty.
*/

export const revalidate = 86400;

type Props = { params: Promise<{ state: string; district: string; town: string }> };

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state, district, town } = await params;
  const page = getTownPage(state, district, town);
  if (!page) return { title: "Not Found" };

  const url = `https://sabkasaathidigitalservices.com${page.path}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: [
      `website development company in ${page.town.name}`,
      `software company in ${page.town.name}`,
      `mobile app development ${page.town.name}`,
      `web design ${page.district.name} district`,
      `IT company in ${page.town.name} ${page.displayState}`,
    ],
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

export default async function TownRoute({ params }: Props) {
  const { state, district, town } = await params;
  const page = getTownPage(state, district, town);
  if (!page) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <TownPage page={page} />
      </main>
      <RoyalFooter />
    </div>
  );
}
