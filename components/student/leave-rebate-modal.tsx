"use client";

import { useState, useMemo } from "react";
import {
  Calendar,
  IndianRupee,
  CalendarDays,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Info,
  PlaneTakeoff,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { applyHostelLeaveAction } from "@/app/actions/leave-actions";
import { toast } from "sonner";

interface LeaveRebateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeaveRebateModal({ open, onOpenChange }: LeaveRebateModalProps) {
  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);
  const tomorrowStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  const [startDate, setStartDate] = useState(tomorrowStr);
  const [endDate, setEndDate] = useState(tomorrowStr);
  const [reasonCategory, setReasonCategory] = useState("Going Home / Vacation");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);

  // Calculate duration and rebate
  const { daysCount, rebateAmount, isValidRange } = useMemo(() => {
    if (!startDate || !endDate) {
      return { daysCount: 0, rebateAmount: 0, isValidRange: false };
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      return { daysCount: 0, rebateAmount: 0, isValidRange: false };
    }
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return {
      daysCount: days,
      rebateAmount: days * 150, // ₹150/day standard hostel rebate
      isValidRange: true,
    };
  }, [startDate, endDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidRange || daysCount <= 0) {
      toast.error("Please enter a valid date range (End date must be on or after start date).");
      return;
    }

    setLoading(true);
    const fullReason = remarks.trim()
      ? `${reasonCategory}: ${remarks.trim()}`
      : reasonCategory;

    const res = await applyHostelLeaveAction({
      startDate,
      endDate,
      reason: fullReason,
    });
    setLoading(false);

    if (res.success) {
      toast.success(res.message || "Hostel leave approved and rebate credited!");
      setRemarks("");
      onOpenChange(false);
    } else {
      toast.error(res.error || "Failed to schedule mess leave");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <DialogHeader className="space-y-1">
            <div className="flex items-center gap-2.5 text-slate-900 dark:text-slate-100">
              <div className="h-10 w-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200/60 dark:border-amber-900/60 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                <PlaneTakeoff className="w-5 h-5" />
              </div>
              <DialogTitle className="text-lg font-bold">
                Hostel Mess Leave & Rebate
              </DialogTitle>
            </div>
            <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
              Schedule multi-day absence to waive mess charges. Eligible leaves credit ₹150/day directly to your dining wallet.
            </DialogDescription>
          </DialogHeader>

          {/* Date Range Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label
                htmlFor="leave-start-date"
                className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                Start Date
              </label>
              <input
                id="leave-start-date"
                type="date"
                min={todayStr}
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  if (e.target.value > endDate) {
                    setEndDate(e.target.value);
                  }
                }}
                className="w-full h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 text-xs font-medium text-slate-900 dark:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="leave-end-date"
                className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
              >
                <CalendarDays className="w-3.5 h-3.5 text-amber-500" />
                End Date (Inclusive)
              </label>
              <input
                id="leave-end-date"
                type="date"
                min={startDate || todayStr}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 text-xs font-medium text-slate-900 dark:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                required
              />
            </div>
          </div>

          {/* Reason Selection */}
          <div className="space-y-1.5">
            <label
              htmlFor="leave-reason-category"
              className="text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              Reason for Absence
            </label>
            <select
              id="leave-reason-category"
              value={reasonCategory}
              onChange={(e) => setReasonCategory(e.target.value)}
              className="w-full h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 text-xs font-medium text-slate-900 dark:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <option value="Going Home / Vacation">Going Home / Vacation</option>
              <option value="Semester Break / Exam Prep">Semester Break / Exam Prep</option>
              <option value="Academic Project / Conference">Academic Project / Conference</option>
              <option value="Medical Leave">Medical Leave</option>
              <option value="Personal Emergency">Personal Emergency</option>
              <option value="Internship / Training">Internship / Off-Campus Training</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="leave-remarks"
              className="text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              Remarks / Destination (Optional)
            </label>
            <input
              id="leave-remarks"
              type="text"
              placeholder="e.g. Home town visit, Bangalore"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            />
          </div>

          {/* Live Rebate Calculation Preview Box */}
          <div className="rounded-xl p-4 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 space-y-3">
            <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" /> Total Duration:
              </span>
              <span className="font-bold text-slate-900 dark:text-slate-100">
                {isValidRange ? `${daysCount} day${daysCount > 1 ? "s" : ""}` : "Invalid range"}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-400" /> Daily Rebate Rate:
              </span>
              <span className="font-bold text-slate-900 dark:text-slate-100">₹150 / day</span>
            </div>

            <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Estimated Mess Rebate:
              </span>
              <span className="text-base font-extrabold text-amber-600 dark:text-amber-400">
                ₹{rebateAmount}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Automatically adjusts kitchen prep quantities and credits wallet immediately.</span>
            </div>
          </div>

          <DialogFooter className="pt-2 gap-2 flex-col-reverse sm:flex-row">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto px-4 h-11 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !isValidRange || daysCount <= 0}
              className="w-full sm:w-auto px-5 h-11 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Scheduling Leave...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Mess Leave (₹{rebateAmount})</span>
                </>
              )}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
