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
  authorGroup,
  authorGroup2,
  authorityLanguageTermCollectionVar,
  createdByLink,
  dataDividerLink,
  divaOutputValidationType,
  domainCollectionVar,
  familyNameTextVar,
  genreCollectionVar,
  genreOtherCollectionVar,
  givenNameTextVar,
  idTextVar,
  mainTitleTextVar,
  newNationalSubjectCategoryRecordTypeGroup,
  newNationalSubjectCategoryRecordTypeNewGroup,
  newNationSubjectCategoryMetadataSubjectEngLangCollVariable,
  newNationSubjectCategoryMetadataSubjectEngTextVariable,
  newNationSubjectCategoryMetadataSubjectSweLangCollVariable,
  newNationSubjectCategoryMetadataSubjectSweTextVariable,
  newNationSubjectCategoryValidationType,
  outputTypeCollectionVar,
  outputTypeGroup,
  pNewNationSubjectCategoryEngVar,
  pNewNationSubjectCategoryMetadataGroup,
  pNewNationSubjectCategorySweVar,
  preprintNewGroup,
  recordInfoMetadata,
  recordTypeLink,
  someLanguageTerm,
  someMetadataChildGroup,
  someMetadataCollectionVariable,
  someMetadataNumberVar,
  someMetadataNumberVarWithAttribute,
  someMetadataRecordLink,
  someMetadataRecordLinkWithAttributes,
  someMetadataRepeatingRecordLinkWithAttributes,
  someMetadataTextVariable,
  someMetadataTextVariableWithAttributeVar,
  someNewMetadataGroupRepeatingCollectionNameInDataGroup,
  someNewMetadataGroupRepeatingGroupsNameInDataGroup,
  someNewMetadataGroupRepeatingRecordLinksNameInDataGroup,
  someNewMetadataRequiredAndRepeatingGroup,
  someNewMetadataRequiredAndRepeatingRootGroup,
  someNewRecordLinkId,
  someNewSimpleMetadataGroup,
  someNewSimpleMetadataGroupRepeatingGroups,
  someNewSimpleMetadataGroupWithAttributes,
  someOtherNewRecordLinkId,
  someSimpleValidationTypeData,
  someSimpleValidationTypeDataWithAttributes,
  someSimpleValidationTypeRepeatingGroups,
  someValidationTypeForRepeatingCollectionsNameInDataId,
  someValidationTypeForRepeatingGroupsNameInDataId,
  someValidationTypeForRepeatingRecordLinksNameInDataId,
  someValidationTypeForRequiredAndRepeatingId,
  titleGroup,
  tsCreatedTextVar,
  tsUpdatedTextVar,
  typeCodeCollectionVar,
  typeOutputTypeCollectionVar,
  updatedByLink,
  updatedGroup,
  validationTypeLink,
} from '@/__mocks__/bff/form/bffMock';
import testFormPayloadWithGroupWithAttributesAndTextVar from '@/__mocks__/bff/payloads/divaGuiPostPayloadWithGroupWithAttributesAndTextVar.json';
import testFormPayloadWithTextVarAndGroupWithTextVarAndRecordLink from '@/__mocks__/bff/payloads/divaGuiPostPayloadWithTextVarAndGroupWithTextVarAndRecordLink.json';
import type { DataGroup } from '@/cora/cora-data/types.server';
import type { FormMetaData } from '@/data/formDefinition/formDefinition.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { createFormMetaData } from '@/data/formDefinition/formMetadata.server';
import { listToPool } from '@/utils/structs/listToPool';
import type { Lookup } from '@/utils/structs/lookup';
import { createFormMetaDataPathLookup } from '@/utils/structs/metadataPathLookup';
import { beforeEach, describe, expect, it } from 'vitest';
import type {
  BFFLoginUnit,
  BFFLoginWebRedirect,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataNumberVariable,
  BFFMetadataRecordLink,
  BFFMetadataTextVariable,
  BFFOrganisation,
  BFFPresentationBase,
  BFFPresentationGroup,
  BFFRecordType,
  BFFSearch,
  BFFText,
  BFFMember,
  BFFValidationType,
} from '../bffTypes.server';
import {
  createLeaf,
  createRecordLink,
  findChildrenAttributes,
  generateAtomicValue,
  isRepeating,
  isVariable,
  removeAttributeFromName,
  transformToCoraData,
} from '../transformToCora.server';

