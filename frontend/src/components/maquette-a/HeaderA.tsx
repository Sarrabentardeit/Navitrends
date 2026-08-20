"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";

const services = [
  { label: "ERPNext", href: "/services/erpnext" },
  { label: "Odoo ERP", href: "/services/erp" },
  { label: "Process automation", href: "/services/automation" },
  { label: "Digital engineering", href: "/services/digital-engineering" },
  { label: "Cyber security", href: "/services/cyber-security" },
  { label: "Custom software", href: "/services/custom-software" },
];

const industries = [
  { label: "Manufacturing", href: "/industries/manufacturing" },
  { label: "Banking", href: "/industries/banking" },
  { label: "Healthcare", href: "/industries/healthcare" },
  { label: "Higher education", href: "/industries/higher-education" },
  { label: "Logistics", href: "/industries/logistics" },
  { label: "Capital markets", href: "/industries/capital-markets" },
];

export default function HeaderA() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<"services" | "industries" | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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
    <header className="sticky top-0 z-50">
      <div className="brand-bar" aria-hidden>
        <span />
        <span />
        <span />
      </div>

      <div className="hidden md:flex items-center justify-between wrap h-9 text-[11px] tracking-wide text-white/80 bg-[#1c3a8a]">
        <span>NAVITRENDS LTD · London E1 0SG</span>
        <div className="flex items-center gap-6">
          <a href="tel:+447418361296" className="hover:text-white">+44 7418 361296</a>
          <a href="mailto:contact@navitrends.uk" className="hover:text-white">contact@navitrends.uk</a>
          <Link href="/careers" className="text-[#71cbcc] hover:text-white">
            Hiring — 1st line IT support
          </Link>
        </div>
      </div>

      <div className={cn("bg-white/95 backdrop-blur-md", scrolled && "shadow-[0_8px_24px_rgba(8,16,51,0.08)]")}>
        <div className="wrap flex items-center justify-between h-[4.35rem]">
          <Logo height={38} />
          <nav className="hidden lg:flex items-center gap-8 text-[13px] text-[#0d1430]">
            <div className="relative" onMouseEnter={() => setPanel("services")} onMouseLeave={() => setPanel(null)}>
              <button className="py-5 hover:text-[#1c3a8a]">Services</button>
              {panel === "services" && (
                <div className="absolute left-0 top-full w-[280px] bg-white border border-[#d5dbea] py-3 px-1 shadow-xl">
                  {services.map((item) => (
                    <Link key={item.href} href={item.href} className="block px-4 py-2 text-[#5b6178] hover:text-[#e31c23]">
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="relative" onMouseEnter={() => setPanel("industries")} onMouseLeave={() => setPanel(null)}>
              <button className="py-5 hover:text-[#1c3a8a]">Industries</button>
              {panel === "industries" && (
                <div className="absolute left-0 top-full w-[240px] bg-white border border-[#d5dbea] py-3 px-1 shadow-xl">
                  {industries.map((item) => (
                    <Link key={item.href} href={item.href} className="block px-4 py-2 text-[#5b6178] hover:text-[#e31c23]">
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/case-studies" className="hover:text-[#1c3a8a]">Work</Link>
            <Link href="/about" className="hover:text-[#1c3a8a]">Firm</Link>
            <Link href="/blog" className="hover:text-[#1c3a8a]">Insights</Link>
          </nav>
          <div className="hidden lg:block">
            <Link href="/contact" className="btn btn-red py-2.5 px-4 h-10">Enquire</Link>
          </div>
          <button className="lg:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
