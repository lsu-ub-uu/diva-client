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

import { listToPool } from '@/utils/structs/listToPool';
import type {
  BFFAttributeReference,
  BFFGuiElement,
  BFFLinkedRecordPresentation,
  BFFLoginUnit,
  BFFLoginWebRedirect,
  BFFMetadataBase,
  BFFMetadataChildReference,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataItemCollection,
  BFFMetadataRecordLink,
  BFFMetadataTextVariable,
  BFFPresentationBase,
  BFFPresentationChildReference,
  BFFPresentationGroup,
  BFFPresentationRecordLink,
  BFFPresentationSurroundingContainer,
  BFFRecordType,
  BFFSearch,
  BFFText,
  BFFValidationType,
} from '@/.server/cora/transform/bffTypes';
import type { Lookup } from '@/utils/structs/lookup';
import {
  exampleOtherCollectionVarId,
  pSomeArchiveNumberTextVar,
  pSomeContainer,
  pSomeEditMetadataGroup,
  pSomeGuiElementLink,
  pSomeLocalIdTextVar,
  pSomeManuscriptContainer,
  pSomeManuscriptGroup,
  pSomeMetadataChildGroup,
  pSomeMetadataChildGroupWithShowHeadlineFalse,
  pSomeMetadataChildGroupWithSpecifiedHeadlineText,
  pSomeMetadataCollectionVariable,
  pSomeMetadataCollectionVariableWithAttribute,
  pSomeMetadataNumberVar,
  pSomeMetadataNumberWithAttributeVar,
  pSomeMetadataRecordLink,
  pSomeMetadataTextVariable,
  pSomeMetadataTextVariable2,
  pSomeMetadataTextVariable3,
  pSomeMetadataTextVariable4,
  pSomeMetadataTextVariable5,
  pSomeMetadataTextVariable6,
  pSomeMetadataTextVariableWithAttributeVar,
  pSomeNewMetadataGroup,
  pSomeNewMetadataGroupForMissingChildId,
  pSomeNewMetadataGroupRepeatingTitleInfoNameInDataGroup,
  pSomeNewRecordLink,
  pSomeOtherMetadataCollectionVariableWithMissingChildId,
  pSomeRepeatingContainer,
  pSomeScopusIdTextVar,
  someArchiveNumberTextVar,
  someEditMetadataGroup,
  someLocalIdTextVar,
  someMainTitleTextVariable,
  someManuscriptGroup,
  someMetadataChildGroup,
  someMetadataChildGroupWithShowHeadlineFalse,
  someMetadataChildGroupWithSpecifiedHeadlineText,
  someMetadataCollectionItemBlue,
  someMetadataCollectionItemPink,
  someMetadataCollectionItemYellow,
  someMetadataCollectionVariable,
  someMetadataCollectionVariable2,
  someMetadataCollectionVariableWithAttribute,
  someMetadataCollectionWithOtherIdVariable,
  someMetadataItemCollection,
  someMetadataNumberVar,
  someMetadataNumberVarWithAttribute,
  someMetadataNumberVarWithAttributeAndOtherId,
  someMetadataNumberVarWithOtherAttributeId,
  someMetadataNumberVarWithoutAttribute,
  someMetadataRecordLink,
  someMetadataTextVariable,
  someMetadataTextVariable2,
  someMetadataTextVariable3,
  someMetadataTextVariable4,
  someMetadataTextVariable5,
  someMetadataTextVariable6,
  someMetadataTextVariableWithAttributeVar,
  someNewMetadataGroup,
  someNewMetadataGroupFaultyChildReference,
  someNewMetadataGroupForMissingChildId,
  someNewRecordLink,
  someNewSimpleMetadataGroup,
  someRecordInfo,
  someScopusIdTextVar,
  someSimpleValidationTypeData,
  someValidationTypeData,
  someValidationTypeDataFaultyChildReference,
  someValidationTypeForMissingChildIdTypeData,
  someValidationTypeForRepeatingTitleInfoId,
} from '@/__mocks__/bff/form/bffMock';
import {
  firstAttributesExistsInSecond,
  getAttributesByAttributeReferences,
  hasLinkedPresentation,
} from '../formDefinition';
import type { Dependencies } from '../formDefinitionsDep';
import { createLinkedRecordDefinition } from '@/.server/data/formDefinition/createLinkedRecordDefinition';
import { createFormDefinition } from '@/.server/data/formDefinition/createFormDefinition';
import { findMetadataChildReferenceByNameInDataAndAttributes } from '@/.server/data/formDefinition/findMetadataChildReferenceByNameInDataAndAttributes';

