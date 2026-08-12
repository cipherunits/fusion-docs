import Image from 'next/image';
import { i18n } from '@/lib/i18n';
import { uiTranslations } from 'fumadocs-ui/i18n';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { getCommon } from '@/lib/common-messages';
import { fumadocsUiLocales } from '@/lib/fumadocs-ui-locales';

export const translations = i18n
  .translations()
  .extend(uiTranslations())
  // Locales are content-driven; widen for fumadocs generics.
  .add(fumadocsUiLocales as never);

export function baseOptions(locale: string): BaseLayoutProps {
  const common = getCommon(locale);

  return {
    i18n: true,
    themeSwitch: {
      mode: 'light-dark-system',
    },
    nav: {
      title: (
        <>
          <Image
            src="/images/logo-fusion.jpg"
            alt="Fusion"
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
        url: 'https://cipherunit.xyz/team',
        active: 'url',
      },
    ],
  };
}
