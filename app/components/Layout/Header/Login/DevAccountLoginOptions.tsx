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

import { useTranslation } from 'react-i18next';

import { MenuItem } from '@headlessui/react';
import type { AppTokenLogin } from '@/auth/getAppTokenLogins.server';
import { useLoaderData } from 'react-router';
import { loader } from '@/root';

interface DevAccountsProps {
  onSelect: (account: AppTokenLogin) => void;
}
export const DevAccountLoginOptions = ({ onSelect }: DevAccountsProps) => {
  const { t } = useTranslation();
  const { appTokenLogins } = useLoaderData<typeof loader>();
  if (appTokenLogins.length === 0) {
    return null;
  }
  return (
    <>
      <h6>{t('divaClient_LoginDevAccountText')}</h6>
      {appTokenLogins.map((devAccount) => (
        <MenuItem key={devAccount.loginId}>
          <button onClick={() => onSelect(devAccount)}>
            {devAccount.displayName}
          </button>
        </MenuItem>
      ))}
    </>
  );
};
