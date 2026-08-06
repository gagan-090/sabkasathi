import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { RoyalFooter } from "@/components/royal/RoyalFooter";
import { StateHub } from "@/components/seo/StateHub";
import { getStateHubPage, stateHubSlugs } from "@/lib/stateSeo";
import { ogImage } from "@/lib/business";

/*
  /location/<state> — the state hub, top of the location tree.

  The segment is named [state] rather than [slug] because two levels now nest
  beneath it: /location/<state>/<district> and .../<district>/<town>. Next
  requires one param name per position across a branch, so the rename was
  forced by adding the children — the published URLs are unchanged.

  This route used to render three hand-written entries from
  lib/content.locationContent (bihar, gujarat, maharashtra) through
  DetailLayout, which left twenty states with no page at all while the site
  carried 1,936 service×city pages beneath them. "Web development in Bihar" is
  a state-level query and needs a state-level target.

  Params now come from lib/geo.ts, so a state cannot exist in the location
  tree without also having a hub.
*/

type Props = { params: Promise<{ state: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return stateHubSlugs.map((state) => ({ state }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: slug } = await params;
  const page = getStateHubPage(slug);
  if (!page) return { title: "Not Found" };

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `https://sabkasaathidigitalservices.com/location/${slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `https://sabkasaathidigitalservices.com/location/${slug}`,
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const { state: slug } = await params;
  const page = getStateHubPage(slug);
  if (!page) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <StateHub page={page} />
      </main>
      <RoyalFooter />
    </div>
  );
}
