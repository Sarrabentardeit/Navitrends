import HeaderA from "@/components/maquette-a/HeaderA";
import FooterA from "@/components/maquette-a/FooterA";

export default function MaquetteALayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderA />
      <main className="flex-1">{children}</main>
      <FooterA />
    </>
  );
}
