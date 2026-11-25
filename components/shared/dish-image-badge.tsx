"use client";

import { useState } from "react";
import Image from "next/image";
import { resolveDishImage, getDishCdnFallback, CATEGORY_FALLBACKS } from "@/lib/data/dish-images";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Utensils, Sparkles, ZoomIn } from "lucide-react";

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
    sm: { w: 24, h: 24, class: "w-6 h-6" },
    md: { w: 28, h: 28, class: "w-7 h-7" },
    lg: { w: 36, h: 36, class: "w-9 h-9" },
  };

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
        {isVegetarian && (
          <span
            className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"
            title="Pure Vegetarian"
            aria-label="Pure Vegetarian"
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

      {/* High-Resolution Preview Dialog */}
      {enablePreview && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-sm sm:max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-0 overflow-hidden shadow-2xl">
            <div className="relative h-56 sm:h-64 w-full bg-slate-100 dark:bg-slate-800">
              <Image
                src={currentUrl}
                alt={descriptiveAlt}
                fill
                unoptimized
                onError={handleImageError}
                className="object-cover"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase bg-black/85 text-amber-300 backdrop-blur-xs">
                  {category || "Mess Dish"}
                </span>
                {isVegetarian && (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-600 text-white">
                    Pure Veg
                  </span>
                )}
              </div>
            </div>

            <div className="p-5 space-y-3">
              <DialogHeader>
                <DialogTitle className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                  {name}
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500 dark:text-slate-400 pt-1 leading-relaxed">
                  {description || `Fresh culinary serving prepared daily in the campus mess hall according to standard recipes and nutritional guidelines.`}
                </DialogDescription>
              </DialogHeader>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Authentic Mess Preparation
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
