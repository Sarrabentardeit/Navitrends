"use client";

import { descriptionScore, ellipsize, titleScore } from "@/lib/seo";

function tone(score: "good" | "ok" | "bad") {
  if (score === "good") return "text-[#157347]";
  if (score === "ok") return "text-[#9a6700]";
  return "text-[#e31c23]";
}

export default function SeoPreview({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const t = titleScore(title);
  const d = descriptionScore(description);
  const tLen = title.trim().length;
  const dLen = description.trim().length;

  return (
    <div className="border border-[#e6e9f2] bg-[#fbfbfd] p-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-[#8b91a5]">Aperçu Google</p>
      <div className="mt-3 max-w-[600px]">
        <p className="truncate text-[14px] text-[#202124]">{path.replace(/^https?:\/\//, "")}</p>
        <p className="mt-1 text-[20px] leading-snug text-[#1a0dab]">{ellipsize(title || "Titre manquant", 60)}</p>
        <p className="mt-1 text-[14px] leading-snug text-[#4d5156]">{ellipsize(description || "Meta description manquante", 160)}</p>
      </div>
      <div className="mt-4 space-y-1 text-xs">
        <p className={tone(t)}>
          Titre : {tLen} caractères {t === "good" ? "(idéal 50–60)" : t === "ok" ? "(acceptable, visez 50–60)" : "(trop court ou trop long)"}
        </p>
        <p className={tone(d)}>
          Description : {dLen} caractères {d === "good" ? "(idéal 120–160)" : d === "ok" ? "(acceptable, visez 120–160)" : "(trop courte ou trop longue)"}
        </p>
      </div>
    </div>
  );
}
