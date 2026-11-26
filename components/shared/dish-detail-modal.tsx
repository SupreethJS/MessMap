"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Star,
  Flame,
  Clock,
  ShieldCheck,
  Building2,
  Info,
  CheckCircle2,
  X,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { DishDetails } from "@/lib/data/dish-images";
import { toast } from "sonner";

interface DishDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dish: DishDetails | null;
  onRate?: (dish: DishDetails) => void;
}

export function DishDetailModal({
  open,
  onOpenChange,
  dish,
  onRate,
}: DishDetailModalProps) {
  const [userRating, setUserRating] = useState<number | null>(null);
  const [rated, setRated] = useState(false);

  if (!dish) return null;

  const handleQuickRate = (score: number) => {
    setUserRating(score);
    setRated(true);
    toast.success(`Thank you! You rated ${dish.name} ${score} ★`);
    if (onRate) {
      onRate(dish);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-0 shadow-2xl overflow-hidden focus:outline-none max-h-[90dvh] flex flex-col">
        {/* Full-Bleed High-Res Dish Photography Header */}
        <div className="relative w-full h-48 sm:h-72 overflow-hidden bg-slate-950 shrink-0">
          <Image
            src={dish.imageUrl}
            alt={dish.name}
            fill
            priority
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Top Floating Badges */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-14 flex flex-wrap items-center justify-between gap-2">
            {/* Indian Veg / Non-Veg Emblem */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 shadow-md">
              <div
                className={`w-4 h-4 border-2 ${
                  dish.isVegetarian ? "border-emerald-500" : "border-rose-500"
                } flex items-center justify-center p-0.5 rounded-xs`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    dish.isVegetarian ? "bg-emerald-500" : "bg-rose-500"
                  }`}
                />
              </div>
              <span
                className={`text-xs font-bold uppercase tracking-wider ${
                  dish.isVegetarian ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {dish.isVegetarian ? "Pure Vegetarian" : "Non-Vegetarian"}
              </span>
            </div>

            {/* Rating Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-400/40 text-amber-400 font-extrabold text-xs shadow-md">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{dish.rating}</span>
              <span className="text-slate-400 font-normal">({dish.reviewsCount} reviews)</span>
            </div>
          </div>

          {/* Bottom Overlay Title & Meal Slot */}
          <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950">
              {dish.mealType} Special
            </span>
            <DialogTitle className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-sm">
              {dish.name}
            </DialogTitle>
          </div>
        </div>

        {/* Scrollable Details Body */}
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 overflow-y-auto flex-1">
          {/* Mouth-Watering Culinary Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
              Chef&apos;s Description
            </h4>
            <DialogDescription className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {dish.description}
            </DialogDescription>
          </div>

          {/* 4-Column Nutritional Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
                Calories
              </span>
              <span className="text-lg font-black text-slate-900 dark:text-slate-100">
                {dish.calories}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">kcal</span>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
                Protein
              </span>
              <span className="text-lg font-black text-slate-900 dark:text-slate-100">
                {dish.protein}g
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">High Yield</span>
            </div>

            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 block">
                Carbs
              </span>
              <span className="text-lg font-black text-slate-900 dark:text-slate-100">
                {dish.carbs}g
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Energy</span>
            </div>

            <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400 block">
                Healthy Fats
              </span>
              <span className="text-lg font-black text-slate-900 dark:text-slate-100">
                {dish.fat}g
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Balanced</span>
            </div>
          </div>

          {/* Serving Hall & Window Card */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100">
                  Daily Serving Window
                </p>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                  {dish.servingWindow}
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] border border-emerald-500/20">
              Live Serving
            </span>
          </div>

          {/* Ingredients & Allergens Tags */}
          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                Key Fresh Ingredients
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {dish.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                Allergen & Diet Notes
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {dish.allergens.map((alg, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 text-xs font-semibold"
                  >
                    {alg}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Real Student Reviews Section */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                Verified Resident Reviews ({dish.reviews.length})
              </h4>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleQuickRate(star)}
                    className="p-1 hover:scale-125 transition-transform"
                    title={`Rate ${star} Stars`}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        (userRating ?? 0) >= star
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300 dark:text-slate-600 hover:text-amber-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              {dish.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      {rev.studentName}{" "}
                      <span className="text-slate-400 font-normal">({rev.roll})</span>
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{rev.rating}</span>
                      <span className="text-slate-400 text-[10px] ml-1">{rev.date}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => handleQuickRate(5)}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Star className="w-3.5 h-3.5 fill-slate-950" />
            <span>{rated ? "Rated ★" : "Rate This Meal (5★)"}</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