describe('transformToCora', () => {
  describe('findChildrenAttributes', () => {
    it('skips atomics without attributes', () => {
      const expected = undefined;
      const actual = findChildrenAttributes({
        value: 'Erik',
      });
      expect(actual).toStrictEqual(expected);
    });

    it('convert GUI attributes to Cora format', () => {
      const expected = {
        colour: 'someAttributeValue3',
      };
      const actual = findChildrenAttributes({
        _colour: 'someAttributeValue3',
      });
      expect(actual).toStrictEqual(expected);
    });

    it('convert atomics with GUI attributes to Cora format', () => {
      const expected = {
        colour: 'someAttributeValue3',
      };
      const actual = findChildrenAttributes({
        _colour: 'someAttributeValue3',
        value: 'Erik',
      });
      expect(actual).toStrictEqual(expected);
    });

    it('convert GUI attributes with extra values to Cora format', () => {
      const expected = {
        colour: 'someAttributeValue3',
      };
      const actual = findChildrenAttributes({
        _colour: 'someAttributeValue3',
        someNameInData: {
          value: 'Erik',
        },
      });
      expect(actual).toStrictEqual(expected);
    });
  });

  describe('generateAtomicValue', () => {
    it('convert GUI values to Cora atomic format', () => {
      const expected = {
        name: 'someName',
        value: 'someValue',
      };
      const actual = generateAtomicValue('someName', 'someValue');
      expect(actual).toStrictEqual(expected);
    });
  });

  describe('generateRecordLink', () => {
    it('convert recordLinks to Cora recordLink format', () => {
      const expected = {
        children: [
          {
            name: 'linkedRecordType',
            value: 'linkedRecordType',
          },
          {
            name: 'linkedRecordId',
            value: 'linkedRecordId',
          },
        ],
        name: 'name',
      };
      const actual = createRecordLink(
        'name',
        'linkedRecordType',
        'linkedRecordId',
      );
      expect(actual).toStrictEqual(expected);
    });

    it('convert recordLinks to Cora recordLink format with attributes', () => {
      const expected = {
        children: [
          {
            name: 'linkedRecordType',
            value: 'linkedRecordType',
          },
          {
            name: 'linkedRecordId',
            value: 'linkedRecordId',
          },
        ],
        attributes: {
          name: 'value',
        },
        name: 'name',
      };
      const actual = createRecordLink(
        'name',
        'linkedRecordType',
        'linkedRecordId',
        {
          name: 'value',
        },
      );
      expect(actual).toStrictEqual(expected);
    });

    it('convert recordLinks to Cora recordLink format with repeatId', () => {
      const expected = {
        children: [
          {
            name: 'linkedRecordType',
            value: 'linkedRecordType',
          },
          {
            name: 'linkedRecordId',
            value: 'linkedRecordId',
          },
        ],
        repeatId: '1',
        name: 'name',
      };
      const actual = createRecordLink(
        'name',
        'linkedRecordType',
        'linkedRecordId',
        undefined,
        '1',
      );
      expect(actual).toStrictEqual(expected);
    });

    it('convert recordLinks to Cora recordLink format with attributes and repeatId', () => {
      const expected = {
        children: [
          {
            name: 'linkedRecordType',
            value: 'linkedRecordType',
          },
          {
            name: 'linkedRecordId',
            value: 'linkedRecordId',
          },
        ],
        attributes: {
          name: 'value',
        },
        repeatId: '1',
        name: 'name',
      };
      const actual = createRecordLink(
        'name',
        'linkedRecordType',
        'linkedRecordId',
        {
          name: 'value',
        },
        '1',
      );
      expect(actual).toStrictEqual(expected);
    });
  });

  describe('createLeaf', () => {
    it('convert textVariable with createLeaf to Cora atomic format', () => {
      const expected = {
        name: 'someNameInData',
        value: 'someValue',
      };
      const actual = createLeaf('someNameInData', 'someValue');
      expect(actual).toStrictEqual(expected);
    });

    it('convert numberVariable with createLeaf to Cora atomic format', () => {
      const expected = {
        name: 'someNameInData',
        value: 'someValue',
      };
      const actual = createLeaf('someNameInData', 'someValue');
      expect(actual).toStrictEqual(expected);
    });

    it('convert collectionVariable with createLeaf to Cora atomic format', () => {
      const expected = {
        name: 'someNameInData',
        value: 'someValue',
      };
      const actual = createLeaf('someNameInData', 'someValue');
      expect(actual).toStrictEqual(expected);
    });

    it('convert textVariable with repeat with createLeaf to Cora recordLink format', () => {
      const expected = {
        name: 'someNameInData',
        value: 'someValue',
        repeatId: '2',
      };
      const actual = createLeaf('someNameInData', 'someValue', '2');
      expect(actual).toStrictEqual(expected);
    });

    it('convert textVariable with attributes with createLeaf to Cora recordLink format', () => {
      const expected = {
        name: 'someNameInData',
        value: 'someValue',
        attributes: {
          _someAttributes: 'a',
        },
      };
      const actual = createLeaf('someNameInData', 'someValue', undefined, {
        _someAttributes: 'a',
      });
      expect(actual).toStrictEqual(expected);
    });

    it('convert textVariable with attributes and repeat with createLeaf to Cora recordLink format', () => {
      const expected = {
        name: 'someNameInData',
        value: 'someValue',
        attributes: {
          _someAttributes: 'a',
        },
        repeatId: '2',
      };
      const actual = createLeaf('someNameInData', 'someValue', '2', {
        _someAttributes: 'a',
      });
      expect(actual).toStrictEqual(expected);
    });
  });

  describe('transformToCoraData', () => {
    let validationTypePool: Lookup<string, BFFValidationType>;
    let metadataPool: Lookup<
      string,
      | BFFMetadataGroup
      | BFFMetadataTextVariable
      | BFFMetadataNumberVariable
      | BFFMetadataCollectionVariable
      | BFFMetadataRecordLink
    >;
    let presentationPool: Lookup<
      string,
      BFFPresentationBase | BFFPresentationGroup
    >;
    const FORM_MODE_NEW = 'create';
    let dependencies: Dependencies;

    beforeEach(() => {
      validationTypePool = listToPool<BFFValidationType>([
        someSimpleValidationTypeData,
        someSimpleValidationTypeDataWithAttributes,
        someSimpleValidationTypeRepeatingGroups,
        newNationSubjectCategoryValidationType,
        divaOutputValidationType,
        someValidationTypeForRepeatingGroupsNameInDataId,
        someValidationTypeForRepeatingCollectionsNameInDataId,
        someValidationTypeForRepeatingRecordLinksNameInDataId,
        someValidationTypeForRequiredAndRepeatingId,
      ]);
      metadataPool = listToPool<
        | BFFMetadataGroup
        | BFFMetadataTextVariable
        | BFFMetadataNumberVariable
        | BFFMetadataCollectionVariable
        | BFFMetadataRecordLink
      >([
        someMetadataTextVariable,
        someMetadataRecordLink,
        someMetadataChildGroup,
        someNewSimpleMetadataGroup,
        someNewSimpleMetadataGroupWithAttributes,
        someMetadataNumberVar,
        someNewSimpleMetadataGroupRepeatingGroups,
        someMetadataTextVariableWithAttributeVar,
        someMetadataNumberVarWithAttribute,
        someMetadataRepeatingRecordLinkWithAttributes,
        someMetadataRecordLinkWithAttributes,
        someMetadataCollectionVariable,
        newNationalSubjectCategoryRecordTypeNewGroup,
        newNationalSubjectCategoryRecordTypeGroup,
        newNationSubjectCategoryMetadataSubjectSweTextVariable,
        newNationSubjectCategoryMetadataSubjectEngTextVariable,
        newNationSubjectCategoryMetadataSubjectSweLangCollVariable,
        newNationSubjectCategoryMetadataSubjectEngLangCollVariable,
        preprintNewGroup,
        domainCollectionVar,
        outputTypeGroup,
        outputTypeCollectionVar,
        typeOutputTypeCollectionVar,
        titleGroup,
        mainTitleTextVar,
        someNewMetadataGroupRepeatingGroupsNameInDataGroup,
        authorGroup,
        authorGroup2,
        givenNameTextVar,
        familyNameTextVar,
        someNewMetadataGroupRepeatingCollectionNameInDataGroup,
        genreCollectionVar,
        genreOtherCollectionVar,
        someNewMetadataGroupRepeatingRecordLinksNameInDataGroup,
        someNewRecordLinkId,
        someOtherNewRecordLinkId,
        someNewMetadataRequiredAndRepeatingRootGroup,
        someNewMetadataRequiredAndRepeatingGroup,
        someLanguageTerm,
        typeCodeCollectionVar,
        authorityLanguageTermCollectionVar,
        recordInfoMetadata,
        createdByLink,
        dataDividerLink,
        idTextVar,
        tsCreatedTextVar,
        recordTypeLink,
        updatedGroup,
        updatedByLink,
        tsUpdatedTextVar,
        validationTypeLink,
      ]);
      presentationPool = listToPool<BFFPresentationBase | BFFPresentationGroup>(
        [
          pNewNationSubjectCategoryMetadataGroup,
          pNewNationSubjectCategorySweVar,
          pNewNationSubjectCategoryEngVar,
        ],
      );

      dependencies = {
        validationTypePool,
        metadataPool,
        textPool: listToPool<BFFText>([]),
        presentationPool,
        recordTypePool: listToPool<BFFRecordType>([]),
        searchPool: listToPool<BFFSearch>([]),
        loginUnitPool: listToPool<BFFLoginUnit>([]),
        loginPool: listToPool<BFFLoginWebRedirect>([]),
        memberPool: listToPool<BFFMember>([]),
        organisationPool: listToPool<BFFOrganisation>([]),
      } as Dependencies;
    });

    it('should take a form payload with someRecordType group containing title group with a mainTitle text variable', () => {
      const expected: DataGroup = {
        name: 'someNewMetadataGroupNameInData',
        children: [
          {
            repeatId: '0',
            name: 'someNameInData',
            value: 'firstValue',
          },
          {
            name: 'someChildGroupNameInData',
            children: [
              {
                name: 'someNameInData',
                value: 'secondValue',
              },
            ],
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
                value: 'linkValue',
              },
            ],
          },
        ],
      };
      const validationTypeId = 'someSimpleValidationTypeId';
      const formMetaData = createFormMetaData(
        dependencies,
        validationTypeId,
        FORM_MODE_NEW,
      );
      const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
      const transformData = transformToCoraData(
        formMetaDataPathLookup,
        testFormPayloadWithTextVarAndGroupWithTextVarAndRecordLink,
      );
      expect(transformData[0]).toStrictEqual(expected);
    });

    it('should take a form payload with group containing attributes, numberVar with repeatMax', () => {
      const expected: DataGroup = {
        name: 'someNewMetadataGroupWithAttributesNameInData',
        children: [
          {
            name: 'someNameInData',
            value: 'Erik',
          },
          {
            name: 'someNameInDataTextWithAttrib',
            value: 'AttribVar',
            attributes: {
              colour: 'someAttributeValue3',
            },
          },
          {
            name: 'someNameInDataNumberVar',
            value: '1',
            repeatId: '0',
          },
          {
            name: 'someNameInDataNumberVar',
            value: '2',
            repeatId: '1',
          },
          {
            name: 'someNameInDataNumberVar',
            value: '3',
            repeatId: '2',
          },
          {
            name: 'someNameInDataNumberVar',
            value: '4',
            repeatId: '3',
          },
          {
            name: 'someNameInDataNumberWithAttributeVar',
            value: '1',
            attributes: {
              colour: 'someAttributeValue3',
            },
            repeatId: '0',
          },
          {
            name: 'nationalSubjectCategoryWithAttributes',
            children: [
              {
                name: 'linkedRecordType',
                value: 'nationalSubjectCategory2',
              },
              {
                name: 'linkedRecordId',
                value: 'recordLinkWithAttrib',
              },
            ],
            attributes: {
              colour: 'someAttributeValue3',
            },
          },
          {
            name: 'nationalSubjectCategoryRepeatingWithAttributes',
            repeatId: '0',
            children: [
              {
                name: 'linkedRecordType',
                value: 'nationalSubjectCategory2',
              },
              {
                name: 'linkedRecordId',
                value: 'recordLinkRepeatingWithAttrib',
              },
            ],
            attributes: {
              colour: 'someAttributeValue4',
            },
          },
        ],
        attributes: {
          colour: 'someAttributeValue3',
        },
      };
      const validationTypeId = 'someSimpleValidationTypeWithAttributesId';
      const formMetaData = createFormMetaData(
        dependencies,
        validationTypeId,
        FORM_MODE_NEW,
      );
      const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
      const transformData = transformToCoraData(
        formMetaDataPathLookup,
        testFormPayloadWithGroupWithAttributesAndTextVar,
      );
      expect(transformData[0]).toStrictEqual(expected);
    });

    it('should take a form payload with group with same nameInData containing variables with attributes', () => {
      const expected: DataGroup = {
        name: 'nationalSubjectCategory',
        children: [
          {
            name: 'subject',
            value: 'someValue',
            attributes: {
              language: 'swe',
            },
          },
          {
            name: 'subject',
            value: 'someOtherValue',
            attributes: {
              language: 'eng',
            },
          },
        ],
      };
      const validationTypeId = 'nationalSubjectCategory';
      const formMetaData = createFormMetaData(
        dependencies,
        validationTypeId,
        FORM_MODE_NEW,
      );
      const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
      const transformData = transformToCoraData(formMetaDataPathLookup, {
        nationalSubjectCategory: {
          subject_language_swe: {
            _language: 'swe',
            value: 'someValue',
          },
          subject_language_eng: {
            _language: 'eng',
            value: 'someOtherValue',
          },
        },
      });
      expect(transformData[0]).toStrictEqual(expected);
    });

    it('should take a form payload with group with same nameInData containing collVar with attributes', () => {
      const expected: DataGroup = {
        name: 'genreGroup',
        children: [
          {
            name: 'genre',
            value: 'artistic-work_artistic-thesis',
            attributes: {
              language: 'swe',
            },
          },
          {
            name: 'genre',
            value: 'artistic-work_original-creative-work',
            attributes: {
              language: 'eng',
            },
          },
        ],
      };
      const validationTypeId =
        'someValidationTypeForRepeatingCollectionsNameInDataId';
      const formMetaData = createFormMetaData(
        dependencies,
        validationTypeId,
        FORM_MODE_NEW,
      );
      const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
      const transformData = transformToCoraData(formMetaDataPathLookup, {
        genreGroup: {
          genre_language_swe: {
            value: 'artistic-work_artistic-thesis',
            _language: 'swe',
          },
          genre_language_eng: {
            value: 'artistic-work_original-creative-work',
            _language: 'eng',
          },
        },
      });
      expect(transformData[0]).toStrictEqual(expected);
    });

    it('should take a form payload with group with same nameInData containing recordLinks with attributes', () => {
      const expected: DataGroup = {
        children: [
          {
            attributes: {
              language: 'swe',
            },
            children: [
              {
                name: 'linkedRecordType',
                value: 'nationalSubjectCategory',
              },
              {
                name: 'linkedRecordId',
                value: '1',
              },
            ],
            name: 'newRecordLink',
          },
          {
            attributes: {
              language: 'eng',
            },
            children: [
              {
                name: 'linkedRecordType',
                value: 'nationalSubjectCategory',
              },
              {
                name: 'linkedRecordId',
                value: '2',
              },
            ],
            name: 'newRecordLink',
          },
        ],
        name: 'recordLinkGroup',
      };
      const validationTypeId =
        'someValidationTypeForRepeatingRecordLinksNameInDataId';
      const formMetaData = createFormMetaData(
        dependencies,
        validationTypeId,
        FORM_MODE_NEW,
      );
      const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
      const transformData = transformToCoraData(formMetaDataPathLookup, {
        recordLinkGroup: {
          newRecordLink_language_swe: {
            value: '1',
            _language: 'swe',
          },
          newRecordLink_language_eng: {
            value: '2',
            _language: 'eng',
          },
        },
      });
      expect(transformData[0]).toStrictEqual(expected);
    });

    it('should take a form payload with group with same nameInData and variables', () => {
      const expected: DataGroup = {
        name: 'someRootNameInData',
        children: [
          {
            name: 'author',
            children: [
              {
                name: 'givenName',
                value: 'Egil',
              },
              {
                name: 'familyName',
                value: 'Swenning',
              },
            ],
            attributes: {
              language: 'swe',
            },
          },
          {
            name: 'author',
            children: [
              {
                name: 'givenName',
                value: 'Daniel',
              },
              {
                name: 'familyName',
                value: 'Flores',
              },
            ],
            attributes: {
              language: 'eng',
            },
          },
        ],
      };
      const validationTypeId =
        'someValidationTypeForRepeatingGroupsNameInDataId';
      const formMetaData = createFormMetaData(
        dependencies,
        validationTypeId,
        FORM_MODE_NEW,
      );
      const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);

      const transformData = transformToCoraData(formMetaDataPathLookup, {
        someRootNameInData: {
          author_language_swe: {
            givenName: {
              value: 'Egil',
            },
            familyName: {
              value: 'Swenning',
            },
            _language: 'swe',
          },
          author_language_eng: {
            givenName: {
              value: 'Daniel',
            },
            familyName: {
              value: 'Flores',
            },
            _language: 'eng',
          },
        },
      });
      expect(transformData[0]).toStrictEqual(expected);
    });

    it('should take a form payload with repeating groups', () => {
      const payload = {
        someNewMetadataGroupRepeatingGroupsNameInData: {
          someChildGroupNameInData: [
            {
              someNameInData: {
                value: 'Erik',
              },
            },
            {
              someNameInData: {
                value: 'Egil',
              },
            },
          ],
        },
      };
      const expected: DataGroup = {
        name: 'someNewMetadataGroupRepeatingGroupsNameInData',
        children: [
          {
            name: 'someChildGroupNameInData',
            repeatId: '0',
            children: [
              {
                name: 'someNameInData',
                value: 'Erik',
              },
            ],
          },
          {
            name: 'someChildGroupNameInData',
            repeatId: '1',
            children: [
              {
                name: 'someNameInData',
                value: 'Egil',
              },
            ],
          },
        ],
      };

      /**
       * Actual
       * {
       *   "children": [
       *     {
       *       "children": [
       *         {
       *           "name": "someNameInData",
       *           "repeatId": "0",
       *           "value": "Erik",
       *         },
       *         {
       *           "name": "someNameInData",
       *           "repeatId": "1",
       *           "value": "Egil",
       *         },
       *       ],
       *       "name": "someChildGroupNameInData",
       *     },
       *   ],
       *   "name": "someNewMetadataGroupRepeatingGroupsNameInData",
       * }
       *
       */
      const validationTypeId = 'someSimpleValidationTypeWithRepeatingGroupsId';
      const formMetaData = createFormMetaData(
        dependencies,
        validationTypeId,
        FORM_MODE_NEW,
      );
      const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
      const transformData = transformToCoraData(
        formMetaDataPathLookup,
        payload,
      );
      expect(transformData[0]).toStrictEqual(expected);
    });
    describe('remove empty values', () => {
      it('should remove empty variables', () => {
        const payload = {
          someParentGroupNameInData: {
            someNameInData1: {
              value: '',
            },
            someNameInData2: {
              value: null,
            },
          },
        };

        const expected: DataGroup = {
          name: 'someParentGroupNameInData',
          children: [],
        };

        const formMetaDataPathLookup = {
          someParentGroupNameInData: {
            name: 'someParentGroupNameInData',
            type: 'group',
            repeat: { repeatMin: 1, repeatMax: 1 },
          },
          'someParentGroupNameInData.someNameInData1': {
            name: 'someNameInData',
            type: 'textVariable',
            repeat: { repeatMin: 0, repeatMax: 1 },
          },
          'someParentGroupNameInData.someNameInData2': {
            name: 'someNameInData',
            type: 'textVariable',
            repeat: { repeatMin: 0, repeatMax: 1 },
          },
        } satisfies Record<string, FormMetaData>;

        const transformData = transformToCoraData(
          formMetaDataPathLookup,
          payload,
        );
        expect(transformData[0]).toStrictEqual(expected);
      });

      it('should remove empty optional groups', () => {
        const payload = {
          someParentGroupNameInData: {
            someChildGroupNameInData: {
              someNameInData1: {
                value: '',
              },
            },
          },
        };

        const expected: DataGroup = {
          name: 'someParentGroupNameInData',
          children: [],
        };

        const formMetaDataPathLookup = {
          someParentGroupNameInData: {
            name: 'someParentGroupNameInData',
            type: 'group',
            repeat: { repeatMin: 1, repeatMax: 1 },
          },
          'someParentGroupNameInData.someChildGroupNameInData': {
            name: 'someChildGroupNameInData',
            type: 'group',
            repeat: { repeatMin: 0, repeatMax: 1 },
          },
          'someParentGroupNameInData.someChildGroupNameInData.someNameInData1':
            {
              name: 'someNameInData',
              type: 'textVariable',
              repeat: { repeatMin: 0, repeatMax: 1 },
            },
        } satisfies Record<string, FormMetaData>;

        const transformData = transformToCoraData(
          formMetaDataPathLookup,
          payload,
        );
        expect(transformData[0]).toStrictEqual(expected);
      });
    });

    it('should take a form payload with repeating groups2', () => {
      const expected: DataGroup = {
        children: [
          {
            attributes: {
              languageTerm: 'akk',
            },
            children: [
              {
                name: 'mainTitle',
                value: 'asdasdasd',
              },
            ],
            name: 'title',
          },
          {
            children: [
              {
                attributes: {
                  type: 'outputType',
                },
                name: 'genre',
                value: 'publication_newspaper-article',
              },
            ],
            name: 'outputType',
          },
          {
            name: 'domain',
            value: 'hh',
          },
        ],
        name: 'divaOutput',
      };
      const validationTypeId = 'preprint';
      const formMetaData = createFormMetaData(
        dependencies,
        validationTypeId,
        FORM_MODE_NEW,
      );
      const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
      const transformData = transformToCoraData(formMetaDataPathLookup, {
        divaOutput: {
          title: {
            _languageTerm: 'akk',
            mainTitle: {
              value: 'asdasdasd',
            },
          },
          outputType: {
            genre_type_outputType: {
              value: 'publication_newspaper-article',
              _type: 'outputType',
            },
          },
          domain: {
            value: 'hh',
          },
        },
      });
      expect(transformData[0]).toStrictEqual(expected);
    });

    it('should take a form payload with required group with required and repeating group', () => {
      const expected: DataGroup = {
        name: 'output',
        children: [
          {
            name: 'language',
            children: [
              {
                name: 'languageTerm',
                repeatId: '0',
                value: 'ach',
                attributes: {
                  type: 'code',
                  authority: 'iso639-2b',
                },
              },
            ],
          },
        ],
      };
      const validationTypeId = 'someValidationTypeForRequiredAndRepeatingId';
      const formMetaData = createFormMetaData(
        dependencies,
        validationTypeId,
        FORM_MODE_NEW,
      );
      const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
      const transformData = transformToCoraData(formMetaDataPathLookup, {
        output: {
          language: {
            'languageTerm_authority_iso639-2b_type_code': [
              {
                value: 'ach',
                _type: 'code',
                _authority: 'iso639-2b',
              },
            ],
          },
        },
      });

      expect(transformData[0]).toStrictEqual(expected);
    });

    it('should ignore fields not present in metadata', () => {
      const lookup: Record<string, FormMetaData> = {
        'root.child': {
          name: 'child',
          type: 'textVariable',
          repeat: { repeatMin: 1, repeatMax: 1 },
        },
        root: {
          name: 'root',
          type: 'group',
          repeat: { repeatMin: 1, repeatMax: 1 },
        },
      };

      const payload = {
        root: {
          child: {
            value: 'some value',
          },
          someUnknownField: {
            value: 'some other value',
          },
        },
      };

      const result = transformToCoraData(lookup, payload);

      expect(result).toStrictEqual([
        {
          name: 'root',
          children: [{ name: 'child', value: 'some value' }],
        },
      ]);
    });
  });

  it('transforms a binary record', () => {
    const formMetaDataPathLookup = {
      'binary.master.master': {
        name: 'master',
        type: 'resourceLink',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
      'binary.master': {
        name: 'master',
        type: 'group',
        repeat: {
          repeatMin: 0,
          repeatMax: 1,
        },
      },
      binary: {
        name: 'binary',
        type: 'group',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
    } as Record<string, FormMetaData>;

    const payload = {
      binary: {
        _type: 'generic',
        master: [
          {
            master: {
              name: 'master',
              mimeType: 'image/webp',
              id: 'binary:8016649047742459',
            },
          },
        ],
      },
    };

    const result = transformToCoraData(formMetaDataPathLookup, payload);

    expect(result).toStrictEqual([
      {
        name: 'binary',
        children: [
          {
            name: 'master',
            children: [
              {
                name: 'master',
                children: [
                  { name: 'linkedRecordType', value: 'binary' },
                  { name: 'linkedRecordId', value: 'binary:8016649047742459' },
                  {
                    name: 'mimeType',
                    value: 'image/webp',
                  },
                ],
              },
            ],
          },
        ],
        attributes: { type: 'generic' },
      },
    ]);
  });

  describe('removeAttributeFromName', () => {
    it('does not remove anything if no attribute', () => {
      const actual = removeAttributeFromName('subject', { language: 'eng' });
      expect(actual).toStrictEqual('subject');
    });

    it('does remove attribute if it exist', () => {
      const actual = removeAttributeFromName('subject_language_eng', {
        language: 'eng',
      });
      expect(actual).toStrictEqual('subject');
    });
  });

  describe('isRepeatingVariable', () => {
    it('returns true if repeating', () => {
      const actual = isRepeating([
        { value: 'firstValue', name: 'someNameInData' },
      ]);
      expect(actual).toBe(true);
    });

    it('returns false if not repeating', () => {
      const actual = isRepeating({
        value: 'firstValue',
        name: 'someNameInData',
      });
      expect(actual).toBe(false);
    });
  });

  describe('isVariable', () => {
    it('returns true if variable', () => {
      const actual = isVariable({ value: 'firstValue', name: 'someVariable' });
      expect(actual).toBe(true);
    });

    it('returns false if group', () => {
      const actual = isVariable({
        name: 'someGroup',
        children: [
          {
            name: 'someName',
            value: 'firstValue',
          },
        ],
      });
      expect(actual).toBe(false);
    });
  });
});
