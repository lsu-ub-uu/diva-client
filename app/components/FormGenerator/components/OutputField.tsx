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
import type { FieldValues, UseFormRegister } from 'react-hook-form';

interface OutputFieldProps {
  label: string;
  value: string;
  name: string;
  variant?: 'inline' | 'block';
  finalValue?: string;
  register: UseFormRegister<FieldValues>;
}

export const OutputField = ({
  label,
  value,
  name,
  variant = 'block',
  finalValue,
  register,
}: OutputFieldProps) => {
  return (
    <dl className={styles['output-field']}>
      <dt>{label}</dt>
      <dd>{value}</dd>
      {finalValue && <input type='hidden' {...register(name, { value })} />}
    </dl>
  );
};
