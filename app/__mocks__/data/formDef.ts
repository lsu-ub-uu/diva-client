import type {
  FormComponentGroup,
  FormComponentWithData,
  RecordFormSchema,
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
      },
    ],
    mode: 'input',
  },
};

export const formDefWithHiddenInputs: RecordFormSchema = {
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
        type: 'textVariable',
        name: 'someNameInData',
        placeholder: 'someEmptyTextId',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        validation: {
          type: 'regex',
          pattern: '.?',
        },
        inputType: 'input',
      },
      {
        type: 'hidden',
        name: 'role.roleTerm',
        finalValue: 'pbl',
      },
    ],
    mode: 'input',
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
export const formDefForCheckTextValue: RecordFormSchema = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    showLabel: true,
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
      minNumberOfRepeatingToShow: 1,
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
        showLabel: true,
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
          minNumberOfRepeatingToShow: 1,
        },
      },
      {
        name: 'someOtherTextVar',
        type: 'textVariable',
        mode: 'output',
        showLabel: true,
        inputType: 'input',
        tooltip: {
          title: 'exampleMetadataTextVarText',
          body: 'exampleMetadataTextVarDefText',
        },
        label: 'someOtherMetadataTextVarText',
        validation: {
          type: 'regex',
          pattern: '.*',
        },
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
          minNumberOfRepeatingToShow: 1,
        },
      },
    ],
    mode: 'output',
  },
};

export const formDefForCheckNumberValue: RecordFormSchema = {
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
        name: 'someTextVar',
        type: 'textVariable',
        mode: 'output',
        inputType: 'input',
        showLabel: true,
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
        name: 'someNumberVar',
        type: 'numberVariable',
        mode: 'output',
        inputType: 'input',
        showLabel: true,
        tooltip: {
          title: 'exampleMetadataTextVarText',
          body: 'exampleMetadataTextVarDefText',
        },
        label: 'someMetadataNumberVarText',
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
    mode: 'output',
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
      },
      {
        type: 'textVariable',
        name: 'someNameInData2',
        label: 'label2',
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

export const formDefWithOneNumberVariableAndGuiElementLink: RecordFormSchema = {
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
          repeatMin: 1,
          repeatMax: 1,
        },
      },
      {
        type: 'guiElementLink',
        name: 'pSomeGuiElementLinkId',
        url: 'http://www.google.se',
        elementText: 'demoTestLinkGuiElementText',
        presentAs: 'link',
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
      },
    ],
    mode: 'input',
  },
};

export const formDefWithOneCollectionVariable: RecordFormSchema = {
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
        name: 'colour',
        type: 'collectionVariable',
        label: 'Colour',
        placeholder: 'initialEmptyValueText',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        mode: 'input',
        tooltip: {
          title: 'exampleCollectionVarText',
          body: 'exampleCollectionVarDefText',
        },
        options: [
          {
            value: 'blue',
            label: 'exampleBlueItemText',
          },
          {
            value: 'pink',
            label: 'examplePinkItemText',
          },
          {
            value: 'yellow',
            label: 'exampleYellowItemText',
          },
        ],
      },
    ],
    mode: 'input',
  },
};
export const formDefWithOneCollectionVariableWithModeOutput: RecordFormSchema =
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
          name: 'colour',
          type: 'collectionVariable',
          label: 'Colour',
          placeholder: 'initialEmptyValueText',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          mode: 'output',
          tooltip: {
            title: 'exampleCollectionVarText',
            body: 'exampleCollectionVarDefText',
          },
          options: [
            {
              value: 'blue',
              label: 'exampleBlueItemText',
            },
            {
              value: 'pink',
              label: 'examplePinkItemText',
            },
            {
              value: 'yellow',
              label: 'exampleYellowItemText',
            },
          ],
        },
      ],
      mode: 'input',
    },
  };

export const formDefWithOneNumberVariableWithAttributeCollection: RecordFormSchema =
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
          name: 'someNameInDataNumberWithAttributeVar',
          label: 'test',
          placeholder: 'someEmptyTextId',
          showLabel: true,
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          tooltip: {
            title: 'someNumberVarTextId',
            body: 'someNumberVarDefTextId',
          },
          attributes: [
            {
              type: 'collectionVariable',
              name: 'colour',
              showLabel: true,
              label: 'attribute colour',
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
      ],
      mode: 'input',
    },
  };

export const formDefWithOneOptionalGroupWithTextVariableAndAttributeCollection: RecordFormSchema =
  {
    validationTypeId: 'thesisManuscript',
    form: {
      name: 'divaOutput',
      type: 'group',
      mode: 'input',
      tooltip: {
        title: 'thesisManuscriptNewGroupText',
        body: 'thesisManuscriptNewGroupDefText',
      },
      label: 'thesisManuscriptNewGroupText',
      headlineLevel: 'h1',
      showLabel: true,
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      components: [
        {
          name: 'author',
          type: 'group',
          mode: 'input',
          tooltip: {
            title: 'authorGroupText',
            body: 'authorGroupDefText',
          },
          label: 'authorGroupText',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308,
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
                  value: 'aar',
                  label: 'aarLangItemText',
                },
              ],
            },

            {
              name: 'titleType',
              type: 'collectionVariable',
              placeholder: 'initialEmptyValueText',
              mode: 'input',
              tooltip: {
                title: 'languageCollectionVarText',
                body: 'languageCollectionVarDefText',
              },
              label: 'titleTypeCollectionVarText',
              showLabel: true,
              options: [
                {
                  value: 'type',
                  label: 'alternativeTitleItemText',
                },
              ],
            },
          ],
          components: [
            {
              name: 'givenName',
              type: 'textVariable',
              mode: 'input',
              inputType: 'input',
              tooltip: {
                title: 'givenNameTextVarText',
                body: 'givenNameTextVarDefText',
              },
              label: 'givenNameTextVarText',
              placeholder: 'givenNameTextVarText',
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

export const formDefWithOneOptionalGroupWithOneOptionalGroupWithTextVariableAndAttributeCollection: RecordFormSchema =
  {
    validationTypeId: 'thesisManuscript',
    form: {
      name: 'divaOutput',
      type: 'group',
      mode: 'input',
      tooltip: {
        title: 'thesisManuscriptNewGroupText',
        body: 'thesisManuscriptNewGroupDefText',
      },
      label: 'thesisManuscriptNewGroupText',
      headlineLevel: 'h1',
      showLabel: true,
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      components: [
        {
          type: 'group',
          label: 'someChildGroupTextId',
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
              name: 'alternativeTitle',
              type: 'group',
              mode: 'input',
              tooltip: {
                title: 'alternativeTitleGroupText',
                body: 'alternativeTitleGroupDefText',
              },
              label: 'alternativeTitleGroupText',
              showLabel: true,
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 0,
                repeatMax: 1,
              },
              attributes: [
                {
                  name: 'language',
                  type: 'collectionVariable',
                  placeholder: 'languagePlaceholderText',
                  mode: 'input',
                  tooltip: {
                    title: 'languageCollectionVarText',
                    body: 'languageCollectionVarDefText',
                  },
                  label: 'languageCollectionVarText',
                  showLabel: true,
                  options: [
                    {
                      value: 'aar',
                      label: 'aarLangItemText',
                    },
                  ],
                },
                {
                  name: 'titleType',
                  type: 'collectionVariable',
                  placeholder: 'titleTypePlaceholderText',
                  mode: 'input',
                  tooltip: {
                    title: 'titleTypeCollectionVarText',
                    body: 'titleTypeCollectionVarDefText',
                  },
                  label: 'titleTypeCollectionVarText',
                  showLabel: true,
                  options: [
                    {
                      value: 'alternativeTitle',
                      label: 'alternativeTitleItemText',
                    },
                    {
                      value: 'translatedTitle',
                      label: 'translatedTitleItemText',
                    },
                    {
                      value: 'abbreviatedTitle',
                      label: 'abbreviatedTitleItemText',
                    },
                    {
                      value: 'uniformTitle',
                      label: 'uniformTitleItemText',
                    },
                  ],
                },
              ],
              components: [
                {
                  name: 'mainTitle',
                  type: 'textVariable',
                  mode: 'input',
                  inputType: 'input',
                  tooltip: {
                    title: 'mainTitleTextVarText',
                    body: 'mainTitleTextVarDefText',
                  },
                  label: 'mainTitleTextVarText',
                  placeholder: 'mainTitleTextVarPlaceholderText',
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
                  childStyle: [''],
                  gridColSpan: 12,
                },
              ],
              presentationStyle: '',
              childStyle: [''],
              gridColSpan: 12,
            },
          ],
          mode: 'input',
        },
      ],

      presentationStyle: '',
      childStyle: [''],
      gridColSpan: 12,
    },
  };

export const formDefWithOneNumberVariableAndOptionalNumberVariableWithAttributeCollection: RecordFormSchema =
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
          name: 'numberVar1',
          type: 'numberVariable',
          mode: 'input',
          tooltip: {
            title: 'keepThisNumberVarText',
            body: 'keepThisNumberVarDefText',
          },
          label: 'someNumberVarIdLabel',
          placeholder: 'someNumberVarIdPlaceholder',
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
        },
        {
          type: 'numberVariable',
          name: 'numberVar2',
          label: 'someNumberVar2IdLabel',
          placeholder: 'someNumberVar2IdPlaceholder',
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          tooltip: {
            title: 'someNumberVarTextId',
            body: 'someNumberVarDefTextId',
          },
          attributes: [
            {
              type: 'collectionVariable',
              name: 'colour',
              showLabel: true,
              label: 'someNumberVar2AttributeLabel',
              placeholder: 'someNumberVar2AttributeId',
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
      ],
      mode: 'input',
    },
  };

export const formDefWithOneOptionalNumberVariableWithAttributeCollection: RecordFormSchema =
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
          name: 'numberVar2',
          label: 'someNumberVar2IdLabel',
          placeholder: 'someNumberVar2IdPlaceholder',
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          tooltip: {
            title: 'someNumberVarTextId',
            body: 'someNumberVarDefTextId',
          },
          attributes: [
            {
              type: 'collectionVariable',
              name: 'colour',
              showLabel: true,
              label: 'someNumberVar2AttributeLabel',
              placeholder: 'someNumberVar2AttributeId',
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
      ],
      mode: 'input',
    },
  };

export const formDefWithOneRequiredNumberVariableWithAttributeCollection: RecordFormSchema =
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
          name: 'abstract',
          label: 'someNumberVar2IdLabel',
          placeholder: 'someNumberVar2IdPlaceholder',
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 1,
            repeatMax: 1,
          },
          tooltip: {
            title: 'someNumberVarTextId',
            body: 'someNumberVarDefTextId',
          },
          attributes: [
            {
              type: 'collectionVariable',
              name: 'colour',
              showLabel: true,
              label: 'someNumberVar2AttributeLabel',
              placeholder: 'someNumberVar2AttributeId',
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
      ],
      mode: 'input',
    },
  };

