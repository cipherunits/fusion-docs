import { defineI18n } from 'fumadocs-core/i18n';

/**
 * Locale routing config (developers).
 * Translators work only under `/content` — see that folder for docs + UI strings.
 */
export const i18n = defineI18n({
  defaultLanguage: 'en',
  languages: ['en', 'fa', 'ru'],
  /**
   * Missing docs / meta for a locale inherit English.
   * Authors write English first; other locales catch up later.
   */
  fallbackLanguage: 'en',
  /** Locale folders: content/docs/{en,fa,ru}/... (same idea as content/locales) */
  parser: 'dir',
});

export type AppLocale = (typeof i18n.languages)[number];

export const localeDirection: Record<string, 'ltr' | 'rtl'> = {
  en: 'ltr',
  fa: 'rtl',
  ru: 'ltr',
};
