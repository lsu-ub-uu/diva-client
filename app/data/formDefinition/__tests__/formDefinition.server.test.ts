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
  exampleOtherCollectionVarId,
  idTextVar,
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
  recordInfoMetadata,
  recordTypeLink,
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
  tsCreatedTextVar,
  tsUpdatedTextVar,
  updatedByLink,
  updatedGroup,
  validationTypeLink,
} from '@/__mocks__/bff/form/bffMock';
import type { FormComponentTextVar } from '@/components/FormGenerator/types';
import type {
  BFFAttributeReference,
  BFFGuiElement,
  BFFLinkedRecordPresentation,
  BFFMetadata,
  BFFMetadataBase,
  BFFMetadataChildReference,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataItemCollection,
  BFFMetadataRecordLink,
  BFFMetadataTextVariable,
  BFFPresentation,
  BFFPresentationBase,
  BFFPresentationChildReference,
  BFFPresentationGroup,
  BFFPresentationOfSingleMetadata,
  BFFPresentationRecordLink,
  BFFPresentationSurroundingContainer,
  BFFPresentationTextVar,
  BFFRecordType,
  BFFSearch,
  BFFText,
  BFFValidationType,
  Dependencies,
} from '@/cora/bffTypes.server';
import {
  createFormDefinition,
  createLinkedRecordDefinition,
} from '@/data/formDefinition/createFormDefinition.server';
import {
  findMetadataChildReferenceByNameInDataAndAttributes,
  firstAttributesExistsInSecond,
} from '@/data/formDefinition/utils/findMetadataChildReferenceByNameInDataAndAttributes.server';
import { listToPool } from 'server/dependencies/util/listToPool';
import type { Lookup } from 'server/dependencies/util/lookup';
import { beforeEach, describe, expect, it } from 'vitest';
import { createPresentationComponent } from '../createPresentation/createPresentationComponent';
import {
  getAttributesByAttributeReferences,
  hasLinkedPresentation,
} from '../utils/formDefinitionUtils.server';

