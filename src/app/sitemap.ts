import { readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import type { MetadataRoute } from 'next';
import { i18n } from '@/lib/i18n';
import { absoluteUrl, languageAlternates } from '@/lib/seo';

const DOCS_ROOT = join(process.cwd(), 'content/docs');

type DocEntry = {
  /** Path without locale, e.g. `/docs/python/v1/getting-started` or `/docs` */
  pathWithoutLocale: string;
  /** Absolute path for mtime (any locale file; preferably en) */
  filePath: string;
};

function walkMdxFiles(dir: string): string[] {
  const out: string[] = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkMdxFiles(full));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith('.mdx')) {
      out.push(full);
    }
  }

  return out;
}

/** Map content/docs/{lang} MDX files to shared /docs/... paths. */
function collectDocPaths(): DocEntry[] {
  const bySlug = new Map<string, DocEntry>();

  for (const lang of i18n.languages) {
    const langRoot = join(DOCS_ROOT, lang);
    let files: string[] = [];
    try {
      files = walkMdxFiles(langRoot);
    } catch {
      continue;
    }

    for (const filePath of files) {
      const rel = relative(langRoot, filePath).split(sep).join('/');
      const withoutExt = rel.replace(/\.mdx$/i, '');
      const slug =
        withoutExt === 'index'
          ? ''
          : withoutExt.replace(/\/index$/i, '');
      const pathWithoutLocale = slug ? `/docs/${slug}` : '/docs';

      const existing = bySlug.get(pathWithoutLocale);
      if (!existing || lang === i18n.defaultLanguage) {
        bySlug.set(pathWithoutLocale, { pathWithoutLocale, filePath });
      }
    }
  }

  return [...bySlug.values()].sort((a, b) =>
    a.pathWithoutLocale.localeCompare(b.pathWithoutLocale),
  );
}

function safeMtime(filePath: string, fallback: Date): Date {
  try {
    return statSync(filePath).mtime;
  } catch {
    return fallback;
  }
}

function priorityForDocsPath(pathWithoutLocale: string): number {
  if (pathWithoutLocale === '/docs') {
    return 0.95;
  }
  if (pathWithoutLocale.includes('getting-started')) {
    return 0.9;
  }
  const depth = pathWithoutLocale.split('/').filter(Boolean).length;
  if (depth <= 3) {
    return 0.85;
  }
  return 0.8;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();

  const push = (entry: MetadataRoute.Sitemap[number]) => {
    if (seen.has(entry.url)) {
      return;
    }
    seen.add(entry.url);
    entries.push(entry);
  };

  const staticPages: {
    pathWithoutLocale: string;
    priority: number;
  }[] = [
    { pathWithoutLocale: '/', priority: 1 },
    { pathWithoutLocale: '/gui', priority: 0.9 },
  ];

  for (const page of staticPages) {
    const languages = languageAlternates(page.pathWithoutLocale);
    for (const lang of i18n.languages) {
      const path =
        page.pathWithoutLocale === '/'
          ? `/${lang}`
          : `/${lang}${page.pathWithoutLocale}`;
      push({
        url: absoluteUrl(path),
        lastModified: now,
        changeFrequency: 'weekly',
        priority: page.priority,
        alternates: { languages },
      });
    }
  }

  for (const doc of collectDocPaths()) {
    const languages = languageAlternates(doc.pathWithoutLocale);
    const lastModified = safeMtime(doc.filePath, now);
    const priority = priorityForDocsPath(doc.pathWithoutLocale);

    for (const lang of i18n.languages) {
      push({
        url: absoluteUrl(`/${lang}${doc.pathWithoutLocale}`),
        lastModified,
        changeFrequency: 'weekly',
        priority,
        alternates: { languages },
      });
    }
  }

  return entries;
}
