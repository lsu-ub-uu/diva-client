/*
 * Copyright 2024 Uppsala University Library
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

import type { FormComponent } from '@/components/FormGenerator/types';
import type { FieldValues, UseFormGetValues } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';
import {
  checkForExistingSiblings,
  checkIfComponentHasValue,
  checkIfSingularComponentHasValue,
  checkIfValueExists,
  exportForTesting,
  isComponentContainer,
  isComponentGroup,
  isComponentGroupAndOptional,
  isComponentRepeating,
  isComponentRepeatingContainer,
  isComponentSingularAndOptional,
  isComponentSurroundingContainer,
  isComponentValidForDataCarrying,
  isComponentVariable,
  isFirstLevelGroup,
} from '../formGeneratorUtils';

describe('helper methods', () => {
  describe('countStringCharOccurrences', () => {
    it.each([
      ['someRootNameInData', '.', 0],
      ['someRootNameInData.numberVar2', '.', 1],
      ['someRootNameInData.someGroup.numberVar2', '.', 2],
    ])('count Occurrences in %p', (arg1, arg2, arg3) => {
      const expected = exportForTesting.countStringCharOccurrences(arg1, arg2);
      expect(expected).toStrictEqual(arg3);
    });
  });

  describe('isFirstLevelGroup', () => {
    it.each([
      ['someRootNameInData', false],
      ['someRootNameInData.numberVar2', true],
      ['someRootNameInData.someGroup.numberVar2', false],
    ])('check if %p is isFirstLevel', (arg1, arg2) => {
      const expected = isFirstLevelGroup(arg1);
      expect(expected).toStrictEqual(arg2);
    });
  });

  describe('isComponentVariable', () => {
    it.each([
      [
        'numberVariable',
        {
          type: 'numberVariable',
          name: 'someNumberVariable',
          label: 'someNumberVar2IdLabel',
          placeholder: 'someNumberVar2IdPlaceholder',
          repeat: { minNumberOfRepeatingToShow: 1, repeatMin: 0, repeatMax: 1 },
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
        true,
      ],
      [
        'textVariable',
        {
          name: 'someTextVariable',
          type: 'textVariable',
          mode: 'input',
          inputType: 'input',
          tooltip: {
            title: 'someTooltipTitleText',
            body: 'someTooltipTitleDefText',
          },
          label: 'textVarLabelText',
          showLabel: true,
          validation: {
            type: 'regex',
            pattern: '.+',
          },
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          childStyle: [],
          gridColSpan: 12,
        },
        true,
      ],
      [
        'collectionVariable',
        {
          name: 'someCollectionVariable',
          type: 'collectionVariable',
          placeholder: 'emptyTextId',
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
        true,
      ],
      [
        'recordLink',
        {
          name: 'someRecordLink',
          type: 'recordLink',
          mode: 'input',
          tooltip: {
            title: 'divaPersonLinkText',
            body: 'divaPersonLinkDefText',
          },
          label: 'divaPersonLinkText',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          childStyle: [],
          gridColSpan: 12,
          recordLinkType: 'person',
          presentationRecordLinkId: 'divaPersonPLink',
          search: 'personSearch',
        },
        true,
      ],
      [
        'group',
        {
          type: 'group',
          label: 'someRootFormGroupText',
          name: 'someRootNameInData',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          tooltip: {
            title: 'textId345',
            body: 'defTextId678',
          },
          mode: 'input',
          components: [
            {
              type: 'text',
              name: 'someHeaderText',
            },
          ],
        },
        false,
      ],
      [
        'surroundingContainer',
        {
          type: 'container',
          containerType: 'surrounding',
          name: 'someInnerSurroundingContainerName',
          presentationStyle: 'frame', // frame can in the first step be a div with a background yellow and a black border
          childStyle: [],
          components: [
            {
              type: 'textVariable',
              name: 'someInnerNameInData',
              label: 'someTextId',
              childStyle: [],
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
        false,
      ],
    ])('check if %s is variable', (arg1, arg2, arg3) => {
      const expected = isComponentVariable(arg2 as FormComponent);
      expect(expected).toStrictEqual(arg3);
    });
  });

  describe('isComponentGroup', () => {
    it.each([
      [
        'numberVariable',
        {
          type: 'numberVariable',
          name: 'someNumberVariable',
          label: 'someNumberVar2IdLabel',
          placeholder: 'someNumberVar2IdPlaceholder',
          repeat: { minNumberOfRepeatingToShow: 1, repeatMin: 0, repeatMax: 1 },
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
        false,
      ],
      [
        'textVariable',
        {
          name: 'someTextVariable',
          type: 'textVariable',
          mode: 'input',
          inputType: 'input',
          tooltip: {
            title: 'someTooltipTitleText',
            body: 'someTooltipTitleDefText',
          },
          label: 'textVarLabelText',
          showLabel: true,
          validation: {
            type: 'regex',
            pattern: '.+',
          },
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          childStyle: [],
          gridColSpan: 12,
        },
        false,
      ],
      [
        'collectionVariable',
        {
          name: 'someCollectionVariable',
          type: 'collectionVariable',
          placeholder: 'emptyTextId',
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
        false,
      ],
      [
        'recordLink',
        {
          name: 'someRecordLink',
          type: 'recordLink',
          mode: 'input',
          tooltip: {
            title: 'divaPersonLinkText',
            body: 'divaPersonLinkDefText',
          },
          label: 'divaPersonLinkText',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          childStyle: [],
          gridColSpan: 12,
          recordLinkType: 'person',
          presentationRecordLinkId: 'divaPersonPLink',
          search: 'personSearch',
        },
        false,
      ],
      [
        'group',
        {
          type: 'group',
          label: 'someRootFormGroupText',
          name: 'someRootNameInData',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          tooltip: {
            title: 'textId345',
            body: 'defTextId678',
          },
          mode: 'input',
          components: [
            {
              type: 'text',
              name: 'someHeaderText',
            },
          ],
        },
        true,
      ],
      [
        'surroundingContainer',
        {
          type: 'container',
          containerType: 'surrounding',
          name: 'someInnerSurroundingContainerName',
          presentationStyle: 'frame', // frame can in the first step be a div with a background yellow and a black border
          childStyle: [],
          components: [
            {
              type: 'textVariable',
              name: 'someInnerNameInData',
              label: 'someTextId',
              childStyle: [],
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
        false,
      ],
    ])('check if %s is group', (arg1, arg2, arg3) => {
      const expected = isComponentGroup(arg2 as FormComponent);
      expect(expected).toStrictEqual(arg3);
    });
  });

  describe('isComponentContainer', () => {
    it.each([
      [
        'numberVariable',
        {
          type: 'numberVariable',
          name: 'someNumberVariable',
          label: 'someNumberVar2IdLabel',
          placeholder: 'someNumberVar2IdPlaceholder',
          repeat: { minNumberOfRepeatingToShow: 1, repeatMin: 0, repeatMax: 1 },
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
        false,
      ],
      [
        'textVariable',
        {
          name: 'someTextVariable',
          type: 'textVariable',
          mode: 'input',
          inputType: 'input',
          tooltip: {
            title: 'someTooltipTitleText',
            body: 'someTooltipTitleDefText',
          },
          label: 'textVarLabelText',
          showLabel: true,
          validation: {
            type: 'regex',
            pattern: '.+',
          },
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          childStyle: [],
          gridColSpan: 12,
        },
        false,
      ],
      [
        'collectionVariable',
        {
          name: 'someCollectionVariable',
          type: 'collectionVariable',
          placeholder: 'emptyTextId',
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
        false,
      ],
      [
        'recordLink',
        {
          name: 'someRecordLink',
          type: 'recordLink',
          mode: 'input',
          tooltip: {
            title: 'divaPersonLinkText',
            body: 'divaPersonLinkDefText',
          },
          label: 'divaPersonLinkText',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          childStyle: [],
          gridColSpan: 12,
          recordLinkType: 'person',
          presentationRecordLinkId: 'divaPersonPLink',
          search: 'personSearch',
        },
        false,
      ],
      [
        'group',
        {
          type: 'group',
          label: 'someRootFormGroupText',
          name: 'someRootNameInData',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          tooltip: {
            title: 'textId345',
            body: 'defTextId678',
          },
          mode: 'input',
          components: [
            {
              type: 'text',
              name: 'someHeaderText',
            },
          ],
        },
        false,
      ],
      [
        'surroundingContainer',
        {
          type: 'container',
          containerType: 'surrounding',
          name: 'someInnerSurroundingContainerName',
          presentationStyle: 'frame', // frame can in the first step be a div with a background yellow and a black border
          childStyle: [],
          components: [
            {
              type: 'textVariable',
              name: 'someInnerNameInData',
              label: 'someTextId',
              childStyle: [],
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
        true,
      ],
      [
        'repeatingContainer',
        {
          type: 'container',
          name: 'pSomeRepeatingContainerId',
          presentationStyle: 'label',
          containerType: 'repeating',
          childStyle: [],
          components: [
            {
              type: 'textVariable',
              name: 'someNameInData',
              label: 'someTextId',
              childStyle: ['5'],
              placeholder: 'someEmptyTextId',
              repeat: {
                repeatMin: 1,
                repeatMax: 3,
                minNumberOfRepeatingToShow: 2,
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
        true,
      ],
    ])('check if %s is container', (arg1, arg2, arg3) => {
      const expected = isComponentContainer(arg2 as FormComponent);
      expect(expected).toStrictEqual(arg3);
    });
  });

  describe('isComponentSurroundingContainer', () => {
    it.each([
      [
        'numberVariable',
        {
          type: 'numberVariable',
          name: 'someNumberVariable',
          label: 'someNumberVar2IdLabel',
          placeholder: 'someNumberVar2IdPlaceholder',
          repeat: { minNumberOfRepeatingToShow: 1, repeatMin: 0, repeatMax: 1 },
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
        false,
      ],
      [
        'textVariable',
        {
          name: 'someTextVariable',
          type: 'textVariable',
          mode: 'input',
          inputType: 'input',
          tooltip: {
            title: 'someTooltipTitleText',
            body: 'someTooltipTitleDefText',
          },
          label: 'textVarLabelText',
          showLabel: true,
          validation: {
            type: 'regex',
            pattern: '.+',
          },
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          childStyle: [],
          gridColSpan: 12,
        },
        false,
      ],
      [
        'collectionVariable',
        {
          name: 'someCollectionVariable',
          type: 'collectionVariable',
          placeholder: 'emptyTextId',
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
        false,
      ],
      [
        'recordLink',
        {
          name: 'someRecordLink',
          type: 'recordLink',
          mode: 'input',
          tooltip: {
            title: 'divaPersonLinkText',
            body: 'divaPersonLinkDefText',
          },
          label: 'divaPersonLinkText',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          childStyle: [],
          gridColSpan: 12,
          recordLinkType: 'person',
          presentationRecordLinkId: 'divaPersonPLink',
          search: 'personSearch',
        },
        false,
      ],
      [
        'group',
        {
          type: 'group',
          label: 'someRootFormGroupText',
          name: 'someRootNameInData',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          tooltip: {
            title: 'textId345',
            body: 'defTextId678',
          },
          mode: 'input',
          components: [
            {
              type: 'text',
              name: 'someHeaderText',
            },
          ],
        },
        false,
      ],
      [
        'surroundingContainer',
        {
          type: 'container',
          containerType: 'surrounding',
          name: 'someInnerSurroundingContainerName',
          presentationStyle: 'frame', // frame can in the first step be a div with a background yellow and a black border
          childStyle: [],
          components: [
            {
              type: 'textVariable',
              name: 'someInnerNameInData',
              label: 'someTextId',
              childStyle: [],
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
        true,
      ],
      [
        'repeatingContainer',
        {
          type: 'container',
          name: 'pSomeRepeatingContainerId',
          presentationStyle: 'label',
          containerType: 'repeating',
          childStyle: [],
          components: [
            {
              type: 'textVariable',
              name: 'someNameInData',
              label: 'someTextId',
              childStyle: ['5'],
              placeholder: 'someEmptyTextId',
              repeat: {
                repeatMin: 1,
                repeatMax: 3,
                minNumberOfRepeatingToShow: 2,
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
        false,
      ],
    ])('check if %s is surrounding container', (arg1, arg2, arg3) => {
      const expected = isComponentSurroundingContainer(arg2 as FormComponent);
      expect(expected).toStrictEqual(arg3);
    });
  });

  describe('isComponentRepeatingContainer', () => {
    it.each([
      [
        'numberVariable',
        {
          type: 'numberVariable',
          name: 'someNumberVariable',
          label: 'someNumberVar2IdLabel',
          placeholder: 'someNumberVar2IdPlaceholder',
          repeat: { minNumberOfRepeatingToShow: 1, repeatMin: 0, repeatMax: 1 },
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
        false,
      ],
      [
        'textVariable',
        {
          name: 'someTextVariable',
          type: 'textVariable',
          mode: 'input',
          inputType: 'input',
          tooltip: {
            title: 'someTooltipTitleText',
            body: 'someTooltipTitleDefText',
          },
          label: 'textVarLabelText',
          showLabel: true,
          validation: {
            type: 'regex',
            pattern: '.+',
          },
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          childStyle: [],
          gridColSpan: 12,
        },
        false,
      ],
      [
        'collectionVariable',
        {
          name: 'someCollectionVariable',
          type: 'collectionVariable',
          placeholder: 'emptyTextId',
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
        false,
      ],
      [
        'recordLink',
        {
          name: 'someRecordLink',
          type: 'recordLink',
          mode: 'input',
          tooltip: {
            title: 'divaPersonLinkText',
            body: 'divaPersonLinkDefText',
          },
          label: 'divaPersonLinkText',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          childStyle: [],
          gridColSpan: 12,
          recordLinkType: 'person',
          presentationRecordLinkId: 'divaPersonPLink',
          search: 'personSearch',
        },
        false,
      ],
      [
        'group',
        {
          type: 'group',
          label: 'someRootFormGroupText',
          name: 'someRootNameInData',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          tooltip: {
            title: 'textId345',
            body: 'defTextId678',
          },
          mode: 'input',
          components: [
            {
              type: 'text',
              name: 'someHeaderText',
            },
          ],
        },
        false,
      ],
      [
        'surroundingContainer',
        {
          type: 'container',
          containerType: 'surrounding',
          name: 'someInnerSurroundingContainerName',
          presentationStyle: 'frame', // frame can in the first step be a div with a background yellow and a black border
          childStyle: [],
          components: [
            {
              type: 'textVariable',
              name: 'someInnerNameInData',
              label: 'someTextId',
              childStyle: [],
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
        false,
      ],
      [
        'repeatingContainer',
        {
          type: 'container',
          name: 'pSomeRepeatingContainerId',
          presentationStyle: 'label',
          containerType: 'repeating',
          childStyle: [],
          components: [
            {
              type: 'textVariable',
              name: 'someNameInData',
              label: 'someTextId',
              childStyle: ['5'],
              placeholder: 'someEmptyTextId',
              repeat: {
                repeatMin: 1,
                repeatMax: 3,
                minNumberOfRepeatingToShow: 2,
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
        true,
      ],
    ])('check if %s is repeating container', (arg1, arg2, arg3) => {
      const expected = isComponentRepeatingContainer(arg2 as FormComponent);
      expect(expected).toStrictEqual(arg3);
    });
  });

  describe('isComponentValidForDataCarrying', () => {
    it.each([
      [
        'numberVariable',
        {
          type: 'numberVariable',
          name: 'someNumberVariable',
          label: 'someNumberVar2IdLabel',
          placeholder: 'someNumberVar2IdPlaceholder',
          repeat: { minNumberOfRepeatingToShow: 1, repeatMin: 0, repeatMax: 1 },
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
        true,
      ],
      [
        'textVariable',
        {
          name: 'someTextVariable',
          type: 'textVariable',
          mode: 'input',
          inputType: 'input',
          tooltip: {
            title: 'someTooltipTitleText',
            body: 'someTooltipTitleDefText',
          },
          label: 'textVarLabelText',
          showLabel: true,
          validation: {
            type: 'regex',
            pattern: '.+',
          },
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          childStyle: [],
          gridColSpan: 12,
        },
        true,
      ],
      [
        'collectionVariable',
        {
          name: 'someCollectionVariable',
          type: 'collectionVariable',
          placeholder: 'emptyTextId',
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
        true,
      ],
      [
        'recordLink',
        {
          name: 'someRecordLink',
          type: 'recordLink',
          mode: 'input',
          tooltip: {
            title: 'divaPersonLinkText',
            body: 'divaPersonLinkDefText',
          },
          label: 'divaPersonLinkText',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          childStyle: [],
          gridColSpan: 12,
          recordLinkType: 'person',
          presentationRecordLinkId: 'divaPersonPLink',
          search: 'personSearch',
        },
        true,
      ],
      [
        'group',
        {
          type: 'group',
          label: 'someRootFormGroupText',
          name: 'someRootNameInData',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          tooltip: {
            title: 'textId345',
            body: 'defTextId678',
          },
          mode: 'input',
          components: [
            {
              type: 'text',
              name: 'someHeaderText',
            },
          ],
        },
        true,
      ],
      [
        'surroundingContainer',
        {
          type: 'container',
          containerType: 'surrounding',
          name: 'someInnerSurroundingContainerName',
          presentationStyle: 'frame', // frame can in the first step be a div with a background yellow and a black border
          childStyle: [],
          components: [
            {
              type: 'textVariable',
              name: 'someInnerNameInData',
              label: 'someTextId',
              childStyle: [],
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
        true,
      ],
      [
        'repeatingContainer',
        {
          type: 'container',
          name: 'pSomeRepeatingContainerId',
          presentationStyle: 'label',
          containerType: 'repeating',
          childStyle: [],
          components: [
            {
              type: 'textVariable',
              name: 'someNameInData',
              label: 'someTextId',
              childStyle: ['5'],
              placeholder: 'someEmptyTextId',
              repeat: {
                repeatMin: 1,
                repeatMax: 3,
                minNumberOfRepeatingToShow: 2,
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
        true,
      ],
    ])('check if %s is valid for data carrying', (arg1, arg2, arg3) => {
      const expected = isComponentValidForDataCarrying(arg2 as FormComponent);
      expect(expected).toStrictEqual(arg3);
    });
  });

  describe('isComponentRepeating', () => {
    it.each([
      [
        'numberVariable',
        {
          type: 'numberVariable',
          name: 'someNumberVariable',
          label: 'someNumberVar2IdLabel',
          placeholder: 'someNumberVar2IdPlaceholder',
          repeat: { repeatMin: 1, repeatMax: 1 },
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
        false,
      ],
      [
        'numberVariable',
        {
          type: 'numberVariable',
          name: 'someNumberVariable',
          label: 'someNumberVar2IdLabel',
          placeholder: 'someNumberVar2IdPlaceholder',
          repeat: { repeatMin: 0, repeatMax: 1 },
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
        true,
      ],
      [
        'numberVariable',
        {
          type: 'numberVariable',
          name: 'someNumberVariable',
          label: 'someNumberVar2IdLabel',
          placeholder: 'someNumberVar2IdPlaceholder',
          repeat: { repeatMin: 1, repeatMax: 2 },
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
        true,
      ],
      [
        'numberVariable',
        {
          type: 'numberVariable',
          name: 'someNumberVariable',
          label: 'someNumberVar2IdLabel',
          placeholder: 'someNumberVar2IdPlaceholder',
          repeat: { repeatMin: 0, repeatMax: 1.7976931348623157e308 },
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
        true,
      ],
    ])('check if %s is repeating', (arg1, arg2, arg3) => {
      const expected = isComponentRepeating(arg2 as FormComponent);
      expect(expected).toStrictEqual(arg3);
    });
  });

  describe('isComponentRequired', () => {
    it.each([
      [
        'numberVariable',
        {
          type: 'numberVariable',
          name: 'someNumberVariable',
          label: 'someNumberVar2IdLabel',
          placeholder: 'someNumberVar2IdPlaceholder',
          repeat: { repeatMin: 0, repeatMax: 1 },
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
        true,
      ],
      [
        'numberVariable',
        {
          type: 'numberVariable',
          name: 'someNumberVariable',
          label: 'someNumberVar2IdLabel',
          placeholder: 'someNumberVar2IdPlaceholder',
          repeat: { repeatMin: 1, repeatMax: 1 },
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
        false,
      ],
    ])('check if %s is required', (arg1, arg2, arg3) => {
      const expected = isComponentRepeating(arg2 as FormComponent);
      expect(expected).toStrictEqual(arg3);
    });
  });

  describe('isComponentSingularAndOptional', () => {
    it.each([
      [
        'numberVariable',
        {
          type: 'numberVariable',
          name: 'someNumberVariable',
          label: 'someNumberVar2IdLabel',
          placeholder: 'someNumberVar2IdPlaceholder',
          repeat: { repeatMin: 0, repeatMax: 1 },
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
        true,
      ],
      [
        'numberVariable',
        {
          type: 'numberVariable',
          name: 'someNumberVariable',
          label: 'someNumberVar2IdLabel',
          placeholder: 'someNumberVar2IdPlaceholder',
          repeat: { repeatMin: 1, repeatMax: 1 },
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
        false,
      ],
      [
        'numberVariable',
        {
          type: 'numberVariable',
          name: 'someNumberVariable',
          label: 'someNumberVar2IdLabel',
          placeholder: 'someNumberVar2IdPlaceholder',
          repeat: { repeatMin: 1, repeatMax: 2 },
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
        false,
      ],
      [
        'numberVariable',
        {
          type: 'numberVariable',
          name: 'someNumberVariable',
          label: 'someNumberVar2IdLabel',
          placeholder: 'someNumberVar2IdPlaceholder',
          repeat: { repeatMin: 2, repeatMax: 2 },
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
        false,
      ],
    ])('check if %s is singular and optional', (arg1, arg2, arg3) => {
      const expected = isComponentSingularAndOptional(arg2 as FormComponent);
      expect(expected).toStrictEqual(arg3);
    });
  });
  describe('isParentGroupOptional', () => {
    it('isParentGroupOptional return false for group & repeatMin === 1', () => {
      const actual = isComponentGroupAndOptional({
        type: 'group',
        label: 'someRootFormGroupText',
        name: 'someRootNameInData',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        tooltip: {
          title: 'textId345',
          body: 'defTextId678',
        },
        mode: 'input',
        components: [
          {
            type: 'text',
            name: 'someHeaderText',
          },
        ],
      });
      expect(actual).toBe(false);
    });

    it('isParentGroupOptional return true for group & repeatMin === 0', () => {
      const actual = isComponentGroupAndOptional({
        type: 'group',
        label: 'someRootFormGroupText',
        name: 'someRootNameInData',
        repeat: {
          repeatMin: 0,
          repeatMax: 1,
        },
        tooltip: {
          title: 'textId345',
          body: 'defTextId678',
        },
        mode: 'input',
        components: [
          {
            type: 'text',
            name: 'someHeaderText',
          },
        ],
      });
      expect(actual).toBe(true);
    });

    it('isParentGroupOptional return false for non group variable & repeatMin === 0', () => {
      const actual = isComponentGroupAndOptional({
        type: 'textVariable',
        name: 'someInnerNameInData',
        label: 'someTextId',
        childStyle: [],
        placeholder: 'someEmptyTextId',
        showLabel: true,
        repeat: {
          repeatMin: 0,
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
      });
      expect(actual).toBe(false);
    });

    it('isParentGroupOptional return false for non group variable & repeatMin === 1', () => {
      const actual = isComponentGroupAndOptional({
        type: 'textVariable',
        name: 'someInnerNameInData',
        label: 'someTextId',
        childStyle: [],
        placeholder: 'someEmptyTextId',
        showLabel: true,
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
      });
      expect(actual).toBe(false);
    });
  });

  describe('checkForSiblingValue', () => {
    it('checkForSiblingValue', () => {
      const actual = checkForExistingSiblings({
        latitude: { value: '' },
        longitude: { value: 'a' },
      });
      expect(actual).toBe(true);
    });
    it('checkForSiblingValue2', () => {
      const actual = checkForExistingSiblings({
        latitude: { value: '' },
        longitude: { value: '' },
      });
      expect(actual).toBe(false);
    });
    it('checkForSiblingValue3', () => {
      const actual = checkForExistingSiblings({
        _year: { value: '1234' },
        latitude: { value: '' },
        longitude: { value: 'a' },
      });
      expect(actual).toBe(true);
    });
    it('checkForSiblingValue4', () => {
      const actual = checkForExistingSiblings({
        maintitle: { value: '' },
        subtitle: [{ value: 'a' }],
      });
      expect(actual).toBe(true);
    });
    it('checkForSiblingValue5', () => {
      const actual = checkForExistingSiblings({
        _year: { value: '1234' },
        latitude: { value: '' },
        longitude: { value: '' },
      });
      expect(actual).toBe(false);
    });
    it('checkForSiblingValue6', () => {
      const actual = checkForExistingSiblings({
        longitude: {
          value: '',
        },
        latitude: {
          value: '',
        },
      });
      expect(actual).toBe(false);
    });
    it('checkForSiblingValue7', () => {
      const actual = checkForExistingSiblings({
        longitude: {
          value: '1',
        },
        latitude: {
          value: '',
        },
      });
      expect(actual).toBe(true);
    });
  });

  describe('checkIfValueExists', () => {
    it('checkIfValueExists returns false for empty string', () => {
      const actual = checkIfValueExists('');
      expect(actual).toBe(false);
    });
    it('checkIfValueExists returns false for null', () => {
      const actual = checkIfValueExists(null);
      expect(actual).toBe(false);
    });
    it('checkIfValueExists returns false for undefined', () => {
      const actual = checkIfValueExists(undefined);
      expect(actual).toBe(false);
    });
    it('checkIfValueExists returns true for non-empty string', () => {
      const actual = checkIfValueExists('someString');
      expect(actual).toBe(true);
    });
  });

  describe('checkIfComponentHasValue', () => {
    it('Should return false if the value is empty', () => {
      const mockGetValues = vi.fn(() => {
        return '';
      }) as unknown as UseFormGetValues<FieldValues>;

      const actual = checkIfComponentHasValue(mockGetValues, 'domain.value');
      expect(actual).toStrictEqual(false);
    });
    it('Should return true if the value is not empty', () => {
      const values = {
        divaOutput: {
          recordInfo: {},
          domain: {
            value: 'hig',
          },
        },
      };

      const mockGetValues = vi.fn(() => {
        return values.divaOutput.domain.value;
      }) as unknown as UseFormGetValues<FieldValues>;

      const actual = checkIfComponentHasValue(mockGetValues, 'domain.value');
      expect(actual).toStrictEqual(true);
    });
    it('Should return false if the value is undefined', () => {
      const mockGetValues = vi.fn(() => {
        return undefined;
      }) as unknown as UseFormGetValues<FieldValues>;

      const actual = checkIfComponentHasValue(mockGetValues, 'domain.value');
      expect(actual).toStrictEqual(false);
    });
  });
  describe('checkIfSingularComponentHasValue', () => {
    it('Should return false if the value is array with empty object', () => {
      const mockGetValues = vi.fn(() => {
        return [{ value: '' }];
      }) as unknown as UseFormGetValues<FieldValues>;

      const actual = checkIfSingularComponentHasValue(
        mockGetValues,
        'domain.value',
      );
      expect(actual).toStrictEqual(false);
    });

    it('Should return false if the value is undefined', () => {
      const mockGetValues = vi.fn(() => {
        return undefined;
      }) as unknown as UseFormGetValues<FieldValues>;

      const actual = checkIfSingularComponentHasValue(
        mockGetValues as any,
        'domain.value',
      );
      expect(actual).toStrictEqual(false);
    });
  });
});
