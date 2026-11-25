"use server";

import { revalidatePath } from "next/cache";
import {
  recordDbMealCheckIn,
  getDbCheckInsForMenu,
  getDbMenus,
  getDbMenuById,
} from "@/lib/supabase/db";
import { getCurrentUser } from "./auth-actions";
import { MealType } from "@/lib/types/database";

export async function checkInStudentAction(data: {
  menuId: string;
  studentId: string;
  rollNumber?: string | null;
  studentName?: string | null;
  method: "qr_scan" | "manual_roll";
  mealType?: MealType;
  menuDate?: string;
}) {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "admin") {
    return { success: false, error: "Unauthorized: Admin privileges required." };
  }

  try {
    const menu = await getDbMenuById(data.menuId);
    const mealType = data.mealType || menu?.meal_type || "lunch";
    const menuDate = data.menuDate || menu?.menu_date || new Date().toISOString().split("T")[0];

    const checkIn = await recordDbMealCheckIn({
      menu_id: data.menuId,
      student_id: data.studentId,
      student_roll_number: data.rollNumber || null,
      student_name: data.studentName || null,
      method: data.method,
      meal_type: mealType,
      menu_date: menuDate,
    });

    revalidatePath("/admin/attendance");
    revalidatePath("/admin/dashboard");
    return { success: true, checkIn };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to check in student." };
  }
}

export async function getMenuCheckInsAction(menuId: string) {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return await getDbCheckInsForMenu(menuId);
}
