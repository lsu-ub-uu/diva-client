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

import type { BFFSearchResult } from '@/types/record';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useTranslation } from 'react-i18next';
import type { ChangeEvent } from 'react';
import { useRemixFormContext } from 'remix-hook-form';

interface PaginationProps {
  searchResults: BFFSearchResult;
  onRowsPerPageChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const rowsPerPageOptions = [5, 10, 20, 30, 40, 50];

export const Pagination = ({
  searchResults,
  onRowsPerPageChange,
}: PaginationProps) => {
  const { t } = useTranslation();
  const { register } = useRemixFormContext();

  const { fromNo, toNo, totalNo } = searchResults;
  const rowsPerPage = toNo - fromNo + 1;
  const isOnFirstPage = fromNo <= 1;
  const isOnLastPage = toNo >= totalNo;

  const firstPageStart = 1;
  const previousPageStart = Math.max(1, fromNo - rowsPerPage);
  const nextPageStart = toNo + 1;
  const lastPageStart = totalNo - rowsPerPage + 1;

  return (
    <div>
      <span>
        {t('divaClient_paginationResultText', {
          fromNo,
          toNo,
          totalNo,
        })}
      </span>
      <label>
        Rows per page
        <select
          {...register('search.rows[0].value')}
          onChange={onRowsPerPageChange}
        >
          {rowsPerPageOptions.map((rows) => (
            <option key={rows} value={rows}>
              {rows}
            </option>
          ))}
        </select>
      </label>

      <button
        type='submit'
        aria-label='Visa första sidan'
        name='search.start[0].value'
        value={firstPageStart}
        disabled={isOnFirstPage}
      >
        <KeyboardDoubleArrowLeftIcon />
      </button>
      <button
        type='submit'
        aria-label='Visa föregående sida'
        name='search.start[0].value'
        value={previousPageStart}
        disabled={isOnFirstPage}
      >
        <KeyboardArrowLeftIcon />
      </button>
      <button
        type='submit'
        aria-label='Visa nästa sida'
        name='search.start[0].value'
        value={nextPageStart}
        disabled={isOnLastPage}
      >
        <KeyboardArrowRightIcon />
      </button>
      <button
        aria-label='Visa sista sidan'
        type='submit'
        name='search.start[0].value'
        value={lastPageStart}
        disabled={isOnLastPage}
      >
        <KeyboardDoubleArrowRightIcon />
      </button>
    </div>
  );
};
