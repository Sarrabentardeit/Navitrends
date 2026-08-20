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

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden border-y border-[#e6e9f2] bg-[#fbfbfd]">
      <div className="marquee-track flex w-max items-center py-3">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center">
            <span className="px-6 text-[0.68rem] font-medium tracking-[0.2em] uppercase text-[#1c3a8a]">
              {item}
            </span>
            <span className="text-[#e31c23]/70">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
