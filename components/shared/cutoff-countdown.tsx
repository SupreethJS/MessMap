"use client";

import { useEffect, useState } from "react";
import { getCutoffStatus, CutoffStatus } from "@/lib/services/cutoff-manager";
import { Clock, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface CutoffCountdownProps {
  menuDate: string;
  cutoffTime: string;
  className?: string;
  onCutoffReached?: () => void;
}

export function CutoffCountdown({
  menuDate,
  cutoffTime,
  className,
  onCutoffReached,
}: CutoffCountdownProps) {
  const [status, setStatus] = useState<CutoffStatus | null>(null);

  useEffect(() => {
    // Initial calculation
    const initial = getCutoffStatus(menuDate, cutoffTime);
    setStatus(initial);

    if (initial.isPassed) return;

    // Tick every second
    const interval = setInterval(() => {
      const current = getCutoffStatus(menuDate, cutoffTime);
      setStatus(current);

      if (current.isPassed) {
        clearInterval(interval);
        onCutoffReached?.();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [menuDate, cutoffTime, onCutoffReached]);

  if (!status) {
    return (
      <span
        role="status"
        aria-live="polite"
        className="inline-flex items-center text-xs text-slate-500 dark:text-slate-400 font-medium"
      >
        <Clock className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Checking cutoff...
      </span>
    );
  }

  if (status.isPassed) {
    return (
      <span
        role="status"
        aria-live="polite"
        aria-label="Meal plan locked: cutoff deadline has passed"
        className={cn(
          "inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60 transition-colors",
          className
        )}
      >
        <Lock className="w-3.5 h-3.5 mr-1.5 shrink-0" /> Plan Locked (Cutoff Passed)
      </span>
    );
  }

  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={`Cutoff timer: ${status.formattedTimeRemaining} remaining to modify meal plan`}
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800/60 transition-colors",
        className
      )}
    >
      <Clock className="w-3.5 h-3.5 mr-1.5 text-amber-600 dark:text-amber-400 shrink-0" /> Cutoff: {status.formattedTimeRemaining}
    </span>
  );
}
