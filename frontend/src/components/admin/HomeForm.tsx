"use client";

import { useState } from "react";
import en from "@/i18n/en";
import { Field, ImageField } from "@/components/admin/Fields";
import SeoPreview from "@/components/admin/SeoPreview";

const tabs = [
  ["hero", "Hero"],
  ["solve", "What We Solve"],
  ["services", "Services"],
  ["process", "How We Work"],
  ["cases", "Case Studies"],
  ["why", "Why Navitrends"],
  ["faq", "FAQ"],
  ["cta", "Contact"],
  ["nav", "Menu"],
  ["footer", "Footer"],
  ["seo", "SEO"],
] as const;

type Tab = (typeof tabs)[number][0];

type HomeDoc = {
  hero?: Partial<typeof en.hero>;
  solve?: Partial<typeof en.solve>;
  chain?: typeof en.chain;
  services?: Partial<typeof en.services>;
  process?: Partial<typeof en.process>;
  cases?: Partial<typeof en.cases>;
  why?: Partial<typeof en.why>;
  cta?: Partial<typeof en.cta>;
  faq?: Partial<typeof en.faq>;
  nav?: Partial<typeof en.nav>;
  footer?: Partial<typeof en.footer>;
  cookies?: Partial<typeof en.cookies>;
  seoTitle?: string;
  seoDescription?: string;
  ctaImageUrl?: string;
};

