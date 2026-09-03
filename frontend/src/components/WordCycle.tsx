"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function WordCycle({ words }: { words: readonly string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2800);
    return () => clearInterval(id);
  }, [words]);

  const word = words[index] ?? words[0];

  return (
    <span className="relative block overflow-hidden" style={{ height: "1.1em" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={word}
          initial={{ y: "40%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-40%", opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 top-0 text-[#e31c23] italic whitespace-nowrap"
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
