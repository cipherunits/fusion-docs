import { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';
import { generate as DefaultImage } from 'fumadocs-ui/og';
import { getPageImageUrl, source } from '@/lib/source';
import { siteConfig } from '@/lib/seo';

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<'/[lang]/og/docs/[...slug]'>,
) {
  const { lang, slug } = await params;

  if (!slug || slug.length === 0) {
    notFound();
  }

  const page = source.getPage(slug.slice(0, -1), lang);
  if (!page) {
    notFound();
  }

  return new ImageResponse(
    (
      <DefaultImage
        title={page.data.title}
        description={page.data.description}
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
