"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RichEditor from "@/components/admin/RichEditor";
import SeoPreview from "@/components/admin/SeoPreview";

type PageFields = {
  title: string;
  slug: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
};

export default function PageForm({ id, initial }: { id?: string; initial?: Partial<PageFields> }) {
  const router = useRouter();
  const [fields, setFields] = useState<PageFields>({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    content: initial?.content ?? "",
    seoTitle: initial?.seoTitle ?? "",
    seoDescription: initial?.seoDescription ?? "",
  });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function set<K extends keyof PageFields>(key: K, value: PageFields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    const res = await fetch(id ? `/api/admin/pages/${id}` : "/api/admin/pages", {
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
    router.push("/admin/pages");
    router.refresh();
  }

  async function onDelete() {
    if (!id || !confirm("Supprimer cette page ?")) return;
    await fetch(`/api/admin/pages/${id}`, { method: "DELETE" });
    router.push("/admin/pages");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-5">
      <Field label="Titre" value={fields.title} onChange={(v) => set("title", v)} />
      <Field label="Slug URL" value={fields.slug} onChange={(v) => set("slug", v)} hint="Adresse publique : navitrends.uk/p/privacy par exemple. Privacy et Terms = liens du footer." />
      <RichEditor label="Contenu" value={fields.content} onChange={(v) => set("content", v)} />
      <SeoPreview
        title={fields.seoTitle || fields.title}
        description={fields.seoDescription}
        path={`https://navitrends.uk/p/${fields.slug || "slug"}`}
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

function Field({
  label,
  value,
  onChange,
  area,
  rows = 4,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  area?: boolean;
  rows?: number;
  hint?: string;
}) {
  const cls =
    "mt-2 w-full border border-[#e6e9f2] bg-white px-3 py-2 text-sm text-[#0a1638] outline-none focus:border-[#0a1638]";
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.16em] text-[#8b91a5]">{label}</span>
      {area ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className={cls} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
      {hint && <span className="mt-1 block text-xs text-[#8b91a5]">{hint}</span>}
    </label>
  );
}
