"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { MediaRecord } from "@/lib/media";

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

async function refreshList() {
  const res = await fetch("/api/admin/media");
  return (await res.json()) as MediaRecord[];
}

export default function MediaLibrary({ initial }: { initial: MediaRecord[] }) {
  const [items, setItems] = useState(initial);
  const [query, setQuery] = useState("");
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [dragging, setDragging] = useState(false);
  const [name, setName] = useState("");
  const [alt, setAlt] = useState("");
  const [title, setTitle] = useState("");

  const selected = items.find((item) => item.url === selectedUrl) ?? null;

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return items;
    return items.filter((item) => `${item.name} ${item.title} ${item.alt} ${item.url}`.toLowerCase().includes(needle));
  }, [items, query]);

  function open(item: MediaRecord) {
    setSelectedUrl(item.url);
    setName(item.name);
    setAlt(item.alt);
    setTitle(item.title);
    setMessage("");
  }

  async function sync(next?: MediaRecord[], select?: string | null) {
    const list = next ?? (await refreshList());
    setItems(list);
    const url = select !== undefined ? select : selectedUrl;
    if (!url) return;
    const current = list.find((item) => item.url === url);
    if (current) {
      setSelectedUrl(current.url);
      setName(current.name);
      setAlt(current.alt);
      setTitle(current.title);
    } else {
      setSelectedUrl(null);
    }
  }

  async function uploadFiles(files: FileList | File[]) {
    const list = Array.from(files).filter((file) => file.type.startsWith("image/") || /\.(png|jpe?g|webp|gif|svg|ico)$/i.test(file.name));
    if (!list.length) return;
    setPending(true);
    setMessage("");
    const body = new FormData();
    for (const file of list) body.append("file", file);
    const res = await fetch("/api/admin/media", { method: "POST", body });
    const data = (await res.json()) as { items?: MediaRecord[]; error?: string };
    setPending(false);
    if (!res.ok) {
      setMessage(data.error || "Ajout impossible.");
      return;
    }
    await sync(data.items);
    setMessage(list.length > 1 ? `${list.length} images ajoutées.` : "Image ajoutée.");
  }

  async function saveEdits() {
    if (!selected) return;
    setPending(true);
    setMessage("");
    const body = new FormData();
    body.set("url", selected.url);
    body.set("name", name);
    body.set("alt", alt);
    body.set("title", title);
    const res = await fetch("/api/admin/media", { method: "PATCH", body });
    const data = (await res.json()) as MediaRecord & { error?: string };
    setPending(false);
    if (!res.ok) {
      setMessage(data.error || "Enregistrement impossible.");
      return;
    }
    setSelectedUrl(data.url);
    await sync(undefined, data.url);
    setMessage("Modifications enregistrées.");
  }

  async function replaceFile(file: File) {
    if (!selected) return;
    setPending(true);
    const body = new FormData();
    body.set("url", selected.url);
    body.set("file", file);
    const res = await fetch("/api/admin/media", { method: "PATCH", body });
    setPending(false);
    if (!res.ok) {
      setMessage("Remplacement impossible.");
      return;
    }
    await sync();
    setMessage("Fichier remplacé. Le site utilise déjà cette image.");
  }

  async function apply(kind: "logo" | "cta") {
    if (!selected) return;
    setPending(true);
    const body = new FormData();
    body.set("url", selected.url);
    body.set("apply", kind);
    const res = await fetch("/api/admin/media", { method: "PATCH", body });
    setPending(false);
    if (!res.ok) {
      setMessage("Impossible d’appliquer cette image.");
      return;
    }
    await sync();
    setMessage(kind === "logo" ? "Image définie comme logo du site." : "Image définie comme visuel d’accueil.");
  }

  async function remove(item: MediaRecord) {
    if (!item.deletable) return;
    if (!confirm(`Supprimer définitivement « ${item.name} » ?`)) return;
    setPending(true);
    const res = await fetch(`/api/admin/media?url=${encodeURIComponent(item.url)}`, { method: "DELETE" });
    setPending(false);
    if (!res.ok) {
      setMessage("Suppression impossible.");
      return;
    }
    if (selectedUrl === item.url) setSelectedUrl(null);
    await sync();
    setMessage("Image supprimée.");
  }

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        if (event.dataTransfer.files.length) void uploadFiles(event.dataTransfer.files);
      }}
      className={dragging ? "ring-2 ring-[#e31c23] ring-offset-4" : ""}
    >
      <div className="flex flex-wrap items-center gap-3">
        <label className="btn btn-red inline-flex cursor-pointer">
          {pending ? "Traitement…" : "Ajouter"}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={pending}
            onChange={(event) => {
              if (event.target.files) void uploadFiles(event.target.files);
              event.target.value = "";
            }}
          />
        </label>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Rechercher une image…"
          className="min-w-[16rem] flex-1 border border-[#e6e9f2] bg-white px-3 py-2 text-sm outline-none focus:border-[#0a1638]"
        />
      </div>
      <p className="mt-3 text-sm text-[#8b91a5]">Glissez-déposez des fichiers ici, ou cliquez sur Ajouter. Puis ouvrez une image pour la modifier.</p>
      {message ? <p className="mt-2 text-sm text-[#0a1638]">{message}</p> : null}

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div>
          {filtered.length === 0 ? (
            <p className="border border-[#e6e9f2] bg-white p-6 text-sm text-[#5b6178]">Aucune image. Ajoutez le logo ou les visuels du site.</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {filtered.map((item) => (
                <button
                  key={item.url}
                  type="button"
                  onClick={() => open(item)}
                  className={`border bg-white text-left ${selectedUrl === item.url ? "border-[#0a1638]" : "border-[#e6e9f2] hover:border-[#0a1638]"}`}
                >
                  <div className="flex h-36 items-center justify-center bg-[#fbfbfd] p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${item.url}?v=${item.mtime}`} alt={item.alt || item.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="p-3">
                    <p className="truncate text-sm text-[#0a1638]">{item.title || item.name}</p>
                    <p className="truncate text-xs text-[#8b91a5]">{item.usage.length ? item.usage[0].label : "Non utilisée"}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <aside className="h-fit border border-[#e6e9f2] bg-white p-5 xl:sticky xl:top-6">
          {!selected ? (
            <p className="text-sm text-[#5b6178]">Sélectionnez une image pour la modifier, la remplacer ou la supprimer.</p>
          ) : (
            <div className="space-y-4">
              <div className="flex h-44 items-center justify-center bg-[#fbfbfd] p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${selected.url}?v=${selected.mtime}`} alt={selected.alt || selected.name} className="max-h-full max-w-full object-contain" />
              </div>
              <p className="text-xs text-[#8b91a5]">
                {formatSize(selected.size)} · {selected.url}
              </p>
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.16em] text-[#8b91a5]">Nom du fichier</span>
                <input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full border border-[#e6e9f2] px-3 py-2 text-sm outline-none focus:border-[#0a1638]" />
              </label>
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.16em] text-[#8b91a5]">Titre</span>
                <input value={title} onChange={(event) => setTitle(event.target.value)} className="mt-2 w-full border border-[#e6e9f2] px-3 py-2 text-sm outline-none focus:border-[#0a1638]" />
              </label>
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.16em] text-[#8b91a5]">Texte alternatif</span>
                <textarea value={alt} onChange={(event) => setAlt(event.target.value)} rows={3} className="mt-2 w-full border border-[#e6e9f2] px-3 py-2 text-sm outline-none focus:border-[#0a1638]" />
              </label>
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#8b91a5]">Utilisée sur le site</p>
                {selected.usage.length ? (
                  <ul className="mt-2 space-y-1">
                    {selected.usage.map((use) => (
                      <li key={use.href + use.label}>
                        <Link href={use.href} className="text-sm text-[#e31c23]">
                          {use.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-[#8b91a5]">Pas encore branchée au site.</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button type="button" disabled={pending} onClick={() => void saveEdits()} className="btn btn-red">
                  Enregistrer
                </button>
                <label className="btn btn-line cursor-pointer">
                  Remplacer le fichier
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) void replaceFile(file);
                      event.target.value = "";
                    }}
                  />
                </label>
                <button type="button" disabled={pending} onClick={() => void apply("logo")} className="btn btn-line">
                  Utiliser comme logo
                </button>
                <button type="button" disabled={pending} onClick={() => void apply("cta")} className="btn btn-line">
                  Utiliser à l’accueil
                </button>
                {selected.deletable ? (
                  <button type="button" disabled={pending} onClick={() => void remove(selected)} className="text-left text-sm text-[#e31c23]">
                    Supprimer
                  </button>
                ) : (
                  <p className="text-xs text-[#8b91a5]">Fichier système : remplaçable, non supprimable.</p>
                )}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
