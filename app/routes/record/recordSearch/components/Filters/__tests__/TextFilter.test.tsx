import type { TextFilter as TextFilterDef } from '@/routes/record/recordSearch/utils/createFilterDefinition.server';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TextFilter } from '../TextFilter';
import userEvent from '@testing-library/user-event';

describe('TextFilter', () => {
  it('renders a TextFilter', () => {
    const filter: TextFilterDef = {
      type: 'text',
      id: 'someTextFilterId',
      name: 'someTextFilterName',
      textId: 'textFilterText',
      placeholderTextId: 'textFilterPlaceholderText',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
      regEx: '.+',
    };

    render(<TextFilter filter={filter} />);

    expect(
      screen.getByRole('textbox', { name: 'textFilterText' }),
    ).toHaveAttribute('name', 'someTextFilterName');
  });

  it('renders a TextFilter with current value', () => {
    const filter: TextFilterDef = {
      type: 'text',
      id: 'someTextFilterId',
      name: 'someTextFilterName',
      textId: 'textFilterText',
      placeholderTextId: 'textFilterPlaceholderText',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
      regEx: '.+',
    };

    render(<TextFilter filter={filter} currentValue='Some value' />);

    expect(screen.getByRole('textbox', { name: 'textFilterText' })).toHaveValue(
      'Some value',
    );
  });

  it('syncs TextFilter value when currentValue changes', async () => {
    const filter: TextFilterDef = {
      type: 'text',
      id: 'someTextFilterId',
      name: 'someTextFilterName',
      textId: 'textFilterText',
      placeholderTextId: 'textFilterPlaceholderText',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
      regEx: '.+',
    };

    const { rerender } = render(
      <TextFilter filter={filter} currentValue='Initial value' />,
    );

    expect(screen.getByRole('textbox', { name: 'textFilterText' })).toHaveValue(
      'Initial value',
    );

    rerender(<TextFilter filter={filter} currentValue='Updated value' />);

    expect(screen.getByRole('textbox', { name: 'textFilterText' })).toHaveValue(
      'Updated value',
    );
  });

  it('does not sync value if user has typed since last currentValue change', async () => {
    const filter: TextFilterDef = {
      type: 'text',
      id: 'someTextFilterId',
      name: 'someTextFilterName',
      textId: 'textFilterText',
      placeholderTextId: 'textFilterPlaceholderText',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
      regEx: '.+',
    };

    const { rerender } = render(
      <TextFilter filter={filter} currentValue='Initial value' />,
    );

    const textbox = screen.getByRole('textbox', { name: 'textFilterText' });

    expect(textbox).toHaveValue('Initial value');

    const user = userEvent.setup();

    await user.clear(textbox);
    await user.type(textbox, 'User input');

    rerender(<TextFilter filter={filter} currentValue='Updated value' />);

    expect(textbox).toHaveValue('User input');
  });

  it('renders validation error for TextFilter', () => {
    const filter: TextFilterDef = {
      type: 'text',
      id: 'someTextFilterId',
      name: 'someTextFilterName',
      textId: 'textFilterText',
      placeholderTextId: 'textFilterPlaceholderText',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
      regEx: '.+',
    };

    render(
      <TextFilter
        filter={filter}
        currentValue=''
        validationError='textValidationError'
      />,
    );

    expect(screen.getByText('textValidationError')).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'textFilterText' }),
    ).toHaveAttribute('aria-invalid', 'true');
  });
});
