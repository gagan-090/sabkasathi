"use client";

import React, { useState } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, AlertCircle, Upload, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth";

export default function AddDeveloperPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  // Form fields
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [status, setStatus] = useState<"active" | "hidden">("active");
  const [order, setOrder] = useState<number>(0);

  // Image upload state
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressing, setCompressing] = useState(false);

  // UX State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validate URL utility
  const validateUrl = (url: string) => {
    if (!url.trim()) return true; // optional
    try {
      const parsed = new URL(url);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  };

  // Canvas Image Compression helper
  const compressImage = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = window.document.createElement("img");
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = window.document.createElement("canvas");
          const MAX_WIDTH = 500;
          const MAX_HEIGHT = 500;
          let width = img.width;
          let height = img.height;

          // Resize while maintaining aspect ratio
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Failed to get canvas context"));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error("Canvas export failed"));
              }
            },
            "image/jpeg",
            0.85
          );
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    setCompressing(true);
    setError(null);

    try {
      const compressed = await compressImage(file);
      setCompressedBlob(compressed);
      
      // Revoke old object URL if exists to save memory
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      const preview = URL.createObjectURL(compressed);
      setPreviewUrl(preview);
    } catch (err) {
      console.error("Compression error:", err);
      setError("Failed to process image. Try a different image.");
    } finally {
      setCompressing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Auth validations
    if (authLoading) {
      return triggerError("Authentication is loading, please wait.");
    }
    if (!user || !user.email) {
      return triggerError("You must be logged in as an authorized administrator.");
    }

    const allowedEmailsStr = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "";
    const allowedEmails = allowedEmailsStr
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean);

    if (!allowedEmails.includes(user.email.toLowerCase())) {
      return triggerError("Access Denied: Your account is not authorized.");
    }

    // Required fields validation
    if (!name.trim()) return triggerError("Developer Name is required.");
    if (!role.trim()) return triggerError("Role/Designation is required.");
    if (!description.trim()) return triggerError("Short Description is required.");
    if (!compressedBlob) return triggerError("Profile Image is required.");

    // URL validation
    if (!validateUrl(linkedinUrl)) return triggerError("Please enter a valid LinkedIn URL (including http:// or https://).");
    if (!validateUrl(githubUrl)) return triggerError("Please enter a valid GitHub URL (including http:// or https://).");
    if (!validateUrl(portfolioUrl)) return triggerError("Please enter a valid Portfolio URL (including http:// or https://).");

    try {
      // 1. Generate new doc ID first
      const devDocRef = doc(collection(db, "developers"));
      const devId = devDocRef.id;

      // 2. Upload image to Storage
      const fileName = `profile_${devId}_${Date.now()}.jpg`;
      const storageRef = ref(storage, `developers/${fileName}`);
      
      const uploadTask = uploadBytesResumable(storageRef, compressedBlob);
      
      // Await storage upload
      await new Promise<void>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (err) => reject(err),
          () => resolve()
        );
      });

      const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

      // 3. Save developer profile to Firestore
      const skillsArray = skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const devData = {
        name: name.trim(),
        role: role.trim(),
        description: description.trim(),
        imageUrl: downloadUrl,
        skills: skillsArray,
        linkedinUrl: linkedinUrl.trim(),
        githubUrl: githubUrl.trim(),
        portfolioUrl: portfolioUrl.trim(),
        status,
        order: Number(order) || 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await setDoc(devDocRef, devData);
      
      // Clean up preview url memory
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      router.push("/admin/developers");
    } catch (err) {
      console.error("Save developer error:", err);
      const errMsg = err instanceof Error ? err.message : "Failed to save developer profile. Check connection/permissions.";
      setError(errMsg);
      setLoading(false);
    }
  };

  const triggerError = (msg: string) => {
    setError(msg);
    setLoading(false);
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
      </div>
    );
  }

  // Auth permissions check
  const allowedEmailsStr = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "";
  const allowedEmails = allowedEmailsStr
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (!user || !user.email || !allowedEmails.includes(user.email.toLowerCase())) {
    return (
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 text-amber-800 text-xs font-semibold flex items-start gap-2.5 shadow-sm">
        <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
        <span>Access Denied: You do not have permissions to view this page.</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-slate-800">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/developers"
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 shadow-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Add New Developer</h1>
          <p className="text-xs text-slate-500 font-semibold tracking-wide">Configure a new team member profile</p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 text-amber-800 text-xs font-semibold flex items-start gap-2.5 shadow-sm animate-fade-in animate-duration-200">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: General Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/60 backdrop-blur-md border border-white/80 p-6 md:p-8 rounded-3xl space-y-6 shadow-[0_15px_40px_rgba(0,0,0,0.01)]">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100">Profile Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-slate-505 uppercase tracking-widest mb-2">
                  Full Name <span className="text-amber-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  disabled={loading}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-550 uppercase tracking-widest mb-2">
                  Role / Designation <span className="text-amber-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  disabled={loading}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Senior Frontend Developer"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                Short Description <span className="text-amber-600">*</span>
              </label>
              <textarea
                required
                disabled={loading}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Brief bio or role description..."
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                Skills / Tags (Comma-separated)
              </label>
              <input
                type="text"
                disabled={loading}
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g. Next.js, TypeScript, Tailwind, Firebase"
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white/60 backdrop-blur-md border border-white/80 p-6 md:p-8 rounded-3xl space-y-6 shadow-[0_15px_40px_rgba(0,0,0,0.01)]">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100">Social Media & Websites</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="text"
                  disabled={loading}
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                  GitHub URL
                </label>
                <input
                  type="text"
                  disabled={loading}
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/username"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                  Portfolio URL
                </label>
                <input
                  type="text"
                  disabled={loading}
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Media & Settings */}
        <div className="space-y-6">
          {/* Profile Image Upload */}
          <div className="bg-white/60 backdrop-blur-md border border-white/80 p-6 rounded-3xl space-y-6 shadow-[0_15px_40px_rgba(0,0,0,0.01)]">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100">Profile Photo</h2>

            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-white hover:bg-slate-50/50 transition-colors relative">
                {previewUrl ? (
                  <div className="relative w-40 h-40 rounded-2xl overflow-hidden shadow-md border border-slate-100 bg-slate-50 group">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Eye className="text-white w-6 h-6" />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400 space-y-2">
                    <Upload className="w-8 h-8 text-slate-350" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Upload Profile Image</span>
                  </div>
                )}
                
                <input
                  type="file"
                  accept="image/*"
                  disabled={loading || compressing}
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
              </div>

              {compressing && (
                <div className="flex items-center justify-center gap-2 text-[10px] text-orange-600 font-bold uppercase tracking-wider">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Optimizing Image...
                </div>
              )}

              {previewUrl && !compressing && (
                <div className="text-center text-[9px] font-black text-emerald-600 uppercase tracking-wider bg-emerald-50 border border-emerald-100 rounded-lg py-1 px-2.5">
                  Image web-optimized & ready
                </div>
              )}

              <p className="text-[10px] text-slate-400 font-semibold text-center leading-relaxed">
                Profile images are auto-compressed to web-friendly sizes for optimal loading.
              </p>
            </div>
          </div>

          {/* Publishing Settings */}
          <div className="bg-white/60 backdrop-blur-md border border-white/80 p-6 rounded-3xl space-y-6 shadow-[0_15px_40px_rgba(0,0,0,0.01)]">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100">Publish Settings</h2>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                Status
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setStatus("active")}
                  className={`py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border transition-all duration-300 ${
                    status === "active"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-600 shadow-sm"
                      : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  Active
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("hidden")}
                  className={`py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border transition-all duration-300 ${
                    status === "hidden"
                      ? "bg-orange-50 border-orange-200 text-orange-700 shadow-sm"
                      : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  Hidden
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                Display Order (Ascending)
              </label>
              <input
                type="number"
                disabled={loading}
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                placeholder="0"
                min={0}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all font-mono"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={loading || compressing}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-orange-600/15 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving Developer...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Developer
                </>
              )}
            </button>
            <Link
              href="/admin/developers"
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
