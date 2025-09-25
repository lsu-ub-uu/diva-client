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
  useFetcher,
  useLocation,
  useNavigation,
  useSubmit,
} from 'react-router';
import {
  messageIsFromWindowOpenedFromHere,
  printUserNameOnPage,
} from '@/components/Layout/Header/Login/utils/utils';

import type { Account } from '@/components/Layout/Header/Login/devAccounts';
import { useTranslation } from 'react-i18next';
import { DevAccountLoginOptions } from '@/components/Layout/Header/Login/DevAccountLoginOptions';
import { WebRedirectLoginOptions } from '@/components/Layout/Header/Login/WebRedirectLoginOptions';
import { PasswordLoginOptions } from '@/components/Layout/Header/Login/PasswordLoginOptions';
import { ChevronDownIcon, LoginIcon, LogoutIcon, PersonIcon } from '@/icons';
import { Button } from '@/components/Button/Button';
import { DropdownMenu } from '@/components/DropdownMenu/DropdownMenu';
import { Menu, MenuButton, MenuItem } from '@headlessui/react';
import { CircularLoader } from '@/components/Loader/CircularLoader';

import styles from './Login.module.css';
import { useHydrated } from '@/utils/useHydrated';
import { useUser } from '@/utils/rootLoaderDataUtils';

export default function Login({ expired }: { expired?: boolean }) {
  const hydrated = useHydrated();
  const { MODE } = import.meta.env;
  const user = useUser();
  const fetcher = useFetcher();
  const submit = useSubmit();
  const { t } = useTranslation();
  const location = useLocation();
  const navigation = useNavigation();
  const returnTo = encodeURIComponent(location.pathname + location.search);

  const submitting =
    navigation.state === 'submitting' && navigation.formAction === '/login';

  const handleDevSelection = (account: Account) => {
    submit(
      { loginType: 'appToken', account: JSON.stringify(account), returnTo },
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

  if (!user || expired) {
    return (
      <div className={styles['login']}>
        <Menu>
          <MenuButton
            as={Button}
            disabled={submitting || !hydrated}
            aria-busy={submitting}
            variant='tertiary'
          >
            {t('divaClient_LoginText')}
            {submitting ? <CircularLoader /> : <LoginIcon />}
          </MenuButton>
          <DropdownMenu anchor='bottom end'>
            <DevAccountLoginOptions onSelect={handleDevSelection} />
            <hr />
            <WebRedirectLoginOptions onSelect={handleWebRedirectSelection} />
            <hr />
            <PasswordLoginOptions returnTo={returnTo} />
          </DropdownMenu>
        </Menu>
      </div>
    );
  }

  return (
    <div className={styles['login']}>
      <Menu>
        <MenuButton
          as={Button}
          disabled={submitting || !hydrated}
          aria-busy={submitting}
          variant='tertiary'
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
