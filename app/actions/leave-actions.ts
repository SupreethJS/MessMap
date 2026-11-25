"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./auth-actions";
import { applyDbHostelLeave, getDbHostelLeaves } from "@/lib/supabase/db";
import { isCutoffPassed } from "@/lib/services/cutoff-manager";

const DAILY_REBATE_RATE = 150; // ₹150 per day (3 meals @ ₹50 avg)

export async function applyHostelLeaveAction(data: {
  startDate: string;
  endDate: string;
  reason: string;
}) {
  const user = await getCurrentUser();
  if (!user || user.role !== "student") {
    return { success: false, error: "Only students can apply for mess leaves." };
  }

  if (!data.startDate || !data.endDate) {
    return { success: false, error: "Please select both start and end dates." };
  }

  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (start > end) {
    return { success: false, error: "End date must be on or after the start date." };
  }

  // Check if start date is in the past
  const startDay = new Date(data.startDate);
  startDay.setHours(0, 0, 0, 0);
  if (startDay < today) {
    return { success: false, error: "Cannot apply for mess leave on past dates." };
  }

  // If applying for today, enforce 08:00 AM breakfast cutoff
  if (data.startDate === today.toISOString().split("T")[0]) {
    if (isCutoffPassed(data.startDate, "08:00:00")) {
      return {
        success: false,
        error: "Today's leave cutoff (08:00 AM) has passed. Please schedule starting tomorrow.",
      };
    }
  }

  // Calculate day count inclusive
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const daysCount = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  if (daysCount < 1) {
    return { success: false, error: "Invalid leave duration." };
  }

  const estimatedRebate = daysCount * DAILY_REBATE_RATE;

  try {
    const leave = await applyDbHostelLeave({
      student_id: user.id,
      start_date: data.startDate,
      end_date: data.endDate,
      reason: data.reason?.trim() || "Hostel Leave / Out of Campus",
      days_count: daysCount,
      estimated_rebate: estimatedRebate,
    });

    revalidatePath("/student/my-meals");
    revalidatePath("/student/dashboard");
    revalidatePath("/student/meal-plans");
    revalidatePath("/student/wallet");

    return {
      success: true,
      leave,
      message: `Mess leave approved for ${daysCount} day(s). ₹${estimatedRebate} rebate credited to dining wallet.`,
    };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to submit leave request." };
  }
}

export async function getHostelLeavesAction() {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: "Not authenticated.", leaves: [] };
  }

  try {
    const leaves = await getDbHostelLeaves(user.role === "student" ? user.id : undefined);
    return { success: true, leaves };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to fetch leaves.", leaves: [] };
  }
}
