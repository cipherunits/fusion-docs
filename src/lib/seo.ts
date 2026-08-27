import type { Metadata } from 'next';
import { type AppLocale, i18n } from '@/lib/i18n';
import { getLocaleMeta } from '@/lib/locales-registry';
import { getSeo } from '@/lib/common-messages';

export const siteConfig = {
  name: 'Fusion Framework',
  shortName: 'Fusion',
  description:
    'Fusion enables you to build high-quality backends with a unified developer experience across Node.js, Python, and C#',
  org: {
    name: 'Cipher Unit',
    url: 'https://cipherunit.xyz',
    email: 'cipherunit.dev@gmail.com',
    github: 'https://github.com/cipherunits',
    githubDocs: 'https://github.com/cipherunits/fusion-docs',
    githubFramework: 'https://github.com/cipherunits/fusion-framework',
  },
  logoPath: '/images/logo-fusion.jpg',
} as const;

/** Absolute site origin (no trailing slash). Set NEXT_PUBLIC_SITE_URL in production. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, '');
  }

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProduction) {
    return `https://${vercelProduction.replace(/\/$/, '')}`;
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    return `https://${vercelUrl.replace(/\/$/, '')}`;
  }

  return 'http://localhost:3000';
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}

export function getMetadataBase(): URL {
  return new URL(`${getSiteUrl()}/`);
}

export function getLogoUrl(): string {
  return absoluteUrl(siteConfig.logoPath);
}

export function languageAlternates(
  pathWithoutLocale: string,
): Record<string, string> {
  const path =
    pathWithoutLocale === '/'
      ? ''
      : pathWithoutLocale.startsWith('/')
        ? pathWithoutLocale
        : `/${pathWithoutLocale}`;

  const languages: Record<string, string> = {
    'x-default': absoluteUrl(`/${i18n.defaultLanguage}${path}`),
  };

  for (const lang of i18n.languages) {
    languages[lang] = absoluteUrl(`/${lang}${path}`);
  }

  return languages;
}

export function localeOpenGraph(locale: string) {
  const lang = (i18n.languages.includes(locale as AppLocale)
    ? locale
    : i18n.defaultLanguage) as AppLocale;

  return {
    locale: getLocaleMeta(lang).ogLocale,
    alternateLocale: i18n.languages
      .filter((l) => l !== lang)
      .map((l) => getLocaleMeta(l).ogLocale),
  };
}

/** Localized site description for meta tags and JSON-LD. */
export function getSiteDescription(locale: string): string {
  return getSeo(locale).siteDescription;
}

/** Merge page-specific terms with locale SEO keywords. */
export function buildKeywords(
  locale: string,
  extra: string[] = [],
  options?: { download?: boolean },
): string[] {
  const seo = getSeo(locale);
  const base = options?.download ? seo.downloadKeywords : seo.keywords;
  const seen = new Set<string>();
  const result: string[] = [];

  for (const term of [...extra, ...base]) {
    const trimmed = term.trim();
    if (!trimmed) continue;
    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(trimmed);
  }

  return result;
}

/** Keywords derived from a docs page title, description, and slug path. */
export function docsPageKeywords(
  locale: string,
  title: string,
  description: string | undefined,
  slugs: string[],
): string[] {
  const fromSlugs = slugs.filter(
    (segment) => segment !== 'v1' && segment.length > 1,
  );
  const fromDescription = description
    ? description
        .split(/[,|—–\-]/)
        .map((part) => part.trim())
        .filter((part) => part.length > 2 && part.length < 48)
        .slice(0, 4)
    : [];

  return buildKeywords(locale, [title, ...fromSlugs, ...fromDescription]);
}

