"use client";

import { motion } from "framer-motion";
import WordCycle from "@/components/WordCycle";
import SystemsCanvas from "@/components/SystemsCanvas";
import { useT } from "@/i18n/LanguageProvider";

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroSection() {
  const t = useT();

  return (
    <section className="bg-[var(--background)]">
      <div className="grid lg:grid-cols-2 lg:min-h-[calc(100vh-4.4rem)]">
        <div className="flex items-center">
          <motion.div
            className="w-full max-w-[640px] ml-auto px-8 lg:px-12 xl:pr-16 py-16 lg:py-20"
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.45 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } },
            }}
          >
            <motion.p variants={fade} className="kicker mb-5">
              {t.hero.kicker}
            </motion.p>
            <motion.h1
              variants={fade}
              className="serif text-[2.7rem] sm:text-[3.6rem] xl:text-[4.4rem] leading-[1.04] tracking-tight text-[var(--nt-navy)]"
            >
              {t.hero.lead}
              <WordCycle words={t.hero.words} />
              {t.hero.trail}
            </motion.h1>
            <motion.p variants={fade} className="mt-7 max-w-md text-[var(--nt-muted)] leading-relaxed">
              {t.hero.body}
            </motion.p>
            <motion.div variants={fade} className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="btn btn-red">
                {t.hero.talk} <span className="btn-chevron" aria-hidden>→</span>
              </a>
              <a href="#case-studies" className="btn btn-line">
                {t.hero.work} <span className="btn-chevron" aria-hidden>→</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
        <SystemsCanvas />
      </div>
    </section>
  );
}
