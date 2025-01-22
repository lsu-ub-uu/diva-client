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
  Form,
  useLoaderData,
  useLocation,
  useNavigation,
  useSubmit,
} from '@remix-run/react';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Menu,
  Stack,
} from '@mui/material';
import type { loader } from '@/root';
import {
  messageIsFromWindowOpenedFromHere,
  printUserNameOnPage,
} from '@/components/Layout/Header/Login/utils/utils';
import LogoutIcon from '@mui/icons-material/Logout';
import type { Account } from '@/components/Layout/Header/Login/devAccounts';
import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import { DevAccountLoginOptions } from '@/components/Layout/Header/Login/DevAccountLoginOptions';
import { WebRedirectLoginOptions } from '@/components/Layout/Header/Login/WebRedirectLoginOptions';
import { PasswordLoginOptions } from '@/components/Layout/Header/Login/PasswordLoginOptions';

export default function User() {
  const { MODE } = import.meta.env;
  const { auth } = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const { t } = useTranslation();
  const anchorEl = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigation = useNavigation();
  const returnTo = encodeURIComponent(location.pathname + location.search);

  const handleDevSelection = (account: Account) => {
    setMenuOpen(false);
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
    setMenuOpen(false);
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

  if (!auth) {
    return (
      <>
        <Button
          ref={anchorEl}
          onClick={() => setMenuOpen(true)}
          disabled={navigation.state === 'submitting'}
        >
          {navigation.state === 'submitting' ? (
            <>
              {t('divaClient_LoginText')}{' '}
              <CircularProgress
                size='1em'
                sx={{ ml: 1 }}
              />
            </>
          ) : (
            t('divaClient_LoginText')
          )}
        </Button>
        <Menu
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          anchorEl={anchorEl.current}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <DevAccountLoginOptions onSelect={handleDevSelection} />
          <Divider />
          <WebRedirectLoginOptions onSelect={handleWebRedirectSelection} />
          <Divider />
          <PasswordLoginOptions
            returnTo={returnTo}
            onSelect={() => setMenuOpen(false)}
          />
        </Menu>
      </>
    );
  }

  return (
    <Stack
      direction='row'
      alignItems='center'
      spacing={2}
      style={{ marginTop: '-1px' }}
    >
      <Box style={{ fontSize: '14px' }}>{printUserNameOnPage(auth)}</Box>
      <Form
        action='/logout'
        method='post'
      >
        <input
          type='hidden'
          name='returnTo'
          value={returnTo}
        />
        <Button
          type='submit'
          endIcon={<LogoutIcon />}
        >
          {t('divaClient_LogoutText')}
        </Button>
      </Form>
    </Stack>
  );
}
