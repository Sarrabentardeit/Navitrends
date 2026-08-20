"use client";

import { useState } from "react";
import Image from "next/image";

const topics = [
  "ERP",
  "Automation",
  "Security",
  "Software",
  "Partnership",
];

export default function CtaSection() {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState("ERP");

  return (
    <section className="relative min-h-[720px] flex items-end">
      <Image
        src="/images/software-dashboard.jpg"
        alt=""
        fill
        unoptimized
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1638]/90 via-[#0a1638]/70 to-[#0a1638]/40" />

      <div className="relative z-10 wrap w-full py-16 lg:py-20 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-6 text-white pb-2">
          <p className="text-[0.7rem] font-semibold tracking-[0.22em] uppercase text-[#71cbcc] mb-4">
            ERP · Automation · Security
          </p>
          <h2 className="serif text-[3rem] sm:text-[3.6rem] leading-[1.05] max-w-[12ch]">
            Tell us how the operation runs.
          </h2>
          <p className="mt-6 max-w-md text-white/75 leading-relaxed">
            A short note is enough. We reply within a working day — and we will
            say if it is not a fit.
          </p>
          <p className="mt-8 text-sm text-white/80">
            <a href="mailto:contact@navitrends.uk" className="hover:text-[#71cbcc]">
              contact@navitrends.uk
            </a>
            <span className="mx-3 text-white/30">|</span>
            <a href="tel:+447418361296" className="hover:text-[#71cbcc]">
              +44 7418 361296
            </a>
          </p>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          {sent ? (
            <div className="bg-white p-10 text-[#0a1638]">
              <p className="serif text-3xl leading-snug">
                Received. We will come back within a working day.
              </p>
            </div>
          ) : (
            <form
              className="bg-white text-[#0a1638] p-7 sm:p-8 shadow-[0_24px_80px_rgba(10,22,56,0.28)]"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <p className="serif text-2xl mb-1">Start a conversation</p>
              <p className="text-sm text-[#5b6178] mb-7">
                No discovery-call theatre.
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input required name="name" placeholder="Name" className="box-field" />
                  <input required type="email" name="email" placeholder="Work email" className="box-field" />
                </div>
                <input type="tel" name="phone" placeholder="Telephone" className="box-field" />
                <input type="hidden" name="topic" value={topic} />

                <div className="flex flex-wrap gap-1.5">
                  {topics.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setTopic(item)}
                      className={`px-3 py-1.5 text-[11px] tracking-wide ${
                        topic === item
                          ? "bg-[#e31c23] text-white"
                          : "bg-[#f4f6fb] text-[#4b5573] hover:bg-[#e6e9f2]"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <textarea
                  required
                  name="message"
                  placeholder="What is the problem?"
                  rows={4}
                  className="box-field"
                />

                <button type="submit" className="btn btn-red w-full">
                  Send
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
