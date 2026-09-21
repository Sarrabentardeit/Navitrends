import { mkdir, readdir, readFile, stat, unlink, writeFile } from "fs/promises";
import path from "path";
import en from "@/i18n/en";
import { slugify, textToBlocks } from "@/lib/portable";
import { defaultAppearance, HOME_SECTIONS, type AppearanceRecord, type HomeSectionId } from "@/lib/appearance";
import type { MediaRecord, MediaUsage } from "@/lib/media";

export type { AppearanceRecord };
export type { MediaRecord, MediaUsage };

const root = () => path.join(process.cwd(), "content");
const uploads = () => path.join(process.cwd(), "public", "uploads");

async function ensureDir(dir: string) {
  await mkdir(dir, { recursive: true });
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await readFile(file, "utf8")) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, value: unknown) {
  await ensureDir(path.dirname(file));
  await writeFile(file, JSON.stringify(value, null, 2), "utf8");
}

export type HomeRecord = Record<string, unknown> & {
  hero?: typeof en.hero;
  ctaImageUrl?: string;
};

export type SettingsRecord = {
  siteTitle: string;
  seoTitle: string;
  seoDescription: string;
  phone: string;
  email: string;
  address: string;
  logoUrl: string;
  privacySlug: string;
  termsSlug: string;
};

export type PostRecord = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  publishedAt: string;
  updatedAt?: string;
  coverUrl?: string;
  author?: string;
};

export type PageRecord = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  _updatedAt: string;
};

function defaultSettings(): SettingsRecord {
  return {
    siteTitle: "Navitrends UK | Operational Systems, Automation, Data & AI",
    seoTitle: "Navitrends UK | Operational Systems, Automation, Data & AI",
    seoDescription:
      "Navitrends UK helps SMEs and industrial organisations digitise operations, connect systems, automate workflows and apply AI to measurable business problems.",
    phone: en.site.phone,
    email: en.site.email,
    address: en.site.address,
    logoUrl: "/logo.png",
    privacySlug: "privacy",
    termsSlug: "terms",
  };
}

function defaultHome(): HomeRecord {
  return {
    hero: en.hero,
    solve: en.solve,
    chain: en.chain,
    services: en.services,
    process: en.process,
    cases: en.cases,
    why: en.why,
    cta: en.cta,
    nav: en.nav,
    footer: en.footer,
    cookies: en.cookies,
    faq: en.faq,
    seoTitle: defaultSettings().seoTitle,
    seoDescription: defaultSettings().seoDescription,
    ctaImageUrl: "/images/software-dashboard.jpg",
  };
}

function defaultPages(): PageRecord[] {
  return [
    {
      _id: "privacy",
      title: "Privacy",
      slug: "privacy",
      content: "Privacy policy for Navitrends Ltd. Contact contact@navitrends.com for any request.",
      seoTitle: "Privacy | Navitrends UK",
      seoDescription: "Privacy policy for Navitrends UK.",
      _updatedAt: new Date().toISOString(),
    },
    {
      _id: "terms",
      title: "Terms",
      slug: "terms",
      content: "Terms of use for the Navitrends UK website. Navitrends Ltd, 5 Brayford Square, London E1 0SG.",
      seoTitle: "Terms | Navitrends UK",
      seoDescription: "Terms of use for Navitrends UK.",
      _updatedAt: new Date().toISOString(),
    },
  ];
}

export async function getHome() {
  const file = path.join(root(), "home.json");
  const current = await readJson<HomeRecord | null>(file, null);
  if (current) return current;
  const created = defaultHome();
  await writeJson(file, created);
  return created;
}

export async function saveHome(value: HomeRecord) {
  await writeJson(path.join(root(), "home.json"), value);
}

export async function getSettings() {
  const file = path.join(root(), "settings.json");
  const current = await readJson<SettingsRecord | null>(file, null);
  if (current) return current;
  const created = defaultSettings();
  await writeJson(file, created);
  return created;
}

