import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { HOME, defaultLang } from "@consts";
import { getLangFromUrl } from '../i18n/config';

type Context = {
  site: string
}

export async function GET(context: Context) {
  const url = new URL(context.request.url);
  const lang = getLangFromUrl(url);

  const blog = (await getCollection("blog"))
    .filter(post => !post.data.draft && post.data.lang === lang);

  const projects = (await getCollection("projects"))
    .filter(project => !project.data.draft && project.data.lang === lang);

  const items = [...blog, ...projects]
    .sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf());

  return rss({
    title: `${HOME.TITLE} (${lang.toUpperCase()})`,
    description: `${HOME.DESCRIPTION} - ${lang.toUpperCase()}`,
    site: context.site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      pubDate: item.data.date,
      link: `/${lang}/${item.collection}/${item.slug}/`,
    })),
  });
}
