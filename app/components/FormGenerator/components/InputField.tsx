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

import { ComboboxSelect } from '@/components/FormGenerator/components/ComboboxSelect';
import {
  isComponentCollVar,
  isComponentTextVariable,
} from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import type {
  FormComponentNumVar,
  FormComponentTextVar,
} from '@/components/FormGenerator/types';
import { FieldContext } from '@/components/Input/Fieldset';
import { Input } from '@/components/Input/Input';
import { Select } from '@/components/Input/Select';
import { Textarea } from '@/components/Input/Textarea';
import { useHydrated } from '@/utils/useHydrated';
import { use } from 'react';
import {
  type Control,
  Controller,
  type FieldValues,
  type UseFormRegister,
  useWatch,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface InputFieldProps {
  component: FormComponentTextVar | FormComponentNumVar;
  path: string;
  errorMessage: string | undefined;
  register: UseFormRegister<FieldValues>;
  control: Control;
}

export const InputField = ({
  component,
  path,
  errorMessage,
  register,
  control,
}: InputFieldProps) => {
  const { ids } = use(FieldContext);
  const hydrated = useHydrated();
  const { t } = useTranslation();
  const value = useWatch({ name: path });

  if (isComponentCollVar(component)) {
    const options = [
      { value: '', label: t('divaClient_optionNoneText') },
      ...component.options,
    ];
    if (hydrated && component.options.length > 20) {
      return (
        <Controller
          control={control}
          name={path}
          render={({ field: { name, value, onChange } }) => (
            <ComboboxSelect
              name={name}
              value={value}
              onChange={onChange}
              invalid={errorMessage !== undefined}
              aria-label={!component.showLabel ? t(component.label) : undefined}
              aria-details={ids.details}
              options={options}
              {...(value && { 'data-has-value': '' })}
            />
          )}
        />
      );
    }

    return (
      <Select
        {...register(path)}
        invalid={errorMessage !== undefined}
        aria-label={!component.showLabel ? t(component.label) : undefined}
        aria-details={ids.details}
        {...(value && { 'data-has-value': '' })}
      >
        {(options ?? []).map((item) => {
          return (
            <option key={item.value} value={item.value}>
              {t(item.label)}
            </option>
          );
        })}
      </Select>
    );
  }

  if (
    isComponentTextVariable(component) &&
    component.inputType === 'textarea'
  ) {
    return (
      <Textarea
        {...register(path)}
        invalid={errorMessage !== undefined}
        placeholder={component.placeholder}
        readOnly={!!component.finalValue}
        aria-label={!component.showLabel ? t(component.label) : undefined}
        aria-details={ids.details}
        {...(value && { 'data-has-value': '' })}
      />
    );
  }

  return (
    <Input
      {...register(path)}
      type={isPasswordField(component) ? 'password' : 'text'}
      invalid={errorMessage !== undefined}
      placeholder={component.placeholder}
      readOnly={!!component.finalValue}
      aria-label={!component.showLabel ? t(component.label) : undefined}
      aria-details={ids.details}
      {...(value && { 'data-has-value': '' })}
    />
  );
};

const isPasswordField = (
  component: FormComponentTextVar | FormComponentNumVar,
) => {
  return 'inputFormat' in component && component.inputFormat === 'password';
};
