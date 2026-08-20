import Link from "next/link";
import Logo from "@/components/Logo";

const places = [
  { region: "United Kingdom", detail: "London E1" },
  { region: "Europe", detail: "FR · DE · Benelux" },
  { region: "North Africa", detail: "Tunisia" },
  { region: "Middle East", detail: "Gulf" },
];

export default function Footer() {
  return (
    <footer className="bg-[#fbfbfd] border-t border-[#e6e9f2]">
      <div className="wrap py-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <Logo height={36} />

        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-[#4b5573]">
          {places.map((p) => (
            <p key={p.region}>
              <span className="text-[#0a1638]">{p.region}</span>
              <span className="text-[#8b91a5]"> — {p.detail}</span>
            </p>
          ))}
        </div>

        <nav className="flex flex-wrap gap-5 text-sm text-[#4b5573]">
          <Link href="/case-studies" className="hover:text-[#e31c23]">Work</Link>
          <Link href="/about" className="hover:text-[#e31c23]">Firm</Link>
          <Link href="/careers" className="hover:text-[#e31c23]">Careers</Link>
          <Link href="/contact" className="hover:text-[#e31c23]">Contact</Link>
        </nav>
      </div>
      <div className="wrap py-4 border-t border-[#e6e9f2] flex justify-between text-[11px] text-[#8b91a5]">
        <p>© {new Date().getFullYear()} Navitrends Ltd. Registered in England & Wales.</p>
        <div className="flex gap-5">
          <Link href="#">Privacy</Link>
          <Link href="#">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
