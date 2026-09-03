"use client";

import SectionHead from "@/components/SectionHead";
import DrawMark from "@/components/DrawMark";
import ProblemChain from "@/components/ProblemChain";
import { useT } from "@/i18n/LanguageProvider";

export default function SolveSection() {
  const t = useT();

  return (
    <>
      <section id="solve" className="bg-[#fbfbfd]">
        <div className="wrap py-20 lg:py-28">
          <SectionHead n="01" kicker={t.solve.kicker} title={t.solve.title} />

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <ProblemChain />
            </div>
            <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-center">
              <p className="serif text-[2rem] leading-snug text-[#0a1638]">{t.solve.stored}</p>
              <p className="serif text-[2rem] leading-snug text-[#e31c23]">{t.solve.logic}</p>
              <p className="mt-6 text-[#4b5573] leading-relaxed">{t.solve.body}</p>
              <ul className="mt-6 space-y-3 text-[#4b5573]">
                {t.solve.results.map((item) => (
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
          <p className="kicker text-[#71cbcc] mb-4">{t.solve.riskKicker}</p>
          <h2 className="serif text-[2.4rem] sm:text-[3.1rem] leading-[1.08] max-w-4xl">
            {t.solve.riskBefore}{" "}
            <DrawMark>{t.solve.riskMark}</DrawMark>
          </h2>
          <p className="mt-6 text-white/60">{t.solve.riskFactors}</p>
          <p className="mt-8 text-[11px] tracking-[0.18em] uppercase text-[#71cbcc]">
            {t.solve.riskFoot}
          </p>
        </div>
      </section>
    </>
  );
}
