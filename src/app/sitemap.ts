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

    entries.push({
      url: absoluteUrl(`/${lang}/gui`),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: languageAlternates('/gui'),
      },
    });

    entries.push({
      url: absoluteUrl(`/${lang}/docs`),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
      alternates: {
        languages: languageAlternates('/docs'),
      },
    });
  }

  const pagesBySlug = new Map<string, { url: string }[]>();

  for (const page of source.getPages()) {
    // Root docs index is already added above per locale.
    if (page.slugs.length === 0) {
      continue;
    }

    const key = page.slugs.join('/');
    const group = pagesBySlug.get(key) ?? [];
    group.push({ url: page.url });
    pagesBySlug.set(key, group);
  }

  for (const [slugKey, pages] of pagesBySlug) {
    const pathWithoutLocale = `/docs/${slugKey}`;
    const languages = languageAlternates(pathWithoutLocale);
    const isGettingStarted = slugKey.includes('getting-started');
    const isProductIndex = slugKey.split('/').length <= 2;

    for (const page of pages) {
      entries.push({
        url: absoluteUrl(page.url),
        lastModified: now,
        changeFrequency: 'weekly',
        priority: isGettingStarted ? 0.9 : isProductIndex ? 0.85 : 0.8,
        alternates: {
          languages,
        },
      });
    }
  }

  return entries;
}
