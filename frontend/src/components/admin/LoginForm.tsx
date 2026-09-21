"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const from = useSearchParams().get("from") || "/admin";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setPending(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error || "Connexion impossible.");
      return;
    }
    router.replace(from.startsWith("/admin") ? from : "/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 space-y-5">
      <label className="block">
        <span className="text-[11px] uppercase tracking-[0.18em] text-[#8b91a5]">Mot de passe</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="mt-2 w-full border border-[#e6e9f2] bg-white px-4 py-3 text-[#0a1638] outline-none focus:border-[#0a1638]"
        />
      </label>
      {error && <p className="text-sm text-[#e31c23]">{error}</p>}
      <button type="submit" disabled={pending} className="btn btn-red w-full">
        {pending ? "Connexion…" : "Entrer"}
      </button>
    </form>
  );
}
