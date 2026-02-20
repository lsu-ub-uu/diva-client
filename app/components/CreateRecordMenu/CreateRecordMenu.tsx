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
import { ActionBar } from '@/routes/record/ActionBar/ActionBar';
import { ActionBarButton } from '@/routes/record/ActionBar/ActionBarButton';
import { FilePlusIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { Menu, useMenu } from '../Menu/Menu';
import { MenuItem } from '../Menu/MenuItem';

interface CreateRecordMenuProps {
  validationTypes: Option[] | null;
  recordTypeTextId: string;
}

export const CreateRecordMenu = ({
  validationTypes,
  recordTypeTextId,
}: CreateRecordMenuProps) => {
  const { t } = useTranslation();
  const { menuProps, triggerProps } = useMenu();
  if (validationTypes === null || validationTypes.length === 0) {
    return null;
  }

  const buttonText = t('divaClient_createText', {
    type: t(recordTypeTextId).toLowerCase(),
  });

  return (
    <ActionBar>
      {validationTypes.length === 1 ? (
        <ActionBarButton
          icon={<FilePlusIcon />}
          as={Link}
          to={`create?validationType=${validationTypes[0].value}`}
        >
          {buttonText}
        </ActionBarButton>
      ) : (
        <>
          <ActionBarButton icon={<FilePlusIcon />} {...triggerProps}>
            {buttonText}
          </ActionBarButton>
          <Menu {...menuProps} title={'Välj valideringstyp'}>
            {validationTypes.map((option) => (
              <MenuItem key={option.value} text={t(option.label)}>
                <Link to={`create?validationType=${option.value}`}>
                  {t(option.label)}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </ActionBar>
  );
};
