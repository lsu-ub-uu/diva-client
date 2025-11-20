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

import { CollapsableText } from '@/components/CollapsableText/CollapsableText';
import {
  type EnhancedFieldsConfig,
  FormGeneratorContext,
} from '@/components/FormGenerator/FormGeneratorContext';
import { Typography } from '@/components/Typography/Typography';
import type { TextStyle } from '@/cora/transform/bffTypes.server';
import clsx from 'clsx';
import { type ReactNode, use } from 'react';
import { Link } from 'react-router';
import styles from './OutputField.module.css';
import { useTranslation } from 'react-i18next';

interface OutputFieldProps {
  path: string;
  className?: string;
  label?: string;
  value?: string;
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
  adornment,
}: OutputFieldProps) => {
  const { t } = useTranslation();
  const { enhancedFields } = use(FormGeneratorContext);
  const enhancement = enhancedFields?.[path];

  const collapsable = value?.length && value.length > 300;

  return (
    <div
      className={clsx(styles['output-field'], className)}
      data-variant={variant}
    >
      <div className={styles['label-wrapper']}>
        {label && (
          <Typography
            as='div'
            className={styles['label']}
            variant={textStyle ?? 'bodyTextStyle'}
            id={`${path}-label`}
          >
            {t(label)}
          </Typography>
        )}
        {adornment && (
          <div className={styles['adornment-wrapper']}>{adornment}</div>
        )}
      </div>
      <Enhancement enhancement={enhancement}>
        {collapsable && value && (
          <div className={styles['value']} aria-labelledby={`${path}-label`}>
            <CollapsableText text={value} />
          </div>
        )}
        {!collapsable && value && (
          <Typography
            className={styles['value']}
            as='p'
            variant={textStyle ?? 'bodyTextStyle'}
            aria-labelledby={`${path}-label`}
          >
            {t(value)}
          </Typography>
        )}
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
