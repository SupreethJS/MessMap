"use client";

import { useState, useEffect, useMemo } from "react";
import { getAllMenus, FOOD_IMAGES } from "@/lib/data/mess-store";
import { getAllMenusAction } from "@/app/actions/menu-actions";
import { resolveDishImage, getDishFullDetails, DishDetails } from "@/lib/data/dish-images";
import { formatTime } from "@/lib/utils";
import {
  Clock,
  Flame,
  Sparkles,
  CheckCircle2,
  XCircle,
  Calendar as CalendarIcon,
  ShieldCheck,
  UtensilsCrossed,
  Search,
  Star,
  Check,
} from "lucide-react";
import { submitMealPlanAction } from "@/app/actions/meal-plan-actions";
import { toast } from "sonner";
import { MealType, Menu } from "@/lib/types/database";
import { DishCard } from "@/components/shared/dish-card";
import { DishDetailModal } from "@/components/shared/dish-detail-modal";
import { CutoffCountdown } from "@/components/shared/cutoff-countdown";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function getTargetDateForWeekday(dayName: string): { dateStr: string; label: string; isToday: boolean } {
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const candidate = new Date(today);
    candidate.setDate(today.getDate() + i);
    const candidateDayName = candidate.toLocaleDateString("en-US", { weekday: "long" });

    if (candidateDayName.toLowerCase() === dayName.toLowerCase()) {
      const dateStr = candidate.toISOString().split("T")[0];
      const label = candidate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      return { dateStr, label, isToday: i === 0 };
    }
  }

  const fallback = today.toISOString().split("T")[0];
  return { dateStr: fallback, label: today.toLocaleDateString("en-US", { month: "short", day: "numeric" }), isToday: true };
}

