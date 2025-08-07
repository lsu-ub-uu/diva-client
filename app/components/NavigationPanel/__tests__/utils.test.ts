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

import { formDefWithTwoTextVariableWithModeOutput } from '@/__mocks__/data/form/textVar';
import { describe, expect, it } from 'vitest';
import {
  flattenObject,
  getLastKeyFromString,
  linksFromFormSchema,
  removeComponentsWithoutValuesFromSchema,
  toShortString,
} from '../utils';
import {
  authorAndTitleSchema,
  authorRecord,
  coraRecord,
  coraRecord2,
  coraRecord3,
} from './mocks';
import type { RecordFormSchema } from '@/components/FormGenerator/types';

describe('linksFromFormSchema', () => {
  it('returns an empty array for an empty form schema', () => {
    const formSchema: RecordFormSchema = {
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
        components: [],
        mode: 'output',
      },
    };
    const links = linksFromFormSchema(formSchema);
    expect(links).toEqual([]);
  });

  it('returns links to top level variables, groups and containers with labels in the form schema', () => {
    const formSchema: RecordFormSchema = {
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
        components: [
          {
            type: 'textVariable',
            name: 'someTextVar',
            label: 'Some Text Variable',
          },
          {
            type: 'group',
            name: 'someGroup',
            label: 'Some Group',
            components: [
              {
                type: 'textVariable',
                name: 'someNestedTextVar',
                label: 'Some Nested Text Variable',
              },
            ],
          },
          {
            type: 'group',
            name: 'someGroupWithoutLabel',
            showLabel: false,
            components: [
              {
                type: 'textVariable',
                name: 'someNestedTextVar',
                label: 'Some Nested Text Variable',
              },
            ],
          },
          {
            type: 'container',
            name: 'someContainer',
            label: 'Some Container',
            components: [
              {
                type: 'textVariable',
                name: 'someContainerTextVar',
              },
            ],
          },
          {
            type: 'container',
            name: 'someContainerWithoutLabel',
            showLabel: false,
            components: [
              {
                type: 'textVariable',
                name: 'someContainerTextVar',
              },
            ],
          },
        ],
        mode: 'output',
      },
    };
    const links = linksFromFormSchema(formSchema);
    expect(links).toEqual([
      {
        label: 'Some Text Variable',
        name: 'someTextVar',
      },
      {
        label: 'Some Group',
        name: 'someGroup',
      },
      {
        label: 'Some Container',
        name: 'someContainer',
      },
    ]);
  });

  it('adds attributes to the name', () => {
    const formSchema: RecordFormSchema = {
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
        components: [
          {
            type: 'group',
            name: 'someGroup',
            label: 'Some Group With Attributes',
            attributes: [
              {
                name: 'someAttribute',
                finalValue: 'someFinalValue',
                label: 'Some Attribute',
                showLabel: true,
                type: 'collectionVariable',
                options: [
                  { label: 'Some final value', value: 'someFinalValue' },
                ],
              },
            ],
          },
        ],
        mode: 'output',
      },
    };
    const links = linksFromFormSchema(formSchema);
    expect(links).toEqual([
      {
        label: 'Some Group With Attributes',
        name: 'someGroup_someAttribute_someFinalValue',
      },
    ]);
  });

  it('creates entries for components with title but no label', () => {
    const formSchema: RecordFormSchema = {
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
        components: [
          {
            type: 'container',
            name: 'someContainerWithTitle',
            showLabel: false,
            title: 'Some container title',
            components: [
              {
                type: 'textVariable',
                name: 'someTextVar',
                label: 'Some Text Variable',
              },
            ],
          },
        ],
        mode: 'output',
      },
    };

    const links = linksFromFormSchema(formSchema);

    expect(links).toEqual([
      {
        label: 'Some container title',
        name: 'someContainerWithTitle',
      },
    ]);
  });

  it('creates entries for h2 texts', () => {
    const formSchema: RecordFormSchema = {
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
        components: [
          {
            type: 'text',
            name: 'SomeH2Text',
            textStyle: 'h2TextStyle',
          },
          {
            type: 'text',
            name: 'SomeH3Text',
            textStyle: 'h3TextStyle',
          },
          {
            type: 'text',
            name: 'SomeBodyText',
            textStyle: 'bodyTextStyle',
          },
        ],
        mode: 'output',
      },
    };

    const links = linksFromFormSchema(formSchema);

    expect(links).toEqual([
      {
        label: 'SomeH2Text',
        name: 'SomeH2Text',
      },
    ]);
  });
});

