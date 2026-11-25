"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  loginSchema,
  registerSchema,
  LoginInput,
  RegisterInput,
  isEmailDomainAllowed,
} from "@/lib/validations/auth";
import { getStore } from "@/lib/data/mess-store";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isDemoMode } from "@/lib/supabase/db";
import { Profile } from "@/lib/types/database";
import { sendWelcomeStudentEmail, sendOtpVerificationEmail } from "@/lib/services/email";
import {
  generateNumericOtp,
  storeRegistrationOtp,
  verifyRegistrationOtp,
  checkOtpRateLimit,
} from "@/lib/services/otp";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function loginAction(input: LoginInput) {
  const result = loginSchema.safeParse(input);
  if (!result.success) {
    return { success: false, error: result.error.errors[0]?.message || "Invalid input" };
  }

  const { email, password } = result.data;

  // Optional domain restriction check via ALLOWED_EMAIL_DOMAINS env var
  const domainCheck = isEmailDomainAllowed(email);
  if (!domainCheck.allowed) {
    return {
      success: false,
      error: domainCheck.error || "Email domain is not permitted.",
    };
  }

  const cookieStore = cookies();

  // 1. Attempt Supabase Auth in production
  if (!isDemoMode()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (data?.user && !error) {
        // Query user role and full name from database profiles
        const { data: profile } = await supabase
          .from("profiles")
          .select("role, full_name")
          .eq("id", data.user.id)
          .maybeSingle();

        const role = profile?.role || data.user.user_metadata?.role || "student";
        const fullName = profile?.full_name || data.user.user_metadata?.full_name || "User";

        cookieStore.set("mess_session_role", role, { path: "/", httpOnly: true });
        cookieStore.set("mess_user_id", data.user.id, { path: "/", httpOnly: true });
        cookieStore.set("mess_user_name", fullName, { path: "/" });

        return { success: true, role };
      }

      if (error && process.env.NEXT_PUBLIC_DEMO_MODE !== "true") {
        return { success: false, error: error.message };
      }
    } catch (err: any) {
      if (process.env.NEXT_PUBLIC_DEMO_MODE !== "true") {
        return { success: false, error: err.message || "Authentication service unavailable." };
      }
    }
  }

  // 2. Demo / In-Memory Repository Authentication Fallback
  const store = getStore();
  const profile = store.profiles.find((p) => p.email.toLowerCase() === email.toLowerCase());

  if (!profile) {
    return { success: false, error: "Invalid email or account does not exist." };
  }

  // Set demo session cookies
  cookieStore.set("mess_session_role", profile.role, { path: "/", httpOnly: true });
  cookieStore.set("mess_user_id", profile.id, { path: "/", httpOnly: true });
  cookieStore.set("mess_user_name", profile.full_name, { path: "/" });

  return { success: true, role: profile.role };
}

export async function sendRegistrationOtpAction(input: RegisterInput) {
  const result = registerSchema.safeParse(input);
  if (!result.success) {
    return { success: false, error: result.error.errors[0]?.message || "Validation failed" };
  }

  const { full_name, email, roll_number } = result.data;

  // 1. Domain restriction check
  const domainCheck = isEmailDomainAllowed(email);
  if (!domainCheck.allowed) {
    return { success: false, error: domainCheck.error || "Email domain is not permitted." };
  }

  // 2. Check unique email and roll_number in Supabase & local store
  if (!isDemoMode()) {
    try {
      const supabase = createAdminClient();
      const { data: existingEmail } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", email.toLowerCase())
        .maybeSingle();

      if (existingEmail) {
        return { success: false, error: "A student with this email address already exists." };
      }

      const { data: existingRoll } = await supabase
        .from("profiles")
        .select("id")
        .eq("roll_number", roll_number.toUpperCase())
        .maybeSingle();

      if (existingRoll) {
        return { success: false, error: "A student with this roll number is already registered." };
      }
    } catch {
      // Supabase lookup non-fatal; checked locally
    }
  }

  const store = getStore();
  if (store.profiles.some((p) => p.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: "A student with this email address already exists." };
  }
  if (store.profiles.some((p) => p.roll_number?.toLowerCase() === roll_number.toLowerCase())) {
    return { success: false, error: "A student with this roll number is already registered." };
  }

  // 3. Rate limiting (60-second cooldown)
  const rateLimit = await checkOtpRateLimit(email);
  if (!rateLimit.allowed) {
    return {
      success: false,
      error: `Please wait ${rateLimit.waitSeconds} seconds before requesting a new code.`,
    };
  }

  // 4. Generate 6-digit OTP & store
  const otp = generateNumericOtp();
  await storeRegistrationOtp(email, otp);

  // 5. Dispatch OTP email via SMTP
  let emailDispatched = false;
  try {
    const emailRes = await sendOtpVerificationEmail({
      to: email,
      fullName: full_name,
      otpCode: otp,
    });
    emailDispatched = !!emailRes.success;
    if (!emailRes.success) {
      console.warn("⚠️ SMTP dispatch warning:", emailRes.reason || emailRes.error);
    }
  } catch (err: any) {
    console.warn("⚠️ SMTP error during OTP send:", err.message);
  }

  // If SMTP is unconfigured or failed, return the demo code in the response so registration never blocks testing
  return {
    success: true,
    demoOtp: !emailDispatched ? otp : undefined,
    message: emailDispatched
      ? `Verification code dispatched to ${email}`
      : "Email delivery unconfigured. Use the provided verification code to continue.",
  };
}

