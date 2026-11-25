"use client";

import { useState } from "react";
import {
  User,
  ShieldCheck,
  QrCode,
  Wallet,
  Sparkles,
  TrendingUp,
  AlertCircle,
  Clock,
  CheckCircle2,
  Scale,
  CalendarDays,
  PlaneTakeoff,
  Camera,
} from "lucide-react";

export function LandingRoleShowcase() {
  const [activeRole, setActiveRole] = useState<"student" | "admin">("student");
  const [activeFeature, setActiveFeature] = useState(0);

  const studentFeatures = [
    {
      title: "Smart Meal Opt-Out & Wallet Rebates",
      tagline: "Save up to ₹1,500 every month on skipped meals",
      description:
        "Heading out for the weekend or studying late? Mark meals as 'Skip' before the daily cutoff or apply for multi-day mess leave. Qubite automatically waives charges and credits ₹150/day into your dining wallet.",
      icon: PlaneTakeoff,
      preview: {
        type: "leave",
        headline: "Hostel Mess Rebate Calculator",
        badge: "Auto Credited",
        stats: [
          { label: "Leave Duration", value: "3 Days (Fri – Sun)" },
          { label: "Daily Rate", value: "₹150 / Day" },
          { label: "Net Rebate Credited", value: "₹450.00" },
        ],
      },
    },
    {
      title: "Contactless QR Meal Pass",
      tagline: "Speed through the mess entrance in 2 seconds",
      description:
        "No more paper tokens or signing physical ledgers. Display your dynamic digital meal pass on your smartphone. Encodes your meal slot, opt-in verification, and room number with live time stamping.",
      icon: QrCode,
      preview: {
        type: "qr",
        headline: "Digital Boarding Dining Pass",
        badge: "Verified Resident",
        stats: [
          { label: "Resident", value: "Aarav Sharma (CS21B001)" },
          { label: "Meal Slot", value: "Dinner • 07:30 PM" },
          { label: "Hall", value: "Central Mess Hall 1" },
        ],
      },
    },
    {
      title: "Dining Micro-Wallet & Receipts",
      tagline: "Seamless top-ups via UPI with printable tax receipts",
      description:
        "Keep your dining balance topped up via Google Pay, PhonePe, or Cards. View an itemized ledger of every meal deduction and download official dining expense receipts with university seals.",
      icon: Wallet,
      preview: {
        type: "wallet",
        headline: "Prepaid Dining Balance",
        badge: "UPI Connected",
        stats: [
          { label: "Available Balance", value: "₹850.00" },
          { label: "Monthly Savings", value: "₹600.00" },
          { label: "Last Transaction", value: "+₹500 (UPI Top-Up)" },
        ],
      },
    },
  ];

  const adminFeatures = [
    {
      title: "AI Headcount & Demand Forecasting",
      tagline: "Prevent over-cooking before the kitchen fires up",
      description:
        "Our blended forecasting model combines declared student opt-ins with historical weekday attendance trends. Get accurate recommended batch cooking sizes in kilograms to minimize surplus food.",
      icon: Scale,
      preview: {
        type: "ai",
        headline: "Explainable Demand Forecast",
        badge: "99.4% Turnout Accuracy",
        stats: [
          { label: "Opt-in Headcount", value: "192 Students" },
          { label: "AI Predicted Turnout", value: "198 Residents" },
          { label: "Recommended Batch", value: "48.5 kg" },
        ],
      },
    },
    {
      title: "Live Camera QR Check-In Scanner",
      tagline: "Prevent duplicate scans & unauthorized entries",
      description:
        "Mount an iPad or Android tablet at the entrance counter. The camera automatically scans student passes, records check-ins in real-time, blocks duplicate claims, and offers a manual roll-number fallback.",
      icon: Camera,
      preview: {
        type: "scanner",
        headline: "Central Mess Entrance Scanner",
        badge: "Live Check-In",
        stats: [
          { label: "Scanned Turnout", value: "164 / 192 Diners" },
          { label: "Turnout Rate", value: "85.4% Attended" },
          { label: "Duplicates Blocked", value: "0 Duplicates" },
        ],
      },
    },
    {
      title: "Complaints & Immediate Rebate Refunds",
      tagline: "Resolve student feedback with accountability",
      description:
        "Track hygiene, food quality, or timing complaints categorized by severity. Post official contractor remarks and issue direct wallet refunds with one click, closing issues transparently.",
      icon: AlertCircle,
      preview: {
        type: "complaints",
        headline: "Student Grievance Console",
        badge: "Resolution Time < 4h",
        stats: [
          { label: "Open Issues", value: "1 Issue Pending" },
          { label: "Avg Resolution", value: "3.2 Hours" },
          { label: "Rebates Issued", value: "₹350 Awarded" },
        ],
      },
    },
  ];

  const features = activeRole === "student" ? studentFeatures : adminFeatures;
  const current = features[activeFeature] || features[0];

  return (
    <section id="how-it-works" className="relative z-10 py-16 md:py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Dual-Portal Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Engineered for Both Diners &amp; Kitchens
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            A unified ecosystem connecting students who eat with the catering contractors who cook.
          </p>

          {/* Interactive Role Switcher Toggle */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mt-2">
            <button
              type="button"
              onClick={() => {
                setActiveRole("student");
                setActiveFeature(0);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                activeRole === "student"
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <User className="w-4 h-4" />
              <span>For Hostel Students</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveRole("admin");
                setActiveFeature(0);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                activeRole === "admin"
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>For Catering Committees</span>
            </button>
          </div>
        </div>

        {/* Feature Selector Tabs + Interactive Preview Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Feature Selection Column */}
          <div className="lg:col-span-6 space-y-3">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              const isSelected = activeFeature === idx;
              return (
                <div
                  key={idx}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveFeature(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveFeature(idx);
                    }
                  }}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? "bg-amber-500/10 dark:bg-amber-500/10 border-amber-500/40 shadow-sm"
                      : "bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-amber-500 text-slate-950 font-bold"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-slate-900 dark:text-white">
                          {feat.title}
                        </h3>
                        {isSelected && (
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                        {feat.tagline}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Rich Interactive UI Preview Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-slate-900 text-white p-6 sm:p-8 border border-slate-800 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      Live Portal Preview
                    </span>
                    <h4 className="text-lg font-black text-white mt-0.5">
                      {current.preview.headline}
                    </h4>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {current.preview.badge}
                  </span>
                </div>

                {/* Simulated Metrics Card */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {current.preview.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-left space-y-1"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        {stat.label}
                      </span>
                      <span className="text-sm sm:text-base font-black text-white block">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Assurance Note */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3 text-xs text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>
                    Zero manual registers. Every meal record, scan, and deduction is backed by real-time database transactions.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