export async function saveSettings(value: SettingsRecord) {
  await writeJson(path.join(root(), "settings.json"), value);
}

export async function getAppearance() {
  const file = path.join(root(), "appearance.json");
  const current = await readJson<AppearanceRecord | null>(file, null);
  const fallback = defaultAppearance();
  if (!current) {
    await writeJson(file, fallback);
    return fallback;
  }
  const known = new Set(HOME_SECTIONS.map((section) => section.id));
  const incoming = Array.isArray(current.sections) ? current.sections : [];
  const sections = [
    ...incoming.filter((row) => known.has(row.id as HomeSectionId)),
    ...fallback.sections.filter((row) => !incoming.some((item) => item.id === row.id)),
  ].map((row) => ({ id: row.id as HomeSectionId, visible: row.visible !== false }));
  return {
    colors: { ...fallback.colors, ...current.colors },
    sections,
  };
}

export async function saveAppearance(value: AppearanceRecord) {
  await writeJson(path.join(root(), "appearance.json"), value);
}

async function listRecords<T extends { slug: string }>(folder: "posts" | "pages"): Promise<T[]> {
  const dir = path.join(root(), folder);
  await ensureDir(dir);
  const names = (await readdir(dir)).filter((name) => name.endsWith(".json"));
  const rows: T[] = [];
  for (const name of names) {
    const row = await readJson<T | null>(path.join(dir, name), null);
    if (row) rows.push(row);
  }
  return rows;
}

export async function listPosts() {
  const posts = await listRecords<PostRecord>("posts");
  return posts.sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));
}

export async function getPostById(id: string) {
  const posts = await listPosts();
  return posts.find((post) => post._id === id) ?? null;
}

