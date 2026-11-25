// lib/supabase/db.ts: Unified Supabase PostgreSQL Data Layer with Graceful In-Memory Demo Fallback

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  Menu,
  MenuItem,
  MealPlan,
  FoodRecord,
  Rating,
  Complaint,
  WalletTransaction,
  GroceryItem,
  Notification,
  ActivityItem,
  Profile,
  ComplaintCategory,
  MealType,
} from "@/lib/types/database";
import {
  getAllMenus as getStoreAllMenus,
  getMenuById as getStoreMenuById,
  createMenuInStore,
  updateMenuInStore,
  deleteMenuFromStore,
  saveMealPlanInStore,
  saveFoodRecordInStore,
  saveRatingInStore,
  getComplaintsFromStore,
  saveComplaintInStore,
  getWalletDataForStudent,
  topUpWalletInStore,
  getGroceriesFromStore,
  updateGroceryStockInStore,
  addGroceryItemInStore,
  deleteGroceryItemInStore,
  getNotificationsForUser,
  markNotificationReadInStore,
  markAllNotificationsReadInStore,
  getRecentActivities as getStoreRecentActivities,
  getWeeklyAttendanceChartData as getStoreWeeklyAttendanceChartData,
  getReportAnalytics as getStoreReportAnalytics,
  getAIRecommendationsForMess as getStoreAIRecommendations,
  getDemandPredictionForMenu as getStoreDemandPrediction,
  getRecipesWithStockMatching as getStoreRecipesWithStockMatching,
  getStore,
} from "@/lib/data/mess-store";
import { MenuInput } from "@/lib/validations/menu";
import { FoodRecordInput } from "@/lib/validations/food-record";
import { GroceryItemInput } from "@/lib/validations/grocery";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Check if the application is running in mock/demo mode.
 * Returns true if explicitly flagged via NEXT_PUBLIC_DEMO_MODE=true
 * or if Supabase URL / Anon Key are missing or unconfigured.
 */
export function isDemoMode(): boolean {
  if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") {
    return true;
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey || url.includes("dummy") || url.includes("your-project")) {
    return true;
  }
  return false;
}

/**
 * Helper to obtain the best Supabase client (Admin client if service key exists, else Server client)
 */
function getSupabase(useAdmin = false) {
  if (useAdmin && process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SUPABASE_SERVICE_ROLE_KEY.includes("dummy")) {
    try {
      return createAdminClient();
    } catch {
      return createClient();
    }
  }
  return createClient();
}

// ============================================================================
// 1. MENUS & MENU ITEMS
// ============================================================================

export async function getDbMenus(filterDate?: string, currentUserId?: string): Promise<Menu[]> {
  if (isDemoMode()) {
    return getStoreAllMenus(filterDate);
  }

  try {
    const supabase = getSupabase();
    let query = supabase
      .from("menus")
      .select("*, menu_items(*)")
      .eq("is_published", true);

    if (filterDate) {
      query = query.eq("menu_date", filterDate);
    }

    const { data: dbMenus, error } = await query.order("menu_date", { ascending: true });

    if (error || !dbMenus || dbMenus.length === 0) {
      return getStoreAllMenus(filterDate);
    }

    // If currentUserId provided, also query meal_plans for this student
    let userMealPlans: Record<string, any> = {};
    if (currentUserId && UUID_REGEX.test(currentUserId)) {
      try {
        const { data: plans } = await supabase
          .from("meal_plans")
          .select("*")
          .eq("student_id", currentUserId);
        if (plans) {
          plans.forEach((p) => {
            userMealPlans[p.menu_id] = p;
          });
        }
      } catch {
        // non-blocking
      }
    }

    return dbMenus.map((m: any) => {
      const mDate = typeof m.menu_date === "string" ? m.menu_date.slice(0, 10) : new Date(m.menu_date).toISOString().slice(0, 10);
      return {
        id: m.id,
        menu_date: mDate,
        meal_type: m.meal_type as MealType,
        cutoff_time: m.cutoff_time,
        serving_start_time: m.serving_start_time,
        serving_end_time: m.serving_end_time,
        is_published: m.is_published,
        image_url: m.image_url,
        special_badge: m.special_badge,
        calories: m.calories || 450,
        created_at: m.created_at,
        updated_at: m.updated_at,
        items: m.menu_items || [],
        user_meal_plan: userMealPlans[m.id] || null,
        expected_attendance: m.expected_attendance || 0,
      };
    });
  } catch (err) {
    console.warn("⚠️ getDbMenus fallback to in-memory store:", err);
    return getStoreAllMenus(filterDate);
  }
}

