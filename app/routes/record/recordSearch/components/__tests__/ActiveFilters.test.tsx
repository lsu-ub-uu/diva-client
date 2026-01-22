import { vi, describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { ActiveFilters } from '../ActiveFilters';
import userEvent from '@testing-library/user-event';

describe('ActiveFilters', () => {
  it('renders when no active filters', () => {
    render(
      <ActiveFilters
        activeFilters={[]}
        onRemoveFilter={vi.fn()}
        onClearAllFilters={vi.fn()}
        filtersOpen={false}
        setFiltersOpen={vi.fn()}
      />,
    );

    // Use await with findByRole since it's asynchronous
    const button = screen.getByRole('button', {
      name: 'divaClient_showFiltersText',
    });
    expect(button).toBeInTheDocument();

    expect(
      screen.queryByText('divaClient_activeFiltersText'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'divaClient_clearAllFiltersText' }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('renders active filters correctly', () => {
    render(
      <ActiveFilters
        activeFilters={[
          { name: 'filter1', textId: 'Filter1Text', value: 'filter1' },
          {
            name: 'filter2',
            textId: 'Filter2Text',
            value: 'filter2',
            valueTextId: 'Value2Text',
          },
        ]}
        onRemoveFilter={vi.fn()}
        onClearAllFilters={vi.fn()}
        filtersOpen={false}
        setFiltersOpen={vi.fn()}
      />,
    );

    expect(
      screen.getByText('divaClient_activeFiltersText'),
    ).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();

    expect(screen.getByText(/^Filter1Text/)).toBeInTheDocument();
    expect(screen.getByText(/filter1/)).toBeInTheDocument();

    expect(screen.getByText(/^Filter2Text/)).toBeInTheDocument();
    expect(screen.getByText(/Value2Text/)).toBeInTheDocument();
  });

  it('removes filter on button click', async () => {
    const user = userEvent.setup();
    const removeFilterSpy = vi.fn();

    render(
      <ActiveFilters
        activeFilters={[
          { name: 'filter1', textId: 'Filter1Text', value: 'filter1' },
          {
            name: 'filter2',
            textId: 'Filter2Text',
            value: 'filter2',
            valueTextId: 'Value2Text',
          },
        ]}
        onRemoveFilter={removeFilterSpy}
        onClearAllFilters={vi.fn()}
        filtersOpen={false}
        setFiltersOpen={vi.fn()}
      />,
    );

    const filterOne = screen.getByRole('listitem', { name: /Filter1Text/ });
    const removeButton = within(filterOne).getByRole('button', {
      name: 'divaClient_filterRemoveText',
    });
    await user.click(removeButton);
    expect(removeFilterSpy).toHaveBeenCalledWith('filter1');
  });

  it('renders active clear all filters button', async () => {
    const user = userEvent.setup();
    const clearAllFiltersSpy = vi.fn();
    render(
      <ActiveFilters
        activeFilters={[
          { name: 'filter1', textId: 'Filter1Text', value: 'filter1' },
          {
            name: 'filter2',
            textId: 'Filter2Text',
            value: 'filter2',
            valueTextId: 'Value2Text',
          },
        ]}
        onRemoveFilter={vi.fn()}
        onClearAllFilters={clearAllFiltersSpy}
        filtersOpen={false}
        setFiltersOpen={vi.fn()}
      />,
    );

    await user.click(
      screen.getByRole('button', { name: 'divaClient_clearAllFiltersText' }),
    );
    expect(clearAllFiltersSpy).toHaveBeenCalled();
  });

  it('toggles filters open state on button click', async () => {
    const user = userEvent.setup();
    const setFiltersOpenSpy = vi.fn();
    render(
      <ActiveFilters
        activeFilters={[]}
        onRemoveFilter={vi.fn()}
        onClearAllFilters={vi.fn()}
        filtersOpen={false}
        setFiltersOpen={setFiltersOpenSpy}
      />,
    );

    const toggleButton = screen.getByRole('button', {
      name: 'divaClient_showFiltersText',
    });
    await user.click(toggleButton);
    expect(setFiltersOpenSpy).toHaveBeenCalledWith(true);
  });
});
