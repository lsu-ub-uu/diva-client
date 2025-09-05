/*
 * Copyright 2025 Uppsala University Library
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

import type { RecordFormSchema } from '@/components/FormGenerator/types';

export const formDefWithARepeatingContainer: RecordFormSchema = {
  validationTypeId: 'book',
  form: {
    type: 'group',
    showLabel: true,
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
            childStyle: ['fiveChildStyle'],
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
    ],
  },
};

export const formDefWithSurroundingContainerAroundTextVariable: RecordFormSchema =
  {
    validationTypeId: 'book',
    form: {
      type: 'group',
      showLabel: true,
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
        {
          type: 'container',
          containerType: 'surrounding',
          name: 'someSurroundingContainerName',
          presentationStyle: 'frame', // frame can in the first step be a div with a background yellow and a black border
          childStyle: [],
          components: [
            {
              type: 'textVariable',
              name: 'someNameInData',
              label: 'someTextId',
              childStyle: [],
              placeholder: 'text variable',
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
                pattern: '.+',
              },
              mode: 'input',
              inputType: 'input',
            },
          ],
          mode: 'input',
        },
      ],
    },
  };