export async function getPostBySlug(slug: string) {
  const posts = await listPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function savePost(input: Partial<PostRecord> & { title: string }) {
  const slug = slugify(input.slug || input.title);
  const existing = input._id ? await getPostById(input._id) : await getPostBySlug(slug);
  const record: PostRecord = {
    _id: existing?._id || slug,
    title: input.title,
    slug,
    excerpt: input.excerpt ?? existing?.excerpt ?? "",
    content: input.content ?? existing?.content ?? "",
    seoTitle: input.seoTitle ?? existing?.seoTitle ?? "",
    seoDescription: input.seoDescription ?? existing?.seoDescription ?? "",
    publishedAt: existing?.publishedAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    coverUrl: (input.coverUrl as string | undefined) ?? existing?.coverUrl,
    author: input.author ?? existing?.author ?? "Navitrends UK",
  };
  await writeJson(path.join(root(), "posts", `${record._id}.json`), record);
  return record;
}

export async function deletePost(id: string) {
  await unlink(path.join(root(), "posts", `${id}.json`)).catch(() => undefined);
}

export async function listPages() {
  const dir = path.join(root(), "pages");
  await ensureDir(dir);
  const existing = await listRecords<PageRecord>("pages");
  if (existing.length) return existing.sort((a, b) => (b._updatedAt || "").localeCompare(a._updatedAt || ""));
  const created = defaultPages();
  for (const page of created) await writeJson(path.join(dir, `${page._id}.json`), page);
  return created;
}

export async function getPageById(id: string) {
  const pages = await listPages();
  return pages.find((page) => page._id === id) ?? null;
}

export async function getPageBySlug(slug: string) {
  const pages = await listPages();
  return pages.find((page) => page.slug === slug) ?? null;
}

export async function savePage(input: Partial<PageRecord> & { title: string }) {
  const slug = slugify(input.slug || input.title);
  const existing = input._id ? await getPageById(input._id) : await getPageBySlug(slug);
  const record: PageRecord = {
    _id: existing?._id || slug,
    title: input.title,
    slug,
    content: input.content ?? existing?.content ?? "",
    seoTitle: input.seoTitle ?? existing?.seoTitle ?? "",
    seoDescription: input.seoDescription ?? existing?.seoDescription ?? "",
    _updatedAt: new Date().toISOString(),
  };
  await writeJson(path.join(root(), "pages", `${record._id}.json`), record);
  return record;
}

export async function deletePage(id: string) {
  await unlink(path.join(root(), "pages", `${id}.json`)).catch(() => undefined);
}

const IMAGE_EXT = /\.(png|jpe?g|webp|gif|svg|ico)$/i;
const SKIP_ROOT = new Set(["window.svg", "file.svg", "vercel.svg"]);
const PROTECTED = new Set(["/favicon.ico", "/favicon.png"]);

type MediaMetaMap = Record<string, { alt?: string; title?: string }>;

function publicDir() {
  return path.join(process.cwd(), "public");
}

function assertInside(file: string, folder: string) {
  const resolved = path.resolve(file);
  const base = path.resolve(folder);
  if (resolved !== base && !resolved.startsWith(base + path.sep)) {
    throw new Error("Chemin invalide.");
  }
}

function mediaUrlToFile(url: string) {
  const clean = url.split("?")[0];
  if (!clean.startsWith("/") || clean.includes("..") || !IMAGE_EXT.test(clean)) {
    throw new Error("Fichier invalide.");
  }
  const relative = clean.replace(/^\/+/, "");
  const file = path.resolve(publicDir(), relative);
  assertInside(file, publicDir());
  return { clean, file, name: path.basename(clean) };
}

async function getMediaMeta(): Promise<MediaMetaMap> {
  return readJson<MediaMetaMap>(path.join(root(), "media.json"), {});
}

async function saveMediaMeta(value: MediaMetaMap) {
  await writeJson(path.join(root(), "media.json"), value);
}

async function collectImages(dir: string, prefix: string): Promise<Omit<MediaRecord, "alt" | "title" | "usage">[]> {
  await ensureDir(dir);
  const names = await readdir(dir);
  const rows: Omit<MediaRecord, "alt" | "title" | "usage">[] = [];
  for (const name of names) {
    if (!IMAGE_EXT.test(name) || SKIP_ROOT.has(name)) continue;
    const file = path.join(dir, name);
    try {
      const info = await stat(file);
      if (!info.isFile()) continue;
      const url = `${prefix}/${name}`.replace(/\/{2,}/g, "/");
      rows.push({
        name,
        url,
        size: info.size,
        mtime: info.mtime.toISOString(),
        deletable: !PROTECTED.has(url),
        replaceable: true,
      });
    } catch {
      /* skip */
    }
  }
  return rows;
}

function usageFor(
  url: string,
  settings: SettingsRecord,
  home: HomeRecord,
  posts: PostRecord[]
): MediaUsage[] {
  const usage: MediaUsage[] = [];
  if (settings.logoUrl === url) usage.push({ kind: "logo", label: "Logo du site", href: "/admin/settings" });
  if (home.ctaImageUrl === url) usage.push({ kind: "cta", label: "Visuel accueil (contact)", href: "/admin/home" });
  for (const post of posts) {
    if (post.coverUrl === url) {
      usage.push({ kind: "insight", label: `Insight : ${post.title}`, href: `/admin/insights/${post._id}` });
    }
  }
  return usage;
}

export async function listMedia(): Promise<MediaRecord[]> {
  const [uploaded, bundled, rootFiles, meta, settings, home, posts] = await Promise.all([
    collectImages(uploads(), "/uploads"),
    collectImages(path.join(publicDir(), "images"), "/images"),
    collectImages(publicDir(), ""),
    getMediaMeta(),
    getSettings(),
    getHome(),
    listPosts(),
  ]);
  return [...uploaded, ...bundled, ...rootFiles]
    .sort((a, b) => b.mtime.localeCompare(a.mtime))
    .map((row) => ({
      ...row,
      alt: meta[row.url]?.alt ?? "",
      title: meta[row.url]?.title ?? "",
      usage: usageFor(row.url, settings, home, posts),
    }));
}

export async function saveUpload(file: File) {
  await ensureDir(uploads());
  const ext = path.extname(file.name) || ".jpg";
  const base = slugify(path.basename(file.name, ext)) || "image";
  const name = `${Date.now()}-${base}${ext.toLowerCase()}`;
  await writeFile(path.join(uploads(), name), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${name}`;
}

async function retargetMedia(from: string, to: string | null) {
  const [settings, home, posts] = await Promise.all([getSettings(), getHome(), listPosts()]);
  if (settings.logoUrl === from) await saveSettings({ ...settings, logoUrl: to || "/logo.png" });
  if (home.ctaImageUrl === from) await saveHome({ ...home, ctaImageUrl: to || "/images/software-dashboard.jpg" });
  for (const post of posts) {
    if (post.coverUrl === from) await savePost({ ...post, title: post.title, coverUrl: to || "" });
  }
  const meta = await getMediaMeta();
  if (meta[from]) {
    if (to) meta[to] = { ...meta[from], ...meta[to] };
    delete meta[from];
    await saveMediaMeta(meta);
  }
}

export async function updateMedia(input: {
  url: string;
  alt?: string;
  title?: string;
  name?: string;
  file?: File;
  apply?: "logo" | "cta";
}) {
  const current = mediaUrlToFile(input.url);
  let url = current.clean;

  if (input.file) {
    await writeFile(current.file, Buffer.from(await input.file.arrayBuffer()));
  }

  if (input.alt !== undefined || input.title !== undefined) {
    const meta = await getMediaMeta();
    meta[url] = {
      alt: input.alt ?? meta[url]?.alt ?? "",
      title: input.title ?? meta[url]?.title ?? "",
    };
    await saveMediaMeta(meta);
  }

  if (input.name) {
    const ext = path.extname(current.name) || path.extname(input.name) || ".jpg";
    const nextName = `${slugify(path.basename(input.name, path.extname(input.name))) || "image"}${ext.toLowerCase()}`;
    if (nextName !== current.name) {
      const nextFile = path.join(path.dirname(current.file), nextName);
      assertInside(nextFile, publicDir());
      await writeFile(nextFile, await readFile(current.file));
      if (nextFile !== current.file) await unlink(current.file).catch(() => undefined);
      const dir = path.posix.dirname(url);
      const cleaned = `${dir === "/" ? "" : dir}/${nextName}`.replace(/\/{2,}/g, "/");
      await retargetMedia(url, cleaned);
      url = cleaned;
    }
  }

  if (input.apply === "logo") {
    const settings = await getSettings();
    await saveSettings({ ...settings, logoUrl: url });
  }
  if (input.apply === "cta") {
    const home = await getHome();
    await saveHome({ ...home, ctaImageUrl: url });
  }

  const items = await listMedia();
  return items.find((item) => item.url === url) ?? items[0];
}

export async function deleteUpload(name: string) {
  await deleteMedia(name.startsWith("/") ? name : `/uploads/${path.basename(name)}`);
}

export async function deleteMedia(url: string) {
  const { clean, file } = mediaUrlToFile(url);
  if (PROTECTED.has(clean)) throw new Error("Ce fichier est protégé.");
  await unlink(file);
  await retargetMedia(clean, null);
}

export function postToPublic(post: PostRecord) {
  return {
    _id: post._id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    coverUrl: post.coverUrl,
    author: post.author || "Navitrends UK",
    body: textToBlocks(post.content),
    html: post.content,
  };
}

export function pageToPublic(page: PageRecord) {
  return {
    title: page.title,
    slug: page.slug,
    seoTitle: page.seoTitle,
    seoDescription: page.seoDescription,
    _updatedAt: page._updatedAt,
    body: textToBlocks(page.content),
    html: page.content,
  };
}

export async function seedFromSite() {
  await saveHome(defaultHome());
  await saveSettings(defaultSettings());
  const dir = path.join(root(), "pages");
  await ensureDir(dir);
  for (const page of defaultPages()) await writeJson(path.join(dir, `${page._id}.json`), page);
}
