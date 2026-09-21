import AdminHeader from "@/components/admin/AdminHeader";
import AppearanceForm from "@/components/admin/AppearanceForm";
import { getAppearance } from "@/lib/cmsStore";

export default async function AppearancePage() {
  const appearance = await getAppearance();

  return (
    <div>
      <AdminHeader
        kicker="Apparence"
        title="Couleurs & emplacements"
        description="Comme WordPress : choisissez les couleurs du site et l’ordre des blocs sur l’accueil. Les titres H1 / H2 se règlent dans Accueil, section par section."
      />
      <AppearanceForm initial={appearance} />
    </div>
  );
}