export default function StudentWeeklyMenuPage() {
  const [allMenus, setAllMenus] = useState(getAllMenus());
  const [selectedDish, setSelectedDish] = useState<DishDetails | null>(null);

  useEffect(() => {
    getAllMenusAction().then((menus) => {
      if (menus && menus.length > 0) {
        setAllMenus(menus);
      }
    });
  }, []);

  const currentDayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const [activeDay, setActiveDay] = useState<string>(
    daysOfWeek.includes(currentDayName) ? currentDayName : "Monday"
  );
  const [activeSlot, setActiveSlot] = useState<"all" | MealType>("all");
  const [dietFilter, setDietFilter] = useState<"all" | "veg" | "non-veg" | "high-protein" | "top-rated">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingMenuId, setLoadingMenuId] = useState<string | null>(null);
  const [userBookings, setUserBookings] = useState<Record<string, "yes" | "no">>({});

  const mealOrder: MealType[] = ["breakfast", "lunch", "snacks", "dinner"];

  // Filter or synthesize menus for the active day with its exact calendar date
  const getDayMeals = (dayName: string): Menu[] => {
    const { dateStr } = getTargetDateForWeekday(dayName);

    return mealOrder.map((type) => {
      const meta = FOOD_IMAGES[type];

      // 1. Direct match by date and meal type
      const match = allMenus.find(
        (m) => m.meal_type === type && m.menu_date === dateStr
      );

      if (match) return match;

      // 2. Synthesize deterministically with target calendar date
      const item1Name =
        type === "breakfast"
          ? "Golden Masala Dosa"
          : type === "lunch"
          ? "Fragrant Chicken Biryani"
          : type === "snacks"
          ? "Crispy Potato Samosa"
          : "Paneer Butter Masala with Naan";

      const item2Name =
        type === "breakfast"
          ? "Steamed Idli with Chutney"
          : type === "lunch"
          ? "Comforting Dal Rice"
          : type === "snacks"
          ? "Hot Spiced Masala Tea"
          : "Warm Gulab Jamun in Syrup";

      return {
        id: `menu-${dateStr}-${type}`,
        menu_date: dateStr,
        meal_type: type,
        cutoff_time:
          type === "breakfast"
            ? "06:00:00"
            : type === "lunch"
            ? "10:00:00"
            : type === "snacks"
            ? "15:30:00"
            : "17:00:00",
        serving_start_time:
          type === "breakfast"
            ? "07:30:00"
            : type === "lunch"
            ? "12:30:00"
            : type === "snacks"
            ? "17:00:00"
            : "19:30:00",
        serving_end_time:
          type === "breakfast"
            ? "09:30:00"
            : type === "lunch"
            ? "14:30:00"
            : type === "snacks"
            ? "18:00:00"
            : "21:30:00",
        is_published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        image_url: resolveDishImage(item1Name, null, "main"),
        calories: meta.calories,
        special_badge:
          type === "dinner" && dayName === "Sunday"
            ? "Grand Feast"
            : type === "dinner"
            ? "Chef's Special"
            : undefined,
        items: [
          {
            id: `item-${dateStr}-${type}-1`,
            menu_id: `menu-${dateStr}-${type}`,
            name: item1Name,
            category: "main" as const,
            is_vegetarian: !item1Name.toLowerCase().includes("chicken"),
            image_url: resolveDishImage(item1Name, null, "main"),
            description: meta.desc,
            created_at: "",
          },
          {
            id: `item-${dateStr}-${type}-2`,
            menu_id: `menu-${dateStr}-${type}`,
            name: item2Name,
            category: "side" as const,
            is_vegetarian: true,
            image_url: resolveDishImage(item2Name, null, "side"),
            description: "Freshly prepared accompaniment",
            created_at: "",
          },
        ],
      };
    });
  };

  const dayMeals = useMemo(() => getDayMeals(activeDay), [activeDay, allMenus]);

  const handleBooking = async (menuId: string, status: "yes" | "no") => {
    setLoadingMenuId(menuId);
    const res = await submitMealPlanAction({ menu_id: menuId, status });
    setLoadingMenuId(null);

    if (res.success) {
      setUserBookings((prev) => ({ ...prev, [menuId]: status }));
      toast.success(
        status === "yes"
          ? "Meal confirmed! Kitchen prep count updated."
          : "Meal opt-out recorded! Rebate saved."
      );
    } else {
      toast.error(res.error || "Could not update meal preference");
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* 1. TOP HEADER & CULINARY BRANDING */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Weekly Food Explorer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Central Mess Hall • Weekly Schedule
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse daily culinary offerings, check detailed ingredients, and set your attendance preferences.
          </p>
        </div>
      </div>

      {/* 2. HORIZONTAL 7-DAY SELECTOR (Mon - Sun) */}
      <div className="flex items-center gap-2 overflow-x-auto flex-nowrap pb-2 scrollbar-none">
        {daysOfWeek.map((day) => {
          const { label, isToday } = getTargetDateForWeekday(day);
          const isSelected = activeDay === day;

          return (
            <button
              key={day}
              type="button"
              onClick={() => setActiveDay(day)}
              className={`min-w-[88px] sm:flex-1 sm:min-w-[115px] shrink-0 p-3 sm:p-3.5 rounded-2xl border text-center transition-all ${
                isSelected
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-md font-bold"
                  : "bg-white dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-400"
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                <span className="text-xs font-bold tracking-tight">{day.slice(0, 3)}</span>
                {isToday && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" title="Today" />
                )}
              </div>
              <p className={`text-[11px] mt-0.5 font-medium ${isSelected ? "opacity-80" : "text-slate-400"}`}>
                {label}
              </p>
            </button>
          );
        })}
      </div>

      {/* 3. FILTERS & SEARCH BAR */}
      <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Meal Slot Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto flex-nowrap w-full md:w-auto p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {(["all", "breakfast", "lunch", "snacks", "dinner"] as const).map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setActiveSlot(slot)}
              className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all whitespace-nowrap shrink-0 ${
                activeSlot === slot
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              {slot === "all" ? "All Meals" : slot}
            </button>
          ))}
        </div>

        {/* Diet & Nutrient Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-1 overflow-x-auto flex-nowrap whitespace-nowrap pb-0.5 sm:pb-0">
            <button
              type="button"
              onClick={() => setDietFilter("all")}
              className={`min-h-[36px] px-2.5 py-1.5 rounded-lg text-xs font-semibold shrink-0 ${
                dietFilter === "all"
                  ? "bg-amber-500 text-slate-950 font-bold"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              All
            </button>

            <button
              type="button"
              onClick={() => setDietFilter("veg")}
              className={`min-h-[36px] px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0 ${
                dietFilter === "veg"
                  ? "bg-emerald-500 text-white"
                  : "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
              }`}
            >
              <div className="w-2 h-2 border border-current rounded-xs p-0.5">
                <div className="w-1 h-1 rounded-full bg-current" />
              </div>
              <span>Veg</span>
            </button>

            <button
              type="button"
              onClick={() => setDietFilter("non-veg")}
              className={`min-h-[36px] px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0 ${
                dietFilter === "non-veg"
                  ? "bg-rose-500 text-white"
                  : "text-rose-600 dark:text-rose-400 hover:bg-rose-500/10"
              }`}
            >
              <div className="w-2 h-2 border border-current rounded-xs p-0.5">
                <div className="w-1 h-1 rounded-full bg-current" />
              </div>
              <span>Non-Veg</span>
            </button>

            <button
              type="button"
              onClick={() => setDietFilter("high-protein")}
              className={`min-h-[36px] px-2.5 py-1.5 rounded-lg text-xs font-bold shrink-0 ${
                dietFilter === "high-protein"
                  ? "bg-blue-600 text-white"
                  : "text-blue-600 dark:text-blue-400 hover:bg-blue-500/10"
              }`}
            >
              High-Protein
            </button>

            <button
              type="button"
              onClick={() => setDietFilter("top-rated")}
              className={`min-h-[36px] px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0 ${
                dietFilter === "top-rated"
                  ? "bg-amber-400 text-slate-950"
                  : "text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
              }`}
            >
              <Star className="w-3 h-3 fill-current" />
              <span>4.8+ ★</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-auto sm:min-w-[180px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-8 pr-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-base sm:text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>

      {/* 4. MEAL SECTIONS WITH RICH FULL-IMAGE FOOD CARDS */}
      <div className="space-y-8">
        {dayMeals
          .filter((m) => activeSlot === "all" || m.meal_type === activeSlot)
          .map((meal) => {
            const currentPlan =
              userBookings[meal.id] || meal.user_meal_plan?.status || "yes";
            const isEating = currentPlan === "yes";
            const dishes = meal.items && meal.items.length > 0
              ? meal.items
              : [{ name: FOOD_IMAGES[meal.meal_type].desc.split("+")[0]?.trim() || "Main", category: "main", is_vegetarian: true }];

            // Apply search & diet filters to dishes
            const matchingDishes = dishes.filter((d) => {
              const full = getDishFullDetails(d.name, (d as any).image_url, d.category, meal.meal_type);
              if (dietFilter === "veg" && !full.isVegetarian) return false;
              if (dietFilter === "non-veg" && full.isVegetarian) return false;
              if (dietFilter === "high-protein" && full.protein < 18) return false;
              if (dietFilter === "top-rated" && full.rating < 4.8) return false;
              if (searchQuery.trim().length > 0) {
                return full.name.toLowerCase().includes(searchQuery.toLowerCase());
              }
              return true;
            });

            if (matchingDishes.length === 0 && (dietFilter !== "all" || searchQuery.trim().length > 0)) {
              return null;
            }

            return (
              <div
                key={meal.id}
                className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5"
              >
                {/* Meal Slot Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 capitalize">
                        {meal.meal_type}
                      </h2>
                      {meal.special_badge && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950">
                          {meal.special_badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        {formatTime(meal.serving_start_time)} – {formatTime(meal.serving_end_time)}
                      </span>
                      <span>•</span>
                      <span>Cutoff: {formatTime(meal.cutoff_time)}</span>
                    </div>
                  </div>

                  {/* Cutoff Timer & Quick Eating Toggle */}
                  <div className="flex items-center gap-3 self-start sm:self-auto">
                    <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 font-medium">
                      <span>Cutoff:</span>
                      <CutoffCountdown menuDate={meal.menu_date} cutoffTime={meal.cutoff_time} />
                    </div>

                    <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <button
                        type="button"
                        disabled={loadingMenuId === meal.id}
                        onClick={() => handleBooking(meal.id, "yes")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                          isEating
                            ? "bg-emerald-500 text-white shadow-2xs"
                            : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Eating</span>
                      </button>

                      <button
                        type="button"
                        disabled={loadingMenuId === meal.id}
                        onClick={() => handleBooking(meal.id, "no")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                          !isEating
                            ? "bg-rose-500 text-white shadow-2xs"
                            : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Skip (Save ₹150)</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Multi-Column Grid of Full-Image DishCards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {matchingDishes.map((dish, idx) => (
                    <DishCard
                      key={idx}
                      name={dish.name}
                      category={dish.category}
                      mealType={meal.meal_type}
                      isVegetarian={(dish as any).is_vegetarian}
                      onClick={(details) => setSelectedDish(details)}
                      showRateButton
                    />
                  ))}
                </div>
              </div>
            );
          })}
      </div>

      <DishDetailModal
        open={Boolean(selectedDish)}
        onOpenChange={(open) => !open && setSelectedDish(null)}
        dish={selectedDish}
      />
    </div>
  );
}
