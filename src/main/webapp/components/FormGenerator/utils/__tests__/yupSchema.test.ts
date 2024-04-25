/*
 * Copyright 2024 Uppsala University Library
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

import * as yup from 'yup';
import { AnyObject, ArraySchema, ObjectSchema, StringSchema } from 'yup';
import {
  createValidationForAttributesFromComponent,
  createValidationFromComponentType,
  createYupArrayFromSchema,
  createYupNumberSchema,
  generateYupSchemaFromFormSchema,
} from '../yupSchema';
import {
  formDef,
  formDefWithNestedSurroundingContainers,
  formDefWithOneGroupHavingTextVariableAsChild,
  formDefWithRepeatingCollectionVar,
  formDefWithRepeatingGroup,
  formDefWithRepeatingGroupWithRepeatingChildGroup,
  formDefWithRepeatingGroupWithRepeatingChildGroupWithAttributes,
  formDefWithSurroundingContainerAroundTextVariable,
  formDefWithTwoRepeatingVarsAndCollectionVar,
} from '../../../../__mocks__/data/formDef';
import { FormComponent, FormSchema } from '../../types';
import { removeEmpty } from '../../../../utils/removeEmpty';

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

const requiredValidationTests = [{ name: 'required' }];

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
  defaultParam: Object | undefined,
) => {
  return {
    optional,
    type,
    tests,
    default: defaultParam,
    label: undefined,
    meta: undefined,
    notOneOf: [],
    nullable: false,
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
    // eslint-disable-next-line no-underscore-dangle
    obj._excludedEdges = [];
  }
  if (_sortErrors) {
    // eslint-disable-next-line no-underscore-dangle
    obj._sortErrors = function anonymous() {};
  }

  return obj;
};

describe('generate yupSchema', () => {
  it('should return correct validationSchema for one textVar and one numberVar', () => {
    const yupSchema = generateYupSchemaFromFormSchema(formDef as FormSchema);
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
                tests: stringValidationTests(/^[a-zA-Z]$/),
              },
            },
          },
          someNumberVariableNameInData: {
            type: 'object',
            fields: {
              value: {
                type: 'string',
                tests: numberValidationTests(0, 20, 0),
              },
            },
          },
        },
      },
    };
    expect(actualSchema).toMatchObject(expectedSchema);
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
        ...validationTestsExtras(true, 'object', [], {
          colour: {
            value: undefined,
          },
          someNameInData: undefined,
          someNumberVariableNameInData: undefined,
        }),

        fields: {
          someNameInData: {
            ...validationTestsExtras(
              true,
              'array',
              minMaxValidationTests(0, 2),
              undefined,
            ),
            innerType: {
              ...validationTestsExtras(true, 'object', [], {
                value: undefined,
              }),
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
                  ),

                  nullable: true,
                },
              },
            },
          },
          someNumberVariableNameInData: {
            innerType: {
              // ...validationTestsExtras(),
              fields: {
                value: {
                  ...validationTestsExtras(
                    true,
                    'string',
                    numberValidationTests(0, 20, 2),
                    undefined,
                  ),
                },
              },

              ...validationTestsExtras(true, 'object', [], {
                value: undefined,
              }),
            },
            ...validationTestsExtras(
              true,
              'array',
              minMaxValidationTests(1, 5),
              undefined,
            ),
          },
          colour: {
            ...validationTestsExtras(true, 'object', [], {
              value: undefined,
            }),

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
                  ...validationTestsExtras(true, 'string', [], undefined),
                  nullable: true,
                },
              },
              ...validationTestsExtras(true, 'object', [], {
                value: undefined,
              }),
            },
            ...validationTestsExtras(
              true,
              'array',
              minMaxValidationTests(0, 3),
              undefined,
            ),
          },
        },
        ...validationTestsExtras(true, 'object', [], {
          colour: undefined,
        }),
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
                        numberValidationTests(0, 20, 2),
                        undefined,
                      ),
                    },
                  },
                  ...validationTestsExtras(true, 'object', [], {
                    value: undefined,
                  }),
                },
              },
              ...validationTestsExtras(true, 'object', [], {
                exampleNumberVar: {
                  value: undefined,
                },
              }),
            },
            ...validationTestsExtras(
              true,
              'array',
              minMaxValidationTests(0, 10),
              undefined,
            ),
          },
        },
        ...validationTestsExtras(true, 'object', [], {
          firstChildGroup: undefined,
        }),
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
                        ...validationTestsExtras(true, 'object', [], {}),
                        fields: {
                          value: {
                            type: 'string',
                          },
                        },
                      },
                      lastName: {
                        ...validationTestsExtras(true, 'object', [], {}),
                        fields: {
                          value: {
                            type: 'string',
                          },
                        },
                      },
                      age: {
                        ...validationTestsExtras(true, 'object', [], {}),
                        fields: {
                          value: {
                            type: 'string',
                            tests: numberValidationTests(0, 125, 0),
                          },
                        },
                      },
                    },
                    ...validationTestsExtras(true, 'object', [], {
                      age: {
                        value: undefined,
                      },
                      firstName: {
                        value: undefined,
                      },
                      lastName: {
                        value: undefined,
                      },
                    }),
                  },
                  ...validationTestsExtras(
                    true,
                    'array',
                    minMaxValidationTests(1, 100),
                    undefined,
                  ),
                },
              },
              ...validationTestsExtras(true, 'object', [], {
                name: undefined,
              }),
            },
            ...validationTestsExtras(
              true,
              'array',
              minMaxValidationTests(1, 10),
              undefined,
            ),
          },
        },
        ...validationTestsExtras(true, 'object', [], {
          author: undefined,
        }),
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
        default: {
          author: undefined,
          grade: undefined,
          nonRepeatingGroup: {
            _groupAttribute: undefined,
          },
        },
        type: 'object',
        fields: {
          grade: {
            innerType: {
              fields: {
                _gradeAttribute: {
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
                  ),
                },
                value: {
                  ...validationTestsExtras(
                    true,
                    'string',
                    numberValidationTests(1, 5, 0),
                    undefined,
                  ),
                },
              },
              ...validationTestsExtras(true, 'object', [], {
                _gradeAttribute: undefined,
                value: undefined,
              }),
            },
            ...validationTestsExtras(
              true,
              'array',
              minMaxValidationTests(1, 12),
              undefined,
            ),
          },
          nonRepeatingGroup: {
            type: 'object',
            fields: {
              _groupAttribute: {
                type: 'string',
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
                  ),
                  // attribute values are always required
                },
                name: {
                  innerType: {
                    fields: {
                      firstName: {
                        ...validationTestsExtras(true, 'object', [], {}),
                        fields: {
                          value: {
                            type: 'string',
                          },
                          _colourAttribute: {
                            type: 'string',
                            tests: requiredValidationTests,
                          },
                        },
                      },
                      lastName: {
                        ...validationTestsExtras(true, 'object', [], {}),
                        fields: {
                          value: {
                            type: 'string',
                          },
                        },
                      },
                      age: {
                        ...validationTestsExtras(true, 'object', [], {}),
                        fields: {
                          value: {
                            type: 'string',
                            tests: numberValidationTests(0, 125, 0),
                          },
                        },
                      },
                    },
                    ...validationTestsExtras(true, 'object', [], {
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
                    }),
                  },
                  ...validationTestsExtras(
                    true,
                    'array',
                    minMaxValidationTests(1, 100),
                    undefined,
                  ),
                },
              },
              ...validationTestsExtras(true, 'object', [], {
                _colourAttribute: undefined,
                name: undefined,
              }),
            },
            ...validationTestsExtras(
              true,
              'array',
              minMaxValidationTests(1, 10),
              undefined,
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
          array.map(removeEmpty).filter((o: any) => Object.keys(o).length > 0),
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
                  // _excludedEdges: [],
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
        attributes: [
          {
            type: 'collectionVariable',
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
      createYupNumberSchema(component as FormComponent);
      expect(mock).toHaveBeenCalledTimes(1);
    });
  });
});