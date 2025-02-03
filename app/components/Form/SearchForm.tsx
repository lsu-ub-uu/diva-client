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
import type { BFFDataRecord } from '@/types/record';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-router';
import { useTranslation } from 'react-i18next';
import { RemixFormProvider, useRemixForm } from 'remix-hook-form';
import type { RecordData } from '../FormGenerator/defaultValues/defaultValues';
import { createDefaultValuesFromFormSchema } from '../FormGenerator/defaultValues/defaultValues';
import type { SearchFormSchema } from '../FormGenerator/types';
import { FormGenerator } from '@/components/FormGenerator/FormGenerator';
import styles from './SearchForm.module.css';

interface SearchFormProps {
  searchType: string;
  record?: BFFDataRecord;
  formSchema: SearchFormSchema;
}

export const SearchForm = ({ record, formSchema }: SearchFormProps) => {
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
      </div>
    </Form>
  );
};
