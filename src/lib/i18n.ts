import { defineI18n } from 'fumadocs-core/i18n';
import {
  defaultLocale,
  discoveredLocales,
  getLocaleDirection,
} from '@/lib/locales-registry';

/**
 * Locale routing — languages are discovered from content/locales/{lang}/meta.json.
 * Translators only touch /content (docs + locale folders).
 */
export const i18n = defineI18n({
  defaultLanguage: defaultLocale,
  languages: discoveredLocales,
  /**
   * Missing docs / meta for a locale inherit the default language.
   * Authors write the default locale first; other locales catch up later.
   */
  fallbackLanguage: defaultLocale,
  /** Locale folders: content/docs/{lang}/... (same idea as content/locales) */
  parser: 'dir',
});

export type AppLocale = (typeof i18n.languages)[number];

export function localeDirectionFor(locale: string): 'ltr' | 'rtl' {
  return getLocaleDirection(locale);
}

/** @deprecated prefer localeDirectionFor — kept for call sites that index by locale */
export const localeDirection: Record<string, 'ltr' | 'rtl'> =
  Object.fromEntries(
    discoveredLocales.map((lang) => [lang, getLocaleDirection(lang)]),
  );
