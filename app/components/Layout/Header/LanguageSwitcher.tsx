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
import { ChevronDownIcon, LanguageIcon, LogoutIcon, PersonIcon } from '@/icons';
import { Menu, MenuButton, MenuItem } from '@headlessui/react';
import { Button } from '@/components/Button/Button';
import { printUserNameOnPage } from '@/components/Layout/Header/Login/utils/utils';
import { DropdownMenu } from '@/components/DropdownMenu/DropdownMenu';

export const LanguageSwitcher = () => {
  const { locale } = useLoaderData<typeof loader>();
  const { t, i18n } = useTranslation();
  const fetcher = useFetcher();
  const language = fetcher.formData ? fetcher.formData.get('language') : locale;

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    fetcher.submit({ language, intent: 'changeLanguage' }, { method: 'post' });
  };

  return (
    <div className={styles['language-switcher']}>
      <Menu>
        <MenuButton
          as={Button}
          variant='tertiary'
          aria-label={t('divaClient_ChooseLanguageText')}
        >
          <LanguageIcon className={styles['language-icon']} />
          <span className={styles['dropdown-label']}>
            {language === 'sv' ? 'Svenska' : 'English'}
          </span>
          <ChevronDownIcon />
        </MenuButton>
        <DropdownMenu anchor='bottom end'>
          <input type='hidden' name='intent' value='changeLanguage' />
          <MenuItem>
            <button onClick={() => changeLanguage('en')}>English</button>
          </MenuItem>
          <MenuItem>
            <button onClick={() => changeLanguage('sv')}>Svenska</button>
          </MenuItem>
        </DropdownMenu>
      </Menu>
    </div>
  );
};
