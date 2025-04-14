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

export const formDefWithSingleTextVar: RecordFormSchema = {
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
        type: 'textVariable',
        name: 'someNameInData',
        label: 'someLabelTextId',
        placeholder: 'someEmptyTextId',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        validation: {
          type: 'regex',
          pattern: '^[a-zA-Z]$',
        },
        inputType: 'input',
        mode: 'input',
      },
    ],
    mode: 'input',
  },
};

export const formDefWithOneNumberVariable: RecordFormSchema = {
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
        label: 'someOtherLabelId',
        placeholder: 'someNumberPlaceholderTextId',
        validation: {
          type: 'number',
          min: 0,
          max: 20,
          warningMin: 2,
          warningMax: 10,
          numberOfDecimals: 0,
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

export const formDefWithTextVar: RecordFormSchema = {
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
        type: 'text',
        name: 'presentationTypeTextCollectionVarDefText',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
      {
        type: 'textVariable',
        name: 'someNameInData',
        label: 'someLabelTextId',
        placeholder: 'someEmptyTextId',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        validation: {
          type: 'regex',
          pattern: '^[a-zA-Z]$',
        },
        inputType: 'input',
        mode: 'input',
      },
      {
        type: 'numberVariable',
        name: 'someNumberVariableNameInData',
        label: 'someOtherLabelId',
        placeholder: 'someNumberPlaceholderTextId',
        validation: {
          type: 'number',
          min: 0,
          max: 20,
          warningMin: 2,
          warningMax: 10,
          numberOfDecimals: 0,
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

export const formDefWithTwoTextVariableHavingFinalValue: RecordFormSchema = {
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
        type: 'textVariable',
        name: 'someNameInData1',
        label: 'label1',
        showLabel: true,
        finalValue: 'someFinalValue1',
        placeholder: 'someEmptyTextId1',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        validation: {
          type: 'regex',
          pattern: '.*',
        },
        inputType: 'input',
        mode: 'input',
      },
      {
        type: 'textVariable',
        name: 'someNameInData2',
        label: 'label2',
        showLabel: true,
        finalValue: 'someFinalValue2',
        placeholder: 'someEmptyTextId2',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        validation: {
          type: 'regex',
          pattern: '.*',
        },
        inputType: 'input',
        mode: 'input',
      },
    ],
    mode: 'input',
  },
};

export const formDefWithOneRepeatingTextVariableWithModeOutput: RecordFormSchema =
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
          name: 'exampleTextVar',
          type: 'textVariable',
          mode: 'output',
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
      mode: 'input',
    },
  };

export const formDefWithOneTextVariableBeingOptional: RecordFormSchema = {
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
        type: 'textVariable',
        name: 'someNameInData',
        placeholder: 'someEmptyTextId',
        showLabel: true,
        mode: 'input',
        repeat: {
          repeatMin: 0,
          repeatMax: 1,
          minNumberOfRepeatingToShow: 1,
        },
        validation: {
          type: 'regex',
          pattern: '^[a-zA-Z]$',
        },
        inputType: 'input',
      },
    ],
    mode: 'input',
  },
};

export const formDefWithOneTextVariableBeingRepeating: RecordFormSchema = {
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
        type: 'textVariable',
        name: 'someNameInData',
        placeholder: 'someEmptyTextId',
        repeat: {
          repeatMin: 0,
          repeatMax: 2,
          minNumberOfRepeatingToShow: 2,
        },
        validation: {
          type: 'regex',
          pattern: '^[a-zA-Z]$',
        },
        inputType: 'input',
      },
    ],
    mode: 'input',
  },
};

export const formDefWithOneTextVariableBeingPassword: RecordFormSchema = {
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
        type: 'textVariable',
        name: 'someNameInData',
        label: 'passwordLabel',
        showLabel: true,
        placeholder: 'loginPasswordTextVarText',
        repeat: {
          repeatMin: 0,
          repeatMax: 1,
          minNumberOfRepeatingToShow: 1,
        },
        validation: {
          type: 'regex',
          pattern: '.*',
        },
        inputType: 'input',
        inputFormat: 'password',
        mode: 'input',
      },
    ],
    mode: 'input',
  },
};

