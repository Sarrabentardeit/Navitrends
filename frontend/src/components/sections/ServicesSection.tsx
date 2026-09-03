"use client";

import SectionHead from "@/components/SectionHead";
import { useT } from "@/i18n/LanguageProvider";

export default function ServicesSection() {
  const t = useT();

  return (
    <section id="services" className="bg-white border-y border-[#e6e9f2]">
      <div className="wrap py-20 lg:py-24">
        <SectionHead n="02" kicker={t.services.kicker} title={t.services.title}>
          {t.services.intro}
        </SectionHead>

        <div className="grid lg:grid-cols-3 gap-px bg-[#e6e9f2]">
          {t.services.families.map((family) => (
            <article key={family.n} className="service-card bg-white p-8 lg:p-10 h-full">
              <p className="service-n text-[11px] tracking-[0.18em] mb-3">{family.n}</p>
              <h3 className="serif text-[1.75rem] leading-snug text-[#0a1638]">{family.title}</h3>
              <p className="mt-3 text-sm text-[#5b6178]">{family.tagline}</p>
              <ul className="mt-8">
                {family.items.map((item) => (
                  <li
                    key={item}
                    className="border-t border-[#e6e9f2] py-2.5 text-sm text-[#0a1638] transition-colors duration-200 hover:text-[#e31c23]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
