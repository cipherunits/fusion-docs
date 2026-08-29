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
import { getBreadcrumbItems } from 'fumadocs-core/breadcrumb';
import { JsonLd } from '@/components/json-ld';
import {
  absoluteUrl,
  buildPageMetadata,
  docsJsonLd,
  docsPageKeywords,
  siteConfig,
} from '@/lib/seo';
import { getCommon, getSeo } from '@/lib/common-messages';
import {
  getLatestVersion,
  getProductVersions,
  isDocProductId,
} from '@/lib/docs';

/** `/docs/{product}/page` → `/docs/{product}/{latest}/page` when version is omitted. */
function redirectMissingVersion(lang: string, slug: string[]): string | null {
  if (slug.length === 0) {
    return null;
  }

  const [product, second, ...rest] = slug;
  if (!product || !isDocProductId(product, lang)) {
    return null;
  }

  const versions = getProductVersions(product, lang);
  const latest = getLatestVersion(product, lang);
  if (!latest) {
    return null;
  }

  // `/docs/architecture` → `/docs/architecture/v1`
  if (!second) {
    return `/${lang}/docs/${product}/${latest}`;
  }

  // Already versioned
  if (versions.includes(second)) {
    return null;
  }

  // `/docs/architecture/what-fusion-is-not` → `/docs/architecture/v1/what-fusion-is-not`
  const candidate = [product, latest, second, ...rest];
  if (source.getPage(candidate, lang)) {
    return `/${lang}/docs/${candidate.join('/')}`;
  }

  return null;
}

export default async function Page(
  props: PageProps<'/[lang]/docs/[[...slug]]'>,
) {
  const params = await props.params;
  const slug = params.slug ?? [];
  const page = source.getPage(slug, params.lang);
  if (!page) {
    const target = redirectMissingVersion(params.lang, slug);
    if (target) {
      redirect(target);
    }
    notFound();
  }

  const MDX = page.data.body;
  const common = getCommon(params.lang);
  const tree = source.getPageTree(params.lang);
  const trail = getBreadcrumbItems(page.url, tree, {
    includeRoot: { url: absoluteUrl(`/${params.lang}/docs`) },
    includePage: true,
  });
  const ogImage = getPageImageUrl(page).url;

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
          image: ogImage,
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
    const target = redirectMissingVersion(params.lang, slug);
    if (target) {
      redirect(target);
    }
    notFound();
  }

  const image = getPageImageUrl(page).url;
  const pathWithoutLocale =
    page.slugs.length === 0 ? '/docs' : `/docs/${page.slugs.join('/')}`;
  const seo = getSeo(params.lang);

  return buildPageMetadata({
    title: page.data.title,
    ...(page.data.description ? { description: page.data.description } : {}),
    locale: params.lang,
    path: page.url,
    pathWithoutLocale,
    image,
    imageAlt: `${page.data.title} — ${seo.logoAlt}`,
    keywords: docsPageKeywords(
      params.lang,
      page.data.title,
      page.data.description,
      page.slugs,
    ),
    type: 'article',
  });
}
