"use client";

import { useState } from "react";
import { Field, ImageField } from "@/components/admin/Fields";
import SeoPreview from "@/components/admin/SeoPreview";

type Settings = {
  siteTitle: string;
  seoTitle: string;
  seoDescription: string;
  phone: string;
  email: string;
  address: string;
  privacySlug: string;
  termsSlug: string;
  logo?: unknown;
  logoUrl?: string;
};

export default function SettingsForm({ initial }: { initial: Partial<Settings> | null }) {
  const [fields, setFields] = useState<Settings>({
    siteTitle: initial?.siteTitle ?? "Navitrends UK | Operational Systems, Automation, Data & AI",
    seoTitle: initial?.seoTitle ?? "",
    seoDescription: initial?.seoDescription ?? "",
    phone: initial?.phone ?? "+44 20 3996 2137",
    email: initial?.email ?? "contact@navitrends.com",
    address: initial?.address ?? "5 Brayford Square, London, United Kingdom E1 0SG",
    privacySlug: initial?.privacySlug ?? "privacy",
    termsSlug: initial?.termsSlug ?? "terms",
    logo: initial?.logo,
    logoUrl: initial?.logoUrl ?? "/logo.png",
  });
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  function set<K extends keyof Settings>(key: K, value: Settings[K]) {
    setFields((current) => ({ ...current, [key]: value }));
  }

  async function save() {
    setPending(true);
    setMessage("");
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });
    setPending(false);
    setMessage(res.ok ? "Réglages enregistrés. Rechargez le site public." : "Enregistrement impossible.");
  }

  return (
    <div className="max-w-xl space-y-4">
      <ImageField
        label="Logo"
        url={fields.logoUrl}
        onUploaded={({ url }) => setFields((current) => ({ ...current, logoUrl: url }))}
      />
      <Field label="Titre du site" value={fields.siteTitle} onChange={(v) => set("siteTitle", v)} />
      <SeoPreview title={fields.seoTitle || fields.siteTitle} description={fields.seoDescription} path="https://navitrends.uk" />
      <Field label="Titre SEO par défaut" value={fields.seoTitle} onChange={(v) => set("seoTitle", v)} hint="50–60 caractères" />
      <Field label="Description SEO" value={fields.seoDescription} onChange={(v) => set("seoDescription", v)} area hint="120–160 caractères" />
      <Field label="Téléphone (header + contact)" value={fields.phone} onChange={(v) => set("phone", v)} />
      <Field label="Email (contact + formulaire)" value={fields.email} onChange={(v) => set("email", v)} />
      <Field label="Adresse" value={fields.address} onChange={(v) => set("address", v)} />
      <div className="border border-[#e6e9f2] bg-[#fbfbfd] p-4">
        <p className="text-[11px] uppercase tracking-[0.16em] text-[#8b91a5]">Footer du site</p>
        <p className="mt-2 text-sm text-[#4b5573]">
          Privacy et Terms ne sont pas dans le menu. Ce sont les deux petits liens tout en bas du site.
        </p>
        <div className="mt-3 flex flex-wrap gap-4 text-sm">
          <a href="/admin/pages/privacy" className="text-[#e31c23]">
            Modifier Privacy
          </a>
          <a href="/p/privacy" target="_blank" rel="noreferrer" className="text-[#8b91a5]">
            Voir
          </a>
          <a href="/admin/pages/terms" className="text-[#e31c23]">
            Modifier Terms
          </a>
          <a href="/p/terms" target="_blank" rel="noreferrer" className="text-[#8b91a5]">
            Voir
          </a>
        </div>
      </div>
      <button type="button" onClick={save} disabled={pending} className="btn btn-red mt-4">
        {pending ? "Enregistrement…" : "Enregistrer"}
      </button>
      {message && <p className="text-sm text-[#4b5573]">{message}</p>}
    </div>
  );
}
