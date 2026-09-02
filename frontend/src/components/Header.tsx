"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";

const links = [
  { label: "What We Solve", href: "#solve" },
  { label: "Services", href: "#services" },
  { label: "How We Work", href: "#how-we-work" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Why Navitrends", href: "#why" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
      className={cn(
        "sticky top-0 z-50 bg-[#fbfbfd]/92 backdrop-blur-md",
        scrolled && "border-b border-[#e6e9f2]"
      )}
    >
      <div className="wrap flex items-center justify-between h-[4.4rem]">
        <Logo height={40} />

        <nav className="hidden lg:flex items-center gap-8 text-[13px] text-[#0a1638]">
          {links.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <a href="tel:+442039962137" className="text-[12px] text-[#4b5573] hover:text-[#0a1638]">
            +44 20 3996 2137
          </a>
          <a href="#contact" className="btn btn-red h-10 px-5">
            Book a Diagnostic
          </a>
        </div>

        <button className="lg:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[#e6e9f2] px-6 py-8 bg-[#fbfbfd]">
          <div className="flex flex-col gap-3 mb-6 text-[15px]">
            {links.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>
          <a href="#contact" className="btn btn-red" onClick={() => setOpen(false)}>
            Book a Diagnostic
          </a>
        </div>
      )}
    </header>
  );
}
