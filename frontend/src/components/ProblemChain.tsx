"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useT } from "@/i18n/LanguageProvider";

export default function ProblemChain() {
  const t = useT();
  const reduce = useReducedMotion();

  return (
    <div className="relative pl-8">
      <div className="absolute left-[6px] top-5 bottom-5 w-px bg-[#e6e9f2]" aria-hidden />
      {!reduce && (
        <motion.span
          aria-hidden
          className="absolute left-[2px] z-10 h-2.5 w-2.5 rounded-full bg-[#e31c23]"
          animate={{ top: ["1.4rem", "46%", "calc(100% - 2.2rem)"] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 1] }}
        />
      )}
      <div className="space-y-3">
        {t.chain.map((item) => (
          <div key={item.title} className="border border-[#e6e9f2] bg-white p-6">
            <h3 className="serif text-xl text-[#0a1638]">{item.title}</h3>
            <p className="mt-2 text-sm text-[#5b6178]">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