describe('formDefinition', () => {
  const FORM_MODE_NEW = 'create';
  const FORM_MODE_EDIT = 'update';
  const FORM_MODE_VIEW = 'view'; // used to present the record

  describe('createFormDefinition', () => {
    it('should throw Error on invalid ValidationType', () => {
      const invalidValidationType = 'someInvalidValidationType';

      const mockDependencies = {
        validationTypePool: listToPool([{} as BFFValidationType]),
      } as Dependencies;
      expect(() => {
        createFormDefinition(
          mockDependencies,
          invalidValidationType,
          FORM_MODE_NEW,
        );
      }).toThrow(Error);

      try {
        createFormDefinition(
          mockDependencies,
          invalidValidationType,
          FORM_MODE_NEW,
        );
      } catch (error: unknown) {
        const createFormDefinitionError: Error = <Error>error;
        expect(createFormDefinitionError.message).toStrictEqual(
          '[someInvalidValidationType] does not exist in Lookup pool',
        );
      }
    });
  });

  describe('form definition', () => {
    it('should return a form definition for a new metadata group', () => {
      const validationTypeId = 'someValidationTypeId';

      const formDefinition = createFormDefinition(
        createBasicDependencies(),
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
          name: 'someNewMetadataGroupNameInData',
          presentationId: 'pSomeNewMetadataGroupId',
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
              textStyle: 'boldTextStyle',
              gridColSpan: 12,
              childStyle: ['twelveChildStyle'],
            },
            {
              type: 'textVariable',
              name: 'someNameInData',
              presentationId: 'pSomeMetadataTextVariableId',
              label: 'someTextId',
              placeholder: 'someEmptyTextId',
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
              presentationId: 'pSomeMetadataTextVariable2Id',

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
              presentationId: 'pSomeMetadataTextVariable3Id',
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
              presentationId: 'pSomeMetadataTextVariable6Id',
              label: 'someTextId',
              showLabel: true,
              placeholder: 'someEmptyTextId',
              gridColSpan: 12,

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
              presentationId: 'pSomeMetadataNumberVariableId',

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
              presentationId: 'pSomeMetadataCollectionVariableId',

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
              presentationId: 'pSomeMetadataCollectionVariableWithAttributeId',

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
              presentationId: 'pSomeMetadataNumberWithAttributeVarId',
              label: 'someNumberVarTextId',
              showLabel: true,
              gridColSpan: 12,

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
              presentationId: 'pSomeMetadataTextVariableWithAttributeVarId',
              label: 'someTextId',
              showLabel: true,
              gridColSpan: 12,

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
              presentationId: 'pSomeMetadataChildGroupId',

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
                  presentationId: 'pSomeMetadataTextVariableId',
                  showLabel: true,
                  gridColSpan: 3,
                  childStyle: ['threeChildStyle'],
                  label: 'someTextId',
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
              presentationId: 'nationalSubjectCategoryPLinkId',
              linkedRecordPresentation: {
                presentationId: 'someSubjectCategoryPresentation',
                presentedRecordType: 'nationalSubjectCategory',
              },
              showLabel: true,
              gridColSpan: 12,

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
              presentationId: 'someNewRecordPLinkId',
              label: 'someNewRecordLinkText',
              linkedRecordPresentation: {
                presentationId: 'someNewRecordLink',
                presentedRecordType: 'someNewRecordLink',
              },
              showLabel: true,
              gridColSpan: 12,

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
            },
            {
              type: 'container',
              name: 'pSomeContainerId',
              presentationId: 'pSomeContainerId',
              // frame
              containerType: 'surrounding',
              gridColSpan: 12,

              components: [
                {
                  type: 'textVariable',
                  name: 'someNameInData4',
                  presentationId: 'pSomeMetadataTextVariable4Id',
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
              presentationId: 'pSomeRepeatingContainerId',
              presentationStyle: 'label',
              containerType: 'repeating',
              gridColSpan: 12,
              components: [
                {
                  type: 'textVariable',
                  name: 'someNameInData5',
                  presentationId: 'pSomeMetadataTextVariable5Id',
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

              presentationStyle: 'someMetadataChildGroupPresentationStyle',
              name: 'someMetadataChildGroupWithSpecifiedHeadlineTextNameInData',
              presentationId:
                'pSomeMetadataChildGroupWithSpecifiedHeadlineTextId',
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
                  presentationId: 'pSomeMetadataTextVariableId',
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

              name: 'someMetadataChildGroupWithShowHeadlineFalseNameInData',
              presentationId: 'pSomeMetadataChildGroupWithShowHeadlineFalseId',
              presentationStyle: 'someMetadataChildGroupPresentationStyle',
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
                  presentationId: 'pSomeMetadataTextVariableId',
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
              presentationId: 'pSomeManuscriptGroupId',
              repeat: {
                repeatMax: 1,
                repeatMin: 1,
              },
              tooltip: {
                body: 'defTextId678',
                title: 'textId345',
              },
              type: 'group',

              components: [
                {
                  containerType: 'surrounding',
                  gridColSpan: 12,

                  mode: 'input',
                  name: 'pSomeManuscriptIdContainer',
                  presentationId: 'pSomeManuscriptIdContainer',
                  type: 'container',

                  components: [
                    {
                      gridColSpan: 12,

                      inputType: 'input',
                      label: 'someTextId',
                      showLabel: true,
                      mode: 'input',
                      name: 'archiveNumber',
                      presentationId: 'pArchiveNumberTextVarId',
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
                      gridColSpan: 12,

                      inputType: 'input',
                      label: 'someTextId',
                      showLabel: true,
                      mode: 'input',
                      name: 'localId',
                      presentationId: 'pLocalIdTextVarId',
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
        createBasicDependencies(),
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
          presentationStyle: 'card',
          name: 'someEditMetadataGroupNameInData',
          presentationId: 'pSomeEditMetadataGroupId',
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
              textStyle: 'boldTextStyle',
              gridColSpan: 12,
              childStyle: ['twelveChildStyle'],
            },
            {
              type: 'textVariable',
              name: 'someNameInData',
              presentationId: 'pSomeMetadataTextVariableId',

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
              presentationId: 'pSomeMetadataTextVariable2Id',
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
              presentationId: 'pSomeMetadataTextVariable3Id',

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
              presentationId: 'pSomeMetadataNumberVariableId',
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
              presentationId: 'pSomeMetadataCollectionVariableId',
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
              presentationId: 'pSomeMetadataCollectionVariableWithAttributeId',
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
              presentationId: 'pSomeMetadataNumberWithAttributeVarId',
              label: 'someNumberVarTextId',
              showLabel: true,
              gridColSpan: 12,

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
              presentationId: 'pSomeMetadataTextVariableWithAttributeVarId',
              label: 'someTextId',
              showLabel: true,
              gridColSpan: 12,

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

              name: 'someChildGroupNameInData',
              presentationId: 'pSomeMetadataChildGroupId',
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
              tooltip: {
                title: 'someChildGroupTextId',
                body: 'someChildGroupDefTextId',
              },
              presentationStyle: 'someMetadataChildGroupPresentationStyle',
              components: [
                {
                  type: 'textVariable',
                  name: 'someNameInData',
                  presentationId: 'pSomeMetadataTextVariableId',
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
              presentationId: 'nationalSubjectCategoryPLinkId',
              label: 'nationalSubjectCategoryLinkText',
              linkedRecordPresentation: {
                presentationId: 'someSubjectCategoryPresentation',
                presentedRecordType: 'nationalSubjectCategory',
              },
              showLabel: true,
              gridColSpan: 12,

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
              presentationId: 'pSomeContainerId',
              // frame
              containerType: 'surrounding',
              gridColSpan: 12,

              components: [
                {
                  type: 'textVariable',
                  name: 'someNameInData4',
                  presentationId: 'pSomeMetadataTextVariable4Id',
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
              presentationId: 'pSomeRepeatingContainerId',
              presentationStyle: 'label',
              containerType: 'repeating',
              gridColSpan: 12,

              components: [
                {
                  type: 'textVariable',
                  name: 'someNameInData5',
                  presentationId: 'pSomeMetadataTextVariable5Id',
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
              presentationStyle: 'someMetadataChildGroupPresentationStyle',
              name: 'someMetadataChildGroupWithSpecifiedHeadlineTextNameInData',
              presentationId:
                'pSomeMetadataChildGroupWithSpecifiedHeadlineTextId',
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
                  presentationId: 'pSomeMetadataTextVariableId',
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
              presentationStyle: 'someMetadataChildGroupPresentationStyle',
              name: 'someMetadataChildGroupWithShowHeadlineFalseNameInData',
              presentationId: 'pSomeMetadataChildGroupWithShowHeadlineFalseId',
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
                  presentationId: 'pSomeMetadataTextVariableId',
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

    it('should return a form definition with group that has only hidden components', () => {
      const validationTypeId = 'someValidationTypeForMissingChildIdTypeId';
      const formDefinition = createFormDefinition(
        createBasicDependencies(),
        validationTypeId,
        FORM_MODE_NEW,
      );
      expect(formDefinition).toStrictEqual({
        validationTypeId,
        form: {
          type: 'group',
          gridColSpan: 12,
          name: 'divaOutput',
          presentationId: 'pSomeNewMetadataGroupForMissingChildIdId',
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
              childStyle: ['twelveChildStyle'],
              gridColSpan: 12,
              finalValue: 'pink',
              placeholder: 'someEmptyTextId',
              presentationId:
                'pSomeOtherMetadataCollectionVariableWithMissingChildIdId',
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
            {
              components: [
                {
                  attributesToShow: 'none',
                  finalValue: 'divaData',
                  name: 'dataDivider',
                  type: 'hidden',
                  repeat: {
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                },
                {
                  attributesToShow: 'none',
                  finalValue: 'diva-output',
                  name: 'type',
                  type: 'hidden',
                  repeat: {
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                },
                {
                  attributesToShow: 'none',
                  finalValue: 'diva-output',
                  name: 'validationType',
                  type: 'hidden',
                  repeat: {
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                },
              ],
              mode: 'input',
              name: 'recordInfo',
              type: 'group',
              hidden: true,
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
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
        refGroups: [
          { childId: 'pSomeMetadataTextVariable6Id', type: 'presentation' },
        ],
      } as BFFPresentationChildReference;

      const someMetadataTextVariable6: BFFMetadataTextVariable = {
        id: 'someMetadataTextVariable6Id',
        nameInData: 'someNameInData6',
        type: 'textVariable',
        textId: 'someTextId',
        defTextId: 'someDefTextId',
        regEx: 'someRegex',
      };

      const pSomeMetadataTextVariable6: BFFPresentationTextVar = {
        id: 'pSomeMetadataTextVariable6Id',
        presentationOf: 'someMetadataTextVariable6Id',
        mode: 'output',
        inputType: 'input',
        type: 'pVar',
        emptyTextId: 'someEmptyTextId',
      };

      const mockDependencies = {
        validationTypePool: listToPool([validationType]),
        recordTypePool: listToPool([recordType]),
        metadataPool: listToPool([metaDataGroup, someMetadataTextVariable6]),
        presentationPool: listToPool([
          createPresentationGroup(
            recordType.presentationViewId,
            metaDataGroup.nameInData,
            [presentationChild],
          ),
          pSomeMetadataTextVariable6,
        ]),
      } as Dependencies;

      const formDefinition = createFormDefinition(
        mockDependencies,
        validationTypeId,
        FORM_MODE_VIEW,
      );
      expect(formDefinition.form!.components).toHaveLength(1);
      expect(formDefinition).toStrictEqual({
        validationTypeId,
        form: {
          components: [
            {
              gridColSpan: 12,
              inputType: 'input',
              label: 'someTextId',
              showLabel: true,

              mode: 'output',
              name: 'someNameInData6',
              presentationId: 'pSomeMetadataTextVariable6Id',

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
          presentationId: 'validationTypeIdOutputPGroup',

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

    it('should return a alternative presentation for a child group', () => {
      const mockDependencies = {
        validationTypePool: listToPool([
          {
            id: 'person',
            validatesRecordTypeId: 'person',
            newMetadataGroupId: 'personNewGroup',
            newPresentationGroupId: 'personUpdatePGroup',
            metadataGroupId: 'personUpdateGroup',
            presentationGroupId: 'personUpdatePGroup',
            nameTextId: 'someTextId',
            defTextId: 'someDefTextId',
          },
        ]),
        metadataPool: listToPool([
          {
            id: 'personUpdateGroup',
            nameInData: 'person',
            type: 'group',
            textId: 'someTextId',
            defTextId: 'someDefTextId',
            children: [
              {
                childId: 'personNameGroup',
                repeatMin: '1',
                repeatMax: '1',
              },
            ],
          },
          {
            id: 'personNameGroup',
            nameInData: 'name',
            type: 'group',
            textId: 'someTextId',
            defTextId: 'someDefTextId',
            children: [
              {
                childId: 'firstNameVar',
                repeatMin: '1',
                repeatMax: '1',
              },
              {
                childId: 'lastNameVar',
                repeatMin: '1',
                repeatMax: '1',
              },
              {
                childId: 'titleVar',
                repeatMin: '1',
                repeatMax: '1',
              },
            ],
          },
          {
            id: 'firstNameVar',
            nameInData: 'firstName',
            type: 'textVariable',
            textId: 'someTextId',
            defTextId: 'someDefTextId',
            regEx: '.*',
          },
          {
            id: 'lastNameVar',
            nameInData: 'lastName',
            type: 'textVariable',
            textId: 'someTextId',
            defTextId: 'someDefTextId',
            regEx: '.*',
          },
          {
            id: 'titleVar',
            nameInData: 'title',
            type: 'textVariable',
            textId: 'someTextId',
            defTextId: 'someDefTextId',
            regEx: '.*',
          },
        ]),
        recordTypePool: listToPool([
          {
            id: 'person',
            metadataId: 'personUpdateGroup',
            presentationViewId: 'personUpdatePGroup',
            listPresentationViewId: '',
            textId: 'someTextId',
            pluralTextId: 'somePluralText',
            defTextId: 'someDefTextId',
            groupOfRecordType: [],
            recordTypeCategory: [],
            useTrashBin: false,
          } as BFFRecordType,
        ]),
        presentationPool: listToPool([
          {
            id: 'personUpdatePGroup',
            type: 'pGroup',
            presentationOf: 'personUpdateGroup',
            mode: 'input',
            children: [
              {
                title: 'personRefTitle',
                titleHeadlineLevel: 'h3',
                presentationSize: 'firstSmaller',
                refGroups: [
                  {
                    childId: 'personNameMinimizedPGroup',
                    type: 'presentation',
                  },
                  { childId: 'personNamePGroup', type: 'presentation' },
                ],
              },
            ],
          },
          {
            id: 'personNameMinimizedPGroup',
            type: 'pGroup',
            presentationOf: 'personNameGroup',
            mode: 'input',
            children: [
              {
                refGroups: [{ childId: 'firstNamePVar', type: 'presentation' }],
              },
              {
                refGroups: [{ childId: 'lastNamePVar', type: 'presentation' }],
              },
            ],
          },
          {
            id: 'personNamePGroup',
            type: 'pGroup',
            presentationOf: 'personNameGroup',
            mode: 'input',
            children: [
              {
                refGroups: [{ childId: 'firstNamePVar', type: 'presentation' }],
              },
              {
                refGroups: [{ childId: 'lastNamePVar', type: 'presentation' }],
              },
              {
                refGroups: [{ childId: 'titlePVar', type: 'presentation' }],
              },
            ],
          },
          {
            id: 'firstNamePVar',
            type: 'pVar',
            mode: 'input',
            presentationOf: 'firstNameVar',
          },
          {
            id: 'lastNamePVar',
            type: 'pVar',
            mode: 'input',
            presentationOf: 'lastNameVar',
          },
          {
            id: 'titlePVar',
            type: 'pVar',
            mode: 'input',
            presentationOf: 'titleVar',
          },
          {
            id: 'personUpdatePGroup',
            type: 'pGroup',
            presentationOf: 'personUpdateGroup',
            mode: 'input',
            children: [
              {
                title: 'personRefTitle',
                titleHeadlineLevel: 'h3',
                presentationSize: 'firstSmaller',
                refGroups: [
                  {
                    childId: 'personNameMinimizedPGroup',
                    type: 'presentation',
                  },
                  { childId: 'personNamePGroup', type: 'presentation' },
                ],
              },
            ],
          },
          {
            id: 'personNameMinimizedPGroup',
            type: 'pGroup',
            presentationOf: 'personNameGroup',
            mode: 'input',
            children: [
              {
                refGroups: [{ childId: 'firstNamePVar', type: 'presentation' }],
              },
              {
                refGroups: [{ childId: 'lastNamePVar', type: 'presentation' }],
              },
            ],
          },
          {
            id: 'personNamePGroup',
            type: 'pGroup',
            presentationOf: 'personNameGroup',
            mode: 'input',
            children: [
              {
                refGroups: [{ childId: 'firstNamePVar', type: 'presentation' }],
              },
              {
                refGroups: [{ childId: 'lastNamePVar', type: 'presentation' }],
              },
              {
                refGroups: [{ childId: 'titlePVar', type: 'presentation' }],
              },
            ],
          },
          {
            id: 'firstNamePVar',
            type: 'pVar',
            mode: 'input',
            presentationOf: 'firstNameVar',
          },
          {
            id: 'lastNamePVar',
            type: 'pVar',
            mode: 'input',
            presentationOf: 'lastNameVar',
          },
          {
            id: 'titlePVar',
            type: 'pVar',
            mode: 'input',
            presentationOf: 'titleVar',
          },
        ]),
      } as Dependencies;

      const formDefinition = createFormDefinition(
        mockDependencies,
        'person',
        'update',
      );

      expect(formDefinition).toStrictEqual({
        form: {
          components: [
            {
              name: 'name',
              gridColSpan: 12,
              presentationId: 'personNameMinimizedPGroup',
              type: 'group',
              mode: 'input',
              label: 'someTextId',
              repeat: {
                repeatMax: 1,
                repeatMin: 1,
              },
              showLabel: true,
              tooltip: {
                body: 'someDefTextId',
                title: 'someTextId',
              },
              title: 'personRefTitle',
              titleHeadlineLevel: 'h3',
              presentationSize: 'firstSmaller',
              components: [
                {
                  name: 'firstName',
                  presentationId: 'firstNamePVar',
                  type: 'textVariable',
                  gridColSpan: 12,
                  label: 'someTextId',
                  mode: 'input',
                  repeat: {
                    repeatMax: 1,
                    repeatMin: 1,
                  },
                  showLabel: true,
                  tooltip: {
                    body: 'someDefTextId',
                    title: 'someTextId',
                  },
                  validation: {
                    pattern: '.*',
                    type: 'regex',
                  },
                },
                {
                  name: 'lastName',
                  type: 'textVariable',
                  label: 'someTextId',
                  mode: 'input',
                  gridColSpan: 12,
                  presentationId: 'lastNamePVar',

                  repeat: {
                    repeatMax: 1,
                    repeatMin: 1,
                  },
                  showLabel: true,
                  tooltip: {
                    body: 'someDefTextId',
                    title: 'someTextId',
                  },
                  validation: {
                    pattern: '.*',
                    type: 'regex',
                  },
                },
              ],
              alternativePresentation: {
                name: 'name',
                presentationId: 'personNamePGroup',

                gridColSpan: 12,
                type: 'group',
                mode: 'input',
                label: 'someTextId',

                repeat: {
                  repeatMax: 1,
                  repeatMin: 1,
                },
                showLabel: true,
                tooltip: {
                  body: 'someDefTextId',
                  title: 'someTextId',
                },
                title: 'personRefTitle',
                titleHeadlineLevel: 'h3',
                presentationSize: 'firstSmaller',
                components: [
                  {
                    name: 'firstName',
                    type: 'textVariable',
                    label: 'someTextId',
                    mode: 'input',
                    gridColSpan: 12,
                    presentationId: 'firstNamePVar',

                    repeat: {
                      repeatMax: 1,
                      repeatMin: 1,
                    },
                    showLabel: true,
                    tooltip: {
                      body: 'someDefTextId',
                      title: 'someTextId',
                    },
                    validation: {
                      pattern: '.*',
                      type: 'regex',
                    },
                  },
                  {
                    name: 'lastName',
                    type: 'textVariable',
                    label: 'someTextId',
                    mode: 'input',
                    gridColSpan: 12,
                    presentationId: 'lastNamePVar',

                    repeat: {
                      repeatMax: 1,
                      repeatMin: 1,
                    },
                    showLabel: true,
                    tooltip: {
                      body: 'someDefTextId',
                      title: 'someTextId',
                    },
                    validation: {
                      pattern: '.*',
                      type: 'regex',
                    },
                  },
                  {
                    name: 'title',
                    type: 'textVariable',
                    label: 'someTextId',
                    mode: 'input',
                    gridColSpan: 12,
                    presentationId: 'titlePVar',
                    repeat: {
                      repeatMax: 1,
                      repeatMin: 1,
                    },
                    showLabel: true,
                    tooltip: {
                      body: 'someDefTextId',
                      title: 'someTextId',
                    },
                    validation: {
                      pattern: '.*',
                      type: 'regex',
                    },
                  },
                ],
              },
            },
          ],
          gridColSpan: 12,
          label: 'someTextId',
          mode: 'input',
          name: 'person',
          presentationId: 'personUpdatePGroup',

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
        validationTypeId: 'person',
      });
    });

    it('should include presentationChildReference addText', () => {
      const mockDependencies = {
        recordTypePool: listToPool([
          {
            id: 'person',
            metadataId: 'personUpdateGroup',
            presentationViewId: 'personUpdatePGroup',
            listPresentationViewId: '',
            textId: 'someTextId',
            pluralTextId: 'somePluralText',
            defTextId: 'someDefTextId',
            groupOfRecordType: [],
            recordTypeCategory: [],
            useTrashBin: false,
          } as BFFRecordType,
        ]),
        validationTypePool: listToPool([
          {
            id: 'person',
            validatesRecordTypeId: 'person',
            newMetadataGroupId: 'personNewGroup',
            newPresentationGroupId: 'personUpdatePGroup',
            metadataGroupId: 'personUpdateGroup',
            presentationGroupId: 'personUpdatePGroup',
            nameTextId: 'someTextId',
            defTextId: 'someDefTextId',
          } as BFFValidationType,
        ]),
        metadataPool: listToPool([
          {
            id: 'personNewGroup',
            nameInData: 'person',
            type: 'group',
            textId: 'someTextId',
            defTextId: 'someDefTextId',
            children: [
              {
                childId: 'firstNameVar',
                repeatMin: '0',
                repeatMax: '1',
              },
            ],
          },
          {
            id: 'firstNameVar',
            nameInData: 'firstName',
            type: 'textVariable',
            textId: 'someTextId',
            defTextId: 'someDefTextId',
            regEx: '.*',
          },
        ]),
        presentationPool: listToPool([
          {
            id: 'personUpdatePGroup',
            type: 'pGroup',
            presentationOf: 'personUpdateGroup',
            mode: 'input',
            children: [
              {
                addText: 'addAnotherPersonTextId',
                refGroups: [
                  {
                    childId: 'firstNamePVar',
                    type: 'presentation',
                  },
                ],
              },
            ],
          },
          {
            id: 'firstNamePVar',
            type: 'pVar',
            mode: 'input',
            presentationOf: 'firstNameVar',
          },
        ]),
      } as Dependencies;

      const formDefinition = createFormDefinition(
        mockDependencies,
        'person',
        'create',
      );

      expect(
        (formDefinition.form.components![0] as FormComponentTextVar).addText,
      ).toEqual('addAnotherPersonTextId');
    });

    it('should not include sContainer that does not match metadata', () => {
      const mockDependencies = {
        recordTypePool: listToPool([
          {
            id: 'someRecordTypeId',
          },
        ]),
        textPool: listToPool([
          {
            id: 'someTextId',
            sv: 'Någon text',
            en: 'Some text',
          },
        ]),
        presentationPool: listToPool([
          {
            id: 'someSContainer',
            type: 'container',
            repeat: 'children',
            presentationsOf: ['someNonMatchingMetadata'],
            children: [
              { refGroups: [{ type: 'text', childId: 'someTextId' }] },
            ],
          } as BFFPresentationSurroundingContainer,
          {
            id: 'someNewPresentationGroupId',
            presentationOf: 'someNewMetadataGroupId',
            type: 'pGroup',
            mode: 'input',
            children: [
              {
                refGroups: [
                  { type: 'presentation', childId: 'someSContainer' },
                ],
              },
            ],
          } as BFFPresentationGroup,
        ]),
        metadataPool: listToPool([
          {
            id: 'someNewMetadataGroupId',
            nameInData: 'someName',
            children: [
              {
                childId: 'someTextVar',
              },
            ],
          } as BFFMetadataGroup,
          { id: 'someNonMatchingMetadata', nameInData: 'myNonMatching' },
          { id: 'someTextVar', nameInData: 'myText' },
        ]),
        validationTypePool: listToPool([
          {
            id: 'someValidationTypeId',
            validatesRecordTypeId: 'someRecordTypeId',
            newMetadataGroupId: 'someNewMetadataGroupId',
            newPresentationGroupId: 'someNewPresentationGroupId',
          },
        ]),
      } as Dependencies;

      const formDef = createFormDefinition(
        mockDependencies,
        'someValidationTypeId',
        'create',
      );

      expect(formDef.form.components?.length === 0);
      expect(
        formDef.form.components?.find(
          (c) => c.presentationId === 'someSContainer',
        ),
      ).toBeUndefined();
    });

    it('should handle presentations that are more specific than metadata', () => {
      const mockDependencies = {
        recordTypePool: listToPool([
          {
            id: 'someRecordTypeId',
            presentationViewId: 'somePresentationRootPGroup',
            metadataId: 'someRootGroup',
          } as BFFRecordType,
        ]),
        validationTypePool: listToPool([
          {
            id: 'someValidationTypeId',
            validatesRecordTypeId: 'someRecordTypeId',
          },
        ]),
        metadataPool: listToPool([
          {
            id: 'someRootGroup',
            type: 'group',
            nameInData: 'root',
            children: [
              {
                childId: 'allColorChildVar',
                repeatMin: '0',
                repeatMax: 'X',
              },
            ],
          } as BFFMetadataGroup,
          {
            id: 'allColorChildVar',
            type: 'textVariable',
            textId: 'allColorChildVarTextId',
            defTextId: 'allColorChildVarDefTextId',
            nameInData: 'child',
            attributeReferences: [{ refCollectionVarId: 'collVarWithAll' }],
          } as BFFMetadataTextVariable,
          {
            id: 'onlyBlueChildVar',
            type: 'textVariable',
            textId: 'onlyBlueChildVarTextId',
            defTextId: 'onlyBlueChildVarDefTextId',
            nameInData: 'child',
            attributeReferences: [{ refCollectionVarId: 'collVarWithBlue' }],
          } as BFFMetadataTextVariable,
          {
            id: 'redAndYellowChildVar',
            type: 'textVariable',
            textId: 'redAndYellowChildVarTextId',
            defTextId: 'redAndYellowChildVarDefTextId',
            nameInData: 'child',
            attributeReferences: [
              { refCollectionVarId: 'collVarWithRedAndYellow' },
            ],
          } as BFFMetadataTextVariable,
          {
            id: 'collVarWithAll',
            type: 'collectionVariable',
            nameInData: 'color',
            textId: 'allColorsCollectionVarText',
            defTextId: 'allColorsCollectionVarDefText',
            refCollection: 'allColorsCollection',
          } as BFFMetadataCollectionVariable,
          {
            id: 'collVarWithBlue',
            type: 'collectionVariable',
            nameInData: 'color',
            finalValue: 'blue',
            textId: 'onlyBlueCollectionVarText',
            defTextId: 'onlyBlueCollectionVarDefText',
            refCollection: 'allColorsCollection',
          } as BFFMetadataCollectionVariable,
          {
            id: 'collVarWithRedAndYellow',
            type: 'collectionVariable',
            textId: 'redAndYellowCollectionVarText',
            defTextId: 'redAndYellowCollectionVarDefText',
            nameInData: 'color',
            refCollection: 'redAndYellowColorCollection',
          } as BFFMetadataCollectionVariable,
          {
            id: 'allColorsCollection',
            type: 'itemCollection',
            collectionItemReferences: [
              { refCollectionItemId: 'blueItem' },
              { refCollectionItemId: 'redItem' },
              { refCollectionItemId: 'yellowItem' },
            ],
          } as BFFMetadataItemCollection,
          {
            id: 'redAndYellowColorCollection',
            type: 'itemCollection',
            collectionItemReferences: [
              { refCollectionItemId: 'redItem' },
              { refCollectionItemId: 'yellowItem' },
            ],
          } as BFFMetadataItemCollection,
          {
            id: 'blueItem',
            type: 'collectionItem',
            nameInData: 'blue',
          } as BFFMetadataBase,
          {
            id: 'redItem',
            type: 'collectionItem',
            nameInData: 'red',
          } as BFFMetadataBase,
          {
            id: 'yellowItem',
            type: 'collectionItem',
            nameInData: 'yellow',
          } as BFFMetadataBase,
        ]),
        presentationPool: listToPool([
          {
            id: 'somePresentationRootPGroup',
            presentationOf: 'someRootGroup',
            type: 'pGroup',
            mode: 'output',
            children: [
              {
                refGroups: [
                  { type: 'presentation', childId: 'onlyBlueChildPVar' },
                ],
              },
              {
                refGroups: [
                  {
                    type: 'presentation',
                    childId: 'redAndYellowChildPVar',
                  },
                ],
              },
            ],
          } as BFFPresentationGroup,
          {
            id: 'onlyBlueChildPVar',
            presentationOf: 'onlyBlueChildVar',
            type: 'pVar',
            mode: 'output',
          } as BFFPresentationTextVar,
          {
            id: 'redAndYellowChildPVar',
            presentationOf: 'redAndYellowChildVar',
            type: 'pVar',
            mode: 'output',
          } as BFFPresentationTextVar,
        ]),
      } as Dependencies;
      const formDef = createFormDefinition(
        mockDependencies,
        'someValidationTypeId',
        'view',
      );
      expect(formDef).toStrictEqual({
        form: {
          components: [
            {
              attributes: [
                {
                  label: 'onlyBlueCollectionVarText',
                  mode: 'output',
                  name: 'color',
                  finalValue: 'blue',
                  options: [
                    {
                      value: 'blue',
                    },
                    {
                      value: 'red',
                    },
                    {
                      value: 'yellow',
                    },
                  ],
                  placeholder: 'initialEmptyValueText',
                  showLabel: true,
                  tooltip: {
                    body: 'onlyBlueCollectionVarDefText',
                    title: 'onlyBlueCollectionVarText',
                  },
                  type: 'collectionVariable',
                },
              ],
              gridColSpan: 12,
              label: 'onlyBlueChildVarTextId',
              mode: 'output',
              name: 'child',
              presentationId: 'onlyBlueChildPVar',
              repeat: {
                repeatMax: 1.7976931348623157e308,
                repeatMin: 0,
              },
              showLabel: true,
              tooltip: {
                title: 'onlyBlueChildVarTextId',
                body: 'onlyBlueChildVarDefTextId',
              },
              type: 'textVariable',
              validation: {
                type: 'regex',
              },
            },
            {
              attributes: [
                {
                  label: 'redAndYellowCollectionVarText',
                  name: 'color',
                  mode: 'output',
                  options: [
                    {
                      value: 'red',
                    },
                    {
                      value: 'yellow',
                    },
                  ],
                  placeholder: 'initialEmptyValueText',
                  showLabel: true,
                  tooltip: {
                    body: 'redAndYellowCollectionVarDefText',
                    title: 'redAndYellowCollectionVarText',
                  },
                  type: 'collectionVariable',
                },
              ],
              gridColSpan: 12,
              name: 'child',
              presentationId: 'redAndYellowChildPVar',
              label: 'redAndYellowChildVarTextId',
              mode: 'output',
              repeat: {
                repeatMax: 1.7976931348623157e308,
                repeatMin: 0,
              },
              showLabel: true,
              tooltip: {
                title: 'redAndYellowChildVarTextId',
                body: 'redAndYellowChildVarDefTextId',
              },
              type: 'textVariable',
              validation: {
                type: 'regex',
              },
            },
          ],
          gridColSpan: 12,
          mode: 'output',
          name: 'root',
          presentationId: 'somePresentationRootPGroup',
          repeat: {
            repeatMax: 1,
            repeatMin: 1,
          },
          showLabel: true,
          tooltip: {},
          type: 'group',
        },
        validationTypeId: 'someValidationTypeId',
      });
      expect(formDef.form.components).toHaveLength(2);
    });
  });
  describe('linked record definition', () => {
    it('should return a linked record definition for a divaPersonOutputPLink', () => {
      const mockDependencies = {
        recordTypePool: listToPool([{}]),
        validationTypePool: listToPool([{}]),
        metadataPool: listToPool([{}]),
        presentationPool: listToPool([{}]),
      } as Dependencies;
      createRecordLink(
        'divaPersonOutputPLink',
        'personWhenLinkedOutputPGroup',
      ) as BFFMetadataRecordLink;
      createPresentationRecordLink(
        'divaPersonOutputPLink',
        'divaPersonLink',
        'personWhenLinkedOutputPGroup',
      );
      createPresentationGroup('personWhenLinkedOutputPGroup', 'personGroup', [
        {
          refGroups: [
            {
              childId: 'personNameLinkOutputPGroup',
              type: 'presentation',
            },
          ],
        },
      ]);
      createGroup('personGroup', 'personGroup', ['personNameGroup']);
      createPresentationGroup('personPGroup', 'personGroup', [
        {
          refGroups: [
            {
              childId: 'personNamePGroup',
              type: 'presentation',
            },
          ],
        },
      ]);
      createPresentationGroup('personWhenLinkedOutputPGroup', 'personGroup', [
        {
          refGroups: [
            {
              childId: 'personNameLinkOutputPGroup',
              type: 'presentation',
            },
          ],
        },
      ]);
      createPresentationGroup('personNameLinkOutputPGroup', 'personNameGroup', [
        {
          refGroups: [
            {
              childId: 'personLastNameOutputPVar',
              type: 'presentation',
            },
          ],
        },
        {
          refGroups: [
            {
              childId: 'personNameLinkSContainer',
              type: 'presentation',
            },
          ],
        },
      ]);
      createPresentationSContainer(
        'personNameLinkSContainer',
        ['personFirstNameTextVar'],
        [
          {
            refGroups: [
              {
                childId: 'commaText',
                type: 'text',
              },
            ],
          },
          {
            refGroups: [
              {
                childId: 'spaceText',
                type: 'text',
              },
            ],
          },
          {
            refGroups: [
              {
                childId: 'personFirstNameOutputPVar',
                type: 'presentation',
              },
            ],
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

      const metadataGroup = mockDependencies.metadataPool.get('personGroup');
      const presentationGroup = mockDependencies.presentationPool.get(
        'personWhenLinkedOutputPGroup',
      ) as BFFPresentationGroup;

      const linkedRecordDefinition = createLinkedRecordDefinition(
        mockDependencies,
        metadataGroup as BFFMetadataGroup,
        presentationGroup as BFFPresentationGroup,
      );

      expect(linkedRecordDefinition.form!.components).toHaveLength(1);
      expect(linkedRecordDefinition).toStrictEqual({
        form: {
          components: [
            {
              components: [
                {
                  gridColSpan: 12,
                  label: 'someTextId',
                  mode: 'output',
                  presentationId: 'personLastNameOutputPVar',

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
                  components: [
                    {
                      gridColSpan: 12,

                      name: 'commaText',
                      type: 'text',
                    },
                    {
                      gridColSpan: 12,

                      name: 'spaceText',
                      type: 'text',
                    },
                    {
                      gridColSpan: 12,
                      label: 'someTextId',
                      mode: 'output',
                      presentationId: 'personFirstNameOutputPVar',

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
                  presentationId: 'personNameLinkSContainer',

                  type: 'container',
                },
              ],
              gridColSpan: 12,
              label: 'someTextId',
              mode: 'output',
              name: 'personNameGroup',
              presentationId: 'personNameLinkOutputPGroup',

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
          presentationId: 'personWhenLinkedOutputPGroup',

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
            refGroups: [
              {
                childId: 'nationalSubjectCategoryNameOutputPGroup',
                type: 'presentation',
              },
            ],
          },
          {
            refGroups: [
              {
                childId: 'semicolonText',
                type: 'text',
              },
            ],
          },
          {
            refGroups: [
              {
                childId: 'spaceText',
                type: 'text',
              },
            ],
          },
          {
            refGroups: [
              {
                childId: 'nationalSubjectCategoryAlternativeNameOutputPGroup',
                type: 'presentation',
              },
            ],
          },
          {
            refGroups: [
              {
                childId: 'spaceText',
                type: 'text',
              },
            ],
          },
          {
            refGroups: [
              {
                childId: 'firstHalfParenthesisText',
                type: 'text',
              },
            ],
          },
          {
            refGroups: [
              {
                childId: 'subjectCodeOutputPVar',
                type: 'presentation',
              },
            ],
          },
          {
            refGroups: [
              {
                childId: 'secondHalfParenthesisText',
                type: 'text',
              },
            ],
          },
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
      createCollVar('sweLanguageCollectionVar', 'sweLanguage', ['swe'], []);
      createCollVar('engLanguageCollectionVar', 'engLanguage', ['eng'], []);
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
            refGroups: [
              {
                childId: 'nationalSubjectCategoryNameOutputPVar',
                type: 'presentation',
              },
            ],
          },
        ],
      );
      createPresentationGroup(
        'nationalSubjectCategoryAlternativeNameOutputPGroup',
        'nationalSubjectCategoryAlternativeNameGroup',
        [
          {
            refGroups: [
              {
                childId: 'nationalSubjectCategoryNameOutputPVar',
                type: 'presentation',
              },
            ],
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
            refGroups: [
              {
                childId: 'nationalSubjectCategoryText',
                type: 'text',
              },
            ],
          },
          {
            refGroups: [
              {
                childId: 'nationalSubjectCategoryNamePGroup',
                type: 'presentation',
              },
            ],
          },
          {
            refGroups: [
              {
                childId: 'nationalSubjectCategoryAlternativeNamePGroup',
                type: 'presentation',
              },
            ],
          },
          {
            refGroups: [
              {
                childId: 'subjectCodeTextVarText',
                type: 'text',
              },
            ],
          },
          {
            refGroups: [
              {
                childId: 'subjectCodePVar',
                type: 'presentation',
              },
            ],
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

      const metadataGroup = mockDependencies.metadataPool.get(
        'nationalSubjectCategoryGroup',
      );
      const presentationGroup = mockDependencies.presentationPool.get(
        'nationalSubjectCategoryWhenLinkedPGroup',
      ) as BFFPresentationGroup;

      const linkedRecordDefinition = createLinkedRecordDefinition(
        mockDependencies,
        metadataGroup as BFFMetadataGroup,
        presentationGroup as BFFPresentationGroup,
      );

      expect(linkedRecordDefinition.form!.components).toHaveLength(8);
      expect(linkedRecordDefinition).toStrictEqual({
        form: {
          components: [
            {
              components: [
                {
                  gridColSpan: 12,

                  label: 'someTextId',
                  mode: 'output',
                  name: 'nationalSubjectCategoryName',
                  presentationId: 'nationalSubjectCategoryNameOutputPVar',

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
              presentationId: 'nationalSubjectCategoryNameOutputPGroup',

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

              name: 'semicolonText',
              type: 'text',
            },
            {
              gridColSpan: 12,

              name: 'spaceText',
              type: 'text',
            },
            {
              components: [
                {
                  gridColSpan: 12,
                  label: 'someTextId',
                  presentationId: 'nationalSubjectCategoryNameOutputPVar',
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
              presentationId:
                'nationalSubjectCategoryAlternativeNameOutputPGroup',

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

              name: 'spaceText',
              type: 'text',
            },
            {
              gridColSpan: 12,

              name: 'firstHalfParenthesisText',
              type: 'text',
            },
            {
              gridColSpan: 12,
              presentationId: 'subjectCodeOutputPVar',

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

              name: 'secondHalfParenthesisText',
              type: 'text',
            },
          ],
          gridColSpan: 12,
          label: 'someTextId',
          mode: 'output',
          name: 'nationalSubjectCategory',
          presentationId: 'nationalSubjectCategoryWhenLinkedPGroup',

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
          refGroups: [
            {
              childId: 'loginIdPVar',
              type: 'presentation',
            },
          ],
        },
        {
          refGroups: [
            {
              childId: 'loginPasswordPVar',
              type: 'presentation',
            },
          ],
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
      mockDependencies,
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
    );
    expect(passwordGroup.form!.components).toHaveLength(2);
    expect(passwordGroup).toStrictEqual({
      form: {
        components: [
          {
            gridColSpan: 12,
            label: 'someTextId',
            mode: 'input',
            name: 'loginId',
            presentationId: 'loginIdPVar',

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
            gridColSpan: 12,
            label: 'someTextId',
            mode: 'input',
            name: 'password',
            presentationId: 'loginPasswordPVar',

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
        presentationId: 'viewDefinitionPasswordPGroup',

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
        mockDependencies.metadataPool,
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
      const onlyValueTwoCollVar = createCollVar(
        'onlyValueTwoCollVar',
        'attributeName',
        ['value2'],
        [],
      );
      const onlyValueTwoTextVar = createTextVar(
        'onlyValueTwoTextVar',
        'someNameInData',
        [onlyValueTwoCollVar.id],
      );
      const valueOneOrTwoAttribute = createCollVar(
        'valueOneOrTwoCollVar',
        'attributeName',
        ['value1', 'value2'],
        [],
      );
      const valueOneOrTwoTextVar = createTextVar(
        'valueOneOrTwoTextVar',
        'someNameInData',
        [valueOneOrTwoAttribute.id],
      );
      const childRefsForCurrentGroup = createChildReferences([
        onlyValueTwoTextVar.id,
      ]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefsForCurrentGroup,
        valueOneOrTwoTextVar,
      );
      expect(actual).toStrictEqual(undefined);
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
      expect(actual).toBe(childRefsForCurrentGroup[0]);
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
      const finalValueCollVar = createCollVarFinal(
        'finalValueCollVar',
        'attributeName',
        'value1',
        [],
      );
      const valueOneOrValueTwoCollVar = createCollVar(
        'valueOneOrValueTwoCollVar',
        'attributeName',
        ['value1', 'value2'],
        [],
      );

      const metadataTextVarFromCurrentGroup = createTextVar(
        'metadataTextVarFromCurrentGroup',
        'someNameInData',
        [finalValueCollVar.id],
      );
      const metadataFromPresentation = createTextVar(
        'metadataFromPresentation',
        'someNameInData',
        [valueOneOrValueTwoCollVar.id],
      );
      const childRefsForCurrentGroup = createChildReferences([
        metadataTextVarFromCurrentGroup.id,
      ]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefsForCurrentGroup,
        metadataFromPresentation,
      );
      expect(actual).toStrictEqual(undefined);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes but finalValue of attribute in presentation
      is more specific`, () => {
      const valueOneOrTwoCollVar = createCollVar(
        'valueOneOrTwoCollVar',
        'attributeName',
        ['value1', 'value2'],
        [],
      );
      const collVarWithFinalValue = createCollVarFinal(
        'collVarWithFinalValue',
        'attributeName',
        'value2',
        [],
      );
      const metadataFromCurrentGroup = createTextVar(
        'metadataFromCurrentGroup',
        'someNameInData',
        [valueOneOrTwoCollVar.id],
      );
      const metadataFromPresentation = createTextVar(
        'metadataFromPresentation',
        'someNameInData',
        [collVarWithFinalValue.id],
      );
      const childRefsForCurrentGroup = createChildReferences([
        metadataFromCurrentGroup.id,
      ]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefsForCurrentGroup,
        metadataFromPresentation,
      );
      expect(actual).toBe(childRefsForCurrentGroup[0]);
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
          mockDependencies.metadataPool,
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
          mockDependencies.metadataPool,
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
          mockDependencies.metadataPool,
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
      const mockDependencies = {
        recordTypePool: listToPool([
          {
            id: 'divaOutput',
            metadataId: 'divaOutputGroup',
          } as BFFRecordType,
        ]),
        validationTypePool: listToPool([
          {
            id: 'thesisManuscript',
            validatesRecordTypeId: 'divaOutput',
            newMetadataGroupId: 'thesisManuscriptNewGroup',
            newPresentationGroupId: 'outputNewPGroup',
          } as BFFValidationType,
          {
            id: 'divaOutput',
            validatesRecordTypeId: 'divaOutput',
            newMetadataGroupId: 'divaOutputNewGroup',
            newPresentationGroupId: 'outputNewPGroup',
          } as BFFValidationType,
        ]),
        metadataPool: listToPool([
          {
            id: 'thesisManuscriptNewGroup',
            type: 'group',
            nameInData: 'output',
            children: [
              { childId: 'abstractTextVar', repeatMin: '1', repeatMax: '1' },
            ],
          } as BFFMetadataGroup,
          {
            id: 'divaOutputNewGroup',
            nameInData: 'output',
            type: 'group',
            children: [
              { childId: 'abstractTextVar', repeatMin: '1', repeatMax: '1' },
              { childId: 'abstract2TextVar', repeatMin: '1', repeatMax: '1' },
            ],
          } as BFFMetadataGroup,
          {
            id: 'abstractTextVar',
            nameInData: 'abstract',
            type: 'textVariable',
            regEx: '.*',
          } as BFFMetadataTextVariable,
          {
            id: 'abstract2TextVar',
            nameInData: 'abstract2',
            type: 'textVariable',
            regEx: '.*',
          } as BFFMetadataTextVariable,
        ]),
        presentationPool: listToPool([
          {
            id: 'outputNewPGroup',
            presentationOf: 'divaOutputNewGroup',
            mode: 'input',
            type: 'pGroup',
            children: [
              {
                refGroups: [{ childId: 'abstractPVar', type: 'presentation' }],
              },
              {
                refGroups: [{ childId: 'abstract2PVar', type: 'presentation' }],
              },
            ],
          } as BFFPresentationGroup,
          {
            id: 'abstractPVar',
            presentationOf: 'abstractTextVar',
            mode: 'input',
            type: 'pVar',
          } as BFFPresentationTextVar,
          {
            id: 'abstract2PVar',
            presentationOf: 'abstract2TextVar',
            mode: 'input',
            type: 'pVar',
          } as BFFPresentationTextVar,
        ]),
      } as Dependencies;

      const formDefinition = createFormDefinition(
        mockDependencies,
        'thesisManuscript',
        FORM_MODE_NEW,
      );
      expect(formDefinition).toStrictEqual({
        form: {
          components: [
            {
              gridColSpan: 12,

              mode: 'input',
              name: 'abstract',
              presentationId: 'abstractPVar',

              repeat: {
                repeatMax: 1,
                repeatMin: 1,
              },
              showLabel: true,
              tooltip: {},
              type: 'textVariable',
              validation: {
                pattern: '.*',
                type: 'regex',
              },
            },
          ],
          gridColSpan: 12,
          mode: 'input',
          name: 'output',
          presentationId: 'outputNewPGroup',
          repeat: {
            repeatMax: 1,
            repeatMin: 1,
          },
          showLabel: true,
          tooltip: {},
          type: 'group',
        },
        validationTypeId: 'thesisManuscript',
      });
    });

    it('reusing journalUpdatePGroup for journalNewGroup', () => {
      const dependencies = {
        recordTypePool: listToPool([{} as BFFRecordType]),
        validationTypePool: listToPool([
          {
            id: 'journalNew',
            validatesRecordTypeId: 'journal',
            newMetadataGroupId: 'journalNewGroup',
            newPresentationGroupId: 'journalUpdatePGroup',
          } as BFFValidationType,
        ]),
        metadataPool: listToPool([
          {
            id: 'journalNewGroup',
            type: 'group',
            nameInData: 'journal',
            children: [
              { childId: 'titleTextVar', repeatMin: '1', repeatMax: '1' },
              {
                childId: 'recordInfoJournalNewGroup',
                repeatMin: '1',
                repeatMax: '1',
              },
            ],
          } as BFFMetadataGroup,
          {
            id: 'titleTextVar',
            type: 'textVariable',
            nameInData: 'title',
          } as BFFMetadataTextVariable,
          {
            id: 'recordInfoJournalNewGroup',
            type: 'group',
            nameInData: 'recordInfo',
            children: [
              { childId: 'trashBinTextVar', repeatMin: '0', repeatMax: '1' },
            ],
          } as BFFMetadataGroup,
          {
            id: 'journalUpdateGroup',
            type: 'group',
            nameInData: 'journal',
            children: [
              { childId: 'titleTextVar', repeatMin: '1', repeatMax: '1' },
              {
                childId: 'recordInfoJournalUpdateGroup',
                repeatMin: '1',
                repeatMax: '1',
              },
            ],
          } as BFFMetadataGroup,
          {
            id: 'recordInfoJournalUpdateGroup',
            type: 'group',
            nameInData: 'recordInfo',
            children: [
              { childId: 'trashBinTextVar', repeatMin: '1', repeatMax: '1' },
            ],
          } as BFFMetadataGroup,
          {
            id: 'trashBinTextVar',
            type: 'textVariable',
            nameInData: 'trashBin',
          } as BFFMetadataTextVariable,
        ]),
        presentationPool: listToPool([
          {
            id: 'journalUpdatePGroup',
            presentationOf: 'journalUpdateGroup',
            type: 'pGroup',
            mode: 'input',
            children: [
              { refGroups: [{ childId: 'titlePVar', type: 'presentation' }] },
              {
                refGroups: [
                  {
                    childId: 'recordInfoJournalUpdatePGroup',
                    type: 'presentation',
                  },
                ],
              },
            ],
          } as BFFPresentationGroup,
          {
            id: 'titlePVar',
            presentationOf: 'titleTextVar',
            type: 'pVar',
            mode: 'input',
          } as BFFPresentationTextVar,
          {
            id: 'recordInfoJournalUpdatePGroup',
            presentationOf: 'recordInfoJournalUpdateGroup',
            type: 'pGroup',
            mode: 'input',
            children: [
              {
                refGroups: [{ childId: 'trashBinPVar', type: 'presentation' }],
              },
            ],
          } as BFFPresentationGroup,
          {
            id: 'trashBinPVar',
            presentationOf: 'trashBinTextVar',
            type: 'pVar',
            mode: 'input',
          } as BFFPresentationTextVar,
        ]),
      } as Dependencies;
      const formDefinition = createFormDefinition(
        dependencies,
        'journalNew',
        FORM_MODE_NEW,
      );
      expect(formDefinition).toStrictEqual({
        form: {
          components: [
            {
              gridColSpan: 12,
              mode: 'input',
              name: 'title',
              presentationId: 'titlePVar',
              repeat: {
                repeatMax: 1,
                repeatMin: 1,
              },
              showLabel: true,
              tooltip: {},
              type: 'textVariable',
              validation: {
                type: 'regex',
              },
            },
            {
              components: [
                {
                  gridColSpan: 12,
                  mode: 'input',
                  name: 'trashBin',
                  presentationId: 'trashBinPVar',
                  repeat: {
                    repeatMax: 0,
                    repeatMin: 1,
                  },
                  showLabel: true,
                  tooltip: {},
                  type: 'textVariable',
                  validation: {
                    type: 'regex',
                  },
                },
              ],
              gridColSpan: 12,
              mode: 'input',
              name: 'recordInfo',
              presentationId: 'recordInfoJournalUpdatePGroup',
              repeat: {
                repeatMax: 1,
                repeatMin: 1,
              },
              showLabel: true,
              tooltip: {},
              type: 'group',
            },
          ],
          gridColSpan: 12,
          mode: 'input',
          name: 'journal',
          presentationId: 'journalUpdatePGroup',
          repeat: {
            repeatMax: 1,
            repeatMin: 1,
          },
          showLabel: true,
          tooltip: {},
          type: 'group',
        },
        validationTypeId: 'journalNew',
      });
    });
  });

  describe('finalValue no presentation', () => {
    it('generates a group with a textVar that has no presentation but finalValue', () => {
      // Metadata
      const agentGroup: BFFMetadataGroup = {
        id: 'agentGroup',
        nameInData: 'agent',
        type: 'group',
        textId: 'agentGroupText',
        defTextId: 'agentGroupDefText',
        children: [
          {
            childId: 'namePartTextVar',
            repeatMin: '0',
            repeatMax: 'X',
          },
          {
            childId: 'rolePublisherGroup',
            repeatMin: '1',
            repeatMax: '1',
          },
        ],
      };
      metadataPool.set('agentGroup', agentGroup);

      const namePartTextVar: BFFMetadataTextVariable = {
        nameInData: 'namePart',
        regEx: '.+',
        id: 'namePartTextVar',
        type: 'textVariable',
        textId: 'namePartTextVarText',
        defTextId: 'namePartTextVarDefText',
      };
      metadataPool.set('namePartTextVar', namePartTextVar);

      const rolePublisherGroup: BFFMetadataGroup = {
        id: 'rolePublisherGroup',
        nameInData: 'role',
        type: 'group',
        textId: 'rolePublisherGroupText',
        defTextId: 'rolePublisherGroupDefText',
        children: [
          {
            childId: 'rolePublisherTextVar',
            repeatMin: '1',
            repeatMax: '1',
          },
        ],
      };
      metadataPool.set('rolePublisherGroup', rolePublisherGroup);

      const rolePublisherTextVar: BFFMetadataTextVariable = {
        nameInData: 'roleTerm',
        regEx: '.+',
        id: 'rolePublisherTextVar',
        finalValue: 'pbl',
        type: 'textVariable',
        textId: 'rolePublisherTextVarText',
        defTextId: 'rolePublisherTextVarDefText',
      };
      metadataPool.set('rolePublisherTextVar', rolePublisherTextVar);

      // Presentation
      const agentPGroup: BFFPresentationGroup = {
        id: 'agentPGroup',
        presentationOf: 'agentGroup',
        mode: 'input',
        children: [
          {
            refGroups: [
              {
                childId: 'namePartPVar',
                type: 'presentation',
              },
            ],
            minNumberOfRepeatingToShow: '0',
          },
        ],
        type: 'pGroup',
      };
      presentationPool.set('agentPGroup', agentPGroup);

      const namePartPVar: BFFPresentationTextVar = {
        id: 'namePartPVar',
        presentationOf: 'namePartTextVar',
        mode: 'input',
        type: 'pVar',
        inputType: 'input',
      };
      presentationPool.set('namePartPVar', namePartPVar);

      const actual = createPresentationComponent(
        mockDependencies,
        'agentGroup',
        'agentPGroup',
        {} as BFFPresentationChildReference,
        { minNumberOfRepeatingToShow: 0, repeatMin: 0, repeatMax: 1 },
      );

      expect(actual).toStrictEqual({
        repeat: {
          minNumberOfRepeatingToShow: 0,
          repeatMin: 0,
          repeatMax: 1,
        },
        gridColSpan: 12,
        name: 'agent',
        type: 'group',
        mode: 'input',
        presentationId: 'agentPGroup',

        tooltip: {
          title: 'agentGroupText',
          body: 'agentGroupDefText',
        },
        label: 'agentGroupText',
        showLabel: true,
        components: [
          {
            repeat: {
              minNumberOfRepeatingToShow: 0,
              repeatMin: 0,
              repeatMax: 1.7976931348623157e308,
            },

            gridColSpan: 12,
            name: 'namePart',
            presentationId: 'namePartPVar',

            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'namePartTextVarText',
              body: 'namePartTextVarDefText',
            },
            label: 'namePartTextVarText',
            showLabel: true,
            validation: {
              type: 'regex',
              pattern: '.+',
            },
          },
          {
            type: 'group',
            name: 'role',
            mode: 'input',
            hidden: true,
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
            components: [
              {
                type: 'hidden',
                name: 'roleTerm',
                finalValue: 'pbl',
                attributesToShow: 'none',
                repeat: {
                  repeatMin: 1,
                  repeatMax: 1,
                },
              },
            ],
          },
        ],
      });
    });
  });
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
    | 'pResourceLink',
  mode: 'input' | 'output' = 'output',
  inputFormat?: 'password',
): BFFPresentationOfSingleMetadata => {
  const pVar: BFFPresentationOfSingleMetadata = {
    id,
    presentationOf,
    type,
    mode,
    inputFormat,
  };
  return pVar as BFFPresentationOfSingleMetadata;
};

const createCollItem = (nameInData: string): BFFMetadataBase => {
  const metadata: BFFMetadataBase = {
    id: `${nameInData}Item`,
    nameInData,
    type: 'collectionItem',
    textId: 'someTextId',
    defTextId: 'someDefTextId',
  };

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

  return metadata;
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
    textId: 'someText',
    pluralTextId: 'somePluralText',
    defTextId: 'someDefText',
    groupOfRecordType: [],
    recordTypeCategory: [],
    useTrashBin: false,
  };

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
    mode,
    children,
  } as BFFPresentationGroup;
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
  return metadata;
};

const createPresentationRecordLink = (
  id: string,
  presentedRecordType: string,
  presentationId: string,
  presentAs?: BFFPresentationRecordLink['presentAs'],
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
    presentAs,
  } as BFFPresentationRecordLink;

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

  return container;
};

const createBasicDependencies = (): Dependencies => {
  return {
    validationTypePool: listToPool<BFFValidationType>([
      someValidationTypeData,
      someValidationTypeDataFaultyChildReference,
      someSimpleValidationTypeData,
      someValidationTypeForMissingChildIdTypeData,
    ]),
    metadataPool: listToPool<BFFMetadata>([
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
    ]),
    presentationPool: listToPool([
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
    ]),
    searchPool: listToPool([]),
    textPool: listToPool([]),
    recordTypePool: listToPool([]),
  };
};
