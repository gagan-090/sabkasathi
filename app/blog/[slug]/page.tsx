import { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, BlogPost } from "@/lib/blogs";
import { Navbar } from "@/components/Navbar";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { RoyalFooter } from "@/components/royal/RoyalFooter";
import { ContactSection } from "@/components/ContactSection";
import { Button } from "@/components/ui/LiquidButton";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ShareButton } from "@/components/ShareButton";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const categoryAssets: Record<string, { gradient: string; icon: string }> = {
  Development: { gradient: "from-blue-600 to-amber-500", icon: "🌐" },
  Enterprise: { gradient: "from-orange-600 to-pink-500", icon: "⚙️" },
  Marketing: { gradient: "from-orange-600 to-amber-600", icon: "🚀" },
  Strategy: { gradient: "from-slate-700 to-slate-900", icon: "💻" },
};

async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const docRef = doc(db, "blogs", slug);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      // Only return if published
      if (data.status !== "published") return null;

      const cat = data.category || "Development";
      const assets = categoryAssets[cat] || { gradient: "from-orange-600 to-amber-600", icon: "📄" };
      
      const wordCount = (data.content || "").split(/\s+/).length;
      const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
      
      const dateFormatted = data.createdAt 
        ? new Date(data.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
          })
        : "Recent";

      return {
        slug: data.slug || docSnap.id,
        title: data.title || "",
        subtitle: data.metaTitle || "",
        category: cat as any,
        date: dateFormatted,
        readTime,
        author: {
          name: data.author?.name || "Ashish Kumar",
          role: data.author?.role || "Founder & CEO",
          image: data.author?.image || "/team/ashish-kumar.webp",
        },
        excerpt: data.excerpt || "",
        content: data.content || "",
        keywords: data.tags || [],
        gradient: assets.gradient,
        icon: assets.icon,
      };
    }
  } catch (err) {
    console.error("Error fetching blog post by slug from Firestore:", err);
  }

  // Fallback to static post if present
  const staticPost = blogPosts[slug];
  if (staticPost) {
    return staticPost;
  }

  return null;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) return { title: "Blog Not Found" };

  return {
    title: `${post.title} | Sabka Saathi Blog`,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: `https://sabkasaathi.in/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex min-h-screen flex-col selection:bg-orange-100 selection:text-orange-950">
      <InteractiveBackground />
      <Navbar />
      
      <main className="flex-1 pt-6 pb-24 relative z-10">
        <article className="container mx-auto px-4 max-w-3xl">
          {/* Back Button */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-700 transition-colors mb-12 bg-white/30 backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-100 shadow-sm">
            &larr; Back to Insights
          </Link>

          {/* Hero Header */}
          <header className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100/50 text-[9px] font-black uppercase tracking-widest text-orange-700 mb-6">
              {post.category}
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-[2.75rem] font-black text-slate-955 mb-6 leading-[1.2] tracking-tight">
              {post.title}
            </h1>

            <p className="text-base md:text-lg text-slate-650 font-semibold mb-8 leading-relaxed pl-4 border-l-2 border-orange-600 py-1 italic bg-orange-50/10 rounded-r-xl">
              "{post.subtitle}"
            </p>

            <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-slate-100/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 text-white font-black text-xs flex items-center justify-center border-2 border-white shadow-sm ring-1 ring-slate-100/50 select-none">
                  {getInitials(post.author.name)}
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 uppercase tracking-wider">{post.author.name}</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">{post.author.role}</p>
                </div>
              </div>

              <div className="flex gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Published</span>
                  <span className="text-slate-600">{post.date}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Read Time</span>
                  <span className="text-slate-600">{post.readTime}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Article Body */}
          <div className="bg-white/50 backdrop-blur-2xl border border-slate-100/70 rounded-[2.5rem] p-6 md:p-12 mb-20 relative overflow-hidden shadow-sm">
             <div className="prose prose-slate max-w-none 
                prose-headings:font-black prose-headings:text-slate-955 prose-headings:tracking-tight
                prose-p:text-slate-700 prose-p:leading-[1.8] prose-p:font-medium prose-p:text-base prose-p:md:text-[17px] prose-p:mb-8
                prose-strong:text-slate-950 prose-strong:font-black
                prose-ul:list-disc prose-li:text-slate-700 prose-li:mb-2
                relative z-10">
               {post.content.split('\n').map((line, i) => {
                 const trimmed = line.trim();
                 if (!trimmed) return <br key={i} />;
                 
                 if (trimmed.startsWith('###')) {
                   return <h3 key={i} className="text-xl md:text-2xl font-black text-slate-955 mt-10 mb-4 leading-tight">{trimmed.replace('###', '').trim()}</h3>;
                 }
                 if (trimmed.startsWith('##')) {
                   return <h2 key={i} className="text-2xl md:text-3xl font-black text-slate-955 mt-12 mb-6 leading-tight">{trimmed.replace('##', '').trim()}</h2>;
                 }
                 if (trimmed.startsWith('-')) {
                    return <li key={i} className="ml-4">{trimmed.replace('-', '').trim()}</li>;
                 }
                 if (trimmed.startsWith('**')) {
                    return <p key={i} className="font-black text-slate-955 text-lg mt-10 mb-4">{trimmed.replace(/\*\*/g, '').trim()}</p>;
                 }
                 
                 return <p key={i}>{trimmed}</p>;
               })}
             </div>

             <div className="mt-16 pt-8 border-t border-slate-100/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tags:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {post.keywords.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-slate-50 border border-slate-100/50 rounded-lg text-[9px] font-bold text-slate-400 uppercase tracking-wider">#{tag}</span>
                    ))}
                  </div>
                </div>
               <ShareButton
  title={post.title}
  text={post.excerpt}
  className="rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer"
/>
             </div>
          </div>

        </article>
      </main>

      <RoyalFooter />
    </div>
  );
}
