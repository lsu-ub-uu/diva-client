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
import { Form, useSubmit } from 'react-router';
import { useTranslation } from 'react-i18next';
import { RemixFormProvider, useRemixForm } from 'remix-hook-form';
import { createDefaultValuesFromFormSchema } from '../FormGenerator/defaultValues/defaultValues';
import type { SearchFormSchema } from '../FormGenerator/types';
import { FormGenerator } from '@/components/FormGenerator/FormGenerator';
import styles from './SearchForm.module.css';
import { Pagination } from '@/components/Form/Pagination';
import { Button } from '@/components/Button/Button';
import { useWatch } from 'react-hook-form';
import { SearchIcon } from '@/icons';

interface SearchFormProps {
  searchType: string;
  data?: BFFDataRecordData;
  formSchema: SearchFormSchema;
  searchResults?: BFFSearchResult;
}

export const SearchForm = ({
  data,
  formSchema,
  searchResults,
}: SearchFormProps) => {
  const submit = useSubmit();
  const methods = useRemixForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    defaultValues: createDefaultValuesFromFormSchema(formSchema, data),
  });

  return (
    <Form method='GET' action='/search'>
      <div className={styles['search-form']}>
        <RemixFormProvider {...methods}>
          <FormGenerator formSchema={formSchema} showTooltips={false} />
          <SearchButton />
          {searchResults && (
            <Pagination
              searchResults={searchResults}
              onRowsPerPageChange={(e) => submit(e.currentTarget.form)}
            />
          )}
        </RemixFormProvider>
      </div>
    </Form>
  );
};

const SearchButton = () => {
  const { t } = useTranslation();

  const searchInput = useWatch({
    name: 'search.include.includePart.genericSearchTerm.value',
  });

  return (
    <Button
      type='submit'
      variant='primary'
      disabled={!searchInput}
      className={styles['search-button']}
    >
      <SearchIcon /> {t('divaClient_SearchButtonText')}
    </Button>
  );
};
