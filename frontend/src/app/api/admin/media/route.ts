import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminApi";
import { deleteMedia, listMedia, saveUpload, updateMedia } from "@/lib/cmsStore";

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
  if (!files.length) return NextResponse.json({ error: "Fichier manquant." }, { status: 400 });
  const urls = [];
  for (const file of files) urls.push(await saveUpload(file));
  return NextResponse.json({ url: urls[0], urls, items: await listMedia() });
}

export async function PATCH(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const form = await request.formData();
  const url = String(form.get("url") || "");
  if (!url) return NextResponse.json({ error: "Image manquante." }, { status: 400 });
  const file = form.get("file");
  const applyRaw = String(form.get("apply") || "");
  try {
    const item = await updateMedia({
      url,
      alt: form.has("alt") ? String(form.get("alt")) : undefined,
      title: form.has("title") ? String(form.get("title")) : undefined,
      name: form.has("name") ? String(form.get("name")) : undefined,
      file: file instanceof File && file.size ? file : undefined,
      apply: applyRaw === "logo" || applyRaw === "cta" ? applyRaw : undefined,
    });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Modification impossible." }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const url = new URL(request.url).searchParams.get("url") || "";
  try {
    await deleteMedia(url);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Suppression impossible." }, { status: 400 });
  }
}
