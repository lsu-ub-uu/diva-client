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

import recordManuscript from '@/__mocks__/bff/coraRecordManuscript.json';
import recordManuscriptWithoutCreatedAndUpdates from '@/__mocks__/bff/coraRecordManuscriptPublicWithoutSensitiveData.json';
import recordManuscriptWithSameNameInDataGroup from '@/__mocks__/bff/coraRecordManuscriptWithSameNameInData.json';
import recordManuscriptWithSameNameInDataVar from '@/__mocks__/bff/coraRecordManuscriptWithNamePart.json';
import recordManuscriptWithSameNameInDataVarWithoutAllVars from '@/__mocks__/bff/coraRecordManuscriptWithNamePartWithoutAllVars.json';
import coraRecordManuscriptWithSameNameInDataWithOneGroup from '@/__mocks__/bff/coraRecordManuscriptWithSameNameInDataWithOneGroup.json';

import {
  transformDataGroup,
  transformRecord,
  transformRecordData,
} from '../transformRecord.server';
import type {
  DataGroup,
  RecordWrapper,
} from '@/cora/cora-data/types.server';
import type { Lookup } from '@/utils/structs/lookup';
import type {
  BFFGuiElement,
  BFFLoginUnit,
  BFFLoginWebRedirect,
  BFFMetadata,
  BFFPresentation,
  BFFPresentationBase,
  BFFPresentationGroup,
  BFFPresentationSurroundingContainer,
  BFFRecordType,
  BFFSearch,
  BFFText,
  BFFValidationType,
} from '../bffTypes.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { listToPool } from '@/utils/structs/listToPool';
import {
  createdByLink,
  dataDividerLink,
  epoCollectionItem,
  faoCollectionItem,
  idTextVar,
  kalCollectionItem,
  languageCollectionVar,
  nationalSubjectCategoryLink,
  nationSubjectCategoryValidationTypeData,
  newLangCollVariable,
  newLangItemCollection,
  newLangItemCollectionItemEng,
  newLangItemCollectionItemSwe,
  newNationSubjectCategoryMetadataSubjectEngLangCollVariable,
  pSomeMainTitleTitleInfoTextVariable,
  pSomeNewMetadataGroupRepeatingTitleInfoNameInDataGroup,
  pSomeNewMetadataGroupTitleInfoAlternativePGroup,
  pSomeNewMetadataGroupTitleInfoPGroup,
  recordInfoMetadata,
  recordTypeLink,
  someAbstractTextVariable,
  someAlternativeTitleMetadataChildGroup,
  someMainTitleTextVariable,
  someMainTitleTitleInfoATextVariable,
  someManuscriptEditMetadataGroup,
  someManuscriptValidationTypeData,
  someNamePartTextVariable,
  someNamePartWithAttributesTextVariable,
  someNewMetadataGroupRepeatingNamePartGroup,
  someNewMetadataGroupRepeatingNamePartWithAttributesGroup,
  someNewMetadataGroupRepeatingTitleInfoNameInDataGroup,
  someNewMetadataGroupTitleInfoAlternativeGroup,
  someNewMetadataGroupTitleInfoGroup,
  someOtherNamePartTextVariable,
  someOtherNamePartWithAttributesTextVariable,
  someSubTitleTextVariable,
  sometitleMetadataChildGroup,
  someValidationTypeForRepeatingTitleInfoId,
  someValidationTypeNamePartId,
  someValidationTypeNamePartWithAttributesId,
  tsCreatedTextVar,
  tsUpdatedTextVar,
  typeCollectionItemAlternative,
  typeCollVariable,
  typeItemCollection,
  updatedByLink,
  updatedGroup,
  validationTypeLink,
} from '@/__mocks__/bff/form/bffMock';
import type { FormMetaData } from '@/data/formDefinition/formDefinition.server';
import { describe } from 'vitest';

