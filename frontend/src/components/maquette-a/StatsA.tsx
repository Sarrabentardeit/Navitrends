"use client";

import Reveal from "@/components/Reveal";

const stats = [
  { value: "150+", label: "Delivery programmes" },
  { value: "12", label: "Countries of operation" },
  { value: "UK + TN", label: "Commercial & engineering" },
  { value: "Est. 2018", label: "Industrial origin, not software-first" },
];

export default function StatsA() {
  return (
    <section className="border-b border-[#e4e7ef] bg-[#f3f5fb]">
      <div className="wrap grid grid-cols-2 lg:grid-cols-4">
        {stats.map((item, i) => (
          <Reveal
            key={item.label}
            delay={i * 0.06}
            className={`py-10 pr-6 ${i !== stats.length - 1 ? "lg:border-r lg:border-[#e4e7ef] lg:pr-8 lg:pl-8 first:lg:pl-0" : "lg:pl-8"}`}
          >
            <p className="serif text-3xl mb-2 text-[#e31c23]">{item.value}</p>
            <p className="text-sm text-[#5b6178] max-w-[12rem]">{item.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
