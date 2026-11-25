"use server";

import { revalidatePath } from "next/cache";
import { mealPlanSchema, MealPlanInput } from "@/lib/validations/meal-plan";
import { getDbMenuById, saveDbMealPlan } from "@/lib/supabase/db";
import { isCutoffPassed, getCutoffDateTime } from "@/lib/services/cutoff-manager";
import { getCurrentUser } from "./auth-actions";

export async function submitMealPlanAction(input: MealPlanInput) {
  const user = await getCurrentUser();
  if (!user || user.role !== "student") {
    return { success: false, error: "Only registered students can submit meal plans." };
  }

  const result = mealPlanSchema.safeParse(input);
  if (!result.success) {
    return { success: false, error: result.error.errors[0]?.message || "Invalid meal plan submission" };
  }

  const { menu_id, status } = result.data;
  const menu = await getDbMenuById(menu_id, user.id);

  if (!menu) {
    return { success: false, error: "The requested menu was not found." };
  }

  // Server-Side Cutoff Enforcement (FR3)
  const now = new Date();
  if (isCutoffPassed(menu.menu_date, menu.cutoff_time, now)) {
    const cutoffDate = getCutoffDateTime(menu.menu_date, menu.cutoff_time);
    return {
      success: false,
      error: `Cutoff passed at ${cutoffDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}. Meal plans for this meal are locked.`,
    };
  }

  try {
    const savedPlan = await saveDbMealPlan(user.id, menu.id, status);

    try {
      revalidatePath("/student/dashboard");
      revalidatePath("/student/my-meals");
      revalidatePath("/student/meal-plans");
      revalidatePath("/student/menu");
      revalidatePath("/admin/dashboard");
      revalidatePath("/admin/attendance");
    } catch {
      // Ignored outside Next.js request context (e.g. CLI tests)
    }

    return {
      success: true,
      plan: savedPlan,
      message: status === "yes" ? "Meal reserved successfully" : "Meal opt-out recorded",
    };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to record meal decision." };
  }
}
