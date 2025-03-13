/*
 * Copyright 2024 Uppsala University Library
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

import type { SearchFormSchema } from '@/components/FormGenerator/types';
import type { BFFDataRecordData, BFFSearchResult } from '@/types/record';
import { useTranslation } from 'react-i18next';
import styles from './RecordSearch.module.css';
import { SearchResultForm } from '@/components/Form/SearchResultForm';
import {
  ArticleIcon,
  ContractIcon,
  EditDocumentIcon,
  MysteryIcon,
  SearchIcon,
  SentimentNeutralIcon,
  VisibilityIcon,
} from '@/icons';
import { Alert, AlertTitle } from '@/components/Alert/Alert';
import { fakeRecords } from '@/__mocks__/prototypeFakeData';
import { searchResultPresentationFake } from '@/components/Form/searchResultPresentationFake';
import { useState } from 'react';
import FilterChip from '@/components/FilterChip/FilterChip';
import { Field } from '@/components/Input/Field';
import { Input } from '@/components/Input/Input';
import { Pagination } from '@/components/Form/Pagination';
import { InputChip } from '@/components/Form/InputChip';
import { Button } from '@/components/Button/Button';
import { Link } from 'react-router';

interface RecordSearchProps {
  searchForm: SearchFormSchema;
  query: BFFDataRecordData;
  searchResults: BFFSearchResult | undefined;
}

const matchesQuery = (record, query) => {
  if (!query) {
    return false;
  }
  const title = record.output.titleInfo.title.value.toLowerCase();
  if (title.includes(query.toLowerCase())) {
    return true;
  }

  if (record.output.name_type_personal) {
    return record.output.name_type_personal.some((name: any) => {
      const givenName = name.namePart_type_given[0]?.value.toLowerCase() || '';
      const familyName =
        name.namePart_type_family[0]?.value.toLowerCase() || '';
      const fullName = `${givenName} ${familyName}`.trim();
      return fullName.includes(query.toLowerCase());
    });
  }
};

export const RecordSearch = ({ searchResults }: RecordSearchProps) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [myPubFilter, setMyPubFilter] = useState(false);
  const [readyForPublicationFilter, setReadyForPublicationFilter] =
    useState(false);
  const [readyForReviewFilter, setReadyForReviewFilter] = useState(false);
  const fakeResults = fakeRecords.filter((recordWrapped) => {
    const { data } = recordWrapped;
    const matchesMyPubFilter = !myPubFilter || (myPubFilter && data.mine);
    const matchesReadyForReviewFilter =
      !readyForReviewFilter || (readyForReviewFilter && data.readyForReview);

    const matchesQuery2 =
      (!query && (myPubFilter || readyForReviewFilter)) ||
      matchesQuery(data, query);

    return matchesMyPubFilter && matchesReadyForReviewFilter && matchesQuery2;
  });

  return (
    <div className={styles['record-search']}>
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
          {/* <FilterChip
            label='Redo för publicering'
            checked={readyForPublicationFilter}
            onChange={setReadyForPublicationFilter}
          />*/}
          <FilterChip
            label='Redo för granskning'
            checked={readyForReviewFilter}
            onChange={setReadyForReviewFilter}
          />
        </div>
        <div className={styles['search-form']}>
          <Field>
            <Input name='query' onChange={(e) => setQuery(e.target.value)} />
          </Field>
          <Button
            type='submit'
            variant='primary'
            className={styles['search-button']}
          >
            <SearchIcon /> {t('divaClient_SearchButtonText')}
          </Button>
          {!searchResults && (
            <input type='hidden' name='search.rows[0].value' value='10' />
          )}

          {query && (
            <Pagination
              searchResults={{
                fromNo: 1,
                toNo: fakeResults.length,
                totalNo: fakeResults.length,
              }}
              onRowsPerPageChange={(e) => {}}
            />
          )}

          {(myPubFilter || readyForReviewFilter) && (
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
          )}
        </div>
      </form>
      {query && fakeResults.length === 0 && (
        <Alert severity='info' icon={<SentimentNeutralIcon />}>
          <AlertTitle>{t('divaClient_noSearchResultsTitleText')}</AlertTitle>
          {t('divaClient_noSearchResultsBodyText')}
        </Alert>
      )}

      <ol className={styles['result-list']}>
        {fakeResults.map((record) => (
          <li key={record.id} className={styles['result-list-item']}>
            <SearchResultForm
              record={record}
              formSchema={searchResultPresentationFake}
            />

            <div className={styles['record-action-buttons']}>
              {record.data.readyForReview && (
                <Button
                  variant='secondary'
                  size='small'
                  as={Link}
                  to={`/${record.recordType}/${record.id}/review`}
                >
                  <MysteryIcon />
                  Granska
                </Button>
              )}
              <Button
                variant='secondary'
                size='small'
                as={Link}
                to={`/${record.recordType}/${record.id}/update`}
              >
                <EditDocumentIcon />
                Redigera
              </Button>
              <Button
                variant='secondary'
                size='small'
                as={Link}
                to={`/${record.recordType}/${record.id}`}
              >
                <ContractIcon />
                Visa
              </Button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
