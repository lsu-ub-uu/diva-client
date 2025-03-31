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
