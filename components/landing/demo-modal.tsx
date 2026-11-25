"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface LandingDemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LandingDemoModal({ open, onOpenChange }: LandingDemoModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl">
        <DialogHeader className="space-y-1">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Zap className="w-4 h-4" />
            </div>
            <DialogTitle className="text-lg font-bold">Pre-Configured Demo Accounts</DialogTitle>
          </div>
          <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
            You can test the entire platform immediately using the credentials below or 1-click quick login buttons.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3.5 py-3">
          {/* Admin Demo Card */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Mess Head Administrator</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-mono font-bold">
                Full Admin
              </span>
            </div>
            <div className="text-xs text-slate-700 dark:text-slate-300 font-mono">admin@msruas.ac.in</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">Password: SecureAdminPassword123!</div>
          </div>

          {/* Student Demo Card */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400">Hostel Student Account</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 font-mono font-bold">
                Student
              </span>
            </div>
            <div className="text-xs text-slate-700 dark:text-slate-300 font-mono">student1@msruas.ac.in</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">Password: password123</div>
          </div>
        </div>

        <DialogFooter className="gap-2.5">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
          <Link
            href="/login"
            onClick={() => onOpenChange(false)}
            className="min-h-[44px] flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center transition-all shadow-xs"
          >
            Go to 1-Click Login Page
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
