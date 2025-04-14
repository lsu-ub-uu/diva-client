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

import type {
  FormComponentGroup,
  FormComponentWithData,
} from '@/components/FormGenerator/types';

export const formComponentGroup: FormComponentGroup = {
  name: 'firstChildGroup',
  type: 'group',
  mode: 'input',
  showLabel: true,
  tooltip: {
    title: 'exampleFirstChildGroupText',
    body: 'exampleFirstChildGroupDefText',
  },
  label: 'exampleFirstChildGroupText',
  repeat: {
    minNumberOfRepeatingToShow: 0,
    repeatMin: 0,
    repeatMax: 2,
  },
  components: [
    {
      name: 'exampleNumberVar',
      type: 'numberVariable',
      mode: 'input',
      tooltip: {
        title: 'exampleMetadataNumberVarText',
        body: 'exampleMetadataNumberVarDefText',
      },
      label: 'exampleMetadataNumberVarText',
      showLabel: true,
      validation: {
        type: 'number',
        min: 0,
        max: 100,
        warningMin: 10,
        warningMax: 90,
        numberOfDecimals: 2,
      },
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
    },
    {
      name: 'exampleTextVar',
      type: 'textVariable',
      mode: 'input',
      inputType: 'input',
      tooltip: {
        title: 'exampleMetadataTextVarText',
        body: 'exampleMetadataTextVarDefText',
      },
      label: 'exampleMetadataTextVarText',
      showLabel: true,
      validation: {
        type: 'regex',
        pattern: '.*',
      },
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
    },
  ],
};

export const formComponentRepeatingTextVariable: FormComponentWithData = {
  name: 'exampleTextVar',
  type: 'textVariable',
  mode: 'input',
  showLabel: true,
  inputType: 'input',
  tooltip: {
    title: 'exampleMetadataTextVarText',
    body: 'exampleMetadataTextVarDefText',
  },
  label: 'exampleMetadataTextVarText',
  validation: {
    type: 'regex',
    pattern: '.*',
  },
  repeat: {
    repeatMin: 0,
    repeatMax: 1,
  },
};

export const formComponentGroupWithChildren: FormComponentWithData = {
  name: 'firstChildGroup',
  type: 'group',
  mode: 'input',
  showLabel: true,
  tooltip: {
    title: 'exampleFirstChildGroupText',
    body: 'exampleFirstChildGroupDefText',
  },
  label: 'exampleFirstChildGroupText',
  repeat: {
    minNumberOfRepeatingToShow: 0,
    repeatMin: 0,
    repeatMax: 2,
  },
  components: [
    {
      name: 'exampleNumberVar',
      type: 'numberVariable',
      mode: 'input',
      tooltip: {
        title: 'exampleMetadataNumberVarText',
        body: 'exampleMetadataNumberVarDefText',
      },
      label: 'exampleMetadataNumberVarText',
      showLabel: true,
      validation: {
        type: 'number',
        min: 0,
        max: 100,
        warningMin: 10,
        warningMax: 90,
        numberOfDecimals: 2,
      },
      repeat: {
        minNumberOfRepeatingToShow: 1,
        repeatMin: 0,
        repeatMax: 5,
      },
    },
    {
      name: 'exampleTextVar',
      type: 'textVariable',
      mode: 'input',
      inputType: 'input',
      tooltip: {
        title: 'exampleMetadataTextVarText',
        body: 'exampleMetadataTextVarDefText',
      },
      label: 'exampleMetadataTextVarText',
      showLabel: true,
      validation: {
        type: 'regex',
        pattern: '.*',
      },
      repeat: {
        minNumberOfRepeatingToShow: 2,
        repeatMin: 0,
        repeatMax: 2,
      },
    },
  ],
};

