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

import type { BFFDataRecord, BFFSearchResult } from '@/types/record';
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
import { useWatch } from 'react-hook-form';
import FilterChip from '@/components/FilterChip/FilterChip';
import { useRef } from 'react';
import { InputChip } from '@/components/Form/InputChip';

interface SearchFormProps {
  searchType: string;
  record?: BFFDataRecord;
  formSchema: SearchFormSchema;
  searchResults?: BFFSearchResult;
}
/*
const FilterChip = ({ ...rest }: CheckboxProps) => {
  return (
    <Checkbox {...rest}>
      {({ checked }) => (
        <span style={{ display: 'block' }}>
          <svg
            style={{
              stroke: 'white',
              opacity: checked ? '100' : '0',
              width: '1rem',
              height: '1rem',
            }}
            viewBox='0 0 14 14'
            fill='none'
          >
            <path
              d='M3 8L6 11L11 3.5'
              strokeWidth={2}
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </span>
      )}
    </Checkbox>
  );
};*/
/*

interface FilterChipProps {
  label: string;
  selected?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function FilterChip({
  label,
  selected = false,
  onChange,
}: FilterChipProps) {
  const [isChecked, setIsChecked] = useState(selected);

  const handleChange = (checked: boolean) => {
    setIsChecked(checked);
    onChange?.(checked);
  };

  return (
    <Checkbox
      checked={isChecked}
      onChange={handleChange}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0 16px',
        height: '32px',
        borderRadius: '8px',
        border: '1px solid #79747E',
        backgroundColor: isChecked ? '#E8DEF8' : '#F4EFF4',
        color: isChecked ? '#1D192B' : '#49454F',
        fontSize: '14px',
        fontWeight: 500,
        letterSpacing: '0.1px',
        cursor: 'pointer',
        transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
        gap: '1rem',
      }}
    >
      {isChecked && (
        <span style={{ marginLeft: '8px' }} aria-hidden='true'>
          ✓
        </span>
      )}
      {label}
    </Checkbox>
  );
}
*/

export const SearchForm = ({
  record,
  formSchema,
  searchResults,
}: SearchFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const submit = useSubmit();
  const methods = useRemixForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    defaultValues: createDefaultValuesFromFormSchema(
      formSchema,
      record?.data as RecordData,
    ),
  });

  return (
    <Form method='GET' action='/search' ref={formRef}>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <FilterChip label='Mina publikationer' />
        <FilterChip label='Redo för publicering' />
        <FilterChip label='Redo för granskning' />
      </div>
      <div className={styles.searchForm}>
        <RemixFormProvider {...methods}>
          <FormGenerator formSchema={formSchema} />
          <SearchButton />
          {searchResults && (
            <Pagination
              searchResults={searchResults}
              onRowsPerPageChange={(e) => submit(e.currentTarget.form)}
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
            Aktiva filter:{' '}
            <InputChip label='Mina publikationer' onClose={() => {}} />
          </div>
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
    <Button type='submit' variant='primary' disabled={!searchInput}>
      {t('divaClient_SearchButtonText')}
    </Button>
  );
};
