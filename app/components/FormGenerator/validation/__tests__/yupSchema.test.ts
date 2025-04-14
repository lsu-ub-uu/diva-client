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

import type { AnyObject, ArraySchema, ObjectSchema, StringSchema } from 'yup';
import * as yup from 'yup';
import {
  createValidationForAttributesFromComponent,
  createValidationFromComponentType,
  createYupArrayFromSchema,
  createYupNumberSchema,
  generateYupSchemaFromFormSchema,
} from '../yupSchema';
import type {
  FormComponent,
  FormComponentNumVar,
  FormSchema,
} from '../../types';
import { cleanFormData } from '@/utils/cleanFormData';
import {
  formDefWithSingleTextVar,
  formDefWithTextVar,
  formDefWithTwoRepeatingVarsAndCollectionVar,
} from '@/__mocks__/data/form/textVar';
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
import { formDefWithRepeatingCollectionVar } from '@/__mocks__/data/form/collVar';
import { formDefWithOneNumberVariable } from '@/__mocks__/data/form/numVar';

const numberValidationTests = (
  min: number,
  max: number,
  numberOfDecimals: number,
) => [
  { name: 'matches', params: { regex: /^[1-9]\d*(\.\d+)?$/ } },
  { name: 'decimal-places', params: { numberOfDecimals } },
  { name: 'min', params: { min } },
  { name: 'max', params: { max } },
];

const stringValidationTests = (regex: RegExp) => [
  { name: 'matches', params: { regex } },
];

const requiredValidationTests = [{ name: 'required', params: undefined }];

const minMaxValidationTests = (min: number, max: number) => [
  {
    name: 'min',
    params: {
      min,
    },
  },
  {
    name: 'max',
    params: {
      max,
    },
  },
];

const validationTestsExtras = (
  optional: boolean,
  type: 'string' | 'array' | 'object',
  tests: unknown[],
  defaultParam: object | undefined,
  nullable: boolean,
) => {
  return {
    optional,
    type,
    tests,
    default: defaultParam,
    label: undefined,
    meta: undefined,
    notOneOf: [],
    nullable,
    oneOf: [],
  };
};

const validationSpecExtras = (
  optional: boolean,
  tests: unknown[],
  transforms: unknown[],
  type: 'string' | 'array' | 'object',
) => {
  return {
    spec: {
      abortEarly: true,
      coerce: true,
      nullable: false,
      optional,
      recursive: true,
      strict: false,
      strip: false,
    },
    tests,
    transforms,
    type,
  };
};
const validationExclusiveExtras = (
  _excludedEdges: boolean,
  _sortErrors: boolean,
) => {
  const obj: any = {
    _blacklist: new Set([]),
    _mutate: undefined,
    _typeCheck: function check() {},
    _whitelist: new Set([]),
    conditions: [],
    deps: [],
    exclusiveTests: {},
  };
  if (_excludedEdges) {
    obj._excludedEdges = [];
  }
  if (_sortErrors) {
    obj._sortErrors = function anonymous() {};
  }

  return obj;
};

