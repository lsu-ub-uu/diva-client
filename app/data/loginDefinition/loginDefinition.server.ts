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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import type {
  BFFLoginPassword,
  BFFLoginUnit,
  BFFLoginWebRedirect,
  BFFMetadataGroup,
  BFFPresentationGroup,
} from '@/cora/transform/bffTypes.server';
import { createLinkedRecordDefinition } from '@/data/formDefinition/createLinkedRecordDefinition.server';

export interface LoginDefinition {
  id: string;
  loginDescription: string;
  type: 'password' | 'webRedirect';
  url?: string;
  presentation?: any;
}

export const createLoginDefinition = (
  dependencies: Dependencies,
  memberLoginUnitIds: string[] | undefined,
): LoginDefinition[] => {
  const { loginUnitPool, loginPool } = dependencies;
  const loginItemDefinitions: LoginDefinition[] = [];

  const loginUnitEntries = Array.from(loginUnitPool.values());

  loginUnitEntries.forEach((login: BFFLoginUnit) => {
    if (memberLoginUnitIds && !memberLoginUnitIds.includes(login.id)) {
      return;
    }
    let item: LoginDefinition;
    const temp = loginPool.get(login.login);
    const { type } = temp;
    item = { id: login.id, loginDescription: login.loginDescription, type };

    if (item.type === 'webRedirect') {
      const { url } = temp as BFFLoginWebRedirect;
      item = {
        ...item,
        url,
      };
    }
    if (item.type === 'password') {
      const { viewDefinition, viewPresentation } = temp as BFFLoginPassword;
      item = {
        ...item,
        presentation: createLinkedRecordDefinition(
          dependencies,
          dependencies.metadataPool.get(viewDefinition) as BFFMetadataGroup,
          dependencies.presentationPool.get(
            viewPresentation,
          ) as BFFPresentationGroup,
        ),
      };
    }

    loginItemDefinitions.push(item);
  });

  return loginItemDefinitions;
};
