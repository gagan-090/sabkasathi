import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StateHub } from "@/components/seo/StateHub";
import { getStateHubPage, stateHubSlugs } from "@/lib/stateSeo";

/*
  /location/<state> — the state hub.

  This route used to render three hand-written entries from
  lib/content.locationContent (bihar, gujarat, maharashtra) through
  DetailLayout, which left twenty states with no page at all while the site
  carried 1,936 service×city pages beneath them. "Web development in Bihar" is
  a state-level query and needs a state-level target.

  Params now come from lib/geo.ts, so a state cannot exist in the location
  tree without also having a hub.
*/

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return stateHubSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
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
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const page = getStateHubPage(slug);
  if (!page) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <StateHub page={page} />
      </main>
      <Footer />
    </div>
  );
}
