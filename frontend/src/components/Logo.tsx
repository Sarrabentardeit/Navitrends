"use client";

import Image from "next/image";
import Link from "next/link";
import { useT } from "@/i18n/LanguageProvider";

export default function Logo({ height = 40 }: { height?: number }) {
  const t = useT();
  const width = Math.round(height * (520 / 180));
  const src = t.site.logoUrl || "/logo.png";

  return (
    <Link href="/" className="inline-flex items-center" aria-label="Navitrends UK">
      <Image
        src={src}
        alt="Navitrends"
        width={width}
        height={height}
        unoptimized={src.startsWith("http")}
        priority
        style={{ height, width: "auto" }}
      />
    </Link>
  );
}
