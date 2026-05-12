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
import {
  createAnyTypeRecordLink,
  createCollVar,
  createCollVarFinal,
  createGroup,
  createNumVar,
  createRecordInfoData,
  createRecordInfoMetadata,
  createRecordLink,
  createRecordType,
  createResourceLink,
  createTextVar,
  createValidationType,
} from '@/__mocks__/bffTestDataUtils';
import type {
  BFFMetadataBase,
  BFFMetadataCollectionVariable,
  BFFMetadataItemCollection,
  Dependencies,
} from '@/cora/bffTypes.server';
import type {
  BFFMetadataBase,
  BFFMetadataCollectionVariable,
  BFFMetadataItemCollection,
  Dependencies,
} from '@/cora/bffTypes.server';
import type {
  ActionLink,
  DataGroup,
  RecordWrapper,
} from '@/cora/cora-data/types.server';
import type { FormMetaData } from '@/data/formDefinition/utils/formDefinitionUtils.server';
import { listToPool } from 'server/dependencies/util/listToPool';
import type { Lookup } from 'server/dependencies/util/lookup';
import { beforeEach, describe, expect, it } from 'vitest';
import type {
  BFFGuiElement,
  BFFLoginUnit,
  BFFLoginWebRedirect,
  BFFMember,
  BFFMetadata,
  BFFMetadataGroup,
  BFFMetadataRecordLink,
  BFFMetadataTextVariable,
  BFFOrganisation,
  BFFPresentation,
  BFFPresentationBase,
  BFFPresentationGroup,
  BFFPresentationResourceLink,
  BFFPresentationSurroundingContainer,
  BFFRecordType,
  BFFSearch,
  BFFText,
  BFFValidationType,
} from '../../bffTypes.server';
import {
  transformRecord,
  transformRecordData,
} from '../transformRecord.server';