export default function HomeForm({
  initial,
  initialTab,
}: {
  initial: HomeDoc | Record<string, unknown> | null;
  initialTab?: string;
}) {
  const doc = (initial ?? null) as HomeDoc | null;
  const start = tabs.some(([id]) => id === initialTab) ? (initialTab as Tab) : "hero";
  const [tab, setTab] = useState<Tab>(start);
  const [hero, setHero] = useState({
    ...en.hero,
    ...doc?.hero,
    words: doc?.hero?.words?.length ? doc.hero.words : en.hero.words,
    diagram: { ...en.hero.diagram, ...doc?.hero?.diagram },
  });
  const [solve, setSolve] = useState({
    ...en.solve,
    ...doc?.solve,
    results: doc?.solve?.results?.length ? doc.solve.results : en.solve.results,
  });
  const [chain, setChain] = useState(doc?.chain?.length ? doc.chain : en.chain);
  const [services, setServices] = useState({
    ...en.services,
    ...doc?.services,
    families: doc?.services?.families?.length ? doc.services.families : en.services.families,
  });
  const [process, setProcess] = useState({
    ...en.process,
    ...doc?.process,
    steps: doc?.process?.steps?.length ? doc.process.steps : en.process.steps,
    flow: doc?.process?.flow?.length ? doc.process.flow : en.process.flow,
  });
  const [cases, setCases] = useState({
    ...en.cases,
    ...doc?.cases,
    featured: doc?.cases?.featured?.length ? doc.cases.featured : en.cases.featured,
    compact: doc?.cases?.compact?.length ? doc.cases.compact : en.cases.compact,
  });
  const [why, setWhy] = useState({
    ...en.why,
    ...doc?.why,
    reasons: doc?.why?.reasons?.length ? doc.why.reasons : en.why.reasons,
  });
  const [cta, setCta] = useState({ ...en.cta, ...doc?.cta });
  const [faq, setFaq] = useState({
    ...en.faq,
    ...doc?.faq,
    items: doc?.faq?.items?.length ? doc.faq.items : en.faq.items,
  });
  const [nav, setNav] = useState({ ...en.nav, ...doc?.nav });
  const [footer, setFooter] = useState({
    ...en.footer,
    ...doc?.footer,
    places: doc?.footer?.places?.length ? doc.footer.places : en.footer.places,
  });
  const [cookies, setCookies] = useState({ ...en.cookies, ...doc?.cookies });
  const [seoTitle, setSeoTitle] = useState(doc?.seoTitle ?? "Navitrends UK | Operational Systems, Automation, Data & AI");
  const [seoDescription, setSeoDescription] = useState(
    doc?.seoDescription ??
      "Navitrends UK helps SMEs and industrial organisations digitise operations, connect systems, automate workflows and apply AI to measurable business problems."
  );
  const [ctaImageUrl, setCtaImageUrl] = useState(doc?.ctaImageUrl ?? "/images/software-dashboard.jpg");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function save() {
    setPending(true);
    setMessage("");
    const res = await fetch("/api/admin/home", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hero,
        solve,
        chain,
        services,
        process,
        cases,
        why,
        faq,
        cta,
        nav,
        footer,
        cookies,
        seoTitle,
        seoDescription,
        ctaImageUrl,
      }),
    });
    setPending(false);
    setMessage(res.ok ? "Tout l’accueil est enregistré. Rechargez le site public pour voir les changements." : "Enregistrement impossible.");
  }

  return (
    <div>
      <p className="mb-6 max-w-2xl text-sm text-[#4b5573]">
        Ces onglets = les sections de navitrends.uk. Le <strong>H1</strong> est le titre du Hero. Chaque autre
        section a un <strong>H2</strong>. Pour changer l’ordre ou les couleurs, allez dans{" "}
        <a href="/admin/appearance" className="text-[#e31c23]">
          Apparence
        </a>
        .
      </p>
      <div className="max-w-3xl">
      <div className="mb-8 flex flex-wrap gap-2">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setTab(id);
              window.history.replaceState(null, "", `/admin/home?section=${id}`);
            }}
            className={`px-3 py-1.5 text-xs uppercase tracking-[0.14em] ${
              tab === id ? "bg-[#0a1638] text-white" : "bg-white text-[#4b5573]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "hero" && (
        <div className="space-y-4">
          <Field label="Surtitre" value={hero.kicker} onChange={(v) => setHero({ ...hero, kicker: v })} hint="Petit texte au-dessus du H1" />
          <Field label="Titre H1 (début)" value={hero.lead} onChange={(v) => setHero({ ...hero, lead: v })} hint="We engineer" />
          <Field label="Titre H1 (fin)" value={hero.trail} onChange={(v) => setHero({ ...hero, trail: v })} hint="that scales" />
          <Field
            label="Mots animés (virgules)"
            value={hero.words.join(", ")}
            onChange={(v) => setHero({ ...hero, words: v.split(",").map((w) => w.trim()).filter(Boolean) })}
          />
          <Field label="Texte" value={hero.body} onChange={(v) => setHero({ ...hero, body: v })} area />
          <Field label="Bouton principal" value={hero.talk} onChange={(v) => setHero({ ...hero, talk: v })} />
          <Field label="Bouton secondaire" value={hero.work} onChange={(v) => setHero({ ...hero, work: v })} />
          <p className="pt-2 text-[11px] uppercase tracking-[0.16em] text-[#8b91a5]">Schéma bleu à droite (ERP, Automation…)</p>
          <Field label="Haut gauche" value={hero.diagram.erp} onChange={(v) => setHero({ ...hero, diagram: { ...hero.diagram, erp: v } })} />
          <Field label="Haut droite" value={hero.diagram.automation} onChange={(v) => setHero({ ...hero, diagram: { ...hero.diagram, automation: v } })} />
          <Field label="Centre" value={hero.diagram.core} onChange={(v) => setHero({ ...hero, diagram: { ...hero.diagram, core: v } })} />
          <Field label="Bas gauche" value={hero.diagram.bi} onChange={(v) => setHero({ ...hero, diagram: { ...hero.diagram, bi: v } })} />
          <Field label="Bas droite" value={hero.diagram.security} onChange={(v) => setHero({ ...hero, diagram: { ...hero.diagram, security: v } })} />
        </div>
      )}

      {tab === "solve" && (
        <div className="space-y-4">
          <Field label="Surtitre" value={solve.kicker} onChange={(v) => setSolve({ ...solve, kicker: v })} />
          <Field label="Titre H2" value={solve.title} onChange={(v) => setSolve({ ...solve, title: v })} area />
          <Field label="The data is stored" value={solve.stored} onChange={(v) => setSolve({ ...solve, stored: v })} />
          <Field label="The decision logic" value={solve.logic} onChange={(v) => setSolve({ ...solve, logic: v })} />
          <Field label="Texte" value={solve.body} onChange={(v) => setSolve({ ...solve, body: v })} area />
          <Field
            label="Résultats (une ligne chacun)"
            value={solve.results.join("\n")}
            onChange={(v) => setSolve({ ...solve, results: v.split("\n").map((x) => x.trim()).filter(Boolean) })}
            area
          />
          <Field label="Risk kicker" value={solve.riskKicker} onChange={(v) => setSolve({ ...solve, riskKicker: v })} />
          <Field label="Risk before" value={solve.riskBefore} onChange={(v) => setSolve({ ...solve, riskBefore: v })} area />
          <Field label="Risk mark" value={solve.riskMark} onChange={(v) => setSolve({ ...solve, riskMark: v })} />
          <Field label="Risk factors" value={solve.riskFactors} onChange={(v) => setSolve({ ...solve, riskFactors: v })} />
          <Field label="Risk footer" value={solve.riskFoot} onChange={(v) => setSolve({ ...solve, riskFoot: v })} />
          <p className="pt-4 text-[11px] uppercase tracking-[0.16em] text-[#8b91a5]">Blocs de la section</p>
          {chain.map((item, index) => (
            <div key={index} className="border border-[#e6e9f2] bg-white p-4 space-y-3">
              <Field
                label={`Bloc ${index + 1} — titre`}
                value={item.title}
                onChange={(v) => setChain(chain.map((c, i) => (i === index ? { ...c, title: v } : c)))}
              />
              <Field
                label="Texte"
                value={item.text}
                onChange={(v) => setChain(chain.map((c, i) => (i === index ? { ...c, text: v } : c)))}
                area
              />
            </div>
          ))}
        </div>
      )}

      {tab === "services" && (
        <div className="space-y-4">
          <Field label="Surtitre" value={services.kicker} onChange={(v) => setServices({ ...services, kicker: v })} />
          <Field label="Titre H2" value={services.title} onChange={(v) => setServices({ ...services, title: v })} />
          <Field label="Intro" value={services.intro} onChange={(v) => setServices({ ...services, intro: v })} area />
          {services.families.map((family, index) => (
            <div key={index} className="border border-[#e6e9f2] bg-white p-4 space-y-3">
              <Field
                label={`Famille ${family.n}`}
                value={family.title}
                onChange={(v) =>
                  setServices({
                    ...services,
                    families: services.families.map((f, i) => (i === index ? { ...f, title: v } : f)),
                  })
                }
              />
              <Field
                label="Tagline"
                value={family.tagline}
                onChange={(v) =>
                  setServices({
                    ...services,
                    families: services.families.map((f, i) => (i === index ? { ...f, tagline: v } : f)),
                  })
                }
              />
              <Field
                label="Items (une ligne chacun)"
                value={family.items.join("\n")}
                onChange={(v) =>
                  setServices({
                    ...services,
                    families: services.families.map((f, i) =>
                      i === index ? { ...f, items: v.split("\n").map((x) => x.trim()).filter(Boolean) } : f
                    ),
                  })
                }
                area
              />
            </div>
          ))}
        </div>
      )}

      {tab === "process" && (
        <div className="space-y-4">
          <Field label="Surtitre" value={process.kicker} onChange={(v) => setProcess({ ...process, kicker: v })} />
          <Field label="Titre H2" value={process.title} onChange={(v) => setProcess({ ...process, title: v })} />
          <Field label="Intro" value={process.intro} onChange={(v) => setProcess({ ...process, intro: v })} area />
          <Field label="Mot Deliverable" value={process.deliverable} onChange={(v) => setProcess({ ...process, deliverable: v })} />
          {process.steps.map((step, index) => (
            <div key={index} className="border border-[#e6e9f2] bg-white p-4 space-y-3">
              <Field
                label="Étape"
                value={step.n}
                onChange={(v) => setProcess({ ...process, steps: process.steps.map((s, i) => (i === index ? { ...s, n: v } : s)) })}
              />
              <Field
                label="Titre"
                value={step.title}
                onChange={(v) => setProcess({ ...process, steps: process.steps.map((s, i) => (i === index ? { ...s, title: v } : s)) })}
                area
              />
              <Field
                label="Livrable"
                value={step.deliverable}
                onChange={(v) =>
                  setProcess({ ...process, steps: process.steps.map((s, i) => (i === index ? { ...s, deliverable: v } : s)) })
                }
              />
            </div>
          ))}
          <Field
            label="Flow (virgules)"
            value={process.flow.join(", ")}
            onChange={(v) => setProcess({ ...process, flow: v.split(",").map((x) => x.trim()).filter(Boolean) })}
          />
        </div>
      )}

      {tab === "cases" && (
        <div className="space-y-4">
          <Field label="Surtitre" value={cases.kicker} onChange={(v) => setCases({ ...cases, kicker: v })} />
          <Field label="Titre H2" value={cases.title} onChange={(v) => setCases({ ...cases, title: v })} />
          {cases.featured.map((item, index) => (
            <div key={index} className="border border-[#e6e9f2] bg-white p-4 space-y-3">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#8b91a5]">Cas {index + 1}</p>
              <Field label="Tag" value={item.tag} onChange={(v) => setCases({ ...cases, featured: cases.featured.map((c, i) => (i === index ? { ...c, tag: v } : c)) })} />
              <Field label="Lieu" value={item.place} onChange={(v) => setCases({ ...cases, featured: cases.featured.map((c, i) => (i === index ? { ...c, place: v } : c)) })} />
              <Field label="Titre" value={item.title} onChange={(v) => setCases({ ...cases, featured: cases.featured.map((c, i) => (i === index ? { ...c, title: v } : c)) })} />
              <Field label="Challenge" value={item.challenge} onChange={(v) => setCases({ ...cases, featured: cases.featured.map((c, i) => (i === index ? { ...c, challenge: v } : c)) })} area />
              <Field label="Solution" value={item.solution} onChange={(v) => setCases({ ...cases, featured: cases.featured.map((c, i) => (i === index ? { ...c, solution: v } : c)) })} area />
              <Field label="Outcome" value={item.outcome} onChange={(v) => setCases({ ...cases, featured: cases.featured.map((c, i) => (i === index ? { ...c, outcome: v } : c)) })} area />
            </div>
          ))}
          {cases.compact.map((item, index) => (
            <div key={index} className="border border-[#e6e9f2] bg-white p-4 space-y-3">
              <Field label="Tag court" value={item.tag} onChange={(v) => setCases({ ...cases, compact: cases.compact.map((c, i) => (i === index ? { ...c, tag: v } : c)) })} />
              <Field label="Lieu" value={item.place} onChange={(v) => setCases({ ...cases, compact: cases.compact.map((c, i) => (i === index ? { ...c, place: v } : c)) })} />
              <Field label="Texte" value={item.text} onChange={(v) => setCases({ ...cases, compact: cases.compact.map((c, i) => (i === index ? { ...c, text: v } : c)) })} area />
            </div>
          ))}
        </div>
      )}

      {tab === "why" && (
        <div className="space-y-4">
          <Field label="Surtitre" value={why.kicker} onChange={(v) => setWhy({ ...why, kicker: v })} />
          <Field label="Titre H2" value={why.title} onChange={(v) => setWhy({ ...why, title: v })} />
          <Field label="Intro" value={why.intro} onChange={(v) => setWhy({ ...why, intro: v })} area />
          {why.reasons.map((item, index) => (
            <div key={index} className="border border-[#e6e9f2] bg-white p-4 space-y-3">
              <Field label="Titre" value={item.title} onChange={(v) => setWhy({ ...why, reasons: why.reasons.map((r, i) => (i === index ? { ...r, title: v } : r)) })} />
              <Field label="Texte" value={item.text} onChange={(v) => setWhy({ ...why, reasons: why.reasons.map((r, i) => (i === index ? { ...r, text: v } : r)) })} area />
            </div>
          ))}
        </div>
      )}

      {tab === "faq" && (
        <div className="space-y-4">
          <Field label="Surtitre" value={faq.kicker} onChange={(v) => setFaq({ ...faq, kicker: v })} />
          <Field label="Titre H2" value={faq.title} onChange={(v) => setFaq({ ...faq, title: v })} />
          {faq.items.map((item, index) => (
            <div key={index} className="border border-[#e6e9f2] bg-white p-4 space-y-3">
              <Field
                label={`Question ${index + 1}`}
                value={item.q}
                onChange={(v) => setFaq({ ...faq, items: faq.items.map((row, i) => (i === index ? { ...row, q: v } : row)) })}
              />
              <Field
                label="Réponse"
                value={item.a}
                onChange={(v) => setFaq({ ...faq, items: faq.items.map((row, i) => (i === index ? { ...row, a: v } : row)) })}
                area
              />
              <button
                type="button"
                className="text-xs text-[#e31c23]"
                onClick={() => setFaq({ ...faq, items: faq.items.filter((_, i) => i !== index) })}
              >
                Supprimer
              </button>
            </div>
          ))}
          <button
            type="button"
            className="text-sm text-[#e31c23]"
            onClick={() => setFaq({ ...faq, items: [...faq.items, { q: "", a: "" }] })}
          >
            + Ajouter une question
          </button>
        </div>
      )}

      {tab === "cta" && (
        <div className="space-y-4">
          <ImageField
            label="Image de fond (contact)"
            url={ctaImageUrl}
            onUploaded={({ url }) => {
              setCtaImageUrl(url);
            }}
          />
          <Field label="Surtitre" value={cta.kicker} onChange={(v) => setCta({ ...cta, kicker: v })} />
          <Field label="Titre H2" value={cta.title} onChange={(v) => setCta({ ...cta, title: v })} />
          <Field label="Texte" value={cta.body} onChange={(v) => setCta({ ...cta, body: v })} area />
          <Field label="Aside" value={cta.aside} onChange={(v) => setCta({ ...cta, aside: v })} area />
          <Field label="Ligne légale" value={cta.legal} onChange={(v) => setCta({ ...cta, legal: v })} />
          <Field label="Titre du formulaire" value={cta.formTitle} onChange={(v) => setCta({ ...cta, formTitle: v })} />
          <Field label="Intro formulaire" value={cta.formIntro} onChange={(v) => setCta({ ...cta, formIntro: v })} area />
          <Field label="Merci" value={cta.thanks} onChange={(v) => setCta({ ...cta, thanks: v })} area />
        </div>
      )}

      {tab === "nav" && (
        <div className="space-y-4">
          <Field label="What We Solve" value={nav.solve} onChange={(v) => setNav({ ...nav, solve: v })} />
          <Field label="Services" value={nav.services} onChange={(v) => setNav({ ...nav, services: v })} />
          <Field label="How We Work" value={nav.work} onChange={(v) => setNav({ ...nav, work: v })} />
          <Field label="Case Studies" value={nav.cases} onChange={(v) => setNav({ ...nav, cases: v })} />
          <Field label="Why Navitrends" value={nav.why} onChange={(v) => setNav({ ...nav, why: v })} />
          <Field label="FAQ" value={nav.faq} onChange={(v) => setNav({ ...nav, faq: v })} />
          <Field label="Contact" value={nav.contact} onChange={(v) => setNav({ ...nav, contact: v })} />
          <Field label="Book a Diagnostic" value={nav.book} onChange={(v) => setNav({ ...nav, book: v })} />
        </div>
      )}

      {tab === "footer" && (
        <div className="space-y-4">
          {footer.places.map((place, index) => (
            <div key={index} className="border border-[#e6e9f2] bg-white p-4 space-y-3">
              <Field label="Région" value={place.region} onChange={(v) => setFooter({ ...footer, places: footer.places.map((p, i) => (i === index ? { ...p, region: v } : p)) })} />
              <Field label="Détail" value={place.detail} onChange={(v) => setFooter({ ...footer, places: footer.places.map((p, i) => (i === index ? { ...p, detail: v } : p)) })} />
            </div>
          ))}
          <Field label="Ligne légale" value={footer.legal} onChange={(v) => setFooter({ ...footer, legal: v })} />
          <Field label="Privacy" value={footer.privacy} onChange={(v) => setFooter({ ...footer, privacy: v })} />
          <Field label="Terms" value={footer.terms} onChange={(v) => setFooter({ ...footer, terms: v })} />
          <Field label="Cookies titre" value={cookies.title} onChange={(v) => setCookies({ ...cookies, title: v })} />
          <Field label="Cookies texte" value={cookies.body} onChange={(v) => setCookies({ ...cookies, body: v })} area />
        </div>
      )}

      {tab === "seo" && (
        <div className="space-y-4">
          <SeoPreview title={seoTitle} description={seoDescription} path="https://navitrends.uk" />
          <Field label="Titre Google" value={seoTitle} onChange={setSeoTitle} hint="50–60 caractères" />
          <Field label="Meta description" value={seoDescription} onChange={setSeoDescription} area hint="120–160 caractères" />
        </div>
      )}

      <div className="mt-8">
        <button type="button" onClick={save} disabled={pending} className="btn btn-red">
          {pending ? "Enregistrement…" : "Enregistrer tout l’accueil"}
        </button>
        {message && <p className="mt-3 text-sm text-[#4b5573]">{message}</p>}
      </div>
    </div>
    </div>
  );
}
