"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Sparkles, UtensilsCrossed, Clock, Check } from "lucide-react";
import { DishCard } from "@/components/shared/dish-card";
import { DISH_PRESETS } from "@/lib/data/dish-images";

type MealSlot = "all" | "breakfast" | "lunch" | "snacks" | "dinner";
type DietFilter = "all" | "veg" | "non-veg";

export function LandingPublicMenu() {
  const [selectedSlot, setSelectedSlot] = useState<MealSlot>("lunch");
  const [dietFilter, setDietFilter] = useState<DietFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const slotSchedule = {
    breakfast: { name: "Breakfast", time: "07:30 AM – 09:30 AM", cutoff: "06:00 AM" },
    lunch: { name: "Lunch", time: "12:30 PM – 02:30 PM", cutoff: "10:00 AM" },
    snacks: { name: "Evening Snacks", time: "04:30 PM – 06:00 PM", cutoff: "03:30 PM" },
    dinner: { name: "Dinner Feast", time: "07:30 PM – 09:45 PM", cutoff: "05:00 PM" },
  };

  const allDishes = useMemo(() => {
    return [
      // Breakfast
      { name: "Idli with Chutney & Sambar", mealType: "Breakfast", category: "main", isVegetarian: true },
      { name: "Crispy Roast Dosa", mealType: "Breakfast", category: "main", isVegetarian: true },
      { name: "Golden Masala Dosa", mealType: "Breakfast", category: "main", isVegetarian: true },
      { name: "Rava Vegetable Upma", mealType: "Breakfast", category: "main", isVegetarian: true },
      { name: "Ghee Ven Pongal with Cashews", mealType: "Breakfast", category: "main", isVegetarian: true },
      { name: "Puffed Poori with Potato Sagu", mealType: "Breakfast", category: "bread", isVegetarian: true },
      { name: "Aloo Paratha with Melting Butter", mealType: "Breakfast", category: "bread", isVegetarian: true },
      { name: "South Indian Filter Coffee", mealType: "Breakfast", category: "beverage", isVegetarian: true },

      // Lunch
      { name: "Steamed Rice with Sambar", mealType: "Lunch", category: "rice", isVegetarian: true },
      { name: "Fragrant Chicken Biryani", mealType: "Lunch", category: "rice", isVegetarian: false },
      { name: "Coastal Spiced Fish Curry", mealType: "Lunch", category: "main", isVegetarian: false },
      { name: "Amritsari Chana Masala", mealType: "Lunch", category: "main", isVegetarian: true },
      { name: "Vegetable Pulav", mealType: "Lunch", category: "rice", isVegetarian: true },
      { name: "South Indian Curd Rice", mealType: "Lunch", category: "rice", isVegetarian: true },
      { name: "Comforting Dal Rice", mealType: "Lunch", category: "rice", isVegetarian: true },
      { name: "Crispy Papad & Pickle", mealType: "Lunch", category: "side", isVegetarian: true },

      // Snacks
      { name: "Crispy Potato Samosa", mealType: "Snacks", category: "snack", isVegetarian: true },
      { name: "Golden Spiced Aloo Bonda", mealType: "Snacks", category: "snack", isVegetarian: true },
      { name: "Crispy Vegetable Cutlet", mealType: "Snacks", category: "snack", isVegetarian: true },
      { name: "Kolkata Egg Roll", mealType: "Snacks", category: "snack", isVegetarian: false },
      { name: "Crispy Spicy Chicken 65", mealType: "Snacks", category: "snack", isVegetarian: false },
      { name: "Tangy Masala Corn Chat", mealType: "Snacks", category: "snack", isVegetarian: true },
      { name: "Hot Spiced Masala Tea", mealType: "Snacks", category: "beverage", isVegetarian: true },
      { name: "Osmania & Butter Biscuits", mealType: "Snacks", category: "snack", isVegetarian: true },

      // Dinner
      { name: "Paneer Butter Masala with Naan", mealType: "Dinner", category: "main", isVegetarian: true },
      { name: "Spiced Chicken Curry", mealType: "Dinner", category: "main", isVegetarian: false },
      { name: "Boiled Egg Curry with Gravy", mealType: "Dinner", category: "main", isVegetarian: false },
      { name: "Chapati with Dal", mealType: "Dinner", category: "bread", isVegetarian: true },
      { name: "Indo-Chinese Veg Fried Rice", mealType: "Dinner", category: "rice", isVegetarian: true },
      { name: "Mixed Vegetable Curry", mealType: "Dinner", category: "main", isVegetarian: true },
      { name: "Warm Gulab Jamun in Syrup", mealType: "Dinner", category: "dessert", isVegetarian: true },
      { name: "Traditional Rice Kheer", mealType: "Dinner", category: "dessert", isVegetarian: true },
    ];
  }, []);

  const filteredDishes = useMemo(() => {
    return allDishes.filter((dish) => {
      // Slot filter
      if (selectedSlot !== "all" && dish.mealType.toLowerCase() !== selectedSlot.toLowerCase()) {
        return false;
      }
      // Diet filter
      if (dietFilter === "veg" && !dish.isVegetarian) return false;
      if (dietFilter === "non-veg" && dish.isVegetarian) return false;
      // Search query
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        return dish.name.toLowerCase().includes(q) || dish.category.toLowerCase().includes(q);
      }
      return true;
    });
  }, [allDishes, selectedSlot, dietFilter, searchQuery]);

  return (
    <section id="menu" className="relative z-10 py-16 md:py-24 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-wider">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Live Campus Dining Chart</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Today&apos;s Mess Menu &amp; Specials
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
              Curated daily regional recipes prepared by certified university catering chefs. Click any dish card to view authentic ingredient sourcing, allergen advisory, and live student ratings.
            </p>
          </div>

          {/* Current Serving Window Info */}
          {selectedSlot !== "all" && (
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-slate-900 dark:text-slate-100">
                  {slotSchedule[selectedSlot].name} Serving Window
                </p>
                <p className="text-slate-500 dark:text-slate-400">
                  {slotSchedule[selectedSlot].time} • Cutoff {slotSchedule[selectedSlot].cutoff}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-2 bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-xs">
          {/* Meal Slot Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
            {(["lunch", "breakfast", "snacks", "dinner", "all"] as MealSlot[]).map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold capitalize transition-all whitespace-nowrap ${
                  selectedSlot === slot
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                {slot === "all" ? "All Slots" : slot}
              </button>
            ))}
          </div>

          {/* Diet Filter Pills & Search */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
              <button
                type="button"
                onClick={() => setDietFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  dietFilter === "all"
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                All Diets
              </button>

              <button
                type="button"
                onClick={() => setDietFilter("veg")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  dietFilter === "veg"
                    ? "bg-emerald-500 text-white shadow-2xs"
                    : "text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/10"
                }`}
              >
                <div className="w-2.5 h-2.5 border border-current rounded-xs flex items-center justify-center p-0.5">
                  <div className="w-1 h-1 rounded-full bg-current" />
                </div>
                <span>Veg Only</span>
              </button>

              <button
                type="button"
                onClick={() => setDietFilter("non-veg")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  dietFilter === "non-veg"
                    ? "bg-rose-500 text-white shadow-2xs"
                    : "text-rose-700 dark:text-rose-400 hover:bg-rose-500/10"
                }`}
              >
                <div className="w-2.5 h-2.5 border border-current rounded-xs flex items-center justify-center p-0.5">
                  <div className="w-1 h-1 rounded-full bg-current" />
                </div>
                <span>Non-Veg</span>
              </button>
            </div>

            {/* Real-Time Search Bar */}
            <div className="relative min-w-[160px] sm:min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        {/* 3–4 Column Responsive Food Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
            <UtensilsCrossed className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-base font-bold text-slate-800 dark:text-slate-200">
              No dishes found matching &quot;{searchQuery}&quot;
            </p>
            <p className="text-xs text-slate-500">
              Try adjusting your diet filters or search query to see other meal slot options.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setDietFilter("all");
                setSelectedSlot("all");
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-sm hover:bg-amber-600"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDishes.map((dish, i) => (
              <DishCard
                key={`${dish.name}-${i}`}
                name={dish.name}
                category={dish.category}
                mealType={dish.mealType}
                isVegetarian={dish.isVegetarian}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
