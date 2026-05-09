import { vi, describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Filter } from '../Filter';
import userEvent from '@testing-library/user-event';
import type {
  TextFilter,
  NumberFilter,
  CollectionFilter,
  AutocompleteFilter,
} from '@/routes/record/recordSearch/utils/createFilterDefinition.server';
import { createRoutesStub } from 'react-router';

describe('Filter', () => {
  it('renders a TextFilter', () => {
    const filter: TextFilter = {
      type: 'text',
      id: 'someTextFilterId',
      name: 'someTextFilterName',
      textId: 'textFilterText',
      placeholderTextId: 'textFilterPlaceholderText',
    };

    render(
      <Filter
        filter={filter}
        currentValue=''
        onChange={vi.fn()}
        forceSubmit={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('textbox', { name: 'textFilterText' }),
    ).toHaveAttribute('name', 'someTextFilterName');
  });

  it('renders a TextFilter with current value', () => {
    const filter: TextFilter = {
      type: 'text',
      id: 'someTextFilterId',
      name: 'someTextFilterName',
      textId: 'textFilterText',
      placeholderTextId: 'textFilterPlaceholderText',
    };

    render(
      <Filter
        filter={filter}
        currentValue='Some value'
        onChange={vi.fn()}
        forceSubmit={vi.fn()}
      />,
    );

    expect(screen.getByRole('textbox', { name: 'textFilterText' })).toHaveValue(
      'Some value',
    );
  });

  it('syncs TextFilter value when currentValue changes', async () => {
    const filter: TextFilter = {
      type: 'text',
      id: 'someTextFilterId',
      name: 'someTextFilterName',
      textId: 'textFilterText',
      placeholderTextId: 'textFilterPlaceholderText',
    };

    const { rerender } = render(
      <Filter
        filter={filter}
        currentValue='Initial value'
        onChange={vi.fn()}
        forceSubmit={vi.fn()}
      />,
    );

    expect(screen.getByRole('textbox', { name: 'textFilterText' })).toHaveValue(
      'Initial value',
    );

    rerender(
      <Filter
        filter={filter}
        currentValue='Updated value'
        onChange={vi.fn()}
        forceSubmit={vi.fn()}
      />,
    );

    expect(screen.getByRole('textbox', { name: 'textFilterText' })).toHaveValue(
      'Updated value',
    );
  });

  it('renders a NumberFilter', () => {
    const filter: NumberFilter = {
      type: 'number',
      id: 'someNumberFilterId',
      name: 'someNumberFilterName',
      textId: 'numberFilterText',
      min: 0,
      max: 100,
      placeholderTextId: 'numberFilterPlaceholderText',
    };

    render(
      <Filter
        filter={filter}
        currentValue='42'
        onChange={vi.fn()}
        forceSubmit={vi.fn()}
      />,
    );

    const spinbutton = screen.getByRole('spinbutton', {
      name: 'numberFilterText',
    });
    expect(spinbutton).toHaveAttribute('name', 'someNumberFilterName');
    expect(spinbutton).toHaveValue(42);
  });

  it('renders a CollectionFilter', () => {
    const filter: CollectionFilter = {
      type: 'collection',
      id: 'someCollectionFilterId',
      name: 'someCollectionFilterName',
      textId: 'collectionFilterText',
      placeholderTextId: 'collectionFilterPlaceholderText',
      options: [
        { value: 'option1', text: 'Option 1' },
        { value: 'option2', text: 'Option 2' },
        { value: 'option3', text: 'Option 3' },
      ],
    };

    render(
      <Filter
        filter={filter}
        currentValue=''
        onChange={vi.fn()}
        forceSubmit={vi.fn()}
      />,
    );

    const listbox = screen.getByRole('combobox', {
      name: 'collectionFilterText',
    });
    expect(listbox).toHaveAttribute('name', 'someCollectionFilterName');

    expect(screen.getByRole('option', { name: 'Option 1' })).toHaveValue(
      'option1',
    );
    expect(screen.getByRole('option', { name: 'Option 2' })).toHaveValue(
      'option2',
    );

    expect(screen.getByRole('option', { name: 'Option 3' })).toHaveValue(
      'option3',
    );
  });

  it('renders a CollectionFilter with current value', () => {
    const filter: CollectionFilter = {
      type: 'collection',
      id: 'someCollectionFilterId',
      name: 'someCollectionFilterName',
      textId: 'collectionFilterText',
      placeholderTextId: 'collectionFilterPlaceholderText',
      options: [
        { value: 'option1', text: 'Option 1' },
        { value: 'option2', text: 'Option 2' },
        { value: 'option3', text: 'Option 3' },
      ],
    };

    render(
      <Filter
        filter={filter}
        currentValue='option2'
        onChange={vi.fn()}
        forceSubmit={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('combobox', {
        name: 'collectionFilterText',
      }),
    ).toHaveValue('option2');
  });

  it('syncs CollectionFilter value when currentValue changes', () => {
    const filter: CollectionFilter = {
      type: 'collection',
      id: 'someCollectionFilterId',
      name: 'someCollectionFilterName',
      textId: 'collectionFilterText',
      placeholderTextId: 'collectionFilterPlaceholderText',
      options: [
        { value: 'option1', text: 'Option 1' },
        { value: 'option2', text: 'Option 2' },
        { value: 'option3', text: 'Option 3' },
      ],
    };

    const { rerender } = render(
      <Filter
        filter={filter}
        currentValue='option2'
        onChange={vi.fn()}
        forceSubmit={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('combobox', {
        name: 'collectionFilterText',
      }),
    ).toHaveValue('option2');

    rerender(
      <Filter
        filter={filter}
        currentValue='option3'
        onChange={vi.fn()}
        forceSubmit={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('combobox', {
        name: 'collectionFilterText',
      }),
    ).toHaveValue('option3');
  });

  it('renders a AutocompleteFilter', () => {
    const filter: AutocompleteFilter = {
      recordType: 'someRecordType',
      type: 'autocomplete',
      id: 'someAutocompleteFilterId',
      name: 'someAutocompleteFilterName',
      textId: 'autocompleteFilterText',
      searchType: 'someSearchType',
      searchTerm: 'someSearchTerm',
      presentationPath: {
        sv: 'some.sv.path',
        en: 'some.en.path',
      },
      placeholderTextId: 'autocompleteFilterPlaceholderText',
    };

    const autocompleteMock = vi.fn();

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <Filter
            filter={filter}
            currentValue=''
            onChange={vi.fn()}
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

  it('is possible to search in autocomplete filter', async () => {
    const user = userEvent.setup();
    const filter: AutocompleteFilter = {
      recordType: 'someRecordType',
      type: 'autocomplete',
      id: 'someAutocompleteFilterId',
      name: 'someAutocompleteFilterName',
      textId: 'autocompleteFilterText',
      searchType: 'someSearchType',
      searchTerm: 'someSearchTerm',
      presentationPath: {
        sv: 'some.sv.path',
        en: 'some.en.path',
      },
      placeholderTextId: 'autocompleteFilterPlaceholderText',
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

    const onChangeSpy = vi.fn();
    const forceSubmitSpy = vi.fn();

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <Filter
            filter={filter}
            currentValue=''
            onChange={onChangeSpy}
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
  });
});
