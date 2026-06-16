import type { NumberFilter as NumberFilterDef } from '@/routes/record/recordSearch/utils/createFilterDefinition.server';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { NumberFilter } from '../NumberFilter';

describe('NumberFilter', () => {
  it('renders a NumberFilter', () => {
    const filter: NumberFilterDef = {
      type: 'number',
      id: 'someNumberFilterId',
      name: 'someNumberFilterName',
      textId: 'numberFilterText',
      min: 0,
      max: 100,
      placeholderTextId: 'numberFilterPlaceholderText',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
    };

    render(<NumberFilter filter={filter} currentValue='42' />);

    const spinbutton = screen.getByRole('spinbutton', {
      name: 'numberFilterText',
    });
    expect(spinbutton).toHaveAttribute('name', 'someNumberFilterName');
    expect(spinbutton).toHaveValue(42);
  });

  it('renders a NumberFilter with current value', () => {
    const filter: NumberFilterDef = {
      type: 'number',
      id: 'someNumberFilterId',
      name: 'someNumberFilterName',
      textId: 'numberFilterText',
      min: 0,
      max: 100,
      placeholderTextId: 'numberFilterPlaceholderText',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
    };

    render(<NumberFilter filter={filter} currentValue='42' />);

    expect(
      screen.getByRole('spinbutton', { name: 'numberFilterText' }),
    ).toHaveValue(42);
  });

  it('syncs NumberFilter value when currentValue changes', async () => {
    const filter: NumberFilterDef = {
      type: 'number',
      id: 'someNumberFilterId',
      name: 'someNumberFilterName',
      textId: 'numberFilterText',
      min: 0,
      max: 100,
      placeholderTextId: 'numberFilterPlaceholderText',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
    };

    const { rerender } = render(
      <NumberFilter filter={filter} currentValue='42' />,
    );

    expect(
      screen.getByRole('spinbutton', { name: 'numberFilterText' }),
    ).toHaveValue(42);

    rerender(<NumberFilter filter={filter} currentValue='84' />);

    expect(
      screen.getByRole('spinbutton', { name: 'numberFilterText' }),
    ).toHaveValue(84);
  });

  it('does not sync value if user has typed since last currentValue change', async () => {
    const filter: NumberFilterDef = {
      type: 'number',
      id: 'someNumberFilterId',
      name: 'someNumberFilterName',
      textId: 'numberFilterText',
      min: 0,
      max: 100,
      placeholderTextId: 'numberFilterPlaceholderText',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
    };

    const { rerender } = render(
      <NumberFilter filter={filter} currentValue='42' />,
    );

    const spinbutton = screen.getByRole('spinbutton', {
      name: 'numberFilterText',
    });

    expect(spinbutton).toHaveValue(42);

    const user = userEvent.setup();

    await user.clear(spinbutton);
    await user.type(spinbutton, '84');

    rerender(<NumberFilter filter={filter} currentValue='84' />);

    expect(spinbutton).toHaveValue(84);
  });

  it('renders validation error for NumberFilter', () => {
    const filter: NumberFilterDef = {
      type: 'number',
      id: 'someNumberFilterId',
      name: 'someNumberFilterName',
      textId: 'numberFilterText',
      min: 0,
      max: 100,
      placeholderTextId: 'numberFilterPlaceholderText',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
    };

    render(
      <NumberFilter
        filter={filter}
        currentValue='42'
        validationError='numberValidationError'
      />,
    );

    expect(screen.getByText('numberValidationError')).toBeInTheDocument();
    expect(
      screen.getByRole('spinbutton', { name: 'numberFilterText' }),
    ).toHaveAttribute('aria-invalid', 'true');
  });
});
