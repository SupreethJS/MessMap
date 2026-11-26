"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  Mail,
  User,
  Hash,
  DoorClosed,
  ArrowRight,
  KeyRound,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Info,
  Building2,
} from "lucide-react";
import {
  sendRegistrationOtpAction,
  verifyOtpAndRegisterAction,
} from "@/app/actions/auth-actions";
import { MessMapLogo } from "@/components/shared/messmap-logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function RegisterPage() {
  const router = useRouter();

  // Step state: "details" | "otp"
  const [step, setStep] = useState<"details" | "otp">("details");

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [hostelBlock, setHostelBlock] = useState("Block A");
  const [roomNumber, setRoomNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // OTP state
  const [otp, setOtp] = useState("");
  const [resendCooldown, setResendCooldown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [demoOtpNotice, setDemoOtpNotice] = useState<string | null>(null);

  // Status states
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Resend countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (step === "otp" && resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, resendCooldown]);

  // Step 1: Validate details & send 6-digit OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessNotice(null);
    setDemoOtpNotice(null);

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const res = await sendRegistrationOtpAction({
      full_name: fullName.trim(),
      email: email.trim(),
      roll_number: rollNumber.trim().toUpperCase(),
      hostel_block: hostelBlock,
      room_number: roomNumber.trim(),
      password,
      confirm_password: confirmPassword,
    });

    setLoading(false);

    if (res.success) {
      setStep("otp");
      setResendCooldown(60);
      setCanResend(false);
      if (res.demoOtp) {
        setDemoOtpNotice(`Verification Code: ${res.demoOtp} (Email delivery unconfigured)`);
        setOtp(res.demoOtp);
      }
      setSuccessNotice(res.message || `Verification code sent to ${email.trim()}`);
    } else {
      setErrorMsg(res.error || "Failed to send verification code");
    }
  };

  // Step 2: Verify OTP & complete registration
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessNotice(null);

    const cleanOtp = otp.trim();
    if (cleanOtp.length !== 6 || !/^\d{6}$/.test(cleanOtp)) {
      setErrorMsg("Please enter the complete 6-digit numeric verification code.");
      return;
    }

    setLoading(true);

    const res = await verifyOtpAndRegisterAction(
      {
        full_name: fullName.trim(),
        email: email.trim(),
        roll_number: rollNumber.trim().toUpperCase(),
        hostel_block: hostelBlock,
        room_number: roomNumber.trim(),
        password,
        confirm_password: confirmPassword,
      },
      cleanOtp
    );

    setLoading(false);

    if (res.success) {
      router.push("/student/dashboard");
      router.refresh();
    } else {
      setErrorMsg(res.error || "Verification failed");
    }
  };

  // Resend OTP handler
  const handleResend = async () => {
    if (!canResend || resending) return;
    setResending(true);
    setErrorMsg(null);

    const res = await sendRegistrationOtpAction({
      full_name: fullName.trim(),
      email: email.trim(),
      roll_number: rollNumber.trim().toUpperCase(),
      hostel_block: hostelBlock,
      room_number: roomNumber.trim(),
      password,
      confirm_password: confirmPassword,
    });

    setResending(false);

    if (res.success) {
      setResendCooldown(60);
      setCanResend(false);
      if (res.demoOtp) {
        setDemoOtpNotice(`New Verification Code: ${res.demoOtp}`);
        setOtp(res.demoOtp);
      }
      setSuccessNotice(`A new 6-digit verification code has been dispatched.`);
    } else {
      setErrorMsg(res.error || "Failed to resend code");
    }
  };

  return (
    <div className="min-h-dvh overflow-x-clip flex flex-col justify-center items-center px-4 sm:px-6 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 selection:bg-amber-400 selection:text-slate-950 transition-colors relative">
      {/* Top Bar with Theme Toggle */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-lg space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="inline-block hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-2xl"
          >
            <MessMapLogo size="xl" />
          </Link>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Mess<span className="text-emerald-600 dark:text-emerald-400">Map</span> Student Registration
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            Campus Dining & Meal Booking Access
          </p>
          <div className="pt-1">
            <span className="inline-flex items-center gap-1.5 py-1 px-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-full text-[11px] font-bold text-slate-700 dark:text-slate-300 shadow-xs">
              <Building2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>University Hostel Student Portal</span>
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xl space-y-5 transition-colors">
          {step === "details" ? (
            /* STEP 1: STUDENT DETAILS FORM */
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">Student Details</h2>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 rounded-lg border border-slate-200 dark:border-slate-700">
                    Step 1 of 2
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Enter your hostel and academic details to receive your 6-digit email verification code.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label htmlFor="reg-fullname" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      id="reg-fullname"
                      type="text"
                      placeholder="Darshan Kulkarni"
                      className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-base sm:text-xs text-slate-900 dark:text-white placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="reg-email" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    College Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      id="reg-email"
                      type="email"
                      placeholder="darshan.kulkarni@msruas.ac.in"
                      className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-base sm:text-xs text-slate-900 dark:text-white placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label htmlFor="reg-roll" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Roll Number
                  </label>
                  <div className="relative">
                    <Hash className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      id="reg-roll"
                      type="text"
                      placeholder="2024CS099"
                      className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-base sm:text-xs text-slate-900 dark:text-white font-mono uppercase placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="reg-block" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Hostel Block
                  </label>
                  <select
                    id="reg-block"
                    value={hostelBlock}
                    onChange={(e) => setHostelBlock(e.target.value)}
                    className="w-full h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 text-base sm:text-xs font-medium text-slate-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-colors"
                  >
                    <option value="Block A">Block A</option>
                    <option value="Block B">Block B</option>
                    <option value="Block C">Block C</option>
                    <option value="Block D">Block D</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="reg-room" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Room No
                  </label>
                  <div className="relative">
                    <DoorClosed className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      id="reg-room"
                      type="text"
                      placeholder="204"
                      className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-base sm:text-xs text-slate-900 dark:text-white placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                      value={roomNumber}
                      onChange={(e) => setRoomNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div className="space-y-1.5">
                  <label htmlFor="reg-pass" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      id="reg-pass"
                      type="password"
                      placeholder="Min 6 characters"
                      className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-base sm:text-xs text-slate-900 dark:text-white placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="reg-confirm-pass" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      id="reg-confirm-pass"
                      type="password"
                      placeholder="Re-enter password"
                      className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-base sm:text-xs text-slate-900 dark:text-white placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {errorMsg && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="p-3 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-500/40 text-red-700 dark:text-red-300 rounded-xl text-xs font-medium"
                >
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full min-h-[44px] py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-600/30 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:opacity-50"
              >
                {loading ? "Sending Verification Code..." : "Continue & Send OTP Code"}
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-center text-xs text-slate-600 dark:text-slate-400 pt-1">
                Already registered?{" "}
                <Link href="/login" className="font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 hover:underline">
                  Sign in here
                </Link>
              </p>
            </form>
          ) : (
            /* STEP 2: 6-DIGIT OTP VERIFICATION */
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="text-center space-y-2">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 mb-1">
                  <KeyRound className="h-6 w-6 stroke-[2.5]" />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">Verify Your Email</h2>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 rounded-lg border border-slate-200 dark:border-slate-700">
                    Step 2 of 2
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
                  A 6-digit verification code has been dispatched to: <br />
                  <strong className="text-slate-900 dark:text-white font-extrabold">{email}</strong>
                </p>
              </div>

              {demoOtpNotice && (
                <div
                  role="status"
                  aria-live="polite"
                  className="p-3 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-500/50 text-indigo-800 dark:text-indigo-200 rounded-xl text-xs font-semibold flex items-center gap-2"
                >
                  <Info className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{demoOtpNotice}</span>
                </div>
              )}

              {successNotice && !demoOtpNotice && (
                <div
                  role="status"
                  aria-live="polite"
                  className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{successNotice}</span>
                </div>
              )}

              <div className="space-y-2 text-center">
                <label htmlFor="reg-otp" className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Enter 6-Digit Verification Code
                </label>
                <div className="flex justify-center">
                  <input
                    id="reg-otp"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    placeholder="••••••"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    className="w-56 h-14 text-center font-mono text-2xl tracking-[12px] font-black rounded-2xl border-2 border-indigo-500/70 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/30 shadow-inner"
                    autoFocus
                    required
                  />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Code expires in 10 minutes. Check your inbox or spam folder.
                </p>
              </div>

              {errorMsg && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="p-3 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-500/40 text-red-700 dark:text-red-300 rounded-xl text-xs font-medium text-center"
                >
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || otp.trim().length !== 6}
                className="w-full min-h-[44px] py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-600/30 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify & Complete Registration"}
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                <button
                  type="button"
                  onClick={() => {
                    setStep("details");
                    setErrorMsg(null);
                    setSuccessNotice(null);
                    setDemoOtpNotice(null);
                  }}
                  className="min-h-[44px] inline-flex items-center gap-1 font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Edit details</span>
                </button>

                <button
                  type="button"
                  onClick={handleResend}
                  disabled={!canResend || resending}
                  className="min-h-[44px] inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 disabled:opacity-40 disabled:no-underline cursor-pointer"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${resending ? "animate-spin" : ""}`} />
                  <span>
                    {canResend
                      ? "Resend Code"
                      : `Resend in ${resendCooldown}s`}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
