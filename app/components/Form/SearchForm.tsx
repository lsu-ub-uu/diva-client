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

import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import type { BFFDataRecord, BFFSearchResult } from '@/types/record';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, useSubmit } from 'react-router';
import { useTranslation } from 'react-i18next';
import { RemixFormProvider, useRemixForm } from 'remix-hook-form';
import type { RecordData } from '../FormGenerator/defaultValues/defaultValues';
import { createDefaultValuesFromFormSchema } from '../FormGenerator/defaultValues/defaultValues';
import type { SearchFormSchema } from '../FormGenerator/types';
import { FormGenerator } from '@/components/FormGenerator/FormGenerator';
import styles from './SearchForm.module.css';
import { Pagination } from '@/components/Form/Pagination';
import { Button } from '@/components/Button/Button';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

interface SearchFormProps {
  searchType: string;
  record?: BFFDataRecord;
  formSchema: SearchFormSchema;
  searchResults?: BFFSearchResult;
}

export const SearchForm = ({
  record,
  formSchema,
  searchResults = {
    fromNo: 1,
    toNo: 10,
    totalNo: 100,
    data: [],
    containDataOfType: '',
  },
}: SearchFormProps) => {
  const { t } = useTranslation();
  const submit = useSubmit();
  const methods = useRemixForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    defaultValues: createDefaultValuesFromFormSchema(
      formSchema,
      record?.data as RecordData,
    ),
    resolver: yupResolver(generateYupSchemaFromFormSchema(formSchema)),
  });

  return (
    <Form method='GET' action='/search'>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button variant='primary'>Primary</Button>
        <Button variant='secondary'>Secondary</Button>
        <Button variant='tertiary'>Tertiary</Button>
        <Button variant='icon'>
          <KeyboardDoubleArrowLeftIcon />
        </Button>

        <Button variant='primary' disabled>
          Primary
        </Button>
        <Button variant='secondary' disabled>
          Secondary
        </Button>
        <Button variant='tertiary' disabled>
          Tertiary
        </Button>
        <Button variant='icon'>
          <KeyboardDoubleArrowLeftIcon />
        </Button>
      </div>
      <div className={styles.searchForm}>
        <RemixFormProvider {...methods}>
          <FormGenerator formSchema={formSchema} />
          <Button type='submit' variant='primary'>
            {t('divaClient_SearchButtonText')}
          </Button>
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
