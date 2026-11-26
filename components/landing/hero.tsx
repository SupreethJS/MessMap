"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  Clock,
  ShieldCheck,
  Star,
  Flame,
  CheckCircle2,
  UtensilsCrossed,
  Users,
} from "lucide-react";

interface LandingHeroProps {
  onOpenDemoModal: () => void;
}

export function LandingHero({ onOpenDemoModal }: LandingHeroProps) {
  // Live Dining Hall Status Pill
  const diningStatus = useMemo(() => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const timeVal = hour * 60 + minute;

    if (timeVal >= 7 * 60 + 30 && timeVal <= 9 * 60 + 30) {
      return { status: "serving", text: "Breakfast Serving Now • 07:30 AM – 09:30 AM" };
    } else if (timeVal < 12 * 60 + 30 && timeVal > 9 * 60 + 30) {
      return { status: "upcoming", text: "Lunch Starts at 12:30 PM • Central Mess Hall 1" };
    } else if (timeVal >= 12 * 60 + 30 && timeVal <= 14 * 60 + 30) {
      return { status: "serving", text: "Lunch Serving Now • 12:30 PM – 02:30 PM" };
    } else if (timeVal > 14 * 60 + 30 && timeVal < 16 * 60 + 30) {
      return { status: "upcoming", text: "Evening Snacks at 04:30 PM • Tea & Crispy Snacks" };
    } else if (timeVal >= 16 * 60 + 30 && timeVal <= 18 * 60) {
      return { status: "serving", text: "Evening Snacks Serving Now • 04:30 PM – 06:00 PM" };
    } else if (timeVal > 18 * 60 && timeVal < 19 * 60 + 30) {
      return { status: "upcoming", text: "Dinner Starts at 07:30 PM • Cutoff Locked" };
    } else if (timeVal >= 19 * 60 + 30 && timeVal <= 21 * 60 + 45) {
      return { status: "serving", text: "Dinner Serving Now • 07:30 PM – 09:45 PM" };
    } else {
      return { status: "closed", text: "Kitchen Prep in Progress • Breakfast at 07:30 AM" };
    }
  }, []);

  return (
    <section className="relative z-10 pt-6 pb-12 md:pt-14 md:pb-24 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left min-w-0">
            {/* Live Serving Status Pill */}
            <div className="inline-flex max-w-full items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-[11px] sm:text-xs font-bold shadow-xs">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
              </span>
              <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="truncate">{diningStatus.text}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Wholesome Campus Dining. <br />
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600 dark:from-amber-400 dark:via-amber-300 dark:to-emerald-400 bg-clip-text text-transparent">
                Cooked Fresh. Zero Waste.
              </span>
            </h1>

            {/* Subcopy */}
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-lg leading-relaxed max-w-2xl font-normal">
              MessMap transforms university hostel catering into a modern, restaurant-grade culinary experience. View daily menus with full food photography, customize meal plans before cutoffs, scan digital meal passes at entry, and reclaim dining wallet rebates automatically.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-1">
              <a
                href="#menu"
                className="w-full sm:w-auto min-h-[48px] px-7 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all group"
              >
                <span>Explore Today&apos;s Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                type="button"
                onClick={onOpenDemoModal}
                className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Try Demo Accounts</span>
              </button>

              <Link
                href="/login"
                className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                Resident Sign In
              </Link>
            </div>

            {/* Trust Proof Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-slate-500 dark:text-slate-400 font-semibold border-t border-slate-200/80 dark:border-slate-800/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>2,500+ Daily Residents</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>4.8 / 5.0 Food Satisfaction</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span>FSSAI Certified Campus Kitchen</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Food Collage */}
          <div className="lg:col-span-5 relative">
            {/* Background Decorative Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/20 via-emerald-500/10 to-transparent rounded-3xl blur-2xl pointer-events-none" />

            {/* Main Centerpiece Card: Hyderabadi Chicken Biryani */}
            <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl group transition-transform hover:scale-[1.01]">
              <div className="relative w-full aspect-[4/3] bg-slate-950">
                <Image
                  src="/images/dishes/chicken_biryani.jpg"
                  alt="Fragrant Chicken Dum Biryani"
                  fill
                  priority
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Overlaid Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-rose-400 text-[10px] font-extrabold uppercase tracking-wider">
                    <div className="w-3 h-3 border-2 border-rose-500 flex items-center justify-center rounded-xs p-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    </div>
                    <span>Non-Veg Special</span>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-sm">
                    Sunday Feast
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/80 text-amber-400 font-black text-xs backdrop-blur-md border border-amber-400/30">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    4.9
                  </span>
                </div>

                {/* Bottom Card Title & Nutrition */}
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <h3 className="text-xl font-black tracking-tight text-white">
                    Fragrant Hyderabadi Chicken Biryani
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-1">
                    Layered long-grain basmati with marinated chicken, saffron milk, and fried onions.
                  </p>
                  <div className="pt-2 flex items-center gap-3 text-[11px] text-slate-300 font-semibold">
                    <span className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-amber-400" /> 540 kcal
                    </span>
                    <span>•</span>
                    <span className="text-emerald-400">32g protein</span>
                    <span>•</span>
                    <span className="text-slate-400">Raita included</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Supporting Dish Card 1: Golden Masala Dosa (Top Left Accent) */}
            <div className="hidden sm:flex absolute -top-6 -left-6 items-center gap-3 p-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl max-w-[240px] animate-in fade-in slide-in-from-left-4 duration-500">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <Image
                  src="/images/dishes/masala_dosa.jpg"
                  alt="Golden Masala Dosa"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 border border-emerald-600 flex items-center justify-center rounded-xs p-0.5">
                    <div className="w-1 h-1 rounded-full bg-emerald-600" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                    Golden Masala Dosa
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Breakfast 07:30 AM
                </p>
                <span className="text-[10px] text-amber-500 font-bold flex items-center gap-0.5">
                  <Star className="w-2.5 h-2.5 fill-amber-400" /> 4.8 Rating
                </span>
              </div>
            </div>

            {/* Floating Supporting Dish Card 2: Paneer Butter Masala (Bottom Right Accent) */}
            <div className="hidden sm:flex absolute -bottom-6 -right-6 items-center gap-3 p-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl max-w-[260px] animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <Image
                  src="/images/dishes/paneer_naan.jpg"
                  alt="Paneer Butter Masala with Naan"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 border border-emerald-600 flex items-center justify-center rounded-xs p-0.5">
                    <div className="w-1 h-1 rounded-full bg-emerald-600" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                    Paneer Butter Masala
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  With Soft Tandoori Naan
                </p>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                  19g Protein • Dinner
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
