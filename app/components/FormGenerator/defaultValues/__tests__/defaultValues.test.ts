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
import {
  addAttributesToName,
  createDefaultValueFromFinalValue,
  createDefaultValuesFromComponent,
  createDefaultValuesFromComponents,
  createDefaultValuesFromFormSchema,
  generateRepeatingObject,
  getChildNameInDataArray,
  getChildrenWithSameNameInData,
  getMinNumberOfRepeatingToShow,
  hasCurrentComponentSameNameInData,
  mergeArrays,
  mergeObjects,
  removeRootObject,
} from '../defaultValues';
import {
  formComponentGroup,
  formComponentGroupAndTextVariableWithinGroup,
  formComponentGroupWithChildren,
  formComponentGroupWithinGroupWithAttributes,
  formComponentRepeatingTextVariable,
  formComponentTitleInfoGroup,
  formDefRealDemo,
  formDefRealDemoWithAttributes,
  formDefRealDemoWithAttributesButWithoutFinalValue,
  formDefRealDemoWithFinalValues,
  formDefRealDemoWithRepeatingGroups,
  formDefRealDemoWithRepeatingVars,
  formDefWithARepeatingContainer,
  formDefWithOneGroupHavingTextVariableAsChild,
  formDefWithOneRepeatingTextVariable,
  formDefWithSurroundingContainerAroundTextVariable,
  formDefWithTextVar,
} from '@/__mocks__/data/form/formDef';
import type { FormComponent, FormSchema } from '../../types';
import { cleanFormData } from '@/utils/cleanFormData';
import { alternativePresentationWithMinNumberRepeatingToShow } from '@/__mocks__/data/form/alternativePresentation';

