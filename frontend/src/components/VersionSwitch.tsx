"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function VersionSwitch() {
  const path = usePathname();
  const isA = path === "/a" || path.startsWith("/a/");

  return (
    <div className="fixed bottom-5 right-5 z-[80] flex items-center gap-2 rounded-full bg-[#0a1638] px-2 py-2 shadow-2xl">
      <Link
        href="/a"
        className={`rounded-full px-4 py-2 text-[11px] font-semibold tracking-wide uppercase ${
          isA ? "bg-[#e31c23] text-white" : "text-white/70 hover:text-white"
        }`}
      >
        Maquette A
      </Link>
      <Link
        href="/"
        className={`rounded-full px-4 py-2 text-[11px] font-semibold tracking-wide uppercase ${
          !isA ? "bg-[#e31c23] text-white" : "text-white/70 hover:text-white"
        }`}
      >
        Maquette B
      </Link>
    </div>
  );
}
