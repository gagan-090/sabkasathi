import { expertiseContent } from "@/lib/content";
import { DetailLayout } from "@/components/DetailLayout";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(expertiseContent).map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = expertiseContent[slug];
  
  if (!content) return { title: "Not Found" };

  return {
    title: `${content.title} | Our Expertise | Sabka Saathi`,
    description: content.description,
  };
}

export default async function ExpertisePage({ params }: Props) {
  const { slug } = await params;
  const content = expertiseContent[slug];

  if (!content) {
    notFound();
  }

  return <DetailLayout content={content} category="Expertise Area" />;
}
