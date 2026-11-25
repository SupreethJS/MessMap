"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Users,
  Scale,
  Star,
  AlertCircle,
  BarChart3,
  Sparkles,
  ShoppingBag,
  ChefHat,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/app/actions/auth-actions";
import { MessMapLogo } from "@/components/shared/messmap-logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";

interface AdminSidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/menus", label: "Menu Management", icon: UtensilsCrossed },
  { href: "/admin/attendance", label: "Attendance Headcount", icon: Users },
  { href: "/admin/food-records", label: "Wastage & Food Records", icon: Scale },
  { href: "/admin/ratings", label: "Ratings & Feedback", icon: Star },
  { href: "/admin/complaints", label: "Complaints & Rebates", icon: AlertCircle },
  { href: "/admin/reports", label: "Reports & Analytics", icon: BarChart3 },
  { href: "/admin/ai-insights", label: "AI Insights & Demand", icon: Sparkles },
  { href: "/admin/groceries", label: "Grocery Stock", icon: ShoppingBag },
  { href: "/admin/recipes", label: "Recipe Matching", icon: ChefHat },
  { href: "/admin/settings", label: "Mess Settings", icon: Settings },
];

export function AdminSidebar({ isOpenMobile = false, onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();

  // Escape key handler for mobile drawer
  useEffect(() => {
    if (!isOpenMobile || !onCloseMobile) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseMobile();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpenMobile, onCloseMobile]);

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between p-4 bg-slate-900 dark:bg-slate-950 text-slate-300 border-r border-slate-800">
      {/* Brand Header */}
      <div>
        <div className="p-2 pb-4 flex items-center justify-between">
          <Link
            href="/admin/dashboard"
            onClick={onCloseMobile}
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg p-1"
          >
            <MessMapLogo size="md" className="group-hover:scale-105 transition-transform shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl text-white tracking-tight">
                  Mess<span className="text-emerald-400">Map</span>
                </span>
                <span className="text-[10px] font-bold uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30 px-1.5 py-0.5 rounded">
                  ADMIN
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                Campus Dining Console
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

        {/* Semantic Navigation Menu */}
        <nav aria-label="Admin Navigation" className="px-1 py-1 space-y-1.5 overflow-y-auto max-h-[calc(100vh-270px)]">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold min-h-[44px] transition-all duration-150 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
                  isActive
                    ? "bg-amber-400 text-slate-950 font-bold shadow-xs"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/70"
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4 transition-colors shrink-0",
                    isActive
                      ? "text-slate-950 stroke-[2.5]"
                      : "text-slate-400 group-hover:text-amber-400"
                  )}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Area: Theme Toggle & Sign out */}
      <div className="p-1 pt-2 space-y-2">
        <div className="flex items-center justify-between px-2 py-1 bg-slate-800/50 rounded-xl border border-slate-800">
          <span className="text-xs font-semibold text-slate-300">Theme</span>
          <ThemeToggle showLabel />
        </div>

        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full min-h-[44px] flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-rose-400 hover:bg-slate-800/80 rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Admin</span>
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside
        aria-label="Admin Navigation Sidebar"
        className="hidden lg:flex flex-col w-64 h-screen shrink-0 sticky top-0 select-none z-40"
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
