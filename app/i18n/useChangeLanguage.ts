/*
 * Copyright 2024 Uppsala University Library
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

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useChangeLanguage = (
  locale: string,
  translations?: Record<string, string>,
) => {
  const { i18n } = useTranslation();
  useEffect(() => {
    if (translations) {
      i18n.addResourceBundle(locale, 'translation', translations, true, true);
    }
    if (locale !== i18n.language) {
      i18n.changeLanguage(locale);
    }
  }, [locale, translations, i18n]);
};
