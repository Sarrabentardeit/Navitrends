"use client";

import { motion } from "framer-motion";
import SectionHead from "@/components/SectionHead";
import FlowStrip from "@/components/FlowStrip";
import { useT } from "@/i18n/LanguageProvider";

export default function ProcessSection() {
  const t = useT();

  return (
    <section id="how-we-work" className="bg-[#fbfbfd]">
      <div className="wrap py-20 lg:py-24">
        <SectionHead n="03" kicker={t.process.kicker} title={t.process.title}>
          {t.process.intro}
        </SectionHead>

        <div className="relative mb-12">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[3.15rem] z-[1] hidden h-px origin-left bg-[#71cbcc]/70 md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="grid md:grid-cols-3 gap-px bg-[#e6e9f2]">
            {t.process.steps.map((item) => (
              <div key={item.n} className="bg-[#0a1638] text-white p-8 min-h-[200px] h-full">
                <p className="text-[11px] tracking-[0.18em] uppercase text-[#71cbcc] mb-4">{item.n}</p>
                <h3 className="serif text-[1.4rem] leading-snug mb-6">{item.title}</h3>
                <p className="text-[12px] tracking-wide text-[#71cbcc]">
                  {t.process.deliverable}: {item.deliverable}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <FlowStrip nodes={[...t.process.flow]} />
        </div>
      </div>
    </section>
  );
}
