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
import { ErrorMessage } from '@hookform/error-message';
import type {
  FormComponentMode,
  FormComponentTooltip,
} from '@/components/FormGenerator/types';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import { IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useFormState } from 'react-hook-form';
import { get } from 'lodash-es';

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
  placeholder,
  displayMode,
  finalValue,
}: AttributeSelectProps) => {
  const { t } = useTranslation();
  const { register, getValues } = useRemixFormContext();

  const { errors } = useFormState({ name });
  const error = get(errors, name);
  const value = finalValue ?? getValues(name);
  const showAsInput = !finalValue && displayMode === 'input';

  if (displayMode === 'output' && !value) {
    return null;
  }

  return (
    <div
      className={styles.attributeSelect}
      data-error={error !== undefined}
    >
      <div className={styles.inputWrapper}>
        {tooltip && (
          <Tooltip
            title={t(tooltip.title)}
            body={t(tooltip.body)}
          >
            <IconButton
              sx={{ m: -1 }}
              aria-label='Help'
              disableRipple
              color='default'
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
        )}
        {showLabel && <label htmlFor={name}>{t(label)}: </label>}
        {showAsInput && (
          <select
            {...register(name)}
            disabled={disabled}
            id={name}
            aria-invalid={error ? 'true' : undefined}
          >
            <option value=''>
              {t(placeholder ?? 'divaClient_optionNoneText')}
            </option>
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {t(option.label)}
              </option>
            ))}
          </select>
        )}
        {!showAsInput && (
          <>
            <span>
              {t(
                options.find((option) => option.value === value)?.label ??
                  'unknown',
              )}
            </span>

            <input
              type='hidden'
              {...register(name, { value })}
            />
          </>
        )}
      </div>
      <ErrorMessage
        name={name}
        errors={errors}
        render={({ message }) => (
          <p className={styles.errorMessage}>{message}</p>
        )}
      />
    </div>
  );
};