describe('transformRecord', () => {
  let validationTypePool: Lookup<string, BFFValidationType>;
  let metadataPool: Lookup<string, BFFMetadata>;
  let presentationPool: Lookup<
    string,
    | BFFPresentationBase
    | BFFPresentationGroup
    | BFFPresentationSurroundingContainer
    | BFFGuiElement
  >;
  let dependencies: Dependencies;

  beforeEach(() => {
    validationTypePool = listToPool<BFFValidationType>([
      someManuscriptValidationTypeData,
      nationSubjectCategoryValidationTypeData,
      someValidationTypeForRepeatingTitleInfoId,
      someValidationTypeNamePartId,
      someValidationTypeNamePartWithAttributesId,
    ]);
    metadataPool = listToPool<BFFMetadata>([
      someManuscriptEditMetadataGroup,
      someAlternativeTitleMetadataChildGroup,
      someMainTitleTextVariable,
      someSubTitleTextVariable,
      someNewMetadataGroupRepeatingTitleInfoNameInDataGroup,
      someNewMetadataGroupTitleInfoGroup,
      someNewMetadataGroupTitleInfoAlternativeGroup,
      newNationSubjectCategoryMetadataSubjectEngLangCollVariable,
      someMainTitleTitleInfoATextVariable,
      typeCollVariable,
      typeItemCollection,
      typeCollectionItemAlternative,
      newLangCollVariable,
      newLangItemCollection,
      newLangItemCollectionItemEng,
      newLangItemCollectionItemSwe,
      someNewMetadataGroupRepeatingNamePartGroup,
      someNamePartTextVariable,
      someOtherNamePartTextVariable,
      someNewMetadataGroupRepeatingNamePartWithAttributesGroup,
      someNamePartWithAttributesTextVariable,
      someOtherNamePartWithAttributesTextVariable,
      recordInfoMetadata,
      someAbstractTextVariable,
      createdByLink,
      dataDividerLink,
      idTextVar,
      tsCreatedTextVar,
      recordTypeLink,
      updatedGroup,
      updatedByLink,
      tsUpdatedTextVar,
      validationTypeLink,
      nationalSubjectCategoryLink,
      faoCollectionItem,
      epoCollectionItem,
      kalCollectionItem,
      languageCollectionVar,
      sometitleMetadataChildGroup,
    ]);
    presentationPool = listToPool<BFFPresentation>([
      pSomeNewMetadataGroupRepeatingTitleInfoNameInDataGroup,
      pSomeNewMetadataGroupTitleInfoPGroup,
      pSomeNewMetadataGroupTitleInfoAlternativePGroup,
      pSomeMainTitleTitleInfoTextVariable,
    ]);

    dependencies = {
      textPool: listToPool<BFFText>([]),
      validationTypePool,
      metadataPool,
      presentationPool,
      recordTypePool: listToPool<BFFRecordType>([]),
      searchPool: listToPool<BFFSearch>([]),
      loginUnitPool: listToPool<BFFLoginUnit>([]),
      loginPool: listToPool<BFFLoginWebRedirect>([]),
    };
  });
  describe('transformRecord', () => {
    it('should return a record', () => {
      const transformData = transformRecord(
        dependencies,
        recordManuscript as RecordWrapper,
      );
      const expected = {
        id: 'divaOutput:519333261463755',
        recordType: 'divaOutput',
        validationType: 'manuscript',
        createdAt: '2023-10-11T09:24:30.511487Z',
        createdBy: 'coraUser:490742519075086',
        userRights: ['read', 'update', 'index', 'delete'],
        updated: [
          {
            updateAt: '2023-10-11T09:24:30.511487Z',
            updatedBy: 'coraUser:490742519075086',
          },
          {
            updateAt: '2023-10-18T09:09:13.554736Z',
            updatedBy: '161616',
          },
          {
            updateAt: '2023-10-26T12:33:22.260532Z',
            updatedBy: '161616',
          },
          {
            updateAt: '2023-10-26T12:35:28.748398Z',
            updatedBy: '161616',
          },
          {
            updateAt: '2023-10-26T12:35:40.545698Z',
            updatedBy: '161616',
          },
          {
            updateAt: '2023-10-26T12:35:52.293623Z',
            updatedBy: '161616',
          },
        ],
        data: {
          divaOutput: {
            recordInfo: {
              createdBy: {
                value: 'coraUser:490742519075086',
              },
              dataDivider: {
                value: 'diva',
              },
              id: {
                value: 'divaOutput:519333261463755',
              },
              tsCreated: {
                value: '2023-10-11T09:24:30.511487Z',
              },
              type: {
                value: 'divaOutput',
              },
              updated: [
                {
                  tsUpdated: {
                    value: '2023-10-11T09:24:30.511487Z',
                  },
                  updatedBy: {
                    value: 'coraUser:490742519075086',
                  },
                },
                {
                  tsUpdated: {
                    value: '2023-10-18T09:09:13.554736Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
                {
                  tsUpdated: {
                    value: '2023-10-26T12:33:22.260532Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
                {
                  tsUpdated: {
                    value: '2023-10-26T12:35:28.748398Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
                {
                  tsUpdated: {
                    value: '2023-10-26T12:35:40.545698Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
                {
                  tsUpdated: {
                    value: '2023-10-26T12:35:52.293623Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
              ],
              validationType: {
                value: 'manuscript',
              },
            },
            title: {
              mainTitle: {
                value: 'aaaaaa',
              },
              _language: 'kal',
            },
            alternativeTitle: [
              {
                mainTitle: {
                  value: 'bbbbb',
                },
                subTitle: [
                  {
                    value: 'subTitle1',
                  },
                ],
                _language: 'epo',
                _titleType: 'alternativeTitle',
              },
            ],
            nationalSubjectCategory: [
              {
                value: 'nationalSubjectCategory:6325370460697648',
              },
            ],
            abstract: [
              {
                value: 'hej!',
                _language: 'fao',
              },
            ],
          },
        },
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a record with repeating nameInDatas for groups having one with attributes', () => {
      const transformData = transformRecord(
        dependencies,
        recordManuscriptWithSameNameInDataGroup as RecordWrapper,
      );
      const expected = {
        id: 'divaOutputSwepub:2087392797647370',
        recordType: 'divaOutputSwepub',
        validationType: 'divaOutputSwepub',
        createdAt: '2024-09-13T11:49:37.288927Z',
        createdBy: '161616',
        userRights: ['read', 'update', 'index', 'delete'],
        updated: [
          {
            updateAt: '2024-09-13T11:49:37.288927Z',
            updatedBy: '161616',
          },
          {
            updateAt: '2024-09-13T11:49:54.085586Z',
            updatedBy: '161616',
          },
          {
            updateAt: '2024-09-16T08:00:42.892622Z',
            updatedBy: '161616',
          },
        ],
        data: {
          output: {
            recordInfo: {
              createdBy: {
                value: '161616',
              },
              dataDivider: {
                value: 'divaData',
              },
              id: {
                value: 'divaOutputSwepub:2087392797647370',
              },
              tsCreated: {
                value: '2024-09-13T11:49:37.288927Z',
              },
              type: {
                value: 'divaOutputSwepub',
              },
              updated: [
                {
                  tsUpdated: {
                    value: '2024-09-13T11:49:37.288927Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
                {
                  tsUpdated: {
                    value: '2024-09-13T11:49:54.085586Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
                {
                  tsUpdated: {
                    value: '2024-09-16T08:00:42.892622Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
              ],
              validationType: {
                value: 'divaOutputSwepub',
              },
            },
            titleInfo: {
              _lang: 'ady',
              title: {
                value: 'EN utmärkt titel',
              },
            },
            titleInfo_type_alternative: [
              {
                _lang: 'amh',
                _type: 'alternative',
                title: {
                  value: 'EN utmärkt alternativ titel',
                },
              },
            ],
          },
        },
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a record with repeating nameInDatas for groups having one with attributes and one data', () => {
      const transformData = transformRecord(
        dependencies,
        coraRecordManuscriptWithSameNameInDataWithOneGroup as RecordWrapper,
      );
      const expected = {
        id: 'divaOutputSwepub:2087392797647370',
        recordType: 'divaOutputSwepub',
        validationType: 'divaOutputSwepub',
        createdAt: '2024-09-13T11:49:37.288927Z',
        createdBy: '161616',
        userRights: ['read', 'update', 'index', 'delete'],
        updated: [
          {
            updateAt: '2024-09-13T11:49:37.288927Z',
            updatedBy: '161616',
          },
          {
            updateAt: '2024-09-13T11:49:54.085586Z',
            updatedBy: '161616',
          },
          {
            updateAt: '2024-09-16T08:00:42.892622Z',
            updatedBy: '161616',
          },
        ],
        data: {
          output: {
            recordInfo: {
              createdBy: {
                value: '161616',
              },
              dataDivider: {
                value: 'divaData',
              },
              id: {
                value: 'divaOutputSwepub:2087392797647370',
              },
              tsCreated: {
                value: '2024-09-13T11:49:37.288927Z',
              },
              type: {
                value: 'divaOutputSwepub',
              },
              updated: [
                {
                  tsUpdated: {
                    value: '2024-09-13T11:49:37.288927Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
                {
                  tsUpdated: {
                    value: '2024-09-13T11:49:54.085586Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
                {
                  tsUpdated: {
                    value: '2024-09-16T08:00:42.892622Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
              ],
              validationType: {
                value: 'divaOutputSwepub',
              },
            },
            titleInfo: {
              _lang: 'ady',
              title: {
                value: 'EN utmärkt titel',
              },
            },
          },
        },
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a record with repeating nameInDatas for textVar having one with attributes', () => {
      const transformData = transformRecord(
        dependencies,
        recordManuscriptWithSameNameInDataVar as RecordWrapper,
      );
      const expected = {
        id: 'divaOutputSwepub:2087392797647370',
        recordType: 'namePartValidationTypeId',
        validationType: 'namePartValidationTypeId',
        createdAt: '2024-09-13T11:49:37.288927Z',
        createdBy: '161616',
        userRights: ['read', 'update', 'index', 'delete'],
        updated: [
          {
            updateAt: '2024-09-13T11:49:37.288927Z',
            updatedBy: '161616',
          },
          {
            updateAt: '2024-09-13T11:49:54.085586Z',
            updatedBy: '161616',
          },
          {
            updateAt: '2024-09-16T08:00:42.892622Z',
            updatedBy: '161616',
          },
        ],
        data: {
          name: {
            recordInfo: {
              createdBy: {
                value: '161616',
              },
              dataDivider: {
                value: 'divaData',
              },
              id: {
                value: 'divaOutputSwepub:2087392797647370',
              },
              tsCreated: {
                value: '2024-09-13T11:49:37.288927Z',
              },
              type: {
                value: 'namePartValidationTypeId',
              },
              updated: [
                {
                  tsUpdated: {
                    value: '2024-09-13T11:49:37.288927Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
                {
                  tsUpdated: {
                    value: '2024-09-13T11:49:54.085586Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
                {
                  tsUpdated: {
                    value: '2024-09-16T08:00:42.892622Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
              ],
              validationType: {
                value: 'namePartValidationTypeId',
              },
            },
            namePart: {
              value: 'value1',
            },
            namePart_language_eng: {
              value: 'value2',
              _language: 'eng',
            },
          },
        },
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a record with repeating nameInDatas for textVar having one with attributes without all vars', () => {
      const transformData = transformRecord(
        dependencies,
        recordManuscriptWithSameNameInDataVarWithoutAllVars as RecordWrapper,
      );
      const expected = {
        id: 'divaOutputSwepub:2087392797647370',
        recordType: 'namePartPartWithAttributesValidationTypeId',
        validationType: 'namePartPartWithAttributesValidationTypeId',
        createdAt: '2024-09-13T11:49:37.288927Z',
        createdBy: '161616',
        userRights: ['read', 'update', 'index', 'delete'],
        updated: [
          {
            updateAt: '2024-09-13T11:49:37.288927Z',
            updatedBy: '161616',
          },
          {
            updateAt: '2024-09-13T11:49:54.085586Z',
            updatedBy: '161616',
          },
          {
            updateAt: '2024-09-16T08:00:42.892622Z',
            updatedBy: '161616',
          },
        ],
        data: {
          name: {
            recordInfo: {
              createdBy: {
                value: '161616',
              },
              dataDivider: {
                value: 'divaData',
              },
              id: {
                value: 'divaOutputSwepub:2087392797647370',
              },
              tsCreated: {
                value: '2024-09-13T11:49:37.288927Z',
              },
              type: {
                value: 'namePartPartWithAttributesValidationTypeId',
              },
              updated: [
                {
                  tsUpdated: {
                    value: '2024-09-13T11:49:37.288927Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
                {
                  tsUpdated: {
                    value: '2024-09-13T11:49:54.085586Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
                {
                  tsUpdated: {
                    value: '2024-09-16T08:00:42.892622Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
              ],
              validationType: {
                value: 'namePartPartWithAttributesValidationTypeId',
              },
            },
            namePart_language_eng: [
              {
                value: 'value2',
                _language: 'eng',
              },
            ],
          },
        },
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should be able to return a record without created and updated data', () => {
      const transformData = transformRecord(
        dependencies,
        recordManuscriptWithoutCreatedAndUpdates as RecordWrapper,
      );
      const expected = {
        id: 'divaOutput:519333261463755',
        recordType: 'namePartPartWithAttributesValidationTypeId',
        validationType: 'manuscript',
        userRights: ['read', 'update', 'index', 'delete'],
        updated: [],
        data: {
          divaOutput: {
            recordInfo: {
              dataDivider: {
                value: 'diva',
              },
              id: {
                value: 'divaOutput:519333261463755',
              },

              type: {
                value: 'namePartPartWithAttributesValidationTypeId',
              },
              validationType: {
                value: 'manuscript',
              },
            },
            title: {
              mainTitle: {
                value: 'aaaaaa',
              },
              _language: 'kal',
            },
            alternativeTitle: [
              {
                mainTitle: {
                  value: 'bbbbb',
                },
                subTitle: [
                  {
                    value: 'subTitle1',
                  },
                ],
                _language: 'epo',
                _titleType: 'alternativeTitle',
              },
            ],
            nationalSubjectCategory: [
              {
                value: 'nationalSubjectCategory:6325370460697648',
              },
            ],
            abstract: [
              {
                value: 'hej!',
                _language: 'fao',
              },
            ],
          },
        },
      };
      expect(transformData).toStrictEqual(expected);
    });
  });

  describe('transformRecordData', () => {
    it('should return a root group with a dataAtomic child', () => {
      const data = {
        name: 'divaOutput',
        children: [
          {
            name: 'title',
            value: 'testTitleVal',
          },
        ],
      };
      const metadata: FormMetaData = {
        type: 'group',
        name: 'divaOutput',
        repeat: { repeatMin: 1, repeatMax: 1 },
        children: [
          {
            type: 'textVariable',
            repeat: { repeatMin: 1, repeatMax: 1 },
            name: 'title',
          },
        ],
      };

      const transformData = transformRecordData(data, metadata);

      const expected = {
        divaOutput: {
          title: {
            value: 'testTitleVal',
          },
        },
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a root group with a childGroup with atomic children', () => {
      const data = {
        name: 'divaOutput',
        children: [
          {
            name: 'childGroup',
            children: [
              {
                name: 'title',
                value: 'testTitleVal',
              },
            ],
          },
        ],
      };

      const metadata: FormMetaData = {
        type: 'group',
        name: 'divaOutput',
        repeat: { repeatMin: 1, repeatMax: 1 },
        children: [
          {
            type: 'group',
            name: 'childGroup',
            repeat: { repeatMin: 1, repeatMax: 1 },
            children: [
              {
                type: 'textVariable',
                repeat: { repeatMin: 1, repeatMax: 1 },
                name: 'title',
              },
            ],
          },
        ],
      };

      const transformData = transformRecordData(data, metadata);
      const expected = {
        divaOutput: {
          childGroup: {
            title: {
              value: 'testTitleVal',
            },
          },
        },
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a root group with two dataAtomic children', () => {
      const data = {
        name: 'divaOutput',
        children: [
          {
            name: 'title',
            value: 'testTitleVal',
          },
          {
            name: 'age',
            value: '12',
          },
        ],
      };

      const metadata: FormMetaData = {
        type: 'group',
        name: 'divaOutput',
        repeat: { repeatMin: 1, repeatMax: 1 },
        children: [
          {
            type: 'textVariable',
            name: 'title',
            repeat: { repeatMin: 1, repeatMax: 1 },
          },
          {
            type: 'textVariable',
            name: 'age',
            repeat: { repeatMin: 1, repeatMax: 1 },
          },
        ],
      };

      const transformData = transformRecordData(data, metadata);

      const expected = {
        divaOutput: {
          title: {
            value: 'testTitleVal',
          },
          age: {
            value: '12',
          },
        },
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a root group with repeating children', () => {
      const data = {
        name: 'divaOutput',
        children: [
          {
            name: 'exampleNumberVar',
            value: '12.99',
            repeatId: '0',
          },
          {
            name: 'exampleNumberVar',
            value: '1.34',
            repeatId: '1',
          },
          {
            name: 'exampleNumberVarTwo',
            value: '99.00',
          },
        ],
      };
      const metadata: FormMetaData = {
        type: 'group',
        name: 'divaOutput',
        repeat: { repeatMin: 1, repeatMax: 1 },
        children: [
          {
            type: 'textVariable',
            name: 'exampleNumberVar',
            repeat: { repeatMin: 0, repeatMax: Number.MAX_VALUE },
          },
          {
            type: 'textVariable',
            name: 'exampleNumberVarTwo',
            repeat: { repeatMin: 1, repeatMax: 1 },
          },
        ],
      };

      const transformData = transformRecordData(data, metadata);

      const expected = {
        divaOutput: {
          exampleNumberVar: [
            {
              value: '12.99',
            },
            {
              value: '1.34',
            },
          ],
          exampleNumberVarTwo: {
            value: '99.00',
          },
        },
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a root group with repeating children with attributes', () => {
      const data = {
        name: 'divaOutput',
        children: [
          {
            name: 'exampleNumberVar',
            value: '12.99',
            repeatId: '0',
            attributes: {
              language: 'kal',
            },
          },
          {
            name: 'exampleNumberVar',
            value: '1.34',
            repeatId: '1',
            attributes: {
              language: 'eng',
            },
          },
        ],
      };
      const metadata: FormMetaData = {
        type: 'group',
        name: 'divaOutput',
        repeat: { repeatMin: 1, repeatMax: 1 },
        children: [
          {
            type: 'textVariable',
            name: 'exampleNumberVar',
            repeat: { repeatMin: 0, repeatMax: Number.MAX_VALUE },
          },
        ],
      };

      const transformData = transformRecordData(data, metadata);

      const expected = {
        divaOutput: {
          exampleNumberVar: [
            {
              value: '12.99',
              _language: 'kal',
            },
            {
              value: '1.34',
              _language: 'eng',
            },
          ],
        },
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a root group with two different repeating children', () => {
      const data = {
        name: 'divaOutput',
        children: [
          {
            name: 'exampleNumberVar',
            value: '12.99',
            repeatId: '0',
          },
          {
            name: 'exampleNumberVar',
            value: '1.34',
            repeatId: '1',
          },
          {
            name: 'exampleNumberVarTwo',
            value: '99.00',
            repeatId: '0',
          },
          {
            name: 'exampleNumberVarTwo',
            value: '101.00',
            repeatId: '1',
          },
        ],
      };
      const metadata: FormMetaData = {
        type: 'group',
        name: 'divaOutput',
        repeat: { repeatMin: 1, repeatMax: 1 },
        children: [
          {
            type: 'textVariable',
            name: 'exampleNumberVar',
            repeat: { repeatMin: 0, repeatMax: Number.MAX_VALUE },
          },
          {
            type: 'textVariable',
            name: 'exampleNumberVarTwo',
            repeat: { repeatMin: 0, repeatMax: Number.MAX_VALUE },
          },
        ],
      };

      const transformData = transformRecordData(data, metadata);

      const expected = {
        divaOutput: {
          exampleNumberVar: [
            {
              value: '12.99',
            },
            {
              value: '1.34',
            },
          ],
          exampleNumberVarTwo: [
            {
              value: '99.00',
            },
            {
              value: '101.00',
            },
          ],
        },
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a root group with a repeating childGroup with atomic children', () => {
      const data = {
        name: 'divaOutput',
        children: [
          {
            name: 'childGroup',
            repeatId: '0',
            children: [
              {
                name: 'title',
                value: 'testTitleVal1',
              },
            ],
          },
          {
            name: 'childGroup',
            repeatId: '1',
            children: [
              {
                name: 'title',
                value: 'testTitleVal2',
              },
            ],
          },
        ],
      };
      const metadata: FormMetaData = {
        type: 'group',
        name: 'divaOutput',
        repeat: { repeatMin: 1, repeatMax: 1 },
        children: [
          {
            type: 'group',
            name: 'childGroup',
            repeat: { repeatMin: 1, repeatMax: Number.MAX_VALUE },
            children: [
              {
                type: 'textVariable',
                name: 'title',
                repeat: { repeatMin: 1, repeatMax: 1 },
              },
            ],
          },
        ],
      };

      const transformData = transformRecordData(data, metadata);
      const expected = {
        divaOutput: {
          childGroup: [
            {
              title: {
                value: 'testTitleVal1',
              },
            },
            {
              title: {
                value: 'testTitleVal2',
              },
            },
          ],
        },
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a root group with a non-repeating RecordLink', () => {
      const data = {
        name: 'divaOutput',
        children: [
          {
            name: 'nationalSubjectCategory',
            children: [
              {
                name: 'linkedRecordType',
                value: 'nationalSubjectCategory',
              },
              {
                name: 'linkedRecordId',
                value: 'nationalSubjectCategory:6325370460697648',
              },
            ],
          },
        ],
      };
      const metadata: FormMetaData = {
        type: 'group',
        name: 'divaOutput',
        repeat: { repeatMin: 1, repeatMax: 1 },
        children: [
          {
            type: 'recordLink',
            name: 'nationalSubjectCategory',
            repeat: { repeatMin: 1, repeatMax: 1 },
          },
        ],
      };

      const transformData = transformRecordData(data, metadata);
      const expected = {
        divaOutput: {
          nationalSubjectCategory: {
            value: 'nationalSubjectCategory:6325370460697648',
          },
        },
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a root group with a repeating RecordLinks having attributes', () => {
      const data = {
        name: 'divaOutput',
        children: [
          {
            repeatId: '0',
            attributes: {
              language: 'eng',
            },
            name: 'nationalSubjectCategory',
            children: [
              {
                name: 'linkedRecordType',
                value: 'nationalSubjectCategory',
              },
              {
                name: 'linkedRecordId',
                value: 'nationalSubjectCategory:6325370460697648',
              },
            ],
          },
          {
            repeatId: '1',
            attributes: {
              language: 'swe',
            },
            name: 'nationalSubjectCategory',
            children: [
              {
                name: 'linkedRecordType',
                value: 'nationalSubjectCategory',
              },
              {
                name: 'linkedRecordId',
                value: 'nationalSubjectCategory:6325370460697641',
              },
            ],
          },
        ],
      };
      const metadata: FormMetaData = {
        type: 'group',
        name: 'divaOutput',
        repeat: { repeatMin: 1, repeatMax: 1 },
        children: [
          {
            type: 'recordLink',
            name: 'nationalSubjectCategory',
            repeat: { repeatMin: 1, repeatMax: Number.MAX_VALUE },
          },
        ],
      };

      const transformData = transformRecordData(data, metadata);
      const expected = {
        divaOutput: {
          nationalSubjectCategory: [
            {
              value: 'nationalSubjectCategory:6325370460697648',
              _language: 'eng',
            },
            {
              value: 'nationalSubjectCategory:6325370460697641',
              _language: 'swe',
            },
          ],
        },
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a root group with multiple variables with same nameInData having attributes', () => {
      const data = {
        name: 'divaOutput',
        children: [
          {
            attributes: {
              language: 'eng',
            },
            name: 'subject',
            value: 'value1',
          },
          {
            attributes: {
              language: 'swe',
            },
            name: 'subject',
            value: 'value2',
          },
        ],
      };
      const metadata: FormMetaData = {
        type: 'group',
        name: 'divaOutput',
        repeat: { repeatMin: 1, repeatMax: 1 },
        children: [
          {
            type: 'textVariable',
            name: 'subject',
            repeat: { repeatMin: 1, repeatMax: 1 },
            attributes: {
              language: 'swe',
            },
          },
          {
            type: 'textVariable',
            name: 'subject',
            repeat: { repeatMin: 1, repeatMax: 1 },
            attributes: {
              language: 'eng',
            },
          },
        ],
      };

      const transformData = transformRecordData(data, metadata);
      const expected = {
        divaOutput: {
          subject_language_eng: {
            value: 'value1',
            _language: 'eng',
          },
          subject_language_swe: {
            value: 'value2',
            _language: 'swe',
          },
        },
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a root group with multiple variables with same nameInData and one having attributes', () => {
      const data = {
        name: 'divaOutput',
        children: [
          {
            name: 'subject',
            value: 'value1',
          },
          {
            attributes: {
              language: 'swe',
            },
            name: 'subject',
            value: 'value2',
          },
        ],
      };
      const metadata: FormMetaData = {
        type: 'group',
        name: 'divaOutput',
        repeat: { repeatMin: 1, repeatMax: 1 },
        children: [
          {
            type: 'textVariable',
            name: 'subject',
            repeat: { repeatMin: 1, repeatMax: 1 },
            attributes: {
              language: 'swe',
            },
          },
          {
            type: 'textVariable',
            name: 'subject',
            repeat: { repeatMin: 1, repeatMax: 1 },
          },
        ],
      };

      const transformData = transformRecordData(data, metadata);
      const expected = {
        divaOutput: {
          subject: {
            value: 'value1',
          },
          subject_language_swe: {
            value: 'value2',
            _language: 'swe',
          },
        },
      };
      expect(transformData).toStrictEqual(expected);
    });

    it(`should return a root group with multiple variables with same 
    nameInData and one having attributes with formPathLookup`, () => {
      const data: DataGroup = {
        children: [
          {
            children: [
              {
                name: 'title',
                value: 'EN utmärkt titel',
              },
            ],
            name: 'titleInfo',
            attributes: {
              lang: 'ady',
            },
          },
          {
            repeatId: '7',
            children: [
              {
                name: 'title',
                value: 'EN utmärkt alternativ titel',
              },
            ],
            name: 'titleInfo',
            attributes: {
              lang: 'amh',
              type: 'alternative',
            },
          },
        ],
        name: 'output',
      };
      const metadata: FormMetaData = {
        type: 'group',
        name: 'output',
        repeat: { repeatMin: 1, repeatMax: 1 },
        children: [
          {
            type: 'group',
            name: 'titleInfo',
            repeat: { repeatMin: 1, repeatMax: 1 },
            children: [
              {
                type: 'textVariable',
                name: 'title',
                repeat: { repeatMin: 1, repeatMax: 1 },
              },
            ],
          },
          {
            type: 'group',
            name: 'titleInfo',
            attributes: { type: 'alternative' },
            repeat: { repeatMin: 0, repeatMax: Number.MAX_VALUE },
            children: [
              {
                type: 'textVariable',
                name: 'title',
                repeat: { repeatMin: 1, repeatMax: 1 },
              },
            ],
          },
        ],
      };

      const transformData = transformRecordData(data, metadata);
      const expected = {
        output: {
          titleInfo: {
            _lang: 'ady',
            title: {
              value: 'EN utmärkt titel',
            },
          },
          titleInfo_type_alternative: [
            {
              _lang: 'amh',
              _type: 'alternative',
              title: {
                value: 'EN utmärkt alternativ titel',
              },
            },
          ],
        },
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a root group with multiple colVar with same nameInData having attributes', () => {
      const data = {
        name: 'divaOutput',
        children: [
          {
            attributes: {
              language: 'eng',
            },
            name: 'domain',
            value: 'hb',
          },
          {
            attributes: {
              language: 'swe',
            },
            name: 'domain',
            value: 'uu',
          },
        ],
      };
      const metadata: FormMetaData = {
        type: 'group',
        name: 'output',
        repeat: { repeatMin: 1, repeatMax: 1 },
        children: [
          {
            type: 'collectionVariable',
            name: 'domain',
            repeat: { repeatMin: 1, repeatMax: 1 },
            attributes: {
              language: 'eng',
            },
          },
          {
            type: 'collectionVariable',
            name: 'domain',
            repeat: { repeatMin: 1, repeatMax: 1 },
            attributes: {
              language: 'swe',
            },
          },
        ],
      };

      const transformData = transformRecordData(data, metadata);

      const expected = {
        divaOutput: {
          domain_language_eng: {
            value: 'hb',
            _language: 'eng',
          },
          domain_language_swe: {
            value: 'uu',
            _language: 'swe',
          },
        },
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a root group with multiple recordLinks with same nameInData having attributes', () => {
      const data = {
        name: 'divaOutput',
        children: [
          {
            name: 'nationalSubjectCategory',
            children: [
              {
                name: 'linkedRecordType',
                value: 'nationalSubjectCategory',
              },
              {
                name: 'linkedRecordId',
                value: 'nationalSubjectCategory:1111111111111111',
              },
            ],
            attributes: {
              language: 'swe',
            },
          },
          {
            name: 'nationalSubjectCategory',
            children: [
              {
                name: 'linkedRecordType',
                value: 'nationalSubjectCategory',
              },
              {
                name: 'linkedRecordId',
                value: 'nationalSubjectCategory:2222222222222222',
              },
            ],
            attributes: {
              language: 'eng',
            },
          },
        ],
      };

      const metadata: FormMetaData = {
        type: 'group',
        name: 'divaOutput',
        repeat: { repeatMin: 1, repeatMax: 1 },
        children: [
          {
            type: 'recordLink',
            name: 'nationalSubjectCategory',
            repeat: { repeatMin: 1, repeatMax: 1 },
            attributes: {
              language: 'eng',
            },
          },
          {
            type: 'recordLink',
            name: 'nationalSubjectCategory',
            repeat: { repeatMin: 1, repeatMax: 1 },
            attributes: {
              language: 'swe',
            },
          },
        ],
      };

      const transformData = transformRecordData(data, metadata);

      const expected = {
        divaOutput: {
          nationalSubjectCategory_language_swe: {
            value: 'nationalSubjectCategory:1111111111111111',
            _language: 'swe',
          },
          nationalSubjectCategory_language_eng: {
            value: 'nationalSubjectCategory:2222222222222222',
            _language: 'eng',
          },
        },
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a root group with groups with same nameInData having attributes', () => {
      const data = {
        name: 'divaOutput',
        children: [
          {
            name: 'author',
            children: [
              {
                name: 'name',
                value: 'value1',
              },
            ],
            attributes: {
              language: 'eng',
            },
          },
          {
            name: 'author',
            children: [
              {
                name: 'name',
                value: 'value2',
              },
            ],
            attributes: {
              language: 'swe',
            },
          },
        ],
      };
      const metadata: FormMetaData = {
        type: 'group',
        name: 'divaOutput',
        repeat: { repeatMin: 1, repeatMax: 1 },
        children: [
          {
            type: 'group',
            name: 'author',
            repeat: { repeatMin: 1, repeatMax: 1 },
            attributes: {
              language: 'eng',
            },
            children: [
              {
                type: 'textVariable',
                name: 'name',
                repeat: { repeatMin: 1, repeatMax: 1 },
              },
            ],
          },
          {
            type: 'group',
            name: 'author',
            repeat: { repeatMin: 1, repeatMax: 1 },
            attributes: {
              language: 'swe',
            },
            children: [
              {
                type: 'textVariable',
                name: 'name',
                repeat: { repeatMin: 1, repeatMax: 1 },
              },
            ],
          },
        ],
      };

      const transformData = transformRecordData(data, metadata);

      const expected = {
        divaOutput: {
          author_language_eng: {
            _language: 'eng',
            name: {
              value: 'value1',
            },
          },
          author_language_swe: {
            _language: 'swe',
            name: {
              value: 'value2',
            },
          },
        },
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a root group with variables with same nameInData and one having attributes', () => {
      const data = {
        name: 'output',
        children: [
          {
            name: 'namePart',
            value: 'value1',
          },
          {
            name: 'namePart',
            value: 'value1',
            attributes: {
              language: 'swe',
            },
          },
        ],
      };
      const metadata: FormMetaData = {
        type: 'group',
        name: 'output',
        repeat: { repeatMin: 1, repeatMax: 1 },
        children: [
          {
            type: 'textVariable',
            name: 'namePart',
            repeat: { repeatMin: 1, repeatMax: 1 },
          },
          {
            type: 'textVariable',
            name: 'namePart',
            repeat: { repeatMin: 1, repeatMax: 1 },
            attributes: {
              language: 'swe',
            },
          },
        ],
      };

      const transformData = transformRecordData(data, metadata);

      const expected = {
        output: {
          namePart: {
            value: 'value1',
          },
          namePart_language_swe: {
            value: 'value1',
            _language: 'swe',
          },
        },
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('handles fields with multiple matching metadatas', () => {
      const dataRecordGroup = {
        children: [
          {
            repeatId: '0',
            children: [
              {
                name: 'namePart',
                attributes: {
                  type: 'family',
                },
                value: 'eeeeeee',
              },
              {
                name: 'namePart',
                attributes: {
                  type: 'given',
                },
                value: 'gil',
              },
            ],
            name: 'name',
            attributes: {
              type: 'personal',
            },
          },
        ],
        name: 'output',
      } as DataGroup;

      const formMetaData = {
        name: 'output',
        type: 'group',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        children: [
          {
            name: 'name',
            type: 'group',
            attributes: {
              type: 'personal',
            },
            repeat: {
              repeatMin: 0,
              repeatMax: 1.7976931348623157e308,
            },
            children: [
              {
                name: 'person',
                type: 'recordLink',
                repeat: {
                  repeatMin: 0,
                  repeatMax: 1,
                },
                linkedRecordType: 'diva-person',
              },
              {
                name: 'namePart',
                type: 'textVariable',
                attributes: {
                  type: 'family',
                },
                repeat: {
                  repeatMin: 0,
                  repeatMax: 1,
                },
              },
              {
                name: 'namePart',
                type: 'textVariable',
                attributes: {
                  type: 'given',
                },
                repeat: {
                  repeatMin: 0,
                  repeatMax: 1,
                },
              },
              {
                name: 'role',
                type: 'group',
                repeat: {
                  repeatMin: 0,
                  repeatMax: 1,
                },
                children: [
                  {
                    name: 'roleTerm',
                    type: 'collectionVariable',
                    repeat: {
                      repeatMin: 1,
                      repeatMax: 1,
                    },
                  },
                ],
              },
              {
                name: 'affiliation',
                type: 'group',
                repeat: {
                  repeatMin: 0,
                  repeatMax: 1.7976931348623157e308,
                },
                children: [
                  {
                    name: 'organisation',
                    type: 'recordLink',
                    repeat: {
                      repeatMin: 0,
                      repeatMax: 1,
                    },
                    linkedRecordType: 'diva-organisation',
                  },
                  {
                    name: 'name',
                    type: 'group',
                    attributes: {
                      type: 'corporate',
                    },
                    repeat: {
                      repeatMin: 0,
                      repeatMax: 1,
                    },
                    children: [
                      {
                        name: 'namePart',
                        type: 'textVariable',
                        repeat: {
                          repeatMin: 1,
                          repeatMax: 1,
                        },
                      },
                    ],
                  },
                  {
                    name: 'identifier',
                    type: 'textVariable',
                    attributes: {
                      type: 'ror',
                    },
                    repeat: {
                      repeatMin: 0,
                      repeatMax: 1,
                    },
                  },
                  {
                    name: 'country',
                    type: 'collectionVariable',
                    repeat: {
                      repeatMin: 0,
                      repeatMax: 1,
                    },
                  },
                  {
                    name: 'description',
                    type: 'textVariable',
                    repeat: {
                      repeatMin: 0,
                      repeatMax: 1,
                    },
                  },
                ],
              },
            ],
          },
          {
            name: 'name',
            type: 'group',
            attributes: {
              type: 'corporate',
            },
            repeat: {
              repeatMin: 0,
              repeatMax: 1.7976931348623157e308,
            },
            children: [
              {
                name: 'organisation',
                type: 'recordLink',
                repeat: {
                  repeatMin: 0,
                  repeatMax: 1,
                },
                linkedRecordType: 'diva-organisation',
              },
              {
                name: 'namePart',
                type: 'textVariable',
                repeat: {
                  repeatMin: 0,
                  repeatMax: 1,
                },
              },
              {
                name: 'role',
                type: 'group',
                repeat: {
                  repeatMin: 0,
                  repeatMax: 1,
                },
                children: [
                  {
                    name: 'roleTerm',
                    type: 'collectionVariable',
                    repeat: {
                      repeatMin: 1,
                      repeatMax: 1,
                    },
                  },
                ],
              },
              {
                name: 'identifier',
                type: 'textVariable',
                attributes: {
                  type: 'ror',
                },
                repeat: {
                  repeatMin: 0,
                  repeatMax: 1,
                },
              },
              {
                name: 'description',
                type: 'textVariable',
                repeat: {
                  repeatMin: 0,
                  repeatMax: 1,
                },
              },
            ],
          },
        ],
      } satisfies FormMetaData;

      const actual = transformDataGroup(dataRecordGroup, formMetaData);

      const expected = {
        name_type_personal: [
          {
            namePart_type_family: [
              {
                value: 'eeeeeee',
                _type: 'family',
              },
            ],
            namePart_type_given: [
              {
                value: 'gil',
                _type: 'given',
              },
            ],
            _type: 'personal',
          },
        ],
      };
      expect(actual).toStrictEqual(expected);
    });

    it("should handle data that doesn't match metadata", () => {
      const data = {
        name: 'divaOutput',
        children: [
          {
            name: 'title',
            value: 'testTitleVal',
          },
        ],
      };
      const metadata: FormMetaData = {
        type: 'group',
        name: 'divaOutput',
        repeat: { repeatMin: 1, repeatMax: 1 },
        children: [
          {
            type: 'textVariable',
            repeat: { repeatMin: 1, repeatMax: 1 },
            name: 'notTitle',
          },
        ],
      };

      const transformData = transformRecordData(data, metadata);

      const expected = {
        divaOutput: {},
      };

      expect(transformData).toStrictEqual(expected);
    });

    it('should handle unknown metadataType', () => {
      const data = {
        name: 'divaOutput',
        children: [
          {
            name: 'title',
            value: 'testTitleVal',
          },
        ],
      };
      const metadata: FormMetaData = {
        type: 'group',
        name: 'divaOutput',
        repeat: { repeatMin: 1, repeatMax: 1 },
        children: [
          {
            type: 'GLORP',
            repeat: { repeatMin: 1, repeatMax: 1 },
            name: 'title',
          },
        ],
      } as unknown as FormMetaData;

      const transformData = transformRecordData(data, metadata);

      const expected = {
        divaOutput: {
          title: {
            value: 'testTitleVal',
          },
        },
      };

      expect(transformData).toStrictEqual(expected);
    });
  });
});
