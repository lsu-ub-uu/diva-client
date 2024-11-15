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

import { createFormMetaData, createMetaDataFromChildReference } from '../formMetadata';
import { FormMetaData } from '../formDefinition';
import { createFormMetaDataPathLookup } from '../../utils/structs/metadataPathLookup';
import { listToPool } from '../../utils/structs/listToPool';
import {
  BFFGuiElement,
  BFFLoginUnit,
  BFFLoginWebRedirect,
  BFFMetadata,
  BFFMetadataGroup,
  BFFMetadataItemCollection,
  BFFPresentation,
  BFFPresentationGroup,
  BFFPresentationSurroundingContainer,
  BFFRecordType,
  BFFSearch,
  BFFText,
  BFFValidationType
} from '../../config/bffTypes';
import {
  authorGroup,
  authorGroup2,
  domainCollectionVar,
  familyNameTextVar,
  genreCollectionVar,
  genreOtherCollectionVar,
  givenNameTextVar,
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
  someMetadataChildGroup,
  someMetadataRecordLink,
  someMetadataTextVariable,
  someNewMetadataGroupRepeatingCollectionNameInDataGroup,
  someNewMetadataGroupRepeatingGroupsNameInDataGroup,
  someNewMetadataGroupRepeatingRecordLinksNameInDataGroup,
  someNewRecordLinkId,
  someNewSimpleMetadataGroup,
  someOtherNewRecordLinkId,
  someRecordInfo,
  someSimpleValidationTypeData,
  someValidationTypeForRepeatingCollectionsNameInDataId,
  someValidationTypeForRepeatingGroupsNameInDataId,
  someValidationTypeForRepeatingRecordLinksNameInDataId,
  titleGroup,
  typeOutputTypeCollectionVar,
  someValidationTypeForRepeatingTitleInfoId,
  someNewMetadataGroupRepeatingTitleInfoNameInDataGroup,
  pSomeNewMetadataGroupRepeatingTitleInfoNameInDataGroup,
  someNewMetadataGroupTitleInfoGroup,
  pSomeNewMetadataGroupTitleInfoPGroup,
  pSomeNewMetadataGroupTitleInfoAlternativePGroup,
  someNewMetadataGroupTitleInfoAlternativeGroup,
  typeCollVariable,
  typeItemCollection,
  typeCollectionItemAlternative,
  someMainTitleTitleInfoATextVariable,
  pSomeMainTitleTitleInfoTextVariable,
  newLangCollVariable,
  newLangItemCollection,
  newLangItemCollectionItemEng,
  newLangItemCollectionItemSwe
} from '../../__mocks__/form/bffMock';
import { Lookup } from '../../utils/structs/lookup';
import { Dependencies } from '../formDefinitionsDep';

