"use client";

import { useEffect, useState } from "react";
import type { MediaRecord } from "@/lib/media";

const input =
  "mt-2 w-full border border-[#e6e9f2] bg-white px-3 py-2 text-sm text-[#0a1638] outline-none focus:border-[#0a1638]";

export function Field({
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
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.16em] text-[#8b91a5]">{label}</span>
      {area ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className={input} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={input} />
      )}
      {hint && <span className="mt-1 block text-xs text-[#8b91a5]">{hint}</span>}
    </label>
  );
}

export function ImageField({
  label,
  url,
  onUploaded,
}: {
  label: string;
  url?: string;
  onUploaded: (payload: { url: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [library, setLibrary] = useState<MediaRecord[] | null>(null);

  useEffect(() => {
    if (!open) return;
    fetch("/api/admin/media")
      .then((res) => res.json())
      .then((data: MediaRecord[]) => setLibrary(Array.isArray(data) ? data : []))
      .catch(() => setLibrary([]));
  }, [open]);

  async function upload(file: File) {
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body });
    const data = (await res.json()) as { url?: string };
    if (data.url) onUploaded({ url: data.url });
  }

  return (
    <div>
      <span className="text-[11px] uppercase tracking-[0.16em] text-[#8b91a5]">{label}</span>
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="" className="mt-2 max-h-28 border border-[#e6e9f2] object-contain" />
      ) : null}
      <div className="mt-2 flex flex-wrap gap-3">
        <label className="cursor-pointer text-sm text-[#e31c23]">
          Téléverser
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (file) await upload(file);
            }}
          />
        </label>
        <button type="button" className="text-sm text-[#0a1638]" onClick={() => setOpen(true)}>
          Choisir dans Images
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a1638]/50 p-4">
          <div className="max-h-[80vh] w-full max-w-3xl overflow-auto border border-[#e6e9f2] bg-white p-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="serif text-2xl">Images</p>
              <button type="button" className="text-sm text-[#8b91a5]" onClick={() => setOpen(false)}>
                Fermer
              </button>
            </div>
            {!library ? (
              <p className="text-sm text-[#5b6178]">Chargement…</p>
            ) : library.length === 0 ? (
              <p className="text-sm text-[#5b6178]">Aucune image. Ajoutez-en dans le menu Images.</p>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {library.map((item) => (
                  <button
                    key={item.url}
                    type="button"
                    className="border border-[#e6e9f2] p-2 hover:border-[#0a1638]"
                    onClick={() => {
                      onUploaded({ url: item.url });
                      setOpen(false);
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.url} alt={item.name} className="h-24 w-full object-contain" />
                    <span className="mt-2 block truncate text-xs text-[#8b91a5]">{item.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
