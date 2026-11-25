import { getDbComplaints } from "@/lib/supabase/db";
import { AdminComplaintsClient } from "@/components/admin/admin-complaints-client";

export const dynamic = "force-dynamic";

export default async function AdminComplaintsPage() {
  const complaints = await getDbComplaints();

  return <AdminComplaintsClient initialComplaints={complaints} />;
}
