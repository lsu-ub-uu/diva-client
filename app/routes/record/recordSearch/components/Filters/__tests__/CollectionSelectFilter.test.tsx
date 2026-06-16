import type { CollectionFilter } from '@/routes/record/recordSearch/utils/createFilterDefinition.server';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CollectionSelectFilter } from '../CollectionSelectFilter';

describe('CollectionSelectFilter', () => {
  it('renders a CollectionSelectFilter', () => {
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
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
    };

    render(<CollectionSelectFilter filter={filter} currentValue='' />);

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

  it('renders a CollectionSelectFilter with current value', () => {
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
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
    };

    render(<CollectionSelectFilter filter={filter} currentValue='option2' />);

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
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
    };

    const { rerender } = render(
      <CollectionSelectFilter filter={filter} currentValue='option2' />,
    );

    expect(
      screen.getByRole('combobox', {
        name: 'collectionFilterText',
      }),
    ).toHaveValue('option2');

    rerender(<CollectionSelectFilter filter={filter} currentValue='option3' />);

    expect(
      screen.getByRole('combobox', {
        name: 'collectionFilterText',
      }),
    ).toHaveValue('option3');
  });
});