describe('formDefinition', () => {
  let validationTypePool: Lookup<string, BFFValidationType>;
  let metadataPool: Lookup<string, BFFMetadataBase | BFFMetadataItemCollection>;
  let presentationPool: Lookup<
    string,
    | BFFPresentationBase
    | BFFPresentationGroup
    | BFFPresentationSurroundingContainer
    | BFFGuiElement
  >;
  let recordTypePool: Lookup<string, BFFRecordType>;
  let textPool: Lookup<string, BFFText>;
  let searchPool: Lookup<string, BFFSearch>;
  let loginUnitPool: Lookup<string, BFFLoginUnit>;
  let loginPool: Lookup<string, BFFLoginWebRedirect>;
  const FORM_MODE_NEW = 'create';
  const FORM_MODE_EDIT = 'update';
  const FORM_MODE_VIEW = 'view'; // used to present the record

  let dependencies: Dependencies;

  beforeEach(() => {
    validationTypePool = listToPool<BFFValidationType>([
      someValidationTypeData,
      someValidationTypeDataFaultyChildReference,
      someSimpleValidationTypeData,
      someValidationTypeForMissingChildIdTypeData,
      someValidationTypeForRepeatingTitleInfoId,
    ]);
    metadataPool = listToPool<BFFMetadataBase | BFFMetadataGroup>([
      someMetadataTextVariable,
      someMetadataTextVariable2,
      someMetadataTextVariable3,
      someMetadataTextVariable4,
      someMetadataTextVariable5,
      someMetadataTextVariable6,
      someMetadataNumberVar,
      someNewMetadataGroup,
      someRecordInfo,
      someNewMetadataGroupFaultyChildReference,
      someMetadataCollectionVariable,
      someMetadataItemCollection,
      someMetadataCollectionItemBlue,
      someMetadataCollectionItemPink,
      someMetadataCollectionItemYellow,
      someMetadataCollectionVariableWithAttribute,
      someMetadataNumberVarWithAttribute,
      someMetadataTextVariableWithAttributeVar,
      someMetadataChildGroup,
      someMetadataRecordLink,
      someMetadataChildGroupWithSpecifiedHeadlineText,
      someMetadataChildGroupWithShowHeadlineFalse,
      someNewSimpleMetadataGroup,
      someEditMetadataGroup,
      someArchiveNumberTextVar,
      someManuscriptGroup,
      someLocalIdTextVar,
      someScopusIdTextVar,
      someNewMetadataGroupForMissingChildId,
      exampleOtherCollectionVarId,
      someMainTitleTextVariable,
      someMetadataNumberVarWithoutAttribute,
      someMetadataNumberVarWithAttributeAndOtherId,
      someMetadataNumberVarWithOtherAttributeId,
      someMetadataCollectionWithOtherIdVariable,
      someMetadataCollectionVariable2,
      someNewRecordLink,
    ]);
    presentationPool = listToPool<
      | BFFPresentationBase
      | BFFPresentationGroup
      | BFFPresentationSurroundingContainer
      | BFFGuiElement
    >([
      pSomeMetadataTextVariable,
      pSomeMetadataTextVariable2,
      pSomeMetadataTextVariable3,
      pSomeMetadataTextVariable4,
      pSomeMetadataTextVariable5,
      pSomeMetadataTextVariable6,
      pSomeMetadataNumberVar,
      pSomeNewMetadataGroup,
      pSomeMetadataCollectionVariable,
      pSomeMetadataCollectionVariableWithAttribute,
      pSomeMetadataNumberWithAttributeVar,
      pSomeMetadataTextVariableWithAttributeVar,
      pSomeMetadataChildGroup,
      pSomeMetadataRecordLink,
      pSomeContainer,
      pSomeGuiElementLink,
      pSomeRepeatingContainer,
      pSomeMetadataChildGroupWithSpecifiedHeadlineText,
      pSomeMetadataChildGroupWithShowHeadlineFalse,
      pSomeEditMetadataGroup,
      pSomeManuscriptGroup,
      pSomeManuscriptContainer,
      pSomeArchiveNumberTextVar,
      pSomeLocalIdTextVar,
      pSomeScopusIdTextVar,
      pSomeNewMetadataGroupForMissingChildId,
      pSomeOtherMetadataCollectionVariableWithMissingChildId,
      pSomeNewRecordLink,
      pSomeNewMetadataGroupRepeatingTitleInfoNameInDataGroup,
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
      loginPool,
      loginUnitPool,
    };

    createRecordType('testRecordType');
  });
  const createTextVar = (
    id: string,
    nameInData: string,
    attributeReferenceIds: string[],
    regEx: string = '.*',
  ): BFFMetadataTextVariable => {
    const metadata: BFFMetadataTextVariable = {
      id,
      nameInData,
      type: 'textVariable',
      textId: 'someTextId',
      defTextId: 'someDefTextId',
      regEx,
    };
    if (attributeReferenceIds.length > 0) {
      const attributeIds = attributeReferenceIds?.map((attrId) => {
        return {
          refCollectionVarId: attrId,
        };
      });
      metadata.attributeReferences = attributeIds;
    }
    addToPool(metadata);
    return metadata;
  };

  const createPresentationVar = (
    id: string,
    presentationOf: string,
    type:
      | 'pGroup'
      | 'pVar'
      | 'pNumVar'
      | 'pCollVar'
      | 'container'
      | 'pRecordLink'
      | 'pResourceLink'
      | 'presentation',
    mode: 'input' | 'output' = 'output',
    inputFormat?: 'password',
  ): BFFPresentationBase => {
    const pVar: BFFPresentationBase = {
      id,
      presentationOf,
      type,
      mode,
      inputFormat,
    };
    presentationPool.set(id, pVar);
    return pVar as BFFPresentationBase;
  };

  const createCollItem = (nameInData: string): BFFMetadataBase => {
    const metadata: BFFMetadataBase = {
      id: `${nameInData}Item`,
      nameInData,
      type: 'collectionItem',
      textId: 'someTextId',
      defTextId: 'someDefTextId',
    };

    addToPool(metadata);
    return metadata;
  };

  const createItemCollection = (
    id: string,
    nameInData: string,
    itemIds: string[],
  ): BFFMetadataItemCollection => {
    const metadata: BFFMetadataItemCollection = {
      id,
      nameInData,
      type: 'itemCollection',
      textId: 'someTextId',
      defTextId: 'someDefTextId',
      collectionItemReferences: [],
    };
    const collectionItemReferences = itemIds?.map((itemId) => {
      return {
        refCollectionItemId: itemId,
      };
    });
    metadata.collectionItemReferences = collectionItemReferences;

    addToPool(metadata);
    return metadata;
  };

  const createCollVar = (
    id: string,
    nameInData: string,
    values: string[],
    attributeReferenceIds: string[],
  ): BFFMetadataCollectionVariable => {
    const metadata: BFFMetadataCollectionVariable = {
      id,
      nameInData,
      type: 'collectionVariable',
      textId: 'someTextId',
      defTextId: 'someDefTextId',
      refCollection: `${id}Collection`,
    };

    if (attributeReferenceIds.length > 0) {
      const attributeIds = attributeReferenceIds?.map((attrId) => {
        return {
          refCollectionVarId: attrId,
        };
      });
      metadata.attributeReferences = attributeIds;
    }
    addToPool(metadata);

    const itemIds = values.map((value: string) => `${value}Item`);
    createItemCollection(`${id}Collection`, 'someNameInData', itemIds);

    values.forEach((value: string) => createCollItem(value));

    return metadata;
  };

  const createCollVarFinal = (
    id: string,
    nameInData: string,
    finalValue: string,
    attributeReferenceIds: string[],
  ): BFFMetadataCollectionVariable => {
    const metadata: BFFMetadataCollectionVariable = {
      id,
      nameInData,
      type: 'collectionVariable',
      textId: 'someTextId',
      defTextId: 'someDefTextId',
      refCollection: `${id}Collection`,
      finalValue,
    };

    if (attributeReferenceIds.length > 0) {
      const attributeIds = attributeReferenceIds?.map((attrId) => {
        return {
          refCollectionVarId: attrId,
        };
      });
      metadata.attributeReferences = attributeIds;
    }
    addToPool(metadata);

    return metadata;
  };

  const addToPool = (metadata: BFFMetadataBase | BFFMetadataGroup) => {
    metadataPool.set(metadata.id, metadata);
  };

  const createChildReferences = (
    childrenIds: string[],
  ): BFFMetadataChildReference[] => {
    return childrenIds.map((childId) => {
      return {
        childId,
        repeatMin: '1',
        repeatMax: '1',
      };
    });
  };

  const createRecordType = (id: string): BFFRecordType => {
    const metadata: BFFRecordType = {
      id,
      metadataId: `${id}OutputGroup`,
      presentationViewId: `${id}OutputPGroup`,
      listPresentationViewId: `${id}ListPGroup`,
    };

    recordTypePool.set(metadata.id, metadata);
    return metadata;
  };

  const createGroup = (
    id: string,
    nameInData: string,
    children: string[],
  ): BFFMetadataGroup => {
    const metadata: BFFMetadataGroup = {
      id,
      nameInData,
      type: 'group',
      textId: 'someTextId',
      defTextId: 'someDefTextId',
      children: [],
    };

    metadata.children = createChildReferences(children);
    addToPool(metadata);
    return metadata;
  };

  const createValidationType = (id: string): BFFValidationType => {
    const metadata = {
      id,
      validatesRecordTypeId: id,
      newMetadataGroupId: `some${id}MetadataGroupId`,
      newPresentationGroupId: `pSome${id}NewMetadataGroupId`,
      // Update/Edit
      metadataGroupId: `some${id}EditMetadataGroupId`,
      presentationGroupId: `pSome${id}EditMetadataGroupId`,
      nameTextId: `some${id}TextId`,
      defTextId: `some${id}DefTextId`,
    };

    validationTypePool.set(metadata.id, metadata);
    return metadata;
  };
  const createValidationTypeWithReusedPresentation = (
    id: string,
    pId: string,
  ): BFFValidationType => {
    const metadata = {
      id,
      validatesRecordTypeId: pId,
      newMetadataGroupId: `some${id}MetadataGroupId`,
      newPresentationGroupId: `pSome${pId}NewMetadataGroupId`,
      // Update/Edit
      metadataGroupId: `some${id}EditMetadataGroupId`,
      presentationGroupId: `pSome${pId}EditMetadataGroupId`,
      nameTextId: `some${id}TextId`,
      defTextId: `some${id}DefTextId`,
    };

    validationTypePool.set(metadata.id, metadata);
    return metadata;
  };

  const createPresentationGroup = (
    id: string,
    presentationOf: string,
    children: BFFPresentationChildReference[],
    mode: 'input' | 'output' = 'output',
  ): BFFPresentationGroup => {
    const pGroup = {
      id,
      type: 'pGroup',
      presentationOf,
      presentationStyle: '',
      mode,
      children,
    } as BFFPresentationGroup;
    presentationPool.set(id, pGroup);
    return pGroup;
  };

  const createRecordLink = (
    id: string,
    linkedRecordType: string,
  ): BFFMetadataRecordLink => {
    const metadata = {
      id,
      nameInData: `some${id}recordLink`,
      type: 'recordLink',
      textId: `some${id}TextId`,
      defTextId: `some${id}DefTextId`,
      linkedRecordType,
    } as BFFMetadataRecordLink;
    addToPool(metadata);
    return metadata;
  };

  const createPresentationRecordLink = (
    id: string,
    presentedRecordType: string,
    presentationId: string,
  ): BFFPresentationRecordLink => {
    const linkedRecordPresentations: BFFLinkedRecordPresentation[] = [
      {
        presentedRecordType,
        presentationId,
      },
    ];
    const pLink = {
      id,
      type: 'pRecordLink',
      mode: 'output',
      presentationOf: id,
      linkedRecordPresentations,
    } as BFFPresentationRecordLink;

    presentationPool.set(id, pLink);
    return pLink;
  };
  const createPresentationSContainer = (
    id: string,
    presentationsOf: string[],
    children: BFFPresentationChildReference[],
  ): BFFPresentationSurroundingContainer => {
    const container = {
      id,
      type: 'container',
      presentationsOf,
      mode: 'output',
      children,
      repeat: 'children',
    } as BFFPresentationSurroundingContainer;

    presentationPool.set(id, container);
    return container;
  };

  it('should be able to lookup validationTypes, metadata, presentations from pools', () => {
    expect(validationTypePool.get('someValidationTypeId')).toBeDefined();
    expect(metadataPool.get('someNewMetadataGroupId')).toBeDefined();
    expect(metadataPool.get('someMetadataTextVariableId')).toBeDefined();
    expect(presentationPool.get('pSomeMetadataTextVariableId')).toBeDefined();
  });

  it('should throw Error on invalid ValidationType', () => {
    const invalidValidationType = 'someInvalidValidationType';

    expect(() => {
      createFormDefinition(dependencies, invalidValidationType, FORM_MODE_NEW);
    }).toThrow(Error);

    try {
      createFormDefinition(dependencies, invalidValidationType, FORM_MODE_NEW);
    } catch (error: unknown) {
      const createFormDefinitionError: Error = <Error>error;
      expect(createFormDefinitionError.message).toStrictEqual(
        '[someInvalidValidationType] does not exist in Lookup pool',
      );
    }
  });

  describe('recordType', () => {
    it('createRecordType creates a recordType and adds it to the pool', () => {
      createRecordType('testRecordType');
      expect(recordTypePool.get('testRecordType')).toBeDefined();
    });
  });

  describe('form definition', () => {
    it('should return a form definition for a new metadata group', () => {
      const validationTypeId = 'someValidationTypeId';
      const formDefinition = createFormDefinition(
        dependencies,
        validationTypeId,
        FORM_MODE_NEW,
      );
      expect(formDefinition.form!.components).toHaveLength(19);
      expect(formDefinition).toStrictEqual({
        validationTypeId,
        form: {
          type: 'group',
          label: 'textId345',
          showLabel: true,
          gridColSpan: 12,
          childStyle: [''],
          presentationStyle: 'card',
          name: 'someNewMetadataGroupNameInData',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          tooltip: {
            title: 'textId345',
            body: 'defTextId678',
          },
          attributes: [
            {
              finalValue: 'pink',
              label: 'exampleCollectionVarText',
              showLabel: true,
              mode: 'input',
              name: 'colour',
              options: [
                {
                  label: 'exampleBlueItemText',
                  value: 'blue',
                },
                {
                  label: 'examplePinkItemText',
                  value: 'pink',
                },
                {
                  label: 'exampleYellowItemText',
                  value: 'yellow',
                },
              ],
              placeholder: 'initialEmptyValueText',
              tooltip: {
                body: 'exampleCollectionVarDefText',
                title: 'exampleCollectionVarText',
              },
              type: 'collectionVariable',
            },
          ],
          components: [
            {
              type: 'text',
              name: 'someHeadlineTextId',
              textStyle: 'bold',
              gridColSpan: 12,
              childStyle: ['twelveChildStyle'],
            },
            {
              type: 'textVariable',
              name: 'someNameInData',
              placeholder: 'someEmptyTextId',
              label: 'someTextId',
              showLabel: true,
              gridColSpan: 3,
              childStyle: ['threeChildStyle'],
              repeat: {
                repeatMin: 1,
                repeatMax: 3,
              },
              tooltip: {
                title: 'someTextId',
                body: 'someDefTextId',
              },
              validation: {
                type: 'regex',
                pattern: 'someRegex',
              },
              mode: 'input',
              inputType: 'input',
            },
            {
              type: 'textVariable',
              name: 'someNameInData2',
              label: 'someOtherLabelTextId', // overridden label
              showLabel: true,
              placeholder: 'someEmptyTextId',
              gridColSpan: 3,
              childStyle: ['threeChildStyle'],
              repeat: {
                repeatMin: 1,
                repeatMax: Number.MAX_VALUE,
              },
              tooltip: {
                title: 'someTextId',
                body: 'someDefTextId',
              },
              validation: {
                type: 'regex',
                pattern: 'someRegex',
              },
              mode: 'input', // output
              inputType: 'input', // textarea
            },
            {
              type: 'textVariable',
              name: 'someNameInData3',
              label: 'someTextId',
              showLabel: true,
              placeholder: 'someEmptyTextId',
              gridColSpan: 3,
              childStyle: ['threeChildStyle'],
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
              tooltip: {
                title: 'someTextId',
                body: 'someDefTextId',
              },
              validation: {
                type: 'regex',
                pattern: 'someRegex',
              },
              mode: 'input', // output
              inputType: 'input', // textarea
              finalValue: 'someFinalValue',
            },
            {
              type: 'textVariable',
              name: 'someNameInData6',

              label: 'someTextId',
              showLabel: true,
              placeholder: 'someEmptyTextId',
              gridColSpan: 12,
              childStyle: [''],
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
              tooltip: {
                title: 'someTextId',
                body: 'someDefTextId',
              },
              validation: {
                type: 'regex',
                pattern: 'someRegex',
              },
              mode: 'output', // output
              inputType: 'input', // textarea
            },
            {
              type: 'numberVariable',
              name: 'someNameInDataNumberVar',
              label: 'someNumberVarTextId', // hidden
              showLabel: false,
              gridColSpan: 3,
              childStyle: ['threeChildStyle'],
              placeholder: 'someEmptyTextId',
              repeat: {
                repeatMin: 0,
                repeatMax: 1,
                minNumberOfRepeatingToShow: 1,
              },
              tooltip: {
                title: 'someNumberVarTextId',
                body: 'someNumberVarDefTextId',
              },
              validation: {
                type: 'number',
                min: 0,
                max: 20,
                warningMin: 2,
                warningMax: 10,
                numberOfDecimals: 0,
              },
              mode: 'input',
            },
            {
              type: 'collectionVariable',
              name: 'colour',
              finalValue: 'pink',
              label: 'exampleCollectionVarText',
              showLabel: true,
              gridColSpan: 3,
              childStyle: ['threeChildStyle'],
              placeholder: 'someEmptyTextId',
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
              tooltip: {
                title: 'exampleCollectionVarText',
                body: 'exampleCollectionVarDefText',
              },
              options: [
                { value: 'blue', label: 'exampleBlueItemText' },
                { value: 'pink', label: 'examplePinkItemText' },
                { value: 'yellow', label: 'exampleYellowItemText' },
              ],
              mode: 'input',
            },
            {
              type: 'collectionVariable',
              name: 'colourAttributeVar',
              label: 'exampleCollectionVarText',
              showLabel: true,
              gridColSpan: 3,
              childStyle: ['threeChildStyle'],
              placeholder: 'someEmptyTextId',
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
              tooltip: {
                title: 'exampleCollectionVarText',
                body: 'exampleCollectionVarDefText',
              },
              attributes: [
                {
                  finalValue: 'pink',
                  type: 'collectionVariable',
                  name: 'colour',
                  label: 'exampleCollectionVarText',
                  showLabel: true,
                  placeholder: 'initialEmptyValueText',
                  tooltip: {
                    title: 'exampleCollectionVarText',
                    body: 'exampleCollectionVarDefText',
                  },
                  options: [
                    { value: 'blue', label: 'exampleBlueItemText' },
                    { value: 'pink', label: 'examplePinkItemText' },
                    { value: 'yellow', label: 'exampleYellowItemText' },
                  ],
                  mode: 'input',
                },
              ],
              options: [
                { value: 'blue', label: 'exampleBlueItemText' },
                { value: 'pink', label: 'examplePinkItemText' },
                { value: 'yellow', label: 'exampleYellowItemText' },
              ],
              mode: 'input',
            },
            {
              type: 'numberVariable',
              name: 'someNameInDataNumberWithAttributeVar',
              label: 'someNumberVarTextId',
              showLabel: true,
              gridColSpan: 12,
              childStyle: [''],
              placeholder: 'someEmptyTextId',
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
              tooltip: {
                title: 'someNumberVarTextId',
                body: 'someNumberVarDefTextId',
              },
              attributesToShow: 'none',
              attributes: [
                {
                  finalValue: 'pink',
                  type: 'collectionVariable',
                  name: 'colour',
                  label: 'exampleCollectionVarText',
                  showLabel: true,
                  placeholder: 'initialEmptyValueText',
                  tooltip: {
                    title: 'exampleCollectionVarText',
                    body: 'exampleCollectionVarDefText',
                  },
                  options: [
                    { value: 'blue', label: 'exampleBlueItemText' },
                    { value: 'pink', label: 'examplePinkItemText' },
                    { value: 'yellow', label: 'exampleYellowItemText' },
                  ],
                  mode: 'input',
                },
              ],
              validation: {
                type: 'number',
                min: 0,
                max: 20,
                warningMin: 2,
                warningMax: 10,
                numberOfDecimals: 0,
              },
              mode: 'input',
            },
            {
              type: 'textVariable',
              name: 'someNameInDataTextWithAttrib',
              label: 'someTextId',
              showLabel: true,
              gridColSpan: 12,
              childStyle: [''],
              placeholder: 'someEmptyTextId',
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
              tooltip: {
                title: 'someTextId',
                body: 'someDefTextId',
              },
              attributes: [
                {
                  type: 'collectionVariable',
                  name: 'colour',
                  finalValue: 'pink',
                  label: 'exampleCollectionVarText',
                  showLabel: true,
                  placeholder: 'initialEmptyValueText',
                  tooltip: {
                    title: 'exampleCollectionVarText',
                    body: 'exampleCollectionVarDefText',
                  },
                  options: [
                    { value: 'blue', label: 'exampleBlueItemText' },
                    { value: 'pink', label: 'examplePinkItemText' },
                    { value: 'yellow', label: 'exampleYellowItemText' },
                  ],
                  mode: 'input',
                },
              ],
              validation: {
                type: 'regex',
                pattern: 'someRegex',
              },
              mode: 'input',
              inputType: 'input',
            },
            {
              type: 'group',
              label: 'someChildGroupTextId',
              showLabel: true,
              gridColSpan: 12,
              childStyle: [''],
              presentationStyle: 'someMetadataChildGroupPresentationStyle',
              name: 'someChildGroupNameInData',
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
              tooltip: {
                title: 'someChildGroupTextId',
                body: 'someChildGroupDefTextId',
              },
              components: [
                {
                  type: 'textVariable',
                  name: 'someNameInData',
                  label: 'someTextId',
                  showLabel: true,
                  gridColSpan: 3,
                  childStyle: ['threeChildStyle'],
                  placeholder: 'someEmptyTextId',
                  repeat: {
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                  tooltip: {
                    title: 'someTextId',
                    body: 'someDefTextId',
                  },
                  validation: {
                    type: 'regex',
                    pattern: 'someRegex',
                  },
                  mode: 'input',
                  inputType: 'input',
                },
              ],
              mode: 'input',
            },
            {
              type: 'recordLink',
              name: 'nationalSubjectCategory',
              label: 'nationalSubjectCategoryLinkText',
              linkedRecordPresentation: {
                presentationId: 'someSubjectCategoryPresentation',
                presentedRecordType: 'nationalSubjectCategory',
              },
              showLabel: true,
              gridColSpan: 12,
              childStyle: [''],
              mode: 'input',
              presentationRecordLinkId: 'nationalSubjectCategoryPLinkId',
              recordLinkType: 'nationalSubjectCategory',
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
              tooltip: {
                title: 'nationalSubjectCategoryLinkText',
                body: 'nationalSubjectCategoryLinkDefText',
              },
            },
            {
              type: 'recordLink',
              name: 'someNewRecordLink',
              label: 'someNewRecordLinkText',
              linkedRecordPresentation: {
                presentationId: 'someNewRecordLink',
                presentedRecordType: 'someNewRecordLink',
              },
              showLabel: true,
              gridColSpan: 12,
              childStyle: [''],
              mode: 'input',
              presentationRecordLinkId: 'someNewRecordPLinkId',
              recordLinkType: 'someNewRecordLink',
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
              tooltip: {
                title: 'someNewRecordLinkText',
                body: 'someNewRecordLinkDefText',
              },
              search: 'someNewRecordLinkSearch',
            },
            {
              type: 'container',
              name: 'pSomeContainerId',
              presentationStyle: 'card', // frame
              containerType: 'surrounding',
              gridColSpan: 12,
              childStyle: [''],
              components: [
                {
                  type: 'textVariable',
                  name: 'someNameInData4',
                  label: 'someTextId',
                  showLabel: true,
                  gridColSpan: 6,
                  childStyle: ['sixChildStyle'],
                  placeholder: 'someEmptyTextId',
                  repeat: {
                    repeatMin: 1,
                    repeatMax: 3,
                    minNumberOfRepeatingToShow: 1,
                  },
                  tooltip: {
                    title: 'someTextId',
                    body: 'someDefTextId',
                  },
                  validation: {
                    type: 'regex',
                    pattern: 'someRegex',
                  },
                  mode: 'input',
                  inputType: 'input',
                },
              ],
              mode: 'input',
            },
            {
              childStyle: [''],
              name: 'pSomeGuiElementLinkId',
              gridColSpan: 12,
              url: 'http://www.google.se',
              elementText: 'demoTestLinkGuiElementText',
              presentAs: 'link',
              type: 'guiElementLink',
            },
            {
              type: 'container',
              name: 'pSomeRepeatingContainerId',
              presentationStyle: 'label',
              containerType: 'repeating',
              gridColSpan: 12,
              childStyle: [''],
              components: [
                {
                  type: 'textVariable',
                  name: 'someNameInData5',
                  label: 'someTextId',
                  showLabel: true,
                  gridColSpan: 6,
                  childStyle: ['sixChildStyle'],
                  placeholder: 'someEmptyTextId',
                  repeat: {
                    repeatMin: 1,
                    repeatMax: 3,
                    minNumberOfRepeatingToShow: 1,
                  },
                  tooltip: {
                    title: 'someTextId',
                    body: 'someDefTextId',
                  },
                  validation: {
                    type: 'regex',
                    pattern: 'someRegex',
                  },
                  mode: 'input',
                  inputType: 'input',
                },
              ],
              mode: 'input',
            },
            {
              type: 'group',
              label: 'someOtherHeadlineTextId',
              showLabel: true,
              headlineLevel: 'h3',
              gridColSpan: 12,
              childStyle: [''],
              presentationStyle: 'someMetadataChildGroupPresentationStyle',
              name: 'someMetadataChildGroupWithSpecifiedHeadlineTextNameInData',
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
              tooltip: {
                title: 'someChildGroupTextId',
                body: 'someChildGroupDefTextId',
              },
              components: [
                {
                  type: 'textVariable',
                  name: 'someNameInData',
                  label: 'someTextId',
                  showLabel: true,
                  gridColSpan: 3,
                  childStyle: ['threeChildStyle'],
                  placeholder: 'someEmptyTextId',
                  repeat: {
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                  tooltip: {
                    title: 'someTextId',
                    body: 'someDefTextId',
                  },
                  validation: {
                    type: 'regex',
                    pattern: 'someRegex',
                  },
                  mode: 'input',
                  inputType: 'input',
                },
              ],
              mode: 'input',
            },
            {
              type: 'group',
              label: 'someChildGroupTextId',
              showLabel: false,
              gridColSpan: 12,
              childStyle: [''],
              presentationStyle: 'someMetadataChildGroupPresentationStyle',
              name: 'someMetadataChildGroupWithShowHeadlineFalseNameInData',
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
              tooltip: {
                title: 'someChildGroupTextId',
                body: 'someChildGroupDefTextId',
              },
              components: [
                {
                  type: 'textVariable',
                  name: 'someNameInData',
                  label: 'someTextId',
                  showLabel: true,
                  gridColSpan: 3,
                  childStyle: ['threeChildStyle'],
                  placeholder: 'someEmptyTextId',
                  repeat: {
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                  tooltip: {
                    title: 'someTextId',
                    body: 'someDefTextId',
                  },
                  validation: {
                    type: 'regex',
                    pattern: 'someRegex',
                  },
                  mode: 'input',
                  inputType: 'input',
                },
              ],
              mode: 'input',
            },
            {
              gridColSpan: 12,
              label: 'textId345',
              showLabel: true,
              mode: 'input',
              name: 'someManuscriptGroupNameInData',
              presentationStyle: '',
              repeat: {
                repeatMax: 1,
                repeatMin: 1,
              },
              tooltip: {
                body: 'defTextId678',
                title: 'textId345',
              },
              type: 'group',
              childStyle: [''],
              components: [
                {
                  containerType: 'surrounding',
                  gridColSpan: 12,
                  mode: 'input',
                  name: 'pSomeManuscriptIdContainer',
                  presentationStyle: '',
                  type: 'container',
                  childStyle: [''],
                  components: [
                    {
                      childStyle: [''],
                      gridColSpan: 12,
                      inputType: 'input',
                      label: 'someTextId',
                      showLabel: true,
                      mode: 'input',
                      name: 'archiveNumber',
                      placeholder: 'someEmptyTextId',
                      repeat: {
                        minNumberOfRepeatingToShow: 1,
                        repeatMax: 1,
                        repeatMin: 1,
                      },
                      tooltip: {
                        body: 'someDefTextId',
                        title: 'someTextId',
                      },
                      type: 'textVariable',
                      validation: {
                        pattern: 'someRegex',
                        type: 'regex',
                      },
                    },
                    {
                      childStyle: [''],
                      gridColSpan: 12,
                      inputType: 'input',
                      label: 'someTextId',
                      showLabel: true,
                      mode: 'input',
                      name: 'localId',
                      placeholder: 'someEmptyTextId',
                      repeat: {
                        minNumberOfRepeatingToShow: 1,
                        repeatMax: 1,
                        repeatMin: 1,
                      },
                      tooltip: {
                        body: 'someDefTextId',
                        title: 'someTextId',
                      },
                      type: 'textVariable',
                      validation: {
                        pattern: 'someRegex',
                        type: 'regex',
                      },
                    },
                  ],
                },
              ],
            },
          ],
          mode: 'input',
        },
      });
    });

    it('should return a form definition for a edit metadata group', () => {
      const validationTypeId = 'someValidationTypeId';
      const formDefinition = createFormDefinition(
        dependencies,
        validationTypeId,
        FORM_MODE_EDIT,
      );
      expect(formDefinition.form!.components).toHaveLength(16);
      expect(formDefinition).toStrictEqual({
        validationTypeId,
        form: {
          type: 'group',
          label: 'textId345',
          showLabel: true,
          gridColSpan: 12,
          childStyle: [''],
          presentationStyle: 'card',
          name: 'someEditMetadataGroupNameInData',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          tooltip: {
            title: 'textId345',
            body: 'defTextId678',
          },
          attributes: [
            {
              finalValue: 'pink',
              label: 'exampleCollectionVarText',
              showLabel: true,
              mode: 'input',
              name: 'colour',
              options: [
                {
                  label: 'exampleBlueItemText',
                  value: 'blue',
                },
                {
                  label: 'examplePinkItemText',
                  value: 'pink',
                },
                {
                  label: 'exampleYellowItemText',
                  value: 'yellow',
                },
              ],
              placeholder: 'initialEmptyValueText',
              tooltip: {
                body: 'exampleCollectionVarDefText',
                title: 'exampleCollectionVarText',
              },
              type: 'collectionVariable',
            },
          ],
          components: [
            {
              type: 'text',
              name: 'someEditHeadlineTextId',
              textStyle: 'bold',
              gridColSpan: 12,
              childStyle: ['twelveChildStyle'],
            },
            {
              type: 'textVariable',
              name: 'someNameInData',
              placeholder: 'someEmptyTextId',
              label: 'someTextId',
              showLabel: true,
              gridColSpan: 3,
              childStyle: ['threeChildStyle'],
              repeat: {
                repeatMin: 1,
                repeatMax: 3,
              },
              tooltip: {
                title: 'someTextId',
                body: 'someDefTextId',
              },
              validation: {
                type: 'regex',
                pattern: 'someRegex',
              },
              mode: 'input',
              inputType: 'input',
            },
            {
              type: 'textVariable',
              name: 'someNameInData2',
              label: 'someOtherLabelTextId', // overridden label
              showLabel: true,
              placeholder: 'someEmptyTextId',
              gridColSpan: 3,
              childStyle: ['threeChildStyle'],
              repeat: {
                repeatMin: 1,
                repeatMax: Number.MAX_VALUE,
              },
              tooltip: {
                title: 'someTextId',
                body: 'someDefTextId',
              },
              validation: {
                type: 'regex',
                pattern: 'someRegex',
              },
              mode: 'input', // output
              inputType: 'input', // textarea
            },
            {
              type: 'textVariable',
              name: 'someNameInData3',
              label: 'someTextId',
              showLabel: true,
              placeholder: 'someEmptyTextId',
              gridColSpan: 3,
              childStyle: ['threeChildStyle'],
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
              tooltip: {
                title: 'someTextId',
                body: 'someDefTextId',
              },
              validation: {
                type: 'regex',
                pattern: 'someRegex',
              },
              mode: 'input', // output
              inputType: 'input', // textarea
              finalValue: 'someFinalValue',
            },
            {
              type: 'numberVariable',
              name: 'someNameInDataNumberVar',
              label: 'someNumberVarTextId', // hidden
              showLabel: false,
              gridColSpan: 3,
              childStyle: ['threeChildStyle'],
              placeholder: 'someEmptyTextId',
              repeat: {
                repeatMin: 0,
                repeatMax: 1,
                minNumberOfRepeatingToShow: 1,
              },
              tooltip: {
                title: 'someNumberVarTextId',
                body: 'someNumberVarDefTextId',
              },
              validation: {
                type: 'number',
                min: 0,
                max: 20,
                warningMin: 2,
                warningMax: 10,
                numberOfDecimals: 0,
              },
              mode: 'input',
            },
            {
              type: 'collectionVariable',
              name: 'colour',
              finalValue: 'pink',
              label: 'exampleCollectionVarText',
              showLabel: true,
              gridColSpan: 3,
              childStyle: ['threeChildStyle'],
              placeholder: 'someEmptyTextId',
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
              tooltip: {
                title: 'exampleCollectionVarText',
                body: 'exampleCollectionVarDefText',
              },
              options: [
                { value: 'blue', label: 'exampleBlueItemText' },
                { value: 'pink', label: 'examplePinkItemText' },
                { value: 'yellow', label: 'exampleYellowItemText' },
              ],
              mode: 'input',
            },
            {
              type: 'collectionVariable',
              name: 'colourAttributeVar',
              label: 'exampleCollectionVarText',
              showLabel: true,
              gridColSpan: 3,
              childStyle: ['threeChildStyle'],
              placeholder: 'someEmptyTextId',
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
              tooltip: {
                title: 'exampleCollectionVarText',
                body: 'exampleCollectionVarDefText',
              },
              attributes: [
                {
                  finalValue: 'pink',
                  type: 'collectionVariable',
                  name: 'colour',
                  label: 'exampleCollectionVarText',
                  showLabel: true,
                  placeholder: 'initialEmptyValueText',
                  tooltip: {
                    title: 'exampleCollectionVarText',
                    body: 'exampleCollectionVarDefText',
                  },
                  options: [
                    { value: 'blue', label: 'exampleBlueItemText' },
                    { value: 'pink', label: 'examplePinkItemText' },
                    { value: 'yellow', label: 'exampleYellowItemText' },
                  ],
                  mode: 'input',
                },
              ],
              options: [
                { value: 'blue', label: 'exampleBlueItemText' },
                { value: 'pink', label: 'examplePinkItemText' },
                { value: 'yellow', label: 'exampleYellowItemText' },
              ],
              mode: 'input',
            },
            {
              type: 'numberVariable',
              name: 'someNameInDataNumberWithAttributeVar',
              label: 'someNumberVarTextId',
              showLabel: true,
              gridColSpan: 12,
              childStyle: [''],
              placeholder: 'someEmptyTextId',
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
              tooltip: {
                title: 'someNumberVarTextId',
                body: 'someNumberVarDefTextId',
              },
              attributesToShow: 'none',
              attributes: [
                {
                  finalValue: 'pink',
                  type: 'collectionVariable',
                  name: 'colour',
                  label: 'exampleCollectionVarText',
                  showLabel: true,
                  placeholder: 'initialEmptyValueText',
                  tooltip: {
                    title: 'exampleCollectionVarText',
                    body: 'exampleCollectionVarDefText',
                  },
                  options: [
                    { value: 'blue', label: 'exampleBlueItemText' },
                    { value: 'pink', label: 'examplePinkItemText' },
                    { value: 'yellow', label: 'exampleYellowItemText' },
                  ],
                  mode: 'input',
                },
              ],
              validation: {
                type: 'number',
                min: 0,
                max: 20,
                warningMin: 2,
                warningMax: 10,
                numberOfDecimals: 0,
              },
              mode: 'input',
            },
            {
              type: 'textVariable',
              name: 'someNameInDataTextWithAttrib',
              label: 'someTextId',
              showLabel: true,
              gridColSpan: 12,
              childStyle: [''],
              placeholder: 'someEmptyTextId',
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
              tooltip: {
                title: 'someTextId',
                body: 'someDefTextId',
              },
              attributes: [
                {
                  type: 'collectionVariable',
                  name: 'colour',
                  finalValue: 'pink',
                  label: 'exampleCollectionVarText',
                  showLabel: true,
                  placeholder: 'initialEmptyValueText',
                  tooltip: {
                    title: 'exampleCollectionVarText',
                    body: 'exampleCollectionVarDefText',
                  },
                  options: [
                    { value: 'blue', label: 'exampleBlueItemText' },
                    { value: 'pink', label: 'examplePinkItemText' },
                    { value: 'yellow', label: 'exampleYellowItemText' },
                  ],
                  mode: 'input',
                },
              ],
              validation: {
                type: 'regex',
                pattern: 'someRegex',
              },
              mode: 'input',
              inputType: 'input',
            },
            {
              type: 'group',
              label: 'someChildGroupTextId',
              showLabel: true,
              gridColSpan: 12,
              childStyle: [''],
              presentationStyle: 'someMetadataChildGroupPresentationStyle',
              name: 'someChildGroupNameInData',
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
              tooltip: {
                title: 'someChildGroupTextId',
                body: 'someChildGroupDefTextId',
              },
              components: [
                {
                  type: 'textVariable',
                  name: 'someNameInData',
                  label: 'someTextId',
                  showLabel: true,
                  gridColSpan: 3,
                  childStyle: ['threeChildStyle'],
                  placeholder: 'someEmptyTextId',
                  repeat: {
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                  tooltip: {
                    title: 'someTextId',
                    body: 'someDefTextId',
                  },
                  validation: {
                    type: 'regex',
                    pattern: 'someRegex',
                  },
                  mode: 'input',
                  inputType: 'input',
                },
              ],
              mode: 'input',
            },
            {
              type: 'recordLink',
              name: 'nationalSubjectCategory',
              label: 'nationalSubjectCategoryLinkText',
              linkedRecordPresentation: {
                presentationId: 'someSubjectCategoryPresentation',
                presentedRecordType: 'nationalSubjectCategory',
              },
              showLabel: true,
              gridColSpan: 12,
              childStyle: [''],
              mode: 'input',
              presentationRecordLinkId: 'nationalSubjectCategoryPLinkId',
              recordLinkType: 'nationalSubjectCategory',
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
              tooltip: {
                title: 'nationalSubjectCategoryLinkText',
                body: 'nationalSubjectCategoryLinkDefText',
              },
            },
            {
              type: 'container',
              name: 'pSomeContainerId',
              presentationStyle: 'card', // frame
              containerType: 'surrounding',
              gridColSpan: 12,
              childStyle: [''],
              components: [
                {
                  type: 'textVariable',
                  name: 'someNameInData4',
                  label: 'someTextId',
                  showLabel: true,
                  gridColSpan: 6,
                  childStyle: ['sixChildStyle'],
                  placeholder: 'someEmptyTextId',
                  repeat: {
                    repeatMin: 1,
                    repeatMax: 3,
                    minNumberOfRepeatingToShow: 1,
                  },
                  tooltip: {
                    title: 'someTextId',
                    body: 'someDefTextId',
                  },
                  validation: {
                    type: 'regex',
                    pattern: 'someRegex',
                  },
                  mode: 'input',
                  inputType: 'input',
                },
              ],
              mode: 'input',
            },
            {
              childStyle: [''],
              name: 'pSomeGuiElementLinkId',
              gridColSpan: 12,
              url: 'http://www.google.se',
              elementText: 'demoTestLinkGuiElementText',
              presentAs: 'link',
              type: 'guiElementLink',
            },
            {
              type: 'container',
              name: 'pSomeRepeatingContainerId',
              presentationStyle: 'label',
              containerType: 'repeating',
              gridColSpan: 12,
              childStyle: [''],
              components: [
                {
                  type: 'textVariable',
                  name: 'someNameInData5',
                  label: 'someTextId',
                  showLabel: true,
                  gridColSpan: 6,
                  childStyle: ['sixChildStyle'],
                  placeholder: 'someEmptyTextId',
                  repeat: {
                    repeatMin: 1,
                    repeatMax: 3,
                    minNumberOfRepeatingToShow: 1,
                  },
                  tooltip: {
                    title: 'someTextId',
                    body: 'someDefTextId',
                  },
                  validation: {
                    type: 'regex',
                    pattern: 'someRegex',
                  },
                  mode: 'input',
                  inputType: 'input',
                },
              ],
              mode: 'input',
            },
            {
              type: 'group',
              label: 'someOtherHeadlineTextId',
              showLabel: true,
              headlineLevel: 'h3',
              gridColSpan: 12,
              childStyle: [''],
              presentationStyle: 'someMetadataChildGroupPresentationStyle',
              name: 'someMetadataChildGroupWithSpecifiedHeadlineTextNameInData',
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
              tooltip: {
                title: 'someChildGroupTextId',
                body: 'someChildGroupDefTextId',
              },
              components: [
                {
                  type: 'textVariable',
                  name: 'someNameInData',
                  label: 'someTextId',
                  showLabel: true,
                  gridColSpan: 3,
                  childStyle: ['threeChildStyle'],
                  placeholder: 'someEmptyTextId',
                  repeat: {
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                  tooltip: {
                    title: 'someTextId',
                    body: 'someDefTextId',
                  },
                  validation: {
                    type: 'regex',
                    pattern: 'someRegex',
                  },
                  mode: 'input',
                  inputType: 'input',
                },
              ],
              mode: 'input',
            },
            {
              type: 'group',
              label: 'someChildGroupTextId',
              showLabel: false,
              gridColSpan: 12,
              childStyle: [''],
              presentationStyle: 'someMetadataChildGroupPresentationStyle',
              name: 'someMetadataChildGroupWithShowHeadlineFalseNameInData',
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
              tooltip: {
                title: 'someChildGroupTextId',
                body: 'someChildGroupDefTextId',
              },
              components: [
                {
                  type: 'textVariable',
                  name: 'someNameInData',
                  label: 'someTextId',
                  showLabel: true,
                  gridColSpan: 3,
                  childStyle: ['threeChildStyle'],
                  placeholder: 'someEmptyTextId',
                  repeat: {
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                  tooltip: {
                    title: 'someTextId',
                    body: 'someDefTextId',
                  },
                  validation: {
                    type: 'regex',
                    pattern: 'someRegex',
                  },
                  mode: 'input',
                  inputType: 'input',
                },
              ],
              mode: 'input',
            },
          ],
          mode: 'input',
        },
      });
    });

    it('should return a form definition for a new metadata group matching nameInData when childId does not match', () => {
      const validationTypeId = 'someValidationTypeForMissingChildIdTypeId';
      const formDefinition = createFormDefinition(
        dependencies,
        validationTypeId,
        FORM_MODE_NEW,
      );
      expect(formDefinition.form!.components).toHaveLength(1);
      expect(formDefinition).toStrictEqual({
        validationTypeId,
        form: {
          type: 'group',
          gridColSpan: 12,
          childStyle: [''],
          presentationStyle: 'card',
          name: 'divaOutput',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          tooltip: {
            title: '',
            body: '',
          },
          label: '',
          showLabel: true,
          components: [
            {
              type: 'collectionVariable',
              name: 'colour',
              label: 'exampleCollectionVarText',
              showLabel: true,
              gridColSpan: 12,
              finalValue: 'pink',
              childStyle: ['twelveChildStyle'],
              placeholder: 'someEmptyTextId',
              repeat: {
                repeatMin: 0,
                repeatMax: 1,
              },
              tooltip: {
                title: 'exampleCollectionVarText',
                body: 'exampleCollectionVarDefText',
              },

              options: [
                { value: 'blue', label: 'exampleBlueItemText' },
                { value: 'pink', label: 'examplePinkItemText' },
                { value: 'yellow', label: 'exampleYellowItemText' },
              ],
              mode: 'input',
            },
          ],
          mode: 'input',
        },
      });
    });

    it('should return a form definition for (output) view presentation metadata group', () => {
      const validationTypeId = 'validationTypeId';
      const validationType = createValidationType(validationTypeId);
      const recordType = createRecordType(validationType.validatesRecordTypeId);

      const metaDataGroup = createGroup(
        recordType.metadataId,
        'validationTypeIdOutputGroup',
        ['someMetadataTextVariable6Id'],
      );

      const presentationChild = {
        childId: 'pSomeMetadataTextVariable6Id',
        type: 'presentation',
      } as BFFPresentationChildReference;
      createPresentationGroup(
        recordType.presentationViewId,
        metaDataGroup.nameInData,
        [presentationChild],
      );

      const formDefinition = createFormDefinition(
        dependencies,
        validationTypeId,
        FORM_MODE_VIEW,
      );
      expect(formDefinition.form!.components).toHaveLength(1);
      expect(formDefinition).toStrictEqual({
        validationTypeId,
        form: {
          childStyle: [''],
          components: [
            {
              gridColSpan: 12,
              inputType: 'input',
              label: 'someTextId',
              showLabel: true,
              childStyle: [''],
              mode: 'output',
              name: 'someNameInData6',
              placeholder: 'someEmptyTextId',
              repeat: {
                repeatMax: 1,
                repeatMin: 1,
              },
              tooltip: {
                body: 'someDefTextId',
                title: 'someTextId',
              },
              type: 'textVariable',
              validation: {
                pattern: 'someRegex',
                type: 'regex',
              },
            },
          ],
          gridColSpan: 12,
          label: 'someTextId',
          showLabel: true,
          mode: 'output',
          name: 'validationTypeIdOutputGroup',
          presentationStyle: '',
          repeat: {
            repeatMax: 1,
            repeatMin: 1,
          },
          tooltip: {
            body: 'someDefTextId',
            title: 'someTextId',
          },
          type: 'group',
        },
      });
    });
  });

  describe('linked record definition', () => {
    it('should return a linked record definition for a divaPersonOutputPLink', () => {
      createRecordLink('divaPersonOutputPLink', 'personWhenLinkedOutputPGroup');
      createPresentationRecordLink(
        'divaPersonOutputPLink',
        'divaPersonLink',
        'personWhenLinkedOutputPGroup',
      );
      createPresentationGroup('personWhenLinkedOutputPGroup', 'personGroup', [
        { childId: 'personNameLinkOutputPGroup', type: 'presentation' },
      ]);
      createGroup('personGroup', 'personGroup', ['personNameGroup']);
      createPresentationGroup('personPGroup', 'personGroup', [
        {
          childId: 'personNamePGroup',
          type: 'presentation',
        },
      ]);
      createPresentationGroup('personWhenLinkedOutputPGroup', 'personGroup', [
        {
          childId: 'personNameLinkOutputPGroup',
          type: 'presentation',
        },
      ]);
      createPresentationGroup('personNameLinkOutputPGroup', 'personNameGroup', [
        { childId: 'personLastNameOutputPVar', type: 'presentation' },
        { childId: 'personNameLinkSContainer', type: 'presentation' },
      ]);
      createPresentationSContainer(
        'personNameLinkSContainer',
        ['personFirstNameTextVar'],
        [
          {
            childId: 'commaText',
            type: 'text',
          },
          {
            childId: 'spaceText',
            type: 'text',
          },
          {
            childId: 'personFirstNameOutputPVar',
            type: 'presentation',
          },
        ],
      );
      createPresentationVar(
        'personFirstNameOutputPVar',
        'personFirstNameTextVar',
        'pVar',
        'output',
      );
      createPresentationVar(
        'personLastNameOutputPVar',
        'personLastNameTextVar',
        'pVar',
        'output',
      );
      createTextVar('personFirstNameTextVar', 'givenName', []);
      createTextVar('personLastNameTextVar', 'familyName', []);
      createGroup('personNameGroup', 'personNameGroup', [
        'lastNameTextVar',
        'firstNameTextVar',
      ]);
      createTextVar('lastNameTextVar', 'familyName', []);
      createTextVar('firstNameTextVar', 'givenName', []);

      const metadataGroup = dependencies.metadataPool.get('personGroup');
      const presentationGroup = dependencies.presentationPool.get(
        'personWhenLinkedOutputPGroup',
      ) as BFFPresentationGroup;

      const linkedRecordDefinition = createLinkedRecordDefinition(
        dependencies,
        metadataGroup as BFFMetadataGroup,
        presentationGroup as BFFPresentationGroup,
      );
      expect(linkedRecordDefinition.form!.components).toHaveLength(1);
      expect(linkedRecordDefinition).toStrictEqual({
        form: {
          childStyle: [''],
          components: [
            {
              childStyle: [''],
              components: [
                {
                  gridColSpan: 12,
                  childStyle: [''],
                  label: 'someTextId',
                  mode: 'output',
                  name: 'familyName',
                  repeat: {
                    repeatMax: 1,
                    repeatMin: 1,
                  },
                  showLabel: true,
                  tooltip: {
                    body: 'someDefTextId',
                    title: 'someTextId',
                  },
                  type: 'textVariable',
                  validation: {
                    pattern: '.*',
                    type: 'regex',
                  },
                },
                {
                  childStyle: [''],
                  components: [
                    {
                      gridColSpan: 12,
                      childStyle: [''],
                      name: 'commaText',
                      type: 'text',
                    },
                    {
                      gridColSpan: 12,
                      childStyle: [''],
                      name: 'spaceText',
                      type: 'text',
                    },
                    {
                      gridColSpan: 12,
                      label: 'someTextId',
                      mode: 'output',
                      childStyle: [''],
                      name: 'givenName',
                      repeat: {
                        repeatMax: 1,
                        repeatMin: 1,
                      },
                      showLabel: true,
                      tooltip: {
                        body: 'someDefTextId',
                        title: 'someTextId',
                      },
                      type: 'textVariable',
                      validation: {
                        pattern: '.*',
                        type: 'regex',
                      },
                    },
                  ],
                  containerType: 'surrounding',
                  gridColSpan: 12,
                  mode: 'output',
                  name: 'personNameLinkSContainer',
                  presentationStyle: '',
                  type: 'container',
                },
              ],
              gridColSpan: 12,
              label: 'someTextId',
              mode: 'output',
              name: 'personNameGroup',
              presentationStyle: '',
              repeat: {
                repeatMax: 1,
                repeatMin: 1,
              },
              showLabel: true,
              tooltip: {
                body: 'someDefTextId',
                title: 'someTextId',
              },
              type: 'group',
            },
          ],
          gridColSpan: 12,
          label: 'someTextId',
          mode: 'output',
          name: 'personGroup',
          presentationStyle: '',
          repeat: {
            repeatMax: 1,
            repeatMin: 1,
          },
          showLabel: true,
          tooltip: {
            body: 'someDefTextId',
            title: 'someTextId',
          },
          type: 'group',
        },
      });
    });

    it('should return a linked record definition for a nationalSubjectCategoryOutputPLink', () => {
      createRecordLink(
        'nationalSubjectCategoryLink',
        'nationalSubjectCategory',
      );
      createPresentationRecordLink(
        'nationalSubjectCategoryOutputPLink',
        'nationalSubjectCategoryLink',
        'nationalSubjectCategoryWhenLinkedPGroup',
      );
      createPresentationGroup(
        'nationalSubjectCategoryWhenLinkedPGroup',
        'nationalSubjectCategoryGroup',
        [
          {
            childId: 'nationalSubjectCategoryNameOutputPGroup',
            type: 'presentation',
          },
          { childId: 'semicolonText', type: 'text' },
          { childId: 'spaceText', type: 'text' },
          {
            childId: 'nationalSubjectCategoryAlternativeNameOutputPGroup',
            type: 'presentation',
          },
          { childId: 'spaceText', type: 'text' },
          { childId: 'firstHalfParenthesisText', type: 'text' },
          { childId: 'subjectCodeOutputPVar', type: 'presentation' },
          { childId: 'secondHalfParenthesisText', type: 'text' },
        ],
      );
      createGroup('nationalSubjectCategoryGroup', 'nationalSubjectCategory', [
        'nationalSubjectCategoryNameGroup',
        'nationalSubjectCategoryAlternativeNameGroup',
        'subjectCodeTextVar',
      ]);
      createGroup('nationalSubjectCategoryNameGroup', 'name', [
        'nationalSubjectCategoryNameTextVar',
        'sweLanguageCollectionVar',
      ]);
      createGroup(
        'nationalSubjectCategoryAlternativeNameGroup',
        'alternativeName',
        ['nationalSubjectCategoryNameTextVar', 'engLanguageCollectionVar'],
      );
      createTextVar(
        'nationalSubjectCategoryNameTextVar',
        'nationalSubjectCategoryName',
        [],
      );
      createPresentationGroup(
        'nationalSubjectCategoryNameOutputPGroup',
        'nationalSubjectCategoryNameGroup',
        [
          {
            childId: 'nationalSubjectCategoryNameOutputPVar',
            type: 'presentation',
          },
        ],
      );
      createPresentationGroup(
        'nationalSubjectCategoryAlternativeNameOutputPGroup',
        'nationalSubjectCategoryAlternativeNameGroup',
        [
          {
            childId: 'nationalSubjectCategoryNameOutputPVar',
            type: 'presentation',
          },
        ],
      );
      createPresentationVar(
        'nationalSubjectCategoryNameOutputPVar',
        'nationalSubjectCategoryNameTextVar',
        'pVar',
        'output',
      );
      createPresentationGroup(
        'nationalSubjectCategoryPGroup',
        'nationalSubjectCategoryGroup',
        [
          {
            childId: 'nationalSubjectCategoryText',
            type: 'text',
          },
          {
            childId: 'nationalSubjectCategoryNamePGroup',
            type: 'presentation',
          },
          {
            childId: 'nationalSubjectCategoryAlternativeNamePGroup',
            type: 'presentation',
          },
          {
            childId: 'subjectCodeTextVarText',
            type: 'text',
          },
          {
            childId: 'subjectCodePVar',
            type: 'presentation',
          },
        ],
      );
      createTextVar('subjectCodeTextVar', 'subjectCode', []);
      createPresentationVar(
        'subjectCodeOutputPVar',
        'subjectCodeTextVar',
        'pVar',
        'output',
      );

      const metadataGroup = dependencies.metadataPool.get(
        'nationalSubjectCategoryGroup',
      );
      const presentationGroup = dependencies.presentationPool.get(
        'nationalSubjectCategoryWhenLinkedPGroup',
      ) as BFFPresentationGroup;

      const linkedRecordDefinition = createLinkedRecordDefinition(
        dependencies,
        metadataGroup as BFFMetadataGroup,
        presentationGroup as BFFPresentationGroup,
      );

      expect(linkedRecordDefinition.form!.components).toHaveLength(8);
      expect(linkedRecordDefinition).toStrictEqual({
        form: {
          childStyle: [''],
          components: [
            {
              childStyle: [''],
              components: [
                {
                  gridColSpan: 12,
                  childStyle: [''],
                  label: 'someTextId',
                  mode: 'output',
                  name: 'nationalSubjectCategoryName',
                  repeat: {
                    repeatMax: 1,
                    repeatMin: 1,
                  },
                  showLabel: true,
                  tooltip: {
                    body: 'someDefTextId',
                    title: 'someTextId',
                  },
                  type: 'textVariable',
                  validation: {
                    pattern: '.*',
                    type: 'regex',
                  },
                },
              ],
              gridColSpan: 12,
              label: 'someTextId',
              mode: 'output',
              name: 'name',
              presentationStyle: '',
              repeat: {
                repeatMax: 1,
                repeatMin: 1,
              },
              showLabel: true,
              tooltip: {
                body: 'someDefTextId',
                title: 'someTextId',
              },
              type: 'group',
            },
            {
              gridColSpan: 12,
              childStyle: [''],
              name: 'semicolonText',
              type: 'text',
            },
            {
              gridColSpan: 12,
              childStyle: [''],
              name: 'spaceText',
              type: 'text',
            },
            {
              childStyle: [''],
              components: [
                {
                  gridColSpan: 12,
                  label: 'someTextId',
                  childStyle: [''],
                  mode: 'output',
                  name: 'nationalSubjectCategoryName',
                  repeat: {
                    repeatMax: 1,
                    repeatMin: 1,
                  },
                  showLabel: true,
                  tooltip: {
                    body: 'someDefTextId',
                    title: 'someTextId',
                  },
                  type: 'textVariable',
                  validation: {
                    pattern: '.*',
                    type: 'regex',
                  },
                },
              ],
              gridColSpan: 12,
              label: 'someTextId',
              mode: 'output',
              name: 'alternativeName',
              presentationStyle: '',
              repeat: {
                repeatMax: 1,
                repeatMin: 1,
              },
              showLabel: true,
              tooltip: {
                body: 'someDefTextId',
                title: 'someTextId',
              },
              type: 'group',
            },
            {
              gridColSpan: 12,
              childStyle: [''],
              name: 'spaceText',
              type: 'text',
            },
            {
              gridColSpan: 12,
              childStyle: [''],
              name: 'firstHalfParenthesisText',
              type: 'text',
            },
            {
              gridColSpan: 12,
              childStyle: [''],
              label: 'someTextId',
              mode: 'output',
              name: 'subjectCode',
              repeat: {
                repeatMax: 1,
                repeatMin: 1,
              },
              showLabel: true,
              tooltip: {
                body: 'someDefTextId',
                title: 'someTextId',
              },
              type: 'textVariable',
              validation: {
                pattern: '.*',
                type: 'regex',
              },
            },
            {
              gridColSpan: 12,
              childStyle: [''],
              name: 'secondHalfParenthesisText',
              type: 'text',
            },
          ],
          gridColSpan: 12,
          label: 'someTextId',
          mode: 'output',
          name: 'nationalSubjectCategory',
          presentationStyle: '',
          repeat: {
            repeatMax: 1,
            repeatMin: 1,
          },
          showLabel: true,
          tooltip: {
            body: 'someDefTextId',
            title: 'someTextId',
          },
          type: 'group',
        },
      });
    });
  });

  it('should return a linked record definition for a password', () => {
    createGroup('viewDefinitionPasswordGroup', 'password', [
      'loginIdTextVar',
      'loginPasswordTextVar',
    ]);
    createPresentationGroup(
      'viewDefinitionPasswordPGroup',
      'viewDefinitionPasswordGroup',
      [
        {
          childId: 'loginIdPVar',
          type: 'presentation',
        },
        {
          childId: 'loginPasswordPVar',
          type: 'presentation',
        },
      ],
      'input',
    );
    createTextVar(
      'loginIdTextVar',
      'loginId',
      [],
      '^[0-9A-Za-z:-_]{2,50}@[0-9A-Za-z:-_.]{2,300}$',
    );
    createTextVar(
      'loginPasswordTextVar',
      'password',
      [],
      '(^[0-9A-Za-z:-_]{2,50}$)',
    );
    createPresentationVar('loginIdPVar', 'loginIdTextVar', 'pVar', 'input');
    createPresentationVar(
      'loginPasswordPVar',
      'loginPasswordTextVar',
      'pVar',
      'input',
      'password',
    );

    const passwordGroup = createLinkedRecordDefinition(
      dependencies,
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
      } as BFFMetadataGroup,
      {
        id: 'viewDefinitionPasswordPGroup',
        presentationOf: 'viewDefinitionPasswordGroup',
        mode: 'input',
        children: [
          {
            childId: 'loginIdPVar',
            type: 'presentation',
            minNumberOfRepeatingToShow: '1',
            childStyle: [],
          },
          {
            childId: 'loginPasswordPVar',
            type: 'presentation',
            minNumberOfRepeatingToShow: '1',
            childStyle: [],
          },
        ],
        type: 'pGroup',
      },
    );
    expect(passwordGroup.form!.components).toHaveLength(2);
    expect(passwordGroup).toStrictEqual({
      form: {
        childStyle: [''],
        components: [
          {
            childStyle: [''],
            gridColSpan: 12,
            label: 'someTextId',
            mode: 'input',
            name: 'loginId',
            repeat: {
              repeatMax: 1,
              repeatMin: 1,
            },
            showLabel: true,
            tooltip: {
              body: 'someDefTextId',
              title: 'someTextId',
            },
            type: 'textVariable',
            validation: {
              pattern: '^[0-9A-Za-z:-_]{2,50}@[0-9A-Za-z:-_.]{2,300}$',
              type: 'regex',
            },
          },
          {
            childStyle: [''],
            gridColSpan: 12,
            label: 'someTextId',
            mode: 'input',
            name: 'password',
            inputFormat: 'password',
            repeat: {
              repeatMax: 1,
              repeatMin: 1,
            },
            showLabel: true,
            tooltip: {
              body: 'someDefTextId',
              title: 'someTextId',
            },
            type: 'textVariable',
            validation: {
              pattern: '(^[0-9A-Za-z:-_]{2,50}$)',
              type: 'regex',
            },
          },
        ],
        gridColSpan: 12,
        label: 'someTextId',
        mode: 'input',
        name: 'password',

        presentationStyle: '',
        repeat: {
          repeatMax: 1,
          repeatMin: 1,
        },
        showLabel: true,
        tooltip: {
          body: 'someDefTextId',
          title: 'someTextId',
        },
        type: 'group',
      },
    });
  });

  describe('findMetadataChildReferenceByNameInDataAndAttributes', () => {
    it('findMetadataChildReferenceByNameInDataAndAttributes with correct nameInData', () => {
      const test = findMetadataChildReferenceByNameInDataAndAttributes(
        dependencies.metadataPool,
        someNewMetadataGroupForMissingChildId.children,
        someMetadataCollectionVariable,
      );
      expect(test).toStrictEqual({
        childId: 'exampleCollectionVarId',
        repeatMax: '1',
        repeatMin: '0',
      });
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes equal nameInData`, () => {
      const mmTextVar = createTextVar('mmTextVar', 'someNameInData', []);
      const pmTextVar = createTextVar('pmTextVar', 'someNameInData', []);
      const childRefs = createChildReferences([mmTextVar.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefs,
        pmTextVar,
      );

      expect(actual).toStrictEqual(childRefs[0]);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes unequal nameInData`, () => {
      const mmTextVar = createTextVar('mmTextVar', 'someNameInData', []);
      const pmTextVar = createTextVar('pmTextVar', 'someNameInDataNOT', []);
      const childRefs = createChildReferences([mmTextVar.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefs,
        pmTextVar,
      );

      expect(actual).toBe(undefined);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
    and unequal number of attributes`, () => {
      const mmAttribute = createCollVar(
        'mmAttribute',
        'attributeName',
        ['value1', 'value2'],
        [],
      );
      const mmAttribute1 = createCollVar(
        'mmAttribute1',
        'attributeName11',
        ['value1', 'value2'],
        [],
      );
      const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [
        mmAttribute.id,
        mmAttribute1.id,
      ]);
      const pmAttribute = createCollVar(
        'pmAttribute',
        'attributeName',
        ['value1', 'value2'],
        [],
      );
      const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [
        pmAttribute.id,
      ]);
      const childRefs = createChildReferences([mmTextVar.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefs,
        pmTextVar,
      );

      expect(actual).toBe(undefined);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes and same attributes`, () => {
      const mmAttribute = createCollVar(
        'mmAttribute',
        'attributeName',
        ['value1', 'value2'],
        [],
      );
      const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [
        mmAttribute.id,
      ]);
      const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [
        mmAttribute.id,
      ]);
      const childRefs = createChildReferences([mmTextVar.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefs,
        pmTextVar,
      );

      expect(actual).toStrictEqual(childRefs[0]);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes and equal attributes`, () => {
      const mmAttribute = createCollVar(
        'mmAttribute',
        'attributeName',
        ['value1', 'value2'],
        [],
      );
      const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [
        mmAttribute.id,
      ]);
      const pmAttribute = createCollVar(
        'pmAttribute',
        'attributeName',
        ['value1', 'value2'],
        [],
      );
      const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [
        pmAttribute.id,
      ]);
      const children = createChildReferences([mmTextVar.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        children,
        pmTextVar,
      );

      expect(actual).toStrictEqual(children[0]);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes and equal attributes multiple children to find in`, () => {
      const mmAttribute = createCollVar(
        'mmAttribute',
        'attributeName',
        ['value1', 'value2'],
        [],
      );
      const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [
        mmAttribute.id,
      ]);
      const pmAttribute = createCollVar(
        'pmAttribute',
        'attributeName',
        ['value1', 'value2'],
        [],
      );
      const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [
        pmAttribute.id,
      ]);
      const textVar3 = createTextVar('textVar3', 'someNameInData3', [
        pmAttribute.id,
      ]);
      const childRefs = createChildReferences([mmTextVar.id, textVar3.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefs,
        pmTextVar,
      );

      expect(actual).toStrictEqual(childRefs[0]);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
        and same number of attributes but different nameInData of attribute`, () => {
      const mmAttribute = createCollVar(
        'mmAttribute',
        'attributeName',
        ['value1', 'value2'],
        [],
      );
      const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [
        mmAttribute.id,
      ]);
      const pmAttribute = createCollVar(
        'pmAttribute',
        'attributeNameNOT',
        ['value1', 'value2'],
        [],
      );
      const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [
        pmAttribute.id,
      ]);
      const childRefs = createChildReferences([mmTextVar.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefs,
        pmTextVar,
      );

      expect(actual).toBe(undefined);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes but different value of attribute`, () => {
      const mmAttribute = createCollVar(
        'mmAttribute',
        'attributeName',
        ['value1', 'value2'],
        [],
      );
      const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [
        mmAttribute.id,
      ]);
      const pmAttribute = createCollVar(
        'pmAttribute',
        'attributeName',
        ['valueNOT1', 'value2'],
        [],
      );
      const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [
        pmAttribute.id,
      ]);
      const childRefs = createChildReferences([mmTextVar.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefs,
        pmTextVar,
      );
      expect(actual).toBe(undefined);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes but different wider value of attribute in presentation`, () => {
      const mmAttribute = createCollVar(
        'mmAttribute',
        'attributeName',
        ['value2'],
        [],
      );
      const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [
        mmAttribute.id,
      ]);
      const pmAttribute = createCollVar(
        'pmAttribute',
        'attributeName',
        ['value1', 'value2'],
        [],
      );
      const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [
        pmAttribute.id,
      ]);
      const childRefsForCurrentGroup = createChildReferences([mmTextVar.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefsForCurrentGroup,
        pmTextVar,
      );
      expect(actual).toStrictEqual(childRefsForCurrentGroup[0]);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes but different more specific value of attribute in 
      presentation`, () => {
      const mmAttribute = createCollVar(
        'mmAttribute',
        'attributeName',
        ['value1', 'value2'],
        [],
      );
      const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [
        mmAttribute.id,
      ]);
      const pmAttribute = createCollVar(
        'pmAttribute',
        'attributeName',
        ['value2'],
        [],
      );
      const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [
        pmAttribute.id,
      ]);
      const childRefsForCurrentGroup = createChildReferences([mmTextVar.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefsForCurrentGroup,
        pmTextVar,
      );
      expect(actual).toBe(undefined);
    });

    // FINAL VALUE FOR ATTRIBUTES
    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes but finalValue of attribute in metadata`, () => {
      const mmAttribute = createCollVarFinal(
        'mmAttribute',
        'attributeName',
        'value1',
        [],
      );
      const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [
        mmAttribute.id,
      ]);
      const pmAttribute = createCollVar(
        'pmAttribute',
        'attributeName',
        ['value1'],
        [],
      );
      const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [
        pmAttribute.id,
      ]);
      const childRefsForCurrentGroup = createChildReferences([mmTextVar.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefsForCurrentGroup,
        pmTextVar,
      );
      expect(actual).toStrictEqual(childRefsForCurrentGroup[0]);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes but finalValue of attribute in presentation`, () => {
      const mmAttribute = createCollVar(
        'mmAttribute',
        'attributeName',
        ['value1'],
        [],
      );
      const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [
        mmAttribute.id,
      ]);
      const pmAttribute = createCollVarFinal(
        'pmAttribute',
        'attributeName',
        'value1',
        [],
      );
      const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [
        pmAttribute.id,
      ]);
      const childRefsForCurrentGroup = createChildReferences([mmTextVar.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefsForCurrentGroup,
        pmTextVar,
      );
      expect(actual).toStrictEqual(childRefsForCurrentGroup[0]);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes but finalValue of attribute in metadata`, () => {
      const mmAttribute = createCollVarFinal(
        'mmAttribute',
        'attributeName',
        'value1',
        [],
      );
      const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [
        mmAttribute.id,
      ]);
      const pmAttribute = createCollVar(
        'pmAttribute',
        'attributeName',
        ['value1', 'value2'],
        [],
      );
      const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [
        pmAttribute.id,
      ]);
      const childRefsForCurrentGroup = createChildReferences([mmTextVar.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefsForCurrentGroup,
        pmTextVar,
      );
      expect(actual).toStrictEqual(childRefsForCurrentGroup[0]);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes but finalValue of attribute in presentation
      is more specific`, () => {
      const mmAttribute = createCollVar(
        'mmAttribute',
        'attributeName',
        ['value1', 'value2'],
        [],
      );
      const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [
        mmAttribute.id,
      ]);
      const pmAttribute = createCollVarFinal(
        'pmAttribute',
        'attributeName',
        'value2',
        [],
      );
      const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [
        pmAttribute.id,
      ]);
      const childRefsForCurrentGroup = createChildReferences([mmTextVar.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefsForCurrentGroup,
        pmTextVar,
      );
      expect(actual).toBe(undefined);
    });

    describe('firstAttributesExistsInSecond', () => {
      it('testSameAttributeUndefined', () => {
        const actual = firstAttributesExistsInSecond(undefined, undefined);
        expect(actual).toBe(true);
      });

      it('testSameAttributeOneUndefined', () => {
        const actual = firstAttributesExistsInSecond({}, undefined);
        expect(actual).toBe(true);
        const actual2 = firstAttributesExistsInSecond(undefined, {});
        expect(actual2).toBe(true);
      });

      it('testSameAttributeEmpty', () => {
        const actual = firstAttributesExistsInSecond({}, {});
        expect(actual).toBe(true);
      });

      it('testSameAttributeOneEmpty', () => {
        const mmAttribute = {
          anAttribute: ['aFinalValue'],
        };
        const pmAttribute = {};
        const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
        expect(actual).toBe(false);
      });

      it('testfirstAttributesExistsInSecond', () => {
        const mmAttribute = {
          someNameInData: ['aFinalValue', 'aOtherFinalValue'],
        };
        const pmAttribute = {
          someNameInData: ['aFinalValue', 'aOtherFinalValue'],
        };
        const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
        expect(actual).toBe(true);
      });

      it('testfirstAttributesExistsInSecondReversedAttributes', () => {
        const mmAttribute = {
          someNameInData: ['aFinalValue', 'aOtherFinalValue'],
        };
        const pmAttribute = {
          someNameInData: ['aFinalValue', 'aOtherFinalValue'],
        };
        const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
        expect(actual).toBe(true);
      });

      it('testSameAttributeDifferentAttributeValues', () => {
        const mmAttribute = {
          someNameInData: ['aFinalValue', 'aOtherFinalValue'],
        };
        const pmAttribute = {
          someNameInData: ['aFinalValue'],
        };
        const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
        expect(actual).toBe(false);
      });

      it('testSameAttributeDifferentAttributeValues2', () => {
        const mmAttribute = {
          someNameInData: ['aFinalValue', 'aOtherFinalValue'],
        };
        const pmAttribute = {
          someNameInData: ['aOtherFinalValue'],
        };
        const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
        expect(actual).toBe(false);
      });

      it('testSameAttributeDifferentAttributeValues3', () => {
        const mmAttribute = {
          someNameInData: ['aFinalValue'],
        };
        const pmAttribute = {
          someNameInData: ['aFinalValue', 'aOtherFinalValue'],
        };
        const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
        expect(actual).toBe(true);
      });

      it('testSameAttributeDifferentAttributeValues4', () => {
        const mmAttribute = {
          someNameInData: ['aOtherFinalValue'],
        };
        const pmAttribute = {
          someNameInData: ['aFinalValue', 'aOtherFinalValue'],
        };
        const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
        expect(actual).toBe(true);
      });

      it('testSameAttributeDifferentAttributeValues5', () => {
        const mmAttribute = {
          someNameInData: ['aOtherFinalValue'],
        };
        const pmAttribute = {
          someNameInData: ['aOtherFinalValue', 'aFinalValue'],
        };
        const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
        expect(actual).toBe(true);
      });

      it('testSameAttributeDifferentAttributeValues6', () => {
        const mmAttribute = {
          someNameInData: ['aFinalValue'],
        };
        const pmAttribute = {
          someNameInData: ['aOtherFinalValue', 'aFinalValue'],
        };
        const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
        expect(actual).toBe(true);
      });

      it('testSameAttributeDifferent', () => {
        const mmAttribute = {
          someNameInData: ['aFinalValue', 'aOtherFinalValue'],
        };
        const pmAttribute = {
          someNameInDataNOT: ['aFinalValue'],
        };
        const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
        expect(actual).toBe(false);
      });

      it('testSameAttributeDifferentName', () => {
        const mmAttribute = {
          someNameInData: ['aFinalValue'],
        };
        const pmAttribute = {
          someNameInDataNOT: ['aFinalValue'],
        };
        const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
        expect(actual).toBe(false);
      });

      it('testMultipleAttributesDifferentName', () => {
        const mmAttribute = {
          someNameInData: ['aFinalValue'],
          someOtherNameInData: ['aFinalValue'],
        };
        const pmAttribute = {
          someNameInData: ['aFinalValue'],
          someOtherNameInData: ['aFinalValue'],
        };
        const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
        expect(actual).toBe(true);
      });

      it('testMultipleAttributesDifferentName2', () => {
        const mmAttribute = {
          someNameInData: ['aFinalValue'],
          someOtherNameInData: ['aOtherFinalValue'],
        };
        const pmAttribute = {
          someNameInData: ['aFinalValue'],
          someOtherNameInData: ['aFinalValue'],
        };
        const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
        expect(actual).toBe(false);
      });
    });

    describe('getAttributesForAttributeReferences', () => {
      it('should return an object with nameInData and item values', () => {
        const mmAttribute = createCollVar(
          'mmAttribute',
          'attributeName',
          ['blue', 'pink', 'yellow'],
          [],
        );

        const attributeReferences: BFFAttributeReference[] = [
          { refCollectionVarId: mmAttribute.id },
        ];
        const actual = getAttributesByAttributeReferences(
          dependencies.metadataPool,
          attributeReferences,
        );

        const expected = {
          [mmAttribute.nameInData]: ['blue', 'pink', 'yellow'],
        };
        expect(actual).toStrictEqual(expected);
      });

      it('should return an object with nameInData and item values for finalValue', () => {
        const mmAttribute = createCollVarFinal(
          'mmAttribute',
          'attributeName',
          'blue',
          [],
        );
        const attributeReferences: BFFAttributeReference[] = [
          { refCollectionVarId: mmAttribute.id },
        ];

        const actual = getAttributesByAttributeReferences(
          dependencies.metadataPool,
          attributeReferences,
        );

        const expected = { [mmAttribute.nameInData]: ['blue'] };
        expect(actual).toStrictEqual(expected);
      });

      it('should return an object with nameInData and item values for multiple attributes', () => {
        const mmAttribute = createCollVar(
          'mmAttribute',
          'attributeName',
          ['blue', 'pink', 'yellow'],
          [],
        );
        const pmAttribute = createCollVar(
          'pmAttribute',
          'attributeName',
          ['green', 'red', 'black'],
          [],
        );
        const attributeReferences: BFFAttributeReference[] = [
          { refCollectionVarId: mmAttribute.id },
          { refCollectionVarId: pmAttribute.id },
        ];

        const actual = getAttributesByAttributeReferences(
          dependencies.metadataPool,
          attributeReferences,
        );

        const expected = {
          [mmAttribute.nameInData]: ['blue', 'pink', 'yellow'],
          [pmAttribute.nameInData]: ['green', 'red', 'black'],
        };
        expect(actual).toStrictEqual(expected);
      });
    });
  });
  describe('hasLinkedPresentation', () => {
    it('return true for link presentation with presentation', () => {
      const presentation = {
        id: 'nationalSubjectCategoryPLink',
        type: 'pRecordLink',
        presentationOf: 'nationalSubjectCategoryLink',
        mode: 'output',
        linkedRecordPresentations: [
          {
            presentedRecordType: 'nationalSubjectCategory',
            presentationId: 'nationalSubjectCategoryWhenLinkedOutputPGroup',
          },
        ],
      };
      const actual = hasLinkedPresentation(
        presentation as BFFPresentationRecordLink,
      );
      expect(actual).toBeTruthy();
    });
    it('return false for link presentation with presentation', () => {
      const presentation = {
        id: 'nationalSubjectCategoryPLink',
        type: 'pRecordLink',
        presentationOf: 'nationalSubjectCategoryLink',
        mode: 'output',
      };
      const actual = hasLinkedPresentation(
        presentation as BFFPresentationRecordLink,
      );
      expect(actual).toBeFalsy();
    });
  });

  describe('reusing presentation for validationTypes', () => {
    it('reusing divaOutputPGroup for thesisManuscriptNewGroup', () => {
      createValidationTypeWithReusedPresentation(
        'thesisManuscript',
        'divaOutput',
      );
      createValidationType('divaOutput');
      createTextVar('abstractTextVar', 'abstract', []);
      createTextVar('abstract2TextVar', 'abstract2', []);
      createPresentationVar('abstractPVar', 'abstractTextVar', 'presentation');
      createPresentationVar(
        'abstract2PVar',
        'abstract2TextVar',
        'presentation',
      );
      createGroup('somethesisManuscriptMetadataGroupId', 'divaOutput', [
        'abstractTextVar',
      ]);
      createPresentationGroup(
        'pSomedivaOutputNewMetadataGroupId',
        'divaOutputGroup',
        [
          {
            childId: 'abstractPVar',
            type: 'presentation',
          },
          {
            childId: 'abstract2PVar',
            type: 'presentation',
          },
        ],
      );
      createGroup('divaOutputGroup', 'divaOutput', [
        'abstractTextVar',
        'abstract2TextVar',
      ]);

      const formDefinition = createFormDefinition(
        dependencies,
        'thesisManuscript',
        FORM_MODE_NEW,
      );
      expect(formDefinition).toStrictEqual({
        form: {
          childStyle: [''],
          components: [
            {
              childStyle: [''],
              gridColSpan: 12,
              label: 'someTextId',
              mode: 'output',
              name: 'abstract',
              repeat: {
                repeatMax: 1,
                repeatMin: 1,
              },
              showLabel: true,
              tooltip: {
                body: 'someDefTextId',
                title: 'someTextId',
              },
              type: 'textVariable',
            },
          ],
          gridColSpan: 12,
          label: 'someTextId',
          mode: 'output',
          name: 'divaOutput',
          presentationStyle: '',
          repeat: {
            repeatMax: 1,
            repeatMin: 1,
          },
          showLabel: true,
          tooltip: {
            body: 'someDefTextId',
            title: 'someTextId',
          },
          type: 'group',
        },
        validationTypeId: 'thesisManuscript',
      });
    });
  });
});
