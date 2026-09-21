function key() {
  return Math.random().toString(36).slice(2, 10);
}

export function textToBlocks(text: string) {
  const parts = text
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (!parts.length) return [];
  return parts.map((paragraph) => ({
    _type: "block" as const,
    _key: key(),
    style: "normal",
    markDefs: [] as unknown[],
    children: [
      {
        _type: "span" as const,
        _key: key(),
        text: paragraph,
        marks: [] as string[],
      },
    ],
  }));
}

export function blocksToText(value: unknown) {
  if (!Array.isArray(value)) return "";
  return value
    .map((block) => {
      if (!block || typeof block !== "object" || (block as { _type?: string })._type !== "block") return "";
      const children = (block as { children?: { text?: string }[] }).children;
      return (children ?? []).map((child) => child.text ?? "").join("");
    })
    .filter(Boolean)
    .join("\n\n");
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 96);
}