export const formDefWithOneOptionalGroupWithAttributeCollection: RecordFormSchema =
  {
    validationTypeId: 'thesisManuscript',
    form: {
      name: 'divaOutput',
      type: 'group',
      mode: 'input',
      tooltip: {
        title: 'thesisManuscriptNewGroupText',
        body: 'thesisManuscriptNewGroupDefText',
      },
      label: 'thesisManuscriptNewGroupText',
      headlineLevel: 'h1',
      showLabel: true,
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
        minNumberOfRepeatingToShow: 1,
      },
      components: [
        {
          name: 'alternativeTitle',
          type: 'group',
          mode: 'input',
          tooltip: {
            title: 'alternativeTitleGroupText',
            body: 'alternativeTitleGroupDefText',
          },
          label: 'alternativeTitleGroupText',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
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
                  value: 'aar',
                  label: 'aarLangItemText',
                },
              ],
            },
          ],
          components: [
            {
              name: 'mainTitle',
              type: 'textVariable',
              mode: 'input',
              placeholder: 'mainTitleTextVarPlaceholderText',
              inputType: 'input',
              tooltip: {
                title: 'mainTitleTextVarText',
                body: 'mainTitleTextVarDefText',
              },
              label: 'mainTitleTextVarText',
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

export const formDefWithOneRequiredGroupWithAttributeCollection: RecordFormSchema =
  {
    validationTypeId: 'divaOutput',
    form: {
      name: 'divaOutput',
      type: 'group',
      mode: 'input',
      tooltip: {
        title: 'divaOutputGroupText',
        body: 'divaOutputGroupDefText',
      },
      label: 'divaOutputGroupText',
      headlineLevel: 'h1',
      showLabel: true,
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      components: [
        {
          name: 'title',
          type: 'group',
          mode: 'input',
          tooltip: {
            title: 'titleGroupText',
            body: 'titleGroupDefText',
          },
          label: 'titleGroupText',
          showLabel: true,
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
                  value: 'aar',
                  label: 'aarLangItemText',
                },
              ],
            },
          ],
          components: [
            {
              name: 'mainTitle',
              type: 'textVariable',
              mode: 'input',
              inputType: 'input',
              tooltip: {
                title: 'mainTitleTextVarText',
                body: 'mainTitleTextVarDefText',
              },
              label: 'mainTitleTextVarText',
              placeholder: 'mainTitleTextVarPlaceholderText',
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
              childStyle: [''],
              gridColSpan: 12,
            },
            {
              name: 'subtitle',
              type: 'textVariable',
              mode: 'input',
              inputType: 'input',
              tooltip: {
                title: 'subtitleTextVarText',
                body: 'subtitleTextVarPlaceholderText',
              },
              label: 'subtitleTextVarText',
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

export const formDefWithOneOptionalGroupWithAttributeCollectionAndTextVarWithAttribute: RecordFormSchema =
  {
    validationTypeId: 'thesisManuscript',
    form: {
      name: 'divaOutput',
      type: 'group',
      mode: 'input',
      tooltip: {
        title: 'thesisManuscriptNewGroupText',
        body: 'thesisManuscriptNewGroupDefText',
      },
      label: 'thesisManuscriptNewGroupText',
      headlineLevel: 'h1',
      showLabel: true,
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      components: [
        {
          name: 'alternativeTitle',
          type: 'group',
          mode: 'input',
          tooltip: {
            title: 'alternativeTitleGroupText',
            body: 'alternativeTitleGroupDefText',
          },
          label: 'alternativeTitleGroupText',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          attributes: [
            {
              name: 'language',
              type: 'collectionVariable',
              placeholder: 'someTitleGroupPlaceholderText',
              mode: 'input',
              tooltip: {
                title: 'someTooltipGroupText',
                body: 'someTooltipGroupDefText',
              },
              label: 'someTitleGroupText',
              showLabel: true,
              options: [
                {
                  value: 'aar',
                  label: 'aarLangItemText',
                },
              ],
            },
          ],
          components: [
            {
              name: 'mainTitle',
              type: 'textVariable',
              mode: 'input',
              placeholder: 'mainTitleTextVarPlaceholderText',
              inputType: 'input',
              tooltip: {
                title: 'mainTitleTextVarText',
                body: 'mainTitleTextVarDefText',
              },
              attributes: [
                {
                  type: 'collectionVariable',
                  name: 'eyeColour',
                  placeholder: 'Select eye colour',
                  showLabel: true,
                  tooltip: {
                    title: 'Eye colour',
                    body: 'state the author eye colour',
                  },
                  label: 'Eye colour',
                  options: [
                    { value: 'blue', label: 'exampleBlueItemText' },
                    { value: 'pink', label: 'examplePinkItemText' },
                    { value: 'yellow', label: 'exampleYellowItemText' },
                  ],
                  mode: 'input',
                },
              ],
              label: 'mainTitleTextVarText',
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

export const formDefWithOneGroupHavingTextVariableAsChild: RecordFormSchema = {
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
        type: 'group',
        label: 'someChildGroupTextId',
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
              pattern: '(^[0-9A-ZÅÄÖ a-zåäö:-_]{3,50}$)',
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
};

export const formDefRealDemo: RecordFormSchema = {
  validationTypeId: 'demo',
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
        name: 'recordInfo',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'recordInfoText',
          body: 'recordInfoDefText',
        },
        label: 'recordInfoText',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
      {
        name: 'bookTitle',
        type: 'textVariable',
        mode: 'input',
        inputType: 'input',
        tooltip: {
          title: 'bookTitletextVarText',
          body: 'bookTitletextVarDefText',
        },
        label: 'bookTitletextVarText',
        validation: {
          type: 'regex',
          pattern: '(^[0-9A-ZÅÄÖ a-zåäö:-_]{2,50}$)',
        },
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
      {
        name: 'keeptHis',
        type: 'numberVariable',
        mode: 'input',
        tooltip: {
          title: 'keepThisNumberVarText',
          body: 'keepThisNumberVarDefText',
        },
        label: 'keepThisNumberVarText',
        validation: {
          type: 'number',
          min: 0,
          max: 20,
          warningMin: 2,
          warningMax: 10,
          numberOfDecimals: 0,
        },
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0,
          repeatMax: 1,
        },
      },
      {
        name: 'firstChildGroup',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'exampleFirstChildGroupText',
          body: 'exampleFirstChildGroupDefText',
        },
        label: 'exampleFirstChildGroupText',
        repeat: {
          repeatMin: 1,
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
    ],
    mode: 'input',
  },
};

export const formDefRealDemoWithFinalValues: RecordFormSchema = {
  validationTypeId: 'demo',
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
        name: 'recordInfo',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'recordInfoText',
          body: 'recordInfoDefText',
        },
        label: 'recordInfoText',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
      {
        name: 'bookTitle',
        type: 'textVariable',
        mode: 'input',
        inputType: 'input',
        tooltip: {
          title: 'bookTitletextVarText',
          body: 'bookTitletextVarDefText',
        },
        label: 'bookTitletextVarText',
        validation: {
          type: 'regex',
          pattern: '(^[0-9A-ZÅÄÖ a-zåäö:-_]{2,50}$)',
        },
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        finalValue: 'someFinalValue',
      },
      {
        name: 'keeptHis',
        type: 'numberVariable',
        mode: 'input',
        tooltip: {
          title: 'keepThisNumberVarText',
          body: 'keepThisNumberVarDefText',
        },
        label: 'keepThisNumberVarText',
        validation: {
          type: 'number',
          min: 0,
          max: 20,
          warningMin: 2,
          warningMax: 10,
          numberOfDecimals: 0,
        },
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0,
          repeatMax: 1,
        },
        finalValue: '12',
      },
      {
        name: 'firstChildGroup',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'exampleFirstChildGroupText',
          body: 'exampleFirstChildGroupDefText',
        },
        label: 'exampleFirstChildGroupText',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        components: [
          {
            name: 'exampleNumberVar',
            type: 'numberVariable',
            finalValue: '55',
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
          {
            name: 'exampleTextVar',
            type: 'textVariable',
            finalValue: 'someText',
            mode: 'input',
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
              repeatMin: 1,
              repeatMax: 1,
            },
          },
        ],
      },
    ],
    mode: 'input',
  },
};

export const formDefRealDemoWithAttributesButWithoutFinalValue: RecordFormSchema =
  {
    validationTypeId: 'demo',
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
          name: 'recordInfo',
          type: 'group',
          mode: 'input',
          tooltip: {
            title: 'recordInfoText',
            body: 'recordInfoDefText',
          },
          label: 'recordInfoText',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
        },
        {
          name: 'bookTitle',
          type: 'textVariable',
          mode: 'input',
          inputType: 'input',
          tooltip: {
            title: 'bookTitletextVarText',
            body: 'bookTitletextVarDefText',
          },
          label: 'bookTitletextVarText',
          validation: {
            type: 'regex',
            pattern: '(^[0-9A-ZÅÄÖ a-zåäö:-_]{2,50}$)',
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
        {
          name: 'keeptHis',
          type: 'numberVariable',
          mode: 'input',
          tooltip: {
            title: 'keepThisNumberVarText',
            body: 'keepThisNumberVarDefText',
          },
          label: 'keepThisNumberVarText',
          validation: {
            type: 'number',
            min: 0,
            max: 20,
            warningMin: 2,
            warningMax: 10,
            numberOfDecimals: 0,
          },
          repeat: {
            minNumberOfRepeatingToShow: 2,
            repeatMin: 0,
            repeatMax: 2,
          },
          attributes: [
            {
              type: 'collectionVariable',
              showLabel: true,
              name: 'colour',
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
        {
          name: 'firstChildGroup',
          type: 'group',
          mode: 'input',
          tooltip: {
            title: 'exampleFirstChildGroupText',
            body: 'exampleFirstChildGroupDefText',
          },
          label: 'exampleFirstChildGroupText',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          attributes: [
            {
              type: 'collectionVariable',
              name: 'groupColour',
              showLabel: true,
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
            {
              type: 'collectionVariable',
              name: 'groupColourAgain',
              placeholder: 'emptyTextId',
              showLabel: true,
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
                  placeholder: 'emptyTextId',
                  showLabel: true,
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
                  name: 'colourAgain',
                  showLabel: true,
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
    },
  };

export const formDefRealDemoWithAttributes: RecordFormSchema = {
  validationTypeId: 'demo',
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
        name: 'recordInfo',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'recordInfoText',
          body: 'recordInfoDefText',
        },
        label: 'recordInfoText',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
      {
        name: 'bookTitle',
        type: 'textVariable',
        mode: 'input',
        inputType: 'input',
        tooltip: {
          title: 'bookTitletextVarText',
          body: 'bookTitletextVarDefText',
        },
        label: 'bookTitletextVarText',
        validation: {
          type: 'regex',
          pattern: '(^[0-9A-ZÅÄÖ a-zåäö:-_]{2,50}$)',
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
      {
        name: 'keeptHis',
        type: 'numberVariable',
        mode: 'input',
        tooltip: {
          title: 'keepThisNumberVarText',
          body: 'keepThisNumberVarDefText',
        },
        label: 'keepThisNumberVarText',
        validation: {
          type: 'number',
          min: 0,
          max: 20,
          warningMin: 2,
          warningMax: 10,
          numberOfDecimals: 0,
        },
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0,
          repeatMax: 1,
        },
        attributes: [
          {
            type: 'collectionVariable',
            name: 'colour',
            showLabel: true,
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
      {
        name: 'firstChildGroup',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'exampleFirstChildGroupText',
          body: 'exampleFirstChildGroupDefText',
        },
        label: 'exampleFirstChildGroupText',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        attributes: [
          {
            type: 'collectionVariable',
            name: 'groupColour',
            placeholder: 'emptyTextId',
            showLabel: true,
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
            name: 'groupColourAgain',
            showLabel: true,
            finalValue: 'pink',
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
          {
            name: 'exampleTextVar',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            finalValue: 'exampleFinalValue',
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
              repeatMin: 1,
              repeatMax: 1,
            },
            attributes: [
              {
                type: 'collectionVariable',
                name: 'colour',
                placeholder: 'emptyTextId',
                showLabel: true,
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
                name: 'colourAgain',
                finalValue: 'pink',
                placeholder: 'emptyTextId',
                showLabel: true,
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
  },
};

export const formDefRealDemoWithRepeatingVars: RecordFormSchema = {
  validationTypeId: 'demo',
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
        name: 'recordInfo',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'recordInfoText',
          body: 'recordInfoDefText',
        },
        label: 'recordInfoText',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
      {
        name: 'bookTitle',
        type: 'textVariable',
        mode: 'input',
        inputType: 'input',
        tooltip: {
          title: 'bookTitletextVarText',
          body: 'bookTitletextVarDefText',
        },
        label: 'bookTitletextVarText',
        validation: {
          type: 'regex',
          pattern: '(^[0-9A-ZÅÄÖ a-zåäö:-_]{2,50}$)',
        },
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
      {
        name: 'keeptHis',
        type: 'numberVariable',
        mode: 'input',
        tooltip: {
          title: 'keepThisNumberVarText',
          body: 'keepThisNumberVarDefText',
        },
        label: 'keepThisNumberVarText',
        validation: {
          type: 'number',
          min: 0,
          max: 20,
          warningMin: 2,
          warningMax: 10,
          numberOfDecimals: 0,
        },
        repeat: {
          minNumberOfRepeatingToShow: 5,
          repeatMin: 0,
          repeatMax: 5,
        },
        attributes: [
          {
            type: 'collectionVariable',
            name: 'colour',
            placeholder: 'emptyTextId',
            finalValue: 'blue',
            showLabel: true,
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
      {
        name: 'firstChildGroup',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'exampleFirstChildGroupText',
          body: 'exampleFirstChildGroupDefText',
        },
        label: 'exampleFirstChildGroupText',
        repeat: {
          repeatMin: 1,
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
              minNumberOfRepeatingToShow: 5,
              repeatMin: 1,
              repeatMax: 5,
            },
            attributes: [
              {
                type: 'collectionVariable',
                name: 'colour',
                placeholder: 'emptyTextId',
                finalValue: 'pink',
                showLabel: true,
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
            validation: {
              type: 'regex',
              pattern: '.*',
            },
            repeat: {
              repeatMin: 0,
              repeatMax: 2,
            },
          },
        ],
      },
    ],
  },
};

export const formDefRealDemoWithRepeatingGroups: RecordFormSchema = {
  validationTypeId: 'demo',
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
        name: 'recordInfo',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'recordInfoText',
          body: 'recordInfoDefText',
        },
        label: 'recordInfoText',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
      {
        name: 'bookTitle',
        type: 'textVariable',
        mode: 'input',
        inputType: 'input',
        tooltip: {
          title: 'bookTitletextVarText',
          body: 'bookTitletextVarDefText',
        },
        label: 'bookTitletextVarText',
        validation: {
          type: 'regex',
          pattern: '(^[0-9A-ZÅÄÖ a-zåäö:-_]{2,50}$)',
        },
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
      {
        name: 'keeptHis',
        type: 'numberVariable',
        mode: 'input',
        tooltip: {
          title: 'keepThisNumberVarText',
          body: 'keepThisNumberVarDefText',
        },
        label: 'keepThisNumberVarText',
        validation: {
          type: 'number',
          min: 0,
          max: 20,
          warningMin: 2,
          warningMax: 10,
          numberOfDecimals: 0,
        },
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0,
          repeatMax: 1,
        },
      },
      {
        name: 'firstChildGroup',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'exampleFirstChildGroupText',
          body: 'exampleFirstChildGroupDefText',
        },
        label: 'exampleFirstChildGroupText',
        repeat: {
          minNumberOfRepeatingToShow: 2,
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
    ],
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

export const formDefWithRepeatingCollectionVar: RecordFormSchema = {
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
        type: 'collectionVariable',
        name: 'colour',
        placeholder: 'emptyTextId',
        tooltip: {
          title: 'exampleCollectionVarText',
          body: 'exampleCollectionVarDefText',
        },
        repeat: {
          repeatMin: 0,
          repeatMax: 3,
        },
        options: [
          { value: 'blue', label: 'exampleBlueItemText' },
          { value: 'pink', label: 'examplePinkItemText' },
          { value: 'yellow', label: 'exampleYellowItemText' },
          { value: 'green', label: 'exampleGreenItemText' },
        ],
        mode: 'input',
      },
    ],
  },
};

export const formDefWithRepeatingGroup: RecordFormSchema = {
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
        name: 'firstChildGroup',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'exampleFirstChildGroupText',
          body: 'exampleFirstChildGroupDefText',
        },
        label: 'exampleFirstChildGroupText',
        repeat: {
          minNumberOfRepeatingToShow: 0,
          repeatMin: 0,
          repeatMax: 10,
        },
        components: [
          {
            type: 'text',
            name: 'presentationTypeTextCollectionVarDefText',
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
            validation: {
              type: 'number',
              min: 0,
              max: 20,
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
      },
    ],
  },
};

export const formDefWithRepeatingGroupWithRepeatingChildGroup: RecordFormSchema =
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
      mode: 'input',
      components: [
        {
          name: 'author',
          type: 'group',
          mode: 'input',
          tooltip: {
            title: 'authorGroupText',
            body: 'authorGroupDefText',
          },
          label: 'authorGroupText',
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 1,
            repeatMax: 10,
          },
          components: [
            {
              name: 'name',
              type: 'group',
              mode: 'input',
              tooltip: {
                title: 'exampleFirstChildGroupText',
                body: 'exampleFirstChildGroupDefText',
              },
              label: 'exampleFirstChildGroupText',
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 100,
              },
              components: [
                {
                  name: 'shouldBeSkippedComponent',
                  type: 'text',
                },
                {
                  name: 'firstName',
                  type: 'textVariable',
                  mode: 'input',
                  tooltip: {
                    title: 'exampleMetadataVarText',
                    body: 'exampleMetadataVarDefText',
                  },
                  label: 'firstName',
                  validation: {
                    type: 'regex',
                    pattern: '^[a-zA-Z]$',
                  },
                  repeat: {
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                },
                {
                  name: 'lastName',
                  type: 'textVariable',
                  mode: 'input',
                  inputType: 'input',
                  tooltip: {
                    title: 'exampleMetadataTextVarText',
                    body: 'exampleMetadataTextVarDefText',
                  },
                  label: 'exampleMetadataTextVarText',
                  validation: {
                    type: 'regex',
                    pattern: '^[a-zA-Z]$',
                  },
                  repeat: {
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                },
                {
                  type: 'numberVariable',
                  name: 'age',
                  placeholder: 'someNumberPlaceholderTextId',
                  validation: {
                    type: 'number',
                    min: 0,
                    max: 125,
                    warningMin: 50,
                    warningMax: 100,
                    numberOfDecimals: 0,
                  },
                  repeat: {
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  };

export const formDefWithRepeatingGroupWithRepeatingChildGroupWithAttributes: RecordFormSchema =
  {
    validationTypeId: 'someValidationTypeId',
    form: {
      type: 'group',
      showLabel: false,
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
          name: 'author',
          type: 'group',
          mode: 'input',
          tooltip: {
            title: 'authorGroupText',
            body: 'authorGroupDefText',
          },
          label: 'authorGroupText',
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 1,
            repeatMax: 10,
          },
          attributes: [
            {
              type: 'collectionVariable',
              name: 'colourAttribute',
              placeholder: 'emptyTextId',
              showLabel: true,
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
              name: 'name',
              type: 'group',
              mode: 'input',
              tooltip: {
                title: 'exampleFirstChildGroupText2',
                body: 'exampleFirstChildGroupDefText2',
              },
              label: 'exampleFirstChildGroupText',
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 100,
              },
              components: [
                {
                  name: 'shouldBeSkippedComponent12',
                  type: 'text',
                },
                {
                  name: 'firstName',
                  type: 'textVariable',
                  mode: 'input',
                  tooltip: {
                    title: 'exampleMetadataVarText',
                    body: 'exampleMetadataVarDefText',
                  },
                  label: 'firstName',
                  validation: {
                    type: 'regex',
                    pattern: '^[a-zA-Z]$',
                  },
                  repeat: {
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                  attributes: [
                    {
                      type: 'collectionVariable',
                      name: 'colourAttribute',
                      placeholder: 'emptyTextId',
                      showLabel: true,
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
                {
                  name: 'lastName',
                  type: 'textVariable',
                  mode: 'input',
                  inputType: 'input',
                  tooltip: {
                    title: 'exampleMetadataTextVarText',
                    body: 'exampleMetadataTextVarDefText',
                  },
                  label: 'exampleMetadataTextVarText',
                  validation: {
                    type: 'regex',
                    pattern: '^[a-zA-Z]$',
                  },
                  repeat: {
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                },
                {
                  type: 'numberVariable',
                  name: 'age',
                  placeholder: 'someNumberPlaceholderTextId',
                  validation: {
                    type: 'number',
                    min: 0,
                    max: 125,
                    warningMin: 50,
                    warningMax: 100,
                    numberOfDecimals: 0,
                  },
                  repeat: {
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          label: 'someChildGroupTextId',
          name: 'nonRepeatingGroup',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          tooltip: {
            title: 'someChildGroupTextId',
            body: 'someChildGroupDefTextId',
          },
          attributes: [
            {
              type: 'collectionVariable',
              name: 'groupAttribute',
              showLabel: true,
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
          components: [],
          mode: 'input',
        },
        {
          type: 'numberVariable',
          name: 'grade',
          placeholder: 'yourGrades',
          validation: {
            type: 'number',
            min: 1,
            max: 5,
            warningMin: 2,
            warningMax: 4,
            numberOfDecimals: 0,
          },
          attributes: [
            {
              type: 'collectionVariable',
              name: 'gradeAttribute',
              showLabel: true,
              placeholder: 'emptyTextId',
              tooltip: {
                title: 'exampleCollectionVarText',
                body: 'exampleCollectionVarDefText',
              },
              options: [
                { value: 'strong', label: 'someStrongLabelText' },
                { value: 'weak', label: 'someWeakLabelText' },
              ],
              mode: 'input',
            },
          ],
          repeat: {
            repeatMin: 1,
            repeatMax: 12,
          },
        },
      ],
    },
  };

export const formDefWithOptionalGroupWithRequiredTextVar: RecordFormSchema = {
  validationTypeId: 'thesisManuscript',
  form: {
    name: 'divaOutput',
    type: 'group',
    mode: 'input',
    tooltip: {
      title: 'thesisManuscriptNewGroupText',
      body: 'thesisManuscriptNewGroupDefText',
    },
    label: 'thesisManuscriptNewGroupText',
    headlineLevel: 'h1',
    showLabel: true,
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    components: [
      {
        name: 'alternativeTitle',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'alternativeTitleGroupText',
          body: 'alternativeTitleGroupDefText',
        },
        label: 'alternativeTitleGroupText',
        showLabel: true,
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0,
          repeatMax: 1,
        },
        components: [
          {
            name: 'mainTitle',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'mainTitleTextVarText',
              body: 'mainTitleTextVarDefText',
            },
            label: 'mainTitleTextVarText',
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

export const formDefWithOptionalGroupWithRequiredNumberVar: RecordFormSchema = {
  validationTypeId: 'thesisManuscript',
  form: {
    name: 'divaOutput',
    type: 'group',
    mode: 'input',
    tooltip: {
      title: 'thesisManuscriptNewGroupText',
      body: 'thesisManuscriptNewGroupDefText',
    },
    label: 'thesisManuscriptNewGroupText',
    headlineLevel: 'h1',
    showLabel: true,
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    components: [
      {
        name: 'alternativeTitle',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'alternativeTitleGroupText',
          body: 'alternativeTitleGroupDefText',
        },
        label: 'alternativeTitleGroupText',
        showLabel: true,
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0,
          repeatMax: 1,
        },
        components: [
          {
            type: 'numberVariable',
            name: 'someNameInDataNumberVar',
            label: 'someNumberVarTextId', // hidden
            showLabel: false,
            gridColSpan: 3,
            childStyle: ['threeChildStyle'],
            placeholder: 'someEmptyTextId',
            repeat: {
              repeatMin: 1,
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

export const formDefWithOptionalGroupWithRequiredRecordLink: RecordFormSchema =
  {
    validationTypeId: 'thesisManuscript',
    form: {
      name: 'divaOutput',
      type: 'group',
      mode: 'input',
      tooltip: {
        title: 'thesisManuscriptNewGroupText',
        body: 'thesisManuscriptNewGroupDefText',
      },
      label: 'thesisManuscriptNewGroupText',
      headlineLevel: 'h1',
      showLabel: true,
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      components: [
        {
          name: 'alternativeTitle',
          type: 'group',
          mode: 'input',
          tooltip: {
            title: 'alternativeTitleGroupText',
            body: 'alternativeTitleGroupDefText',
          },
          label: 'alternativeTitleGroupText',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          components: [
            {
              name: 'funder',
              type: 'recordLink',
              mode: 'input',
              tooltip: {
                title: 'funderLinkText',
                body: 'funderLinkDefText',
              },
              label: 'funderLinkText',
              showLabel: true,
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1,
              },
              childStyle: [''],
              gridColSpan: 12,
              recordLinkType: 'funder',
              presentationRecordLinkId: 'funderPLink',
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

export const formDefWithOptionalGroupWithNestedOptionalGroupWithTextVar: RecordFormSchema =
  {
    validationTypeId: 'thesisManuscript',
    form: {
      name: 'divaOutput',
      type: 'group',
      mode: 'input',
      tooltip: {
        title: 'thesisManuscriptNewGroupText',
        body: 'thesisManuscriptNewGroupDefText',
      },
      label: 'thesisManuscriptNewGroupText',
      headlineLevel: 'h1',
      showLabel: true,
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      components: [
        {
          name: 'polygon',
          type: 'group',
          mode: 'input',
          tooltip: {
            title: 'polygonGroupText',
            body: 'polygonGroupDefText',
          },
          label: 'polygonGroupText',
          showLabel: false,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          components: [
            {
              name: 'point',
              type: 'group',
              mode: 'input',
              tooltip: {
                title: 'pointGroupText',
                body: 'pointGroupDefText',
              },
              label: 'pointGroupText',
              headlineLevel: 'h3',
              showLabel: true,
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1.7976931348623157e308,
              },
              components: [
                {
                  name: 'longitude',
                  type: 'textVariable',
                  mode: 'input',
                  inputType: 'input',
                  tooltip: {
                    title: 'longitudeTextVarText',
                    body: 'longitudeTextVarDefText',
                  },
                  label: 'longitudeTextVarText',
                  showLabel: true,
                  validation: {
                    type: 'regex',
                    pattern:
                      '(^[-]{0,1}([0-9]|[1-9][0-9]|1[0-7][0-9]|180)\\.[0-9]{1,20}$)',
                  },
                  repeat: {
                    minNumberOfRepeatingToShow: 1,
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                  childStyle: ['sixChildStyle'],
                  gridColSpan: 6,
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
      ],
      presentationStyle: '',
      childStyle: [''],
      gridColSpan: 12,
    },
  };

export const formDefWithOptionalGroupWithMixOptionalAndRequiredTextVars: RecordFormSchema =
  {
    validationTypeId: 'thesisManuscript',
    form: {
      name: 'divaOutput',
      type: 'group',
      mode: 'input',
      tooltip: {
        title: 'thesisManuscriptNewGroupText',
        body: 'thesisManuscriptNewGroupDefText',
      },
      label: 'thesisManuscriptNewGroupText',
      headlineLevel: 'h1',
      showLabel: true,
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      components: [
        {
          name: 'point',
          type: 'group',
          mode: 'input',
          tooltip: {
            title: 'pointGroupText',
            body: 'pointGroupDefText',
          },
          label: 'pointGroupText',
          headlineLevel: 'h3',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 1,
            repeatMax: 1.7976931348623157e308,
          },
          components: [
            {
              name: 'longitude',
              type: 'textVariable',
              mode: 'input',
              inputType: 'input',
              tooltip: {
                title: 'longitudeTextVarText',
                body: 'longitudeTextVarDefText',
              },
              label: 'longitudeTextVarText',
              showLabel: true,
              validation: {
                type: 'regex',
                pattern:
                  '(^[-]{0,1}([0-9]|[1-9][0-9]|1[0-7][0-9]|180)\\.[0-9]{1,20}$)',
              },
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 0,
                repeatMax: 1,
              },
              placeholder: 'someLongitudeTextId',
              childStyle: ['sixChildStyle'],
              gridColSpan: 6,
            },
            {
              name: 'latitude',
              type: 'textVariable',
              mode: 'input',
              inputType: 'input',
              tooltip: {
                title: 'longitudeTextVarText',
                body: 'longitudeTextVarDefText',
              },
              label: 'longitudeTextVarText',
              showLabel: true,
              validation: {
                type: 'regex',
                pattern:
                  '(^[-]{0,1}([0-9]|[1-9][0-9]|1[0-7][0-9]|180)\\.[0-9]{1,20}$)',
              },
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1,
              },
              placeholder: 'someLatitudeTextId',
              childStyle: ['sixChildStyle'],
              gridColSpan: 6,
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

export const formDefWithOptionalGroupWithLongitudeAndLatitudeTextVars: RecordFormSchema =
  {
    validationTypeId: 'thesisManuscript',
    form: {
      name: 'divaOutput',
      type: 'group',
      mode: 'input',
      tooltip: {
        title: 'thesisManuscriptNewGroupText',
        body: 'thesisManuscriptNewGroupDefText',
      },
      label: 'thesisManuscriptNewGroupText',
      headlineLevel: 'h1',
      showLabel: true,
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      components: [
        {
          name: 'point',
          type: 'group',
          mode: 'input',
          tooltip: {
            title: 'pointGroupText',
            body: 'pointGroupDefText',
          },
          label: 'pointGroupText',
          headlineLevel: 'h3',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0, // For the test
            repeatMax: 1.7976931348623157e308,
          },
          components: [
            {
              name: 'longitude',
              type: 'textVariable',
              mode: 'input',
              inputType: 'input',
              tooltip: {
                title: 'longitudeTextVarText',
                body: 'longitudeTextVarDefText',
              },
              label: 'longitudeTextVarText',
              showLabel: true,
              validation: {
                type: 'regex',
                pattern:
                  '(^[-]{0,1}([0-9]|[1-9][0-9]|1[0-7][0-9]|180)\\.[0-9]{1,20}$)',
              },
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1,
              },
              placeholder: 'someLongitudeTextId',
              childStyle: ['sixChildStyle'],
              gridColSpan: 6,
            },
            {
              name: 'latitude',
              type: 'textVariable',
              mode: 'input',
              inputType: 'input',
              tooltip: {
                title: 'latitudeTextVarText',
                body: 'latitudeTextVarDefText',
              },
              label: 'latitudeTextVarText',
              showLabel: true,
              validation: {
                type: 'regex',
                pattern:
                  '(^[-]{0,1}([0-9]|[1-9][0-9]|1[0-7][0-9]|180)\\.[0-9]{1,20}$)',
              },
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1,
              },
              placeholder: 'someLatitudeTextId',
              childStyle: ['sixChildStyle'],
              gridColSpan: 6,
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

export const formDefWithOptionalGroupWithLongitudeAndLatitudeNumberVars: RecordFormSchema =
  {
    validationTypeId: 'thesisManuscript',
    form: {
      name: 'divaOutput',
      type: 'group',
      mode: 'input',
      tooltip: {
        title: 'thesisManuscriptNewGroupText',
        body: 'thesisManuscriptNewGroupDefText',
      },
      label: 'thesisManuscriptNewGroupText',
      headlineLevel: 'h1',
      showLabel: true,
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      components: [
        {
          name: 'point',
          type: 'group',
          mode: 'input',
          tooltip: {
            title: 'pointGroupText',
            body: 'pointGroupDefText',
          },
          label: 'pointGroupText',
          headlineLevel: 'h3',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0, // For the test
            repeatMax: 1.7976931348623157e308,
          },
          components: [
            {
              name: 'longitude',
              type: 'numberVariable',
              mode: 'input',
              inputType: 'input',
              tooltip: {
                title: 'longitudeTextVarText',
                body: 'longitudeTextVarDefText',
              },
              label: 'longitudeTextVarText',
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
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1,
              },
              placeholder: 'someLongitudeTextId',
              childStyle: ['sixChildStyle'],
              gridColSpan: 6,
            },
            {
              name: 'latitude',
              type: 'numberVariable',
              mode: 'input',
              inputType: 'input',
              tooltip: {
                title: 'latitudeTextVarText',
                body: 'latitudeTextVarDefText',
              },
              label: 'latitudeTextVarText',
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
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1,
              },
              placeholder: 'someLatitudeTextId',
              childStyle: ['sixChildStyle'],
              gridColSpan: 6,
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

export const formDefWithOptionalGroupWithTwoCollectionVars: RecordFormSchema = {
  validationTypeId: 'thesisManuscript',
  form: {
    name: 'divaOutput',
    type: 'group',
    mode: 'input',
    tooltip: {
      title: 'thesisManuscriptNewGroupText',
      body: 'thesisManuscriptNewGroupDefText',
    },
    label: 'thesisManuscriptNewGroupText',
    headlineLevel: 'h1',
    showLabel: true,
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    components: [
      {
        name: 'point',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'pointGroupText',
          body: 'pointGroupDefText',
        },
        label: 'pointGroupText',
        headlineLevel: 'h3',
        showLabel: true,
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0, // For the test
          repeatMax: 1.7976931348623157e308,
        },
        components: [
          {
            name: 'someCollectionVar',
            type: 'collectionVariable',
            placeholder: 'initialEmptyValueText',
            mode: 'input',
            tooltip: {
              title: 'domainCollectionVarText',
              body: 'domainCollectionVarDefText',
            },
            label: 'someCollectionVarText',
            showLabel: true,
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            options: [
              {
                value: 'bth',
                label: 'bthItemText',
              },
            ],
            childStyle: [''],
            gridColSpan: 12,
          },
          {
            name: 'someOtherCollectionVar',
            type: 'collectionVariable',
            placeholder: 'initialEmptyValueText',
            mode: 'input',
            tooltip: {
              title: 'domainCollectionVarText',
              body: 'domainCollectionVarDefText',
            },
            label: 'someOtherCollectionVarText',
            showLabel: true,
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            options: [
              {
                value: 'bth',
                label: 'bthItemText',
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
    ],
    presentationStyle: '',
    childStyle: [''],
    gridColSpan: 12,
  },
};

export const formDefWithTextVarAndNestedGroupsWithOneTextVar: RecordFormSchema =
  {
    validationTypeId: 'thesisManuscript',
    form: {
      name: 'divaOutput',
      type: 'group',
      mode: 'input',
      tooltip: {
        title: 'thesisManuscriptNewGroupText',
        body: 'thesisManuscriptNewGroupDefText',
      },
      label: 'thesisManuscriptNewGroupText',
      headlineLevel: 'h1',
      showLabel: true,
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      components: [
        {
          name: 'point',
          type: 'group',
          mode: 'input',
          tooltip: {
            title: 'pointGroupText',
            body: 'pointGroupDefText',
          },
          label: 'pointGroupText',
          headlineLevel: 'h3',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 1, // For the test
            repeatMax: 1,
          },
          components: [
            {
              name: 'point',
              type: 'group',
              mode: 'input',
              tooltip: {
                title: 'pointGroupText',
                body: 'pointGroupDefText',
              },
              label: 'pointGroupText',
              headlineLevel: 'h3',
              showLabel: false,
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 0, // For the test
                repeatMax: 1,
              },
              components: [
                {
                  name: 'longitude',
                  type: 'numberVariable',
                  mode: 'input',
                  inputType: 'input',
                  tooltip: {
                    title: 'longitudeTextVarText',
                    body: 'longitudeTextVarDefText',
                  },
                  label: 'longitudeTextVarText',
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
                    minNumberOfRepeatingToShow: 1,
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                  placeholder: 'someLongitudeTextId',
                  childStyle: ['sixChildStyle'],
                  gridColSpan: 6,
                },
                {
                  name: 'point2',
                  type: 'group',
                  mode: 'input',
                  tooltip: {
                    title: 'pointGroupText',
                    body: 'pointGroupDefText',
                  },
                  label: 'pointGroupText',
                  headlineLevel: 'h3',
                  showLabel: false,
                  repeat: {
                    minNumberOfRepeatingToShow: 1,
                    repeatMin: 1, // For the test
                    repeatMax: 1,
                  },
                  components: [
                    {
                      name: 'point3',
                      type: 'group',
                      mode: 'input',
                      tooltip: {
                        title: 'pointGroupText',
                        body: 'pointGroupDefText',
                      },
                      label: 'pointGroupText',
                      headlineLevel: 'h3',
                      showLabel: false,
                      repeat: {
                        minNumberOfRepeatingToShow: 1,
                        repeatMin: 1, // For the test
                        repeatMax: 1,
                      },
                      components: [
                        {
                          name: 'point',
                          type: 'group',
                          mode: 'input',
                          tooltip: {
                            title: 'pointGroupText',
                            body: 'pointGroupDefText',
                          },
                          label: 'pointGroupText',
                          headlineLevel: 'h3',
                          showLabel: false,
                          repeat: {
                            minNumberOfRepeatingToShow: 1,
                            repeatMin: 1, // For the test
                            repeatMax: 1,
                          },
                          components: [
                            {
                              name: 'latitude',
                              type: 'numberVariable',
                              mode: 'input',
                              inputType: 'input',
                              tooltip: {
                                title: 'latitudeTextVarText',
                                body: 'latitudeTextVarDefText',
                              },
                              label: 'latitudeTextVarText',
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
                                minNumberOfRepeatingToShow: 1,
                                repeatMin: 1,
                                repeatMax: 1,
                              },
                              placeholder: 'someLatitudeTextId',
                              childStyle: ['sixChildStyle'],
                              gridColSpan: 6,
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

export const formDefWithNestedSurroundingContainers: RecordFormSchema = {
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
        ],
        mode: 'input',
      },
    ],
  },
};
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
    ],
  },
};

export const formDefWithGroupWithSpecifiedHeadlineLevel: RecordFormSchema = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    showLabel: true,
    headlineLevel: 'h1',
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
        name: 'author',
        type: 'group',
        mode: 'input',
        headlineLevel: 'h3',
        showLabel: true,
        tooltip: {
          title: 'authorGroupText',
          body: 'authorGroupDefText',
        },
        label: 'author',
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 1,
          repeatMax: 10,
        },
        attributes: [
          {
            type: 'collectionVariable',
            name: 'eyeColor',
            showLabel: true,
            placeholder: 'Select eye color',
            tooltip: {
              title: 'Eye color',
              body: 'state the author eye color',
            },
            finalValue: 'blue',
            label: 'Eye color',
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
            type: 'text',
            name: 'presentationTypeTextCollectionVarDefText',
          },
          {
            type: 'textVariable',
            name: 'someNameInData',
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
          },
        ],
      },
    ],
    mode: 'input',
  },
};

export const formDefWithGroupWithDefaultHeadlineLevel: RecordFormSchema = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    showLabel: true,
    label: 'someRootFormGroupText',
    headlineLevel: 'h1',
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
        name: 'author',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'authorGroupText',
          body: 'authorGroupDefText',
        },
        label: 'author',
        showLabel: true,
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 1,
          repeatMax: 10,
        },
        attributes: [
          {
            type: 'collectionVariable',
            name: 'eyeColor',
            showLabel: true,
            placeholder: 'Select eye color',
            tooltip: {
              title: 'Eye color',
              body: 'state the author eye color',
            },
            finalValue: 'blue',
            label: 'Eye color',
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
            type: 'text',
            name: 'presentationTypeTextCollectionVarDefText',
          },
          {
            type: 'textVariable',
            name: 'someNameInData',
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
          },
        ],
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
        placeholder: 'loginPasswordTextVarText',
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
        inputFormat: 'password',
      },
    ],
    mode: 'input',
  },
};

export const formDefWithOneRecordLinkBeingOptional: RecordFormSchema = {
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
        type: 'recordLink',
        name: 'nationalSubjectCategory',
        mode: 'input',
        repeat: {
          repeatMin: 0,
          repeatMax: 1,
          minNumberOfRepeatingToShow: 1,
        },
      },
    ],
    mode: 'input',
  },
};

export const formDefWithOneRecordLinkBeingRequired: RecordFormSchema = {
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
        type: 'recordLink',
        name: 'nationalSubjectCategory',
        mode: 'input',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
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

export const formDefContributorGroupWithAuthorGroupAuthor: RecordFormSchema = {
  validationTypeId: 'someValidationTypeId',
  form: {
    name: 'contributor',
    type: 'group',
    mode: 'input',
    tooltip: {
      title: 'contributorGroupText',
      body: 'contributorGroupDefText',
    },
    label: 'contributorGroupText',
    showLabel: true,
    repeat: {
      minNumberOfRepeatingToShow: 1,
      repeatMin: 1,
      repeatMax: 1,
    },
    components: [
      {
        name: 'author',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'authorGroupText',
          body: 'authorGroupDefText',
        },
        label: 'authorGroupText',
        headlineLevel: 'h3',
        showLabel: true,
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 1,
          repeatMax: 1.7976931348623157e308,
        },
        components: [
          {
            name: 'divaPerson',
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
            childStyle: [''],
            gridColSpan: 12,
            recordLinkType: 'person',
            presentationRecordLinkId: 'divaPersonPLink',
            search: 'personSearch',
          },
          {
            name: 'givenName',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'givenNameTextVarText',
              body: 'givenNameTextVarDefText',
            },
            label: 'givenNameTextVarText',
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
            childStyle: ['eightChildStyle'],
            gridColSpan: 8,
          },
          {
            name: 'correspondingAuthor',
            type: 'collectionVariable',
            placeholder: 'initialEmptyValueText',
            mode: 'input',
            tooltip: {
              title: 'correspondingAuthorCollectionVarText',
              body: 'correspondingAuthorCollectionVarDefText',
            },
            label: 'correspondingAuthorCollectionVarText',
            showLabel: true,
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            options: [
              {
                value: 'divaYes',
                label: 'divaYesItemText',
              },
              {
                value: 'divaNo',
                label: 'divaNoItemText',
              },
            ],
            childStyle: ['fourChildStyle'],
            gridColSpan: 4,
          },
          {
            name: 'familyName',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'familyNameTextVarText',
              body: 'familyNameTextVarDefText',
            },
            label: 'familyNameTextVarText',
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
            childStyle: [''],
            gridColSpan: 12,
          },
          {
            name: 'email',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'contributorEmailTextVarText',
              body: 'contributorEmailTextVarDefText',
            },
            label: 'contributorEmailTextVarText',
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
            childStyle: [''],
            gridColSpan: 12,
          },
          {
            name: 'birthYear',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'birthYearTextVarText',
              body: 'birthYearTextVarDefText',
            },
            label: 'birthYearTextVarText',
            showLabel: true,
            validation: {
              type: 'regex',
              pattern: '^[0-9]{4}$',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: ['sixChildStyle'],
            gridColSpan: 6,
          },
          {
            name: 'deathYear',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'deathYearTextVarText',
              body: 'deathYearTextVarDefText',
            },
            label: 'deathYearTextVarText',
            showLabel: true,
            validation: {
              type: 'regex',
              pattern: '^[0-9]{4}$',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: ['sixChildStyle'],
            gridColSpan: 6,
          },
          {
            name: 'localUserId',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'localUserIdTextVarText',
              body: 'localUserIdTextVarDefText',
            },
            label: 'localUserIdTextVarText',
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
            childStyle: ['sixChildStyle'],
            gridColSpan: 6,
          },
          {
            name: 'ORCID',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'orcidTextVarText',
              body: 'orcidTextVarDefText',
            },
            label: 'orcidTextVarText',
            showLabel: true,
            validation: {
              type: 'regex',
              pattern: '^(\\d{4})-(\\d{4})-(\\d{4})-(\\d{3}[0-9X])$',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: ['sixChildStyle'],
            gridColSpan: 6,
          },
          {
            name: 'organisation',
            type: 'recordLink',
            mode: 'input',
            tooltip: {
              title: 'organisationLinkText',
              body: 'organisationLinkDefText',
            },
            label: 'organisationLinkText',
            showLabel: true,
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: [''],
            gridColSpan: 12,
            recordLinkType: 'organisation',
            presentationRecordLinkId: 'organisationPLink',
            search: 'organisationSearch',
          },
          {
            name: 'otherOrganisation',
            type: 'group',
            mode: 'input',
            tooltip: {
              title: 'otherOrganisationGroupText',
              body: 'otherOrganisationGroupDefText',
            },
            label: 'otherOrganisationGroupText',
            showLabel: false,
            repeat: {
              minNumberOfRepeatingToShow: 0,
              repeatMin: 0,
              repeatMax: 1.7976931348623157e308,
            },
            components: [
              {
                name: 'otherOrganisation',
                type: 'textVariable',
                mode: 'input',
                inputType: 'input',
                tooltip: {
                  title: 'otherOrganisationTextVarText',
                  body: 'otherOrganisationTextVarDefText',
                },
                label: 'otherOrganisationTextVarText',
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
                childStyle: [''],
                gridColSpan: 12,
              },
            ],
            presentationStyle: '',
            childStyle: [''],
            gridColSpan: 12,
          },
          {
            name: 'researchGroup',
            type: 'recordLink',
            mode: 'input',
            tooltip: {
              title: 'researchGroupLinkText',
              body: 'researchGroupLinkDefText',
            },
            label: 'researchGroupLinkText',
            showLabel: true,
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1.7976931348623157e308,
            },
            childStyle: [''],
            gridColSpan: 12,
            recordLinkType: 'researchGroup',
            presentationRecordLinkId: 'researchGroupPLink',
            search: 'researchGroupSearch',
          },
          {
            name: 'otherResearchGroup',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'otherResearchGroupTextVarText',
              body: 'otherResearchGroupTextVarDefText',
            },
            label: 'otherResearchGroupTextVarText',
            showLabel: true,
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            repeat: {
              minNumberOfRepeatingToShow: 0,
              repeatMin: 0,
              repeatMax: 1,
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

export const formDefTwoOptionalGroupsWithRequiredTextVars: RecordFormSchema = {
  validationTypeId: 'thesisManuscript',
  form: {
    name: 'divaOutput',
    type: 'group',
    mode: 'input',
    tooltip: {
      title: 'thesisManuscriptNewGroupText',
      body: 'thesisManuscriptNewGroupDefText',
    },
    label: 'thesisManuscriptNewGroupText',
    headlineLevel: 'h1',
    showLabel: true,
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    components: [
      {
        name: 'author',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'authorGroupText',
          body: 'authorGroupDefText',
        },
        label: 'authorGroupText',
        showLabel: true,
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0,
          repeatMax: 1.7976931348623157e308,
        },
        components: [
          {
            name: 'givenName',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'givenNameTextVarText',
              body: 'givenNameTextVarDefText',
            },
            label: 'givenNameTextVarText',
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
            childStyle: ['sixChildStyle'],
            gridColSpan: 6,
          },
          {
            name: 'familyName',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'familyNameTextVarText',
              body: 'familyNameTextVarDefText',
            },
            label: 'familyNameTextVarText',
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
            childStyle: ['sixChildStyle'],
            gridColSpan: 6,
          },
        ],
        presentationStyle: '',
        childStyle: [''],
        gridColSpan: 12,
      },
      {
        name: 'geoData',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'geoDataGroupText',
          body: 'geoDataGroupDefText',
        },
        label: 'geoDataGroupText',
        showLabel: true,
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0,
          repeatMax: 1,
        },
        components: [
          {
            name: 'longitude',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'divaDescriptionTextVarText',
              body: 'divaDescriptionTextVarDefText',
            },
            label: 'divaDescriptionTextVarText',
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
            childStyle: [''],
            gridColSpan: 12,
          },
          {
            name: 'polygon',
            type: 'group',
            mode: 'input',
            tooltip: {
              title: 'polygonGroupText',
              body: 'polygonGroupDefText',
            },
            label: 'polygonGroupText',
            showLabel: false,
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            components: [
              {
                name: 'point',
                type: 'group',
                mode: 'input',
                tooltip: {
                  title: 'pointGroupText',
                  body: 'pointGroupDefText',
                },
                label: 'pointGroupText',
                headlineLevel: 'h3',
                showLabel: true,
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 0,
                  repeatMax: 1.7976931348623157e308,
                },
                components: [
                  {
                    name: 'longitude',
                    placeholder: 'longitude',
                    type: 'textVariable',
                    mode: 'input',
                    inputType: 'input',
                    tooltip: {
                      title: 'longitudeTextVarText',
                      body: 'longitudeTextVarDefText',
                    },
                    label: 'longitudeTextVarText',
                    showLabel: true,
                    validation: {
                      type: 'regex',
                      pattern:
                        '(^[-]{0,1}([0-9]|[1-9][0-9]|1[0-7][0-9]|180)\\.[0-9]{1,20}$)',
                    },
                    repeat: {
                      minNumberOfRepeatingToShow: 1,
                      repeatMin: 1,
                      repeatMax: 1,
                    },
                    childStyle: ['sixChildStyle'],
                    gridColSpan: 6,
                  },
                  {
                    name: 'latitude',
                    placeholder: 'latitude',
                    type: 'textVariable',
                    mode: 'input',
                    inputType: 'input',
                    tooltip: {
                      title: 'latitudeTextVarText',
                      body: 'latitudeTextVarDefText',
                    },
                    label: 'latitudeTextVarText',
                    showLabel: true,
                    validation: {
                      type: 'regex',
                      pattern:
                        '(^[-]{0,1}([0-9]|[1-9][0-9]|1[0-7][0-9]|90)\\.[0-9]{1,20}$)',
                    },
                    repeat: {
                      minNumberOfRepeatingToShow: 1,
                      repeatMin: 1,
                      repeatMax: 1,
                    },
                    childStyle: ['sixChildStyle'],
                    gridColSpan: 6,
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

export const formDefTwoOptionalGroupsSameNameInDataWithRequiredTextVars: RecordFormSchema =
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
          name: 'author',
          type: 'group',
          mode: 'input',
          tooltip: {
            title: 'authorGroupText',
            body: 'authorGroupDefText',
          },
          label: 'authorGroupText',
          showLabel: true,
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
                  value: 'nau',
                  label: 'nauLangItemText',
                },
                {
                  value: 'uwu',
                  label: 'uwuLangItemText',
                },
              ],
              finalValue: 'uwu',
            },
          ],
          components: [
            {
              name: 'givenName',
              type: 'textVariable',
              mode: 'input',
              inputType: 'input',
              tooltip: {
                title: 'givenNameTextVarText',
                body: 'givenNameTextVarDefText',
              },
              label: 'givenNameTextVarText',
              placeholder: 'givenNameTextVarText1',
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
              childStyle: ['sixChildStyle'],
              gridColSpan: 6,
            },
            {
              name: 'familyName',
              type: 'textVariable',
              mode: 'input',
              inputType: 'input',
              tooltip: {
                title: 'familyNameTextVarText',
                body: 'familyNameTextVarDefText',
              },
              label: 'familyNameTextVarText',
              placeholder: 'familyNameTextVarText1',
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
              childStyle: ['sixChildStyle'],
              gridColSpan: 6,
            },
          ],
          presentationStyle: '',
          childStyle: [''],
          gridColSpan: 12,
        },
        {
          name: 'author',
          type: 'group',
          mode: 'input',
          tooltip: {
            title: 'authorGroupText',
            body: 'authorGroupDefText',
          },
          label: 'authorGroupText',
          showLabel: true,
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
                  value: 'nau',
                  label: 'nauLangItemText',
                },
                {
                  value: 'uwu',
                  label: 'uwuLangItemText',
                },
              ],
              finalValue: 'nau',
            },
          ],
          components: [
            {
              name: 'givenName',
              type: 'textVariable',
              mode: 'input',
              inputType: 'input',
              tooltip: {
                title: 'givenNameTextVarText',
                body: 'givenNameTextVarDefText',
              },
              label: 'givenNameTextVarText',
              placeholder: 'givenNameTextVarText2',
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
              childStyle: ['sixChildStyle'],
              gridColSpan: 6,
            },
            {
              name: 'familyName',
              type: 'textVariable',
              mode: 'input',
              inputType: 'input',
              tooltip: {
                title: 'familyNameTextVarText',
                body: 'familyNameTextVarDefText',
              },
              label: 'familyNameTextVarText',
              placeholder: 'familyNameTextVarText2',
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
              childStyle: ['sixChildStyle'],
              gridColSpan: 6,
            },
          ],
          presentationStyle: '',
          childStyle: [''],
          gridColSpan: 12,
        },
      ],
      mode: 'input',
    },
  };

export const formDefPreprintWithOnlyAuthorName: RecordFormSchema = {
  validationTypeId: 'preprint',
  form: {
    name: 'divaOutput',
    type: 'group',
    mode: 'output',
    tooltip: {
      title: 'divaOutputGroupText',
      body: 'divaOutputGroupDefText',
    },
    label: 'divaOutputGroupText',
    headlineLevel: 'h1',
    showLabel: true,
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    components: [
      {
        name: 'author',
        type: 'group',
        mode: 'output',
        tooltip: {
          title: 'authorGroupText',
          body: 'authorGroupDefText',
        },
        label: 'authorGroupText',
        showLabel: true,
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0,
          repeatMax: 1.7976931348623157e308,
        },
        components: [
          {
            name: 'givenName',
            type: 'textVariable',
            mode: 'output',
            inputType: 'input',
            tooltip: {
              title: 'givenNameTextVarText',
              body: 'givenNameTextVarDefText',
            },
            label: 'givenNameTextVarText',
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
            childStyle: ['sixChildStyle'],
            gridColSpan: 6,
          },
          {
            name: 'familyName',
            type: 'textVariable',
            mode: 'output',
            inputType: 'input',
            tooltip: {
              title: 'familyNameTextVarText',
              body: 'familyNameTextVarDefText',
            },
            label: 'familyNameTextVarText',
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
            childStyle: ['sixChildStyle'],
            gridColSpan: 6,
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

export const formDefWithOptionalGroupWithRequiredGroupWithRequiredVars: RecordFormSchema =
  {
    validationTypeId: 'divaOutput',
    form: {
      name: 'divaOutput',
      type: 'group',
      mode: 'input',
      tooltip: {
        title: 'divaOutputGroupText',
        body: 'divaOutputGroupDefText',
      },
      label: 'divaOutputGroupText',
      headlineLevel: 'h1',
      showLabel: true,
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      components: [
        {
          name: 'hostOutput',
          type: 'group',
          mode: 'input',
          tooltip: {
            title: 'hostOutputGroupText',
            body: 'hostOutputGroupDefText',
          },
          label: 'hostOutputGroupText',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          components: [
            {
              name: 'hostTitle',
              type: 'group',
              mode: 'input',
              tooltip: {
                title: 'hostTitleGroupText',
                body: 'hostTitleGroupDefText',
              },
              label: 'hostTitleGroupText',
              showLabel: true,
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
                      value: 'nau',
                      label: 'nauLangItemText',
                    },
                  ],
                },
              ],
              components: [
                {
                  name: 'mainTitle',
                  type: 'textVariable',
                  mode: 'input',
                  inputType: 'input',
                  tooltip: {
                    title: 'mainTitleTextVarText',
                    body: 'mainTitleTextVarDefText',
                  },
                  label: 'mainTitleTextVarText',
                  placeholder: 'mainTitleTextVarText',
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
                  childStyle: [''],
                  gridColSpan: 12,
                },
                {
                  name: 'subtitle',
                  type: 'textVariable',
                  mode: 'input',
                  inputType: 'input',
                  tooltip: {
                    title: 'subtitleTextVarText',
                    body: 'subtitleTextVarDefText',
                  },
                  label: 'subtitleTextVarText',
                  placeholder: 'subtitleTextVarText',
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

export const formDefCollVarsWithSameNameInData: RecordFormSchema = {
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
        name: 'genre',
        type: 'collectionVariable',
        placeholder: 'initialEmptyValueText',
        mode: 'input',
        tooltip: {
          title: 'outputTypeCollectionVarText',
          body: 'outputTypeCollectionVarDefText',
        },
        label: 'outputTypeCollectionVarText1',
        showLabel: true,
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 1,
          repeatMax: 1,
        },
        options: [
          {
            value: 'artistic-work_original-creative-work',
            label: 'artisticWorkOriginalCreativeWorkItemText',
          },
          {
            value: 'artistic-work_artistic-thesis',
            label: 'artisticWorkArtisticThesisItemText',
          },
        ],
        attributes: [
          {
            name: 'type',
            type: 'collectionVariable',
            placeholder: 'initialEmptyValueText',
            mode: 'input',
            tooltip: {
              title: 'typeCollectionVarText',
              body: 'typeCollectionVarDefText',
            },
            label: 'typeCollectionVarText',
            showLabel: true,
            options: [
              {
                value: 'code',
                label: 'codeItemText',
              },
              {
                value: 'contentType',
                label: 'contentTypeItemText',
              },
            ],
            finalValue: 'code',
          },
        ],
        childStyle: [''],
        gridColSpan: 12,
      },
      {
        name: 'genre',
        type: 'collectionVariable',
        placeholder: 'initialEmptyValueText2',
        mode: 'input',
        tooltip: {
          title: 'outputTypeCollectionVarText',
          body: 'outputTypeCollectionVarDefText',
        },
        label: 'outputTypeCollectionVarText2',
        showLabel: true,
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 1,
          repeatMax: 1,
        },
        options: [
          {
            value: 'artistic-work_original-creative-work',
            label: 'artisticWorkOriginalCreativeWorkItemText',
          },
          {
            value: 'artistic-work_artistic-thesis',
            label: 'artisticWorkArtisticThesisItemText',
          },
        ],
        attributes: [
          {
            name: 'type',
            type: 'collectionVariable',
            placeholder: 'initialEmptyValueText1',
            mode: 'input',
            tooltip: {
              title: 'typeCollectionVarText',
              body: 'typeCollectionVarDefText',
            },
            label: 'typeCollectionVarText',
            showLabel: true,
            options: [
              {
                value: 'code',
                label: 'codeItemText',
              },
              {
                value: 'contentType',
                label: 'contentTypeItemText',
              },
            ],
            finalValue: 'contentType',
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

export const formDefSubjectGroupOptionalWithAttributesAndTopicWithAttributes: RecordFormSchema =
  {
    validationTypeId: 'preprint',
    form: {
      name: 'divaOutput',
      type: 'group',
      mode: 'input',
      tooltip: {
        title: 'preprintNewGroupText',
        body: 'preprintNewGroupDefText',
      },
      label: 'preprintNewGroupText',
      headlineLevel: 'h1',
      showLabel: true,
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      components: [
        {
          name: 'subject',
          type: 'group',
          mode: 'input',
          tooltip: {
            title: 'keywordsGroupText',
            body: 'keywordsGroupDefText',
          },
          label: 'keywordsGroupText',
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
          ],
          components: [
            {
              name: 'topic',
              type: 'textVariable',
              mode: 'input',
              inputType: 'input',
              tooltip: {
                title: 'keywordsTextVarText',
                body: 'keywordsTextVarDefText',
              },
              label: 'keywordsTextVarText',
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

export const formDefSubjectGroupRequiredWithAttributesAndTopicWithAttributes: RecordFormSchema =
  {
    validationTypeId: 'preprint',
    form: {
      name: 'divaOutput',
      type: 'group',
      mode: 'input',
      tooltip: {
        title: 'preprintNewGroupText',
        body: 'preprintNewGroupDefText',
      },
      label: 'preprintNewGroupText',
      headlineLevel: 'h1',
      showLabel: true,
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      components: [
        {
          name: 'subject',
          type: 'group',
          mode: 'input',
          tooltip: {
            title: 'keywordsGroupText',
            body: 'keywordsGroupDefText',
          },
          label: 'keywordsGroupText',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 1,
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
          ],
          components: [
            {
              name: 'topic',
              type: 'textVariable',
              mode: 'input',
              inputType: 'input',
              tooltip: {
                title: 'keywordsTextVarText',
                body: 'keywordsTextVarDefText',
              },
              label: 'keywordsTextVarText',
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

export const formDefNatSubGroupRequiredAndRecordLinksSameNameInDataWithAttributes: RecordFormSchema =
  {
    validationTypeId: 'preprint',
    form: {
      name: 'divaOutput',
      type: 'group',
      mode: 'input',
      tooltip: {
        title: 'preprintNewGroupText',
        body: 'preprintNewGroupDefText',
      },
      label: 'preprintNewGroupText',
      headlineLevel: 'h1',
      showLabel: true,
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      components: [
        {
          name: 'nationalSubjectCategory',
          type: 'recordLink',
          mode: 'input',
          tooltip: {
            title: 'nationalSubjectCategoryLinkText',
            body: 'nationalSubjectCategoryLinkDefText',
          },
          label: 'nationalSubjectCategoryLinkText',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          childStyle: [''],
          gridColSpan: 12,
          recordLinkType: 'nationalSubjectCategory',
          presentationRecordLinkId: 'nationalSubjectCategoryPLink',
          search: 'nationalSubjectCategorySearch',
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
                  value: 'swe',
                  label: 'sweLangItemText',
                },
                {
                  value: 'eng',
                  label: 'engLangItemText',
                },
              ],
              finalValue: 'swe',
            },
          ],
        },
        {
          name: 'nationalSubjectCategory',
          type: 'recordLink',
          mode: 'input',
          tooltip: {
            title: 'nationalSubjectCategoryLinkText',
            body: 'nationalSubjectCategoryLinkDefText',
          },
          label: 'nationalSubjectCategoryLinkText',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          childStyle: [''],
          gridColSpan: 12,
          recordLinkType: 'nationalSubjectCategory',
          presentationRecordLinkId: 'nationalSubjectCategoryPLink',
          search: 'nationalSubjectCategorySearch',
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
                  value: 'swe',
                  label: 'sweLangItemText',
                },
                {
                  value: 'eng',
                  label: 'engLangItemText',
                },
              ],
              finalValue: 'eng',
            },
          ],
        },
      ],
      presentationStyle: '',
      childStyle: [''],
      gridColSpan: 12,
    },
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
          childStyle: [''],
          gridColSpan: 12,
        },
      ],
      presentationStyle: '',
      childStyle: [''],
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
          childStyle: [''],
          gridColSpan: 12,
        },
      ],
      presentationStyle: '',
      childStyle: [''],
      gridColSpan: 12,
    },
  ],
};

export const formDefTitleInfoGroup: RecordFormSchema = {
  validationTypeId: 'preprint',
  form: {
    name: 'divaOutput',
    type: 'group',
    mode: 'input',
    tooltip: {
      title: 'preprintNewGroupText',
      body: 'preprintNewGroupDefText',
    },
    label: 'preprintNewGroupText',
    headlineLevel: 'h1',
    showLabel: true,
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
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
            placeholder: 'titleInfoVarText1',
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
            childStyle: [''],
            gridColSpan: 12,
          },
        ],
        presentationStyle: '',
        childStyle: [''],
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
            placeholder: 'titleInfoVarText2',
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
        childStyle: [''],
        gridColSpan: 12,
      },
    ],
    presentationStyle: '',
    childStyle: [''],
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
        childStyle: [''],
        gridColSpan: 12,
      },
    ],
    presentationStyle: '',
    childStyle: [''],
    gridColSpan: 12,
  },
};

export const formDefRequiredRepeatingCollectionVar: RecordFormSchema = {
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
            name: 'languageTerm',
            type: 'collectionVariable',
            placeholder: 'initialEmptyValueText',
            mode: 'input',
            tooltip: {
              title: 'languageCollectionVarText',
              body: 'languageCollectionVarDefText',
            },
            label: 'languageCollectionVarText',
            showLabel: true,
            attributesToShow: 'selectable',
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1.7976931348623157e308,
            },
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

export const formDefRequiredRepeatingCollection2Var: RecordFormSchema = {
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
            name: 'languageTerm',
            type: 'collectionVariable',
            placeholder: 'initialEmptyValueText',
            mode: 'input',
            tooltip: {
              title: 'languageCollectionVarText',
              body: 'languageCollectionVarDefText',
            },
            label: 'languageCollectionVarText',
            showLabel: true,
            attributesToShow: 'selectable',
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1.7976931348623157e308,
            },
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

export const formDefWithWithOptionalGroupWithRequiredVar: RecordFormSchema = {
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
        name: 'name',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'namePersonalGroupText',
          body: 'namePersonalGroupDefText',
        },
        label: 'namePersonalGroupText',
        showLabel: true,
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0,
          repeatMax: 1.7976931348623157e308,
        },
        attributes: [
          {
            name: 'type',
            type: 'collectionVariable',
            placeholder: 'initialEmptyValueText',
            mode: 'input',
            tooltip: {
              title: 'typeCollectionVarText',
              body: 'typeCollectionVarDefText',
            },
            label: 'typeCollectionVarText',
            showLabel: true,
            options: [
              {
                value: 'code',
                label: 'codeItemText',
              },
              {
                value: 'contentType',
                label: 'contentTypeItemText',
              },
              {
                value: 'creatorCount',
                label: 'creatorCountItemText',
              },
              {
                value: 'restrictionOnAccess',
                label: 'restrictionOnAccessItemText',
              },
              {
                value: 'publicationStatus',
                label: 'publicationStatusItemText',
              },
              {
                value: 'corporate',
                label: 'corporateItemText',
              },
              {
                value: 'personal',
                label: 'personalItemText',
              },
              {
                value: 'given',
                label: 'givenItemText',
              },
              {
                value: 'family',
                label: 'familyItemText',
              },
              {
                value: 'termsOfAddress',
                label: 'termsOfAddressItemText',
              },
              {
                value: 'series',
                label: 'seriesItemText',
              },
              {
                value: 'conference-publication',
                label: 'conferencePublicationItemText',
              },
              {
                value: 'statement_of_responsibility',
                label: 'statementOfResponsibilityItemText',
              },
              {
                value: 'book',
                label: 'bookItemText',
              },
              {
                value: 'journal',
                label: 'journalItemText',
              },
              {
                value: 'artNo',
                label: 'artNoItemText',
              },
              {
                value: 'issue',
                label: 'issueItemText',
              },
              {
                value: 'volume',
                label: 'volumeItemText',
              },
              {
                value: 'conference',
                label: 'conferenceItemText',
              },
              {
                value: 'initiative',
                label: 'initiativeItemText',
              },
              {
                value: 'funder',
                label: 'funderItemText',
              },
              {
                value: 'project',
                label: 'projectItemText',
              },
              {
                value: 'constituent',
                label: 'constituentItemText',
              },
              {
                value: 'thesis',
                label: 'thesisItemText',
              },
              {
                value: 'defence',
                label: 'defenceItemText',
              },
              {
                value: 'researchData',
                label: 'researchDataItemText',
              },
              {
                value: 'outputType',
                label: 'outputTypeItemText',
              },
              {
                value: 'internal',
                label: 'internalItemText',
              },
              {
                value: 'online',
                label: 'onlineItemText',
              },
              {
                value: 'biographical',
                label: 'biographicalItemText',
              },
              {
                value: 'patent',
                label: 'patentItemText',
              },
            ],
            finalValue: 'personal',
          },
        ],
        components: [
          {
            name: 'namePart',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'namePartGivenTextVarText',
              body: 'namePartGivenTextVarDefText',
            },
            label: 'namePartGivenTextVarText',
            placeholder: 'namePartGivenTextVarText',
            showLabel: true,
            attributesToShow: 'selectable',
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
                name: 'type',
                type: 'collectionVariable',
                placeholder: 'initialEmptyValueText',
                mode: 'input',
                tooltip: {
                  title: 'typeCollectionVarText',
                  body: 'typeCollectionVarDefText',
                },
                label: 'typeCollectionVarText',
                showLabel: true,
                options: [
                  {
                    value: 'code',
                    label: 'codeItemText',
                  },
                  {
                    value: 'contentType',
                    label: 'contentTypeItemText',
                  },
                  {
                    value: 'creatorCount',
                    label: 'creatorCountItemText',
                  },
                  {
                    value: 'restrictionOnAccess',
                    label: 'restrictionOnAccessItemText',
                  },
                  {
                    value: 'publicationStatus',
                    label: 'publicationStatusItemText',
                  },
                  {
                    value: 'corporate',
                    label: 'corporateItemText',
                  },
                  {
                    value: 'personal',
                    label: 'personalItemText',
                  },
                  {
                    value: 'given',
                    label: 'givenItemText',
                  },
                  {
                    value: 'family',
                    label: 'familyItemText',
                  },
                  {
                    value: 'termsOfAddress',
                    label: 'termsOfAddressItemText',
                  },
                  {
                    value: 'series',
                    label: 'seriesItemText',
                  },
                  {
                    value: 'conference-publication',
                    label: 'conferencePublicationItemText',
                  },
                  {
                    value: 'statement_of_responsibility',
                    label: 'statementOfResponsibilityItemText',
                  },
                  {
                    value: 'book',
                    label: 'bookItemText',
                  },
                  {
                    value: 'journal',
                    label: 'journalItemText',
                  },
                  {
                    value: 'artNo',
                    label: 'artNoItemText',
                  },
                  {
                    value: 'issue',
                    label: 'issueItemText',
                  },
                  {
                    value: 'volume',
                    label: 'volumeItemText',
                  },
                  {
                    value: 'conference',
                    label: 'conferenceItemText',
                  },
                  {
                    value: 'initiative',
                    label: 'initiativeItemText',
                  },
                  {
                    value: 'funder',
                    label: 'funderItemText',
                  },
                  {
                    value: 'project',
                    label: 'projectItemText',
                  },
                  {
                    value: 'constituent',
                    label: 'constituentItemText',
                  },
                  {
                    value: 'thesis',
                    label: 'thesisItemText',
                  },
                  {
                    value: 'defence',
                    label: 'defenceItemText',
                  },
                  {
                    value: 'researchData',
                    label: 'researchDataItemText',
                  },
                  {
                    value: 'outputType',
                    label: 'outputTypeItemText',
                  },
                  {
                    value: 'internal',
                    label: 'internalItemText',
                  },
                  {
                    value: 'online',
                    label: 'onlineItemText',
                  },
                  {
                    value: 'biographical',
                    label: 'biographicalItemText',
                  },
                  {
                    value: 'patent',
                    label: 'patentItemText',
                  },
                ],
                finalValue: 'given',
              },
            ],
            childStyle: [''],
            gridColSpan: 12,
          },
          {
            name: 'namePart',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'namePartFamilyTextVarText',
              body: 'namePartFamilyTextVarDefText',
            },
            label: 'namePartFamilyTextVarText',
            showLabel: true,
            attributesToShow: 'selectable',
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
                name: 'type',
                type: 'collectionVariable',
                placeholder: 'initialEmptyValueText',
                mode: 'input',
                tooltip: {
                  title: 'typeCollectionVarText',
                  body: 'typeCollectionVarDefText',
                },
                label: 'typeCollectionVarText',
                showLabel: true,
                options: [
                  {
                    value: 'code',
                    label: 'codeItemText',
                  },
                  {
                    value: 'contentType',
                    label: 'contentTypeItemText',
                  },
                  {
                    value: 'creatorCount',
                    label: 'creatorCountItemText',
                  },
                  {
                    value: 'restrictionOnAccess',
                    label: 'restrictionOnAccessItemText',
                  },
                  {
                    value: 'publicationStatus',
                    label: 'publicationStatusItemText',
                  },
                  {
                    value: 'corporate',
                    label: 'corporateItemText',
                  },
                  {
                    value: 'personal',
                    label: 'personalItemText',
                  },
                  {
                    value: 'given',
                    label: 'givenItemText',
                  },
                  {
                    value: 'family',
                    label: 'familyItemText',
                  },
                  {
                    value: 'termsOfAddress',
                    label: 'termsOfAddressItemText',
                  },
                  {
                    value: 'series',
                    label: 'seriesItemText',
                  },
                  {
                    value: 'conference-publication',
                    label: 'conferencePublicationItemText',
                  },
                  {
                    value: 'statement_of_responsibility',
                    label: 'statementOfResponsibilityItemText',
                  },
                  {
                    value: 'book',
                    label: 'bookItemText',
                  },
                  {
                    value: 'journal',
                    label: 'journalItemText',
                  },
                  {
                    value: 'artNo',
                    label: 'artNoItemText',
                  },
                  {
                    value: 'issue',
                    label: 'issueItemText',
                  },
                  {
                    value: 'volume',
                    label: 'volumeItemText',
                  },
                  {
                    value: 'conference',
                    label: 'conferenceItemText',
                  },
                  {
                    value: 'initiative',
                    label: 'initiativeItemText',
                  },
                  {
                    value: 'funder',
                    label: 'funderItemText',
                  },
                  {
                    value: 'project',
                    label: 'projectItemText',
                  },
                  {
                    value: 'constituent',
                    label: 'constituentItemText',
                  },
                  {
                    value: 'thesis',
                    label: 'thesisItemText',
                  },
                  {
                    value: 'defence',
                    label: 'defenceItemText',
                  },
                  {
                    value: 'researchData',
                    label: 'researchDataItemText',
                  },
                  {
                    value: 'outputType',
                    label: 'outputTypeItemText',
                  },
                  {
                    value: 'internal',
                    label: 'internalItemText',
                  },
                  {
                    value: 'online',
                    label: 'onlineItemText',
                  },
                  {
                    value: 'biographical',
                    label: 'biographicalItemText',
                  },
                  {
                    value: 'patent',
                    label: 'patentItemText',
                  },
                ],
                finalValue: 'family',
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
    ],
    presentationStyle: '',
    childStyle: [''],
    gridColSpan: 12,
  },
};
