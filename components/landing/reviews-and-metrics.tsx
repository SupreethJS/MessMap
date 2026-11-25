"use client";

import { Star, Quote, CheckCircle2, TrendingUp, ShieldCheck, Heart } from "lucide-react";

export function LandingReviewsAndMetrics() {
  const metrics = [
    {
      value: "142,000+",
      label: "Meals Served & Audited",
      detail: "Across campus hostel mess halls",
    },
    {
      value: "42%",
      label: "Food Waste Prevented",
      detail: "Measured vs legacy manual registers",
    },
    {
      value: "₹18.4 Lakhs",
      label: "Student Rebates Refunded",
      detail: "Directly into resident micro-wallets",
    },
    {
      value: "4.8 ★",
      label: "Food Quality Satisfaction",
      detail: "Over 8,400+ verified student reviews",
    },
  ];

  const testimonials = [
    {
      name: "Rohan Verma",
      role: "B.Tech CSE '25 • Hostel Block C",
      avatar: "RV",
      rating: 5,
      date: "Resident since 2022",
      quote:
        "Being able to mark 'Skip' before the 5 PM cutoff whenever I have lab projects or go home saved me over ₹1,200 last month alone. The automatic wallet rebate is an absolute game-changer.",
    },
    {
      name: "Sneha Nair",
      role: "ECE '24 • Girls Hostel Block 2",
      avatar: "SN",
      rating: 5,
      date: "Resident since 2023",
      quote:
        "The food photography on Qubite is 100% real. When it displays Masala Dosa or Sunday Biryani, that's exactly what gets served on your plate. QR scanning takes 2 seconds flat at the entrance.",
    },
    {
      name: "Vikramaditya Joshi",
      role: "M.Tech Mech • Mess Committee Secretary",
      avatar: "VJ",
      rating: 5,
      date: "Hostel Warden Council",
      quote:
        "Reconciling turnout used to take 2 hours of manual registers and contractor disputes. With Qubite's AI forecast and camera scanner, our surplus waste dropped by 42% in our very first semester.",
    },
    {
      name: "Ananya Deshmukh",
      role: "AI & Data Science '26 • Hostel Block A",
      avatar: "AD",
      rating: 5,
      date: "Resident since 2024",
      quote:
        "The grievance resolution actually works! I raised a complaint about cold soup on a rainy evening, and by dinner the supervisor had recalibrated the heaters and credited an apology rebate.",
    },
  ];

  return (
    <section id="reviews" className="relative z-10 py-16 md:py-24 bg-slate-50/70 dark:bg-slate-900/40 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Impact Metrics Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
            {metrics.map((m, i) => (
              <div key={i} className="space-y-1">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-amber-400 tracking-tight">
                  {m.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white pt-1">
                  {m.label}
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  {m.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-amber-500" />
            <span>Real Student Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Loved by Campus Residents &amp; Stewards
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Hear from university residents who eat three meals a day at Central Mess Hall 1.
          </p>
        </div>

        {/* 2x2 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/80 shadow-xs hover:shadow-lg transition-all space-y-4 text-left flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-200 dark:text-slate-800" />
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
                  {t.avatar}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate">
                      {t.name}
                    </p>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">
                    {t.role} • {t.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
