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
