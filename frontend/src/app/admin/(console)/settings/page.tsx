import SettingsForm from "@/components/admin/SettingsForm";
import AdminHeader from "@/components/admin/AdminHeader";
import { getSettings } from "@/lib/cmsStore";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div>
      <AdminHeader
        kicker="Site"
        title="Réglages"
        description="Identité visible sur le site : logo du header, téléphone, email, adresse, et les deux liens Privacy / Terms du footer."
      />
      <SettingsForm initial={settings} />
    </div>
  );
}
