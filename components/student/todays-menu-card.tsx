"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Flame, Check, X, Sparkles, UtensilsCrossed } from "lucide-react";
import { Menu, MealType } from "@/lib/types/database";
import { FOOD_IMAGES } from "@/lib/data/mess-store";
import { resolveDishImage, getDishFullDetails, DishDetails } from "@/lib/data/dish-images";
import { DishCard } from "@/components/shared/dish-card";
import { DishDetailModal } from "@/components/shared/dish-detail-modal";
import { formatTime } from "@/lib/utils";

interface TodaysMenuCardProps {
  menus: Menu[];
}

export function TodaysMenuCard({ menus }: TodaysMenuCardProps) {
  const [selectedDish, setSelectedDish] = useState<DishDetails | null>(null);

  const mealKeys: MealType[] = ["breakfast", "lunch", "snacks", "dinner"];

  const getMealMenu = (type: MealType): { menu: Menu; mainDishName: string } => {
    const existing = menus.find((m) => m.meal_type === type);
    if (existing) {
      const mainDish = existing.items?.[0]?.name || existing.meal_type;
      return { menu: existing, mainDishName: mainDish };
    }

    const meta = FOOD_IMAGES[type];
    const defaultDishName =
      type === "breakfast"
        ? "Golden Masala Dosa"
        : type === "lunch"
        ? "Fragrant Chicken Biryani"
        : type === "snacks"
        ? "Crispy Potato Samosa"
        : "Paneer Butter Masala with Naan";

    return {
      menu: {
        id: `menu-today-${type}`,
        menu_date: new Date().toISOString().split("T")[0],
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
        image_url: meta.url,
        calories: meta.calories,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      mainDishName: defaultDishName,
    };
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Central Mess Hall 1</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Today&apos;s 4-Meal Menu Board
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Click any dish to view complete ingredients, allergens, and resident reviews.
            </p>
          </div>

          <Link
            href="/student/menu"
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 flex items-center gap-1.5 group transition-colors self-start sm:self-auto"
          >
            <span>Explore 7-Day Weekly Menu</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Food Cards Displayed in Responsive 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {mealKeys.map((type) => {
            const { menu, mainDishName } = getMealMenu(type);
            const isVeg = menu.items && menu.items.length > 0 ? menu.items.every(i => i.is_vegetarian !== false) : !/(chicken|fish|egg)/i.test(mainDishName);

            return (
              <DishCard
                key={type}
                name={mainDishName}
                mealType={type.charAt(0).toUpperCase() + type.slice(1)}
                category="main"
                isVegetarian={isVeg}
                onClick={(details) => setSelectedDish(details)}
              />
            );
          })}
        </div>
      </div>

      <DishDetailModal
        open={Boolean(selectedDish)}
        onOpenChange={(open) => !open && setSelectedDish(null)}
        dish={selectedDish}
      />
    </>
  );
}
