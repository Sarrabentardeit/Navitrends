export const HOME_SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "solve", label: "What We Solve" },
  { id: "services", label: "Services" },
  { id: "process", label: "How We Work" },
  { id: "cases", label: "Case Studies" },
  { id: "why", label: "Why Navitrends" },
  { id: "faq", label: "FAQ" },
  { id: "cta", label: "Contact" },
] as const;

export type HomeSectionId = (typeof HOME_SECTIONS)[number]["id"];

export type AppearanceColors = {
  navy: string;
  red: string;
  cyan: string;
  background: string;
  muted: string;
};

export type AppearanceRecord = {
  colors: AppearanceColors;
  sections: { id: HomeSectionId; visible: boolean }[];
};

export function defaultAppearance(): AppearanceRecord {
  return {
    colors: {
      navy: "#0a1638",
      red: "#e31c23",
      cyan: "#71cbcc",
      background: "#fbfbfd",
      muted: "#4b5573",
    },
    sections: HOME_SECTIONS.map((section) => ({ id: section.id, visible: true })),
  };
}

export function labelForSection(id: string) {
  return HOME_SECTIONS.find((section) => section.id === id)?.label ?? id;
}
