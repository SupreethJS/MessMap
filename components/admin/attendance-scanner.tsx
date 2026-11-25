"use client";

import { useState, useEffect, useRef } from "react";
import {
  QrCode,
  Camera,
  CameraOff,
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  Users,
  Search,
  Sparkles,
  Clock,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";
import { checkInStudentAction } from "@/app/actions/attendance-actions";
import { Menu, MealCheckIn, MealType } from "@/lib/types/database";
import { toast } from "sonner";

interface AttendanceScannerProps {
  menus: Menu[];
  initialCheckIns?: MealCheckIn[];
}

export function AttendanceScanner({
  menus,
  initialCheckIns = [],
}: AttendanceScannerProps) {
  const [selectedMenuId, setSelectedMenuId] = useState<string>(
    menus[0]?.id || ""
  );
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [manualRoll, setManualRoll] = useState<string>("");
  const [manualName, setManualName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [checkIns, setCheckIns] = useState<MealCheckIn[]>(initialCheckIns);
  const [scanStatus, setScanStatus] = useState<{
    type: "idle" | "success" | "duplicate" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const isProcessingRef = useRef<boolean>(false);

  const activeMenu = menus.find((m) => m.id === selectedMenuId) || menus[0];
  const optedInCount = activeMenu?.expected_attendance || 0;
  const currentMenuCheckIns = checkIns.filter(
    (c) => c.menu_id === selectedMenuId
  );
  const checkedInCount = currentMenuCheckIns.length;
  const attendancePct =
    optedInCount > 0
      ? Math.min(100, Math.round((checkedInCount / optedInCount) * 100))
      : 0;

  // Cleanup scanner on unmount
  useEffect(() => {
    return () => {
      if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
        html5QrCodeRef.current
          .stop()
          .catch((err) => console.warn("Failed to stop scanner on unmount:", err));
      }
    };
  }, []);

  const handleStartScan = async () => {
    try {
      setScanStatus({ type: "idle", message: "" });
      const scanner = new Html5Qrcode("admin-qr-reader");
      html5QrCodeRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        async (decodedText) => {
          if (isProcessingRef.current) return;
          isProcessingRef.current = true;
          await processScanPayload(decodedText);
          setTimeout(() => {
            isProcessingRef.current = false;
          }, 1500); // 1.5s debounce before next scan
        },
        () => {
          // Frame parse error ignored
        }
      );
      setIsScanning(true);
    } catch (err: any) {
      console.error("Camera start error:", err);
      toast.error(
        "Could not access camera. Please allow camera permissions or use manual roll number entry."
      );
      setIsScanning(false);
    }
  };

  const handleStopScan = async () => {
    if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
      try {
        await html5QrCodeRef.current.stop();
        html5QrCodeRef.current.clear();
      } catch (err) {
        console.warn("Camera stop error:", err);
      }
    }
    setIsScanning(false);
  };

  const processScanPayload = async (rawPayload: string) => {
    try {
      let studentId = "";
      let rollNumber = "";
      let studentName = "";
      let mealType: MealType = activeMenu?.meal_type || "lunch";
      let menuDate = activeMenu?.menu_date || new Date().toISOString().split("T")[0];

      try {
        const parsed = JSON.parse(rawPayload);
        studentId = parsed.student_id || "";
        rollNumber = parsed.student_roll_number || "";
        studentName = parsed.student_name || "";
        if (parsed.meal_type) mealType = parsed.meal_type;
        if (parsed.menu_date) menuDate = parsed.menu_date;
      } catch {
        // Raw string formatted as roll number or ID
        studentId = rawPayload.trim();
        rollNumber = rawPayload.trim();
      }

      if (!studentId && !rollNumber) {
        setScanStatus({
          type: "error",
          message: "Unrecognized QR code format.",
        });
        toast.error("Unrecognized QR code format.");
        return;
      }

      const res = await checkInStudentAction({
        menuId: selectedMenuId,
        studentId: studentId || `std-${rollNumber}`,
        rollNumber: rollNumber || studentId,
        studentName: studentName || `Student (${rollNumber || studentId})`,
        method: "qr_scan",
        mealType,
        menuDate,
      });

      if (res.success && res.checkIn) {
        setScanStatus({
          type: "success",
          message: `Checked in ${res.checkIn.student_name || rollNumber || "Student"} successfully!`,
        });
        toast.success(`Verified: ${res.checkIn.student_name || rollNumber} marked present.`);
        setCheckIns((prev) => [res.checkIn!, ...prev]);
      } else {
        const isDuplicate = res.error?.includes("Duplicate check-in blocked");
        setScanStatus({
          type: isDuplicate ? "duplicate" : "error",
          message: res.error || "Failed to record check-in.",
        });
        if (isDuplicate) {
          toast.warning(res.error);
        } else {
          toast.error(res.error || "Scan failed.");
        }
      }
    } catch (err: any) {
      setScanStatus({
        type: "error",
        message: err.message || "Failed to verify pass.",
      });
      toast.error(err.message || "Verification failed.");
    }
  };

  const handleManualCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualRoll.trim()) {
      toast.error("Please enter a student roll number.");
      return;
    }

    setLoading(true);
    setScanStatus({ type: "idle", message: "" });

    const roll = manualRoll.trim().toUpperCase();
    const res = await checkInStudentAction({
      menuId: selectedMenuId,
      studentId: `std-${roll}`,
      rollNumber: roll,
      studentName: manualName.trim() || `Resident ${roll}`,
      method: "manual_roll",
      mealType: activeMenu?.meal_type,
      menuDate: activeMenu?.menu_date,
    });
    setLoading(false);

    if (res.success && res.checkIn) {
      setScanStatus({
        type: "success",
        message: `Roll Number ${roll} checked in manually!`,
      });
      toast.success(`Check-in recorded for roll ${roll}`);
      setCheckIns((prev) => [res.checkIn!, ...prev]);
      setManualRoll("");
      setManualName("");
    } else {
      const isDuplicate = res.error?.includes("Duplicate check-in blocked");
      setScanStatus({
        type: isDuplicate ? "duplicate" : "error",
        message: res.error || "Check-in failed.",
      });
      if (isDuplicate) {
        toast.warning(res.error);
      } else {
        toast.error(res.error || "Check-in failed.");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. TOP MEAL SELECTOR & STATS BAR */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <label
            htmlFor="active-menu-select"
            className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block"
          >
            Active Meal Slot Under Verification
          </label>
          <select
            id="active-menu-select"
            value={selectedMenuId}
            onChange={(e) => {
              setSelectedMenuId(e.target.value);
              setScanStatus({ type: "idle", message: "" });
            }}
            className="h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {menus.map((m) => (
              <option key={m.id} value={m.id}>
                {m.menu_date} • {m.meal_type.toUpperCase()} ({m.items?.map((i) => i.name).slice(0, 2).join(", ")})
              </option>
            ))}
          </select>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 text-center min-w-[110px]">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Opted-In
            </span>
            <span className="text-xl font-extrabold text-slate-800 dark:text-slate-100">
              {optedInCount}
            </span>
          </div>

          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-center min-w-[110px]">
            <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 block tracking-wider">
              Checked-In
            </span>
            <span className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400">
              {checkedInCount}
            </span>
          </div>

          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-center min-w-[90px]">
            <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 block tracking-wider">
              Turnout
            </span>
            <span className="text-xl font-extrabold text-amber-700 dark:text-amber-400">
              {attendancePct}%
            </span>
          </div>
        </div>
      </div>

      {/* 2. SCAN STATUS ALERT BANNER */}
      {scanStatus.type !== "idle" && (
        <div
          className={`p-4 rounded-2xl border text-xs font-semibold flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-1 ${
            scanStatus.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
              : scanStatus.type === "duplicate"
              ? "bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-300"
              : "bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-300"
          }`}
        >
          <div className="flex items-center gap-2">
            {scanStatus.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
            {scanStatus.type === "duplicate" && <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />}
            {scanStatus.type === "error" && <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />}
            <span>{scanStatus.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setScanStatus({ type: "idle", message: "" })}
            className="text-[10px] uppercase underline tracking-wider opacity-80 hover:opacity-100"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 3. MAIN WORKSPACE: Camera Scanner (Left) + Manual Fallback & Activity (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Camera Scanner Feed */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <QrCode className="w-5 h-5 text-amber-500" />
              <h2 className="text-base font-bold">Contactless Meal Pass Camera Scanner</h2>
            </div>
            {isScanning ? (
              <button
                type="button"
                onClick={handleStopScan}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-semibold hover:bg-rose-100 transition-colors"
              >
                <CameraOff className="w-3.5 h-3.5" />
                Stop Scanner
              </button>
            ) : (
              <button
                type="button"
                onClick={handleStartScan}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold shadow-sm hover:bg-amber-600 transition-colors"
              >
                <Camera className="w-3.5 h-3.5" />
                Activate Camera
              </button>
            )}
          </div>

          <div className="relative rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-950 overflow-hidden min-h-[300px] flex items-center justify-center">
            <div id="admin-qr-reader" className="w-full max-w-[400px]" />
            {!isScanning && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-slate-400 bg-slate-900/90 gap-3">
                <div className="h-14 w-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
                  <Camera className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-200">
                    Camera is currently standby
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Click &quot;Activate Camera&quot; to begin scanning student meal passes.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleStartScan}
                  className="mt-2 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-600 transition-all shadow-sm"
                >
                  Activate Scanner Now
                </button>
              </div>
            )}
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            Duplicate scan protection automatically flags repeat attempts for the same meal slot.
          </p>
        </div>

        {/* Right: Manual Roll Number Entry & Check-In Log */}
        <div className="lg:col-span-5 space-y-6">
          {/* Manual Entry Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <Search className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold">Manual Roll Number Check-In</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Use fallback entry if a student&apos;s phone has low battery or unreadable screen.
            </p>

            <form onSubmit={handleManualCheckIn} className="space-y-3">
              <div>
                <label
                  htmlFor="manual-roll-input"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1"
                >
                  Student Roll Number
                </label>
                <input
                  id="manual-roll-input"
                  type="text"
                  placeholder="e.g. CS21B001"
                  value={manualRoll}
                  onChange={(e) => setManualRoll(e.target.value)}
                  className="w-full h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 text-xs font-bold text-slate-900 dark:text-slate-100 uppercase focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="manual-name-input"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1"
                >
                  Student Name (Optional)
                </label>
                <input
                  id="manual-name-input"
                  type="text"
                  placeholder="e.g. Aarav Sharma"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  className="w-full h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !manualRoll.trim()}
                className="w-full h-10 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 text-xs font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                <UserCheck className="w-4 h-4" />
                {loading ? "Checking In..." : "Mark Attendance"}
              </button>
            </form>
          </div>

          {/* Recent Check-Ins Live Feed */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                <Clock className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold">Recent Scans ({currentMenuCheckIns.length})</h3>
              </div>
              <span className="text-[11px] text-slate-400">Live feed</span>
            </div>

            <div className="max-h-[260px] overflow-y-auto space-y-2 pr-1">
              {currentMenuCheckIns.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center italic">
                  No check-ins recorded for this meal yet.
                </p>
              ) : (
                currentMenuCheckIns.slice(0, 15).map((chk) => (
                  <div
                    key={chk.id}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-slate-900 dark:text-slate-100">
                        {chk.student_name || chk.student_roll_number || "Student"}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        {chk.student_roll_number || chk.student_id} • {chk.method === "qr_scan" ? "QR Scan" : "Manual Entry"}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      {new Date(chk.scanned_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