export async function getDbMenuById(id: string, currentUserId?: string): Promise<Menu | null> {
  if (isDemoMode() || !UUID_REGEX.test(id)) {
    return getStoreMenuById(id, currentUserId);
  }

  try {
    const supabase = getSupabase();
    const { data: m, error } = await supabase
      .from("menus")
      .select("*, menu_items(*)")
      .eq("id", id)
      .maybeSingle();

    if (error || !m) {
      return getStoreMenuById(id, currentUserId);
    }

    let userPlan = null;
    if (currentUserId && UUID_REGEX.test(currentUserId)) {
      const { data: plan } = await supabase
        .from("meal_plans")
        .select("*")
        .eq("menu_id", id)
        .eq("student_id", currentUserId)
        .maybeSingle();
      userPlan = plan || null;
    }

    const mDate = typeof m.menu_date === "string" ? m.menu_date.slice(0, 10) : new Date(m.menu_date).toISOString().slice(0, 10);
    return {
      id: m.id,
      menu_date: mDate,
      meal_type: m.meal_type as MealType,
      cutoff_time: m.cutoff_time,
      serving_start_time: m.serving_start_time,
      serving_end_time: m.serving_end_time,
      is_published: m.is_published,
      image_url: m.image_url,
      special_badge: m.special_badge,
      calories: m.calories || 450,
      created_at: m.created_at,
      updated_at: m.updated_at,
      items: m.menu_items || [],
      user_meal_plan: userPlan,
    };
  } catch (err) {
    console.warn("⚠️ getDbMenuById fallback:", err);
    return getStoreMenuById(id, currentUserId);
  }
}

export async function createDbMenu(data: MenuInput): Promise<{ id: string }> {
  // Always update in-memory store so demo/fallback stays in sync
  const storeMenu = createMenuInStore(data);

  if (isDemoMode()) {
    return { id: storeMenu.id };
  }

  try {
    const supabase = getSupabase(true);
    const { data: newMenu, error } = await supabase
      .from("menus")
      .insert({
        menu_date: data.menu_date,
        meal_type: data.meal_type,
        cutoff_time: data.cutoff_time,
        serving_start_time: data.serving_start_time,
        serving_end_time: data.serving_end_time,
        is_published: data.is_published ?? true,
      })
      .select("id")
      .single();

    if (error || !newMenu) {
      console.warn("⚠️ createDbMenu Supabase insert error, kept in-memory:", error?.message);
      return { id: storeMenu.id };
    }

    // Insert menu items
    if (data.items && data.items.length > 0) {
      const itemsToInsert = data.items.map((item) => ({
        menu_id: newMenu.id,
        name: item.name,
        category: item.category,
        is_vegetarian: item.is_vegetarian,
        image_url: item.image_url || null,
      }));
      await supabase.from("menu_items").insert(itemsToInsert);
    }

    return { id: newMenu.id };
  } catch (err) {
    console.warn("⚠️ createDbMenu exception, used in-memory store:", err);
    return { id: storeMenu.id };
  }
}

