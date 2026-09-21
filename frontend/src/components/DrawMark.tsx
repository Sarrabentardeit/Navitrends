"use client";

import { motion } from "framer-motion";

export default function DrawMark({ children }: { children: React.ReactNode }) {
  return (
    <motion.em
      className="relative not-italic text-[var(--nt-red)] inline-block"
      initial="rest"
      whileInView="show"
      viewport={{ once: false, margin: "-40px" }}
    >
      {children}
      <motion.span
        aria-hidden
        className="absolute left-0 right-0 -bottom-1 h-px bg-[var(--nt-red)]"
        variants={{
          rest: { scaleX: 0 },
          show: { scaleX: 1 },
        }}
        style={{ originX: 0 }}
        transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.em>
  );
}
