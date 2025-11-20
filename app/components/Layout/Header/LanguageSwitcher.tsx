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

import type { loader } from '@/root';
import { useTranslation } from 'react-i18next';
import { useFetcher, useLoaderData } from 'react-router';

import { Button } from '@/components/Button/Button';
import { LanguageIcon } from '@/icons';
import styles from './LanguageSwitcher.module.css';

export const LanguageSwitcher = () => {
  const { locale } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();
  const fetcher = useFetcher();
  const language = fetcher.formData ? fetcher.formData.get('language') : locale;

  return (
    <div className={styles['language-switcher']}>
      <fetcher.Form
        method='post'
        action='/'
        className={styles['color-scheme-switcher']}
      >
        <Button
          type='submit'
          variant='tertiary'
          name='language'
          value={language === 'sv' ? 'en' : 'sv'}
          onClick={(e) =>
            i18n.changeLanguage((e.target as HTMLButtonElement).value)
          }
        >
          {language === 'sv' ? 'Svenska' : 'English'}
          <LanguageIcon />
        </Button>
        <input type='hidden' name='intent' value='changeLanguage' />
      </fetcher.Form>
    </div>
  );
};
