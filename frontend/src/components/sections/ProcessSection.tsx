"use client";

import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";

const steps = [
  { n: "01", title: "Map the work", text: "How the business actually runs. Processes, owners, data, constraints." },
  { n: "02", title: "Name the gaps", text: "Where information dies, where people re-key, where two systems disagree." },
  { n: "03", title: "Design the architecture", text: "Around those constraints. The stack serves the operation." },
  { n: "04", title: "Build only what is required", text: "Configure first. Customise only where the process demands it." },
  { n: "05", title: "Hand it over", text: "Training, documentation, and a system the team owns." },
];

export default function ProcessSection() {
  return (
    <section className="bg-white border-y border-[#e6e9f2]">
      <div className="wrap py-20 lg:py-28">
        <SectionHead n="02" kicker="Method" title="Process first. Software second.">
          Most ERP programmes fail because someone started in the product. We
          start in the plant, the warehouse, the finance close.
        </SectionHead>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-10">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.06}>
              <li className="relative pt-5 border-t-2 border-[#e6e9f2]">
                <span className="absolute top-[-2px] left-0 w-8 h-[2px] bg-[#e31c23]" />
                <p className="text-[11px] tracking-[0.18em] text-[#e31c23] mb-4">{step.n}</p>
                <h3 className="serif text-xl mb-3 text-[#0a1638]">{step.title}</h3>
                <p className="text-sm text-[#5b6178] leading-relaxed">{step.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
