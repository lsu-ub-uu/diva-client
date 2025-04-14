/*
 * Copyright 2025 Uppsala University Library
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

import type { Auth } from '@/auth/Auth';
import { getFirstDataAtomicValueWithNameInData } from '@/cora/cora-data/CoraDataUtilsWrappers.server';
import type { AuthWrapper } from '@/cora/cora-data/types.server';
import { invariant } from '@/utils/invariant';
import {
  containsChildWithNameInData,
  getAllRecordLinksWithNameInData,
} from '../cora-data/CoraDataUtils.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';

export const transformCoraAuth = ({ authentication }: AuthWrapper): Auth => {
  const dataGroup = authentication.data;
  const token = getFirstDataAtomicValueWithNameInData(dataGroup, 'token');
  const validUntil = getFirstDataAtomicValueWithNameInData(
    dataGroup,
    'validUntil',
  );
  const renewUntil = getFirstDataAtomicValueWithNameInData(
    dataGroup,
    'renewUntil',
  );
  const userId = getFirstDataAtomicValueWithNameInData(dataGroup, 'userId');
  const loginId = getFirstDataAtomicValueWithNameInData(dataGroup, 'loginId');
  const firstName = getFirstDataAtomicValueWithNameInData(
    dataGroup,
    'firstName',
  );
  const lastName = getFirstDataAtomicValueWithNameInData(dataGroup, 'lastName');
  const permissionUnit = containsChildWithNameInData(
    dataGroup,
    'permissionUnit',
  )
    ? getAllRecordLinksWithNameInData(dataGroup, 'permissionUnit').map(
        (recordLink) => recordLink.id,
      )
    : undefined;

  invariant(authentication.actionLinks, 'Authentication actionLinks missing');
  invariant(
    authentication.actionLinks.renew,
    'Authentication renew actionLink missing',
  );
  invariant(
    authentication.actionLinks.delete,
    'Authentication delete actionLink missing',
  );

  const auth: Auth = {
    data: {
      token,
      validUntil,
      renewUntil,
      userId,
      loginId,
      firstName,
      lastName,
      permissionUnit,
    },
    actionLinks: {
      delete: authentication.actionLinks.delete,
      renew: authentication.actionLinks.renew,
    },
  };

  return removeEmpty(auth);
};
