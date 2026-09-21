import MediaLibrary from "@/components/admin/MediaLibrary";
import AdminHeader from "@/components/admin/AdminHeader";
import { listMedia } from "@/lib/cmsStore";

export default async function AdminImagesPage() {
  const items = await listMedia();

  return (
    <div>
      <AdminHeader
        kicker="Média"
        title="Images"
        description="Médiathèque : ajoutez, renommez, remplacez ou supprimez un visuel, puis publiez-le comme logo, visuel d’accueil ou couverture d’article."
      />
      <MediaLibrary initial={items} />
    </div>
  );
}
