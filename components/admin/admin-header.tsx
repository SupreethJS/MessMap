"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { QubiteLogo } from "@/components/shared/qubite-logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Profile } from "@/lib/types/database";

interface AdminHeaderProps {
  user: Profile;
  onToggleMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
}

export function AdminHeader({ user, onToggleMobileMenu, isMobileMenuOpen = false }: AdminHeaderProps) {
  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 transition-colors">
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={onToggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg p-1"
          >
            <QubiteLogo size="xs" />
          </Link>
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-950 bg-amber-400 px-2 py-0.5 rounded-md">
            Admin Console
          </span>
          <span className="text-xs text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 hidden md:inline truncate max-w-[260px]">
            Central Kitchen Operations
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Top Header Theme Toggle */}
        <ThemeToggle />

        {/* User Pill */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200 dark:border-slate-800">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{user.full_name}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{user.email}</p>
          </div>
          <div
            aria-label="Admin User Icon"
            className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-slate-800 text-amber-400 border border-slate-700 flex items-center justify-center font-black text-xs shadow-xs"
          >
            AD
          </div>
        </div>
      </div>
    </header>
  );
}
