import React from "react";
import { cn } from "@/lib/utils";

export interface MessMapLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

const sizeMap = {
  xs: { box: "h-7 w-7 rounded-lg", icon: 16, text: "text-sm" },
  sm: { box: "h-9 w-9 rounded-xl", icon: 20, text: "text-base" },
  md: { box: "h-11 w-11 rounded-2xl", icon: 24, text: "text-lg" },
  lg: { box: "h-14 w-14 rounded-2xl", icon: 30, text: "text-xl" },
  xl: { box: "h-16 w-16 rounded-3xl", icon: 36, text: "text-2xl" },
};

/**
 * MessMap Official Logo Component.
 * Integrates an elegant dining motif (fork, cloche, plate) inside a modern location map-pin.
 * Automatically adapts with high-contrast emerald & amber styling in Light and Dark modes.
 */
export function MessMapLogo({
  size = "md",
  showText = false,
  className,
}: MessMapLogoProps) {
  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      {/* Brand Icon: Dining Map Pin */}
      <div
        className={cn(
          "relative shrink-0 flex items-center justify-center p-[2px] rounded-2xl shadow-sm transition-transform duration-200 group-hover:scale-105",
          "bg-gradient-to-br from-emerald-500 via-teal-500 to-amber-500 shadow-emerald-500/15",
          currentSize.box
        )}
      >
        <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[inherit] flex items-center justify-center overflow-hidden">
          <svg
            width={currentSize.icon}
            height={currentSize.icon}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-colors"
          >
            {/* Modern Map Pin Outline */}
            <path
              d="M16 2.5C10.2 2.5 5.5 7.2 5.5 13C5.5 19.8 14.2 28.3 15.3 29.3C15.7 29.7 16.3 29.7 16.7 29.3C17.8 28.3 26.5 19.8 26.5 13C26.5 7.2 21.8 2.5 16 2.5Z"
              className="fill-emerald-600 dark:fill-emerald-500"
            />
            {/* Inner Circular Plate */}
            <circle cx="16" cy="13" r="7.5" className="fill-white dark:fill-slate-900" />
            
            {/* Dining Cloche & Cutlery Motif */}
            {/* Fork (Left) */}
            <path
              d="M13 10V14M12 10V12.5C12 13 12.5 13.5 13 13.5M14 10V12.5C14 13 13.5 13.5 13 13.5M13 14V16.5"
              stroke="#059669"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="dark:stroke-emerald-400"
            />
            {/* Spoon / Knife (Right) */}
            <path
              d="M19 10C17.8 10 17.5 11.5 18 13.2C18.3 14 18.7 14.5 19 14.5V16.5M19 10V16.5"
              stroke="#D97706"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="dark:stroke-amber-400"
            />
            {/* Warm Food Steam Accent */}
            <circle cx="16" cy="8.2" r="0.8" className="fill-amber-500" />
          </svg>
        </div>
      </div>

      {/* Optional Wordmark */}
      {showText && (
        <span className={cn("font-black tracking-tight", currentSize.text)}>
          <span className="text-slate-900 dark:text-white">Mess</span>
          <span className="text-emerald-600 dark:text-emerald-400">Map</span>
        </span>
      )}
    </div>
  );
}
