import SectionHead from "@/components/SectionHead";

const reasons = [
  {
    title: "Industrial Understanding",
    text: "24 years of professional experience rooted in industrial operations.",
  },
  {
    title: "System Engineering",
    text: "ERP · Custom Software · Integration · Automation.",
  },
  {
    title: "Applied Intelligence",
    text: "Knowledge · Data · AI · Decision Support.",
  },
  {
    title: "Accountable Delivery",
    text: "UK presence + integrated Tunisia engineering hub.",
  },
];

export default function WhySection() {
  return (
    <section id="why" className="bg-[#fbfbfd] border-t border-[#e6e9f2]">
      <div className="wrap py-20 lg:py-24">
        <SectionHead n="05" kicker="Why Navitrends" title="UK accountability. Nearshore engineering capacity.">
          One integrated delivery team — not an offshore hand-off. One team from operational diagnosis to production support.
        </SectionHead>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#e6e9f2]">
          {reasons.map((item) => (
            <div key={item.title} className="bg-white p-7 min-h-[180px] h-full">
              <h3 className="serif text-xl text-[#0a1638] mb-3">{item.title}</h3>
              <p className="text-sm text-[#5b6178] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
