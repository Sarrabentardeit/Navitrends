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

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<"services" | "industries" | null>(null);

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

        <nav className="hidden lg:flex items-center gap-9 text-[13px] text-[#0a1638]">
          <div
            className="relative"
            onMouseEnter={() => setPanel("services")}
            onMouseLeave={() => setPanel(null)}
          >
            <button className="py-5 hover:text-[#e31c23]">Services</button>
            {panel === "services" && (
              <div className="absolute left-0 top-full w-64 bg-white border border-[#e6e9f2] py-3 shadow-xl">
                {services.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-[#4b5573] hover:text-[#e31c23]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div
            className="relative"
            onMouseEnter={() => setPanel("industries")}
            onMouseLeave={() => setPanel(null)}
          >
            <button className="py-5 hover:text-[#e31c23]">Industries</button>
            {panel === "industries" && (
              <div className="absolute left-0 top-full w-56 bg-white border border-[#e6e9f2] py-3 shadow-xl">
                {industries.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-[#4b5573] hover:text-[#e31c23]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/case-studies" className="hover:text-[#e31c23]">Work</Link>
          <Link href="/about" className="hover:text-[#e31c23]">Firm</Link>
          <Link href="/blog" className="hover:text-[#e31c23]">Insights</Link>
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <a href="tel:+447418361296" className="text-[12px] text-[#4b5573] hover:text-[#0a1638]">
            +44 7418 361296
          </a>
          <Link href="/contact" className="btn btn-red h-10 px-5">
            Enquire
          </Link>
        </div>

        <button className="lg:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[#e6e9f2] px-6 py-8 bg-[#fbfbfd]">
          <div className="flex flex-col gap-3 mb-6 text-[15px]">
            {services.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/case-studies" onClick={() => setOpen(false)}>Work</Link>
            <Link href="/about" onClick={() => setOpen(false)}>Firm</Link>
            <Link href="/blog" onClick={() => setOpen(false)}>Insights</Link>
          </div>
          <Link href="/contact" className="btn btn-red" onClick={() => setOpen(false)}>
            Enquire
          </Link>
        </div>
      )}
    </header>
  );
}
