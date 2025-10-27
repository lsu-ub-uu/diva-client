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
import { ChevronDownIcon, LoginIcon, LogoutIcon, PersonIcon } from '@/icons';
import { Menu, MenuButton, MenuItem } from '@headlessui/react';
import { useTranslation } from 'react-i18next';

import type { AppTokenLogin } from '@/auth/getAppTokenLogins.server';
import {
  logInWithWebRedirect,
  useWebRedirectLogin,
} from '@/auth/useWebRedirectLogin';
import type { LoginDefinition } from '@/data/loginDefinition/loginDefinition.server';
import { useUser } from '@/utils/rootLoaderDataUtils';
import { withBaseName } from '@/utils/withBasename';
import styles from './Login.module.css';

interface LoginProps {
  loginUnits: LoginDefinition[];
  appTokenLogins: AppTokenLogin[];
}

export default function Login({ loginUnits, appTokenLogins }: LoginProps) {
  const user = useUser();
  const fetcher = useFetcher();
  const submit = useSubmit();
  const { t } = useTranslation();
  const location = useLocation();
  const navigation = useNavigation();

  const searchParams = new URLSearchParams(location.search);
  const returnTo = encodeURIComponent(
    searchParams.get('returnTo') ?? `${location.pathname}${location.search}`,
  );

  const submitting =
    navigation.state === 'submitting' && navigation.formAction === '/login';

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
    'aria-busy': submitting,
    variant: 'tertiary',
  };

  const loginButtonChildren = (
    <>
      {t('divaClient_LoginText')}
      {submitting ? <CircularLoader /> : <LoginIcon />}
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
        <Menu>
          <MenuButton
            aria-busy={submitting}
            className={styles['login-button']}
            as='a'
            onClick={(e) => e.preventDefault()}
            href={withBaseName(`/login?returnTo=${returnTo}`)}
          >
            {t('divaClient_LoginText')}
            {submitting ? <CircularLoader /> : <LoginIcon />}
          </MenuButton>
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
      </div>
    );
  }

  return (
    <div className={styles['login']}>
      <Menu>
        <MenuButton
          className={styles['login-button']}
          as='a'
          href={withBaseName(`/logout?returnTo=${returnTo}`)}
          aria-busy={submitting}
          onClick={(e) => e.preventDefault()}
        >
          <PersonIcon />
          <span className={styles['user-name']}>
            {printUserNameOnPage(user)}
          </span>
          <ChevronDownIcon />
        </MenuButton>
        <DropdownMenu anchor='bottom end'>
          <MenuItem>
            <button onClick={logout} className={styles['logout-button']}>
              {t('divaClient_LogoutText')}
              <LogoutIcon />
            </button>
          </MenuItem>
        </DropdownMenu>
      </Menu>
    </div>
  );
}