describe('formMetadata', () => {
  let validationTypePool: Lookup<string, BFFValidationType>;
  let metadataPool: Lookup<string, BFFMetadata | BFFMetadataItemCollection>;
  let presentationPool: Lookup<
    string,
    BFFPresentation | BFFPresentationGroup | BFFPresentationSurroundingContainer | BFFGuiElement
  >;
  let recordTypePool: Lookup<string, BFFRecordType>;
  let textPool: Lookup<string, BFFText>;
  let searchPool: Lookup<string, BFFSearch>;
  let loginUnitPool: Lookup<string, BFFLoginUnit>;
  let loginPool: Lookup<string, BFFLoginWebRedirect>;

  let dependencies: Dependencies;
  beforeEach(() => {
    validationTypePool = listToPool<BFFValidationType>([
      someSimpleValidationTypeData,
      newNationSubjectCategoryValidationType,
      someValidationTypeForRepeatingCollectionsNameInDataId,
      someValidationTypeForRepeatingGroupsNameInDataId,
      someValidationTypeForRepeatingRecordLinksNameInDataId,
      someValidationTypeForRepeatingTitleInfoId
    ]);
    metadataPool = listToPool<BFFMetadata | BFFMetadataGroup>([
      someMetadataTextVariable,
      someRecordInfo,
      someMetadataChildGroup,
      someMetadataRecordLink,
      someNewSimpleMetadataGroup,
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
      someNewMetadataGroupRepeatingTitleInfoNameInDataGroup,
      someNewMetadataGroupTitleInfoAlternativeGroup,
      typeCollVariable,
      typeItemCollection,
      typeCollectionItemAlternative,
      someMainTitleTitleInfoATextVariable,
      someNewMetadataGroupTitleInfoGroup,
      newLangCollVariable,
      newLangItemCollection,
      newLangItemCollectionItemEng,
      newLangItemCollectionItemSwe
    ]);
    presentationPool = listToPool<
      BFFPresentation | BFFPresentationGroup | BFFPresentationSurroundingContainer | BFFGuiElement
    >([
      pNewNationSubjectCategoryMetadataGroup,
      pNewNationSubjectCategorySweVar,
      pNewNationSubjectCategoryEngVar,
      pSomeNewMetadataGroupRepeatingTitleInfoNameInDataGroup,
      pSomeNewMetadataGroupTitleInfoPGroup,
      pSomeNewMetadataGroupTitleInfoAlternativePGroup,
      pSomeMainTitleTitleInfoTextVariable
    ]);
    recordTypePool = listToPool<BFFRecordType>([]);
    textPool = listToPool<BFFText>([]);
    searchPool = listToPool<BFFSearch>([]);
    loginUnitPool = listToPool<BFFLoginUnit>([]);
    loginPool = listToPool<BFFLoginWebRedirect>([]);

    dependencies = {
      validationTypePool,
      metadataPool,
      presentationPool,
      recordTypePool,
      textPool,
      searchPool,
      loginUnitPool,
      loginPool
    };
  });
  it('should return form meta data for a given validation type', () => {
    const FORM_MODE_NEW = 'create';
    const validationTypeId = 'someSimpleValidationTypeId';
    const formMetaData = createFormMetaData(dependencies, validationTypeId, FORM_MODE_NEW);

    const expected: FormMetaData = {
      name: 'someNewMetadataGroupNameInData',
      type: 'group',
      repeat: {
        repeatMin: 1,
        repeatMax: 1
      },
      children: [
        {
          name: 'someNameInData',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 3
          }
        },
        {
          name: 'someChildGroupNameInData',
          type: 'group',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          },
          children: [
            {
              name: 'someNameInData',
              type: 'textVariable',
              repeat: {
                repeatMin: 1,
                repeatMax: 1
              }
            }
          ]
        },
        {
          name: 'nationalSubjectCategory',
          repeat: {
            repeatMax: 1,
            repeatMin: 1
          },
          type: 'recordLink',
          linkedRecordType: 'nationalSubjectCategory'
        }
      ]
    };

    const expectedMetadataLookup = {
      someNewMetadataGroupNameInData: {
        name: 'someNewMetadataGroupNameInData',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'group'
      },
      'someNewMetadataGroupNameInData.nationalSubjectCategory': {
        name: 'nationalSubjectCategory',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'recordLink',
        linkedRecordType: 'nationalSubjectCategory'
      },
      'someNewMetadataGroupNameInData.someChildGroupNameInData': {
        name: 'someChildGroupNameInData',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'group'
      },
      'someNewMetadataGroupNameInData.someChildGroupNameInData.someNameInData': {
        name: 'someNameInData',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'textVariable'
      },
      'someNewMetadataGroupNameInData.someNameInData': {
        name: 'someNameInData',
        repeat: {
          repeatMax: 3,
          repeatMin: 1
        },
        type: 'textVariable'
      }
    };

    expect(formMetaData).toStrictEqual(expected);
    const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
    expect(formMetaDataPathLookup).toStrictEqual(expectedMetadataLookup);
  });
  it('should return form meta data for a given validation type with variables with same nameInData and attributes', () => {
    const FORM_MODE_NEW = 'create';
    const validationTypeId = 'nationalSubjectCategory';
    const formMetaData = createFormMetaData(dependencies, validationTypeId, FORM_MODE_NEW);

    const expected: FormMetaData = {
      children: [
        {
          name: 'subject',
          repeat: {
            repeatMax: 1,
            repeatMin: 1
          },
          type: 'textVariable',
          attributes: { language: 'swe' }
        },
        {
          name: 'subject',
          repeat: {
            repeatMax: 1,
            repeatMin: 1
          },
          type: 'textVariable',
          attributes: { language: 'eng' }
        }
      ],
      name: 'nationalSubjectCategory',
      repeat: {
        repeatMax: 1,
        repeatMin: 1
      },
      type: 'group'
    };

    const expectedMetadataLookup = {
      nationalSubjectCategory: {
        name: 'nationalSubjectCategory',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'group'
      },
      'nationalSubjectCategory.subject_language_swe': {
        name: 'subject',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        attributes: {
          language: 'swe'
        },
        type: 'textVariable'
      },
      'nationalSubjectCategory.subject_language_eng': {
        name: 'subject',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        attributes: {
          language: 'eng'
        },
        type: 'textVariable'
      }
    };

    expect(formMetaData).toStrictEqual(expected);
    const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
    expect(formMetaDataPathLookup).toStrictEqual(expectedMetadataLookup);
  });

  it('should return form meta data for a given validation type with collVar with same nameInData and attributes', () => {
    const FORM_MODE_NEW = 'create';
    const validationTypeId = 'someValidationTypeForRepeatingCollectionsNameInDataId';
    const formMetaData = createFormMetaData(dependencies, validationTypeId, FORM_MODE_NEW);

    const expected: FormMetaData = {
      children: [
        {
          attributes: {
            language: 'swe'
          },
          name: 'genre',
          repeat: {
            repeatMax: 1,
            repeatMin: 1
          },
          type: 'collectionVariable'
        },
        {
          attributes: {
            language: 'eng'
          },
          name: 'genre',
          repeat: {
            repeatMax: 1,
            repeatMin: 1
          },
          type: 'collectionVariable'
        }
      ],
      name: 'genreGroup',
      repeat: {
        repeatMax: 1,
        repeatMin: 1
      },
      type: 'group'
    };

    const expectedMetadataLookup = {
      genreGroup: {
        name: 'genreGroup',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'group'
      },
      'genreGroup.genre_language_eng': {
        attributes: {
          language: 'eng'
        },
        name: 'genre',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'collectionVariable'
      },
      'genreGroup.genre_language_swe': {
        attributes: {
          language: 'swe'
        },
        name: 'genre',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'collectionVariable'
      }
    };

    expect(formMetaData).toStrictEqual(expected);
    const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
    expect(formMetaDataPathLookup).toStrictEqual(expectedMetadataLookup);
  });

  it('should return form meta data for a given validation type with recordLinks with same nameInData and attributes', () => {
    const FORM_MODE_NEW = 'create';
    const validationTypeId = 'someValidationTypeForRepeatingRecordLinksNameInDataId';
    const formMetaData = createFormMetaData(dependencies, validationTypeId, FORM_MODE_NEW);
    const expected: FormMetaData = {
      name: 'recordLinkGroup',
      type: 'group',
      repeat: {
        repeatMin: 1,
        repeatMax: 1
      },
      children: [
        {
          name: 'newRecordLink',
          type: 'recordLink',
          attributes: {
            language: 'swe'
          },
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          },
          linkedRecordType: 'nationalSubjectCategory'
        },
        {
          name: 'newRecordLink',
          type: 'recordLink',
          attributes: {
            language: 'eng'
          },
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          },
          linkedRecordType: 'nationalSubjectCategory'
        }
      ]
    };

    const expectedMetadataLookup = {
      recordLinkGroup: {
        name: 'recordLinkGroup',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'group'
      },
      'recordLinkGroup.newRecordLink_language_swe': {
        attributes: {
          language: 'swe'
        },
        linkedRecordType: 'nationalSubjectCategory',
        name: 'newRecordLink',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'recordLink'
      },
      'recordLinkGroup.newRecordLink_language_eng': {
        attributes: {
          language: 'eng'
        },
        linkedRecordType: 'nationalSubjectCategory',
        name: 'newRecordLink',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'recordLink'
      }
    };

    expect(formMetaData).toStrictEqual(expected);
    const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
    expect(formMetaDataPathLookup).toStrictEqual(expectedMetadataLookup);
  });

  it('should return form meta data for a given validation type with groups with same nameInData and attributes', () => {
    const FORM_MODE_NEW = 'create';
    const validationTypeId = 'someValidationTypeForRepeatingGroupsNameInDataId';
    const formMetaData = createFormMetaData(dependencies, validationTypeId, FORM_MODE_NEW);

    const expected: FormMetaData = {
      children: [
        {
          attributes: {
            language: 'swe'
          },
          children: [
            {
              name: 'givenName',
              repeat: {
                repeatMax: 1,
                repeatMin: 1
              },
              type: 'textVariable'
            },
            {
              name: 'familyName',
              repeat: {
                repeatMax: 1,
                repeatMin: 1
              },
              type: 'textVariable'
            }
          ],
          name: 'author',
          repeat: {
            repeatMax: 1,
            repeatMin: 1
          },
          type: 'group'
        },
        {
          attributes: {
            language: 'eng'
          },
          children: [
            {
              name: 'givenName',
              repeat: {
                repeatMax: 1,
                repeatMin: 1
              },
              type: 'textVariable'
            },
            {
              name: 'familyName',
              repeat: {
                repeatMax: 1,
                repeatMin: 1
              },
              type: 'textVariable'
            }
          ],
          name: 'author',
          repeat: {
            repeatMax: 1,
            repeatMin: 1
          },
          type: 'group'
        }
      ],
      name: 'someRootNameInData',
      repeat: {
        repeatMax: 1,
        repeatMin: 1
      },
      type: 'group'
    };

    const expectedMetadataLookup = {
      someRootNameInData: {
        name: 'someRootNameInData',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'group'
      },
      'someRootNameInData.author_language_eng': {
        attributes: {
          language: 'eng'
        },
        name: 'author',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'group'
      },
      'someRootNameInData.author_language_eng.familyName': {
        name: 'familyName',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'textVariable'
      },
      'someRootNameInData.author_language_eng.givenName': {
        name: 'givenName',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'textVariable'
      },
      'someRootNameInData.author_language_swe': {
        attributes: {
          language: 'swe'
        },
        name: 'author',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'group'
      },
      'someRootNameInData.author_language_swe.familyName': {
        name: 'familyName',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'textVariable'
      },
      'someRootNameInData.author_language_swe.givenName': {
        name: 'givenName',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'textVariable'
      }
    };

    expect(formMetaData).toStrictEqual(expected);
    const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
    expect(formMetaDataPathLookup).toStrictEqual(expectedMetadataLookup);
  });

  it('should return form meta data for a given validation type with groups with same nameInData and one has attributes', () => {
    const FORM_MODE_NEW = 'create';
    const validationTypeId = 'divaOutputSwepub';
    const formMetaData = createFormMetaData(dependencies, validationTypeId, FORM_MODE_NEW);

    const expected: FormMetaData = {
      name: 'output',
      type: 'group',
      repeat: {
        repeatMin: 1,
        repeatMax: 1
      },
      children: [
        {
          name: 'titleInfo',
          type: 'group',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          },
          children: [
            {
              name: 'title',
              type: 'textVariable',
              repeat: {
                repeatMin: 1,
                repeatMax: 1
              }
            }
          ]
        },
        {
          name: 'titleInfo',
          type: 'group',
          attributes: {
            type: 'alternative'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          },
          children: [
            {
              name: 'title',
              type: 'textVariable',
              repeat: {
                repeatMin: 1,
                repeatMax: 1
              }
            }
          ]
        }
      ]
    };

    const expectedMetadataLookup = {
      output: {
        name: 'output',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'group'
      },
      'output.titleInfo': {
        name: 'titleInfo',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'group'
      },
      'output.titleInfo.title': {
        name: 'title',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'textVariable'
      },
      'output.titleInfo_type_alternative': {
        attributes: {
          type: 'alternative'
        },
        name: 'titleInfo',
        repeat: {
          repeatMax: 1,
          repeatMin: 0
        },
        type: 'group'
      },
      'output.titleInfo_type_alternative.title': {
        name: 'title',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'textVariable'
      }
    };

    expect(formMetaData).toStrictEqual(expected);
    const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
    expect(formMetaDataPathLookup).toStrictEqual(expectedMetadataLookup);
  });

  describe('createMetaDataFromChildReference', () => {
    it('creates metadata from child references', () => {
      const actual = createMetaDataFromChildReference(
        {
          childId: 'someNewMetadataGroup2Id',
          repeatMax: '1',
          repeatMin: '1'
        },
        dependencies.metadataPool
      );
      expect(actual).toStrictEqual({
        name: 'someNewMetadataGroupNameInData',
        type: 'group',
        repeat: {
          repeatMin: 1,
          repeatMax: 1
        },
        children: [
          {
            name: 'someNameInData',
            type: 'textVariable',
            repeat: {
              repeatMin: 1,
              repeatMax: 3
            }
          },
          {
            name: 'someChildGroupNameInData',
            type: 'group',
            repeat: {
              repeatMin: 1,
              repeatMax: 1
            },
            children: [
              {
                name: 'someNameInData',
                type: 'textVariable',
                repeat: {
                  repeatMin: 1,
                  repeatMax: 1
                }
              }
            ]
          },
          {
            name: 'nationalSubjectCategory',
            type: 'recordLink',
            repeat: {
              repeatMin: 1,
              repeatMax: 1
            },
            linkedRecordType: 'nationalSubjectCategory'
          }
        ]
      });
    });
  });
});
