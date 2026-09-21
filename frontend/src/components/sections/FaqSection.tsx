"use client";

import SectionHead from "@/components/SectionHead";
import { useT } from "@/i18n/LanguageProvider";

export default function FaqSection() {
  const t = useT();
  const items = t.faq.items.filter((item) => item.q.trim() && item.a.trim());
  if (!items.length) return null;

  return (
    <section id="faq" className="bg-white border-t border-[#e6e9f2] scroll-mt-[4.4rem]">
      <div className="wrap py-20 lg:py-24">
        <SectionHead n="06" kicker={t.faq.kicker} title={t.faq.title} />
        <div className="max-w-3xl divide-y divide-[#e6e9f2] border-t border-[#e6e9f2]">
          {items.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 serif text-[1.45rem] leading-snug text-[var(--nt-navy)]">
                <span>{item.q}</span>
                <span className="mt-1 text-sm text-[#8b91a5] group-open:hidden">+</span>
                <span className="mt-1 hidden text-sm text-[#8b91a5] group-open:inline">–</span>
              </summary>
              <p className="mt-3 text-[var(--nt-muted)] leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
