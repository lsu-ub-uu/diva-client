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
import recordManuscriptWithSameNameInDataVar from '@/__mocks__/bff/coraRecordManuscriptWithNamePart.json';
import recordManuscriptWithSameNameInDataVarWithoutAllVars from '@/__mocks__/bff/coraRecordManuscriptWithNamePartWithoutAllVars.json';
import recordManuscriptWithSameNameInDataGroup from '@/__mocks__/bff/coraRecordManuscriptWithSameNameInData.json';
import coraRecordManuscriptWithSameNameInDataWithOneGroup from '@/__mocks__/bff/coraRecordManuscriptWithSameNameInDataWithOneGroup.json';
import {
  createdByLink,
  dataDividerLink,
  epoCollectionItem,
  faoCollectionItem,
  idTextVar,
  kalCollectionItem,
  languageCollectionVar,
  nationalSubjectCategoryLink,
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
  someManuscriptRecordType,
  someNamePartTextVariable,
  someNamePartWithAttributesTextVariable,
  someNationalSubjectCategoryRecordType,
  someNewMetadataGroupRepeatingNamePartGroup,
  someNewMetadataGroupRepeatingNamePartWithAttributesGroup,
  someNewMetadataGroupRepeatingTitleInfoNameInDataGroup,
  someNewMetadataGroupTitleInfoAlternativeGroup,
  someNewMetadataGroupTitleInfoGroup,
  someOtherNamePartTextVariable,
  someOtherNamePartWithAttributesTextVariable,
  someRecordTypeForRepeatingTitleInfo,
  someRecordTypeNamePart,
  someRecordTypeNamePartWithAttributes,
  someSubTitleTextVariable,
  sometitleMetadataChildGroup,
  tsCreatedTextVar,
  tsUpdatedTextVar,
  typeCollectionItemAlternative,
  typeCollVariable,
  typeItemCollection,
  updatedByLink,
  updatedGroup,
  validationTypeLink,
} from '@/__mocks__/bff/form/bffMock';
import type { DataGroup, RecordWrapper } from '@/cora/cora-data/types.server';
import type { FormMetaData } from '@/data/formDefinition/formDefinition.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { listToPool } from '@/utils/structs/listToPool';
import type { Lookup } from '@/utils/structs/lookup';
import { beforeEach, describe, expect, it } from 'vitest';
import type {
  BFFGuiElement,
  BFFLoginUnit,
  BFFLoginWebRedirect,
  BFFMetadata,
  BFFOrganisation,
  BFFPresentation,
  BFFPresentationBase,
  BFFPresentationGroup,
  BFFPresentationResourceLink,
  BFFPresentationSurroundingContainer,
  BFFRecordType,
  BFFSearch,
  BFFText,
  BFFTheme,
  BFFValidationType,
} from '../bffTypes.server';
import {
  transformAttributes,
  transformDataGroup,
  transformRecord,
  transformRecordData,
} from '../transformRecord.server';

