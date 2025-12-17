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

import type {
  BFFLoginPassword,
  BFFLoginUnit,
  BFFLoginWebRedirect,
  BFFMetadataGroup,
  BFFMetadataTextVariable,
  BFFPresentationGroup,
  BFFPresentationTextVar,
} from '@/cora/transform/bffTypes.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { listToPool } from '@/utils/structs/listToPool';
import { beforeEach, describe, expect, it } from 'vitest';
import { createLoginDefinition } from '../loginDefinition.server';

describe('loginDefinition', () => {
  let dependencies: Dependencies;

  beforeEach(() => {
    const loginUnitPool = listToPool<BFFLoginUnit>([
      {
        id: 'someLoginUnit',
        login: 'someLoginDiVAwr',
        loginDescription: 'someDiVALoginUnitText',
      },
      {
        id: 'someOtherLoginUnit',
        login: 'someOtherLoginDiVAwr',
        loginDescription: 'someDiVALoginUnitText2',
      },
      {
        id: 'someThirdLoginUnit',
        login: 'uppsalaLDAP',
        loginDescription: 'someDiVALoginUnitText2',
      },
      {
        id: 'somePermissionLoginUnit',
        login: 'somePermissionUnitwr',
        loginDescription: 'somePermissionUnitwrText',
      },
      {
        id: 'somePermissionPasswordLoginUnit',
        login: 'uppsalaLDAP',
        loginDescription: 'somePermissionUnitpasswordText',
      },
    ]);
    const loginPool = listToPool<BFFLoginWebRedirect | BFFLoginPassword>([
      {
        id: 'someLoginDiVAwr',
        loginName: 'DiVA Test university',
        url: 'https://www.diva-portal.org/Shibboleth.sso/Login/liu?target=https://www.diva-portal.org/diva-test/idplogin/login',
        type: 'webRedirect',
      },
      {
        id: 'someOtherLoginDiVAwr',
        loginName: 'DiVA Other Test university',
        url: 'https://www.diva-portal.org/Shibboleth.sso/Login/liu?target=https://www.diva-portal.org/diva-test/idplogin/login',
        type: 'webRedirect',
      },
      {
        id: 'uppsalaLDAP',
        viewDefinition: 'viewDefinitionPasswordGroup',
        viewPresentation: 'viewDefinitionPasswordPGroup',
        description: 'someDescription',
        // validationType: 'someValidationType',
        type: 'password',
      },
      {
        id: 'somePermissionUnitwr',
        loginName: 'DiVA Other Test university',
        url: 'https://www.diva-portal.org/Shibboleth.sso/Login/liu?target=https://www.diva-portal.org/diva-test/idplogin/login',
        type: 'webRedirect',
      },
    ]);
    const metadataPool = listToPool<BFFMetadataGroup | BFFMetadataTextVariable>(
      [
        {
          id: 'viewDefinitionPasswordGroup',
          nameInData: 'password',
          type: 'group',
          textId: 'viewDefinitionPasswordGroupText',
          defTextId: 'viewDefinitionPasswordGroupDefText',
          children: [
            { childId: 'loginIdTextVar', repeatMin: '1', repeatMax: '1' },
            { childId: 'loginPasswordTextVar', repeatMin: '1', repeatMax: '1' },
          ],
        },
        {
          nameInData: 'loginId',
          regEx: '^[0-9A-Za-z:\\-_]{2,50}@[0-9A-Za-z:\\-_.]{2,300}$',
          id: 'loginIdTextVar',
          type: 'textVariable',
          textId: 'loginIdTextVarText',
          defTextId: 'loginIdTextVarDefText',
        },
        {
          nameInData: 'password',
          regEx: '(^[0-9A-Za-z:-_]{2,50}$)',
          id: 'loginPasswordTextVar',
          type: 'textVariable',
          textId: 'loginPasswordTextVarText',
          defTextId: 'loginPasswordTextVarDefText',
        },
      ],
    );
    const presentationPool = listToPool<
      BFFPresentationGroup | BFFPresentationTextVar
    >([
      {
        id: 'viewDefinitionPasswordPGroup',
        presentationOf: 'viewDefinitionPasswordGroup',
        mode: 'input',
        children: [
          {
            refGroups: [
              {
                childId: 'loginIdPVar',
                type: 'presentation',
              },
            ],
            minNumberOfRepeatingToShow: '1',
          },
          {
            refGroups: [
              {
                childId: 'loginPasswordPVar',
                type: 'presentation',
              },
            ],
            minNumberOfRepeatingToShow: '1',
          },
        ],
        type: 'pGroup',
      },
      {
        id: 'loginIdPVar',
        presentationOf: 'loginIdTextVar',
        mode: 'input',
        type: 'pVar',
        inputType: 'input',
      },
      {
        id: 'loginPasswordPVar',
        presentationOf: 'loginPasswordTextVar',
        mode: 'input',
        type: 'pVar',
        inputType: 'input',
      },
    ]);

    dependencies = {
      metadataPool,
      presentationPool,
      loginUnitPool,
      loginPool,
    } as Dependencies;
  });

  const result = [
    {
      id: 'someLoginUnit',
      loginDescription: 'someDiVALoginUnitText',
      url: 'https://www.diva-portal.org/Shibboleth.sso/Login/liu?target=https://www.diva-portal.org/diva-test/idplogin/login',
      type: 'webRedirect',
    },
    {
      id: 'someOtherLoginUnit',
      loginDescription: 'someDiVALoginUnitText2',
      url: 'https://www.diva-portal.org/Shibboleth.sso/Login/liu?target=https://www.diva-portal.org/diva-test/idplogin/login',
      type: 'webRedirect',
    },
    {
      id: 'someThirdLoginUnit',
      loginDescription: 'someDiVALoginUnitText2',
      type: 'password',
      presentation: {
        form: {
          components: [
            {
              gridColSpan: 12,
              inputType: 'input',
              label: 'loginIdTextVarText',
              mode: 'input',
              name: 'loginId',
              presentationId: 'loginIdPVar',
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMax: 1,
                repeatMin: 1,
              },
              showLabel: true,
              tooltip: {
                body: 'loginIdTextVarDefText',
                title: 'loginIdTextVarText',
              },
              type: 'textVariable',
              validation: {
                pattern: '^[0-9A-Za-z:\\-_]{2,50}@[0-9A-Za-z:\\-_.]{2,300}$',
                type: 'regex',
              },
            },
            {
              gridColSpan: 12,
              inputType: 'input',
              label: 'loginPasswordTextVarText',
              mode: 'input',
              name: 'password',
              presentationId: 'loginPasswordPVar',

              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMax: 1,
                repeatMin: 1,
              },
              showLabel: true,
              tooltip: {
                body: 'loginPasswordTextVarDefText',
                title: 'loginPasswordTextVarText',
              },
              type: 'textVariable',
              validation: {
                pattern: '(^[0-9A-Za-z:-_]{2,50}$)',
                type: 'regex',
              },
            },
          ],
          gridColSpan: 12,
          label: 'viewDefinitionPasswordGroupText',
          mode: 'input',
          name: 'password',
          presentationId: 'viewDefinitionPasswordPGroup',
          repeat: {
            repeatMax: 1,
            repeatMin: 1,
          },
          showLabel: true,
          tooltip: {
            body: 'viewDefinitionPasswordGroupDefText',
            title: 'viewDefinitionPasswordGroupText',
          },
          type: 'group',
        },
      },
    },
    {
      id: 'somePermissionLoginUnit',
      loginDescription: 'somePermissionUnitwrText',
      url: 'https://www.diva-portal.org/Shibboleth.sso/Login/liu?target=https://www.diva-portal.org/diva-test/idplogin/login',
      type: 'webRedirect',
    },
    {
      id: 'somePermissionPasswordLoginUnit',
      loginDescription: 'somePermissionUnitpasswordText',
      presentation: {
        form: {
          components: [
            {
              gridColSpan: 12,
              inputType: 'input',
              label: 'loginIdTextVarText',
              mode: 'input',
              name: 'loginId',
              presentationId: 'loginIdPVar',
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMax: 1,
                repeatMin: 1,
              },
              showLabel: true,
              tooltip: {
                body: 'loginIdTextVarDefText',
                title: 'loginIdTextVarText',
              },
              type: 'textVariable',
              validation: {
                pattern: '^[0-9A-Za-z:\\-_]{2,50}@[0-9A-Za-z:\\-_.]{2,300}$',
                type: 'regex',
              },
            },
            {
              gridColSpan: 12,
              inputType: 'input',
              label: 'loginPasswordTextVarText',
              mode: 'input',
              name: 'password',
              presentationId: 'loginPasswordPVar',
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMax: 1,
                repeatMin: 1,
              },
              showLabel: true,
              tooltip: {
                body: 'loginPasswordTextVarDefText',
                title: 'loginPasswordTextVarText',
              },
              type: 'textVariable',
              validation: {
                pattern: '(^[0-9A-Za-z:-_]{2,50}$)',
                type: 'regex',
              },
            },
          ],
          gridColSpan: 12,
          label: 'viewDefinitionPasswordGroupText',
          mode: 'input',
          name: 'password',
          presentationId: 'viewDefinitionPasswordPGroup',
          repeat: {
            repeatMax: 1,
            repeatMin: 1,
          },
          showLabel: true,
          tooltip: {
            body: 'viewDefinitionPasswordGroupDefText',
            title: 'viewDefinitionPasswordGroupText',
          },
          type: 'group',
        },
      },
      type: 'password',
    },
  ];

  it('should generate a object from loginUnits and logins', () => {
    const actual = createLoginDefinition(dependencies, undefined);
    expect(actual).toStrictEqual(result);
  });

  it('webRedirect should contain correct keys', () => {
    const actual = createLoginDefinition(dependencies, undefined);
    expect(actual[1].type).toBe('webRedirect');
    expect(Object.hasOwn(actual[1], 'url')).toBe(true);
    expect(Object.hasOwn(actual[1], 'presentation')).toBe(false);
  });

  it('password should contain correct keys', () => {
    const actual = createLoginDefinition(dependencies, undefined);
    expect(actual[2].type).toBe('password');
    expect(Object.hasOwn(actual[2], 'url')).toBe(false);
    expect(Object.hasOwn(actual[2], 'presentation')).toBe(true);
  });

  it('filters out loginUnits with no matching permissionUnit', () => {
    const loginUnitIds = ['someLoginUnit', 'someOtherLoginUnit'];
    const actual = createLoginDefinition(dependencies, loginUnitIds);
    expect(actual).toStrictEqual([result[0], result[1]]);
  });
});
