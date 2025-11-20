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

import { Button } from '@/components/Button/Button';
import type { UserPreferences } from '@/userPreferences/userPreferencesCookie.server';
import { useTranslation } from 'react-i18next';
import { useFetcher } from 'react-router';
import styles from './ColorSchemeSwitcher.module.css';
import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';

interface ColorThemeSwitcherProps {
  colorScheme: UserPreferences['colorScheme'];
}

export const ColorSchemeSwitcher = ({
  colorScheme,
}: ColorThemeSwitcherProps) => {
  const [preferredColorScheme, setPreferredColorScheme] =
    useState<UserPreferences['colorScheme']>();
  const { t } = useTranslation();
  const fetcher = useFetcher();

  useEffect(() => {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const updatePreferredColorScheme = () => {
        setPreferredColorScheme(mediaQuery.matches ? 'dark' : 'light');
      };

      updatePreferredColorScheme();

      mediaQuery.addEventListener('change', updatePreferredColorScheme);
      return () => {
        mediaQuery.removeEventListener('change', updatePreferredColorScheme);
      };
    }
  }, []);

  const currentColorScheme =
    colorScheme === 'auto' ? preferredColorScheme : colorScheme;

  if (!currentColorScheme) {
    return null;
  }

  return (
    <fetcher.Form
      method='post'
      action='/'
      className={styles['color-scheme-switcher']}
    >
      <input type='hidden' name='intent' value='changeColorScheme' />
      <Button
        variant='icon'
        type='submit'
        name='colorScheme'
        value={currentColorScheme === 'dark' ? 'light' : 'dark'}
        aria-label={
          currentColorScheme === 'dark'
            ? t('divaClient_switchToLightModeText')
            : t('divaClient_switchToDarkModeText')
        }
      >
        {currentColorScheme === 'light' ? <SunIcon /> : <MoonIcon />}
      </Button>
    </fetcher.Form>
  );
};
