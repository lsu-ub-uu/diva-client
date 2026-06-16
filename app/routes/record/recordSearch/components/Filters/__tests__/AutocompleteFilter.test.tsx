import type { AutocompleteFilter as AutocompleteFilterDef } from '@/routes/record/recordSearch/utils/createFilterDefinition.server';
import { render, screen, waitFor } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { getRecordTitle } from '@/utils/getRecordTitle';
import userEvent from '@testing-library/user-event';
import { AutocompleteFilter } from '../AutocompleteFilter';

vi.mock('@/utils/getRecordTitle');

describe('AutocompleteFilter', () => {
  it('renders a AutocompleteFilter', () => {
    const filter: AutocompleteFilterDef = {
      recordType: 'someRecordType',
      type: 'autocomplete',
      id: 'someAutocompleteFilterId',
      name: 'someAutocompleteFilterName',
      textId: 'autocompleteFilterText',
      searchType: 'someSearchType',
      searchTerm: 'someSearchTerm',
      placeholderTextId: 'autocompleteFilterPlaceholderText',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
    };

    const autocompleteMock = vi.fn();

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <AutocompleteFilter
            filter={filter}
            currentValue=''
            forceSubmit={vi.fn()}
          />
        ),
      },
      {
        path: '/autoCompleteSearch/:searchType',
        loader: autocompleteMock,
      },
    ]);

    render(<RoutesStub />);

    screen.getByRole('combobox', {
      name: 'autocompleteFilterText',
    });
  });

  it('renders a AutocompleteFilter with current value', () => {
    const filter: AutocompleteFilterDef = {
      recordType: 'someRecordType',
      type: 'autocomplete',
      id: 'someAutocompleteFilterId',
      name: 'someAutocompleteFilterName',
      textId: 'autocompleteFilterText',
      searchType: 'someSearchType',
      searchTerm: 'someSearchTerm',
      placeholderTextId: 'autocompleteFilterPlaceholderText',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
    };

    const autocompleteMock = vi.fn();

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <AutocompleteFilter
            filter={filter}
            currentValue='someRecordType_1'
            forceSubmit={vi.fn()}
          />
        ),
      },
      {
        path: '/autoCompleteSearch/:searchType',
        loader: autocompleteMock,
      },
    ]);

    render(<RoutesStub />);

    const autocomplete = screen.getByRole('combobox', {
      name: 'autocompleteFilterText',
    });

    expect(autocomplete).toHaveValue('someRecordType_1');
  });
  it('syncs AutocompleteFilter value when currentValue changes', async () => {
    const filter: AutocompleteFilterDef = {
      recordType: 'someRecordType',
      type: 'autocomplete',
      id: 'someAutocompleteFilterId',
      name: 'someAutocompleteFilterName',
      textId: 'autocompleteFilterText',
      searchType: 'someSearchType',
      searchTerm: 'someSearchTerm',
      placeholderTextId: 'autocompleteFilterPlaceholderText',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
    };

    const autocompleteMock = vi.fn();

    const createStub = (currentValue: string) =>
      createRoutesStub([
        {
          path: '/',
          Component: () => (
            <AutocompleteFilter
              filter={filter}
              currentValue={currentValue}
              forceSubmit={vi.fn()}
            />
          ),
        },
        {
          path: '/autoCompleteSearch/:searchType',
          loader: autocompleteMock,
        },
      ]);

    let RoutesStub = createStub('someRecordType_1');

    const { rerender } = render(<RoutesStub />);

    expect(
      screen.getByRole('combobox', {
        name: 'autocompleteFilterText',
      }),
    ).toHaveValue('someRecordType_1');

    RoutesStub = createStub('someRecordType_2');
    rerender(<RoutesStub />);

    await waitFor(() => {
      expect(
        screen.getByRole('combobox', {
          name: 'autocompleteFilterText',
        }),
      ).toHaveValue('someRecordType_2');
    });
  });
  it('does not overwrite user input in AutocompleteFilter when currentValue changes', async () => {
    vi.mocked(getRecordTitle).mockReturnValue('Result 1');
    const user = userEvent.setup();
    const filter: AutocompleteFilterDef = {
      recordType: 'someRecordType',
      type: 'autocomplete',
      id: 'someAutocompleteFilterId',
      name: 'someAutocompleteFilterName',
      textId: 'autocompleteFilterText',
      searchType: 'someSearchType',
      searchTerm: 'someSearchTerm',
      placeholderTextId: 'autocompleteFilterPlaceholderText',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
    };

    const autocompleteMock = vi.fn().mockReturnValue({
      result: [
        {
          id: 'result1',
          data: {
            some: { sv: { path: 'Result 1' }, en: { path: 'Result 1' } },
          },
        },
      ],
    });

    const createStub = (currentValue: string) =>
      createRoutesStub([
        {
          path: '/',
          Component: () => (
            <AutocompleteFilter
              filter={filter}
              currentValue={currentValue}
              forceSubmit={vi.fn()}
            />
          ),
        },
        {
          path: '/autoCompleteSearch/:searchType',
          loader: autocompleteMock,
        },
      ]);

    let RoutesStub = createStub('');

    const { rerender } = render(<RoutesStub />);

    const autocomplete = screen.getByRole('combobox', {
      name: 'autocompleteFilterText',
    });

    await user.type(autocomplete, 'A');

    await waitFor(() => {
      expect(screen.getByText('Result 1')).toBeInTheDocument();
    });

    await user.click(screen.getByText('Result 1'));

    await waitFor(() => {
      expect(autocomplete).toHaveValue('someRecordType_result1');
    });

    RoutesStub = createStub('someRecordType_stale');
    rerender(<RoutesStub />);

    await waitFor(() => {
      expect(autocomplete).toHaveValue('someRecordType_result1');
    });
  });

  it('renders validation error for AutocompleteFilter', () => {
    const filter: AutocompleteFilterDef = {
      recordType: 'someRecordType',
      type: 'autocomplete',
      id: 'someAutocompleteFilterId',
      name: 'someAutocompleteFilterName',
      textId: 'autocompleteFilterText',
      searchType: 'someSearchType',
      searchTerm: 'someSearchTerm',
      placeholderTextId: 'autocompleteFilterPlaceholderText',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
    };

    const autocompleteMock = vi.fn();

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <AutocompleteFilter
            filter={filter}
            currentValue=''
            forceSubmit={vi.fn()}
            validationError='Some error'
          />
        ),
      },
      {
        path: '/autoCompleteSearch/:searchType',
        loader: autocompleteMock,
      },
    ]);

    render(<RoutesStub />);

    expect(screen.getByText('Some error')).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', { name: 'autocompleteFilterText' }),
    ).toHaveAttribute('aria-invalid', 'true');
  });

  it('is possible to search and select a value in autocomplete filter', async () => {
    vi.mocked(getRecordTitle).mockReturnValue('Result 1');
    const user = userEvent.setup();
    const filter: AutocompleteFilterDef = {
      recordType: 'someRecordType',
      type: 'autocomplete',
      id: 'someAutocompleteFilterId',
      name: 'someAutocompleteFilterName',
      textId: 'autocompleteFilterText',
      searchType: 'someSearchType',
      searchTerm: 'someSearchTerm',
      placeholderTextId: 'autocompleteFilterPlaceholderText',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
    };

    const autocompleteMock = vi.fn().mockReturnValue({
      result: [
        {
          id: 'result1',
          data: {
            some: { sv: { path: 'Result 1' }, en: { path: 'Result 1' } },
          },
        },
      ],
    });

    const forceSubmitSpy = vi.fn();

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <AutocompleteFilter
            filter={filter}
            currentValue=''
            forceSubmit={forceSubmitSpy}
          />
        ),
      },
      {
        path: '/autoCompleteSearch/:searchType',
        loader: autocompleteMock,
      },
    ]);

    render(<RoutesStub />);

    const autocomplete = screen.getByRole('combobox', {
      name: 'autocompleteFilterText',
    });

    await user.type(autocomplete, 'A');

    await waitFor(() => {
      expect(screen.getByText('Result 1')).toBeInTheDocument();
    });

    await user.click(screen.getByText('Result 1'));

    await waitFor(() => {
      expect(autocomplete).toHaveValue('someRecordType_result1');
    });
    expect(forceSubmitSpy).toHaveBeenCalledTimes(1);
  });
});
