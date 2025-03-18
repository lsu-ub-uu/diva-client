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

import styles from './Progress.module.css';
import clsx from 'clsx';
import { type HTMLProps, useId } from 'react';

interface ProgressProps extends HTMLProps<HTMLDivElement> {
  value: number;
  label: string;
}

export const Progress = ({
  value,
  label,
  className,
  ...rest
}: ProgressProps) => {
  const id = useId();
  return (
    <>
      <div className={styles['label']} id={`${id}-label`}>
        {label}
      </div>
      <div
        id={id}
        aria-labelledby={label ? `${id}-label` : undefined}
        role='progressbar'
        aria-valuenow={value}
        className={clsx(className, styles['progress'])}
        {...rest}
      >
        <div
          className={styles['progress-value']}
          style={{ width: `${value}%` }}
        />
      </div>
    </>
  );
};
