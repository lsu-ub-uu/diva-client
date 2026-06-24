/*
 * Copyright 2023 Uppsala University Library
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

import { i18nConfig } from '@/i18n/i18nConfig';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const initClienti18n = (
  locale: string,
  translations: Record<string, string>,
) => {
  return i18n.use(initReactI18next).init({
    ...i18nConfig,
    lng: locale,
    resources: {
      [locale]: {
        translation: translations,
      },
    },
  });
};
