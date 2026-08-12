import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { i18n } from '@/lib/i18n';
import { absoluteUrl, languageAlternates } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of i18n.languages) {
    entries.push({
      url: absoluteUrl(`/${lang}`),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: languageAlternates('/'),
      },
    });
  }

  const pagesBySlug = new Map<string, { url: string }[]>();

  for (const page of source.getPages()) {
    const key = page.slugs.join('/');
    const group = pagesBySlug.get(key) ?? [];
    group.push({ url: page.url });
    pagesBySlug.set(key, group);
  }

  for (const [slugKey, pages] of pagesBySlug) {
    const pathWithoutLocale = `/docs${slugKey ? `/${slugKey}` : ''}`;
    const languages = languageAlternates(pathWithoutLocale);

    for (const page of pages) {
      entries.push({
        url: absoluteUrl(page.url),
        lastModified: now,
        changeFrequency: 'weekly',
        priority: slugKey.includes('getting-started') ? 0.9 : 0.8,
        alternates: {
          languages,
        },
      });
    }
  }

  return entries;
}