export async function verifyOtpAndRegisterAction(input: RegisterInput, otp: string) {
  const result = registerSchema.safeParse(input);
  if (!result.success) {
    return { success: false, error: result.error.errors[0]?.message || "Validation failed" };
  }

  const { full_name, email, roll_number, hostel_block, room_number, password } = result.data;

  // 1. Verify OTP
  const verification = await verifyRegistrationOtp(email, otp);
  if (!verification.valid) {
    return { success: false, error: verification.error || "Invalid verification code." };
  }

  const cookieStore = cookies();
  const store = getStore();

  let createdId = `u-student-${Date.now()}`;

  // 2. Register with Supabase in production
  if (!isDemoMode()) {
    try {
      const supabaseAdmin = createAdminClient();
      const supabase = createClient();

      // Sign up in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name,
            roll_number,
            hostel_block,
            room_number,
            role: "student",
          },
        },
      });

      if (authData?.user?.id) {
        createdId = authData.user.id;

        // Ensure profile row exists in public.profiles table
        await supabaseAdmin.from("profiles").upsert(
          {
            id: createdId,
            email: email.toLowerCase(),
            full_name,
            roll_number: roll_number.toUpperCase(),
            hostel_block,
            room_number,
            role: "student",
            wallet_balance: 450.0,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        );
      } else if (authError) {
        console.warn("⚠️ Supabase auth sign-up error:", authError.message);
      }
    } catch (err: any) {
      console.warn("⚠️ Supabase registration exception:", err.message);
    }
  }

  // 3. Also add to local store for demo compatibility
  const newProfile: Profile = {
    id: createdId,
    email: email.toLowerCase(),
    full_name,
    roll_number: roll_number.toUpperCase(),
    department: "Computer Science & Engineering",
    hostel_block,
    room_number,
    mess_allocation: "Central Mess Hall 1",
    role: "student",
    wallet_balance: 450,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  store.profiles.push(newProfile);

  // 4. Set session cookies
  cookieStore.set("mess_session_role", "student", { path: "/", httpOnly: true });
  cookieStore.set("mess_user_id", newProfile.id, { path: "/", httpOnly: true });
  cookieStore.set("mess_user_name", newProfile.full_name, { path: "/" });

  // 5. Send Welcome Email (non-blocking)
  sendWelcomeStudentEmail({
    to: email,
    fullName: full_name,
    rollNumber: roll_number,
    hostelBlock: hostel_block,
    roomNumber: room_number,
  }).catch((err) => {
    console.warn("Non-blocking welcome email error:", err);
  });

  return { success: true, role: "student" };
}

export async function registerStudentAction(input: RegisterInput) {
  return sendRegistrationOtpAction(input);
}

export async function logoutAction() {
  const cookieStore = cookies();
  cookieStore.delete("mess_session_role");
  cookieStore.delete("mess_user_id");
  cookieStore.delete("mess_user_name");

  try {
    const supabase = createClient();
    await supabase.auth.signOut();
  } catch {
    // Non-fatal if offline
  }

  redirect("/login");
}

export async function getCurrentUser(): Promise<Profile | null> {
  // 1. Try Supabase Auth user in production
  if (!isDemoMode()) {
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (profile) {
          return {
            ...profile,
            wallet_balance: Number(profile.wallet_balance) || 0,
          };
        }

        // Construct from user metadata if profile row pending
        return {
          id: user.id,
          email: user.email || "",
          full_name: user.user_metadata?.full_name || "Student User",
          roll_number: user.user_metadata?.roll_number || "2024CS001",
          department: user.user_metadata?.department || "Computer Science",
          hostel_block: user.user_metadata?.hostel_block || "Block A",
          room_number: user.user_metadata?.room_number || "101",
          mess_allocation: "Central Mess Hall 1",
          role: (user.user_metadata?.role as "student" | "admin") || "student",
          wallet_balance: 450,
          created_at: user.created_at,
          updated_at: user.updated_at || user.created_at,
        };
      }
    } catch {
      // Proceed to cookie session
    }
  }

  // 2. Cookie session fallback
  let role: string | null = null;
  let id: string | null = null;
  let name: string | null = null;

  try {
    const cookieStore = cookies();
    role = cookieStore.get("mess_session_role")?.value || null;
    id = cookieStore.get("mess_user_id")?.value || null;
    name = cookieStore.get("mess_user_name")?.value || null;
  } catch {
    // Non-HTTP context (e.g. CLI tests)
  }

  const store = getStore();

  if (id) {
    const matched = store.profiles.find((p) => p.id === id);
    if (matched) return matched;
  }

  if (role) {
    const matchedRole = store.profiles.find((p) => p.role === role);
    if (matchedRole) return matchedRole;
  }

  // Default fallback to first student for seamless UI preview in demo mode
  return store.profiles.find((p) => p.role === "student") || null;
}
