import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type enCommon from '@content/locales/en/common.json';
import type enGui from '@content/locales/en/gui.json';
import type enHome from '@content/locales/en/home.json';
import type enSeo from '@content/locales/en/seo.json';
import { defaultLocale, discoveredLocales } from '@/lib/locales-registry';

export type CommonMessages = typeof enCommon;
export type HomeMessages = typeof enHome;
export type GuiMessages = typeof enGui;
export type SeoMessages = typeof enSeo;

function loadLocaleFile<T extends Record<string, unknown>>(
  locale: string,
  namespace: string,
): T | null {
  try {
    const filePath = join(
      process.cwd(),
      'content/locales',
      locale,
      `${namespace}.json`,
    );
    return JSON.parse(readFileSync(filePath, 'utf8')) as T;
  } catch {
    return null;
  }
}

function getNamespaceMessages<T extends Record<string, unknown>>(
  locale: string,
  namespace: string,
  fallback: T,
): T {
  if (locale === defaultLocale) {
    return fallback;
  }

  const messages = loadLocaleFile<T>(locale, namespace);
  if (!messages) {
    return fallback;
  }

  return {
    ...fallback,
    ...messages,
  };
}

function loadFallback<T extends Record<string, unknown>>(namespace: string): T {
  return (loadLocaleFile<T>(defaultLocale, namespace) ??
    loadLocaleFile<T>(discoveredLocales[0] ?? 'en', namespace) ??
    {}) as T;
}

const commonFallback = loadFallback<CommonMessages>('common');
const homeFallback = loadFallback<HomeMessages>('home');
const guiFallback = loadFallback<GuiMessages>('gui');
const seoFallback = loadFallback<SeoMessages>('seo');

/** Shared chrome copy (nav, language switcher labels, etc.). */
export function getCommon(locale: string): CommonMessages {
  return getNamespaceMessages(locale, 'common', commonFallback);
}

/** Home page copy. */
export function getHome(locale: string): HomeMessages {
  return getNamespaceMessages(locale, 'home', homeFallback);
}

/** Desktop / GUI download page copy. */
export function getGui(locale: string): GuiMessages {
  return getNamespaceMessages(locale, 'gui', guiFallback);
}

/** Localized SEO strings (descriptions, keywords, image alts). */
export function getSeo(locale: string): SeoMessages {
  return getNamespaceMessages(locale, 'seo', seoFallback);
}
