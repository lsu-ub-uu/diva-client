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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import type { BFFDataRecordData, BFFSearchResult } from '@/types/record';
import { useTranslation } from 'react-i18next';
import type { SearchFormSchema } from '../FormGenerator/types';
import styles from './SearchForm.module.css';
import { Pagination } from '@/components/Form/Pagination';
import { Button } from '@/components/Button/Button';
import FilterChip from '@/components/FilterChip/FilterChip';
import { useState } from 'react';
import { InputChip } from '@/components/Form/InputChip';
import { SearchIcon } from '@/icons';
import { Field } from '@/components/Input/Field';
import { Input } from '@/components/Input/Input';
import { example1 } from '@/components/Form/example1';

interface SearchFormProps {
  data?: BFFDataRecordData;
  formSchema: SearchFormSchema;
  searchResults?: BFFSearchResult;
}

export const SearchForm = ({ data, searchResults }: SearchFormProps) => {
  const [query, setQuery] = useState('');
  const [myPubFilter, setMyPubFilter] = useState(false);
  const [readyForPublicationFilter, setReadyForPublicationFilter] =
    useState(false);
  const [readyForReviewFilter, setReadyForReviewFilter] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setQuery(e.currentTarget.query.value);
      }}
    >
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <FilterChip
          label='Mina publikationer'
          checked={myPubFilter}
          onChange={setMyPubFilter}
        />
        <FilterChip
          label='Redo för publicering'
          checked={readyForPublicationFilter}
          onChange={setReadyForPublicationFilter}
        />
        <FilterChip
          label='Redo för granskning'
          checked={readyForReviewFilter}
          onChange={setReadyForReviewFilter}
        />
      </div>
      <div className={styles['search-form']}>
        <Field>
          <Input name='query' />
        </Field>
        <SearchButton />
        {!searchResults && (
          <input type='hidden' name='search.rows[0].value' value='10' />
        )}

        {data && searchResults && (
          <Pagination
            searchResults={searchResults}
            onRowsPerPageChange={(e) => {}}
          />
        )}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            gridColumn: 'span 2',
          }}
        >
          Aktiva filter:
          {myPubFilter && (
            <InputChip
              label='Mina publikationer'
              onClose={() => setMyPubFilter(false)}
            />
          )}
          {readyForPublicationFilter && (
            <InputChip
              label='Redo för publicering'
              onClose={() => setReadyForPublicationFilter(false)}
            />
          )}
          {readyForReviewFilter && (
            <InputChip
              label='Redo för granskning'
              onClose={() => setReadyForReviewFilter(false)}
            />
          )}
        </div>
      </div>
    </form>
  );
};
example1;

const SearchButton = () => {
  const { t } = useTranslation();

  return (
    <Button type='submit' variant='primary' className={styles['search-button']}>
      <SearchIcon /> {t('divaClient_SearchButtonText')}
    </Button>
  );
};
