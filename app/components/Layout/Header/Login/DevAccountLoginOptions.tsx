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

import type { ExampleUser } from '@/data/formDefinition/formDefinitionsDep.server';
import { MenuItem } from '@headlessui/react';

interface DevAccountsProps {
  exampleUsers: ExampleUser[];
  onSelect: (account: ExampleUser) => void;
}
export const DevAccountLoginOptions = ({
  exampleUsers,
  onSelect,
}: DevAccountsProps) => {
  const { t } = useTranslation();
  if (!exampleUsers || exampleUsers.length === 0) {
    return null;
  }
  return (
    <>
      <h2>{t('divaClient_LoginDevAccountText')}</h2>
      {exampleUsers.map((exampleUser) => (
        <MenuItem key={exampleUser.loginId}>
          <button onClick={() => onSelect(exampleUser)}>
            {exampleUser.name}
          </button>
        </MenuItem>
      ))}
    </>
  );
};
