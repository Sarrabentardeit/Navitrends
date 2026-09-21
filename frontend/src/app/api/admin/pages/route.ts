import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminApi";
import { listPages, savePage } from "@/lib/cmsStore";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  return NextResponse.json(await listPages());
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const body = (await request.json()) as {
    title?: string;
    slug?: string;
    content?: string;
    seoTitle?: string;
    seoDescription?: string;
  };
  const title = String(body.title ?? "").trim();
  if (!title) return NextResponse.json({ error: "Le titre est obligatoire." }, { status: 400 });
  const record = await savePage({ ...body, title });
  return NextResponse.json({ id: record._id, slug: record.slug });
}
