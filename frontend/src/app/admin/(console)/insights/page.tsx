import Link from "next/link";
import AdminHeader, { formatAdminDate } from "@/components/admin/AdminHeader";
import { listPosts } from "@/lib/cmsStore";

export default async function AdminInsightsPage() {
  const posts = await listPosts();

  return (
    <div>
      <AdminHeader
        kicker="Contenu"
        title="Blog"
        description="Articles du blog. Dès le premier article publié, Insights apparaît dans le menu du site, à navitrends.uk/insights."
        action={
          <Link href="/admin/insights/new" className="btn btn-red">
            Nouvel article
          </Link>
        }
      />

      <div className="overflow-x-auto border border-[#e6e9f2] bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-[#e6e9f2] bg-[#fbfbfd] text-[11px] uppercase tracking-[0.14em] text-[#8b91a5]">
            <tr>
              <th className="px-5 py-3 font-medium">Article</th>
              <th className="px-5 py-3 font-medium">URL publique</th>
              <th className="px-5 py-3 font-medium">Statut</th>
              <th className="px-5 py-3 font-medium">Publié</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e6e9f2]">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-[#5b6178]">
                  Aucun article. Le premier Insight apparaîtra ici et sur le site public.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post._id} className="hover:bg-[#fbfbfd]">
                  <td className="px-5 py-4">
                    <p className="text-[#0a1638]">{post.title}</p>
                    {post.excerpt ? <p className="mt-1 max-w-sm truncate text-xs text-[#8b91a5]">{post.excerpt}</p> : null}
                  </td>
                  <td className="px-5 py-4 text-[#5b6178]">/insights/{post.slug}</td>
                  <td className="px-5 py-4">
                    <span className="bg-[#ecfdf3] px-2 py-1 text-[11px] uppercase tracking-[0.12em] text-[#166534]">Publié</span>
                  </td>
                  <td className="px-5 py-4 text-[#8b91a5]">{formatAdminDate(post.publishedAt)}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-4 text-xs">
                      <a href={`/insights/${post.slug}`} target="_blank" rel="noreferrer" className="text-[#8b91a5] hover:text-[#0a1638]">
                        Voir
                      </a>
                      <Link href={`/admin/insights/${post._id}`} className="text-[#e31c23]">
                        Modifier
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
