"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import WordCycle from "@/components/WordCycle";
import SystemsCanvas from "@/components/SystemsCanvas";

export default function HeroSection() {
  return (
    <section className="bg-[#fbfbfd]">
      <div className="grid lg:grid-cols-2 lg:min-h-[calc(100vh-4.4rem)]">
        <div className="flex items-center">
          <motion.div
            className="w-full max-w-[640px] ml-auto px-8 lg:px-12 xl:pr-16 py-16 lg:py-20"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="kicker mb-5">Systems engineering · London</p>
            <h1 className="serif text-[2.7rem] sm:text-[3.6rem] xl:text-[4.4rem] leading-[1.04] tracking-tight text-[#0a1638]">
              We engineer
              <WordCycle />
              that scale.
            </h1>
            <p className="mt-7 max-w-md text-[#4b5573] leading-relaxed">
              We map how the operation actually runs. Then we put ERP,
              automation and reporting underneath it — one team, one architecture.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-red">Talk to us</Link>
              <Link href="/case-studies" className="btn btn-line">See the work</Link>
            </div>
          </motion.div>
        </div>
        <SystemsCanvas />
      </div>
    </section>
  );
}
