"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Monitor, Smartphone, Loader2, Save, Trash2, ImagePlus, X } from "lucide-react";
import {
  fetchRecentProjectById,
  updateRecentProject,
  deleteRecentProject,
  uploadRecentProjectImage,
  deleteRecentProjectImage,
} from "@/lib/recentProject";
import { ProjectType } from "@/lib/project";

const ACCENT_SWATCHES = ["#f38200", "#3b82f6", "#ef4444", "#8b5cf6", "#ec4899", "#10b981"];

export default function EditRecentProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const [type, setType] = useState<ProjectType>("desktop");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [accentColor, setAccentColor] = useState(ACCENT_SWATCHES[0]);
  const [position, setPosition] = useState(0);
  const [active, setActive] = useState(true);

  // --- Showcase image (optional) --------------------------------------
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [existingImagePath, setExistingImagePath] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    setError(null);
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setRemoveImage(false);
  };

  const clearNewImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview(null);
  };

  const handleRemoveExistingImage = () => {
    setRemoveImage(true);
    setExistingImageUrl(null);
  };

  useEffect(() => {
    (async () => {
      const p = await fetchRecentProjectById(id);
      if (p) {
        setType(p.type);
        setTitle(p.title);
        setUrl(p.url);
        setCategory(p.category);
        setDescription(p.description);
        setYear(p.year || new Date().getFullYear().toString());
        setAccentColor(p.accentColor || ACCENT_SWATCHES[0]);
        setPosition(p.position ?? 0);
        setActive(p.active);
        setExistingImageUrl(p.imageUrl ?? null);
        setExistingImagePath(p.imagePath ?? null);
      } else {
        setNotFound(true);
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
      let imageUrl: string | undefined = existingImageUrl ?? undefined;
      let imagePath: string | undefined = existingImagePath ?? undefined;

      if (imageFile) {
        setUploadingImage(true);
        // Replace: clean up the old file first if there was one.
        if (existingImagePath) {
          await deleteRecentProjectImage(existingImagePath);
        }
        const uploaded = await uploadRecentProjectImage(imageFile);
        imageUrl = uploaded.imageUrl;
        imagePath = uploaded.imagePath;
        setUploadingImage(false);
      } else if (removeImage && existingImagePath) {
        await deleteRecentProjectImage(existingImagePath);
        imageUrl = undefined;
        imagePath = undefined;
      }

      await updateRecentProject(id, {
        title: title.trim(),
        url: url.trim(),
        category: category.trim(),
        description: description.trim(),
        type,
        accentColor,
        year,
        position: Number(position) || 0,
        active,
        imageUrl: imageUrl ?? null,
        imagePath: imagePath ?? null,
      } as never);
      router.push("/admin/recent-projects");
    } catch (err) {
      console.error("Update failed", err);
      setError("Failed to update.");
      setUploadingImage(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this recent-project entry permanently?")) return;
    setDeleting(true);
    try {
      if (existingImagePath) {
        await deleteRecentProjectImage(existingImagePath);
      }
      await deleteRecentProject(id);
      router.push("/admin/recent-projects");
    } catch (err) {
      console.error("Delete failed", err);
      setError("Failed to delete.");
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

  if (notFound) {
    return (
      <div className="max-w-2xl space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/recent-projects"
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-100 bg-white text-slate-500 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Edit Recent Project</h1>
        </div>
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold">
          Entry not found.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/recent-projects"
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-100 bg-white text-slate-500 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Edit Recent Project</h1>
            <p className="text-xs text-slate-500 font-semibold tracking-wide">
              Update this independent carousel entry
            </p>
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

        {/* Showcase image upload */}
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
            Showcase Image (optional)
          </label>
          <p className="text-[10px] text-slate-400 font-semibold mb-3">
            If set, the homepage card shows this image instead of a live preview of the URL.
          </p>

          {imagePreview ? (
            <div className="relative w-full max-w-xs rounded-2xl overflow-hidden border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagePreview} alt="New showcase preview" className="w-full aspect-[4/3] object-cover" />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-slate-900/70 text-white text-[9px] font-black uppercase tracking-wider">
                New
              </span>
              <button
                type="button"
                onClick={clearNewImage}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-slate-900/70 hover:bg-amber-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Cancel new image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : existingImageUrl ? (
            <div className="relative w-full max-w-xs rounded-2xl overflow-hidden border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={existingImageUrl} alt="Current showcase" className="w-full aspect-[4/3] object-cover" />
              <button
                type="button"
                onClick={handleRemoveExistingImage}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-slate-900/70 hover:bg-amber-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Remove image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <label className="absolute bottom-2 left-2 right-2 text-center py-1.5 rounded-lg bg-white/90 backdrop-blur-sm text-[10px] font-black uppercase tracking-wider text-slate-600 hover:bg-white cursor-pointer transition-colors">
                Replace image
                <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
              </label>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center gap-2 w-full max-w-xs aspect-[4/3] rounded-2xl border-2 border-dashed border-slate-200 hover:border-orange-300 bg-slate-50/50 hover:bg-orange-50/30 text-slate-400 hover:text-orange-600 cursor-pointer transition-all">
              <ImagePlus className="w-6 h-6" />
              <span className="text-[10px] font-black uppercase tracking-wider">Click to upload</span>
              <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
            </label>
          )}
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
              Position in Carousel
            </label>
            <input
              type="number"
              min={0}
              value={position}
              onChange={(e) => setPosition(Number(e.target.value))}
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
            href="/admin/recent-projects"
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
            {uploadingImage ? "Uploading image..." : saving ? "Saving..." : "Update Entry"}
          </button>
        </div>
      </form>
    </div>
  );
}