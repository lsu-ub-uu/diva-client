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

import { describe, expect, vi } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  formDefCollVarsWithSameNameInData,
  formDefContributorGroupWithAuthorGroupAuthor,
  formDefForCheckNumberValue,
  formDefForCheckTextValue,
  formDefNatSubGroupRequiredAndRecordLinksSameNameInDataWithAttributes,
  formDefPreprintWithOnlyAuthorName,
  formDefRequiredRepeatingCollection2Var,
  formDefRequiredRepeatingCollectionVar,
  formDefRequiredRepeatingNumber2Var,
  formDefRequiredRepeatingNumberVar,
  formDefRequiredRepeatingText2Var,
  formDefRequiredRepeatingTextVar,
  formDefSubjectGroupOptionalWithAttributesAndTopicWithAttributes,
  formDefSubjectGroupRequiredWithAttributesAndTopicWithAttributes,
  formDefTextVarsWithSameNameInData,
  formDefTitleInfoGroup,
  formDefTwoOptionalGroupsSameNameInDataWithRequiredTextVars,
  formDefTwoOptionalGroupsWithRequiredTextVars,
  formDefWithGroupWithDefaultHeadlineLevel,
  formDefWithGroupWithSpecifiedHeadlineLevel,
  formDefWithOneCollectionVariable,
  formDefWithOneCollectionVariableWithModeOutput,
  formDefWithOneGroupHavingTextVariableAsChild,
  formDefWithOneNumberVariable,
  formDefWithOneNumberVariableAndGuiElementLink,
  formDefWithOneNumberVariableAndOptionalNumberVariableWithAttributeCollection,
  formDefWithOneNumberVariableBeingOptional,
  formDefWithOneNumberVariableBeingOptionalOutput,
  formDefWithOneNumberVariableHavingDecimals,
  formDefWithOneNumberVariableModeOutput,
  formDefWithOneNumberVariableWithAttributeCollection,
  formDefWithOneOptionalGroupWithAttributeCollection,
  formDefWithOneOptionalGroupWithAttributeCollectionAndTextVarWithAttribute,
  formDefWithOneOptionalGroupWithOneOptionalGroupWithTextVariableAndAttributeCollection,
  formDefWithOneOptionalGroupWithTextVariableAndAttributeCollection,
  formDefWithOneOptionalNumberVariableWithAttributeCollection,
  formDefWithOneRecordLinkBeingOptional,
  formDefWithOneRecordLinkBeingRequired,
  formDefWithOneRepeatingTextVariableWithModeOutput,
  formDefWithOneRequiredGroupWithAttributeCollection,
  formDefWithOneRequiredNumberVariableWithAttributeCollection,
  formDefWithOneTextVariable,
  formDefWithOneTextVariableBeingOptional,
  formDefWithOneTextVariableBeingPassword,
  formDefWithOneTextVariableBeingRepeating,
  formDefWithOneTextVariableWithMinNumberOfRepeatingToShow,
  formDefWithOneTextVariableWithMinNumberOfRepeatingToShowAndRepeatMinZero,
  formDefWithOptionalGroupWithLongitudeAndLatitudeNumberVars,
  formDefWithOptionalGroupWithLongitudeAndLatitudeTextVars,
  formDefWithOptionalGroupWithMixOptionalAndRequiredTextVars,
  formDefWithOptionalGroupWithNestedOptionalGroupWithTextVar,
  formDefWithOptionalGroupWithRequiredGroupWithRequiredVars,
  formDefWithOptionalGroupWithRequiredNumberVar,
  formDefWithOptionalGroupWithRequiredRecordLink,
  formDefWithOptionalGroupWithRequiredTextVar,
  formDefWithOptionalGroupWithTwoCollectionVars,
  formDefWithTextVar,
  formDefWithTextVarAndNestedGroupsWithOneTextVar,
  formDefWithTwoTextVariableHavingFinalValue,
  formDefWithWithOptionalGroupWithRequiredVar,
} from '@/__mocks__/data/formDef';
import type { RecordFormProps } from '@/components/Form/RecordForm';
import { RecordForm } from '@/components/Form/RecordForm';
import { createRemixStub } from '@remix-run/testing';
import type { BFFDataRecord } from '@/types/record';

const actionSpy = vi.fn();

const RecordFormWithRemixStub = ({ formSchema, record }: RecordFormProps) => {
  const RemixStub = createRemixStub([
    {
      path: '/',
      Component: () => (
        <RecordForm
          formSchema={formSchema}
          record={record}
        />
      ),
      action: actionSpy,
    },
  ]);

  return <RemixStub />;
};

