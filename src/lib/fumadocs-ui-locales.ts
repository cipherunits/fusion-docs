import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { defaultLocale, discoveredLocales } from '@/lib/locales-registry';

function loadUiFile(locale: string): Record<string, string> {
  try {
    const filePath = join(
      process.cwd(),
      'content/locales',
      locale,
      'fumadocs-ui.json',
    );
    return JSON.parse(readFileSync(filePath, 'utf8')) as Record<string, string>;
  } catch {
    return {};
  }
}

const english = loadUiFile(defaultLocale);

/**
 * Fumadocs UI strings from content/locales/{lang}/fumadocs-ui.json.
 * Missing keys fall back to the default locale so partial files stay valid.
 */
export const fumadocsUiLocales = Object.fromEntries(
  discoveredLocales.map((lang) => [
    lang,
    lang === defaultLocale ? english : { ...english, ...loadUiFile(lang) },
  ]),
);
