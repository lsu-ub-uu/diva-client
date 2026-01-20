import { vi, describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { ActiveFilters } from '../ActiveFilters';
import userEvent from '@testing-library/user-event';

describe('ActiveFilters', () => {
  it('renders nothing when no active filters', () => {
    render(<ActiveFilters activeFilters={[]} handleRemoveFilter={vi.fn()} />);
    expect(
      screen.queryByText('divaClient_activeFiltersText'),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
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
        handleRemoveFilter={vi.fn()}
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

    expect(screen.getAllByRole('button').length).toBe(2);
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
        handleRemoveFilter={removeFilterSpy}
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
