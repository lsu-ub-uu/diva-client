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
import type { SearchFormSchema } from '@/components/FormGenerator/types';
import { RecordActionButtons } from '@/components/RecordActionButtons/RecordActionButtons';
import type { BFFDataRecordData, BFFSearchResult } from '@/types/record';
import { MehIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DivaOutputSearchResult } from '../Form/SearchResult/DivaOutputSearchResult';
import { SearchResultForm } from '../Form/SearchResultForm';
import styles from './RecordSearch.module.css';
import { useLocation, useNavigation } from 'react-router';

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
  const navigation = useNavigation();
  const location = useLocation();
  const searching =
    navigation.state !== 'idle' &&
    navigation.formAction?.includes(location.pathname);

  return (
    <div className={styles['record-search']}>
      <SearchForm
        formSchema={searchForm}
        data={query}
        searchResults={searchResults}
        apiUrl={apiUrl}
        searching={searching}
      />
      {searchResults && (
        <>
          {searchResults.totalNo === 0 && (
            <Alert severity='info' icon={<MehIcon />}>
              <AlertTitle>
                {t('divaClient_noSearchResultsTitleText')}
              </AlertTitle>
              {t('divaClient_noSearchResultsBodyText')}
            </Alert>
          )}

          <ol className={styles['result-list']} aria-busy={searching}>
            {searchResults.data.map((record) => (
              <li key={record.id} className={styles['result-list-item']}>
                <div className={styles['result-list-item-content']}>
                  {record.recordType && record.recordType === 'diva-output' ? (
                    <DivaOutputSearchResult searchResult={record} />
                  ) : (
                    <SearchResultForm
                      record={record}
                      formSchema={record.presentation!}
                    />
                  )}
                  <div className={styles['record-action-buttons']}>
                    <RecordActionButtons record={record} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
};
