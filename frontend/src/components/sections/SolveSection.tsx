import SectionHead from "@/components/SectionHead";
import DrawMark from "@/components/DrawMark";
import ProblemChain from "@/components/ProblemChain";

const results = [
  "Repeated manual work and rebuilt reports",
  "Delays, errors and expert dependency",
  "Disconnected data across Excel-driven operations",
  "Knowledge that disappears when experienced people leave",
];

export default function SolveSection() {
  return (
    <>
      <section id="solve" className="bg-[#fbfbfd]">
        <div className="wrap py-20 lg:py-28">
          <SectionHead n="01" kicker="What We Solve" title="Companies have more data than ever. But do they own their operational knowledge?" />

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <ProblemChain />
            </div>
            <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-center">
              <p className="serif text-[2rem] leading-snug text-[#0a1638]">The data is stored.</p>
              <p className="serif text-[2rem] leading-snug text-[#e31c23]">The decision logic often isn’t.</p>
              <p className="mt-6 text-[#4b5573] leading-relaxed">
                In most SMEs and industrial organisations, the knowledge that actually runs the business lives with a handful of people — not in the systems meant to capture it. The result:
              </p>
              <ul className="mt-6 space-y-3 text-[#4b5573]">
                {results.map((item) => (
                  <li key={item} className="border-t border-[#e6e9f2] pt-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0a1638] text-white">
        <div className="wrap py-12 lg:py-14">
          <p className="kicker text-[#71cbcc] mb-4">Operational Risk</p>
          <h2 className="serif text-[2.4rem] sm:text-[3.1rem] leading-[1.08] max-w-4xl">
            What happens when 25 years of experience{" "}
            <DrawMark>walks out the door?</DrawMark>
          </h2>
          <p className="mt-6 text-white/60">Retirement · Turnover · Absence · Growth · Outsourcing</p>
          <p className="mt-8 text-[11px] tracking-[0.18em] uppercase text-[#71cbcc]">
            Operational resilience starts with knowledge.
          </p>
        </div>
      </section>
    </>
  );
}
