"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { Profile } from "@/lib/types/database";

interface AdminShellProps {
  user: Profile;
  children: React.ReactNode;
}

export function AdminShell({ user, children }: AdminShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-dvh overflow-x-clip flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased transition-colors">
      {/* Desktop Fixed & Mobile Drawer Sidebar */}
      <AdminSidebar
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <AdminHeader
          user={user}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          isMobileMenuOpen={mobileMenuOpen}
        />

        {/* Semantic Accessible Main Content */}
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6 sm:space-y-8 focus:outline-none min-w-0"
        >
          {children}
        </main>

        {/* Semantic Accessible Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 py-4 px-4 sm:px-6 text-center text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} MessMap • Central Operations & Kitchen Management Console</p>
        </footer>
      </div>
    </div>
  );
}
