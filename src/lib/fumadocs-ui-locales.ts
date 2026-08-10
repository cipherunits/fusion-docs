import en from '@content/locales/en/fumadocs-ui.json';
import fa from '@content/locales/fa/fumadocs-ui.json';
import ru from '@content/locales/ru/fumadocs-ui.json';

/**
 * Fumadocs UI strings from `content/locales/{lang}/fumadocs-ui.json`.
 * Missing keys fall back to English so partial locale files stay valid.
 */
export const fumadocsUiLocales = {
  en,
  fa: { ...en, ...fa },
  ru: { ...en, ...ru },
} as const;
