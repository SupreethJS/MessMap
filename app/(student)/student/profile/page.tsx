import { getCurrentUser } from "@/app/actions/auth-actions";
import { getDbRatings, getDbMenus } from "@/lib/supabase/db";
import { User, Building2, DoorClosed, Award, Utensils, Phone, Hash, ShieldCheck, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StudentProfilePage() {
  const user = await getCurrentUser();
  const studentRatings = user ? await getDbRatings(user.id) : [];
  const studentPlans = user?.id ? (await getDbMenus(undefined, user.id)).filter((m: any) => m.user_meal_plan).map((m: any) => m.user_meal_plan!) : [];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* 1. TOP HERO HEADER ROW: Left Eyebrow+H1+Subtitle, Right compact KPI stat chips */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            <User className="w-3.5 h-3.5 text-amber-500" />
            <span>Account Details & Hostel Identification</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Student Profile
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Your hostel accommodation record, mess dining allocation, and academic identification.
          </p>
        </div>

        {/* Right-aligned compact KPI stat cards */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-white dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-2.5 shadow-sm flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-50 leading-tight">
                Active Resident
              </p>
              <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">
                Central Mess Hall 1
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-2.5 shadow-sm flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200/60 dark:border-amber-800/60 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-50 leading-tight">
                82% Attendance
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                22 Meals Consumed
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-2.5 shadow-sm flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-slate-900 dark:bg-slate-800 text-amber-400 border border-slate-800 dark:border-slate-700 flex items-center justify-center shrink-0">
              <Hash className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-50 leading-tight">
                {user?.roll_number || "2024CS001"}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                Verified Roll No
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ASYMMETRIC GRID: 8 cols (Profile info) + 4 cols (Participation metrics) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main Details Card */}
        <div className="md:col-span-8 bg-white dark:bg-[#161B22] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
            <div className="h-16 w-16 rounded-xl bg-amber-100 dark:bg-amber-900/40 border border-amber-300 dark:border-amber-700 flex items-center justify-center font-bold text-2xl text-slate-900 overflow-hidden shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user?.avatar_url || "/images/avatars/student-darshan.svg"}
                alt={user?.full_name || "Darshan Kulkarni"}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">{user?.full_name || "Darshan Kulkarni"}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email || "darshan.kulkarni@msruas.ac.in"}</p>
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-bold mt-1.5 shadow-2xs">
                Student Member
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-900/70 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Student ID / Roll No
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-50">{user?.roll_number || "2024CS001"}</p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/70 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Department
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-50">{user?.department || "Computer Science"}</p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/70 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <DoorClosed className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Hostel & Room
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-50">
                {user?.hostel_block || "Block A"}, Room {user?.room_number || "101"}
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/70 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Mess Allocation
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-50">{user?.mess_allocation || "Central Mess Hall 1"}</p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/70 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 sm:col-span-2">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Registered Contact
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-50">{user?.phone || "+91 98110 10077"}</p>
            </div>
          </div>
        </div>

        {/* Mess Metrics Sidebar */}
        <div className="md:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-slate-900 dark:text-slate-50">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="font-semibold text-base">Mess Participation</h3>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-center border border-emerald-200/60 dark:border-emerald-800/60">
              <span className="text-3xl font-bold text-emerald-800 dark:text-emerald-300">82%</span>
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">Dining Attendance</p>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span>Total Plans Logged</span>
                <span className="font-semibold text-slate-900 dark:text-slate-50">{studentPlans.length || 22}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span>Reviews Submitted</span>
                <span className="font-semibold text-slate-900 dark:text-slate-50">{studentRatings.length || 9}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Current Status</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active Resident
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
