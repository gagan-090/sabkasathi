"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search, Plus, Edit, Trash2, Loader2, Monitor, Smartphone,
  CheckCircle, XCircle, ExternalLink, AlertCircle, Briefcase, Sparkles,
} from "lucide-react";
import { fetchAllProjects, deleteProject, updateProject, Project, ProjectType } from "@/lib/project";

type StatusFilter = "all" | "active" | "hidden";
type TypeFilter = "all" | ProjectType;

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");

  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const handleToggleActive = async (project: Project) => {
    setTogglingId(project.id);
    const newActive = !project.active;
    try {
      await updateProject(project.id, { active: newActive });
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, active: newActive } : p))
      );
    } catch (err) {
      console.error("Error toggling project active state:", err);
      alert("Failed to update status. Check console / Firestore permissions.");
    } finally {
      setTogglingId(null);
    }
  };

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await fetchAllProjects();
      setProjects(data);
    } catch (err) {
      console.error("Failed to load projects for admin", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget.id);
    setDeleteError(null);
    try {
      await deleteProject(deleteTarget.id);
      setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      console.error("Error deleting project:", err);
      setDeleteError("Failed to delete project. Check console / Firestore permissions.");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = projects.filter((project) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      !searchLower ||
      project.title.toLowerCase().includes(searchLower) ||
      project.category.toLowerCase().includes(searchLower);

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" ? project.active : !project.active);

    const matchesType = typeFilter === "all" || project.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const activeCount = projects.filter((p) => p.active).length;
  const draftCount = projects.length - activeCount;

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
          <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Projects</h1>
          <p className="text-xs text-slate-500 font-semibold tracking-wide">
            Manage portfolio showcase entries — {activeCount} live, {draftCount} draft
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/recent-projects"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 transition-all duration-300 max-w-max"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Recent Projects
          </Link>
          <Link
            href="/admin/projects/add"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-md shadow-orange-600/10 max-w-max"
          >
            <Plus className="w-3.5 h-3.5" />
            Add New Project
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white/60 backdrop-blur-md border border-white/80 p-6 rounded-2xl relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.01)]">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-600/5 rounded-full blur-2xl pointer-events-none" />
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Projects</p>
          <div className="flex items-end justify-between mt-2">
            <span className="text-4xl font-black text-slate-800">{projects.length}</span>
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100/50 flex items-center justify-center text-orange-700">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-md border border-white/80 p-6 rounded-2xl relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.01)]">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Live on Site</p>
          <div className="flex items-end justify-between mt-2">
            <span className="text-4xl font-black text-slate-800">{activeCount}</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100/50 flex items-center justify-center text-emerald-600">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-md border border-white/80 p-6 rounded-2xl relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.01)]">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-600/5 rounded-full blur-2xl pointer-events-none" />
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Drafts / Hidden</p>
          <div className="flex items-end justify-between mt-2">
            <span className="text-4xl font-black text-slate-800">{draftCount}</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100/50 flex items-center justify-center text-amber-700">
              <XCircle className="w-5 h-5 opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white/60 backdrop-blur-md border border-white/80 p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.01)]">
        <div className="relative sm:col-span-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-600/30 focus:border-orange-600 transition-all"
          />
        </div>

        <div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-600/30 focus:border-orange-600 transition-all"
          >
            <option value="all">All Types</option>
            <option value="desktop">Desktop Only</option>
            <option value="mobile">Mobile Only</option>
          </select>
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-600/30 focus:border-orange-600 transition-all"
          >
            <option value="all">All Statuses</option>
            <option value="active">Live Only</option>
            <option value="hidden">Draft / Hidden Only</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-3xl p-6 md:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.01)]">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              No matching projects found
            </p>
            {projects.length === 0 && (
              <Link
                href="/admin/projects/add"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50 hover:bg-orange-100/70 text-orange-700 border border-orange-100 font-bold text-xs uppercase tracking-wider transition-all duration-300"
              >
                Add your first project
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="pb-3 pr-4">Title</th>
                  <th className="pb-3 px-4">Type</th>
                  <th className="pb-3 px-4">Category</th>
                  <th className="pb-3 px-4">Order</th>
                  <th className="pb-3 px-4">Status</th>
                  <th className="pb-3 pl-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered
                  .sort((a, b) => a.order - b.order)
                  .map((project) => (
                    <tr
                      key={project.id}
                      className="text-xs text-slate-700 hover:text-slate-900 hover:bg-white/30 transition-all"
                    >
                      <td className="py-4 pr-4 font-bold max-w-xs md:max-w-md truncate">
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
                      <td className="py-4 px-4 text-[10px] font-black text-slate-600">
                        {project.order}
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
                            href={`/admin/projects/edit/${project.id}`}
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
                <h3 className="text-base font-black text-slate-800 uppercase tracking-wider">Delete Project?</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Are you sure you want to delete{" "}
                  <strong className="text-slate-800">&quot;{deleteTarget.title}&quot;</strong>? This action is
                  permanent and will remove it from the showcase immediately.
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