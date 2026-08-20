import type { Metadata } from "next";
import { IBM_Plex_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import VersionSwitch from "@/components/VersionSwitch";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Navitrends UK — ERP, Automation & Digital Engineering",
  description:
    "London-based systems engineering firm. We design and implement ERP, automation and business intelligence around how your organisation actually operates.",
  metadataBase: new URL("https://navitrends.uk"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plex.variable} ${cormorant.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        {children}
        <VersionSwitch />
      </body>
    </html>
  );
}
