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

import type { CoraRecord } from '@/.server/cora/cora-data/CoraData';
import type { Auth } from '@/auth/Auth';
import { getFirstDataAtomicValueWithNameInData } from '@/.server/cora/cora-data/CoraDataUtilsWrappers';
import { invariant } from '@remix-run/router/history';

export const transformCoraAuth = (record: CoraRecord): Auth => {
  const dataGroup = record.data;
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

  invariant(record.actionLinks);

  return {
    data: {
      token,
      validUntil,
      renewUntil,
      userId,
      loginId,
      firstName,
      lastName,
    },
    actionLinks: record.actionLinks,
  };
};
