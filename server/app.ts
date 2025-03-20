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
import express from 'express';
import { getDependencies, loadDependencies } from './depencencies';
import { type i18n } from 'i18next';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { createi18nInstance } from './i18n';

declare module 'react-router' {
  export interface AppLoadContext {
    dependencies: Promise<Dependencies>;
    refreshDependencies: () => Promise<void>;
    i18n: i18n;
  }
}

export const app = express();

app.use(
  createRequestHandler({
    build: () => import('virtual:react-router/server-build'),
    getLoadContext: async (request) => ({
      dependencies: getDependencies(),
      refreshDependencies: loadDependencies,
      i18n: await createi18nInstance(request),
    }),
  }),
);
