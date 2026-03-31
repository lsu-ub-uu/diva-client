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
  formDefWithOneCollectionVariable1_1,
} from '@/__mocks__/data/form/collVar';
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
import { formDefWithHiddenComponents2 } from '@/__mocks__/data/form/hiddenInput';
import {
  formDefWithOneNumberVariable0_1,
  formDefWithOneNumberVariable1_1,
  formDefWithOneNumberVariable1_X,
  formDefWithTwoRepeatingNumberVariable,
} from '@/__mocks__/data/form/numVar';
import {
  formDefWithOneRecordLinkBeingOptional,
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
import type {
  FormComponentGroup,
  FormSchema,
  RecordFormSchema,
} from '@/components/FormGenerator/types';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import type { CoraData } from '@/cora/cora-data/types.server';
import { describe, expect, it } from 'vitest';
import { validateFormData } from '../validateFormData';
import {
  formDefWithNestedSurroundingContainersAroundTextVariable,
  formDefWithSurroundingContainerAroundTextVariable,
} from '@/__mocks__/data/form/container';
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
          label: 'someLabelTextId',
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
          label: 'someLabelTextId',
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
          label: 'someLabelTextId',
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
          label: 'someLabelTextId',
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
          label: 'someNumberVariableNameInData',
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
          message: 'divaClient_invalidRangeMinText',
          label: 'someNumberVariableNameInData',
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
          message: 'divaClient_invalidRangeMaxText',
          label: 'someNumberVariableNameInData',
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
          label: 'someNumberVariableNameInData',
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
          message: 'divaClient_fieldRequiredText',
          label: 'someNumberVariableNameInData',
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
          label: '',
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
          label: '',
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
          label: '',
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
          label: 'attachmentFileLinkText',
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
          label: 'Colour',
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
          label: 'languageCollectionVarText',
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
          label: 'test',
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
          label: 'test',
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
          label: 'test',
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
          label: 'test',
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
          label: 'test',
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
          label: 'test',
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
        label: 'latitudeTextVarText',
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
        label: 'latitudeTextVarText',
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
        label: 'latitudeTextVarText',
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
        label: 'latitudeTextVarText',
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
        label: 'someOtherCollectionVarText',
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
          label: 'givenNameTextVarText',
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
          label: 'mainTitleTextVarText',
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
          label: 'titleTextVarText',
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
            label: '',
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
            label: '',
          },
          'root[0].someOtherNameInData[0]': {
            message: 'divaClient_fieldInvalidFormatText',
            label: '',
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
            label: '',
          },
          'root[0].someOtherNameInData[0]': {
            message: 'divaClient_fieldInvalidFormatText',
            label: '',
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
            label: '',
          },
          'root[0].someOtherNameInData[0]': {
            message: 'divaClient_fieldInvalidFormatText',
            label: '',
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
            label: '',
          },
          'root[0].someNameInData[1]': {
            message: 'divaClient_fieldInvalidFormatText',
            label: '',
          },
          'root[0].someOtherNameInData[0]': {
            message: 'divaClient_fieldInvalidFormatText',
            label: '',
          },
          'root[0].someOtherNameInData[1]': {
            message: 'divaClient_fieldInvalidFormatText',
            label: '',
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
            label: '',
          },
          'root[0].someOtherNameInData[0]': {
            message: 'divaClient_invalidRangeMaxText',
            label: '',
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
            label: '',
          },
          'root[0].someOtherNameInData[0]': {
            message: 'divaClient_invalidRangeMaxText',
            label: '',
          },
        });
      });

      it('returns different error for required fields on same level', () => {
        const formSchema = formDefWithTwoRepeatingNumberVariable;

        const data: CoraData = {
          name: 'root',
          children: [{ name: 'someOtherNameInData', value: '2' }],
        };

        const { valid, errors } = validateFormData(formSchema, data);

        expect(valid).toBe(false);
        expect(errors).toStrictEqual({
          'root[0].someNameInData[0]': {
            message: 'divaClient_fieldRequiredText',
            label: '',
          },
          'root[0].someOtherNameInData[0]': {
            message: 'divaClient_invalidRangeMinText',
            label: '',
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
            label: '',
          },
          'root[0].someNameInData[1]': {
            message: 'divaClient_invalidRangeMinText',
            label: '',
          },
          'root[0].someOtherNameInData[0]': {
            message: 'divaClient_invalidRangeMaxText',
            label: '',
          },
          'root[0].someOtherNameInData[1]': {
            message: 'divaClient_invalidRangeMaxText',
            label: '',
          },
        });
      });
    });
    describe('collVar', () => {
      it('returns same error for different fields on same level', () => {
        const formSchema = formDefWithTwoRepeatingCollVariable;

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
    });
  });

  describe('containers', () => {
    it('is valid for text variable in a surrounding container', async () => {
      const formSchema = formDefWithSurroundingContainerAroundTextVariable;

      const data: CoraData = {
        name: 'root',
        children: [{ name: 'someNameInData', value: 'someValue' }],
      };

      const { valid } = validateFormData(formSchema, data);

      expect(valid).toBe(true);
    });

    it('is invalid for empty text variable in a surrounding container', async () => {
      const formSchema = formDefWithSurroundingContainerAroundTextVariable;

      const data: CoraData = {
        name: 'someRootNameInData',
        children: [{ name: 'someNameInData', value: '' }],
      };

      const { valid, errors } = validateFormData(formSchema, data);

      expect(valid).toBe(false);
      expect(errors).toStrictEqual({
        'someRootNameInData[0].someNameInData[0]': {
          message: 'divaClient_fieldRequiredText',
          label: 'someTextId',
        },
      });
    });

    it('is valid for text variable in a surrounding container', async () => {
      const formSchema =
        formDefWithNestedSurroundingContainersAroundTextVariable;

      const data: CoraData = {
        name: 'root',
        children: [{ name: 'someNameInData', value: 'someValue' }],
      };

      const { valid } = validateFormData(formSchema, data);

      expect(valid).toBe(true);
    });

    it('is invalid for empty text variable in nested surrounding container', async () => {
      const formSchema =
        formDefWithNestedSurroundingContainersAroundTextVariable;

      const data: CoraData = {
        name: 'someRootNameInData',
        children: [{ name: 'someNameInData', value: '' }],
      };

      const { valid, errors } = validateFormData(formSchema, data);

      expect(valid).toBe(false);
      expect(errors).toStrictEqual({
        'someRootNameInData[0].someNameInData[0]': {
          message: 'divaClient_fieldRequiredText',
          label: 'someTextId',
        },
      });
    });
  });

  it('temp', () => {
    const formSchema: RecordFormSchema = {
      validationTypeId: 'diva-person',
      form: {
        presentationId: 'personUpdatePGroup',
        type: 'group',
        name: 'person',
        mode: 'input',
        tooltip: {
          title: 'personNewGroupText',
          body: 'personNewGroupDefText',
        },
        label: 'personNewGroupText',
        headlineLevel: 'h1',
        showLabel: true,
        components: [
          {
            presentationId: 'recordInfoPersonUpdatePGroup',
            type: 'group',
            name: 'recordInfo',
            mode: 'input',
            tooltip: {
              title: 'recordInfoPersonUpdateGroupText',
              body: 'recordInfoPersonUpdateGroupDefText',
            },
            label: 'recordInfoPersonUpdateGroupText',
            showLabel: false,
            components: [
              {
                presentationId: 'trashBinPCollVar',
                options: [
                  {
                    value: 'false',
                    label: 'falseItemText',
                  },
                  {
                    value: 'true',
                    label: 'trueItemText',
                  },
                ],
                name: 'inTrashBin',
                placeholder: 'initialEmptyValueText',
                mode: 'input',
                tooltip: {
                  title: 'trashBinCollectionVarText',
                  body: 'trashBinCollectionVarDefText',
                },
                label: 'trashBinCollectionVarText',
                showLabel: true,
                type: 'collectionVariable',
                repeat: {
                  minNumberOfRepeatingToShow: 0,
                  repeatMin: 0,
                  repeatMax: 1,
                },
                childStyle: [],
                gridColSpan: 12,
              },
              {
                presentationId: 'oldIdPVar',
                name: 'oldId',
                mode: 'input',
                tooltip: {
                  title: 'oldIdTextVarText',
                  body: 'oldIdTextVarDefText',
                },
                label: 'oldIdTextVarText',
                showLabel: true,
                type: 'textVariable',
                validation: {
                  type: 'regex',
                  pattern: '^\\S.*$',
                },
                repeat: {
                  minNumberOfRepeatingToShow: 0,
                  repeatMin: 0,
                  repeatMax: 1,
                },
                childStyle: [],
                gridColSpan: 12,
                inputType: 'input',
              },
              {
                type: 'hidden',
                name: 'validationType',
                finalValue: 'diva-person',
                attributesToShow: 'none',
                repeat: {
                  repeatMin: 1,
                  repeatMax: 1,
                },
                linkedRecordType: 'validationType',
              },
              {
                type: 'hidden',
                name: 'dataDivider',
                finalValue: 'divaData',
                attributesToShow: 'none',
                repeat: {
                  repeatMin: 1,
                  repeatMax: 1,
                },
                linkedRecordType: 'system',
              },
            ],
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
            presentationSize: 'singleInitiallyHidden',
            title: 'recordInfoPersonUpdateGroupText',
            titleHeadlineLevel: 'h2',
          },
          {
            presentationId: 'authorityPersonalPGroup',
            type: 'group',
            name: 'authority',
            mode: 'input',
            tooltip: {
              title: 'authorityPersonalGroupText',
              body: 'authorityPersonalGroupDefText',
            },
            label: 'authorityPersonalGroupText',
            showLabel: false,
            components: [
              {
                presentationId: 'namePersonPGroup',
                type: 'group',
                name: 'name',
                mode: 'input',
                tooltip: {
                  title: 'namePersonGroupText',
                  body: 'namePersonGroupDefText',
                },
                label: 'namePersonGroupText',
                showLabel: false,
                attributesToShow: 'selectable',
                attributes: [
                  {
                    type: 'collectionVariable',
                    name: 'type',
                    placeholder: 'initialEmptyValueText',
                    mode: 'input',
                    tooltip: {
                      title: 'nameTypeCollectionVarText',
                      body: 'nameTypeCollectionVarDefText',
                    },
                    label: 'nameTypeCollectionVarText',
                    showLabel: true,
                    options: [
                      {
                        value: 'personal',
                        label: 'personalItemText',
                      },
                      {
                        value: 'corporate',
                        label: 'corporateItemText',
                      },
                      {
                        value: 'external',
                        label: 'externalItemText',
                      },
                      {
                        value: 'coordinating',
                        label: 'coordinatingItemText',
                      },
                    ],
                    finalValue: 'personal',
                  },
                ],
                components: [
                  {
                    presentationId: 'namePartGivenPVar',
                    name: 'namePart',
                    mode: 'input',
                    tooltip: {
                      title: 'namePartGivenTextVarText',
                      body: 'namePartGivenTextVarDefText',
                    },
                    label: 'namePartGivenTextVarText',
                    showLabel: true,
                    attributesToShow: 'selectable',
                    type: 'textVariable',
                    validation: {
                      type: 'regex',
                      pattern: '^\\S.*$',
                    },
                    attributes: [
                      {
                        type: 'collectionVariable',
                        name: 'type',
                        placeholder: 'initialEmptyValueText',
                        mode: 'input',
                        tooltip: {
                          title: 'namePartTypeDivaCollectionVarText',
                          body: 'namePartTypeDivaCollectionVarDefText',
                        },
                        label: 'namePartTypeDivaCollectionVarText',
                        showLabel: true,
                        options: [
                          {
                            value: 'given',
                            label: 'givenItemText',
                          },
                          {
                            value: 'family',
                            label: 'familyItemText',
                          },
                          {
                            value: 'termsOfAddress',
                            label: 'termsOfAddressItemText',
                          },
                          {
                            value: 'date',
                            label: 'dateItemText',
                          },
                        ],
                        finalValue: 'given',
                      },
                    ],
                    repeat: {
                      minNumberOfRepeatingToShow: 1,
                      repeatMin: 0,
                      repeatMax: 1,
                    },
                    childStyle: [],
                    gridColSpan: 12,
                    inputType: 'input',
                  },
                  {
                    presentationId: 'namePartFamilyPVar',
                    name: 'namePart',
                    mode: 'input',
                    tooltip: {
                      title: 'namePartFamilyTextVarText',
                      body: 'namePartFamilyTextVarDefText',
                    },
                    label: 'namePartFamilyTextVarText',
                    showLabel: true,
                    attributesToShow: 'selectable',
                    type: 'textVariable',
                    validation: {
                      type: 'regex',
                      pattern: '^\\S.*$',
                    },
                    attributes: [
                      {
                        type: 'collectionVariable',
                        name: 'type',
                        placeholder: 'initialEmptyValueText',
                        mode: 'input',
                        tooltip: {
                          title: 'namePartTypeDivaCollectionVarText',
                          body: 'namePartTypeDivaCollectionVarDefText',
                        },
                        label: 'namePartTypeDivaCollectionVarText',
                        showLabel: true,
                        options: [
                          {
                            value: 'given',
                            label: 'givenItemText',
                          },
                          {
                            value: 'family',
                            label: 'familyItemText',
                          },
                          {
                            value: 'termsOfAddress',
                            label: 'termsOfAddressItemText',
                          },
                          {
                            value: 'date',
                            label: 'dateItemText',
                          },
                        ],
                        finalValue: 'family',
                      },
                    ],
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
                    presentationId: 'namePartTermsOfAddressPVar',
                    name: 'namePart',
                    mode: 'input',
                    tooltip: {
                      title: 'namePartTermsOfAddressTextVarText',
                      body: 'namePartTermsOfAddressTextVarDefText',
                    },
                    label: 'namePartTermsOfAddressTextVarText',
                    showLabel: true,
                    attributesToShow: 'selectable',
                    type: 'textVariable',
                    validation: {
                      type: 'regex',
                      pattern: '^\\S.*$',
                    },
                    attributes: [
                      {
                        type: 'collectionVariable',
                        name: 'type',
                        placeholder: 'initialEmptyValueText',
                        mode: 'input',
                        tooltip: {
                          title: 'namePartTypeDivaCollectionVarText',
                          body: 'namePartTypeDivaCollectionVarDefText',
                        },
                        label: 'namePartTypeDivaCollectionVarText',
                        showLabel: true,
                        options: [
                          {
                            value: 'given',
                            label: 'givenItemText',
                          },
                          {
                            value: 'family',
                            label: 'familyItemText',
                          },
                          {
                            value: 'termsOfAddress',
                            label: 'termsOfAddressItemText',
                          },
                          {
                            value: 'date',
                            label: 'dateItemText',
                          },
                        ],
                        finalValue: 'termsOfAddress',
                      },
                    ],
                    repeat: {
                      minNumberOfRepeatingToShow: 1,
                      repeatMin: 0,
                      repeatMax: 1,
                    },
                    childStyle: [],
                    gridColSpan: 12,
                    inputType: 'input',
                  },
                  {
                    presentationId: 'namePartDatePVar',
                    name: 'namePart',
                    mode: 'input',
                    tooltip: {
                      title: 'namePartDateTextVarText',
                      body: 'namePartDateTextVarDefText',
                    },
                    label: 'namePartDateTextVarText',
                    showLabel: true,
                    attributesToShow: 'selectable',
                    type: 'textVariable',
                    validation: {
                      type: 'regex',
                      pattern: '^((\\d{4})|(\\d{4}\\-\\d{4})|(\\-\\d{4}))$',
                    },
                    attributes: [
                      {
                        type: 'collectionVariable',
                        name: 'type',
                        placeholder: 'initialEmptyValueText',
                        mode: 'input',
                        tooltip: {
                          title: 'namePartTypeDivaCollectionVarText',
                          body: 'namePartTypeDivaCollectionVarDefText',
                        },
                        label: 'namePartTypeDivaCollectionVarText',
                        showLabel: true,
                        options: [
                          {
                            value: 'given',
                            label: 'givenItemText',
                          },
                          {
                            value: 'family',
                            label: 'familyItemText',
                          },
                          {
                            value: 'termsOfAddress',
                            label: 'termsOfAddressItemText',
                          },
                          {
                            value: 'date',
                            label: 'dateItemText',
                          },
                        ],
                        finalValue: 'date',
                      },
                    ],
                    repeat: {
                      minNumberOfRepeatingToShow: 0,
                      repeatMin: 0,
                      repeatMax: 1,
                    },
                    childStyle: [],
                    gridColSpan: 12,
                    inputType: 'input',
                  },
                ],
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 1,
                  repeatMax: 1,
                },
                childStyle: [],
                gridColSpan: 12,
              },
            ],
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
            presentationSize: 'firstLarger',
            title: 'authorityPersonalGroupText',
            titleHeadlineLevel: 'h2',
            alternativePresentation: {
              presentationId: 'authorityPersonalInputOutputPGroup',
              type: 'group',
              name: 'authority',
              mode: 'output',
              tooltip: {
                title: 'authorityPersonalGroupText',
                body: 'authorityPersonalGroupDefText',
              },
              label: 'authorityPersonalGroupText',
              showLabel: false,
              components: [
                {
                  presentationId: 'namePersonInputOutputPGroup',
                  type: 'group',
                  name: 'name',
                  mode: 'output',
                  tooltip: {
                    title: 'namePersonGroupText',
                    body: 'namePersonGroupDefText',
                  },
                  label: 'namePersonGroupText',
                  showLabel: false,
                  attributesToShow: 'selectable',
                  presentationStyle: 'inline',
                  attributes: [
                    {
                      type: 'collectionVariable',
                      name: 'type',
                      placeholder: 'initialEmptyValueText',
                      mode: 'output',
                      tooltip: {
                        title: 'nameTypeCollectionVarText',
                        body: 'nameTypeCollectionVarDefText',
                      },
                      label: 'nameTypeCollectionVarText',
                      showLabel: true,
                      options: [
                        {
                          value: 'personal',
                          label: 'personalItemText',
                        },
                        {
                          value: 'corporate',
                          label: 'corporateItemText',
                        },
                        {
                          value: 'external',
                          label: 'externalItemText',
                        },
                        {
                          value: 'coordinating',
                          label: 'coordinatingItemText',
                        },
                      ],
                      finalValue: 'personal',
                    },
                  ],
                  components: [
                    {
                      presentationId: 'namePartGivenOutputPVar',
                      name: 'namePart',
                      mode: 'output',
                      tooltip: {
                        title: 'namePartGivenTextVarText',
                        body: 'namePartGivenTextVarDefText',
                      },
                      label: 'namePartGivenTextVarText',
                      showLabel: true,
                      attributesToShow: 'selectable',
                      type: 'textVariable',
                      validation: {
                        type: 'regex',
                        pattern: '^\\S.*$',
                      },
                      attributes: [
                        {
                          type: 'collectionVariable',
                          name: 'type',
                          placeholder: 'initialEmptyValueText',
                          mode: 'output',
                          tooltip: {
                            title: 'namePartTypeDivaCollectionVarText',
                            body: 'namePartTypeDivaCollectionVarDefText',
                          },
                          label: 'namePartTypeDivaCollectionVarText',
                          showLabel: true,
                          options: [
                            {
                              value: 'given',
                              label: 'givenItemText',
                            },
                            {
                              value: 'family',
                              label: 'familyItemText',
                            },
                            {
                              value: 'termsOfAddress',
                              label: 'termsOfAddressItemText',
                            },
                            {
                              value: 'date',
                              label: 'dateItemText',
                            },
                          ],
                          finalValue: 'given',
                        },
                      ],
                      repeat: {
                        minNumberOfRepeatingToShow: 1,
                        repeatMin: 0,
                        repeatMax: 1,
                      },
                      childStyle: [],
                      gridColSpan: 12,
                      inputType: 'input',
                    },
                    {
                      presentationId: 'namePartFamilyOutputPVar',
                      name: 'namePart',
                      mode: 'output',
                      tooltip: {
                        title: 'namePartFamilyTextVarText',
                        body: 'namePartFamilyTextVarDefText',
                      },
                      label: 'namePartFamilyTextVarText',
                      showLabel: true,
                      attributesToShow: 'selectable',
                      type: 'textVariable',
                      validation: {
                        type: 'regex',
                        pattern: '^\\S.*$',
                      },
                      attributes: [
                        {
                          type: 'collectionVariable',
                          name: 'type',
                          placeholder: 'initialEmptyValueText',
                          mode: 'output',
                          tooltip: {
                            title: 'namePartTypeDivaCollectionVarText',
                            body: 'namePartTypeDivaCollectionVarDefText',
                          },
                          label: 'namePartTypeDivaCollectionVarText',
                          showLabel: true,
                          options: [
                            {
                              value: 'given',
                              label: 'givenItemText',
                            },
                            {
                              value: 'family',
                              label: 'familyItemText',
                            },
                            {
                              value: 'termsOfAddress',
                              label: 'termsOfAddressItemText',
                            },
                            {
                              value: 'date',
                              label: 'dateItemText',
                            },
                          ],
                          finalValue: 'family',
                        },
                      ],
                      repeat: {
                        minNumberOfRepeatingToShow: 1,
                        repeatMin: 1,
                        repeatMax: 1,
                      },
                      childStyle: [],
                      gridColSpan: 12,
                      inputType: 'input',
                    },
                  ],
                  repeat: {
                    minNumberOfRepeatingToShow: 1,
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                  childStyle: [],
                  gridColSpan: 12,
                },
              ],
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1,
              },
              childStyle: [],
              gridColSpan: 12,
              presentationSize: 'firstLarger',
              title: 'authorityPersonalGroupText',
              titleHeadlineLevel: 'h2',
            },
          },
          {
            presentationId: 'variantPersonalPGroup',
            type: 'group',
            name: 'variant',
            mode: 'input',
            tooltip: {
              title: 'variantPersonalGroupText',
              body: 'variantPersonalGroupDefText',
            },
            label: 'variantPersonalGroupText',
            showLabel: false,
            components: [
              {
                presentationId: 'namePersonVariantPGroup',
                type: 'group',
                name: 'name',
                mode: 'input',
                tooltip: {
                  title: 'namePersonVariantGroupText',
                  body: 'namePersonVariantGroupDefText',
                },
                label: 'namePersonVariantGroupText',
                showLabel: false,
                attributesToShow: 'selectable',
                attributes: [
                  {
                    type: 'collectionVariable',
                    name: 'type',
                    placeholder: 'initialEmptyValueText',
                    mode: 'input',
                    tooltip: {
                      title: 'nameTypeCollectionVarText',
                      body: 'nameTypeCollectionVarDefText',
                    },
                    label: 'nameTypeCollectionVarText',
                    showLabel: true,
                    options: [
                      {
                        value: 'personal',
                        label: 'personalItemText',
                      },
                      {
                        value: 'corporate',
                        label: 'corporateItemText',
                      },
                      {
                        value: 'external',
                        label: 'externalItemText',
                      },
                      {
                        value: 'coordinating',
                        label: 'coordinatingItemText',
                      },
                    ],
                    finalValue: 'personal',
                  },
                ],
                components: [
                  {
                    presentationId: 'namePartGivenPVar',
                    name: 'namePart',
                    mode: 'input',
                    tooltip: {
                      title: 'namePartGivenTextVarText',
                      body: 'namePartGivenTextVarDefText',
                    },
                    label: 'namePartGivenTextVarText',
                    showLabel: true,
                    attributesToShow: 'selectable',
                    type: 'textVariable',
                    validation: {
                      type: 'regex',
                      pattern: '^\\S.*$',
                    },
                    attributes: [
                      {
                        type: 'collectionVariable',
                        name: 'type',
                        placeholder: 'initialEmptyValueText',
                        mode: 'input',
                        tooltip: {
                          title: 'namePartTypeDivaCollectionVarText',
                          body: 'namePartTypeDivaCollectionVarDefText',
                        },
                        label: 'namePartTypeDivaCollectionVarText',
                        showLabel: true,
                        options: [
                          {
                            value: 'given',
                            label: 'givenItemText',
                          },
                          {
                            value: 'family',
                            label: 'familyItemText',
                          },
                          {
                            value: 'termsOfAddress',
                            label: 'termsOfAddressItemText',
                          },
                          {
                            value: 'date',
                            label: 'dateItemText',
                          },
                        ],
                        finalValue: 'given',
                      },
                    ],
                    repeat: {
                      minNumberOfRepeatingToShow: 1,
                      repeatMin: 0,
                      repeatMax: 1,
                    },
                    childStyle: [],
                    gridColSpan: 12,
                    inputType: 'input',
                  },
                  {
                    presentationId: 'namePartFamilyPVar',
                    name: 'namePart',
                    mode: 'input',
                    tooltip: {
                      title: 'namePartFamilyTextVarText',
                      body: 'namePartFamilyTextVarDefText',
                    },
                    label: 'namePartFamilyTextVarText',
                    showLabel: true,
                    attributesToShow: 'selectable',
                    type: 'textVariable',
                    validation: {
                      type: 'regex',
                      pattern: '^\\S.*$',
                    },
                    attributes: [
                      {
                        type: 'collectionVariable',
                        name: 'type',
                        placeholder: 'initialEmptyValueText',
                        mode: 'input',
                        tooltip: {
                          title: 'namePartTypeDivaCollectionVarText',
                          body: 'namePartTypeDivaCollectionVarDefText',
                        },
                        label: 'namePartTypeDivaCollectionVarText',
                        showLabel: true,
                        options: [
                          {
                            value: 'given',
                            label: 'givenItemText',
                          },
                          {
                            value: 'family',
                            label: 'familyItemText',
                          },
                          {
                            value: 'termsOfAddress',
                            label: 'termsOfAddressItemText',
                          },
                          {
                            value: 'date',
                            label: 'dateItemText',
                          },
                        ],
                        finalValue: 'family',
                      },
                    ],
                    repeat: {
                      minNumberOfRepeatingToShow: 1,
                      repeatMin: 0,
                      repeatMax: 1,
                    },
                    childStyle: [],
                    gridColSpan: 12,
                    inputType: 'input',
                  },
                ],
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 1,
                  repeatMax: 1.7976931348623157e308,
                },
                childStyle: [],
                gridColSpan: 12,
                presentationSize: 'firstLarger',
                title: 'namePersonVariantGroupText',
                titleHeadlineLevel: 'h3',
                alternativePresentation: {
                  presentationId: 'namePersonVariantInputOutputPGroup',
                  type: 'group',
                  name: 'name',
                  mode: 'output',
                  tooltip: {
                    title: 'namePersonVariantGroupText',
                    body: 'namePersonVariantGroupDefText',
                  },
                  label: 'namePersonVariantGroupText',
                  showLabel: false,
                  attributesToShow: 'selectable',
                  presentationStyle: 'inline',
                  attributes: [
                    {
                      type: 'collectionVariable',
                      name: 'type',
                      placeholder: 'initialEmptyValueText',
                      mode: 'output',
                      tooltip: {
                        title: 'nameTypeCollectionVarText',
                        body: 'nameTypeCollectionVarDefText',
                      },
                      label: 'nameTypeCollectionVarText',
                      showLabel: true,
                      options: [
                        {
                          value: 'personal',
                          label: 'personalItemText',
                        },
                        {
                          value: 'corporate',
                          label: 'corporateItemText',
                        },
                        {
                          value: 'external',
                          label: 'externalItemText',
                        },
                        {
                          value: 'coordinating',
                          label: 'coordinatingItemText',
                        },
                      ],
                      finalValue: 'personal',
                    },
                  ],
                  components: [
                    {
                      presentationId: 'namePartGivenOutputPVar',
                      name: 'namePart',
                      mode: 'output',
                      tooltip: {
                        title: 'namePartGivenTextVarText',
                        body: 'namePartGivenTextVarDefText',
                      },
                      label: 'namePartGivenTextVarText',
                      showLabel: true,
                      attributesToShow: 'selectable',
                      type: 'textVariable',
                      validation: {
                        type: 'regex',
                        pattern: '^\\S.*$',
                      },
                      attributes: [
                        {
                          type: 'collectionVariable',
                          name: 'type',
                          placeholder: 'initialEmptyValueText',
                          mode: 'output',
                          tooltip: {
                            title: 'namePartTypeDivaCollectionVarText',
                            body: 'namePartTypeDivaCollectionVarDefText',
                          },
                          label: 'namePartTypeDivaCollectionVarText',
                          showLabel: true,
                          options: [
                            {
                              value: 'given',
                              label: 'givenItemText',
                            },
                            {
                              value: 'family',
                              label: 'familyItemText',
                            },
                            {
                              value: 'termsOfAddress',
                              label: 'termsOfAddressItemText',
                            },
                            {
                              value: 'date',
                              label: 'dateItemText',
                            },
                          ],
                          finalValue: 'given',
                        },
                      ],
                      repeat: {
                        minNumberOfRepeatingToShow: 1,
                        repeatMin: 0,
                        repeatMax: 1,
                      },
                      childStyle: [],
                      gridColSpan: 12,
                      inputType: 'input',
                    },
                    {
                      presentationId: 'namePartFamilyOutputPVar',
                      name: 'namePart',
                      mode: 'output',
                      tooltip: {
                        title: 'namePartFamilyTextVarText',
                        body: 'namePartFamilyTextVarDefText',
                      },
                      label: 'namePartFamilyTextVarText',
                      showLabel: true,
                      attributesToShow: 'selectable',
                      type: 'textVariable',
                      validation: {
                        type: 'regex',
                        pattern: '^\\S.*$',
                      },
                      attributes: [
                        {
                          type: 'collectionVariable',
                          name: 'type',
                          placeholder: 'initialEmptyValueText',
                          mode: 'output',
                          tooltip: {
                            title: 'namePartTypeDivaCollectionVarText',
                            body: 'namePartTypeDivaCollectionVarDefText',
                          },
                          label: 'namePartTypeDivaCollectionVarText',
                          showLabel: true,
                          options: [
                            {
                              value: 'given',
                              label: 'givenItemText',
                            },
                            {
                              value: 'family',
                              label: 'familyItemText',
                            },
                            {
                              value: 'termsOfAddress',
                              label: 'termsOfAddressItemText',
                            },
                            {
                              value: 'date',
                              label: 'dateItemText',
                            },
                          ],
                          finalValue: 'family',
                        },
                      ],
                      repeat: {
                        minNumberOfRepeatingToShow: 1,
                        repeatMin: 0,
                        repeatMax: 1,
                      },
                      childStyle: [],
                      gridColSpan: 12,
                      inputType: 'input',
                    },
                  ],
                  repeat: {
                    minNumberOfRepeatingToShow: 1,
                    repeatMin: 1,
                    repeatMax: 1.7976931348623157e308,
                  },
                  childStyle: [],
                  gridColSpan: 12,
                  presentationSize: 'firstLarger',
                  title: 'namePersonVariantGroupText',
                  titleHeadlineLevel: 'h3',
                },
              },
            ],
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
            presentationSize: 'singleInitiallyHidden',
            title: 'variantPersonalGroupText',
            titleHeadlineLevel: 'h2',
          },
          {
            presentationId: 'personInfoSContainer',
            type: 'container',
            name: 'personInfoSContainer',
            mode: 'input',
            containerType: 'surrounding',
            components: [
              {
                presentationId: 'emailDivaPVar',
                name: 'email',
                mode: 'input',
                tooltip: {
                  title: 'emailDivaTextVarText',
                  body: 'emailDivaTextVarDefText',
                },
                label: 'emailDivaTextVarText',
                showLabel: true,
                type: 'textVariable',
                validation: {
                  type: 'regex',
                  pattern: '^([0-9a-zA-Z].*?@([0-9a-zA-Z].*\\.\\w{2,4}))$',
                },
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 0,
                  repeatMax: 1.7976931348623157e308,
                },
                childStyle: [],
                gridColSpan: 12,
                presentationSize: 'firstLarger',
                title: 'emailDivaTextVarText',
                titleHeadlineLevel: 'h3',
                inputType: 'input',
                alternativePresentation: {
                  presentationId: 'emailDivaWithouLabelOutputPVar',
                  name: 'email',
                  mode: 'output',
                  tooltip: {
                    title: 'emailDivaTextVarText',
                    body: 'emailDivaTextVarDefText',
                  },
                  label: 'emailDivaTextVarText',
                  showLabel: false,
                  type: 'textVariable',
                  validation: {
                    type: 'regex',
                    pattern: '^([0-9a-zA-Z].*?@([0-9a-zA-Z].*\\.\\w{2,4}))$',
                  },
                  repeat: {
                    minNumberOfRepeatingToShow: 1,
                    repeatMin: 0,
                    repeatMax: 1.7976931348623157e308,
                  },
                  childStyle: [],
                  gridColSpan: 12,
                  presentationSize: 'firstLarger',
                  title: 'emailDivaTextVarText',
                  titleHeadlineLevel: 'h3',
                  inputType: 'input',
                },
              },
              {
                presentationId: 'locationPGroup',
                type: 'group',
                name: 'location',
                mode: 'input',
                tooltip: {
                  title: 'locationGroupText',
                  body: 'locationGroupDefText',
                },
                label: 'locationGroupText',
                showLabel: false,
                components: [
                  {
                    presentationId: 'urlDivaPVar',
                    name: 'url',
                    mode: 'input',
                    tooltip: {
                      title: 'urlDivaTextVarText',
                      body: 'urlDivaTextVarDefText',
                    },
                    label: 'urlDivaTextVarText',
                    showLabel: true,
                    type: 'textVariable',
                    validation: {
                      type: 'regex',
                      pattern:
                        '(https?:\\/\\/)?(www\\.)?[-a-zA-Z0-9@:;!%._\\+~#=(),]{2,256}\\.[a-z]{2,63}\\b([-a-zA-Z0-9@:;!%_\\+.~#?&//=(),]*)',
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
                    presentationId: 'displayLabelPVar',
                    name: 'displayLabel',
                    mode: 'input',
                    tooltip: {
                      title: 'displayLabelTextVarText',
                      body: 'displayLabelTextVarDefText',
                    },
                    label: 'displayLabelTextVarText',
                    showLabel: true,
                    type: 'textVariable',
                    validation: {
                      type: 'regex',
                      pattern: '^\\S.*$',
                    },
                    repeat: {
                      minNumberOfRepeatingToShow: 1,
                      repeatMin: 0,
                      repeatMax: 1,
                    },
                    childStyle: [],
                    gridColSpan: 12,
                    inputType: 'input',
                  },
                ],
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 0,
                  repeatMax: 1.7976931348623157e308,
                },
                childStyle: [],
                gridColSpan: 12,
                presentationSize: 'firstLarger',
                title: 'locationGroupText',
                titleHeadlineLevel: 'h3',
                alternativePresentation: {
                  presentationId: 'locationInputOutputPGroup',
                  type: 'group',
                  name: 'location',
                  mode: 'output',
                  tooltip: {
                    title: 'locationGroupText',
                    body: 'locationGroupDefText',
                  },
                  label: 'locationGroupText',
                  showLabel: false,
                  presentationStyle: 'inline',
                  components: [
                    {
                      presentationId: 'urlDivaWithouLabelOutputPVar',
                      name: 'url',
                      mode: 'output',
                      tooltip: {
                        title: 'urlDivaTextVarText',
                        body: 'urlDivaTextVarDefText',
                      },
                      label: 'urlDivaTextVarText',
                      showLabel: false,
                      type: 'textVariable',
                      validation: {
                        type: 'regex',
                        pattern:
                          '(https?:\\/\\/)?(www\\.)?[-a-zA-Z0-9@:;!%._\\+~#=(),]{2,256}\\.[a-z]{2,63}\\b([-a-zA-Z0-9@:;!%_\\+.~#?&//=(),]*)',
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
                  ],
                  repeat: {
                    minNumberOfRepeatingToShow: 1,
                    repeatMin: 0,
                    repeatMax: 1.7976931348623157e308,
                  },
                  childStyle: [],
                  gridColSpan: 12,
                  presentationSize: 'firstLarger',
                  title: 'locationGroupText',
                  titleHeadlineLevel: 'h3',
                },
              },
              {
                presentationId: 'noteBiographicalPVar',
                name: 'note',
                mode: 'input',
                tooltip: {
                  title: 'noteBiographicalTextVarText',
                  body: 'noteBiographicalTextVarDefText',
                },
                label: 'noteBiographicalTextVarText',
                showLabel: true,
                attributesToShow: 'selectable',
                type: 'textVariable',
                validation: {
                  type: 'regex',
                  pattern: '^\\S.*$',
                },
                attributes: [
                  {
                    type: 'collectionVariable',
                    name: 'type',
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
                        value: 'contentType',
                        label: 'contentTypeItemText',
                      },
                      {
                        value: 'restrictionOnAccess',
                        label: 'restrictionOnAccessItemText',
                      },
                      {
                        value: 'constituent',
                        label: 'constituentItemText',
                      },
                      {
                        value: 'internal',
                        label: 'internalItemText',
                      },
                      {
                        value: 'biographical',
                        label: 'biographicalItemText',
                      },
                    ],
                    finalValue: 'biographical',
                  },
                  {
                    type: 'collectionVariable',
                    name: 'lang',
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
                        value: 'swe',
                        label: 'sweLangItemText',
                      },
                      {
                        value: 'eng',
                        label: 'engLangItemText',
                      },
                    ],
                  },
                ],
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 0,
                  repeatMax: 1.7976931348623157e308,
                },
                childStyle: [],
                gridColSpan: 12,
                presentationSize: 'firstLarger',
                title: 'noteBiographicalTextVarText',
                titleHeadlineLevel: 'h3',
                inputType: 'textarea',
                alternativePresentation: {
                  presentationId: 'noteBiographicalWithouLabelOutputPVar',
                  name: 'note',
                  mode: 'output',
                  tooltip: {
                    title: 'noteBiographicalTextVarText',
                    body: 'noteBiographicalTextVarDefText',
                  },
                  label: 'noteBiographicalTextVarText',
                  showLabel: false,
                  attributesToShow: 'selectable',
                  type: 'textVariable',
                  validation: {
                    type: 'regex',
                    pattern: '^\\S.*$',
                  },
                  attributes: [
                    {
                      type: 'collectionVariable',
                      name: 'type',
                      placeholder: 'initialEmptyValueText',
                      mode: 'output',
                      tooltip: {
                        title: 'typeCollectionVarText',
                        body: 'typeCollectionVarDefText',
                      },
                      label: 'typeCollectionVarText',
                      showLabel: true,
                      options: [
                        {
                          value: 'contentType',
                          label: 'contentTypeItemText',
                        },
                        {
                          value: 'restrictionOnAccess',
                          label: 'restrictionOnAccessItemText',
                        },
                        {
                          value: 'constituent',
                          label: 'constituentItemText',
                        },
                        {
                          value: 'internal',
                          label: 'internalItemText',
                        },
                        {
                          value: 'biographical',
                          label: 'biographicalItemText',
                        },
                      ],
                      finalValue: 'biographical',
                    },
                    {
                      type: 'collectionVariable',
                      name: 'lang',
                      placeholder: 'initialEmptyValueText',
                      mode: 'output',
                      tooltip: {
                        title: 'languageCollectionVarText',
                        body: 'languageCollectionVarDefText',
                      },
                      label: 'languageCollectionVarText',
                      showLabel: true,
                      options: [
                        {
                          value: 'swe',
                          label: 'sweLangItemText',
                        },
                        {
                          value: 'eng',
                          label: 'engLangItemText',
                        },
                      ],
                    },
                  ],
                  repeat: {
                    minNumberOfRepeatingToShow: 1,
                    repeatMin: 0,
                    repeatMax: 1.7976931348623157e308,
                  },
                  childStyle: [],
                  gridColSpan: 12,
                  presentationSize: 'firstLarger',
                  title: 'noteBiographicalTextVarText',
                  titleHeadlineLevel: 'h3',
                  inputType: 'textarea',
                },
              },
            ],
            childStyle: [],
            gridColSpan: 12,
            presentationSize: 'singleInitiallyHidden',
            title: 'personInfoHeadlineText',
            titleHeadlineLevel: 'h2',
          },
          {
            presentationId: 'nameIdentifierSContainer',
            type: 'container',
            name: 'nameIdentifierSContainer',
            mode: 'input',
            containerType: 'surrounding',
            components: [
              {
                presentationId: 'nameIdentifierLocalIdPVar',
                name: 'nameIdentifier',
                mode: 'input',
                tooltip: {
                  title: 'nameIdentifierLocalIdTextVarText',
                  body: 'nameIdentifierLocalIdTextVarDefText',
                },
                label: 'nameIdentifierLocalIdTextVarText',
                showLabel: true,
                attributesToShow: 'selectable',
                type: 'textVariable',
                validation: {
                  type: 'regex',
                  pattern: '^\\S.*$',
                },
                attributes: [
                  {
                    type: 'collectionVariable',
                    name: 'type',
                    placeholder: 'initialEmptyValueText',
                    mode: 'input',
                    tooltip: {
                      title: 'identifierTypeCollectionVarText',
                      body: 'identifierTypeCollectionVarDefText',
                    },
                    label: 'identifierTypeCollectionVarText',
                    showLabel: true,
                    options: [
                      {
                        value: 'doi',
                        label: 'doiItemText',
                      },
                      {
                        value: 'isbn',
                        label: 'isbnItemText',
                      },
                      {
                        value: 'ismn',
                        label: 'ismnItemText',
                      },
                      {
                        value: 'isrn',
                        label: 'isrnItemText',
                      },
                      {
                        value: 'issn',
                        label: 'issnItemText',
                      },
                      {
                        value: 'wos',
                        label: 'wosItemText',
                      },
                      {
                        value: 'scopus',
                        label: 'scopusItemText',
                      },
                      {
                        value: 'pmid',
                        label: 'pmidItemText',
                      },
                      {
                        value: 'openAlex',
                        label: 'openAlexItemText',
                      },
                      {
                        value: 'localId',
                        label: 'localIdItemText',
                      },
                      {
                        value: 'patentNumber',
                        label: 'patentNumberItemText',
                      },
                      {
                        value: 'archiveNumber',
                        label: 'archiveNumberItemText',
                      },
                      {
                        value: 'raid',
                        label: 'raidItemText',
                      },
                      {
                        value: 'swecris',
                        label: 'swecrisItemText',
                      },
                      {
                        value: 'cordis',
                        label: 'cordisItemText',
                      },
                      {
                        value: 'se-libr',
                        label: 'seLibrItemText',
                      },
                      {
                        value: 'urn',
                        label: 'urnItemText',
                      },
                      {
                        value: 'oai',
                        label: 'oaiItemText',
                      },
                      {
                        value: 'uri',
                        label: 'uriItemText',
                      },
                      {
                        value: 'orcid',
                        label: 'orcidItemText',
                      },
                      {
                        value: 'ror',
                        label: 'rorItemText',
                      },
                      {
                        value: 'organisationCode',
                        label: 'organisationCodeItemText',
                      },
                      {
                        value: 'organisationNumber',
                        label: 'organisationNumberItemText',
                      },
                      {
                        value: 'viaf',
                        label: 'viafItemText',
                      },
                      {
                        value: 'project',
                        label: 'projectItemText',
                      },
                      {
                        value: 'reference',
                        label: 'referenceItemText',
                      },
                      {
                        value: 'registrationNumber',
                        label: 'registrationNumberItemText',
                      },
                    ],
                    finalValue: 'localId',
                  },
                ],
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 0,
                  repeatMax: 1.7976931348623157e308,
                },
                childStyle: [],
                gridColSpan: 12,
                inputType: 'input',
              },
              {
                presentationId: 'nameIdentifierOrcidPVar',
                name: 'nameIdentifier',
                mode: 'input',
                tooltip: {
                  title: 'nameIdentifierOrcidTextVarText',
                  body: 'nameIdentifierOrcidTextVarDefText',
                },
                label: 'nameIdentifierOrcidTextVarText',
                showLabel: true,
                attributesToShow: 'selectable',
                type: 'textVariable',
                validation: {
                  type: 'regex',
                  pattern: '^(\\d{4})-(\\d{4})-(\\d{4})-(\\d{3}[0-9X])$',
                },
                attributes: [
                  {
                    type: 'collectionVariable',
                    name: 'type',
                    placeholder: 'initialEmptyValueText',
                    mode: 'input',
                    tooltip: {
                      title: 'identifierTypeCollectionVarText',
                      body: 'identifierTypeCollectionVarDefText',
                    },
                    label: 'identifierTypeCollectionVarText',
                    showLabel: true,
                    options: [
                      {
                        value: 'doi',
                        label: 'doiItemText',
                      },
                      {
                        value: 'isbn',
                        label: 'isbnItemText',
                      },
                      {
                        value: 'ismn',
                        label: 'ismnItemText',
                      },
                      {
                        value: 'isrn',
                        label: 'isrnItemText',
                      },
                      {
                        value: 'issn',
                        label: 'issnItemText',
                      },
                      {
                        value: 'wos',
                        label: 'wosItemText',
                      },
                      {
                        value: 'scopus',
                        label: 'scopusItemText',
                      },
                      {
                        value: 'pmid',
                        label: 'pmidItemText',
                      },
                      {
                        value: 'openAlex',
                        label: 'openAlexItemText',
                      },
                      {
                        value: 'localId',
                        label: 'localIdItemText',
                      },
                      {
                        value: 'patentNumber',
                        label: 'patentNumberItemText',
                      },
                      {
                        value: 'archiveNumber',
                        label: 'archiveNumberItemText',
                      },
                      {
                        value: 'raid',
                        label: 'raidItemText',
                      },
                      {
                        value: 'swecris',
                        label: 'swecrisItemText',
                      },
                      {
                        value: 'cordis',
                        label: 'cordisItemText',
                      },
                      {
                        value: 'se-libr',
                        label: 'seLibrItemText',
                      },
                      {
                        value: 'urn',
                        label: 'urnItemText',
                      },
                      {
                        value: 'oai',
                        label: 'oaiItemText',
                      },
                      {
                        value: 'uri',
                        label: 'uriItemText',
                      },
                      {
                        value: 'orcid',
                        label: 'orcidItemText',
                      },
                      {
                        value: 'ror',
                        label: 'rorItemText',
                      },
                      {
                        value: 'organisationCode',
                        label: 'organisationCodeItemText',
                      },
                      {
                        value: 'organisationNumber',
                        label: 'organisationNumberItemText',
                      },
                      {
                        value: 'viaf',
                        label: 'viafItemText',
                      },
                      {
                        value: 'project',
                        label: 'projectItemText',
                      },
                      {
                        value: 'reference',
                        label: 'referenceItemText',
                      },
                      {
                        value: 'registrationNumber',
                        label: 'registrationNumberItemText',
                      },
                    ],
                    finalValue: 'orcid',
                  },
                ],
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 0,
                  repeatMax: 1.7976931348623157e308,
                },
                childStyle: [],
                gridColSpan: 12,
                inputType: 'input',
              },
              {
                presentationId: 'nameIdentifierSeLibrPVar',
                name: 'nameIdentifier',
                mode: 'input',
                tooltip: {
                  title: 'nameIdentifierSeLibrTextVarText',
                  body: 'nameIdentifierSeLibrTextVarDefText',
                },
                label: 'nameIdentifierSeLibrTextVarText',
                showLabel: true,
                attributesToShow: 'selectable',
                type: 'textVariable',
                validation: {
                  type: 'regex',
                  pattern: '^[0-9A-Za-z:-_\\s]{2,1000}',
                },
                attributes: [
                  {
                    type: 'collectionVariable',
                    name: 'type',
                    placeholder: 'initialEmptyValueText',
                    mode: 'input',
                    tooltip: {
                      title: 'identifierTypeCollectionVarText',
                      body: 'identifierTypeCollectionVarDefText',
                    },
                    label: 'identifierTypeCollectionVarText',
                    showLabel: true,
                    options: [
                      {
                        value: 'doi',
                        label: 'doiItemText',
                      },
                      {
                        value: 'isbn',
                        label: 'isbnItemText',
                      },
                      {
                        value: 'ismn',
                        label: 'ismnItemText',
                      },
                      {
                        value: 'isrn',
                        label: 'isrnItemText',
                      },
                      {
                        value: 'issn',
                        label: 'issnItemText',
                      },
                      {
                        value: 'wos',
                        label: 'wosItemText',
                      },
                      {
                        value: 'scopus',
                        label: 'scopusItemText',
                      },
                      {
                        value: 'pmid',
                        label: 'pmidItemText',
                      },
                      {
                        value: 'openAlex',
                        label: 'openAlexItemText',
                      },
                      {
                        value: 'localId',
                        label: 'localIdItemText',
                      },
                      {
                        value: 'patentNumber',
                        label: 'patentNumberItemText',
                      },
                      {
                        value: 'archiveNumber',
                        label: 'archiveNumberItemText',
                      },
                      {
                        value: 'raid',
                        label: 'raidItemText',
                      },
                      {
                        value: 'swecris',
                        label: 'swecrisItemText',
                      },
                      {
                        value: 'cordis',
                        label: 'cordisItemText',
                      },
                      {
                        value: 'se-libr',
                        label: 'seLibrItemText',
                      },
                      {
                        value: 'urn',
                        label: 'urnItemText',
                      },
                      {
                        value: 'oai',
                        label: 'oaiItemText',
                      },
                      {
                        value: 'uri',
                        label: 'uriItemText',
                      },
                      {
                        value: 'orcid',
                        label: 'orcidItemText',
                      },
                      {
                        value: 'ror',
                        label: 'rorItemText',
                      },
                      {
                        value: 'organisationCode',
                        label: 'organisationCodeItemText',
                      },
                      {
                        value: 'organisationNumber',
                        label: 'organisationNumberItemText',
                      },
                      {
                        value: 'viaf',
                        label: 'viafItemText',
                      },
                      {
                        value: 'project',
                        label: 'projectItemText',
                      },
                      {
                        value: 'reference',
                        label: 'referenceItemText',
                      },
                      {
                        value: 'registrationNumber',
                        label: 'registrationNumberItemText',
                      },
                    ],
                    finalValue: 'se-libr',
                  },
                ],
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 0,
                  repeatMax: 1.7976931348623157e308,
                },
                childStyle: [],
                gridColSpan: 12,
                inputType: 'input',
              },
              {
                presentationId: 'nameIdentifierOpenAlexPVar',
                name: 'nameIdentifier',
                mode: 'input',
                tooltip: {
                  title: 'nameIdentifierOpenAlexTextVarText',
                  body: 'nameIdentifierOpenAlexTextVarDefText',
                },
                label: 'nameIdentifierOpenAlexTextVarText',
                showLabel: true,
                attributesToShow: 'selectable',
                type: 'textVariable',
                validation: {
                  type: 'regex',
                  pattern: '^\\S.*$',
                },
                attributes: [
                  {
                    type: 'collectionVariable',
                    name: 'type',
                    placeholder: 'initialEmptyValueText',
                    mode: 'input',
                    tooltip: {
                      title: 'identifierTypeCollectionVarText',
                      body: 'identifierTypeCollectionVarDefText',
                    },
                    label: 'identifierTypeCollectionVarText',
                    showLabel: true,
                    options: [
                      {
                        value: 'doi',
                        label: 'doiItemText',
                      },
                      {
                        value: 'isbn',
                        label: 'isbnItemText',
                      },
                      {
                        value: 'ismn',
                        label: 'ismnItemText',
                      },
                      {
                        value: 'isrn',
                        label: 'isrnItemText',
                      },
                      {
                        value: 'issn',
                        label: 'issnItemText',
                      },
                      {
                        value: 'wos',
                        label: 'wosItemText',
                      },
                      {
                        value: 'scopus',
                        label: 'scopusItemText',
                      },
                      {
                        value: 'pmid',
                        label: 'pmidItemText',
                      },
                      {
                        value: 'openAlex',
                        label: 'openAlexItemText',
                      },
                      {
                        value: 'localId',
                        label: 'localIdItemText',
                      },
                      {
                        value: 'patentNumber',
                        label: 'patentNumberItemText',
                      },
                      {
                        value: 'archiveNumber',
                        label: 'archiveNumberItemText',
                      },
                      {
                        value: 'raid',
                        label: 'raidItemText',
                      },
                      {
                        value: 'swecris',
                        label: 'swecrisItemText',
                      },
                      {
                        value: 'cordis',
                        label: 'cordisItemText',
                      },
                      {
                        value: 'se-libr',
                        label: 'seLibrItemText',
                      },
                      {
                        value: 'urn',
                        label: 'urnItemText',
                      },
                      {
                        value: 'oai',
                        label: 'oaiItemText',
                      },
                      {
                        value: 'uri',
                        label: 'uriItemText',
                      },
                      {
                        value: 'orcid',
                        label: 'orcidItemText',
                      },
                      {
                        value: 'ror',
                        label: 'rorItemText',
                      },
                      {
                        value: 'organisationCode',
                        label: 'organisationCodeItemText',
                      },
                      {
                        value: 'organisationNumber',
                        label: 'organisationNumberItemText',
                      },
                      {
                        value: 'viaf',
                        label: 'viafItemText',
                      },
                      {
                        value: 'project',
                        label: 'projectItemText',
                      },
                      {
                        value: 'reference',
                        label: 'referenceItemText',
                      },
                      {
                        value: 'registrationNumber',
                        label: 'registrationNumberItemText',
                      },
                    ],
                    finalValue: 'openAlex',
                  },
                ],
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 0,
                  repeatMax: 1.7976931348623157e308,
                },
                childStyle: [],
                gridColSpan: 12,
                inputType: 'input',
              },
              {
                presentationId: 'nameIdentifierScopusPVar',
                name: 'nameIdentifier',
                mode: 'input',
                tooltip: {
                  title: 'nameIdentifierScopusTextVarText',
                  body: 'nameIdentifierScopusTextVarDefText',
                },
                label: 'nameIdentifierScopusTextVarText',
                showLabel: true,
                attributesToShow: 'selectable',
                type: 'textVariable',
                validation: {
                  type: 'regex',
                  pattern: '^(\\d+)$',
                },
                attributes: [
                  {
                    type: 'collectionVariable',
                    name: 'type',
                    placeholder: 'initialEmptyValueText',
                    mode: 'input',
                    tooltip: {
                      title: 'identifierTypeCollectionVarText',
                      body: 'identifierTypeCollectionVarDefText',
                    },
                    label: 'identifierTypeCollectionVarText',
                    showLabel: true,
                    options: [
                      {
                        value: 'doi',
                        label: 'doiItemText',
                      },
                      {
                        value: 'isbn',
                        label: 'isbnItemText',
                      },
                      {
                        value: 'ismn',
                        label: 'ismnItemText',
                      },
                      {
                        value: 'isrn',
                        label: 'isrnItemText',
                      },
                      {
                        value: 'issn',
                        label: 'issnItemText',
                      },
                      {
                        value: 'wos',
                        label: 'wosItemText',
                      },
                      {
                        value: 'scopus',
                        label: 'scopusItemText',
                      },
                      {
                        value: 'pmid',
                        label: 'pmidItemText',
                      },
                      {
                        value: 'openAlex',
                        label: 'openAlexItemText',
                      },
                      {
                        value: 'localId',
                        label: 'localIdItemText',
                      },
                      {
                        value: 'patentNumber',
                        label: 'patentNumberItemText',
                      },
                      {
                        value: 'archiveNumber',
                        label: 'archiveNumberItemText',
                      },
                      {
                        value: 'raid',
                        label: 'raidItemText',
                      },
                      {
                        value: 'swecris',
                        label: 'swecrisItemText',
                      },
                      {
                        value: 'cordis',
                        label: 'cordisItemText',
                      },
                      {
                        value: 'se-libr',
                        label: 'seLibrItemText',
                      },
                      {
                        value: 'urn',
                        label: 'urnItemText',
                      },
                      {
                        value: 'oai',
                        label: 'oaiItemText',
                      },
                      {
                        value: 'uri',
                        label: 'uriItemText',
                      },
                      {
                        value: 'orcid',
                        label: 'orcidItemText',
                      },
                      {
                        value: 'ror',
                        label: 'rorItemText',
                      },
                      {
                        value: 'organisationCode',
                        label: 'organisationCodeItemText',
                      },
                      {
                        value: 'organisationNumber',
                        label: 'organisationNumberItemText',
                      },
                      {
                        value: 'viaf',
                        label: 'viafItemText',
                      },
                      {
                        value: 'project',
                        label: 'projectItemText',
                      },
                      {
                        value: 'reference',
                        label: 'referenceItemText',
                      },
                      {
                        value: 'registrationNumber',
                        label: 'registrationNumberItemText',
                      },
                    ],
                    finalValue: 'scopus',
                  },
                ],
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 0,
                  repeatMax: 1.7976931348623157e308,
                },
                childStyle: [],
                gridColSpan: 12,
                inputType: 'input',
              },
              {
                presentationId: 'nameIdentifierViafPVar',
                name: 'nameIdentifier',
                mode: 'input',
                tooltip: {
                  title: 'nameIdentifierViafTextVarText',
                  body: 'nameIdentifierViafTextVarDefText',
                },
                label: 'nameIdentifierViafTextVarText',
                showLabel: true,
                attributesToShow: 'selectable',
                type: 'textVariable',
                validation: {
                  type: 'regex',
                  pattern: '^(\\d+)$',
                },
                attributes: [
                  {
                    type: 'collectionVariable',
                    name: 'type',
                    placeholder: 'initialEmptyValueText',
                    mode: 'input',
                    tooltip: {
                      title: 'identifierTypeCollectionVarText',
                      body: 'identifierTypeCollectionVarDefText',
                    },
                    label: 'identifierTypeCollectionVarText',
                    showLabel: true,
                    options: [
                      {
                        value: 'doi',
                        label: 'doiItemText',
                      },
                      {
                        value: 'isbn',
                        label: 'isbnItemText',
                      },
                      {
                        value: 'ismn',
                        label: 'ismnItemText',
                      },
                      {
                        value: 'isrn',
                        label: 'isrnItemText',
                      },
                      {
                        value: 'issn',
                        label: 'issnItemText',
                      },
                      {
                        value: 'wos',
                        label: 'wosItemText',
                      },
                      {
                        value: 'scopus',
                        label: 'scopusItemText',
                      },
                      {
                        value: 'pmid',
                        label: 'pmidItemText',
                      },
                      {
                        value: 'openAlex',
                        label: 'openAlexItemText',
                      },
                      {
                        value: 'localId',
                        label: 'localIdItemText',
                      },
                      {
                        value: 'patentNumber',
                        label: 'patentNumberItemText',
                      },
                      {
                        value: 'archiveNumber',
                        label: 'archiveNumberItemText',
                      },
                      {
                        value: 'raid',
                        label: 'raidItemText',
                      },
                      {
                        value: 'swecris',
                        label: 'swecrisItemText',
                      },
                      {
                        value: 'cordis',
                        label: 'cordisItemText',
                      },
                      {
                        value: 'se-libr',
                        label: 'seLibrItemText',
                      },
                      {
                        value: 'urn',
                        label: 'urnItemText',
                      },
                      {
                        value: 'oai',
                        label: 'oaiItemText',
                      },
                      {
                        value: 'uri',
                        label: 'uriItemText',
                      },
                      {
                        value: 'orcid',
                        label: 'orcidItemText',
                      },
                      {
                        value: 'ror',
                        label: 'rorItemText',
                      },
                      {
                        value: 'organisationCode',
                        label: 'organisationCodeItemText',
                      },
                      {
                        value: 'organisationNumber',
                        label: 'organisationNumberItemText',
                      },
                      {
                        value: 'viaf',
                        label: 'viafItemText',
                      },
                      {
                        value: 'project',
                        label: 'projectItemText',
                      },
                      {
                        value: 'reference',
                        label: 'referenceItemText',
                      },
                      {
                        value: 'registrationNumber',
                        label: 'registrationNumberItemText',
                      },
                    ],
                    finalValue: 'viaf',
                  },
                ],
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 0,
                  repeatMax: 1.7976931348623157e308,
                },
                childStyle: [],
                gridColSpan: 12,
                inputType: 'input',
              },
            ],
            childStyle: [],
            gridColSpan: 12,
            presentationSize: 'singleInitiallyHidden',
            title: 'identifierHeadlineText',
          },
          {
            presentationId: 'affiliationSContainer',
            type: 'container',
            name: 'affiliationSContainer',
            mode: 'input',
            containerType: 'surrounding',
            components: [
              {
                presentationId: 'affiliationPGroup',
                type: 'group',
                name: 'affiliation',
                mode: 'input',
                tooltip: {
                  title: 'affiliationGroupText',
                  body: 'affiliationGroupDefText',
                },
                label: 'affiliationGroupText',
                showLabel: false,
                components: [
                  {
                    name: 'affiliationHelpText',
                    type: 'text',
                    textStyle: 'italicTextStyle',
                    childStyle: [],
                    gridColSpan: 12,
                  },
                  {
                    presentationId: 'organisationPLink',
                    name: 'organisation',
                    mode: 'input',
                    tooltip: {
                      title: 'organisationLinkText',
                      body: 'organisationLinkDefText',
                    },
                    label: 'organisationLinkText',
                    showLabel: true,
                    type: 'recordLink',
                    recordLinkType: 'diva-organisation',
                    searchPresentation: {
                      searchType: 'diva-organisationMinimalSearch',
                      autocompleteSearchTerm: {
                        name: 'organisationSearch.include.includePart.nameSearchTerm[0].value',
                      },
                      permissionUnitSearchTerm: {
                        name: 'organisationSearch.include.includePart.permissionUnitSearchTerm[0].value',
                      },
                    },
                    linkedRecordPresentation: {
                      presentedRecordType: 'diva-organisation',
                      presentationId: 'organisationLinkedOutputPGroup',
                    },
                    presentationRecordLinkId: 'organisationPLink',
                    repeat: {
                      minNumberOfRepeatingToShow: 1,
                      repeatMin: 0,
                      repeatMax: 1,
                    },
                    childStyle: [],
                    gridColSpan: 12,
                    presentationSize: 'singleInitiallyHidden',
                    title: 'affiliationDivaHeadlineText',
                    titleHeadlineLevel: 'h4',
                  },
                  {
                    presentationId: 'affiliationExternalSContainer',
                    type: 'container',
                    name: 'affiliationExternalSContainer',
                    mode: 'input',
                    containerType: 'surrounding',
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
                          pattern: '^\\S.*$',
                        },
                        repeat: {
                          minNumberOfRepeatingToShow: 1,
                          repeatMin: 0,
                          repeatMax: 1,
                        },
                        childStyle: [],
                        gridColSpan: 12,
                        inputType: 'input',
                      },
                      {
                        presentationId: 'identifierRorPVar',
                        name: 'identifier',
                        mode: 'input',
                        tooltip: {
                          title: 'identifierRorTextVarText',
                          body: 'identifierRorTextVarDefText',
                        },
                        label: 'identifierRorTextVarText',
                        showLabel: true,
                        attributesToShow: 'selectable',
                        type: 'textVariable',
                        validation: {
                          type: 'regex',
                          pattern: '^(0[a-z|0-9]{6}[0-9]{2})$',
                        },
                        attributes: [
                          {
                            type: 'collectionVariable',
                            name: 'type',
                            placeholder: 'initialEmptyValueText',
                            mode: 'input',
                            tooltip: {
                              title: 'identifierTypeCollectionVarText',
                              body: 'identifierTypeCollectionVarDefText',
                            },
                            label: 'identifierTypeCollectionVarText',
                            showLabel: true,
                            options: [
                              {
                                value: 'doi',
                                label: 'doiItemText',
                              },
                              {
                                value: 'isbn',
                                label: 'isbnItemText',
                              },
                              {
                                value: 'ismn',
                                label: 'ismnItemText',
                              },
                              {
                                value: 'isrn',
                                label: 'isrnItemText',
                              },
                              {
                                value: 'issn',
                                label: 'issnItemText',
                              },
                              {
                                value: 'wos',
                                label: 'wosItemText',
                              },
                              {
                                value: 'scopus',
                                label: 'scopusItemText',
                              },
                              {
                                value: 'pmid',
                                label: 'pmidItemText',
                              },
                              {
                                value: 'openAlex',
                                label: 'openAlexItemText',
                              },
                              {
                                value: 'localId',
                                label: 'localIdItemText',
                              },
                              {
                                value: 'patentNumber',
                                label: 'patentNumberItemText',
                              },
                              {
                                value: 'archiveNumber',
                                label: 'archiveNumberItemText',
                              },
                              {
                                value: 'raid',
                                label: 'raidItemText',
                              },
                              {
                                value: 'swecris',
                                label: 'swecrisItemText',
                              },
                              {
                                value: 'cordis',
                                label: 'cordisItemText',
                              },
                              {
                                value: 'se-libr',
                                label: 'seLibrItemText',
                              },
                              {
                                value: 'urn',
                                label: 'urnItemText',
                              },
                              {
                                value: 'oai',
                                label: 'oaiItemText',
                              },
                              {
                                value: 'uri',
                                label: 'uriItemText',
                              },
                              {
                                value: 'orcid',
                                label: 'orcidItemText',
                              },
                              {
                                value: 'ror',
                                label: 'rorItemText',
                              },
                              {
                                value: 'organisationCode',
                                label: 'organisationCodeItemText',
                              },
                              {
                                value: 'organisationNumber',
                                label: 'organisationNumberItemText',
                              },
                              {
                                value: 'viaf',
                                label: 'viafItemText',
                              },
                              {
                                value: 'project',
                                label: 'projectItemText',
                              },
                              {
                                value: 'reference',
                                label: 'referenceItemText',
                              },
                              {
                                value: 'registrationNumber',
                                label: 'registrationNumberItemText',
                              },
                            ],
                            finalValue: 'ror',
                          },
                        ],
                        repeat: {
                          minNumberOfRepeatingToShow: 1,
                          repeatMin: 0,
                          repeatMax: 1,
                        },
                        childStyle: [],
                        gridColSpan: 12,
                        inputType: 'input',
                      },
                      {
                        presentationId: 'countryPCollVar',
                        options: [
                          {
                            value: 'aa',
                            label: 'aaCountryItemText',
                          },
                          {
                            value: 'ae',
                            label: 'aeCountryItemText',
                          },
                          {
                            value: 'af',
                            label: 'afCountryItemText',
                          },
                          {
                            value: 'ag',
                            label: 'agCountryItemText',
                          },
                          {
                            value: 'ai',
                            label: 'aiCountryItemText',
                          },
                        ],
                        name: 'country',
                        placeholder: 'initialEmptyValueText',
                        mode: 'input',
                        tooltip: {
                          title: 'countryCollectionVarText',
                          body: 'countryCollectionVarDefText',
                        },
                        label: 'countryCollectionVarText',
                        showLabel: true,
                        type: 'collectionVariable',
                        repeat: {
                          minNumberOfRepeatingToShow: 1,
                          repeatMin: 0,
                          repeatMax: 1,
                        },
                        childStyle: [],
                        gridColSpan: 12,
                      },
                      {
                        presentationId: 'descriptionPCollVar',
                        options: [
                          {
                            value: 'researchGroup',
                            label: 'researchGroupItemText',
                          },
                        ],
                        name: 'description',
                        placeholder: 'initialEmptyValueText',
                        mode: 'input',
                        tooltip: {
                          title: 'descriptionCollectionVarText',
                          body: 'descriptionCollectionVarDefText',
                        },
                        label: 'descriptionCollectionVarText',
                        showLabel: true,
                        type: 'collectionVariable',
                        repeat: {
                          minNumberOfRepeatingToShow: 1,
                          repeatMin: 0,
                          repeatMax: 1,
                        },
                        childStyle: [],
                        gridColSpan: 12,
                      },
                    ],
                    childStyle: [],
                    gridColSpan: 12,
                    presentationSize: 'singleInitiallyHidden',
                    title: 'affiliationExternalHeadlineText',
                    titleHeadlineLevel: 'h4',
                  },
                  {
                    presentationId: 'affiliationStartEndDateSContainer',
                    type: 'container',
                    name: 'affiliationStartEndDateSContainer',
                    mode: 'input',
                    containerType: 'surrounding',
                    components: [
                      {
                        presentationId: 'affiliationStartDatePGroup',
                        type: 'group',
                        name: 'startDate',
                        mode: 'input',
                        tooltip: {
                          title: 'startDateGroupText',
                          body: 'startDateGroupDefText',
                        },
                        label: 'startDateGroupText',
                        headlineLevel: 'h5',
                        showLabel: true,
                        components: [
                          {
                            presentationId: 'yearPVar',
                            name: 'year',
                            mode: 'input',
                            tooltip: {
                              title: 'yearTextVarText',
                              body: 'yearTextVarDefText',
                            },
                            label: 'yearTextVarText',
                            showLabel: true,
                            type: 'textVariable',
                            validation: {
                              type: 'regex',
                              pattern: '(^[0-9]{4,4}$)',
                            },
                            repeat: {
                              minNumberOfRepeatingToShow: 1,
                              repeatMin: 1,
                              repeatMax: 1,
                            },
                            childStyle: ['fourChildStyle'],
                            gridColSpan: 4,
                            inputType: 'input',
                          },
                          {
                            presentationId: 'monthPVar',
                            name: 'month',
                            mode: 'input',
                            tooltip: {
                              title: 'monthTextVarText',
                              body: 'monthTextVarDefText',
                            },
                            label: 'monthTextVarText',
                            showLabel: true,
                            type: 'textVariable',
                            validation: {
                              type: 'regex',
                              pattern: '(^(0[1-9]|1[012])$)',
                            },
                            repeat: {
                              minNumberOfRepeatingToShow: 1,
                              repeatMin: 0,
                              repeatMax: 1,
                            },
                            childStyle: ['fourChildStyle'],
                            gridColSpan: 4,
                            inputType: 'input',
                          },
                          {
                            presentationId: 'dayPVar',
                            name: 'day',
                            mode: 'input',
                            tooltip: {
                              title: 'dayTextVarText',
                              body: 'dayTextVarDefText',
                            },
                            label: 'dayTextVarText',
                            showLabel: true,
                            type: 'textVariable',
                            validation: {
                              type: 'regex',
                              pattern: '^(0[1-9]|[1|2]\\d|3[01])$',
                            },
                            repeat: {
                              minNumberOfRepeatingToShow: 1,
                              repeatMin: 0,
                              repeatMax: 1,
                            },
                            childStyle: ['fourChildStyle'],
                            gridColSpan: 4,
                            inputType: 'input',
                          },
                        ],
                        repeat: {
                          minNumberOfRepeatingToShow: 1,
                          repeatMin: 0,
                          repeatMax: 1,
                        },
                        childStyle: [],
                        gridColSpan: 12,
                      },
                      {
                        presentationId: 'affiliationEndDatePGroup',
                        type: 'group',
                        name: 'endDate',
                        mode: 'input',
                        tooltip: {
                          title: 'endDateGroupText',
                          body: 'endDateGroupDefText',
                        },
                        label: 'endDateGroupText',
                        headlineLevel: 'h5',
                        showLabel: true,
                        components: [
                          {
                            presentationId: 'yearPVar',
                            name: 'year',
                            mode: 'input',
                            tooltip: {
                              title: 'yearTextVarText',
                              body: 'yearTextVarDefText',
                            },
                            label: 'yearTextVarText',
                            showLabel: true,
                            type: 'textVariable',
                            validation: {
                              type: 'regex',
                              pattern: '(^[0-9]{4,4}$)',
                            },
                            repeat: {
                              minNumberOfRepeatingToShow: 1,
                              repeatMin: 1,
                              repeatMax: 1,
                            },
                            childStyle: ['fourChildStyle'],
                            gridColSpan: 4,
                            inputType: 'input',
                          },
                          {
                            presentationId: 'monthPVar',
                            name: 'month',
                            mode: 'input',
                            tooltip: {
                              title: 'monthTextVarText',
                              body: 'monthTextVarDefText',
                            },
                            label: 'monthTextVarText',
                            showLabel: true,
                            type: 'textVariable',
                            validation: {
                              type: 'regex',
                              pattern: '(^(0[1-9]|1[012])$)',
                            },
                            repeat: {
                              minNumberOfRepeatingToShow: 1,
                              repeatMin: 0,
                              repeatMax: 1,
                            },
                            childStyle: ['fourChildStyle'],
                            gridColSpan: 4,
                            inputType: 'input',
                          },
                          {
                            presentationId: 'dayPVar',
                            name: 'day',
                            mode: 'input',
                            tooltip: {
                              title: 'dayTextVarText',
                              body: 'dayTextVarDefText',
                            },
                            label: 'dayTextVarText',
                            showLabel: true,
                            type: 'textVariable',
                            validation: {
                              type: 'regex',
                              pattern: '^(0[1-9]|[1|2]\\d|3[01])$',
                            },
                            repeat: {
                              minNumberOfRepeatingToShow: 1,
                              repeatMin: 0,
                              repeatMax: 1,
                            },
                            childStyle: ['fourChildStyle'],
                            gridColSpan: 4,
                            inputType: 'input',
                          },
                        ],
                        repeat: {
                          minNumberOfRepeatingToShow: 0,
                          repeatMin: 0,
                          repeatMax: 1,
                        },
                        childStyle: [],
                        gridColSpan: 12,
                      },
                    ],
                    childStyle: [],
                    gridColSpan: 12,
                    presentationSize: 'singleInitiallyHidden',
                    title: 'startEndDateHeadlineText',
                    titleHeadlineLevel: 'h4',
                  },
                ],
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 0,
                  repeatMax: 1.7976931348623157e308,
                },
                childStyle: [],
                gridColSpan: 12,
                presentationSize: 'firstLarger',
                title: 'affiliationGroupText',
                titleHeadlineLevel: 'h3',
                alternativePresentation: {
                  presentationId: 'affiliationInputOutputPGroup',
                  type: 'group',
                  name: 'affiliation',
                  mode: 'output',
                  tooltip: {
                    title: 'affiliationGroupText',
                    body: 'affiliationGroupDefText',
                  },
                  label: 'affiliationGroupText',
                  showLabel: false,
                  attributesToShow: 'selectable',
                  presentationStyle: 'inline',
                  components: [
                    {
                      presentationId: 'organisationOutputPLink',
                      name: 'organisation',
                      mode: 'output',
                      tooltip: {
                        title: 'organisationLinkText',
                        body: 'organisationLinkDefText',
                      },
                      label: 'organisationLinkText',
                      showLabel: false,
                      type: 'recordLink',
                      recordLinkType: 'diva-organisation',
                      linkedRecordPresentation: {
                        presentedRecordType: 'diva-organisation',
                        presentationId: 'organisationLinkedOutputPGroup',
                      },
                      presentationRecordLinkId: 'organisationOutputPLink',
                      repeat: {
                        minNumberOfRepeatingToShow: 1,
                        repeatMin: 0,
                        repeatMax: 1,
                      },
                      childStyle: [],
                      gridColSpan: 12,
                    },
                    {
                      presentationId: 'namePartOutputPVar',
                      name: 'namePart',
                      mode: 'output',
                      tooltip: {
                        title: 'namePartTextVarText',
                        body: 'namePartTextVarDefText',
                      },
                      label: 'namePartTextVarText',
                      showLabel: true,
                      type: 'textVariable',
                      validation: {
                        type: 'regex',
                        pattern: '^\\S.*$',
                      },
                      repeat: {
                        minNumberOfRepeatingToShow: 1,
                        repeatMin: 0,
                        repeatMax: 1,
                      },
                      childStyle: [],
                      gridColSpan: 12,
                      inputType: 'input',
                    },
                    {
                      presentationId: 'descriptionOutputPCollVar',
                      options: [
                        {
                          value: 'researchGroup',
                          label: 'researchGroupItemText',
                        },
                      ],
                      name: 'description',
                      placeholder: 'initialEmptyValueText',
                      mode: 'output',
                      tooltip: {
                        title: 'descriptionCollectionVarText',
                        body: 'descriptionCollectionVarDefText',
                      },
                      label: 'descriptionCollectionVarText',
                      showLabel: true,
                      type: 'collectionVariable',
                      repeat: {
                        minNumberOfRepeatingToShow: 1,
                        repeatMin: 0,
                        repeatMax: 1,
                      },
                      childStyle: [],
                      gridColSpan: 12,
                    },
                  ],
                  repeat: {
                    minNumberOfRepeatingToShow: 1,
                    repeatMin: 0,
                    repeatMax: 1.7976931348623157e308,
                  },
                  childStyle: [],
                  gridColSpan: 12,
                  presentationSize: 'firstLarger',
                  title: 'affiliationGroupText',
                  titleHeadlineLevel: 'h3',
                },
              },
            ],
            childStyle: [],
            gridColSpan: 12,
            presentationSize: 'singleInitiallyHidden',
            title: 'affiliationHeadlineText',
            titleHeadlineLevel: 'h2',
          },
        ],
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        gridColSpan: 12,
      },
    };
    const data: CoraData = {
      name: 'person',
      attributes: undefined,
      children: [
        {
          name: 'recordInfo',
          attributes: undefined,
          children: [
            {
              name: 'validationType',
              attributes: undefined,
              children: [
                {
                  name: 'linkedRecordType',
                  attributes: undefined,
                  value: 'validationType',
                  repeatId: undefined,
                },
                {
                  name: 'linkedRecordId',
                  attributes: undefined,
                  value: 'diva-person',
                  repeatId: undefined,
                },
              ],
              repeatId: undefined,
            },
            {
              name: 'dataDivider',
              attributes: undefined,
              children: [
                {
                  name: 'linkedRecordType',
                  attributes: undefined,
                  value: 'system',
                  repeatId: undefined,
                },
                {
                  name: 'linkedRecordId',
                  attributes: undefined,
                  value: 'divaData',
                  repeatId: undefined,
                },
              ],
              repeatId: undefined,
            },
          ],
          repeatId: undefined,
        },
      ],
      repeatId: undefined,
    };

    const { valid, errors } = validateFormData(formSchema, data);

    expect(valid).toBe(false);
    expect(errors).toStrictEqual({
      'person[0].authority[0].name[0].namePart[1]': {
        message: 'divaClient_fieldRequiredText',
        label: 'namePartFamilyTextVarText',
      },
    });
  });
});
