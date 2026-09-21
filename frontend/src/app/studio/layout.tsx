import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Navitrends Admin",
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
