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
import { cleanFormData } from '@/utils/cleanFormData';
import { describe, expect, it } from 'vitest';
import * as yup from 'yup';
import type { FormComponentGroup, FormSchema } from '../../types';
import {
  createYupArrayFromSchema,
  generateYupSchemaFromFormSchema,
} from '../yupSchema';

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
      it('is valid for one numberVar 0-1 with no value', async () => {
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

      it('is valid for one numberVar 0-1 with value', async () => {
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
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithOneNumberVariable1_X,
        );

        const data = {
          someRootNameInData: {
            someNumberVariableNameInData: [
              {
                value: '',
              },
            ],
          },
        };

        await expect(yupSchema.validate(data)).rejects.toThrow(
          'divaClient_fieldInvalidFormatText',
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

      it('is valid for one recordLink 1-1 with value', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithOneRecordLinkBeingRequired1_1,
        );

        await expect(
          yupSchema.isValid({
            root: {
              link: {
                value: 'someLink',
              },
            },
          }),
        ).resolves.toBe(true);
      });

      it('is invalid for one recordLink 1-1 without value', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithOneRecordLinkBeingRequired1_1,
        );

        const data = {
          root: {
            link: {
              value: '',
            },
          },
        };

        await expect(yupSchema.validate(data)).rejects.toThrow(
          'divaClient_fieldRequiredText',
        );
      });

      it('is valid for one recordLink 1-X with value', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithOneRecordLinkBeingRequired1_X,
        );

        await expect(
          yupSchema.isValid({
            root: {
              link: [
                {
                  value: 'someLink',
                },
              ],
            },
          }),
        ).resolves.toBe(true);
      });

      it('is invalid for one recordLink 1-X without value', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithOneRecordLinkBeingRequired1_X,
        );

        const data = {
          root: {
            link: [
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

      it('is valid for one recordLink 1-1 for a binary with value', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithRecordLinkTypeBinary,
        );

        await expect(
          yupSchema.isValid({
            someRootNameInData: {
              attachmentFile: {
                value: 'someValue.pdf',
              },
            },
          }),
        ).resolves.toBe(true);
      });

      it('is invalid for one recordLink 1-1 for a binary without value', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefWithRecordLinkTypeBinary,
        );

        const data = {
          someRootNameInData: {
            attachmentFile: {
              value: '',
            },
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

      it('is valid for one collectionVar 1-X with value', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefRequiredRepeatingCollectionVar1_X,
        );

        await expect(
          yupSchema.isValid({
            root: {
              languageTerm: [
                {
                  value: 'eng',
                },
              ],
            },
          }),
        ).resolves.toBe(true);
      });

      it('is invalid for one collectionVar 1-X without value', async () => {
        const yupSchema = generateYupSchemaFromFormSchema(
          formDefRequiredRepeatingCollectionVar1_X,
        );

        const data = {
          root: {
            languageTerm: [
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
    it('is valid for one group 0-1 and one textVar 1-1', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithOptionalGroupWithRequiredTextVar,
      );

      const data = {
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

      const data = {
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

      const data = {
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

      const data = {
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

      const data = {
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

      const data = {
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

      const data = {
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

      const data = {
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

      const data = {
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

      const data = {
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

    it('is valid for one group 1-1 attribute and with one textVar 1-1', async () => {
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

    it('is valid for one group 1-1 and nested group 1-1 with attribute with one textVar 1-1 with value', async () => {
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

    it('is invalid for one group 1-1 and nested group 1-1 with attribute with one textVar 1-1 without value', async () => {
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

      await expect(yupSchema.validate(data)).rejects.toThrow(
        'divaClient_fieldRequiredText',
      );
    });

    it('is valid for one group 0-1 with attribute with one textVariable 1-1 with attribute and with value', async () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithOneOptionalGroupWithAttributeCollectionAndTextVarWithAttribute,
      );

      const data = {
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

      const data = {
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

      const data = {
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

    const data = {
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
});
