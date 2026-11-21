import React from "react";
import { Utensils } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QubiteLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  imgClassName?: string;
  variant?: "cream" | "transparent";
}

const sizeMap = {
  xs: "h-7 w-7 rounded-lg text-xs",
  sm: "h-9 w-9 rounded-xl text-sm",
  md: "h-11 w-11 rounded-2xl text-base",
  lg: "h-14 w-14 rounded-2xl text-lg",
  xl: "h-16 w-16 rounded-3xl text-xl",
};

const iconSizeMap = {
  xs: "w-3.5 h-3.5",
  sm: "w-4.5 h-4.5",
  md: "w-5 h-5",
  lg: "w-7 h-7",
  xl: "w-8 h-8",
};

/**
 * Smart Mess Management System Logo Component.
 * Modern gradient geometric emblem representing campus dining automation.
 */
export function QubiteLogo({
  size = "md",
  className,
}: QubiteLogoProps) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-md shadow-indigo-500/20 select-none flex items-center justify-center",
        sizeMap[size],
        className
      )}
    >
      <div className="w-full h-full bg-slate-900 rounded-[inherit] flex items-center justify-center">
        <Utensils className={cn("text-cyan-400", iconSizeMap[size])} />
      </div>
    </div>
  );
}
