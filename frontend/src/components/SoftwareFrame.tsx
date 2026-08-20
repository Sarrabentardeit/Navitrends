import Image from "next/image";
import { cn } from "@/lib/utils";

export default function SoftwareFrame({
  src,
  alt,
  label,
  className,
  bodyClassName,
  priority = false,
  contain = false,
}: {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  bodyClassName?: string;
  priority?: boolean;
  contain?: boolean;
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden bg-[#0a1638] shadow-[0_28px_70px_rgba(10,22,56,0.18)]",
        className
      )}
    >
      <div className="brand-bar" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <div className="flex items-center gap-2 h-9 px-3.5 bg-[#07102f]">
        <span className="size-[7px] rounded-full bg-[#e31c23]" />
        <span className="size-[7px] rounded-full bg-[#71cbcc]" />
        <span className="size-[7px] rounded-full bg-[#1c3a8a]" />
        {label && (
          <figcaption className="ml-2 min-w-0 truncate text-[10px] tracking-[0.18em] uppercase text-white/40">
            {label}
          </figcaption>
        )}
      </div>
      <div className={cn("relative bg-[#0a1638]", bodyClassName ?? "aspect-[16/10]")}>
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          priority={priority}
          className={cn(contain ? "object-contain" : "object-cover shot-grade")}
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        {!contain && (
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1638]/35 via-transparent to-[#0a1638]/10"
            aria-hidden
          />
        )}
      </div>
    </figure>
  );
}
