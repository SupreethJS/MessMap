"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  Clock,
  Sparkles,
  UtensilsCrossed,
  CheckCircle2,
  XCircle,
  QrCode,
  Flame,
  Star,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { Menu, MealType, Profile } from "@/lib/types/database";
import { resolveDishImage, getDishFullDetails } from "@/lib/data/dish-images";
import { submitMealPlanAction } from "@/app/actions/meal-plan-actions";
import { CutoffCountdown } from "@/components/shared/cutoff-countdown";
import { MealPassModal } from "@/components/student/meal-pass-modal";
import { toast } from "sonner";

interface NextMealHeroBannerProps {
  menus: Menu[];
  user: Profile | null;
}

export function NextMealHeroBanner({ menus, user }: NextMealHeroBannerProps) {
  const [mealPassOpen, setMealPassOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Determine current or upcoming meal slot
  const nextSlot = useMemo((): MealType => {
    const hour = new Date().getHours();
    if (hour < 10) return "breakfast";
    if (hour < 15) return "lunch";
    if (hour < 18) return "snacks";
    return "dinner";
  }, []);

  const activeMenu = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return menus.find((m) => m.meal_type === nextSlot) || menus[0] || null;
  }, [menus, nextSlot]);

  const [optInStatus, setOptInStatus] = useState<"yes" | "no">(
    (activeMenu?.user_meal_plan?.status as any) || "yes"
  );

  const mainDishName = useMemo(() => {
    if (activeMenu?.items && activeMenu.items.length > 0) {
      return activeMenu.items[0].name;
    }
    if (nextSlot === "breakfast") return "Golden Masala Dosa";
    if (nextSlot === "lunch") return "Fragrant Chicken Biryani";
    if (nextSlot === "snacks") return "Crispy Potato Samosa";
    return "Paneer Butter Masala with Naan";
  }, [activeMenu, nextSlot]);

  const details = useMemo(() => {
    return getDishFullDetails(mainDishName, activeMenu?.image_url, "main", nextSlot);
  }, [mainDishName, activeMenu, nextSlot]);

  const handleTogglePlan = async (status: "yes" | "no") => {
    if (!activeMenu) return;
    setLoading(true);
    const res = await submitMealPlanAction({
      menu_id: activeMenu.id,
      status,
    });
    setLoading(false);

    if (res.success) {
      setOptInStatus(status);
      if (status === "yes") {
        toast.success(`You are marked as EATING for ${details.mealType}! Kitchen is notified.`);
      } else {
        toast.info(`You have SKIPPED ${details.mealType}. ₹150 meal rebate saved.`);
      }
    } else {
      toast.error(res.error || "Could not update meal preference");
    }
  };

  const cutoffTime = activeMenu?.cutoff_time || (nextSlot === "breakfast" ? "06:00:00" : nextSlot === "lunch" ? "10:00:00" : nextSlot === "snacks" ? "15:30:00" : "17:00:00");
  const menuDate = activeMenu?.menu_date || new Date().toISOString().split("T")[0];

  return (
    <>
      <div className="relative w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-xl group">
        {/* Background Full-Bleed Food Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={details.imageUrl}
            alt={details.name}
            fill
            priority
            unoptimized
            className="object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
          />
          {/* Multi-Stop Gradient Scrim for 100% Contrast & Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 p-6 sm:p-8 md:p-10 text-white space-y-6">
          {/* Top Row: Next Serving Tag + Cutoff Countdown */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md">
                Upcoming Meal: {details.mealType}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/15 text-slate-200">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {details.servingWindow.split("•")[1]?.trim() || "12:30 PM – 02:30 PM"}
              </span>
            </div>

            {/* Live Cutoff Timer */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-white/20 text-xs">
              <span className="text-slate-400 font-medium">Cutoff:</span>
              <CutoffCountdown menuDate={menuDate} cutoffTime={cutoffTime} />
            </div>
          </div>

          {/* Centerpiece: Dish Info */}
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2.5">
              {/* Indian Veg / Non-Veg Emblem */}
              <div
                className={`w-4 h-4 border-2 ${
                  details.isVegetarian ? "border-emerald-400" : "border-rose-400"
                } flex items-center justify-center rounded-xs p-0.5 bg-slate-950/80 shrink-0`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    details.isVegetarian ? "bg-emerald-400" : "bg-rose-400"
                  }`}
                />
              </div>

              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                {details.isVegetarian ? "Pure Vegetarian Main" : "Non-Vegetarian Special"}
              </span>

              <span className="inline-flex items-center gap-1 text-xs text-amber-300 font-bold ml-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {details.rating}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              {details.name}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal line-clamp-2">
              {details.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300 font-medium">
              <span className="inline-flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" /> {details.calories} kcal
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">{details.protein}g protein</span>
              <span>•</span>
              <span className="text-slate-400">Central Mess Hall 1</span>
            </div>
          </div>

          {/* Action Row: Opt-In Toggles + QR Meal Pass */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
            {/* Dining Attendance Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-300 hidden sm:inline">
                Your Status:
              </span>

              <div className="flex items-center p-1 rounded-2xl bg-slate-900/90 border border-white/20">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleTogglePlan("yes")}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                    optInStatus === "yes"
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>I&apos;m Eating</span>
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleTogglePlan("no")}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                    optInStatus === "no"
                      ? "bg-rose-500 text-white shadow-md shadow-rose-500/25"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Skip Meal (Save Rebate)</span>
                </button>
              </div>
            </div>

            {/* Quick Open QR Meal Pass */}
            <button
              type="button"
              onClick={() => setMealPassOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 active:scale-95"
            >
              <QrCode className="w-4 h-4" />
              <span>Show QR Meal Pass</span>
            </button>
          </div>
        </div>
      </div>

      <MealPassModal
        open={mealPassOpen}
        onOpenChange={setMealPassOpen}
        user={user}
        menus={menus}
      />
    </>
  );
}
