import { getCurrentUser } from "@/app/actions/auth-actions";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    redirect("/student/dashboard?error=unauthorized");
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-amber-400 focus:text-slate-950 focus:font-extrabold focus:text-xs focus:rounded-xl focus:shadow-xl focus:ring-2 focus:ring-slate-950 transition-all"
      >
        Skip to main content
      </a>
      <AdminShell user={user}>
        {children}
      </AdminShell>
    </>
  );
}
