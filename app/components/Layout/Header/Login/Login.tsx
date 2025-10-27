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

import {
  messageIsFromWindowOpenedFromHere,
  printUserNameOnPage,
} from '@/components/Layout/Header/Login/utils/utils';
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
import { PasswordLoginOptions } from '@/components/Layout/Header/Login/PasswordLoginOptions';
import { WebRedirectLoginOptions } from '@/components/Layout/Header/Login/WebRedirectLoginOptions';
import { CircularLoader } from '@/components/Loader/CircularLoader';
import { ChevronDownIcon, LoginIcon, LogoutIcon, PersonIcon } from '@/icons';
import { Menu, MenuButton, MenuItem } from '@headlessui/react';
import { useTranslation } from 'react-i18next';

import type { AppTokenLogin } from '@/auth/getAppTokenLogins.server';
import type { LoginDefinition } from '@/data/loginDefinition/loginDefinition.server';
import { useUser } from '@/utils/rootLoaderDataUtils';
import styles from './Login.module.css';

interface LoginProps {
  loginUnits: LoginDefinition[];
  appTokenLogins: AppTokenLogin[];
}

export default function Login({ loginUnits, appTokenLogins }: LoginProps) {
  const { MODE } = import.meta.env;
  const user = useUser();
  const fetcher = useFetcher();
  const submit = useSubmit();
  const { t } = useTranslation();
  const location = useLocation();
  const navigation = useNavigation();

  const searchParams = new URLSearchParams(location.search);
  const returnTo =
    searchParams.get('returnTo') ?? `${location.pathname}${location.search}`;

  const submitting =
    navigation.state === 'submitting' && navigation.formAction === '/login';

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

  const handleWebRedirectSelection = (url: string) => {
    try {
      window.open(MODE === 'development' ? '/devLogin' : url);
      window.addEventListener('message', receiveMessage);
    } catch (e: any) {
      console.error(e.message());
    }
  };

  const receiveMessage = (event: MessageEvent<any>) => {
    if (messageIsFromWindowOpenedFromHere(event) && event.data.authentication) {
      window.removeEventListener('message', receiveMessage);
      submit(
        {
          loginType: 'webRedirect',
          auth: JSON.stringify(event.data),
          returnTo,
        },
        { action: '/login', method: 'post' },
      );
    }
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
              onClick={() => handleWebRedirectSelection(loginUnit.url!)}
            >
              {loginButtonChildren}
            </Button>
          )}
          {loginUnit.type === 'password' && (
            <Button
              {...loginButtonProps}
              as={Link}
              to={`/login?presentation=${encodeURIComponent(JSON.stringify(loginUnit.presentation))}&returnTo=${returnTo}`}
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
            href={`/login?returnTo=${returnTo}`}
          >
            {t('divaClient_LoginText')}
            {submitting ? <CircularLoader /> : <LoginIcon />}
          </MenuButton>
          <DropdownMenu anchor='bottom end'>
            <DevAccountLoginOptions
              appTokenLogins={appTokenLogins}
              onSelect={handleDevSelection}
            />
            <WebRedirectLoginOptions
              webRedirectLoginUnits={loginUnits.filter(
                ({ type }) => type === 'webRedirect',
              )}
              onSelect={handleWebRedirectSelection}
            />
            <PasswordLoginOptions
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
          href={`/logout?returnTo=${returnTo}`}
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
