import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type en from '@content/locales/en/common.json';
import { defaultLocale, discoveredLocales } from '@/lib/locales-registry';

export type CommonMessages = typeof en;

function loadCommonFile(locale: string): Record<string, string> | null {
  try {
    const filePath = join(
      process.cwd(),
      'content/locales',
      locale,
      'common.json',
    );
    return JSON.parse(readFileSync(filePath, 'utf8')) as Record<string, string>;
  } catch {
    return null;
  }
}

const fallback = (loadCommonFile(defaultLocale) ??
  loadCommonFile(discoveredLocales[0] ?? 'en') ??
  {}) as CommonMessages;

/** Locale UI copy with default-locale fallback for any missing key. */
export function getCommon(locale: string): CommonMessages {
  if (locale === defaultLocale) {
    return fallback;
  }

  const messages = loadCommonFile(locale);
  if (!messages) {
    return fallback;
  }

  return {
    ...fallback,
    ...messages,
  };
}
