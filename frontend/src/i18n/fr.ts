import type { Messages } from "./en";

const fr: Messages = {
  nav: {
    solve: "Ce que nous résolvons",
    services: "Services",
    work: "Notre méthode",
    cases: "Études de cas",
    why: "Pourquoi Navitrends",
    contact: "Contact",
    insights: "Insights",
    faq: "FAQ",
    book: "Réserver un diagnostic",
    menu: "Menu",
  },
  lang: {
    label: "Langue",
    en: "English",
    fr: "Français",
  },
  hero: {
    kicker: "Ingénierie des systèmes · Londres",
    lead: "Nous concevons",
    trail: "qui monte en charge.",
    words: ["ERP", "Automatisation", "Intelligence", "Sécurité", "Ingénierie"],
    body: "Nous cartographions le fonctionnement réel de l’opération. Puis nous y plaçons l’ERP, l’automatisation et le reporting — une équipe, une architecture.",
    talk: "Parlons-en",
    work: "Voir les réalisations",
    diagram: {
      erp: "ERP",
      automation: "Automatisation",
      core: "Cœur",
      bi: "BI",
      security: "Sécurité",
    },
  },
  solve: {
    kicker: "Ce que nous résolvons",
    title: "Les entreprises ont plus de données que jamais. Mais possèdent-elles vraiment leur connaissance opérationnelle ?",
    stored: "Les données sont stockées.",
    logic: "La logique de décision, souvent pas.",
    body: "Dans la plupart des PME et organisations industrielles, la connaissance qui fait réellement tourner l’activité vit chez quelques personnes — pas dans les systèmes censés la capturer. Le résultat est :",
    results: [
      "Du travail manuel répétitif et des rapports reconstruits à chaque fois",
      "Des retards, des erreurs et une dépendance aux experts",
      "Des données déconnectées dans des opérations pilotées par Excel",
      "Une connaissance qui disparaît quand les personnes expérimentées partent",
    ],
    riskKicker: "Risque opérationnel",
    riskBefore: "Que se passe-t-il lorsque 25 ans d’expérience",
    riskMark: "quittent l’entreprise ?",
    riskFactors: "Retraite · Turnover · Absence · Croissance · Externalisation",
    riskFoot: "La résilience opérationnelle commence par la connaissance.",
  },
  chain: [
    { title: "Les personnes", text: "L’expert connaît l’exception." },
    {
      title: "Excel · E-mail · Documents",
      text: "Le tableur contient l’ajustement. L’e-mail contient la décision.",
    },
    {
      title: "ERP · CRM · Applications · Machines",
      text: "L’ERP enregistre la commande.",
    },
  ],
  services: {
    kicker: "Services",
    title: "Trois leviers de valeur opérationnelle.",
    intro:
      "C’est le problème qui choisit la technologie — pas l’inverse. L’ERP quand l’ERP est nécessaire, l’automatisation quand elle suffit, et l’IA quand elle crée de la valeur.",
    families: [
      {
        n: "01",
        title: "Systèmes opérationnels",
        tagline: "Structurer et relier l’opération.",
        items: [
          "Remise à plat des processus ERP",
          "Odoo",
          "ERPNext",
          "Intégration API",
          "Applications métier sur mesure",
          "Processus zéro papier",
        ],
      },
      {
        n: "02",
        title: "Workflows intelligents",
        tagline: "Éliminer le travail répétitif.",
        items: [
          "Automatisation document vers ERP",
          "Traitement documentaire par IA",
          "Automatisation des devis",
          "Automatisation CRM",
          "Agents IA de workflow",
        ],
      },
      {
        n: "03",
        title: "Connaissance opérationnelle",
        tagline: "Transformer l’expérience en actif réutilisable.",
        items: [
          "Captation de la connaissance",
          "Assistant IA de connaissance",
          "Aide à la décision",
          "Jumeaux numériques",
          "Intelligence commerciale",
        ],
      },
    ],
  },
  process: {
    kicker: "Notre méthode",
    title: "Commencer petit. Prouver la valeur. Déployer ce qui marche.",
    intro: "Pas de grand programme de transformation tant que le business case n’est pas prouvé.",
    deliverable: "Livrable",
    steps: [
      {
        n: "01 — Découvrir",
        title: "Un processus. Un goulet d’étranglement. Une opportunité mesurable.",
        deliverable: "Note d’opportunité",
      },
      {
        n: "02 — Prouver",
        title: "Un cas d’usage. Un pilote. Un objectif mesurable.",
        deliverable: "Pilote opérationnel + résultat mesuré",
      },
      {
        n: "03 — Déployer",
        title: "ERP · Automatisation · IA · Ingénierie sur mesure · Support",
        deliverable: "Feuille de route production + plan de support",
      },
    ],
    flow: ["CONNAISSANCE", "SYSTÈME", "INTELLIGENCE", "VALEUR"],
  },
  cases: {
    kicker: "Études de cas",
    title: "Des preuves, pas des promesses.",
    challenge: "Enjeu :",
    solution: "Solution :",
    featured: [
      {
        tag: "Agent de workflow d’audit",
        place: "Alexann · France",
        title: "Des rapports d’audit manuels à l’exécution numérique automatisée.",
        challenge:
          "Les rapports d’audit devaient être classés et distribués entre organisations d’audit, laboratoires et leurs clients.",
        solution:
          "Classification automatisée, routage et distribution des rapports reliant organisations et clients.",
        outcome: "Mesuré par le temps de traitement, le taux de classification, le temps de routage et les interventions manuelles.",
      },
      {
        tag: "Intelligence devis",
        place: "GS Geo · Arabie saoudite",
        title: "Six ans de devis devenus une connaissance réutilisable.",
        challenge: "La préparation des devis exigeait de rechercher et de réutiliser la connaissance commerciale historique.",
        solution: "Extraction de connaissance, recherche de devis similaires, génération assistée par IA et validation humaine.",
        outcome: "Préparation des devis plus rapide, tout en préservant le savoir-faire de l’entreprise.",
      },
    ],
    compact: [
      {
        tag: "Zéro papier · ISO 9001",
        place: "M-Pack",
        text: "Workflows opérationnels digitalisés autour des exigences ISO 9001.",
      },
      {
        tag: "Laboratoire de métrologie",
        place: "IMC",
        text: "Digitalisation zéro papier structurée autour des exigences de métrologie ISO.",
      },
      {
        tag: "Jumeau numérique · En cours",
        place: "Procédé d’extrusion",
        text: "Modèle de procédé lié aux données opérationnelles, conçu pour la simulation et l’aide à la décision.",
      },
    ],
  },
  why: {
    kicker: "Pourquoi Navitrends",
    title: "Responsabilité au Royaume-Uni. Capacité d’ingénierie nearshore.",
    intro:
      "Une équipe de delivery intégrée — pas un transfert offshore — du diagnostic opérationnel au support en production.",
    reasons: [
      {
        title: "Compréhension industrielle",
        text: "24 ans d’expérience professionnelle ancrée dans les opérations industrielles.",
      },
      {
        title: "Ingénierie des systèmes",
        text: "ERP · Logiciel sur mesure · Intégration · Automatisation.",
      },
      {
        title: "Intelligence appliquée",
        text: "Connaissance · Données · IA · Aide à la décision.",
      },
      {
        title: "Delivery responsable",
        text: "Présence au Royaume-Uni et hub d’ingénierie intégré en Tunisie.",
      },
    ],
  },
  cta: {
    kicker: "Pour commencer",
    title: "Trouvons un problème qui mérite d’être résolu.",
    body: "Diagnostic de digitalisation opérationnelle de 30 minutes. Un processus. Un goulet d’étranglement. Un KPI. Une opportunité mesurable.",
    aside: "Pas de discours technologique avant d’avoir compris le problème.",
    legal: "Navitrends Ltd · 5 Brayford Square, London, United Kingdom E1 0SG",
    formTitle: "Réserver un diagnostic de 30 minutes",
    formIntro: "Nous examinerons votre demande avant l’appel, pour que l’échange porte sur votre problème opérationnel.",
    name: "Nom",
    company: "Société",
    email: "E-mail professionnel",
    phone: "Téléphone (optionnel)",
    role: "Fonction, ex. Directeur des opérations",
    size: "Taille de l’entreprise",
    problem: "Quel problème opérationnel souhaitez-vous résoudre ?",
    systems: "Systèmes actuels / ERP",
    contact: "Contact préféré",
    contactEmail: "E-mail",
    contactPhone: "Téléphone",
    contactEither: "Indifférent",
    submit: "Demander mon diagnostic",
    sending: "Envoi…",
    validation: "Veuillez renseigner votre nom, votre société et votre e-mail professionnel.",
    serverBefore: "Nous n’avons pas pu envoyer votre demande. Réessayez ou écrivez à",
    thanks: "Merci — votre demande a bien été reçue. Nous vous recontacterons rapidement pour confirmer l’appel de diagnostic.",
  },
  footer: {
    places: [
      { region: "Royaume-Uni", detail: "5 Brayford Square, London E1 0SG" },
      { region: "Europe", detail: "Royaume-Uni" },
      { region: "Afrique du Nord", detail: "Hub d’ingénierie en Tunisie" },
    ],
    services: "Services",
    cases: "Études de cas",
    contact: "Contact",
    privacy: "Confidentialité",
    terms: "Mentions légales",
    legal: "Navitrends Ltd · 5 Brayford Square, London, United Kingdom E1 0SG",
    cookies: "Cookies",
  },
  cookies: {
    title: "Cookies",
    body: "Nous n’utilisons des cookies d’analyse (Google Analytics) que si vous acceptez, pour mesurer les visites et les demandes de diagnostic. Les cookies essentiels font fonctionner le site. Vous pouvez modifier ce choix à tout moment.",
    accept: "Accepter",
    reject: "Refuser",
  },
  faq: {
    kicker: "FAQ",
    title: "Les questions qu’on nous pose en premier.",
    items: [
      {
        q: "Que fait concrètement Navitrends UK ?",
        a: "Nous aidons les PME et les organisations industrielles à digitaliser leurs opérations : relier l’ERP et les autres systèmes, automatiser ce qui vit encore dans Excel, et n’appliquer la data ou l’IA que lorsqu’un KPI mesurable bouge.",
      },
      {
        q: "Vous remplacez notre ERP actuel ?",
        a: "Pas par défaut. Nous cartographions le fonctionnement réel, puis nous remettons à plat, connectons ou étendons ce que vous avez. Un nouvel ERP n’est recommandé que si le système actuel ne peut plus porter le process.",
      },
      {
        q: "Pour qui est-ce fait ?",
        a: "Les dirigeants opérations, finance et IT de PME et groupes industriels en croissance, bloqués par des process qui dépendent de quelques experts, des données déconnectées et des reportings refaits à la main.",
      },
      {
        q: "Que se passe-t-il pendant le diagnostic ?",
        a: "Un appel de 30 minutes sur un process, un goulot et un KPI. Pas de catalogue logiciel avant d’avoir compris le problème. Vous repartez avec une prochaine étape claire.",
      },
      {
        q: "Où est basé Navitrends ?",
        a: "Navitrends Ltd est enregistrée au 5 Brayford Square, London E1 0SG, et travaille avec des organisations au Royaume-Uni, en Europe et en Afrique du Nord.",
      },
    ],
  },
  site: {
    phone: "+44 20 3996 2137",
    email: "contact@navitrends.com",
    address: "5 Brayford Square, London, United Kingdom E1 0SG",
    logoUrl: "/logo.png",
    ctaImageUrl: "/images/software-dashboard.jpg",
    privacyHref: "/p/privacy",
    termsHref: "/p/terms",
  },
};

export default fr;
