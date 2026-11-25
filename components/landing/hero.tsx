"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Building2 } from "lucide-react";

interface LandingHeroProps {
  onOpenDemoModal: () => void;
}

export function LandingHero({ onOpenDemoModal }: LandingHeroProps) {
  const stats = [
    { label: "Food Waste Cut", value: "42%", subtext: "Measured against college mess averages" },
    { label: "Headcount Accuracy", value: "99.4%", subtext: "Predictive AI turn-out precision" },
    { label: "Active Diners", value: "2,500+", subtext: "Daily meals served across campus hostels" },
    { label: "Cutoff Compliance", value: "100%", subtext: "Server-side deadline enforcement" },
  ];

  return (
    <section className="relative z-10 pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Institutional Campus Dining Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-indigo-500/30 text-slate-800 dark:text-slate-200 text-xs font-semibold shadow-xs">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>M. S. Ramaiah University of Applied Sciences • Smart Dining OS</span>
        </div>

        {/* Accessible Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12] max-w-5xl mx-auto">
          Intelligent Campus Dining. <br />
          <span className="bg-gradient-to-r from-indigo-600 via-cyan-600 to-emerald-600 dark:from-indigo-400 dark:via-cyan-400 dark:to-emerald-400 bg-clip-text text-transparent">
            Zero Food Waste. Total Transparency.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
          An enterprise-grade hostel dining management platform replacing manual registers with automated meal opt-ins, strict cutoff enforcement, digital micro-wallets, and explainable kitchen demand forecasting.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link
            href="/login"
            className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            <span>Access Student Portal</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/login"
            className="w-full sm:w-auto min-h-[48px] px-7 py-3.5 rounded-xl bg-white dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Admin & Kitchen Console</span>
          </Link>

          <button
            type="button"
            onClick={onOpenDemoModal}
            className="w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 hover:bg-slate-200 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Quick Logins</span>
          </button>
        </div>

        {/* Quick Metrics Strip */}
        <div
          role="region"
          aria-label="Campus Impact Metrics"
          className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 shadow-xs backdrop-blur-sm text-left hover:border-indigo-400 dark:hover:border-slate-600 transition-all"
            >
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</div>
              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-1">{stat.label}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{stat.subtext}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
