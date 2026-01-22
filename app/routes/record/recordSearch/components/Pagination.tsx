/*
 * Copyright 2025 Uppsala 
niversity Library
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
import { useTranslation } from 'react-i18next';
import { Fieldset } from '@/components/Input/Fieldset';
import { Select } from '@/components/Input/Select';
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';

import styles from './Pagination.module.css';
import { IconButton } from '@/components/IconButton/IconButton';
import { Form } from 'react-router';
import type { ActiveFilter } from './ActiveFilters';
import { SearchHiddenInputs } from './SearchHiddenInputs';

interface PaginationProps {
  rowsPerPage: number;
  searchResults: BFFSearchResult;
  start: number;
  query: string;
  onQueryChange: (form: HTMLFormElement) => void;
  activeFilters: ActiveFilter[];
}

const ROWS_START_INPUT_NAME = 'start';
const ROWS_PER_PAGE_INPUT_NAME = 'rows';
const rowsPerPageOptions = [10, 20, 40, 60, 100];

export const Pagination = ({
  rowsPerPage,
  searchResults,
  start,
  query,
  onQueryChange,
  activeFilters,
}: PaginationProps) => {
  const { t } = useTranslation();

  const { fromNo, toNo, totalNo } = searchResults;

  const isOnFirstPage = fromNo <= 1;
  const isOnLastPage = toNo >= totalNo;

  const firstPageStart = 1;
  const previousPageStart = Math.max(1, fromNo - rowsPerPage);
  const nextPageStart = toNo + 1;
  const lastPageStart = totalNo - rowsPerPage + 1;

  return (
    <div className={styles['pagination']}>
      <span className={styles['result-text']}>
        {t('divaClient_paginationResultText', {
          fromNo,
          toNo,
          totalNo,
        })}
      </span>

      <Form method='GET' onChange={(e) => onQueryChange(e.currentTarget)}>
        <Fieldset
          label={t('divaClient_paginationRowsPerPageText')}
          variant='inline'
        >
          <Select
            name={ROWS_PER_PAGE_INPUT_NAME}
            defaultValue={rowsPerPage}
            key={rowsPerPage}
          >
            {rowsPerPageOptions.map((rows) => (
              <option key={rows} value={rows}>
                {rows}
              </option>
            ))}
          </Select>
        </Fieldset>
        <SearchHiddenInputs
          query={query}
          start={start}
          activeFilters={activeFilters}
        />
      </Form>

      <Form method='GET' className={styles['pagination-buttons']}>
        <IconButton
          type='submit'
          tooltip={t('divaClient_paginationFirstPageText')}
          name={ROWS_START_INPUT_NAME}
          value={firstPageStart}
          disabled={isOnFirstPage}
        >
          <ChevronFirstIcon />
        </IconButton>
        <IconButton
          type='submit'
          tooltip={t('divaClient_paginationPreviousPageText')}
          name={ROWS_START_INPUT_NAME}
          value={previousPageStart}
          disabled={isOnFirstPage}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          type='submit'
          tooltip={t('divaClient_paginationNextPageText')}
          name={ROWS_START_INPUT_NAME}
          value={nextPageStart}
          disabled={isOnLastPage}
        >
          <ChevronRightIcon />
        </IconButton>
        <IconButton
          type='submit'
          tooltip={t('divaClient_paginationLastPageText')}
          name={ROWS_START_INPUT_NAME}
          value={lastPageStart}
          disabled={isOnLastPage}
        >
          <ChevronLastIcon />
        </IconButton>
        <SearchHiddenInputs
          query={query}
          rows={rowsPerPage}
          activeFilters={activeFilters}
        />
      </Form>
    </div>
  );
};
