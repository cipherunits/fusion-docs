import type { AppLocale } from '@/lib/i18n';
import { i18n as fumadocsI18n } from '@/lib/i18n';

export const fallbackLng = fumadocsI18n.defaultLanguage;
export const languages = fumadocsI18n.languages;
export const defaultNS = 'common';
export const cookieName = 'i18next';

export function getOptions(
  lng: AppLocale | string = fallbackLng,
  ns: string | string[] = defaultNS,
) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
