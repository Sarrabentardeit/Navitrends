import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminApi";
import { deleteUpload, listMedia, saveUpload } from "@/lib/cmsStore";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  return NextResponse.json(await listMedia());
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const form = await request.formData();
  const files = form.getAll("file").filter((item): item is File => item instanceof File && item.size > 0);
  if (!files.length) {
    return NextResponse.json({ error: "Fichier manquant." }, { status: 400 });
  }
  const urls = [];
  for (const file of files) urls.push(await saveUpload(file));
  return NextResponse.json({ url: urls[0], urls, image: urls[0] });
}

export async function DELETE(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const name = new URL(request.url).searchParams.get("name") || "";
  try {
    await deleteUpload(name);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Suppression impossible." }, { status: 400 });
  }
}
