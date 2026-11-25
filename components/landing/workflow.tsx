"use client";

import { Zap, Calendar, Utensils, Activity } from "lucide-react";

export function LandingWorkflow() {
  const workflowSteps = [
    {
      step: "01",
      title: "Review Menu & Opt-In",
      desc: "Students review daily rotating menus with nutritional tags, declaring their meal attendance before the strict automated cutoff timer expires.",
      icon: Calendar,
    },
    {
      step: "02",
      title: "Kitchen Cooks to Exact Demand",
      desc: "Supervisors check the aggregated headcount dashboard and prepare exact portions, cutting unnecessary bulk cooking and institutional food waste.",
      icon: Utensils,
    },
    {
      step: "03",
      title: "Dine, Record & Resolve",
      desc: "Students dine smoothly without token lines, while administrators log food weights, review dish ratings, and resolve tickets in real time.",
      icon: Activity,
    },
  ];

  return (
    <section id="workflow" className="relative z-10 py-16 sm:py-20 bg-slate-100/60 dark:bg-slate-950/40 border-t border-slate-200 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
            <Zap className="w-3.5 h-3.5" />
            <span>Operational Flow</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How the Zero-Waste Pipeline Works
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">
            A transparent, reliable 3-step daily cycle coordinating students and the kitchen team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {workflowSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs relative group hover:border-indigo-400 dark:hover:border-indigo-500/40 transition-all"
              >
                <div className="text-4xl font-black text-slate-300 dark:text-slate-800 group-hover:text-indigo-500/30 transition-colors">
                  {step.step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center my-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
