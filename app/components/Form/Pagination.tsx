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

import { useTranslation } from 'react-i18next';
import {
  FirstPageIcon,
  LastPageIcon,
  NextPageIcon,
  PreviousPageIcon,
} from '@/icons';
import { Button } from '@/components/Button/Button';
import styles from './Pagination.module.css';
import { Select } from '@/components/Input/Select';
import { get } from 'lodash-es';
import { Fieldset } from '@/components/Input/Fieldset';

interface PaginationProps {
  query: BFFDataRecordData;
  searchResults: BFFSearchResult;
}

const ROWS_START_INPUT_NAME = 'search.start.value';
const ROWS_PER_PAGE_INPUT_NAME = 'search.rows.value';
const rowsPerPageOptions = [5, 10, 20, 30, 40, 50];

export const Pagination = ({ query, searchResults }: PaginationProps) => {
  const { t } = useTranslation();

  const { fromNo, toNo, totalNo } = searchResults;
  const rowsPerPage =
    Number(get(query, 'search.rows.value')) || toNo - fromNo + 1;

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
        <Select name={ROWS_PER_PAGE_INPUT_NAME} defaultValue={rowsPerPage}>
          {rowsPerPageOptions.map((rows) => (
            <option key={rows} value={rows}>
              {rows}
            </option>
          ))}
        </Select>
      </Fieldset>
      <span className={styles['pagination-buttons']}>
        <Button
          variant='icon'
          type='submit'
          aria-label={t('divaClient_paginationFirstPageText')}
          name={ROWS_START_INPUT_NAME}
          value={firstPageStart}
          disabled={isOnFirstPage}
        >
          <FirstPageIcon />
        </Button>
        <Button
          variant='icon'
          type='submit'
          aria-label={t('divaClient_paginationPreviousPageText')}
          name={ROWS_START_INPUT_NAME}
          value={previousPageStart}
          disabled={isOnFirstPage}
        >
          <PreviousPageIcon />
        </Button>
        <Button
          variant='icon'
          type='submit'
          aria-label={t('divaClient_paginationNextPageText')}
          name={ROWS_START_INPUT_NAME}
          value={nextPageStart}
          disabled={isOnLastPage}
        >
          <NextPageIcon />
        </Button>
        <Button
          variant='icon'
          aria-label={t('divaClient_paginationLastPageText')}
          type='submit'
          name={ROWS_START_INPUT_NAME}
          value={lastPageStart}
          disabled={isOnLastPage}
        >
          <LastPageIcon />
        </Button>
      </span>
    </div>
  );
};
