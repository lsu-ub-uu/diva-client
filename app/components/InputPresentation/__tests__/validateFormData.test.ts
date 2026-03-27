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
  formDefWithOneCollectionVariableWithAttributeCollection0_1,
  formDefWithOneNumberVariableAndOptionalNumberVariableWithAttributeCollection,
  formDefWithOneNumberVariableWithAttributeCollection0_1,
  formDefWithOneNumberVariableWithAttributeCollection1_1,
  formDefWithOneOptionalGroupWithAttributeCollection0_1_1_1,
  formDefWithOneOptionalGroupWithAttributeCollection1_1_1_1,
  formDefWithOneOptionalGroupWithAttributeCollectionAndTextVarWithAttribute,
  formDefWithOneOptionalGroupWithOneOptionalGroupWithTextVariableAndAttributeCollection,
  formDefWithOneOptionalGroupWithTextVariableAndMultipleAttributes,
  formDefWithOneRecordLinkWithAttributeCollection0_1,
  formDefWithOneTextVariableWithAttributeCollection0_1,
  formDefWithRequiredGroupWithRequiredGroupWithRequiredVarsNEW,
} from '@/__mocks__/data/form/attributeCollection';
import {
  formDefCollVarsWithSameNameInDataNEW,
  formDefRequiredRepeatingCollectionVar1_X,
  formDefWithHiddenComponents,
  formDefWithOneCollectionVariable1_1,
} from '@/__mocks__/data/form/collVar';
import {
  formDefWithOneNumberVariable0_1,
  formDefWithOneNumberVariable1_1,
  formDefWithOneNumberVariable1_X,
  formDefWithTwoRepeatingNumberVariable,
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
  formDefWithTwoRepeatingTextVariable,
  formDefWithTwoTextVariableHavingFinalValue,
} from '@/__mocks__/data/form/textVar';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import type { CoraData } from '@/cora/cora-data/types.server';
import { describe, expect, it } from 'vitest';
import { validateFormData } from '../validateFormData';
import {
  formDefContributorGroupWithAuthorGroupAuthor,
  formDefTitleInfoGroupSameNameInData,
  formDefWithOptionalGroupWithNestedOptionalGroupWithCollVar,
  formDefWithOptionalGroupWithNestedOptionalGroupWithNumberVar,
  formDefWithOptionalGroupWithNestedOptionalGroupWithTextVar,
  formDefWithOptionalGroupWithNestedOptionalGroupWithTextVarButOneIsFinalValue,
  formDefWithOptionalGroupWithRequiredNumberVar,
  formDefWithOptionalGroupWithRequiredRecordLink,
  formDefWithOptionalGroupWithRequiredTextVar,
  formDefWithWithOptionalGroupWithRequiredVar,
} from '@/__mocks__/data/form/group';
import type {
  FormComponentGroup,
  FormSchema,
} from '@/components/FormGenerator/types';
import { formDefWithHiddenComponents2 } from '@/__mocks__/data/form/hiddenInput';
describe('validateFormData', async () => {
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
              children: [
                { name: 'linkedRecordType', value: 'someLinkedRecordType' },
                { name: 'linkedRecordId', value: '' },
              ],
            },
          ],
        };
        const { valid } = validateFormData(formSchema, data);
        expect(valid).toBe(true);
      });

      it('is valid for one recordLink 1-1 with value', async () => {
        const formSchema = formDefWithOneRecordLinkBeingRequired1_1;

        const data: CoraData = {
          name: 'root',
          children: [
            {
              name: 'link',
              children: [
                { name: 'linkedRecordType', value: 'someLinkedRecordType' },
                { name: 'linkedRecordId', value: 'someLink' },
              ],
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
              children: [
                { name: 'linkedRecordType', value: 'someLinkedRecordType' },
                { name: 'linkedRecordId', value: '' },
              ],
            },
          ],
        };

        const { valid, errors } = validateFormData(formSchema, data);

        expect(valid).toBe(false);
        expect(errors['root[0].link[0].linkedRecordId']).toStrictEqual({
          message: 'divaClient_fieldRequiredText',
        });
      });

      it('is valid for two recordLinks 1-X with value', async () => {
        const formSchema = formDefWithOneRecordLinkBeingRequired1_X;

        const data: CoraData = {
          name: 'root',
          children: [
            {
              name: 'link',
              children: [
                { name: 'linkedRecordType', value: 'someLinkedRecordType' },
                { name: 'linkedRecordId', value: 'someLink' },
              ],
            },
            {
              name: 'link',
              children: [
                { name: 'linkedRecordType', value: 'someLinkedRecordType' },
                { name: 'linkedRecordId', value: 'someOtherLink' },
              ],
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
              children: [
                { name: 'linkedRecordType', value: 'someLinkedRecordType' },
                { name: 'linkedRecordId', value: '' },
              ],
            },
          ],
        };

        const { valid, errors } = validateFormData(formSchema, data);

        expect(valid).toBe(false);
        expect(errors['root[0].link[0].linkedRecordId']).toStrictEqual({
          message: 'divaClient_fieldRequiredText',
        });
      });

      it('is invalid for one recordLink 1-X without data', async () => {
        const formSchema = formDefWithOneRecordLinkBeingRequired1_X;

        const data: CoraData = {
          name: 'root',
          children: [],
        };

        const { valid, errors } = validateFormData(formSchema, data);

        expect(valid).toBe(false);
        expect(errors['root[0].link[0].linkedRecordId']).toStrictEqual({
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
              children: [
                { name: 'linkedRecordType', value: 'someLinkedRecordType' },
                { name: 'linkedRecordId', value: 'someValue.pdf' },
              ],
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
              children: [
                { name: 'linkedRecordType', value: 'someLinkedRecordType' },
                { name: 'linkedRecordId', value: '' },
              ],
            },
          ],
        };

        const { valid, errors } = validateFormData(formSchema, data);

        expect(valid).toBe(false);
        expect(
          errors['someRootNameInData[0].attachmentFile[0].linkedRecordId'],
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
        const formSchema = formDefWithOneCollectionVariable1_1;

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
        expect(errors['someRootNameInData[0].colour[0]']).toStrictEqual({
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

      it('is valid for two collectionVar 1-X with value', async () => {
        const formSchema = formDefRequiredRepeatingCollectionVar1_X;

        const data: CoraData = {
          name: 'root',
          children: [
            {
              name: 'languageTerm',
              value: 'eng',
            },
            {
              name: 'languageTerm',
              value: 'swe',
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
        expect(errors['root[0].languageTerm[0]']).toStrictEqual({
          message: 'divaClient_fieldRequiredText',
        });
      });
    });

    describe('attribute collection', () => {
      it('is valid for numberVar 0-1 with skipped value and attribute', async () => {
        const formSchema =
          formDefWithOneNumberVariableWithAttributeCollection0_1;

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
        expect(valid).toBe(true);
      });

      it('is invalid for numberVar 0-1 with skipped attribute', async () => {
        const formSchema =
          formDefWithOneNumberVariableWithAttributeCollection0_1;

        const data: CoraData = {
          name: 'someRootNameInData',
          children: [
            {
              name: 'numberVar',
              value: '1',
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

      it('is invalid for textVar 0-1 with skipped attribute', async () => {
        const formSchema = formDefWithOneTextVariableWithAttributeCollection0_1;

        const data: CoraData = {
          name: 'someRootNameInData',
          children: [
            {
              name: 'textVar',
              value: '1',
            },
          ],
        };
        const { valid, errors } = validateFormData(formSchema, data);
        expect(valid).toBe(false);
        expect(
          errors['someRootNameInData[0].textVar[0]._colour'],
        ).toStrictEqual({
          message: 'divaClient_fieldRequiredText',
        });
      });

      it('is invalid for recordLink 0-1 with skipped attribute', async () => {
        const formSchema = formDefWithOneRecordLinkWithAttributeCollection0_1;

        const data: CoraData = {
          name: 'someRootNameInData',
          children: [
            {
              name: 'recordLink',
              children: [
                { name: 'linkedRecordType', value: 'someLinkedRecordType' },
                { name: 'linkedRecordId', value: 'someLink' },
              ],
            },
          ],
        };
        const { valid, errors } = validateFormData(formSchema, data);
        expect(valid).toBe(false);
        expect(
          errors['someRootNameInData[0].recordLink[0]._colour'],
        ).toStrictEqual({
          message: 'divaClient_fieldRequiredText',
        });
      });

      it('is invalid for collectionVar 0-1 with skipped attribute', async () => {
        const formSchema =
          formDefWithOneCollectionVariableWithAttributeCollection0_1;

        const data: CoraData = {
          name: 'someRootNameInData',
          children: [
            {
              name: 'collectionVar',
              value: 'swe',
            },
          ],
        };
        const { valid, errors } = validateFormData(formSchema, data);
        expect(valid).toBe(false);
        expect(
          errors['someRootNameInData[0].collectionVar[0]._colour'],
        ).toStrictEqual({
          message: 'divaClient_fieldRequiredText',
        });
      });

      it('is invalid for numberVar 1-1 with skipped attribute', async () => {
        const formSchema =
          formDefWithOneNumberVariableWithAttributeCollection1_1;

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

      it('is invalid for numberVar 1-1 with attribute and skipped value', async () => {
        const formSchema =
          formDefWithOneNumberVariableWithAttributeCollection1_1;

        const data: CoraData = {
          name: 'someRootNameInData',
          children: [
            {
              name: 'numberVar',
              value: '',
              attributes: {
                colour: 'blue',
              },
            },
          ],
        };

        const { valid, errors } = validateFormData(formSchema, data);
        expect(valid).toBe(false);
        expect(errors['someRootNameInData[0].numberVar[0]']).toStrictEqual({
          message: 'divaClient_fieldRequiredText',
        });
      });
    });

    it('is valid for numberVar 1-1 with attribute', async () => {
      const formSchema = formDefWithOneNumberVariableWithAttributeCollection1_1;

      const data: CoraData = {
        name: 'someRootNameInData',
        children: [
          {
            name: 'numberVar',
            value: '12',
            attributes: {
              colour: 'blue',
            },
          },
        ],
      };

      const { valid } = validateFormData(formSchema, data);

      expect(valid).toBe(true);
    });

    it('is valid for numberVar 0-1 with skipped value', async () => {
      const formSchema = formDefWithOneNumberVariableWithAttributeCollection0_1;

      const data: CoraData = {
        name: 'someRootNameInData',
        children: [
          {
            name: 'numberVar',
            value: '',
            attributes: {
              colour: 'blue',
            },
          },
        ],
      };

      const { valid } = validateFormData(formSchema, data);

      expect(valid).toBe(true);
    });

    it('is valid for numberVar 1-1 and 0-1 with attribute', async () => {
      const formSchema =
        formDefWithOneNumberVariableAndOptionalNumberVariableWithAttributeCollection;

      const data: CoraData = {
        name: 'someRootNameInData',
        children: [
          {
            name: 'numberVar1',
            value: '12',
          },
          {
            name: 'numberVar2',
            value: '',
            attributes: {
              colour: 'blue',
            },
          },
        ],
      };

      const { valid } = validateFormData(formSchema, data);
      expect(valid).toBe(true);
    });
  });

  describe('group', () => {
    it('is valid for one group 0-1 and one textVar 1-1', async () => {
      const formSchema = formDefWithOptionalGroupWithRequiredTextVar;

      const data: CoraData = {
        name: 'root',
        children: [
          {
            name: 'group',
            children: [
              {
                name: 'textVariable',
                value: '',
              },
            ],
          },
        ],
      };

      const { valid } = validateFormData(formSchema, data);

      expect(valid).toBe(true);
    });

    it('is valid for one group 0-1 and one number variable 1-1', async () => {
      const formSchema = formDefWithOptionalGroupWithRequiredNumberVar;

      const data: CoraData = {
        name: 'root',
        children: [
          {
            name: 'group',
            children: [
              {
                name: 'numberVariable',
                value: '12',
              },
            ],
          },
        ],
      };

      const { valid } = validateFormData(formSchema, data);

      expect(valid).toBe(true);
    });

    it('is valid for one group 0-1 and one recordLink 1-1', async () => {
      const formSchema = formDefWithOptionalGroupWithRequiredRecordLink;

      const data: CoraData = {
        name: 'root',
        children: [
          {
            name: 'group',
            children: [
              {
                name: 'link',
                children: [
                  { name: 'linkedRecordType', value: 'someLinkedRecordType' },
                  { name: 'linkedRecordId', value: 'someLink' },
                ],
              },
            ],
          },
        ],
      };
      const { valid } = validateFormData(formSchema, data);

      expect(valid).toBe(true);
    });

    it('is valid for one group 0-X and two textVar with attribute without value', async () => {
      const formSchema = formDefWithWithOptionalGroupWithRequiredVar;

      const data: CoraData = {
        name: 'root',
        children: [
          {
            name: 'mainGroup',
            attributes: {
              type: 'personal',
            },
            children: [
              {
                name: 'textVar1',
                attributes: {
                  type: 'first',
                },
                value: '',
              },
              {
                name: 'textVar2',
                attributes: {
                  type: 'second',
                },
                value: '',
              },
            ],
          },
        ],
      };

      const { valid } = validateFormData(formSchema, data);

      expect(valid).toBe(true);
    });

    it('is valid for one group 0-X and two textVar 1-1 without value', async () => {
      const formSchema =
        formDefWithOptionalGroupWithNestedOptionalGroupWithTextVar;

      const data: CoraData = {
        name: 'root',
        children: [
          {
            name: 'polygon',
            children: [
              {
                name: 'point',
                children: [
                  {
                    name: 'longitude',
                    value: '',
                  },
                  {
                    name: 'latitude',
                    value: '',
                  },
                ],
              },
            ],
          },
        ],
      };

      const { valid } = validateFormData(formSchema, data);

      expect(valid).toBe(true);
    });

    it('is valid for one group 0-X and two textVar 1-1 with value', async () => {
      const formSchema =
        formDefWithOptionalGroupWithNestedOptionalGroupWithTextVar;

      const data: CoraData = {
        name: 'root',
        children: [
          {
            name: 'polygon',
            children: [
              {
                name: 'point',
                children: [
                  {
                    name: 'longitude',
                    value: '17.631091',
                  },
                  {
                    name: 'latitude',
                    value: '59.855239',
                  },
                ],
              },
            ],
          },
        ],
      };

      const { valid } = validateFormData(formSchema, data);

      expect(valid).toBe(true);
    });

    it('is invalid for one group 0-X and two textVar 1-1 with partial value', async () => {
      const formSchema =
        formDefWithOptionalGroupWithNestedOptionalGroupWithTextVar;

      const data: CoraData = {
        name: 'root',
        children: [
          {
            name: 'polygon',
            children: [
              {
                name: 'point',
                children: [
                  {
                    name: 'longitude',
                    value: '17.631091',
                  },
                  {
                    name: 'latitude',
                    value: '',
                  },
                ],
              },
            ],
          },
        ],
      };

      const { valid, errors } = validateFormData(formSchema, data);

      expect(valid).toBe(false);
      expect(errors['root[0].polygon[0].point[0].latitude[0]']).toStrictEqual({
        message: 'divaClient_fieldRequiredText',
      });
    });

    it('is invalid for one group 0-X and two recordLink 1-1 with partial value', async () => {
      const formSchema =
        formDefWithOptionalGroupWithNestedOptionalGroupWithTextVar;

      const data: CoraData = {
        name: 'root',
        children: [
          {
            name: 'polygon',
            children: [
              {
                name: 'point',
                children: [
                  {
                    name: 'longitude',
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'someLinkedRecordType',
                      },
                      { name: 'linkedRecordId', value: 'someLink' },
                    ],
                  },
                  {
                    name: 'latitude',
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'someLinkedRecordType',
                      },
                      { name: 'linkedRecordId', value: '' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };

      const { valid, errors } = validateFormData(formSchema, data);

      expect(valid).toBe(false);
      expect(errors['root[0].polygon[0].point[0].latitude[0]']).toStrictEqual({
        message: 'divaClient_fieldRequiredText',
      });
    });

    it('is invalid for one group 0-X and two textVar 1-1 with partial value', async () => {
      const formSchema =
        formDefWithOptionalGroupWithNestedOptionalGroupWithTextVar;

      const data: CoraData = {
        name: 'root',
        children: [
          {
            name: 'polygon',
            children: [
              {
                name: 'point',
                children: [
                  {
                    name: 'longitude',
                    value: '17.631091',
                  },
                  {
                    name: 'latitude',
                    value: '',
                  },
                ],
              },
            ],
          },
        ],
      };

      const { valid, errors } = validateFormData(formSchema, data);

      expect(valid).toBe(false);
      expect(errors['root[0].polygon[0].point[0].latitude[0]']).toStrictEqual({
        message: 'divaClient_fieldRequiredText',
      });
    });

    it('is valid for one group 0-X and two textVar 1-1 with partial value that is final value', async () => {
      const formSchema =
        formDefWithOptionalGroupWithNestedOptionalGroupWithTextVarButOneIsFinalValue;

      const data: CoraData = {
        name: 'root',
        children: [
          {
            name: 'polygon',
            children: [
              {
                name: 'point',
                children: [
                  {
                    name: 'longitude',
                    value: '17.631091',
                  },
                  {
                    name: 'latitude',
                    value: '',
                  },
                ],
              },
            ],
          },
        ],
      };

      const { valid } = validateFormData(formSchema, data);

      expect(valid).toBe(true);
    });

    it('is invalid for one group 0-X and two numberVar 1-1 with partial value', async () => {
      const formSchema =
        formDefWithOptionalGroupWithNestedOptionalGroupWithNumberVar;

      const data: CoraData = {
        name: 'root',
        children: [
          {
            name: 'polygon',
            children: [
              {
                name: 'point',
                children: [
                  {
                    name: 'longitude',
                    value: '17',
                  },
                  {
                    name: 'latitude',
                    value: '',
                  },
                ],
              },
            ],
          },
        ],
      };

      const { valid, errors } = validateFormData(formSchema, data);

      expect(valid).toBe(false);
      expect(errors['root[0].polygon[0].point[0].latitude[0]']).toStrictEqual({
        message: 'divaClient_fieldRequiredText',
      });
    });

    it('is invalid for one group 0-X and two collVar 1-1 with partial value', async () => {
      const formSchema =
        formDefWithOptionalGroupWithNestedOptionalGroupWithCollVar;

      const data: CoraData = {
        name: 'root',
        children: [
          {
            name: 'polygon',
            children: [
              {
                name: 'point',
                children: [
                  {
                    name: 'longitude',
                    value: '17',
                  },
                  {
                    name: 'latitude',
                    value: '',
                  },
                ],
              },
            ],
          },
        ],
      };

      const { valid, errors } = validateFormData(formSchema, data);

      expect(valid).toBe(false);
      expect(errors['root[0].polygon[0].point[0].latitude[0]']).toStrictEqual({
        message: 'divaClient_fieldRequiredText',
      });
    });

    it('is invalid for one group 1-X and a textVar 1-1 and other Vars 0-1', async () => {
      const formSchema = formDefContributorGroupWithAuthorGroupAuthor;
      const data: CoraData = {
        name: 'root',
        children: [
          {
            name: 'mainGroup',
            children: [
              {
                name: 'divaPerson',
                children: [
                  { name: 'linkedRecordType', value: 'person' },
                  { name: 'linkedRecordId', value: '' },
                ],
              },
              {
                name: 'givenName',
                value: '',
              },
              {
                name: 'correspondingAuthor',
                value: '',
              },
              {
                name: 'birthYear',
                value: '',
              },
            ],
          },
        ],
      };

      const { valid, errors } = validateFormData(formSchema, data);

      expect(valid).toBe(false);
      expect(errors).toStrictEqual({
        'root[0].mainGroup[0].givenName[0]': {
          message: 'divaClient_fieldRequiredText',
        },
      });
    });

    it('is valid for one group 0-1 with attribute and one textVar 1-1', async () => {
      const formSchema =
        formDefWithOneOptionalGroupWithAttributeCollection0_1_1_1;
      const data: CoraData = {
        name: 'root',
        children: [
          {
            name: 'group',
            children: [
              {
                name: 'variable',
                value: '',
              },
            ],
            attributes: {
              language: 'aar',
            },
          },
        ],
      };

      const { valid } = validateFormData(formSchema, data);

      expect(valid).toBe(true);
    });

    it('is valid for one group 1-1 attribute and with one textVar 1-1', async () => {
      const formSchema =
        formDefWithOneOptionalGroupWithAttributeCollection1_1_1_1;

      const data: CoraData = {
        name: 'root',
        children: [
          {
            name: 'group',
            children: [
              {
                name: 'variable',
                value: 'someValue',
              },
            ],
            attributes: { language: 'aar' },
          },
        ],
      };

      const { valid } = validateFormData(formSchema, data);

      expect(valid).toBe(true);
    });

    it('is valid for one group 1-1 and nested group 1-1 with attribute with one textVar 1-1 with value', async () => {
      const formSchema =
        formDefWithRequiredGroupWithRequiredGroupWithRequiredVarsNEW;

      const data: CoraData = {
        name: 'root',
        children: [
          {
            name: 'mainGroup',
            children: [
              {
                name: 'nestedGroup',
                children: [
                  {
                    name: 'variable',
                    value: 'someValue',
                  },
                ],
                attributes: {
                  language: 'nau',
                },
              },
            ],
          },
        ],
      };

      const { valid } = validateFormData(formSchema, data);

      expect(valid).toBe(true);
    });

    it('is invalid for one group 1-1 and nested group 1-1 with attribute with one textVar 1-1 without value', async () => {
      const formSchema =
        formDefWithRequiredGroupWithRequiredGroupWithRequiredVarsNEW;

      const data: CoraData = {
        name: 'root',
        children: [
          {
            name: 'mainGroup',
            children: [
              {
                name: 'nestedGroup',
                children: [
                  {
                    name: 'variable',
                    value: '',
                  },
                ],
                attributes: {
                  language: '',
                },
              },
            ],
          },
        ],
      };

      const { valid, errors } = validateFormData(formSchema, data);

      expect(valid).toBe(false);
      expect(errors).toStrictEqual({
        'root[0].mainGroup[0].nestedGroup[0].variable[0]': {
          message: 'divaClient_fieldRequiredText',
        },
      });
    });

    it('is valid for one group 0-1 with attribute with one textVariable 1-1 with attribute and with value', async () => {
      const formSchema =
        formDefWithOneOptionalGroupWithAttributeCollectionAndTextVarWithAttribute;

      const data: CoraData = {
        name: 'root',
        children: [
          {
            name: 'mainGroup',
            children: [
              {
                name: 'variable',
                value: 'someValue',
                attributes: {
                  variableAttribute: 'blue',
                },
              },
            ],
            attributes: {
              language: 'nau',
            },
          },
        ],
      };

      const { valid } = validateFormData(formSchema, data);

      expect(valid).toBe(true);
    });

    it('is valid for one group 0-X with attribute with one textVar 1-1 with two attributes and with value', async () => {
      const formSchema =
        formDefWithOneOptionalGroupWithTextVariableAndMultipleAttributes;

      const data: CoraData = {
        name: 'root',
        children: [
          {
            name: 'mainGroup',
            children: [
              {
                name: 'variable',
                value: 'someValue',
                attributes: {
                  language: 'aar',
                  titleType: 'type',
                },
              },
            ],
          },
        ],
      };

      const { valid } = validateFormData(formSchema, data);

      expect(valid).toBe(true);
    });

    it('is valid for one group 1-1 nested group 0-1 with attribute with one textVar 1-1 with two attributes and without value', async () => {
      const formSchema =
        formDefWithOneOptionalGroupWithOneOptionalGroupWithTextVariableAndAttributeCollection;

      const data: CoraData = {
        name: 'root',
        children: [
          {
            name: 'mainGroup',
            children: [
              {
                name: 'nestedGroup',
                children: [
                  {
                    name: 'mainTitle',
                    value: '',
                  },
                ],
                attributes: {
                  _language: '',
                  _titleType: '',
                },
              },
            ],
          },
        ],
      };

      const { valid } = validateFormData(formSchema, data);

      expect(valid).toBe(true);
    });
  });

  describe('same nameInData', () => {
    it('is valid for groups with same nameInData', async () => {
      const formSchema = formDefTitleInfoGroupSameNameInData;

      const data: CoraData = {
        name: 'root',
        children: [
          {
            name: 'titleInfo',
            children: [{ name: 'title', value: 'someValue' }],
            attributes: {
              lang: 'eng',
            },
          },
          {
            name: 'titleInfo',
            children: [{ name: 'title', value: 'someOtherValue' }],
            attributes: {
              lang: 'eng',
              type: 'alternative',
            },
          },
        ],
      };

      const { valid } = validateFormData(formSchema, data);

      expect(valid).toBe(true);
    });

    it('is invalid for groups with same nameInData', async () => {
      const formSchema = formDefTitleInfoGroupSameNameInData;

      const data: CoraData = {
        name: 'root',
        children: [
          {
            name: 'titleInfo',
            children: [{ name: 'title', value: '' }],
            attributes: {
              lang: 'eng',
            },
          },
          {
            name: 'titleInfo',
            children: [{ name: 'title', value: '' }],
            attributes: {
              lang: 'eng',
              type: 'alternative',
            },
          },
        ],
      };

      const { valid, errors } = validateFormData(formSchema, data);

      expect(valid).toBe(false);
      expect(errors).toStrictEqual({
        'root[0].titleInfo[0].title[0]': {
          message: 'divaClient_fieldRequiredText',
        },
      });
    });

    it('is valid for textVar with same nameInData', async () => {
      const formSchema = formDefTextVarsWithSameNameInDataNew;

      const data: CoraData = {
        name: 'root',
        children: [
          {
            name: 'subject',
            value: 'someValue',
            attributes: { language: 'swe' },
          },
          {
            name: 'subject',
            value: 'someOtherValue',
            attributes: { language: 'eng' },
          },
        ],
      };

      const { valid } = validateFormData(formSchema, data);

      expect(valid).toBe(true);
    });

    it('is valid for collVar with same nameInData', async () => {
      const formSchema = formDefCollVarsWithSameNameInDataNEW;

      const data: CoraData = {
        name: 'root',
        children: [
          {
            name: 'genre',
            value: 'artistic-work_original-creative-work',
            attributes: { type: 'code' },
          },
          {
            name: 'genre',
            value: 'artistic-work_artistic-thesis',
            attributes: { type: 'contentType' },
          },
        ],
      };

      const { valid } = validateFormData(formSchema, data);

      expect(valid).toBe(true);
    });

    it('should not validate hidden fields', async () => {
      const formSchema: FormSchema = formDefWithHiddenComponents2;

      const data: CoraData = {
        name: 'organisation',
        children: [{ name: 'namePart', value: 'Some organisation' }],
      };

      const { valid } = validateFormData(formSchema, data);

      expect(valid).toBe(true);
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
        const data: CoraData = {
          name: 'root',
          children: [
            {
              name: 'grandPaGroup',
              children: [
                {
                  name: 'uncleVar',
                  value: 'Uncle Value',
                },
                {
                  name: 'parentGroup',
                  children: [
                    {
                      name: 'childVar',
                      value: '',
                    },
                  ],
                },
              ],
            },
          ],
        };

        const { valid, errors } = validateFormData(formSchema, data);

        expect(valid).toBe(false);
        expect(errors).toStrictEqual({
          'root[0].grandPaGroup[0].parentGroup[0].childVar[0]': {
            message: 'divaClient_fieldRequiredText',
          },
        });
      });

      it('is valid when child and ancestor fields have value', async () => {
        const data: CoraData = {
          name: 'root',
          children: [
            {
              name: 'grandPaGroup',
              children: [
                {
                  name: 'uncleVar',
                  value: 'Uncle Value',
                },
                {
                  name: 'parentGroup',
                  children: [
                    {
                      name: 'childVar',
                      value: 'Child Value',
                    },
                  ],
                },
              ],
            },
          ],
        };

        const { valid } = validateFormData(formSchema, data);

        expect(valid).toBe(true);
      });

      it('is valid when neither child nor ancestor has value', async () => {
        const data: CoraData = {
          name: 'root',
          children: [
            {
              name: 'grandPaGroup',
              children: [
                {
                  name: 'uncleVar',
                  value: '',
                },
                {
                  name: 'parentGroup',
                  children: [
                    {
                      name: 'childVar',
                      value: '',
                    },
                  ],
                },
              ],
            },
          ],
        };

        const { valid } = validateFormData(formSchema, data);

        expect(valid).toBe(true);
      });
    });
  });

  describe('multiple errors', () => {
    describe('textVariable', () => {
      it('returns same error for different fields on same level', () => {
        const formSchema = formDefWithTwoRepeatingTextVariable;

        const data: CoraData = {
          name: 'root',
          children: [
            { name: 'someNameInData', value: '???' },
            { name: 'someOtherNameInData', value: '???' },
          ],
        };

        const { valid, errors } = validateFormData(formSchema, data);

        expect(valid).toBe(false);
        expect(errors).toStrictEqual({
          'root[0].someNameInData[0]': {
            message: 'divaClient_fieldInvalidFormatText',
          },
          'root[0].someOtherNameInData[0]': {
            message: 'divaClient_fieldInvalidFormatText',
          },
        });
      });

      it('returns different error for required fields on same level', () => {
        const formSchema = formDefWithTwoRepeatingTextVariable;

        const data: CoraData = {
          name: 'root',
          children: [
            { name: 'someNameInData', value: '' },
            { name: 'someOtherNameInData', value: '???' },
          ],
        };

        const { valid, errors } = validateFormData(formSchema, data);

        expect(valid).toBe(false);
        expect(errors).toStrictEqual({
          'root[0].someNameInData[0]': {
            message: 'divaClient_fieldRequiredText',
          },
          'root[0].someOtherNameInData[0]': {
            message: 'divaClient_fieldInvalidFormatText',
          },
        });
      });

      it('returns different error for required fields on same level', () => {
        const formSchema = formDefWithTwoRepeatingTextVariable;

        const data: CoraData = {
          name: 'root',
          children: [{ name: 'someOtherNameInData', value: '???' }],
        };

        const { valid, errors } = validateFormData(formSchema, data);

        expect(valid).toBe(false);
        expect(errors).toStrictEqual({
          'root[0].someNameInData[0]': {
            message: 'divaClient_fieldRequiredText',
          },
          'root[0].someOtherNameInData[0]': {
            message: 'divaClient_fieldInvalidFormatText',
          },
        });
      });

      it('returns multiple errors for repeating fields', () => {
        const formSchema = formDefWithTwoRepeatingTextVariable;

        const data: CoraData = {
          name: 'root',
          children: [
            { name: 'someNameInData', value: '!!!' },
            { name: 'someNameInData', value: '???' },
            { name: 'someOtherNameInData', value: '???' },
            { name: 'someOtherNameInData', value: '!!!' },
          ],
        };

        const { valid, errors } = validateFormData(formSchema, data);

        expect(valid).toBe(false);
        expect(errors).toStrictEqual({
          'root[0].someNameInData[0]': {
            message: 'divaClient_fieldInvalidFormatText',
          },
          'root[0].someNameInData[1]': {
            message: 'divaClient_fieldInvalidFormatText',
          },
          'root[0].someOtherNameInData[0]': {
            message: 'divaClient_fieldInvalidFormatText',
          },
          'root[0].someOtherNameInData[1]': {
            message: 'divaClient_fieldInvalidFormatText',
          },
        });
      });
    });
    describe('numberVariable', () => {
      it('returns same error for different fields on same level', () => {
        const formSchema = formDefWithTwoRepeatingNumberVariable;

        const data: CoraData = {
          name: 'root',
          children: [
            { name: 'someNameInData', value: '4' },
            { name: 'someOtherNameInData', value: '24' },
          ],
        };

        const { valid, errors } = validateFormData(formSchema, data);

        expect(valid).toBe(false);
        expect(errors).toStrictEqual({
          'root[0].someNameInData[0]': {
            message: 'divaClient_invalidRangeMinText',
          },
          'root[0].someOtherNameInData[0]': {
            message: 'divaClient_invalidRangeMaxText',
          },
        });
      });

      it('returns different error for required fields on same level', () => {
        const formSchema = formDefWithTwoRepeatingNumberVariable;

        const data: CoraData = {
          name: 'root',
          children: [
            { name: 'someNameInData', value: '' },
            { name: 'someOtherNameInData', value: '21' },
          ],
        };

        const { valid, errors } = validateFormData(formSchema, data);

        expect(valid).toBe(false);
        expect(errors).toStrictEqual({
          'root[0].someNameInData[0]': {
            message: 'divaClient_fieldRequiredText',
          },
          'root[0].someOtherNameInData[0]': {
            message: 'divaClient_invalidRangeMaxText',
          },
        });
      });

      it('returns different error for required fields on same level', () => {
        const formSchema = formDefWithTwoRepeatingNumberVariable;

        const data: CoraData = {
          name: 'root',
          children: [{ name: 'someOtherNameInData', value: '21' }],
        };

        const { valid, errors } = validateFormData(formSchema, data);

        expect(valid).toBe(false);
        expect(errors).toStrictEqual({
          'root[0].someNameInData[0]': {
            message: 'divaClient_fieldRequiredText',
          },
          'root[0].someOtherNameInData[0]': {
            message: 'divaClient_invalidRangeMaxText',
          },
        });
      });

      it('returns multiple errors for repeating fields', () => {
        const formSchema = formDefWithTwoRepeatingNumberVariable;

        const data: CoraData = {
          name: 'root',
          children: [
            { name: 'someNameInData', value: '4' },
            { name: 'someNameInData', value: '4' },
            { name: 'someOtherNameInData', value: '22' },
            { name: 'someOtherNameInData', value: '22' },
          ],
        };

        const { valid, errors } = validateFormData(formSchema, data);

        expect(valid).toBe(false);
        expect(errors).toStrictEqual({
          'root[0].someNameInData[0]': {
            message: 'divaClient_invalidRangeMinText',
          },
          'root[0].someNameInData[1]': {
            message: 'divaClient_invalidRangeMinText',
          },
          'root[0].someOtherNameInData[0]': {
            message: 'divaClient_invalidRangeMaxText',
          },
          'root[0].someOtherNameInData[1]': {
            message: 'divaClient_invalidRangeMaxText',
          },
        });
      });
    });
  });
});
