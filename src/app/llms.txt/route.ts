import { readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { i18n } from '@/lib/i18n';
import { absoluteUrl, getSiteDescription, siteConfig } from '@/lib/seo';

export const dynamic = 'force-static';

function walkMdx(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkMdx(full));
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      out.push(full);
    }
  }
  return out;
}

function docsUrlsForLang(lang: string): string[] {
  const langRoot = join(process.cwd(), 'content/docs', lang);
  let files: string[] = [];
  try {
    files = walkMdx(langRoot);
  } catch {
    return [absoluteUrl(`/${lang}/docs`)];
  }

  const urls = new Set<string>([absoluteUrl(`/${lang}/docs`)]);

  for (const filePath of files) {
    const rel = relative(langRoot, filePath).split(sep).join('/');
    const withoutExt = rel.replace(/\.mdx$/i, '');
    const slug =
      withoutExt === 'index' ? '' : withoutExt.replace(/\/index$/i, '');
    urls.add(
      slug
        ? absoluteUrl(`/${lang}/docs/${slug}`)
        : absoluteUrl(`/${lang}/docs`),
    );
  }

  return [...urls].sort();
}

export function GET() {
  const lines: string[] = [
    `# ${siteConfig.name}`,
    `> ${getSiteDescription(i18n.defaultLanguage)}`,
    '',
    `Site: ${absoluteUrl('/')}`,
    `Sitemap: ${absoluteUrl('/sitemap.xml')}`,
    `Locales: ${i18n.languages.join(', ')}`,
    '',
    '## Home',
    ...i18n.languages.map((lang) => `- ${absoluteUrl(`/${lang}`)}`),
    '',
    '## Desktop',
    ...i18n.languages.map((lang) => `- ${absoluteUrl(`/${lang}/gui`)}`),
    '',
  ];

  for (const lang of i18n.languages) {
    lines.push(`## Docs (${lang})`);
    lines.push(...docsUrlsForLang(lang).map((url) => `- ${url}`));
    lines.push('');
  }

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
