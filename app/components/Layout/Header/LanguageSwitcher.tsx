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
import { useTranslation } from 'react-i18next';
import { Select } from '@/components/Input/Select';

import styles from './LanguageSwitcher.module.css';
import { Field } from '@/components/Input/Field';
import { LanguageIcon } from '@/icons';

export const LanguageSwitcher = () => {
  const { locale } = useLoaderData<typeof loader>();
  const { t, i18n } = useTranslation();
  const fetcher = useFetcher();
  const language = fetcher.formData ? fetcher.formData.get('language') : locale;

  return (
    <div className={styles['language-switcher']}>
      <LanguageIcon
        className={styles['language-icon']}
        aria-description={t('divaClient_ChooseLanguageLabelText')}
      />
      <Form method='post'>
        <Field>
          <Select
            name='language'
            value={language as string}
            aria-label={t('divaClient_ChooseLanguageText')}
            onChange={(e) => {
              const language = e.target.value as string;
              i18n.changeLanguage(language);
              fetcher.submit(
                { language, intent: 'changeLanguage' },
                { method: 'post' },
              );
            }}
          >
            <option value='en'>English</option>
            <option value='sv'> Svenska</option>
          </Select>
        </Field>
      </Form>
    </div>
  );
};
