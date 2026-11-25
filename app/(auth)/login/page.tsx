"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck, Sparkles, Building2 } from "lucide-react";
import { loginAction } from "@/app/actions/auth-actions";
import { MessMapLogo } from "@/components/shared/messmap-logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Demo mode is enabled if explicitly flagged, or if Supabase is unconfigured / in mock mode
  const isDemo =
    process.env.NEXT_PUBLIC_DEMO_MODE === "true" ||
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL.includes("dummy") ||
    process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const res = await loginAction({ email, password });
    setLoading(false);

    if (res.success) {
      if (res.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/student/dashboard");
      }
      router.refresh();
    } else {
      setErrorMsg(res.error || "Login failed");
    }
  };

  const handleQuickLogin = async (role: "student" | "admin") => {
    const targetEmail = role === "admin" ? "admin@msruas.ac.in" : "student1@msruas.ac.in";
    const targetPass = role === "admin" ? "SecureAdminPassword123!" : "password123";
    setEmail(targetEmail);
    setPassword(targetPass);
    setLoading(true);
    setErrorMsg(null);

    const res = await loginAction({ email: targetEmail, password: targetPass });
    setLoading(false);

    if (res.success) {
      router.push(res.role === "admin" ? "/admin/dashboard" : "/student/dashboard");
      router.refresh();
    } else {
      setErrorMsg(res.error || "Demo login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-amber-400 selection:text-slate-950 transition-colors relative">
      {/* Top Bar with Home Link & Theme Toggle */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="inline-block hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-2xl"
          >
            <MessMapLogo size="xl" />
          </Link>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Mess<span className="text-emerald-600 dark:text-emerald-400">Map</span> Portal
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            Campus Dining Management & Catering Operations
          </p>
          <div className="pt-1">
            <span className="inline-flex items-center gap-1.5 py-1 px-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-full text-[11px] font-bold text-slate-700 dark:text-slate-300 shadow-xs">
              <Building2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>University Student & Staff Access</span>
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xl space-y-5 transition-colors">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Sign In</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Enter your credentials to access your mess dashboard</p>
            </div>

            {/* Quick Demo Login Option (Visible when Demo Mode is Enabled) */}
            {isDemo && (
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Demo Mode Active:
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 font-mono font-bold">
                    1-Click Test
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleQuickLogin("student")}
                    className="flex-1 min-h-[44px] py-2 px-3 bg-indigo-50 dark:bg-indigo-600/20 hover:bg-indigo-100 dark:hover:bg-indigo-600/30 border border-indigo-200 dark:border-indigo-500/40 text-indigo-800 dark:text-indigo-200 hover:text-indigo-900 dark:hover:text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>Try Demo Student</span>
                  </button>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleQuickLogin("admin")}
                    className="flex-1 min-h-[44px] py-2 px-3 bg-emerald-50 dark:bg-emerald-600/20 hover:bg-emerald-100 dark:hover:bg-emerald-600/30 border border-emerald-200 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-200 hover:text-emerald-900 dark:hover:text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Try Demo Admin</span>
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="login-email" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  id="login-email"
                  type="email"
                  placeholder="student1@msruas.ac.in"
                  className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="login-password" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {errorMsg && (
              <div
                role="alert"
                aria-live="polite"
                className="p-3 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-500/40 text-red-700 dark:text-red-300 rounded-xl text-xs font-medium"
              >
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-[44px] py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-600/30 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Sign In to Dashboard"}
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-xs text-slate-600 dark:text-slate-400 pt-1">
              New resident student?{" "}
              <Link href="/register" className="font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 hover:underline">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
