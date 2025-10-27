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

import { createAlternativePresentationFormDef } from '@/__mocks__/data/form/alternativePresentation';
import {
  formSchemaWithBinary,
  linkedBinaryMock,
  recordWithBinary,
} from '@/__mocks__/data/form/binary';
import { formDefWithOneCollectionVariableWithModeOutput } from '@/__mocks__/data/form/collVar';
import {
  formDefForCheckNumberValue,
  formDefForCheckTextValue,
  formDefPreprintWithOnlyAuthorName,
  formDefWithGroupWithDefaultHeadlineLevel,
  formDefWithGroupWithSpecifiedHeadlineLevel,
  formDefWithOneGroupHavingTextVariableAsChild,
} from '@/__mocks__/data/form/group';
import { formDefWithGuiElementLink } from '@/__mocks__/data/form/guiElement';
import {
  formDefWithOneNumberVariableBeingOptionalOutput,
  formDefWithOneNumberVariableModeOutput,
} from '@/__mocks__/data/form/numVar';
import { formDefWithRecordLinkTypeBinary } from '@/__mocks__/data/form/recordLink';
import {
  formDefWithOneRepeatingTextVariableWithModeOutput,
  formDefWithOneTextVariableBeingOptional,
  formDefWithOneTextVariableBeingPassword,
  formDefWithOneTextVariableBeingRepeating,
  formDefWithOneTextVariableWithMinNumberOfRepeatingToShow,
  formDefWithOneTextVariableWithMinNumberOfRepeatingToShowAndRepeatMinZero,
  formDefWithTextVar,
} from '@/__mocks__/data/form/textVar';
import { RecordForm } from '@/components/Form/RecordForm';
import { createDefaultValuesFromFormSchema } from '@/components/FormGenerator/defaultValues/defaultValues';
import type { RecordFormSchema } from '@/components/FormGenerator/types';
import type { BFFDataRecord } from '@/types/record';
import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRoutesStub } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

const actionSpy = vi.fn();
vi.mock('notistack', () => ({ enqueueSnackbar: vi.fn() }));

