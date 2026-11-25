"use client";

import { useState } from "react";
import { LandingNavbar } from "@/components/landing/navbar";
import { LandingHero } from "@/components/landing/hero";
import { LandingLivePreview } from "@/components/landing/live-preview";
import { LandingFeaturesGrid } from "@/components/landing/features-grid";
import { LandingWorkflow } from "@/components/landing/workflow";
import { LandingPortalCards } from "@/components/landing/portal-cards";
import { LandingDemoModal } from "@/components/landing/demo-modal";
import { LandingFooter } from "@/components/landing/footer";

export default function LandingPage() {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-amber-400 selection:text-slate-950 antialiased font-sans transition-colors">
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-amber-400 focus:text-slate-950 focus:font-extrabold focus:text-xs focus:rounded-xl focus:shadow-xl focus:ring-2 focus:ring-slate-950 transition-all"
      >
        Skip to main content
      </a>

      {/* Decorative Subtle Background Glow Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-[128px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-[128px]" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full blur-[128px]" />
      </div>

      {/* Modular Navigation */}
      <LandingNavbar onOpenDemoModal={() => setShowDemoModal(true)} />

      {/* Main Semantic Landmark */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <LandingHero onOpenDemoModal={() => setShowDemoModal(true)} />
        <LandingLivePreview />
        <LandingFeaturesGrid />
        <LandingWorkflow />
        <LandingPortalCards />
      </main>

      {/* Modular Footer */}
      <LandingFooter />

      {/* Accessible Demo Modal */}
      <LandingDemoModal open={showDemoModal} onOpenChange={setShowDemoModal} />
    </div>
  );
}
