import {
  getDbMenus,
  getDbFoodRecords,
  getDbRatings,
  getDbGroceries,
} from "@/lib/supabase/db";
import { getStore } from "@/lib/data/mess-store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Settings, Shield, Database, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const [menus, foodRecords, ratings, groceries] = await Promise.all([
    getDbMenus(),
    getDbFoodRecords(),
    getDbRatings(),
    getDbGroceries(),
  ]);
  const store = getStore();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          Mess Configuration & Settings
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Operational cutoff policies, database metrics, and hostel dining rules.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Standard Cutoff Policy */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" /> Default Meal Cutoff Schedules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-900/70 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-100 block">Breakfast</span>
                <span className="text-slate-400 dark:text-slate-500">Serving: 07:30 – 09:30 AM</span>
              </div>
              <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
                06:00 AM
              </span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900/70 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-100 block">Lunch</span>
                <span className="text-slate-400 dark:text-slate-500">Serving: 12:30 – 02:30 PM</span>
              </div>
              <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
                10:00 AM
              </span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900/70 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-100 block">Dinner</span>
                <span className="text-slate-400 dark:text-slate-500">Serving: 07:30 – 09:30 PM</span>
              </div>
              <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
                05:00 PM
              </span>
            </div>

            <p className="text-[11px] text-slate-400 dark:text-slate-500 italic pt-1">
              * Cutoffs guarantee kitchen staff a minimum 2.5-hour advance window to procure produce and adjust cooking quantities.
            </p>
          </CardContent>
        </Card>

        {/* Database & System Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> System State & Active Records
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">Registered Student Profiles</span>
              <span className="font-bold text-slate-800 dark:text-slate-100">
                {store.profiles.filter((p) => p.role === "student").length} accounts
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">Total Menus Published</span>
              <span className="font-bold text-slate-800 dark:text-slate-100">{menus.length} meals</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">Historical Wastage Logs</span>
              <span className="font-bold text-slate-800 dark:text-slate-100">{foodRecords.length} records</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">Student Ratings Collected</span>
              <span className="font-bold text-slate-800 dark:text-slate-100">{ratings.length} reviews</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-500 dark:text-slate-400">Inventory Items Tracked</span>
              <span className="font-bold text-slate-800 dark:text-slate-100">{groceries.length} items</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
