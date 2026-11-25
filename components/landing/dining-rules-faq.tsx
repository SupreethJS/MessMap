"use client";

import { useState } from "react";
import {
  Clock,
  HelpCircle,
  ChevronDown,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export function LandingDiningRulesFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const mealSchedules = [
    {
      slot: "Breakfast",
      timings: "07:30 AM – 09:30 AM",
      cutoff: "06:00 AM",
      typicalMenu: "Idli / Dosa / Pongal + Sambar + Chutneys + Filter Coffee",
    },
    {
      slot: "Lunch",
      timings: "12:30 PM – 02:30 PM",
      cutoff: "10:00 AM",
      typicalMenu: "Rice + Dal Tadka + Veg/Non-Veg Curries + Curd + Seasonal Salad",
    },
    {
      slot: "Evening Snacks",
      timings: "04:30 PM – 06:00 PM",
      cutoff: "03:30 PM",
      typicalMenu: "Samosas / Cutlets / Chicken 65 + Masala Ginger Tea / Coffee",
    },
    {
      slot: "Dinner",
      timings: "07:30 PM – 09:45 PM",
      cutoff: "05:00 PM",
      typicalMenu: "Phulkas / Naan + Paneer / Chicken / Egg Curry + Rice + Warm Sweet",
    },
  ];

  const faqs = [
    {
      question: "What is the deadline for opting out of a meal slot?",
      answer:
        "To allow catering teams to purchase and prepare exact quantities without wastage, cutoff times are strictly enforced: Breakfast at 06:00 AM, Lunch at 10:00 AM, Evening Snacks at 03:30 PM, and Dinner at 05:00 PM. Changes after these times are locked.",
    },
    {
      question: "How does the Mess Leave Rebate work?",
      answer:
        "When traveling home or going on academic field trips for more than 1 day, submit a Mess Leave in your student portal before 08:00 AM on the start date. Approved leaves automatically waive meal deductions and credit a standard ₹150/day dining rebate directly into your micro-wallet.",
    },
    {
      question: "How do I check in at Central Mess Hall entrance?",
      answer:
        "Open your Qubite portal on your phone and tap 'Show Meal Pass'. A dynamic QR code with live time verification will be generated. Hold it steady in front of the counter scanner. It automatically verifies your room booking and registers attendance in 2 seconds.",
    },
    {
      question: "What if my phone battery dies or I don't have internet?",
      answer:
        "Central Mess supervisors have a manual roll-number check-in console right at the entrance scanner. Simply state your university roll number (e.g. CS21B001) and hostel room number, and the steward will record your entry manually.",
    },
    {
      question: "Can I bring guest students or day scholars for lunch?",
      answer:
        "Yes! Residents can purchase guest dining vouchers directly through their dining wallet balance. Guest passes generate a dedicated QR entry voucher valid for that specific meal slot.",
    },
    {
      question: "How does Qubite's AI prevent kitchen food wastage?",
      answer:
        "Our mathematical demand model combines student declared opt-ins with historical turnout trends, day-of-week patterns, and exam schedules to recommend exact cooking batch weights in kilograms, reducing leftover disposal by over 40%.",
    },
  ];

  return (
    <section id="faq" className="relative z-10 py-16 md:py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Serving Schedule &amp; Guidelines</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Dining Timings &amp; Common Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Official operational hours, cutoff schedules, and resident dining policies for Central Mess Hall 1.
          </p>
        </div>

        {/* Timings Table Card */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-500" />
              Daily Dining Service Schedule
            </h3>
            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Central Mess Hall 1
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            {mealSchedules.map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2 text-left"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {item.slot}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    Cutoff {item.cutoff}
                  </span>
                </div>
                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {item.timings}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 leading-relaxed">
                  {item.typicalMenu}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-3 text-left">
          <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            Frequently Asked Questions
          </h3>

          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-bold text-sm text-slate-900 dark:text-slate-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-amber-500" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
