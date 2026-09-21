import AdminHeader from "@/components/admin/AdminHeader";
import InsightForm from "@/components/admin/InsightForm";

export default function NewInsightPage() {
  return (
    <div>
      <AdminHeader
        kicker="Insights"
        title="Nouvel article"
        description="Sélectionnez du texte puis Gras, Italique, H1 ou H2 — comme dans WordPress. L’article apparaît sur navitrends.uk/insights/votre-slug."
      />
      <InsightForm />
    </div>
  );
}
