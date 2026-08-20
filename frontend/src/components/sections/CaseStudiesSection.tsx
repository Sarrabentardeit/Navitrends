import Link from "next/link";
import SectionHead from "@/components/SectionHead";

const cases = [
  {
    n: "01",
    stack: "Odoo ERP",
    sector: "Plastics manufacturing",
    title: "ERP implementation for plastics manufacturing",
    text: "A plastics manufacturer wanted one operational picture across production, inventory and finance. We implemented Odoo so the plant and the ledger run on the same system.",
    href: "/case-studies/plastics-manufacturing",
  },
  {
    n: "02",
    stack: "n8n · Automation",
    sector: "Business development",
    title: "AI sales prospecting agent",
    text: "A business development team was spending the morning building lists. We built an agent that identifies, enriches and sequences prospects.",
    href: "/case-studies/ai-sales-agent",
  },
  {
    n: "03",
    stack: "Automation · reporting",
    sector: "Food safety & hygiene",
    title: "Laboratory report automation",
    text: "A food hygiene inspection firm needed audit packs generated from lab data the same afternoon — without a clerk in the middle.",
    href: "/case-studies/food-safety-automation",
  },
];

export default function CaseStudiesSection() {
  return (
    <section className="bg-[#fbfbfd]">
      <div className="wrap py-20 lg:py-28">
        <SectionHead n="03" kicker="Selected work" title="What the work looks like when it is finished.">
          <Link href="/case-studies" className="text-sm text-[#e31c23] border-b border-[#e31c23] pb-px">
            All case studies
          </Link>
        </SectionHead>

        <div>
          {cases.map((item) => (
            <article
              key={item.href}
              className="grid lg:grid-cols-12 gap-6 lg:gap-10 py-10 lg:py-12 border-t border-[#e6e9f2] last:border-b"
            >
              <div className="lg:col-span-3">
                <p className="text-[11px] tracking-[0.18em] text-[#e31c23]">{item.n}</p>
                <p className="mt-3 text-sm text-[#1c3a8a]">{item.stack}</p>
                <p className="mt-1 text-sm text-[#8b91a5]">{item.sector}</p>
              </div>
              <div className="lg:col-span-6">
                <h3 className="serif text-[1.7rem] sm:text-[1.95rem] leading-snug text-[#0a1638]">
                  {item.title}
                </h3>
                <p className="mt-4 text-[#4b5573] leading-relaxed max-w-xl">
                  {item.text}
                </p>
              </div>
              <div className="lg:col-span-3 lg:flex lg:items-end lg:justify-end">
                <Link
                  href={item.href}
                  className="text-sm text-[#0a1638] border-b border-[#0a1638] pb-px hover:text-[#e31c23] hover:border-[#e31c23]"
                >
                  Read the case
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
