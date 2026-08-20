"use client";

import Reveal from "@/components/Reveal";

export default function TestimonialsA() {
  return (
    <section className="relative overflow-hidden bg-[#1c3a8a] text-white">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#71cbcc]/15 blur-3xl" />
      <div className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-[#e31c23]/15 blur-3xl" />
      <div className="wrap relative py-20 lg:py-24 grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-3">
          <p className="kicker kicker-light">From the floor</p>
        </Reveal>
        <Reveal className="lg:col-span-8 lg:col-start-5" delay={0.08}>
          <blockquote>
            <p className="serif text-[1.7rem] sm:text-[2.05rem] leading-snug mb-8">
              “They sat in the plant for a week before anyone opened Odoo. That
              is the difference. The system looks like our operation, not like a
              demo.”
            </p>
            <footer className="text-sm text-white/70">
              <span className="text-[#71cbcc]">Operations director</span>
              {" · "}Plastics manufacturer, Midlands
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
