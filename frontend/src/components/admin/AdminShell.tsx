"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ExternalLink, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const groups = [
  {
    label: "Le site",
    items: [
      { href: "/admin", label: "Tableau de bord" },
      { href: "/admin/home", label: "Accueil" },
      { href: "/admin/insights", label: "Blog" },
      { href: "/admin/images", label: "Images" },
    ],
  },
  {
    label: "Réglages",
    items: [
      { href: "/admin/appearance", label: "Apparence" },
      { href: "/admin/settings", label: "Logo & contact" },
    ],
  },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-dvh w-full flex-1 bg-[#f4f5f8] text-[#0a1638]">
      {open ? (
        <button
          type="button"
          aria-label="Fermer le menu"
          className="fixed inset-0 z-30 bg-[#0a1638]/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <aside
        className={cn(
          "flex min-h-dvh w-64 shrink-0 flex-col bg-[#0a1638] text-white",
          "max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-40 max-lg:h-dvh max-lg:transition-transform max-lg:duration-200",
          open ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">Navitrends UK</p>
            <p className="serif mt-1 text-xl">Back-office</p>
          </div>
          <button type="button" className="lg:hidden text-white/70" onClick={() => setOpen(false)} aria-label="Fermer">
            <X size={20} />
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-6 p-3">
          {groups.map((group) => (
            <div key={group.label}>
              <p className="px-3 pb-2 text-[10px] uppercase tracking-[0.18em] text-white/35">{group.label}</p>
              <div className="flex flex-col gap-1">
                {group.items.map((link) => {
                  const active = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "px-3 py-2 text-sm",
                        active ? "bg-white/10 text-white" : "text-white/65 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="border-t border-white/10 p-4">
          <a href="/" target="_blank" rel="noreferrer" className="mb-3 flex items-center gap-2 text-sm text-white/55 hover:text-white">
            Voir le site
            <ExternalLink size={14} />
          </a>
          <button type="button" onClick={logout} className="text-sm text-white/55 hover:text-white">
            Déconnexion
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-3 border-b border-[#e6e9f2] bg-white px-4 py-3 lg:px-10">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setOpen(true)} className="text-[#0a1638] lg:hidden" aria-label="Ouvrir le menu">
              <Menu size={22} />
            </button>
            <p className="text-sm text-[#8b91a5]">Console de contenu · navitrends.uk</p>
          </div>
          <a href="/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-[#0a1638] hover:text-[#e31c23]">
            Voir le site
            <ExternalLink size={14} />
          </a>
        </div>
        <div className="w-full flex-1 px-4 py-6 sm:px-8 lg:px-10 xl:px-14 2xl:px-20">{children}</div>
      </div>
    </div>
  );
}
