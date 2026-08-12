import { getPageImageUrl, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getBreadcrumbItems } from 'fumadocs-core/breadcrumb';
import { JsonLd } from '@/components/json-ld';
import {
  absoluteUrl,
  buildPageMetadata,
  docsJsonLd,
  siteConfig,
} from '@/lib/seo';
import { getCommon } from '@/lib/common-messages';

export default async function Page(
  props: PageProps<'/[lang]/docs/[[...slug]]'>,
) {
  const params = await props.params;
  const slug = params.slug ?? [];
  const page = source.getPage(slug, params.lang);
  if (!page) {
    notFound();
  }

  const MDX = page.data.body;
  const common = getCommon(params.lang);
  const tree = source.getPageTree(params.lang);
  const trail = getBreadcrumbItems(page.url, tree, {
    includeRoot: { url: absoluteUrl(`/${params.lang}/docs`) },
    includePage: true,
  });

  const breadcrumbs = [
    { name: siteConfig.name, url: absoluteUrl(`/${params.lang}`) },
    { name: common.navDocs, url: absoluteUrl(`/${params.lang}/docs`) },
    ...trail.flatMap((item) => {
      if (!item.url) {
        return [];
      }
      const url = item.url.startsWith('http')
        ? item.url
        : absoluteUrl(item.url);
      return [
        {
          name: typeof item.name === 'string' ? item.name : String(item.name),
          url,
        },
      ];
    }),
  ];

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <JsonLd
        data={docsJsonLd({
          title: page.data.title,
          ...(page.data.description
            ? { description: page.data.description }
            : {}),
          locale: params.lang,
          url: absoluteUrl(page.url),
          breadcrumbs,
        })}
      />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<'/[lang]/docs/[[...slug]]'>,
): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug ?? [];
  const page = source.getPage(slug, params.lang);

  if (!page) {
    notFound();
  }

  const image = getPageImageUrl(page).url;
  const pathWithoutLocale =
    page.slugs.length === 0 ? '/docs' : `/docs/${page.slugs.join('/')}`;

  return buildPageMetadata({
    title: page.data.title,
    ...(page.data.description ? { description: page.data.description } : {}),
    locale: params.lang,
    path: page.url,
    pathWithoutLocale,
    image,
    type: 'article',
  });
}
