"use client";

import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

interface EditBlogPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditBlogPage({ params }: EditBlogPageProps) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [docId, setDocId] = useState<string | null>(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Development");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  
  // UX State
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Slug generator helper
  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  useEffect(() => {
    // 1. Do not query Firestore before auth loading is complete
    if (authLoading) return;

    // 2. Ensure current user is authenticated and allowed admin
    if (!user || !user.email) {
      setError("You must be logged in as an authorized administrator to view this page.");
      setLoading(false);
      return;
    }

    const allowedEmailsStr = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "";
    const allowedEmails = allowedEmailsStr
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean);

    if (!allowedEmails.includes(user.email.toLowerCase())) {
      setError("Access Denied: Your account is not authorized to edit blog posts.");
      setLoading(false);
      return;
    }

    const loadParamsAndDoc = async () => {
      try {
        const { id } = await params;
        setDocId(id);
        
        const docRef = doc(db, "blogs", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "");
          setSlug(data.slug || "");
          setMetaTitle(data.metaTitle || "");
          setMetaDescription(data.metaDescription || "");
          setExcerpt(data.excerpt || "");
          setContent(data.content || "");
          setCategory(data.category || "Development");
          setTags(data.tags ? data.tags.join(", ") : "");
          setStatus(data.status || "draft");
        } else {
          setError("Blog post not found.");
        }
      } catch (err: any) {
        console.error("Error loading blog details:", err);
        setError(
          "Could not connect to Firestore. Please ensure you have created the 'Firestore Database' in your Firebase Console (console.firebase.google.com) and enabled read/write rules."
        );
      } finally {
        setLoading(false);
      }
    };
    loadParamsAndDoc();
  }, [params, authLoading, user]);

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(slugify(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docId) return;
    
    setSaving(true);
    setError(null);

    // Auth verification before queries
    if (authLoading) {
      return triggerError("Authentication is loading, please wait.");
    }
    if (!user || !user.email) {
      return triggerError("You must be logged in as an authorized administrator to perform this action.");
    }

    const allowedEmailsStr = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "";
    const allowedEmails = allowedEmailsStr
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean);

    if (!allowedEmails.includes(user.email.toLowerCase())) {
      return triggerError("Access Denied: Your account is not authorized.");
    }

    const sanitizedSlug = slugify(slug);
    if (!title.trim()) return triggerError("Title is required.");
    if (!sanitizedSlug) return triggerError("Valid slug is required.");
    if (!metaTitle.trim()) return triggerError("Meta Title is required.");
    if (!metaDescription.trim()) return triggerError("Meta Description is required.");
    if (!excerpt.trim()) return triggerError("Excerpt is required.");
    if (!category) return triggerError("Category is required.");
    if (!content.trim()) return triggerError("Blog content is required.");

    try {
      // 1. Duplicate slug check (if slug was modified)
      if (sanitizedSlug !== docId) {
        let checkSnap;
        try {
          const checkRef = doc(db, "blogs", sanitizedSlug);
          checkSnap = await getDoc(checkRef);
        } catch (err: any) {
          console.error("Duplicate check Firestore error:", err);
          return triggerError(
            "Firestore database connection failed. Please ensure you have created the 'Firestore Database' in your Firebase Console, enabled read/write rules, and that your internet connection is active."
          );
        }

        if (checkSnap && checkSnap.exists()) {
          return triggerError("A blog post with the new slug already exists. Please choose a different title or slug.");
        }
      }

      // 2. Save to Firestore
      const tagsArray = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const blogData: any = {
        title: title.trim(),
        slug: sanitizedSlug,
        metaTitle: metaTitle.trim(),
        metaDescription: metaDescription.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        category,
        tags: tagsArray,
        status,
        author: {
          name: "Ashish Kumar",
          role: "Founder & CEO",
          image: "/team/ashish-kumar.webp",
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Preserve original values
      const origRef = doc(db, "blogs", docId);
      const origSnap = await getDoc(origRef);
      if (origSnap.exists()) {
        const origData = origSnap.data();
        blogData.createdAt = origData.createdAt || blogData.createdAt;
        blogData.author = origData.author || blogData.author;
      }

      if (sanitizedSlug !== docId) {
        // Create new document with new slug ID
        await setDoc(doc(db, "blogs", sanitizedSlug), blogData);
        // Delete old document
        await deleteDoc(origRef);
      } else {
        // Just update existing document
        await setDoc(origRef, blogData);
      }

      router.push("/admin/blogs");
    } catch (err: any) {
      console.error("Save blog error:", err);
      setError(err.message || "Failed to update blog post. Check your connection/permissions.");
      setSaving(false);
    }
  };

  const triggerError = (msg: string) => {
    setError(msg);
    setSaving(false);
  };

  if (authLoading || (loading && !error)) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
      </div>
    );
  }

  // If unauthorized or error occurred
  const allowedEmailsStr = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "";
  const allowedEmails = allowedEmailsStr
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (error || !user || !user.email || !allowedEmails.includes(user.email.toLowerCase())) {
    return (
      <div className="space-y-8 text-slate-800">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blogs"
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 shadow-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Edit Blog</h1>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 text-amber-800 text-xs font-semibold flex items-start gap-2.5 shadow-sm">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>{error || "Access Denied: You do not have permissions to view this page."}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-slate-800">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/blogs"
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 shadow-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Edit Blog</h1>
          <p className="text-xs text-slate-500 font-semibold tracking-wide">Modify existing blog post and SEO settings</p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 text-amber-800 text-xs font-semibold flex items-start gap-2.5 shadow-sm animate-fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Body & Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/60 backdrop-blur-md border border-white/80 p-6 md:p-8 rounded-3xl space-y-6 shadow-[0_15px_40px_rgba(0,0,0,0.01)]">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100">Post Content</h2>
            
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                Blog Title
              </label>
              <input
                type="text"
                required
                disabled={saving}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Mastering Next.js 16 for Speed"
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                Slug (Editable)
              </label>
              <input
                type="text"
                required
                disabled={saving}
                value={slug}
                onChange={handleSlugChange}
                placeholder="e.g. mastering-nextjs-16-for-speed"
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                Excerpt (Brief summary for listing cards)
              </label>
              <textarea
                required
                disabled={saving}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                placeholder="Briefly describe what this post is about..."
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                Content (Markdown supported: ##, ###, -, **, etc.)
              </label>
              <textarea
                required
                disabled={saving}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
                placeholder="Write your article content here..."
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-805 text-xs focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all font-mono leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Settings & Media */}
        <div className="space-y-6">
          {/* Status & Category */}
          <div className="bg-white/60 backdrop-blur-md border border-white/80 p-6 rounded-3xl space-y-6 shadow-[0_15px_40px_rgba(0,0,0,0.01)]">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100">Publishing Settings</h2>
            
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                Status
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setStatus("draft")}
                  className={`py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border transition-all duration-300 ${
                    status === "draft"
                      ? "bg-orange-50 border-orange-200 text-orange-700 shadow-sm"
                      : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  Draft
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("published")}
                  className={`py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border transition-all duration-300 ${
                    status === "published"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-600 shadow-sm"
                      : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  Publish
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-707 focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600"
              >
                <option value="Development">Development</option>
                <option value="Enterprise">Enterprise</option>
                <option value="Marketing">Marketing</option>
                <option value="Strategy">Strategy</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                Tags (Comma-separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="SEO, Web Development, Nextjs"
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-805 text-xs focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600"
              />
            </div>
          </div>

          {/* SEO Metadata */}
          <div className="bg-white/60 backdrop-blur-md border border-white/80 p-6 rounded-3xl space-y-6 shadow-[0_15px_40px_rgba(0,0,0,0.01)]">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100">SEO Metadata</h2>
            
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                Meta Title
              </label>
              <input
                type="text"
                required
                disabled={saving}
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Title shown in search engines..."
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-805 text-xs focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                Meta Description
              </label>
              <textarea
                required
                disabled={saving}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={4}
                placeholder="Brief meta description for search engines..."
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-805 text-xs focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 leading-relaxed"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={saving}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-orange-600/15 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
            <Link
              href="/admin/blogs"
              className="w-full py-3.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 font-bold text-xs uppercase tracking-widest flex items-center justify-center transition-colors shadow-sm"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
