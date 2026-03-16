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

import type { FormComponentTextVar } from '@/components/FormGenerator/types';
import type {
  BFFMetadata,
  BFFMetadataBase,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataItemCollection,
  BFFMetadataRecordLink,
  BFFMetadataTextVariable,
  BFFPresentationChildReference,
  BFFPresentationGroup,
  BFFPresentationRecordLink,
  BFFPresentationSurroundingContainer,
  BFFPresentationTextVar,
  BFFRecordType,
  BFFValidationType,
  Dependencies,
} from '@/cora/bffTypes.server';
import {
  createFormDefinition,
  createLinkedRecordDefinition,
} from '@/data/formDefinition/createFormDefinition.server';
import { listToPool } from 'server/dependencies/util/listToPool';
import { describe, expect, it } from 'vitest';
import {
  createBasicDependencies,
  createCollVar,
  createGroup,
  createPresentationGroup,
  createPresentationRecordLink,
  createPresentationSContainer,
  createPresentationVar,
  createRecordLink,
  createRecordType,
  createTextVar,
  createValidationType,
} from './utils';

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

    it('should return a form definition for an edit metadata group', () => {
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
        validationType.metadataGroupId,
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
                    repeatMin: 0,
                    repeatMax: 1,
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

    it('creates multiple components for presentation that matches multiple metadata children', () => {
      const mockDependencies = {
        recordTypePool: listToPool([
          {
            id: 'someRecordTypeId',
            presentationViewId: 'rootPGroup',
          } as BFFRecordType,
        ]),
        validationTypePool: listToPool([
          {
            id: 'someValidationTypeId',
            validatesRecordTypeId: 'someRecordTypeId',
            metadataGroupId: 'rootGroup',
          } as BFFValidationType,
        ]),
        metadataPool: listToPool([
          {
            id: 'rootGroup',
            type: 'group',
            nameInData: 'rootGroup',
            children: [
              { childId: 'redChild', repeatMin: '0', repeatMax: '1' },
              { childId: 'blueChild', repeatMin: '0', repeatMax: '1' },
            ],
          } as BFFMetadataGroup,
          {
            id: 'redChild',
            nameInData: 'child',
            type: 'textVariable',
            attributeReferences: [{ refCollectionVarId: 'redCollection' }],
          } as BFFMetadataTextVariable,
          {
            id: 'blueChild',
            nameInData: 'child',
            type: 'textVariable',
            attributeReferences: [{ refCollectionVarId: 'blueCollection' }],
          } as BFFMetadataTextVariable,
          {
            id: 'redOrBlueChild',
            nameInData: 'child',
            type: 'textVariable',
            attributeReferences: [
              { refCollectionVarId: 'redOrBlueCollection' },
            ],
          } as BFFMetadataTextVariable,
          {
            id: 'redCollection',
            nameInData: 'color',
            finalValue: 'red',
            refCollection: 'colorCollection',
          } as BFFMetadataCollectionVariable,
          {
            id: 'blueCollection',
            nameInData: 'color',
            finalValue: 'blue',
            refCollection: 'colorCollection',
          } as BFFMetadataCollectionVariable,
          {
            id: 'redOrBlueCollection',
            nameInData: 'color',
            refCollection: 'colorCollection',
          } as BFFMetadataCollectionVariable,
          {
            id: 'colorCollection',
            nameInData: 'color',
            type: 'itemCollection',
            collectionItemReferences: [
              { refCollectionItemId: 'redItem' },
              { refCollectionItemId: 'blueItem' },
            ],
          } as BFFMetadataItemCollection,
          {
            id: 'redItem',
            nameInData: 'red',
          } as BFFMetadataBase,
          {
            id: 'blueItem',
            nameInData: 'blue',
          } as BFFMetadataBase,
        ]),
        presentationPool: listToPool([
          {
            id: 'rootPGroup',
            presentationOf: 'rootGroup',
            type: 'pGroup',
            mode: 'output',
            children: [
              {
                refGroups: [{ childId: 'redOrBluePVar', type: 'presentation' }],
              },
            ],
          } as BFFPresentationGroup,
          {
            id: 'redOrBluePVar',
            presentationOf: 'redOrBlueChild',
            type: 'pVar',
            mode: 'output',
          } as BFFPresentationTextVar,
        ]),
      } as Dependencies;
      const formSchema = createFormDefinition(
        mockDependencies,
        'someValidationTypeId',
        'view',
      );
      expect(formSchema).toStrictEqual({
        form: {
          components: [
            {
              attributes: [
                {
                  finalValue: 'red',
                  mode: 'output',
                  name: 'color',
                  options: [
                    {
                      value: 'red',
                    },
                    {
                      value: 'blue',
                    },
                  ],
                  placeholder: 'initialEmptyValueText',
                  showLabel: true,
                  tooltip: {},
                },
              ],
              gridColSpan: 12,
              mode: 'output',
              name: 'child',
              presentationId: 'redOrBluePVar',
              repeat: {
                repeatMax: 1,
                repeatMin: 0,
              },
              showLabel: true,
              tooltip: {},
              type: 'textVariable',
              validation: {
                type: 'regex',
              },
            },
            {
              attributes: [
                {
                  finalValue: 'blue',
                  mode: 'output',
                  name: 'color',
                  options: [
                    {
                      value: 'red',
                    },
                    {
                      value: 'blue',
                    },
                  ],
                  placeholder: 'initialEmptyValueText',
                  showLabel: true,
                  tooltip: {},
                },
              ],
              gridColSpan: 12,
              mode: 'output',
              name: 'child',
              presentationId: 'redOrBluePVar',
              repeat: {
                repeatMax: 1,
                repeatMin: 0,
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
          mode: 'output',
          name: 'rootGroup',
          presentationId: 'rootPGroup',
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
    });
  });

  describe('createLinkedRecordDefinition', () => {
    it('should return a linked record definition for a divaPersonOutputPLink', () => {
      const mockDependencies = {
        recordTypePool: listToPool([{}]),
        validationTypePool: listToPool([{}]),
        metadataPool: listToPool([
          createRecordLink(
            'divaPersonOutputPLink',
            'personWhenLinkedOutputPGroup',
          ) as BFFMetadataRecordLink,
          createGroup('personGroup', 'personGroup', ['personNameGroup']),
          createGroup('personNameGroup', 'personNameGroup', [
            'lastNameTextVar',
            'firstNameTextVar',
          ]),
          createTextVar('lastNameTextVar', 'familyName', []),
          createTextVar('firstNameTextVar', 'givenName', []),
        ]),
        presentationPool: listToPool([
          createPresentationRecordLink(
            'divaPersonOutputPLink',
            'divaPersonLink',
            'personWhenLinkedOutputPGroup',
          ) as BFFPresentationRecordLink,
          createPresentationGroup(
            'personWhenLinkedOutputPGroup',
            'personGroup',
            [
              {
                refGroups: [
                  {
                    childId: 'personNameLinkOutputPGroup',
                    type: 'presentation',
                  },
                ],
              },
            ],
          ),
          createPresentationGroup(
            'personNameLinkOutputPGroup',
            'personNameGroup',
            [
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
            ],
          ),
          createPresentationSContainer(
            'personNameLinkSContainer',
            ['firstNameTextVar'],
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
          ),
          createPresentationVar(
            'personFirstNameOutputPVar',
            'firstNameTextVar',
            'pVar',
            'output',
          ),
          createPresentationVar(
            'personLastNameOutputPVar',
            'lastNameTextVar',
            'pVar',
            'output',
          ),
        ]),
      } as Dependencies;

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
      const mockDependencies = {
        metadataPool: listToPool([
          createRecordLink(
            'nationalSubjectCategoryLink',
            'nationalSubjectCategory',
          ) as BFFMetadataRecordLink,
          createGroup(
            'nationalSubjectCategoryGroup',
            'nationalSubjectCategory',
            [
              'nationalSubjectCategoryNameGroup',
              'nationalSubjectCategoryAlternativeNameGroup',
              'subjectCodeTextVar',
            ],
          ),
          createGroup('nationalSubjectCategoryNameGroup', 'name', [
            'nationalSubjectCategoryNameTextVar',
            'sweLanguageCollectionVar',
          ]),
          ...createCollVar(
            'sweLanguageCollectionVar',
            'sweLanguage',
            ['swe'],
            [],
          ),
          ...createCollVar(
            'engLanguageCollectionVar',
            'engLanguage',
            ['eng'],
            [],
          ),
          createGroup(
            'nationalSubjectCategoryAlternativeNameGroup',
            'alternativeName',
            ['nationalSubjectCategoryNameTextVar', 'engLanguageCollectionVar'],
          ),
          createTextVar(
            'nationalSubjectCategoryNameTextVar',
            'nationalSubjectCategoryName',
            [],
          ),
          createTextVar('subjectCodeTextVar', 'subjectCode', []),
        ]),
        presentationPool: listToPool([
          createPresentationRecordLink(
            'nationalSubjectCategoryOutputPLink',
            'nationalSubjectCategoryLink',
            'nationalSubjectCategoryWhenLinkedPGroup',
          ) as BFFPresentationRecordLink,
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
                    childId:
                      'nationalSubjectCategoryAlternativeNameOutputPGroup',
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
          ),
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
          ),
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
          ),
          createPresentationVar(
            'nationalSubjectCategoryNameOutputPVar',
            'nationalSubjectCategoryNameTextVar',
            'pVar',
            'output',
          ),
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
          ),
          createPresentationVar(
            'subjectCodeOutputPVar',
            'subjectCodeTextVar',
            'pVar',
            'output',
          ),
        ]),
      } as Dependencies;

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

    it('should return a linked record definition for a password', () => {
      const mockDependencies = {
        recordTypePool: listToPool([{}]),
        validationTypePool: listToPool([{}]),
        metadataPool: listToPool([
          createGroup('viewDefinitionPasswordGroup', 'password', [
            'loginIdTextVar',
            'loginPasswordTextVar',
          ]),
          createTextVar(
            'loginIdTextVar',
            'loginId',
            [],
            '^[0-9A-Za-z:-_]{2,50}@[0-9A-Za-z:-_.]{2,300}$',
          ),
          createTextVar(
            'loginPasswordTextVar',
            'password',
            [],
            '(^[0-9A-Za-z:-_]{2,50}$)',
          ),
        ]),
        presentationPool: listToPool([
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
          ),
          createPresentationVar(
            'loginIdPVar',
            'loginIdTextVar',
            'pVar',
            'input',
          ),
          createPresentationVar(
            'loginPasswordPVar',
            'loginPasswordTextVar',
            'pVar',
            'input',
            'password',
          ),
        ]),
      } as Dependencies;

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
  });
});










TextVar
export const someGroupWithTextVar1: BFFMetadataGroup = {

  id: 'someMetadataTextVariableId',
  nameInData: 'someMetadataTextVariableNameInData',
  type: 'group',
  textId: 'textId345',
  defTextId: 'defTextId678',
  children: [
    {
        childId: 'someMetadataTextVariableId',
        repeatMin: '1',
        repeatMax: '3',
      },
  ],
}

export const someGroupWithTextVar2: BFFMetadataGroup = {
  id: 'someMetadataTextVariable2Id',
  nameInData: 'someMetadataTextVariable2NameInData',
  type: 'group',
  textId: 'textId456',
  defTextId: 'defTextId789',
  children: [
    {
      childId: 'someMetadataTextVariable2Id',
      repeatMin: '1',
      repeatMax: 'X',
    },
  ],
}

export const someGroupWithTextVar3: BFFMetadataGroup = {
  id: 'someMetadataTextVariable3Id',
  nameInData: 'someMetadataTextVariable3NameInData',
  type: 'group',
  textId: 'textId567',
  defTextId: 'defTextId890',
  children: [
    {
      childId: 'someMetadataTextVariable3Id',
      repeatMin: '1',
      repeatMax: '1',
    },
  ],
}
    
export const someGroupWithTextVar4: BFFMetadataGroup = {
  id: 'someMetadataTextVariable4Id',
  nameInData: 'someMetadataTextVariable4NameInData',
  type: 'group',
  textId: 'textId678',
  defTextId: 'defTextId901',
  children: [
    {
      childId: 'someMetadataTextVariable4Id',
      repeatMin: '1',
      repeatMax: '3',
    },
]
}
   
export const someGroupWithTextVar5: BFFMetadataGroup = {
    id: 'someMetadataTextVariable5Id',
    nameInData: 'someMetadataTextVariable5NameInData',
    type: 'group',
    textId: 'textId678',
    defTextId: 'defTextId901',
    children: [
      {
      childId: 'someMetadataTextVariable5Id',
      repeatMin: '1',
      repeatMax: '3',
      },
   ], },


export const someGroupWithTextVar6: BFFMetadataGroup = {
  id: 'someMetadataTextVariable6Id',
  nameInData: 'someMetadataTextVariable6NameInData',
  type: 'group',
  textId: 'textId789',
  defTextId: 'defTextId012',
  children: [
    {
      childId: 'someMetadataTextVariable6Id',
      repeatMin: '1',
      repeatMax: '1',
    },
]}
    
export const someGroupWithNumVar1: BFFMetadataGroup = {
    id: 'someMetadataNumberVarId',
    nameInData: 'someMetadataNumberVarNameInData',
    type: 'group',
    textId: 'textId789',
    defTextId: 'defTextId012',
    children: [
        {
            childId: 'someMetadataNumberVarId',
            repeatMin: '0',
            repeatMax: '1',
          },
    ],
}

export const someGroupWithCollectionVar: BFFMetadataGroup = {
    id: 'someMetadataCollectionVarId',
    nameInData: 'someMetadataCollectionVarNameInData',
    type: 'group',
    textId: 'textId789',
    defTextId: 'defTextId012',
    children: [
        {
            childId: 'exampleCollectionVarId',
            repeatMin: '1',
            repeatMax: '1',
          },
    ],
}

export const someGroupWithCollVarsWithAttributes: BFFMetadataGroup = {
    id: 'someGroupWithCollVarsWithAttributesId',
    nameInData: 'someGroupWithCollVarsWithAttributesNameInData',
    type: 'group',
    textId: 'textId789',
    defTextId: 'defTextId012',
    children: [
        {
            childId: 'someMetadataCollectionVariableWithAttributeId',
            repeatMin: '1',
            repeatMax: '1',
        },
    ],
}

export const someGroupWithNumVarWithAttribute: BFFMetadataGroup = {
    id: 'someGroupWithNumVarWithAttributeId',
    nameInData: 'someGroupWithNumVarWithAttributeNameInData',
    type: 'group',
    textId: 'textId789',
    defTextId: 'defTextId012',
    children: [
        {
            childId: 'someMetadataNumberWithAttributeVarId',
            repeatMin: '1',
            repeatMax: '1',
        },
    ],
}


Attributes:

someGroupWithVarWithAttribute2:
  {
    childId: 'someMetadataTextVariableWithAttributeVarId',
    repeatMin: '1',
    repeatMax: '1',
  },

someGroupWithGroup:
{
    childId: 'someMetadataChildGroupId',
    repeatMin: '1',
    repeatMax: '1',
  },
someGroupWithGroup2:
{
    childId: 'someManuscriptGroupId',
    repeatMin: '1',
    repeatMax: '1',
  },

RecordLinks:
someGroupWithRecordLink:
{
    childId: 'nationalSubjectCategoryLinkId',
    repeatMin: '1',
    repeatMax: '1',
},
someGroupWithRecordLink:
  {
    childId: 'someNewRecordLinkId',
    repeatMin: '1',
    repeatMax: '1',
  },


someGroupWithVarWithExtraPresentations:
{
    childId: 'someMetadataChildGroupWithSpecifiedHeadlineTextId',
    repeatMin: '1',
    repeatMax: '1',
},
someGroupWithVarWithExtraPresentations2:
  {
    childId: 'someMetadataChildGroupWithShowHeadlineFalseId',
    repeatMin: '1',
    repeatMax: '1',
  },