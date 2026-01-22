import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';
import type { BFFSearchResult } from '@/types/record';
import type {
  FormComponentGroup,
  FormComponentTextVar,
  RecordFormSchema,
} from '@/components/FormGenerator/types';
import { SearchResults } from '../SearchResults';
import { createRoutesStub } from 'react-router';

describe('SearchResults', () => {
  it('renders as busy when searching', () => {
    render(
      <SearchResults
        searchResults={{
          fromNo: 0,
          toNo: 0,
          totalNo: 0,
          containDataOfType: 'mixed',
          data: [],
        }}
        searching={true}
        start={1}
        userHasSearched={false}
      />,
    );

    expect(screen.getByRole('list')).toHaveAttribute('aria-busy', 'true');
  });

  it('renders diva-output search results', () => {
    const resultSchema = {
      form: {
        label: 'Some result label',
        showLabel: false,
        type: 'group',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        name: 'diva-output',
        mode: 'output',
        components: [
          {
            type: 'group',
            mode: 'output',
            name: 'titleInfo',
            label: 'Title',
            components: [
              {
                type: 'textVariable',
                mode: 'output',
                name: 'title',
                label: 'Title',
                validation: {
                  type: 'regex',
                  pattern: '.+',
                },
                showLabel: true,
              } as FormComponentTextVar,
            ],
            showLabel: true,
          } as FormComponentGroup,
        ],
      },
    } as RecordFormSchema;

    const resultData = {
      output: {
        titleInfo: {
          title: {
            value: 'Some title for the article',
          },
        },
      },
    };
    const searchResults: BFFSearchResult = {
      fromNo: 1,
      toNo: 1,
      totalNo: 1,
      containDataOfType: 'mixed',
      data: [
        {
          recordType: 'diva-output',
          id: '1',
          presentation: resultSchema,
          data: resultData,
          validationType: 'diva-output',
          actionLinks: {},
        },
      ],
    };

    const RouteStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <SearchResults
            searchResults={searchResults}
            searching={false}
            start={1}
            userHasSearched={false}
          />
        ),
      },
    ]);

    render(<RouteStub />);
    expect(
      screen.getByRole('link', { name: 'Some title for the article' }),
    ).toBeInTheDocument();
  });

  it('renders generic search results', () => {
    const resultSchema = {
      form: {
        label: 'Some result label',
        showLabel: false,
        type: 'group',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        name: 'root',
        mode: 'output',
        components: [
          {
            type: 'textVariable',
            mode: 'output',
            name: 'title',
            label: 'Title',
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            showLabel: true,
          } as FormComponentTextVar,
        ],
      },
    } as RecordFormSchema;
    const resultData = { root: { title: { value: 'Some result title' } } };
    const searchResults: BFFSearchResult = {
      fromNo: 1,
      toNo: 1,
      totalNo: 1,
      containDataOfType: 'mixed',
      data: [
        {
          recordType: 'someRecordType',
          id: '1',
          presentation: resultSchema,
          data: resultData,
          validationType: 'someValidationType',
          actionLinks: {},
        },
      ],
    };

    const RouteStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <SearchResults
            searchResults={searchResults}
            searching={false}
            start={1}
            userHasSearched={false}
          />
        ),
      },
    ]);

    render(<RouteStub />);
    expect(screen.getByText('Some result title')).toBeInTheDocument();
  });
});
