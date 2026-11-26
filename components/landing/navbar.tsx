"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, ArrowRight, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { MessMapLogo } from "@/components/shared/messmap-logo";

interface LandingNavbarProps {
  onOpenDemoModal: () => void;
}

export function LandingNavbar({ onOpenDemoModal }: LandingNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#menu", label: "Today's Menu" },
    { href: "#highlights", label: "Weekly Schedule" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#reviews", label: "Reviews" },
    { href: "#faq", label: "FAQ" },
  ];

  // Lock body scroll and close on Escape when mobile drawer is open
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 min-w-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-xl p-1"
          >
            <MessMapLogo size="md" className="shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white truncate">
                  Mess<span className="text-emerald-600 dark:text-emerald-400">Map</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 uppercase tracking-wider shrink-0">
                  Smart Mess
                </span>
              </div>
              <span className="text-[11px] hidden sm:block text-slate-500 dark:text-slate-400 font-semibold tracking-wide truncate">
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
                className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-2 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs + Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <ThemeToggle />

            <button
              type="button"
              onClick={onOpenDemoModal}
              className="hidden md:inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Demo Logins</span>
            </button>

            <Link
              href="/login"
              className="hidden md:inline-flex items-center justify-center min-h-[44px] px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Log In
            </Link>

            <Link
              href="/login"
              className="hidden md:inline-flex min-h-[44px] px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold shadow-md shadow-amber-500/25 hover:shadow-amber-500/40 transition-all items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Navigation Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Height Mobile Slide-Over Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
          className="fixed inset-0 z-50 md:hidden flex justify-end"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-over Panel */}
          <div className="relative w-80 max-w-[85vw] h-dvh bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between p-5 animate-in slide-in-from-right duration-200">
            <div className="space-y-6 overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <MessMapLogo size="sm" />
                  <span className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                    Mess<span className="text-emerald-600 dark:text-emerald-400">Map</span>
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1.5">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-[44px] px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemoModal();
                }}
                className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Quick Demo Accounts</span>
              </button>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[44px] py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-xs font-bold flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-900"
              >
                Log In
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