export function buildPageMetadata(options: {
  title: string;
  description?: string;
  locale: string;
  /** Path including locale prefix, e.g. `/en/docs/typescript/v1` */
  path: string;
  /** Path without locale, e.g. `/docs/typescript/v1` or `/` */
  pathWithoutLocale: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  type?: 'website' | 'article';
}): Metadata {
  const {
    title,
    description,
    locale,
    path,
    pathWithoutLocale,
    image,
    imageAlt,
    keywords,
    type = 'website',
  } = options;

  const resolvedDescription = description ?? getSiteDescription(locale);
  const logoAlt = imageAlt ?? getSeo(locale).logoAlt;
  const url = absoluteUrl(path);
  const og = localeOpenGraph(locale);
  const images = image
    ? [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: logoAlt || title,
        },
      ]
    : [
        {
          url: getLogoUrl(),
          alt: logoAlt,
        },
      ];

  return {
    title,
    description: resolvedDescription,
    ...(keywords?.length ? { keywords } : {}),
    authors: [{ name: siteConfig.org.name, url: siteConfig.org.url }],
    creator: siteConfig.org.name,
    publisher: siteConfig.org.name,
    category: 'technology',
    alternates: {
      canonical: url,
      languages: languageAlternates(pathWithoutLocale),
    },
    openGraph: {
      type,
      siteName: siteConfig.name,
      title,
      description: resolvedDescription,
      url,
      locale: og.locale,
      alternateLocale: og.alternateLocale,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: resolvedDescription,
      images: images.map((img) =>
        typeof img.url === 'string' ? img.url : String(img.url),
      ),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

function logoImageObject(locale: string) {
  const seo = getSeo(locale);
  return {
    '@type': 'ImageObject',
    '@id': `${getSiteUrl()}/#logo`,
    url: getLogoUrl(),
    contentUrl: getLogoUrl(),
    caption: seo.logoAlt,
    name: seo.logoAlt,
    representativeOfPage: true,
  };
}

function organizationJsonLd(locale: string) {
  return {
    '@type': 'Organization',
    '@id': `${siteConfig.org.url}/#organization`,
    name: siteConfig.org.name,
    url: siteConfig.org.url,
    email: siteConfig.org.email,
    description: getSiteDescription(locale),
    sameAs: [
      siteConfig.org.github,
      siteConfig.org.githubDocs,
      siteConfig.org.githubFramework,
    ],
    logo: { '@id': `${getSiteUrl()}/#logo` },
    image: { '@id': `${getSiteUrl()}/#logo` },
    foundingLocation: {
      '@type': 'Place',
      name: 'Cipher Unit',
    },
  };
}

function websiteJsonLd(locale: string) {
  return {
    '@type': 'WebSite',
    '@id': `${getSiteUrl()}/#website`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: getSiteUrl(),
    description: getSiteDescription(locale),
    publisher: { '@id': `${siteConfig.org.url}/#organization` },
    inLanguage: i18n.languages,
    about: { '@id': `${siteConfig.org.url}/#organization` },
  };
}

function breadcrumbJsonLd(
  url: string,
  breadcrumbs: { name: string; url: string }[],
) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function homeJsonLd(options: {
  title: string;
  description: string;
  locale: string;
  url: string;
}) {
  const { title, description, locale, url } = options;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      logoImageObject(locale),
      organizationJsonLd(locale),
      websiteJsonLd(locale),
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        name: title,
        description,
        url,
        inLanguage: locale,
        isPartOf: { '@id': `${getSiteUrl()}/#website` },
        about: { '@id': `${siteConfig.org.url}/#organization` },
        primaryImageOfPage: { '@id': `${getSiteUrl()}/#logo` },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: title,
              item: url,
            },
          ],
        },
      },
    ],
  };
}

export function docsJsonLd(options: {
  title: string;
  description?: string;
  locale: string;
  url: string;
  image?: string;
  breadcrumbs: { name: string; url: string }[];
}) {
  const { title, description, locale, url, image, breadcrumbs } = options;
  const resolvedDescription = description ?? getSiteDescription(locale);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      logoImageObject(locale),
      organizationJsonLd(locale),
      websiteJsonLd(locale),
      {
        '@type': 'TechArticle',
        '@id': `${url}#article`,
        headline: title,
        name: title,
        description: resolvedDescription,
        url,
        inLanguage: locale,
        isPartOf: { '@id': `${getSiteUrl()}/#website` },
        author: { '@id': `${siteConfig.org.url}/#organization` },
        publisher: { '@id': `${siteConfig.org.url}/#organization` },
        image: image
          ? [
              {
                '@type': 'ImageObject',
                url: image.startsWith('http') ? image : absoluteUrl(image),
                contentUrl: image.startsWith('http')
                  ? image
                  : absoluteUrl(image),
                caption: title,
              },
              { '@id': `${getSiteUrl()}/#logo` },
            ]
          : [{ '@id': `${getSiteUrl()}/#logo` }],
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
      },
      breadcrumbJsonLd(url, breadcrumbs),
    ],
  };
}

/** OG image path for the desktop download page. */
export function getGuiOgImageUrl(locale: string): string {
  return `/${locale}/og/gui`;
}

export function downloadJsonLd(options: {
  title: string;
  description: string;
  locale: string;
  url: string;
  appName: string;
  breadcrumbs: { name: string; url: string }[];
}) {
  const { title, description, locale, url, appName, breadcrumbs } = options;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      logoImageObject(locale),
      organizationJsonLd(locale),
      websiteJsonLd(locale),
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        name: title,
        description,
        url,
        inLanguage: locale,
        isPartOf: { '@id': `${getSiteUrl()}/#website` },
        about: { '@id': `${url}#software` },
        mainEntity: { '@id': `${url}#software` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
        primaryImageOfPage: { '@id': `${getSiteUrl()}/#logo` },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${url}#software`,
        name: appName,
        alternateName: 'Fusion Desktop',
        description,
        url,
        image: getLogoUrl(),
        applicationCategory: 'DeveloperApplication',
        applicationSubCategory: 'Backend management',
        operatingSystem: ['Windows 10', 'Windows 11', 'Linux'],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url,
        },
        publisher: { '@id': `${siteConfig.org.url}/#organization` },
        author: { '@id': `${siteConfig.org.url}/#organization` },
        inLanguage: locale,
        isAccessibleForFree: true,
        downloadUrl: url,
        installUrl: url,
        softwareHelp: absoluteUrl(`/${locale}/docs`),
        featureList: [
          'Windows installers (x64, Arm64)',
          'Linux packages (.deb, .rpm, .tar.gz)',
          'CLI builds',
        ],
      },
      breadcrumbJsonLd(url, breadcrumbs),
    ],
  };
}
