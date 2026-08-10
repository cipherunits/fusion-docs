import en from '@content/locales/en/common.json';
import fa from '@content/locales/fa/common.json';
import ru from '@content/locales/ru/common.json';
import type { AppLocale } from '@/lib/i18n';

const commonByLocale = {
  en,
  fa,
  ru,
} as const satisfies Record<AppLocale, typeof en>;

export type CommonMessages = typeof en;

/** Locale UI copy with English fallback for any missing key. */
export function getCommon(locale: string): CommonMessages {
  if (locale === 'en' || !(locale in commonByLocale)) {
    return en;
  }

  return {
    ...en,
    ...commonByLocale[locale as AppLocale],
  };
}
