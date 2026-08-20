"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import SectionHead from "@/components/SectionHead";
import SoftwareFrame from "@/components/SoftwareFrame";

const services = [
  {
    n: "01",
    title: "ERPNext",
    href: "/services/erpnext",
    text: "Open-source ERP for manufacturers and distributors who want control of their stack. Frappe, done properly.",
    image: "/images/erpnext-dashboard.jpg",
  },
  {
    n: "02",
    title: "Odoo ERP",
    href: "/services/erp",
    text: "Full-cycle programmes. Process first, then configuration, modules and go-live — never a generic template on top of the business.",
    image: "/images/odoo-apps.jpg",
  },
  {
    n: "03",
    title: "Process automation",
    href: "/services/automation",
    text: "n8n, AI agents and the glue between systems that do not talk. Approvals, documents, reporting — we remove the re-keying, not the judgement.",
    image: "/images/n8n-ai.jpg",
  },
  {
    n: "04",
    title: "Digital engineering",
    href: "/services/digital-engineering",
    text: "Dashboards, portals and data pipelines around the ERP. One team, so the architecture stays coherent.",
    image: "/images/software-dashboard.jpg",
  },
  {
    n: "05",
    title: "Cyber security",
    href: "/services/cyber-security",
    text: "Audit, hardening, access and recovery — for operational systems, not a slide deck.",
    image: "/images/cyber-soc.jpg",
  },
  {
    n: "06",
    title: "Custom software",
    href: "/services/custom-software",
    text: "When the package does not fit, we write the piece that does. Then we hand it over.",
    image: "/images/custom-code.jpg",
  },
];

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section className="bg-[#fbfbfd]">
      <div className="wrap py-20 lg:py-28">
        <SectionHead n="01" kicker="Practice" title="Six disciplines, one technical core.">
          The same engineers who map the process also configure the ERP, wire
          the automation and stand up the reporting.
        </SectionHead>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <ol className="lg:col-span-6">
            {services.map((item, i) => (
              <li key={item.n}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`w-full py-4 flex items-baseline gap-5 text-left border-t border-[#e6e9f2] last:border-b ${
                    i === services.length - 1 ? "border-b" : ""
                  }`}
                >
                  <span
                    className={`text-[11px] tracking-[0.18em] w-7 ${
                      active === i ? "text-[#e31c23]" : "text-[#b0b5c4]"
                    }`}
                  >
                    {item.n}
                  </span>
                  <span
                    className={`serif text-[1.7rem] sm:text-[1.95rem] leading-none transition-colors duration-200 ${
                      active === i ? "text-[#0a1638]" : "text-[#9aa0b3]"
                    }`}
                  >
                    {item.title}
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.n}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SoftwareFrame
                  src={current.image}
                  alt={current.title}
                  label={current.title}
                  priority={active === 0}
                  contain={current.title === "Odoo ERP"}
                />
                <p className="mt-6 text-[#4b5573] leading-relaxed max-w-lg">
                  {current.text}
                </p>
                <Link
                  href={current.href}
                  className="mt-5 inline-block text-sm text-[#e31c23] border-b border-[#e31c23] pb-px"
                >
                  Explore {current.title}
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
