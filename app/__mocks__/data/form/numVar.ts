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

export const formDefWithOneNumberVariable: RecordFormSchema = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    showLabel: true,
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
    components: [
      {
        type: 'numberVariable',
        name: 'someNumberVariableNameInData',
        placeholder: 'someNumberPlaceholderTextId',
        label: 'someNumberVariableNameInData',
        showLabel: true,
        validation: {
          type: 'number',
          min: 1,
          max: 20,
          warningMin: 2,
          warningMax: 10,
          numberOfDecimals: 0,
        },
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
          minNumberOfRepeatingToShow: 1,
        },
        mode: 'input',
      },
    ],
    mode: 'input',
  },
};

export const formDefWithOneNumberVariableModeOutput: RecordFormSchema = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    showLabel: true,
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
    components: [
      {
        type: 'numberVariable',
        mode: 'output',
        name: 'someNumberVariableNameInData',
        placeholder: 'someNumberPlaceholderTextId',
        validation: {
          type: 'number',
          min: 1,
          max: 20,
          warningMin: 2,
          warningMax: 10,
          numberOfDecimals: 0,
        },
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
    ],
    mode: 'input',
  },
};

export const formDefWithOneNumberVariableBeingOptionalOutput: RecordFormSchema =
  {
    validationTypeId: 'someValidationTypeId',
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
      components: [
        {
          type: 'numberVariable',
          name: 'someNumberVariableNameInData',
          placeholder: 'someNumberPlaceholderTextId',
          validation: {
            type: 'number',
            min: 1,
            max: 20,
            warningMin: 2,
            warningMax: 10,
            numberOfDecimals: 0,
          },
          repeat: {
            repeatMin: 0,
            repeatMax: 1,
            minNumberOfRepeatingToShow: 1,
          },
          showLabel: true,
          mode: 'output',
        },
      ],
      mode: 'input',
    },
  };

export const formDefWithOneNumberVariableBeingOptional: RecordFormSchema = {
  validationTypeId: 'someValidationTypeId',
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
    components: [
      {
        type: 'numberVariable',
        name: 'someNumberVariableNameInData',
        placeholder: 'someNumberPlaceholderTextId',
        validation: {
          type: 'number',
          min: 1,
          max: 20,
          warningMin: 2,
          warningMax: 10,
          numberOfDecimals: 0,
        },
        repeat: {
          repeatMin: 0,
          repeatMax: 1,
          minNumberOfRepeatingToShow: 1,
        },
        showLabel: true,
        mode: 'input',
      },
    ],
    mode: 'input',
  },
};

export const formDefWithOneNumberVariableHavingDecimals: RecordFormSchema = {
  validationTypeId: 'someValidationTypeId',
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
    components: [
      {
        type: 'numberVariable',
        name: 'someNumberVariableNameInData',
        placeholder: 'someNumberPlaceholderTextId',
        validation: {
          type: 'number',
          min: 0,
          max: 20,
          warningMin: 2,
          warningMax: 10,
          numberOfDecimals: 2,
        },
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        mode: 'input',
      },
    ],
    mode: 'input',
  },
};

export const formDefRequiredRepeatingNumberVar: RecordFormSchema = {
  validationTypeId: 'diva-output',
  form: {
    name: 'output',
    type: 'group',
    mode: 'input',
    tooltip: {
      title: 'outputNewGroupText',
      body: 'outputNewGroupDefText',
    },
    label: 'outputNewGroupText',
    showLabel: true,
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    components: [
      {
        name: 'language',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'languageGroupText',
          body: 'languageGroupDefText',
        },
        label: 'languageGroupText',
        showLabel: true,
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 1,
          repeatMax: 1.7976931348623157e308,
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
        ],
        presentationStyle: '',
        childStyle: [],
        gridColSpan: 12,
      },
    ],
    presentationStyle: '',
    childStyle: [],
    gridColSpan: 12,
  },
};

export const formDefRequiredRepeatingNumber2Var: RecordFormSchema = {
  validationTypeId: 'diva-output',
  form: {
    name: 'output',
    type: 'group',
    mode: 'input',
    tooltip: {
      title: 'outputNewGroupText',
      body: 'outputNewGroupDefText',
    },
    label: 'outputNewGroupText',
    showLabel: true,
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    components: [
      {
        name: 'language',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'languageGroupText',
          body: 'languageGroupDefText',
        },
        label: 'languageGroupText',
        showLabel: true,
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0,
          repeatMax: 1,
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
        ],
        presentationStyle: '',
        childStyle: [],
        gridColSpan: 12,
      },
    ],
    presentationStyle: '',
    childStyle: [],
    gridColSpan: 12,
  },
};
