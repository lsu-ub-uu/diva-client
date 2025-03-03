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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import type { ReactNode } from 'react';
import { CheckCircleIcon, ErrorIcon, InfoIcon, WarningIcon } from '@/icons';
import styles from './Alert.module.css';

export interface AlertProps {
  icon?: ReactNode;
  severity: 'success' | 'info' | 'warning' | 'error';
  children: ReactNode;
}

interface AlertTitleProps {
  children: ReactNode;
}

export const AlertTitle = ({ children }: AlertTitleProps) => {
  return <div className={styles['alert-title']}>{children}</div>;
};

interface GetIconProps {
  severity: 'success' | 'info' | 'warning' | 'error';
}
const GetIcons = ({ severity }: GetIconProps) => {
  switch (severity) {
    case 'success':
      return <CheckCircleIcon />;
    case 'info':
      return <InfoIcon />;
    case 'error':
      return <ErrorIcon />;
    case 'warning':
    default:
      return <WarningIcon />;
  }
};

export const Alert = ({ icon, severity, children }: AlertProps) => {
  return (
    <div className={styles['alert']} data-severity={severity}>
      <div className={styles['icon']}>
        {icon === undefined ? <GetIcons severity={severity} /> : icon}
      </div>
      <div className={styles['content']}>{children}</div>
    </div>
  );
};
