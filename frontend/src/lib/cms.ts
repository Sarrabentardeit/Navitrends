import { mapHomeToMessages } from "@/lib/mapHome";
import type { Messages } from "@/i18n/en";
import {
  getAppearance,
  getHome,
  getPageBySlug,
  getPostBySlug,
  getSettings,
  listPages,
  listPosts,
  pageToPublic,
  postToPublic,
} from "@/lib/cmsStore";

export { getAppearance };

export async function getSiteSettings() {
  return getSettings();
}

export async function getHomeMessages(): Promise<Messages | null> {
  const [home, settings] = await Promise.all([getHome(), getSettings()]);
  return mapHomeToMessages(home, settings, {
    logoUrl: settings.logoUrl,
    ctaImageUrl: home.ctaImageUrl,
  });
}

export async function getHomeSeo() {
  const home = await getHome();
  const settings = await getSettings();
  return {
    seoTitle: (home.seoTitle as string | undefined) || settings.seoTitle,
    seoDescription: (home.seoDescription as string | undefined) || settings.seoDescription,
    ogImage: (home.ctaImageUrl as string | undefined) || settings.logoUrl,
  };
}

export async function getPosts() {
  return (await listPosts()).map(postToPublic);
}

export async function getPost(slug: string) {
  const post = await getPostBySlug(slug);
  return post ? postToPublic(post) : null;
}

export async function getPages() {
  return (await listPages()).map((page) => ({
    title: page.title,
    slug: page.slug,
    _updatedAt: page._updatedAt,
  }));
}

export async function getPage(slug: string) {
  const page = await getPageBySlug(slug);
  return page ? pageToPublic(page) : null;
}
