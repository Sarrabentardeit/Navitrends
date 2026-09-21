import Link from "next/link";
import SeedButton from "@/components/admin/SeedButton";
import AdminHeader from "@/components/admin/AdminHeader";
import { getSettings, listMedia } from "@/lib/cmsStore";

const sections = [
  { href: "/admin/home?section=hero", title: "Hero", body: "We engineer Intelligence that scales.", site: "/" },
  { href: "/admin/home?section=solve", title: "What We Solve", body: "Section du menu, sous le hero.", site: "/#solve" },
  { href: "/admin/home?section=services", title: "Services", body: "Les 4 familles de services.", site: "/#services" },
  { href: "/admin/home?section=process", title: "How We Work", body: "La méthode en étapes.", site: "/#how-we-work" },
  { href: "/admin/home?section=cases", title: "Case Studies", body: "Les cas clients.", site: "/#case-studies" },
  { href: "/admin/home?section=why", title: "Why Navitrends", body: "Pourquoi Navitrends.", site: "/#why" },
  { href: "/admin/home?section=faq", title: "FAQ", body: "Questions / réponses pour Google et l’IA.", site: "/#faq" },
  { href: "/admin/home?section=cta", title: "Contact", body: "Book a Diagnostic.", site: "/#contact" },
];

export default async function AdminHome() {
  const [images, settings] = await Promise.all([listMedia(), getSettings()]);

  return (
    <div>
      <AdminHeader
        kicker="Console"
        title="Tableau de bord"
        description="Chaque bloc ci-dessous est une section réelle de navitrends.uk. Apparence = couleurs + ordre. Accueil = textes H1 / H2."
        action={
          <a href="/" target="_blank" rel="noreferrer" className="btn btn-red">
            Voir le site
          </a>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Link href="/admin/home" className="border border-[#e6e9f2] bg-white p-5 hover:border-[#0a1638]">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#8b91a5]">Accueil</p>
          <p className="serif mt-2 text-2xl">8 sections · H1 / H2 / FAQ</p>
        </Link>
        <Link href="/admin/appearance" className="border border-[#e6e9f2] bg-white p-5 hover:border-[#0a1638]">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#8b91a5]">Apparence</p>
          <p className="serif mt-2 text-2xl">Couleurs & places</p>
        </Link>
        <Link href="/admin/images" className="border border-[#e6e9f2] bg-white p-5 hover:border-[#0a1638]">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#8b91a5]">Images</p>
          <p className="serif mt-2 text-2xl">{images.length} fichier{images.length === 1 ? "" : "s"}</p>
        </Link>
      </div>

      <p className="mt-10 text-[11px] uppercase tracking-[0.16em] text-[#8b91a5]">Comme sur le site</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {sections.map((section) => (
          <div key={section.href} className="border border-[#e6e9f2] bg-white p-5">
            <p className="serif text-xl">{section.title}</p>
            <p className="mt-2 text-sm text-[#4b5573]">{section.body}</p>
            <div className="mt-4 flex gap-4 text-xs">
              <Link href={section.href} className="text-[#e31c23]">
                Modifier
              </Link>
              <a href={section.site} target="_blank" rel="noreferrer" className="text-[#8b91a5]">
                Voir
              </a>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-sm text-[#8b91a5]">
        Logo, téléphone ({settings.phone}) et liens Privacy / Terms du footer →{" "}
        <Link href="/admin/settings" className="text-[#e31c23]">
          Logo & contact
        </Link>
      </p>

      <SeedButton />
    </div>
  );
}