describe('generate validation', () => {
  it('should return correct validationSchema for one textVar', () => {
    const actualSchema = generateYupSchemaFromFormSchema(
      formDefWithSingleTextVar as FormSchema,
    );

    const expectedSchema = yup.object({
      someRootNameInData: yup.object({
        someNameInData: yup.object({
          value: yup
            .string()
            .required()
            .matches(/^[a-zA-Z]$/),
        }),
      }),
    });
    const actualData = actualSchema.describe();
    const expectedData = expectedSchema.describe();
    expect(actualData).toStrictEqual(expectedData);
  });

  it('should return correct validationSchema for one numVar', () => {
    const actualSchema = generateYupSchemaFromFormSchema(
      formDefWithOneNumberVariable as FormSchema,
    );

    /*
 { name: 'matches', params: { regex: /^[1-9]\d*(\.\d+)?$/ } },
  { name: 'decimal-places', params: { numberOfDecimals } },
  { name: 'min', params: { min } },
  { name: 'max', params: { max } },
    */
    const expectedSchema = yup.object({
      someRootNameInData: yup.object({
        someNumberVariableNameInData: yup.object({
          value: yup
            .string()
            .required()
            .matches(/^[1-9]\d*(\.\d+)?$/)
            .test({
              name: 'decimal-places',
              params: { numberOfDecimals: 0 },
              test: vi.fn(),
            })
            .min(1)
            .max(20),
        }),
      }),
    });
    const actualData = actualSchema.describe();
    const expectedData = expectedSchema.describe();
    expect(actualData).toStrictEqual(expectedData);
  });

  it('should return correct validationSchema for one textVar with a surrounding container', () => {
    const yupSchema = generateYupSchemaFromFormSchema(
      formDefWithSurroundingContainerAroundTextVariable as FormSchema,
    );
    const actualSchema = yupSchema.describe().fields;

    const expectedSchema = {
      someRootNameInData: {
        type: 'object',
        fields: {
          someNameInData: {
            type: 'object',
            fields: {
              value: {
                type: 'string',
              },
            },
          },
        },
      },
    };
    expect(actualSchema).toMatchObject(expectedSchema);
  });

  it('should return correct validationSchema for with nested surrounding containers', () => {
    const yupSchema = generateYupSchemaFromFormSchema(
      formDefWithNestedSurroundingContainers as FormSchema,
    );
    const actualSchema = yupSchema.describe().fields;

    const expectedSchema = {
      someRootNameInData: {
        type: 'object',
        fields: {
          someNameInData: {
            type: 'object',
            fields: {
              value: {
                type: 'string',
              },
            },
          },
        },
      },
    };
    expect(actualSchema).toMatchObject(expectedSchema);
  });

  it('should return correct validationSchema for two repeating variables', () => {
    const yupSchema = generateYupSchemaFromFormSchema(
      formDefWithTwoRepeatingVarsAndCollectionVar as FormSchema,
    );
    const actualSchema = yupSchema.describe().fields;

    const expectedSchema = {
      someRootNameInData: {
        ...validationTestsExtras(
          true,
          'object',
          [],
          {
            colour: {
              value: undefined,
            },
            someNameInData: undefined,
            someNumberVariableNameInData: undefined,
          },
          false,
        ),

        fields: {
          someNameInData: {
            ...validationTestsExtras(
              true,
              'array',
              minMaxValidationTests(0, 2),
              undefined,
              false,
            ),
            innerType: {
              ...validationTestsExtras(
                true,
                'object',
                [],
                {
                  value: undefined,
                },
                false,
              ),
              fields: {
                value: {
                  ...validationTestsExtras(
                    true,
                    'string',
                    [
                      {
                        name: 'matches',
                        params: {
                          regex: /^[a-zA-Z]$/,
                        },
                      },
                    ],
                    undefined,
                    true,
                  ),

                  nullable: true,
                },
              },
            },
          },
          someNumberVariableNameInData: {
            innerType: {
              fields: {
                value: {
                  ...validationTestsExtras(
                    true,
                    'string',
                    numberValidationTests(0, 20, 2),
                    undefined,
                    false,
                  ),
                },
              },

              ...validationTestsExtras(
                true,
                'object',
                [],
                {
                  value: undefined,
                },
                false,
              ),
            },
            ...validationTestsExtras(
              true,
              'array',
              minMaxValidationTests(1, 5),
              undefined,
              false,
            ),
          },
          colour: {
            ...validationTestsExtras(
              true,
              'object',
              [],
              {
                value: undefined,
              },
              false,
            ),

            fields: {
              value: {
                ...validationTestsExtras(
                  false,
                  'string',
                  [
                    {
                      name: 'required',
                      params: undefined,
                    },
                  ],
                  undefined,
                  false,
                ),
              },
            },
          },
        },
      },
    };
    expect(actualSchema).toMatchObject(expectedSchema);
  });

  it('should return correct validationSchema for one repeating collectionVariable', () => {
    const yupSchema = generateYupSchemaFromFormSchema(
      formDefWithRepeatingCollectionVar as FormSchema,
    );
    const actualSchema = yupSchema.describe().fields;

    const expectedSchema = {
      someRootNameInData: {
        fields: {
          colour: {
            innerType: {
              fields: {
                value: {
                  ...validationTestsExtras(true, 'string', [], undefined, true),
                  nullable: true,
                },
              },
              ...validationTestsExtras(
                true,
                'object',
                [],
                {
                  value: undefined,
                },
                false,
              ),
            },
            ...validationTestsExtras(
              true,
              'array',
              minMaxValidationTests(0, 3),
              undefined,
              false,
            ),
          },
        },
        ...validationTestsExtras(
          true,
          'object',
          [],
          {
            colour: undefined,
          },
          false,
        ),
      },
    };
    expect(actualSchema).toMatchObject(expectedSchema);
  });

  it('should return correct validationSchema for one group having a text variable', () => {
    const yupSchema = generateYupSchemaFromFormSchema(
      formDefWithOneGroupHavingTextVariableAsChild as FormSchema,
    );
    const actualSchema = yupSchema.describe().fields;

    const expectedSchema = {
      someRootNameInData: {
        type: 'object',
        fields: {
          someChildGroupNameInData: {
            type: 'object',
            fields: {
              someNameInData: {
                type: 'object',
                fields: {
                  value: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    };
    expect(actualSchema).toMatchObject(expectedSchema);
  });

  it('should return correct validationSchema for repeating group having a text variable', () => {
    const yupSchema = generateYupSchemaFromFormSchema(
      formDefWithRepeatingGroup as FormSchema,
    );
    const actualSchema = yupSchema.describe().fields;

    const expectedSchema = {
      someRootNameInData: {
        fields: {
          firstChildGroup: {
            innerType: {
              fields: {
                exampleNumberVar: {
                  fields: {
                    value: {
                      ...validationTestsExtras(
                        true,
                        'string',
                        [
                          {
                            name: 'checkIfStringVariableHasSiblingsWithValuesInContext',
                            params: undefined,
                          },
                        ],
                        undefined,
                        true,
                      ),
                    },
                  },
                  ...validationTestsExtras(
                    true,
                    'object',
                    [],
                    {
                      value: undefined,
                    },
                    false,
                  ),
                },
              },
              ...validationTestsExtras(
                true,
                'object',
                [],
                {
                  exampleNumberVar: {
                    value: undefined,
                  },
                },
                false,
              ),
            },
            ...validationTestsExtras(
              true,
              'array',
              minMaxValidationTests(0, 10),
              undefined,
              false,
            ),
          },
        },
        ...validationTestsExtras(
          true,
          'object',
          [],
          {
            firstChildGroup: undefined,
          },
          false,
        ),
      },
    };

    expect(actualSchema).toMatchObject(expectedSchema);
  });

  it('should return correct validationSchema for repeating group having repeating child group with two name fields', () => {
    const yupSchema = generateYupSchemaFromFormSchema(
      formDefWithRepeatingGroupWithRepeatingChildGroup as FormSchema,
    );
    const actualSchema = yupSchema.describe().fields;

    const expectedSchema = {
      someRootNameInData: {
        fields: {
          author: {
            innerType: {
              fields: {
                name: {
                  innerType: {
                    fields: {
                      firstName: {
                        ...validationTestsExtras(true, 'object', [], {}, false),
                        fields: {
                          value: {
                            type: 'string',
                          },
                        },
                      },
                      lastName: {
                        ...validationTestsExtras(true, 'object', [], {}, false),
                        fields: {
                          value: {
                            type: 'string',
                          },
                        },
                      },
                      age: {
                        ...validationTestsExtras(true, 'object', [], {}, false),
                        fields: {
                          value: {
                            type: 'string',
                            tests: numberValidationTests(0, 125, 0),
                          },
                        },
                      },
                    },
                    ...validationTestsExtras(
                      true,
                      'object',
                      [],
                      {
                        age: {
                          value: undefined,
                        },
                        firstName: {
                          value: undefined,
                        },
                        lastName: {
                          value: undefined,
                        },
                      },
                      false,
                    ),
                  },
                  ...validationTestsExtras(
                    true,
                    'array',
                    minMaxValidationTests(1, 100),
                    undefined,
                    false,
                  ),
                },
              },
              ...validationTestsExtras(
                true,
                'object',
                [],
                {
                  name: undefined,
                },
                false,
              ),
            },
            ...validationTestsExtras(
              true,
              'array',
              minMaxValidationTests(1, 10),
              undefined,
              false,
            ),
          },
        },
        ...validationTestsExtras(
          true,
          'object',
          [],
          {
            author: undefined,
          },
          false,
        ),
      },
    };

    expect(actualSchema).toMatchObject(expectedSchema);
  });

  it('should return correct validationSchema for repeating group having repeating child group with two name fields and different attributes', () => {
    const yupSchema = generateYupSchemaFromFormSchema(
      formDefWithRepeatingGroupWithRepeatingChildGroupWithAttributes as FormSchema,
    );
    const actualSchema = yupSchema.describe().fields;

    const expectedSchema = {
      someRootNameInData: {
        ...validationTestsExtras(
          true,
          'object',
          [],
          {
            author: undefined,
            grade: undefined,
            nonRepeatingGroup: {
              _groupAttribute: undefined,
            },
          },
          false,
        ),
        fields: {
          grade: {
            innerType: {
              fields: {
                _gradeAttribute: {
                  ...validationTestsExtras(
                    true,
                    'string',
                    [
                      {
                        name: 'checkIfStringVariableHasSiblingsWithValues',
                        params: undefined,
                      },
                    ],
                    undefined,
                    true,
                  ),
                },
                value: {
                  ...validationTestsExtras(
                    true,
                    'string',
                    numberValidationTests(1, 5, 0),
                    undefined,
                    false,
                  ),
                },
              },
              ...validationTestsExtras(
                true,
                'object',
                [],
                {
                  _gradeAttribute: undefined,
                  value: undefined,
                },
                false,
              ),
            },
            ...validationTestsExtras(
              true,
              'array',
              minMaxValidationTests(1, 12),
              undefined,
              false,
            ),
          },
          nonRepeatingGroup: {
            ...validationTestsExtras(
              true,
              'object',
              [],
              {
                _groupAttribute: undefined,
              },
              false,
            ),
            fields: {
              _groupAttribute: {
                type: 'string',
                default: undefined,
                label: undefined,
                meta: undefined,
                notOneOf: [],
                nullable: false,
                oneOf: [],
                optional: false,
                tests: requiredValidationTests,
              },
            },
          },
          author: {
            innerType: {
              fields: {
                _colourAttribute: {
                  ...validationTestsExtras(
                    false,
                    'string',
                    [
                      {
                        name: 'required',
                        params: undefined,
                      },
                    ],
                    undefined,
                    false,
                  ),
                },
                name: {
                  innerType: {
                    fields: {
                      firstName: {
                        ...validationTestsExtras(
                          true,
                          'object',
                          [],
                          {
                            _colourAttribute: undefined,
                            value: undefined,
                          },
                          false,
                        ),
                        fields: {
                          value: {
                            ...validationTestsExtras(
                              false,
                              'string',
                              [
                                ...requiredValidationTests,
                                {
                                  name: 'matches',
                                  params: {
                                    regex: /^[a-zA-Z]$/,
                                  },
                                },
                              ],
                              undefined,
                              false,
                            ),
                          },
                          _colourAttribute: {
                            ...validationTestsExtras(
                              true,
                              'string',
                              [
                                {
                                  name: 'checkIfStringVariableHasSiblingsWithValues',
                                  params: undefined,
                                },
                              ],
                              undefined,
                              true,
                            ),
                          },
                        },
                      },
                      lastName: {
                        ...validationTestsExtras(true, 'object', [], {}, false),
                        fields: {
                          value: {
                            ...validationTestsExtras(
                              false,
                              'string',
                              [
                                ...requiredValidationTests,
                                {
                                  name: 'matches',
                                  params: {
                                    regex: /^[a-zA-Z]$/,
                                  },
                                },
                              ],
                              undefined,
                              false,
                            ),
                          },
                        },
                      },
                      age: {
                        ...validationTestsExtras(
                          true,
                          'object',
                          [],
                          {
                            value: undefined,
                          },
                          false,
                        ),
                        fields: {
                          value: {
                            ...validationTestsExtras(
                              true,
                              'string',
                              numberValidationTests(0, 125, 0),
                              undefined,
                              false,
                            ),
                          },
                        },
                      },
                    },
                    ...validationTestsExtras(
                      true,
                      'object',
                      [],
                      {
                        age: {
                          value: undefined,
                        },
                        firstName: {
                          _colourAttribute: undefined,
                          value: undefined,
                        },
                        lastName: {
                          value: undefined,
                        },
                      },
                      false,
                    ),
                  },
                  ...validationTestsExtras(
                    true,
                    'array',
                    minMaxValidationTests(1, 100),
                    undefined,
                    false,
                  ),
                },
              },
              ...validationTestsExtras(
                true,
                'object',
                [],
                {
                  _colourAttribute: undefined,
                  name: undefined,
                },
                false,
              ),
            },
            ...validationTestsExtras(
              true,
              'array',
              minMaxValidationTests(1, 10),
              undefined,
              false,
            ),
          },
        },
      },
    };
    expect(actualSchema).toMatchObject(expectedSchema);
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
    it.todo('creates one Yup Array', () => {
      const expectedSchema = <ArraySchema<any, any, undefined, ''>>(<unknown>{
        _blacklist: new Set([]),
        _typeCheck: function check() {},
        _whitelist: new Set([]),
        conditions: [],
        deps: [],
        exclusiveTests: {
          max: true,
          min: true,
        },
        innerType: <ObjectSchema<any, AnyObject, any, ''>>{
          ...validationExclusiveExtras(true, true),
          _nodes: ['person'],
          fields: {
            person: {
              ...validationExclusiveExtras(true, true),
              _nodes: ['firstName'],
              fields: {
                firstName: {
                  ...validationExclusiveExtras(false, false),
                  _mutate: undefined,
                  exclusiveTests: {
                    required: false,
                  },
                  internalTests: {
                    nullable: function validate() {},
                    optionality: function validate() {},
                    typeError: function validate() {},
                  },
                  ...validationSpecExtras(
                    false,
                    [function validate() {}],
                    [() => {}],
                    'string',
                  ),
                } as StringSchema<string | undefined, AnyObject, undefined, ''>,
              },
              internalTests: {
                nullable: function validate() {},
                typeError: function validate() {},
              },
              ...validationSpecExtras(true, [], [], 'object'),
            } as ObjectSchema<any, AnyObject, any, ''>,
          },
          internalTests: {
            nullable: function validate() {},
            typeError: function validate() {},
          },
          ...validationSpecExtras(true, [], [], 'object'),
        },
        internalTests: {
          nullable: function validate() {},
          typeError: function validate() {},
        },
        ...validationSpecExtras(
          true,
          [function validate() {}, function validate() {}],
          [],
          'array',
        ),
      });

      const schema = yup.object().shape({
        person: yup.object().shape({
          firstName: yup.string().required(),
        }),
      });
      const actualData = createYupArrayFromSchema(schema, {
        minNumberOfRepeatingToShow: 0,
        repeatMin: 0,
        repeatMax: 10,
      });
      expect(expectedSchema).toMatchObject(actualData);
    });
  });
  describe('createValidationForAttributesFromComponent', () => {
    it.todo('creates one validation for a attribute', () => {
      const expectedData = {};
      const actualData = createValidationForAttributesFromComponent({
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
        showLabel: true,
        attributes: [
          {
            label: 'exampleLabel',
            type: 'collectionVariable',
            showLabel: true,
            name: 'colourAttribute',
            placeholder: 'emptyTextId',
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
            mode: 'input',
          },
        ],
      });
      expect(expectedData).toMatchObject(actualData);
    });
  });
  describe('createValidationFromComponentType', () => {
    it.todo('textVariable', () => {
      const component: FormComponent = {
        name: 'exampleNumberVar',
        type: 'numberVariable',
        mode: 'input',
        tooltip: {
          title: 'exampleMetadataNumberVarText',
          body: 'exampleMetadataNumberVarDefText',
        },
        label: 'exampleMetadataNumberVarText',
        finalValue: '12',
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
      };
      createValidationFromComponentType(component);
      const mock = vi.fn();
      createYupNumberSchema(component as FormComponentNumVar);
      expect(mock).toHaveBeenCalledTimes(1);
    });
  });
});
