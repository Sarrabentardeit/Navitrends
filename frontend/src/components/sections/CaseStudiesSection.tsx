"use client";

import SectionHead from "@/components/SectionHead";
import { useT } from "@/i18n/LanguageProvider";

export default function CaseStudiesSection() {
  const t = useT();

  return (
    <section id="case-studies" className="bg-white">
      <div className="wrap py-20 lg:py-28">
        <SectionHead n="04" kicker={t.cases.kicker} title={t.cases.title} />

        <div className="grid lg:grid-cols-2 gap-6">
          {t.cases.featured.map((item) => (
            <article key={item.place} className="border border-[#e6e9f2] bg-[#fbfbfd] p-8 h-full">
              <p className="inline-block bg-[#e31c23]/8 text-[#e31c23] text-[11px] tracking-wide font-semibold px-2.5 py-1">
                {item.tag}
              </p>
              <p className="mt-5 text-[11px] tracking-[0.18em] uppercase text-[#8b91a5]">{item.place}</p>
              <h3 className="serif text-[1.75rem] leading-snug text-[#0a1638] mt-2">{item.title}</h3>
              <p className="mt-5 text-sm text-[#4b5573] leading-relaxed">
                <strong className="text-[#0a1638]">{t.cases.challenge}</strong> {item.challenge}
              </p>
              <p className="mt-3 text-sm text-[#4b5573] leading-relaxed">
                <strong className="text-[#0a1638]">{t.cases.solution}</strong> {item.solution}
              </p>
              <p className="mt-6 pt-5 border-t border-[#e6e9f2] text-sm font-semibold text-[#0a1638]">
                {item.outcome}
              </p>
            </article>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {t.cases.compact.map((item) => (
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
