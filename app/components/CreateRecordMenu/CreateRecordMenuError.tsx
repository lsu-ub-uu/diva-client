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

import { ErrorAlert } from '@/errorHandling/ErrorAlert';
import { isRouteErrorResponse, useAsyncError } from 'react-router';
import { Menu, MenuButton } from '@headlessui/react';
import { Button } from '@/components/Button/Button';
import { AddCircleIcon } from '@/icons';
import { DropdownMenu } from '@/components/DropdownMenu/DropdownMenu';
import { useTranslation } from 'react-i18next';

interface CreateRecordMenuErrorProps {
  recordTypeTextId: string;
}

export const CreateRecordMenuError = ({
  recordTypeTextId,
}: CreateRecordMenuErrorProps) => {
  const { t } = useTranslation();

  const error = useAsyncError();

  console.error(error);
  if (
    isRouteErrorResponse(error) &&
    (error.status === 401 || error.status === 403)
  ) {
    // User does not have access to creating records
    return null;
  }
  return (
    <Menu>
      <MenuButton as={Button} error size='large'>
        <AddCircleIcon />
        {t('divaClient_createText', {
          type: t(recordTypeTextId).toLowerCase(),
        })}
      </MenuButton>

      <DropdownMenu anchor='bottom end'>
        <ErrorAlert error={error} />
      </DropdownMenu>
    </Menu>
  );
};