export async function updateDbMenu(id: string, data: MenuInput): Promise<{ id: string }> {
  updateMenuInStore(id, data);

  if (isDemoMode() || !UUID_REGEX.test(id)) {
    return { id };
  }

  try {
    const supabase = getSupabase(true);
    await supabase
      .from("menus")
      .update({
        menu_date: data.menu_date,
        meal_type: data.meal_type,
        cutoff_time: data.cutoff_time,
        serving_start_time: data.serving_start_time,
        serving_end_time: data.serving_end_time,
        is_published: data.is_published ?? true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (data.items && data.items.length > 0) {
      // Re-sync items: remove existing and re-insert
      await supabase.from("menu_items").delete().eq("menu_id", id);
      const itemsToInsert = data.items.map((item) => ({
        menu_id: id,
        name: item.name,
        category: item.category,
        is_vegetarian: item.is_vegetarian,
        image_url: item.image_url || null,
      }));
      await supabase.from("menu_items").insert(itemsToInsert);
    }

    return { id };
  } catch (err) {
    console.warn("⚠️ updateDbMenu error:", err);
    return { id };
  }
}

export async function deleteDbMenu(id: string): Promise<void> {
  deleteMenuFromStore(id);

  if (isDemoMode() || !UUID_REGEX.test(id)) {
    return;
  }

  try {
    const supabase = getSupabase(true);
    await supabase.from("menus").delete().eq("id", id);
  } catch (err) {
    console.warn("⚠️ deleteDbMenu error:", err);
  }
}

// ============================================================================
// 2. MEAL PLANS (OPT-INS)
// ============================================================================

export async function saveDbMealPlan(studentId: string, menuId: string, status: "yes" | "no"): Promise<MealPlan> {
  const storePlan = saveMealPlanInStore(studentId, menuId, status);

  if (isDemoMode()) {
    return storePlan;
  }

  try {
    const supabase = getSupabase(true);
    let targetMenuId = menuId;

    // Resolve non-uuid menu ID (e.g. m-YYYY-MM-DD-breakfast) to Supabase UUID
    if (!UUID_REGEX.test(menuId)) {
      const menu = getStoreMenuById(menuId);
      if (menu) {
        const { data: dbMenu } = await supabase
          .from("menus")
          .select("id")
          .eq("menu_date", menu.menu_date)
          .eq("meal_type", menu.meal_type)
          .maybeSingle();
        if (dbMenu?.id) {
          targetMenuId = dbMenu.id;
        }
      }
    }

    if (UUID_REGEX.test(studentId) && UUID_REGEX.test(targetMenuId)) {
      await supabase.from("meal_plans").upsert(
        {
          student_id: studentId,
          menu_id: targetMenuId,
          status,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "student_id,menu_id" }
      );

      // Log student activity
      await supabase.from("activity_logs").insert({
        student_id: studentId,
        title: status === "yes" ? "Opted in for meal" : "Opted out of meal",
        type: "meal",
      });
    }

    return storePlan;
  } catch (err) {
    console.warn("⚠️ saveDbMealPlan error, preserved in store:", err);
    return storePlan;
  }
}

// ============================================================================
// 3. FOOD RECORDS (WASTAGE)
// ============================================================================

export async function getDbFoodRecords(): Promise<FoodRecord[]> {
  if (isDemoMode()) {
    return getStore().foodRecords;
  }

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("food_records")
      .select("*, menus(*)")
      .order("recorded_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return getStore().foodRecords;
    }

    return data.map((r: any) => ({
      id: r.id,
      menu_id: r.menu_id,
      prepared_qty: Number(r.prepared_qty),
      leftover_qty: Number(r.leftover_qty),
      unit: r.unit,
      actual_attendance: r.actual_attendance,
      wastage_percentage: Number(r.wastage_percentage) || 0,
      recorded_at: r.recorded_at,
      updated_at: r.updated_at,
    }));
  } catch (err) {
    console.warn("⚠️ getDbFoodRecords fallback:", err);
    return getStore().foodRecords;
  }
}

export async function saveDbFoodRecord(data: FoodRecordInput): Promise<FoodRecord> {
  const storeRecord = saveFoodRecordInStore(data);

  if (isDemoMode()) {
    return storeRecord;
  }

  try {
    const supabase = getSupabase(true);
    let targetMenuId = data.menu_id;

    if (!UUID_REGEX.test(targetMenuId)) {
      const menu = getStoreMenuById(targetMenuId);
      if (menu) {
        const { data: dbMenu } = await supabase
          .from("menus")
          .select("id")
          .eq("menu_date", menu.menu_date)
          .eq("meal_type", menu.meal_type)
          .maybeSingle();
        if (dbMenu?.id) targetMenuId = dbMenu.id;
      }
    }

    if (UUID_REGEX.test(targetMenuId)) {
      const wastagePct = data.prepared_qty > 0 ? Number(((data.leftover_qty / data.prepared_qty) * 100).toFixed(2)) : 0;
      await supabase.from("food_records").upsert(
        {
          menu_id: targetMenuId,
          prepared_qty: data.prepared_qty,
          leftover_qty: data.leftover_qty,
          unit: data.unit,
          actual_attendance: data.actual_attendance || null,
          wastage_percentage: wastagePct,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "menu_id" }
      );
    }

    return storeRecord;
  } catch (err) {
    console.warn("⚠️ saveDbFoodRecord error:", err);
    return storeRecord;
  }
}

// ============================================================================
// 4. RATINGS & REVIEWS
// ============================================================================

export async function getDbRatings(studentId?: string, menuId?: string): Promise<Rating[]> {
  if (isDemoMode()) {
    const ratings = getStore().ratings;
    if (studentId) return ratings.filter((r) => r.student_id === studentId);
    if (menuId) return ratings.filter((r) => r.menu_id === menuId);
    return ratings;
  }

  try {
    const supabase = getSupabase();
    let query = supabase
      .from("ratings")
      .select("*, profiles(full_name)")
      .order("created_at", { ascending: false });

    if (studentId && UUID_REGEX.test(studentId)) {
      query = query.eq("student_id", studentId);
    }
    if (menuId && UUID_REGEX.test(menuId)) {
      query = query.eq("menu_id", menuId);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return getStore().ratings;
    }

    return data.map((r: any) => ({
      id: r.id,
      student_id: r.student_id,
      menu_id: r.menu_id,
      rating: Number(r.rating),
      comment: r.comment,
      meal_type: r.meal_type,
      created_at: r.created_at,
      updated_at: r.updated_at,
      student: r.profiles ? { full_name: r.profiles.full_name } as any : undefined,
    }));
  } catch (err) {
    console.warn("⚠️ getDbRatings fallback:", err);
    return getStore().ratings;
  }
}

export async function saveDbRating(data: {
  student_id: string;
  menu_id: string;
  rating: number;
  comment?: string;
  meal_type?: MealType;
}): Promise<Rating> {
  const storeRating = saveRatingInStore(data);

  if (isDemoMode()) {
    return storeRating;
  }

  try {
    const supabase = getSupabase(true);
    let targetMenuId = data.menu_id;

    if (!UUID_REGEX.test(targetMenuId)) {
      const menu = getStoreMenuById(targetMenuId);
      if (menu) {
        const { data: dbMenu } = await supabase
          .from("menus")
          .select("id")
          .eq("menu_date", menu.menu_date)
          .eq("meal_type", menu.meal_type)
          .maybeSingle();
        if (dbMenu?.id) targetMenuId = dbMenu.id;
      }
    }

    if (UUID_REGEX.test(data.student_id) && UUID_REGEX.test(targetMenuId)) {
      await supabase.from("ratings").upsert(
        {
          student_id: data.student_id,
          menu_id: targetMenuId,
          rating: data.rating,
          comment: data.comment || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "student_id,menu_id" }
      );

      await supabase.from("activity_logs").insert({
        student_id: data.student_id,
        title: `Rated meal ${data.rating} ★`,
        type: "feedback",
      });
    }

    return storeRating;
  } catch (err) {
    console.warn("⚠️ saveDbRating error:", err);
    return storeRating;
  }
}

// ============================================================================
// 5. COMPLAINTS & FEEDBACK TICKETS
// ============================================================================

export async function getDbComplaints(studentId?: string): Promise<Complaint[]> {
  if (isDemoMode()) {
    return getComplaintsFromStore(studentId);
  }

  try {
    const supabase = getSupabase();
    let query = supabase.from("complaints").select("*").order("created_at", { ascending: false });

    if (studentId && UUID_REGEX.test(studentId)) {
      query = query.eq("student_id", studentId);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return getComplaintsFromStore(studentId);
    }

    return data.map((c: any) => ({
      id: c.id,
      student_id: c.student_id,
      student_name: c.student_name || "Student",
      category: c.category as ComplaintCategory,
      title: c.title,
      description: c.description,
      status: c.status,
      urgency: c.urgency,
      created_at: c.created_at,
      resolved_at: c.resolved_at,
      admin_remarks: c.admin_remarks,
    }));
  } catch (err) {
    console.warn("⚠️ getDbComplaints fallback:", err);
    return getComplaintsFromStore(studentId);
  }
}

export async function saveDbComplaint(data: {
  student_id: string;
  student_name?: string;
  category: ComplaintCategory;
  title: string;
  description: string;
  urgency?: "Normal" | "High" | "Urgent";
}): Promise<Complaint> {
  const storeComplaint = saveComplaintInStore(data);

  if (isDemoMode()) {
    return storeComplaint;
  }

  try {
    const supabase = getSupabase(true);
    if (UUID_REGEX.test(data.student_id)) {
      await supabase.from("complaints").insert({
        student_id: data.student_id,
        student_name: data.student_name || "Student",
        category: data.category,
        title: data.title,
        description: data.description,
        status: "Pending",
        urgency: data.urgency || "Normal",
      });

      await supabase.from("activity_logs").insert({
        student_id: data.student_id,
        title: `Raised complaint: ${data.title}`,
        type: "complaint",
      });
    }

    return storeComplaint;
  } catch (err) {
    console.warn("⚠️ saveDbComplaint error:", err);
    return storeComplaint;
  }
}

// ============================================================================
// 6. WALLET & TRANSACTIONS
// ============================================================================

export async function getDbWalletData(studentId: string): Promise<{ balance: number; transactions: WalletTransaction[] }> {
  if (isDemoMode() || !UUID_REGEX.test(studentId)) {
    return getWalletDataForStudent(studentId);
  }

  try {
    const supabase = getSupabase();
    const { data: profile } = await supabase
      .from("profiles")
      .select("wallet_balance")
      .eq("id", studentId)
      .maybeSingle();

    const { data: txs } = await supabase
      .from("wallet_transactions")
      .select("*")
      .eq("student_id", studentId)
      .order("created_at", { ascending: false });

    if (!profile) {
      return getWalletDataForStudent(studentId);
    }

    return {
      balance: Number(profile.wallet_balance) || 0,
      transactions: (txs || []).map((t: any) => ({
        id: t.id,
        student_id: t.student_id,
        amount: Number(t.amount),
        type: t.type,
        description: t.description,
        status: t.status,
        created_at: t.created_at,
      })),
    };
  } catch (err) {
    console.warn("⚠️ getDbWalletData fallback:", err);
    return getWalletDataForStudent(studentId);
  }
}

export async function topUpDbWallet(studentId: string, amount: number): Promise<number> {
  const newBalance = topUpWalletInStore(studentId, amount);

  if (isDemoMode() || !UUID_REGEX.test(studentId)) {
    return newBalance;
  }

  try {
    const supabase = getSupabase(true);
    // 1. Log transaction
    await supabase.from("wallet_transactions").insert({
      student_id: studentId,
      amount,
      type: "topup",
      description: "Hostel Dining Wallet UPI Recharge",
      status: "Success",
    });

    // 2. Increment profile wallet_balance
    const { data: profile } = await supabase
      .from("profiles")
      .select("wallet_balance")
      .eq("id", studentId)
      .maybeSingle();

    const currentBal = Number(profile?.wallet_balance || 0);
    const updatedBal = currentBal + amount;

    await supabase
      .from("profiles")
      .update({ wallet_balance: updatedBal, updated_at: new Date().toISOString() })
      .eq("id", studentId);

    // 3. Log activity
    await supabase.from("activity_logs").insert({
      student_id: studentId,
      title: `Recharged dining wallet: +₹${amount}`,
      type: "wallet",
    });

    return updatedBal;
  } catch (err) {
    console.warn("⚠️ topUpDbWallet error:", err);
    return newBalance;
  }
}

// ============================================================================
// 7. GROCERY INVENTORY
// ============================================================================

export async function getDbGroceries(): Promise<GroceryItem[]> {
  if (isDemoMode()) {
    return getGroceriesFromStore();
  }

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("grocery_items")
      .select("*")
      .order("name", { ascending: true });

    if (error || !data || data.length === 0) {
      return getGroceriesFromStore();
    }

    return data.map((g: any) => ({
      id: g.id,
      name: g.name,
      category: g.category,
      current_stock: Number(g.current_stock),
      min_threshold: Number(g.min_threshold),
      unit: g.unit,
      updated_at: g.updated_at,
    }));
  } catch (err) {
    console.warn("⚠️ getDbGroceries fallback:", err);
    return getGroceriesFromStore();
  }
}

