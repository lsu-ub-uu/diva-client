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

import type { BFFDataRecordData, BFFSearchResult } from '@/types/record';

import type { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { Fieldset } from '@/components/Input/Fieldset';
import { Select } from '@/components/Input/Select';
import { get } from 'lodash-es';
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';
import { IconButton } from '../IconButton/IconButton';
import styles from './Pagination.module.css';

interface PaginationProps {
  query: BFFDataRecordData;
  searchResults: BFFSearchResult;
  onRowsPerPageChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const ROWS_START_INPUT_NAME = 'start';
const ROWS_PER_PAGE_INPUT_NAME = 'rows';
const rowsPerPageOptions = [5, 10, 20, 30, 40, 50];

export const Pagination = ({
  query,
  searchResults,
  onRowsPerPageChange,
}: PaginationProps) => {
  const { t } = useTranslation();

  const { fromNo, toNo, totalNo } = searchResults;
  const rowsPerPage =
    Number(get(query, ROWS_PER_PAGE_INPUT_NAME)) || toNo - fromNo + 1;

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
      <Fieldset
        label={t('divaClient_paginationRowsPerPageText')}
        variant='inline'
        size='small'
      >
        <Select
          name={ROWS_PER_PAGE_INPUT_NAME}
          onChange={onRowsPerPageChange}
          defaultValue={rowsPerPage}
        >
          {rowsPerPageOptions.map((rows) => (
            <option key={rows} value={rows}>
              {rows}
            </option>
          ))}
        </Select>
      </Fieldset>
      <span className={styles['pagination-buttons']}>
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
      </span>
    </div>
  );
};
