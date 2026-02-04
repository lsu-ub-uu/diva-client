import type { Request } from 'express';
import { createInstance, type i18n } from 'i18next';
import { i18nCookie } from '@/i18n/i18nCookie.server';
import { initReactI18next } from 'react-i18next';
import I18NextHttpBackend from 'i18next-http-backend';
import { i18nConfig } from '@/i18n/i18nConfig';
import { createTextDefinition } from '@/data/textDefinition/textDefinition.server';
import { createContext } from 'react-router';
import { getDependencies } from './depencencies';

const CI_MODE = process.env.CI_MODE === 'true';

export const i18nContext = createContext<i18n>();
export const createi18nInstance = async (request: Request) => {
  const i18nInstance = createInstance({ supportedLngs: ['en', 'sv'] });
  const dependencies = await getDependencies();
  const languageCookie = await i18nCookie.parse(request.headers.cookie ?? null);
  const locale = languageCookie ?? 'sv';
  await i18nInstance
    .use(initReactI18next)
    .use(I18NextHttpBackend)
    .init({
      ...i18nConfig,
      resources: {
        en: {
          translation: createTextDefinition(dependencies, 'en'),
        },
        sv: {
          translation: createTextDefinition(dependencies, 'sv'),
        },
      },
      lng: CI_MODE ? 'cimode' : locale,
    });
  return i18nInstance;
};
