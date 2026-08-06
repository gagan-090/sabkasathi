import { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoyalFooter } from "@/components/royal/RoyalFooter";
import { TownPage } from "@/components/seo/LocalityPage";
import { primaryTownParams, getTownPage } from "@/lib/townSeo";
import { ogImage } from "@/lib/business";

/*
  /location/<state>/<district>/<town> — the smallest unit of the location tree.

  Only one town per district is prerendered (the district headquarters, which
  is what people actually search); the other ~6,000 render on first request and
  are then cached for a day. `dynamicParams` stays at its default of true so
  nothing 404s in the meantime, and getTownPage returns null for any town that
  is not really in lib/geo.ts — so an invented URL still 404s rather than
  rendering a page about a place that does not exist.

  This is the same trade app/[slug]/page.tsx makes on the service×city axis:
  prerendering every combination would add minutes to each deploy for pages
  that are long tail by construction.
*/

export const revalidate = 86400;

type Props = { params: Promise<{ state: string; district: string; town: string }> };

export async function generateStaticParams() {
  return primaryTownParams;
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
