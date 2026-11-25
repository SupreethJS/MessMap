import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Static files, assets, API routes and favicon bypass
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const { supabase, response } = await updateSession(request);

  // Check whether demo mode is active
  const isDemoMode =
    process.env.NEXT_PUBLIC_DEMO_MODE === "true" ||
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL.includes("dummy") ||
    process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project");

  let userRole: "student" | "admin" | null = null;
  let isAuthenticated = false;

  // 2. Authenticate via Supabase Auth session first
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      isAuthenticated = true;
      const metaRole = user.user_metadata?.role;
      if (metaRole === "admin" || metaRole === "student") {
        userRole = metaRole;
      } else {
        userRole = "student"; // Default for authenticated students
      }
    }
  } catch {
    // Supabase unreachable or unconfigured
  }

  // 3. Fallback: Only in demo mode, accept session cookies
  if (!isAuthenticated && isDemoMode) {
    const localRole = request.cookies.get("mess_session_role")?.value;
    const localId = request.cookies.get("mess_user_id")?.value;
    if (localId && (localRole === "admin" || localRole === "student")) {
      isAuthenticated = true;
      userRole = localRole;
    }
  }

  const isAuthRoute = pathname === "/login" || pathname === "/register";
  const isStudentRoute = pathname.startsWith("/student");
  const isAdminRoute = pathname.startsWith("/admin");

  // Rule A: Authenticated user visiting /login or /register -> redirect to their role dashboard
  if (isAuthRoute && isAuthenticated && userRole) {
    const target = userRole === "admin" ? "/admin/dashboard" : "/student/dashboard";
    return NextResponse.redirect(new URL(target, request.url));
  }

  // Rule B: Unauthenticated user accessing protected routes -> redirect to /login
  if (!isAuthenticated && (isStudentRoute || isAdminRoute)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Rule C: Role separation - Student attempting to access Admin route -> redirect to Student Dashboard
  if (isAdminRoute && userRole !== "admin") {
    return NextResponse.redirect(new URL("/student/dashboard?error=unauthorized", request.url));
  }

  // Rule D: Role separation - Admin attempting to access Student route -> redirect to Admin Dashboard
  if (isStudentRoute && userRole === "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/student/:path*",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};
