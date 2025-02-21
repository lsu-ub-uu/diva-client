/*
 * Copyright 2025 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

import 'react-router';
import { createRequestHandler } from '@react-router/express';
import express, { type Request } from 'express';
import {
  dependencies,
  getDependencies,
  loadStuffOnServerStart,
} from '@/data/pool.server';
import { createInstance, type i18n } from 'i18next';
import { i18nCookie } from '@/i18n/i18nCookie.server';
import { initReactI18next } from 'react-i18next';
import I18NextHttpBackend from 'i18next-http-backend';
import { i18nConfig } from '@/i18n/i18nConfig';
import { createTextDefinition } from '@/data/textDefinition/textDefinition.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';

declare module 'react-router' {
  export interface AppLoadContext {
    dependencies: Promise<Dependencies>;
    refreshDependencies: () => Promise<Dependencies>;
    i18n: i18n;
  }
}

export const app = express();

app.use(
  createRequestHandler({
    // @ts-expect-error - virtual module provided by React Router at build time
    build: () => import('virtual:react-router/server-build'),
    getLoadContext: async (request) => ({
      dependencies: getDependencies(),
      refreshDependencies: loadStuffOnServerStart,
      i18n: await createi18nInstance(request),
    }),
  }),
);

const createi18nInstance = async (request: Request) => {
  const i18nInstance = createInstance();

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
      lng: locale,
    });
  return i18nInstance;
};
