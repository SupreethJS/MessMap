"use client";

import {
  Clock,
  Brain,
  CreditCard,
  TrendingDown,
  ShoppingBag,
  Star,
  Layers,
  ChevronRight,
} from "lucide-react";

export function LandingFeaturesGrid() {
  const capabilities = [
    {
      icon: Clock,
      title: "Automated Meal Cutoff Engine",
      desc: "Strict automated deadlines lock meal submissions before preparation begins, giving kitchen staff reliable lead time and stopping arbitrary manual estimates.",
      badge: "Zero Delays",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Brain,
      title: "Predictive Headcount AI",
      desc: "Intelligent weighted moving-average algorithms blend 4-week historical attendance trends with real-time student opt-ins and a calibrated safety buffer.",
      badge: "Smart Forecaster",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: CreditCard,
      title: "Digital Dining Micro-Wallet",
      desc: "Secure hostel wallet with instant UPI top-ups, per-meal automated billing, downloadable dining records, and transparent student transaction ledgers.",
      badge: "Zero Hidden Fees",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: TrendingDown,
      title: "Wastage Analytics & Logs",
      desc: "Kitchen supervisors record prepared and leftover food weights (kg) after every service to calculate precise waste percentages and savings.",
      badge: "42% Waste Cut",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: ShoppingBag,
      title: "Pantry Stock & Recipe Matcher",
      desc: "Real-time kitchen inventory tracking automatically matches warehouse groceries against upcoming recipes with dynamic availability percentages.",
      badge: "Stock Optimization",
      iconColor: "text-cyan-600 dark:text-cyan-400",
    },
    {
      icon: Star,
      title: "Verified Student Feedback Desk",
      desc: "Post-meal 1-to-5 star ratings and qualitative comments unlock only after food service commences, alongside an authenticated grievance resolution desk.",
      badge: "Audited Quality",
      iconColor: "text-rose-600 dark:text-rose-400",
    },
  ];

  return (
    <section id="features" className="relative z-10 py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
          <Layers className="w-3.5 h-3.5" />
          <span>Core Capabilities</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Engineered for Modern University Mess Operations
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
          From automated cutoff deadlines to AI inventory matching, every feature is designed to eliminate operational friction and food wastage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {capabilities.map((cap, i) => {
          const Icon = cap.icon;
          return (
            <div
              key={i}
              className="group p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center ${cap.iconColor} group-hover:scale-105 transition-all`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                    {cap.badge}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                  {cap.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {cap.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                <span>Enterprise Grade</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
