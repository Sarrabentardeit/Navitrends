"use client";

import Reveal from "@/components/Reveal";

const stats = [
  { value: "150+", label: "Delivery programmes" },
  { value: "12", label: "Countries" },
  { value: "UK + TN", label: "Commercial & engineering" },
  { value: "2018", label: "Industrial origin" },
];

export default function StatsSection() {
  return (
    <section className="border-b border-[#e6e9f2]">
      <div className="wrap grid grid-cols-2 lg:grid-cols-4">
        {stats.map((item, i) => (
          <Reveal
            key={item.label}
            delay={i * 0.06}
            className={`py-12 ${i < 3 ? "lg:border-r lg:border-[#e6e9f2]" : ""} ${i > 0 ? "lg:pl-10" : ""}`}
          >
            <p className="serif text-[2.6rem] leading-none text-[#1c3a8a]">{item.value}</p>
            <p className="mt-3 text-sm text-[#4b5573]">{item.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
