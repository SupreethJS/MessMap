import { NextResponse } from "next/server";
import { isDemoMode } from "@/lib/supabase/db";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET() {
  const startTime = Date.now();
  const demoMode = isDemoMode();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let supabaseStatus: "connected" | "demo_mock_mode" | "unconfigured" | "error" =
    "unconfigured";
  let supabaseLatencyMs: number | null = null;
  let supabaseError: string | null = null;

  if (demoMode) {
    supabaseStatus = "demo_mock_mode";
  } else if (supabaseUrl && anonKey && !supabaseUrl.includes("dummy")) {
    try {
      const pingStart = Date.now();
      const client = createClient(supabaseUrl, anonKey);
      const { error } = await client.from("profiles").select("id").limit(1);
      supabaseLatencyMs = Date.now() - pingStart;

      if (error) {
        supabaseStatus = "error";
        supabaseError = error.message;
      } else {
        supabaseStatus = "connected";
      }
    } catch (err: any) {
      supabaseStatus = "error";
      supabaseError = err.message || "Failed to query Supabase";
    }
  }

  const isHealthy =
    supabaseStatus === "connected" || supabaseStatus === "demo_mock_mode";

  return NextResponse.json(
    {
      status: isHealthy ? "healthy" : "degraded",
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      environment: process.env.NODE_ENV || "development",
      demoMode,
      supabase: {
        status: supabaseStatus,
        latencyMs: supabaseLatencyMs,
        configured: Boolean(
          supabaseUrl && anonKey && !supabaseUrl.includes("dummy")
        ),
        error: supabaseError,
      },
      durationMs: Date.now() - startTime,
    },
    {
      status: isHealthy ? 200 : 503,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    }
  );
}
