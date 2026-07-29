"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { Search, Plus, Edit, Trash2, Check, X, Loader2, Calendar, AlertCircle } from "lucide-react";

interface FirestoreBlog {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: "draft" | "published";
  createdAt: string;
}

export default function BlogsManagementPage() {
  const [blogs, setBlogs] = useState<FirestoreBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Delete Confirmation State
  const [deleteTarget, setDeleteTarget] = useState<FirestoreBlog | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  // Status Toggling State
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchBlogs = async () => {
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
        });
      });
      setBlogs(fetchedBlogs);
    } catch (err) {
      console.error("Error fetching blogs for management:", err);
      try {
        const snapshot = await getDocs(collection(db, "blogs"));
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
    fetchBlogs();
  }, []);

  const handleToggleStatus = async (blog: FirestoreBlog) => {
    setTogglingId(blog.id);
    const newStatus = blog.status === "published" ? "draft" : "published";
    try {
      const docRef = doc(db, "blogs", blog.id);
      await updateDoc(docRef, {
        status: newStatus,
        updatedAt: new Date().toISOString(),
      });
      setBlogs((prev) =>
        prev.map((b) => (b.id === blog.id ? { ...b, status: newStatus } : b))
      );
    } catch (err) {
      console.error("Error toggling status:", err);
      alert("Failed to update status. Check permissions.");
    } finally {
      setTogglingId(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget.id);
    try {
      await deleteDoc(doc(db, "blogs", deleteTarget.id));
      setBlogs((prev) => prev.filter((b) => b.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert("Failed to delete blog. Check permissions.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : blog.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" ? true : blog.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 relative text-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Manage Blogs</h1>
          <p className="text-xs text-slate-500 font-semibold tracking-wide">Add, update, publish, or remove blog posts</p>
        </div>
        <Link
          href="/admin/blogs/add"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-md shadow-orange-600/10 max-w-max animate-fade-in"
        >
          <Plus className="w-3.5 h-3.5" />
          Add New Blog
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white/60 backdrop-blur-md border border-white/80 p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.01)]">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-600/30 focus:border-orange-600 transition-all"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-600/30 focus:border-orange-600 transition-all"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published Only</option>
            <option value="draft">Drafts Only</option>
          </select>
        </div>

        <div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-600/30 focus:border-orange-600 transition-all"
          >
            <option value="all">All Categories</option>
            <option value="Development">Development</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Marketing">Marketing</option>
            <option value="Strategy">Strategy</option>
          </select>
        </div>
      </div>

      {/* Blog Table */}
      <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-3xl p-6 md:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.01)]">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No matching blog posts found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[9px] font-black text-slate-450 uppercase tracking-widest">
                  <th className="pb-3 pr-4">Title</th>
                  <th className="pb-3 px-4">Category</th>
                  <th className="pb-3 px-4">Status (Click to toggle)</th>
                  <th className="pb-3 px-4">Date Created</th>
                  <th className="pb-3 pl-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="text-xs text-slate-700 hover:text-slate-900 hover:bg-white/30 transition-all">
                    <td className="py-4 pr-4 font-bold max-w-xs md:max-w-md truncate text-slate-850">
                      <div className="font-bold truncate">{blog.title}</div>
                      <div className="text-[9px] text-slate-400 font-mono mt-0.5 truncate">{blog.slug}</div>
                    </td>
                    <td className="py-4 px-4 text-[10px] font-black uppercase text-slate-500">
                      {blog.category}
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleToggleStatus(blog)}
                        disabled={togglingId === blog.id}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                          blog.status === "published"
                            ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-100/50"
                            : "bg-amber-50 hover:bg-orange-50 text-amber-700 border border-orange-100/50"
                        }`}
                      >
                        {togglingId === blog.id ? (
                          <Loader2 className="w-2.5 h-2.5 animate-spin" />
                        ) : blog.status === "published" ? (
                          <Check className="w-2.5 h-2.5" />
                        ) : (
                          <X className="w-2.5 h-2.5" />
                        )}
                        {blog.status}
                      </button>
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
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/blogs/edit/${blog.id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-orange-50 text-slate-650 hover:text-orange-700 font-bold text-[10px] uppercase transition-colors"
                        >
                          <Edit className="w-3 h-3" />
                          Edit
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(blog)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold text-[10px] uppercase transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-black text-slate-800 uppercase tracking-wider">Delete Blog Post?</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Are you sure you want to delete <strong className="text-slate-800">"{deleteTarget.title}"</strong>? This action is permanent and cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-8">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deletingId !== null}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs uppercase cursor-pointer transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deletingId !== null}
                className="px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs uppercase flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-50"
              >
                {deletingId ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    Confirm Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
