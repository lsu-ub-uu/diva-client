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
import { SearchForm } from '@/components/Form/SearchForm';
import { Box } from '@mui/material';
import { RecordActionButtons } from '@/components/RecordActionButtons/RecordActionButtons';
import type { BFFSearchResult } from '@/types/record';
import { useTranslation } from 'react-i18next';
import styles from './RecordSearch.module.css';
import { SearchResultForm } from '@/components/Form/SearchResultForm';

interface RecordSearchProps {
  searchForm: SearchFormSchema;
  searchType: string;
  query: any;
  searchResults: BFFSearchResult | null;
}

export const RecordSearch = ({
  searchForm,
  searchType,
  query,
  searchResults,
}: RecordSearchProps) => {
  const { t } = useTranslation();
  return (
    <div>
      <SearchForm
        formSchema={searchForm}
        searchType={searchType}
        record={{ data: query }}
      />
      {searchResults && (
        <>
          <h2>
            {t('divaClient_searchPageResultText', {
              numberOfResults: searchResults?.totalNo,
            })}
          </h2>
          <ol className={styles.resultList}>
            {searchResults.data.map((record) => (
              <li
                key={record.id}
                className={styles.resultListItem}
              >
                <SearchResultForm
                  record={record}
                  formSchema={record.presentation!}
                />
                <Box
                  sx={(theme) => ({
                    position: 'absolute',
                    display: 'flex',
                    top: theme.spacing(1),
                    right: theme.spacing(1),
                  })}
                >
                  <RecordActionButtons record={record} />
                </Box>
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
};
