/*
 * Copyright 2023 Uppsala University Library
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

import { expect } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSnackbar } from 'notistack';
import { render } from '../../../utils/testUtils';
import { Snackbar } from '@/components/Snackbar/Snackbar';

const Button = () => {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <button
      type='button'
      onClick={() =>
        enqueueSnackbar(`Subject was successfully added`, {
          variant: 'success',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        })
      }
    >
      Test Button
    </button>
  );
};

describe('<Snackbar />', () => {
  it('It renders a Snackbar when open', () => {
    render(
      <Snackbar
        open={true}
        onClose={vi.fn()}
        text='Snacktext'
        severity='info'
      />,
    );

    const snackbar = screen.getByRole('alert');
    expect(snackbar).toBeInTheDocument();

    expect(within(snackbar).getByText('Snacktext')).toBeInTheDocument();
  });

  it('It does not render Snackbar when closed', () => {
    render(
      <Snackbar
        open={false}
        onClose={vi.fn()}
        text='Snacktext'
        severity='info'
      />,
    );

    const snackbar = screen.queryByRole('alert');
    expect(snackbar).not.toBeInTheDocument();
  });

  it('calls onClose after autoCloseDelay ms', () => {
    vi.useFakeTimers();

    const onCloseSpy = vi.fn();
    render(
      <Snackbar
        open={true}
        onClose={onCloseSpy}
        text='Snacktext'
        severity='info'
        autoCloseDelay={1000}
      />,
    );

    vi.advanceTimersByTime(1000);
    expect(onCloseSpy).toHaveBeenCalled();
  });
});
