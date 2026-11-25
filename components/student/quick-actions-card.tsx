"use client";

import { useState } from "react";
import Link from "next/link";
import { UtensilsCrossed, AlertCircle, Wallet, Star, QrCode, PlaneTakeoff } from "lucide-react";
import { TopUpModal } from "@/components/student/topup-modal";
import { ComplaintModal } from "@/components/student/complaint-modal";
import { MealPassModal } from "@/components/student/meal-pass-modal";
import { LeaveRebateModal } from "@/components/student/leave-rebate-modal";
import { Profile, Menu } from "@/lib/types/database";

interface QuickActionsCardProps {
  user?: Profile | null;
  menus?: Menu[];
}

export function QuickActionsCard({ user = null, menus = [] }: QuickActionsCardProps) {
  const [topUpOpen, setTopUpOpen] = useState(false);
  const [complaintOpen, setComplaintOpen] = useState(false);
  const [mealPassOpen, setMealPassOpen] = useState(false);
  const [leaveOpen, setLeaveOpen] = useState(false);

  return (
    <>
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <h3 className="font-semibold text-base text-slate-900 dark:text-slate-100 tracking-tight">
            Quick Actions
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Frequently used hostel mess shortcuts</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {/* Action 1: Digital Meal Pass */}
          <button
            onClick={() => setMealPassOpen(true)}
            className="p-3.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 flex flex-col items-center justify-center text-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.99] group"
          >
            <div className="h-9 w-9 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <QrCode className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
              Meal Pass (QR)
            </span>
          </button>

          {/* Action 2: Mess Leave & Rebate */}
          <button
            onClick={() => setLeaveOpen(true)}
            className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100/80 border border-blue-200/60 dark:border-blue-900/60 flex flex-col items-center justify-center text-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.99] group"
          >
            <div className="h-9 w-9 rounded-lg bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <PlaneTakeoff className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
              Mess Leave (Rebate)
            </span>
          </button>

          {/* Action 3: Raise Complaint */}
          <button
            onClick={() => setComplaintOpen(true)}
            className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100/80 border border-rose-200/60 dark:border-rose-900/60 flex flex-col items-center justify-center text-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.99] group"
          >
            <div className="h-9 w-9 rounded-lg bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <AlertCircle className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
              Raise Complaint
            </span>
          </button>

          {/* Action 4: Top Up Wallet */}
          <button
            onClick={() => setTopUpOpen(true)}
            className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100/80 border border-emerald-200/60 dark:border-emerald-900/60 flex flex-col items-center justify-center text-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.99] group"
          >
            <div className="h-9 w-9 rounded-lg bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <Wallet className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
              Top Up Wallet
            </span>
          </button>

          {/* Action 5: My Meal Plans */}
          <Link
            href="/student/my-meals"
            className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100/80 border border-amber-200/60 dark:border-amber-900/60 flex flex-col items-center justify-center text-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.99] group"
          >
            <div className="h-9 w-9 rounded-lg bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
              Manage Meals
            </span>
          </Link>

          {/* Action 6: Give Feedback */}
          <Link
            href="/student/feedback"
            className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100/80 border border-indigo-200/60 dark:border-indigo-900/60 flex flex-col items-center justify-center text-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.99] group"
          >
            <div className="h-9 w-9 rounded-lg bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <Star className="w-4 h-4 fill-indigo-600" />
            </div>
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
              Give Feedback
            </span>
          </Link>
        </div>
      </div>

      <TopUpModal open={topUpOpen} onOpenChange={setTopUpOpen} currentBalance={user?.wallet_balance ?? 450} />
      <ComplaintModal open={complaintOpen} onOpenChange={setComplaintOpen} />
      <MealPassModal open={mealPassOpen} onOpenChange={setMealPassOpen} user={user} menus={menus} />
      <LeaveRebateModal open={leaveOpen} onOpenChange={setLeaveOpen} />
    </>
  );
}
