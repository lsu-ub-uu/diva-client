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

import { IconButton } from '@/components/IconButton/IconButton';
import type { UserPreferences } from '@/userPreferences/userPreferencesCookie.server';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useFetcher } from 'react-router';
import styles from './ColorSchemeSwitcher.module.css';

interface ColorThemeSwitcherProps {
  colorScheme: UserPreferences['colorScheme'];
}

export const ColorSchemeSwitcher = ({
  colorScheme,
}: ColorThemeSwitcherProps) => {
  const { t } = useTranslation();
  const fetcher = useFetcher();

  return (
    <fetcher.Form
      method='post'
      action='/'
      className={styles['color-scheme-switcher']}
    >
      <input type='hidden' name='intent' value='changeColorScheme' />
      <IconButton
        type='submit'
        name='colorScheme'
        value={colorScheme === 'dark' ? 'light' : 'dark'}
        tooltip={
          colorScheme === 'dark'
            ? t('divaClient_switchToLightModeText')
            : t('divaClient_switchToDarkModeText')
        }
      >
        {colorScheme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </IconButton>
    </fetcher.Form>
  );
};
