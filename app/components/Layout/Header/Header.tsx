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

import {
  Form,
  Link,
  useLocation,
  useNavigation,
  useRouteLoaderData,
} from 'react-router';
import divaLogo from '@/assets/divaLogo.svg';
import Login from '@/components/Layout/Header/Login/Login';
import { LanguageSwitcher } from '@/components/Layout/Header/LanguageSwitcher';
import { useIsDevMode } from '@/utils/useIsDevMode';
import { CachedIcon, CloseIcon, MenuIcon } from '@/icons';
import { Button } from '@/components/Button/Button';
import styles from './Header.module.css';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { TopNavigation } from '@/components/Layout/TopNavigation/TopNavigation';
import type { loader } from '@/root';

export const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const returnTo = encodeURIComponent(location.pathname + location.search);
  const devMode = useIsDevMode();
  const navigation = useNavigation();
  const rootLoaderData = useRouteLoaderData<typeof loader>('root');

  const [headerShown, setHeaderShown] = useState(false);

  useEffect(() => {
    if (navigation.state !== 'idle') {
      setHeaderShown(false);
    }
  }, [navigation.state]);

  return (
    <header className={styles['header-wrapper']} data-expanded={headerShown}>
      <div className={styles['header-logo-wrapper']}>
        <Link to='/'>
          <picture className={styles['logo']}>
            {/*  <source srcSet={divaLogoS} media='(max-width: 600px)' />*/}
            <source srcSet={divaLogo} />

            <img src={divaLogo} alt={t('divaClient_logotypeAltTextText')} />
          </picture>
        </Link>
        {rootLoaderData && (
          <div className={styles['top-navigation']}>
            <TopNavigation links={rootLoaderData.topNavigationLinks} />
          </div>
        )}
      </div>

      <div className={styles['header-content']}>
        {devMode && (
          <Button as={Link} variant='tertiary' to='/design-system'>
            Design system
          </Button>
        )}

        {devMode && (
          <Form action='/refreshDefinitions' method='POST'>
            <input type='hidden' name='returnTo' value={returnTo} />
            <Button variant='tertiary' type='submit'>
              Refresh Def <CachedIcon />
            </Button>
          </Form>
        )}

        <LanguageSwitcher />

        <Login />
      </div>
      <Button
        variant='icon'
        className={styles['header-menu-toggle-button']}
        onClick={() => setHeaderShown(!headerShown)}
      >
        {headerShown ? <CloseIcon /> : <MenuIcon />}
      </Button>
      <Dialog
        open={headerShown}
        onClose={() => setHeaderShown(false)}
        className={styles['header-menu-dialog']}
      >
        <DialogBackdrop
          className={styles['header-menu-dialog-backdrop']}
          transition
        />
        <DialogPanel className={styles['header-menu-dialog-panel']} transition>
          <Button
            variant='icon'
            onClick={() => setHeaderShown(false)}
            className={styles['header-menu-dialog-close-button']}
          >
            <CloseIcon />
          </Button>
          <Login />

          {rootLoaderData && (
            <TopNavigation links={rootLoaderData.topNavigationLinks} />
          )}
          <LanguageSwitcher />
        </DialogPanel>
      </Dialog>
    </header>
  );
};
