"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import WordCycleA from "@/components/maquette-a/WordCycleA";
import MarqueeA from "@/components/maquette-a/MarqueeA";

export default function HeroA() {
  return (
    <section className="hero-stage">
      <div className="relative z-10 wrap grid lg:grid-cols-12 gap-10 py-20 lg:py-28">
        <motion.div
          className="lg:col-span-8"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="kicker kicker-light mb-7">London · Tunisia · International</p>
          <h1 className="serif text-[2.7rem] sm:text-[3.6rem] lg:text-[4.6rem] leading-[1.06] tracking-tight text-white">
            We engineer
            <br />
            <WordCycleA />
            <br />
            that scale.
          </h1>
        </motion.div>

        <motion.div
          className="lg:col-span-4 lg:pt-16 flex flex-col justify-between"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-white/75 text-[1.05rem] leading-relaxed mb-8">
            Navitrends is a London-based engineering firm. We map how a
            business actually works — then we configure or build the ERP,
            automation and reporting layer around that reality. Not the other
            way around.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-red">
              Start a conversation
            </Link>
            <Link href="/case-studies" className="btn btn-ghost-light">
              Selected work
            </Link>
          </div>
        </motion.div>
      </div>
      <div className="relative z-10">
        <MarqueeA />
      </div>
    </section>
  );
}
