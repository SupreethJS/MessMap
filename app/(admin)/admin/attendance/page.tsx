import { getDbMenus, getDbDemandPredictionForMenu, getDbCheckInsForMenu } from "@/lib/supabase/db";
import { Card } from "@/components/ui/card";
import { Sparkles, Scale, Calendar, Clock, QrCode } from "lucide-react";
import { formatTime } from "@/lib/utils";
import { AttendanceScanner } from "@/components/admin/attendance-scanner";

export const dynamic = "force-dynamic";

export default async function AdminAttendancePage() {
  const allMenus = await getDbMenus();
  const today = new Date().toISOString().split("T")[0];

  // Active and upcoming menus
  const activeMenus = allMenus
    .filter((m) => m.menu_date >= today)
    .sort((a, b) => a.menu_date.localeCompare(b.menu_date))
    .slice(0, 10);

  // Initial check-ins for the first active menu if present
  const initialCheckIns = activeMenus[0]
    ? await getDbCheckInsForMenu(activeMenus[0].id)
    : [];

  return (
    <div className="space-y-8">
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <QrCode className="w-3.5 h-3.5 text-amber-500" />
            <span>Dining Verification & Scanning</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Meal Attendance & QR Check-In Scanner
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Scan student digital meal passes at counter entry, prevent duplicate claims, and track live dining headcount.
          </p>
        </div>
      </div>

      {/* 2. LIVE CAMERA SCANNER & MANUAL FALLBACK */}
      <AttendanceScanner
        menus={activeMenus}
        initialCheckIns={initialCheckIns}
      />

      {/* 3. UPCOMING HEADCOUNT & DEMAND FORECAST SECTION */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Upcoming Turnout & Demand Forecasts
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compare student declared opt-ins against AI forecast models and recommended cooking batch quantities.
          </p>
        </div>

        <div className="space-y-4">
          {activeMenus.length === 0 ? (
            <Card className="p-12 text-center text-slate-400">
              No upcoming meals found.
            </Card>
          ) : (
            activeMenus.map((menu) => {
              const prediction = getDbDemandPredictionForMenu(menu.id);
              const formattedDate = new Date(menu.menu_date + "T00:00:00").toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              });

              return (
                <Card key={menu.id} className="p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                    {/* Left Column: Menu Identity */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-slate-900 dark:text-slate-100 capitalize text-base">
                          {menu.meal_type}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" /> {formattedDate}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" /> Cutoff: {formatTime(menu.cutoff_time)}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        {menu.items?.map((i) => i.name).join(", ") || "No dishes specified"}
                      </p>

                      <div className="text-[11px] text-slate-400 dark:text-slate-500 italic">
                        {prediction.rationale}
                      </div>
                    </div>

                    {/* Right Column: Comparative Metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
                      {/* Declared Headcount */}
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                          Opt-in Headcount
                        </span>
                        <span className="text-xl font-extrabold text-slate-800 dark:text-slate-100">
                          {menu.expected_attendance || 0}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">Yes Responses</span>
                      </div>

                      {/* AI Predicted Turnout */}
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-100 dark:border-emerald-900/60 text-center">
                        <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 block tracking-wider flex items-center justify-center gap-1">
                          <Sparkles className="w-3 h-3" /> AI Headcount
                        </span>
                        <span className="text-xl font-extrabold text-emerald-800 dark:text-emerald-400">
                          {prediction.final_predicted_count}
                        </span>
                        <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block mt-0.5">Blended Forecast</span>
                      </div>

                      {/* Recommended Prep Qty */}
                      <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-100 dark:border-amber-900/60 text-center col-span-2 sm:col-span-1">
                        <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 block tracking-wider flex items-center justify-center gap-1">
                          <Scale className="w-3 h-3" /> Recommended
                        </span>
                        <span className="text-xl font-extrabold text-amber-900 dark:text-amber-300">
                          {prediction.recommended_prep_qty} {prediction.unit}
                        </span>
                        <span className="text-[10px] text-amber-700 dark:text-amber-400 block mt-0.5">Batch Prep Target</span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
