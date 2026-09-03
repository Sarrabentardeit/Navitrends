import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/i18n/LanguageProvider";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </LanguageProvider>
  );
}