export const formDefWithOneTextVariable: RecordFormSchema = {
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
        type: 'text',
        name: 'presentationTypeTextCollectionVarDefText',
      },
      {
        type: 'textVariable',
        name: 'someNameInData',
        showLabel: true,
        label: 'someLabelTextId',
        placeholder: 'someEmptyTextId',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        validation: {
          type: 'regex',
          pattern: '^[a-zA-Z]$',
        },
        inputType: 'input',
        mode: 'input',
      },
    ],
    mode: 'input',
  },
};

export const formDefWithOneTextVariableWithMinNumberOfRepeatingToShow: RecordFormSchema =
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
          type: 'text',
          name: 'presentationTypeTextCollectionVarDefText',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
        },
        {
          type: 'textVariable',
          mode: 'input',
          name: 'someNameInData',
          label: 'someNameInDataLabel',
          placeholder: 'someEmptyTextId',
          repeat: {
            repeatMin: 2,
            repeatMax: 3,
            minNumberOfRepeatingToShow: 2,
          },
          validation: {
            type: 'regex',
            pattern: '^[a-zA-Z]$',
          },
          inputType: 'input',
        },
      ],
      mode: 'input',
    },
  };

export const formDefWithOneTextVariableWithMinNumberOfRepeatingToShowAndRepeatMinZero: RecordFormSchema =
  {
    validationTypeId: 'someValidationTypeId',
    form: {
      type: 'group',
      label: 'someRootFormGroupText',
      showLabel: true,
      name: 'someRootNameInData',
      repeat: {
        minNumberOfRepeatingToShow: 1,
        repeatMin: 1,
        repeatMax: 1,
      },
      tooltip: {
        title: 'textId345',
        body: 'defTextId678',
      },
      components: [
        {
          type: 'text',
          name: 'presentationTypeTextCollectionVarDefText',
        },
        {
          type: 'textVariable',
          mode: 'input',
          name: 'someNameInData',
          placeholder: 'someEmptyTextId',
          repeat: {
            repeatMin: 0,
            repeatMax: 1,
            minNumberOfRepeatingToShow: 1,
          },
          validation: {
            type: 'regex',
            pattern: '^[a-zA-Z]$',
          },
          inputType: 'input',
        },
      ],
      mode: 'input',
    },
  };

export const formDefRequiredRepeatingTextVar: RecordFormSchema = {
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
          repeatMax: 1,
        },
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
            placeholder: 'titleInfoVarText2',
            showLabel: true,
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1.7976931348623157e308,
            },
            childStyle: [''],
            gridColSpan: 12,
          },
        ],
        presentationStyle: '',
        childStyle: [''],
        gridColSpan: 12,
      },
    ],
    presentationStyle: '',
    childStyle: [''],
    gridColSpan: 12,
  },
};

export const formDefRequiredRepeatingText2Var: RecordFormSchema = {
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
            name: 'title',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'titleTextVarText',
              body: 'titleTextVarDefText',
            },
            label: 'titleTextVarText',
            placeholder: 'titleInfoVarText2',
            showLabel: true,
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1.7976931348623157e308,
            },
            childStyle: [''],
            gridColSpan: 12,
          },
        ],
        presentationStyle: '',
        childStyle: [''],
        gridColSpan: 12,
      },
    ],
    presentationStyle: '',
    childStyle: [''],
    gridColSpan: 12,
  },
};

