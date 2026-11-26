"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  UtensilsCrossed,
  Star,
  AlertCircle,
  CreditCard,
  Bell,
  User,
  Settings,
  Headphones,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MessMapLogo } from "@/components/shared/messmap-logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export interface MessMapSidebarProps {
  unreadNotifsCount?: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

const navItems = [
  { href: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/student/menu", label: "Weekly Menu", icon: Calendar },
  { href: "/student/my-meals", label: "My Meals", icon: UtensilsCrossed },
  { href: "/student/feedback", label: "Feedback", icon: Star },
  { href: "/student/complaints", label: "Complaints", icon: AlertCircle },
  { href: "/student/payments", label: "Payments", icon: CreditCard },
  { href: "/student/notifications", label: "Notifications", icon: Bell, badge: true },
  { href: "/student/profile", label: "Profile", icon: User },
  { href: "/student/settings", label: "Settings", icon: Settings },
];

export function MessMapSidebar({
  unreadNotifsCount = 0,
  isOpenMobile = false,
  onCloseMobile,
}: MessMapSidebarProps) {
  const pathname = usePathname();

  // Escape key handler + body scroll lock for mobile drawer
  useEffect(() => {
    if (!isOpenMobile) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onCloseMobile) {
        onCloseMobile();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpenMobile, onCloseMobile]);

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between p-4 bg-slate-900 dark:bg-slate-950 text-slate-300 border-r border-slate-800 min-h-0">
      {/* Top Brand Header + Scrollable Nav */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="p-2 pb-4 flex items-center justify-between">
          <Link
            href="/student/dashboard"
            onClick={onCloseMobile}
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg p-1"
          >
            <MessMapLogo size="md" className="group-hover:scale-105 transition-transform shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl text-white tracking-tight">
                  Mess<span className="text-emerald-400">Map</span>
                </span>
                <span className="text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                  STUDENT
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                Campus Dining OS
              </p>
            </div>
          </Link>

          {/* Close button for mobile drawer */}
          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              aria-label="Close navigation drawer"
              className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Dynamic Semantic Navigation Menu */}
        <nav aria-label="Student Navigation" className="px-1 py-1 space-y-1.5 overflow-y-auto flex-1 min-h-0">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href === "/student/my-meals" && pathname === "/student/meal-plans") ||
              (item.href === "/student/feedback" && pathname === "/student/ratings");

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={cn(
                  "flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold min-h-[44px] transition-all duration-150 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
                  isActive
                    ? "bg-amber-400 text-slate-950 font-bold shadow-xs"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/70"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "w-4 h-4 transition-colors shrink-0",
                      isActive
                        ? "text-slate-950 stroke-[2.5]"
                        : "text-slate-400 group-hover:text-amber-400"
                    )}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && unreadNotifsCount > 0 && (
                  <span
                    className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full",
                      isActive ? "bg-slate-950 text-amber-400" : "bg-amber-400 text-slate-950"
                    )}
                  >
                    {unreadNotifsCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Area: Theme Toggle & Support Card */}
      <div className="p-1 pt-2 space-y-2">
        <div className="flex items-center justify-between px-2 py-1 bg-slate-800/50 rounded-xl border border-slate-800">
          <span className="text-xs font-semibold text-slate-300">Theme</span>
          <ThemeToggle showLabel />
        </div>

        <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3.5 space-y-2 text-slate-300">
          <div className="flex items-center gap-2 text-amber-400">
            <Headphones className="w-4 h-4" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Need Assistance?
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            Contact your warden or hostel catering representative anytime.
          </p>
          <div className="pt-1.5 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400">
            <span className="font-semibold text-white">Central Mess Hall 1</span>
            <span className="text-amber-400 font-mono font-bold">Ext. 204</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside
        aria-label="Student Navigation Sidebar"
        className="hidden lg:flex flex-col w-64 h-dvh shrink-0 sticky top-0 select-none z-40"
      >
        {sidebarContent}
      </aside>

      {/* Mobile Accessible Slide-over Drawer */}
      {isOpenMobile && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-50 lg:hidden flex"
        >
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
