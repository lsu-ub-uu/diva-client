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

import { Button } from '@/components/Button/Button';
import { Pagination } from '@/components/Form/Pagination';
import { FormGenerator } from '@/components/FormGenerator/FormGenerator';
import { createDefaultValuesFromFormSchema } from '@/components/FormGenerator/defaultValues/defaultValues';
import { CodeIcon, SearchIcon } from '@/icons';
import type { BFFDataRecordData, BFFSearchResult } from '@/types/record';
import { useMember } from '@/utils/rootLoaderDataUtils';
import { useTranslation } from 'react-i18next';
import { Form, useSubmit } from 'react-router';
import { RemixFormProvider, useRemixForm } from 'remix-hook-form';
import { useCallback, useRef } from 'react';
import type { SearchFormSchema } from '../FormGenerator/types';
import styles from './SearchForm.module.css';

interface SearchFormProps {
  data?: BFFDataRecordData;
  formSchema: SearchFormSchema;
  searchResults?: BFFSearchResult;
  apiUrl?: string;
}

export const SearchForm = ({
  data,
  formSchema,
  searchResults,
  apiUrl,
}: SearchFormProps) => {
  const member = useMember();
  const { t } = useTranslation();
  const submit = useSubmit();
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const methods = useRemixForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    defaultValues: createDefaultValuesFromFormSchema(formSchema, data),
  });

  const debouncedSubmit = useCallback(
    (form: HTMLFormElement) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        submit(form);
      }, 300);
    },
    [submit],
  );

  return (
    <Form method='GET' onChange={(e) => debouncedSubmit(e.currentTarget)}>
      <div className={styles['search-form']}>
        <RemixFormProvider {...methods}>
          <FormGenerator
            formSchema={formSchema}
            enhancedFields={{
              'search.rows': { type: 'hidden' },
              'search.start': { type: 'hidden' },
              ...(member?.memberPermissionUnit && {
                'search.include.includePart.permissionUnitSearchTerm': {
                  type: 'hidden',
                },
              }),
              'search.include.includePart.genericSearchTerm': {
                type: 'notRemovable',
              },
            }}
          />
          <SearchButton />
          {!searchResults && (
            <input
              type='hidden'
              name='search.rows.value'
              value='10'
              data-testid='rowsHiddenSearchTerm'
            />
          )}
          {formHasPermissionUnitSearchTerm(formSchema) &&
            member?.memberPermissionUnit && (
              <input
                type='hidden'
                name='search.include.includePart.permissionUnitSearchTerm.value'
                value={`permissionUnit_${member.memberPermissionUnit}`}
                data-testid='permissionUnitHiddenSearchTerm'
              />
            )}
          {data && searchResults && (
            <div className={styles['search-result-wrapper']}>
              {apiUrl && (
                <Button
                  variant='tertiary'
                  as='a'
                  href={apiUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <CodeIcon />
                  {t('divaClient_viewInApiText')}
                </Button>
              )}
              <Pagination query={data} searchResults={searchResults} />
            </div>
          )}
        </RemixFormProvider>
      </div>
    </Form>
  );
};

const SearchButton = () => {
  const { t } = useTranslation();

  return (
    <Button type='submit' variant='primary' className={styles['search-button']}>
      <SearchIcon /> {t('divaClient_SearchButtonText')}
    </Button>
  );
};

const formHasPermissionUnitSearchTerm = (formSchema: SearchFormSchema) => {
  return JSON.stringify(formSchema).includes('permissionUnitSearchTerm');
};
