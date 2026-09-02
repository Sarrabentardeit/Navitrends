import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import FlowStrip from "@/components/FlowStrip";
import DocumentFlow from "@/components/DocumentFlow";

const revenueItems = [
  "Company Data Enrichment",
  "CRM Structuring",
  "Segmentation & Lead Scoring",
  "Personalised AI Messaging",
  "Email Automation",
  "Call Workflow Integration",
  "Conversion Tracking",
  "Pipeline Dashboards & Sales Analytics",
];

const documents = [
  "Invoice",
  "Purchase Order",
  "Audit Report",
  "Certificate",
  "Quality Document",
  "Customer File",
];

const docKpis = [
  { title: "Less manual handling", text: "fewer repetitive touchpoints" },
  { title: "Fewer errors", text: "consistent, validated data" },
  { title: "Faster processing", text: "reduced turnaround time" },
  { title: "Traceability", text: "structured, auditable data" },
];

const quoteInputs = ["Historical Quotations", "Customer Requirements", "Pricing Rules", "Expert Know-How"];
const quoteValue = [
  "Faster response time",
  "Reuse of company knowledge",
  "Improved consistency",
  "Reduced repetitive expert work",
];
const quoteKpis = [
  "quotation preparation time",
  "historical knowledge reuse",
  "human validation rate",
];

const dcm = [
  {
    tag: "Digitise",
    title: "Paper · Excel · Email",
    flow: "→ Digital workflows",
    result: "→ Controlled documents & traceability",
  },
  {
    tag: "Connect",
    title: "ERP · CRM · Machines · Applications",
    flow: "→ Connected systems & data flows",
    result: "→ Integrated operational data",
  },
  {
    tag: "Model",
    title: "Physical Process",
    flow: "→ Simulation · Digital Twin",
    result: "→ Decision support",
  },
];

export default function UseCasesSection() {
  return (
    <>
      <section className="bg-[#fbfbfd]">
        <div className="wrap py-20 lg:py-28">
          <SectionHead
            n="04"
            kicker="Revenue Intelligence"
            title="Build a sales engine that learns."
          >
            An engineering and automation capability, not an off-the-shelf platform — built around your data, your CRM and your sales process.
          </SectionHead>

          <Reveal>
            <FlowStrip
              nodes={[
                "Prospect Data",
                "Enrichment",
                "Segmentation",
                "AI Personalisation",
                "Email / Calls",
                "CRM",
                "Conversion",
                "Analysis",
              ]}
            />
          </Reveal>

          <ul className="mt-12 grid sm:grid-cols-2 gap-x-10">
            {revenueItems.map((item) => (
              <li key={item} className="border-t border-[#e6e9f2] py-3 text-sm text-[#0a1638]">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#0a1638] text-white">
        <div className="grid lg:grid-cols-2 lg:min-h-[720px]">
          <div className="flex items-center">
            <div className="w-full max-w-[640px] ml-auto px-8 lg:px-12 xl:pr-16 py-16 lg:py-20">
              <p className="kicker text-[#71cbcc] mb-5">Use Case · Document Automation</p>
              <h2 className="serif text-[2.4rem] sm:text-[3.2rem] leading-[1.08]">
                Document → Data → ERP → Action
              </h2>

              <ul className="mt-8 grid grid-cols-2 gap-x-6">
                {documents.map((tag) => (
                  <li key={tag} className="border-t border-white/15 py-3 text-sm text-white/80">
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-10 pt-8 border-t border-white/15">
                {docKpis.map((item) => (
                  <div key={item.title}>
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm text-white/50">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                  <p className="text-[11px] tracking-[0.18em] uppercase text-[#71cbcc] mb-2">Typical First Pilot</p>
                  <p className="serif text-[1.55rem] leading-snug">
                    One document type. One workflow. One KPI.
                  </p>
                </div>
                <a href="#contact" className="btn btn-red shrink-0">
                  Discuss an Automation Pilot
                </a>
              </div>
            </div>
          </div>

          <DocumentFlow />
        </div>
      </section>

      <section className="bg-white">
        <div className="wrap py-20 lg:py-28">
          <SectionHead n="05" kicker="Use Case · Quotation Intelligence" title="Years of quotations. One intelligent system." />

          <Reveal>
            <FlowStrip
              nodes={[
                "Historical Data",
                "Knowledge Extraction",
                "Similar Case Retrieval",
                "AI-Assisted Proposal",
                "Human Validation",
                "Quotation",
              ]}
            />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <div>
              <h3 className="text-[11px] tracking-[0.18em] uppercase text-[#1c3a8a] mb-4">Inputs</h3>
              <ul>
                {quoteInputs.map((item) => (
                  <li key={item} className="border-t border-[#e6e9f2] py-3 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[11px] tracking-[0.18em] uppercase text-[#1c3a8a] mb-4">Business Value</h3>
              <ul>
                {quoteValue.map((item) => (
                  <li key={item} className="border-t border-[#e6e9f2] py-3 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            {quoteKpis.map((item) => (
              <div key={item} className="border-t-2 border-[#e31c23] pt-4">
                <p className="text-sm font-semibold text-[#0a1638]">Measured through</p>
                <p className="mt-1 text-sm text-[#5b6178]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a1638] text-white">
        <div className="wrap py-20 lg:py-24">
          <p className="kicker text-[#71cbcc] mb-4">Use Case · Knowledge Assistant</p>
          <h2 className="serif text-[2.4rem] sm:text-[3.1rem] leading-[1.08] max-w-3xl mb-10">
            Turn experience into an operational asset.
          </h2>

          <FlowStrip
            dark
            nodes={[
              "Expert Knowledge · Procedures · Cases · ERP/CRM · Documents",
              "Structured Operational Knowledge",
              "Trusted AI Assistant",
            ]}
          />

          <p className="mt-10 text-white/65">
            Answer with source · Linked procedure · Recommended action · Human approval
          </p>
          <p className="serif text-2xl mt-8 max-w-xl">
            AI does not replace operational knowledge.{" "}
            <span className="text-[#e31c23]">It makes structured knowledge usable at scale.</span>
          </p>
        </div>
      </section>

      <section className="bg-[#fbfbfd]">
        <div className="wrap py-20 lg:py-28">
          <SectionHead n="06" kicker="Digitalisation & Digital Twin" title="Digitise. Connect. Model.">
            Start with the problem. Add complexity only when it creates value.
          </SectionHead>

          <div className="grid md:grid-cols-3 gap-4">
            {dcm.map((item, i) => (
              <Reveal key={item.tag} delay={i * 0.06}>
                <article className="border border-[#e6e9f2] bg-white p-8 h-full">
                  <p className="text-[11px] tracking-[0.18em] uppercase text-[#e31c23] mb-4">{item.tag}</p>
                  <h3 className="serif text-2xl text-[#0a1638] mb-6">{item.title}</h3>
                  <p className="text-sm text-[#5b6178]">{item.flow}</p>
                  <p className="mt-2 text-sm font-semibold text-[#0a1638]">{item.result}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
