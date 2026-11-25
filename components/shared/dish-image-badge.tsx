"use client";

import { useState } from "react";
import Image from "next/image";
import { resolveDishImage, getDishCdnFallback, CATEGORY_FALLBACKS, getDishFullDetails } from "@/lib/data/dish-images";
import { DishDetailModal } from "@/components/shared/dish-detail-modal";
import { Utensils, ZoomIn } from "lucide-react";

interface DishImageBadgeProps {
  name: string;
  category?: string;
  imageUrl?: string | null;
  description?: string | null;
  isVegetarian?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  enablePreview?: boolean;
}

export function DishImageBadge({
  name,
  category,
  imageUrl,
  description,
  isVegetarian = true,
  size = "md",
  className = "",
  enablePreview = true,
}: DishImageBadgeProps) {
  const [open, setOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(() => resolveDishImage(name, imageUrl, category));
  const [fallbackStage, setFallbackStage] = useState(0);
  const [imgError, setImgError] = useState(false);

  const descriptiveAlt = `Freshly prepared portion of ${name}${category ? ` (${category})` : ""}${isVegetarian ? ", pure vegetarian" : ""}`;

  const handleImageError = () => {
    if (fallbackStage === 0) {
      setFallbackStage(1);
      const cdnUrl = getDishCdnFallback(name, category);
      if (cdnUrl && cdnUrl !== currentUrl) {
        setCurrentUrl(cdnUrl);
        return;
      }
    }
    if (fallbackStage <= 1 && category && CATEGORY_FALLBACKS[category]) {
      setFallbackStage(2);
      const catUrl = CATEGORY_FALLBACKS[category];
      if (catUrl && catUrl !== currentUrl) {
        setCurrentUrl(catUrl);
        return;
      }
    }
    setImgError(true);
  };

  const sizeClasses = {
    sm: "py-1 px-2.5 text-[11px] gap-1.5 min-h-[36px]",
    md: "py-1.5 px-3 text-xs gap-2 min-h-[44px]",
    lg: "py-2 px-3.5 text-sm gap-2.5 min-h-[48px]",
  };

  const imgDimensions = {
    sm: { w: 28, h: 28, class: "w-7 h-7" },
    md: { w: 32, h: 32, class: "w-8 h-8" },
    lg: { w: 40, h: 40, class: "w-10 h-10" },
  };

  const dishDetails = getDishFullDetails(name, imageUrl || currentUrl, category);

  return (
    <>
      <button
        type="button"
        onClick={() => enablePreview && setOpen(true)}
        aria-label={enablePreview ? `Preview culinary details for ${name}` : name}
        className={`inline-flex items-center rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 shadow-2xs hover:border-amber-400 dark:hover:border-amber-400 hover:shadow-xs transition-all text-slate-800 dark:text-slate-100 font-medium text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${sizeClasses[size]} ${
          enablePreview ? "cursor-pointer group" : "cursor-default"
        } ${className}`}
        title={enablePreview ? `Click to preview ${name}` : name}
      >
        {/* Food Thumbnail */}
        <div className={`relative ${imgDimensions[size].class} rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-700 ring-1 ring-slate-200/60 dark:ring-slate-700`}>
          {!imgError ? (
            <Image
              src={currentUrl}
              alt={descriptiveAlt}
              width={imgDimensions[size].w}
              height={imgDimensions[size].h}
              unoptimized
              onError={handleImageError}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
              <Utensils className="w-3.5 h-3.5" />
            </div>
          )}
        </div>

        {/* Dish Name */}
        <span className="truncate max-w-[190px] sm:max-w-[240px]">
          {name}
        </span>

        {/* Pure Veg Indicator */}
        {isVegetarian ? (
          <span
            className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"
            title="Pure Vegetarian"
            aria-label="Pure Vegetarian"
          />
        ) : (
          <span
            className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"
            title="Non-Vegetarian"
            aria-label="Non-Vegetarian"
          />
        )}

        {/* Category Pill if provided */}
        {category && size !== "sm" && (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/70 px-1.5 py-0.5 rounded-md">
            {category}
          </span>
        )}

        {enablePreview && (
          <ZoomIn className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity ml-0.5 shrink-0" />
        )}
      </button>

      {enablePreview && (
        <DishDetailModal
          open={open}
          onOpenChange={setOpen}
          dish={dishDetails}
        />
      )}
    </>
  );
}
