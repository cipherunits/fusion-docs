import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { getOptions } from './settings';

async function initI18next(lng: string, ns: string | string[]) {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`@content/locales/${language}/${namespace}.json`),
      ),
    )
    .init(getOptions(lng, ns));

  return i18nInstance;
}

export async function getT(
  lng: string,
  ns: string | string[] = 'common',
  options: { keyPrefix?: string } = {},
) {
  const i18nextInstance = await initI18next(lng, ns);
  const namespace = Array.isArray(ns) ? (ns[0] ?? 'common') : ns;

  return {
    t: options.keyPrefix
      ? i18nextInstance.getFixedT(lng, namespace, options.keyPrefix)
      : i18nextInstance.getFixedT(lng, namespace),
    i18n: i18nextInstance,
  };
}
