import { getDbMenus } from "@/lib/supabase/db";
import { getCurrentUser } from "@/app/actions/auth-actions";
import { MealOptInCard } from "@/components/student/meal-opt-in-card";
import { Utensils } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StudentMealPlansPage() {
  const user = await getCurrentUser();
  const allMenus = await getDbMenus(undefined, user?.id);
  const today = new Date().toISOString().split("T")[0];

  const upcomingMenus = allMenus
    .filter((m) => m.menu_date >= today)
    .sort((a, b) => a.menu_date.localeCompare(b.menu_date));

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <Utensils className="w-4 h-4" /> Attendance Opt-In
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          My Meal Plans
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your attendance declarations for all upcoming meals before cutoff deadlines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {upcomingMenus.map((menu) => (
          <MealOptInCard key={menu.id} menu={menu} />
        ))}
      </div>
    </div>
  );
}
