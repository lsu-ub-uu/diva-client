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
import { useTranslation } from 'react-i18next';
import { ComboboxSelect } from '@/components/FormGenerator/components/ComboboxSelect';

interface InputFieldProps {
  component: FormComponentTextVar | FormComponentNumVar;
  path: string;
  invalid: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export const InputField = ({
  component,
  path,
  invalid,
  defaultValue,
  onChange,
}: InputFieldProps) => {
  const { t } = useTranslation();

  if (isComponentCollVar(component)) {
    const options = [
      { value: '', label: t('divaClient_optionNoneText') },
      ...component.options,
    ];
    if (component.options.length > 20) {
      return (
        <ComboboxSelect
          options={options}
          defaultValue={defaultValue}
          name={path}
          invalid={invalid}
          aria-label={!component.showLabel ? t(component.label) : undefined}
          onChange={(value) => onChange?.(value)}
        />
      );
    }
    return (
      <Select
        invalid={invalid}
        aria-label={!component.showLabel ? t(component.label) : undefined}
        name={path}
        defaultValue={defaultValue}
        onChange={(e) => onChange?.(e.target.value)}
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
        name={path}
        defaultValue={defaultValue}
        invalid={invalid}
        placeholder={component.placeholder}
        readOnly={!!component.finalValue}
        aria-label={!component.showLabel ? t(component.label) : undefined}
        onChange={(e) => onChange?.(e.target.value)}
      />
    );
  }

  return (
    <Input
      name={path}
      defaultValue={defaultValue}
      type={isPasswordField(component) ? 'password' : 'text'}
      invalid={invalid}
      placeholder={component.placeholder}
      readOnly={!!component.finalValue}
      aria-label={!component.showLabel ? t(component.label) : undefined}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
};

const isPasswordField = (
  component: FormComponentTextVar | FormComponentNumVar,
) => {
  return 'inputFormat' in component && component.inputFormat === 'password';
};