export const formComponentGroupAndTextVariableWithinGroup: FormComponentGroup =
  {
    name: 'firstChildGroup',
    type: 'group',
    mode: 'input',
    showLabel: true,
    tooltip: {
      title: 'exampleFirstChildGroupText',
      body: 'exampleFirstChildGroupDefText',
    },
    label: 'exampleFirstChildGroupText',
    repeat: {
      minNumberOfRepeatingToShow: 0,
      repeatMin: 0,
      repeatMax: 2,
    },
    components: [
      {
        name: 'innerChildGroup',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'exampleFirstChildGroupText',
          body: 'exampleFirstChildGroupDefText',
        },
        label: 'exampleFirstChildGroupText',
        showLabel: true,
        repeat: {
          minNumberOfRepeatingToShow: 2,
          repeatMin: 0,
          repeatMax: 2,
        },
        components: [
          {
            name: 'shouldBeSkippedComponent',
            type: 'text',
            repeat: {
              repeatMin: 1,
              repeatMax: 2,
            },
            showLabel: true,
          },
          {
            name: 'exampleNumberVar',
            type: 'numberVariable',
            mode: 'input',
            tooltip: {
              title: 'exampleMetadataNumberVarText',
              body: 'exampleMetadataNumberVarDefText',
            },
            label: 'exampleMetadataNumberVarText',
            showLabel: true,
            finalValue: '12',
            validation: {
              type: 'number',
              min: 0,
              max: 100,
              warningMin: 10,
              warningMax: 90,
              numberOfDecimals: 2,
            },
            repeat: {
              minNumberOfRepeatingToShow: 10,
              repeatMin: 0,
              repeatMax: 10,
            },
          },
          {
            name: 'exampleTextVar',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'exampleMetadataTextVarText',
              body: 'exampleMetadataTextVarDefText',
            },
            label: 'exampleMetadataTextVarText',
            showLabel: true,
            validation: {
              type: 'regex',
              pattern: '.*',
            },
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
          },
        ],
      },
      {
        name: 'exampleTextVar',
        type: 'textVariable',
        mode: 'input',
        inputType: 'input',
        tooltip: {
          title: 'exampleMetadataTextVarText',
          body: 'exampleMetadataTextVarDefText',
        },
        label: 'exampleMetadataTextVarText',
        showLabel: true,
        validation: {
          type: 'regex',
          pattern: '.*',
        },
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
    ],
  };

