import type { CollectionFilter } from '@/routes/record/recordSearch/utils/createFilterDefinition.server';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CollectionComboboxFilter } from '../CollectionComboboxFilter';
import userEvent from '@testing-library/user-event';

describe('CollectionComboboxFilter', () => {
  it('renders a CollectionFilter', async () => {
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

    render(
      <CollectionComboboxFilter
        filter={filter}
        currentValue=''
        forceSubmit={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('combobox', {
        name: 'collectionFilterText',
      }),
    ).toBeInTheDocument();
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
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
    };

    render(
      <CollectionComboboxFilter
        filter={filter}
        currentValue='option1'
        forceSubmit={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('combobox', {
        name: 'collectionFilterText',
      }),
    ).toHaveValue('Option 1');
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
      <CollectionComboboxFilter
        filter={filter}
        currentValue='option2'
        forceSubmit={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('combobox', {
        name: 'collectionFilterText',
      }),
    ).toHaveValue('Option 2');

    rerender(
      <CollectionComboboxFilter
        filter={filter}
        currentValue='option3'
        forceSubmit={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('combobox', {
        name: 'collectionFilterText',
      }),
    ).toHaveValue('Option 3');
  });

  it('calls forceSubmit when user selects a new value', async () => {
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

    const forceSubmitSpy = vi.fn();

    render(
      <CollectionComboboxFilter
        filter={filter}
        currentValue='option1'
        forceSubmit={forceSubmitSpy}
      />,
    );

    const combobox = screen.getByRole('combobox', {
      name: 'collectionFilterText',
    });
    const user = userEvent.setup();
    await user.click(combobox);
    await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');

    expect(forceSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('does not overwrite user selection when a stale currentValue arrives', async () => {
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
      repeat: { repeatMin: 0, repeatMax: 1 },
    };

    const { rerender } = render(
      <CollectionComboboxFilter
        filter={filter}
        currentValue=''
        forceSubmit={vi.fn()}
      />,
    );

    const combobox = screen.getByRole('combobox', {
      name: 'collectionFilterText',
    });
    const user = userEvent.setup();

    // User selects option2 (first ArrowDown from empty) — pendingSync becomes true
    await user.click(combobox);
    await user.keyboard('{ArrowDown}{Enter}');

    // A stale navigation completes with a different currentValue before the
    // user's own navigation finishes
    rerender(
      <CollectionComboboxFilter
        filter={filter}
        currentValue='option1'
        forceSubmit={vi.fn()}
      />,
    );

    // User's selection (option2) must be preserved
    expect(combobox).toHaveValue('Option 2');
  });
});
