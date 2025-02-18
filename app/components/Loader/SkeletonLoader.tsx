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

import type { HTMLProps } from 'react';
import clsx from 'clsx';
import styles from '@/components/Loader/Loader.module.css';

interface SkeletonLoaderProps extends HTMLProps<HTMLDivElement> {
  width?: string;
  height?: string;
}

export const SkeletonLoader = ({
  className,
  width = '100%',
  height = '100%',
  ...rest
}: SkeletonLoaderProps) => {
  return (
    <div
      className={clsx(className, styles['skeleton-loader'])}
      style={{ width, height }}
      {...rest}
    />
  );
};
