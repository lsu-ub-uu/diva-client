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

import { Alert, AlertTitle } from '@/components/Alert/Alert';
import { SearchForm } from '@/components/Form/SearchForm';
import { SearchResultForm } from '@/components/Form/SearchResultForm';
import type { SearchFormSchema } from '@/components/FormGenerator/types';
import { RecordActionButtons } from '@/components/RecordActionButtons/RecordActionButtons';
import { SentimentNeutralIcon } from '@/icons';
import type { BFFDataRecordData, BFFSearchResult } from '@/types/record';
import { useTranslation } from 'react-i18next';
import styles from './RecordSearch.module.css';

interface RecordSearchProps {
  searchForm: SearchFormSchema;
  query: BFFDataRecordData;
  searchResults: BFFSearchResult | undefined;
  apiUrl?: string;
}

export const RecordSearch = ({
  searchForm,
  query,
  searchResults,
  apiUrl,
}: RecordSearchProps) => {
  const { t } = useTranslation();
  return (
    <div className={styles['record-search']}>
      <SearchForm
        formSchema={searchForm}
        data={query}
        searchResults={searchResults}
        apiUrl={apiUrl}
      />
      {searchResults && (
        <>
          {searchResults.totalNo === 0 && (
            <Alert severity='info' icon={<SentimentNeutralIcon />}>
              <AlertTitle>
                {t('divaClient_noSearchResultsTitleText')}
              </AlertTitle>
              {t('divaClient_noSearchResultsBodyText')}
            </Alert>
          )}

          <ol className={styles['result-list']}>
            {searchResults.data.map((record) => (
              <li key={record.id} className={styles['result-list-item']}>
                <SearchResultForm
                  record={record}
                  formSchema={record.presentation!}
                />

                <div className={styles['record-action-buttons']}>
                  <RecordActionButtons record={record} />
                </div>
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
};
