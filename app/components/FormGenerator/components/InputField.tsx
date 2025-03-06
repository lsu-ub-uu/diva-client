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

import {
  isComponentCollVar,
  isComponentTextVariable,
} from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { Select } from '@/components/Input/Select';
import { Textarea } from '@/components/Input/Textarea';
import { Input } from '@/components/Input/Input';
import type {
  FormComponentNumVar,
  FormComponentTextVar,
} from '@/components/FormGenerator/types';
import type { FieldValues, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface InputFieldProps {
  component: FormComponentTextVar | FormComponentNumVar;
  path: string;
  errorMessage: string | undefined;
  defaultValue?: string;
}

export const InputField = ({
  component,
  path,
  errorMessage,
  defaultValue,
}: InputFieldProps) => {
  const { t } = useTranslation();

  if (isComponentCollVar(component)) {
    return (
      <Select
        invalid={errorMessage !== undefined}
        aria-label={!component.showLabel ? t(component.label) : undefined}
        name={path}
        defaultValue={defaultValue}
      >
        <option value=''>{t('divaClient_optionNoneText')}</option>
        {(component.options ?? []).map((item) => {
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
        name={path}
        defaultValue={defaultValue}
        invalid={errorMessage !== undefined}
        placeholder={component.placeholder}
        readOnly={!!component.finalValue}
        aria-label={!component.showLabel ? t(component.label) : undefined}
      />
    );
  }

  return (
    <Input
      name={path}
      defaultValue={defaultValue}
      type={isPasswordField(component) ? 'password' : 'text'}
      invalid={errorMessage !== undefined}
      placeholder={component.placeholder}
      readOnly={!!component.finalValue}
      aria-label={!component.showLabel ? t(component.label) : undefined}
    />
  );
};

const isPasswordField = (
  component: FormComponentTextVar | FormComponentNumVar,
) => {
  return 'inputFormat' in component && component.inputFormat === 'password';
};
