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

import recordManuscript from '../../__mocks__/coraRecordManuscript.json';
import recordManuscriptWithoutCreatedAndUpdates from '../../__mocks__/coraRecordManuscriptPublicWithoutSensitiveData.json';
import recordManuscriptWithSameNameInData from '../../__mocks__/coraRecordManuscriptWithSameNameInData.json';
import {
  addAttributesToArray,
  hasCoraAttributes,
  hasSameNameInDatas,
  isDataAtomic,
  isDataGroup,
  isRecordLink,
  isRepeating,
  transformObjectAttributes,
  transformRecord,
  traverseDataGroup,
  updateGroupWithPossibleNewNameWithAttribute,
  addAttributesToNameForRecords,
  getNamesFromChildren,
  getSameNameInDatas,
  findSearchPart
} from '../transformRecord';
import { Attributes, DataGroup, RecordWrapper } from '../../utils/cora-data/CoraData';
import { Lookup } from '../../utils/structs/lookup';
import {
  BFFGuiElement,
  BFFLoginUnit,
  BFFLoginWebRedirect,
  BFFMetadata,
  BFFPresentation,
  BFFPresentationGroup,
  BFFPresentationSurroundingContainer,
  BFFRecordType,
  BFFSearch,
  BFFText,
  BFFValidationType
} from '../bffTypes';
import { Dependencies } from '../../formDefinition/formDefinitionsDep';
import { listToPool } from '../../utils/structs/listToPool';
import {
  someAlternativeTitleMetadataChildGroup,
  someMainTitleTextVariable,
  someManuscriptEditMetadataGroup,
  someManuscriptValidationTypeData,
  someSubTitleTextVariable,
  nationSubjectCategoryValidationTypeData,
  someValidationTypeForRepeatingTitleInfoId,
  someNewMetadataGroupRepeatingTitleInfoNameInDataGroup,
  someNewMetadataGroupTitleInfoGroup,
  someNewMetadataGroupTitleInfoAlternativeGroup,
  newNationSubjectCategoryMetadataSubjectEngLangCollVariable,
  pSomeNewMetadataGroupRepeatingTitleInfoNameInDataGroup,
  pSomeNewMetadataGroupTitleInfoPGroup,
  pSomeNewMetadataGroupTitleInfoAlternativePGroup,
  someMainTitleTitleInfoATextVariable,
  pSomeMainTitleTitleInfoTextVariable,
  typeCollVariable,
  typeItemCollection,
  typeCollectionItemAlternative,
  newLangCollVariable,
  newLangItemCollection,
  newLangItemCollectionItemEng,
  newLangItemCollectionItemSwe
} from '../../__mocks__/form/bffMock';
import { FormMetaData } from '../../formDefinition/formDefinition';

