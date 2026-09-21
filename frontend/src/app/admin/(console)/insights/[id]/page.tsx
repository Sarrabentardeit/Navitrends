import { notFound } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import InsightForm from "@/components/admin/InsightForm";
import { getPostById } from "@/lib/cmsStore";

export default async function EditInsightPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <div>
      <AdminHeader
        kicker="Insights"
        title={post.title || "Modifier l’article"}
        description={`Article public : navitrends.uk/insights/${post.slug}`}
        action={
          <a href={`/insights/${post.slug}`} target="_blank" rel="noreferrer" className="btn btn-line">
            Voir sur le site
          </a>
        }
      />
      <InsightForm
        id={id}
        initial={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          seoTitle: post.seoTitle,
          seoDescription: post.seoDescription,
          coverUrl: post.coverUrl,
          author: post.author,
        }}
      />
    </div>
  );
}
