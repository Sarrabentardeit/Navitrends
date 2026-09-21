"use client";

import SectionHead from "@/components/SectionHead";
import { useT } from "@/i18n/LanguageProvider";

export default function WhySection() {
  const t = useT();

  return (
    <section id="why" className="bg-[#fbfbfd] border-t border-[#e6e9f2]">
      <div className="wrap py-20 lg:py-24">
        <SectionHead n="05" kicker={t.why.kicker} title={t.why.title}>
          {t.why.intro}
        </SectionHead>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#e6e9f2]">
          {t.why.reasons.map((item) => (
            <div key={item.title} className="bg-white p-7 min-h-[180px] h-full">
              <h3 className="serif text-xl text-[var(--nt-navy)] mb-3">{item.title}</h3>
              <p className="text-sm text-[#5b6178] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
