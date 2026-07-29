import { locationContent } from "@/lib/content";
import { DetailLayout } from "@/components/DetailLayout";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(locationContent).map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = locationContent[slug];
  
  if (!content) return { title: "Not Found" };

  return {
    title: `${content.title} | Software Company | Sabka Saathi`,
    description: content.description,
  };
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const content = locationContent[slug];

  if (!content) {
    notFound();
  }

  return <DetailLayout content={content} category="Regional Location" />;
}