describe('transformRecord', () => {
  let metadataPool: Lookup<string, BFFMetadata>;
  let presentationPool: Lookup<
    string,
    | BFFPresentationBase
    | BFFPresentationGroup
    | BFFPresentationSurroundingContainer
    | BFFGuiElement
    | BFFPresentationResourceLink
  >;
  let recordTypePool: Lookup<string, BFFRecordType>;
  let dependencies: Dependencies;

  beforeEach(() => {
    recordTypePool = listToPool<BFFRecordType>([
      someManuscriptRecordType,
      someNationalSubjectCategoryRecordType,
      someRecordTypeForRepeatingTitleInfo,
      someRecordTypeNamePart,
      someRecordTypeNamePartWithAttributes,
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
      validationTypePool: listToPool<BFFValidationType>([]),
      metadataPool,
      presentationPool,
      recordTypePool: recordTypePool,
      searchPool: listToPool<BFFSearch>([]),
      loginUnitPool: listToPool<BFFLoginUnit>([]),
      loginPool: listToPool<BFFLoginWebRedirect>([]),
      themePool: listToPool<BFFTheme>([]),
      organisationPool: listToPool<BFFOrganisation>([]),
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
        recordType: 'manuscriptRecordTypeId',
        validationType: 'manuscript',
        createdAt: '2023-10-11T09:24:30.511487Z',
        createdBy: 'coraUser:490742519075086',
        userRights: ['read', 'update', 'index', 'delete'],
        actionLinks: {
          delete: {
            rel: 'delete',
            requestMethod: 'DELETE',
            url: 'https://cora.epc.ub.uu.se/diva/rest/record/divaOutput/divaOutput:519333261463755',
          },
          index: {
            accept: 'application/vnd.cora.record+json',
            body: {
              children: [
                {
                  children: [
                    {
                      name: 'linkedRecordType',
                      value: 'recordType',
                    },
                    {
                      name: 'linkedRecordId',
                      value: 'divaOutput',
                    },
                  ],
                  name: 'recordType',
                },
                {
                  name: 'recordId',
                  value: 'divaOutput:519333261463755',
                },
                {
                  name: 'type',
                  value: 'index',
                },
              ],
              name: 'workOrder',
            },
            contentType: 'application/vnd.cora.record+json',
            rel: 'index',
            requestMethod: 'POST',
            url: 'https://cora.epc.ub.uu.se/diva/rest/record/workOrder/',
          },
          read: {
            accept: 'application/vnd.cora.record+json',
            rel: 'read',
            requestMethod: 'GET',
            url: 'https://cora.epc.ub.uu.se/diva/rest/record/divaOutput/divaOutput:519333261463755',
          },
          update: {
            accept: 'application/vnd.cora.record+json',
            contentType: 'application/vnd.cora.record+json',
            rel: 'update',
            requestMethod: 'POST',
            url: 'https://cora.epc.ub.uu.se/diva/rest/record/divaOutput/divaOutput:519333261463755',
          },
        },
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
                value: 'manuscriptRecordTypeId',
              },
              updated: [
                {
                  repeatId: '0',
                  tsUpdated: {
                    value: '2023-10-11T09:24:30.511487Z',
                  },
                  updatedBy: {
                    value: 'coraUser:490742519075086',
                  },
                },
                {
                  repeatId: '1',

                  tsUpdated: {
                    value: '2023-10-18T09:09:13.554736Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
                {
                  repeatId: '2',
                  tsUpdated: {
                    value: '2023-10-26T12:33:22.260532Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
                {
                  repeatId: '3',
                  tsUpdated: {
                    value: '2023-10-26T12:35:28.748398Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
                {
                  repeatId: '4',
                  tsUpdated: {
                    value: '2023-10-26T12:35:40.545698Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
                {
                  repeatId: '5',
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
            alternativeTitle: {
              mainTitle: {
                value: 'bbbbb',
              },
              subTitle: {
                value: 'subTitle1',
              },

              _language: 'epo',
              _titleType: 'alternativeTitle',
            },

            nationalSubjectCategory: {
              value: 'nationalSubjectCategory:6325370460697648',
            },

            abstract: {
              value: 'hej!',
              _language: 'fao',
            },
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
        actionLinks: {
          read: {
            requestMethod: 'GET',
            rel: 'read',
            url: 'https://cora.epc.ub.uu.se/diva/rest/record/divaOutputSwepub/divaOutputSwepub:2087392797647370',
            accept: 'application/vnd.cora.record+json',
          },
          update: {
            requestMethod: 'POST',
            rel: 'update',
            contentType: 'application/vnd.cora.record+json',
            url: 'https://cora.epc.ub.uu.se/diva/rest/record/divaOutputSwepub/divaOutputSwepub:2087392797647370',
            accept: 'application/vnd.cora.record+json',
          },
          index: {
            requestMethod: 'POST',
            rel: 'index',
            body: {
              children: [
                {
                  children: [
                    {
                      name: 'linkedRecordType',
                      value: 'recordType',
                    },
                    {
                      name: 'linkedRecordId',
                      value: 'divaOutputSwepub',
                    },
                  ],
                  name: 'recordType',
                },
                {
                  name: 'recordId',
                  value: 'divaOutputSwepub:2087392797647370',
                },
                {
                  name: 'type',
                  value: 'index',
                },
              ],
              name: 'workOrder',
            },
            contentType: 'application/vnd.cora.record+json',
            url: 'https://cora.epc.ub.uu.se/diva/rest/record/workOrder/',
            accept: 'application/vnd.cora.record+json',
          },
          delete: {
            requestMethod: 'DELETE',
            rel: 'delete',
            url: 'https://cora.epc.ub.uu.se/diva/rest/record/divaOutputSwepub/divaOutputSwepub:2087392797647370',
          },
        },
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
                  repeatId: '0',
                  tsUpdated: {
                    value: '2024-09-13T11:49:37.288927Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
                {
                  repeatId: '1',
                  tsUpdated: {
                    value: '2024-09-13T11:49:54.085586Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
                {
                  repeatId: '2',
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
            titleInfo_type_alternative: {
              _lang: 'amh',
              _type: 'alternative',
              title: {
                value: 'EN utmärkt alternativ titel',
              },
            },
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
        actionLinks: {
          read: {
            requestMethod: 'GET',
            rel: 'read',
            url: 'https://cora.epc.ub.uu.se/diva/rest/record/divaOutputSwepub/divaOutputSwepub:2087392797647370',
            accept: 'application/vnd.cora.record+json',
          },
          update: {
            requestMethod: 'POST',
            rel: 'update',
            contentType: 'application/vnd.cora.record+json',
            url: 'https://cora.epc.ub.uu.se/diva/rest/record/divaOutputSwepub/divaOutputSwepub:2087392797647370',
            accept: 'application/vnd.cora.record+json',
          },
          index: {
            requestMethod: 'POST',
            rel: 'index',
            body: {
              children: [
                {
                  children: [
                    {
                      name: 'linkedRecordType',
                      value: 'recordType',
                    },
                    {
                      name: 'linkedRecordId',
                      value: 'divaOutputSwepub',
                    },
                  ],
                  name: 'recordType',
                },
                {
                  name: 'recordId',
                  value: 'divaOutputSwepub:2087392797647370',
                },
                {
                  name: 'type',
                  value: 'index',
                },
              ],
              name: 'workOrder',
            },
            contentType: 'application/vnd.cora.record+json',
            url: 'https://cora.epc.ub.uu.se/diva/rest/record/workOrder/',
            accept: 'application/vnd.cora.record+json',
          },
          delete: {
            requestMethod: 'DELETE',
            rel: 'delete',
            url: 'https://cora.epc.ub.uu.se/diva/rest/record/divaOutputSwepub/divaOutputSwepub:2087392797647370',
          },
        },
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
                  repeatId: '0',
                  tsUpdated: {
                    value: '2024-09-13T11:49:37.288927Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
                {
                  repeatId: '1',
                  tsUpdated: {
                    value: '2024-09-13T11:49:54.085586Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
                {
                  repeatId: '2',
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
        actionLinks: {
          read: {
            requestMethod: 'GET',
            rel: 'read',
            url: 'https://cora.epc.ub.uu.se/diva/rest/record/divaOutputSwepub/divaOutputSwepub:2087392797647370',
            accept: 'application/vnd.cora.record+json',
          },
          update: {
            requestMethod: 'POST',
            rel: 'update',
            contentType: 'application/vnd.cora.record+json',
            url: 'https://cora.epc.ub.uu.se/diva/rest/record/divaOutputSwepub/divaOutputSwepub:2087392797647370',
            accept: 'application/vnd.cora.record+json',
          },
          index: {
            requestMethod: 'POST',
            rel: 'index',
            body: {
              children: [
                {
                  children: [
                    {
                      name: 'linkedRecordType',
                      value: 'recordType',
                    },
                    {
                      name: 'linkedRecordId',
                      value: 'divaOutputSwepub',
                    },
                  ],
                  name: 'recordType',
                },
                {
                  name: 'recordId',
                  value: 'divaOutputSwepub:2087392797647370',
                },
                {
                  name: 'type',
                  value: 'index',
                },
              ],
              name: 'workOrder',
            },
            contentType: 'application/vnd.cora.record+json',
            url: 'https://cora.epc.ub.uu.se/diva/rest/record/workOrder/',
            accept: 'application/vnd.cora.record+json',
          },
          delete: {
            requestMethod: 'DELETE',
            rel: 'delete',
            url: 'https://cora.epc.ub.uu.se/diva/rest/record/divaOutputSwepub/divaOutputSwepub:2087392797647370',
          },
        },
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
                  repeatId: '0',
                  tsUpdated: {
                    value: '2024-09-13T11:49:37.288927Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
                {
                  repeatId: '1',
                  tsUpdated: {
                    value: '2024-09-13T11:49:54.085586Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
                {
                  repeatId: '2',
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
        recordType: 'namePartPartWithAttributesRecordTypeId',
        validationType: 'namePartPartWithAttributesValidationTypeId',
        createdAt: '2024-09-13T11:49:37.288927Z',
        createdBy: '161616',
        userRights: ['read', 'update', 'index', 'delete'],
        actionLinks: {
          read: {
            requestMethod: 'GET',
            rel: 'read',
            url: 'https://cora.epc.ub.uu.se/diva/rest/record/divaOutputSwepub/divaOutputSwepub:2087392797647370',
            accept: 'application/vnd.cora.record+json',
          },
          update: {
            requestMethod: 'POST',
            rel: 'update',
            contentType: 'application/vnd.cora.record+json',
            url: 'https://cora.epc.ub.uu.se/diva/rest/record/divaOutputSwepub/divaOutputSwepub:2087392797647370',
            accept: 'application/vnd.cora.record+json',
          },
          index: {
            requestMethod: 'POST',
            rel: 'index',
            body: {
              children: [
                {
                  children: [
                    {
                      name: 'linkedRecordType',
                      value: 'recordType',
                    },
                    {
                      name: 'linkedRecordId',
                      value: 'divaOutputSwepub',
                    },
                  ],
                  name: 'recordType',
                },
                {
                  name: 'recordId',
                  value: 'divaOutputSwepub:2087392797647370',
                },
                {
                  name: 'type',
                  value: 'index',
                },
              ],
              name: 'workOrder',
            },
            contentType: 'application/vnd.cora.record+json',
            url: 'https://cora.epc.ub.uu.se/diva/rest/record/workOrder/',
            accept: 'application/vnd.cora.record+json',
          },
          delete: {
            requestMethod: 'DELETE',
            rel: 'delete',
            url: 'https://cora.epc.ub.uu.se/diva/rest/record/divaOutputSwepub/divaOutputSwepub:2087392797647370',
          },
        },
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
                value: 'namePartPartWithAttributesRecordTypeId',
              },
              updated: [
                {
                  repeatId: '0',
                  tsUpdated: {
                    value: '2024-09-13T11:49:37.288927Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
                {
                  repeatId: '1',
                  tsUpdated: {
                    value: '2024-09-13T11:49:54.085586Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
                {
                  repeatId: '2',
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
            namePart_language_eng: {
              value: 'value2',
              _language: 'eng',
            },
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
        recordType: 'manuscriptRecordTypeId',
        validationType: 'manuscript',
        userRights: ['read', 'update', 'index', 'delete'],
        actionLinks: {
          read: {
            requestMethod: 'GET',
            rel: 'read',
            url: 'https://cora.epc.ub.uu.se/diva/rest/record/divaOutput/divaOutput:519333261463755',
            accept: 'application/vnd.cora.record+json',
          },
          update: {
            requestMethod: 'POST',
            rel: 'update',
            contentType: 'application/vnd.cora.record+json',
            url: 'https://cora.epc.ub.uu.se/diva/rest/record/divaOutput/divaOutput:519333261463755',
            accept: 'application/vnd.cora.record+json',
          },
          index: {
            requestMethod: 'POST',
            rel: 'index',
            body: {
              children: [
                {
                  children: [
                    {
                      name: 'linkedRecordType',
                      value: 'recordType',
                    },
                    {
                      name: 'linkedRecordId',
                      value: 'manuscriptRecordTypeId',
                    },
                  ],
                  name: 'recordType',
                },
                {
                  name: 'recordId',
                  value: 'divaOutput:519333261463755',
                },
                {
                  name: 'type',
                  value: 'index',
                },
              ],
              name: 'workOrder',
            },
            contentType: 'application/vnd.cora.record+json',
            url: 'https://cora.epc.ub.uu.se/diva/rest/record/workOrder/',
            accept: 'application/vnd.cora.record+json',
          },
          delete: {
            requestMethod: 'DELETE',
            rel: 'delete',
            url: 'https://cora.epc.ub.uu.se/diva/rest/record/divaOutput/divaOutput:519333261463755',
          },
        },
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
                value: 'manuscriptRecordTypeId',
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
            alternativeTitle: {
              mainTitle: {
                value: 'bbbbb',
              },
              subTitle: {
                value: 'subTitle1',
              },

              _language: 'epo',
              _titleType: 'alternativeTitle',
            },

            nationalSubjectCategory: {
              value: 'nationalSubjectCategory:6325370460697648',
            },

            abstract: {
              value: 'hej!',
              _language: 'fao',
            },
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

      const transformData = transformRecordData(data, metadata, dependencies);

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

      const transformData = transformRecordData(data, metadata, dependencies);
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

      const transformData = transformRecordData(data, metadata, dependencies);

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

      const transformData = transformRecordData(data, metadata, dependencies);

      const expected = {
        divaOutput: {
          exampleNumberVar: [
            {
              repeatId: '0',
              value: '12.99',
            },
            {
              repeatId: '1',
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

      const transformData = transformRecordData(data, metadata, dependencies);

      const expected = {
        divaOutput: {
          exampleNumberVar: [
            {
              value: '12.99',
              _language: 'kal',
              repeatId: '0',
            },
            {
              value: '1.34',
              _language: 'eng',
              repeatId: '1',
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

      const transformData = transformRecordData(data, metadata, dependencies);

      const expected = {
        divaOutput: {
          exampleNumberVar: [
            {
              repeatId: '0',
              value: '12.99',
            },
            {
              repeatId: '1',
              value: '1.34',
            },
          ],
          exampleNumberVarTwo: [
            {
              repeatId: '0',
              value: '99.00',
            },
            {
              repeatId: '1',
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

      const transformData = transformRecordData(data, metadata, dependencies);
      const expected = {
        divaOutput: {
          childGroup: [
            {
              repeatId: '0',
              title: {
                value: 'testTitleVal1',
              },
            },
            {
              repeatId: '1',
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

      const transformData = transformRecordData(data, metadata, dependencies);
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

      const transformData = transformRecordData(data, metadata, dependencies);
      const expected = {
        divaOutput: {
          nationalSubjectCategory: [
            {
              value: 'nationalSubjectCategory:6325370460697648',
              _language: 'eng',
              repeatId: '0',
            },
            {
              value: 'nationalSubjectCategory:6325370460697641',
              _language: 'swe',
              repeatId: '1',
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

      const transformData = transformRecordData(data, metadata, dependencies);
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

      const transformData = transformRecordData(data, metadata, dependencies);
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

      const transformData = transformRecordData(data, metadata, dependencies);
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
              repeatId: '7',
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

      const transformData = transformRecordData(data, metadata, dependencies);

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

      const transformData = transformRecordData(data, metadata, dependencies);

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

      const transformData = transformRecordData(data, metadata, dependencies);

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

      const transformData = transformRecordData(data, metadata, dependencies);

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

    it('should handle linked records', () => {
      const data = {
        name: 'someRootGroup',
        children: [
          {
            name: 'someRecordLink',
            children: [
              {
                name: 'linkedRecordType',
                value: 'someLinkedRecordTypeId',
              },
              {
                name: 'linkedRecordId',
                value: 'someRecordId',
              },
              {
                name: 'linkedRecord',
                children: [
                  {
                    name: 'someLinkedRecordRootGroup',
                    children: [
                      {
                        name: 'recordInfo',
                        children: [
                          {
                            name: 'type',
                            children: [
                              {
                                name: 'linkedRecordId',
                                value: 'someLinkedRecordTypeId',
                              },
                            ],
                          },
                          {
                            name: 'validationType',
                            children: [
                              {
                                name: 'linkedRecordId',
                                value: 'someLinkedRecordValidationTypeId',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        name: 'someTextVariable',
                        value: 'value1',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };

      const metadata: FormMetaData = {
        type: 'group',
        name: 'someRootGroup',
        repeat: { repeatMin: 1, repeatMax: 1 },
        children: [
          {
            type: 'recordLink',
            name: 'someRecordLink',
            linkedRecordType: 'someLinkedRecordRootGroupId',
            repeat: { repeatMin: 1, repeatMax: 1 },
          },
        ],
      };

      dependencies.recordTypePool.set('someLinkedRecordTypeId', {
        id: 'someLinkedRecordTypeId',
        metadataId: 'someLinkedRecordRootGroupId',
      } as BFFRecordType);

      dependencies.metadataPool.set('someLinkedRecordRootGroupId', {
        id: 'someLinkedRecordRootGroupId',
        type: 'group',
        nameInData: 'someLinkedRecordRootGroup',
        textId: '',
        defTextId: '',
        children: [
          {
            childId: 'someTextVariableId',
            repeatMin: '1',
            repeatMax: '1',
          },
        ],
      });

      dependencies.metadataPool.set('someTextVariableId', {
        id: 'someTextVariableId',
        type: 'textVariable',
        nameInData: 'someTextVariable',
        textId: '',
        defTextId: '',
      });

      const transformData = transformRecordData(data, metadata, dependencies);

      const expected = {
        someRootGroup: {
          someRecordLink: {
            value: 'someRecordId',
            linkedRecord: {
              someLinkedRecordRootGroup: {
                someTextVariable: {
                  value: 'value1',
                },
              },
            },
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

      const actual = transformDataGroup(
        dataRecordGroup,
        formMetaData,
        dependencies,
      );

      const expected = {
        name_type_personal: [
          {
            namePart_type_family: {
              value: 'eeeeeee',
              _type: 'family',
            },

            namePart_type_given: {
              value: 'gil',
              _type: 'given',
            },
            repeatId: '0',
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

      const transformData = transformRecordData(data, metadata, dependencies);

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

      const transformData = transformRecordData(data, metadata, dependencies);

      const expected = {
        divaOutput: {
          title: {
            value: 'testTitleVal',
          },
        },
      };

      expect(transformData).toStrictEqual(expected);
    });

    it('should handle resourceLink', () => {
      const data = {
        name: 'divaOutput',
        children: [
          {
            name: 'master',
            children: [
              {
                name: 'linkedRecordType',
                value: 'binary',
              },
              {
                name: 'linkedRecordId',
                value: 'binary:8037579210342018',
              },
              {
                name: 'mimeType',
                value: 'audio/mpeg',
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
            type: 'resourceLink',
            repeat: { repeatMin: 1, repeatMax: 1 },
            name: 'master',
          },
        ],
      } as unknown as FormMetaData;
      const transformData = transformRecordData(data, metadata, dependencies);

      const expected = {
        divaOutput: {
          master: {
            id: 'binary:8037579210342018',
            mimeType: 'audio/mpeg',
            name: 'master',
          },
        },
      };

      expect(transformData).toStrictEqual(expected);
    });
  });

  it('should handle attributes on outer groups', () => {
    const data = {
      children: [
        {
          children: [
            {
              name: 'resourceId',
              value: 'binary:8037579210342018-master',
            },
          ],
          name: 'master',
        },
      ],
      name: 'binary',
      attributes: {
        type: 'sound',
      },
    };
    const metadata: FormMetaData = {
      name: 'binary',
      type: 'group',
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      children: [
        {
          name: 'master',
          type: 'group',
          repeat: {
            repeatMin: 0,
            repeatMax: 1,
          },
          children: [
            {
              name: 'resourceId',
              type: 'textVariable',
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
            },
          ],
        },
      ],
    } as unknown as FormMetaData;

    const transformData = transformRecordData(data, metadata, dependencies);

    const expected = {
      binary: {
        _type: 'sound',
        master: {
          resourceId: {
            value: 'binary:8037579210342018-master',
          },
        },
      },
    };

    expect(transformData).toStrictEqual(expected);
  });

  it('should handle DiVA decorated format for data', () => {});

  describe('it should transform attributes', () => {
    it('it shoud return undefind when undefined', () => {
      expect(transformAttributes(undefined)).toStrictEqual({});
    });
    it('transform regular attributes', () => {
      expect(transformAttributes({ key: 'value' })).toStrictEqual({
        _key: 'value',
      });
    });

    it('transforms decortated texts', () => {
      expect(
        transformAttributes({ _sv: 'Rättighetsenhet', _en: 'Permission unit' }),
      ).toStrictEqual({
        __text: {
          sv: 'Rättighetsenhet',
          en: 'Permission unit',
        },
      });
    });
    it('transforms decortated values', () => {
      expect(
        transformAttributes({
          _value_en: 'Published',
          _value_sv: 'Publicerad',
        }),
      ).toStrictEqual({
        __valueText: {
          sv: 'Publicerad',
          en: 'Published',
        },
      });
    });
  });
});