describe('removeComponentsWithoutValuesFromSchema', () => {
  it('returns someRootNameInData', () => {
    const actual = removeComponentsWithoutValuesFromSchema(
      formDefWithTwoTextVariableWithModeOutput,
      coraRecord,
    );
    expect(actual).toStrictEqual({
      validationTypeId: 'someValidationTypeId',
      form: {
        type: 'group',
        label: 'someRootFormGroupText',
        name: 'someRootNameInData',
        presentationId: 'somePGroup',

        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        showLabel: true,
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
        ],
        mode: 'output',
      },
    });
  });

  it('returns textVar', () => {
    const actual = removeComponentsWithoutValuesFromSchema(
      formDefWithTwoTextVariableWithModeOutput,
      coraRecord,
    );
    expect(actual).toStrictEqual({
      validationTypeId: 'someValidationTypeId',
      form: {
        type: 'group',
        label: 'someRootFormGroupText',
        name: 'someRootNameInData',
        presentationId: 'somePGroup',

        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        showLabel: true,
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
        ],
        mode: 'output',
      },
    });
  });

  it('returns an author group', () => {
    const actual = removeComponentsWithoutValuesFromSchema(
      authorAndTitleSchema,
      authorRecord,
    );
    expect(actual).toStrictEqual({
      validationTypeId: 'preprint',
      form: {
        name: 'divaOutput',
        presentationId: 'divaOutputGroup',

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
            presentationId: 'group',

            showLabel: true,
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1.7976931348623157e308,
            },
            components: [
              {
                name: 'givenName',
                presentationId: 'givenName',

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
                presentationId: 'familyName',
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
              {
                name: 'birthYear',
                presentationId: 'somePTextVar',

                type: 'textVariable',
                mode: 'output',
                inputType: 'input',
                tooltip: {
                  title: 'birthYearTextVarText',
                  body: 'birthYearTextVarDefText',
                },
                label: 'birthYearTextVarText',
                showLabel: true,
                validation: {
                  type: 'regex',
                  pattern: '(^[0-9]{4,4}$)',
                },
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 0,
                  repeatMax: 1,
                },
                childStyle: ['sixChildStyle'],
                gridColSpan: 6,
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
    });
  });
});

describe('flattenObj', () => {
  it(' returns flattened object with one variable', () => {
    const actual = flattenObject(coraRecord.data);

    expect(actual).toStrictEqual({
      'someRootNameInData.recordInfo.createdBy.value': '161616',
      'someRootNameInData.recordInfo.dataDivider.value': 'divaData',
      'someRootNameInData.recordInfo.id.value': '12345',
      'someRootNameInData.recordInfo.tsCreated.value':
        '2024-10-16T12:36:04.249992Z',
      'someRootNameInData.recordInfo.type.value': 'record',
      'someRootNameInData.recordInfo.updated.0.tsUpdated.value':
        '2024-10-16T12:36:04.249992Z',
      'someRootNameInData.recordInfo.updated.0.updatedBy.value': '161616',
      'someRootNameInData.recordInfo.validationType.value': 'record',
      'someRootNameInData.someTextVar.value': 'someTestText',
    });
  });

  it(' returns flattened object with two variables', () => {
    const actual = flattenObject(coraRecord2.data);

    expect(actual).toStrictEqual({
      'someRootNameInData.someOtherTextVar.value': 'someOtherTestText',
      'someRootNameInData.someTextVar.value': 'someTestText',
    });
  });

  it(' returns flattened object with multiple variables and attributes', () => {
    const actual = flattenObject(coraRecord3.data);

    expect(actual).toStrictEqual({
      'divaOutput.author.0.familyName.value': 'Swenning',
      'divaOutput.author.0.givenName.value': 'Egil',
      'divaOutput.domain.value': 'du',
      'divaOutput.outputType.outputType.value': 'publication',
      'divaOutput.title._language': 'ady',
      'divaOutput.title.mainTitle.value': 'aaaaa',
    });
  });
});
describe('toShortString', () => {
  it(' returns toShortString for one variable', () => {
    const actual = toShortString({
      'someRootNameInData.someTextVar.value': 'someTestText',
    });

    expect(actual).toStrictEqual(['someRootNameInData.someTextVar']);
  });

  it(' returns toShortString for one variable with attribute', () => {
    const actual = toShortString({
      'divaOutput.title.mainTitle.value': 'asdasd',
      'divaOutput.title._language': 'akk',
    });

    expect(actual).toStrictEqual(['divaOutput.title']);
  });

  it(' returns toShortString for two variables', () => {
    const actual = toShortString({
      'someRootNameInData.someOtherTextVar.value': 'someOtherTestText',
      'someRootNameInData.someTextVar.value': 'someTestText',
    });

    expect(actual).toStrictEqual([
      'someRootNameInData.someOtherTextVar',
      'someRootNameInData.someTextVar',
    ]);
  });
});
describe('getLastKeyFromString', () => {
  it(' returns one getLastKeyFromString', () => {
    const actual = getLastKeyFromString(['someRootNameInData.someTextVar']);

    expect(actual).toStrictEqual(['someTextVar']);
  });

  it(' returns two getLastKeyFromString', () => {
    const actual = getLastKeyFromString([
      'someRootNameInData.someOtherTextVar',
      'someRootNameInData.someTextVar',
    ]);

    expect(actual).toStrictEqual(['someOtherTextVar', 'someTextVar']);
  });
});
