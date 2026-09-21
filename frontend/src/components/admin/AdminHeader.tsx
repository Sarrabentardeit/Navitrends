import type { ReactNode } from "react";

export default function AdminHeader({
  kicker,
  title,
  description,
  action,
}: {
  kicker: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#8b91a5]">{kicker}</p>
        <h1 className="serif mt-2 text-4xl">{title}</h1>
        {description ? <p className="mt-3 text-[#4b5573] leading-relaxed">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function PageRole({ slug }: { slug: string }) {
  if (slug === "privacy") {
    return <span className="bg-[#eef2ff] px-2 py-1 text-[11px] uppercase tracking-[0.12em] text-[#1c3a8a]">Privacy · Footer</span>;
  }
  if (slug === "terms") {
    return <span className="bg-[#fff4f0] px-2 py-1 text-[11px] uppercase tracking-[0.12em] text-[#9a3412]">Terms · Footer</span>;
  }
  return <span className="bg-[#f4f5f8] px-2 py-1 text-[11px] uppercase tracking-[0.12em] text-[#5b6178]">Page publique</span>;
}

export function formatAdminDate(value?: string) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}
