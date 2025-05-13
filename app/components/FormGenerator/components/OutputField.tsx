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
import clsx from 'clsx';
import { type ReactNode, use } from 'react';
import { FieldInfo } from '@/components/FieldInfo/FieldInfo';
import {
  type EnhancedFieldsConfig,
  FormGeneratorContext,
} from '@/components/FormGenerator/FormGeneratorContext';
import { Link } from 'react-router';
import type { TextStyle } from '@/cora/transform/bffTypes.server';

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
  const enhancement = enhancedFields?.[path];
  return (
    <div
      className={clsx(styles['output-field'], className)}
      data-variant={variant}
    >
      <div className={styles['label-wrapper']}>
        {label && (
          <Typography
            as='div'
            text={label}
            className={styles['label']}
            variant={textStyle ?? 'bodyTextStyle'}
            id={`${path}-label`}
          />
        )}
        {label && info && <FieldInfo {...info} />}
        {adornment && (
          <div className={styles['adornment-wrapper']}>{adornment}</div>
        )}
      </div>
      <Enhancement enhancement={enhancement}>
        <Typography
          className={styles['value']}
          as='p'
          text={value}
          variant={textStyle ?? 'bodyTextStyle'}
          aria-labelledby={`${path}-label`}
        />
      </Enhancement>
    </div>
  );
};

interface EnhancementProps {
  enhancement?: EnhancedFieldsConfig;
  children: ReactNode;
}

const Enhancement = ({ enhancement, children }: EnhancementProps) => {
  if (enhancement?.type === 'link') {
    return <Link to={enhancement.to}>{children}</Link>;
  }
  return children;
};
