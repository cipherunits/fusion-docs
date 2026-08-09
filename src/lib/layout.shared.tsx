import Image from 'next/image';
import { i18n } from '@/lib/i18n';
import { uiTranslations } from 'fumadocs-ui/i18n';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

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
        text: 'Docs',
        url: "/docs",
        active: 'nested-url',
      },
      {
        text: 'Developers',
        url: "https://cipherunit.xyz/team",
        active: 'url',
      }
    ],
};
}
