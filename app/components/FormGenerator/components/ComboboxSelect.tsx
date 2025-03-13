/*
 * Copyright 2025 Uppsala University Library
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

import type { FormComponentCollItem } from '@/components/FormGenerator/types';
import {
  Combobox,
  ComboboxOption,
  ComboboxOptions,
} from '@/components/Input/Combobox';
import { useMemo, useState } from 'react';
import { ComboboxInput } from '@/components/Input/ComboboxInput';
import { useTranslation } from 'react-i18next';
import { ManageSearch } from '@/icons';

import styles from './ComboboxSelect.module.css';
import { ComboboxButton, type ComboboxInputProps } from '@headlessui/react';

export interface ComboboxSelectProps
  extends Omit<ComboboxInputProps, 'onChange'> {
  options: FormComponentCollItem[];
  invalid?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export const ComboboxSelect = ({
  options,
  invalid,
  onChange,
  defaultValue,
  name,
  ...rest
}: ComboboxSelectProps) => {
  const { t } = useTranslation();

  const [query, setQuery] = useState('');

  const optionMap: Record<string, string> = useMemo(
    () =>
      options.reduce((acc, curr) => {
        return {
          ...acc,
          [curr.value]: t(curr.label),
        };
      }, {}),
    [options, t],
  );

  const filteredOptions =
    query === ''
      ? Object.keys(optionMap)
      : Object.entries(optionMap)
          .filter(([value, label]) => {
            return (
              label.toLowerCase().includes(query.toLowerCase()) ||
              value.includes(query.toLowerCase())
            );
          })
          .map(([value]) => value);

  return (
    <>
      <Combobox
        immediate
        onClose={() => setQuery('')}
        virtual={{ options: filteredOptions }}
        defaultValue={defaultValue}
        name={name}
        onChange={onChange}
      >
        <ComboboxInput
          className={styles['combobox-input']}
          displayValue={(option) => optionMap[option]}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={(e) => e.target.select()}
          aria-invalid={invalid}
          {...(invalid ? { 'data-invalid': '' } : undefined)}
          {...rest}
        />

        <ComboboxButton className={styles['combobox-button']}>
          <ManageSearch />
        </ComboboxButton>

        <ComboboxOptions anchor='bottom start'>
          {({ option }) => (
            <ComboboxOption value={option}>{optionMap[option]}</ComboboxOption>
          )}
        </ComboboxOptions>
      </Combobox>
    </>
  );
};
