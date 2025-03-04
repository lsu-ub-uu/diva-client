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

import { Link, useLoaderData } from 'react-router';
import { useTranslation } from 'react-i18next';
import type { loader } from '@/root';
import { MenuItem } from '@headlessui/react';

interface PasswordLoginOptionsProps {
  returnTo: string;
}

export const PasswordLoginOptions = ({
  returnTo,
}: PasswordLoginOptionsProps) => {
  const { t } = useTranslation();
  const { loginUnits } = useLoaderData<typeof loader>();

  return (
    <>
      <h6>{t('divaClient_LoginPasswordText')}</h6>
      {loginUnits
        .filter(({ type }) => type === 'password')
        .map(({ loginDescription, presentation }) => (
          <MenuItem key='tempLoginUnitPassword'>
            <Link
              to={`/login?presentation=${encodeURIComponent(JSON.stringify(presentation))}&returnTo=${returnTo}`}
            >
              {t(loginDescription)}
            </Link>
          </MenuItem>
        ))}
    </>
  );
};
