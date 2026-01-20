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

import { Pagination } from '@/components/search/Pagination';
import type { BFFSearchResult } from '@/types/record';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';

describe('<Pagination />', () => {
  it('renders rows per page select', () => {
    render(
      <Pagination
        rowsPerPage={10}
        searchResults={mock<BFFSearchResult>({
          fromNo: 1,
          toNo: 10,
          totalNo: 100,
        })}
      />,
    );

    const rowsPerPageSelect = screen.getByRole('combobox', {
      name: 'divaClient_paginationRowsPerPageText',
    });

    expect(rowsPerPageSelect).toHaveAttribute('name', 'rows');
    expect(rowsPerPageSelect).toHaveValue('10');
  });

  it('renders next page button with correct value', async () => {
    render(
      <Pagination
        rowsPerPage={10}
        searchResults={mock<BFFSearchResult>({
          fromNo: 1,
          toNo: 10,
          totalNo: 100,
        })}
      />,
    );

    const nextPageButton = screen.getByRole('button', {
      name: 'divaClient_paginationNextPageText',
    });
    expect(nextPageButton).toHaveAttribute('name', 'start');
    expect(nextPageButton).toHaveAttribute('type', 'submit');
    expect(nextPageButton).toHaveValue('11');
  });

  it('renders previous page button with correct value', () => {
    render(
      <Pagination
        rowsPerPage={10}
        searchResults={mock<BFFSearchResult>({
          fromNo: 21,
          toNo: 30,
          totalNo: 100,
        })}
      />,
    );
    const prevPageButton = screen.getByRole('button', {
      name: 'divaClient_paginationPreviousPageText',
    });
    expect(prevPageButton).toHaveAttribute('name', 'start');
    expect(prevPageButton).toHaveAttribute('type', 'submit');
    expect(prevPageButton).toHaveValue('11');
  });

  it('renders first page button with correct value', () => {
    render(
      <Pagination
        rowsPerPage={10}
        searchResults={mock<BFFSearchResult>({
          fromNo: 21,
          toNo: 30,
          totalNo: 100,
        })}
      />,
    );

    const firstPageButton = screen.getByRole('button', {
      name: 'divaClient_paginationFirstPageText',
    });
    expect(firstPageButton).toHaveAttribute('name', 'start');
    expect(firstPageButton).toHaveAttribute('type', 'submit');
    expect(firstPageButton).toHaveValue('1');
  });

  it('renders last page button with correct value', () => {
    render(
      <Pagination
        rowsPerPage={10}
        searchResults={mock<BFFSearchResult>({
          fromNo: 11,
          toNo: 20,
          totalNo: 100,
        })}
      />,
    );

    const lastPageButton = screen.getByRole('button', {
      name: 'divaClient_paginationLastPageText',
    });
    expect(lastPageButton).toHaveAttribute('name', 'start');
    expect(lastPageButton).toHaveAttribute('type', 'submit');
    expect(lastPageButton).toHaveValue('91');
  });

  it('disables first and previous page buttons when on first page', () => {
    render(
      <Pagination
        rowsPerPage={10}
        searchResults={mock<BFFSearchResult>({
          fromNo: 1,
          toNo: 10,
          totalNo: 100,
        })}
      />,
    );

    expect(
      screen.getByLabelText('divaClient_paginationFirstPageText'),
    ).toBeDisabled();
    expect(
      screen.getByLabelText('divaClient_paginationPreviousPageText'),
    ).toBeDisabled();
    expect(
      screen.getByLabelText('divaClient_paginationNextPageText'),
    ).not.toBeDisabled();
    expect(
      screen.getByLabelText('divaClient_paginationLastPageText'),
    ).not.toBeDisabled();
  });

  it('disables next and last page buttons when on last page', () => {
    render(
      <Pagination
        rowsPerPage={10}
        searchResults={mock<BFFSearchResult>({
          fromNo: 91,
          toNo: 100,
          totalNo: 100,
        })}
      />,
    );
    expect(
      screen.getByLabelText('divaClient_paginationFirstPageText'),
    ).not.toBeDisabled();
    expect(
      screen.getByLabelText('divaClient_paginationPreviousPageText'),
    ).not.toBeDisabled();
    expect(
      screen.getByLabelText('divaClient_paginationNextPageText'),
    ).toBeDisabled();
    expect(
      screen.getByLabelText('divaClient_paginationLastPageText'),
    ).toBeDisabled();
  });

  it('disables all buttons when only one page', () => {
    render(
      <Pagination
        rowsPerPage={10}
        searchResults={mock<BFFSearchResult>({
          fromNo: 1,
          toNo: 8,
          totalNo: 8,
        })}
      />,
    );

    expect(
      screen.getByLabelText('divaClient_paginationFirstPageText'),
    ).toBeDisabled();
    expect(
      screen.getByLabelText('divaClient_paginationPreviousPageText'),
    ).toBeDisabled();
    expect(
      screen.getByLabelText('divaClient_paginationNextPageText'),
    ).toBeDisabled();
    expect(
      screen.getByLabelText('divaClient_paginationLastPageText'),
    ).toBeDisabled();
  });

  it('does not render negative value for previous page button', () => {
    render(
      <Pagination
        rowsPerPage={10}
        searchResults={mock<BFFSearchResult>({
          fromNo: 2,
          toNo: 10,
          totalNo: 100,
        })}
      />,
    );

    expect(
      screen.getByLabelText('divaClient_paginationPreviousPageText'),
    ).toHaveValue('1');
  });

  it('renders correct value for back button when on last page with few items', () => {
    render(
      <Pagination
        rowsPerPage={5}
        searchResults={mock<BFFSearchResult>({
          fromNo: 11,
          toNo: 12,
          totalNo: 12,
        })}
      />,
    );

    expect(
      screen.getByLabelText('divaClient_paginationPreviousPageText'),
    ).toHaveValue('6');
  });
});
