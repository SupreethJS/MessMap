"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Flame, Eye, Sparkles, Utensils, Info } from "lucide-react";
import { getDishFullDetails, DishDetails } from "@/lib/data/dish-images";
import { DishDetailModal } from "./dish-detail-modal";

export interface DishCardProps {
  name: string;
  category?: string | null;
  imageUrl?: string | null;
  description?: string | null;
  calories?: number | null;
  protein?: number | null;
  rating?: number | null;
  mealType?: string | null;
  isVegetarian?: boolean;
  className?: string;
  onClick?: (dish: DishDetails) => void;
  onRate?: (dish: DishDetails) => void;
  variant?: "default" | "compact" | "horizontal";
  showRateButton?: boolean;
}

export function DishCard({
  name,
  category,
  imageUrl,
  description,
  calories,
  protein,
  rating,
  mealType,
  isVegetarian,
  className = "",
  onClick,
  onRate,
  variant = "default",
  showRateButton = false,
}: DishCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const details = getDishFullDetails(name, imageUrl, category, mealType);
  const isVeg = isVegetarian !== undefined ? isVegetarian : details.isVegetarian;
  const displayCalories = calories ?? details.calories;
  const displayProtein = protein ?? details.protein;
  const displayRating = rating ?? details.rating;
  const displayDesc = description ?? details.description;
  const displayMealType = mealType ?? details.mealType;

  const handleClick = () => {
    if (onClick) {
      onClick(details);
    } else {
      setModalOpen(true);
    }
  };

  const handleRateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRate) {
      onRate(details);
    } else {
      setModalOpen(true);
    }
  };

  if (variant === "compact") {
    return (
      <>
        <div
          role="button"
          tabIndex={0}
          onClick={handleClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick();
            }
          }}
          className={`group flex items-center gap-3 p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-2xs hover:shadow-md hover:border-amber-400 dark:hover:border-amber-400/80 transition-all cursor-pointer text-left ${className}`}
        >
          <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
            <Image
              src={imgError ? "/images/dishes/rice_sambar.jpg" : details.imageUrl}
              alt={name}
              fill
              unoptimized
              onError={() => setImgError(true)}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Veg / Non-Veg Dot Badge */}
            <div className="absolute top-1 left-1 bg-white/90 dark:bg-slate-900/90 p-0.5 rounded-xs shadow-2xs">
              <div
                className={`w-3 h-3 border-2 ${
                  isVeg ? "border-emerald-600" : "border-rose-600"
                } flex items-center justify-center p-0.5 rounded-xs`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    isVeg ? "bg-emerald-600" : "bg-rose-600"
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate">
                {name}
              </h4>
              <span className="text-[10px] text-amber-500 font-bold flex items-center gap-0.5">
                <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                {displayRating}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
              {displayDesc}
            </p>
            <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400 font-medium">
              <span>{displayCalories} kcal</span>
              <span>•</span>
              <span>{displayProtein}g protein</span>
            </div>
          </div>
        </div>

        <DishDetailModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          dish={details}
          onRate={onRate}
        />
      </>
    );
  }

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        className={`group relative flex flex-col rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/80 shadow-xs hover:shadow-xl hover:border-amber-400/80 dark:hover:border-amber-400/70 transition-all duration-300 overflow-hidden cursor-pointer text-left ${className}`}
      >
        {/* Full-Bleed 16:10 Food Photography Container */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
          <Image
            src={imgError ? "/images/dishes/rice_sambar.jpg" : details.imageUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
            onError={() => setImgError(true)}
            className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
          />

          {/* Subtle Top & Bottom Gradient Vignettes */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/30 opacity-80 group-hover:opacity-60 transition-opacity" />

          {/* Top Overlay Row: Indian Veg/Non-Veg emblem on left, Rating & Meal Slot tag on right */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            {/* Authentic Indian Veg / Non-Veg Emblem */}
            <div
              className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/95 dark:bg-slate-950/90 backdrop-blur-md shadow-md border border-slate-200/60 dark:border-slate-800"
              title={isVeg ? "Pure Vegetarian" : "Non-Vegetarian"}
            >
              <div
                className={`w-3.5 h-3.5 border-2 ${
                  isVeg ? "border-emerald-600" : "border-rose-600"
                } flex items-center justify-center p-0.5 rounded-xs`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    isVeg ? "bg-emerald-600" : "bg-rose-600"
                  }`}
                />
              </div>
              <span
                className={`text-[10px] font-bold tracking-wide uppercase ${
                  isVeg ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"
                }`}
              >
                {isVeg ? "Veg" : "Non-Veg"}
              </span>
            </div>

            {/* Top-Right Badges: Star Rating & Meal Tag */}
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/85 text-amber-400 font-extrabold text-[11px] backdrop-blur-md shadow-md border border-amber-400/30">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {displayRating}
              </span>
              <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-slate-900/80 text-slate-200 font-bold text-[10px] backdrop-blur-md border border-white/10 uppercase tracking-wider">
                {displayMealType}
              </span>
            </div>
          </div>

          {/* Bottom Floating Pill: Calories & Protein */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/85 text-slate-100 font-semibold text-[11px] backdrop-blur-md border border-white/15">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{displayCalories} kcal</span>
              <span className="text-slate-400">•</span>
              <span className="text-emerald-300 font-bold">{displayProtein}g protein</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/90 hover:bg-amber-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider shadow-sm transition-transform group-hover:scale-105">
              <Eye className="w-3 h-3" />
              Details
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 tracking-tight line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              {name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
              {displayDesc}
            </p>
          </div>

          {/* Action Row */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium truncate max-w-[65%]">
              {details.servingWindow.split("•")[1]?.trim() || "Central Mess Hall"}
            </span>

            {showRateButton ? (
              <button
                type="button"
                onClick={handleRateClick}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-700 dark:text-amber-300 font-bold text-[11px] transition-colors"
              >
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>Rate</span>
              </button>
            ) : (
              <span className="text-amber-600 dark:text-amber-400 font-bold text-xs group-hover:underline inline-flex items-center gap-1">
                Explore <Eye className="w-3 h-3" />
              </span>
            )}
          </div>
        </div>
      </div>

      <DishDetailModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        dish={details}
        onRate={onRate}
      />
    </>
  );
}
