"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, LogOut, User, Settings, Plus, Menu } from "lucide-react";
import { NotificationBell } from "@/components/shared/notification-bell";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { logoutAction } from "@/app/actions/auth-actions";
import { Notification, Profile } from "@/lib/types/database";
import { MessMapLogo } from "@/components/shared/messmap-logo";

export interface MessMapHeaderProps {
  user: Profile | null;
  notifications?: Notification[];
  onToggleMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
}

export function MessMapHeader({
  user,
  notifications = [],
  onToggleMobileMenu,
  isMobileMenuOpen = false,
}: MessMapHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const searchResults = [
    { title: "Weekly Menu", href: "/student/menu", desc: "View all 7 days of meals" },
    { title: "Meal Opt-in & Attendance", href: "/student/my-meals", desc: "Declare Yes/No for upcoming meals" },
    { title: "Raise a Complaint", href: "/student/complaints", desc: "Submit food quality or hygiene issues" },
    { title: "Wallet Recharge", href: "/student/payments", desc: "Top up your dining balance" },
    { title: "Submit Meal Feedback", href: "/student/feedback", desc: "Rate today's served food 1-5 stars" },
  ].filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 gap-3 transition-colors">
      {/* Mobile Hamburger & Logo */}
      <div className="lg:hidden flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link
          href="/student/dashboard"
          className="flex items-center gap-2 group min-h-[44px] py-1 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg"
        >
          <MessMapLogo size="xs" />
          <span className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
            MessMap
          </span>
        </Link>
      </div>

      {/* Global Search Input with ⌘ K Shortcut */}
      <div className="w-full max-w-md hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search anything (meals, complaints, wallet)..."
            value={searchQuery}
            aria-label="Search meals, complaints, and wallet"
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => setSearchOpen(true)}
            className="w-full h-10 pl-10 pr-12 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
          />
          <kbd className="absolute right-3 top-2.5 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md shadow-2xs pointer-events-none">
            ⌘ K
          </kbd>

          {/* Quick Search Autocomplete Dropdown */}
          {searchOpen && searchQuery.trim().length > 0 && (
            <div
              className="absolute left-0 right-0 top-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 space-y-1 animate-in fade-in-0 duration-150"
              onMouseLeave={() => setSearchOpen(false)}
            >
              {searchResults.length === 0 ? (
                <div className="p-3 text-center text-xs text-slate-400">
                  No matching pages or dishes found.
                </div>
              ) : (
                searchResults.map((res, i) => (
                  <Link
                    key={i}
                    href={res.href}
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="flex flex-col p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{res.title}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">{res.desc}</span>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Side: Quick Action CTA + Theme Toggle + Notification Bell + Profile Pill */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Contextual Quick-Action CTA */}
        <Link
          href="/student/feedback"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Rate Meal</span>
        </Link>

        {/* Theme Toggle Component */}
        <ThemeToggle />

        {/* Notification Bell Component */}
        <NotificationBell notifications={notifications} />

        {/* Profile Pill & Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            aria-haspopup="menu"
            aria-expanded={profileDropdownOpen}
            aria-label="User profile options"
            className="flex items-center gap-2 min-h-[44px] bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 p-1.5 pr-2.5 sm:pr-3 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
          >
            <div className="h-8 w-8 rounded-lg overflow-hidden bg-amber-100 dark:bg-amber-900/60 border border-amber-300 dark:border-amber-700 flex items-center justify-center font-bold text-xs text-slate-900 dark:text-amber-200 shrink-0">
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={`Profile picture of ${user.full_name}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>
                  {user?.full_name
                    ? user.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
                    : "DK"}
                </span>
              )}
            </div>

            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">
                {user?.full_name || "Darshan Kulkarni"}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  ROLE:
                </span>
                <span className="text-[10px] font-bold text-slate-950 bg-amber-400 px-1.5 py-0.2 rounded-md">
                  Student
                </span>
              </div>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1 hidden sm:block" />
          </button>

          {/* Profile Dropdown Menu */}
          {profileDropdownOpen && (
            <div
              role="menu"
              className="absolute right-0 top-12 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 space-y-1 animate-in fade-in-0 duration-150"
              onMouseLeave={() => setProfileDropdownOpen(false)}
            >
              <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{user?.full_name || "Darshan Kulkarni"}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user?.email || "darshan.kulkarni@msruas.ac.in"}</p>
                <p className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold mt-1">
                  Roll: {user?.roll_number || "2024CS001"}
                </p>
              </div>

              <Link
                href="/student/profile"
                role="menuitem"
                onClick={() => setProfileDropdownOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>My Profile</span>
              </Link>

              <Link
                href="/student/settings"
                role="menuitem"
                onClick={() => setProfileDropdownOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                <Settings className="w-3.5 h-3.5 text-slate-400" />
                <span>Account Settings</span>
              </Link>

              <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                <form action={logoutAction}>
                  <button
                    type="submit"
                    role="menuitem"
                    className="w-full min-h-[44px] flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
