"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { blogPosts } from "@/lib/blogs";
import Link from "next/link";
import { FileText, CheckCircle, Edit, Plus, Upload, Loader2, Calendar } from "lucide-react";

interface FirestoreBlog {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: "draft" | "published";
  createdAt: string;
  author: any;
}

export default function DashboardPage() {
  const [blogs, setBlogs] = useState<FirestoreBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState<string | null>(null);

  const fetchBlogsData = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const fetchedBlogs: FirestoreBlog[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        fetchedBlogs.push({
          id: docSnap.id,
          title: data.title || "",
          slug: data.slug || "",
          category: data.category || "",
          status: data.status || "draft",
          createdAt: data.createdAt || "",
          author: data.author || null,
        });
      });
      setBlogs(fetchedBlogs);
    } catch (err) {
      console.error("Error fetching blogs for dashboard:", err);
      try {
        const qNoOrder = collection(db, "blogs");
        const snapshot = await getDocs(qNoOrder);
        const fetchedBlogs: FirestoreBlog[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          fetchedBlogs.push({
            id: docSnap.id,
            title: data.title || "",
            slug: data.slug || "",
            category: data.category || "",
            status: data.status || "draft",
            createdAt: data.createdAt || "",
            author: data.author || null,
          });
        });
        fetchedBlogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setBlogs(fetchedBlogs);
      } catch (innerErr) {
        console.error("Fallback fetch failed", innerErr);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogsData();
  }, []);

  const totalBlogs = blogs.length;
  const publishedCount = blogs.filter((b) => b.status === "published").length;
  const draftCount = blogs.filter((b) => b.status === "draft").length;
  const recentBlogs = blogs.slice(0, 5);

  const handleSeedData = async () => {
    setSeeding(true);
    setSeedSuccess(null);
    try {
      const postsToSeed = Object.values(blogPosts);
      let seededCount = 0;
      for (const post of postsToSeed) {
        const docRef = doc(db, "blogs", post.slug);
        
        const blogData = {
          title: post.title,
          slug: post.slug,
          metaTitle: `${post.title} | Sabka Saathi Blog`,
          metaDescription: post.excerpt,
          excerpt: post.excerpt,
          content: post.content.trim(),
          category: post.category,
          tags: post.keywords,
          featuredImage: `https://picsum.photos/600/400?random=${seededCount + 1}`, // Clean visual mockup image instead of empty fallback
          status: "published",
          author: {
            name: post.author.name,
            role: post.author.role,
            image: post.author.image,
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        await setDoc(docRef, blogData);
        seededCount++;
      }
      setSeedSuccess(`Successfully seeded ${seededCount} blog posts into Firestore!`);
      await fetchBlogsData();
    } catch (err) {
      console.error("Seeding error:", err);
      setSeedSuccess("Failed to seed blogs. Check console or Firestore permissions.");
    } finally {
      setSeeding(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Dashboard</h1>
          <p className="text-xs text-slate-500 font-semibold tracking-wide">Overview of your blog system and metrics</p>
        </div>
        <div className="flex items-center gap-3">
          {totalBlogs === 0 && (
            <button
              onClick={handleSeedData}
              disabled={seeding}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-orange-300 hover:bg-orange-50 text-orange-700 font-bold text-xs uppercase tracking-wider transition-all duration-300 disabled:opacity-50 cursor-pointer"
            >
              {seeding ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Seeding...
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  Seed Static Blogs
                </>
              )}
            </button>
          )}
          <Link
            href="/admin/blogs/add"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-md shadow-orange-600/10"
          >
            <Plus className="w-3.5 h-3.5" />
            Add New Blog
          </Link>
        </div>
      </div>

      {seedSuccess && (
        <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 text-orange-900 text-xs font-bold shadow-sm">
          {seedSuccess}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white/60 backdrop-blur-md border border-white/80 p-6 rounded-2xl relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.01)]">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-600/5 rounded-full blur-2xl pointer-events-none" />
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Blogs</p>
          <div className="flex items-end justify-between mt-2">
            <span className="text-4xl font-black text-slate-800">{totalBlogs}</span>
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100/50 flex items-center justify-center text-orange-700">
              <FileText className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-md border border-white/80 p-6 rounded-2xl relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.01)]">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Published</p>
          <div className="flex items-end justify-between mt-2">
            <span className="text-4xl font-black text-slate-800">{publishedCount}</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100/50 flex items-center justify-center text-emerald-600">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-md border border-white/80 p-6 rounded-2xl relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.01)]">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-600/5 rounded-full blur-2xl pointer-events-none" />
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Drafts</p>
          <div className="flex items-end justify-between mt-2">
            <span className="text-4xl font-black text-slate-800">{draftCount}</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100/50 flex items-center justify-center text-amber-700">
              <FileText className="w-5 h-5 opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Blogs Table */}
      <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-3xl p-6 md:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.01)]">
        <h2 className="text-base font-black text-slate-800 uppercase tracking-wider mb-6">Recent Blogs</h2>
        
        {recentBlogs.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-white/40">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">No blogs found in Firestore</p>
            {totalBlogs === 0 && (
              <button
                onClick={handleSeedData}
                disabled={seeding}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50 hover:bg-orange-100/70 text-orange-700 border border-orange-100 font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 disabled:opacity-50"
              >
                {seeding ? "Seeding..." : "Seed Current Blogs from JSON"}
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="pb-3 pr-4">Title</th>
                  <th className="pb-3 px-4">Category</th>
                  <th className="pb-3 px-4">Status</th>
                  <th className="pb-3 px-4">Date Created</th>
                  <th className="pb-3 pl-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentBlogs.map((blog) => (
                  <tr key={blog.id} className="text-xs text-slate-700 hover:text-slate-900 hover:bg-white/30 transition-all group">
                    <td className="py-4 pr-4 font-bold truncate max-w-xs md:max-w-md text-slate-850">
                      {blog.title}
                    </td>
                    <td className="py-4 px-4 text-[10px] font-bold uppercase text-slate-500">
                      {blog.category}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                          blog.status === "published"
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            : "bg-amber-50 text-amber-700 border border-orange-100"
                        }`}
                      >
                        {blog.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[10px] font-bold text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-orange-600" />
                        {blog.createdAt
                          ? new Date(blog.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "N/A"}
                      </div>
                    </td>
                    <td className="py-4 pl-4 text-right">
                      <Link
                        href={`/admin/blogs/edit/${blog.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-orange-50 text-slate-600 hover:text-orange-700 font-bold text-[10px] uppercase tracking-wider transition-colors duration-300"
                      >
                        <Edit className="w-3 h-3" />
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
