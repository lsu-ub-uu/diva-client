import type { AutocompleteFilter as AutocompleteFilterDef } from '@/routes/record/recordSearch/utils/createFilterDefinition.server';
import { render } from 'vitest-browser-react';
import { createRoutesStub } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { getRecordTitle } from '@/utils/getRecordTitle';
import { AutocompleteFilter } from '../AutocompleteFilter';

vi.mock('@/utils/getRecordTitle');

describe('AutocompleteFilter', () => {
  it('renders a AutocompleteFilter', async () => {
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

    const screen = await render(<RoutesStub />);

    await expect
      .element(
        screen.getByRole('combobox', {
          name: 'autocompleteFilterText',
        }),
      )
      .toBeVisible();
  });

  it('renders a AutocompleteFilter with current value', async () => {
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

    const screen = await render(<RoutesStub />);

    await expect
      .element(
        screen.getByRole('combobox', {
          name: 'autocompleteFilterText',
        }),
      )
      .toBeVisible();
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

    const screen = await render(<RoutesStub />);

    await expect
      .element(
        screen.getByRole('combobox', {
          name: 'autocompleteFilterText',
        }),
      )
      .toBeVisible();

    RoutesStub = createStub('someRecordType_2');
    screen.rerender(<RoutesStub />);

    await expect
      .element(
        screen.getByRole('combobox', {
          name: 'autocompleteFilterText',
        }),
      )
      .toBeVisible();
  });

  it('does not overwrite user input in AutocompleteFilter when currentValue changes', async () => {
    vi.mocked(getRecordTitle).mockReturnValue('Result 1');
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

    const screen = await render(<RoutesStub />);

    const autocomplete = screen.getByRole('combobox', {
      name: 'autocompleteFilterText',
    });

    await autocomplete.fill('A');

    await expect.element(screen.getByText('Result 1')).toBeVisible();

    await screen.getByText('Result 1').click();

    await expect.element(autocomplete).toHaveValue('Result 1');

    RoutesStub = createStub('someRecordType_stale');
    screen.rerender(<RoutesStub />);

    await expect.element(autocomplete).toHaveValue('Result 1');
  });

  it('renders validation error for AutocompleteFilter', async () => {
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

    const screen = await render(<RoutesStub />);

    await expect.element(screen.getByText('Some error')).toBeVisible();
    await expect
      .element(screen.getByRole('combobox', { name: 'autocompleteFilterText' }))
      .toHaveAttribute('aria-invalid', 'true');
  });

  it('is possible to search and select a value in autocomplete filter', async () => {
    vi.mocked(getRecordTitle).mockReturnValue('Result 1');
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

    const screen = await render(<RoutesStub />);

    const autocomplete = screen.getByRole('combobox', {
      name: 'autocompleteFilterText',
    });

    await autocomplete.fill('A');

    await expect.element(screen.getByText('Result 1')).toBeVisible();

    await screen.getByText('Result 1').click();

    await expect.element(autocomplete).toHaveValue('Result 1');
    expect(forceSubmitSpy).toHaveBeenCalledTimes(1);
  });
});
