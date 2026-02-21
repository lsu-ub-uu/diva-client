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

import { MenuItem } from '@/components/Menu/MenuItem';
import type { LoginDefinition } from '@/data/loginDefinition/loginDefinition.server';
import { useTranslation } from 'react-i18next';
import { href, Link } from 'react-router';

interface PasswordLoginOptionsProps {
  passwordLoginUnits: LoginDefinition[];
  returnTo: string;
}

export const PasswordLoginMenuOptions = ({
  passwordLoginUnits,
  returnTo,
}: PasswordLoginOptionsProps) => {
  const { t } = useTranslation();
  if (passwordLoginUnits.length === 0) {
    return null;
  }
  return (
    <>
      <h2>{t('divaClient_LoginPasswordText')}</h2>
      {passwordLoginUnits.map(({ loginDescription, id }) => (
        <MenuItem key={id} text={t(loginDescription)}>
          <Link
            to={{
              pathname: href('/login'),
              search: `?loginUnit=${id}&returnTo=${returnTo}`,
            }}
          >
            {t(loginDescription)}
          </Link>
        </MenuItem>
      ))}
    </>
  );
};
