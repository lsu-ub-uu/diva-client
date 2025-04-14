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

import {
  act,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { expect } from 'vitest';
import { LinkedRecord } from '@/components/LinkedRecord/LinkedPresentationRecord';
import { createRoutesStub } from 'react-router';

const nationalSubjectCategory = {
  id: 'nationalSubjectCategory:6325370460697648',
  recordType: 'nationalSubjectCategory',
  validationType: 'nationalSubjectCategory',
  createdAt: '2022-04-22T12:39:31.404624Z',
  createdBy: 'coraUser:4412982402853626',
  updated: [
    {
      updateAt: '2022-04-22T12:39:31.404624Z',
      updatedBy: 'coraUser:4412982402853626',
    },
    {
      updateAt: '2023-03-03T13:25:30.971848Z',
      updatedBy: 'coraUser:490742519075086',
    },
    {
      updateAt: '2024-01-31T10:50:02.855662Z',
      updatedBy: '161616',
    },
  ],
  userRights: ['read', 'read_incoming_links', 'update', 'index'],
  data: {
    nationalSubjectCategory: {
      name: {
        nationalSubjectCategoryName: {
          value: 'Fysik',
        },
        language: {
          value: 'sv',
        },
      },
      alternativeName: {
        nationalSubjectCategoryName: {
          value: 'Physical Sciences',
        },
        language: {
          value: 'en',
        },
      },
      subjectCode: {
        value: '103',
      },
      nationalSubjectCategoryParent: [
        {
          nationalSubjectCategory: [
            {
              value: 'nationalSubjectCategory:6325318727746293',
            },
          ],
        },
      ],
    },
  },
  presentation: {
    form: {
      name: 'nationalSubjectCategory',
      type: 'group',
      mode: 'output',
      tooltip: {
        title: 'nationalSubjectCategoryGroupText',
        body: 'nationalSubjectCategoryGroupDefText',
      },
      label: 'nationalSubjectCategoryGroupText',
      showLabel: false,
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      components: [
        {
          name: 'name',
          type: 'group',
          mode: 'output',
          tooltip: {
            title: 'nationalSubjectCategoryNameGroupText',
            body: 'nationalSubjectCategoryNameGroupDefText',
          },
          label: 'nationalSubjectCategoryNameGroupText',
          showLabel: false,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 1,
            repeatMax: 1,
          },
          components: [
            {
              name: 'nationalSubjectCategoryName',
              type: 'textVariable',
              mode: 'output',
              inputType: 'input',
              tooltip: {
                title: 'nationalSubjectCategoryNameTextVarText',
                body: 'nationalSubjectCategoryNameTextVarDefText',
              },
              label: 'nationalSubjectCategoryNameTextVarText',
              showLabel: false,
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
            },
          ],
          presentationStyle: '',
          childStyle: ['compact'],
          gridColSpan: 12,
        },
        {
          name: 'semicolonText',
          type: 'text',
          childStyle: ['compact'],
          gridColSpan: 12,
        },
        {
          name: 'spaceText',
          type: 'text',
          childStyle: ['compact'],
          gridColSpan: 12,
        },
        {
          name: 'alternativeName',
          type: 'group',
          mode: 'output',
          tooltip: {
            title: 'nationalSubjectCategoryAlternativeNameGroupText',
            body: 'nationalSubjectCategoryAlternativeNameGroupDefText',
          },
          label: 'nationalSubjectCategoryAlternativeNameGroupText',
          showLabel: false,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 1,
            repeatMax: 1,
          },
          components: [
            {
              name: 'nationalSubjectCategoryName',
              type: 'textVariable',
              mode: 'output',
              inputType: 'input',
              tooltip: {
                title: 'nationalSubjectCategoryNameTextVarText',
                body: 'nationalSubjectCategoryNameTextVarDefText',
              },
              label: 'nationalSubjectCategoryNameTextVarText',
              showLabel: false,
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
            },
          ],
          presentationStyle: '',
          childStyle: ['compact'],
          gridColSpan: 12,
        },
        {
          name: 'spaceText',
          type: 'text',
          childStyle: ['compact'],
          gridColSpan: 12,
        },
        {
          name: 'firstHalfParenthesisText',
          type: 'text',
          childStyle: ['compact'],
          gridColSpan: 12,
        },
        {
          name: 'subjectCode',
          type: 'textVariable',
          mode: 'output',
          inputType: 'input',
          tooltip: {
            title: 'subjectCodeTextVarText',
            body: 'subjectCodeTextVarDefText',
          },
          label: 'subjectCodeTextVarText',
          showLabel: false,
          validation: {
            type: 'regex',
            pattern: '^[0-9-\\s]{1,100}$',
          },
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 1,
            repeatMax: 1,
          },
          childStyle: ['compact'],
          gridColSpan: 12,
        },
        {
          name: 'secondHalfParenthesisText',
          type: 'text',
          childStyle: ['compact'],
          gridColSpan: 12,
        },
      ],
      presentationStyle: 'inline',
      childStyle: [],
      gridColSpan: 12,
    },
  },
};

describe('<LinkedRecord/>', () => {
  it('renders with default loadingText', async () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <LinkedRecord
            id='nationalSubjectCategory:6325370460697648'
            recordType='nationalSubjectCategory'
            presentationRecordLinkId='nationalSubjectCategoryOutputPLink'
          />
        ),
      },
      {
        path: '/record/:recordType/:recordId',
        loader: () => {
          return { record: nationalSubjectCategory };
        },
      },
    ]);
    render(<RoutesStub />);
    const loadingText = screen.queryByText('divaClient_loadingText');
    expect(loadingText).toBeInTheDocument();
    await waitForElementToBeRemoved(() =>
      screen.queryByText('divaClient_loadingText'),
    );
  });

  it('renders the presentation for the linked record', async () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <LinkedRecord
            id='nationalSubjectCategory:6325370460697648'
            recordType='nationalSubjectCategory'
            presentationRecordLinkId='nationalSubjectCategoryOutputPLink'
          />
        ),
      },
      {
        path: '/record/:recordType/:recordId',
        loader: () => {
          return { record: nationalSubjectCategory };
        },
      },
    ]);
    await act(() => render(<RoutesStub />));

    const fysik = screen.queryByText(/fysik/i);
    expect(fysik).toBeInTheDocument();
    const physics = screen.queryByText(/Physical Sciences/i);
    expect(physics).toBeInTheDocument();
    expect(
      screen.queryByText('divaClient_loadingText'),
    ).not.toBeInTheDocument();
  });

  it('renders an error message on fetch error', async () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <LinkedRecord
            id='nationalSubjectCategory:6325370460697648'
            recordType='nationalSubjectCategory'
            presentationRecordLinkId='nationalSubjectCategoryOutputPLink'
          />
        ),
      },
      {
        path: '/record/:recordType/:recordId',
        loader: () => {
          return { error: true };
        },
      },
    ]);
    await act(() => render(<RoutesStub />));

    expect(
      screen.getByText('divaClient_FailedToGetRecordText'),
    ).toBeInTheDocument();
  });
});
