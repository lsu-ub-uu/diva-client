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
        childStyle: [],
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
        childStyle: [],
        gridColSpan: 12,
      },
    ],
    presentationStyle: '',
    childStyle: [],
    gridColSpan: 12,
  },
};

export const formDefCollVarsWithSameNameInDataNEW: RecordFormSchema = {
  validationTypeId: 'nationalSubjectCategory',
  form: {
    name: 'root',
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
        childStyle: [],
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
        childStyle: [],
        gridColSpan: 12,
      },
    ],
    presentationStyle: '',
    childStyle: [],
    gridColSpan: 12,
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

export const formDefWithOneCollectionVariable1_1: RecordFormSchema = {
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

export const formDefRequiredRepeatingCollectionVar1_X: RecordFormSchema = {
  validationTypeId: 'diva-output',
  form: {
    name: 'root',
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
        childStyle: [],
        gridColSpan: 12,
      },
    ],
    presentationStyle: '',
    childStyle: [],
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
