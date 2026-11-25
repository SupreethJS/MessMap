"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Laptop,
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Brain,
  UtensilsCrossed,
} from "lucide-react";

export function LandingLivePreview() {
  const [activeTab, setActiveTab] = useState<"student" | "admin">("student");

  const handleKeyDown = (e: React.KeyboardEvent, tab: "student" | "admin") => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      setActiveTab(tab === "student" ? "admin" : "student");
    }
  };

  return (
    <section id="preview" className="relative z-10 py-16 bg-slate-100/70 dark:bg-slate-950/60 border-y border-slate-200 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
            <Laptop className="w-3.5 h-3.5" />
            <span>Interactive Operations Preview</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Two Tailored Experiences in One Unified Platform
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">
            Switch between the live interfaces designed for students and mess administrative chefs.
          </p>

          {/* Accessible Tab Controls */}
          <div
            role="tablist"
            aria-label="Role preview tabs"
            className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs mt-4"
          >
            <button
              role="tab"
              id="tab-student"
              aria-selected={activeTab === "student"}
              aria-controls="panel-student"
              tabIndex={activeTab === "student" ? 0 : -1}
              onClick={() => setActiveTab("student")}
              onKeyDown={(e) => handleKeyDown(e, "student")}
              className={`min-h-[44px] px-5 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                activeTab === "student"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Student Experience</span>
            </button>
            <button
              role="tab"
              id="tab-admin"
              aria-selected={activeTab === "admin"}
              aria-controls="panel-admin"
              tabIndex={activeTab === "admin" ? 0 : -1}
              onClick={() => setActiveTab("admin")}
              onKeyDown={(e) => handleKeyDown(e, "admin")}
              className={`min-h-[44px] px-5 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                activeTab === "admin"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin & Kitchen Console</span>
            </button>
          </div>
        </div>

        {/* Interactive Interface Card */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-8 shadow-xl relative overflow-hidden transition-colors">
          {/* Top Bar of Mock Interface */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 truncate max-w-[200px] sm:max-w-none">
                {activeTab === "student" ? "https://smartmess.msruas.ac.in/student/dashboard" : "https://smartmess.msruas.ac.in/admin/dashboard"}
              </span>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              System Live
            </span>
          </div>

          {/* Tab 1: Student Portal Mock */}
          <div
            id="panel-student"
            role="tabpanel"
            aria-labelledby="tab-student"
            hidden={activeTab !== "student"}
          >
            {activeTab === "student" && (
              <div className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Digital Mess Balance</div>
                    <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">₹450.00</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      Auto-topup linked to UPI
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Current Attendance</div>
                    <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">18 / 22 Meals</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">82% monthly dining rate</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Meal Status (Dinner)</div>
                    <div className="text-2xl font-black text-cyan-600 dark:text-cyan-400 mt-1">Opted In (Yes)</div>
                    <div className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Cutoff locked at 17:00
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                      <UtensilsCrossed className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Tonight's Dinner Menu</div>
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Fresh Roti, Shahi Paneer, Dal Tadka & Rice</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Nutritional Profile: ~680 kcal • 18g Protein • 100% Pure Veg</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 text-xs font-bold">
                      Meal Booked
                    </span>
                    <Link
                      href="/login"
                      className="min-h-[44px] px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center"
                    >
                      Open Full Menu
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tab 2: Admin Console Mock */}
          <div
            id="panel-admin"
            role="tabpanel"
            aria-labelledby="tab-admin"
            hidden={activeTab !== "admin"}
          >
            {activeTab === "admin" && (
              <div className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Predicted Dinner Headcount</div>
                    <div className="text-2xl font-black text-cyan-600 dark:text-cyan-400 mt-1">620 Students</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                      <Brain className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      590 Opted-in + 30 Buffer
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Lunch Wastage Recorded</div>
                    <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">3.4% Minimal</div>
                    <div className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1">6.2 kg leftover of 180 kg</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Open Hostel Complaints</div>
                    <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">1 Pending Ticket</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Water dispenser filter check</div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Kitchen Pantry Check</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                        100% In Stock
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Tomorrow's Breakfast: Masala Dosa & Sambar</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Rice Flour: 45kg available • Urad Dal: 22kg • Potatoes: 35kg</p>
                  </div>

                  <Link
                    href="/login"
                    className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white text-xs font-bold transition-all flex items-center justify-center"
                  >
                    Manage Inventory
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
