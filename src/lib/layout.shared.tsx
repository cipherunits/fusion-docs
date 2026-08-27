import Image from 'next/image';
import { i18n } from '@/lib/i18n';
import { uiTranslations } from 'fumadocs-ui/i18n';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { getCommon, getSeo } from '@/lib/common-messages';
import { fumadocsUiLocales } from '@/lib/fumadocs-ui-locales';
import { siteConfig } from '@/lib/seo';

export const translations = i18n
  .translations()
  .extend(uiTranslations())
  // Locales are content-driven; widen for fumadocs generics.
  .add(fumadocsUiLocales as never);

export function baseOptions(locale: string): BaseLayoutProps {
  const common = getCommon(locale);
  const seo = getSeo(locale);

  return {
    i18n: true,
    themeSwitch: {
      mode: 'light-dark-system',
    },
    nav: {
      title: (
        <>
          <Image
            src={siteConfig.logoPath}
            alt={seo.logoAlt}
            title={seo.logoAlt}
            width={28}
            height={26}
            className="rounded-sm"
            priority
          />
          Fusion
        </>
      ),
      url: `/${locale}`,
    },
    links: [
      {
        text: common.navDocs,
        url: `/${locale}/docs`,
        active: 'nested-url',
      },
      {
        text: common.app,
        url: `/${locale}/gui`,
        active: 'nested-url',
      },
      {
        text: common.navDevelopers,
        url: siteConfig.org.url,
        active: 'url',
        external: true,
      },
    ],
  };
}
