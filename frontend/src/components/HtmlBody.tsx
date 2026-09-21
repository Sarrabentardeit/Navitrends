import { sanitizeHtml } from "@/lib/html";

export default function HtmlBody({ html }: { html?: string }) {
  const clean = sanitizeHtml(html ?? "");
  if (!clean) return null;
  return <div className="cms-body" dangerouslySetInnerHTML={{ __html: clean }} />;
}
