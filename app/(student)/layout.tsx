import { getCurrentUser } from "@/app/actions/auth-actions";
import { getDbNotifications } from "@/lib/supabase/db";
import { StudentShell } from "@/components/student/student-shell";

export const dynamic = "force-dynamic";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const notifications = user ? await getDbNotifications(user.id) : [];

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-amber-400 focus:text-slate-950 focus:font-extrabold focus:text-xs focus:rounded-xl focus:shadow-xl focus:ring-2 focus:ring-slate-950 transition-all"
      >
        Skip to main content
      </a>
      <StudentShell user={user} notifications={notifications}>
        {children}
      </StudentShell>
    </>
  );
}
