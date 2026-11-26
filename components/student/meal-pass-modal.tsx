"use client";

import { useState, useEffect, useMemo } from "react";
import QRCode from "qrcode";
import {
  QrCode,
  Utensils,
  Clock,
  ShieldCheck,
  Calendar,
  User,
  Hash,
  Download,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { MealType, Profile, Menu } from "@/lib/types/database";

interface MealPassModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: Profile | null;
  menus?: Menu[];
}

export function MealPassModal({
  open,
  onOpenChange,
  user,
  menus = [],
}: MealPassModalProps) {
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  // Determine current default meal slot based on hour
  const defaultMealSlot: MealType = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 11) return "breakfast";
    if (hour < 16) return "lunch";
    if (hour < 19) return "snacks";
    return "dinner";
  }, []);

  const [selectedMeal, setSelectedMeal] = useState<MealType>(defaultMealSlot);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [timestamp, setTimestamp] = useState<string>("");

  // Find relevant menu for selected meal today
  const activeMenu = useMemo(() => {
    return menus.find(
      (m) =>
        m.menu_date === today &&
        m.meal_type.toLowerCase() === selectedMeal.toLowerCase()
    );
  }, [menus, today, selectedMeal]);

  const optInStatus = useMemo(() => {
    if (!activeMenu || !activeMenu.user_meal_plan) return "yes"; // Default opted in for demo/residents
    return activeMenu.user_meal_plan.status;
  }, [activeMenu]);

  useEffect(() => {
    if (!open) return;

    const now = new Date();
    setTimestamp(
      now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );

    const payload = JSON.stringify({
      student_id: user?.id || "u-student-001",
      student_roll_number: user?.roll_number || "2024CS001",
      student_name: user?.full_name || "Darshan Kulkarni",
      menu_id: activeMenu?.id || `menu-${today}-${selectedMeal}`,
      meal_type: selectedMeal,
      menu_date: today,
      opt_in_status: optInStatus,
      timestamp: now.toISOString(),
      hall: "Central Mess Hall 1",
    });

    QRCode.toDataURL(payload, {
      width: 256,
      margin: 2,
      color: {
        dark: "#0f172a",
        light: "#ffffff",
      },
      errorCorrectionLevel: "M",
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error("QR Code generation error:", err));
  }, [open, selectedMeal, user, activeMenu, optInStatus, today]);

  const isOptedOut = optInStatus === "no";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl overflow-hidden">
        <DialogHeader className="space-y-1">
          <div className="flex items-center gap-2.5 text-slate-900 dark:text-slate-100">
            <div className="h-10 w-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold">
                Student QR Meal Pass
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
                Present at mess entrance scanner for contactless check-in
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Meal Slot Selector Tabs */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
          {(["breakfast", "lunch", "snacks", "dinner"] as MealType[]).map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setSelectedMeal(slot)}
              className={`py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                selectedMeal === slot
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>

        {/* Digital Boarding Pass Ticket */}
        <div className="relative rounded-2xl border-2 border-dashed border-amber-500/30 bg-gradient-to-b from-amber-500/5 via-transparent to-amber-500/5 p-5 space-y-4">
          {/* Card Top Branding */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Central Mess Hall 1</span>
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                MessMap Dining Operations
              </p>
            </div>
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                isOptedOut
                  ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                  : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
              }`}
            >
              {isOptedOut ? (
                <>
                  <AlertTriangle className="w-3 h-3" />
                  Opted Out
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3 h-3" />
                  Meal Booked
                </>
              )}
            </span>
          </div>

          {/* Student Info Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <User className="w-3 h-3" /> Resident
              </span>
              <p className="font-bold text-slate-900 dark:text-slate-100 truncate">
                {user?.full_name || "Darshan Kulkarni"}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <Hash className="w-3 h-3" /> Roll Number
              </span>
              <p className="font-bold text-slate-900 dark:text-slate-100 truncate">
                {user?.roll_number || "2024CS001"}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <Utensils className="w-3 h-3" /> Meal Slot
              </span>
              <p className="font-bold text-amber-600 dark:text-amber-400 capitalize">
                {selectedMeal}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Date
              </span>
              <p className="font-bold text-slate-900 dark:text-slate-100">
                {today}
              </p>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
            {qrDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrDataUrl}
                alt="Meal Check-In QR Code"
                className="w-48 h-48 rounded-lg"
              />
            ) : (
              <div className="w-48 h-48 flex items-center justify-center text-slate-400">
                Generating pass...
              </div>
            )}
            <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
              <Clock className="w-3 h-3" />
              <span>Generated: {timestamp} • Live Verified</span>
            </div>
          </div>

          {/* Warning / Instructions */}
          {isOptedOut ? (
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-[11px] text-rose-700 dark:text-rose-300">
              ⚠️ You have opted out of this meal. Scanning will require mess warden spot-booking deduction.
            </div>
          ) : (
            <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">
              Hold steady in front of the scanner at Central Mess Hall entrance.
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="w-full h-11 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
        >
          Done
        </button>
      </DialogContent>
    </Dialog>
  );
}