describe('transformRecord', () => {
  let validationTypePool: Lookup<string, BFFValidationType>;
  let metadataPool: Lookup<string, BFFMetadata>;
  let presentationPool: Lookup<
    string,
    BFFPresentation | BFFPresentationGroup | BFFPresentationSurroundingContainer | BFFGuiElement
  >;
  let dependencies: Dependencies;

  beforeEach(() => {
    validationTypePool = listToPool<BFFValidationType>([
      someManuscriptValidationTypeData,
      nationSubjectCategoryValidationTypeData,
      someValidationTypeForRepeatingTitleInfoId
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
      newLangItemCollectionItemSwe
    ]);
    presentationPool = listToPool<
      BFFPresentation | BFFPresentationGroup | BFFPresentationSurroundingContainer | BFFGuiElement
    >([
      pSomeNewMetadataGroupRepeatingTitleInfoNameInDataGroup,
      pSomeNewMetadataGroupTitleInfoPGroup,
      pSomeNewMetadataGroupTitleInfoAlternativePGroup,
      pSomeMainTitleTitleInfoTextVariable
    ]);

    dependencies = {
      textPool: listToPool<BFFText>([]),
      validationTypePool,
      metadataPool,
      presentationPool,
      recordTypePool: listToPool<BFFRecordType>([]),
      searchPool: listToPool<BFFSearch>([]),
      loginUnitPool: listToPool<BFFLoginUnit>([]),
      loginPool: listToPool<BFFLoginWebRedirect>([])
    };
  });
  describe('transformRecord', () => {
    it('should return a record', () => {
      const transformData = transformRecord(dependencies, recordManuscript as RecordWrapper);
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
            updatedBy: 'coraUser:490742519075086'
          },
          {
            updateAt: '2023-10-18T09:09:13.554736Z',
            updatedBy: '161616'
          },
          {
            updateAt: '2023-10-26T12:33:22.260532Z',
            updatedBy: '161616'
          },
          {
            updateAt: '2023-10-26T12:35:28.748398Z',
            updatedBy: '161616'
          },
          {
            updateAt: '2023-10-26T12:35:40.545698Z',
            updatedBy: '161616'
          },
          {
            updateAt: '2023-10-26T12:35:52.293623Z',
            updatedBy: '161616'
          }
        ],
        data: {
          divaOutput: {
            title: {
              mainTitle: {
                value: 'aaaaaa'
              },
              _language: 'kal'
            },
            alternativeTitle: [
              {
                mainTitle: {
                  value: 'bbbbb'
                },
                subTitle: [
                  {
                    value: 'subTitle1'
                  }
                ],
                _language: 'epo',
                _titleType: 'alternativeTitle'
              }
            ],
            nationalSubjectCategory: [
              {
                value: 'nationalSubjectCategory:6325370460697648'
              }
            ],
            abstract: [
              {
                value: 'hej!',
                _language: 'fao'
              }
            ]
          }
        }
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a record with repeating nameInDatas for groups having one with attributes', () => {
      const transformData = transformRecord(
        dependencies,
        recordManuscriptWithSameNameInData as RecordWrapper
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
            updatedBy: '161616'
          },
          {
            updateAt: '2024-09-13T11:49:54.085586Z',
            updatedBy: '161616'
          },
          {
            updateAt: '2024-09-16T08:00:42.892622Z',
            updatedBy: '161616'
          }
        ],
        data: {
          output: {
            titleInfo: {
              _lang: 'ady',
              title: {
                value: 'EN utmärkt titel'
              }
            },
            titleInfo_type_alternative: [
              {
                _lang: 'amh',
                _type: 'alternative',
                title: {
                  value: 'EN utmärkt alternativ titel'
                }
              }
            ]
          }
        }
      };
      expect(transformData).toStrictEqual(expected);
    });

    // it('should return a record with repeating nameInDatas for textVar having one with attributes', () => {
    //   const transformData = transformRecord(
    //     dependencies,
    //     recordManuscriptWithSameNameInData as RecordWrapper
    //   );
    //   const expected = {
    //     id: 'divaOutputSwepub:2087392797647370',
    //     recordType: 'divaOutputSwepub',
    //     validationType: 'divaOutputSwepub',
    //     createdAt: '2024-09-13T11:49:37.288927Z',
    //     createdBy: '161616',
    //     userRights: ['read', 'update', 'index', 'delete'],
    //     updated: [
    //       {
    //         updateAt: '2024-09-13T11:49:37.288927Z',
    //         updatedBy: '161616'
    //       },
    //       {
    //         updateAt: '2024-09-13T11:49:54.085586Z',
    //         updatedBy: '161616'
    //       },
    //       {
    //         updateAt: '2024-09-16T08:00:42.892622Z',
    //         updatedBy: '161616'
    //       }
    //     ],
    //     data: {
    //       output: {
    //         titleInfo: [
    //           {
    //             _lang: 'ady',
    //             title: {
    //               value: 'EN utmärkt titel'
    //             }
    //           }
    //         ],
    //         titleInfo_type_alternative: [
    //           {
    //             _lang: 'amh',
    //             _type: 'alternative',
    //             title: {
    //               value: 'EN utmärkt alternativ titel'
    //             }
    //           }
    //         ]
    //       }
    //     }
    //   };
    //   expect(transformData).toStrictEqual(expected);
    // });

    it('should be able to return a record without created and updated data', () => {
      const transformData = transformRecord(
        dependencies,
        recordManuscriptWithoutCreatedAndUpdates as RecordWrapper
      );
      const expected = {
        id: 'divaOutput:519333261463755',
        recordType: 'divaOutput',
        validationType: 'manuscript',
        userRights: ['read', 'update', 'index', 'delete'],
        updated: [],
        data: {
          divaOutput: {
            title: {
              mainTitle: {
                value: 'aaaaaa'
              },
              _language: 'kal'
            },
            alternativeTitle: [
              {
                mainTitle: {
                  value: 'bbbbb'
                },
                subTitle: [
                  {
                    value: 'subTitle1'
                  }
                ],
                _language: 'epo',
                _titleType: 'alternativeTitle'
              }
            ],
            nationalSubjectCategory: [
              {
                value: 'nationalSubjectCategory:6325370460697648'
              }
            ],
            abstract: [
              {
                value: 'hej!',
                _language: 'fao'
              }
            ]
          }
        }
      };
      expect(transformData).toStrictEqual(expected);
    });
  });

  describe('traverseDataGroup', () => {
    it('should return a root group', () => {
      const test = { name: 'divaOutput', children: [] };
      const transformData = traverseDataGroup(test);
      const expected = {
        divaOutput: {}
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a root group with a dataAtomic child', () => {
      const test = {
        name: 'divaOutput',
        children: [
          {
            name: 'title',
            value: 'testTitleVal'
          }
        ]
      };
      const transformData = traverseDataGroup(test);
      const expected = {
        divaOutput: {
          title: {
            value: 'testTitleVal'
          }
        }
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a root group with a childGroup with atomic children', () => {
      const test = {
        name: 'divaOutput',
        children: [
          {
            name: 'childGroup',
            children: [
              {
                name: 'title',
                value: 'testTitleVal'
              }
            ]
          }
        ]
      };
      const transformData = traverseDataGroup(test);
      const expected = {
        divaOutput: {
          childGroup: {
            title: {
              value: 'testTitleVal'
            }
          }
        }
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a root group with two dataAtomic children', () => {
      const test = {
        name: 'divaOutput',
        children: [
          {
            name: 'title',
            value: 'testTitleVal'
          },
          {
            name: 'age',
            value: '12'
          }
        ]
      };
      const transformData = traverseDataGroup(test);
      const expected = {
        divaOutput: {
          title: {
            value: 'testTitleVal'
          },
          age: {
            value: '12'
          }
        }
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a root group with repeating children', () => {
      const test = {
        name: 'divaOutput',
        children: [
          {
            name: 'exampleNumberVar',
            value: '12.99',
            repeatId: '0'
          },
          {
            name: 'exampleNumberVar',
            value: '1.34',
            repeatId: '1'
          },
          {
            name: 'exampleNumberVarTwo',
            value: '99.00'
          }
        ]
      };
      const transformData = traverseDataGroup(test as DataGroup);
      const expected = {
        divaOutput: {
          exampleNumberVar: [
            {
              value: '12.99'
            },
            {
              value: '1.34'
            }
          ],
          exampleNumberVarTwo: {
            value: '99.00'
          }
        }
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a root group with repeating children with attributes', () => {
      const test = {
        name: 'divaOutput',
        children: [
          {
            name: 'exampleNumberVar',
            value: '12.99',
            repeatId: '0',
            attributes: {
              language: 'kal'
            }
          },
          {
            name: 'exampleNumberVar',
            value: '1.34',
            repeatId: '1',
            attributes: {
              language: 'eng'
            }
          }
        ]
      };
      const transformData = traverseDataGroup(test as DataGroup);
      const expected = {
        divaOutput: {
          exampleNumberVar: [
            {
              value: '12.99',
              _language: 'kal'
            },
            {
              value: '1.34',
              _language: 'eng'
            }
          ]
        }
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a root group with two different repeating children', () => {
      const test = {
        name: 'divaOutput',
        children: [
          {
            name: 'exampleNumberVar',
            value: '12.99',
            repeatId: '0'
          },
          {
            name: 'exampleNumberVar',
            value: '1.34',
            repeatId: '1'
          },
          {
            name: 'exampleNumberVarTwo',
            value: '99.00',
            repeatId: '0'
          },
          {
            name: 'exampleNumberVarTwo',
            value: '101.00',
            repeatId: '1'
          }
        ]
      };
      const transformData = traverseDataGroup(test as DataGroup);
      const expected = {
        divaOutput: {
          exampleNumberVar: [
            {
              value: '12.99'
            },
            {
              value: '1.34'
            }
          ],
          exampleNumberVarTwo: [
            {
              value: '99.00'
            },
            {
              value: '101.00'
            }
          ]
        }
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a root group with a repeating childGroup with atomic children', () => {
      const test = {
        name: 'divaOutput',
        children: [
          {
            name: 'childGroup',
            repeatId: '0',
            children: [
              {
                name: 'title',
                value: 'testTitleVal1'
              }
            ]
          },
          {
            name: 'childGroup',
            repeatId: '1',
            children: [
              {
                name: 'title',
                value: 'testTitleVal2'
              }
            ]
          }
        ]
      };
      const transformData = traverseDataGroup(test);
      const expected = {
        divaOutput: {
          childGroup: [
            {
              title: {
                value: 'testTitleVal1'
              }
            },
            {
              title: {
                value: 'testTitleVal2'
              }
            }
          ]
        }
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a root group with a non-repeating RecordLink', () => {
      const test = {
        name: 'divaOutput',
        children: [
          {
            name: 'nationalSubjectCategory',
            children: [
              {
                name: 'linkedRecordType',
                value: 'nationalSubjectCategory'
              },
              {
                name: 'linkedRecordId',
                value: 'nationalSubjectCategory:6325370460697648'
              }
            ]
          }
        ]
      };
      const transformData = traverseDataGroup(test);
      const expected = {
        divaOutput: {
          nationalSubjectCategory: {
            value: 'nationalSubjectCategory:6325370460697648'
          }
        }
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a root group with a repeating RecordLinks having attributes', () => {
      const test = {
        name: 'divaOutput',
        children: [
          {
            repeatId: '0',
            attributes: {
              language: 'eng'
            },
            name: 'nationalSubjectCategory',
            children: [
              {
                name: 'linkedRecordType',
                value: 'nationalSubjectCategory'
              },
              {
                name: 'linkedRecordId',
                value: 'nationalSubjectCategory:6325370460697648'
              }
            ]
          },
          {
            repeatId: '1',
            attributes: {
              language: 'swe'
            },
            name: 'nationalSubjectCategory',
            children: [
              {
                name: 'linkedRecordType',
                value: 'nationalSubjectCategory'
              },
              {
                name: 'linkedRecordId',
                value: 'nationalSubjectCategory:6325370460697641'
              }
            ]
          }
        ]
      };
      const transformData = traverseDataGroup(test);
      const expected = {
        divaOutput: {
          nationalSubjectCategory: [
            {
              value: 'nationalSubjectCategory:6325370460697648',
              _language: 'eng'
            },
            {
              value: 'nationalSubjectCategory:6325370460697641',
              _language: 'swe'
            }
          ]
        }
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a root group with multiple variables with same nameInData having attributes', () => {
      const test = {
        name: 'divaOutput',
        children: [
          {
            attributes: {
              language: 'eng'
            },
            name: 'subject',
            value: 'value1'
          },
          {
            attributes: {
              language: 'swe'
            },
            name: 'subject',
            value: 'value2'
          }
        ]
      };
      const transformData = traverseDataGroup(test);
      const expected = {
        divaOutput: {
          subject_language_eng: {
            value: 'value1',
            _language: 'eng'
          },
          subject_language_swe: {
            value: 'value2',
            _language: 'swe'
          }
        }
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a root group with multiple variables with same nameInData and one having attributes', () => {
      const test = {
        name: 'divaOutput',
        children: [
          {
            name: 'subject',
            value: 'value1'
          },
          {
            attributes: {
              language: 'swe'
            },
            name: 'subject',
            value: 'value2'
          }
        ]
      };
      const transformData = traverseDataGroup(test);
      const expected = {
        divaOutput: {
          subject: {
            value: 'value1'
          },
          subject_language_swe: {
            value: 'value2',
            _language: 'swe'
          }
        }
      };
      expect(transformData).toStrictEqual(expected);
    });

    it(`should return a root group with multiple variables with same 
    nameInData and one having attributes with formPathLookup`, () => {
      const dataRecordGroup = {
        children: [
          {
            children: [
              {
                name: 'title',
                value: 'EN utmärkt titel'
              }
            ],
            name: 'titleInfo',
            attributes: {
              lang: 'ady'
            }
          },
          {
            repeatId: '7',
            children: [
              {
                name: 'title',
                value: 'EN utmärkt alternativ titel'
              }
            ],
            name: 'titleInfo',
            attributes: {
              lang: 'amh',
              type: 'alternative'
            }
          }
        ],
        name: 'output'
      };
      const formPathLookup = {
        'output.titleInfo.title': {
          name: 'title',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.titleInfo': {
          name: 'titleInfo',
          type: 'group',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.titleInfo_type_alternative.title': {
          name: 'title',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        },
        'output.titleInfo_type_alternative': {
          name: 'titleInfo',
          type: 'group',
          attributes: {
            type: 'alternative'
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1
          }
        },
        output: {
          name: 'output',
          type: 'group',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          }
        }
      };
      const transformData = traverseDataGroup(
        dataRecordGroup as DataGroup,
        formPathLookup as Record<string, FormMetaData>
      );
      const expected = {
        output: {
          titleInfo: {
            _lang: 'ady',
            title: {
              value: 'EN utmärkt titel'
            }
          },
          titleInfo_type_alternative: [
            {
              _lang: 'amh',
              _type: 'alternative',
              title: {
                value: 'EN utmärkt alternativ titel'
              }
            }
          ]
        }
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a root group with multiple colVar with same nameInData having attributes', () => {
      const test = {
        name: 'divaOutput',
        children: [
          {
            attributes: {
              language: 'eng'
            },
            name: 'domain',
            value: 'hb'
          },
          {
            attributes: {
              language: 'swe'
            },
            name: 'domain',
            value: 'uu'
          }
        ]
      };
      const transformData = traverseDataGroup(test);
      const expected = {
        divaOutput: {
          domain_language_eng: {
            value: 'hb',
            _language: 'eng'
          },
          domain_language_swe: {
            value: 'uu',
            _language: 'swe'
          }
        }
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a root group with multiple recordLinks with same nameInData having attributes', () => {
      const test = {
        name: 'divaOutput',
        children: [
          {
            name: 'nationalSubjectCategory',
            children: [
              {
                name: 'linkedRecordType',
                value: 'nationalSubjectCategory'
              },
              {
                name: 'linkedRecordId',
                value: 'nationalSubjectCategory:1111111111111111'
              }
            ],
            attributes: {
              language: 'swe'
            }
          },
          {
            name: 'nationalSubjectCategory',
            children: [
              {
                name: 'linkedRecordType',
                value: 'nationalSubjectCategory'
              },
              {
                name: 'linkedRecordId',
                value: 'nationalSubjectCategory:2222222222222222'
              }
            ],
            attributes: {
              language: 'eng'
            }
          }
        ]
      };

      const transformData = traverseDataGroup(test);
      const expected = {
        divaOutput: {
          nationalSubjectCategory_language_swe: {
            value: 'nationalSubjectCategory:1111111111111111',
            _language: 'swe'
          },
          nationalSubjectCategory_language_eng: {
            value: 'nationalSubjectCategory:2222222222222222',
            _language: 'eng'
          }
        }
      };
      expect(transformData).toStrictEqual(expected);
    });

    it('should return a root group with groups with same nameInData having attributes', () => {
      const test = {
        name: 'divaOutput',
        children: [
          {
            name: 'author',
            children: [
              {
                name: 'name',
                value: 'value1'
              }
            ],
            attributes: {
              language: 'eng'
            }
          },
          {
            name: 'author',
            children: [
              {
                name: 'name',
                value: 'value2'
              }
            ],
            attributes: {
              language: 'swe'
            }
          }
        ]
      };
      const formPathLookup = {
        divaOutput: {
          name: 'divaOutput',
          repeat: {
            repeatMax: 1,
            repeatMin: 1
          },
          type: 'group'
        },
        'divaOutput.author_language_eng': {
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
        'divaOutput.author_language_eng.name': {
          name: 'name',
          repeat: {
            repeatMax: 1,
            repeatMin: 1
          },
          type: 'textVariable'
        },
        'divaOutput.author_language_swe': {
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
        'divaOutput.author_language_swe.name': {
          name: 'name',
          repeat: {
            repeatMax: 1,
            repeatMin: 1
          },
          type: 'textVariable'
        }
      };
      const transformData = traverseDataGroup(test, formPathLookup as Record<string, FormMetaData>);
      const expected = {
        divaOutput: {
          author_language_eng: {
            _language: 'eng',
            name: {
              value: 'value1'
            }
          },
          author_language_swe: {
            _language: 'swe',
            name: {
              value: 'value2'
            }
          }
        }
      };
      expect(transformData).toStrictEqual(expected);
    });

    // it('should return a root group with groups with same nameInData and one having attributes', () => {
    //   const test = {
    //     name: 'divaOutput',
    //     children: [
    //       {
    //         name: 'author',
    //         children: [
    //           {
    //             name: 'name',
    //             value: 'value1'
    //           }
    //         ]
    //       },
    //       {
    //         name: 'author',
    //         children: [
    //           {
    //             name: 'name',
    //             value: 'value2'
    //           }
    //         ],
    //         attributes: {
    //           language: 'swe'
    //         }
    //       }
    //     ]
    //   };
    //   const transformData = traverseDataGroup(test);
    //   const expected = {
    //     divaOutput: {
    //       author: {
    //         name: {
    //           value: 'value1'
    //         }
    //       },
    //       author_language_swe: {
    //         _language: 'swe',
    //         name: {
    //           value: 'value2'
    //         }
    //       }
    //     }
    //   };
    //   expect(transformData).toStrictEqual(expected);
    // });
  });

  describe('helper methods', () => {
    describe('check for type of metadata', () => {
      it('isDataGroup return true', () => {
        const actual = isDataGroup({
          name: 'isGroup',
          children: []
        });

        expect(actual).toBe(true);
      });

      it('isDataGroup return false', () => {
        const actual = isDataGroup({
          name: 'isAtomic',
          value: 'notAGroup'
        });

        expect(actual).toBe(false);
      });

      it('isDataAtomic return true', () => {
        const actual = isDataAtomic({
          name: 'isAtomic',
          value: 'notAGroup'
        });
        expect(actual).toBe(true);
      });

      it('isDataAtomic return false', () => {
        const actual = isDataAtomic({
          name: 'isGroup',
          children: []
        });
        expect(actual).toBe(false);
      });

      it('isRecordLink return false for not DataGroup', () => {
        const actual = isRecordLink({
          name: 'isAtomic',
          value: 'notARecordLink'
        });

        expect(actual).toBe(false);
      });

      it('isRecordLink return true for RecordLink', () => {
        const actual = isRecordLink({
          name: 'isGroup',
          children: [
            {
              name: 'linkedRecordType',
              value: 'aLinkedRecordType'
            },
            {
              name: 'linkedRecordId',
              value: 'aLinkedRecordId'
            }
          ]
        });
        expect(actual).toBe(true);
      });

      it('isRepeating return false for repeating', () => {
        const actual = isRepeating({ name: 'domain', value: 'hh' }, 'divaOutput.domain', {
          'divaOutput.domain': {
            name: 'domain',
            type: 'collectionVariable',
            repeat: { repeatMin: 1, repeatMax: 1 }
          }
        });

        expect(actual).toBe(false);
      });

      it('isRepeating return true for repeating', () => {
        const actual = isRepeating({ name: 'domain', value: 'hh' }, 'divaOutput.domain', {
          'divaOutput.domain': {
            name: 'domain',
            type: 'collectionVariable',
            repeat: { repeatMin: 0, repeatMax: 1 }
          }
        });

        expect(actual).toBe(true);
      });
    });

    describe('transformObjectAttributes', () => {
      it('transformObjectAttributes convert empty attributes', () => {
        const actual = transformObjectAttributes(undefined);
        expect(actual).toStrictEqual([]);
      });

      it('transformObjectAttributes convert attributes', () => {
        const actual = transformObjectAttributes({ colour: 'red' });
        expect(actual).toStrictEqual([{ _colour: 'red' }]);
      });

      it('should be able to transform object attributes with underscore prefix in key', () => {
        const testAttributes: Attributes = {
          attr1: 'someAttr1Value',
          attr2: 'someAttr2Value'
        };
        const actual = transformObjectAttributes(testAttributes);
        const expected = [
          {
            _attr1: 'someAttr1Value'
          },
          {
            _attr2: 'someAttr2Value'
          }
        ];
        expect(actual).toStrictEqual(expected);
      });
    });

    describe('hasSameNameInDatas', () => {
      it('hasSameNameInDatas returns true when multiple siblings exist', () => {
        const actual = hasSameNameInDatas(
          [
            {
              name: 'subject',
              value: 'Naturvetenskap',
              attributes: { language: 'swe' }
            },
            {
              name: 'subject',
              value: 'Natural sciences',
              attributes: { language: 'eng' }
            },
            { name: 'code', value: '1' }
          ],
          'subject'
        );
        expect(actual).toBe(true);
      });

      it('hasSameNameInDatas returns false when single', () => {
        const actual = hasSameNameInDatas(
          [
            {
              name: 'subject',
              value: 'Natural sciences',
              attributes: { language: 'eng' }
            },
            { name: 'code', value: '1' }
          ],
          'subject'
        );
        expect(actual).toBe(false);
      });
      it('hasSameNameInDatas returns false when single2', () => {
        const actual = hasSameNameInDatas(
          [
            {
              children: [
                {
                  name: 'title',
                  value: 'EN utmärkt titel'
                }
              ],
              name: 'titleInfo'
            },
            {
              repeatId: '7',
              children: [
                {
                  name: 'title',
                  value: 'EN utmärkt alternativ titel'
                }
              ],
              name: 'titleInfo',
              attributes: {
                lang: 'amh',
                type: 'alternative'
              }
            }
          ],
          'titleInfo'
          // {
          //   name: 'titleInfo',
          //   type: 'group',
          //   attributes: { type: 'alternative' },
          //   repeat: { repeatMin: 1, repeatMax: 1 }
          // }
        );
        expect(actual).toBe(true);
      });
    });

    describe('updateGroupNameWithAttribute', () => {
      it('updates name with possible name', () => {
        const actual = updateGroupWithPossibleNewNameWithAttribute(
          {
            name: 'author',
            children: [{ name: 'name', value: 'value2' }],
            attributes: { language: 'swe' }
          },
          'author_language_swe'
        );
        expect(actual).toStrictEqual({
          name: 'author_language_swe',
          children: [{ name: 'name', value: 'value2' }],
          attributes: { language: 'swe' }
        });
      });
      it('updates name with previous name', () => {
        const actual = updateGroupWithPossibleNewNameWithAttribute(
          {
            name: 'author',
            children: [{ name: 'name', value: 'value2' }],
            attributes: { language: 'swe' }
          },
          'author'
        );
        expect(actual).toStrictEqual({
          name: 'author',
          children: [{ name: 'name', value: 'value2' }],
          attributes: { language: 'swe' }
        });
      });
    });

    it('addAttributesToArray', () => {
      const actual = addAttributesToArray({
        name: 'author',
        children: [{ name: 'name', value: 'value2' }]
      });
      expect(actual).toStrictEqual([]);
    });

    it('addAttributesToArray with 1 attributes', () => {
      const actual = addAttributesToArray({
        name: 'author',
        children: [{ name: 'name', value: 'value2' }],
        attributes: { language: 'swe' }
      });
      expect(actual).toStrictEqual(['language_swe']);
    });

    it('addAttributesToArray with two attributes', () => {
      const actual = addAttributesToArray({
        name: 'author',
        children: [{ name: 'name', value: 'value2' }],
        attributes: { language: 'swe', otherLanguage: 'eng' }
      });
      expect(actual).toStrictEqual(['language_swe', 'otherLanguage_eng']);
    });

    // it('addAttributesToArray with two attributes without correctChild', () => {
    //   const actual = addAttributesToArray({
    //     name: 'author',
    //     children: [{ name: 'name', value: 'value2' }],
    //     attributes: { language: 'swe', otherLanguage: 'eng' }
    //   }, undefined);
    //   expect(actual).toStrictEqual(['language_swe', 'otherLanguage_eng']);
    // });

    describe('hasCoraAttributes', () => {
      it('hasCoraAttributes', () => {
        const actual = hasCoraAttributes('output.titleInfo', [], {
          'output.titleInfo.mainTitle': {
            name: 'mainTitle',
            type: 'textVariable',
            repeat: { repeatMin: 1, repeatMax: 1 }
          },
          'output.titleInfo': {
            name: 'titleInfo',
            type: 'group',
            repeat: { repeatMin: 1, repeatMax: 1 }
          },
          'output.titleInfo_type_alternative.mainTitle': {
            name: 'mainTitle',
            type: 'textVariable',
            repeat: { repeatMin: 1, repeatMax: 1 }
          },
          'output.titleInfo_type_alternative': {
            name: 'titleInfo',
            type: 'group',
            attributes: { type: 'alternative' },
            repeat: { repeatMin: 1, repeatMax: 1 }
          },
          output: {
            name: 'output',
            type: 'group',
            repeat: { repeatMin: 1, repeatMax: 1 }
          }
        });
        expect(actual).toStrictEqual({
          name: 'titleInfo',
          type: 'group',
          repeat: { repeatMin: 1, repeatMax: 1 }
        });
      });

      it('hasCoraAttributes returns with attributes', () => {
        const actual = hasCoraAttributes('output.titleInfo', ['lang_amh', 'type_alternative'], {
          'output.titleInfo.mainTitle': {
            name: 'mainTitle',
            type: 'textVariable',
            repeat: { repeatMin: 1, repeatMax: 1 }
          },
          'output.titleInfo': {
            name: 'titleInfo',
            type: 'group',
            repeat: { repeatMin: 1, repeatMax: 1 }
          },
          'output.titleInfo_type_alternative.mainTitle': {
            name: 'mainTitle',
            type: 'textVariable',
            repeat: { repeatMin: 1, repeatMax: 1 }
          },
          'output.titleInfo_type_alternative': {
            name: 'titleInfo',
            type: 'group',
            attributes: { type: 'alternative' },
            repeat: { repeatMin: 1, repeatMax: 1 }
          },
          output: {
            name: 'output',
            type: 'group',
            repeat: { repeatMin: 1, repeatMax: 1 }
          }
        });
        expect(actual).toStrictEqual({
          name: 'titleInfo',
          type: 'group',
          attributes: { type: 'alternative' },
          repeat: { repeatMin: 1, repeatMax: 1 }
        });
      });
    });

    describe('addAttributesToNameForRecords', () => {
      it('adds no attributes to name when not available, no correctChild, no Array', () => {
        const actual = addAttributesToNameForRecords(
          {
            name: 'subject',
            value: 'Naturvetenskap'
          },
          undefined
          // ['subject']
        );
        expect(actual).toStrictEqual('subject');
      });

      it('adds attributes to name when available, no correctChild, subjectArray', () => {
        const actual = addAttributesToNameForRecords(
          {
            name: 'subject',
            value: 'Naturvetenskap',
            attributes: {
              language: 'swe'
            }
          },
          undefined
          // ['subject']
        );
        expect(actual).toStrictEqual('subject_language_swe');
      });

      it('adds multiple attributes to name when available, no correctChild, subjectArray', () => {
        const actual = addAttributesToNameForRecords(
          {
            name: 'subject',
            value: 'Naturvetenskap',
            attributes: {
              language: 'swe',
              otherLanguage: 'aak'
            }
          },
          undefined
          // ['subject']
        );
        expect(actual).toStrictEqual('subject_language_swe_otherLanguage_aak');
      });

      it('adds no attributes to name when correctChild has none, titleInfoArray', () => {
        const actual = addAttributesToNameForRecords(
          {
            children: [{ name: 'title', value: 'EN utmärkt titel' }],
            name: 'titleInfo',
            attributes: { lang: 'ady' }
          },
          {
            name: 'titleInfo',
            type: 'group',
            repeat: { repeatMin: 1, repeatMax: 1 }
          }
          // ['titleInfo']
        );
        expect(actual).toStrictEqual('titleInfo');
      });

      it('adds multiple attributes to name when with nameInDataArray', () => {
        const actual = addAttributesToNameForRecords(
          {
            name: 'titleInfo',
            value: 'Naturvetenskap',
            attributes: {
              language: 'swe',
              otherLanguage: 'aak'
            }
          },
          {
            name: 'titleInfo',
            type: 'group',
            attributes: { language: 'swe' },
            repeat: { repeatMin: 1, repeatMax: 1 }
          }
          // ['titleInfo']
        );
        expect(actual).toStrictEqual('titleInfo_language_swe');
      });
      it('removed attributes to name when with when not Cora attributes', () => {
        const actual = addAttributesToNameForRecords(
          {
            children: [{ name: 'title', value: 'EN utmärkt titel' }],
            name: 'titleInfo',
            attributes: { language: 'ady' }
          },
          undefined,
          ['titleInfo'],
          {
            'output.titleInfo': {
              name: 'titleInfo',
              type: 'group',
              repeat: {
                repeatMin: 1,
                repeatMax: 1
              }
            }
          },
          'output.titleInfo'
        );
        expect(actual).toStrictEqual('titleInfo');
      });

      it('removed attributes to name when with when not Cora attributes2', () => {
        const actual = addAttributesToNameForRecords(
          {
            children: [{ name: 'title', value: 'asdasdasd' }],
            name: 'titleInfo',
            attributes: { lang: 'ain' }
          },
          undefined,
          ['titleInfo', 'titleInfo_lang_ain'],
          {
            'output.titleInfo': {
              name: 'titleInfo',
              type: 'group',
              repeat: {
                repeatMin: 1,
                repeatMax: 1
              }
            }
          },
          'output.titleInfo'
        );
        expect(actual).toStrictEqual('titleInfo');
      });
    });

    describe('getNameFromChildren', () => {
      it('1', () => {
        const actual = getNamesFromChildren([
          {
            titleInfo: {
              title: {
                value: 'EN utmärkt titel'
              }
            }
          },
          {
            titleInfo_type_alternative: {
              title: {
                value: 'EN utmärkt alternativ titel'
              },
              _lang: 'amh',
              _type: 'alternative'
            }
          }
        ]);
        expect(actual).toStrictEqual(['titleInfo', 'titleInfo_type_alternative']);
      });
    });

    describe('getSameNameInDatas', () => {
      it('getSameNameInDatas 1', () => {
        const actual = getSameNameInDatas(
          [
            {
              children: [
                {
                  name: 'title',
                  value: 'EN utmärkt titel'
                }
              ],
              name: 'titleInfo',
              attributes: {
                lang: 'ady'
              }
            },
            {
              repeatId: '7',
              children: [
                {
                  name: 'title',
                  value: 'EN utmärkt alternativ titel'
                }
              ],
              name: 'titleInfo',
              attributes: {
                lang: 'amh',
                type: 'alternative'
              }
            }
          ],
          addAttributesToNameForRecords(
            {
              repeatId: '7',
              children: [{ name: 'title', value: 'EN utmärkt alternativ titel' }],
              name: 'titleInfo',
              attributes: { lang: 'amh', type: 'alternative' }
            },
            {
              name: 'titleInfo',
              type: 'group',
              attributes: { type: 'alternative' },
              repeat: { repeatMin: 1, repeatMax: 1 }
            }
          )
        );
        expect(actual).toStrictEqual(['titleInfo', 'titleInfo_type_alternative']);
      });
      it('getSameNameInDatas 2', () => {
        const actual = getSameNameInDatas(
          [
            {
              children: [
                {
                  name: 'title',
                  value: 'EN utmärkt titel'
                }
              ],
              name: 'titleInfo',
              attributes: {
                lang: 'ady'
              }
            },
            {
              repeatId: '7',
              children: [
                {
                  name: 'title',
                  value: 'EN utmärkt alternativ titel'
                }
              ],
              name: 'titleInfo',
              attributes: {
                lang: 'amh',
                type: 'alternative'
              }
            },
            {
              repeatId: '7',
              children: [
                {
                  name: 'title',
                  value: 'EN utmärkt alternativ titel'
                }
              ],
              name: 'notTitleInfo',
              attributes: {
                lang: 'amh',
                type: 'alternative'
              }
            }
          ],
          addAttributesToNameForRecords(
            {
              repeatId: '7',
              children: [{ name: 'title', value: 'EN utmärkt alternativ titel' }],
              name: 'titleInfo',
              attributes: { lang: 'amh', type: 'alternative' }
            },
            {
              name: 'titleInfo',
              type: 'group',
              attributes: { type: 'alternative' },
              repeat: { repeatMin: 1, repeatMax: 1 }
            }
          )
        );
        expect(actual).toStrictEqual(['titleInfo', 'titleInfo_type_alternative']);
      });
    });
    describe('findSearchPart', () => {
      it('finds part in path from array', () => {
        const actual = findSearchPart(['titleInfo'], 'output.titleInfo');
        expect(actual).toBe('output.titleInfo');
      });
      it('finds part in path from array2', () => {
        const actual = findSearchPart(
          ['titleInfo', 'titleInfo_type_alternative'],
          'output.titleInfo'
        );
        expect(actual).toBe('output.titleInfo');
      });
      it('finds part in path from array3', () => {
        const actual = findSearchPart(
          ['titleInfo', 'titleInfo_type_alternative'],
          'output.titleInfo_type_alternative'
        );
        expect(actual).toBe('output.titleInfo_type_alternative');
      });
    });
  });
});
