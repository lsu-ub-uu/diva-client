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

import { logInWithWebRedirect } from '@/auth/useWebRedirectLogin';
import { MenuItem } from '@/components/Menu/MenuItem';
import type { LoginDefinition } from '@/data/loginDefinition/loginDefinition.server';
import { useTranslation } from 'react-i18next';

interface WebRedirectLoginOptionsProps {
  webRedirectLoginUnits: LoginDefinition[];
}

export const WebRedirectLoginMenuOptions = ({
  webRedirectLoginUnits,
}: WebRedirectLoginOptionsProps) => {
  const { t } = useTranslation();
  if (webRedirectLoginUnits.length === 0) {
    return null;
  }
  return (
    <>
      <h3>{t('divaClient_LoginWebRedirectText')}</h3>
      {webRedirectLoginUnits.map(({ loginDescription, url }) => (
        <MenuItem key={loginDescription} text={t(loginDescription)}>
          <button onClick={() => logInWithWebRedirect(url!)}>
            {t(loginDescription)}
          </button>
        </MenuItem>
      ))}
    </>
  );
};
