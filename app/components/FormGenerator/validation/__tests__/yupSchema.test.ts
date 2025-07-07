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

import {
  formDefCollVarsWithSameNameInDataNEW,
  formDefWithOneCollectionVariable1_1,
  formDefWithRepeatingCollectionVar,
} from '@/__mocks__/data/form/collVar';
import {
  formDefWithNestedSurroundingContainers,
  formDefWithSurroundingContainerAroundTextVariable,
} from '@/__mocks__/data/form/container';
import {
  formDefTitleInfoGroupSameNameInData,
  formDefWithOneGroupHavingTextVariableAsChild,
  formDefWithRepeatingGroup,
  formDefWithRepeatingGroupWithRepeatingChildGroup,
  formDefWithRepeatingGroupWithRepeatingChildGroupWithAttributes,
} from '@/__mocks__/data/form/group';
import {
  formDefTextVarsWithSameNameInDataNew,
  formDefWithOneTextVariableNEW0_1,
  formDefWithOneTextVariableNEW0_1REGEX,
  formDefWithOneTextVariableNEW1_1,
  formDefWithOneTextVariableNEW1_X,
  formDefWithTextVar,
  formDefWithTwoRepeatingVarsAndCollectionVar,
  formDefWithTwoTextVariableHavingFinalValue,
} from '@/__mocks__/data/form/textVar';
import { cleanFormData } from '@/utils/cleanFormData';
import { describe, expect, it } from 'vitest';
import * as yup from 'yup';
import type { FormComponentGroup, FormSchema } from '../../types';
import {
  createYupArrayFromSchema,
  generateYupSchemaFromFormSchema,
} from '../yupSchema';
import {
  formDefWithOneRecordLinkBeingOptional,
  formDefWithOneRecordLinkBeingRequired,
} from '@/__mocks__/data/form/recordLink';
import {
  formDefWithOneNumberVariable0_1,
  formDefWithOneNumberVariable1_1,
} from '@/__mocks__/data/form/numVar';
import {
  formDefWithOneNumberVariableWithAttributeCollection0_1,
  formDefWithOneNumberVariableWithAttributeCollection1_1,
  formDefWithOneOptionalGroupWithAttributeCollection0_1_1_1,
  formDefWithOneOptionalGroupWithAttributeCollection1_1_1_1,
  formDefWithRequiredGroupWithRequiredGroupWithRequiredVarsNEW,
} from '@/__mocks__/data/form/attributeCollection';

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
  describe('form validation', () => {
    describe('textVariable', () => {
      it('is valid for one textVar 0-1 with value', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithOneTextVariableNEW0_1,
        );

        await expect(
          yupSchema.isValid({
            root: {
              someNameInData: { value: 'someValue' },
            },
          }),
        ).resolves.toBe(true);
      });

      it('is valid for one textVar 0-1 without value', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithOneTextVariableNEW0_1,
        );

        await expect(
          yupSchema.isValid({
            root: {
              someNameInData: { value: '' },
            },
          }),
        ).resolves.toBe(true);
      });

      it('is valid for one textVar 1-1 with value', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithOneTextVariableNEW1_1,
        );

        await expect(
          yupSchema.isValid({
            root: {
              someNameInData: { value: 'someValue' },
            },
          }),
        ).resolves.toBe(true);
      });

      it('is invalid for one textVar 1-1 without value', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithOneTextVariableNEW1_1,
        );

        const data = {
          root: {
            someNameInData: { value: '' },
          },
        };

        await expect(yupSchema.validate(data)).rejects.toThrow(
          'divaClient_fieldRequiredText',
        );
      });

      it('is valid for one textVar 1-X with value', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithOneTextVariableNEW1_X,
        );

        await expect(
          yupSchema.isValid({
            root: {
              someNameInData: [
                { value: 'someValue' },
                { value: 'someValue2' },
                { value: 'someValue3' },
                { value: 'someValue4' },
              ],
            } /*  */,
          }),
        ).resolves.toBe(true);
      });

      it('is invalid for one textVar 1-X without value', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithOneTextVariableNEW1_X,
        );

        const data = {
          root: {
            someNameInData: [
              {
                value: '',
              },
            ],
          },
        };

        await expect(yupSchema.validate(data)).rejects.toThrow(
          'divaClient_fieldRequiredText',
        );
      });

      it('is valid for two textVar 1-1 with value', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithTwoTextVariableHavingFinalValue,
        );

        await expect(
          yupSchema.isValid({
            root: {
              someNameInData: { value: 'someFinalValue1' },
              someOtherNameInData: { value: 'someFinalValue2' },
            },
          }),
        ).resolves.toBe(true);
      });

      it('is invalid for one textVar 0-1 with bad regex', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithOneTextVariableNEW0_1REGEX,
        );

        const data = {
          root: {
            someNameInData: { value: '???' },
          },
        };

        await expect(yupSchema.validate(data)).rejects.toThrow(
          'divaClient_fieldInvalidFormatText',
        );
      });
    });
    describe('numberVariable', () => {
      it('is valid for one textVar 0-1 with no value', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithOneNumberVariable0_1,
        );

        await expect(
          yupSchema.isValid({
            root: {
              someNameInData: { value: '' },
            },
          }),
        ).resolves.toBe(true);
      });

      it('is valid for one textVar 0-1 with value', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithOneNumberVariable0_1,
        );

        await expect(
          yupSchema.isValid({
            root: {
              someNameInData: { value: '10' },
            },
          }),
        ).resolves.toBe(true);
      });

      it('is invalid for one numberVar 1-1 with text', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithOneNumberVariable1_1,
        );

        const data = {
          someRootNameInData: {
            someNumberVariableNameInData: { value: 'Some text in a numberVar' },
          },
        };

        await expect(yupSchema.validate(data)).rejects.toThrow(
          'divaClient_fieldInvalidFormatText',
        );
      });

      it('is invalid for numberVar 1-1 with input under min', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithOneNumberVariable1_1,
        );

        const data = {
          someRootNameInData: {
            someNumberVariableNameInData: { value: '0' },
          },
        };

        await expect(yupSchema.validate(data)).rejects.toThrow(
          'divaClient_fieldInvalidFormatText',
        );
      });

      it('is invalid for numberVar 1-1 with input over max', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithOneNumberVariable1_1,
        );

        const data = {
          someRootNameInData: {
            someNumberVariableNameInData: { value: '21' },
          },
        };

        await expect(yupSchema.validate(data)).rejects.toThrow(
          'divaClient_invalidRangeMaxText',
        );
      });

      it('is invalid for numberVar 1-1 withtoo many decimals', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithOneNumberVariable1_1,
        );

        const data = {
          someRootNameInData: {
            someNumberVariableNameInData: { value: '12.0123' },
          },
        };

        await expect(yupSchema.validate(data)).rejects.toThrow(
          'Invalid number of decimals',
        );
      });
    });

    describe('recordLink', () => {
      it('is valid for one recordLink 0-1', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithOneRecordLinkBeingOptional,
        );

        await expect(
          yupSchema.isValid({
            someRootNameInData: {
              someNameInData: { value: '' },
            },
          }),
        ).resolves.toBe(true);
      });

      it('is invalid for groups with same nameInData', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithOneRecordLinkBeingRequired,
        );

        const data = {
          root: {
            titleInfo: {
              title: { value: '' },
            },
            titleInfo_type_alternative: [
              {
                title: { value: '' },
              },
            ],
          },
        };

        await expect(yupSchema.validate(data)).rejects.toThrow(
          'divaClient_fieldRequiredText',
        );
      });
    });

    describe('collectionVariable', () => {
      it('is valid for one collectionVar 1-1 with value', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithOneCollectionVariable1_1,
        );

        await expect(
          yupSchema.isValid({
            someRootNameInData: {
              colour: { value: 'blue' },
            },
          }),
        ).resolves.toBe(true);
      });

      it('is invalid for one collectionVar 1-1 without value', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithOneTextVariableNEW1_1,
        );

        const data = {
          someRootNameInData: {
            colour: { value: '' },
          },
        };

        await expect(yupSchema.validate(data)).rejects.toThrow(
          'divaClient_fieldRequiredText',
        );
      });
    });

    describe('attribute collection', () => {
      it('is invalid for numberVar 1-1 with skipped attribute', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithOneNumberVariableWithAttributeCollection0_1,
        );

        const data = {
          someRootNameInData: {
            numberVar: {
              value: '',
            },
          },
        };

        await expect(yupSchema.isValid(data)).resolves.toBe(true);
      });

      it('is invalid for numberVar 1-1 with skipped attribute', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithOneNumberVariableWithAttributeCollection1_1,
        );

        const data = {
          someRootNameInData: {
            numberVar: {
              value: '12',
            },
          },
        };

        await expect(yupSchema.validate(data)).rejects.toThrow(
          'divaClient_fieldRequiredText',
        );
      });

      it('is invalid for numberVar 1-1 with attribue and skipped value', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithOneNumberVariableWithAttributeCollection1_1,
        );

        const data = {
          someRootNameInData: {
            numberVar: {
              value: '',
              _colour: 'blue',
            },
          },
        };

        await expect(yupSchema.validate(data)).rejects.toThrow(
          'divaClient_fieldInvalidFormatText',
        );
      });
    });

    it('is invalid for numberVar 1-1 with skipped attribute', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithOneNumberVariableWithAttributeCollection1_1,
      );

      const data = {
        someRootNameInData: {
          numberVar: {
            value: '12',
            _colour: 'blue',
          },
        },
      };

      await expect(yupSchema.isValid(data)).resolves.toBe(true);
    });

    it('is valid for numberVar 1-1 with skipped value', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithOneNumberVariableWithAttributeCollection0_1,
      );

      const data = {
        someRootNameInData: {
          numberVar: {
            value: '',
            _colour: 'blue',
          },
        },
      };

      await expect(yupSchema.isValid(data)).resolves.toBe(true);
    });

    it('is valid for numberVar 1-1 and 0-1 with attribute', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithOneNumberVariableWithAttributeCollection0_1,
      );

      const data = {
        someRootNameInData: {
          numberVar1: {
            value: '2',
          },
          numberVar2: {
            value: '',
            _colour: 'blue',
          },
        },
      };

      await expect(yupSchema.isValid(data)).resolves.toBe(true);
    });
  });
  describe('group', () => {
    it('is valid for one group 0-1 with one text variable 1-1', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithOneOptionalGroupWithAttributeCollection0_1_1_1,
      );

      const data = {
        root: {
          group: {
            variable: {
              value: '',
            },
            _language: 'aar',
          },
        },
      };

      await expect(yupSchema.isValid(data)).resolves.toBe(true);
    });

    it('is valid for one group 1-1 with one text variable 1-1', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithOneOptionalGroupWithAttributeCollection1_1_1_1,
      );

      const data = {
        root: {
          group: {
            variable: {
              value: 'someValue',
            },
            _language: 'aar',
          },
        },
      };

      await expect(yupSchema.isValid(data)).resolves.toBe(true);
    });

    it('is valid for one group 1-1 nested group 1-1 with one text variable 1-1', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithRequiredGroupWithRequiredGroupWithRequiredVarsNEW,
      );

      const data = {
        root: {
          mainGroup: {
            nestedGroup: {
              variable: {
                value: 'someValue',
              },
              _language: 'nau',
            },
          },
        },
      };

      await expect(yupSchema.isValid(data)).resolves.toBe(true);
    });

    it('is invalid for one group 1-1 nested group 1-1 with one text variable 1-1 without value', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithRequiredGroupWithRequiredGroupWithRequiredVarsNEW,
      );

      const data = {
        root: {
          mainGroup: {
            nestedGroup: {
              variable: {
                value: '',
              },
              _language: '',
            },
          },
        },
      };

      //await expect(yupSchema.isValid(data)).resolves.toBe(true);

      await expect(yupSchema.validate(data)).rejects.toThrow(
        'divaClient_fieldRequiredText',
      );
    });
  });

  describe('same nameInData', () => {
    it('is valid for groups with same nameInData', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefTitleInfoGroupSameNameInData,
      );

      const data = {
        root: {
          titleInfo: {
            title: {
              value: 'someValue',
            },
            _lang: 'eng',
          },
          titleInfo_type_alternative: [
            {
              title: {
                value: 'someOtherValue',
              },
              _lang: 'swe',
              _type: 'alternative',
            },
          ],
        },
      };

      await expect(yupSchema.isValid(data)).resolves.toBe(true);
    });

    it('is invalid for groups with same nameInData', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefTitleInfoGroupSameNameInData,
      );

      const data = {
        root: {
          titleInfo: {
            title: { value: '' },
          },
          titleInfo_type_alternative: [
            {
              title: { value: '' },
            },
          ],
        },
      };

      await expect(yupSchema.validate(data)).rejects.toThrow(
        'divaClient_fieldRequiredText',
      );
    });
  });
  it('is valid for textVar with same nameInData', async () => {
    const yupSchema = generateYupSchemaFromFormSchema(
      formDefTextVarsWithSameNameInDataNew,
    );

    const data = {
      root: {
        subject_language_swe: {
          value: 'someValue',
          _language: 'swe',
        },
        subject_language_eng: {
          value: 'someOtherValue',
          _language: 'eng',
        },
      },
    };

    await expect(yupSchema.isValid(data)).resolves.toBe(true);
  });

  it('is valid for collVar with same nameInData', async () => {
    const yupSchema = generateYupSchemaFromFormSchema(
      formDefCollVarsWithSameNameInDataNEW,
    );

    const data = {
      root: {
        genre_type_code: {
          value: 'artistic-work_original-creative-work',
          _type: 'code',
        },
        genre_type_contentType: {
          value: 'artistic-work_artistic-thesis',
          _type: 'contentType',
        },
      },
    };

    await expect(yupSchema.isValid(data)).resolves.toBe(true);
  });
});

describe('grandparent value validation', () => {
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
