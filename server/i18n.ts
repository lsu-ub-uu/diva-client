import type { Dependencies } from '@/cora/bffTypes.server';
import { createTextDefinition } from '@/data/textDefinition/textDefinition.server';
import { i18nConfig } from '@/i18n/i18nConfig';
import {
  userPreferencesCookie,
  type UserPreferences,
} from '@/userPreferences/userPreferencesCookie.server';
import type { Request } from 'express';
import { createInstance, type i18n } from 'i18next';
import I18NextHttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { createContext } from 'react-router';

const CI_MODE = process.env.CI_MODE === 'true';

export const i18nContext = createContext<i18n>();

export const createi18nInstance = async (
  request: Request,
  dependencies: Dependencies,
) => {
  const i18nInstance = createInstance();
  const userPreferences = (await userPreferencesCookie.parse(
    request.headers.cookie ?? null,
  )) as UserPreferences | null;
  const locale = userPreferences?.language ?? 'sv';
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
