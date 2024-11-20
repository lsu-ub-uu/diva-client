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

import { deleteAuthTokenFromCora } from '../../../../bff/src/main/webapp/cora/auth';
import { Auth } from '@/types/Auth';

export const deleteSession = async (auth: Auth) => {
  const { actionLinks } = auth;

  return deleteAuthTokenFromCora(actionLinks!, auth.data.token);
};
