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

import type { Auth } from '@/types/Auth';
import axios from 'axios';
import { coraLoginUrl } from '@/cora/helper.server';
import type { CoraRecord } from '@/cora/cora-data/CoraData.server';
import { getFirstDataAtomicValueWithNameInData } from '@/cora/cora-data/CoraDataUtilsWrappers.server';
import { invariant } from '@remix-run/router/history';

export async function requestAuthTokenOnLogin(
  user: string,
  authToken: string | undefined,
  loginType: 'apptoken' | 'password',
): Promise<Auth> {
  const url = coraLoginUrl(`/${loginType}`);

  const headers = {
    'Content-Type': 'application/vnd.uub.login',
  };
  const body = `${user}\n${authToken}`;
  try {
    const response = await axios.post(url, body, { headers });
    return extractDataFromResult(response.data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const extractDataFromResult = (record: CoraRecord): Auth => {
  const dataGroup = record.data;
  const token = getFirstDataAtomicValueWithNameInData(dataGroup, 'token');
  const validForNoSeconds = getFirstDataAtomicValueWithNameInData(
    dataGroup,
    'validForNoSeconds',
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
      validForNoSeconds,
      userId,
      loginId,
      firstName,
      lastName,
    },
    actionLinks: record.actionLinks,
  };
};
