"use client";

import { useState } from "react";
import { labelForSection, type AppearanceRecord } from "@/lib/appearance";

export default function AppearanceForm({ initial }: { initial: AppearanceRecord }) {
  const [colors, setColors] = useState(initial.colors);
  const [sections, setSections] = useState(initial.sections);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  function move(index: number, dir: -1 | 1) {
    const next = index + dir;
    if (next < 0 || next >= sections.length) return;
    const copy = [...sections];
    [copy[index], copy[next]] = [copy[next], copy[index]];
    setSections(copy);
  }

  async function save() {
    setPending(true);
    setMessage("");
    const res = await fetch("/api/admin/appearance", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ colors, sections }),
    });
    setPending(false);
    setMessage(res.ok ? "Apparence enregistrée. Rechargez le site public." : "Enregistrement impossible.");
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <h2 className="serif text-2xl">Couleurs</h2>
        <p className="mt-2 mb-6 text-sm text-[#4b5573]">Comme dans WordPress → Apparence. Ces couleurs s’appliquent aux boutons, textes et fond du site.</p>
        <div className="space-y-4">
          <ColorField label="Texte / titres (navy)" value={colors.navy} onChange={(navy) => setColors({ ...colors, navy })} />
          <ColorField label="Boutons (rouge)" value={colors.red} onChange={(red) => setColors({ ...colors, red })} />
          <ColorField label="Accent (cyan)" value={colors.cyan} onChange={(cyan) => setColors({ ...colors, cyan })} />
          <ColorField label="Fond de page" value={colors.background} onChange={(background) => setColors({ ...colors, background })} />
          <ColorField label="Texte secondaire" value={colors.muted} onChange={(muted) => setColors({ ...colors, muted })} />
        </div>
      </div>

      <div>
        <h2 className="serif text-2xl">Emplacement des blocs</h2>
        <p className="mt-2 mb-6 text-sm text-[#4b5573]">Ordre des sections sur la homepage. Montez, descendez ou masquez un bloc.</p>
        <div className="divide-y divide-[#e6e9f2] border border-[#e6e9f2] bg-white">
          {sections.map((section, index) => (
            <div key={section.id} className="flex items-center gap-3 px-4 py-3">
              <label className="flex min-w-0 flex-1 items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={section.visible}
                  onChange={(event) =>
                    setSections(sections.map((row, i) => (i === index ? { ...row, visible: event.target.checked } : row)))
                  }
                />
                <span className="truncate">{labelForSection(section.id)}</span>
              </label>
              <button type="button" className="text-xs text-[#8b91a5]" onClick={() => move(index, -1)} disabled={index === 0}>
                Haut
              </button>
              <button type="button" className="text-xs text-[#8b91a5]" onClick={() => move(index, 1)} disabled={index === sections.length - 1}>
                Bas
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2">
        <button type="button" onClick={save} disabled={pending} className="btn btn-red">
          {pending ? "Enregistrement…" : "Enregistrer l’apparence"}
        </button>
        {message ? <p className="mt-3 text-sm text-[#4b5573]">{message}</p> : null}
      </div>
    </div>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="flex items-center justify-between gap-4 border border-[#e6e9f2] bg-white px-4 py-3">
      <span className="text-sm text-[#0a1638]">{label}</span>
      <span className="flex items-center gap-2">
        <input type="color" value={value} onChange={(event) => onChange(event.target.value)} className="h-9 w-12 cursor-pointer bg-transparent" />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-28 border border-[#e6e9f2] px-2 py-1 text-xs uppercase"
        />
      </span>
    </label>
  );
}
