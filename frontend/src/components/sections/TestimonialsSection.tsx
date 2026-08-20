"use client";

import Reveal from "@/components/Reveal";

export default function TestimonialsSection() {
  return (
    <section className="border-b border-[#e6e9f2]">
      <div className="wrap py-24 grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-4">
          <p className="kicker mb-6">From the floor</p>
          <p className="serif text-[8rem] leading-none text-[#e31c23]/20 select-none">“</p>
        </Reveal>
        <Reveal className="lg:col-span-8" delay={0.1}>
          <blockquote>
            <p className="serif text-[2.15rem] sm:text-[2.6rem] leading-[1.15] text-[#0a1638]">
              They sat in the plant for a week before anyone opened Odoo.
              The system looks like our operation, not like a demo.
            </p>
            <footer className="mt-8 text-sm text-[#4b5573]">
              Operations director · Plastics manufacturer, Midlands
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
