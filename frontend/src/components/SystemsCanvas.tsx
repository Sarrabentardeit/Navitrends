"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import { useT } from "@/i18n/LanguageProvider";

const layout = [
  { id: "erp", x: 120, y: 92, fill: "var(--nt-red)", key: "erp" as const },
  { id: "auto", x: 320, y: 92, fill: "var(--nt-cyan)", key: "automation" as const },
  { id: "core", x: 220, y: 188, fill: "#ffffff", key: "core" as const },
  { id: "bi", x: 120, y: 292, fill: "var(--nt-cyan)", key: "bi" as const },
  { id: "sec", x: 320, y: 292, fill: "var(--nt-red)", key: "security" as const },
];

const lines = [
  { d: "M120 92 L220 188", color: "var(--nt-cyan)", delay: 0 },
  { d: "M320 92 L220 188", color: "var(--nt-cyan)", delay: 0.25 },
  { d: "M220 188 L120 292", color: "var(--nt-red)", delay: 0.5 },
  { d: "M220 188 L320 292", color: "var(--nt-red)", delay: 0.75 },
];

export default function SystemsCanvas() {
  const t = useT();
  const nodes = layout.map((n) => ({ ...n, label: t.hero.diagram[n.key] }));
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [playId, setPlayId] = useState(0);
  const wasIn = useRef(false);

  useEffect(() => {
    if (inView && !wasIn.current) setPlayId((id) => id + 1);
    wasIn.current = inView;
  }, [inView]);

  return (
    <div
      ref={ref}
      className="relative flex min-h-[460px] items-center justify-center overflow-hidden bg-[var(--nt-navy)] px-8 py-12 lg:min-h-full"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <svg
        key={playId}
        viewBox="0 0 440 380"
        className="relative z-10 w-full max-w-[460px]"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {lines.map((line) => (
          <path
            key={line.d}
            d={line.d}
            stroke={line.color}
            strokeWidth="1.15"
            fill="none"
            strokeDasharray="280"
            strokeDashoffset="280"
            style={{ animation: `dash 2.4s ${line.delay}s ease forwards` }}
          />
        ))}

        <path
          id="circuit"
          d="M120 92 L220 188 L320 92 L220 188 L120 292 L220 188 L320 292 L220 188"
          fill="none"
          stroke="none"
        />
        <circle r="4.5" fill="#ffffff">
          <animateMotion dur="8s" repeatCount="indefinite" begin="1.2s">
            <mpath href="#circuit" />
          </animateMotion>
        </circle>

        {nodes.map((n, i) => (
          <g key={n.id}>
            <motion.circle
              cx={n.x}
              cy={n.y}
              r="28"
              fill={n.fill}
              animate={{ opacity: [0.08, 0.2, 0.08] }}
              transition={{ duration: 3.4, repeat: Infinity, delay: i * 0.3 }}
            />
            <circle cx={n.x} cy={n.y} r="5.5" fill={n.fill} />
            <text
              x={n.x}
              y={n.y + 32}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="10"
              letterSpacing="2.2"
              style={{ fontFamily: "IBM Plex Sans, sans-serif" }}
            >
              {n.label.toUpperCase()}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
