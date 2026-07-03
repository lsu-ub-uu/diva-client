import type { CollectionFilter } from '@/routes/record/recordSearch/utils/createFilterDefinition.server';
import { render } from 'vitest-browser-react';
import { describe, expect, it, vi } from 'vitest';
import { CollectionComboboxFilter } from '../CollectionComboboxFilter';
import { userEvent } from 'vitest/browser';

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

    const screen = await render(
      <CollectionComboboxFilter
        filter={filter}
        currentValue=''
        forceSubmit={vi.fn()}
      />,
    );

    await expect.element(screen.getByRole('combobox')).toBeVisible();
  });

  it('renders a CollectionFilter with current value', async () => {
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

    const screen = await render(
      <CollectionComboboxFilter
        filter={filter}
        currentValue='option1'
        forceSubmit={vi.fn()}
      />,
    );

    await expect
      .element(screen.getByRole('combobox'))
      .toHaveTextContent('Option 1');
  });

  it('syncs CollectionFilter value when currentValue changes', async () => {
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

    const screen = await render(
      <CollectionComboboxFilter
        filter={filter}
        currentValue='option2'
        forceSubmit={vi.fn()}
      />,
    );

    await expect
      .element(screen.getByRole('combobox'))
      .toHaveTextContent('Option 2');

    screen.rerender(
      <CollectionComboboxFilter
        filter={filter}
        currentValue='option3'
        forceSubmit={vi.fn()}
      />,
    );

    await expect
      .element(screen.getByRole('combobox'))
      .toHaveTextContent('Option 3');
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

    const screen = await render(
      <CollectionComboboxFilter
        filter={filter}
        currentValue='option1'
        forceSubmit={forceSubmitSpy}
      />,
    );

    const combobox = screen.getByRole('combobox');
    await combobox.click();
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');

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

    const screen = await render(
      <CollectionComboboxFilter
        filter={filter}
        currentValue=''
        forceSubmit={vi.fn()}
      />,
    );

    const combobox = screen.getByRole('combobox');

    // User selects option1 (first ArrowDown from empty)
    await combobox.click();
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');

    // A stale navigation completes with a different currentValue
    screen.rerender(
      <CollectionComboboxFilter
        filter={filter}
        currentValue='option3'
        forceSubmit={vi.fn()}
      />,
    );

    // User's selection (option1) must be preserved
    await expect.element(combobox).toHaveTextContent('Option 1');
  });
});
