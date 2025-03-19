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

import type { Option } from '@/components';
import { useTranslation } from 'react-i18next';
import styles from './AttributeSelect.module.css';
import { useRemixFormContext } from 'remix-hook-form';
import type {
  FormComponentMode,
  FormComponentTooltip,
} from '@/components/FormGenerator/types';
import { Select } from '@/components/Input/Select';
import {
  findOptionLabelByValue,
  getErrorMessageForField,
} from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { OutputField } from '@/components/FormGenerator/components/OutputField';
import { Controller } from 'react-hook-form';
import { ComboboxSelect } from '@/components/FormGenerator/components/ComboboxSelect';
import { useHydrated } from '@/utils/useHydrated';
import { Fieldset } from '@/components/Input/Fieldset';

interface AttributeSelectProps {
  name: string;
  label: string;
  options: Option[] | undefined;
  showLabel: boolean | undefined;
  placeholder: string | undefined;
  tooltip: FormComponentTooltip | undefined;
  disabled?: boolean;
  displayMode: FormComponentMode;
  finalValue: string | undefined;
}

export const AttributeSelect = ({
  name,
  label,
  options = [],
  showLabel = true,
  tooltip,
  disabled,
  displayMode,
  finalValue,
}: AttributeSelectProps) => {
  const hydrated = useHydrated();
  const { t } = useTranslation();
  const { register, getValues, control, formState } = useRemixFormContext();

  const errorMessage = getErrorMessageForField(formState, name);
  const value = finalValue ?? getValues(name);
  const showAsOutput = finalValue || displayMode === 'output';

  if (displayMode === 'output' && !value) {
    return null;
  }

  if (showAsOutput) {
    return (
      <>
        <OutputField
          className={styles['attribute-select']}
          variant='inline'
          label={t(label)}
          value={findOptionLabelByValue(options, value)}
          path={name}
        />
        {finalValue && <input type='hidden' {...register(name, { value })} />}
      </>
    );
  }

  return (
    <Fieldset
      className={styles['attribute-select']}
      label={showLabel ? t(label) : undefined}
      variant='inline'
      size='small'
      errorMessage={errorMessage}
      info={tooltip}
    >
      {hydrated && options.length > 20 ? (
        <Controller
          control={control}
          name={name}
          render={({ field: { name, value, onChange } }) => (
            <ComboboxSelect
              name={name}
              value={value}
              onChange={onChange}
              invalid={errorMessage !== undefined}
              aria-label={!showLabel ? t(label) : undefined}
              options={options}
            />
          )}
        />
      ) : (
        <Select
          {...register(name)}
          disabled={disabled}
          invalid={errorMessage !== undefined}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {t(option.label)}
            </option>
          ))}
        </Select>
      )}
    </Fieldset>
  );
};
