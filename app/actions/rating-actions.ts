"use server";

import { revalidatePath } from "next/cache";
import { ratingSchema, RatingInput } from "@/lib/validations/rating";
import { getDbMenuById, saveDbRating } from "@/lib/supabase/db";
import { getCurrentUser } from "./auth-actions";

export async function submitRatingAction(input: RatingInput) {
  const user = await getCurrentUser();
  if (!user || user.role !== "student") {
    return { success: false, error: "Only students are permitted to submit meal ratings." };
  }

  const result = ratingSchema.safeParse(input);
  if (!result.success) {
    return { success: false, error: result.error.errors[0]?.message || "Invalid rating input" };
  }

  const { menu_id, rating, comment } = result.data;
  const menu = await getDbMenuById(menu_id, user.id);

  if (!menu) {
    return { success: false, error: "Menu not found." };
  }

  // Permit ratings strictly after meal serving begins
  const mealStart = new Date(`${menu.menu_date}T${menu.serving_start_time}`);
  const now = new Date();

  if (now.getTime() < mealStart.getTime()) {
    return {
      success: false,
      error: `Meal ratings unlock when serving begins at ${mealStart.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}.`,
    };
  }

  try {
    const saved = await saveDbRating({
      student_id: user.id,
      menu_id: menu.id,
      rating,
      comment: comment || undefined,
      meal_type: menu.meal_type,
    });

    revalidatePath("/student/dashboard");
    revalidatePath("/student/ratings");
    revalidatePath("/admin/ratings");
    revalidatePath("/admin/reports");
    revalidatePath("/admin/ai-insights");
    return { success: true, rating: saved };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to submit rating." };
  }
}
