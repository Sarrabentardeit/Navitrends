"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SeedButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  async function seed() {
    if (!confirm("Réimporter les textes actuels du site (accueil, réglages, Privacy, Terms) dans le back-office ?")) return;
    setPending(true);
    setMessage("");
    const res = await fetch("/api/admin/seed", { method: "POST" });
    setPending(false);
    if (!res.ok) {
      setMessage("Import impossible. Réessayez.");
      return;
    }
    setMessage("Textes du site copiés dans le back-office.");
    router.refresh();
  }

  return (
    <div className="mt-10">
      <button type="button" onClick={seed} disabled={pending} className="btn btn-line">
        {pending ? "Import…" : "Réimporter les textes du site"}
      </button>
      {message && <p className="mt-3 text-sm text-[#4b5573]">{message}</p>}
    </div>
  );
}
