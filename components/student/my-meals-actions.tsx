"use client";

import { useState } from "react";
import { QrCode, PlaneTakeoff } from "lucide-react";
import { MealPassModal } from "./meal-pass-modal";
import { LeaveRebateModal } from "./leave-rebate-modal";
import { Profile, Menu } from "@/lib/types/database";

interface MyMealsActionsProps {
  user: Profile | null;
  menus: Menu[];
}

export function MyMealsActions({ user, menus }: MyMealsActionsProps) {
  const [mealPassOpen, setMealPassOpen] = useState(false);
  const [leaveOpen, setLeaveOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setMealPassOpen(true)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-sm transition-all active:scale-95"
        >
          <QrCode className="w-4 h-4" />
          <span>Show Meal Pass</span>
        </button>

        <button
          onClick={() => setLeaveOpen(true)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs shadow-xs transition-all active:scale-95"
        >
          <PlaneTakeoff className="w-4 h-4 text-blue-500" />
          <span>Mess Leave / Rebate</span>
        </button>
      </div>

      <MealPassModal
        open={mealPassOpen}
        onOpenChange={setMealPassOpen}
        user={user}
        menus={menus}
      />
      <LeaveRebateModal open={leaveOpen} onOpenChange={setLeaveOpen} />
    </>
  );
}
