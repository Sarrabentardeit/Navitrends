import HomeForm from "@/components/admin/HomeForm";
import AdminHeader from "@/components/admin/AdminHeader";
import { getHome } from "@/lib/cmsStore";

export default async function AdminHomePage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>;
}) {
  const [{ section }, doc] = await Promise.all([searchParams, getHome()]);

  return (
    <div>
      <AdminHeader
        kicker="Le site"
        title="Accueil"
        description="Votre site n’a pas un menu Pages. C’est une seule homepage. Chaque onglet est un bloc (Hero = H1, les autres = H2). Couleurs et ordre des blocs : Apparence."
        action={
          <a href="/" target="_blank" rel="noreferrer" className="btn btn-line">
            Voir l’accueil
          </a>
        }
      />
      <HomeForm initial={doc} initialTab={section} />
    </div>
  );
}
