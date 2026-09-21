import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminApi";
import { deletePage, getPageById, savePage } from "@/lib/cmsStore";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, ctx: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await ctx.params;
  const page = await getPageById(id);
  if (!page) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  return NextResponse.json(page);
}

export async function PUT(request: Request, ctx: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await ctx.params;
  const body = (await request.json()) as {
    title?: string;
    slug?: string;
    content?: string;
    seoTitle?: string;
    seoDescription?: string;
  };
  const title = String(body.title ?? "").trim();
  if (!title) return NextResponse.json({ error: "Le titre est obligatoire." }, { status: 400 });
  await savePage({ ...body, _id: id, title });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, ctx: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await ctx.params;
  await deletePage(id);
  return NextResponse.json({ ok: true });
}
