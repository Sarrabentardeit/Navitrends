import type { Metadata } from "next";
import { IBM_Plex_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

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
  title: "Navitrends UK | Operational Systems, Automation, Data & AI",
  description:
    "Navitrends UK helps SMEs and industrial organisations digitise operations, connect systems, automate workflows and apply AI to measurable business problems.",
  metadataBase: new URL("https://navitrends.uk"),
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || "RvX3EGFTW4dO07yXnohrAIrqfFI6SV8k_cgTLEjGn1U",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${plex.variable} ${cormorant.variable} min-h-dvh`}>
      <body className="min-h-dvh w-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
