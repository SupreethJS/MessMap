import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive?: boolean;
  };
  color?: "emerald" | "amber" | "rose" | "blue" | "slate";
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = "emerald",
}: MetricCardProps) {
  const colorStyles = {
    emerald: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/60",
    amber: "bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-800/60",
    rose: "bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-800/60",
    blue: "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800/60",
    slate: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {title}
            </p>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
              {value}
            </div>
            {subtitle && (
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{subtitle}</p>
            )}
            {trend && (
              <p
                className={cn(
                  "text-xs font-semibold mt-1",
                  trend.positive ? "text-emerald-600" : "text-rose-600"
                )}
              >
                {trend.value}
              </p>
            )}
          </div>
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl border p-2.5",
              colorStyles[color]
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
