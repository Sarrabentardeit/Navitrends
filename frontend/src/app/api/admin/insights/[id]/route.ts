import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminApi";
import { deletePost, getPostById, savePost } from "@/lib/cmsStore";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, ctx: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await ctx.params;
  const post = await getPostById(id);
  if (!post) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(request: Request, ctx: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await ctx.params;
  const body = (await request.json()) as {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    seoTitle?: string;
    seoDescription?: string;
    coverUrl?: string;
    author?: string;
  };
  const title = String(body.title ?? "").trim();
  if (!title) return NextResponse.json({ error: "Le titre est obligatoire." }, { status: 400 });
  const record = await savePost({ ...body, _id: id, title });
  return NextResponse.json({ ok: true, slug: record.slug });
}

export async function DELETE(_request: Request, ctx: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await ctx.params;
  await deletePost(id);
  return NextResponse.json({ ok: true });
}
