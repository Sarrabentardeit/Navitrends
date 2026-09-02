import Reveal from "@/components/Reveal";

const engage = [
  {
    n: "01 — Discover",
    title: "One process. One bottleneck. One measurable opportunity.",
    deliverable: "Opportunity Brief",
  },
  {
    n: "02 — Prove",
    title: "One use case. One pilot. One measurable objective.",
    deliverable: "Working pilot + measured result",
  },
  {
    n: "03 — Scale",
    title: "ERP · Automation · AI · Custom Engineering · Support",
    deliverable: "Production roadmap + support plan",
  },
];

export default function EngageSection() {
  return (
    <section className="bg-[#0a1638] text-white">
      <div className="wrap py-20 lg:py-28">
        <p className="kicker text-[#71cbcc] mb-4">How We Engage</p>
        <h2 className="serif text-[2.4rem] sm:text-[3.1rem] leading-[1.08] max-w-3xl">
          Start small. Prove value. Scale what works.
        </h2>

        <div className="grid md:grid-cols-3 gap-px bg-white/15 mt-12">
          {engage.map((item, i) => (
            <Reveal key={item.n} delay={i * 0.06}>
              <div className="bg-[#0a1638] p-8 min-h-[220px]">
                <p className="text-[11px] tracking-[0.18em] uppercase text-[#71cbcc] mb-4">{item.n}</p>
                <h3 className="serif text-[1.45rem] leading-snug mb-6">{item.title}</h3>
                <p className="text-[12px] tracking-wide text-[#71cbcc]">Deliverable: {item.deliverable}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-[11px] tracking-[0.18em] uppercase text-[#71cbcc]">
          No large transformation programme before proving the business case.
        </p>
      </div>
    </section>
  );
}
