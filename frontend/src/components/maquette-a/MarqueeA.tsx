const ITEMS = [
  "ERP",
  "Automation",
  "Business Intelligence",
  "Odoo",
  "ERPNext",
  "Cyber Security",
  "Digital Engineering",
  "Custom Software",
];

export default function MarqueeA() {
  const row = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden border-t border-white/10 bg-[#07102f]/55">
      <div className="marquee-track flex w-max items-center py-4">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center">
            <span className="px-7 text-[0.78rem] font-medium tracking-[0.2em] uppercase text-[#71cbcc]">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#e31c23]" />
          </span>
        ))}
      </div>
    </div>
  );
}
