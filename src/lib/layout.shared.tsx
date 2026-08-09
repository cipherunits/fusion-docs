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
    nav: {
      title: (
        <>
          <Image
            src="/images/logo-fusion.jpg"
            alt="Fusion Framework"
            width={28}
            height={26}
            className="rounded-sm"
            priority
          />
          Fusion Framework
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
        url: "https://cipherunit.xyz/",
        active: 'url',
      }
    ],
  };
}