describe('FormGenerator Utils', () => {
  describe('generate defaultValues', () => {
    describe('createDefaultValuesFromFormSchema', () => {
      it('createDefaultValuesFromFormSchema should take a formDef and make default values object', () => {
        const expectedDefaultValues = {
          someRootNameInData: {
            someNameInData: {
              value: '',
            },
            someNumberVariableNameInData: {
              value: '',
            },
          },
        };
        const actualDefaultValues = createDefaultValuesFromFormSchema(
          formDefWithTextVar as FormSchema,
        );
        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });

      it('should take a formDef with a surrounding container and make default values object with that object level left out', () => {
        const expectedDefaultValues = {
          someRootNameInData: {
            someNameInData: {
              value: '',
            },
          },
        };
        const actualDefaultValues = createDefaultValuesFromFormSchema(
          formDefWithSurroundingContainerAroundTextVariable as FormSchema,
        );
        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });

      it('should take a formDef with a repeating container and make default values object with that object level left out', () => {
        const expectedDefaultValues = {
          someRootNameInData: {
            someNameInData: [
              {
                value: '',
              },
              {
                value: '',
              },
            ],
          },
        };
        const actualDefaultValues = createDefaultValuesFromFormSchema(
          formDefWithARepeatingContainer as FormSchema,
        );
        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });

      // group
      it('should take a more complex formDef with groups and make default values object', () => {
        const expectedDefaultValues = {
          someRootNameInData: {
            bookTitle: {
              value: '',
            },
            keeptHis: [
              {
                value: '',
              },
            ],
            firstChildGroup: {
              exampleNumberVar: {
                value: '',
              },
              exampleTextVar: {
                value: '',
              },
            },
            recordInfo: {},
          },
        };
        const actualDefaultValues = createDefaultValuesFromFormSchema(
          formDefRealDemo as FormSchema,
        );
        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });

      it('should take a more complex formDef with repeating groups and make default values object', () => {
        const expectedDefaultValues = {
          someRootNameInData: {
            bookTitle: {
              value: '',
            },
            keeptHis: [
              {
                value: '',
              },
            ],
            firstChildGroup: [
              {
                exampleNumberVar: {
                  value: '',
                },
                exampleTextVar: {
                  value: '',
                },
              },
              {
                exampleNumberVar: {
                  value: '',
                },
                exampleTextVar: {
                  value: '',
                },
              },
            ],
            recordInfo: {},
          },
        };
        const actualDefaultValues = createDefaultValuesFromFormSchema(
          formDefRealDemoWithRepeatingGroups as FormSchema,
        );
        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });

      it('createDefaultValuesFromFormSchema should construct a default value object for one single group having textVar as child component', () => {
        const expectedDefaultValues = {
          someRootNameInData: {
            someChildGroupNameInData: {
              someNameInData: {
                value: '',
              },
            },
          },
        };

        const actualDefaultValues = createDefaultValuesFromFormSchema(
          formDefWithOneGroupHavingTextVariableAsChild as FormSchema,
        );
        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });
    });
    describe('createDefaultValuesFromComponent', () => {
      it('should construct a default value object for repeating component', () => {
        const expectedDefaultValues = {
          exampleNumberVar: {
            value: '',
          },
          exampleTextVar: {
            value: '',
          },
        };
        const actualDefaultValues = createDefaultValuesFromComponent(
          formComponentGroup,
          true,
        );
        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });

      it('should construct a default value object for groups with same nameInData', () => {
        const expectedDefaultValues = {
          titleInfo: {
            title: {
              value: '',
            },
            _lang: '',
          },
          titleInfo_type_alternative: [
            {
              _lang: '',
              _type: 'alternative',
              title: {
                value: '',
              },
            },
          ],
        };
        const actualDefaultValues = createDefaultValuesFromComponent(
          formComponentTitleInfoGroup,
          true,
        );
        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });

      it('should construct a default value object for complex children in repeating component', () => {
        const expectedDefaultValues = {
          exampleNumberVar: [
            {
              value: '',
            },
          ],
          exampleTextVar: [
            {
              value: '',
            },
            {
              value: '',
            },
          ],
        };
        const actualDefaultValues = createDefaultValuesFromComponent(
          formComponentGroupWithChildren,
          true,
        );
        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });

      it('should construct a default value object for group within group having repeating vars and minNumberToShow set', () => {
        const expectedDefaultValues = {
          exampleTextVar: {
            value: '',
          },
          innerChildGroup: [
            {
              exampleNumberVar: [
                {
                  value: '12',
                },
                {
                  value: '12',
                },
                {
                  value: '12',
                },
                {
                  value: '12',
                },
                {
                  value: '12',
                },
                {
                  value: '12',
                },
                {
                  value: '12',
                },
                {
                  value: '12',
                },
                {
                  value: '12',
                },
                {
                  value: '12',
                },
              ],
              exampleTextVar: {
                value: '',
              },
            },
            {
              exampleNumberVar: [
                {
                  value: '12',
                },
                {
                  value: '12',
                },
                {
                  value: '12',
                },
                {
                  value: '12',
                },
                {
                  value: '12',
                },
                {
                  value: '12',
                },
                {
                  value: '12',
                },
                {
                  value: '12',
                },
                {
                  value: '12',
                },
                {
                  value: '12',
                },
              ],
              exampleTextVar: {
                value: '',
              },
            },
          ],
        };
        const actualDefaultValues = createDefaultValuesFromComponent(
          formComponentGroupAndTextVariableWithinGroup,
          true,
        );
        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });

      it('should construct a default value object for group with attributes and attributes for vars within group', () => {
        const expectedDefaultValues = {
          _firstChildGroupColor: 'yellow',
          _firstChildGroupSecondAttribute: '',
          secondChildGroup: [
            {
              exampleNumberVar: {
                value: '',
              },
              exampleTextVar: {
                _colour: '',
                value: '',
              },
            },
          ],
        };
        const actualDefaultValues = createDefaultValuesFromComponent(
          formComponentGroupWithinGroupWithAttributes,
          true,
        );
        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });

      it('should construct a default value object for textVariable component', () => {
        const expectedDefaultValues = {
          value: '',
        };
        const actualDefaultValues = createDefaultValuesFromComponent(
          formComponentRepeatingTextVariable,
          true,
        );
        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });

      it('should construct a default value object for textVariables with same NameInData', () => {
        const expectedDefaultValues = {
          secondChildGroup: {
            exampleNumberVar_language_eng: {
              _language: 'eng',
              value: '12',
            },
            exampleNumberVar_language_swe: {
              _language: 'swe',
              value: '12',
            },
          },
        };
        const actualDefaultValues = createDefaultValuesFromComponent(
          {
            name: 'secondChildGroup',
            type: 'group',
            mode: 'input',
            tooltip: {
              title: 'nationalSubjectCategoryRecordTypeNewGroupText',
              body: 'nationalSubjectCategoryRecordTypeNewGroupDefText',
            },
            label: 'nationalSubjectCategoryRecordTypeNewGroupText',
            showLabel: true,
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
            components: [
              {
                name: 'exampleNumberVar',
                type: 'numberVariable',
                mode: 'input',
                tooltip: {
                  title: 'exampleMetadataNumberVarText',
                  body: 'exampleMetadataNumberVarDefText',
                },
                label: 'exampleMetadataNumberVarText',
                attributes: [
                  {
                    name: 'language',
                    type: 'collectionVariable',
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
                        value: 'eng',
                        label: 'engLangItemText',
                      },
                      {
                        value: 'swe',
                        label: 'sweLangItemText',
                      },
                    ],
                    finalValue: 'eng',
                  },
                ],
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
              },
              {
                name: 'exampleNumberVar',
                type: 'numberVariable',
                mode: 'input',
                tooltip: {
                  title: 'exampleMetadataNumberVarText',
                  body: 'exampleMetadataNumberVarDefText',
                },
                label: 'exampleMetadataNumberVarText',
                attributes: [
                  {
                    name: 'language',
                    type: 'collectionVariable',
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
                        value: 'eng',
                        label: 'engLangItemText',
                      },
                      {
                        value: 'swe',
                        label: 'sweLangItemText',
                      },
                    ],
                    finalValue: 'swe',
                  },
                ],
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
              },
            ],
            presentationStyle: '',
            childStyle: [''],
            gridColSpan: 12,
          },
          false,
        );
        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });

      it('should construct a default value object for groups with same NameInData', () => {
        const expectedDefaultValues = {
          someRootNameInData: {
            author_language_uwu: {
              _language: 'uwu',
              givenName: {
                value: '',
              },
              familyName: {
                value: '',
              },
            },
            author_language_nau: {
              _language: 'nau',
              givenName: {
                value: '',
              },
              familyName: {
                value: '',
              },
            },
          },
        };
        const actualDefaultValues = createDefaultValuesFromComponent(
          {
            type: 'group',
            showLabel: true,
            label: 'someRootFormGroupText',
            name: 'someRootNameInData',
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
            tooltip: {
              title: 'textId345',
              body: 'defTextId678',
            },
            components: [
              {
                name: 'author',
                type: 'group',
                mode: 'input',
                tooltip: {
                  title: 'authorGroupText',
                  body: 'authorGroupDefText',
                },
                label: 'authorGroupText',
                showLabel: true,
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 1,
                  repeatMax: 1,
                },
                attributes: [
                  {
                    name: 'language',
                    type: 'collectionVariable',
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
                        value: 'nau',
                        label: 'nauLangItemText',
                      },
                      {
                        value: 'uwu',
                        label: 'uwuLangItemText',
                      },
                    ],
                    finalValue: 'uwu',
                  },
                ],
                components: [
                  {
                    name: 'givenName',
                    type: 'textVariable',
                    mode: 'input',
                    inputType: 'input',
                    tooltip: {
                      title: 'givenNameTextVarText',
                      body: 'givenNameTextVarDefText',
                    },
                    label: 'givenNameTextVarText',
                    placeholder: 'givenNameTextVarText1',
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
                    mode: 'input',
                    inputType: 'input',
                    tooltip: {
                      title: 'familyNameTextVarText',
                      body: 'familyNameTextVarDefText',
                    },
                    label: 'familyNameTextVarText',
                    placeholder: 'familyNameTextVarText1',
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
                ],
                presentationStyle: '',
                childStyle: [''],
                gridColSpan: 12,
              },
              {
                name: 'author',
                type: 'group',
                mode: 'input',
                tooltip: {
                  title: 'authorGroupText',
                  body: 'authorGroupDefText',
                },
                label: 'authorGroupText',
                showLabel: true,
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 1,
                  repeatMax: 1,
                },
                attributes: [
                  {
                    name: 'language',
                    type: 'collectionVariable',
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
                        value: 'nau',
                        label: 'nauLangItemText',
                      },
                      {
                        value: 'uwu',
                        label: 'uwuLangItemText',
                      },
                    ],
                    finalValue: 'nau',
                  },
                ],
                components: [
                  {
                    name: 'givenName',
                    type: 'textVariable',
                    mode: 'input',
                    inputType: 'input',
                    tooltip: {
                      title: 'givenNameTextVarText',
                      body: 'givenNameTextVarDefText',
                    },
                    label: 'givenNameTextVarText',
                    placeholder: 'givenNameTextVarText2',
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
                    mode: 'input',
                    inputType: 'input',
                    tooltip: {
                      title: 'familyNameTextVarText',
                      body: 'familyNameTextVarDefText',
                    },
                    label: 'familyNameTextVarText',
                    placeholder: 'familyNameTextVarText2',
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
                ],
                presentationStyle: '',
                childStyle: [''],
                gridColSpan: 12,
              },
            ],
            mode: 'input',
          },
          false,
        );
        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });
    });

    describe('finalValues', () => {
      it('createDefaultValuesFromFormSchema should take a more complex formDef with finalValue default values object', () => {
        const expectedDefaultValues = {
          someRootNameInData: {
            bookTitle: {
              value: 'someFinalValue',
            },
            keeptHis: [
              {
                value: '12',
              },
            ],
            firstChildGroup: {
              exampleNumberVar: {
                value: '55',
              },
              exampleTextVar: {
                value: 'someText',
              },
            },
            recordInfo: {},
          },
        };
        const actualDefaultValues = createDefaultValuesFromFormSchema(
          formDefRealDemoWithFinalValues as FormSchema,
        );
        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });
    });

    describe('attributes', () => {
      it('createDefaultValuesFromFormSchema should take a more complex formDef with groups and attributes and make default values object', () => {
        const expectedDefaultValues = {
          someRootNameInData: {
            bookTitle: {
              value: '',
              _colour: '',
            },
            keeptHis: [
              {
                value: '',
                _colour: '',
              },
            ],
            firstChildGroup_groupColourAgain_pink: {
              exampleNumberVar: {
                value: '',
              },
              exampleTextVar_colourAgain_pink: {
                _colour: '',
                _colourAgain: 'pink',
                value: 'exampleFinalValue',
              },
              _groupColour: '',
              _groupColourAgain: 'pink',
            },
            recordInfo: {},
          },
        };
        const actualDefaultValues = createDefaultValuesFromFormSchema(
          formDefRealDemoWithAttributes as FormSchema,
        );

        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });
    });

    describe('repeating vars', () => {
      it('createDefaultValuesFromFormSchema should take a more complex formDef with groups and repeating variables and make default values object', () => {
        const expectedDefaultValues = {
          someRootNameInData: {
            bookTitle: {
              value: '',
            },
            keeptHis_colour_blue: [
              {
                value: '',
                _colour: 'blue',
              },
              {
                value: '',
                _colour: 'blue',
              },
              {
                value: '',
                _colour: 'blue',
              },
              {
                value: '',
                _colour: 'blue',
              },
              {
                value: '',
                _colour: 'blue',
              },
            ],
            firstChildGroup: {
              exampleNumberVar_colour_pink: [
                {
                  value: '',
                  _colour: 'pink',
                },
                {
                  value: '',
                  _colour: 'pink',
                },
                {
                  value: '',
                  _colour: 'pink',
                },
                {
                  value: '',
                  _colour: 'pink',
                },
                {
                  value: '',
                  _colour: 'pink',
                },
              ],
              exampleTextVar: [],
            },
            recordInfo: {},
          },
        };
        const actualDefaultValues = createDefaultValuesFromFormSchema(
          formDefRealDemoWithRepeatingVars as FormSchema,
        );
        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });
    });

    describe('generate overrides from existing record (edit form)', () => {
      it('should take a formDef and make default values object but also take defaultValue override', () => {
        const expectedDefaultValues = {
          someRootNameInData: {
            someNameInData: {
              value: 'testValue',
            },
            someNumberVariableNameInData: {
              value: '',
            },
          },
        };

        const existingRecordData = {
          someRootNameInData: {
            someNameInData: {
              value: 'testValue',
            },
          },
        };

        const actualDefaultValues = createDefaultValuesFromFormSchema(
          formDefWithTextVar as FormSchema,
          existingRecordData,
        );

        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });

      it('should take a formDef with repeating textVar and make default values object but also take defaultValue override', () => {
        const expectedDefaultValues = {
          someRootNameInData: {
            someNameInData: [
              {
                value: 'testValue',
              },
              {
                value: '',
              },
              {
                value: '',
              },
            ],
          },
        };

        const existingRecordData = {
          someRootNameInData: {
            someNameInData: [
              {
                value: 'testValue',
              },
            ],
          },
        };

        const actualDefaultValues = createDefaultValuesFromFormSchema(
          formDefWithOneRepeatingTextVariable,
          existingRecordData,
        );

        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });

      it('should take a more complex formDef with groups and make default values object with overrides', () => {
        const expectedDefaultValues = {
          someRootNameInData: {
            bookTitle: {
              value: 'testBookTitle',
            },
            keeptHis: [
              {
                value: 'override',
              },
            ],
            firstChildGroup: {
              exampleNumberVar: {
                value: '12',
              },
              exampleTextVar: {
                value: '',
              },
            },
            recordInfo: {},
          },
        };

        const existingRecordData = {
          someRootNameInData: {
            bookTitle: {
              value: 'testBookTitle',
            },
            keeptHis: [
              {
                value: 'override',
              },
            ],
            firstChildGroup: {
              exampleNumberVar: {
                value: '12',
              },
            },
          },
        };

        const actualDefaultValues = createDefaultValuesFromFormSchema(
          formDefRealDemo as FormSchema,
          existingRecordData,
        );
        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });

      it('should take a more complex formDef with groups and attributes and make default values object with overrides', () => {
        const expectedDefaultValues = {
          someRootNameInData: {
            bookTitle: {
              value: '',
              _colour: 'yellow',
            },
            keeptHis: [
              {
                value: '',
                _colour: 'blue',
              },
              {
                value: '',
                _colour: '',
              },
            ],
            firstChildGroup: {
              exampleNumberVar: {
                value: '',
              },
              exampleTextVar: {
                _colour: 'yellow',
                _colourAgain: 'pink',
                value: 'someEditedValue',
              },
              _groupColour: 'pink',
              _groupColourAgain: 'blue',
            },
            recordInfo: {},
          },
        };

        const existingRecordData = {
          someRootNameInData: {
            bookTitle: {
              value: '',
              _colour: 'yellow',
            },
            keeptHis: [
              {
                value: '',
                _colour: 'blue',
              },
            ],
            firstChildGroup: {
              exampleTextVar: {
                _colour: 'yellow',
                _colourAgain: 'pink',
                value: 'someEditedValue',
              },
              _groupColour: 'pink',
              _groupColourAgain: 'blue',
            },
            recordInfo: {},
          },
        };

        const actualDefaultValues = createDefaultValuesFromFormSchema(
          formDefRealDemoWithAttributesButWithoutFinalValue as FormSchema,
          existingRecordData,
        );

        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });

      it('should take a more complex formDef with repeating groups and make default values object with overrides', () => {
        const expectedDefaultValues = {
          someRootNameInData: {
            bookTitle: {
              value: 'Moby Dick',
            },
            keeptHis: [
              {
                value: '',
              },
            ],
            firstChildGroup: [
              {
                exampleNumberVar: {
                  value: '12',
                },
                exampleTextVar: {
                  value: 'SomeTextVar',
                },
              },
              {
                exampleNumberVar: {
                  value: '',
                },
                exampleTextVar: {
                  value: '',
                },
              },
            ],
            recordInfo: {},
          },
        };

        const existingDataRecord = {
          someRootNameInData: {
            bookTitle: {
              value: 'Moby Dick',
            },
            firstChildGroup: [
              {
                exampleNumberVar: {
                  value: '12',
                },
                exampleTextVar: {
                  value: 'SomeTextVar',
                },
              },
            ],
            recordInfo: {},
          },
        };
        const actualDefaultValues = createDefaultValuesFromFormSchema(
          formDefRealDemoWithRepeatingGroups as FormSchema,
          existingDataRecord,
        );
        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });

      it('should take a more complex formDef with finalValue default values object without overrides taking effect', () => {
        const expectedDefaultValues = {
          someRootNameInData: {
            bookTitle: {
              value: 'someValueFromServerThatWillNeverBeSavedEverAgain',
            },
            keeptHis: [
              {
                value: '12',
              },
            ],
            firstChildGroup: {
              exampleNumberVar: {
                value: '55',
              },
              exampleTextVar: {
                value: 'someText',
              },
            },
            recordInfo: {},
          },
        };

        const existingRecordData = {
          someRootNameInData: {
            bookTitle: {
              value: 'someValueFromServerThatWillNeverBeSavedEverAgain',
            },
          },
        };

        const actualDefaultValues = createDefaultValuesFromFormSchema(
          formDefRealDemoWithFinalValues as FormSchema,
          existingRecordData,
        );
        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });
    });

    it('creates default values for alternative presentation', () => {
      const expectedDefaultValues = {
        someRootNameInData: {
          someAlternativeNameInData: [
            {
              value: '',
            },
          ],
          someNameInData: {
            value: '',
          },
        },
      };
      const actualDefaultValues = createDefaultValuesFromFormSchema(
        alternativePresentationWithMinNumberRepeatingToShow as FormSchema,
      );
      expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
    });
  });

  it('should take a tree and be able to add full name paths', () => {
    const expected = [
      {
        name: 'person',
        type: 'group',
        repeat: true,
        path: 'person',
        components: [
          {
            name: 'name',
            type: 'group',
            repeat: true,
            components: [
              {
                name: 'firstName',
                type: 'textVariable',
                repeat: false,
                path: 'person.name.firstName',
                components: [],
              },
              {
                name: 'lastName',
                path: 'person.name.lastName',
                type: 'textVariable',
                repeat: false,
                components: [],
              },
            ],
            path: 'person.name',
          },
          {
            name: 'age',
            type: 'numberVariable',
            repeat: false,
            path: 'person.age',
            components: [],
          },
        ],
      },
    ];

    interface TestComponentLight {
      name: string;
      type: 'group' | 'textVariable' | 'numberVariable';
      repeat: boolean;
      path?: string; // path template
      components: TestComponentLight[];
    }

    const createFormDefWithPaths = (
      data: TestComponentLight[],
      parentPath = '',
    ): unknown => {
      return data.map((node: TestComponentLight) => {
        const nodePath = `${parentPath}.${node.name}`;
        const components = createFormDefWithPaths(node.components, nodePath);

        return {
          ...node,
          path: nodePath.slice(1),
          components,
        } as TestComponentLight;
      });
    };

    const rootComponents: TestComponentLight[] = [
      {
        name: 'person',
        type: 'group',
        repeat: true,
        components: [
          {
            name: 'name',
            type: 'group',
            repeat: true,
            components: [
              {
                name: 'firstName',
                type: 'textVariable',
                repeat: false,
                components: [],
              },
              {
                name: 'lastName',
                type: 'textVariable',
                repeat: false,
                components: [],
              },
            ],
          },
          {
            name: 'age',
            type: 'numberVariable',
            repeat: false,
            components: [],
          },
        ],
      },
    ];

    const actual = createFormDefWithPaths(rootComponents);
    expect(actual).toStrictEqual(expected);
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
    it('removeRootObject', () => {
      const expectedData = {
        someNameInData: {
          value: '',
        },
      };
      const actualData = removeRootObject({
        someSurroundingContainerName: {
          someNameInData: {
            value: '',
          },
        },
      });
      expect(expectedData).toStrictEqual(actualData);
    });
    describe('createDefaultValueFromFinalValue', () => {
      it('createDefaultValueFromFinalValue without finalValue return empty default value', () => {
        const expectedData = '';
        const actualData = createDefaultValueFromFinalValue({
          name: 'exampleNumberVar',
          type: 'numberVariable',
          mode: 'input',
          tooltip: {
            title: 'exampleMetadataNumberVarText',
            body: 'exampleMetadataNumberVarDefText',
          },
          label: 'exampleMetadataNumberVarText',
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
        });
        expect(expectedData).toStrictEqual(actualData);
      });
      it('createDefaultValueFromFinalValue with finalValue return set default value', () => {
        const expectedData = '12';
        const actualData = createDefaultValueFromFinalValue({
          // createDefaultValueFromFinalValue
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
        });
        expect(expectedData).toStrictEqual(actualData);
      });
    });
    describe('generateRepeatingObject', () => {
      it('one repeat', () => {
        const expectedData = [
          {
            value: '',
          },
        ];
        const actualData = generateRepeatingObject(1, {
          value: '',
        });
        expect(expectedData).toStrictEqual(actualData);
      });
      it('two repeats', () => {
        const expectedData = [
          {
            value: '',
          },
          {
            value: '',
          },
        ];
        const actualData = generateRepeatingObject(2, {
          value: '',
        });
        expect(expectedData).toStrictEqual(actualData);
      });
    });
    describe('getMinNumberOfRepeatingToShow', () => {
      it('getMinNumberOfRepeatingToShow get minNumberOfRepeatingToShow', () => {
        const expectedData = 2;
        const actualData = getMinNumberOfRepeatingToShow({
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
            minNumberOfRepeatingToShow: 2,
          },
        });
        expect(expectedData).toStrictEqual(actualData);
      });
      it('getMinNumberOfRepeatingToShow get repeatMin', () => {
        const expectedData = 1;
        const actualData = getMinNumberOfRepeatingToShow({
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
        });
        expect(expectedData).toStrictEqual(actualData);
      });
    });
    describe('createDefaultValuesFromComponents', () => {
      it('create default value from one component', () => {
        const expectedData = {
          exampleNumberVar: {
            value: '12',
          },
        };
        const actualData = createDefaultValuesFromComponents([
          {
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
          },
        ]);
        expect(expectedData).toStrictEqual(actualData);
      });

      it('create default value from two component', () => {
        const expectedData = {
          exampleNumberVar: {
            value: '12',
          },
          exampleNumberVar2: {
            value: '12',
          },
        };
        const actualData = createDefaultValuesFromComponents([
          {
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
          },
          {
            name: 'exampleNumberVar2',
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
          },
        ]);
        expect(expectedData).toStrictEqual(actualData);
      });

      it('create default value from undefined', () => {
        const expectedData = {};
        const actualData = createDefaultValuesFromComponents([]);
        expect(expectedData).toStrictEqual(actualData);
      });

      it('create default value from two component with same nameInData, with attributes', () => {
        const expectedData = {
          exampleNumberVar_language_eng: {
            _language: 'eng',
            value: '12',
          },
          exampleNumberVar_language_swe: {
            _language: 'swe',
            value: '12',
          },
        };
        const actualData = createDefaultValuesFromComponents([
          {
            name: 'exampleNumberVar',
            type: 'numberVariable',
            mode: 'input',
            tooltip: {
              title: 'exampleMetadataNumberVarText',
              body: 'exampleMetadataNumberVarDefText',
            },
            label: 'exampleMetadataNumberVarText',
            attributes: [
              {
                name: 'language',
                type: 'collectionVariable',
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
                    value: 'eng',
                    label: 'engLangItemText',
                  },
                  {
                    value: 'swe',
                    label: 'sweLangItemText',
                  },
                ],
                finalValue: 'eng',
              },
            ],
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
          },
          {
            name: 'exampleNumberVar',
            type: 'numberVariable',
            mode: 'input',
            tooltip: {
              title: 'exampleMetadataNumberVarText',
              body: 'exampleMetadataNumberVarDefText',
            },
            label: 'exampleMetadataNumberVarText',
            attributes: [
              {
                name: 'language',
                type: 'collectionVariable',
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
                    value: 'eng',
                    label: 'engLangItemText',
                  },
                  {
                    value: 'swe',
                    label: 'sweLangItemText',
                  },
                ],
                finalValue: 'swe',
              },
            ],
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
          },
        ]);
        expect(expectedData).toStrictEqual(actualData);
      });

      it('create default value from two groups with same nameInData, with attributes', () => {
        const expectedData = {
          author_language_nau: {
            _language: 'nau',
            familyName: {
              value: '',
            },
            givenName: {
              value: '',
            },
          },
          author_language_uwu: {
            _language: 'uwu',
            familyName: {
              value: '',
            },
            givenName: {
              value: '',
            },
          },
        };
        const actualData = createDefaultValuesFromComponents([
          {
            name: 'author',
            type: 'group',
            mode: 'input',
            tooltip: {
              title: 'authorGroupText',
              body: 'authorGroupDefText',
            },
            label: 'authorGroupText',
            showLabel: true,
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            attributes: [
              {
                name: 'language',
                type: 'collectionVariable',
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
                    value: 'nau',
                    label: 'nauLangItemText',
                  },
                  {
                    value: 'uwu',
                    label: 'uwuLangItemText',
                  },
                ],
                finalValue: 'uwu',
              },
            ],
            components: [
              {
                name: 'givenName',
                type: 'textVariable',
                mode: 'input',
                inputType: 'input',
                tooltip: {
                  title: 'givenNameTextVarText',
                  body: 'givenNameTextVarDefText',
                },
                label: 'givenNameTextVarText',
                placeholder: 'givenNameTextVarText1',
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
                mode: 'input',
                inputType: 'input',
                tooltip: {
                  title: 'familyNameTextVarText',
                  body: 'familyNameTextVarDefText',
                },
                label: 'familyNameTextVarText',
                placeholder: 'familyNameTextVarText1',
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
            ],
            presentationStyle: '',
            childStyle: [''],
            gridColSpan: 12,
          },
          {
            name: 'author',
            type: 'group',
            mode: 'input',
            tooltip: {
              title: 'authorGroupText',
              body: 'authorGroupDefText',
            },
            label: 'authorGroupText',
            showLabel: true,
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            attributes: [
              {
                name: 'language',
                type: 'collectionVariable',
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
                    value: 'nau',
                    label: 'nauLangItemText',
                  },
                  {
                    value: 'uwu',
                    label: 'uwuLangItemText',
                  },
                ],
                finalValue: 'nau',
              },
            ],
            components: [
              {
                name: 'givenName',
                type: 'textVariable',
                mode: 'input',
                inputType: 'input',
                tooltip: {
                  title: 'givenNameTextVarText',
                  body: 'givenNameTextVarDefText',
                },
                label: 'givenNameTextVarText',
                placeholder: 'givenNameTextVarText2',
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
                mode: 'input',
                inputType: 'input',
                tooltip: {
                  title: 'familyNameTextVarText',
                  body: 'familyNameTextVarDefText',
                },
                label: 'familyNameTextVarText',
                placeholder: 'familyNameTextVarText2',
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
            ],
            presentationStyle: '',
            childStyle: [''],
            gridColSpan: 12,
          },
        ]);
        expect(expectedData).toStrictEqual(actualData);
      });
    });
    describe('mergeObjects', () => {
      it('merges one object', () => {
        const expectedData = {
          someNameInData: {
            value: 'testValue',
          },
        };
        const actualData = mergeObjects(
          {
            someNameInData: {
              value: '',
            },
          },
          {
            someNameInData: {
              value: 'testValue',
            },
          },
        );
        expect(expectedData).toStrictEqual(actualData);
      });

      it('merges one nested object', () => {
        const expectedData = {
          someRootNameInData: {
            someNameInData: {
              value: 'testValue',
            },
          },
        };
        const actualData = mergeObjects(
          {
            someRootNameInData: {
              someNameInData: {
                value: '',
              },
            },
          },
          {
            someRootNameInData: {
              someNameInData: {
                value: 'testValue',
              },
            },
          },
        );
        expect(expectedData).toStrictEqual(actualData);
      });

      it('merges one object with an extra object', () => {
        const expectedData = {
          someRootNameInData: {
            someNameInData: {
              value: 'testValue',
            },
            someNumberVariableNameInData: {
              value: '',
            },
          },
        };
        const actualData = mergeObjects(
          {
            someRootNameInData: {
              someNameInData: {
                value: '',
              },
              someNumberVariableNameInData: {
                value: '',
              },
            },
          },
          {
            someRootNameInData: {
              someNameInData: {
                value: 'testValue',
              },
            },
          },
        );
        expect(expectedData).toStrictEqual(actualData);
      });

      it('merges one array', () => {
        const expectedData = {
          someRootNameInData: {
            someNameInData: [
              {
                value: 'testValue',
              },
              {
                value: '',
              },
              {
                value: '',
              },
            ],
          },
        };
        const actualData = mergeObjects(
          {
            someRootNameInData: {
              someNameInData: [
                {
                  value: '',
                },
                {
                  value: '',
                },
                {
                  value: '',
                },
              ],
            },
          },
          {
            someRootNameInData: {
              someNameInData: [
                {
                  value: 'testValue',
                },
              ],
            },
          },
        );
        expect(expectedData).toStrictEqual(actualData);
      });

      it('merges one value', () => {
        const expectedData = {
          someRootNameInData: 'testValue',
        };
        const actualData = mergeObjects(
          {
            someRootNameInData: '',
          },
          {
            someRootNameInData: 'testValue',
          },
        );
        expect(expectedData).toStrictEqual(actualData);
      });

      it('merges one object group', () => {
        const expectedData = {
          author_language_nau: {
            _language: 'nau',
            familyName: {
              value: 'Flores',
            },
            givenName: {
              value: 'Daniel',
            },
          },
          author_language_uwu: {
            _language: 'uwu',
            familyName: {
              value: 'Swenning',
            },
            givenName: {
              value: 'Egil',
            },
          },
        };
        const actualData = mergeObjects(
          {
            author_language_nau: {
              _language: 'nau',
              familyName: {
                value: '',
              },
              givenName: {
                value: '',
              },
            },
            author_language_uwu: {
              _language: 'uwu',
              familyName: {
                value: '',
              },
              givenName: {
                value: '',
              },
            },
          },
          {
            author_language_uwu: {
              givenName: {
                value: 'Egil',
              },
              familyName: {
                value: 'Swenning',
              },
              _language: 'uwu',
            },
            author_language_nau: {
              givenName: {
                value: 'Daniel',
              },
              familyName: {
                value: 'Flores',
              },
              _language: 'nau',
            },
          },
        );
        expect(expectedData).toStrictEqual(actualData);
      });
    });
    describe('mergeArrays', () => {
      it('merges array with one object', () => {
        const expectedData = [
          {
            value: 'override',
          },
        ];
        const actualData = mergeArrays(
          [
            {
              value: '',
            },
          ],
          [
            {
              value: 'override',
            },
          ],
        );
        expect(expectedData).toStrictEqual(actualData);
      });
      it('merges array with two object', () => {
        const expectedData = [
          {
            value: 'override',
          },
          {
            value: 'override2',
          },
        ];
        const actualData = mergeArrays(
          [
            {
              value: '',
            },
            {
              value: '',
            },
          ],
          [
            {
              value: 'override',
            },
            {
              value: 'override2',
            },
          ],
        );
        expect(expectedData).toStrictEqual(actualData);
      });
    });
    describe('addAttributesToName', () => {
      it('addAttributesToName adds attributes to name of variable', () => {
        const actual = addAttributesToName(
          {
            name: 'subject',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'subjectEngTextVarText',
              body: 'subjectEngTextVarDefText',
            },
            label: 'subjectEngTextVarText',
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
            attributes: [
              {
                name: 'language',
                type: 'collectionVariable',
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
                    value: 'eng',
                    label: 'engLangItemText',
                  },
                  {
                    value: 'swe',
                    label: 'sweLangItemText',
                  },
                ],
                finalValue: 'eng',
              },
            ],
            childStyle: [''],
            gridColSpan: 12,
          },
          'nationalSubjectCategory.subject.value',
        );
        expect(actual).toEqual(
          'nationalSubjectCategory.subject.value_language_eng',
        );
      });

      it('addAttributesToName does not add attributes to name of variable without finalValue', () => {
        const actual = addAttributesToName(
          {
            name: 'subject',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'subjectEngTextVarText',
              body: 'subjectEngTextVarDefText',
            },
            label: 'subjectEngTextVarText',
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
            attributes: [
              {
                name: 'language',
                type: 'collectionVariable',
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
                    value: 'eng',
                    label: 'engLangItemText',
                  },
                  {
                    value: 'swe',
                    label: 'sweLangItemText',
                  },
                ],
              },
            ],
            childStyle: [''],
            gridColSpan: 12,
          },
          'nationalSubjectCategory.subject.value',
        );
        expect(actual).toEqual('nationalSubjectCategory.subject.value');
      });

      it('addAttributesToName adds multiple attributes to name of variable', () => {
        const actual = addAttributesToName(
          {
            name: 'subject',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'subjectEngTextVarText',
              body: 'subjectEngTextVarDefText',
            },
            label: 'subjectEngTextVarText',
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
            attributes: [
              {
                name: 'language',
                type: 'collectionVariable',
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
                    value: 'eng',
                    label: 'engLangItemText',
                  },
                  {
                    value: 'swe',
                    label: 'sweLangItemText',
                  },
                ],
                finalValue: 'eng',
              },
              {
                name: 'language2',
                type: 'collectionVariable',
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
                    value: 'eng',
                    label: 'engLangItemText',
                  },
                  {
                    value: 'swe',
                    label: 'sweLangItemText',
                  },
                ],
                finalValue: 'swe',
              },
            ],
            childStyle: [''],
            gridColSpan: 12,
          },
          'nationalSubjectCategory.subject.value',
        );
        expect(actual).toEqual(
          'nationalSubjectCategory.subject.value_language_eng_language2_swe',
        );
      });

      it('addAttributesToName returns name if no attributes', () => {
        const actual = addAttributesToName(
          {
            name: 'subject',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'subjectEngTextVarText',
              body: 'subjectEngTextVarDefText',
            },
            label: 'subjectEngTextVarText',
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
            childStyle: [''],
            gridColSpan: 12,
          },
          'nationalSubjectCategory.subject.value',
        );
        expect(actual).toEqual('nationalSubjectCategory.subject.value');
      });
    });
    describe('hasCurrentComponentSameNameInData', () => {
      it('has same name', () => {
        const actual = hasCurrentComponentSameNameInData(
          ['subject'],
          'subject',
        );
        expect(actual).toBe(true);
      });
      it('has same name', () => {
        const actual = hasCurrentComponentSameNameInData(
          ['subject', 'notSubject'],
          'subject',
        );
        expect(actual).toBe(true);
      });
      it('has different name', () => {
        const actual = hasCurrentComponentSameNameInData(
          ['notSubject'],
          'subject',
        );
        expect(actual).toBe(false);
      });

      it('has empty array', () => {
        const actual = hasCurrentComponentSameNameInData([], 'subject');
        expect(actual).toBe(false);
      });
    });
  });
  describe('getChildArrayWithSameNameInData', () => {
    it('same get all variables with the same name', () => {
      const component: FormComponent = {
        name: 'secondChildGroup',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'nationalSubjectCategoryRecordTypeNewGroupText',
          body: 'nationalSubjectCategoryRecordTypeNewGroupDefText',
        },
        label: 'nationalSubjectCategoryRecordTypeNewGroupText',
        showLabel: true,
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        components: [
          {
            name: 'exampleNumberVar',
            type: 'numberVariable',
            mode: 'input',
            tooltip: {
              title: 'exampleMetadataNumberVarText',
              body: 'exampleMetadataNumberVarDefText',
            },
            label: 'exampleMetadataNumberVarText',
            attributes: [
              {
                name: 'language',
                type: 'collectionVariable',
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
                    value: 'eng',
                    label: 'engLangItemText',
                  },
                  {
                    value: 'swe',
                    label: 'sweLangItemText',
                  },
                ],
                finalValue: 'eng',
              },
            ],
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
          },
          {
            name: 'exampleNumberVar',
            type: 'numberVariable',
            mode: 'input',
            tooltip: {
              title: 'exampleMetadataNumberVarText',
              body: 'exampleMetadataNumberVarDefText',
            },
            label: 'exampleMetadataNumberVarText',
            attributes: [
              {
                name: 'language',
                type: 'collectionVariable',
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
                    value: 'eng',
                    label: 'engLangItemText',
                  },
                  {
                    value: 'swe',
                    label: 'sweLangItemText',
                  },
                ],
                finalValue: 'swe',
              },
            ],
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
          },
        ],
        presentationStyle: '',
        childStyle: [''],
        gridColSpan: 12,
      };

      const actual = getChildNameInDataArray(component);
      expect(actual).toEqual(['exampleNumberVar', 'exampleNumberVar']);
    });

    it('same get all groups with the same name', () => {
      const component: FormComponent = {
        name: 'firstChildGroup',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'exampleFirstChildGroupText',
          body: 'exampleFirstChildGroupDefText',
        },
        label: 'exampleFirstChildGroupText',
        repeat: {
          minNumberOfRepeatingToShow: 0,
          repeatMin: 0,
          repeatMax: 2,
        },
        components: [
          {
            name: 'titleInfo',
            type: 'group',
            mode: 'input',
            tooltip: {
              title: 'titleInfoGroupText',
              body: 'titleInfoGroupDefText',
            },
            label: 'titleInfoGroupText',
            showLabel: true,
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            attributes: [
              {
                name: 'lang',
                type: 'collectionVariable',
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
                    value: 'eng',
                    label: 'engLangItemText',
                  },
                  {
                    value: 'swe',
                    label: 'sweLangItemText',
                  },
                ],
              },
            ],
            components: [
              {
                name: 'title',
                type: 'textVariable',
                mode: 'input',
                inputType: 'input',
                tooltip: {
                  title: 'titleTextVarText',
                  body: 'titleTextVarDefText',
                },
                label: 'titleTextVarText',
                showLabel: true,
                validation: {
                  type: 'regex',
                  pattern: '.+',
                },
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 0,
                  repeatMax: 1,
                },
                childStyle: [''],
                gridColSpan: 12,
              },
            ],
            presentationStyle: '',
            childStyle: [''],
            gridColSpan: 12,
          },
          {
            name: 'titleInfo',
            type: 'group',
            mode: 'input',
            tooltip: {
              title: 'titleInfoGroupText',
              body: 'titleInfoGroupDefText',
            },
            label: 'titleInfoGroupText',
            showLabel: true,
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1.7976931348623157e308,
            },
            attributes: [
              {
                name: 'lang',
                type: 'collectionVariable',
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
                    value: 'eng',
                    label: 'engLangItemText',
                  },
                  {
                    value: 'swe',
                    label: 'sweLangItemText',
                  },
                ],
              },
              {
                name: 'type',
                type: 'collectionVariable',
                placeholder: 'initialEmptyValueText',
                mode: 'input',
                tooltip: {
                  title: 'titleTypeCollectionVarText',
                  body: 'titleTypeCollectionVarDefText',
                },
                label: 'titleTypeCollectionVarText',
                showLabel: true,
                options: [
                  {
                    value: 'alternative',
                    label: 'alternativeTitleItemText',
                  },
                ],
                finalValue: 'alternative',
              },
            ],
            components: [
              {
                name: 'title',
                type: 'textVariable',
                mode: 'input',
                inputType: 'input',
                tooltip: {
                  title: 'titleTextVarText',
                  body: 'titleTextVarDefText',
                },
                label: 'titleTextVarText',
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
                childStyle: [''],
                gridColSpan: 12,
              },
            ],
            presentationStyle: '',
            childStyle: [''],
            gridColSpan: 12,
          },
        ],
      };

      const actual = getChildNameInDataArray(component);
      expect(actual).toEqual(['titleInfo', 'titleInfo']);
    });

    it('same get all variables with the different names', () => {
      const component: FormComponent = {
        name: 'secondChildGroup',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'nationalSubjectCategoryRecordTypeNewGroupText',
          body: 'nationalSubjectCategoryRecordTypeNewGroupDefText',
        },
        label: 'nationalSubjectCategoryRecordTypeNewGroupText',
        showLabel: true,
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        components: [
          {
            name: 'exampleNumberVar',
            type: 'numberVariable',
            mode: 'input',
            tooltip: {
              title: 'exampleMetadataNumberVarText',
              body: 'exampleMetadataNumberVarDefText',
            },
            label: 'exampleMetadataNumberVarText',
            attributes: [
              {
                name: 'language',
                type: 'collectionVariable',
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
                    value: 'eng',
                    label: 'engLangItemText',
                  },
                  {
                    value: 'swe',
                    label: 'sweLangItemText',
                  },
                ],
                finalValue: 'eng',
              },
            ],
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
          },
          {
            name: 'exampleNumber2Var',
            type: 'numberVariable',
            mode: 'input',
            tooltip: {
              title: 'exampleMetadataNumberVarText',
              body: 'exampleMetadataNumberVarDefText',
            },
            label: 'exampleMetadataNumberVarText',
            attributes: [
              {
                name: 'language',
                type: 'collectionVariable',
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
                    value: 'eng',
                    label: 'engLangItemText',
                  },
                  {
                    value: 'swe',
                    label: 'sweLangItemText',
                  },
                ],
                finalValue: 'swe',
              },
            ],
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
          },
        ],
        presentationStyle: '',
        childStyle: [''],
        gridColSpan: 12,
      };

      const actual = getChildNameInDataArray(component);
      expect(actual).toEqual(['exampleNumberVar', 'exampleNumber2Var']);
    });
  });
  describe('getChildrenWithSameNameInData', () => {
    it('removes duplicates', () => {
      const actual = getChildrenWithSameNameInData([
        'exampleNumberVar',
        'exampleNumberVar',
      ]);
      expect(actual).toEqual(['exampleNumberVar']);
    });

    it('removes nothing if singles', () => {
      const actual = getChildrenWithSameNameInData([
        'exampleNumberVar',
        'exampleNumber2Var',
      ]);
      expect(actual).toEqual([]);
    });

    it('removes singles and keeps one of each duplicate name', () => {
      const actual = getChildrenWithSameNameInData([
        'ho',
        'ho',
        'hej',
        'hej',
        'hej',
        'hopp',
        'hej',
        'hej',
        'tjo',
      ]);
      expect(actual).toEqual(['ho', 'hej']);
    });
  });
});
