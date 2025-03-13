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
import type {
  FormComponentMetadata,
  FormComponentMode,
  FormComponentTooltip,
} from '@/components/FormGenerator/types';
import { Field } from '@/components/Input/Field';
import { Select } from '@/components/Input/Select';
import {
  findOptionLabelByValue,
  useValueFromData,
} from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { OutputField } from '@/components/FormGenerator/components/OutputField';
import { FieldInfo } from '@/components/FieldInfo/FieldInfo';
import { useFieldValidationError } from '@/components/FormGenerator/formGeneratorUtils/useFieldValidationError';
import { ComboboxSelect } from '@/components/FormGenerator/components/ComboboxSelect';

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
  attributesToShow: FormComponentMetadata['attributesToShow'];
}

export const AttributeSelect = ({
  name,
  label,
  options = [],
  showLabel = true,
  tooltip,
  disabled,
  placeholder,
  displayMode,
  finalValue,
  attributesToShow = 'all',
}: AttributeSelectProps) => {
  const { t } = useTranslation();
  const { errorMessage, onRevalidate } = useFieldValidationError(name);
  const defaultValue = useValueFromData<string>(name);

  if (finalValue) {
    return (
      <>
        {attributesToShow === 'all' && (
          <OutputField
            className={styles['attribute-select']}
            variant='inline'
            label={t(label)}
            value={findOptionLabelByValue(options, finalValue)}
            path={name}
          />
        )}
        <input type='hidden' name={name} value={finalValue} />
      </>
    );
  }

  if (attributesToShow === 'none') {
    if (!defaultValue) {
      return null;
    }

    return <input type='hidden' name={name} value={defaultValue} />;
  }

  if (displayMode === 'output') {
    if (!defaultValue) {
      return null;
    }

    return (
      <>
        <OutputField
          className={styles['attribute-select']}
          variant='inline'
          label={t(label)}
          value={findOptionLabelByValue(options, defaultValue)}
          path={name}
        />
        <input type='hidden' name={name} value={defaultValue} />
      </>
    );
  }

  return (
    <Field
      className={styles['attributeSelect']}
      label={showLabel && t(label)}
      variant='inline'
      size='small'
      errorMessage={errorMessage}
      adornment={tooltip && <FieldInfo {...tooltip} />}
    >
      {options.length > 20 ? (
        <ComboboxSelect
          options={options}
          defaultValue={defaultValue}
          name={name}
          disabled={disabled}
          invalid={errorMessage != null}
          onChange={onRevalidate}
        />
      ) : (
        <Select
          name={name}
          defaultValue={defaultValue}
          disabled={disabled}
          invalid={errorMessage != null}
          onChange={(e) => onRevalidate(e.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {t(option.label)}
            </option>
          ))}
        </Select>
      )}
    </Field>
  );
};