export async function updateDbGroceryStock(id: string, newStock: number): Promise<GroceryItem> {
  const storeItem = updateGroceryStockInStore(id, newStock);

  if (isDemoMode() || !UUID_REGEX.test(id)) {
    return storeItem;
  }

  try {
    const supabase = getSupabase(true);
    await supabase
      .from("grocery_items")
      .update({ current_stock: newStock, updated_at: new Date().toISOString() })
      .eq("id", id);
    return storeItem;
  } catch (err) {
    console.warn("⚠️ updateDbGroceryStock error:", err);
    return storeItem;
  }
}

export async function addDbGroceryItem(data: GroceryItemInput): Promise<GroceryItem> {
  const storeItem = addGroceryItemInStore(data);

  if (isDemoMode()) {
    return storeItem;
  }

  try {
    const supabase = getSupabase(true);
    const { data: dbItem, error } = await supabase
      .from("grocery_items")
      .insert({
        name: data.name,
        category: data.category,
        current_stock: data.current_stock,
        min_threshold: data.min_threshold,
        unit: data.unit,
      })
      .select("*")
      .single();

    if (error || !dbItem) {
      return storeItem;
    }

    return {
      id: dbItem.id,
      name: dbItem.name,
      category: dbItem.category,
      current_stock: Number(dbItem.current_stock),
      min_threshold: Number(dbItem.min_threshold),
      unit: dbItem.unit,
      updated_at: dbItem.updated_at,
    };
  } catch (err) {
    console.warn("⚠️ addDbGroceryItem error:", err);
    return storeItem;
  }
}

