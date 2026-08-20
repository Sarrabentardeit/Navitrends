import Link from "next/link";
import Logo from "@/components/Logo";

const services = [
  { label: "ERPNext", href: "/services/erpnext" },
  { label: "Odoo ERP", href: "/services/erp" },
  { label: "Process automation", href: "/services/automation" },
  { label: "Digital engineering", href: "/services/digital-engineering" },
  { label: "Cyber security", href: "/services/cyber-security" },
  { label: "Custom software", href: "/services/custom-software" },
];

const firm = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/case-studies" },
  { label: "Careers", href: "/careers" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function FooterA() {
  return (
    <footer className="bg-[#081033] text-white">
      <div className="brand-bar" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <div className="wrap py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="bg-white inline-flex px-3 py-2 mb-5">
            <Logo height={40} />
          </div>
          <p className="text-white/65 max-w-sm text-[0.95rem]">
            Systems engineering for operators. London commercial office,
            delivery team in Tunisia, clients across Europe, North Africa and
            the Middle East.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#71cbcc] mb-4">Practice</p>
          <ul className="space-y-2 text-sm">
            {services.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/65 hover:text-white">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#71cbcc] mb-4">Firm</p>
          <ul className="space-y-2 text-sm">
            {firm.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/65 hover:text-white">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2 text-sm text-white/65 space-y-1">
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#71cbcc] mb-4">Contact</p>
          <p>London E1 0SG</p>
          <p><a href="mailto:contact@navitrends.uk" className="hover:text-[#71cbcc]">contact@navitrends.uk</a></p>
          <p><a href="tel:+447418361296" className="hover:text-[#71cbcc]">+44 7418 361296</a></p>
        </div>
      </div>
      <div className="wrap py-5 border-t border-white/10 text-[11px] text-white/40">
        © {new Date().getFullYear()} Navitrends Ltd. Registered in England & Wales.
      </div>
    </footer>
  );
}
