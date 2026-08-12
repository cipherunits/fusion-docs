import registry from '@content/locales/meta.json';

export type LocaleMeta = {
  name: string;
  dir: 'ltr' | 'rtl';
  ogLocale: string;
};

type LocalesRegistry = {
  defaultLanguage: string;
  locales: Record<string, LocaleMeta>;
};

const data = registry as LocalesRegistry;

/** Locale metadata from content/locales/meta.json */
export const localeMetas: Record<string, LocaleMeta> = data.locales;

const discovered = Object.keys(localeMetas);

export const defaultLocale =
  data.defaultLanguage && discovered.includes(data.defaultLanguage)
    ? data.defaultLanguage
    : (discovered[0] ?? 'en');

/** All UI/docs locales — add/remove entries in content/locales/meta.json (+ locale folders). */
export const discoveredLocales: string[] =
  discovered.length > 0 ? discovered : [defaultLocale];

export function getLocaleMeta(locale: string): LocaleMeta {
  return (
    localeMetas[locale] ??
    localeMetas[defaultLocale] ?? {
      name: locale,
      dir: 'ltr' as const,
      ogLocale: locale,
    }
  );
}

export function getLocaleDirection(locale: string): 'ltr' | 'rtl' {
  return getLocaleMeta(locale).dir;
}
