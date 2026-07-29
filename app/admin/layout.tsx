"use client";

import React from "react";
import { AuthProvider, useAuth } from "@/lib/auth";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FileText, PlusCircle, LogOut, ArrowLeft, Menu, X, Loader2, Users, Briefcase, Sparkles, ExternalLink } from "lucide-react";
import { cn } from "@/lib/cn";
import { AnimatePresence, motion } from "framer-motion";

function getPageTitle(pathname: string): { title: string; subtitle: string } {
  if (pathname === "/admin/dashboard") return { title: "Dashboard", subtitle: "Overview of your site" };
  if (pathname === "/admin/blogs") return { title: "Blogs Management", subtitle: "Manage published and draft posts" };
  if (pathname === "/admin/blogs/add") return { title: "Add New Blog", subtitle: "Create a new blog post" };
  if (pathname.startsWith("/admin/blogs/edit")) return { title: "Edit Blog", subtitle: "Update an existing post" };
  if (pathname === "/admin/projects") return { title: "Projects", subtitle: "Manage portfolio showcase entries" };
  if (pathname === "/admin/projects/add") return { title: "Add Project", subtitle: "Create a new showcase entry" };
  if (pathname.startsWith("/admin/projects/edit")) return { title: "Edit Project", subtitle: "Update showcase entry details" };
  if (pathname === "/admin/recent-projects") return { title: "Recent Projects", subtitle: "Manually curated homepage highlights" };
  if (pathname === "/admin/recent-projects/add") return { title: "Add Recent Project", subtitle: "Feature an existing project on the homepage" };
  if (pathname.startsWith("/admin/recent-projects/edit")) return { title: "Edit Recent Project", subtitle: "Adjust its position in the homepage feed" };
  if (pathname === "/admin/developers") return { title: "Developers", subtitle: "Manage team profiles" };
  return { title: "Admin", subtitle: "" };
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading, logout, error } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isLoginPage = pathname === "/admin/login";

  React.useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.replace("/admin/login");
    }
  }, [user, loading, isLoginPage, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#fcfbff] text-slate-800">
        <div className="relative flex flex-col items-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-600 mb-4" />
          <p className="text-xs font-black tracking-widest text-slate-500 uppercase">Verifying Admin Auth...</p>
        </div>
      </div>
    );
  }

  if (!user && !isLoginPage) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#fcfbff] text-slate-800">
        <div className="relative flex flex-col items-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-600 mb-4" />
          <p className="text-xs font-black tracking-widest text-slate-500 uppercase">Redirecting...</p>
        </div>
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navLinks = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Blogs Management", href: "/admin/blogs", icon: FileText },
    { label: "Add New Blog", href: "/admin/blogs/add", icon: PlusCircle },
    { label: "Projects", href: "/admin/projects", icon: Briefcase },
    { label: "Recent Projects", href: "/admin/recent-projects", icon: Sparkles },
    { label: "Developers", href: "/admin/developers", icon: Users },
  ];

  // Sub-routes (add/edit) should still highlight their parent nav item.
  const isNavActive = (href: string) =>
    pathname === href || (href !== "/admin/dashboard" && pathname.startsWith(`${href}/`));

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#fcfbff] via-[#f4f1ff] to-[#fcfbff] text-slate-800">
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-100 p-6 shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.01)]">
        <div className="flex items-center gap-3 mb-10 pb-6 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-600 to-amber-600 flex items-center justify-center font-black text-white text-sm">
            SS
          </div>
          <div>
            <h2 className="font-black tracking-tight text-slate-800 uppercase text-xs">Sabka Saathi</h2>
            <p className="text-[9px] font-bold text-orange-600 tracking-wider uppercase">Admin Portal</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1.5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = isNavActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300",
                  isActive
                    ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/10"
                    : "text-slate-600 hover:text-slate-900 hover:bg-orange-50/50"
                )}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100 space-y-3">
          <div className="px-4 py-3 bg-orange-50/30 rounded-xl border border-orange-100/50">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Logged in as</p>
            <p className="text-xs font-bold text-slate-700 truncate select-all">{user?.email}</p>
          </div>

          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-850 hover:bg-slate-50 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Public Site
          </Link>

          <button
            onClick={() => logout()}
            className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-amber-600 hover:text-amber-700 hover:bg-amber-50 transition-all duration-300 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex md:hidden items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-600 to-amber-600 flex items-center justify-center font-black text-white text-sm">
              SS
            </div>
            <span className="font-black text-xs tracking-wider text-slate-800 uppercase">Admin</span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-700 border border-slate-100"
          >
            <Menu className="w-5 h-5" />
          </button>
        </header>

        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs md:hidden"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white border-l border-slate-100 p-6 flex flex-col justify-between md:hidden"
              >
                <div>
                  <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Navigation</span>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <nav className="flex flex-col gap-2 py-6">
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      const isActive = isNavActive(link.href);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300",
                            isActive
                              ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/10"
                              : "text-slate-600 hover:text-slate-800 hover:bg-orange-50/50"
                          )}
                        >
                          <Icon className="w-4 h-4" />
                          {link.label}
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                <div className="pt-6 border-t border-slate-100 space-y-3">
                  <div className="px-4 py-3 bg-orange-50/30 rounded-xl border border-orange-100/50">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Logged in as</p>
                    <p className="text-xs font-bold text-slate-700 truncate select-all">{user?.email}</p>
                  </div>

                  <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all duration-300"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Public Site
                  </Link>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-amber-600 hover:text-amber-700 hover:bg-amber-50 transition-all duration-300 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="hidden md:flex items-center justify-between px-10 py-5 bg-white/70 backdrop-blur-md border-b border-slate-100 shrink-0">
          <div>
            <h1 className="text-base font-black text-slate-800 uppercase tracking-wider">
              {getPageTitle(pathname).title}
            </h1>
            {getPageTitle(pathname).subtitle && (
              <p className="text-[11px] text-slate-400 font-semibold tracking-wide mt-0.5">
                {getPageTitle(pathname).subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:text-orange-700 hover:border-orange-200 hover:bg-orange-50/50 font-bold text-[11px] uppercase tracking-wider transition-all duration-300"
            >
              View Site
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-100">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-600 to-amber-600 flex items-center justify-center text-white text-[10px] font-black uppercase">
                {user?.email?.charAt(0) ?? "A"}
              </div>
              <span className="text-xs font-bold text-slate-700 max-w-[160px] truncate select-all">
                {user?.email}
              </span>
            </div>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto p-6 md:p-10 z-10">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
}