import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/adminApi";
import { getAppearance, saveAppearance, type AppearanceRecord } from "@/lib/cmsStore";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  return NextResponse.json(await getAppearance());
}

export async function PUT(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const incoming = (await request.json()) as AppearanceRecord;
  await saveAppearance(incoming);
  revalidatePath("/");
  revalidatePath("/admin/appearance");
  return NextResponse.json({ ok: true });
}
