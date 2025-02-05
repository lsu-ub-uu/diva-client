/*
 * Copyright 2025 Uppsala University Library
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

import { render, screen } from '@testing-library/react';
import { Pagination } from '@/components/Form/Pagination';
import { mock } from 'vitest-mock-extended';
import type { BFFSearchResult } from '@/types/record';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';
import { MockFormProvider } from '@/utils/testUtils';

describe('<Pagination />', () => {
  it('renders rows per page select', async () => {
    const onChangeSpy = vi.fn();

    render(
      <MockFormProvider>
        <Pagination
          searchResults={mock<BFFSearchResult>({
            fromNo: 1,
            toNo: 10,
            totalNo: 100,
          })}
          onRowsPerPageChange={onChangeSpy}
        />
      </MockFormProvider>,
    );

    const rowsPerPageSelect = screen.getByRole('combobox', {
      name: 'Rows per page',
    });
    const user = userEvent.setup();
    await user.selectOptions(rowsPerPageSelect, '20');

    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('renders next page button with correct value', async () => {
    render(
      <MockFormProvider>
        <Pagination
          searchResults={mock<BFFSearchResult>({
            fromNo: 1,
            toNo: 10,
            totalNo: 100,
          })}
          onRowsPerPageChange={vi.fn()}
        />
      </MockFormProvider>,
    );

    expect(screen.getByLabelText('Visa nästa sida')).toHaveValue('11');
  });

  it('renders previous page button with correct value', () => {
    render(
      <MockFormProvider>
        <Pagination
          searchResults={mock<BFFSearchResult>({
            fromNo: 21,
            toNo: 30,
            totalNo: 100,
          })}
          onRowsPerPageChange={vi.fn()}
        />
      </MockFormProvider>,
    );

    expect(screen.getByLabelText('Visa föregående sida')).toHaveValue('11');
  });

  it('renders first page button with correct value', () => {
    render(
      <MockFormProvider>
        <Pagination
          searchResults={mock<BFFSearchResult>({
            fromNo: 21,
            toNo: 30,
            totalNo: 100,
          })}
          onRowsPerPageChange={vi.fn()}
        />
      </MockFormProvider>,
    );

    expect(screen.getByLabelText('Visa första sidan')).toHaveValue('1');
  });

  it('renders last page button with correct value', () => {
    render(
      <MockFormProvider>
        <Pagination
          searchResults={mock<BFFSearchResult>({
            fromNo: 11,
            toNo: 20,
            totalNo: 100,
          })}
          onRowsPerPageChange={vi.fn()}
        />
      </MockFormProvider>,
    );

    expect(screen.getByLabelText('Visa sista sidan')).toHaveValue('91');
  });

  it('disables first and previous page buttons when on first page', () => {
    render(
      <MockFormProvider>
        <Pagination
          searchResults={mock<BFFSearchResult>({
            fromNo: 1,
            toNo: 10,
            totalNo: 100,
          })}
          onRowsPerPageChange={vi.fn()}
        />
      </MockFormProvider>,
    );

    expect(screen.getByLabelText('Visa första sidan')).toBeDisabled();
    expect(screen.getByLabelText('Visa föregående sida')).toBeDisabled();
    expect(screen.getByLabelText('Visa nästa sida')).not.toBeDisabled();
    expect(screen.getByLabelText('Visa sista sidan')).not.toBeDisabled();
  });

  it('disables next and last page buttons when on last page', () => {
    render(
      <MockFormProvider>
        <Pagination
          searchResults={mock<BFFSearchResult>({
            fromNo: 91,
            toNo: 100,
            totalNo: 100,
          })}
          onRowsPerPageChange={vi.fn()}
        />
      </MockFormProvider>,
    );

    expect(screen.getByLabelText('Visa första sidan')).not.toBeDisabled();
    expect(screen.getByLabelText('Visa föregående sida')).not.toBeDisabled();
    expect(screen.getByLabelText('Visa nästa sida')).toBeDisabled();
    expect(screen.getByLabelText('Visa sista sidan')).toBeDisabled();
  });

  it('disables all buttons when only one page', () => {
    render(
      <MockFormProvider>
        <Pagination
          searchResults={mock<BFFSearchResult>({
            fromNo: 1,
            toNo: 8,
            totalNo: 8,
          })}
          onRowsPerPageChange={vi.fn()}
        />
      </MockFormProvider>,
    );

    expect(screen.getByLabelText('Visa första sidan')).toBeDisabled();
    expect(screen.getByLabelText('Visa föregående sida')).toBeDisabled();
    expect(screen.getByLabelText('Visa nästa sida')).toBeDisabled();
    expect(screen.getByLabelText('Visa sista sidan')).toBeDisabled();
  });

  it('does not render negative value for previous page button', () => {
    render(
      <MockFormProvider>
        <Pagination
          searchResults={mock<BFFSearchResult>({
            fromNo: 2,
            toNo: 10,
            totalNo: 100,
          })}
          onRowsPerPageChange={vi.fn()}
        />
      </MockFormProvider>,
    );

    expect(screen.getByLabelText('Visa föregående sida')).toHaveValue('1');
  });
});
