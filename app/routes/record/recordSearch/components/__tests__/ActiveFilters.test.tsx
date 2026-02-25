import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ActiveFilters } from '../ActiveFilters';

describe('ActiveFilters', () => {
  it('renders when no active filters', () => {
    render(<ActiveFilters activeFilters={[]} onRemoveFilter={vi.fn()} />);
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
      />,
    );

    const filterOne = screen.getByRole('listitem', { name: /Filter1Text/ });
    const removeButton = within(filterOne).getByRole('button', {
      name: 'divaClient_filterRemoveText',
    });
    await user.click(removeButton);
    expect(removeFilterSpy).toHaveBeenCalledWith('filter1');
  });
});
