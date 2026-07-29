"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus, Edit, Trash2, Loader2, Monitor, Smartphone,
  Sparkles, ArrowUp, ArrowDown, ExternalLink, AlertCircle,
  CheckCircle, XCircle,
} from "lucide-react";
import {
  fetchAllRecentProjects,
  updateRecentProject,
  deleteRecentProject,
  RecentProject,
} from "@/lib/recentProject";

export default function AdminRecentProjectsPage() {
  const [projects, setProjects] = useState<RecentProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<RecentProject | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await fetchAllRecentProjects();
      setProjects(data);
    } catch (err) {
      console.error("Failed to load recent projects for admin", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const sorted = [...projects].sort((a, b) => a.position - b.position);

  // --- Reorder ------------------------------------------------------
  const handleMove = async (project: RecentProject, direction: "up" | "down") => {
    const idx = sorted.findIndex((p) => p.id === project.id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;

    const other = sorted[swapIdx];
    setBusyId(project.id);
    try {
      const a = project.position ?? 0;
      const b = other.position ?? 0;
      await Promise.all([
        updateRecentProject(project.id, { position: b }),
        updateRecentProject(other.id, { position: a }),
      ]);
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id === project.id) return { ...p, position: b };
          if (p.id === other.id) return { ...p, position: a };
          return p;
        })
      );
    } catch (err) {
      console.error("Failed to reorder Recent Projects:", err);
      alert("Failed to reorder. Check console / Firestore permissions.");
    } finally {
      setBusyId(null);
    }
  };

  // --- Live/Draft toggle ---------------------------------------------
  const handleToggleActive = async (project: RecentProject) => {
    setTogglingId(project.id);
    const newActive = !project.active;
    try {
      await updateRecentProject(project.id, { active: newActive });
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, active: newActive } : p))
      );
    } catch (err) {
      console.error("Error toggling recent project active state:", err);
      alert("Failed to update status. Check console / Firestore permissions.");
    } finally {
      setTogglingId(null);
    }
  };

  // --- Permanent delete (this collection is fully independent) -------
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setBusyId(deleteTarget.id);
    setDeleteError(null);
    try {
      await deleteRecentProject(deleteTarget.id);
      setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      console.error("Failed to delete recent project:", err);
      setDeleteError("Failed to delete. Check console / Firestore permissions.");
    } finally {
      setBusyId(null);
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
    <div className="space-y-8 relative text-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Recent Projects</h1>
          <p className="text-xs text-slate-500 font-semibold tracking-wide">
            Independent collection — {sorted.length} entr{sorted.length === 1 ? "y" : "ies"} in the homepage carousel
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 transition-all duration-300 max-w-max"
          >
            All Projects
          </Link>
          <Link
            href="/admin/recent-projects/add"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-md shadow-orange-600/10 max-w-max"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Recent Project
          </Link>
        </div>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 bg-orange-50/70 border border-orange-100 rounded-2xl p-4">
        <Sparkles className="w-4 h-4 text-orange-600 mt-0.5 shrink-0" />
        <p className="text-xs text-orange-800 font-semibold leading-relaxed">
          This is a fully separate collection from Projects — entries here are independent documents
          with their own title, URL, category, etc. Editing or deleting a project on the main Projects
          page has no effect here, and vice versa. Use the arrows to reorder, or edit an entry to
          change its details.
        </p>
      </div>

      {/* Table */}
      <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-3xl p-6 md:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.01)]">
        {sorted.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              Nothing featured yet
            </p>
            <Link
              href="/admin/recent-projects/add"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50 hover:bg-orange-100/70 text-orange-700 border border-orange-100 font-bold text-xs uppercase tracking-wider transition-all duration-300"
            >
              Add your first recent project
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="pb-3 pr-4">Order</th>
                  <th className="pb-3 px-4">Title</th>
                  <th className="pb-3 px-4">Type</th>
                  <th className="pb-3 px-4">Category</th>
                  <th className="pb-3 px-4">Status</th>
                  <th className="pb-3 pl-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sorted.map((project, idx) => (
                  <tr
                    key={project.id}
                    className="text-xs text-slate-700 hover:text-slate-900 hover:bg-white/30 transition-all"
                  >
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col gap-0.5">
                          <button
                            onClick={() => handleMove(project, "up")}
                            disabled={idx === 0 || busyId !== null}
                            className="w-5 h-5 rounded-md bg-slate-50 hover:bg-orange-50 text-slate-400 hover:text-orange-600 flex items-center justify-center disabled:opacity-30 cursor-pointer transition-colors"
                            aria-label="Move up"
                          >
                            <ArrowUp className="w-2.5 h-2.5" />
                          </button>
                          <button
                            onClick={() => handleMove(project, "down")}
                            disabled={idx === sorted.length - 1 || busyId !== null}
                            className="w-5 h-5 rounded-md bg-slate-50 hover:bg-orange-50 text-slate-400 hover:text-orange-600 flex items-center justify-center disabled:opacity-30 cursor-pointer transition-colors"
                            aria-label="Move down"
                          >
                            <ArrowDown className="w-2.5 h-2.5" />
                          </button>
                        </div>
                        <span className="text-[10px] font-black text-slate-400 w-4">{idx + 1}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-bold max-w-xs truncate">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate text-slate-850">{project.title}</span>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-300 hover:text-orange-600 transition-colors shrink-0"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-500">
                        {project.type === "desktop" ? (
                          <Monitor className="w-3.5 h-3.5" />
                        ) : (
                          <Smartphone className="w-3.5 h-3.5" />
                        )}
                        {project.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[10px] font-black uppercase text-slate-500">
                      {project.category}
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleToggleActive(project)}
                        disabled={togglingId === project.id}
                        title="Click to toggle"
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                          project.active
                            ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-100"
                            : "bg-amber-50 hover:bg-orange-100 text-amber-700 border border-orange-100"
                        }`}
                      >
                        {togglingId === project.id ? (
                          <Loader2 className="w-2.5 h-2.5 animate-spin" />
                        ) : project.active ? (
                          <CheckCircle className="w-2.5 h-2.5" />
                        ) : (
                          <XCircle className="w-2.5 h-2.5" />
                        )}
                        {project.active ? "Live" : "Draft"}
                      </button>
                    </td>
                    <td className="py-4 pl-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/recent-projects/edit/${project.id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-orange-50 text-slate-650 hover:text-orange-700 font-bold text-[10px] uppercase transition-colors"
                        >
                          <Edit className="w-3 h-3" />
                          Edit
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(project)}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-xs">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-black text-slate-800 uppercase tracking-wider">
                  Delete Recent Project?
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Delete{" "}
                  <strong className="text-slate-800">&quot;{deleteTarget.title}&quot;</strong> from the
                  Recent Projects collection? This is a separate document from Projects, so this won&apos;t
                  touch anything on the main Projects page — but the action is permanent here.
                </p>
              </div>
            </div>

            {deleteError && (
              <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold">
                {deleteError}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 mt-8">
              <button
                onClick={() => {
                  setDeleteTarget(null);
                  setDeleteError(null);
                }}
                disabled={busyId !== null}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs uppercase cursor-pointer transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={busyId !== null}
                className="px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs uppercase flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-50"
              >
                {busyId === deleteTarget.id ? (
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