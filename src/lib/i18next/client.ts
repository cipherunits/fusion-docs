'use client';

import { useEffect } from 'react';
import i18next from 'i18next';
import {
  initReactI18next,
  type UseTranslationOptions,
  useTranslation as useTranslationOrg,
} from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { useParams } from 'next/navigation';
import { getOptions, languages } from './settings';

const runsOnServerSide = typeof window === 'undefined';

void i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`@content/locales/${language}/${namespace}.json`),
    ),
  )
  .init({
    ...getOptions(),
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    preload: runsOnServerSide ? languages : [],
  });

export function useT(
  ns?: string | string[],
  options?: UseTranslationOptions<string>,
) {
  const params = useParams<{ lang?: string }>();
  const lang = typeof params?.lang === 'string' ? params.lang : undefined;
  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;

  useEffect(() => {
    if (!lang || i18n.resolvedLanguage === lang) {
      return;
    }
    void i18n.changeLanguage(lang);
  }, [lang, i18n]);

  if (runsOnServerSide && lang && i18n.resolvedLanguage !== lang) {
    void i18n.changeLanguage(lang);
  }

  return ret;
}
