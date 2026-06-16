import type {
  AutocompleteFilter,
  CollectionFilter,
  NumberFilter,
  TextFilter,
} from '@/routes/record/recordSearch/utils/createFilterDefinition.server';
import { useHydrated } from '@/utils/useHydrated';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Filter } from '../Filter';

vi.mock('@/utils/useHydrated', () => ({
  useHydrated: vi.fn(() => true),
}));

vi.mock('../TextFilter', () => ({
  TextFilter: () => <div data-testid='text-filter' />,
}));

vi.mock('../NumberFilter', () => ({
  NumberFilter: () => <div data-testid='number-filter' />,
}));

vi.mock('../CollectionSelectFilter', () => ({
  CollectionSelectFilter: () => <div data-testid='collection-select-filter' />,
}));

vi.mock('../CollectionComboboxFilter', () => ({
  CollectionComboboxFilter: () => (
    <div data-testid='collection-combobox-filter' />
  ),
}));

vi.mock('../AutocompleteFilter', () => ({
  AutocompleteFilter: () => <div data-testid='autocomplete-filter' />,
}));

describe('Filter', () => {
  const forceSubmit = vi.fn();
  const mockedUseHydrated = vi.mocked(useHydrated);

  beforeEach(() => {
    mockedUseHydrated.mockReturnValue(true);
  });

  it('renders TextFilter for text type', () => {
    const filter: TextFilter = {
      type: 'text',
      id: 'text-id',
      name: 'textName',
      textId: 'textTextId',
      placeholderTextId: 'textPlaceholderTextId',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
      regEx: '.*',
    };

    render(<Filter filter={filter} forceSubmit={forceSubmit} />);

    expect(screen.getByTestId('text-filter')).toBeInTheDocument();
  });

  it('renders NumberFilter for number type', () => {
    const filter: NumberFilter = {
      type: 'number',
      id: 'number-id',
      name: 'numberName',
      textId: 'numberTextId',
      placeholderTextId: 'numberPlaceholderTextId',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
    };

    render(<Filter filter={filter} forceSubmit={forceSubmit} />);

    expect(screen.getByTestId('number-filter')).toBeInTheDocument();
  });

  it('renders CollectionComboboxFilter for collection type when hydrated and more than 20 options', () => {
    const filter: CollectionFilter = {
      type: 'collection',
      id: 'collection-id',
      name: 'collectionName',
      textId: 'collectionTextId',
      placeholderTextId: 'collectionPlaceholderTextId',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
      options: Array.from({ length: 21 }, (_, index) => ({
        text: `Option ${index}`,
        value: `option-${index}`,
      })),
    };

    render(<Filter filter={filter} forceSubmit={forceSubmit} />);

    expect(
      screen.getByTestId('collection-combobox-filter'),
    ).toBeInTheDocument();
  });

  it('renders CollectionSelectFilter for collection type when not hydrated', () => {
    mockedUseHydrated.mockReturnValue(false);

    const filter: CollectionFilter = {
      type: 'collection',
      id: 'collection-id',
      name: 'collectionName',
      textId: 'collectionTextId',
      placeholderTextId: 'collectionPlaceholderTextId',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
      options: Array.from({ length: 21 }, (_, index) => ({
        text: `Option ${index}`,
        value: `option-${index}`,
      })),
    };

    render(<Filter filter={filter} forceSubmit={forceSubmit} />);

    expect(screen.getByTestId('collection-select-filter')).toBeInTheDocument();
  });

  it('renders AutocompleteFilter for autocomplete type', () => {
    const filter: AutocompleteFilter = {
      type: 'autocomplete',
      id: 'autocomplete-id',
      name: 'autocompleteName',
      textId: 'autocompleteTextId',
      placeholderTextId: 'autocompletePlaceholderTextId',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
      searchType: 'searchType',
      searchTerm: 'searchTerm',
      recordType: 'recordType',
    };

    render(<Filter filter={filter} forceSubmit={forceSubmit} />);

    expect(screen.getByTestId('autocomplete-filter')).toBeInTheDocument();
  });
});