export const formDefTextVarsWithSameNameInData: RecordFormSchema = {
  validationTypeId: 'nationalSubjectCategory',
  form: {
    name: 'nationalSubjectCategory',
    type: 'group',
    mode: 'input',
    tooltip: {
      title: 'nationalSubjectCategoryRecordTypeNewGroupText',
      body: 'nationalSubjectCategoryRecordTypeNewGroupDefText',
    },
    label: 'nationalSubjectCategoryRecordTypeNewGroupText',
    showLabel: true,
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    components: [
      {
        name: 'recordInfo',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'recordInfoNationalSubjectCategoryRecordTypeNewGroupText',
          body: 'recordInfoNationalSubjectCategoryRecordTypeNewGroupDefText',
        },
        label: 'recordInfoNationalSubjectCategoryRecordTypeNewGroupText',
        showLabel: false,
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 1,
          repeatMax: 1,
        },
        presentationStyle: '',
        childStyle: [''],
        gridColSpan: 12,
      },
      {
        name: 'subject',
        type: 'textVariable',
        mode: 'input',
        inputType: 'input',
        tooltip: {
          title: 'subjectSweTextVarText',
          body: 'subjectSweTextVarDefText',
        },
        label: 'subjectSweTextVarText',
        placeholder: 'subjectSweTextVarText',
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
        attributes: [
          {
            name: 'language',
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
            finalValue: 'swe',
          },
        ],
        childStyle: [''],
        gridColSpan: 12,
      },
      {
        name: 'subject',
        type: 'textVariable',
        mode: 'input',
        inputType: 'input',
        tooltip: {
          title: 'subjectEngTextVarText',
          body: 'subjectEngTextVarDefText',
        },
        label: 'subjectEngTextVarText',
        placeholder: 'subjectEngTextVarText',
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
        attributes: [
          {
            name: 'language',
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
            finalValue: 'eng',
          },
        ],
        childStyle: [''],
        gridColSpan: 12,
      },
    ],
    presentationStyle: '',
    childStyle: [''],
    gridColSpan: 12,
  },
};

export const formDefWithOneRepeatingTextVariable: RecordFormSchema = {
  validationTypeId: 'someValidationTypeId',
  form: {
    showLabel: true,
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
    components: [
      {
        type: 'text',
        name: 'presentationTypeTextCollectionVarDefText',
      },
      {
        type: 'textVariable',
        name: 'someNameInData',
        placeholder: 'someEmptyTextId',
        repeat: {
          minNumberOfRepeatingToShow: 3,
          repeatMin: 1,
          repeatMax: 3,
        },
        validation: {
          type: 'regex',
          pattern: '^[a-zA-Z]$',
        },
        inputType: 'input',
      },
    ],
    mode: 'input',
  },
};

export const formDefWithTwoRepeatingVarsAndCollectionVar: RecordFormSchema = {
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
    mode: 'input',
    components: [
      {
        type: 'text',
        name: 'presentationTypeTextCollectionVarDefText',
      },
      {
        type: 'textVariable',
        name: 'someNameInData',
        label: 'someLabelTextId',
        placeholder: 'someEmptyTextId',
        repeat: {
          repeatMin: 0,
          repeatMax: 2,
        },
        validation: {
          type: 'regex',
          pattern: '^[a-zA-Z]$',
        },
        inputType: 'input',
      },
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
          repeatMax: 5,
        },
      },
      {
        type: 'collectionVariable',
        name: 'colour',
        placeholder: 'emptyTextId',
        tooltip: {
          title: 'exampleCollectionVarText',
          body: 'exampleCollectionVarDefText',
        },
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
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
};

export const formDefWithTwoTextVariableWithModeOutput: RecordFormSchema = {
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
        name: 'someTextVar',
        type: 'textVariable',
        mode: 'output',
        inputType: 'input',
        tooltip: {
          title: 'exampleMetadataTextVarText',
          body: 'exampleMetadataTextVarDefText',
        },
        label: 'someMetadataTextVarText',
        validation: {
          type: 'regex',
          pattern: '.*',
        },
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
      {
        name: 'someOtherTextVar',
        type: 'textVariable',
        mode: 'output',
        inputType: 'input',
        tooltip: {
          title: 'exampleMetadataTextVarText',
          body: 'exampleMetadataTextVarDefText',
        },
        label: 'someMetadataOtherTextVarText',
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
    mode: 'output',
  },
};
