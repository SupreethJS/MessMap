"use server";

import { revalidatePath } from "next/cache";
import { foodRecordSchema, FoodRecordInput } from "@/lib/validations/food-record";
import { saveDbFoodRecord } from "@/lib/supabase/db";
import { getCurrentUser } from "./auth-actions";

export async function saveFoodRecordAction(input: FoodRecordInput) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return { success: false, error: "Unauthorized: Only administrators can record food quantities." };
  }

  const result = foodRecordSchema.safeParse(input);
  if (!result.success) {
    return { success: false, error: result.error.errors[0]?.message || "Invalid food record quantities" };
  }

  try {
    const record = await saveDbFoodRecord(result.data);
    revalidatePath("/admin/food-records");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/reports");
    revalidatePath("/admin/ai-insights");
    return { success: true, record };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to record food quantities." };
  }
}

export async function getFoodRecordsDataAction() {
  const { getDbFoodRecords, getDbMenus } = await import("@/lib/supabase/db");
  const [records, menus] = await Promise.all([getDbFoodRecords(), getDbMenus()]);
  return { records, menus };
}
