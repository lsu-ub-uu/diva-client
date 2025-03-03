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

import type { Option } from '@/components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { Button } from '@/components/Button/Button';
import { AddCircleIcon } from '@/icons';
import { Menu, MenuButton, MenuItem } from '@headlessui/react';
import { DropdownMenu } from '@/components/DropdownMenu/DropdownMenu';

interface CreateRecordMenuProps {
  validationTypes: Option[] | null;
  recordTypeTextId: string;
}

export const CreateRecordMenu = ({
  validationTypes,
  recordTypeTextId,
}: CreateRecordMenuProps) => {
  const { t } = useTranslation();
  if (validationTypes === null || validationTypes.length === 0) {
    return null;
  }

  if (validationTypes.length === 1) {
    return (
      <Button
        variant='secondary'
        as={Link}
        to={`create?validationType=${validationTypes[0].value}`}
      >
        <AddCircleIcon />
        {t('divaClient_createText', { type: recordTypeTextId.toLowerCase() })}
      </Button>
    );
  }

  return (
    <Menu>
      <MenuButton as={Button} variant='secondary'>
        <AddCircleIcon />
        {t('divaClient_createText', { type: recordTypeTextId.toLowerCase() })}
      </MenuButton>

      <DropdownMenu anchor='bottom end'>
        {validationTypes.map((option) => (
          <MenuItem key={option.value}>
            <Link to={`create?validationType=${option.value}`}>
              {t(option.label)}
            </Link>
          </MenuItem>
        ))}
      </DropdownMenu>
    </Menu>
  );
};
