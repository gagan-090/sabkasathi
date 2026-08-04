import { redirect, notFound } from "next/navigation";
import { expertiseContent, processContent } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

const slugAliasMap: Record<string, string> = {
  "web-development": "web-development",
  "website-development": "web-development",
  "mobile-app": "mobile-app",
  "mobile-apps": "mobile-app",
  "crm-system": "erp-crm",
  "custom-software": "custom-software",
};

export default async function ServiceSlugRedirect({ params }: Props) {
  const { slug } = await params;

  const mappedSlug = slugAliasMap[slug] || slug;

  if (expertiseContent[mappedSlug]) {
    redirect(`/expertise/${mappedSlug}`);
  }

  if (processContent[mappedSlug]) {
    redirect(`/process/${mappedSlug}`);
  }

  notFound();
}
