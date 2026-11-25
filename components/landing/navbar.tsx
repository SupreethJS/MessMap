"use client";

import { useState } from "react";
import Link from "next/link";
import { UtensilsCrossed, Zap, ArrowRight, Menu, X, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { MessMapLogo } from "@/components/shared/messmap-logo";

interface LandingNavbarProps {
  onOpenDemoModal: () => void;
}

export function LandingNavbar({ onOpenDemoModal }: LandingNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#menu", label: "Today's Menu" },
    { href: "#highlights", label: "Weekly Highlights" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#reviews", label: "Reviews" },
    { href: "#faq", label: "Mess Rules & FAQ" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-xl p-1"
        >
          <MessMapLogo size="md" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Mess<span className="text-emerald-600 dark:text-emerald-400">Map</span>
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                Smart Mess
              </span>
            </div>
            <span className="text-[11px] block text-slate-500 dark:text-slate-400 font-semibold tracking-wide">
              Campus Dining Platform
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Website Navigation"
          className="hidden lg:flex items-center gap-7 text-xs font-bold text-slate-600 dark:text-slate-300"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action CTAs + Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <button
            type="button"
            onClick={onOpenDemoModal}
            className="hidden sm:inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Demo Logins</span>
          </button>

          <Link
            href="/login"
            className="hidden sm:inline-flex items-center justify-center min-h-[44px] px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Sign In
          </Link>

          <Link
            href="/login"
            className="min-h-[44px] px-4 sm:px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold shadow-md shadow-amber-500/25 hover:shadow-amber-500/40 transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Navigation Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemoModal();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Quick Demo Accounts</span>
            </button>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500 text-slate-950 text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Access Student / Admin Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
