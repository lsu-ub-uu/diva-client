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

import { createRequestHandler } from '@react-router/express';
import express from 'express';
import 'react-router';
import { RouterContextProvider } from 'react-router';
import {
  dependenciesContext,
  getDependencies,
  loadDependencies,
} from './depencencies';
import { createi18nInstance, i18nContext } from './i18n';
import type { i18n } from 'i18next';

export const app = express();

app.use(
  createRequestHandler({
    build: () => import('virtual:react-router/server-build'),

    getLoadContext: async (request) => {
      const context = new RouterContextProvider();

      context.set(dependenciesContext, {
        dependencies: await getDependencies(),

        refreshDependencies: loadDependencies,
      });

      context.set(i18nContext, (await createi18nInstance(request)) as i18n);

      return context;
    },
  }),
);
