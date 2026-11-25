"use client";

import { useState } from "react";
import { Download, FileSpreadsheet, Check, ChevronDown } from "lucide-react";
import { toast } from "sonner";

interface ExportReportsButtonProps {
  range: "week" | "month";
  analytics: {
    totalPrepared: number;
    totalLeftover: number;
    avgWastage: number;
    avgRating: number;
    totalAttendance: number;
    totalMealsServed: number;
    dailyTrends: Array<{
      date: string;
      prepared: number;
      leftover: number;
      wastage: number;
      attendance: number;
      formattedDate: string;
    }>;
  };
}

export function ExportReportsButton({
  range,
  analytics,
}: ExportReportsButtonProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const downloadCSV = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success(`Exported ${filename}`);
  };

  const exportDailyAttendanceAndWaste = () => {
    const headers = ["Date", "Attendance (Students)", "Prepared Qty (kg)", "Leftover Qty (kg)", "Wastage Rate (%)"];
    const rows = analytics.dailyTrends.map((d) => [
      d.date,
      d.attendance,
      d.prepared,
      d.leftover,
      `${d.wastage}%`,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((r) => r.join(",")),
      "",
      `"Summary Metrics"`,
      `"Total Attendance",${analytics.totalAttendance}`,
      `"Total Prepared (kg)",${analytics.totalPrepared}`,
      `"Total Leftovers (kg)",${analytics.totalLeftover}`,
      `"Average Wastage Rate",${analytics.avgWastage}%`,
      `"Average Rating",${analytics.avgRating} / 5.0`,
      `"Meals Recorded",${analytics.totalMealsServed}`,
    ].join("\n");

    const dateStr = new Date().toISOString().split("T")[0];
    downloadCSV(
      csvContent,
      `qubite_attendance_and_waste_${range}_${dateStr}.csv`
    );
    setMenuOpen(false);
  };

  const exportWasteAuditSummary = () => {
    const headers = [
      "Audit Date",
      "Prepared (kg)",
      "Leftovers (kg)",
      "Loss Ratio (%)",
      "Status",
      "Action Recommendation",
    ];

    const rows = analytics.dailyTrends.map((d) => {
      const isHigh = d.wastage > 15;
      const status = isHigh ? "High Wastage" : "Optimal (Under 15%)";
      const action = isHigh
        ? "Reduce buffer prep batch size by 10-15%"
        : "Standard portion batching approved";
      return [
        d.date,
        d.prepared,
        d.leftover,
        `${d.wastage}%`,
        `"${status}"`,
        `"${action}"`,
      ];
    });

    const csvContent = [
      headers.join(","),
      ...rows.map((r) => r.join(",")),
      "",
      `"Audited By","Smart Mess Management - Central Mess Hall 1"`,
      `"Audit Generated",${new Date().toISOString()}`,
    ].join("\n");

    const dateStr = new Date().toISOString().split("T")[0];
    downloadCSV(csvContent, `qubite_waste_audit_report_${dateStr}.csv`);
    setMenuOpen(false);
  };

  const exportMonthlyBillingAndRebates = () => {
    const headers = [
      "Month",
      "Total Meals Served",
      "Estimated Meal Value (INR)",
      "Estimated Waste Cost (INR)",
      "Net Dining Efficiency (%)",
    ];

    const mealUnitRate = 50; // ₹50 avg per meal
    const wasteCostPerKg = 80; // ₹80 avg per kg
    const totalMealVal = analytics.totalAttendance * mealUnitRate;
    const wasteCost = Math.round(analytics.totalLeftover * wasteCostPerKg);
    const efficiency = (
      100 -
      (analytics.totalPrepared > 0
        ? (analytics.totalLeftover / analytics.totalPrepared) * 100
        : 0)
    ).toFixed(1);

    const rows = [
      [
        range === "month" ? "Last 30 Days" : "Last 7 Days",
        analytics.totalAttendance,
        `₹${totalMealVal}`,
        `₹${wasteCost}`,
        `${efficiency}%`,
      ],
    ];

    const csvContent = [
      headers.join(","),
      ...rows.map((r) => r.join(",")),
    ].join("\n");

    const dateStr = new Date().toISOString().split("T")[0];
    downloadCSV(csvContent, `qubite_billing_and_efficiency_${dateStr}.csv`);
    setMenuOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-sm transition-all"
      >
        <FileSpreadsheet className="w-4 h-4 text-amber-400 dark:text-amber-600" />
        <span>Export Reports (CSV)</span>
        <ChevronDown className="w-3.5 h-3.5 opacity-70" />
      </button>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-1.5 z-50 focus:outline-none animate-in fade-in zoom-in-95">
            <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Choose CSV Export Format
              </p>
            </div>

            <button
              type="button"
              onClick={exportDailyAttendanceAndWaste}
              className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between transition-colors"
            >
              <span>Daily Attendance & Wastage</span>
              <Download className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={exportWasteAuditSummary}
              className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between transition-colors"
            >
              <span>Kitchen Food Waste Audit</span>
              <Download className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={exportMonthlyBillingAndRebates}
              className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between transition-colors"
            >
              <span>Billing & Efficiency Summary</span>
              <Download className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
