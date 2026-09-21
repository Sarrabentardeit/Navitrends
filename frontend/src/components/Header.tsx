"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";
import LanguageSwitch from "@/components/LanguageSwitch";
import { useLocale, useT } from "@/i18n/LanguageProvider";
import { navFor } from "@/i18n/nav";
import { trackPhoneClick } from "@/lib/analytics";

export default function Header({ showInsights = false }: { showInsights?: boolean }) {
  const { locale } = useLocale();
  const t = useT();
  const nav = locale === "de" || locale === "es" ? navFor(locale) : t.nav;
  const phone = t.site.phone;
  const tel = phone.replace(/[^\d+]/g, "");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { label: nav.solve, href: "/#solve" },
    { label: nav.services, href: "/#services" },
    { label: nav.work, href: "/#how-we-work" },
    { label: nav.cases, href: "/#case-studies" },
    { label: nav.why, href: "/#why" },
    ...(showInsights ? [{ label: nav.insights, href: "/insights" }] : []),
    { label: nav.contact, href: "/#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      translate="no"
      className={cn(
        "notranslate sticky top-0 z-50 bg-[color-mix(in_srgb,var(--background)_92%,transparent)] backdrop-blur-md",
        scrolled && "border-b border-[#e6e9f2]"
      )}
    >
      <div className="wrap flex h-[4.4rem] items-center justify-between gap-4">
        <div className="shrink-0">
          <Logo height={40} />
        </div>

        <nav className="hidden min-w-0 items-center gap-4 text-[12px] whitespace-nowrap text-[var(--nt-navy)] xl:gap-6 xl:text-[13px] lg:flex">
          {links.map((item) => (
            <a key={item.href} href={item.href} className="nav-link shrink-0">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 xl:gap-5 lg:flex">
          <a
            href={`tel:${tel}`}
            className="whitespace-nowrap text-[12px] text-[var(--nt-muted)] hover:text-[var(--nt-navy)]"
            onClick={trackPhoneClick}
          >
            {phone}
          </a>
          <LanguageSwitch />
          <a href="/#contact" className="btn btn-red h-10 shrink-0 whitespace-nowrap px-4 tracking-[0.08em] xl:px-5">
            {nav.book}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitch />
          <button className="p-2" onClick={() => setOpen((v) => !v)} aria-label={nav.menu}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[#e6e9f2] bg-[#fbfbfd] px-6 py-8 lg:hidden">
          <div className="mb-6 flex flex-col gap-3 text-[15px]">
            {links.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>
          <a href="/#contact" className="btn btn-red" onClick={() => setOpen(false)}>
            {nav.book}
          </a>
        </div>
      )}
    </header>
  );
}
