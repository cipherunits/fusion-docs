import { getPageImageUrl, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound, redirect } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getDocHref, latestVersion } from '@/lib/docs';
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

  if (!params.slug || params.slug.length === 0) {
    redirect(getDocHref(params.lang, 'typescript', latestVersion.typescript));
  }

  const slug = params.slug;
  const page = source.getPage(slug, params.lang);
  if (!page) {
    notFound();
  }

  const MDX = page.data.body;
  const common = getCommon(params.lang);
  const breadcrumbs = [
    { name: siteConfig.name, url: absoluteUrl(`/${params.lang}`) },
    { name: common.navDocs, url: absoluteUrl(`/${params.lang}/docs`) },
    ...slug.map((segment, index) => {
      const crumbPath = `/${params.lang}/docs/${slug.slice(0, index + 1).join('/')}`;
      const label =
        segment === 'typescript'
          ? common.typescript
          : segment === 'python'
            ? common.python
            : segment === 'csharp'
              ? common.csharp
              : segment;

      return {
        name: index === slug.length - 1 ? page.data.title : label,
        url: absoluteUrl(crumbPath),
      };
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

  if (!params.slug || params.slug.length === 0) {
    return buildPageMetadata({
      title: 'Documentation',
      locale: params.lang,
      path: `/${params.lang}/docs`,
      pathWithoutLocale: '/docs',
      type: 'website',
    });
  }

  const page = source.getPage(params.slug, params.lang);
  if (!page) {
    notFound();
  }

  const image = getPageImageUrl(page).url;
  const pathWithoutLocale = `/docs/${page.slugs.join('/')}`;

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
