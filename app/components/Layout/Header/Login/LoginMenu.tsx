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

import { printUserNameOnPage } from '@/components/Layout/Header/Login/utils/utils';
import {
  href,
  Link,
  useFetcher,
  useLocation,
  useNavigation,
  useSubmit,
} from 'react-router';

import { Button, type ButtonProps } from '@/components/Button/Button';
import { DropdownMenu } from '@/components/DropdownMenu/DropdownMenu';
import { DevAccountLoginOptions } from '@/components/Layout/Header/Login/DevAccountLoginOptions';
import { PasswordLoginMenuOptions } from '@/components/Layout/Header/Login/PasswordLoginMenuOptions';
import { WebRedirectLoginMenuOptions } from '@/components/Layout/Header/Login/WebRedirectLoginMenuOptions';
import { CircularLoader } from '@/components/Loader/CircularLoader';
import { Menu, MenuButton, MenuItem } from '@headlessui/react';
import { useTranslation } from 'react-i18next';

import type { AppTokenLogin } from '@/auth/getAppTokenLogins.server';
import {
  logInWithWebRedirect,
  useWebRedirectLogin,
} from '@/auth/useWebRedirectLogin';
import type { LoginDefinition } from '@/data/loginDefinition/loginDefinition.server';
import { useUser } from '@/utils/rootLoaderDataUtils';
import { useHydrated } from '@/utils/useHydrated';
import { CircleUserRoundIcon, LogInIcon, LogOutIcon } from 'lucide-react';
import styles from './Login.module.css';

interface LoginMenuProps {
  loginUnits: LoginDefinition[];
  appTokenLogins: AppTokenLogin[];
}

export default function LoginMenu({
  loginUnits,
  appTokenLogins,
}: LoginMenuProps) {
  const user = useUser();
  const fetcher = useFetcher();
  const submit = useSubmit();
  const { t } = useTranslation();
  const location = useLocation();
  const hydrated = useHydrated();
  const navigation = useNavigation();

  const searchParams = new URLSearchParams(location.search);
  const returnTo = encodeURIComponent(
    searchParams.get('returnTo') ?? `${location.pathname}${location.search}`,
  );

  const submitting =
    navigation.state !== 'idle' && navigation.formAction?.includes('/login');

  useWebRedirectLogin({ returnTo });

  const handleDevSelection = (account: AppTokenLogin) => {
    submit(
      {
        loginType: 'appToken',
        loginId: account.loginId,
        appToken: account.appToken,
        returnTo,
      },
      { action: '/login', method: 'post' },
    );
  };

  const logout = () => {
    fetcher.submit({ returnTo }, { method: 'post', action: '/logout' });
  };

  const loginButtonProps: ButtonProps = {
    disabled: submitting,
    'aria-busy': submitting,
    variant: 'tertiary',
  };

  const loginButtonChildren = (
    <>
      {t('divaClient_LoginText')}
      {submitting ? <CircularLoader /> : <LogInIcon />}
    </>
  );

  if (!user) {
    if (loginUnits.length === 1 && appTokenLogins.length === 0) {
      const loginUnit = loginUnits[0];
      return (
        <div className={styles['login']}>
          {loginUnit.type === 'webRedirect' && (
            <Button
              {...loginButtonProps}
              onClick={() => logInWithWebRedirect(loginUnit.url!)}
            >
              {loginButtonChildren}
            </Button>
          )}
          {loginUnit.type === 'password' && (
            <Button
              {...loginButtonProps}
              as={Link}
              to={{
                pathname: '/login',
                search: `?loginUnit=${loginUnit.id}&returnTo=${returnTo}`,
              }}
            >
              {loginButtonChildren}
            </Button>
          )}
        </div>
      );
    }

    return (
      <div className={styles['login']}>
        {!hydrated && (
          <Button
            variant='tertiary'
            as={Link}
            to={{ pathname: href('/login'), search: `?returnTo=${returnTo}` }}
          >
            {loginButtonChildren}
          </Button>
        )}
        {hydrated && (
          <Menu>
            <Button
              disabled={submitting}
              aria-busy={submitting}
              className={styles['login-button']}
              as={MenuButton}
              variant='tertiary'
            >
              {loginButtonChildren}
            </Button>
            <DropdownMenu anchor='bottom end'>
              <DevAccountLoginOptions
                appTokenLogins={appTokenLogins}
                onSelect={handleDevSelection}
              />
              <WebRedirectLoginMenuOptions
                webRedirectLoginUnits={loginUnits.filter(
                  ({ type }) => type === 'webRedirect',
                )}
              />
              <PasswordLoginMenuOptions
                passwordLoginUnits={loginUnits.filter(
                  ({ type }) => type === 'password',
                )}
                returnTo={returnTo}
              />
            </DropdownMenu>
          </Menu>
        )}
      </div>
    );
  }

  const logoutButtonChildren = (
    <>
      <span className={styles['user-name']}>{printUserNameOnPage(user)}</span>
      <span className={styles['user-initials']}>
        {user.firstName?.charAt(0)}
        {user.lastName?.charAt(0)}
      </span>
      <CircleUserRoundIcon />
    </>
  );

  return (
    <div className={styles['login']}>
      {!hydrated && (
        <Button
          variant='tertiary'
          as={Link}
          to={{ pathname: href('/logout'), search: `?returnTo=${returnTo}` }}
        >
          {logoutButtonChildren}
        </Button>
      )}
      {hydrated && (
        <Menu>
          <Button
            variant='tertiary'
            as={MenuButton}
            className={styles['login-button']}
            disabled={submitting}
            aria-busy={submitting}
            onClick={(e) => e.preventDefault()}
          >
            {logoutButtonChildren}
          </Button>
          <DropdownMenu anchor='bottom end'>
            <MenuItem>
              <button onClick={logout} className={styles['logout-button']}>
                {t('divaClient_LogoutText')}
                <LogOutIcon />
              </button>
            </MenuItem>
          </DropdownMenu>
        </Menu>
      )}
    </div>
  );
}
