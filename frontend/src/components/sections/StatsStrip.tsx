"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "150+", label: "Delivery programmes" },
  { value: "12", label: "Countries served" },
  { value: "UK + TN", label: "Commercial & engineering" },
  { value: "2018", label: "Industrial origin" },
];

export default function StatsStrip() {
  return (
    <section className="border-y border-[#e6e9f2] bg-white">
      <div className="wrap grid grid-cols-2 lg:grid-cols-4">
        {stats.map((item, i) => (
          <motion.div
            key={item.label}
            className={`py-10 ${i > 0 ? "lg:pl-10" : ""} ${
              i < 3 ? "lg:border-r lg:border-[#e6e9f2]" : ""
            }`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
          >
            <p className="serif text-[2.35rem] leading-none text-[#1c3a8a]">{item.value}</p>
            <p className="mt-2 text-sm text-[#5b6178]">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