export const formComponentGroupWithinGroupWithAttributes: FormComponentGroup = {
  name: 'firstChildGroup',
  type: 'group',
  mode: 'input',
  showLabel: true,
  tooltip: {
    title: 'exampleFirstChildGroupText',
    body: 'exampleFirstChildGroupDefText',
  },
  label: 'exampleFirstChildGroupText',
  repeat: {
    minNumberOfRepeatingToShow: 0,
    repeatMin: 0,
    repeatMax: 2,
  },
  attributes: [
    {
      type: 'collectionVariable',
      name: 'firstChildGroupColor',
      finalValue: 'yellow',
      placeholder: 'emptyTextId',
      showLabel: true,
      label: 'firstChildGroupColorLabel',
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
      name: 'firstChildGroupSecondAttribute',
      placeholder: 'emptyTextId',
      showLabel: true,
      label: 'firstChildGroupSecondText',
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
  components: [
    {
      name: 'secondChildGroup',
      type: 'group',
      mode: 'input',
      tooltip: {
        title: 'exampleFirstChildGroupText',
        body: 'exampleFirstChildGroupDefText',
      },
      label: 'exampleFirstChildGroupText',
      showLabel: true,
      repeat: {
        minNumberOfRepeatingToShow: 1,
        repeatMin: 0,
        repeatMax: 2,
      },
      components: [
        {
          name: 'exampleNumberVar',
          type: 'numberVariable',
          mode: 'input',
          tooltip: {
            title: 'exampleMetadataNumberVarText',
            body: 'exampleMetadataNumberVarDefText',
          },
          label: 'exampleMetadataNumberVarText',
          showLabel: true,
          validation: {
            type: 'number',
            min: 0,
            max: 100,
            warningMin: 10,
            warningMax: 90,
            numberOfDecimals: 2,
          },
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
        },
        {
          name: 'exampleTextVar',
          type: 'textVariable',
          mode: 'input',
          inputType: 'input',
          tooltip: {
            title: 'exampleMetadataTextVarText',
            body: 'exampleMetadataTextVarDefText',
          },
          label: 'exampleMetadataTextVarText',
          showLabel: true,
          validation: {
            type: 'regex',
            pattern: '.*',
          },
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          attributes: [
            {
              type: 'collectionVariable',
              name: 'colour',
              showLabel: true,
              label: 'colour',
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
          ],
        },
      ],
    },
  ],
};

export const formComponentTitleInfoGroup: FormComponentWithData = {
  name: 'firstChildGroup',
  type: 'group',
  mode: 'input',
  showLabel: true,
  tooltip: {
    title: 'exampleFirstChildGroupText',
    body: 'exampleFirstChildGroupDefText',
  },
  label: 'exampleFirstChildGroupText',
  repeat: {
    minNumberOfRepeatingToShow: 0,
    repeatMin: 0,
    repeatMax: 2,
  },
  components: [
    {
      name: 'titleInfo',
      type: 'group',
      mode: 'input',
      tooltip: {
        title: 'titleInfoGroupText',
        body: 'titleInfoGroupDefText',
      },
      label: 'titleInfoGroupText',
      showLabel: true,
      repeat: {
        minNumberOfRepeatingToShow: 1,
        repeatMin: 1,
        repeatMax: 1,
      },
      attributes: [
        {
          name: 'lang',
          type: 'collectionVariable',
          placeholder: 'initialEmptyValueText',
          mode: 'input',
          tooltip: {
            title: 'languageCollectionVarText',
            body: 'languageCollectionVarDefText',
          },
          label: 'languageCollectionVarText',
          showLabel: true,
          options: [
            {
              value: 'eng',
              label: 'engLangItemText',
            },
            {
              value: 'swe',
              label: 'sweLangItemText',
            },
          ],
        },
      ],
      components: [
        {
          name: 'title',
          type: 'textVariable',
          mode: 'input',
          inputType: 'input',
          tooltip: {
            title: 'titleTextVarText',
            body: 'titleTextVarDefText',
          },
          label: 'titleTextVarText',
          showLabel: true,
          validation: {
            type: 'regex',
            pattern: '.+',
          },
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 1,
            repeatMax: 1,
          },
          childStyle: [],
          gridColSpan: 12,
        },
      ],
      presentationStyle: '',
      childStyle: [],
      gridColSpan: 12,
    },
    {
      name: 'titleInfo',
      type: 'group',
      mode: 'input',
      tooltip: {
        title: 'titleInfoGroupText',
        body: 'titleInfoGroupDefText',
      },
      label: 'titleInfoGroupText',
      showLabel: true,
      repeat: {
        minNumberOfRepeatingToShow: 1,
        repeatMin: 0,
        repeatMax: 1.7976931348623157e308,
      },
      attributes: [
        {
          name: 'lang',
          type: 'collectionVariable',
          placeholder: 'initialEmptyValueText',
          mode: 'input',
          tooltip: {
            title: 'languageCollectionVarText',
            body: 'languageCollectionVarDefText',
          },
          label: 'languageCollectionVarText',
          showLabel: true,
          options: [
            {
              value: 'eng',
              label: 'engLangItemText',
            },
            {
              value: 'swe',
              label: 'sweLangItemText',
            },
          ],
        },
        {
          name: 'type',
          type: 'collectionVariable',
          placeholder: 'initialEmptyValueText',
          mode: 'input',
          tooltip: {
            title: 'titleTypeCollectionVarText',
            body: 'titleTypeCollectionVarDefText',
          },
          label: 'titleTypeCollectionVarText',
          showLabel: true,
          options: [
            {
              value: 'alternative',
              label: 'alternativeTitleItemText',
            },
          ],
          finalValue: 'alternative',
        },
      ],
      components: [
        {
          name: 'title',
          type: 'textVariable',
          mode: 'input',
          inputType: 'input',
          tooltip: {
            title: 'titleTextVarText',
            body: 'titleTextVarDefText',
          },
          label: 'titleTextVarText',
          showLabel: true,
          validation: {
            type: 'regex',
            pattern: '.+',
          },
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 1,
            repeatMax: 1,
          },
          childStyle: [],
          gridColSpan: 12,
        },
      ],
      presentationStyle: '',
      childStyle: [],
      gridColSpan: 12,
    },
  ],
};
