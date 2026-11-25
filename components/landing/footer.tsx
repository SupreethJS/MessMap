"use client";

import { Utensils } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 text-xs text-slate-500 dark:text-slate-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-600/20 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
            <Utensils className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-slate-200">Smart Mess Management System</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">M. S. Ramaiah University of Applied Sciences (MSRUAS)</div>
          </div>
        </div>

        <div className="text-center md:text-right space-y-1">
          <p className="text-slate-600 dark:text-slate-400">
            Engineered with Next.js 14, TypeScript, Supabase PostgreSQL & Tailwind CSS.
          </p>
          <p className="text-slate-500 dark:text-slate-400">
            Designed & Developed by <span className="text-slate-900 dark:text-slate-200 font-bold">Supreeth J Sudheer</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
