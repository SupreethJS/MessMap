"use client";

import Link from "next/link";
import { UtensilsCrossed, Phone, Mail, MapPin, ShieldCheck, Heart } from "lucide-react";
import { MessMapLogo } from "@/components/shared/messmap-logo";

export function LandingFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 pt-16 pb-12 text-xs text-slate-500 dark:text-slate-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-left">
          {/* Col 1 & 2: Brand Story */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <MessMapLogo size="sm" />
              <div>
                <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  Mess<span className="text-emerald-600 dark:text-emerald-400">Map</span>
                </span>
                <span className="block text-[11px] font-semibold text-slate-400">
                  Smart Mess Management System
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              Next-generation campus dining platform bridging resident food lovers and hostel catering contractors. Engineered for zero waste, strict dietary transparency, and instant wallet rebates.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>FSSAI Certified Operations • Central Mess Hall 1</span>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Explore Campus Dining
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Today&apos;s Live Menu
                </a>
              </li>
              <li>
                <a href="#highlights" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Weekly Signature Feasts
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Student Testimonials
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Mess Rules &amp; FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Resident & Admin Portals */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Portal Access
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/login" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Student Dining Portal
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Kitchen Admin &amp; Scanner
                </Link>
              </li>
              <li>
                <Link href="/student/my-meals" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Digital Meal Pass (QR)
                </Link>
              </li>
              <li>
                <Link href="/student/my-meals" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Mess Leave &amp; Rebate
                </Link>
              </li>
              <li>
                <Link href="/student/complaints" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Grievance &amp; Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Operational Hours & Contact */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Central Mess Hall 1
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>Central Mess Hall 1, Campus Hostel Complex</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>+91 80 4567 8900 (Warden)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>mess.council@campus.edu</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-500">
              <p className="font-semibold text-slate-800 dark:text-slate-300">Dining Timings</p>
              <p>Breakfast: 07:30 – 09:30 AM</p>
              <p>Lunch: 12:30 – 02:30 PM</p>
              <p>Dinner: 07:30 – 09:45 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p className="text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} MessMap Smart Mess Management. All rights reserved.
          </p>

          <p className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
            Engineered with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> by{" "}
            <span className="font-bold text-slate-900 dark:text-slate-100">
              Supreeth J Sudheer
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
