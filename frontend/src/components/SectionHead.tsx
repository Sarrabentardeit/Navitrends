export default function SectionHead({
  n,
  kicker,
  title,
  children,
  light = false,
}: {
  n: string;
  kicker: string;
  title: string;
  children?: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="grid lg:grid-cols-12 gap-8 mb-14 lg:mb-16">
      <div className="lg:col-span-7">
        <p className={`kicker mb-4 ${light ? "text-[var(--nt-cyan)]" : ""}`}>
          <span className="mr-3 opacity-50">{n}</span>
          {kicker}
        </p>
        <h2
          className={`serif text-[2.6rem] sm:text-[3.15rem] leading-[1.08] ${
            light ? "text-white" : "text-[var(--nt-navy)]"
          }`}
        >
          {title}
        </h2>
      </div>
      {children && (
        <div
          className={`lg:col-span-4 lg:col-start-9 flex items-end text-[0.98rem] leading-relaxed ${
            light ? "text-white/65" : "text-[var(--nt-muted)]"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
