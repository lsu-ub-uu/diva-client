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

interface OutputFieldProps {
  label?: string;
  value: string;
  variant?: 'inline' | 'block';
}

export const OutputField = ({
  label,
  value,
  variant = 'block',
}: OutputFieldProps) => {
  return (
    <dl className={styles['output-field']} data-variant={variant}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </dl>
  );
};
