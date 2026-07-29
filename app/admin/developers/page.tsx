"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc, query, orderBy } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import Link from "next/link";
import { Search, Plus, Edit, Trash2, Check, X, Loader2, AlertCircle } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/lib/auth";

interface FirestoreDeveloper {
  id: string;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  skills: string[];
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  status: "active" | "hidden";
  order: number;
  createdAt: string;
}

export default function DevelopersManagementPage() {
  const { user, loading: authLoading } = useAuth();
  const [developers, setDevelopers] = useState<FirestoreDeveloper[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Delete Confirmation State
  const [deleteTarget, setDeleteTarget] = useState<FirestoreDeveloper | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Status Toggling State
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchDevelopers = async () => {
    setLoading(true);
    try {
      // Sort by order ascending
      const q = query(collection(db, "developers"), orderBy("order", "asc"));
      const snapshot = await getDocs(q);
      const fetchedDevs: FirestoreDeveloper[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        fetchedDevs.push({
          id: docSnap.id,
          name: data.name || "",
          role: data.role || "",
          description: data.description || "",
          imageUrl: data.imageUrl || "",
          skills: data.skills || [],
          linkedinUrl: data.linkedinUrl || "",
          githubUrl: data.githubUrl || "",
          portfolioUrl: data.portfolioUrl || "",
          status: data.status || "active",
          order: typeof data.order === "number" ? data.order : 0,
          createdAt: data.createdAt || "",
        });
      });
      setDevelopers(fetchedDevs);
    } catch (err) {
      console.error("Error fetching developers:", err);
      // Fallback query without orderBy in case index isn't ready or doesn't exist
      try {
        const snapshot = await getDocs(collection(db, "developers"));
        const fetchedDevs: FirestoreDeveloper[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          fetchedDevs.push({
            id: docSnap.id,
            name: data.name || "",
            role: data.role || "",
            description: data.description || "",
            imageUrl: data.imageUrl || "",
            skills: data.skills || [],
            linkedinUrl: data.linkedinUrl || "",
            githubUrl: data.githubUrl || "",
            portfolioUrl: data.portfolioUrl || "",
            status: data.status || "active",
            order: typeof data.order === "number" ? data.order : 0,
            createdAt: data.createdAt || "",
          });
        });
        fetchedDevs.sort((a, b) => a.order - b.order);
        setDevelopers(fetchedDevs);
      } catch (innerErr) {
        console.error("Fallback fetch failed", innerErr);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user) {
      fetchDevelopers();
    }
  }, [authLoading, user]);

  const handleToggleStatus = async (developer: FirestoreDeveloper) => {
    setTogglingId(developer.id);
    const newStatus = developer.status === "active" ? "hidden" : "active";
    try {
      const docRef = doc(db, "developers", developer.id);
      await updateDoc(docRef, {
        status: newStatus,
        updatedAt: new Date().toISOString(),
      });
      setDevelopers((prev) =>
        prev.map((d) => (d.id === developer.id ? { ...d, status: newStatus } : d))
      );
    } catch (err) {
      console.error("Error toggling developer status:", err);
      alert("Failed to update status. Check permissions.");
    } finally {
      setTogglingId(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget.id);
    try {
      // 1. Delete image from Storage if it belongs to our Firebase storage upload directory
      if (deleteTarget.imageUrl && deleteTarget.imageUrl.includes("appspot.com")) {
        try {
          // Decode URL to find the storage path
          const fileUrl = new URL(deleteTarget.imageUrl);
          const pathSegments = fileUrl.pathname.split("/o/")[1];
          if (pathSegments) {
            const decodedPath = decodeURIComponent(pathSegments.split("?")[0]);
            const imageRef = ref(storage, decodedPath);
            await deleteObject(imageRef);
          }
        } catch (storageErr) {
          console.warn("Storage deletion skipped or failed:", storageErr);
        }
      }

      // 2. Delete developer document
      await deleteDoc(doc(db, "developers", deleteTarget.id));
      setDevelopers((prev) => prev.filter((d) => d.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      console.error("Error deleting developer:", err);
      alert("Failed to delete developer. Check permissions.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredDevelopers = developers.filter((dev) => {
    const matchesSearch =
      dev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dev.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dev.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus =
      statusFilter === "all" ? true : dev.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
      </div>
    );
  }

  // Auth check
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
          <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Manage Developers</h1>
          <p className="text-xs text-slate-500 font-semibold tracking-wide">Add, update, or remove developers visible on the Trust page</p>
        </div>
        <Link
          href="/admin/developers/add"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-md shadow-orange-600/10 max-w-max animate-fade-in"
        >
          <Plus className="w-3.5 h-3.5" />
          Add New Developer
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/60 backdrop-blur-md border border-white/80 p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.01)]">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, role, or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-707 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-600/30 focus:border-orange-600 transition-all"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-600/30 focus:border-orange-600 transition-all"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="hidden">Hidden Only</option>
          </select>
        </div>
      </div>

      {/* Developers Table */}
      <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-3xl p-6 md:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.01)]">
        {filteredDevelopers.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No developers found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[9px] font-black text-slate-450 uppercase tracking-widest">
                  <th className="pb-3 pr-4 w-16">Image</th>
                  <th className="pb-3 px-4">Name & Role</th>
                  <th className="pb-3 px-4 text-center">Display Order</th>
                  <th className="pb-3 px-4">Status (Click to toggle)</th>
                  <th className="pb-3 px-4">Skills</th>
                  <th className="pb-3 pl-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDevelopers.map((dev) => (
                  <tr key={dev.id} className="text-xs text-slate-707 hover:text-slate-900 hover:bg-white/30 transition-all">
                    <td className="py-4 pr-4">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                        {dev.imageUrl ? (
                          <Image
                            src={dev.imageUrl}
                            alt={dev.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                            loading="lazy"
                          />
                        ) : (
                          <span className="text-[10px] font-black text-slate-400">Dev</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 font-bold max-w-xs truncate text-slate-850">
                      <div className="font-bold truncate text-sm">{dev.name}</div>
                      <div className="text-[10px] text-orange-600 font-bold uppercase tracking-wider mt-0.5">{dev.role}</div>
                    </td>
                    <td className="py-4 px-4 text-center font-mono font-bold text-slate-600">
                      {dev.order}
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleToggleStatus(dev)}
                        disabled={togglingId === dev.id}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                          dev.status === "active"
                            ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-100/50"
                            : "bg-amber-50 hover:bg-orange-50 text-amber-700 border border-orange-100/50"
                        }`}
                      >
                        {togglingId === dev.id ? (
                          <Loader2 className="w-2.5 h-2.5 animate-spin" />
                        ) : dev.status === "active" ? (
                          <Check className="w-2.5 h-2.5" />
                        ) : (
                          <X className="w-2.5 h-2.5" />
                        )}
                        {dev.status}
                      </button>
                    </td>
                    <td className="py-4 px-4 max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {dev.skills.slice(0, 3).map((skill, i) => (
                          <span key={i} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[9px] font-bold">
                            {skill}
                          </span>
                        ))}
                        {dev.skills.length > 3 && (
                          <span className="text-[9px] text-slate-450 font-black">
                            +{dev.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 pl-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/developers/edit/${dev.id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-orange-50 text-slate-650 hover:text-orange-700 font-bold text-[10px] uppercase transition-colors"
                        >
                          <Edit className="w-3 h-3" />
                          Edit
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(dev)}
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
                <h3 className="text-base font-black text-slate-800 uppercase tracking-wider">Delete Developer Profile?</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Are you sure you want to delete <strong className="text-slate-800">&quot;{deleteTarget.name}&quot;</strong>? This profile and their uploaded photo will be permanently removed.
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
