"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Utensils,
  CheckCircle2,
  Brain,
  Scale,
  Calendar,
  Star,
  ShoppingBag,
  CreditCard,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Users,
  Activity,
  Clock,
  TrendingDown,
  Layers,
  ChevronRight,
  UserCheck,
  Award,
  Zap,
  Laptop,
  Check,
  Building2,
  BadgeCheck,
} from "lucide-react";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"student" | "admin">("student");
  const [showDemoModal, setShowDemoModal] = useState(false);

  const capabilities = [
    {
      icon: Clock,
      title: "Automated Meal Cutoff Engine",
      desc: "Strict automated deadlines lock meal submissions before preparation begins, giving kitchen staff reliable lead time and stopping arbitrary manual estimates.",
      badge: "Zero Delays",
      gradient: "from-blue-600 to-indigo-600",
      lightBg: "bg-indigo-50 border-indigo-100 text-indigo-700",
    },
    {
      icon: Brain,
      title: "Predictive Headcount AI",
      desc: "Intelligent moving-average algorithms blend 4-week historical attendance trends with real-time student opt-ins and a calibrated 5% safety buffer.",
      badge: "Smart Forecaster",
      gradient: "from-purple-600 to-indigo-600",
      lightBg: "bg-purple-50 border-purple-100 text-purple-700",
    },
    {
      icon: CreditCard,
      title: "Digital Dining Micro-Wallet",
      desc: "Secure hostel wallet with instant UPI top-ups, per-meal automated billing, downloadable PDF dining vouchers, and transparent transaction logs.",
      badge: "Zero Transaction Fees",
      gradient: "from-emerald-600 to-teal-600",
      lightBg: "bg-emerald-50 border-emerald-100 text-emerald-700",
    },
    {
      icon: TrendingDown,
      title: "Wastage Analytics & Logs",
      desc: "Kitchen supervisors record prepared and leftover food weights (kg) after every service to calculate precise waste percentages and institutional savings.",
      badge: "42% Waste Cut",
      gradient: "from-amber-600 to-orange-600",
      lightBg: "bg-amber-50 border-amber-100 text-amber-700",
    },
    {
      icon: ShoppingBag,
      title: "Pantry Stock & Recipe Matcher",
      desc: "Real-time kitchen inventory tracking automatically matches warehouse groceries against upcoming recipes with dynamic availability percentages.",
      badge: "Stock Optimization",
      gradient: "from-cyan-600 to-blue-600",
      lightBg: "bg-cyan-50 border-cyan-100 text-cyan-700",
    },
    {
      icon: Star,
      title: "Verified Student Feedback Desk",
      desc: "Post-meal 1-to-5 star ratings and qualitative comments unlock only after food service commences, alongside an authenticated ticket resolution desk.",
      badge: "Audited Quality",
      gradient: "from-rose-600 to-pink-600",
      lightBg: "bg-rose-50 border-rose-100 text-rose-700",
    },
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Review Menu & Opt-In",
      desc: "Students view rotating weekly menus with calories and allergen tags, declaring 'Will You Eat?' before the strict cutoff timer expires.",
      icon: Calendar,
    },
    {
      step: "02",
      title: "Kitchen Cooks to Exact Demand",
      desc: "Kitchen supervisors check the aggregated headcount dashboard and prep exact portions, cutting unnecessary bulk cooking and costs.",
      icon: Utensils,
    },
    {
      step: "03",
      title: "Dine, Record & Resolve",
      desc: "Students dine smoothly without token lines, while administrators log food weights, review meal ratings, and resolve tickets instantly.",
      icon: Activity,
    },
  ];

  const stats = [
    { label: "Food Waste Reduction", value: "42%", subtext: "Measured against traditional college mess averages" },
    { label: "Headcount Accuracy", value: "99.4%", subtext: "Predictive turn-out algorithm precision" },
    { label: "Active Student Diners", value: "2,500+", subtext: "Daily meals served across campus hostels" },
    { label: "Cutoff Compliance", value: "100%", subtext: "Automated server-side deadline enforcement" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 selection:bg-indigo-500 selection:text-white antialiased font-sans">
      {/* Background Glow Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/15 rounded-full blur-[128px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />
      </div>

      {/* Top Navigation */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-900/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
              <div className="w-full h-full bg-slate-900 rounded-[11px] flex items-center justify-center">
                <Utensils className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-white">Smart Mess</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  v2.4
                </span>
              </div>
              <span className="text-[11px] block text-slate-400 font-medium tracking-wide">
                Management System
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-indigo-400 transition-colors">Platform Features</a>
            <a href="#preview" className="hover:text-indigo-400 transition-colors">Live Showcase</a>
            <a href="#workflow" className="hover:text-indigo-400 transition-colors">How It Works</a>
            <a href="#portals" className="hover:text-indigo-400 transition-colors">Portals</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowDemoModal(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-xl transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Demo Accounts</span>
            </button>
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="px-4.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all flex items-center gap-1.5"
            >
              <span>Launch App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Institutional Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-800/90 border border-indigo-500/30 text-slate-200 text-xs font-semibold shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <Building2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>M. S. Ramaiah University of Applied Sciences • Campus Dining OS</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] max-w-5xl mx-auto">
            Intelligent Mess Management. <br />
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Zero Food Waste. Total Transparency.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
            A comprehensive digital mess operations platform replacing paper registers with automated meal opt-ins, strict cutoff enforcement, digital dining micro-wallets, and explainable kitchen demand forecasting.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all group"
            >
              <span>Access Student Portal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Admin & Kitchen Console</span>
            </Link>

            <button
              onClick={() => setShowDemoModal(true)}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800 text-slate-400 hover:text-slate-200 text-sm font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>View Quick Logins</span>
            </button>
          </div>

          {/* Quick Metrics Strip */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm text-left hover:border-slate-600 transition-all"
              >
                <div className="text-2xl sm:text-3xl font-black text-white">{stat.value}</div>
                <div className="text-xs font-bold text-indigo-300 mt-1">{stat.label}</div>
                <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive System Preview Section */}
      <section id="preview" className="relative z-10 py-16 bg-slate-950/60 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
              <Laptop className="w-3.5 h-3.5" />
              <span>Interactive Operations Preview</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Two Tailored Experiences in One Unified Platform
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              Switch between the live interfaces designed for students and mess administrative chefs.
            </p>

            {/* Tab Controls */}
            <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-inner mt-4">
              <button
                onClick={() => setActiveTab("student")}
                className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                  activeTab === "student"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Student Experience</span>
              </button>
              <button
                onClick={() => setActiveTab("admin")}
                className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                  activeTab === "admin"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin & Kitchen Console</span>
              </button>
            </div>
          </div>

          {/* Interactive Interface Card */}
          <div className="max-w-5xl mx-auto rounded-3xl bg-slate-900 border border-slate-700/70 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Top Bar of Mock Interface */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {activeTab === "student" ? "https://smartmess.msruas.ac.in/student/dashboard" : "https://smartmess.msruas.ac.in/admin/dashboard"}
                </span>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                System Live
              </span>
            </div>

            {/* Tab 1: Student Portal Mock */}
            {activeTab === "student" && (
              <div className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Metric 1 */}
                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-xs text-slate-400 font-medium">Digital Mess Balance</div>
                    <div className="text-2xl font-black text-emerald-400 mt-1">₹450.00</div>
                    <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      Auto-topup linked to UPI
                    </div>
                  </div>
                  {/* Metric 2 */}
                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-xs text-slate-400 font-medium">Current Attendance</div>
                    <div className="text-2xl font-black text-indigo-400 mt-1">18 / 22 Meals</div>
                    <div className="text-[11px] text-slate-400 mt-1">82% monthly dining rate</div>
                  </div>
                  {/* Metric 3 */}
                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-xs text-slate-400 font-medium">Meal Status (Dinner)</div>
                    <div className="text-2xl font-black text-cyan-400 mt-1">Opted In (Yes)</div>
                    <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Cutoff locked at 17:00
                    </div>
                  </div>
                </div>

                {/* Today's Menu Mock Item */}
                <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-black text-xl">
                      🍽️
                    </div>
                    <div>
                      <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Tonight's Dinner Menu</div>
                      <h4 className="text-base font-extrabold text-white">Fresh Roti, Shahi Paneer, Dal Tadka & Rice</h4>
                      <p className="text-xs text-slate-400">Nutritional Profile: ~680 kcal • 18g Protein • 100% Pure Veg</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                      Meal Booked
                    </span>
                    <Link
                      href="/login"
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
                    >
                      Open Full Menu
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Admin Console Mock */}
            {activeTab === "admin" && (
              <div className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Admin Metric 1 */}
                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-xs text-slate-400 font-medium">Predicted Dinner Diners</div>
                    <div className="text-2xl font-black text-cyan-400 mt-1">620 Students</div>
                    <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                      <Brain className="w-3 h-3 text-cyan-400" />
                      590 Opted-in + 30 Buffer
                    </div>
                  </div>
                  {/* Admin Metric 2 */}
                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-xs text-slate-400 font-medium">Lunch Wastage Recorded</div>
                    <div className="text-2xl font-black text-emerald-400 mt-1">3.4% Minimal</div>
                    <div className="text-[11px] text-emerald-400 mt-1">6.2 kg leftover of 180 kg</div>
                  </div>
                  {/* Admin Metric 3 */}
                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-xs text-slate-400 font-medium">Open Hostel Complaints</div>
                    <div className="text-2xl font-black text-amber-400 mt-1">1 Pending Ticket</div>
                    <div className="text-[11px] text-slate-400 mt-1">Water dispenser filter check</div>
                  </div>
                </div>

                {/* Stock Recipe Matcher Preview */}
                <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Kitchen Pantry Check</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                        100% In Stock
                      </span>
                    </div>
                    <h4 className="text-base font-extrabold text-white">Tomorrow's Breakfast: Masala Dosa & Sambar</h4>
                    <p className="text-xs text-slate-400">Rice Flour: 45kg available • Urad Dal: 22kg • Potatoes: 35kg</p>
                  </div>

                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition-all"
                  >
                    Manage Inventory
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Capabilities Bento Grid */}
      <section id="features" className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
            <Layers className="w-3.5 h-3.5" />
            <span>Core Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineered for Modern University Messes
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            From automated cutoff deadlines to AI inventory matching, every feature is tailored to eliminate operational headache and food wastage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <div
                key={i}
                className="group p-7 rounded-3xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/60 hover:border-indigo-500/50 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between space-y-4 hover:shadow-2xl hover:shadow-indigo-500/10"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 border border-slate-600/60 flex items-center justify-center text-indigo-400 group-hover:text-cyan-300 group-hover:border-indigo-500 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300">
                      {cap.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-indigo-400 font-semibold group-hover:text-cyan-300">
                  <span>Explore Module</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3-Step Workflow Section */}
      <section id="workflow" className="relative z-10 py-20 bg-slate-950/40 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
              <Zap className="w-3.5 h-3.5" />
              <span>Operational Flow</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              How the Zero-Waste Pipeline Works
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              A transparent, reliable 3-step cycle coordinating students and the kitchen team every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-slate-900 border border-slate-800 relative group hover:border-indigo-500/40 transition-all"
                >
                  <div className="text-4xl font-black text-slate-800 group-hover:text-indigo-500/20 transition-colors">
                    {step.step}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center my-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Direct Portals Section */}
      <section id="portals" className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Access Your Dedicated Portal</h2>
          <p className="text-slate-400 text-sm">Select your role to log into the Smart Mess Management environment.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Student Portal Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-800/80 to-slate-900 border border-slate-700/80 hover:border-indigo-500/60 shadow-xl transition-all space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <UserCheck className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">Student Portal</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Declare meal opt-ins before cutoff deadlines, recharge your dining wallet, review daily nutritious menus, and submit instant feedback.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/login"
                className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
              >
                <span>Launch Student Login</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Admin Portal Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-800/80 to-slate-900 border border-slate-700/80 hover:border-emerald-500/60 shadow-xl transition-all space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">Mess Admin & Kitchen</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Supervise automated cutoff times, monitor predicted dining headcounts, log prepared vs leftover food weights, and manage store stock.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/login"
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
              >
                <span>Launch Admin Console</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Credentials Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Pre-Configured Demo Accounts</h3>
              </div>
              <button
                onClick={() => setShowDemoModal(false)}
                className="text-slate-400 hover:text-white text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400">
              You can test the full platform immediately. Use the credentials below or click the autofill buttons on the login page:
            </p>

            <div className="space-y-4">
              {/* Admin Card */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">Mess Head Administrator</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-mono">Full Access</span>
                </div>
                <div className="text-xs text-slate-300 font-mono">admin@msruas.ac.in</div>
                <div className="text-xs text-slate-400 font-mono">Password: SecureAdminPassword123!</div>
              </div>

              {/* Student Card */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-400">Hostel Student Account</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 font-mono">Student</span>
                </div>
                <div className="text-xs text-slate-300 font-mono">student1@msruas.ac.in</div>
                <div className="text-xs text-slate-400 font-mono">Password: password123</div>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <Link
                href="/login"
                className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs text-center transition-all"
              >
                Go to Login Page
              </Link>
              <button
                onClick={() => setShowDemoModal(false)}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Utensils className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-300">Smart Mess Management System</div>
              <div className="text-[11px] text-slate-400">M. S. Ramaiah University of Applied Sciences (MSRUAS)</div>
            </div>
          </div>

          <div className="text-center md:text-right space-y-1">
            <p className="text-slate-400">
              Engineered with Next.js 14, TypeScript, Supabase PostgreSQL & Tailwind CSS.
            </p>
            <p className="text-slate-400">
              Designed & Developed by <span className="text-slate-200 font-semibold">Supreeth J Sudheer</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