const RecordFormWithRoutesStub = ({
  formSchema,
  record,
}: {
  formSchema: RecordFormSchema;
  record?: BFFDataRecord;
}) => {
  const RoutesStub = createRoutesStub([
    {
      path: '/',
      Component: () => (
        <RecordForm
          formSchema={formSchema}
          defaultValues={createDefaultValuesFromFormSchema(
            formSchema,
            record?.data,
          )}
        />
      ),
      action: actionSpy,
    },
  ]);

  // eslint-disable-next-line react-hooks/static-components
  return <RoutesStub />;
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
      render(<RecordFormWithRoutesStub formSchema={formDefWithTextVar} />);
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
        <RecordFormWithRoutesStub
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
            actionLinks: {
              read: { url: '', requestMethod: 'get', rel: 'read' },
            },
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
                  type: {
                    value: 'record',
                  },
                  createdBy: {
                    value: '161616',
                  },
                  tsCreated: {
                    value: '2024-10-16T12:36:04.249992Z',
                  },
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
              presentationId: 'somePresentationIdNationalSubjectCategory',
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
                  presentationId: 'somePresentationIdRecordInfo',
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
                  childStyle: [],
                  gridColSpan: 12,
                },
                {
                  name: 'subject',
                  presentationId: 'somePresentationIdSubject1',
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
                      presentationId: 'somePresentationIdLanguage1',
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
                  childStyle: [],
                  gridColSpan: 12,
                },
                {
                  name: 'subject',
                  presentationId: 'somePresentationIdSubject2',
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
                      presentationId: 'somePresentationIdLanguage2',
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
                  childStyle: [],
                  gridColSpan: 12,
                },
                {
                  name: 'code',
                  presentationId: 'somePresentationIdCode',
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
                  childStyle: [],
                  gridColSpan: 12,
                },
                {
                  name: 'parent',
                  presentationId: 'somePresentationIdParent',
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
                  childStyle: [],
                  gridColSpan: 12,
                  recordLinkType: 'nationalSubjectCategory',
                  presentationRecordLinkId:
                    'parentNationalSubjectCategoryPLink',
                },
              ],
              presentationStyle: '',
              childStyle: [],
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

    it('renders a form from a given definition for fileUpload and and does NOT validate it', async () => {
      render(
        <RecordFormWithRoutesStub
          formSchema={formDefWithRecordLinkTypeBinary}
        />,
      );
      const user = userEvent.setup();
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      await user.click(submitButton);
      expect(actionSpy).toHaveBeenCalledTimes(0);
    });

    it('renders a form from a given definition for a update definition with group with same nameInData', () => {
      render(
        <RecordFormWithRoutesStub
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
            actionLinks: {
              read: { url: '', requestMethod: 'get', rel: 'read' },
            },
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
                  type: {
                    value: 'record',
                  },
                  createdBy: {
                    value: '161616',
                  },
                  tsCreated: {
                    value: '2024-10-16T12:36:04.249992Z',
                  },

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
              presentationId: 'somePresentationIdsomeRootNameInData',
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
                  presentationId: 'somePresentationIdRecordInfo',
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
                  childStyle: [],
                  gridColSpan: 12,
                },
                {
                  name: 'author',
                  presentationId: 'somePresentationIdAuthor',
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
                      presentationId: 'somePresentationIdLanguage',
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
                      presentationId: 'somePresentationIdGivenName',
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
                      presentationId: 'somePresentationIdFamilyName',
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
                  childStyle: [],
                  gridColSpan: 12,
                },
                {
                  name: 'author',
                  presentationId: 'somePresentationIdAuthor',
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
                      presentationId: 'somePresentationIdLanguage',
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
                      presentationId: 'somePresentationIdGivenName',
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
                      presentationId: 'somePresentationIdFamilyName',
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
                  childStyle: [],
                  gridColSpan: 12,
                },
              ],
              presentationStyle: '',
              childStyle: [],
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
    it('renders a recordLink 1-1 with a fileupload', async () => {
      render(
        <RecordFormWithRoutesStub
          formSchema={formDefWithRecordLinkTypeBinary}
        />,
      );
      const input = screen.getByText('divaClient_fileInputText');
      expect(input).toBeInTheDocument();
    });
  });

  describe('textVariable', () => {
    it('renders a textVariable 1-1 with mode output', async () => {
      const record: BFFDataRecord = {
        id: 'divaOutput:519333261463755',
        recordType: 'divaOutput',
        validationType: 'someValidationTypeId',
        createdAt: '2023-10-11T09:24:30.511487Z',
        createdBy: 'coraUser:490742519075086',
        actionLinks: { read: { url: '', requestMethod: 'get', rel: 'read' } },
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
              type: {
                value: 'record',
              },
              createdBy: {
                value: '161616',
              },
              tsCreated: {
                value: '2024-10-16T12:36:04.249992Z',
              },

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
        <RecordFormWithRoutesStub
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
        actionLinks: { read: { url: '', requestMethod: 'get', rel: 'read' } },
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
              type: {
                value: 'record',
              },
              createdBy: {
                value: '161616',
              },
              tsCreated: {
                value: '2024-10-16T12:36:04.249992Z',
              },

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
        <RecordFormWithRoutesStub
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
        <RecordFormWithRoutesStub
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

    it('renders a textVariable 0-2 and minNumberOfRepeatingToShow 1', async () => {
      render(
        <RecordFormWithRoutesStub
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

    it('renders a textVariable 0-1 as password', async () => {
      render(
        <RecordFormWithRoutesStub
          formSchema={formDefWithOneTextVariableBeingPassword}
        />,
      );
      const submitButton = screen.getByRole('button', {
        name: 'divaClient_SubmitButtonText',
      });

      const group = screen.getByRole('group', { name: 'passwordLabel' });
      const inputElement = within(group).getByLabelText('passwordLabel');

      const user = userEvent.setup();
      await user.type(inputElement, 'password');
      expect(inputElement).toHaveAttribute('type', 'password');
      await user.click(submitButton);
      await waitFor(() => {
        expect(actionSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('numberVariable', () => {
    it('renders a numberVariable with mode output', async () => {
      const record: BFFDataRecord = {
        id: 'divaOutput:519333261463755',
        recordType: 'divaOutput',
        validationType: 'someValidationTypeId',
        createdAt: '2023-10-11T09:24:30.511487Z',
        createdBy: 'coraUser:490742519075086',
        actionLinks: { read: { url: '', requestMethod: 'get', rel: 'read' } },
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
              type: {
                value: 'record',
              },
              createdBy: {
                value: '161616',
              },
              tsCreated: {
                value: '2024-10-16T12:36:04.249992Z',
              },

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
        <RecordFormWithRoutesStub
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
        actionLinks: { read: { url: '', requestMethod: 'get', rel: 'read' } },
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
              type: {
                value: 'record',
              },
              createdBy: {
                value: '161616',
              },
              tsCreated: {
                value: '2024-10-16T12:36:04.249992Z',
              },

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
        <RecordFormWithRoutesStub
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
  });

  describe('minNumberOfRepeatingToShow', () => {
    it('renders a textVariable 2-3 should render 2 based on minNumberOfRepeatingToShow', () => {
      render(
        <RecordFormWithRoutesStub
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
        <RecordFormWithRoutesStub
          formSchema={formDefWithOneTextVariableWithMinNumberOfRepeatingToShow}
        />,
      );

      const buttonElement = screen.getByRole('button', {
        name: 'divaClient_addFieldText',
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
        <RecordFormWithRoutesStub
          formSchema={
            formDefWithOneTextVariableWithMinNumberOfRepeatingToShowAndRepeatMinZero
          }
        />,
      );

      const removeButtonElement = screen.queryByLabelText(
        'divaClient_deleteFieldText',
      );
      expect(removeButtonElement).toBeInTheDocument();

      const moveUpButtonElement = screen.queryByLabelText(
        'divaClient_moveFieldUpText',
      );
      expect(moveUpButtonElement).not.toBeInTheDocument();

      const moveDownButtonElement = screen.queryByLabelText(
        'divaClient_moveFieldDownText',
      );
      expect(moveDownButtonElement).not.toBeInTheDocument();
    });
  });

  describe('repeatMin', () => {
    it('Remove buttons should be disabled when repeatMin is reached', async () => {
      render(
        <RecordFormWithRoutesStub
          formSchema={formDefWithOneTextVariableWithMinNumberOfRepeatingToShow}
        />,
      );

      const removeButtonElements = screen.getAllByLabelText(
        'divaClient_deleteFieldText',
      );

      expect(removeButtonElements).toHaveLength(2);
      expect(removeButtonElements[0]).toBeDisabled();
      expect(removeButtonElements[1]).toBeDisabled();
    });
  });

  describe('collectionVariable', () => {
    it('renders a collectionVariable 1-1 with mode output', async () => {
      const record: BFFDataRecord = {
        id: 'divaOutput:519333261463755',
        recordType: 'divaOutput',
        validationType: 'someValidationTypeId',
        createdAt: '2023-10-11T09:24:30.511487Z',
        createdBy: 'coraUser:490742519075086',
        actionLinks: { read: { url: '', requestMethod: 'get', rel: 'read' } },
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
              type: {
                value: 'record',
              },
              createdBy: {
                value: '161616',
              },
              tsCreated: {
                value: '2024-10-16T12:36:04.249992Z',
              },

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
        <RecordFormWithRoutesStub
          formSchema={formDefWithOneCollectionVariableWithModeOutput}
          record={record}
        />,
      );
      const inputElement = screen.getByText('exampleBlueItemText');
      expect(inputElement.tagName).toBe('P');
    });

    it('does not render a collectionVariable 1-1 with mode output without data', async () => {
      const record: BFFDataRecord = {
        id: 'divaOutput:519333261463755',
        recordType: 'divaOutput',
        validationType: 'someValidationTypeId',
        createdAt: '2023-10-11T09:24:30.511487Z',
        createdBy: 'coraUser:490742519075086',
        actionLinks: { read: { url: '', requestMethod: 'get', rel: 'read' } },
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
              type: {
                value: 'record',
              },
              createdBy: {
                value: '161616',
              },
              tsCreated: {
                value: '2024-10-16T12:36:04.249992Z',
              },

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
        <RecordFormWithRoutesStub
          formSchema={formDefWithOneCollectionVariableWithModeOutput}
          record={record}
        />,
      );
      const inputElement = screen.getByText('exampleBlueItemText');
      expect(inputElement.tagName).toBe('P');
    });
  });

  describe('group', () => {
    it('renders a group 1-1 with textVariable 1-1 child', async () => {
      render(
        <RecordFormWithRoutesStub
          formSchema={formDefWithOneGroupHavingTextVariableAsChild}
        />,
      );

      const textInput = screen.getByPlaceholderText('someEmptyTextId');
      expect(textInput).toBeInTheDocument();
    });

    it('renders a group 1-10 and headlineLevel 1', async () => {
      render(
        <RecordFormWithRoutesStub
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
        <RecordFormWithRoutesStub
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
        <RecordFormWithRoutesStub
          formSchema={formDefWithGroupWithDefaultHeadlineLevel}
        />,
      );

      const headlineElement = screen.getByRole('heading', {
        name: 'author',
        level: 2,
      });
      expect(headlineElement).toBeInTheDocument();
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
        actionLinks: { read: { url: '', requestMethod: 'get', rel: 'read' } },
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
              type: {
                value: 'record',
              },
              createdBy: {
                value: '161616',
              },
              tsCreated: {
                value: '2024-10-16T12:36:04.249992Z',
              },

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
        <RecordFormWithRoutesStub
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
        <RecordFormWithRoutesStub formSchema={formDefWithGuiElementLink} />,
      );

      const link = screen.getByRole('link');

      expect(link).toHaveAttribute('href', 'http://www.google.se');
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
        actionLinks: { read: { url: '', requestMethod: 'get', rel: 'read' } },
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
              type: {
                value: 'record',
              },
              createdBy: {
                value: '161616',
              },
              tsCreated: {
                value: '2024-10-16T12:36:04.249992Z',
              },

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
        <RecordFormWithRoutesStub
          formSchema={formDefForCheckTextValue}
          record={record}
        />,
      );

      const inputLabel = screen.getByText('someMetadataTextVarText');
      expect(inputLabel).toBeInTheDocument();
      const inputElement = screen.getByText('aaaaa');
      expect(inputElement).toBeInTheDocument();
    });

    it('checkIfComponentHasValue hides variable in output with no value', () => {
      const record: BFFDataRecord = {
        id: 'divaOutput:519333261463755',
        recordType: 'divaOutput',
        validationType: 'someValidationTypeId',
        createdAt: '2023-10-11T09:24:30.511487Z',
        createdBy: 'coraUser:490742519075086',
        actionLinks: { read: { url: '', requestMethod: 'get', rel: 'read' } },
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
              type: {
                value: 'record',
              },
              createdBy: {
                value: '161616',
              },
              tsCreated: {
                value: '2024-10-16T12:36:04.249992Z',
              },

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
        <RecordFormWithRoutesStub
          formSchema={formDefForCheckTextValue}
          record={record}
        />,
      );

      const inputLabel = screen.getByText('someMetadataTextVarText');
      expect(inputLabel).toBeInTheDocument();
      const hiddenInputLabel = screen.queryByLabelText(
        'someOtherMetadataTextVarText',
      );
      expect(hiddenInputLabel).not.toBeInTheDocument();

      expect(inputLabel).toBeInTheDocument();
      expect(hiddenInputLabel).not.toBeInTheDocument();
    });

    it('checkIfComponentHasValue hides variable in output with no value 2', () => {
      const record: BFFDataRecord = {
        id: 'divaOutput:519333261463755',
        recordType: 'divaOutput',
        validationType: 'someValidationTypeId',
        createdAt: '2023-10-11T09:24:30.511487Z',
        createdBy: 'coraUser:490742519075086',
        actionLinks: { read: { url: '', requestMethod: 'get', rel: 'read' } },
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
              type: {
                value: 'record',
              },

              createdBy: {
                value: '161616',
              },

              tsCreated: {
                value: '2024-10-16T12:36:04.249992Z',
              },
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
        <RecordFormWithRoutesStub
          formSchema={formDefForCheckNumberValue}
          record={record}
        />,
      );

      const inputLabel = screen.getByText('someMetadataTextVarText');
      expect(inputLabel).toBeInTheDocument();
      const hiddenInputLabel = screen.queryByLabelText(
        'someOtherMetadataTextVarText',
      );

      expect(inputLabel).toBeInTheDocument();
      expect(hiddenInputLabel).not.toBeInTheDocument();
    });
  });

  describe('resourceLink', () => {
    it('renders a linked binary', async () => {
      const RoutesStub = createRoutesStub([
        {
          path: '/',
          Component: () => (
            <RecordForm
              formSchema={formSchemaWithBinary}
              defaultValues={createDefaultValuesFromFormSchema(
                formSchemaWithBinary,
                recordWithBinary.data,
              )}
            />
          ),
        },
        {
          path: '/record/:recordType/:recordId',
          loader: () => {
            return { record: linkedBinaryMock };
          },
        },
        {
          path: '/binary/:id/:name',
          loader: () => {
            return '';
          },
        },
      ]);

      await act(() => render(<RoutesStub />));
      expect(
        screen.getByRole('heading', {
          name: /attachmentgrouptext/i,
        }),
      ).toBeInTheDocument();

      expect(screen.getByRole('presentation')).toHaveAttribute(
        'src',
        '/binary/binary:1283806137807105/thumbnail',
      );

      expect(screen.getByText('cat.jpg')).toBeInTheDocument();

      const downloadLink = screen.getByRole('link', {
        name: /resourcelinkdownloadtext/i,
      });

      expect(downloadLink).toHaveAttribute(
        'href',
        '/binary/binary:1283806137807105/master',
      );
      expect(downloadLink).toHaveAttribute('type', 'image/jpeg');
    });
  });

  describe('alternativePresentation', () => {
    it('renders a headless presentation switcher when component has alternative presentation and no title', async () => {
      const user = userEvent.setup();

      await act(() =>
        render(
          <RecordFormWithRoutesStub
            formSchema={createAlternativePresentationFormDef(
              'firstSmaller',
              undefined,
              true,
            )}
          />,
        ),
      );

      expect(
        screen.getByRole('textbox', { name: 'someLabelTextId' }),
      ).toBeInTheDocument();
      expect(
        screen.queryByLabelText('someAlternativeLabelTextId'),
      ).not.toBeInTheDocument();

      await user.click(
        screen.getByRole('button', {
          name: 'divaClient_showMoreText',
        }),
      );

      expect(
        screen.getByRole('textbox', { name: 'someAlternativeLabelTextId' }),
      ).toBeInTheDocument();
      expect(
        screen.queryByLabelText('someLabelTextId'),
      ).not.toBeInTheDocument();
    });

    it('renders a headed presentation switcher when component has alternative presentation a title', async () => {
      const user = userEvent.setup();

      await act(() =>
        render(
          <RecordFormWithRoutesStub
            formSchema={createAlternativePresentationFormDef(
              'firstSmaller',
              'someTitle',
              true,
            )}
          />,
        ),
      );

      expect(
        screen.getByRole('textbox', { name: 'someLabelTextId' }),
      ).toBeInTheDocument();
      expect(
        screen.queryByLabelText('someAlternativeLabelTextId'),
      ).not.toBeInTheDocument();

      const accordionTitle = screen.getByRole('button', {
        name: 'someTitle',
      });
      await user.click(accordionTitle);

      expect(
        screen.getByRole('textbox', { name: 'someAlternativeLabelTextId' }),
      ).toBeInTheDocument();
      expect(
        screen.queryByLabelText('someLabelTextId'),
      ).not.toBeInTheDocument();
      expect(accordionTitle).toBeVisible();
    });

    it('renders a headed presentation switcher when component a title but no alternative presentation', async () => {
      const user = userEvent.setup();

      await act(() =>
        render(
          <RecordFormWithRoutesStub
            formSchema={createAlternativePresentationFormDef(
              'singleInitiallyHidden',
              'someTitle',
              false,
            )}
          />,
        ),
      );

      expect(
        screen.queryByRole('textbox', { name: 'someLabelTextId' }),
      ).not.toBeInTheDocument();

      const accordionTitle = screen.getByRole('button', {
        name: 'someTitle',
      });
      await user.click(accordionTitle);

      expect(
        screen.getByRole('textbox', { name: 'someLabelTextId' }),
      ).toBeInTheDocument();
      expect(accordionTitle).toBeVisible();
    });

    it('handles presentationSize firstLarger', async () => {
      const user = userEvent.setup();

      await act(() =>
        render(
          <RecordFormWithRoutesStub
            formSchema={createAlternativePresentationFormDef(
              'firstLarger',
              undefined,
              true,
            )}
          />,
        ),
      );

      expect(
        screen.getByRole('textbox', { name: 'someLabelTextId' }),
      ).toBeInTheDocument();
      expect(
        screen.queryByLabelText('someAlternativeLabelTextId'),
      ).not.toBeInTheDocument();

      await user.click(
        screen.getByRole('button', {
          name: 'divaClient_showLessText',
        }),
      );

      expect(
        screen.getByRole('textbox', { name: 'someAlternativeLabelTextId' }),
      ).toBeInTheDocument();
      expect(
        screen.queryByLabelText('someLabelTextId'),
      ).not.toBeInTheDocument();
    });

    it('handles presentationSize bothAreEqual', async () => {
      const user = userEvent.setup();

      await act(() =>
        render(
          <RecordFormWithRoutesStub
            formSchema={createAlternativePresentationFormDef(
              'bothEqual',
              undefined,
              true,
            )}
          />,
        ),
      );

      expect(
        screen.getByRole('textbox', { name: 'someLabelTextId' }),
      ).toBeInTheDocument();
      expect(
        screen.queryByLabelText('someAlternativeLabelTextId'),
      ).not.toBeInTheDocument();

      await user.click(
        screen.getByRole('button', {
          name: 'divaClient_swapPresentationText',
        }),
      );

      expect(
        screen.getByRole('textbox', { name: 'someAlternativeLabelTextId' }),
      ).toBeInTheDocument();
      expect(
        screen.queryByLabelText('someLabelTextId'),
      ).not.toBeInTheDocument();
    });

    it('handles presentationSize singleInitiallyShown', async () => {
      const user = userEvent.setup();

      await act(() =>
        render(
          <RecordFormWithRoutesStub
            formSchema={createAlternativePresentationFormDef(
              'singleInitiallyVisible',
              'someTitle',
              false,
            )}
          />,
        ),
      );

      expect(
        screen.getByRole('textbox', { name: 'someLabelTextId' }),
      ).toBeInTheDocument();

      const accordionTitle = screen.getByRole('button', {
        name: 'someTitle',
      });
      await user.click(accordionTitle);

      expect(
        screen.queryByRole('textbox', { name: 'someLabelTextId' }),
      ).not.toBeInTheDocument();
      expect(accordionTitle).toBeVisible();
    });

    it('expands accordion when validation error ', async () => {
      const user = userEvent.setup();

      render(
        <RecordFormWithRoutesStub
          formSchema={createAlternativePresentationFormDef(
            'singleInitiallyHidden',
            'someTitle',
            false,
          )}
        />,
      );

      expect(
        screen.queryByRole('textbox', { name: 'someLabelTextId' }),
      ).not.toBeInTheDocument();

      await user.click(
        screen.getByRole('button', { name: 'divaClient_SubmitButtonText' }),
      );

      expect(
        screen.getByRole('textbox', { name: 'someLabelTextId' }),
      ).toBeVisible();
      expect(
        screen.getByRole('textbox', { name: 'someLabelTextId' }),
      ).toBeInvalid();
    });

    it('expands accordion when appended to field array, even when set to single initially hidden', async () => {
      const formDefinition = {
        validationTypeId: 'someValidationTypeId',
        form: {
          type: 'group',
          label: 'someRootFormGroupText',
          showLabel: true,
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
              type: 'textVariable',
              name: 'someNameInData',
              showLabel: true,
              label: 'someLabelTextId',
              placeholder: 'someEmptyTextId',
              repeat: {
                repeatMin: 1,
                repeatMax: 10,
              },
              validation: {
                type: 'regex',
                pattern: '^[a-zA-Z]$',
              },
              inputType: 'input',
              mode: 'input',
              title: 'someClickableTitleTextId',
              titleHeadlineLevel: 'h4',
              presentationSize: 'singleInitiallyHidden',
            },
          ],
          mode: 'input',
        },
      } as RecordFormSchema;

      const user = userEvent.setup();

      render(<RecordFormWithRoutesStub formSchema={formDefinition} />);

      const clickableTitle1 = screen.getAllByRole('button', {
        name: 'someClickableTitleTextId',
      })[0];
      expect(clickableTitle1).toHaveAttribute('aria-expanded', 'false');

      expect(
        screen.queryByRole('textbox', { name: 'someLabelTextId' }),
      ).not.toBeInTheDocument();

      await user.click(
        screen.getByRole('button', { name: 'divaClient_addFieldText' }),
      );

      expect(
        screen.getAllByRole('button', { name: 'someClickableTitleTextId' }),
      ).toHaveLength(2);

      expect(clickableTitle1).toHaveAttribute('aria-expanded', 'false');

      const clickableTitle2 = screen.getAllByRole('button', {
        name: 'someClickableTitleTextId',
      })[1];
      expect(clickableTitle2).toHaveAttribute('aria-expanded', 'true');

      expect(
        screen.getByRole('textbox', { name: 'someLabelTextId' }),
      ).toBeVisible();
    });
  });

  describe('optionalComponent', () => {
    it('renders an optional variable with minNumberRepeatingToShow 1', () => {
      const formSchema: RecordFormSchema = {
        validationTypeId: 'someValidationTypeId',
        form: {
          type: 'group',
          label: 'someRootFormGroupText',
          showLabel: true,
          name: 'someRootNameInData',
          mode: 'input',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          components: [
            {
              mode: 'input',
              showLabel: true,
              type: 'textVariable',
              name: 'someTextVar',
              label: 'Text Variable',
              repeat: {
                repeatMin: 0,
                repeatMax: 1,
                minNumberOfRepeatingToShow: 1,
              },
              validation: {
                type: 'regex',
                pattern: '.+',
              },
            },
          ],
        },
      };
      render(<RecordFormWithRoutesStub formSchema={formSchema} />);

      expect(
        screen.getByRole('button', { name: 'divaClient_deleteFieldText' }),
      ).toBeInTheDocument();
      expect(screen.getByLabelText('Text Variable')).toBeInTheDocument();
    });

    it('renders an optional variable with minNumberRepeatingToShow', () => {
      const formSchema: RecordFormSchema = {
        validationTypeId: 'someValidationTypeId',
        form: {
          type: 'group',
          label: 'someRootFormGroupText',
          showLabel: true,
          name: 'someRootNameInData',
          mode: 'input',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          components: [
            {
              mode: 'input',
              showLabel: true,
              type: 'textVariable',
              name: 'someTextVar',
              label: 'Text Variable',
              repeat: {
                repeatMin: 0,
                repeatMax: 1,
                minNumberOfRepeatingToShow: 0,
              },
              validation: {
                type: 'regex',
                pattern: '.+',
              },
            },
          ],
        },
      };
      render(<RecordFormWithRoutesStub formSchema={formSchema} />);

      expect(screen.queryByLabelText('Text Variable')).not.toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'divaClient_addFieldText' }),
      ).toBeInTheDocument();
    });

    it('renders an optional group with minNumberRepeatingToShow 1', () => {
      const formSchema: RecordFormSchema = {
        validationTypeId: 'someValidationTypeId',
        form: {
          type: 'group',
          label: 'someRootFormGroupText',
          showLabel: true,
          name: 'someRootNameInData',
          mode: 'input',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          components: [
            {
              type: 'group',
              mode: 'input',
              name: 'optionalGroup',
              label: 'Optional Group',
              showLabel: true,
              repeat: {
                repeatMin: 0,
                repeatMax: 1,
                minNumberOfRepeatingToShow: 1,
              },
              components: [
                {
                  mode: 'input',
                  showLabel: true,
                  type: 'textVariable',
                  name: 'someTextVar',
                  label: 'Text Variable',
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
        },
      };
      render(<RecordFormWithRoutesStub formSchema={formSchema} />);

      expect(screen.getByLabelText('Optional Group')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'divaClient_deleteFieldText' }),
      ).toBeInTheDocument();
      expect(screen.getByLabelText('Text Variable')).toBeInTheDocument();
    });

    it('renders an optional group with minNumberRepeatingToShow 0', () => {
      const formSchema: RecordFormSchema = {
        validationTypeId: 'someValidationTypeId',
        form: {
          type: 'group',
          label: 'someRootFormGroupText',
          showLabel: true,
          name: 'someRootNameInData',
          mode: 'input',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          components: [
            {
              type: 'group',
              mode: 'input',
              name: 'optionalGroup',
              label: 'Optional Group',
              showLabel: true,
              repeat: {
                repeatMin: 0,
                repeatMax: 1,
                minNumberOfRepeatingToShow: 0,
              },
              components: [
                {
                  mode: 'input',
                  showLabel: true,
                  type: 'textVariable',
                  name: 'someTextVar',
                  label: 'Text Variable',
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
        },
      };
      render(<RecordFormWithRoutesStub formSchema={formSchema} />);

      expect(screen.queryByLabelText('Optional Group')).not.toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'divaClient_addFieldText' }),
      ).toBeInTheDocument();
      expect(screen.queryByLabelText('Text Variable')).not.toBeInTheDocument();
    });
  });
});