export async function deleteDbGroceryItem(id: string): Promise<void> {
  deleteGroceryItemInStore(id);

  if (isDemoMode() || !UUID_REGEX.test(id)) {
    return;
  }

  try {
    const supabase = getSupabase(true);
    await supabase.from("grocery_items").delete().eq("id", id);
  } catch (err) {
    console.warn("⚠️ deleteDbGroceryItem error:", err);
  }
}

// ============================================================================
// 8. NOTIFICATIONS
// ============================================================================

export async function getDbNotifications(userId: string): Promise<Notification[]> {
  if (isDemoMode() || !UUID_REGEX.test(userId)) {
    return getNotificationsForUser(userId);
  }

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return getNotificationsForUser(userId);
    }

    return data.map((n: any) => ({
      id: n.id,
      user_id: n.user_id,
      title: n.title,
      message: n.message,
      type: n.type,
      is_read: n.is_read,
      reference_id: n.reference_id,
      created_at: n.created_at,
    }));
  } catch (err) {
    console.warn("⚠️ getDbNotifications fallback:", err);
    return getNotificationsForUser(userId);
  }
}

export async function markDbNotificationRead(notificationId: string): Promise<void> {
  markNotificationReadInStore(notificationId);

  if (isDemoMode() || !UUID_REGEX.test(notificationId)) {
    return;
  }

  try {
    const supabase = getSupabase(true);
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", notificationId);
  } catch (err) {
    console.warn("⚠️ markDbNotificationRead error:", err);
  }
}

