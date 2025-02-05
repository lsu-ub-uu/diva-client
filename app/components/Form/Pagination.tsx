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
  const { register, getValues } = useRemixFormContext();

  const rowsPerPage = Number(getValues('search.rows[0].value'));
  const isOnFirstPage = searchResults.fromNo <= 1;
  const isOnLastPage = searchResults.toNo >= searchResults.totalNo;

  const firstPageStart = 1;
  const previousPageStart = Math.max(1, searchResults.fromNo - rowsPerPage);
  const nextPageStart = searchResults.toNo + 1;
  const lastPageStart = searchResults.totalNo - rowsPerPage + 1;
  const { t } = useTranslation();
  return (
    <div>
      <span>
        {t('divaClient_paginationResultText', {
          fromNo: searchResults.fromNo,
          toNo: searchResults.toNo,
          totalNo: searchResults.totalNo,
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
        name='search.start[0].value'
        value={firstPageStart}
        disabled={isOnFirstPage}
      >
        <KeyboardDoubleArrowLeftIcon />
      </button>
      <button
        type='submit'
        name='search.start[0].value'
        value={previousPageStart}
        disabled={isOnFirstPage}
      >
        <KeyboardArrowLeftIcon />
      </button>
      <button
        type='submit'
        name='search.start[0].value'
        value={nextPageStart}
        disabled={isOnLastPage}
      >
        <KeyboardArrowRightIcon />
      </button>
      <button
        aria-label='lastPage'
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
