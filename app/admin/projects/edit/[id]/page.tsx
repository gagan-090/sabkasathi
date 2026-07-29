"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Monitor, Smartphone, Loader2, Save, Trash2 } from "lucide-react";
import { fetchProjectById, updateProject, deleteProject, ProjectType } from "@/lib/project";

const ACCENT_SWATCHES = ["#f38200", "#3b82f6", "#ef4444", "#8b5cf6", "#ec4899", "#10b981"];

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [type, setType] = useState<ProjectType>("desktop");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [accentColor, setAccentColor] = useState(ACCENT_SWATCHES[0]);
  const [order, setOrder] = useState(0);
  const [active, setActive] = useState(true);

  useEffect(() => {
    (async () => {
      const p = await fetchProjectById(id);
      if (p) {
        setType(p.type);
        setTitle(p.title);
        setUrl(p.url);
        setCategory(p.category);
        setDescription(p.description);
        setYear(p.year || new Date().getFullYear().toString());
        setAccentColor(p.accentColor || ACCENT_SWATCHES[0]);
        setOrder(p.order || 0);
        setActive(p.active);
      }
      setLoading(false);
    })();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim() || !category.trim()) {
      setError("Title, URL and Category are required.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await updateProject(id, {
        title: title.trim(),
        url: url.trim(),
        category: category.trim(),
        description: description.trim(),
        type,
        accentColor,
        year,
        order: Number(order) || 0,
        active,
      });
      router.push("/admin/projects");
    } catch (err) {
      console.error("Update failed", err);
      setError("Failed to update project.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this project permanently?")) return;
    setDeleting(true);
    try {
      await deleteProject(id);
      router.push("/admin/projects");
    } catch (err) {
      console.error("Delete failed", err);
      setError("Failed to delete project.");
      setDeleting(false);
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
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/projects"
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-100 bg-white text-slate-500 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Edit Project</h1>
            <p className="text-xs text-slate-500 font-semibold tracking-wide">Update showcase entry details</p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
        >
          {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
          Delete
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/60 backdrop-blur-md border border-white/80 rounded-3xl p-6 md:p-8 space-y-6 shadow-[0_15px_40px_rgba(0,0,0,0.01)]"
      >
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">
            Project Type
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setType("desktop")}
              className={`flex flex-col items-center gap-2 py-6 rounded-2xl border-2 transition-all cursor-pointer ${
                type === "desktop"
                  ? "border-orange-600 bg-orange-50/50 text-orange-700"
                  : "border-slate-100 bg-white text-slate-400 hover:border-slate-200"
              }`}
            >
              <Monitor className="w-6 h-6" />
              <span className="text-xs font-black uppercase tracking-wider">Desktop Website</span>
            </button>
            <button
              type="button"
              onClick={() => setType("mobile")}
              className={`flex flex-col items-center gap-2 py-6 rounded-2xl border-2 transition-all cursor-pointer ${
                type === "mobile"
                  ? "border-orange-600 bg-orange-50/50 text-orange-700"
                  : "border-slate-100 bg-white text-slate-400 hover:border-slate-200"
              }`}
            >
              <Smartphone className="w-6 h-6" />
              <span className="text-xs font-black uppercase tracking-wider">Mobile Website</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-600/30 focus:border-orange-500"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Category</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-600/30 focus:border-orange-500"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Live URL</label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-600/30 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-600/30 focus:border-orange-500 resize-none"
          />
        </div>

        {type === "desktop" ? (
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Year</label>
            <input
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full md:w-40 px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-600/30 focus:border-orange-500"
            />
          </div>
        ) : (
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Accent Color</label>
            <div className="flex items-center gap-3 flex-wrap">
              {ACCENT_SWATCHES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setAccentColor(c)}
                  style={{ backgroundColor: c }}
                  className={`w-8 h-8 rounded-full transition-all cursor-pointer ${
                    accentColor === c ? "ring-2 ring-offset-2 ring-slate-800 scale-110" : ""
                  }`}
                />
              ))}
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-8 h-8 rounded-full border border-slate-200 cursor-pointer"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
              Display Order
            </label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-600/30 focus:border-orange-500"
            />
          </div>
          <div className="flex items-end pb-2.5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                className="w-4 h-4 accent-orange-600"
              />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Show on public site
              </span>
            </label>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <Link
            href="/admin/projects"
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-md shadow-orange-600/10 disabled:opacity-50 cursor-pointer"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            {saving ? "Saving..." : "Update Project"}
          </button>
        </div>
      </form>
    </div>
  );
}