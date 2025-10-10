/*
 * Copyright 2023 Uppsala University Library
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

import {
  type BFFOrganisation,
  type BFFLoginUnit,
  type BFFLoginWebRedirect,
  type BFFMetadata,
  type BFFPresentation,
  type BFFRecordType,
  type BFFSearch,
  type BFFText,
  type BFFMember,
  type BFFValidationType,
} from '@/cora/transform/bffTypes.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { listToPool } from '@/utils/structs/listToPool';
import { beforeEach, describe, expect, it } from 'vitest';
import { createTextDefinition } from '../textDefinition.server';

describe('textDefinition', () => {
  let dependencies: Dependencies;

  beforeEach(() => {
    const textPool = listToPool<BFFText>([
      { id: 'someTextId', en: 'someEnText', sv: 'someSvText' },
      { id: 'someText2Id', sv: 'someSv2Text' },
    ]);

    dependencies = {
      textPool,
      validationTypePool: listToPool<BFFValidationType>([]),
      metadataPool: listToPool<BFFMetadata>([]),
      presentationPool: listToPool<BFFPresentation>([]),
      recordTypePool: listToPool<BFFRecordType>([]),
      searchPool: listToPool<BFFSearch>([]),
      loginUnitPool: listToPool<BFFLoginUnit>([]),
      loginPool: listToPool<BFFLoginWebRedirect>([]),
      memberPool: listToPool<BFFMember>([]),
      organisationPool: listToPool<BFFOrganisation>([]),
    };
  });

  it('should generate an object with id value pair for swedish', () => {
    const lang = 'sv';
    const textDefinition = createTextDefinition(dependencies, lang);
    const expectedSv = {
      someTextId: 'someSvText',
      someText2Id: 'someSv2Text',
    };
    expect(textDefinition).toStrictEqual(expectedSv);
  });

  it('should generate an object with id value pair for english', () => {
    const lang = 'en';
    const textDefinition = createTextDefinition(dependencies, lang);
    const expectedEn = { someTextId: 'someEnText' };
    expect(textDefinition).toStrictEqual(expectedEn);
  });

  it('should NOT generate an object with id value pair for a language does not exist', () => {
    const lang = 'jp';
    const textDefinition = createTextDefinition(dependencies, lang);
    expect(textDefinition).toStrictEqual({});
  });
});
