import type { MetadataRoute } from 'next';
import { getSiteDescription, getLogoUrl, siteConfig } from '@/lib/seo';
import { i18n } from '@/lib/i18n';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: getSiteDescription(i18n.defaultLanguage),
    start_url: `/${i18n.defaultLanguage}`,
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0a0a0a',
    lang: i18n.defaultLanguage,
    categories: ['developer', 'productivity', 'utilities'],
    icons: [
      {
        src: siteConfig.logoPath,
        sizes: 'any',
        type: 'image/jpeg',
        purpose: 'any',
      },
      {
        src: getLogoUrl(),
        sizes: '512x512',
        type: 'image/jpeg',
        purpose: 'maskable',
      },
    ],
  };
}
