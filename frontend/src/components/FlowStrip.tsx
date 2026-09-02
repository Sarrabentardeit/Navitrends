import { cn } from "@/lib/utils";

export default function FlowStrip({
  nodes,
  dark = false,
}: {
  nodes: string[];
  dark?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {nodes.map((node, i) => (
        <span key={`${node}-${i}`} className="contents">
          {i > 0 && (
            <span className={dark ? "text-[#71cbcc] font-semibold" : "text-[#e31c23] font-semibold"}>
              →
            </span>
          )}
          <span
            className={cn(
              "border px-3 py-2 text-[11px] font-semibold tracking-wide",
              i === nodes.length - 1
                ? "bg-[#e31c23] border-[#e31c23] text-white"
                : dark
                  ? "border-white/20 bg-white/5 text-white"
                  : "border-[#e6e9f2] bg-white text-[#0a1638]"
            )}
          >
            {node}
          </span>
        </span>
      ))}
    </div>
  );
}
