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
import { type ReactNode, use } from 'react';
import { FieldInfo } from '@/components/FieldInfo/FieldInfo';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import { Link } from 'react-router';

interface OutputFieldProps {
  path: string;
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
  path,
  className,
  label,
  value,
  variant = 'block',
  textStyle,
  info,
  adornment,
}: OutputFieldProps) => {
  const { enhancedFields } = use(FormGeneratorContext);
  const enhancement = enhancedFields && enhancedFields[path];
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

      {enhancement?.type === 'link' ? (
        <Link to={enhancement.to}>
          <Typography
            as='dd'
            text={value}
            variant={textStyle ?? 'bodyTextStyle'}
          />
        </Link>
      ) : (
        <Typography
          as='dd'
          text={value}
          variant={textStyle ?? 'bodyTextStyle'}
        />
      )}
    </dl>
  );
};
