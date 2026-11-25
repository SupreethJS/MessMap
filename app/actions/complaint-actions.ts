"use server";

import { revalidatePath } from "next/cache";
import { saveDbComplaint, updateDbComplaint, getDbComplaints, topUpDbWallet } from "@/lib/supabase/db";
import { getCurrentUser } from "./auth-actions";
import { ComplaintCategory, ComplaintStatus } from "@/lib/types/database";

export async function submitComplaintAction(data: {
  category: ComplaintCategory;
  title: string;
  description: string;
  urgency?: "Normal" | "High" | "Urgent";
}) {
  const user = await getCurrentUser();
  if (!user || user.role !== "student") {
    return { success: false, error: "Only students can submit complaints." };
  }

  if (!data.title.trim() || !data.description.trim()) {
    return { success: false, error: "Please provide a title and detailed description." };
  }

  try {
    const complaint = await saveDbComplaint({
      student_id: user.id,
      student_name: user.full_name,
      category: data.category,
      title: data.title.trim(),
      description: data.description.trim(),
      urgency: data.urgency,
    });

    revalidatePath("/student/dashboard");
    revalidatePath("/student/complaints");
    revalidatePath("/admin/complaints");
    return { success: true, complaint };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to submit complaint." };
  }
}

export async function updateComplaintAction(data: {
  complaintId: string;
  status: ComplaintStatus;
  adminRemarks?: string;
  rebateAmount?: number;
}) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return { success: false, error: "Unauthorized: Admin privileges required." };
  }

  try {
    const updated = await updateDbComplaint(data.complaintId, {
      status: data.status,
      admin_remarks: data.adminRemarks?.trim() || "",
      rebate_amount: data.rebateAmount && data.rebateAmount > 0 ? Number(data.rebateAmount) : 0,
    });

    // If rebate amount is awarded, credit student's wallet
    if (data.rebateAmount && data.rebateAmount > 0 && updated.student_id) {
      await topUpDbWallet(updated.student_id, Number(data.rebateAmount));
    }

    revalidatePath("/admin/complaints");
    revalidatePath("/student/complaints");
    revalidatePath("/student/dashboard");
    revalidatePath("/student/payments");

    return { success: true, complaint: updated };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update complaint status." };
  }
}

export async function getAdminComplaintsAction() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return await getDbComplaints();
}
