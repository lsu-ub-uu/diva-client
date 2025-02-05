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
          searchResults={mock<BFFSearchResult>()}
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

  it.todo('renders next page button with correct value');
  it.todo('renders previous page button with correct value');
  it.todo('renders first page button with correct value');
  it.todo('renders last page button with correct value');

  it.todo('disables first and previous page buttons when on first page');
  it.todo('disables next and last page buttons when on last page');

  it.todo('does not render negative value for previous page button');
});
