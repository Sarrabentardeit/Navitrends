import SectionHead from "@/components/SectionHead";

const featured = [
  {
    tag: "Audit Workflow Agent",
    place: "Alexann · France",
    title: "From manual audit reports to automated digital execution.",
    challenge:
      "audit reports required classification and distribution between audit organisations / laboratories and their clients.",
    solution:
      "automated classification, automated routing and report distribution connecting organisations and clients.",
    outcome:
      "Measured through: processing time · automated classification rate · routing time · manual interventions.",
  },
  {
    tag: "Quotation Intelligence",
    place: "GS Geo · Saudi Arabia",
    title: "Six years of quotations become reusable knowledge.",
    challenge: "preparing quotations required searching and reusing historical commercial knowledge.",
    solution: "knowledge extraction, similar quotation retrieval, AI-assisted generation and human validation.",
    outcome: "Faster quotation preparation while preserving company know-how.",
  },
];

const compact = [
  {
    tag: "Zero-Paper · ISO 9001",
    place: "M-Pack",
    text: "Operational workflows digitalised around ISO 9001 requirements.",
  },
  {
    tag: "Metrology Laboratory",
    place: "IMC",
    text: "Zero-paper digitalisation structured around ISO-driven metrology requirements.",
  },
  {
    tag: "Digital Twin · In Development",
    place: "Extrusion Process",
    text: "Process model linked to operational data, designed to support simulation and decision support.",
  },
];

export default function CaseStudiesSection() {
  return (
    <section id="case-studies" className="bg-white">
      <div className="wrap py-20 lg:py-28">
        <SectionHead n="04" kicker="Case Studies" title="Evidence, not promises." />

        <div className="grid lg:grid-cols-2 gap-6">
          {featured.map((item) => (
            <article key={item.place} className="border border-[#e6e9f2] bg-[#fbfbfd] p-8 h-full">
              <p className="inline-block bg-[#e31c23]/8 text-[#e31c23] text-[11px] tracking-wide font-semibold px-2.5 py-1">
                {item.tag}
              </p>
              <p className="mt-5 text-[11px] tracking-[0.18em] uppercase text-[#8b91a5]">{item.place}</p>
              <h3 className="serif text-[1.75rem] leading-snug text-[#0a1638] mt-2">{item.title}</h3>
              <p className="mt-5 text-sm text-[#4b5573] leading-relaxed">
                <strong className="text-[#0a1638]">Challenge:</strong> {item.challenge}
              </p>
              <p className="mt-3 text-sm text-[#4b5573] leading-relaxed">
                <strong className="text-[#0a1638]">Solution:</strong> {item.solution}
              </p>
              <p className="mt-6 pt-5 border-t border-[#e6e9f2] text-sm font-semibold text-[#0a1638]">
                {item.outcome}
              </p>
            </article>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {compact.map((item) => (
            <article key={item.place} className="border border-[#e6e9f2] p-7 h-full">
              <p className="inline-block bg-[#e31c23]/8 text-[#e31c23] text-[11px] tracking-wide font-semibold px-2.5 py-1">
                {item.tag}
              </p>
              <p className="mt-5 text-[11px] tracking-[0.18em] uppercase text-[#8b91a5]">{item.place}</p>
              <p className="mt-3 text-[#4b5573] leading-relaxed">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
