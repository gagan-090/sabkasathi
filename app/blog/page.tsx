import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { RoyalFooter } from "@/components/royal/RoyalFooter";
import { ContactSection } from "@/components/ContactSection";
import { blogPosts, BlogPost } from "@/lib/blogs";
import { BlogCard } from "@/components/BlogCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Insights & Strategy | Sabka Saathi Digital Blog",
  description: "Expert insights on web development, software architecture, ERP systems, and digital marketing strategies for Indian businesses.",
  keywords: ["Digital Marketing Blog Bihar", "Web Development Trends India", "ERP System Guide", "Software Architecture Insights"],
};

const categoryAssets: Record<string, { gradient: string; icon: string }> = {
  Development: { gradient: "from-blue-600 to-amber-500", icon: "🌐" },
  Enterprise: { gradient: "from-orange-600 to-pink-500", icon: "⚙️" },
  Marketing: { gradient: "from-orange-600 to-amber-600", icon: "🚀" },
  Strategy: { gradient: "from-slate-700 to-slate-900", icon: "💻" },
};

async function getFirestoreBlogs(): Promise<BlogPost[]> {
  try {
    const q = query(collection(db, "blogs"), where("status", "==", "published"));
    const snapshot = await getDocs(q);
    const posts: BlogPost[] = [];

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
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

      posts.push({
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
      });
    });

    return posts;
  } catch (err) {
    console.error("Error fetching published blogs from Firestore:", err);
    return [];
  }
}

export default async function BlogListingPage() {
  const firestorePosts = await getFirestoreBlogs();
  const staticPosts = Object.values(blogPosts);

  // Filter out any static posts that have already been uploaded to Firestore
  const firestoreSlugs = new Set(firestorePosts.map((p) => p.slug));
  const uniqueStaticPosts = staticPosts.filter((p) => !firestoreSlugs.has(p.slug));

  // Combine both sources
  const allPosts = [...firestorePosts, ...uniqueStaticPosts];

  // Sort descending by publication date
  allPosts.sort((a, b) => {
    const timeA = a.date === "Recent" ? Date.now() : new Date(a.date).getTime();
    const timeB = b.date === "Recent" ? Date.now() : new Date(b.date).getTime();
    const validA = isNaN(timeA) ? 0 : timeA;
    const validB = isNaN(timeB) ? 0 : timeB;
    return validB - validA;
  });

  return (
    <div className="flex min-h-screen flex-col selection:bg-orange-100 selection:text-orange-950 bg-[#f5f5f7]">
      <InteractiveBackground />
      <Navbar />

      <main className="flex-1 pt-6 pb-24 relative z-10">
        <section className="container mx-auto px-4 max-w-7xl">
          {/* iOS-style Hero: frosted glass slab, big rounded corners, soft depth */}
          <div className="relative py-14 md:py-24 mb-16 rounded-[2.75rem] bg-white/55 backdrop-blur-2xl backdrop-saturate-150 border border-white/70 p-8 md:p-14 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_20px_50px_rgba(232,68,90,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] overflow-hidden">
            {/* Soft decorative background highlights, iOS wallpaper-style blobs */}
            <div className="absolute -top-10 -right-10 w-96 h-96 bg-gradient-to-br from-orange-200/25 to-amber-200/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-gradient-to-tr from-amber-200/15 to-pink-200/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 text-orange-700 text-[10px] font-black uppercase tracking-[0.2em] mb-7 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
                Sabka Saathi Knowledge Hub
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-950 mb-6 tracking-tight leading-[1.08]">
                Insights &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">Digital Strategy</span>
              </h1>
              <p className="text-base md:text-lg text-slate-600 font-semibold max-w-2xl leading-relaxed">
                Expert analysis, technical deep-dives, and strategic guides on modern web development, business automation, and digital marketing to scale your enterprise in India.
              </p>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-24">
            {allPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>

          <ContactSection />
        </section>
      </main>

      <RoyalFooter />
    </div>
  );
}