describe('transformRecord', () => {
  it('should transform record for view mode', () => {
    const mockDependencies = {
      validationTypePool: listToPool([
        createValidationType('someValidationTypeId'),
      ]),
      recordTypePool: listToPool([
        createRecordType('someRecordTypeId', { metadataId: 'rootGroup' }),
      ]),
      metadataPool: listToPool([
        createGroup('rootGroup', 'root', ['recordInfoGroup', 'textVar1']),
        ...createRecordInfoMetadata(),
        createTextVar('textVar1', 'text1', []),
      ]),
    } as Dependencies;

    const recordWrapper = {
      record: {
        data: {
          name: 'root',
          children: [
            createRecordInfoData(),
            { name: 'text1', value: 'some value' },
          ],
        },
      },
    } as RecordWrapper;

    const transformData = transformRecord(
      mockDependencies,
      recordWrapper,
      'view',
    );

    expect(transformData).toEqual({
      id: 'someRecordId',
      recordType: 'someRecordTypeId',
      updated: [],
      userRights: [],
      validationType: 'someValidationTypeId',
      data: {
        root: {
          fromStorage: true,
          recordInfo: {
            fromStorage: true,
            required: true,
            id: { value: 'someRecordId', required: true },
            type: {
              linkedRecordType: 'recordType',
              value: 'someRecordTypeId',
              required: true,
            },
            validationType: {
              linkedRecordType: 'validationType',
              value: 'someValidationTypeId',
              required: true,
            },
          },
          text1: { required: true, value: 'some value' },
        },
      },
    });
  });

  it('should transform record for update mode', () => {
    const mockDependencies = {
      validationTypePool: listToPool([
        createValidationType('someValidationTypeId', {
          metadataGroupId: 'rootUpdateGroup',
          newMetadataGroupId: 'rootNewGroup',
        }),
      ]),
      recordTypePool: listToPool([
        createRecordType('someRecordTypeId', { metadataId: 'rootGroup' }),
      ]),
      metadataPool: listToPool([
        createGroup('rootGroup', 'root', ['recordInfoGroup', 'textVar1']),
        createGroup('rootUpdateGroup', 'root', ['recordInfoGroup']),
        ...createRecordInfoMetadata(),
        createTextVar('textVar1', 'text1', []),
      ]),
    } as Dependencies;

    const recordWrapper = {
      record: {
        data: {
          name: 'root',
          children: [createRecordInfoData()],
        },
        actionLinks: {},
      },
    } as RecordWrapper;

    const transformData = transformRecord(
      mockDependencies,
      recordWrapper,
      'update',
    );

    expect(transformData).toEqual({
      id: 'someRecordId',
      recordType: 'someRecordTypeId',
      updated: [],
      userRights: [],
      validationType: 'someValidationTypeId',
      actionLinks: {},
      data: {
        root: {
          fromStorage: true,
          recordInfo: {
            fromStorage: true,
            required: true,
            id: { value: 'someRecordId', required: true },
            type: {
              linkedRecordType: 'recordType',
              value: 'someRecordTypeId',
              required: true,
            },
            validationType: {
              linkedRecordType: 'validationType',
              value: 'someValidationTypeId',
              required: true,
            },
          },
        },
      },
    });
  });

  it('should transform record for create mode', () => {
    const mockDependencies = {
      validationTypePool: listToPool([
        createValidationType('someValidationTypeId', {
          metadataGroupId: 'rootUpdateGroup',
          newMetadataGroupId: 'rootNewGroup',
        }),
      ]),
      recordTypePool: listToPool([
        createRecordType('someRecordTypeId', { metadataId: 'rootGroup' }),
      ]),
      metadataPool: listToPool([
        createGroup('rootGroup', 'root', ['recordInfoGroup', 'textVar1']),
        createGroup('rootNewGroup', 'root', ['recordInfoGroup']),
        ...createRecordInfoMetadata(),
        createTextVar('textVar1', 'text1', []),
      ]),
    } as Dependencies;

    const recordWrapper = {
      record: {
        data: {
          name: 'root',
          children: [createRecordInfoData()],
        },
        actionLinks: {},
      },
    } as RecordWrapper;

    const transformData = transformRecord(
      mockDependencies,
      recordWrapper,
      'create',
    );

    expect(transformData).toEqual({
      id: 'someRecordId',
      recordType: 'someRecordTypeId',
      updated: [],
      userRights: [],
      validationType: 'someValidationTypeId',
      actionLinks: {},
      data: {
        root: {
          fromStorage: true,
          recordInfo: {
            fromStorage: true,
            required: true,
            id: { value: 'someRecordId', required: true },
            type: {
              linkedRecordType: 'recordType',
              value: 'someRecordTypeId',
              required: true,
            },
            validationType: {
              linkedRecordType: 'validationType',
              value: 'someValidationTypeId',
              required: true,
            },
          },
        },
      },
    });
  });

  it('should add final value attributes to data name', () => {
    const mockDependencies = {
      validationTypePool: listToPool([
        createValidationType('someValidationTypeId'),
      ]),
      recordTypePool: listToPool([
        createRecordType('someRecordTypeId', { metadataId: 'rootGroup' }),
      ]),
      metadataPool: listToPool([
        createGroup('rootGroup', 'root', ['recordInfoGroup', 'textVar1'], {
          attributeReferences: [
            { refCollectionVarId: 'someFinalValueAttributeCollVar' },
            { refCollectionVarId: 'someSelectableAttributeCollVar' },
          ],
        }),
        ...createRecordInfoMetadata(),
        createTextVar('textVar1', 'text1', [
          'someFinalValueAttributeCollVar',
          'someSelectableAttributeCollVar',
        ]),
        createCollVarFinal(
          'someFinalValueAttributeCollVar',
          'someFinalAttr',
          'someFinalValue',
          [],
        ),
        ...createCollVar(
          'someSelectableAttributeCollVar',
          'someSelectableAttr',
          ['someSelectableValue1', 'someSelectableValue2'],
          [],
        ),
      ]),
    } as Dependencies;

    const recordWrapper = {
      record: {
        data: {
          name: 'root',
          attributes: {
            someFinalAttr: 'someFinalValue',
            someSelectableAttr: 'someSelectableValue1',
          },
          children: [
            createRecordInfoData(),
            {
              name: 'text1',
              value: 'some value',
              attributes: {
                someFinalAttr: 'someFinalValue',
                someSelectableAttr: 'someSelectableValue1',
              },
            },
          ],
        },
        actionLinks: {},
      },
    } as RecordWrapper;

    const transformData = transformRecord(
      mockDependencies,
      recordWrapper,
      'view',
    );

    expect(transformData).toEqual({
      id: 'someRecordId',
      recordType: 'someRecordTypeId',
      updated: [],
      userRights: [],
      validationType: 'someValidationTypeId',
      actionLinks: {},
      data: {
        root_someFinalAttr_someFinalValue: {
          fromStorage: true,
          _someFinalAttr: 'someFinalValue',
          _someSelectableAttr: 'someSelectableValue1',
          recordInfo: {
            fromStorage: true,
            required: true,
            id: { value: 'someRecordId', required: true },
            type: {
              linkedRecordType: 'recordType',
              value: 'someRecordTypeId',
              required: true,
            },
            validationType: {
              linkedRecordType: 'validationType',
              value: 'someValidationTypeId',
              required: true,
            },
          },
          text1_someFinalAttr_someFinalValue: {
            required: true,
            value: 'some value',
            _someFinalAttr: 'someFinalValue',
            _someSelectableAttr: 'someSelectableValue1',
          },
        },
      },
    });
  });

  it('handle same nameInDate but different final value attributes', () => {
    const mockDependencies = {
      validationTypePool: listToPool([
        createValidationType('someValidationTypeId'),
      ]),
      recordTypePool: listToPool([
        createRecordType('someRecordTypeId', { metadataId: 'rootGroup' }),
      ]),
      metadataPool: listToPool([
        createGroup(
          'rootGroup',
          'root',
          [
            'recordInfoGroup',
            'textVarWithoutAttr',
            'textVarAttrVal1',
            'textVarAttrVal2',
            'textVarAttrVal2OtherAttrVal2',
            'textVarOtherAttrVal1',
          ],
          {},
        ),
        ...createRecordInfoMetadata(),
        createTextVar('textVarWithoutAttr', 'text1', []),
        createTextVar('textVarAttrVal1', 'text1', ['someAttrVal1CollVar']),
        createTextVar('textVarAttrVal2', 'text1', ['someAttrVal2CollVar']),
        createTextVar('textVarAttrVal2OtherAttrVal2', 'text1', [
          'someAttrVal2CollVar',
          'someOtherAttrVal2CollVar',
        ]),
        createTextVar('textVarOtherAttrVal1', 'text1', [
          'someOtherAttrVal1CollVar',
        ]),
        createCollVarFinal('someAttrVal1CollVar', 'someAttr', 'val1', []),
        createCollVarFinal('someAttrVal2CollVar', 'someAttr', 'val2', []),
        createCollVarFinal(
          'someOtherAttrVal1CollVar',
          'someOtherAttr',
          'val1',
          [],
        ),
        createCollVarFinal(
          'someOtherAttrVal2CollVar',
          'someOtherAttr',
          'val2',
          [],
        ),
      ]),
    } as Dependencies;

    const recordWrapper = {
      record: {
        data: {
          name: 'root',
          attributes: {
            someFinalAttr: 'someFinalValue',
            someSelectableAttr: 'someSelectableValue1',
          },
          children: [
            createRecordInfoData(),
            {
              name: 'text1',
              value: 'some value for no attrs',
            },
            {
              name: 'text1',
              attributes: { someAttr: 'val1' },
              value: 'some value for someAttr=val1',
            },
            {
              name: 'text1',
              attributes: { someAttr: 'val2' },
              value: 'some value for someAttr=val2',
            },
            {
              name: 'text1',
              attributes: { someAttr: 'val2', someOtherAttr: 'val2' },
              value: 'some value for someAttr=val2 and someOtherAttr=val2',
            },
            {
              name: 'text1',
              attributes: { someOtherAttr: 'val1' },
              value: 'some value for someOtherAttr=val1',
            },
          ],
        },
        actionLinks: {},
      },
    } as RecordWrapper;

    const transformData = transformRecord(
      mockDependencies,
      recordWrapper,
      'view',
    );

    expect(transformData).toEqual({
      id: 'someRecordId',
      recordType: 'someRecordTypeId',
      updated: [],
      userRights: [],
      validationType: 'someValidationTypeId',
      actionLinks: {},
      data: {
        root: {
          fromStorage: true,
          _someFinalAttr: 'someFinalValue',
          _someSelectableAttr: 'someSelectableValue1',
          recordInfo: {
            fromStorage: true,
            required: true,
            id: { value: 'someRecordId', required: true },
            type: {
              linkedRecordType: 'recordType',
              value: 'someRecordTypeId',
              required: true,
            },
            validationType: {
              linkedRecordType: 'validationType',
              value: 'someValidationTypeId',
              required: true,
            },
          },
          text1: {
            required: true,
            value: 'some value for no attrs',
          },
          text1_someAttr_val1: {
            required: true,
            value: 'some value for someAttr=val1',
            _someAttr: 'val1',
          },
          text1_someAttr_val2: {
            required: true,
            value: 'some value for someAttr=val2',
            _someAttr: 'val2',
          },
          text1_someAttr_val2_someOtherAttr_val2: {
            required: true,
            value: 'some value for someAttr=val2 and someOtherAttr=val2',
            _someAttr: 'val2',
            _someOtherAttr: 'val2',
          },
          text1_someOtherAttr_val1: {
            required: true,
            value: 'some value for someOtherAttr=val1',
            _someOtherAttr: 'val1',
          },
        },
      },
    });
  });

  it('matches data against two metadata with same name but different selectable attributes', () => {
    const mockDependencies = {
      recordTypePool: listToPool<BFFRecordType>([
        {
          id: 'someRecordTypeId',
          metadataId: 'someRootGroup',
          useTrashBin: true,
        } as BFFRecordType,
      ]),
      metadataPool: listToPool<BFFMetadata>([
        {
          id: 'someRootGroup',
          type: 'group',
          nameInData: 'root',
          children: [
            { childId: 'recordInfoGroup', repeatMin: '1', repeatMax: '1' },
            {
              childId: 'textVarWithFinalValueAttr',
              repeatMin: '0',
              repeatMax: '1',
            },
            {
              childId: 'textVarWithSelectableAndFinalValueAttr',
              repeatMin: '0',
              repeatMax: '1',
            },
          ],
        } as BFFMetadataGroup,
        {
          id: 'recordInfoGroup',
          nameInData: 'recordInfo',
          type: 'group',
          children: [
            { childId: 'idVar', repeatMin: '1', repeatMax: '1' },
            { childId: 'typeLink', repeatMin: '1', repeatMax: '1' },
            { childId: 'validationTypeLink', repeatMin: '1', repeatMax: '1' },
          ],
        } as BFFMetadataGroup,
        {
          id: 'idVar',
          type: 'textVariable',
          nameInData: 'id',
        } as BFFMetadataTextVariable,
        {
          id: 'typeLink',
          type: 'recordLink',
          nameInData: 'type',
          linkedRecordType: 'recordType',
        } as BFFMetadataRecordLink,
        {
          id: 'validationTypeLink',
          type: 'recordLink',
          nameInData: 'validationType',
          linkedRecordType: 'validationType',
        } as BFFMetadataRecordLink,
        {
          id: 'textVarWithFinalValueAttr',
          type: 'textVariable',
          nameInData: 'someText',
          attributeReferences: [
            { refCollectionVarId: 'attr1WithFinalValueColVar' },
          ],
        } as BFFMetadataTextVariable,
        {
          id: 'textVarWithSelectableAndFinalValueAttr',
          type: 'textVariable',
          nameInData: 'someText',
          attributeReferences: [
            { refCollectionVarId: 'attr1SelectableColVar' },
            { refCollectionVarId: 'attr2WithFinalValueColVar' },
          ],
        } as BFFMetadataTextVariable,
        {
          id: 'attr1WithFinalValueColVar',
          type: 'collectionVariable',
          nameInData: 'attr1',
          refCollection: 'attr1Collection',
          finalValue: 'opt1',
        } as BFFMetadataCollectionVariable,
        {
          id: 'attr1SelectableColVar',
          type: 'collectionVariable',
          nameInData: 'attr1',
          refCollection: 'attr1Collection',
        } as BFFMetadataCollectionVariable,
        {
          id: 'attr2WithFinalValueColVar',
          type: 'collectionVariable',
          nameInData: 'attr2',
          refCollection: 'attr2Collection',
          finalValue: 'opt1',
        } as BFFMetadataCollectionVariable,
        {
          id: 'attr1Collection',
          collectionItemReferences: [
            { refCollectionItemId: 'attr1Opt1' },
            { refCollectionItemId: 'attr1Opt2' },
          ],
        } as BFFMetadataItemCollection,
        {
          id: 'attr2Collection',
          collectionItemReferences: [
            { refCollectionItemId: 'attr2Opt1' },
            { refCollectionItemId: 'attr2Opt2' },
          ],
        } as BFFMetadataItemCollection,
        { id: 'attr1Opt1', nameInData: 'opt1' } as BFFMetadataBase,
        { id: 'attr1Opt2', nameInData: 'opt2' } as BFFMetadataBase,
        { id: 'attr2Opt1', nameInData: 'opt1' } as BFFMetadataBase,
        { id: 'attr2Opt2', nameInData: 'opt2' } as BFFMetadataBase,
      ]),
    } as Dependencies;
    // someText attr1="opt1"
    // someText attr1="opt1 | opt2" attr2="opt3"
    const record: RecordWrapper = {
      record: {
        data: {
          name: 'root',
          children: [
            {
              name: 'recordInfo',
              children: [
                { name: 'id', value: '1234' },
                {
                  name: 'type',
                  children: [
                    { name: 'linkedRecordType', value: 'recordType' },
                    { name: 'linkedRecordId', value: 'someRecordTypeId' },
                  ],
                },
                {
                  name: 'validationType',
                  children: [
                    { name: 'linkedRecordType', value: 'validationType' },
                    { name: 'linkedRecordId', value: 'someValidationTypeId' },
                  ],
                },
              ],
            },
            {
              name: 'someText',
              attributes: {
                attr1: 'opt1',
                attr2: 'opt1',
              },
              value: 'someValue',
            },
            {
              name: 'someText',
              attributes: {
                attr1: 'opt1',
              },
              value: 'someOtherValue',
            },
          ],
        },
        actionLinks: {},
      },
    };

    const transformed = transformRecord(mockDependencies, record, 'view');

    expect(transformed.data).toEqual({
      root: {
        fromStorage: true,
        recordInfo: {
          fromStorage: true,
          id: {
            required: true,
            value: '1234',
          },
          required: true,
          type: {
            linkedRecordType: 'recordType',
            required: true,
            value: 'someRecordTypeId',
          },
          validationType: {
            linkedRecordType: 'validationType',
            required: true,
            value: 'someValidationTypeId',
          },
        },
        someText_attr2_opt1: {
          _attr1: 'opt1',
          _attr2: 'opt1',
          value: 'someValue',
        },
        someText_attr1_opt1: {
          _attr1: 'opt1',
          value: 'someOtherValue',
        },
      },
    });
  });

  it('should transform a text var', () => {
    const mockDependencies = {
      validationTypePool: listToPool([
        createValidationType('someValidationTypeId'),
      ]),
      recordTypePool: listToPool([
        createRecordType('someRecordTypeId', { metadataId: 'rootGroup' }),
      ]),
      metadataPool: listToPool([
        createGroup('rootGroup', 'root', ['recordInfoGroup', 'textVar1']),
        ...createRecordInfoMetadata(),
        createTextVar('textVar1', 'text1', []),
      ]),
    } as Dependencies;

    const recordWrapper = {
      record: {
        data: {
          name: 'root',
          children: [
            createRecordInfoData(),
            { name: 'text1', value: 'some value' },
          ],
        },
      },
    } as RecordWrapper;

    const transformData = transformRecord(
      mockDependencies,
      recordWrapper,
      'view',
    );

    expect(transformData.data.root.text1.value).toEqual('some value');
  });

  it('should transform a num var', () => {
    const mockDependencies = {
      validationTypePool: listToPool([
        createValidationType('someValidationTypeId'),
      ]),
      recordTypePool: listToPool([
        createRecordType('someRecordTypeId', { metadataId: 'rootGroup' }),
      ]),
      metadataPool: listToPool([
        createGroup('rootGroup', 'root', ['recordInfoGroup', 'numVar1']),
        ...createRecordInfoMetadata(),
        createNumVar('numVar1', 'num1', []),
      ]),
    } as Dependencies;

    const recordWrapper = {
      record: {
        data: {
          name: 'root',
          children: [createRecordInfoData(), { name: 'num1', value: 42 }],
        },
      },
    } as RecordWrapper;

    const transformData = transformRecord(
      mockDependencies,
      recordWrapper,
      'view',
    );

    expect(transformData.data.root.num1.value).toEqual(42);
  });

  it('should transform a coll var', () => {
    const mockDependencies = {
      validationTypePool: listToPool([
        createValidationType('someValidationTypeId'),
      ]),
      recordTypePool: listToPool([
        createRecordType('someRecordTypeId', { metadataId: 'rootGroup' }),
      ]),
      metadataPool: listToPool([
        createGroup('rootGroup', 'root', ['recordInfoGroup', 'collVar1']),
        ...createRecordInfoMetadata(),
        ...createCollVar('collVar1', 'collVar1', ['option1', 'option2'], []),
      ]),
    } as Dependencies;

    const recordWrapper = {
      record: {
        data: {
          name: 'root',
          children: [
            createRecordInfoData(),
            { name: 'collVar1', value: 'option1' },
          ],
        },
      },
    } as RecordWrapper;

    const transformData = transformRecord(
      mockDependencies,
      recordWrapper,
      'view',
    );

    expect(transformData.data.root.collVar1.value).toEqual('option1');
  });

  it('should transform a resourceLink', () => {
    const mockDependencies = {
      validationTypePool: listToPool([
        createValidationType('someValidationTypeId'),
      ]),
      recordTypePool: listToPool([
        createRecordType('someRecordTypeId', { metadataId: 'rootGroup' }),
      ]),
      metadataPool: listToPool([
        createGroup('rootGroup', 'root', [
          'recordInfoGroup',
          'someResourceLinkId',
        ]),
        ...createRecordInfoMetadata(),
        createResourceLink('someResourceLinkId', 'someResourceLink'),
      ]),
    } as Dependencies;

    const recordWrapper = {
      record: {
        data: {
          name: 'root',
          children: [
            createRecordInfoData(),
            {
              name: 'someResourceLink',
              children: [
                { name: 'linkedRecordId', value: 'someBinaryId' },
                { name: 'mimeType', value: 'application/pdf' },
              ],
            },
          ],
        },
      },
    } as RecordWrapper;

    const transformData = transformRecord(
      mockDependencies,
      recordWrapper,
      'view',
    );

    expect(transformData.data.root.someResourceLink).toEqual({
      name: 'someResourceLink',
      mimeType: 'application/pdf',
      id: 'someBinaryId',
      required: true,
    });
  });

  it('should transform a recordLink', () => {
    const mockDependencies = {
      validationTypePool: listToPool([
        createValidationType('someValidationTypeId'),
      ]),
      recordTypePool: listToPool([
        createRecordType('someRecordTypeId', { metadataId: 'rootGroup' }),
      ]),
      metadataPool: listToPool([
        createGroup('rootGroup', 'root', [
          'recordInfoGroup',
          'someRecordLinkId',
        ]),
        ...createRecordInfoMetadata(),
        createRecordLink('someRecordLinkId', 'someOtherRecordType', {
          nameInData: 'someRecordLink',
        }),
      ]),
    } as Dependencies;

    const recordWrapper = {
      record: {
        data: {
          name: 'root',
          children: [
            createRecordInfoData(),
            {
              name: 'someRecordLink',
              children: [
                { name: 'linkedRecordId', value: 'someRecordLink' },
                { name: 'linkedRecordType', value: 'someOtherRecordType' },
              ],
            },
          ],
        },
      },
    } as RecordWrapper;

    const transformData = transformRecord(
      mockDependencies,
      recordWrapper,
      'view',
    );

    expect(transformData.data.root.someRecordLink).toEqual({
      linkedRecordType: 'someOtherRecordType',
      required: true,
      value: 'someRecordLink',
    });
  });

  it('should transform a anyTypeRecordLink', () => {
    const mockDependencies = {
      validationTypePool: listToPool([
        createValidationType('someValidationTypeId'),
      ]),
      recordTypePool: listToPool([
        createRecordType('someRecordTypeId', { metadataId: 'rootGroup' }),
      ]),
      metadataPool: listToPool([
        createGroup('rootGroup', 'root', [
          'recordInfoGroup',
          'someAnyTypeRecordLinkId',
        ]),
        ...createRecordInfoMetadata(),
        createAnyTypeRecordLink('someAnyTypeRecordLinkId', {
          nameInData: 'someAnyTypeRecordLink',
        }),
      ]),
    } as Dependencies;

    const recordWrapper = {
      record: {
        data: {
          name: 'root',
          children: [
            createRecordInfoData(),
            {
              name: 'someAnyTypeRecordLink',
              children: [
                { name: 'linkedRecordId', value: 'someOtherRecordId' },
                { name: 'linkedRecordType', value: 'someOtherRecordType' },
              ],
            },
          ],
        },
      },
    } as RecordWrapper;

    const transformData = transformRecord(
      mockDependencies,
      recordWrapper,
      'view',
    );

    expect(transformData.data.root.someAnyTypeRecordLink).toEqual({
      linkedRecordType: 'someOtherRecordType',
      required: true,
      value: 'someOtherRecordId',
    });
  });

  it('should handle unknown type', () => {
    const mockDependencies = {
      validationTypePool: listToPool([
        createValidationType('someValidationTypeId'),
      ]),
      recordTypePool: listToPool([
        createRecordType('someRecordTypeId', { metadataId: 'rootGroup' }),
      ]),
      metadataPool: listToPool([
        createGroup('rootGroup', 'root', [
          'recordInfoGroup',
          'someUnknownTypeId',
        ]),
        ...createRecordInfoMetadata(),
        {
          id: 'someUnknownTypeId',
          type: 'unknownType',
          nameInData: 'unknown',
        } as unknown as BFFMetadata,
      ]),
    } as Dependencies;

    const recordWrapper = {
      record: {
        data: {
          name: 'root',
          children: [
            createRecordInfoData(),
            { name: 'unknown', value: 'some value' },
          ],
        },
      },
    } as RecordWrapper;

    const transformData = transformRecord(
      mockDependencies,
      recordWrapper,
      'view',
    );

    expect(transformData.data.root.unknown).toEqual({
      required: true,
      value: 'some value',
    });
  });

  it('should ignore data not matching metadata', () => {
    const mockDependencies = {
      validationTypePool: listToPool([
        createValidationType('someValidationTypeId'),
      ]),
      recordTypePool: listToPool([
        createRecordType('someRecordTypeId', { metadataId: 'rootGroup' }),
      ]),
      metadataPool: listToPool([
        createGroup('rootGroup', 'root', ['recordInfoGroup', 'textVar1']),
        ...createRecordInfoMetadata(),
        createTextVar('textVar1', 'text1', []),
      ]),
    } as Dependencies;

    const recordWrapper = {
      record: {
        data: {
          name: 'root',
          children: [
            createRecordInfoData(),
            { name: 'text1', value: 'some value' },
            { name: 'text2', value: 'some value that will be ignored' },
          ],
        },
      },
    } as RecordWrapper;

    const transformData = transformRecord(
      mockDependencies,
      recordWrapper,
      'view',
    );

    expect(transformData).toEqual({
      id: 'someRecordId',
      recordType: 'someRecordTypeId',
      updated: [],
      userRights: [],
      validationType: 'someValidationTypeId',
      data: {
        root: {
          fromStorage: true,
          recordInfo: {
            fromStorage: true,
            required: true,
            id: { value: 'someRecordId', required: true },
            type: {
              linkedRecordType: 'recordType',
              value: 'someRecordTypeId',
              required: true,
            },
            validationType: {
              linkedRecordType: 'validationType',
              value: 'someValidationTypeId',
              required: true,
            },
          },
          text1: { required: true, value: 'some value' },
        },
      },
    });
  });

  it('should handle nested groups', () => {
    const mockDependencies = {
      validationTypePool: listToPool([
        createValidationType('someValidationTypeId'),
      ]),
      recordTypePool: listToPool([
        createRecordType('someRecordTypeId', { metadataId: 'rootGroup' }),
      ]),
      metadataPool: listToPool([
        createGroup('rootGroup', 'root', ['recordInfoGroup', 'childGroup']),
        createGroup('childGroup', 'child', ['textVar1']),
        ...createRecordInfoMetadata(),
        createTextVar('textVar1', 'text1', []),
      ]),
    } as Dependencies;

    const recordWrapper = {
      record: {
        data: {
          name: 'root',
          children: [
            createRecordInfoData(),
            {
              name: 'child',
              children: [{ name: 'text1', value: 'some value' }],
            },
          ],
        },
      },
    } as RecordWrapper;

    const transformData = transformRecord(
      mockDependencies,
      recordWrapper,
      'view',
    );

    expect(transformData).toEqual({
      id: 'someRecordId',
      recordType: 'someRecordTypeId',
      updated: [],
      userRights: [],
      validationType: 'someValidationTypeId',
      data: {
        root: {
          fromStorage: true,
          recordInfo: {
            fromStorage: true,
            required: true,
            id: { value: 'someRecordId', required: true },
            type: {
              linkedRecordType: 'recordType',
              value: 'someRecordTypeId',
              required: true,
            },
            validationType: {
              linkedRecordType: 'validationType',
              value: 'someValidationTypeId',
              required: true,
            },
          },
          child: {
            required: true,
            fromStorage: true,
            text1: { required: true, value: 'some value' },
          },
        },
      },
    });
  });

  it('should mark field as required or optional', () => {
    const mockDependencies = {
      validationTypePool: listToPool([
        createValidationType('someValidationTypeId'),
      ]),
      recordTypePool: listToPool([
        createRecordType('someRecordTypeId', { metadataId: 'rootGroup' }),
      ]),
      metadataPool: listToPool([
        createGroup('rootGroup', 'root', [], {
          children: [
            { childId: 'recordInfoGroup', repeatMin: '1', repeatMax: '1' },
            { childId: 'textVar1', repeatMin: '0', repeatMax: '1' },
          ],
        }),
        ...createRecordInfoMetadata(),
        createTextVar('textVar1', 'text1', []),
      ]),
    } as Dependencies;

    const recordWrapper = {
      record: {
        data: {
          name: 'root',
          children: [
            createRecordInfoData(),
            { name: 'text1', value: 'some value' },
          ],
        },
      },
    } as RecordWrapper;

    const transformData = transformRecord(
      mockDependencies,
      recordWrapper,
      'view',
    );

    expect(transformData).toEqual({
      id: 'someRecordId',
      recordType: 'someRecordTypeId',
      updated: [],
      userRights: [],
      validationType: 'someValidationTypeId',
      data: {
        root: {
          fromStorage: true,
          recordInfo: {
            fromStorage: true,
            required: true,
            id: { value: 'someRecordId', required: true },
            type: {
              linkedRecordType: 'recordType',
              value: 'someRecordTypeId',
              required: true,
            },
            validationType: {
              linkedRecordType: 'validationType',
              value: 'someValidationTypeId',
              required: true,
            },
          },
          text1: { /* no required: true here */ value: 'some value' },
        },
      },
    });
  });

  it('should handle repeating variable', () => {
    const mockDependencies = {
      validationTypePool: listToPool([
        createValidationType('someValidationTypeId'),
      ]),
      recordTypePool: listToPool([
        createRecordType('someRecordTypeId', { metadataId: 'rootGroup' }),
      ]),
      metadataPool: listToPool([
        createGroup('rootGroup', 'root', [], {
          children: [
            { childId: 'recordInfoGroup', repeatMin: '1', repeatMax: '1' },
            { childId: 'textVar1', repeatMin: '0', repeatMax: 'X' },
          ],
        }),
        ...createRecordInfoMetadata(),
        createTextVar('textVar1', 'text1', []),
      ]),
    } as Dependencies;

    const recordWrapper = {
      record: {
        data: {
          name: 'root',
          children: [
            createRecordInfoData(),
            { name: 'text1', value: 'some value' },
            { name: 'text1', value: 'some other value' },
          ],
        },
      },
    } as RecordWrapper;

    const transformData = transformRecord(
      mockDependencies,
      recordWrapper,
      'view',
    );

    expect(transformData).toEqual({
      id: 'someRecordId',
      recordType: 'someRecordTypeId',
      updated: [],
      userRights: [],
      validationType: 'someValidationTypeId',
      data: {
        root: {
          fromStorage: true,
          recordInfo: {
            fromStorage: true,
            required: true,
            id: { value: 'someRecordId', required: true },
            type: {
              linkedRecordType: 'recordType',
              value: 'someRecordTypeId',
              required: true,
            },
            validationType: {
              linkedRecordType: 'validationType',
              value: 'someValidationTypeId',
              required: true,
            },
          },
          text1: [{ value: 'some value' }, { value: 'some other value' }],
        },
      },
    });
  });

  it('should handle repeating group', () => {
    const mockDependencies = {
      validationTypePool: listToPool([
        createValidationType('someValidationTypeId'),
      ]),
      recordTypePool: listToPool([
        createRecordType('someRecordTypeId', { metadataId: 'rootGroup' }),
      ]),
      metadataPool: listToPool([
        createGroup('rootGroup', 'root', [], {
          children: [
            { childId: 'recordInfoGroup', repeatMin: '1', repeatMax: '1' },
            { childId: 'childGroup', repeatMin: '1', repeatMax: 'X' },
          ],
        }),
        createGroup('childGroup', 'child', ['textVar1']),
        ...createRecordInfoMetadata(),
        createTextVar('textVar1', 'text1', []),
      ]),
    } as Dependencies;

    const recordWrapper = {
      record: {
        data: {
          name: 'root',
          children: [
            createRecordInfoData(),
            {
              name: 'child',
              children: [{ name: 'text1', value: 'some value' }],
            },
            {
              name: 'child',
              children: [{ name: 'text1', value: 'some other value' }],
            },
          ],
        },
      },
    } as RecordWrapper;

    const transformData = transformRecord(
      mockDependencies,
      recordWrapper,
      'view',
    );

    expect(transformData).toEqual({
      id: 'someRecordId',
      recordType: 'someRecordTypeId',
      updated: [],
      userRights: [],
      validationType: 'someValidationTypeId',
      data: {
        root: {
          fromStorage: true,
          recordInfo: {
            fromStorage: true,
            required: true,
            id: { value: 'someRecordId', required: true },
            type: {
              linkedRecordType: 'recordType',
              value: 'someRecordTypeId',
              required: true,
            },
            validationType: {
              linkedRecordType: 'validationType',
              value: 'someValidationTypeId',
              required: true,
            },
          },
          child: [
            {
              required: true,
              fromStorage: true,
              text1: { required: true, value: 'some value' },
            },
            {
              required: true,
              fromStorage: true,
              text1: { required: true, value: 'some other value' },
            },
          ],
        },
      },
    });
  });

  it('should mark final value', () => {
    const mockDependencies = {
      validationTypePool: listToPool([
        createValidationType('someValidationTypeId'),
      ]),
      recordTypePool: listToPool([
        createRecordType('someRecordTypeId', { metadataId: 'rootGroup' }),
      ]),
      metadataPool: listToPool([
        createGroup('rootGroup', 'root', ['recordInfoGroup', 'textVar1']),
        ...createRecordInfoMetadata(),
        createTextVar('textVar1', 'text1', [], undefined, {
          finalValue: 'final value',
        }),
      ]),
    } as Dependencies;

    const recordWrapper = {
      record: {
        data: {
          name: 'root',
          children: [
            createRecordInfoData(),
            { name: 'text1', value: 'final value' },
          ],
        },
      },
    } as RecordWrapper;

    const transformData = transformRecord(
      mockDependencies,
      recordWrapper,
      'view',
    );

    expect(transformData).toEqual({
      id: 'someRecordId',
      recordType: 'someRecordTypeId',
      updated: [],
      userRights: [],
      validationType: 'someValidationTypeId',
      data: {
        root: {
          fromStorage: true,
          recordInfo: {
            fromStorage: true,
            required: true,
            id: { value: 'someRecordId', required: true },
            type: {
              linkedRecordType: 'recordType',
              value: 'someRecordTypeId',
              required: true,
            },
            validationType: {
              linkedRecordType: 'validationType',
              value: 'someValidationTypeId',
              required: true,
            },
          },
          text1: { final: true, required: true, value: 'final value' },
        },
      },
    });
  });

  it('should use final value from metadata over data', () => {
    const mockDependencies = {
      validationTypePool: listToPool([
        createValidationType('someValidationTypeId'),
      ]),
      recordTypePool: listToPool([
        createRecordType('someRecordTypeId', { metadataId: 'rootGroup' }),
      ]),
      metadataPool: listToPool([
        createGroup('rootGroup', 'root', ['recordInfoGroup', 'textVar1']),
        ...createRecordInfoMetadata(),
        createTextVar('textVar1', 'text1', [], undefined, {
          finalValue: 'final value from metadata',
        }),
      ]),
    } as Dependencies;

    const recordWrapper = {
      record: {
        data: {
          name: 'root',
          children: [
            createRecordInfoData(),
            { name: 'text1', value: 'value from data' },
          ],
        },
      },
    } as RecordWrapper;

    const transformData = transformRecord(
      mockDependencies,
      recordWrapper,
      'view',
    );

    expect(transformData).toEqual({
      id: 'someRecordId',
      recordType: 'someRecordTypeId',
      updated: [],
      userRights: [],
      validationType: 'someValidationTypeId',
      data: {
        root: {
          fromStorage: true,
          recordInfo: {
            fromStorage: true,
            required: true,
            id: { value: 'someRecordId', required: true },
            type: {
              linkedRecordType: 'recordType',
              value: 'someRecordTypeId',
              required: true,
            },
            validationType: {
              linkedRecordType: 'validationType',
              value: 'someValidationTypeId',
              required: true,
            },
          },
          text1: {
            final: true,
            required: true,
            value: 'final value from metadata',
          },
        },
      },
    });
  });

  it('should handle attributes on root group', () => {
    const mockDependencies = {
      validationTypePool: listToPool([
        createValidationType('someValidationTypeId'),
      ]),
      recordTypePool: listToPool([
        createRecordType('someRecordTypeId', { metadataId: 'rootGroup' }),
      ]),
      metadataPool: listToPool([
        createGroup('rootGroup', 'root', ['recordInfoGroup', 'textVar1'], {
          attributeReferences: [{ refCollectionVarId: 'attrColVar' }],
        }),
        ...createRecordInfoMetadata(),
        createTextVar('textVar1', 'text1', []),
        ...createCollVar('attrColVar', 'attr', ['val1', 'val2'], []),
      ]),
    } as Dependencies;

    const recordWrapper = {
      record: {
        data: {
          name: 'root',
          attributes: {
            attr: 'val1',
          },
          children: [
            createRecordInfoData(),
            { name: 'text1', value: 'some value' },
          ],
        },
        actionLinks: {},
      },
    } as RecordWrapper;

    const transformData = transformRecord(
      mockDependencies,
      recordWrapper,
      'view',
    );

    expect(transformData).toEqual({
      id: 'someRecordId',
      recordType: 'someRecordTypeId',
      updated: [],
      userRights: [],
      validationType: 'someValidationTypeId',
      actionLinks: {},
      data: {
        root: {
          fromStorage: true,
          _attr: 'val1',
          recordInfo: {
            fromStorage: true,
            required: true,
            id: { value: 'someRecordId', required: true },
            type: {
              linkedRecordType: 'recordType',
              value: 'someRecordTypeId',
              required: true,
            },
            validationType: {
              linkedRecordType: 'validationType',
              value: 'someValidationTypeId',
              required: true,
            },
          },
          text1: { required: true, value: 'some value' },
        },
      },
    });
  });

  describe('decorated', () => {
    it('should handle linked record in data', () => {
      const mockDependencies = {
        validationTypePool: listToPool([
          createValidationType('someValidationTypeId'),
          createValidationType('someOtherValidationTypeId'),
        ]),
        recordTypePool: listToPool([
          createRecordType('someRecordTypeId', { metadataId: 'rootGroup' }),
          createRecordType('someOtherRecordTypeId', {
            metadataId: 'someOtherRecordTypeRootGroup',
          }),
        ]),
        metadataPool: listToPool([
          createGroup('rootGroup', 'root', [
            'recordInfoGroup',
            'someRecordLinkId',
          ]),
          ...createRecordInfoMetadata(),
          createRecordLink('someRecordLinkId', 'someOtherRecordType', {
            nameInData: 'someRecordLink',
          }),
          createGroup(
            'someOtherRecordTypeRootGroup',
            'someOtherRecordTypeRoot',
            ['recordInfoGroup', 'someFieldId'],
          ),
          createTextVar('someFieldId', 'someField', []),
        ]),
      } as Dependencies;

      const recordWrapper = {
        record: {
          data: {
            name: 'root',
            children: [
              createRecordInfoData(),
              {
                name: 'someRecordLink',
                children: [
                  { name: 'linkedRecordId', value: 'someRecordLink' },
                  { name: 'linkedRecordType', value: 'someOtherRecordType' },
                  {
                    name: 'linkedRecord',
                    children: [
                      {
                        name: 'someOtherRecordTypeRoot',
                        children: [
                          createRecordInfoData({
                            id: 'someOtherRecordId',
                            recordTypeId: 'someOtherRecordTypeId',
                            validationTypeId: 'someOtherValidationTypeId',
                          }),
                          { name: 'someField', value: 'someValue' },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      } as RecordWrapper;

      const transformData = transformRecord(
        mockDependencies,
        recordWrapper,
        'view',
      );

      expect(transformData.data.root.someRecordLink).toEqual({
        linkedRecordType: 'someOtherRecordType',
        required: true,
        value: 'someRecordLink',
        linkedRecord: {
          someOtherRecordTypeRoot: {
            fromStorage: true,
            recordInfo: {
              fromStorage: true,
              required: true,
              id: { value: 'someOtherRecordId', required: true },
              type: {
                linkedRecordType: 'recordType',
                value: 'someOtherRecordTypeId',
                required: true,
              },
              validationType: {
                linkedRecordType: 'validationType',
                value: 'someOtherValidationTypeId',
                required: true,
              },
            },
            someField: {
              required: true,
              value: 'someValue',
            },
          },
        },
      });
    });
  });

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
        memberPool: listToPool<BFFMember>([]),
        organisationPool: listToPool<BFFOrganisation>([]),
      } as Dependencies;
    });

    describe('organisation display name', () => {
      const dependenciesMock = {
        organisationPool: listToPool<BFFOrganisation>([
          {
            id: 'organisation:1',
            parentOrganisationId: 'organisation:2',
            name: {
              sv: 'Institutionen för mikrobiologi',
              en: 'Institution for Microbiology',
            },
          },
          {
            id: 'organisation:2',
            parentOrganisationId: 'organisation:3',
            name: { sv: 'Biologiska faktulteten', en: 'Faculty for Biology' },
          },
          {
            id: 'organisation:3',
            parentOrganisationId: 'organisation:4',
            name: {
              sv: 'Vetenskapsområdet för naturvetenskap',
              en: 'Area of Nature',
            },
          },
          {
            id: 'organisation:4',
            name: {
              sv: 'Uppsala universitet',
              en: 'Uppsala University',
            },
          },
        ]),
        recordTypePool: listToPool<BFFRecordType>([
          createRecordType('someRecordTypeId', { metadataId: 'parentGroup' }),
          {
            id: 'diva-organisation',
            metadataId: 'diva-organisation-metadata',
          } as BFFRecordType,
        ]),
        validationTypePool: listToPool<BFFValidationType>([
          createValidationType('someValidationTypeId'),
        ]),
        metadataPool: listToPool<BFFMetadata>([
          createGroup('parentGroup', 'parent', [
            'recordInfoGroup',
            'someOrganisationRecordLink',
          ]),
          ...createRecordInfoMetadata(),
          {
            id: 'diva-organisation-metadata',
            type: 'group',
            nameInData: 'organisation',
            textId: '',
            defTextId: '',
            children: [],
          } as BFFMetadataGroup,
        ]),
      } as Dependencies;

      it('builds display name from organisation with no parent', () => {
        const data: DataGroup = {
          name: 'parent',
          children: [
            {
              name: 'someOrganisationRecordLink',
              children: [
                { name: 'linkedRecordType', value: 'diva-organisation' },
                { name: 'linkedRecordId', value: 'organisation:4' },
                {
                  name: 'linkedRecord',
                  children: [
                    {
                      name: 'organisation',
                      children: [
                        {
                          name: 'recordInfo',
                          children: [
                            { name: 'id', value: 'organisation:4' },
                            {
                              name: 'type',
                              children: [
                                {
                                  name: 'linkedRecordType',
                                  value: 'recordType',
                                },
                                {
                                  name: 'linkedRecordId',
                                  value: 'diva-organisation',
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        };

        const formMetadata: FormMetaData = {
          type: 'group',
          name: 'parent',
          repeat: { repeatMin: 1, repeatMax: 1 },
          children: [
            {
              type: 'recordLink',
              name: 'someOrganisationRecordLink',
              linkedRecordType: 'diva-organisation',
              repeat: { repeatMin: 1, repeatMax: 1 },
            },
          ],
        };

        const result = transformRecordData(
          data,
          formMetadata,
          dependenciesMock,
        );

        expect(result).toStrictEqual({
          parent: {
            fromStorage: true,
            someOrganisationRecordLink: {
              value: 'organisation:4',
              linkedRecordType: 'diva-organisation',
              displayName: {
                en: 'Uppsala University',
                sv: 'Uppsala universitet',
              },
              linkedRecord: { organisation: { fromStorage: true } },
              required: true,
            },
          },
        });
      });

      it('builds display name from organisation with three parents', () => {
        const data: DataGroup = {
          name: 'parent',
          children: [
            {
              name: 'someOrganisationRecordLink',
              children: [
                { name: 'linkedRecordType', value: 'diva-organisation' },
                { name: 'linkedRecordId', value: 'organisation:1' },
                {
                  name: 'linkedRecord',
                  children: [
                    {
                      name: 'organisation',
                      children: [
                        {
                          name: 'recordInfo',
                          children: [
                            { name: 'id', value: 'organisation:1234' },
                            {
                              name: 'type',
                              children: [
                                {
                                  name: 'linkedRecordType',
                                  value: 'recordType',
                                },
                                {
                                  name: 'linkedRecordId',
                                  value: 'diva-organisation',
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        };

        const formMetadata: FormMetaData = {
          type: 'group',
          name: 'parent',
          repeat: { repeatMin: 1, repeatMax: 1 },
          children: [
            {
              type: 'recordLink',
              name: 'someOrganisationRecordLink',
              linkedRecordType: 'diva-organisation',
              repeat: { repeatMin: 1, repeatMax: 1 },
            },
          ],
        };

        const result = transformRecordData(
          data,
          formMetadata,
          dependenciesMock,
        );

        expect(result).toStrictEqual({
          parent: {
            fromStorage: true,
            someOrganisationRecordLink: {
              value: 'organisation:1',
              linkedRecordType: 'diva-organisation',
              displayName: {
                en: 'Institution for Microbiology, Faculty for Biology, Area of Nature, Uppsala University',
                sv: 'Institutionen för mikrobiologi, Biologiska faktulteten, Vetenskapsområdet för naturvetenskap, Uppsala universitet',
              },
              linkedRecord: { organisation: { fromStorage: true } },
              required: true,
            },
          },
        });
      });

      it('handles organisation that does not exist in pool', () => {
        const data: DataGroup = {
          name: 'parent',
          children: [
            {
              name: 'someOrganisationRecordLink',
              children: [
                { name: 'linkedRecordType', value: 'diva-organisation' },
                {
                  name: 'linkedRecordId',
                  value: 'someNonExistingOrganisationId',
                },
                {
                  name: 'linkedRecord',
                  children: [
                    {
                      name: 'organisation',
                      children: [
                        {
                          name: 'recordInfo',
                          children: [
                            { name: 'id', value: 'organisation:4' },
                            {
                              name: 'type',
                              children: [
                                {
                                  name: 'linkedRecordType',
                                  value: 'recordType',
                                },
                                {
                                  name: 'linkedRecordId',
                                  value: 'diva-organisation',
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        };

        const formMetadata: FormMetaData = {
          type: 'group',
          name: 'parent',
          repeat: { repeatMin: 1, repeatMax: 1 },
          children: [
            {
              type: 'recordLink',
              name: 'someOrganisationRecordLink',
              linkedRecordType: 'diva-organisation',
              repeat: { repeatMin: 1, repeatMax: 1 },
            },
          ],
        };

        const result = transformRecordData(
          data,
          formMetadata,
          dependenciesMock,
        );

        expect(result).toStrictEqual({
          parent: {
            fromStorage: true,
            someOrganisationRecordLink: {
              value: 'someNonExistingOrganisationId',
              linkedRecordType: 'diva-organisation',
              linkedRecord: { organisation: { fromStorage: true } },
              required: true,
            },
          },
        });
      });
    });
  });

  describe('userRights', () => {
    describe('trash/untrash rights', () => {
      it('includes trash right when recordType has useTrashBin set to true and data has an update actionLink', () => {
        const dependencies = {
          validationTypePool: listToPool<BFFValidationType>([
            {
              id: 'diva-person',
              metadataGroupId: 'someRootGroup',
              validatesRecordTypeId: 'someRecordTypeId',
            } as BFFValidationType,
          ]),
          metadataPool: listToPool<BFFMetadata>([
            {
              id: 'someRootGroup',
              type: 'group',
              children: [
                { childId: 'recordInfoGroup', repeatMin: '1', repeatMax: '1' },
              ],
            } as BFFMetadataGroup,
            {
              id: 'recordInfoGroup',
              nameInData: 'recordInfo',
              type: 'group',
              children: [
                { childId: 'trashBinVar', repeatMin: '1', repeatMax: '1' },
                { childId: 'idVar', repeatMin: '1', repeatMax: '1' },
                { childId: 'typeLink', repeatMin: '1', repeatMax: '1' },
                {
                  childId: 'validationTypeLink',
                  repeatMin: '1',
                  repeatMax: '1',
                },
              ],
            } as BFFMetadataGroup,
            {
              id: 'trashBinVar',
              type: 'textVariable',
              nameInData: 'inTrashBin',
            } as BFFMetadataTextVariable,
            {
              id: 'idVar',
              type: 'textVariable',
              nameInData: 'id',
            } as BFFMetadataTextVariable,
            {
              id: 'typeLink',
              type: 'recordLink',
              nameInData: 'type',
              linkedRecordType: 'recordType',
            } as BFFMetadataRecordLink,
            {
              id: 'validationTypeLink',
              type: 'recordLink',
              nameInData: 'validationType',
              linkedRecordType: 'validationType',
            } as BFFMetadataRecordLink,
          ]),
          recordTypePool: listToPool<BFFRecordType>([
            {
              id: 'someRecordTypeId',
              metadataId: 'someRootGroup',
              useTrashBin: true,
            } as BFFRecordType,
          ]),
        } as Dependencies;

        const record: RecordWrapper = {
          record: {
            data: {
              name: 'someRootGroup',
              children: [
                {
                  name: 'recordInfo',
                  children: [
                    { name: 'id', value: '1234' },
                    {
                      name: 'type',
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'recordType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'someRecordTypeId',
                        },
                      ],
                    },
                    {
                      name: 'validationType',
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'validationType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'diva-person',
                        },
                      ],
                    },
                    { name: 'inTrashBin', value: 'false' },
                  ],
                },
              ],
            },
            actionLinks: {
              update: {} as ActionLink,
            },
          },
        };

        const result = transformRecord(dependencies, record, 'update');
        expect(result.userRights).toContain('trash');
        expect(result.userRights).not.toContain('untrash');
      });

      it('does not include trash right when inTrashBin is not present in recordInfo and data has an update actionLink', () => {
        const dependencies = {
          validationTypePool: listToPool<BFFValidationType>([
            {
              id: 'diva-person',
              metadataGroupId: 'someRootGroup',
              validatesRecordTypeId: 'someRecordTypeId',
            } as BFFValidationType,
          ]),
          metadataPool: listToPool<BFFMetadata>([
            {
              id: 'someRootGroup',
              type: 'group',
              children: [
                { childId: 'recordInfoGroup', repeatMin: '1', repeatMax: '1' },
              ],
            } as BFFMetadataGroup,
            {
              id: 'recordInfoGroup',
              nameInData: 'recordInfo',
              type: 'group',
              children: [
                { childId: 'idVar', repeatMin: '1', repeatMax: '1' },
                { childId: 'typeLink', repeatMin: '1', repeatMax: '1' },
                {
                  childId: 'validationTypeLink',
                  repeatMin: '1',
                  repeatMax: '1',
                },
              ],
            } as BFFMetadataGroup,
            {
              id: 'idVar',
              type: 'textVariable',
              nameInData: 'id',
            } as BFFMetadataTextVariable,
            {
              id: 'typeLink',
              type: 'recordLink',
              nameInData: 'type',
              linkedRecordType: 'recordType',
            } as BFFMetadataRecordLink,
            {
              id: 'validationTypeLink',
              type: 'recordLink',
              nameInData: 'validationType',
              linkedRecordType: 'validationType',
            } as BFFMetadataRecordLink,
          ]),
          recordTypePool: listToPool<BFFRecordType>([
            {
              id: 'someRecordTypeId',
              metadataId: 'someRootGroup',
              useTrashBin: false,
            } as BFFRecordType,
          ]),
        } as Dependencies;

        const record: RecordWrapper = {
          record: {
            data: {
              name: 'someRootGroup',
              children: [
                {
                  name: 'recordInfo',
                  children: [
                    { name: 'id', value: '1234' },
                    {
                      name: 'type',
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'recordType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'someRecordTypeId',
                        },
                      ],
                    },
                    {
                      name: 'validationType',
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'validationType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'diva-person',
                        },
                      ],
                    },
                    {
                      name: 'inTrashBin',
                      value: 'false',
                    },
                  ],
                },
              ],
            },
            actionLinks: {
              update: {} as ActionLink,
            },
          },
        };

        const result = transformRecord(dependencies, record, 'update');
        expect(result.userRights).not.toContain('trash');
      });

      it('does not include trash right when recordType has useTrashBin set to true and data does not have an update actionLink', () => {
        const dependencies = {
          validationTypePool: listToPool<BFFValidationType>([
            {
              id: 'diva-person',
              metadataGroupId: 'someRootGroup',
              validatesRecordTypeId: 'someRecordTypeId',
            } as BFFValidationType,
          ]),
          metadataPool: listToPool<BFFMetadata>([
            {
              id: 'someRootGroup',
              type: 'group',
              children: [
                { childId: 'recordInfoGroup', repeatMin: '1', repeatMax: '1' },
              ],
            } as BFFMetadataGroup,
            {
              id: 'recordInfoGroup',
              nameInData: 'recordInfo',
              type: 'group',
              children: [
                { childId: 'trashBinVar', repeatMin: '1', repeatMax: '1' },
                { childId: 'idVar', repeatMin: '1', repeatMax: '1' },
                { childId: 'typeLink', repeatMin: '1', repeatMax: '1' },
                {
                  childId: 'validationTypeLink',
                  repeatMin: '1',
                  repeatMax: '1',
                },
              ],
            } as BFFMetadataGroup,
            {
              id: 'trashBinVar',
              type: 'textVariable',
              nameInData: 'inTrashBin',
            } as BFFMetadataTextVariable,
            {
              id: 'idVar',
              type: 'textVariable',
              nameInData: 'id',
            } as BFFMetadataTextVariable,
            {
              id: 'typeLink',
              type: 'recordLink',
              nameInData: 'type',
              linkedRecordType: 'recordType',
            } as BFFMetadataRecordLink,
            {
              id: 'validationTypeLink',
              type: 'recordLink',
              nameInData: 'validationType',
              linkedRecordType: 'validationType',
            } as BFFMetadataRecordLink,
          ]),
          recordTypePool: listToPool<BFFRecordType>([
            {
              id: 'someRecordTypeId',
              metadataId: 'someRootGroup',
              useTrashBin: true,
            } as BFFRecordType,
          ]),
        } as Dependencies;

        const record: RecordWrapper = {
          record: {
            data: {
              name: 'someRootGroup',
              children: [
                {
                  name: 'recordInfo',
                  children: [
                    { name: 'id', value: '1234' },
                    {
                      name: 'type',
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'recordType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'someRecordTypeId',
                        },
                      ],
                    },
                    {
                      name: 'validationType',
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'validationType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'diva-person',
                        },
                      ],
                    },
                    { name: 'inTrashBin', value: 'false' },
                  ],
                },
              ],
            },
            actionLinks: {},
          },
        };

        const result = transformRecord(dependencies, record, 'update');
        expect(result.userRights).not.toContain('trash');
      });

      it('includes untrash right when recordType has useTrashBin set to true and data has an update actionLink and record is in trash', () => {
        const dependencies = {
          validationTypePool: listToPool<BFFValidationType>([
            {
              id: 'diva-person',
              metadataGroupId: 'someRootGroup',
              validatesRecordTypeId: 'someRecordTypeId',
            } as BFFValidationType,
          ]),
          metadataPool: listToPool<BFFMetadata>([
            {
              id: 'someRootGroup',
              type: 'group',
              children: [
                { childId: 'recordInfoGroup', repeatMin: '1', repeatMax: '1' },
              ],
            } as BFFMetadataGroup,
            {
              id: 'recordInfoGroup',
              nameInData: 'recordInfo',
              type: 'group',
              children: [
                { childId: 'trashBinVar', repeatMin: '1', repeatMax: '1' },
                { childId: 'idVar', repeatMin: '1', repeatMax: '1' },
                { childId: 'typeLink', repeatMin: '1', repeatMax: '1' },
                {
                  childId: 'validationTypeLink',
                  repeatMin: '1',
                  repeatMax: '1',
                },
              ],
            } as BFFMetadataGroup,
            {
              id: 'trashBinVar',
              type: 'textVariable',
              nameInData: 'inTrashBin',
            } as BFFMetadataTextVariable,
            {
              id: 'idVar',
              type: 'textVariable',
              nameInData: 'id',
            } as BFFMetadataTextVariable,
            {
              id: 'typeLink',
              type: 'recordLink',
              nameInData: 'type',
              linkedRecordType: 'recordType',
            } as BFFMetadataRecordLink,
            {
              id: 'validationTypeLink',
              type: 'recordLink',
              nameInData: 'validationType',
              linkedRecordType: 'validationType',
            } as BFFMetadataRecordLink,
          ]),
          recordTypePool: listToPool<BFFRecordType>([
            {
              id: 'someRecordTypeId',
              metadataId: 'someRootGroup',
              useTrashBin: true,
            } as BFFRecordType,
          ]),
        } as Dependencies;

        const record: RecordWrapper = {
          record: {
            data: {
              name: 'someRootGroup',
              children: [
                {
                  name: 'recordInfo',
                  children: [
                    { name: 'id', value: '1234' },
                    {
                      name: 'type',
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'recordType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'someRecordTypeId',
                        },
                      ],
                    },
                    {
                      name: 'validationType',
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'validationType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'diva-person',
                        },
                      ],
                    },
                    { name: 'inTrashBin', value: 'true' },
                  ],
                },
              ],
            },
            actionLinks: {
              update: {} as ActionLink,
            },
          },
        };

        const result = transformRecord(dependencies, record, 'update');
        expect(result.userRights).toContain('untrash');
        expect(result.userRights).not.toContain('trash');
      });
    });

    describe('publish / unpublish right', () => {
      it('does not include publish right when user does not have update action link', () => {
        const dependencies = {
          validationTypePool: listToPool<BFFValidationType>([
            {
              id: 'diva-person',
              metadataGroupId: 'someRootGroup',
              validatesRecordTypeId: 'someRecordTypeId',
            } as BFFValidationType,
          ]),
          metadataPool: listToPool<BFFMetadata>([
            {
              id: 'someRootGroup',
              type: 'group',
              children: [
                { childId: 'recordInfoGroup', repeatMin: '1', repeatMax: '1' },
              ],
            } as BFFMetadataGroup,
            {
              id: 'recordInfoGroup',
              nameInData: 'recordInfo',
              type: 'group',
              children: [
                { childId: 'visibilityVar', repeatMin: '1', repeatMax: '1' },
                { childId: 'idVar', repeatMin: '1', repeatMax: '1' },
                { childId: 'typeLink', repeatMin: '1', repeatMax: '1' },
                {
                  childId: 'validationTypeLink',
                  repeatMin: '1',
                  repeatMax: '1',
                },
              ],
            } as BFFMetadataGroup,
            {
              id: 'visibilityVar',
              type: 'textVariable',
              nameInData: 'visibility',
            } as BFFMetadataTextVariable,
            {
              id: 'idVar',
              type: 'textVariable',
              nameInData: 'id',
            } as BFFMetadataTextVariable,
            {
              id: 'typeLink',
              type: 'recordLink',
              nameInData: 'type',
              linkedRecordType: 'recordType',
            } as BFFMetadataRecordLink,
            {
              id: 'validationTypeLink',
              type: 'recordLink',
              nameInData: 'validationType',
              linkedRecordType: 'validationType',
            } as BFFMetadataRecordLink,
          ]),
          recordTypePool: listToPool<BFFRecordType>([
            {
              id: 'someRecordTypeId',
              metadataId: 'someRootGroup',
              useTrashBin: true,
            } as BFFRecordType,
          ]),
        } as Dependencies;

        const record: RecordWrapper = {
          record: {
            data: {
              name: 'someRootGroup',
              children: [
                {
                  name: 'recordInfo',
                  children: [
                    { name: 'id', value: '1234' },
                    {
                      name: 'type',
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'recordType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'someRecordTypeId',
                        },
                      ],
                    },
                    {
                      name: 'validationType',
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'validationType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'diva-person',
                        },
                      ],
                    },
                    { name: 'visibility', value: 'unpublished' },
                  ],
                },
              ],
            },
            actionLinks: {
              read: {} as ActionLink,
            },
          },
        };

        const result = transformRecord(dependencies, record, 'update');
        expect(result.userRights).not.toContain('publish');
      });

      it('does not include publish right when record does not have visibility', () => {
        const dependencies = {
          validationTypePool: listToPool<BFFValidationType>([
            {
              id: 'diva-person',
              metadataGroupId: 'someRootGroup',
              validatesRecordTypeId: 'someRecordTypeId',
            } as BFFValidationType,
          ]),
          metadataPool: listToPool<BFFMetadata>([
            {
              id: 'someRootGroup',
              type: 'group',
              children: [
                { childId: 'recordInfoGroup', repeatMin: '1', repeatMax: '1' },
              ],
            } as BFFMetadataGroup,
            {
              id: 'recordInfoGroup',
              nameInData: 'recordInfo',
              type: 'group',
              children: [
                { childId: 'idVar', repeatMin: '1', repeatMax: '1' },
                { childId: 'typeLink', repeatMin: '1', repeatMax: '1' },
                {
                  childId: 'validationTypeLink',
                  repeatMin: '1',
                  repeatMax: '1',
                },
              ],
            } as BFFMetadataGroup,

            {
              id: 'idVar',
              type: 'textVariable',
              nameInData: 'id',
            } as BFFMetadataTextVariable,
            {
              id: 'typeLink',
              type: 'recordLink',
              nameInData: 'type',
              linkedRecordType: 'recordType',
            } as BFFMetadataRecordLink,
            {
              id: 'validationTypeLink',
              type: 'recordLink',
              nameInData: 'validationType',
              linkedRecordType: 'validationType',
            } as BFFMetadataRecordLink,
          ]),
          recordTypePool: listToPool<BFFRecordType>([
            {
              id: 'someRecordTypeId',
              metadataId: 'someRootGroup',
              useTrashBin: true,
            } as BFFRecordType,
          ]),
        } as Dependencies;

        const record: RecordWrapper = {
          record: {
            data: {
              name: 'someRootGroup',
              children: [
                {
                  name: 'recordInfo',
                  children: [
                    { name: 'id', value: '1234' },
                    {
                      name: 'type',
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'recordType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'someRecordTypeId',
                        },
                      ],
                    },
                    {
                      name: 'validationType',
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'validationType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'diva-person',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            actionLinks: {
              read: {} as ActionLink,
              update: {} as ActionLink,
            },
          },
        };

        const result = transformRecord(dependencies, record, 'update');
        expect(result.userRights).not.toContain('publish');
      });

      it('does not include publish right when visibility is published', () => {
        const dependencies = {
          validationTypePool: listToPool<BFFValidationType>([
            {
              id: 'diva-person',
              metadataGroupId: 'someRootGroup',
              validatesRecordTypeId: 'someRecordTypeId',
            } as BFFValidationType,
          ]),
          metadataPool: listToPool<BFFMetadata>([
            {
              id: 'someRootGroup',
              type: 'group',
              children: [
                { childId: 'recordInfoGroup', repeatMin: '1', repeatMax: '1' },
              ],
            } as BFFMetadataGroup,
            {
              id: 'recordInfoGroup',
              nameInData: 'recordInfo',
              type: 'group',
              children: [
                { childId: 'visibilityVar', repeatMin: '1', repeatMax: '1' },
                { childId: 'idVar', repeatMin: '1', repeatMax: '1' },
                { childId: 'typeLink', repeatMin: '1', repeatMax: '1' },
                {
                  childId: 'validationTypeLink',
                  repeatMin: '1',
                  repeatMax: '1',
                },
              ],
            } as BFFMetadataGroup,
            {
              id: 'visibilityVar',
              type: 'textVariable',
              nameInData: 'visibility',
            } as BFFMetadataTextVariable,
            {
              id: 'idVar',
              type: 'textVariable',
              nameInData: 'id',
            } as BFFMetadataTextVariable,
            {
              id: 'typeLink',
              type: 'recordLink',
              nameInData: 'type',
              linkedRecordType: 'recordType',
            } as BFFMetadataRecordLink,
            {
              id: 'validationTypeLink',
              type: 'recordLink',
              nameInData: 'validationType',
              linkedRecordType: 'validationType',
            } as BFFMetadataRecordLink,
          ]),
          recordTypePool: listToPool<BFFRecordType>([
            {
              id: 'someRecordTypeId',
              metadataId: 'someRootGroup',
              useTrashBin: true,
            } as BFFRecordType,
          ]),
        } as Dependencies;

        const record: RecordWrapper = {
          record: {
            data: {
              name: 'someRootGroup',
              children: [
                {
                  name: 'recordInfo',
                  children: [
                    { name: 'id', value: '1234' },
                    {
                      name: 'type',
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'recordType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'someRecordTypeId',
                        },
                      ],
                    },
                    {
                      name: 'validationType',
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'validationType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'diva-person',
                        },
                      ],
                    },
                    { name: 'visibility', value: 'published' },
                  ],
                },
              ],
            },
            actionLinks: {
              read: {} as ActionLink,
              update: {} as ActionLink,
            },
          },
        };

        const result = transformRecord(dependencies, record, 'update');
        expect(result.userRights).not.toContain('publish');
      });

      it('does include publish right when user does have update action link and visibility is unpublished', () => {
        const dependencies = {
          validationTypePool: listToPool<BFFValidationType>([
            {
              id: 'diva-person',
              metadataGroupId: 'someRootGroup',
              validatesRecordTypeId: 'someRecordTypeId',
            } as BFFValidationType,
          ]),
          metadataPool: listToPool<BFFMetadata>([
            {
              id: 'someRootGroup',
              type: 'group',
              children: [
                { childId: 'recordInfoGroup', repeatMin: '1', repeatMax: '1' },
              ],
            } as BFFMetadataGroup,
            {
              id: 'recordInfoGroup',
              nameInData: 'recordInfo',
              type: 'group',
              children: [
                { childId: 'visibilityVar', repeatMin: '1', repeatMax: '1' },
                { childId: 'idVar', repeatMin: '1', repeatMax: '1' },
                { childId: 'typeLink', repeatMin: '1', repeatMax: '1' },
                {
                  childId: 'validationTypeLink',
                  repeatMin: '1',
                  repeatMax: '1',
                },
              ],
            } as BFFMetadataGroup,
            {
              id: 'visibilityVar',
              type: 'textVariable',
              nameInData: 'visibility',
            } as BFFMetadataTextVariable,
            {
              id: 'idVar',
              type: 'textVariable',
              nameInData: 'id',
            } as BFFMetadataTextVariable,
            {
              id: 'typeLink',
              type: 'recordLink',
              nameInData: 'type',
              linkedRecordType: 'recordType',
            } as BFFMetadataRecordLink,
            {
              id: 'validationTypeLink',
              type: 'recordLink',
              nameInData: 'validationType',
              linkedRecordType: 'validationType',
            } as BFFMetadataRecordLink,
          ]),
          recordTypePool: listToPool<BFFRecordType>([
            {
              id: 'someRecordTypeId',
              metadataId: 'someRootGroup',
              useTrashBin: true,
            } as BFFRecordType,
          ]),
        } as Dependencies;

        const record: RecordWrapper = {
          record: {
            data: {
              name: 'someRootGroup',
              children: [
                {
                  name: 'recordInfo',
                  children: [
                    { name: 'id', value: '1234' },
                    {
                      name: 'type',
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'recordType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'someRecordTypeId',
                        },
                      ],
                    },
                    {
                      name: 'validationType',
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'validationType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'diva-person',
                        },
                      ],
                    },
                    { name: 'visibility', value: 'unpublished' },
                  ],
                },
              ],
            },
            actionLinks: {
              read: {} as ActionLink,
              update: {} as ActionLink,
            },
          },
        };

        const result = transformRecord(dependencies, record, 'update');
        expect(result.userRights).toContain('publish');
      });

      it('does not include publish right when record is in trash bin', () => {
        const dependencies = {
          validationTypePool: listToPool<BFFValidationType>([
            {
              id: 'diva-person',
              metadataGroupId: 'someRootGroup',
              validatesRecordTypeId: 'someRecordTypeId',
            } as BFFValidationType,
          ]),
          metadataPool: listToPool<BFFMetadata>([
            {
              id: 'someRootGroup',
              type: 'group',
              children: [
                { childId: 'recordInfoGroup', repeatMin: '1', repeatMax: '1' },
              ],
            } as BFFMetadataGroup,
            {
              id: 'recordInfoGroup',
              nameInData: 'recordInfo',
              type: 'group',
              children: [
                { childId: 'trashBinVar', repeatMin: '1', repeatMax: '1' },
                { childId: 'visibilityVar', repeatMin: '1', repeatMax: '1' },
                { childId: 'idVar', repeatMin: '1', repeatMax: '1' },
                { childId: 'typeLink', repeatMin: '1', repeatMax: '1' },
                {
                  childId: 'validationTypeLink',
                  repeatMin: '1',
                  repeatMax: '1',
                },
              ],
            } as BFFMetadataGroup,
            {
              id: 'trashBinVar',
              type: 'textVariable',
              nameInData: 'inTrashBin',
            } as BFFMetadataTextVariable,
            {
              id: 'visibilityVar',
              type: 'textVariable',
              nameInData: 'visibility',
            } as BFFMetadataTextVariable,
            {
              id: 'idVar',
              type: 'textVariable',
              nameInData: 'id',
            } as BFFMetadataTextVariable,
            {
              id: 'typeLink',
              type: 'recordLink',
              nameInData: 'type',
              linkedRecordType: 'recordType',
            } as BFFMetadataRecordLink,
            {
              id: 'validationTypeLink',
              type: 'recordLink',
              nameInData: 'validationType',
              linkedRecordType: 'validationType',
            } as BFFMetadataRecordLink,
          ]),
          recordTypePool: listToPool<BFFRecordType>([
            {
              id: 'someRecordTypeId',
              metadataId: 'someRootGroup',
              useTrashBin: true,
            } as BFFRecordType,
          ]),
        } as Dependencies;

        const record: RecordWrapper = {
          record: {
            data: {
              name: 'someRootGroup',
              children: [
                {
                  name: 'recordInfo',
                  children: [
                    { name: 'id', value: '1234' },
                    {
                      name: 'type',
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'recordType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'someRecordTypeId',
                        },
                      ],
                    },
                    {
                      name: 'validationType',
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'validationType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'diva-person',
                        },
                      ],
                    },
                    { name: 'inTrashBin', value: 'true' },
                    { name: 'visibility', value: 'unpublished' },
                  ],
                },
              ],
            },
            actionLinks: {
              update: {} as ActionLink,
            },
          },
        };

        const result = transformRecord(dependencies, record, 'update');
        expect(result.userRights).not.toContain('publish');
      });
      it('does not include unpublish right when user does not have update action link', () => {
        const dependencies = {
          validationTypePool: listToPool<BFFValidationType>([
            {
              id: 'diva-person',
              metadataGroupId: 'someRootGroup',
              validatesRecordTypeId: 'someRecordTypeId',
            } as BFFValidationType,
          ]),
          metadataPool: listToPool<BFFMetadata>([
            {
              id: 'someRootGroup',
              type: 'group',
              children: [
                { childId: 'recordInfoGroup', repeatMin: '1', repeatMax: '1' },
              ],
            } as BFFMetadataGroup,
            {
              id: 'recordInfoGroup',
              nameInData: 'recordInfo',
              type: 'group',
              children: [
                { childId: 'visibilityVar', repeatMin: '1', repeatMax: '1' },
                { childId: 'idVar', repeatMin: '1', repeatMax: '1' },
                { childId: 'typeLink', repeatMin: '1', repeatMax: '1' },
                {
                  childId: 'validationTypeLink',
                  repeatMin: '1',
                  repeatMax: '1',
                },
              ],
            } as BFFMetadataGroup,
            {
              id: 'visibilityVar',
              type: 'textVariable',
              nameInData: 'visibility',
            } as BFFMetadataTextVariable,
            {
              id: 'idVar',
              type: 'textVariable',
              nameInData: 'id',
            } as BFFMetadataTextVariable,
            {
              id: 'typeLink',
              type: 'recordLink',
              nameInData: 'type',
              linkedRecordType: 'recordType',
            } as BFFMetadataRecordLink,
            {
              id: 'validationTypeLink',
              type: 'recordLink',
              nameInData: 'validationType',
              linkedRecordType: 'validationType',
            } as BFFMetadataRecordLink,
          ]),
          recordTypePool: listToPool<BFFRecordType>([
            {
              id: 'someRecordTypeId',
              metadataId: 'someRootGroup',
              useTrashBin: true,
            } as BFFRecordType,
          ]),
        } as Dependencies;

        const record: RecordWrapper = {
          record: {
            data: {
              name: 'someRootGroup',
              children: [
                {
                  name: 'recordInfo',
                  children: [
                    { name: 'id', value: '1234' },
                    {
                      name: 'type',
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'recordType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'someRecordTypeId',
                        },
                      ],
                    },
                    {
                      name: 'validationType',
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'validationType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'diva-person',
                        },
                      ],
                    },
                    { name: 'visibility', value: 'published' },
                  ],
                },
              ],
            },
            actionLinks: {
              read: {} as ActionLink,
            },
          },
        };

        const result = transformRecord(dependencies, record, 'update');
        expect(result.userRights).not.toContain('unpublish');
      });

      it('does not include unpublish right when record does not have visibility', () => {
        const dependencies = {
          validationTypePool: listToPool<BFFValidationType>([
            {
              id: 'diva-person',
              metadataGroupId: 'someRootGroup',
              validatesRecordTypeId: 'someRecordTypeId',
            } as BFFValidationType,
          ]),
          metadataPool: listToPool<BFFMetadata>([
            {
              id: 'someRootGroup',
              type: 'group',
              children: [
                { childId: 'recordInfoGroup', repeatMin: '1', repeatMax: '1' },
              ],
            } as BFFMetadataGroup,
            {
              id: 'recordInfoGroup',
              nameInData: 'recordInfo',
              type: 'group',
              children: [
                { childId: 'idVar', repeatMin: '1', repeatMax: '1' },
                { childId: 'typeLink', repeatMin: '1', repeatMax: '1' },
                {
                  childId: 'validationTypeLink',
                  repeatMin: '1',
                  repeatMax: '1',
                },
              ],
            } as BFFMetadataGroup,

            {
              id: 'idVar',
              type: 'textVariable',
              nameInData: 'id',
            } as BFFMetadataTextVariable,
            {
              id: 'typeLink',
              type: 'recordLink',
              nameInData: 'type',
              linkedRecordType: 'recordType',
            } as BFFMetadataRecordLink,
            {
              id: 'validationTypeLink',
              type: 'recordLink',
              nameInData: 'validationType',
              linkedRecordType: 'validationType',
            } as BFFMetadataRecordLink,
          ]),
          recordTypePool: listToPool<BFFRecordType>([
            {
              id: 'someRecordTypeId',
              metadataId: 'someRootGroup',
              useTrashBin: true,
            } as BFFRecordType,
          ]),
        } as Dependencies;

        const record: RecordWrapper = {
          record: {
            data: {
              name: 'someRootGroup',
              children: [
                {
                  name: 'recordInfo',
                  children: [
                    { name: 'id', value: '1234' },
                    {
                      name: 'type',
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'recordType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'someRecordTypeId',
                        },
                      ],
                    },
                    {
                      name: 'validationType',
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'validationType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'diva-person',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            actionLinks: {
              read: {} as ActionLink,
              update: {} as ActionLink,
            },
          },
        };

        const result = transformRecord(dependencies, record, 'update');
        expect(result.userRights).not.toContain('unpublish');
      });

      it('does not include unpublish right when visibility is unpublished', () => {
        const dependencies = {
          validationTypePool: listToPool<BFFValidationType>([
            {
              id: 'diva-person',
              metadataGroupId: 'someRootGroup',
              validatesRecordTypeId: 'someRecordTypeId',
            } as BFFValidationType,
          ]),
          metadataPool: listToPool<BFFMetadata>([
            {
              id: 'someRootGroup',
              type: 'group',
              children: [
                { childId: 'recordInfoGroup', repeatMin: '1', repeatMax: '1' },
              ],
            } as BFFMetadataGroup,
            {
              id: 'recordInfoGroup',
              nameInData: 'recordInfo',
              type: 'group',
              children: [
                { childId: 'visibilityVar', repeatMin: '1', repeatMax: '1' },
                { childId: 'idVar', repeatMin: '1', repeatMax: '1' },
                { childId: 'typeLink', repeatMin: '1', repeatMax: '1' },
                {
                  childId: 'validationTypeLink',
                  repeatMin: '1',
                  repeatMax: '1',
                },
              ],
            } as BFFMetadataGroup,
            {
              id: 'visibilityVar',
              type: 'textVariable',
              nameInData: 'visibility',
            } as BFFMetadataTextVariable,
            {
              id: 'idVar',
              type: 'textVariable',
              nameInData: 'id',
            } as BFFMetadataTextVariable,
            {
              id: 'typeLink',
              type: 'recordLink',
              nameInData: 'type',
              linkedRecordType: 'recordType',
            } as BFFMetadataRecordLink,
            {
              id: 'validationTypeLink',
              type: 'recordLink',
              nameInData: 'validationType',
              linkedRecordType: 'validationType',
            } as BFFMetadataRecordLink,
          ]),
          recordTypePool: listToPool<BFFRecordType>([
            {
              id: 'someRecordTypeId',
              metadataId: 'someRootGroup',
              useTrashBin: true,
            } as BFFRecordType,
          ]),
        } as Dependencies;

        const record: RecordWrapper = {
          record: {
            data: {
              name: 'someRootGroup',
              children: [
                {
                  name: 'recordInfo',
                  children: [
                    { name: 'id', value: '1234' },
                    {
                      name: 'type',
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'recordType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'someRecordTypeId',
                        },
                      ],
                    },
                    {
                      name: 'validationType',
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'validationType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'diva-person',
                        },
                      ],
                    },
                    { name: 'visibility', value: 'unpublished' },
                  ],
                },
              ],
            },
            actionLinks: {
              read: {} as ActionLink,
              update: {} as ActionLink,
            },
          },
        };

        const result = transformRecord(dependencies, record, 'update');
        expect(result.userRights).not.toContain('unpublish');
      });

      it('does include unpublish right when user does have update action link and visibility is published', () => {
        const dependencies = {
          validationTypePool: listToPool<BFFValidationType>([
            {
              id: 'diva-person',
              metadataGroupId: 'someRootGroup',
              validatesRecordTypeId: 'someRecordTypeId',
            } as BFFValidationType,
          ]),
          metadataPool: listToPool<BFFMetadata>([
            {
              id: 'someRootGroup',
              type: 'group',
              children: [
                { childId: 'recordInfoGroup', repeatMin: '1', repeatMax: '1' },
              ],
            } as BFFMetadataGroup,
            {
              id: 'recordInfoGroup',
              nameInData: 'recordInfo',
              type: 'group',
              children: [
                { childId: 'visibilityVar', repeatMin: '1', repeatMax: '1' },
                { childId: 'idVar', repeatMin: '1', repeatMax: '1' },
                { childId: 'typeLink', repeatMin: '1', repeatMax: '1' },
                {
                  childId: 'validationTypeLink',
                  repeatMin: '1',
                  repeatMax: '1',
                },
              ],
            } as BFFMetadataGroup,
            {
              id: 'visibilityVar',
              type: 'textVariable',
              nameInData: 'visibility',
            } as BFFMetadataTextVariable,
            {
              id: 'idVar',
              type: 'textVariable',
              nameInData: 'id',
            } as BFFMetadataTextVariable,
            {
              id: 'typeLink',
              type: 'recordLink',
              nameInData: 'type',
              linkedRecordType: 'recordType',
            } as BFFMetadataRecordLink,
            {
              id: 'validationTypeLink',
              type: 'recordLink',
              nameInData: 'validationType',
              linkedRecordType: 'validationType',
            } as BFFMetadataRecordLink,
          ]),
          recordTypePool: listToPool<BFFRecordType>([
            {
              id: 'someRecordTypeId',
              metadataId: 'someRootGroup',
              useTrashBin: true,
            } as BFFRecordType,
          ]),
        } as Dependencies;

        const record: RecordWrapper = {
          record: {
            data: {
              name: 'someRootGroup',
              children: [
                {
                  name: 'recordInfo',
                  children: [
                    { name: 'id', value: '1234' },
                    {
                      name: 'type',
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'recordType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'someRecordTypeId',
                        },
                      ],
                    },
                    {
                      name: 'validationType',
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'validationType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'diva-person',
                        },
                      ],
                    },
                    { name: 'visibility', value: 'published' },
                  ],
                },
              ],
            },
            actionLinks: {
              read: {} as ActionLink,
              update: {} as ActionLink,
            },
          },
        };

        const result = transformRecord(dependencies, record, 'update');
        expect(result.userRights).toContain('unpublish');
      });
    });
  });

  it('matches data against two metadata with same name but different selectable attributes', () => {
    const mockDependencies = {
      recordTypePool: listToPool<BFFRecordType>([
        {
          id: 'someRecordTypeId',
          metadataId: 'someRootGroup',
          useTrashBin: true,
        } as BFFRecordType,
      ]),
      metadataPool: listToPool<BFFMetadata>([
        {
          id: 'someRootGroup',
          type: 'group',
          nameInData: 'root',
          children: [
            { childId: 'recordInfoGroup', repeatMin: '1', repeatMax: '1' },
            {
              childId: 'textVarWithFinalValueAttr',
              repeatMin: '0',
              repeatMax: '1',
            },
            {
              childId: 'textVarWithSelectableAndFinalValueAttr',
              repeatMin: '0',
              repeatMax: '1',
            },
          ],
        } as BFFMetadataGroup,
        {
          id: 'recordInfoGroup',
          nameInData: 'recordInfo',
          type: 'group',
          children: [
            { childId: 'idVar', repeatMin: '1', repeatMax: '1' },
            { childId: 'typeLink', repeatMin: '1', repeatMax: '1' },
            { childId: 'validationTypeLink', repeatMin: '1', repeatMax: '1' },
          ],
        } as BFFMetadataGroup,
        {
          id: 'idVar',
          type: 'textVariable',
          nameInData: 'id',
        } as BFFMetadataTextVariable,
        {
          id: 'typeLink',
          type: 'recordLink',
          nameInData: 'type',
          linkedRecordType: 'recordType',
        } as BFFMetadataRecordLink,
        {
          id: 'validationTypeLink',
          type: 'recordLink',
          nameInData: 'validationType',
          linkedRecordType: 'validationType',
        } as BFFMetadataRecordLink,
        {
          id: 'textVarWithFinalValueAttr',
          type: 'textVariable',
          nameInData: 'someText',
          attributeReferences: [
            { refCollectionVarId: 'attr1WithFinalValueColVar' },
          ],
        } as BFFMetadataTextVariable,
        {
          id: 'textVarWithSelectableAndFinalValueAttr',
          type: 'textVariable',
          nameInData: 'someText',
          attributeReferences: [
            { refCollectionVarId: 'attr1SelectableColVar' },
            { refCollectionVarId: 'attr2WithFinalValueColVar' },
          ],
        } as BFFMetadataTextVariable,
        {
          id: 'attr1WithFinalValueColVar',
          type: 'collectionVariable',
          nameInData: 'attr1',
          refCollection: 'attr1Collection',
          finalValue: 'opt1',
        } as BFFMetadataCollectionVariable,
        {
          id: 'attr1SelectableColVar',
          type: 'collectionVariable',
          nameInData: 'attr1',
          refCollection: 'attr1Collection',
        } as BFFMetadataCollectionVariable,
        {
          id: 'attr2WithFinalValueColVar',
          type: 'collectionVariable',
          nameInData: 'attr2',
          refCollection: 'attr2Collection',
          finalValue: 'opt1',
        } as BFFMetadataCollectionVariable,
        {
          id: 'attr1Collection',
          collectionItemReferences: [
            { refCollectionItemId: 'attr1Opt1' },
            { refCollectionItemId: 'attr1Opt2' },
          ],
        } as BFFMetadataItemCollection,
        {
          id: 'attr2Collection',
          collectionItemReferences: [
            { refCollectionItemId: 'attr2Opt1' },
            { refCollectionItemId: 'attr2Opt2' },
          ],
        } as BFFMetadataItemCollection,
        { id: 'attr1Opt1', nameInData: 'opt1' } as BFFMetadataBase,
        { id: 'attr1Opt2', nameInData: 'opt2' } as BFFMetadataBase,
        { id: 'attr2Opt1', nameInData: 'opt1' } as BFFMetadataBase,
        { id: 'attr2Opt2', nameInData: 'opt2' } as BFFMetadataBase,
      ]),
    } as Dependencies;
    // someText attr1="opt1"
    // someText attr1="opt1 | opt2" attr2="opt3"
    const record: RecordWrapper = {
      record: {
        data: {
          name: 'root',
          children: [
            {
              name: 'recordInfo',
              children: [
                { name: 'id', value: '1234' },
                {
                  name: 'type',
                  children: [
                    { name: 'linkedRecordType', value: 'recordType' },
                    { name: 'linkedRecordId', value: 'someRecordTypeId' },
                  ],
                },
                {
                  name: 'validationType',
                  children: [
                    { name: 'linkedRecordType', value: 'validationType' },
                    { name: 'linkedRecordId', value: 'someValidationTypeId' },
                  ],
                },
              ],
            },
            {
              name: 'someText',
              attributes: {
                attr1: 'opt1',
                attr2: 'opt1',
              },
              value: 'someValue',
            },
            {
              name: 'someText',
              attributes: {
                attr1: 'opt1',
              },
              value: 'someOtherValue',
            },
          ],
        },
        actionLinks: {},
      },
    };

    const transformed = transformRecord(mockDependencies, record, 'view');

    expect(transformed.data).toEqual({
      root: {
        fromStorage: true,
        recordInfo: {
          fromStorage: true,
          id: {
            required: true,
            value: '1234',
          },
          required: true,
          type: {
            linkedRecordType: 'recordType',
            required: true,
            value: 'someRecordTypeId',
          },
          validationType: {
            linkedRecordType: 'validationType',
            required: true,
            value: 'someValidationTypeId',
          },
        },
        someText_attr2_opt1: {
          _attr1: 'opt1',
          _attr2: 'opt1',
          value: 'someValue',
        },
        someText_attr1_opt1: {
          _attr1: 'opt1',
          value: 'someOtherValue',
        },
      },
    });
  });
});
