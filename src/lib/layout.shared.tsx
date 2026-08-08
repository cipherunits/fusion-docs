import { i18n } from '@/lib/i18n';
import { uiTranslations } from 'fumadocs-ui/i18n';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { getDocHref, latestVersion } from '@/lib/docs';

export const translations = i18n
  .translations()
  .extend(uiTranslations())
  .add({
    en: {
      displayName: 'English',
    },
  });

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    i18n: true,
    nav: {
      title: 'Fusion Docs',
      url: `/${locale}`,
    },
    links: [
      {
        text: 'TypeScript',
        url: getDocHref(locale, 'typescript', latestVersion.typescript),
        active: 'nested-url',
      },
      {
        text: 'Python',
        url: getDocHref(locale, 'python', latestVersion.python),
        active: 'nested-url',
      },
      {
        text: 'C#',
        url: getDocHref(locale, 'csharp', latestVersion.csharp),
        active: 'nested-url',
      },
    ],
  };
}
