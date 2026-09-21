"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, ImageField } from "@/components/admin/Fields";
import RichEditor from "@/components/admin/RichEditor";
import SeoPreview from "@/components/admin/SeoPreview";

type InsightFields = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  author: string;
  cover?: unknown;
  coverUrl?: string;
};

export default function InsightForm({
  id,
  initial,
}: {
  id?: string;
  initial?: Partial<InsightFields>;
}) {
  const router = useRouter();
  const [fields, setFields] = useState<InsightFields>({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    excerpt: initial?.excerpt ?? "",
    content: initial?.content ?? "",
    seoTitle: initial?.seoTitle ?? "",
    seoDescription: initial?.seoDescription ?? "",
    author: initial?.author ?? "Navitrends UK",
    cover: initial?.cover,
    coverUrl: initial?.coverUrl,
  });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function set<K extends keyof InsightFields>(key: K, value: InsightFields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    const res = await fetch(id ? `/api/admin/insights/${id}` : "/api/admin/insights", {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });
    const data = (await res.json().catch(() => null)) as { error?: string } | null;
    setPending(false);
    if (!res.ok) {
      setError(data?.error || "Enregistrement impossible.");
      return;
    }
    router.push("/admin/insights");
    router.refresh();
  }

  async function onDelete() {
    if (!id || !confirm("Supprimer cet article ?")) return;
    setPending(true);
    await fetch(`/api/admin/insights/${id}`, { method: "DELETE" });
    router.push("/admin/insights");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-5">
      <ImageField
        label="Image de couverture"
        url={fields.coverUrl}
        onUploaded={({ url }) => setFields((current) => ({ ...current, coverUrl: url }))}
      />
      <Field label="Titre" value={fields.title} onChange={(v) => set("title", v)} />
      <Field label="Auteur" value={fields.author} onChange={(v) => set("author", v)} hint="Affiché sur l’article (E-E-A-T)" />
      <Field label="Slug URL" value={fields.slug} onChange={(v) => set("slug", v)} hint="navitrends.uk/insights/…" />
      <Field label="Extrait" value={fields.excerpt} onChange={(v) => set("excerpt", v)} area />
      <RichEditor label="Contenu" value={fields.content} onChange={(v) => set("content", v)} />
      <SeoPreview
        title={fields.seoTitle || fields.title}
        description={fields.seoDescription || fields.excerpt}
        path={`https://navitrends.uk/insights/${fields.slug || "votre-slug"}`}
      />
      <Field label="Titre SEO" value={fields.seoTitle} onChange={(v) => set("seoTitle", v)} hint="50–60 caractères" />
      <Field label="Description SEO" value={fields.seoDescription} onChange={(v) => set("seoDescription", v)} area hint="120–160 caractères" />
      {error && <p className="text-sm text-[#e31c23]">{error}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={pending} className="btn btn-red">
          {pending ? "Enregistrement…" : "Enregistrer"}
        </button>
        {id && (
          <button type="button" onClick={onDelete} className="btn btn-line">
            Supprimer
          </button>
        )}
      </div>
    </form>
  );
}
