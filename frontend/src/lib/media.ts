export type MediaUsage = {
  kind: "logo" | "cta" | "insight";
  label: string;
  href: string;
};

export type MediaRecord = {
  name: string;
  url: string;
  size: number;
  mtime: string;
  deletable: boolean;
  replaceable: boolean;
  alt: string;
  title: string;
  usage: MediaUsage[];
};
