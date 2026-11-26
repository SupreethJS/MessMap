import Link from "next/link";
import { getDbReportAnalytics } from "@/lib/supabase/db";
import { MetricCard } from "@/components/admin/metric-card";
import { AnalyticsCharts } from "@/components/admin/analytics-charts";
import { ExportReportsButton } from "@/components/admin/export-reports-button";
import { Button } from "@/components/ui/button";
import { Scale, Users, Star, BarChart3, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminReportsPage({
  searchParams,
}: {
  searchParams?: { range?: "week" | "month" };
}) {
  const range = searchParams?.range === "month" ? "month" : "week";
  const analytics = await getDbReportAnalytics(range);

  return (
    <div className="space-y-8">
      {/* Header with Range Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Catering Reports & Analytics
          </h1>
          <p className="text-xs text-slate-500">
            Comprehensive audit of student headcount, kitchen preparation volume, and food wastage ratios.
          </p>
        </div>

        {/* Actions Row: Range Selector & CSV Export */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <Button
              asChild
              variant={range === "week" ? "default" : "ghost"}
              size="sm"
              className="text-xs h-8"
            >
              <Link href="/admin/reports?range=week">Last 7 Days</Link>
            </Button>
            <Button
              asChild
              variant={range === "month" ? "default" : "ghost"}
              size="sm"
              className="text-xs h-8"
            >
              <Link href="/admin/reports?range=month">Last 30 Days</Link>
            </Button>
          </div>

          <ExportReportsButton range={range} analytics={analytics} />
        </div>
      </div>

      {/* High-level Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <MetricCard
          title="Total Prepared Food"
          value={`${analytics.totalPrepared} kg`}
          subtitle={`Across ${analytics.totalMealsServed} served meals`}
          icon={Scale}
          color="emerald"
        />

        <MetricCard
          title="Total Leftover Waste"
          value={`${analytics.totalLeftover} kg`}
          subtitle={`Average wastage: ${analytics.avgWastage}%`}
          icon={Scale}
          color={analytics.avgWastage > 15 ? "rose" : "amber"}
        />

        <MetricCard
          title="Total Dining Turnout"
          value={analytics.totalAttendance}
          subtitle="Actual student meals consumed"
          icon={Users}
          color="blue"
        />

        <MetricCard
          title="Average Rating"
          value={`${analytics.avgRating} ★`}
          subtitle="Cumulative satisfaction index"
          icon={Star}
          color="amber"
        />
      </div>

      {/* Visual Charts */}
      <AnalyticsCharts dailyTrends={analytics.dailyTrends} />
    </div>
  );
}
