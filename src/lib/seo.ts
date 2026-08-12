import type { Metadata } from 'next';
import { type AppLocale, i18n } from '@/lib/i18n';

export const siteConfig = {
  name: 'Fusion',
  shortName: 'Fusion',
  description:
    'Fusion enables you to build high-quality backends with a unified developer experience across Node.js, Python, and C#',
  org: {
    name: 'Cipher Unit',
    url: 'https://cipherunit.xyz',
    email: 'cipherunit.dev@gmail.com',
    github: 'https://github.com/cipherunits/fusion-docs',
  },
} as const;

const openGraphLocale: Record<AppLocale, string> = {
  en: 'en_US',
  fa: 'fa_IR',
  ru: 'ru_RU',
};

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
    locale: openGraphLocale[lang],
    alternateLocale: i18n.languages
      .filter((l) => l !== lang)
      .map((l) => openGraphLocale[l]),
  };
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
  type?: 'website' | 'article';
}): Metadata {
  const {
    title,
    description = siteConfig.description,
    locale,
    path,
    pathWithoutLocale,
    image,
    type = 'website',
  } = options;

  const url = absoluteUrl(path);
  const og = localeOpenGraph(locale);
  const images = image
    ? [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ]
    : [
        {
          url: absoluteUrl('/images/logo-fusion.jpg'),
          alt: siteConfig.name,
        },
      ];

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(pathWithoutLocale),
    },
    openGraph: {
      type,
      siteName: siteConfig.name,
      title,
      description,
      url,
      locale: og.locale,
      alternateLocale: og.alternateLocale,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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

export function docsJsonLd(options: {
  title: string;
  description?: string;
  locale: string;
  url: string;
  breadcrumbs: { name: string; url: string }[];
}) {
  const { title, description, locale, url, breadcrumbs } = options;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteConfig.org.url}/#organization`,
        name: siteConfig.org.name,
        url: siteConfig.org.url,
        email: siteConfig.org.email,
        sameAs: [siteConfig.org.github],
        logo: absoluteUrl('/images/logo-fusion.jpg'),
      },
      {
        '@type': 'WebSite',
        '@id': `${getSiteUrl()}/#website`,
        name: siteConfig.name,
        url: getSiteUrl(),
        description: siteConfig.description,
        publisher: { '@id': `${siteConfig.org.url}/#organization` },
        inLanguage: i18n.languages,
      },
      {
        '@type': 'TechArticle',
        '@id': `${url}#article`,
        headline: title,
        name: title,
        description: description ?? siteConfig.description,
        url,
        inLanguage: locale,
        isPartOf: { '@id': `${getSiteUrl()}/#website` },
        author: { '@id': `${siteConfig.org.url}/#organization` },
        publisher: { '@id': `${siteConfig.org.url}/#organization` },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      },
    ],
  };
}
