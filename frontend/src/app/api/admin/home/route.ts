import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminApi";
import { getHome } from "@/lib/cmsStore";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  return NextResponse.json(await getHome());
}

export async function PUT(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const incoming = (await request.json()) as Record<string, unknown>;
  const current = await getHome();
  const { saveHome } = await import("@/lib/cmsStore");
  await saveHome({ ...current, ...incoming });
  return NextResponse.json({ ok: true });
}
