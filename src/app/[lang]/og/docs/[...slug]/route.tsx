import { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';
import { generate as DefaultImage } from 'fumadocs-ui/og';
import { getPageImageUrl, source } from '@/lib/source';
import { i18n } from '@/lib/i18n';
import { siteConfig } from '@/lib/seo';

export const revalidate = false;

/** Arabic / Persian / Hebrew — Satori still crashes on some OpenType lookups. */
const COMPLEX_SCRIPT =
  /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0590-\u05FF]/;

function needsLatinFallback(text: string | undefined): boolean {
  return Boolean(text && COMPLEX_SCRIPT.test(text));
}

function resolveOgCopy(lang: string, slug: string[]) {
  const page = source.getPage(slug, lang);
  if (!page) {
    return null;
  }

  const title = page.data.title ?? siteConfig.name;
  const description = page.data.description;

  if (!needsLatinFallback(title) && !needsLatinFallback(description)) {
    return { title, description };
  }

  const english = source.getPage(slug, i18n.defaultLanguage);
  return {
    title: english?.data.title ?? title,
    description: english?.data.description ?? description,
  };
}

export async function GET(
  _req: Request,
  { params }: RouteContext<'/[lang]/og/docs/[...slug]'>,
) {
  const { lang, slug } = await params;

  if (!slug || slug.length === 0) {
    notFound();
  }

  const pageSlug = slug.slice(0, -1);
  const page = source.getPage(pageSlug, lang);
  if (!page) {
    notFound();
  }

  const copy = resolveOgCopy(lang, pageSlug);
  if (!copy) {
    notFound();
  }

  return new ImageResponse(
    (
      <DefaultImage
        title={copy.title}
        description={copy.description}
        site={siteConfig.name}
      />
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImageUrl(page).segments,
  }));
}
