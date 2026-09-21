const ALLOWED = new Set([
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "ul",
  "ol",
  "li",
  "a",
  "br",
  "blockquote",
  "div",
  "span",
]);

export function isHtml(value: string) {
  return /<\/?(p|h[1-4]|strong|em|b|i|ul|ol|li|a|blockquote)\b/i.test(value);
}

export function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function plainToHtml(value: string) {
  const parts = value
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (!parts.length) return "";
  return parts.map((part) => `<p>${escapeHtml(part).replace(/\n/g, "<br>")}</p>`).join("");
}

export function sanitizeHtml(raw: string) {
  if (!raw?.trim()) return "";
  let html = isHtml(raw) ? raw : plainToHtml(raw);
  html = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");
  html = html.replace(/<\/?([a-z0-9]+)(\s[^>]*)?>/gi, (full, tag: string, attrs = "") => {
    const name = tag.toLowerCase();
    const closing = full.startsWith("</");
    if (!ALLOWED.has(name)) return "";
    if (name === "br") return "<br>";
    const mapped = name === "b" ? "strong" : name === "i" ? "em" : name;
    if (closing) return `</${mapped}>`;
    if (name === "a") {
      const href = (attrs.match(/href\s*=\s*["']([^"']*)["']/i)?.[1] || "").replace(/javascript:/gi, "");
      if (!href || !/^(https?:|mailto:|tel:|\/|#)/i.test(href)) return "<a>";
      return `<a href="${escapeHtml(href)}" rel="noreferrer">`;
    }
    return `<${mapped}>`;
  });
  return html;
}
