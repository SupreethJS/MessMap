"use client";

import { useState } from "react";
import { LandingNavbar } from "@/components/landing/navbar";
import { LandingHero } from "@/components/landing/hero";
import { LandingPublicMenu } from "@/components/landing/public-menu";
import { LandingWeeklyHighlights } from "@/components/landing/weekly-highlights";
import { LandingRoleShowcase } from "@/components/landing/role-showcase";
import { LandingReviewsAndMetrics } from "@/components/landing/reviews-and-metrics";
import { LandingDiningRulesFaq } from "@/components/landing/dining-rules-faq";
import { LandingFooter } from "@/components/landing/footer";
import { LandingDemoModal } from "@/components/landing/demo-modal";

export default function LandingPage() {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-amber-400 selection:text-slate-950 antialiased font-sans transition-colors">
      {/* Accessible Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-amber-400 focus:text-slate-950 focus:font-extrabold focus:text-xs focus:rounded-xl focus:shadow-xl focus:ring-2 focus:ring-slate-950 transition-all"
      >
        Skip to main content
      </a>

      {/* Decorative Subtle Background Glow Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/10 rounded-full blur-[128px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full blur-[128px]" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-[128px]" />
      </div>

      {/* Sticky Full-Width Navigation */}
      <LandingNavbar onOpenDemoModal={() => setShowDemoModal(true)} />

      {/* Main Semantic Landmark */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {/* 1. High-Impact Editorial Hero Section */}
        <LandingHero onOpenDemoModal={() => setShowDemoModal(true)} />

        {/* 2. Interactive Public "Today's Mess Menu" */}
        <LandingPublicMenu />

        {/* 3. Visual "Weekly Highlights" Horizontal Food Carousel */}
        <LandingWeeklyHighlights />

        {/* 4. "Built for Students & Mess Committees" Feature Showcase */}
        <LandingRoleShowcase />

        {/* 5. Live Impact Metrics & Verified Student Reviews */}
        <LandingReviewsAndMetrics />

        {/* 6. Dining Hall Timings, Rules & Interactive FAQ Accordion */}
        <LandingDiningRulesFaq />
      </main>

      {/* Multi-Column Website Footer */}
      <LandingFooter />

      {/* Quick Demo Logins Modal */}
      <LandingDemoModal open={showDemoModal} onOpenChange={setShowDemoModal} />
    </div>
  );
}
