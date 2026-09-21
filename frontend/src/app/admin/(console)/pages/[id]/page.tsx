import { notFound } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import PageForm from "@/components/admin/PageForm";
import { getPageById } from "@/lib/cmsStore";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await getPageById(id);
  if (!page) notFound();

  return (
    <div>
      <AdminHeader
        kicker="Pages"
        title={page.title || "Modifier la page"}
        description={`Page publique : navitrends.uk/p/${page.slug}`}
        action={
          <a href={`/p/${page.slug}`} target="_blank" rel="noreferrer" className="btn btn-line">
            Voir sur le site
          </a>
        }
      />
      <PageForm
        id={id}
        initial={{
          title: page.title,
          slug: page.slug,
          content: page.content,
          seoTitle: page.seoTitle,
          seoDescription: page.seoDescription,
        }}
      />
    </div>
  );
}
