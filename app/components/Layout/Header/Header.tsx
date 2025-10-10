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

import DivaLogo from '@/assets/divaLogo.svg?react';
import { Button } from '@/components/Button/Button';
import { LanguageSwitcher } from '@/components/Layout/Header/LanguageSwitcher';
import Login from '@/components/Layout/Header/Login/Login';
import { NavigationLink } from '@/components/Layout/NavigationLink/NavigationLink';
import { TopNavigation } from '@/components/Layout/TopNavigation/TopNavigation';
import type { BFFRecordType } from '@/cora/transform/bffTypes.server';
import {
  CachedIcon,
  CloseIcon,
  CodeIcon,
  DesignServicesIcon,
  MenuIcon,
} from '@/icons';
import { useIsDevMode } from '@/utils/useIsDevMode';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { Suspense, useEffect, useState } from 'react';
import {
  Await,
  Form,
  href,
  Link,
  useLocation,
  useNavigation,
} from 'react-router';
import styles from './Header.module.css';
import type { LoginDefinition } from '@/data/loginDefinition/loginDefinition.server';
import type { AppTokenLogin } from '@/auth/getAppTokenLogins.server';

interface HeaderProps {
  recordTypes: Promise<BFFRecordType[]>;
  loginUnits: LoginDefinition[];
  appTokenLogins: AppTokenLogin[];
}

export const Header = ({
  recordTypes,
  loginUnits,
  appTokenLogins,
}: HeaderProps) => {
  const location = useLocation();
  const returnTo = encodeURIComponent(location.pathname + location.search);
  const devMode = useIsDevMode();
  const navigation = useNavigation();

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
          <DivaLogo className={styles['logo']} />
        </Link>

        <div className={styles['top-navigation']}>
          <Suspense>
            <Await resolve={recordTypes} errorElement={<div />}>
              {(resolvedRecordType) => (
                <TopNavigation recordTypes={resolvedRecordType} />
              )}
            </Await>
          </Suspense>
        </div>
      </div>

      <div className={styles['header-content']}>
        {devMode && (
          <>
            <NavigationLink
              to={href('/api-docs')}
              label='API'
              icon={<CodeIcon />}
            />
            <NavigationLink
              to={href('/design-system')}
              label='Design system'
              icon={<DesignServicesIcon />}
            />
            <Form action={href('/refreshDefinitions')} method='POST'>
              <input type='hidden' name='returnTo' value={returnTo} />
              <Button variant='tertiary' type='submit'>
                <CachedIcon />
              </Button>
            </Form>
          </>
        )}
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
          <Login loginUnits={loginUnits} appTokenLogins={appTokenLogins} />
          <LanguageSwitcher />

          <Suspense>
            <Await resolve={recordTypes} errorElement={<div />}>
              {(resolvedRecordType) => (
                <TopNavigation recordTypes={resolvedRecordType} />
              )}
            </Await>
          </Suspense>
        </DialogPanel>
      </Dialog>
    </header>
  );
};
