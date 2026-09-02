"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CtaSection() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<"validation" | "server" | null>(null);
  const [submitting, setSubmitting] = useState(false);

  return (
    <section id="contact" className="relative min-h-[720px] flex items-end scroll-mt-[4.4rem]">
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
            Get Started
          </p>
          <h2 className="serif text-[3rem] sm:text-[3.6rem] leading-[1.05] max-w-[14ch]">
            Let’s find one problem worth solving.
          </h2>
          <p className="mt-6 max-w-md text-white/75 leading-relaxed">
            30-Minute Operational Digitalisation Diagnostic. One process. One bottleneck. One KPI. One measurable opportunity.
          </p>
          <p className="mt-4 max-w-md text-white/55 text-sm">
            No technology pitch before we understand the problem.
          </p>
          <p className="mt-8 text-sm text-white/80">
            <a href="mailto:contact@navitrends.com" className="hover:text-[#71cbcc]">
              contact@navitrends.com
            </a>
            <span className="mx-3 text-white/30">|</span>
            <a href="tel:+442039962137" className="hover:text-[#71cbcc]">
              +44 20 3996 2137
            </a>
          </p>
          <p className="mt-3 text-[12px] text-white/50">
            Navitrends Ltd · 5 Brayford Square, London, United Kingdom E1 0SG
          </p>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          {sent ? (
            <div className="bg-white p-10 text-[#0a1638]">
              <p className="serif text-3xl leading-snug">
                Thank you — your request has been received. We will be in touch shortly to confirm your diagnostic call.
              </p>
            </div>
          ) : (
            <motion.form
              className="relative overflow-hidden bg-white text-[#0a1638] p-7 sm:p-8 shadow-[0_24px_80px_rgba(10,22,56,0.28)]"
              noValidate
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={async (e) => {
                e.preventDefault();
                if (submitting) return;
                const data = new FormData(e.currentTarget);
                const payload = {
                  name: String(data.get("name") || "").trim(),
                  company: String(data.get("company") || "").trim(),
                  email: String(data.get("email") || "").trim(),
                  phone: String(data.get("phone") || "").trim(),
                  role: String(data.get("role") || "").trim(),
                  companySize: String(data.get("companySize") || "").trim(),
                  problem: String(data.get("problem") || "").trim(),
                  systems: String(data.get("systems") || "").trim(),
                  preferredContact: String(data.get("preferredContact") || "").trim(),
                  website: String(data.get("website") || "").trim(),
                };
                if (!payload.name || !payload.company || !payload.email) {
                  setError("validation");
                  return;
                }
                setError(null);
                setSubmitting(true);
                try {
                  const res = await fetch("/api/diagnostic", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                  });
                  if (!res.ok) throw new Error("send failed");
                  setSent(true);
                } catch {
                  setError("server");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              <motion.span
                aria-hidden
                className="absolute left-0 top-0 h-[3px] bg-[#e31c23]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false }}
                style={{ originX: 0, width: "100%" }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              />
              <p className="serif text-2xl mb-1">Book a 30-Minute Diagnostic</p>
              <p className="text-sm text-[#5b6178] mb-7">
                We will review your request before the call so the discussion can focus on your operational problem.
              </p>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input required name="name" placeholder="Name" autoComplete="name" className="box-field" />
                  <input required name="company" placeholder="Company" autoComplete="organization" className="box-field" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input required type="email" name="email" placeholder="Work email" autoComplete="email" className="box-field" />
                  <input type="tel" name="phone" placeholder="Phone (optional)" autoComplete="tel" className="box-field" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input name="role" placeholder="Role, e.g. Operations Director" className="box-field" />
                  <select name="companySize" className="box-field" defaultValue="">
                    <option value="">Company size</option>
                    <option>1–10</option>
                    <option>11–50</option>
                    <option>51–200</option>
                    <option>201–500</option>
                    <option>500+</option>
                  </select>
                </div>
                <textarea
                  name="problem"
                  placeholder="What operational problem would you like to solve?"
                  rows={3}
                  className="box-field min-h-[5.5rem]"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input name="systems" placeholder="Current systems / ERP" className="box-field" />
                  <select name="preferredContact" className="box-field" defaultValue="">
                    <option value="">Preferred contact</option>
                    <option>Email</option>
                    <option>Phone</option>
                    <option>Either</option>
                  </select>
                </div>
                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
                  <label>
                    Website
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>
                <button type="submit" className="btn btn-red w-full" disabled={submitting}>
                  {submitting ? "Sending…" : "Request My Diagnostic"}
                  {!submitting && (
                    <span className="btn-chevron" aria-hidden>
                      →
                    </span>
                  )}
                </button>
                {error === "validation" && (
                  <p className="text-sm text-[#e31c23]">
                    Please complete your name, company and work email.
                  </p>
                )}
                {error === "server" && (
                  <p className="text-sm text-[#e31c23]">
                    We could not send your request. Please try again or email{" "}
                    <a href="mailto:contact@navitrends.com" className="underline">
                      contact@navitrends.com
                    </a>
                    .
                  </p>
                )}
              </div>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
