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
  formDefWithOneNumberVariableWithAttributeCollection0_1,
  formDefWithOneNumberVariableWithAttributeCollection1_1,
  formDefWithOneOptionalGroupWithAttributeCollection0_1_1_1,
  formDefWithOneOptionalGroupWithAttributeCollection1_1_1_1,
  formDefWithOneOptionalGroupWithAttributeCollectionAndTextVarWithAttribute,
  formDefWithOneOptionalGroupWithOneOptionalGroupWithTextVariableAndAttributeCollection,
  formDefWithOneOptionalGroupWithTextVariableAndMultipleAttributes,
  formDefWithRequiredGroupWithRequiredGroupWithRequiredVarsNEW,
} from '@/__mocks__/data/form/attributeCollection';
import {
  formDefCollVarsWithSameNameInDataNEW,
  formDefRequiredRepeatingCollectionVar1_X,
  formDefWithOneCollectionVariable1_1,
} from '@/__mocks__/data/form/collVar';
import {
  formDefContributorGroupWithAuthorGroupAuthor,
  formDefTitleInfoGroupSameNameInData,
  formDefWithOptionalGroupWithNestedOptionalGroupWithNumberVar,
  formDefWithOptionalGroupWithNestedOptionalGroupWithTextVar,
  formDefWithOptionalGroupWithRequiredNumberVar,
  formDefWithOptionalGroupWithRequiredRecordLink,
  formDefWithOptionalGroupWithRequiredTextVar,
  formDefWithWithOptionalGroupWithRequiredVar,
} from '@/__mocks__/data/form/group';
import {
  formDefWithOneNumberVariable0_1,
  formDefWithOneNumberVariable1_1,
  formDefWithOneNumberVariable1_X,
} from '@/__mocks__/data/form/numVar';
import {
  formDefWithOneRecordLinkBeingOptional,
  formDefWithOneRecordLinkBeingRequired,
  formDefWithOneRecordLinkBeingRequired1_1,
  formDefWithOneRecordLinkBeingRequired1_X,
  formDefWithRecordLinkTypeBinary,
} from '@/__mocks__/data/form/recordLink';
import {
  formDefTextVarsWithSameNameInDataNew,
  formDefWithOneTextVariableNEW0_1,
  formDefWithOneTextVariableNEW0_1REGEX,
  formDefWithOneTextVariableNEW1_1,
  formDefWithOneTextVariableNEW1_X,
  formDefWithTwoTextVariableHavingFinalValue,
} from '@/__mocks__/data/form/textVar';
import type { CoraData } from '@/cora/cora-data/types.server';
import { cleanFormData } from '@/utils/cleanFormData';
import { describe, expect, it } from 'vitest';
import * as yup from 'yup';
import { validateFormData } from '../validateFormData';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
describe('yupSchema', async () => {
  describe('form validation', () => {
    describe('textVariable', () => {
      it('is valid for one textVar 0-1 with value', async () => {
        const formSchema = formDefWithOneTextVariableNEW0_1;
        const data: CoraData = {
          name: 'root',
          children: [{ name: 'someNameInData', value: 'someValue' }],
        };
        const { valid } = validateFormData(formSchema, data);
        expect(valid).toBe(true);
      });

      it('is valid for one textVar 0-1 without value', async () => {
        const formSchema = formDefWithOneTextVariableNEW0_1;
        const data: CoraData = {
          name: 'root',
          children: [{ name: 'someNameInData', value: '' }],
        };
        const { valid } = validateFormData(formSchema, data);
        expect(valid).toBe(true);
      });

      it('is valid for one textVar 1-1 with value', async () => {
        const formSchema = formDefWithOneTextVariableNEW1_1;

        const data: CoraData = {
          name: 'root',
          children: [{ name: 'someNameInData', value: 'someValue' }],
        };

        const { valid } = validateFormData(formSchema, data);
        expect(valid).toBe(true);
      });

      it('is invalid for one textVar 1-1 without value', async () => {
        const formSchema = formDefWithOneTextVariableNEW1_1;

        const data: CoraData = {
          name: 'root',
          children: [{ name: 'someNameInData', value: '' }],
        };

        const { valid, errors } = validateFormData(formSchema, data);

        expect(valid).toBe(false);
        expect(errors['root[0].someNameInData[0]']).toStrictEqual({
          message: 'divaClient_fieldRequiredText',
        });
      });

      it('is valid for one textVar 1-X with value', async () => {
        const formSchema = formDefWithOneTextVariableNEW1_X;

        const data: CoraData = {
          name: 'root',
          children: [
            { name: 'someNameInData', value: 'someValue' },
            { name: 'someNameInData', value: 'someValue2' },
            { name: 'someNameInData', value: 'someValue3' },
            { name: 'someNameInData', value: 'someValue4' },
          ],
        };

        const { valid } = validateFormData(formSchema, data);
        expect(valid).toBe(true);
      });

      it('is invalid for one textVar 1-X without field', async () => {
        const formSchema = formDefWithOneTextVariableNEW1_X;

        const data: CoraData = {
          name: 'root',
          children: [],
        };

        const { valid, errors } = validateFormData(formSchema, data);
        expect(valid).toBe(false);
        expect(errors['root[0].someNameInData[0]']).toStrictEqual({
          message: 'divaClient_fieldRequiredText',
        });
      });

      it('is invalid for one textVar 1-X without value', async () => {
        const formSchema = formDefWithOneTextVariableNEW1_X;

        const data: CoraData = {
          name: 'root',
          children: [{ name: 'someNameInData', value: '' }],
        };

        const { valid, errors } = validateFormData(formSchema, data);
        expect(valid).toBe(false);
        expect(errors['root[0].someNameInData[0]']).toStrictEqual({
          message: 'divaClient_fieldRequiredText',
        });
      });

      it('is valid for two textVar 1-1 with value', async () => {
        const formSchema = formDefWithTwoTextVariableHavingFinalValue;

        const data: CoraData = {
          name: 'root',
          children: [
            { name: 'someNameInData', value: 'someFinalValue1' },
            { name: 'someOtherNameInData', value: 'someFinalValue2' },
          ],
        };

        const { valid } = validateFormData(formSchema, data);

        expect(valid).toBe(true);
      });

      it('is invalid for one textVar 0-1 with bad regex', async () => {
        const formSchema = formDefWithOneTextVariableNEW0_1REGEX;

        const data: CoraData = {
          name: 'root',
          children: [{ name: 'someNameInData', value: '???' }],
        };

        const { valid, errors } = validateFormData(formSchema, data);

        expect(valid).toBe(false);
        expect(errors['root[0].someNameInData[0]']).toStrictEqual({
          message: 'divaClient_fieldInvalidFormatText',
        });
      });
    });
    describe('numberVariable', () => {
      it('is valid for one numberVar 0-1 with no value', async () => {
        const formSchema = formDefWithOneNumberVariable0_1;

        const data: CoraData = {
          name: 'root',
          children: [{ name: 'someNameInData', value: '' }],
        };

        const { valid } = validateFormData(formSchema, data);

        expect(valid).toBe(true);
      });

      it('is valid for one numberVar 0-1 with value', async () => {
        const formSchema = formDefWithOneNumberVariable0_1;

        const data: CoraData = {
          name: 'root',
          children: [{ name: 'someNameInData', value: '10' }],
        };

        const { valid } = validateFormData(formSchema, data);

        expect(valid).toBe(true);
      });

      it('is invalid for one numberVar 1-1 with text', async () => {
        const formSchema = formDefWithOneNumberVariable1_1;

        const data: CoraData = {
          name: 'someRootNameInData',
          children: [
            {
              name: 'someNumberVariableNameInData',
              value: 'Some text in a numberVar',
            },
          ],
        };

        const { valid, errors } = validateFormData(formSchema, data);

        expect(valid).toBe(false);
        expect(
          errors['someRootNameInData[0].someNumberVariableNameInData[0]'],
        ).toStrictEqual({
          message: 'divaClient_fieldInvalidFormatText',
        });
      });

      it('is invalid for numberVar 1-1 with input under min', async () => {
        const formSchema = formDefWithOneNumberVariable1_1;

        const data: CoraData = {
          name: 'someRootNameInData',
          children: [
            {
              name: 'someNumberVariableNameInData',
              value: '0',
            },
          ],
        };

        const { valid, errors } = validateFormData(formSchema, data);

        expect(valid).toBe(false);
        expect(
          errors['someRootNameInData[0].someNumberVariableNameInData[0]'],
        ).toStrictEqual({
          message: 'divaClient_fieldInvalidFormatText',
        });
      });

      it('is invalid for numberVar 1-1 with input over max', async () => {
        const formSchema = formDefWithOneNumberVariable1_1;

        const data: CoraData = {
          name: 'someRootNameInData',
          children: [
            {
              name: 'someNumberVariableNameInData',
              value: '21',
            },
          ],
        };

        const { valid, errors } = validateFormData(formSchema, data);

        expect(valid).toBe(false);
        expect(
          errors['someRootNameInData[0].someNumberVariableNameInData[0]'],
        ).toStrictEqual({
          message: 'divaClient_fieldInvalidFormatText',
        });
      });

      it('is invalid for numberVar 1-1 withtoo many decimals', async () => {
        const formSchema = formDefWithOneNumberVariable1_1;

        const data: CoraData = {
          name: 'someRootNameInData',
          children: [
            {
              name: 'someNumberVariableNameInData',
              value: '12.0123',
            },
          ],
        };

        const { valid, errors } = validateFormData(formSchema, data);

        expect(valid).toBe(false);
        expect(
          errors['someRootNameInData[0].someNumberVariableNameInData[0]'],
        ).toStrictEqual({
          message: 'divaClient_inalidNumberOfDecimalsText',
        });
      });

      it('is valid for one numberVar 1-X with value', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithOneNumberVariable1_X,
        );

        await expect(
          yupSchema.isValid({
            someRootNameInData: {
              someNumberVariableNameInData: [
                {
                  value: '2',
                },
              ],
            },
          }),
        ).resolves.toBe(true);
      });

      it('is invalid for one numberVar 1-X without value', async () => {
        const formSchema = formDefWithOneNumberVariable1_X;

        const data: CoraData = {
          name: 'someRootNameInData',
          children: [{ name: 'someNumberVariableNameInData', value: '' }],
        };
        const { valid, errors } = validateFormData(formSchema, data);

        expect(valid).toBe(false);
        expect(
          errors['someRootNameInData[0].someNumberVariableNameInData[0]'],
        ).toStrictEqual({
          message: 'divaClient_fieldInvalidFormatText',
        });
      });
    });

    describe('recordLink', () => {
      it('is valid for one recordLink 0-1', async () => {
        const formSchema = formDefWithOneRecordLinkBeingOptional;

        const data: CoraData = {
          name: 'someRootNameInData',
          children: [
            {
              name: 'someNameInData',
              value: '',
            },
          ],
        };
        const { valid } = validateFormData(formSchema, data);
        expect(valid).toBe(true);
      });

      it.todo('is invalid for groups with same nameInData', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithOneRecordLinkBeingRequired,
        );

        const data: CoraData = {
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

      it('is valid for one recordLink 1-1 with value', async () => {
        const formSchema = formDefWithOneRecordLinkBeingRequired1_1;

        const data: CoraData = {
          name: 'root',
          children: [
            {
              name: 'link',
              value: 'someLink',
            },
          ],
        };

        const { valid } = validateFormData(formSchema, data);
        expect(valid).toBe(true);
      });

      it('is invalid for one recordLink 1-1 without value', async () => {
        const formSchema = formDefWithOneRecordLinkBeingRequired1_1;

        const data: CoraData = {
          name: 'root',
          children: [
            {
              name: 'link',
              value: 'someLink',
            },
          ],
        };

        const { valid, errors } = validateFormData(formSchema, data);

        expect(valid).toBe(false);
        expect(
          errors['root[0].link[0]'],
        ).toStrictEqual({
          message: 'divaClient_fieldRequiredText',
        });
      });

      it('is valid for one recordLink 1-X with value', async () => {
        const formSchema = formDefWithOneRecordLinkBeingRequired1_X;

        const data: CoraData = {
          name: 'root',
          children: [
            {
              name: 'link',
              value: 'someLink',
            },
          ],
        };

        const { valid } = validateFormData(formSchema, data);
        expect(valid).toBe(true);
      });

      it('is invalid for one recordLink 1-X without value', async () => {
        const formSchema = formDefWithOneRecordLinkBeingRequired1_X;

        const data: CoraData = {
          name: 'root',
          children: [
            {
              name: 'link',
              value: '',
            },
          ],
        };

        const { valid, errors } = validateFormData(formSchema, data);

        expect(valid).toBe(false);
        expect(
          errors['root[0].link[0]'],
        ).toStrictEqual({
          message: 'divaClient_fieldRequiredText',
        });
      });

      it('is valid for one recordLink 1-1 for a binary with value', async () => {
        const formSchema = formDefWithRecordLinkTypeBinary;

        const data: CoraData = {
          name: 'someRootNameInData',
          children: [
            {
              name: 'attachmentFile',
              value: 'someValue.pdf',
            },
          ],
        };

        const { valid } = validateFormData(formSchema, data);
        expect(valid).toBe(true);
      });

      it('is invalid for one recordLink 1-1 for a binary without value', async () => {
        const formSchema = formDefWithRecordLinkTypeBinary;

        const data: CoraData = {
          name: 'someRootNameInData',
          children: [
            {
              name: 'attachmentFile',
              value: '',
            },
          ],
        };

        const { valid, errors } = validateFormData(formSchema, data);

        expect(valid).toBe(false);
        expect(
          errors['someRootNameInData[0].attachmentFile[0]'],
        ).toStrictEqual({
          message: 'divaClient_fieldRequiredText',
        });

      });
    });

    describe('collectionVariable', () => {
      it('is valid for one collectionVar 1-1 with value', async () => {
        const formSchema = formDefWithOneCollectionVariable1_1;

        const data: CoraData = {
          name: 'someRootNameInData',
          children: [
            {
              name: 'colour',
              value: 'blue',
            },
          ],
        };

        const { valid } = validateFormData(formSchema, data);
        expect(valid).toBe(true);
      });

      it('is invalid for one collectionVar 1-1 without value', async () => {
        const formSchema = formDefWithOneTextVariableNEW1_1;

        const data: CoraData = {
          name: 'someRootNameInData',
          children: [
            {
              name: 'colour',
              value: '',
            },
          ],
        };

        const { valid, errors } = validateFormData(formSchema, data);
        expect(valid).toBe(false);
        expect(
          errors['someRootNameInData[0].colour[0]'],
        ).toStrictEqual({
          message: 'divaClient_fieldRequiredText',
        });
      });

      it('is valid for one collectionVar 1-X with value', async () => {
        const formSchema = formDefRequiredRepeatingCollectionVar1_X;

        const data: CoraData = {
          name: 'root',
          children: [
            {
              name: 'languageTerm',
              value: 'eng',
            },
          ],
        };

        const { valid } = validateFormData(formSchema, data);
        expect(valid).toBe(true);
      });

      it('is invalid for one collectionVar 1-X without value', async () => {
        const formSchema = formDefRequiredRepeatingCollectionVar1_X;

        const data: CoraData = {
          name: 'root',
          children: [
            {
              name: 'languageTerm',
              value: '',
            },
          ],
        };

        const { valid, errors } = validateFormData(formSchema, data);
        expect(valid).toBe(false);
        expect(
          errors['root[0].languageTerm[0]'],
        ).toStrictEqual({
          message: 'divaClient_fieldRequiredText',
        });
      });
    });

    describe('attribute collection', () => {
      it('is invalid for numberVar 0-1 with skipped attribute', async () => {
        const formSchema = formDefWithOneNumberVariableWithAttributeCollection0_1;

        const data: CoraData = {
          name: 'someRootNameInData',
          children: [
            {
              name: 'numberVar',
              value: '',
            },
          ],
        };
        const { valid } = validateFormData(formSchema, data);
        expect(valid).toBe(false);
      });

      it('is invalid for numberVar 1-1 with skipped attribute', async () => {
        const formSchema = formDefWithOneNumberVariableWithAttributeCollection1_1;

        const data: CoraData = {
          name: 'someRootNameInData',
          children: [
            {
              name: 'numberVar',
              value: '12',
            },
          ],
        };

        const { valid, errors } = validateFormData(formSchema, data);
        expect(valid).toBe(false);
        expect(
          errors['someRootNameInData[0].numberVar[0]._colour'],
        ).toStrictEqual({
          message: 'divaClient_fieldRequiredText',
        });
      });

      it('is invalid for numberVar 1-1 with attribue and skipped value', async () => {
        const formSchema = formDefWithOneNumberVariableWithAttributeCollection1_1;

        const data: CoraData = {
          name: 'someRootNameInData',
          children: [
            {
              name: 'numberVar',
              value: '',
              attributes: {
                '_colour': 'blue',
              },
            },
          ],
        };

        const { valid, errors } = validateFormData(formSchema, data);
        expect(valid).toBe(false);
        expect(
          errors['someRootNameInData[0].numberVar[0]'],
        ).toStrictEqual({
          message: 'divaClient_fieldRequiredText',
        });
      });
    });

    it('is valid for numberVar 1-1 with attribute', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithOneNumberVariableWithAttributeCollection1_1,
      );

      const data: CoraData = {
        name: 'someRootNameInData',
        children: [
          {
            name: 'numberVar',
            value: '12',
            attributes: {
              _colour: 'blue',
            },
          },
        ],
      };

      await expect(yupSchema.isValid(data)).resolves.toBe(true);
    });

    it('is valid for numberVar 1-1 with skipped value', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithOneNumberVariableWithAttributeCollection0_1,
      );

      const data: CoraData = {
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

      const data: CoraData = {
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
    it('is valid for one group 0-1 and one textVar 1-1', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithOptionalGroupWithRequiredTextVar,
      );

      const data: CoraData = {
        root: {
          group: {
            variable: {
              value: '',
            },
          },
        },
      };

      await expect(yupSchema.isValid(data)).resolves.toBe(true);
    });

    it('is valid for one group 0-1 and one number variable 1-1', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithOptionalGroupWithRequiredNumberVar,
      );

      const data: CoraData = {
        root: {
          group: {
            numberVariable: {
              value: '12',
            },
          },
        },
      };

      await expect(yupSchema.isValid(data)).resolves.toBe(true);
    });

    it('is valid for one group 0-1 and one recordLink 1-1', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithOptionalGroupWithRequiredRecordLink,
      );

      const data: CoraData = {
        root: {
          group: {
            link: {
              value: 'someLink',
            },
          },
        },
      };

      await expect(yupSchema.isValid(data)).resolves.toBe(true);
    });

    it('is valid for one group 0-X and two textVar with attribute without value', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithWithOptionalGroupWithRequiredVar,
      );

      const data: CoraData = {
        root: {
          mainGroup_type_personal: [
            {
              textVar1_type_first: {
                value: '',
                _type: 'first',
              },
              textVar2_type_second: {
                value: '',
                _type: 'second',
              },
              _type: 'personal',
            },
          ],
        },
      };

      await expect(yupSchema.isValid(data)).resolves.toBe(true);
    });

    it('is valid for one group 0-X and two textVar 1-1 without value', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithOptionalGroupWithNestedOptionalGroupWithTextVar,
      );

      const data: CoraData = {
        root: {
          polygon: {
            point: [
              {
                longitude: {
                  value: '',
                },
                latitude: {
                  value: '',
                },
              },
            ],
          },
        },
      };

      await expect(yupSchema.isValid(data)).resolves.toBe(true);
    });

    it('is valid for one group 0-X and two textVar 1-1 with value', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithOptionalGroupWithNestedOptionalGroupWithTextVar,
      );

      const data: CoraData = {
        root: {
          polygon: {
            point: [
              {
                longitude: {
                  value: '17.631091',
                },
                latitude: {
                  value: '59.855239',
                },
              },
            ],
          },
        },
      };

      await expect(yupSchema.isValid(data)).resolves.toBe(true);
    });

    it('is valid for one group 0-X and two textVar 1-1 with partial value', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithOptionalGroupWithNestedOptionalGroupWithTextVar,
      );

      const data: CoraData = {
        root: {
          polygon: {
            point: [
              {
                longitude: {
                  value: '17.631091',
                },
                latitude: {
                  value: '',
                },
              },
            ],
          },
        },
      };

      await expect(yupSchema.validate(data)).rejects.toThrow(
        'divaClient_fieldRequiredText',
      );
    });

    it('is valid for one group 0-X and two numberVar 1-1 with partial value', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithOptionalGroupWithNestedOptionalGroupWithNumberVar,
      );

      const data: CoraData = {
        root: {
          polygon: {
            point: [
              {
                longitude: {
                  value: '17',
                },
                latitude: {
                  value: '',
                },
              },
            ],
          },
        },
      };

      await expect(yupSchema.validate(data)).rejects.toThrow(
        'divaClient_fieldRequiredText',
      );
    });

    it('is valid for one group 0-X and two collVar 1-1 with partial value', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithOptionalGroupWithNestedOptionalGroupWithNumberVar,
      );

      const data: CoraData = {
        root: {
          polygon: {
            point: [
              {
                longitude: {
                  value: '17',
                },
                latitude: {
                  value: '',
                },
              },
            ],
          },
        },
      };

      await expect(yupSchema.validate(data)).rejects.toThrow(
        'divaClient_fieldRequiredText',
      );
    });

    it('is invalid for one group 0-X and two textVar 1-1 with partial value2', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefContributorGroupWithAuthorGroupAuthor,
      );

      const data: CoraData = {
        root: {
          mainGroup: [
            {
              divaPerson: {
                value: '',
              },
              givenName: {
                value: '',
              },
              correspondingAuthor: {
                value: '',
              },
              birthYear: {
                value: '',
              },
            },
          ],
        },
      };
      await expect(yupSchema.validate(data)).rejects.toThrow(
        'divaClient_fieldRequiredText',
      );
    });

    it('is valid for one group 0-1 with attribute and one textVar 1-1', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithOneOptionalGroupWithAttributeCollection0_1_1_1,
      );

      const data: CoraData = {
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

    it('is valid for one group 1-1 attribute and with one textVar 1-1', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithOneOptionalGroupWithAttributeCollection1_1_1_1,
      );

      const data: CoraData = {
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

    it('is valid for one group 1-1 and nested group 1-1 with attribute with one textVar 1-1 with value', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithRequiredGroupWithRequiredGroupWithRequiredVarsNEW,
      );

      const data: CoraData = {
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

    it('is invalid for one group 1-1 and nested group 1-1 with attribute with one textVar 1-1 without value', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithRequiredGroupWithRequiredGroupWithRequiredVarsNEW,
      );

      const data: CoraData = {
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

      await expect(yupSchema.validate(data)).rejects.toThrow(
        'divaClient_fieldRequiredText',
      );
    });

    it('is valid for one group 0-1 with attribute with one textVariable 1-1 with attribute and with value', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithOneOptionalGroupWithAttributeCollectionAndTextVarWithAttribute,
      );

      const data: CoraData = {
        root: {
          mainGroup: {
            variable: {
              value: 'someValue',
              _variableAttribute: 'blue',
            },
            _language: 'nau',
          },
        },
      };

      await expect(yupSchema.isValid(data)).resolves.toBe(true);
    });

    it('is valid for one group 0-X with attribute with one textVar 1-1 with two attributes and with value', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithOneOptionalGroupWithTextVariableAndMultipleAttributes,
      );

      const data: CoraData = {
        root: {
          mainGroup: [
            {
              variable: {
                value: 'someValue',
              },
              _language: 'aar',
              _titleType: 'type',
            },
          ],
        },
      };

      await expect(yupSchema.isValid(data)).resolves.toBe(true);
    });

    it('is valid for one group 1-1 nested group 0-1 with attribute with one textVar 1-1 with two attributes and without value', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithOneOptionalGroupWithOneOptionalGroupWithTextVariableAndAttributeCollection,
      );

      const data: CoraData = {
        root: {
          mainGroup: {
            nestedGroup: {
              mainTitle: {
                value: '',
              },
              _language: '',
              _titleType: '',
            },
          },
        },
      };

      await expect(yupSchema.isValid(data)).resolves.toBe(true);
    });
  });

  describe('same nameInData', () => {
    it('is valid for groups with same nameInData', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefTitleInfoGroupSameNameInData,
      );

      const data: CoraData = {
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

      const data: CoraData = {
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

    const data: CoraData = {
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

    const data: CoraData = {
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

  it('should not validate hidden fields', async () => {
    const formSchema = {
      presentationId: 'organisationUpdatePGroup',
      type: 'group',
      name: 'organisation',
      mode: 'input',
      tooltip: {
        title: 'topOrganisationNewGroupText',
        body: 'topOrganisationNewGroupDefText',
      },
      label: 'topOrganisationNewGroupText',
      headlineLevel: 'h1',
      showLabel: true,
      components: [
        {
          presentationId: 'namePartPVar',
          name: 'namePart',
          mode: 'input',
          tooltip: {
            title: 'namePartTextVarText',
            body: 'namePartTextVarDefText',
          },
          label: 'namePartTextVarText',
          showLabel: true,
          type: 'textVariable',
          validation: {
            type: 'regex',
            pattern: '.+',
          },
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 1,
            repeatMax: 1,
          },
          childStyle: [],
          gridColSpan: 12,
          inputType: 'input',
        },
        {
          type: 'hidden',
          name: 'genre',
          finalValue: 'topOrganisation',
          attributes: [
            {
              type: 'collectionVariable',
              name: 'type',
              placeholder: 'initialEmptyValueText',
              mode: 'input',
              tooltip: {
                title: 'organisationTypeTypeCollectionVarText',
                body: 'organisationTypeTypeCollectionVarDefText',
              },
              label: 'organisationTypeTypeCollectionVarText',
              showLabel: true,
              options: [
                {
                  value: 'organisationType',
                  label: 'organisationTypeItemText',
                },
              ],
              finalValue: 'organisationType',
            },
          ],
          attributesToShow: 'none',
        },
      ],
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      gridColSpan: 12,
    };

    const data: CoraData = {
      organisation: {
        namePart: { value: 'Some organisation' },
      },
    };

    const yupSchema = generateYupSchemaFromFormSchema({
      form: formSchema,
    } as FormSchema);

    await expect(yupSchema.isValid(data)).resolves.toBe(true);
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
      const data: CoraData = {
        testArray: [{ value: '' }, { value: '' }, { value: 'test' }],
      };

      const actualData = await schema.validate(data);
      const expectedData = {
        testArray: [{ value: 'test' }],
      };
      expect(expectedData).toStrictEqual(actualData);
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

        const data: CoraData = {
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
});
