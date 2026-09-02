"use client";

import { motion } from "framer-motion";

const sources = [
  { label: "Invoice", x: 70 },
  { label: "PO", x: 155 },
  { label: "Audit", x: 240 },
  { label: "Cert.", x: 325 },
];

const stages = [
  { label: "Capture", y: 148 },
  { label: "Validate", y: 208 },
  { label: "Classify", y: 268 },
  { label: "ERP", y: 328 },
  { label: "Action", y: 388 },
];

export default function DocumentFlow() {
  return (
    <div className="relative min-h-[520px] h-full overflow-hidden bg-[#07102a] lg:min-h-full">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <svg
        viewBox="0 0 400 450"
        className="relative z-10 mx-auto w-full max-w-[420px] py-10"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {sources.map((src, i) => (
          <g key={src.label}>
            <rect
              x={src.x - 28}
              y={36}
              width="56"
              height="68"
              fill="none"
              stroke={i === 0 ? "#e31c23" : "#71cbcc"}
              strokeWidth="1.2"
            />
            <line
              x1={src.x - 16}
              y1={52}
              x2={src.x + 16}
              y2={52}
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1"
            />
            <line
              x1={src.x - 16}
              y1={64}
              x2={src.x + 10}
              y2={64}
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1"
            />
            <line
              x1={src.x - 16}
              y1={76}
              x2={src.x + 14}
              y2={76}
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1"
            />
            <text
              x={src.x}
              y={118}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="8"
              letterSpacing="1.4"
              style={{ fontFamily: "IBM Plex Sans, sans-serif" }}
            >
              {src.label.toUpperCase()}
            </text>
            <path
              d={`M${src.x} 104 L200 148`}
              stroke="#71cbcc"
              strokeWidth="1.1"
              fill="none"
              strokeDasharray="220"
              strokeDashoffset="220"
              style={{ animation: `dash 2.2s ${i * 0.12}s ease forwards` }}
            />
          </g>
        ))}

        {stages.map((stage, i) => {
          const isLast = i === stages.length - 1;
          const prev = stages[i - 1];
          return (
            <g key={stage.label}>
              {prev && (
                <path
                  d={`M200 ${prev.y} L200 ${stage.y}`}
                  stroke={isLast ? "#e31c23" : "#71cbcc"}
                  strokeWidth="1.15"
                  fill="none"
                  strokeDasharray="80"
                  strokeDashoffset="80"
                  style={{ animation: `dash 1.4s ${0.6 + i * 0.18}s ease forwards` }}
                />
              )}
              <motion.circle
                cx="200"
                cy={stage.y}
                r="22"
                fill={isLast ? "#e31c23" : "#71cbcc"}
                animate={{ opacity: [0.08, 0.22, 0.08] }}
                transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.25 }}
              />
              <circle
                cx="200"
                cy={stage.y}
                r="5"
                fill={isLast ? "#e31c23" : i === 3 ? "#ffffff" : "#71cbcc"}
              />
              <text
                x="228"
                y={stage.y + 4}
                fill="#ffffff"
                fontSize="11"
                letterSpacing="1.8"
                style={{ fontFamily: "IBM Plex Sans, sans-serif" }}
              >
                {stage.label.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
