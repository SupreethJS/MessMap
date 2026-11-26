import Link from "next/link";
import {
  Users,
  Scale,
  Star,
  ShoppingBag,
  Sparkles,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { MetricCard } from "@/components/admin/metric-card";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  getDbMenus,
  getDbFoodRecords,
  getDbGroceries,
  getDbRatings,
  getDbAIRecommendations,
} from "@/lib/supabase/db";
import { DishImageBadge } from "@/components/shared/dish-image-badge";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const today = new Date().toISOString().split("T")[0];

  const [todayMenus, foodRecords, groceries, allRatings, aiRecommendations] = await Promise.all([
    getDbMenus(today),
    getDbFoodRecords(),
    getDbGroceries(),
    getDbRatings(),
    getDbAIRecommendations(),
  ]);

  const totalOptedInToday = todayMenus.reduce((sum, m) => sum + (m.expected_attendance || 0), 0);

  // Active wastage calculation from recent records
  const recentRecords = foodRecords.slice(-10);
  const totalPrepared = recentRecords.reduce((sum, r) => sum + r.prepared_qty, 0);
  const totalLeftover = recentRecords.reduce((sum, r) => sum + r.leftover_qty, 0);
  const currentWastagePct = totalPrepared > 0 ? ((totalLeftover / totalPrepared) * 100).toFixed(1) : "0.0";

  // Low stock items count
  const lowStockCount = groceries.filter((g) => g.current_stock <= g.min_threshold).length;

  // Average student rating
  const avgRating = allRatings.length > 0
    ? (allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length).toFixed(1)
    : "4.2";

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
            Catering Operations Overview
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time mess headcount, food wastage metrics, and inventory health.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs min-h-[40px]">
            <Link href="/admin/menus/create">
              <PlusCircle className="w-4 h-4 mr-1.5" /> Publish New Menu
            </Link>
          </Button>
          <Button asChild variant="outline" className="text-xs min-h-[40px]">
            <Link href="/admin/food-records">
              <Scale className="w-4 h-4 mr-1.5 text-slate-500" /> Record Wastage
            </Link>
          </Button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <MetricCard
          title="Today's Opt-in Headcount"
          value={totalOptedInToday}
          subtitle="Total declared dining students"
          icon={Users}
          color="emerald"
        />

        <MetricCard
          title="Recent Food Wastage"
          value={`${currentWastagePct}%`}
          subtitle={parseFloat(currentWastagePct) > 15 ? "Above 15% threshold" : "Optimal range"}
          icon={Scale}
          color={parseFloat(currentWastagePct) > 15 ? "rose" : "emerald"}
        />

        <MetricCard
          title="Average Meal Rating"
          value={`${avgRating} ★`}
          subtitle={`Across ${allRatings.length} student reviews`}
          icon={Star}
          color="amber"
        />

        <MetricCard
          title="Low Stock Alerts"
          value={lowStockCount}
          subtitle="Items below min reorder point"
          icon={ShoppingBag}
          color={lowStockCount > 0 ? "rose" : "slate"}
        />
      </div>

      {/* Active AI Recommendations */}
      {aiRecommendations.length > 0 && (
        <Card className="border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-700 dark:text-emerald-400" /> AI Wastage & Quality Insights
            </CardTitle>
            <Button asChild variant="link" size="sm" className="text-xs text-emerald-800 dark:text-emerald-300">
              <Link href="/admin/ai-insights">Open full engine →</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {aiRecommendations.slice(0, 2).map((rec, idx) => (
              <div
                key={idx}
                className="p-3 bg-white dark:bg-slate-900/90 rounded-xl border border-emerald-100 dark:border-emerald-900/60 flex items-start gap-3 shadow-xs"
              >
                <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 mt-0.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{rec.title}</p>
                    <Badge variant={rec.priority === "critical" ? "destructive" : "warning"} className="text-[10px] py-0 px-1.5">
                      {rec.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{rec.message}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Two Column Layout: Today's Menus & Quick Operational Shortlinks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Menus Status */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold text-slate-800 dark:text-slate-100">
              Today&apos;s Service Menus
            </CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-xs text-slate-500 dark:text-slate-400">
              <Link href="/admin/menus">View All Menus →</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {todayMenus.length === 0 ? (
              <div className="p-8 text-center text-slate-400 dark:text-slate-500 text-sm">
                No menus created for today yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {todayMenus.map((m) => (
                  <div key={m.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-slate-100 capitalize text-sm">
                          {m.meal_type}
                        </span>
                        <span className="text-xs text-slate-400">
                          {m.serving_start_time} - {m.serving_end_time}
                        </span>
                      </div>
                      {m.items && m.items.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5 pt-1.5">
                          {m.items.map((i, idx) => (
                            <DishImageBadge
                              key={i.id || idx}
                              name={i.name}
                              category={i.category}
                              imageUrl={i.image_url}
                              isVegetarian={i.is_vegetarian}
                              size="sm"
                            />
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 italic">No dishes specified</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100 dark:border-slate-800">
                      <div className="sm:text-right">
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block">
                          {m.expected_attendance || 0} students
                        </span>
                        <span className="text-[10px] text-slate-400">Opted in</span>
                      </div>
                      <Button asChild variant="outline" size="sm" className="text-xs h-9 min-w-[64px]">
                        <Link href={`/admin/menus`}>Edit</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Operations Checklist */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold text-slate-800 dark:text-slate-100">
              Operational Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            <Link
              href="/admin/attendance"
              className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-emerald-200 hover:bg-emerald-50/30 dark:hover:bg-slate-800 transition-all text-xs font-semibold text-slate-700 dark:text-slate-200"
            >
              <span className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-emerald-600" /> Review Attendance Demand
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <Link
              href="/admin/food-records"
              className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-emerald-200 hover:bg-emerald-50/30 dark:hover:bg-slate-800 transition-all text-xs font-semibold text-slate-700 dark:text-slate-200"
            >
              <span className="flex items-center gap-2.5">
                <Scale className="w-4 h-4 text-emerald-600" /> Enter Leftover Weights
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <Link
              href="/admin/reports"
              className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-emerald-200 hover:bg-emerald-50/30 dark:hover:bg-slate-800 transition-all text-xs font-semibold text-slate-700 dark:text-slate-200"
            >
              <span className="flex items-center gap-2.5">
                <TrendingUp className="w-4 h-4 text-emerald-600" /> Weekly Wastage Charts
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <Link
              href="/admin/recipes"
              className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-emerald-200 hover:bg-emerald-50/30 dark:hover:bg-slate-800 transition-all text-xs font-semibold text-slate-700 dark:text-slate-200"
            >
              <span className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-emerald-600" /> Match Recipes to Inventory
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <Link
              href="/admin/ratings"
              className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-emerald-200 hover:bg-emerald-50/30 dark:hover:bg-slate-800 transition-all text-xs font-semibold text-slate-700 dark:text-slate-200"
            >
              <span className="flex items-center gap-2.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> Student Ratings & Leaderboard
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Culinary Satisfaction Highlights */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> Top Rated Student Favorites
          </CardTitle>
          <Button asChild variant="ghost" size="sm" className="text-xs text-slate-500">
            <Link href="/admin/ratings">Full Ratings & Reviews →</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: "Hyderabadi Chicken Biryani", category: "main", isVeg: false, rating: "4.8", reviews: 142 },
              { name: "Paneer Butter Masala", category: "main", isVeg: true, rating: "4.7", reviews: 98 },
              { name: "Crispy Masala Dosa", category: "main", isVeg: true, rating: "4.9", reviews: 215 },
              { name: "Gulab Jamun", category: "dessert", isVeg: true, rating: "4.9", reviews: 180 },
            ].map((dish) => (
              <div
                key={dish.name}
                className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between gap-2"
              >
                <DishImageBadge
                  name={dish.name}
                  category={dish.category}
                  isVegetarian={dish.isVeg}
                  size="sm"
                  className="bg-transparent border-0 shadow-none p-0 min-h-0"
                />
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 justify-end text-xs font-bold text-amber-600 dark:text-amber-400">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>{dish.rating}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {dish.reviews} ratings
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
