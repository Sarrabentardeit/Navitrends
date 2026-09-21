import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminApi";
import { getSettings, saveSettings, type SettingsRecord } from "@/lib/cmsStore";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  return NextResponse.json(await getSettings());
}

export async function PUT(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const incoming = (await request.json()) as Partial<SettingsRecord>;
  const current = await getSettings();
  await saveSettings({ ...current, ...incoming });
  return NextResponse.json({ ok: true });
}
