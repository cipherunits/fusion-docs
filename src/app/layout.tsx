import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import {
  getMetadataBase,
  getSiteDescription,
  siteConfig,
} from '@/lib/seo';
import { getSeo } from '@/lib/common-messages';
import { i18n } from '@/lib/i18n';

const defaultSeo = getSeo(i18n.defaultLanguage);

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: getSiteDescription(i18n.defaultLanguage),
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.org.name, url: siteConfig.org.url }],
  creator: siteConfig.org.name,
  publisher: siteConfig.org.name,
  keywords: defaultSeo.keywords,
  category: 'technology',
  icons: {
    icon: [
      { url: siteConfig.logoPath, type: 'image/jpeg' },
    ],
    apple: [{ url: siteConfig.logoPath, type: 'image/jpeg' }],
    shortcut: siteConfig.logoPath,
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: getSiteDescription(i18n.defaultLanguage),
    images: [
      {
        url: siteConfig.logoPath,
        alt: defaultSeo.logoAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: getSiteDescription(i18n.defaultLanguage),
    images: [siteConfig.logoPath],
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
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
