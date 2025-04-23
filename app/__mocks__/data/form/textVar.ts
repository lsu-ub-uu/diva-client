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

export const formDefWithTextVar: RecordFormSchema = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    presentationId: 'someRootNameInDataGroup',
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
        presentationId: 'presentationTypeTextCollectionVarDefText',
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
        presentationId: 'someNameInDataVar',
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
        presentationId: 'someNumberVariableNameInDataNumVar',
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
    presentationId: 'somePGroup',
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
        presentationId: 'someTextPVar',
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
        presentationId: 'someTextPVar',

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
      presentationId: 'somePGroup',
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
          presentationId: 'exampleTextVar',
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
    presentationId: 'someRootNameInDataPGroup',
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
        presentationId: 'someNameInData',
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
    presentationId: 'someRootNameInDataPGroup',
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
        presentationId: 'someNameInDataVar',
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
    presentationId: 'someRootNameInDataGroup',
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
        presentationId: 'someNameInDataVar',
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
    presentationId: 'someRootNameInDataGroup',
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
        presentationId: 'presentationTypeTextCollectionVarDefText',
      },
      {
        type: 'textVariable',
        name: 'someNameInData',
        presentationId: 'someNameInDataVar',
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
      presentationId: 'someRootNameInDataGroup',
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
          presentationId: 'presentationTypeTextCollectionVarDefText',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
        },
        {
          type: 'textVariable',
          mode: 'input',
          presentationId: 'someNameInDataPVar',
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
      presentationId: 'someRootNameInDataGroup',
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
          presentationId: 'presentationTypeTextCollectionVarDefText',
        },
        {
          type: 'textVariable',
          mode: 'input',
          name: 'someNameInData',
          placeholder: 'someEmptyTextId',
          presentationId: 'someNameInDataVar',
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
    presentationId: 'outputGroup',
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
        presentationId: 'languageGroup',
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
            presentationId: 'titlePVar',
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
            childStyle: [],
            gridColSpan: 12,
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

export const formDefRequiredRepeatingText2Var: RecordFormSchema = {
  validationTypeId: 'diva-output',
  form: {
    name: 'output',
    presentationId: 'ouputPGroup',
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
        presentationId: 'somePGroup',
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
            presentationId: 'someTextPVar',
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
            childStyle: [],
            gridColSpan: 12,
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

export const formDefTextVarsWithSameNameInData: RecordFormSchema = {
  validationTypeId: 'nationalSubjectCategory',
  form: {
    name: 'nationalSubjectCategory',
    presentationId: 'somePGroup',
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
        presentationId: 'somePGroup',
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
        childStyle: [],
        gridColSpan: 12,
      },
      {
        name: 'subject',
        presentationId: 'someTextPVar',
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
            presentationId: 'someFakeId',
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
        childStyle: [],
        gridColSpan: 12,
      },
      {
        name: 'subject',
        presentationId: 'someTextPVar',
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
            presentationId: 'someFakeId',
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
        childStyle: [],
        gridColSpan: 12,
      },
    ],
    presentationStyle: '',
    childStyle: [],
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
    presentationId: 'someRootNameInDataPGroup',
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
        presentationId: 'someText',
      },
      {
        type: 'textVariable',
        name: 'someNameInData',
        presentationId: 'somePVar',
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
    presentationId: 'someRootNameInDataPGroup',
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
        presentationId: 'presentationTypeTextCollectionVarDefText',
      },
      {
        type: 'textVariable',
        presentationId: 'someTextPVar',
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
        presentationId: 'someNumberPVar',
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
        presentationId: 'someCollectionPVar',
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
    presentationId: 'somePGroup',
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
        presentationId: 'someTextPVar',
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
        presentationId: 'someTextPVar',
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
