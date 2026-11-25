"use server";

import { revalidatePath } from "next/cache";
import {
  getDbNotifications,
  markDbNotificationRead,
  markDbAllNotificationsRead,
} from "@/lib/supabase/db";
import { getCurrentUser } from "./auth-actions";

export async function getUserNotificationsAction() {
  const user = await getCurrentUser();
  if (!user) return [];
  return getDbNotifications(user.id);
}

export async function markNotificationReadAction(notificationId: string) {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Not authenticated" };

  await markDbNotificationRead(notificationId);
  revalidatePath("/student/notifications");
  revalidatePath("/student/dashboard");
  return { success: true };
}

export async function markAllNotificationsReadAction() {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Not authenticated" };

  await markDbAllNotificationsRead(user.id);
  revalidatePath("/student/notifications");
  revalidatePath("/student/dashboard");
  return { success: true };
}
