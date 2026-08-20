"use client";

import { motion } from "framer-motion";

const nodes = [
  { id: "erp", x: 120, y: 92, label: "ERP", fill: "#e31c23" },
  { id: "auto", x: 320, y: 92, label: "Automation", fill: "#71cbcc" },
  { id: "core", x: 220, y: 188, label: "Core", fill: "#ffffff" },
  { id: "bi", x: 120, y: 292, label: "BI", fill: "#71cbcc" },
  { id: "sec", x: 320, y: 292, label: "Security", fill: "#e31c23" },
];

const lines = [
  { d: "M120 92 L220 188", color: "#71cbcc", delay: 0 },
  { d: "M320 92 L220 188", color: "#71cbcc", delay: 0.25 },
  { d: "M220 188 L120 292", color: "#e31c23", delay: 0.5 },
  { d: "M220 188 L320 292", color: "#e31c23", delay: 0.75 },
];

export default function SystemsCanvas() {
  return (
    <div className="relative flex min-h-[460px] items-center justify-center overflow-hidden bg-[#0a1638] px-8 py-12 lg:min-h-full">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <svg
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
