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

import { Form, useFetcher, useLoaderData } from 'react-router';
import type { loader } from '@/root';
import { NativeSelect, OutlinedInput } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { locale } = useLoaderData<typeof loader>();
  const { t, i18n } = useTranslation();
  const fetcher = useFetcher();
  const language = fetcher.formData ? fetcher.formData.get('language') : locale;

  return (
    <Form method='post'>
      <NativeSelect
        input={<OutlinedInput />}
        name='language'
        value={language}
        size='small'
        startAdornment={<LanguageIcon sx={{ mr: 1, fontSize: '1rem' }} />}
        aria-label={t('divaClient_ChooseLanguageText')}
        onChange={(e) => {
          const language = e.target.value as string;
          i18n.changeLanguage(language);
          fetcher.submit({ language }, { method: 'post' });
        }}
      >
        <option value='en'>English</option>
        <option value='sv'>Svenska</option>
      </NativeSelect>
    </Form>
  );
};
