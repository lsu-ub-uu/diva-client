import type { Request } from 'express';
import { createInstance, type i18n as I18nInstance } from 'i18next';
import { i18nCookie } from '@/i18n/i18nCookie.server';
import { initReactI18next } from 'react-i18next';
import I18NextHttpBackend from 'i18next-http-backend';
import { i18nConfig } from '@/i18n/i18nConfig';
import { createTextDefinition } from '@/data/textDefinition/textDefinition.server';
import { createContext } from 'react-router';
import type { Dependencies } from '@/cora/bffTypes.server';

const CI_MODE = process.env.CI_MODE === 'true';

// Cache i18n instances per locale to avoid creating new instances on every request
const i18nCache = new Map<string, I18nInstance>();

type SupportedLocale = 'sv' | 'en' | 'cimode';

export const i18nContext = createContext<I18nInstance>();

export const createi18nInstance = async (
  request: Request,
  dependencies: Dependencies,
) => {
  const languageCookie = await i18nCookie.parse(request.headers.cookie ?? null);
  const locale: SupportedLocale = CI_MODE ? 'cimode' : (languageCookie ?? 'sv');

  const cached = i18nCache.get(locale);
  if (cached) {
    return cached;
  }

  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(I18NextHttpBackend)
    .init({
      ...i18nConfig,
      resources:
        locale === 'cimode'
          ? {}
          : {
              [locale]: {
                translation: createTextDefinition(dependencies, locale),
              },
            },
      lng: locale,
    });

  i18nCache.set(locale, i18nInstance as I18nInstance);
  return i18nInstance;
};

export const clearI18nCache = () => {
  i18nCache.clear();
};
