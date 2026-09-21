import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminApi";
import { seedFromSite } from "@/lib/cmsStore";

export async function POST() {
  const denied = await requireAdmin();
  if (denied) return denied;
  await seedFromSite();
  return NextResponse.json({ ok: true });
}
