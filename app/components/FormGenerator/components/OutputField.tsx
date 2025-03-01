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

import styles from './OutputField.module.css';
import { Typography } from '@/components/Typography/Typography';
import type { TextStyle } from '@/components/FormGenerator/types';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { FieldInfo } from '@/components/FieldInfo/FieldInfo';

interface OutputFieldProps {
  className?: string;
  label?: string;
  value: string;
  variant?: 'inline' | 'block';
  textStyle?: TextStyle;
  info?: {
    title: string;
    body: string;
  };
  adornment?: ReactNode;
}

export const OutputField = ({
  className,
  label,
  value,
  variant = 'block',
  textStyle,
  info,
  adornment,
}: OutputFieldProps) => {
  return (
    <dl
      className={clsx(styles['output-field'], className)}
      data-variant={variant}
    >
      <div className={styles['label-wrapper']}>
        {label && (
          <Typography
            as='dt'
            text={label}
            variant={textStyle ?? 'bodyTextStyle'}
          />
        )}
        {info && <FieldInfo {...info} />}
        {adornment && (
          <div className={styles['adornment-wrapper']}>{adornment}</div>
        )}
      </div>

      <Typography as='dd' text={value} variant={textStyle ?? 'bodyTextStyle'} />
    </dl>
  );
};
