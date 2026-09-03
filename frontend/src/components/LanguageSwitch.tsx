"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { useLocale } from "@/i18n/LanguageProvider";
import type { Locale } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const options: { id: Locale; label: string }[] = [
  { id: "en", label: "English" },
  { id: "fr", label: "Français" },
];

export default function LanguageSwitch({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.id === locale) ?? options[0];

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-1.5 text-[12px] text-[#4b5573] hover:text-[#0a1638]",
          compact && "h-10"
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={locale === "fr" ? "Langue" : "Language"}
        onClick={() => setOpen((v) => !v)}
      >
        <Globe size={14} strokeWidth={1.75} />
        <span>{current.label}</span>
        <ChevronDown size={12} className={cn("transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[8.5rem] border border-[#e6e9f2] bg-white py-1 shadow-[0_12px_40px_rgba(10,22,56,0.12)]"
        >
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              role="option"
              aria-selected={option.id === locale}
              className={cn(
                "block w-full px-3.5 py-2 text-left text-[13px]",
                option.id === locale ? "bg-[#f4f6fb] text-[#e31c23]" : "text-[#0a1638] hover:bg-[#fbfbfd]"
              )}
              onClick={() => {
                setLocale(option.id);
                setOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
