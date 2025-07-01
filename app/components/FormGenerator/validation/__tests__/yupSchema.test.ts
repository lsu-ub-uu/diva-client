/*
 * Copyright 2023, 2024 Uppsala University Library
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

import { formDefWithRepeatingCollectionVar } from '@/__mocks__/data/form/collVar';
import {
  formDefWithNestedSurroundingContainers,
  formDefWithSurroundingContainerAroundTextVariable,
} from '@/__mocks__/data/form/container';
import {
  formDefWithOneGroupHavingTextVariableAsChild,
  formDefWithRepeatingGroup,
  formDefWithRepeatingGroupWithRepeatingChildGroup,
  formDefWithRepeatingGroupWithRepeatingChildGroupWithAttributes,
} from '@/__mocks__/data/form/group';
import {
  formDefWithTextVar,
  formDefWithTwoRepeatingVarsAndCollectionVar,
} from '@/__mocks__/data/form/textVar';
import { cleanFormData } from '@/utils/cleanFormData';
import { describe, expect, it } from 'vitest';
import * as yup from 'yup';
import type { FormComponentGroup, FormSchema } from '../../types';
import {
  createYupArrayFromSchema,
  generateYupSchema,
  generateYupSchemaFromFormSchema,
} from '../yupSchema';
import { group } from 'console';

describe('generate validation', () => {
  it('should return correct validationSchema for one textVar and one numberVar', () => {
    const yupSchema = generateYupSchemaFromFormSchema(
      formDefWithTextVar as FormSchema,
    );
    const actualSchema = yupSchema.describe().fields;

    expect(actualSchema).toMatchSnapshot();
  });

  it('should return correct validationSchema for one textVar with a surrounding container', () => {
    const yupSchema = generateYupSchemaFromFormSchema(
      formDefWithSurroundingContainerAroundTextVariable as FormSchema,
    );
    const actualSchema = yupSchema.describe().fields;

    expect(actualSchema).toMatchSnapshot();
  });

  it('should return correct validationSchema for with nested surrounding containers', () => {
    const yupSchema = generateYupSchemaFromFormSchema(
      formDefWithNestedSurroundingContainers as FormSchema,
    );
    const actualSchema = yupSchema.describe().fields;

    expect(actualSchema).toMatchSnapshot();
  });

  it('should return correct validationSchema for two repeating variables', () => {
    const yupSchema = generateYupSchemaFromFormSchema(
      formDefWithTwoRepeatingVarsAndCollectionVar as FormSchema,
    );
    const actualSchema = yupSchema.describe().fields;

    expect(actualSchema).toMatchSnapshot();
  });

  it('should return correct validationSchema for one repeating collectionVariable', () => {
    const yupSchema = generateYupSchemaFromFormSchema(
      formDefWithRepeatingCollectionVar as FormSchema,
    );
    const actualSchema = yupSchema.describe().fields;

    expect(actualSchema).toMatchSnapshot();
  });

  it('should return correct validationSchema for one group having a text variable', () => {
    const yupSchema = generateYupSchemaFromFormSchema(
      formDefWithOneGroupHavingTextVariableAsChild as FormSchema,
    );
    const actualSchema = yupSchema.describe().fields;

    expect(actualSchema).toMatchSnapshot();
  });

  it('should return correct validationSchema for repeating group having a text variable', () => {
    const yupSchema = generateYupSchemaFromFormSchema(
      formDefWithRepeatingGroup as FormSchema,
    );
    const actualSchema = yupSchema.describe().fields;

    expect(actualSchema).toMatchSnapshot();
  });

  it('should return correct validationSchema for repeating group having repeating child group with two name fields', () => {
    const yupSchema = generateYupSchemaFromFormSchema(
      formDefWithRepeatingGroupWithRepeatingChildGroup as FormSchema,
    );
    const actualSchema = yupSchema.describe().fields;

    expect(actualSchema).toMatchSnapshot();
  });

  it('should return correct validationSchema for repeating group having repeating child group with two name fields and different attributes', () => {
    const yupSchema = generateYupSchemaFromFormSchema(
      formDefWithRepeatingGroupWithRepeatingChildGroupWithAttributes as FormSchema,
    );
    const actualSchema = yupSchema.describe().fields;
    expect(actualSchema).toMatchSnapshot();
  });
});

describe('custom validate yupSchemas for array schemas', () => {
  it('should validate a list with a simple leaf value object being empty in the array', async () => {
    const optionalStringSchema = yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .when('$isNotNull', (isNotNull, field) =>
        isNotNull[0] ? field.required() : field,
      );

    const schema = yup.object({
      testArray: yup
        .array()
        .min(1)
        .max(3)
        .transform((array) =>
          array
            .map(cleanFormData)
            .filter((o: any) => Object.keys(o).length > 0),
        )
        .of(
          yup.object().shape({
            value: optionalStringSchema,
          }),
        ),
    });
    const data = {
      testArray: [{ value: '' }, { value: '' }, { value: 'test' }],
    };

    const actualData = await schema.validate(data);
    const expectedData = {
      testArray: [{ value: 'test' }],
    };
    expect(expectedData).toStrictEqual(actualData);
  });
});
describe('util functions', () => {
  describe('createYupArrayFromSchema', () => {
    it('creates one Yup Array', () => {
      const schema = yup.object().shape({
        person: yup.object().shape({
          firstName: yup.string().required(),
        }),
      });
      const actualData = createYupArrayFromSchema(
        schema,
        {
          minNumberOfRepeatingToShow: 0,
          repeatMin: 0,
          repeatMax: 10,
        },
        true,
      );
      expect(actualData).toMatchSnapshot();
    });
  });
});

describe('yupSchema', async () => {
  describe('optional ancestor group with a required field and required child group that has a required field', () => {
    const formSchema = {
      form: {
        name: 'root',
        type: 'group',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        components: [
          {
            name: 'grandPaGroup',
            type: 'group',
            repeat: {
              repeatMin: 0,
              repeatMax: 1,
            },
            components: [
              {
                name: 'uncleVar',
                type: 'textVariable',
                repeat: {
                  repeatMin: 0,
                  repeatMax: 1,
                },
                validation: {
                  type: 'regex',
                  pattern: '.+',
                },
              },
              {
                name: 'parentGroup',
                type: 'group',
                repeat: {
                  repeatMin: 1,
                  repeatMax: 1,
                },
                components: [
                  {
                    name: 'childVar',
                    type: 'textVariable',
                    repeat: {
                      repeatMin: 1,
                      repeatMax: 1,
                    },
                    validation: {
                      type: 'regex',
                      pattern: '.+',
                    },
                  },
                ],
              },
            ],
          } as FormComponentGroup,
        ],
      },
    } as FormSchema;

    it('is invalid when child field is empty and optional ancestor has value', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(formSchema);

      const data = {
        root: {
          grandPaGroup: {
            uncleVar: { value: 'Uncle Value' },
            parentGroup: {
              childVar: { value: '' },
            },
          },
        },
      };

      await expect(yupSchema.validate(data)).rejects.toThrow(
        'divaClient_fieldRequiredText',
      );
    });

    it('is valid when child and ancestor fields have value', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(formSchema);

      await expect(
        yupSchema.isValid({
          root: {
            grandPaGroup: {
              uncleVar: { value: 'Uncle Value' },
              parentGroup: {
                childVar: { value: 'Child Value' },
              },
            },
          },
        }),
      ).resolves.toBe(true);
    });

    it('is valid when neither child nor ancestor has value', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(formSchema);

      await expect(
        yupSchema.isValid({
          root: {
            grandPaGroup: {
              uncleVar: { value: '' },
              parentGroup: {
                childVar: { value: '' },
              },
            },
          },
        }),
      ).resolves.toBe(true);
    });
  });
});