export async function markDbAllNotificationsRead(userId: string): Promise<void> {
  markAllNotificationsReadInStore(userId);

  if (isDemoMode() || !UUID_REGEX.test(userId)) {
    return;
  }

  try {
    const supabase = getSupabase(true);
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", userId);
  } catch (err) {
    console.warn("⚠️ markDbAllNotificationsRead error:", err);
  }
}

// ============================================================================
// 9. RECENT ACTIVITIES & ANALYTICS
// ============================================================================

export async function getDbRecentActivities(studentId?: string): Promise<ActivityItem[]> {
  if (isDemoMode()) {
    return getStoreRecentActivities();
  }

  try {
    const supabase = getSupabase();
    let query = supabase.from("activity_logs").select("*").order("created_at", { ascending: false }).limit(10);
    if (studentId && UUID_REGEX.test(studentId)) {
      query = query.eq("student_id", studentId);
    }
    const { data } = await query;
    if (!data || data.length === 0) {
      return getStoreRecentActivities();
    }
    return data.map((a: any) => ({
      id: a.id,
      student_id: a.student_id,
      title: a.title,
      timestamp: a.created_at,
      type: a.type,
    }));
  } catch {
    return getStoreRecentActivities();
  }
}

export async function getDbRecipesWithStock(): Promise<any[]> {
  return getStoreRecipesWithStockMatching();
}

export async function getDbReportAnalytics(timeRange: "week" | "month" = "week"): Promise<any> {
  return getStoreReportAnalytics(timeRange);
}

export async function getDbAIRecommendations(): Promise<any[]> {
  return getStoreAIRecommendations();
}

export function getDbDemandPredictionForMenu(menuId: string): any {
  return getStoreDemandPrediction(menuId);
}

export async function getDbAttendanceChartData(range: "This Week" | "Last Week" | "This Month" = "This Week"): Promise<any[]> {
  return getStoreWeeklyAttendanceChartData(range);
}
