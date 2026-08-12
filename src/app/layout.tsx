import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import {
  getMetadataBase,
  siteConfig,
} from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.org.name, url: siteConfig.org.url }],
  creator: siteConfig.org.name,
  publisher: siteConfig.org.name,
  keywords: [
    'Fusion',
    'Fusion Framework',
    'Cipher Unit',
    'backend framework',
    'Node.js',
    'TypeScript',
    'Python',
    'C#',
    '.NET',
    'SDK',
    'API',
  ],
  category: 'technology',
  icons: {
    icon: '/images/logo-fusion.jpg',
    apple: '/images/logo-fusion.jpg',
  },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: '/images/logo-fusion.jpg',
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: ['/images/logo-fusion.jpg'],
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
