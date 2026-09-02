import Logo from "@/components/Logo";

const places = [
  { region: "United Kingdom", detail: "5 Brayford Square, London E1 0SG" },
  { region: "Europe", detail: "United Kingdom · France" },
  { region: "North Africa", detail: "Tunisia engineering hub" },
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
          <a href="#services" className="hover:text-[#e31c23]">
            Services
          </a>
          <a href="#case-studies" className="hover:text-[#e31c23]">
            Case Studies
          </a>
          <a href="#contact" className="hover:text-[#e31c23]">
            Contact
          </a>
        </nav>
      </div>
      <div className="wrap py-4 border-t border-[#e6e9f2] flex justify-between text-[11px] text-[#8b91a5]">
        <p>© {new Date().getFullYear()} Navitrends Ltd · 5 Brayford Square, London, United Kingdom E1 0SG</p>
        <div className="flex gap-5">
          <a href="#contact">Privacy</a>
          <a href="#contact">Terms</a>
        </div>
      </div>
    </footer>
  );
}
