"use client";

import { useState, useRef } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value?: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StarRating({
  value = 0,
  onChange,
  readOnly = false,
  size = "md",
  className,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const starSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const buttonSizes = {
    sm: "p-1.5 min-w-[32px] min-h-[32px]",
    md: "p-2 min-w-[44px] min-h-[44px]",
    lg: "p-2.5 min-w-[48px] min-h-[48px]",
  };

  const currentDisplay = hoverValue !== null ? hoverValue : value;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, star: number) => {
    if (readOnly || !onChange) return;

    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(5, star + 1);
      onChange(next);
      const buttons = containerRef.current?.querySelectorAll<HTMLButtonElement>("button");
      buttons?.[next - 1]?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      const prev = Math.max(1, star - 1);
      onChange(prev);
      const buttons = containerRef.current?.querySelectorAll<HTMLButtonElement>("button");
      buttons?.[prev - 1]?.focus();
    } else if (["1", "2", "3", "4", "5"].includes(e.key)) {
      e.preventDefault();
      const num = parseInt(e.key, 10);
      onChange(num);
      const buttons = containerRef.current?.querySelectorAll<HTMLButtonElement>("button");
      buttons?.[num - 1]?.focus();
    }
  };

  return (
    <div
      ref={containerRef}
      role={readOnly ? "img" : "radiogroup"}
      aria-label={readOnly ? `Rating: ${value} out of 5 stars` : "Meal rating: 1 to 5 stars"}
      className={cn("inline-flex items-center gap-0.5", className)}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= Math.floor(currentDisplay);
        const isHalf = !isFilled && star - 0.5 <= currentDisplay;
        const isSelected = value === star;
        const isFocusable = !readOnly && (isSelected || (value === 0 && star === 1));

        return (
          <button
            key={star}
            type="button"
            disabled={readOnly}
            role={readOnly ? undefined : "radio"}
            aria-checked={readOnly ? undefined : isSelected}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            tabIndex={readOnly ? -1 : isFocusable ? 0 : -1}
            onClick={() => !readOnly && onChange?.(star)}
            onKeyDown={(e) => handleKeyDown(e, star)}
            onMouseEnter={() => !readOnly && setHoverValue(star)}
            onMouseLeave={() => !readOnly && setHoverValue(null)}
            className={cn(
              "flex items-center justify-center rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-slate-900",
              readOnly
                ? "cursor-default p-0.5"
                : cn(
                    buttonSizes[size],
                    "cursor-pointer hover:scale-110 active:scale-95 hover:bg-slate-100 dark:hover:bg-slate-800"
                  )
            )}
          >
            <Star
              className={cn(
                starSizes[size],
                isFilled
                  ? "fill-amber-400 text-amber-500 drop-shadow-2xs"
                  : isHalf
                  ? "fill-amber-200 dark:fill-amber-800 text-amber-400"
                  : "text-slate-300 dark:text-slate-600 hover:text-slate-400"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