describe('<Form />', () => {
  vi.mock('react-i18next', () => ({
    useTranslation: () => {
      return {
        t: (str: string) => str,
      };
    },
  }));

  describe('form', () => {
    it('renders a form from a given definition', () => {
      render(<RecordFormWithRemixStub formSchema={formDefWithTextVar} />);
      const inputElement = screen.getByPlaceholderText('someEmptyTextId');
      expect(inputElement).toBeInTheDocument();

      const inputNumberElement = screen.getByPlaceholderText(
        'someNumberPlaceholderTextId',
      );
      expect(inputNumberElement).toBeInTheDocument();

      const headerElement = screen.getByText(
        'presentationTypeTextCollectionVarDefText',
      );
      expect(headerElement).toBeInTheDocument();
    });

    it('renders a form from a given definition for a update definition with variables with same nameInData', () => {
      render(
        <RecordFormWithRemixStub
          record={{
            id: 'divaOutput:1729757581842184',
            recordType: 'divaOutput',
            validationType: 'nationalSubjectCategory',
            createdAt: '2024-09-09T08:29:02.073117Z',
            createdBy: '161616',
            updated: [
              {
                updateAt: '2024-09-09T08:29:02.073117Z',
                updatedBy: '161616',
              },
            ],
            userRights: ['read', 'update', 'index', 'delete'],
            data: {
              nationalSubjectCategory: {
                recordInfo: {
                  id: {
                    value: '12345',
                  },
                  validationType: {
                    value: 'record',
                  },
                  dataDivider: {
                    value: 'divaData',
                  },
                  type: [
                    {
                      value: 'record',
                    },
                  ],
                  createdBy: [
                    {
                      value: '161616',
                    },
                  ],
                  tsCreated: [
                    {
                      value: '2024-10-16T12:36:04.249992Z',
                    },
                  ],
                  updated: [
                    {
                      tsUpdated: {
                        value: '2024-10-16T12:36:04.249992Z',
                      },
                      updatedBy: {
                        value: '161616',
                      },
                    },
                  ],
                },
                subject_language_swe: {
                  value: 'Svensk Nationell ämneskategori',
                  _language: 'swe',
                },
                subject_language_eng: {
                  value: 'English National Subject Category',
                  _language: 'eng',
                },
                code: {
                  value: '1',
                },
              },
            },
          }}
          formSchema={{
            validationTypeId: 'nationalSubjectCategory',
            form: {
              name: 'nationalSubjectCategory',
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
                  name: 'recordInfo',
                  type: 'group',
                  mode: 'input',
                  tooltip: {
                    title:
                      'recordInfoNationalSubjectCategoryRecordTypeNewGroupText',
                    body: 'recordInfoNationalSubjectCategoryRecordTypeNewGroupDefText',
                  },
                  label:
                    'recordInfoNationalSubjectCategoryRecordTypeNewGroupText',
                  showLabel: false,
                  repeat: {
                    minNumberOfRepeatingToShow: 1,
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                  presentationStyle: '',
                  childStyle: [''],
                  gridColSpan: 12,
                },
                {
                  name: 'subject',
                  type: 'textVariable',
                  mode: 'input',
                  inputType: 'input',
                  tooltip: {
                    title: 'subjectSweTextVarText',
                    body: 'subjectSweTextVarDefText',
                  },
                  label: 'subjectSweTextVarText',
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
                      finalValue: 'swe',
                    },
                  ],
                  childStyle: [''],
                  gridColSpan: 12,
                },
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
                {
                  name: 'code',
                  type: 'textVariable',
                  mode: 'input',
                  inputType: 'input',
                  tooltip: {
                    title: 'codeTextVarText',
                    body: 'codeTextVarDefText',
                  },
                  label: 'codeTextVarText',
                  showLabel: true,
                  validation: {
                    type: 'regex',
                    pattern: '^[0-9]{1,5}$',
                  },
                  repeat: {
                    minNumberOfRepeatingToShow: 1,
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                  childStyle: [''],
                  gridColSpan: 12,
                },
                {
                  name: 'parent',
                  type: 'recordLink',
                  mode: 'input',
                  tooltip: {
                    title: 'parentNationalSubjectCategoryLinkText',
                    body: 'parentNationalSubjectCategoryLinkDefText',
                  },
                  label: 'parentNationalSubjectCategoryLinkText',
                  showLabel: true,
                  repeat: {
                    minNumberOfRepeatingToShow: 0,
                    repeatMin: 0,
                    repeatMax: 1,
                  },
                  childStyle: [''],
                  gridColSpan: 12,
                  recordLinkType: 'nationalSubjectCategory',
                  presentationRecordLinkId:
                    'parentNationalSubjectCategoryPLink',
                  search: 'nationalSubjectCategorySearch',
                },
              ],
              presentationStyle: '',
              childStyle: [''],
              gridColSpan: 12,
            },
          }}
        />,
      );
      const swedishElement = screen.getByDisplayValue(
        'Svensk Nationell ämneskategori',
      );
      expect(swedishElement).toBeInTheDocument();

      const englishElement = screen.getByDisplayValue(
        'English National Subject Category',
      );
      expect(englishElement).toBeInTheDocument();
    });

    it('renders a form from a given definition for a update definition with colVar with same nameInData', () => {
      render(
        <RecordFormWithRemixStub
          record={{
            id: 'divaOutput:1729757581842184',
            recordType: 'divaOutput',
            validationType: 'nationalSubjectCategory',
            createdAt: '2024-09-09T08:29:02.073117Z',
            createdBy: '161616',
            updated: [
              {
                updateAt: '2024-09-09T08:29:02.073117Z',
                updatedBy: '161616',
              },
            ],
            userRights: ['read', 'update', 'index', 'delete'],
            data: {
              nationalSubjectCategory: {
                recordInfo: {
                  id: {
                    value: '12345',
                  },
                  validationType: {
                    value: 'record',
                  },
                  dataDivider: {
                    value: 'divaData',
                  },
                  type: [
                    {
                      value: 'record',
                    },
                  ],
                  createdBy: [
                    {
                      value: '161616',
                    },
                  ],
                  tsCreated: [
                    {
                      value: '2024-10-16T12:36:04.249992Z',
                    },
                  ],
                  updated: [
                    {
                      tsUpdated: {
                        value: '2024-10-16T12:36:04.249992Z',
                      },
                      updatedBy: {
                        value: '161616',
                      },
                    },
                  ],
                },
                genre_type_code: {
                  value: 'artistic-work_original-creative-work',
                  _type: 'code',
                },
                genre_type_contentType: {
                  value: 'artistic-work_artistic-thesis',
                  _type: 'contentType',
                },
              },
            },
          }}
          formSchema={formDefCollVarsWithSameNameInData}
        />,
      );

      screen.logTestingPlaygroundURL();
      const thesisElement = screen.getByDisplayValue(
        'artistic-work_artistic-thesis',
      );
      expect(thesisElement).toBeInTheDocument();

      const creativeElement = screen.getByDisplayValue(
        'artistic-work_original-creative-work',
      );
      expect(creativeElement).toBeInTheDocument();
    });

    it('renders a form from a given definition does validate it', async () => {
      const user = userEvent.setup();
      render(
        <RecordFormWithRemixStub formSchema={formDefWithOneTextVariable} />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const inputElement = screen.getByPlaceholderText('someEmptyTextId');

      expect(inputElement).toBeInTheDocument();

      await user.type(inputElement, 'a');
      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(1);
    });

    it('renders a form from a given definition does NOT validate it', async () => {
      const { container } = render(
        <RecordFormWithRemixStub formSchema={formDefWithOneTextVariable} />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const inputElement = screen.getByPlaceholderText('someEmptyTextId');

      expect(inputElement).toBeInTheDocument();

      const user = userEvent.setup();
      await user.click(submitButton);

      expect(
        container.getElementsByClassName('Mui-error').length,
      ).toBeGreaterThan(0);
      expect(actionSpy).toHaveBeenCalledTimes(0);
    });

    it('renders a form from a given definition with groups with same nameInData and does NOT validate it', async () => {
      const { container } = render(
        <RecordFormWithRemixStub formSchema={formDefTitleInfoGroup} />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const inputElement = screen.getByPlaceholderText('titleInfoVarText1');

      expect(inputElement).toBeInTheDocument();

      const user = userEvent.setup();
      await user.click(submitButton);

      expect(
        container.getElementsByClassName('Mui-error').length,
      ).toBeGreaterThan(0);
      expect(actionSpy).toHaveBeenCalledTimes(0);
    });

    it('renders a form from a given definition for variables with same nameInData and validates it', async () => {
      render(
        <RecordFormWithRemixStub
          formSchema={formDefTextVarsWithSameNameInData}
        />,
      );
      const user = userEvent.setup();

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const sweElement = screen.getByPlaceholderText('subjectSweTextVarText');
      expect(sweElement).toBeInTheDocument();
      await user.type(sweElement, 'svenska');

      const engElement = screen.getByPlaceholderText('subjectEngTextVarText');
      expect(engElement).toBeInTheDocument();
      await user.type(engElement, 'english');

      await user.click(submitButton);
      expect(actionSpy).toHaveBeenCalledTimes(1);
    });

    it('renders a form from a given definition for collectionVariables with same nameInData and validates it', async () => {
      render(
        <RecordFormWithRemixStub
          formSchema={formDefCollVarsWithSameNameInData}
        />,
      );
      const user = userEvent.setup();

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const collections = screen.getAllByRole('combobox');
      expect(collections).toHaveLength(2);
      const firstCollection = collections[0];
      await user.click(firstCollection);
      const firstItems = screen.getByRole('listbox');
      expect(firstItems.children).toHaveLength(3);
      await user.selectOptions(
        firstItems,
        'artisticWorkOriginalCreativeWorkItemText',
      );
      const secondCollection = collections[1];
      await user.click(secondCollection);
      const secondItems = screen.getByRole('listbox');
      expect(secondItems.children).toHaveLength(3);
      await user.selectOptions(
        secondItems,
        'artisticWorkArtisticThesisItemText',
      );
      await user.click(submitButton);
      expect(actionSpy).toHaveBeenCalledTimes(1);
    });

    it('renders a form from a given definition for a update definition with group with same nameInData', () => {
      render(
        <RecordFormWithRemixStub
          record={{
            id: 'divaOutput:1729757581842184',
            recordType: 'divaOutput',
            validationType: 'nationalSubjectCategory',
            createdAt: '2024-09-09T08:29:02.073117Z',
            createdBy: '161616',
            updated: [
              {
                updateAt: '2024-09-09T08:29:02.073117Z',
                updatedBy: '161616',
              },
            ],
            userRights: ['read', 'update', 'index', 'delete'],
            data: {
              someRootNameInData: {
                recordInfo: {
                  id: {
                    value: '12345',
                  },
                  validationType: {
                    value: 'record',
                  },
                  dataDivider: {
                    value: 'divaData',
                  },
                  type: [
                    {
                      value: 'record',
                    },
                  ],
                  createdBy: [
                    {
                      value: '161616',
                    },
                  ],
                  tsCreated: [
                    {
                      value: '2024-10-16T12:36:04.249992Z',
                    },
                  ],
                  updated: [
                    {
                      tsUpdated: {
                        value: '2024-10-16T12:36:04.249992Z',
                      },
                      updatedBy: {
                        value: '161616',
                      },
                    },
                  ],
                },
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
            },
          }}
          formSchema={{
            validationTypeId: 'nationalSubjectCategory',
            form: {
              mode: 'input',
              type: 'group',
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
              showLabel: true,
              components: [
                {
                  name: 'recordInfo',
                  type: 'group',
                  mode: 'input',
                  tooltip: {
                    title:
                      'recordInfoNationalSubjectCategoryRecordTypeNewGroupText',
                    body: 'recordInfoNationalSubjectCategoryRecordTypeNewGroupDefText',
                  },
                  label:
                    'recordInfoNationalSubjectCategoryRecordTypeNewGroupText',
                  showLabel: false,
                  repeat: {
                    minNumberOfRepeatingToShow: 1,
                    repeatMin: 1,
                    repeatMax: 1,
                  },
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
              presentationStyle: '',
              childStyle: [''],
              gridColSpan: 12,
            },
          }}
        />,
      );
      const egilElement = screen.getByDisplayValue('Egil');
      expect(egilElement).toBeInTheDocument();
      const swenningElement = screen.getByDisplayValue('Swenning');
      expect(swenningElement).toBeInTheDocument();
      const danielElement = screen.getByDisplayValue('Daniel');
      expect(danielElement).toBeInTheDocument();
      const floresElement = screen.getByDisplayValue('Flores');
      expect(floresElement).toBeInTheDocument();
    });
  });

  describe('recordLink', () => {
    it('renders a recordLink 0-1 and minNumberToShow 1 and validates it', async () => {
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneRecordLinkBeingOptional}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const user = userEvent.setup();
      await user.click(submitButton);
      expect(actionSpy).toHaveBeenCalledTimes(1);
    });

    it('renders a recordLink 1-1 and does NOT validates it', async () => {
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneRecordLinkBeingRequired}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const user = userEvent.setup();
      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('textVariable', () => {
    it('renders a textVariable 1-1 and does NOT validate it', async () => {
      render(<RecordFormWithRemixStub formSchema={formDefWithTextVar} />);
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });
      const inputElement = screen.getByPlaceholderText('someEmptyTextId');

      const user = userEvent.setup();
      await user.type(inputElement, 'does not validate');
      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(0);
    });

    it('renders a multiple textVariables 1-1 with finalValue ', async () => {
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithTwoTextVariableHavingFinalValue}
        />,
      );
      const inputElement = screen.getByPlaceholderText('someEmptyTextId1');
      expect(inputElement).toHaveValue('someFinalValue1');
      const inputElement2 = screen.getByPlaceholderText('someEmptyTextId2');
      expect(inputElement2).toHaveValue('someFinalValue2');

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const user = userEvent.setup();

      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(1);
    });

    it('renders a textVariable 1-1 with mode output', async () => {
      const record: BFFDataRecord = {
        id: 'divaOutput:519333261463755',
        recordType: 'divaOutput',
        validationType: 'someValidationTypeId',
        createdAt: '2023-10-11T09:24:30.511487Z',
        createdBy: 'coraUser:490742519075086',
        userRights: ['read', 'update', 'index', 'delete'],
        updated: [],
        data: {
          someRootNameInData: {
            recordInfo: {
              id: {
                value: '12345',
              },

              validationType: {
                value: 'record',
              },
              dataDivider: {
                value: 'divaData',
              },
              type: [
                {
                  value: 'record',
                },
              ],
              createdBy: [
                {
                  value: '161616',
                },
              ],
              tsCreated: [
                {
                  value: '2024-10-16T12:36:04.249992Z',
                },
              ],
              updated: [
                {
                  tsUpdated: {
                    value: '2024-10-16T12:36:04.249992Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
              ],
            },
            exampleTextVar: {
              value: 'someTestText',
            },
          },
        },
      };
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneRepeatingTextVariableWithModeOutput}
          record={record}
        />,
      );
      const inputElement = screen.getByText('someTestText');
      expect(inputElement).toBeInTheDocument();
    });

    it('does not render a textVariable 1-1 with mode output with no data', async () => {
      const record: BFFDataRecord = {
        id: 'divaOutput:519333261463755',
        recordType: 'divaOutput',
        validationType: 'someValidationTypeId',
        createdAt: '2023-10-11T09:24:30.511487Z',
        createdBy: 'coraUser:490742519075086',
        userRights: ['read', 'update', 'index', 'delete'],
        updated: [],
        data: {
          someRootNameInData: {
            recordInfo: {
              id: {
                value: '12345',
              },
              validationType: {
                value: 'record',
              },
              dataDivider: {
                value: 'divaData',
              },
              type: [
                {
                  value: 'record',
                },
              ],
              createdBy: [
                {
                  value: '161616',
                },
              ],
              tsCreated: [
                {
                  value: '2024-10-16T12:36:04.249992Z',
                },
              ],
              updated: [
                {
                  tsUpdated: {
                    value: '2024-10-16T12:36:04.249992Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
              ],
            },
            exampleWrongTextVar: {
              value: 'someTestText',
            },
          },
        },
      };
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneRepeatingTextVariableWithModeOutput}
          record={record}
        />,
      );
      const label = screen.queryByLabelText('exampleWrongTextVar');
      const inputElement = screen.queryByText('someTestText');
      expect(label).not.toBeInTheDocument();
      expect(inputElement).not.toBeInTheDocument();
    });

    it('renders a textVariable 0-1 and minNumberOfRepeatingToShow 1', async () => {
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneTextVariableBeingOptional}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const user = userEvent.setup();
      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(1);
    });

    test('renders a textVariable 0-2 and minNumberOfRepeatingToShow 1', async () => {
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneTextVariableBeingRepeating}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const user = userEvent.setup();
      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(1);
    });

    it('renders a textVariable 0-1, minNumberToShow 1 and bad input', async () => {
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneTextVariableBeingOptional}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const inputElement = screen.getByPlaceholderText('someEmptyTextId');

      const user = userEvent.setup();
      await user.type(inputElement, '????'); // enter some invalid text
      await user.click(submitButton);

      await waitFor(() => {
        expect(actionSpy).toHaveBeenCalledTimes(0);
      });
    });

    it('renders a textVariable 0-1 as password', async () => {
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneTextVariableBeingPassword}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const inputElement = screen.getByPlaceholderText(
        'loginPasswordTextVarText',
      );

      const user = userEvent.setup();
      await user.type(inputElement, 'password');
      expect(inputElement).toHaveAttribute('type', 'password');
      await user.click(submitButton);

      await waitFor(() => {
        expect(actionSpy).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('numberVariable', () => {
    it('renders a numberVariable 1-1 and does NOT validate it', async () => {
      render(
        <RecordFormWithRemixStub formSchema={formDefWithOneNumberVariable} />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const inputNumberElement = screen.getByPlaceholderText(
        'someNumberPlaceholderTextId',
      );

      const user = userEvent.setup();
      await user.type(inputNumberElement, 'does not validate');
      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(0);
    });

    it('renders a numberVariable with mode output', async () => {
      const record: BFFDataRecord = {
        id: 'divaOutput:519333261463755',
        recordType: 'divaOutput',
        validationType: 'someValidationTypeId',
        createdAt: '2023-10-11T09:24:30.511487Z',
        createdBy: 'coraUser:490742519075086',
        userRights: ['read', 'update', 'index', 'delete'],
        updated: [],
        data: {
          someRootNameInData: {
            recordInfo: {
              id: {
                value: '12345',
              },
              validationType: {
                value: 'record',
              },
              dataDivider: {
                value: 'divaData',
              },
              type: [
                {
                  value: 'record',
                },
              ],
              createdBy: [
                {
                  value: '161616',
                },
              ],
              tsCreated: [
                {
                  value: '2024-10-16T12:36:04.249992Z',
                },
              ],
              updated: [
                {
                  tsUpdated: {
                    value: '2024-10-16T12:36:04.249992Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
              ],
            },
            someNumberVariableNameInData: {
              value: '2',
            },
          },
        },
      };
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneNumberVariableModeOutput}
          record={record}
        />,
      );
      const inputElement = screen.getByText('2');
      expect(inputElement).toBeInTheDocument();
    });

    it('does not render a numberVariable 1-1 with mode output with no data', async () => {
      const record: BFFDataRecord = {
        id: 'divaOutput:519333261463755',
        recordType: 'divaOutput',
        validationType: 'someValidationTypeId',
        createdAt: '2023-10-11T09:24:30.511487Z',
        createdBy: 'coraUser:490742519075086',
        userRights: ['read', 'update', 'index', 'delete'],
        updated: [],
        data: {
          someRootNameInData: {
            recordInfo: {
              id: {
                value: '12345',
              },
              validationType: {
                value: 'record',
              },
              dataDivider: {
                value: 'divaData',
              },
              type: [
                {
                  value: 'record',
                },
              ],
              createdBy: [
                {
                  value: '161616',
                },
              ],
              tsCreated: [
                {
                  value: '2024-10-16T12:36:04.249992Z',
                },
              ],
              updated: [
                {
                  tsUpdated: {
                    value: '2024-10-16T12:36:04.249992Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
              ],
            },
            someOtherNumberVariableNameInData: {
              value: 'someTestText',
            },
          },
        },
      };
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneNumberVariableBeingOptionalOutput}
          record={record}
        />,
      );
      const label = screen.queryByPlaceholderText(
        'someNumberPlaceholderTextId',
      );
      const inputElement = screen.queryByText('12');
      expect(label).not.toBeInTheDocument();
      expect(inputElement).not.toBeInTheDocument();
    });

    it('renders a numberVariable 1-1 with input under min', async () => {
      render(
        <RecordFormWithRemixStub formSchema={formDefWithOneNumberVariable} />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const inputNumberElement = screen.getByPlaceholderText(
        'someNumberPlaceholderTextId',
      );

      const user = userEvent.setup();
      await user.type(inputNumberElement, '0');
      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(0);
    });

    it('renders a numberVariable 1-1 with input over max', async () => {
      render(
        <RecordFormWithRemixStub formSchema={formDefWithOneNumberVariable} />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const inputNumberElement = screen.getByPlaceholderText(
        'someNumberPlaceholderTextId',
      );

      const user = userEvent.setup();
      await user.type(inputNumberElement, '21');
      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(0);
    });

    it('renders a numberVariable 0-1 and does NOT validate text', async () => {
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneNumberVariableBeingOptional}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const inputNumberElement = screen.getByPlaceholderText(
        'someNumberPlaceholderTextId',
      );

      expect(inputNumberElement).toBeInTheDocument();

      const user = userEvent.setup();
      await user.type(inputNumberElement, 'aaa');
      await user.click(submitButton);

      await waitFor(() => {
        expect(actionSpy).toHaveBeenCalledTimes(0);
        expect((inputNumberElement as HTMLInputElement).value).toBe('aaa');
      });
    });

    it('renders a numberVariable 1-1 with numberOfDecimals 2 and does NOT validate', async () => {
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneNumberVariableHavingDecimals}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const inputNumberElement = screen.getByPlaceholderText(
        'someNumberPlaceholderTextId',
      );

      const user = userEvent.setup();
      await user.type(inputNumberElement, '12.0123');
      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(0);
    });

    it('renders a numberVariable 1-1 with numberOfDecimals 2 and does validate', async () => {
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneNumberVariableHavingDecimals}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const inputNumberElement = screen.getByPlaceholderText(
        'someNumberPlaceholderTextId',
      );

      const user = userEvent.setup();
      await user.type(inputNumberElement, '12.00');
      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(1);
    });

    it('renders a numberVariable 0-1 with minNumberOfRepeatingToShow 1 with no input and does validate', async () => {
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneNumberVariableBeingOptional}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const user = userEvent.setup();
      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(1);
    });

    it('renders a numberVariable 0-1 with minNumberOfRepeatingToShow 1 and does validate', async () => {
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneNumberVariableBeingOptional}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const inputElement = screen.getByPlaceholderText(
        'someNumberPlaceholderTextId',
      );
      expect(inputElement).toBeInTheDocument();

      const user = userEvent.setup();
      await user.type(inputElement, '10');
      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('minNumberOfRepeatingToShow', () => {
    it('renders a textVariable 2-3 should render 2 based on minNumberOfRepeatingToShow', () => {
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneTextVariableWithMinNumberOfRepeatingToShow}
        />,
      );

      const inputElements = screen.getAllByPlaceholderText('someEmptyTextId');
      expect(inputElements).toHaveLength(2);
    });
  });

  describe('repeatMax', () => {
    it('should NOT render add button when repeatMax is reached', async () => {
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneTextVariableWithMinNumberOfRepeatingToShow}
        />,
      );

      const buttonElement = screen.getByRole('button', {
        name: 'someNameInDataLabel',
      });

      const inputElements = screen.getAllByPlaceholderText('someEmptyTextId');
      expect(inputElements).toHaveLength(2);

      const user = userEvent.setup();
      await user.click(buttonElement);

      const inputElements2 = screen.getAllByPlaceholderText('someEmptyTextId');
      expect(inputElements2).toHaveLength(3);

      expect(buttonElement).not.toBeInTheDocument();
    });

    it('should NOT render move buttons when repeatMax is less or equal to one', async () => {
      render(
        <RecordFormWithRemixStub
          formSchema={
            formDefWithOneTextVariableWithMinNumberOfRepeatingToShowAndRepeatMinZero
          }
        />,
      );

      const removeButtonElement = screen.queryByLabelText('delete');
      expect(removeButtonElement).toBeInTheDocument();

      const moveUpButtonElement = screen.queryByLabelText('up');
      expect(moveUpButtonElement).not.toBeInTheDocument();

      const moveDownButtonElement = screen.queryByLabelText('down');
      expect(moveDownButtonElement).not.toBeInTheDocument();
    });
  });

  describe('repeatMin', () => {
    it('Remove buttons should be disabled when repeatMin is reached', async () => {
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneTextVariableWithMinNumberOfRepeatingToShow}
        />,
      );

      const removeButtonElements = screen.getAllByLabelText('delete');

      expect(removeButtonElements).toHaveLength(2);
      expect(removeButtonElements[0]).toBeDisabled();
      expect(removeButtonElements[1]).toBeDisabled();
    });

    it('Remove button should be visible when repeatMin is zero and minNumberOfRepeatingToShow is 1', async () => {
      render(
        <RecordFormWithRemixStub
          formSchema={
            formDefWithOneTextVariableWithMinNumberOfRepeatingToShowAndRepeatMinZero
          }
        />,
      );

      const removeButtonElements = screen.getAllByLabelText('delete');

      expect(removeButtonElements).toHaveLength(1);
      expect(removeButtonElements[0]).toBeEnabled();
    });
  });

  describe('collectionVariable', () => {
    it('renders a collectionVariable 1-1 and its options', async () => {
      const { container } = render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneCollectionVariable}
        />,
      );

      const selectInputs = container.getElementsByClassName(
        'MuiSelect-nativeInput',
      );

      expect(selectInputs).toHaveLength(1);
    });

    it('renders a collectionVariable 1-1 and does validate it', async () => {
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneCollectionVariable}
        />,
      );

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const expandButton = screen.getByRole('combobox', { expanded: false });
      expect(expandButton).toBeInTheDocument();

      const user = userEvent.setup();
      await user.click(expandButton);
      const items = screen.getByRole('listbox');
      expect(items.children).toHaveLength(4); // includes None option

      await user.selectOptions(items, 'exampleBlueItemText');
      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(1);
    });

    it('renders a collectionVariable 1-1 and does NOT validate it', async () => {
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneCollectionVariable}
        />,
      );

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const user = userEvent.setup();
      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(0);
    });

    it('renders a collectionVariable 1-1 with mode output', async () => {
      const record: BFFDataRecord = {
        id: 'divaOutput:519333261463755',
        recordType: 'divaOutput',
        validationType: 'someValidationTypeId',
        createdAt: '2023-10-11T09:24:30.511487Z',
        createdBy: 'coraUser:490742519075086',
        userRights: ['read', 'update', 'index', 'delete'],
        updated: [],
        data: {
          someRootNameInData: {
            recordInfo: {
              id: {
                value: '12345',
              },
              validationType: {
                value: 'record',
              },
              dataDivider: {
                value: 'divaData',
              },
              type: [
                {
                  value: 'record',
                },
              ],
              createdBy: [
                {
                  value: '161616',
                },
              ],
              tsCreated: [
                {
                  value: '2024-10-16T12:36:04.249992Z',
                },
              ],
              updated: [
                {
                  tsUpdated: {
                    value: '2024-10-16T12:36:04.249992Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
              ],
            },
            colour: {
              value: 'blue',
            },
          },
        },
      };
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneCollectionVariableWithModeOutput}
          record={record}
        />,
      );
      const inputElement = screen.getByText('exampleBlueItemText');
      expect(inputElement.tagName).toBe('SPAN');
    });

    it('does not render a collectionVariable 1-1 with mode output without data', async () => {
      const record: BFFDataRecord = {
        id: 'divaOutput:519333261463755',
        recordType: 'divaOutput',
        validationType: 'someValidationTypeId',
        createdAt: '2023-10-11T09:24:30.511487Z',
        createdBy: 'coraUser:490742519075086',
        userRights: ['read', 'update', 'index', 'delete'],
        updated: [],
        data: {
          someRootNameInData: {
            recordInfo: {
              id: {
                value: '12345',
              },

              validationType: {
                value: 'record',
              },
              dataDivider: {
                value: 'divaData',
              },
              type: [
                {
                  value: 'record',
                },
              ],
              createdBy: [
                {
                  value: '161616',
                },
              ],
              tsCreated: [
                {
                  value: '2024-10-16T12:36:04.249992Z',
                },
              ],
              updated: [
                {
                  tsUpdated: {
                    value: '2024-10-16T12:36:04.249992Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
              ],
            },
            colour: {
              value: 'blue',
            },
          },
        },
      };
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneCollectionVariableWithModeOutput}
          record={record}
        />,
      );
      const inputElement = screen.getByText('exampleBlueItemText');
      expect(inputElement.tagName).toBe('SPAN');
    });
  });

  describe('attribute collection', () => {
    it('renders a numberVariable 1-1 with attribute and does NOT validate it when skipped', async () => {
      const user = userEvent.setup();
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneNumberVariableWithAttributeCollection}
        />,
      );

      const numberInput = screen.getByPlaceholderText('someEmptyTextId');

      const attributeSelect = screen.getByRole('combobox', {
        name: 'attribute colour:',
      });
      expect(within(attributeSelect).getAllByRole('option')).toHaveLength(4);

      await user.type(numberInput, '12');

      await user.selectOptions(attributeSelect, 'emptyTextId');

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });
      await waitFor(() => {});
      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(0);
    });

    it('renders a numberVariable 1-1 with attribute and validates it when filled', async () => {
      const user = userEvent.setup();
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneNumberVariableWithAttributeCollection}
        />,
      );

      const numberInput = screen.getByPlaceholderText('someEmptyTextId');
      expect(numberInput).toBeInTheDocument();

      const attributeSelect = screen.getByRole('combobox', {
        name: 'attribute colour:',
      });
      expect(attributeSelect).toBeInTheDocument();

      await user.type(numberInput, '12');

      expect(within(attributeSelect).getAllByRole('option')).toHaveLength(4);
      await user.selectOptions(attributeSelect, 'exampleBlueItemText');

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });
      await waitFor(() => {});
      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(1);
    });

    it('renders a numberVariable 0-1 with attribute and validates it when skipped', async () => {
      const user = userEvent.setup();
      render(
        <RecordFormWithRemixStub
          formSchema={
            formDefWithOneOptionalNumberVariableWithAttributeCollection
          }
        />,
      );

      const numberInput = screen.getByPlaceholderText(
        'someNumberVar2IdPlaceholder',
      );
      expect(numberInput).toBeInTheDocument();
      const attributeSelect = screen.getByRole('combobox', {
        name: 'someNumberVar2AttributeLabel:',
      });

      expect(within(attributeSelect).getAllByRole('option')).toHaveLength(4);

      await user.selectOptions(attributeSelect, 'exampleBlueItemText');

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });
      await waitFor(() => {});
      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(1);
    });

    it('renders a numberVariable 1-1 and attribute and does NOT validate it when only attribute is picked', async () => {
      const user = userEvent.setup();
      render(
        <RecordFormWithRemixStub
          formSchema={
            formDefWithOneRequiredNumberVariableWithAttributeCollection
          }
        />,
      );

      screen.getByPlaceholderText('someNumberVar2IdPlaceholder');

      const attributeSelect = screen.getByRole('combobox', {
        name: 'someNumberVar2AttributeLabel:',
      });

      expect(within(attributeSelect).getAllByRole('option')).toHaveLength(4);

      await user.selectOptions(attributeSelect, 'exampleBlueItemText');

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });
      await waitFor(() => {});
      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(0);
    });

    it('renders a numberVariable 0-1 and attribute and does NOT validates it when variable is written in', async () => {
      const user = userEvent.setup();
      render(
        <RecordFormWithRemixStub
          formSchema={
            formDefWithOneOptionalNumberVariableWithAttributeCollection
          }
        />,
      );

      const numberInput = screen.getByPlaceholderText(
        'someNumberVar2IdPlaceholder',
      );

      screen.getByRole('combobox', { name: 'someNumberVar2AttributeLabel:' });

      await user.type(numberInput, '12');

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });
      await waitFor(() => {});
      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(0);
    });

    it('renders a numberVariable 1-1 and a numberVariable 0-1 with attribute and validates it', async () => {
      const user = userEvent.setup();
      render(
        <RecordFormWithRemixStub
          formSchema={
            formDefWithOneNumberVariableAndOptionalNumberVariableWithAttributeCollection
          }
        />,
      );
      const numberInput = screen.getByPlaceholderText(
        'someNumberVarIdPlaceholder',
      );
      screen.getByPlaceholderText('someNumberVar2IdPlaceholder');
      screen.getByRole('combobox', {
        name: 'someNumberVar2AttributeLabel:',
      });

      await user.type(numberInput, '2');

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });
      await waitFor(() => {});
      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(1);
    });

    it('renders a group 0-1 with attribute and textVariable 1-1 and validates it', async () => {
      const user = userEvent.setup();
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneOptionalGroupWithAttributeCollection}
        />,
      );
      screen.getByPlaceholderText('mainTitleTextVarPlaceholderText');

      screen.getByRole('combobox', {
        name: 'languageCollectionVarText:',
      });

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });
      await waitFor(() => {});
      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(1);
    });

    it('renders a group 1-1 with a textVariable 1-1 and attribute and validates it', async () => {
      const user = userEvent.setup();
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneRequiredGroupWithAttributeCollection}
        />,
      );
      const textInput = screen.getByPlaceholderText(
        'mainTitleTextVarPlaceholderText',
      );

      const attributeSelect = screen.getByRole('combobox', {
        name: 'languageCollectionVarText:',
      });

      expect(within(attributeSelect).getAllByRole('option')).toHaveLength(2); // includes None option

      await user.selectOptions(attributeSelect, 'aarLangItemText');
      await user.type(textInput, 'aaaa');

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });
      await waitFor(() => {});

      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(1);
    });

    it('renders a group 0-1 with a group 1-1 having textVars 1-1 an validates it', async () => {
      const user = userEvent.setup();
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOptionalGroupWithRequiredGroupWithRequiredVars}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const mainTitleElement = screen.getByPlaceholderText(
        'mainTitleTextVarText',
      );
      const subtitleElement = screen.getByPlaceholderText(
        'subtitleTextVarText',
      );

      expect(mainTitleElement).toBeInTheDocument();
      expect(subtitleElement).toBeInTheDocument();

      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(1);
    });

    it('renders a group having 0-1 with a group having 1-1 having textVars having 1-1 and does NOT validate it', async () => {
      const user = userEvent.setup();
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOptionalGroupWithRequiredGroupWithRequiredVars}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const mainTitleElement = screen.getByPlaceholderText(
        'mainTitleTextVarText',
      );
      screen.getByPlaceholderText('subtitleTextVarText');

      await user.type(mainTitleElement, '1.25');
      await user.click(submitButton);

      const attributeSelect = screen.getByRole('combobox', {
        name: 'languageCollectionVarText:',
      });
      expect(attributeSelect).toBeInvalid();
      expect(actionSpy).toHaveBeenCalledTimes(0);
    });

    it('renders a group 0-1 with attribute and with a textVariable 0-1 and attribute and validates it', async () => {
      const user = userEvent.setup();
      render(
        <RecordFormWithRemixStub
          formSchema={
            formDefWithOneOptionalGroupWithAttributeCollectionAndTextVarWithAttribute
          }
        />,
      );
      screen.getByRole('combobox', {
        name: 'someTitleGroupText:',
      });

      screen.getByRole('combobox', {
        name: 'Eye colour:',
      });

      screen.getByPlaceholderText('mainTitleTextVarPlaceholderText');

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });
      await waitFor(() => {});
      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(1);
    });

    it('renders a optional group with multiple attributes and with a required textVariable and attribute and validates it', async () => {
      const user = userEvent.setup();
      render(
        <RecordFormWithRemixStub
          formSchema={
            formDefWithOneOptionalGroupWithTextVariableAndAttributeCollection
          }
        />,
      );

      screen.getByRole('combobox', {
        name: 'languageCollectionVarText:',
      });

      screen.getByRole('combobox', {
        name: 'titleTypeCollectionVarText:',
      });

      const textInput = screen.getByPlaceholderText('givenNameTextVarText');
      const languageAttribute = screen.getByRole('combobox', {
        name: 'languageCollectionVarText:',
      });
      const titleTypeAttribute = screen.getByRole('combobox', {
        name: 'titleTypeCollectionVarText:',
      });

      await user.click(textInput);
      await user.type(textInput, 'someAlternativeTitle');

      await user.selectOptions(languageAttribute, 'aarLangItemText');

      await user.selectOptions(titleTypeAttribute, 'alternativeTitleItemText');

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(1);
    });

    it('renders a optional group with attribute with a optional group and with a required textVariable and attribute and validates it', async () => {
      const user = userEvent.setup();
      render(
        <RecordFormWithRemixStub
          formSchema={
            formDefWithOneOptionalGroupWithOneOptionalGroupWithTextVariableAndAttributeCollection
          }
        />,
      );
      const languageAttribute = screen.getByRole('combobox', {
        name: 'languageCollectionVarText:',
      });
      const titleTypeAttribute = screen.getByRole('combobox', {
        name: 'titleTypeCollectionVarText:',
      });

      const textInput = screen.getByPlaceholderText(
        'mainTitleTextVarPlaceholderText',
      );

      await user.type(textInput, 'someAlternativeTitle');

      await user.selectOptions(languageAttribute, 'aarLangItemText');
      await user.selectOptions(titleTypeAttribute, 'alternativeTitleItemText');

      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('group', () => {
    it('renders a group 1-1 with textVariable 1-1 child', async () => {
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneGroupHavingTextVariableAsChild}
        />,
      );

      const textInput = screen.getByPlaceholderText('someEmptyTextId');
      expect(textInput).toBeInTheDocument();
    });

    it('renders a group 1-10 and headlineLevel 1', async () => {
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithGroupWithSpecifiedHeadlineLevel}
        />,
      );

      const headlineElement = screen.getByRole('heading', {
        name: 'someRootFormGroupText',
        level: 1,
      });
      expect(headlineElement).toBeInTheDocument();
    });

    it('renders a group 1-10 and headlineLevel 3', async () => {
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithGroupWithSpecifiedHeadlineLevel}
        />,
      );

      const headlineElement = screen.getByRole('heading', {
        name: 'author',
        level: 3,
      });
      expect(headlineElement).toBeInTheDocument();
    });

    it('renders a group 1-10 and headlineLevel default', async () => {
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithGroupWithDefaultHeadlineLevel}
        />,
      );

      const headlineElement = screen.getByRole('heading', {
        name: 'author',
        level: 2,
      });
      expect(headlineElement).toBeInTheDocument();
    });

    it('renders a group 0-1 and textVariable 1-1 and validates it', async () => {
      const user = userEvent.setup();
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOptionalGroupWithRequiredTextVar}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(1);
    });

    it('renders a group group 0-1 and numberVariable being 1-1 and validates it', async () => {
      const user = userEvent.setup();
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOptionalGroupWithRequiredNumberVar}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(1);
    });

    it('renders a group 0-1 and recordLink being 1-1 and validates it', async () => {
      const user = userEvent.setup();
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOptionalGroupWithRequiredRecordLink}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(1);
    });

    it('renders a group 0-1 and namePart being 1-1 and shows a validation error', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <RecordFormWithRemixStub
          formSchema={formDefWithWithOptionalGroupWithRequiredVar}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const givenName = screen.getByPlaceholderText('namePartGivenTextVarText');

      await user.type(givenName, 'someGivenName');

      await user.click(submitButton);

      expect(
        container.getElementsByClassName('Mui-error').length,
      ).toBeGreaterThan(0);
      expect(actionSpy).toHaveBeenCalledTimes(0);
    });

    it('render a group 0-1 with a child group 1-X and textVar being 1-1 and validates it', async () => {
      const user = userEvent.setup();
      render(
        <RecordFormWithRemixStub
          formSchema={
            formDefWithOptionalGroupWithNestedOptionalGroupWithTextVar
          }
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(1);
    });

    it('render a group 1-1 and some sub groups 0-1 and does NOT validates it', async () => {
      const user = userEvent.setup();
      render(
        <RecordFormWithRemixStub
          formSchema={formDefContributorGroupWithAuthorGroupAuthor}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(0);
    });

    it('renders a group 1-1 and some textVars 0-1 and 1-1 and does NOT validates it', async () => {
      const user = userEvent.setup();
      render(
        <RecordFormWithRemixStub
          formSchema={
            formDefWithOptionalGroupWithMixOptionalAndRequiredTextVars
          }
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const inputNumberElement = screen.getByPlaceholderText(
        'someLongitudeTextId',
      );

      expect(inputNumberElement).toBeInTheDocument();

      await user.type(inputNumberElement, '1.23');
      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(0);
    });

    it('renders a group 1-1 and textVars 1-1 being partially filled and does NOT validate it', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOptionalGroupWithLongitudeAndLatitudeTextVars}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const inputNumberElement = screen.getByPlaceholderText(
        'someLongitudeTextId',
      );

      expect(inputNumberElement).toBeInTheDocument();

      await user.type(inputNumberElement, '1.23');
      await user.click(submitButton);

      expect(
        container.getElementsByClassName('Mui-error').length,
      ).toBeGreaterThan(0);
      expect(actionSpy).toHaveBeenCalledTimes(0);
    });

    it('renders a group 1-1 and numberVars 1-1 being partially filled and does NOT validate it', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <RecordFormWithRemixStub
          formSchema={
            formDefWithOptionalGroupWithLongitudeAndLatitudeNumberVars
          }
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const inputNumberElement = screen.getByPlaceholderText(
        'someLongitudeTextId',
      );

      expect(inputNumberElement).toBeInTheDocument();

      await user.type(inputNumberElement, '3');
      await user.click(submitButton);

      expect(
        container.getElementsByClassName('Mui-error').length,
      ).toBeGreaterThan(0);
      expect(actionSpy).toHaveBeenCalledTimes(0);
    });

    it('renders a group 1-1 and collectionVars being partially filled and does NOT validate it', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOptionalGroupWithTwoCollectionVars}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const expandButton = screen.getAllByRole('combobox', { expanded: false });
      // expect(expandButton).toBeInTheDocument();

      await user.click(expandButton[0]);
      const items = screen.getByRole('listbox');

      expect(items.children).toHaveLength(2); // includes None option

      await user.selectOptions(items, 'bthItemText');
      await user.click(submitButton);

      expect(
        container.getElementsByClassName('Mui-error').length,
      ).toBeGreaterThan(0);
      expect(actionSpy).toHaveBeenCalledTimes(0);
    });

    it('renders a group 0-1 with textVar having 1-1, a group having 1-1 with textVar 1-1 and does NOT validate it', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <RecordFormWithRemixStub
          formSchema={formDefWithTextVarAndNestedGroupsWithOneTextVar}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const inputNumberElement = screen.getByPlaceholderText(
        'someLongitudeTextId',
      );

      expect(inputNumberElement).toBeInTheDocument();

      await user.type(inputNumberElement, '3');
      await user.click(submitButton);

      expect(
        container.getElementsByClassName('Mui-error').length,
      ).toBeGreaterThan(0);
      expect(actionSpy).toHaveBeenCalledTimes(0);
    });

    it('renders a group 0-1 with nested textVars 1-1 and does validate it', async () => {
      const user = userEvent.setup();
      render(
        <RecordFormWithRemixStub
          formSchema={formDefTwoOptionalGroupsWithRequiredTextVars}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const longitudeElement = screen.getByPlaceholderText('longitude');
      const latitudeElement = screen.getByPlaceholderText('latitude');

      await user.type(longitudeElement, '1.25');
      await user.type(latitudeElement, '1.25');
      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(1);
    });

    it('renders a group 1-1 with same nameInData with nested textVars 1-1 and does validate it ', async () => {
      const user = userEvent.setup();
      render(
        <RecordFormWithRemixStub
          formSchema={
            formDefTwoOptionalGroupsSameNameInDataWithRequiredTextVars
          }
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const familyName1 = screen.getByPlaceholderText('familyNameTextVarText1');
      const givenName1 = screen.getByPlaceholderText('givenNameTextVarText1');
      const familyName2 = screen.getByPlaceholderText('familyNameTextVarText2');
      const givenName2 = screen.getByPlaceholderText('givenNameTextVarText2');

      await user.type(familyName1, 'Swenning');
      await user.type(givenName1, 'Egil');
      await user.type(familyName2, 'Flores');
      await user.type(givenName2, 'Daniel');
      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(1);
    });

    it('renders a group 0-1 with with nested textVars  1-1 with attributes for both and does validate it ', async () => {
      const user = userEvent.setup();
      render(
        <RecordFormWithRemixStub
          formSchema={
            formDefSubjectGroupOptionalWithAttributesAndTopicWithAttributes
          }
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(1);
    });

    it('renders a group 1-1 with with nested textVars 1-1 with attributes for both and does validate it ', async () => {
      const user = userEvent.setup();
      render(
        <RecordFormWithRemixStub
          formSchema={
            formDefSubjectGroupRequiredWithAttributesAndTopicWithAttributes
          }
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(0);
    });

    it('renders a group 1-1 with same nameInData with nested recordLinks 1-1 with attributes and does validate it ', async () => {
      const user = userEvent.setup();
      render(
        <RecordFormWithRemixStub
          formSchema={
            formDefNatSubGroupRequiredAndRecordLinksSameNameInDataWithAttributes
          }
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      await user.click(submitButton);

      expect(actionSpy).toHaveBeenCalledTimes(1);
    });

    it('renders a group 0-1 with nested textVars 1-1 with mode output with data', async () => {
      const record: BFFDataRecord = {
        id: 'divaOutput:8988822974651200',
        recordType: 'divaOutput',
        validationType: 'preprint',
        createdAt: '2024-08-12T12:07:41.366883Z',
        createdBy: '161616',
        updated: [
          {
            updateAt: '2024-08-12T12:07:41.366883Z',
            updatedBy: '161616',
          },
        ],
        userRights: ['read', 'update', 'index', 'delete'],
        data: {
          divaOutput: {
            recordInfo: {
              id: {
                value: '12345',
              },
              validationType: {
                value: 'record',
              },
              dataDivider: {
                value: 'divaData',
              },
              type: [
                {
                  value: 'record',
                },
              ],
              createdBy: [
                {
                  value: '161616',
                },
              ],
              tsCreated: [
                {
                  value: '2024-10-16T12:36:04.249992Z',
                },
              ],
              updated: [
                {
                  tsUpdated: {
                    value: '2024-10-16T12:36:04.249992Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
              ],
            },
            author: [
              {
                givenName: {
                  value: 'eeee',
                },
                familyName: {
                  value: 'ssss',
                },
              },
            ],
          },
        },
      };

      render(
        <RecordFormWithRemixStub
          formSchema={formDefPreprintWithOnlyAuthorName}
          record={record}
        />,
      );

      const givenName = screen.getByText('eeee');
      const familyName = screen.getByText('ssss');

      expect(givenName).toBeInTheDocument();
      expect(familyName).toBeInTheDocument();
    });
  });

  describe('guiElementLink', () => {
    it('renders a numberVariable 1-1 and guiElementLink', async () => {
      render(
        <RecordFormWithRemixStub
          formSchema={formDefWithOneNumberVariableAndGuiElementLink}
        />,
      );

      const link = screen.getByRole('link');

      expect(link).toHaveAttribute('href', 'http://www.google.se');
    });
  });

  describe('1-X', () => {
    describe('textVar', () => {
      it('renders a textVar 1-X with group 1-1 and does not validate it', async () => {
        const user = userEvent.setup();
        const { container } = render(
          <RecordFormWithRemixStub
            formSchema={formDefRequiredRepeatingTextVar}
          />,
        );

        const submitButton = screen.getByRole('button', {
          name: 'divaClient_SubmitButtonText',
        });

        await user.click(submitButton);

        expect(
          container.getElementsByClassName('Mui-error').length,
        ).toBeGreaterThan(0);
        expect(actionSpy).toHaveBeenCalledTimes(0);
      });

      it('renders a textVar 1-X with group 0-1 and does validate it', async () => {
        const user = userEvent.setup();
        render(
          <RecordFormWithRemixStub
            formSchema={formDefRequiredRepeatingText2Var}
          />,
        );

        const submitButton = screen.getByRole('button', {
          name: 'divaClient_SubmitButtonText',
        });

        await user.click(submitButton);

        expect(actionSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('numberVar', () => {
      it('renders a numberVar 1-X with group 1-1 and does not validate it', async () => {
        const user = userEvent.setup();
        const { container } = render(
          <RecordFormWithRemixStub
            formSchema={formDefRequiredRepeatingNumberVar}
          />,
        );

        const submitButton = screen.getByRole('button', {
          name: 'divaClient_SubmitButtonText',
        });

        await user.click(submitButton);

        expect(
          container.getElementsByClassName('Mui-error').length,
        ).toBeGreaterThan(0);
        expect(actionSpy).toHaveBeenCalledTimes(0);
      });

      it('renders a numberVar 1-X with group 0-1 and does validate it', async () => {
        const user = userEvent.setup();
        render(
          <RecordFormWithRemixStub
            formSchema={formDefRequiredRepeatingNumber2Var}
          />,
        );

        const submitButton = screen.getByRole('button', {
          name: 'divaClient_SubmitButtonText',
        });

        await user.click(submitButton);

        expect(actionSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('collection', () => {
      it('renders a collectionVariable 1-X with group 1-1 and does not validate it', async () => {
        const { container } = render(
          <RecordFormWithRemixStub
            formSchema={formDefRequiredRepeatingCollectionVar}
          />,
        );

        const submitButton = screen.getByRole('button', {
          name: 'divaClient_SubmitButtonText',
        });

        const user = userEvent.setup();

        await user.click(submitButton);

        expect(
          container.getElementsByClassName('Mui-error').length,
        ).toBeGreaterThan(0);
        expect(actionSpy).toHaveBeenCalledTimes(0);
      });

      it('renders a collectionVariable 1-X with group 0-1 and does validate it', async () => {
        render(
          <RecordFormWithRemixStub
            formSchema={formDefRequiredRepeatingCollection2Var}
          />,
        );

        const submitButton = screen.getByRole('button', {
          name: 'divaClient_SubmitButtonText',
        });

        const user = userEvent.setup();

        await user.click(submitButton);

        expect(actionSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe('checkIfComponentHasValue', () => {
    it('checkIfComponentHasValue does not hides variable in output with value', () => {
      const record: BFFDataRecord = {
        id: 'divaOutput:519333261463755',
        recordType: 'divaOutput',
        validationType: 'someValidationTypeId',
        createdAt: '2023-10-11T09:24:30.511487Z',
        createdBy: 'coraUser:490742519075086',
        userRights: ['read', 'update', 'index', 'delete'],
        updated: [],
        data: {
          someRootNameInData: {
            recordInfo: {
              id: {
                value: '12345',
              },

              validationType: {
                value: 'record',
              },
              dataDivider: {
                value: 'divaData',
              },
              type: [
                {
                  value: 'record',
                },
              ],
              createdBy: [
                {
                  value: '161616',
                },
              ],
              tsCreated: [
                {
                  value: '2024-10-16T12:36:04.249992Z',
                },
              ],
              updated: [
                {
                  tsUpdated: {
                    value: '2024-10-16T12:36:04.249992Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
              ],
            },
            someTextVar: {
              value: 'aaaaa',
            },
          },
        },
      };
      render(
        <RecordFormWithRemixStub
          formSchema={formDefForCheckTextValue}
          record={record}
        />,
      );
      const inputElement = screen.getByLabelText('someMetadataTextVarText');
      const text = screen.getByText('aaaaa');
      expect(inputElement).toBeInTheDocument();
      expect(text).toBeInTheDocument();
    });

    it('checkIfComponentHasValue hides variable in output with no value', () => {
      const record: BFFDataRecord = {
        id: 'divaOutput:519333261463755',
        recordType: 'divaOutput',
        validationType: 'someValidationTypeId',
        createdAt: '2023-10-11T09:24:30.511487Z',
        createdBy: 'coraUser:490742519075086',
        userRights: ['read', 'update', 'index', 'delete'],
        updated: [],
        data: {
          someRootNameInData: {
            recordInfo: {
              id: {
                value: '12345',
              },

              validationType: {
                value: 'record',
              },
              dataDivider: {
                value: 'divaData',
              },
              type: [
                {
                  value: 'record',
                },
              ],
              createdBy: [
                {
                  value: '161616',
                },
              ],
              tsCreated: [
                {
                  value: '2024-10-16T12:36:04.249992Z',
                },
              ],
              updated: [
                {
                  tsUpdated: {
                    value: '2024-10-16T12:36:04.249992Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
              ],
            },
            someTextVar: { value: 'bbb' },
          },
        },
      };
      render(
        <RecordFormWithRemixStub
          formSchema={formDefForCheckTextValue}
          record={record}
        />,
      );
      const input1Element = screen.queryByLabelText('someMetadataTextVarText');
      const input2Element = screen.queryByLabelText(
        'someOtherMetadataTextVarText',
      );
      expect(input1Element).toBeInTheDocument();
      expect(input2Element).not.toBeInTheDocument();
    });

    it('checkIfComponentHasValue hides variable in output with no value 2', () => {
      const record: BFFDataRecord = {
        id: 'divaOutput:519333261463755',
        recordType: 'divaOutput',
        validationType: 'someValidationTypeId',
        createdAt: '2023-10-11T09:24:30.511487Z',
        createdBy: 'coraUser:490742519075086',
        userRights: ['read', 'update', 'index', 'delete'],
        updated: [],
        data: {
          someRootNameInData: {
            recordInfo: {
              id: {
                value: '12345',
              },
              validationType: {
                value: 'record',
              },
              dataDivider: {
                value: 'divaData',
              },
              type: [
                {
                  value: 'record',
                },
              ],
              createdBy: [
                {
                  value: '161616',
                },
              ],
              tsCreated: [
                {
                  value: '2024-10-16T12:36:04.249992Z',
                },
              ],
              updated: [
                {
                  tsUpdated: {
                    value: '2024-10-16T12:36:04.249992Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
              ],
            },
            someTextVar: { value: 'bbb' },
          },
        },
      };
      render(
        <RecordFormWithRemixStub
          formSchema={formDefForCheckNumberValue}
          record={record}
        />,
      );
      const input1Element = screen.queryByLabelText('someMetadataTextVarText');
      const input2Element = screen.queryByLabelText(
        'someMetadataNumberVarText',
      );
      expect(input1Element).toBeInTheDocument();
      expect(input2Element).not.toBeInTheDocument();
    });
  });
});
