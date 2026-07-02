/*
 * Copyright 2026 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

import { Autocomplete } from '@/components/Autocomplete/Autocomplete';
import { userEvent } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';

const mockOptions = [
  { value: 'option1', presentation: 'Option One' },
  { value: 'option2', presentation: 'Option Two' },
  { value: 'option3', presentation: 'Option Three' },
];

const disabledOption = {
  value: 'disabled',
  presentation: 'Disabled Option',
  disabled: true,
};

describe('<Autocomplete />', () => {
  it('renders input field with placeholder', async () => {
    const screen = await render(
      <Autocomplete
        options={mockOptions}
        value='option1'
        onChange={vi.fn()}
        onAutocompleteInputChange={vi.fn()}
        placeholder='Search...'
      />,
    );

    const input = screen.getByRole('combobox');
    await expect.element(input).toHaveAttribute('placeholder', 'Search...');
  });

  it('displays options in popover when input is focused', async () => {
    const screen = await render(
      <Autocomplete
        options={mockOptions}
        value='option1'
        onChange={vi.fn()}
        onAutocompleteInputChange={vi.fn()}
      />,
    );

    const input = screen.getByRole('combobox');
    await input.click();

    for (const option of mockOptions) {
      const optionElement = screen.getByText(option.presentation);
      await expect.element(optionElement).toBeVisible();
    }
  });

  it('calls onChange when an option is selected', async () => {
    const onChange = vi.fn();
    const screen = await render(
      <Autocomplete
        options={mockOptions}
        value='option1'
        onChange={onChange}
        onAutocompleteInputChange={vi.fn()}
      />,
    );

    const input = screen.getByRole('combobox');
    await input.click();

    const option2 = screen.getByRole('option', { name: 'Option Two' });
    await option2.click();

    expect(onChange).toHaveBeenCalledWith('option2');
  });

  it('updates input value when option is selected', async () => {
    const screen = await render(
      <Autocomplete
        options={mockOptions}
        value='option1'
        onChange={vi.fn()}
        onAutocompleteInputChange={vi.fn()}
      />,
    );

    const input = screen.getByRole('combobox');
    await input.click();

    const option2 = screen.getByRole('option', { name: 'Option Two' });
    await option2.click();

    await expect.element(input).toHaveValue('Option Two');
  });

  it('calls onAutocompleteInputChange when typing in input', async () => {
    const onAutocompleteInputChange = vi.fn();
    const screen = await render(
      <Autocomplete
        options={mockOptions}
        value='option1'
        onChange={vi.fn()}
        onAutocompleteInputChange={onAutocompleteInputChange}
      />,
    );

    const input = screen.getByRole('combobox');
    await input.click();
    await input.fill('test');

    expect(onAutocompleteInputChange).toHaveBeenCalledWith('test');
  });

  it('navigates options with ArrowDown key', async () => {
    const screen = await render(
      <Autocomplete
        options={mockOptions}
        value='option1'
        onChange={vi.fn()}
        onAutocompleteInputChange={vi.fn()}
      />,
    );

    const input = screen.getByRole('combobox');
    await input.click();

    const option1 = screen.getByRole('option', { name: 'Option One' });
    await expect.element(option1).toHaveAttribute('data-active', 'true');

    await userEvent.keyboard('{ArrowDown}');

    const option2 = screen.getByRole('option', { name: 'Option Two' });
    await expect.element(option2).toHaveAttribute('data-active', 'true');
  });

  it('navigates options with ArrowUp key', async () => {
    const screen = await render(
      <Autocomplete
        options={mockOptions}
        value='option1'
        onChange={vi.fn()}
        onAutocompleteInputChange={vi.fn()}
      />,
    );

    const input = screen.getByRole('combobox');
    await input.click();

    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');

    const option3 = screen.getByRole('option', { name: 'Option Three' });
    await expect.element(option3).toHaveAttribute('data-active', 'true');

    await userEvent.keyboard('{ArrowUp}');

    const option2 = screen.getByRole('option', { name: 'Option Two' });
    await expect.element(option2).toHaveAttribute('data-active', 'true');
  });

  it('wraps around when navigating past last option with ArrowDown', async () => {
    const screen = await render(
      <Autocomplete
        options={mockOptions}
        value='option1'
        onChange={vi.fn()}
        onAutocompleteInputChange={vi.fn()}
      />,
    );

    const input = screen.getByRole('combobox');
    await input.click();

    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');

    const option1 = screen.getByRole('option', { name: 'Option One' });
    await expect.element(option1).toHaveAttribute('data-active', 'true');
  });

  it('wraps around when navigating before first option with ArrowUp', async () => {
    const screen = await render(
      <Autocomplete
        options={mockOptions}
        value='option1'
        onChange={vi.fn()}
        onAutocompleteInputChange={vi.fn()}
      />,
    );

    const input = screen.getByRole('combobox');
    await input.click();

    await userEvent.keyboard('{ArrowUp}');

    const option3 = screen.getByRole('option', { name: 'Option Three' });
    await expect.element(option3).toHaveAttribute('data-active', 'true');
  });

  it('selects active option with Enter key', async () => {
    const onChange = vi.fn();
    const screen = await render(
      <Autocomplete
        options={mockOptions}
        value='option1'
        onChange={onChange}
        onAutocompleteInputChange={vi.fn()}
      />,
    );

    const input = screen.getByRole('combobox');
    await input.click();
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');

    expect(onChange).toHaveBeenCalledWith('option2');
  });

  it('does not select when Enter is pressed with closed popover', async () => {
    const onChange = vi.fn();
    const screen = await render(
      <Autocomplete
        options={[]}
        value='option1'
        onChange={onChange}
        onAutocompleteInputChange={vi.fn()}
      />,
    );

    const input = screen.getByRole('combobox');
    await input.click();
    await userEvent.keyboard('{Enter}');

    expect(onChange).not.toHaveBeenCalled();
  });

  it('displays loading indicator when loading is true', async () => {
    const screen = await render(
      <Autocomplete
        options={mockOptions}
        value='option1'
        onChange={vi.fn()}
        onAutocompleteInputChange={vi.fn()}
        loading={true}
      />,
    );

    const loader = screen.getByRole('status');
    await expect.element(loader).toBeInTheDocument();
  });

  it('disables input when disabled is true', async () => {
    const screen = await render(
      <Autocomplete
        options={mockOptions}
        value='option1'
        onChange={vi.fn()}
        onAutocompleteInputChange={vi.fn()}
        disabled={true}
      />,
    );

    const input = screen.getByRole('combobox');
    await expect.element(input).toBeDisabled();
  });

  it('sets aria-invalid when invalid is true', async () => {
    const screen = await render(
      <Autocomplete
        options={mockOptions}
        value='option1'
        onChange={vi.fn()}
        onAutocompleteInputChange={vi.fn()}
        invalid={true}
      />,
    );

    const input = screen.getByRole('combobox');
    await expect.element(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('updates display value when displayValue prop changes', async () => {
    const { rerender, getByRole } = await render(
      <Autocomplete
        options={mockOptions}
        value='option1'
        onChange={vi.fn()}
        onAutocompleteInputChange={vi.fn()}
        displayValue='Initial'
      />,
    );

    const input = getByRole('combobox');
    await expect.element(input).toHaveValue('Initial');

    await rerender(
      <Autocomplete
        options={mockOptions}
        value='option1'
        onChange={vi.fn()}
        onAutocompleteInputChange={vi.fn()}
        displayValue='Updated'
      />,
    );

    await expect.element(input).toHaveValue('Updated');
  });

  it('does not allow selecting disabled options with mouse', async () => {
    const onChange = vi.fn();
    const screen = await render(
      <Autocomplete
        options={[...mockOptions, disabledOption]}
        value='option1'
        onChange={onChange}
        onAutocompleteInputChange={vi.fn()}
      />,
    );

    const input = screen.getByRole('combobox');
    await input.click();

    const disabledBtn = screen.getByRole('option', {
      name: 'Disabled Option',
    });
    await expect.element(disabledBtn).toBeDisabled();
  });

  it('marks selected option with aria-selected', async () => {
    const screen = await render(
      <Autocomplete
        options={mockOptions}
        value='option2'
        onChange={vi.fn()}
        onAutocompleteInputChange={vi.fn()}
      />,
    );

    const input = screen.getByRole('combobox');
    await input.click();

    const option2 = screen.getByRole('option', { name: 'Option Two' });
    await expect.element(option2).toHaveAttribute('aria-selected', 'true');

    const option1 = screen.getByRole('option', { name: 'Option One' });
    await expect.element(option1).toHaveAttribute('aria-selected', 'false');
  });

  it('closes popover when option is selected', async () => {
    const screen = await render(
      <Autocomplete
        options={mockOptions}
        value='option1'
        onChange={vi.fn()}
        onAutocompleteInputChange={vi.fn()}
      />,
    );

    const input = screen.getByRole('combobox');
    await input.click();

    const option2 = screen.getByRole('option', { name: 'Option Two' });
    await option2.click();

    const option1 = screen.getByRole('option', { name: 'Option One' });
    await expect.element(option1).not.toBeVisible();
  });

  it('opens popover when ArrowDown is pressed with empty options', async () => {
    const screen = await render(
      <Autocomplete
        options={[]}
        value=''
        onChange={vi.fn()}
        onAutocompleteInputChange={vi.fn()}
      />,
    );

    const input = screen.getByRole('combobox');
    await input.click();
    await userEvent.keyboard('{ArrowDown}');

    // Popover should not open when there are no options
    const listbox = screen.getByRole('listbox');
    await expect.element(listbox).not.toBeVisible();
  });

  it('has correct aria attributes for accessibility', async () => {
    const screen = await render(
      <Autocomplete
        options={mockOptions}
        value='option1'
        onChange={vi.fn()}
        onAutocompleteInputChange={vi.fn()}
      />,
    );

    const input = screen.getByRole('combobox');
    await expect.element(input).toHaveAttribute('role', 'combobox');
    await expect.element(input).toHaveAttribute('aria-autocomplete', 'list');
    await expect.element(input).toHaveAttribute('aria-haspopup', 'listbox');
  });

  it('updates aria-expanded based on popover state', async () => {
    const screen = await render(
      <Autocomplete
        options={mockOptions}
        value='option1'
        onChange={vi.fn()}
        onAutocompleteInputChange={vi.fn()}
      />,
    );

    const input = screen.getByRole('combobox');
    await expect.element(input).toHaveAttribute('aria-expanded', 'false');

    await input.click();
    await expect.element(input).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders with no options initially', async () => {
    const screen = await render(
      <Autocomplete
        options={[]}
        value=''
        onChange={vi.fn()}
        onAutocompleteInputChange={vi.fn()}
      />,
    );

    const input = screen.getByRole('combobox');
    await expect.element(input).toBeInTheDocument();

    const listbox = screen.getByRole('listbox');
    const listItems = listbox.getByRole('listitem');
    await expect.element(listItems).not.toBeInTheDocument();
  });
});
