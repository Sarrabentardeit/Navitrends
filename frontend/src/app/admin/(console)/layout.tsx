import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { adminCookieName, verifySessionValue } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export default async function AdminConsoleLayout({ children }: { children: React.ReactNode }) {
  const jar = await cookies();
  const ok = await verifySessionValue(jar.get(adminCookieName())?.value);
  if (!ok) redirect("/admin/login");

  return <AdminShell>{children}</AdminShell>;
}
