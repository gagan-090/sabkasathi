"use client";

import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { LogIn, AlertCircle, Loader2 } from "lucide-react";

export default function LoginPage() {
  const { user, error: authError, setError } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      router.push("/admin/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLocalError(null);
    setError(null);

    if (!email || !password) {
      setLocalError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      const isApiKeyError = 
        err.code === "auth/invalid-api-key" || 
        err.code?.includes("api-key-not-valid") || 
        err.message?.toLowerCase().includes("api key") || 
        err.message?.toLowerCase().includes("api_key");

      if (!isApiKeyError) {
        console.error("Login error:", err);
      } else {
        console.warn("Firebase Login Config Error:", err.message || err);
      }

      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found" ||
        err.code === "auth/invalid-email"
      ) {
        setLocalError("Invalid email or password.");
      } else if (isApiKeyError) {
        setLocalError("Invalid Firebase API Key. Please check your .env.local file configuration.");
      } else {
        setLocalError("An error occurred during login. Please try again.");
      }
      setLoading(false);
    }
  };

  const displayError = authError || localError;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#fcfbff] via-[#f4f1ff] to-[#fcfbff] px-4">
      {/* Background blobs for premium feel */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white/70 backdrop-blur-md border border-white/90 rounded-3xl p-8 shadow-[0_15px_40px_rgba(255,149,0,0.06)] relative overflow-hidden z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-600 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-orange-600/20 mb-4">
            SS
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Admin Login</h1>
          <p className="text-xs text-slate-500 font-medium tracking-wide mt-1">Sign in to manage Sabka Saathi blogs</p>
        </div>

        {displayError && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-100 text-amber-800 text-xs font-semibold flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>{displayError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@email.com"
              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all placeholder:text-slate-400 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all placeholder:text-slate-400 disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-orange-600/15 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Sign In
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
