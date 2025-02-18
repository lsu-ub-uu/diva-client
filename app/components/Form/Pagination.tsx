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

import { useTranslation } from 'react-i18next';
import type { ChangeEvent } from 'react';
import { useRemixFormContext } from 'remix-hook-form';
import {
  FirstPageIcon,
  LastPageIcon,
  NextPageIcon,
  PreviousPageIcon,
} from '@/icons';
import { Button } from '@/components/Button/Button';
import styles from './Pagination.module.css';
import { Field } from '@/components/Input/Field';
import { Select } from '@/components/Input/Select';

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
    <div className={styles['pagination']}>
      <span>
        {t('divaClient_paginationResultText', {
          fromNo,
          toNo,
          totalNo,
        })}
      </span>
      <Field
        label={t('divaClient_paginationRowsPerPageText')}
        variant='inline'
        size='small'
      >
        <Select
          {...register('search.rows[0].value')}
          onChange={onRowsPerPageChange}
        >
          {rowsPerPageOptions.map((rows) => (
            <option key={rows} value={rows}>
              {rows}
            </option>
          ))}
        </Select>
      </Field>

      <span className={styles['pagination-buttons']}>
        <Button
          variant='icon'
          type='submit'
          aria-label={t('divaClient_paginationFirstPageText')}
          name='search.start[0].value'
          value={firstPageStart}
          disabled={isOnFirstPage}
        >
          <FirstPageIcon />
        </Button>
        <Button
          variant='icon'
          type='submit'
          aria-label={t('divaClient_paginationPreviousPageText')}
          name='search.start[0].value'
          value={previousPageStart}
          disabled={isOnFirstPage}
        >
          <PreviousPageIcon />
        </Button>
        <Button
          variant='icon'
          type='submit'
          aria-label={t('divaClient_paginationNextPageText')}
          name='search.start[0].value'
          value={nextPageStart}
          disabled={isOnLastPage}
        >
          <NextPageIcon />
        </Button>
        <Button
          variant='icon'
          aria-label={t('divaClient_paginationLastPageText')}
          type='submit'
          name='search.start[0].value'
          value={lastPageStart}
          disabled={isOnLastPage}
        >
          <LastPageIcon />
        </Button>
      </span>
    </div>
  );
};
