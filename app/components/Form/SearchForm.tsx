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

import { Button } from '@mui/material';

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
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

interface SearchFormProps {
  searchType: string;
  record?: BFFDataRecord;
  formSchema: SearchFormSchema;
  searchResults?: BFFSearchResult;
}

export const SearchForm = ({
  record,
  formSchema,
  searchResults,
}: SearchFormProps) => {
  const submit = useSubmit();
  const { t } = useTranslation();
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

  const { register, getValues } = methods;

  const rowsPerPage = getValues('search.rows[0].value');

  return (
    <Form
      method='GET'
      action='/search'
    >
      <div className={styles.searchForm}>
        <RemixFormProvider {...methods}>
          <FormGenerator formSchema={formSchema} />
        </RemixFormProvider>
        <Button
          type='submit'
          disableRipple
          variant='contained'
          color='secondary'
          sx={{ height: 40 }}
        >
          {t('divaClient_SearchButtonText')}
        </Button>
        <div>
          <label>
            Rows per page
            <select
              {...register('search.rows[0].value')}
              onChange={(e) => submit(e.currentTarget.form)}
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='20'>20</option>
              <option value='30'>30</option>
              <option value='40'>40</option>
              <option value='50'>50</option>
            </select>
          </label>
          <button
            type='submit'
            name='search.start[0].value'
            value='1'
            disabled={!searchResults || searchResults.fromNo <= 1}
          >
            <KeyboardDoubleArrowLeftIcon />
          </button>
          <button
            type='submit'
            name='search.start[0].value'
            value={searchResults && searchResults.fromNo - rowsPerPage}
            disabled={!searchResults || searchResults.fromNo <= 1}
          >
            <KeyboardArrowLeftIcon />
          </button>
          <button
            type='submit'
            name='search.start[0].value'
            value={searchResults && searchResults.toNo + 1}
            disabled={
              !searchResults || searchResults.toNo >= searchResults.totalNo
            }
          >
            <KeyboardArrowRightIcon />
          </button>
          <button
            type='submit'
            name='search.start[0].value'
            value={searchResults && searchResults?.totalNo - rowsPerPage + 1}
            disabled={
              !searchResults || searchResults.toNo >= searchResults.totalNo
            }
          >
            <KeyboardDoubleArrowRightIcon />
          </button>
        </div>
      </div>
    </Form>
  );
};
