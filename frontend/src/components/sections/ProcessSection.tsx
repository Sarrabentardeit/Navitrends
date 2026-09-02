"use client";

import { motion } from "framer-motion";
import SectionHead from "@/components/SectionHead";
import FlowStrip from "@/components/FlowStrip";

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

export default function ProcessSection() {
  return (
    <section id="how-we-work" className="bg-[#fbfbfd]">
      <div className="wrap py-20 lg:py-24">
        <SectionHead n="03" kicker="How We Work" title="Start small. Prove value. Scale what works.">
          No large transformation programme before proving the business case.
        </SectionHead>

        <div className="relative mb-12">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-8 right-8 left-8 hidden h-px bg-[#71cbcc]/70 md:block"
            style={{ originX: 0 }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="grid md:grid-cols-3 gap-px bg-[#e6e9f2]">
            {engage.map((item) => (
              <div key={item.n} className="bg-[#0a1638] text-white p-8 min-h-[200px] h-full">
                <p className="text-[11px] tracking-[0.18em] uppercase text-[#71cbcc] mb-4">{item.n}</p>
                <h3 className="serif text-[1.4rem] leading-snug mb-6">{item.title}</h3>
                <p className="text-[12px] tracking-wide text-[#71cbcc]">Deliverable: {item.deliverable}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <FlowStrip nodes={["KNOWLEDGE", "SYSTEM", "INTELLIGENCE", "VALUE"]} />
        </div>
      </div>
    </section>
  );
}
