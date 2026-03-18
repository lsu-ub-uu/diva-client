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

import clsx from 'clsx';
import {
  CircleCheckBigIcon,
  CircleXIcon,
  InfoIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';
import styles from './Alert.module.css';

export type Severity = 'success' | 'info' | 'warning' | 'error' | 'neutral';

export interface AlertProps {
  icon?: ReactNode;
  severity: Severity;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
  variant?: 'standard' | 'banner';
}

interface AlertTitleProps {
  children: ReactNode;
}

export const AlertTitle = ({ children }: AlertTitleProps) => {
  return <div className={styles['alert-title']}>{children}</div>;
};

interface GetIconProps {
  severity: Severity;
}
const GetIcons = ({ severity }: GetIconProps) => {
  switch (severity) {
    case 'success':
      return <CircleCheckBigIcon />;
    case 'info':
    case 'neutral':
      return <InfoIcon />;
    case 'error':
      return <CircleXIcon />;
    case 'warning':
    default:
      return <TriangleAlertIcon />;
  }
};

export const Alert = ({
  icon,
  severity,
  children,
  action,
  className,
  variant = 'standard',
}: AlertProps) => {
  return (
    <div className={clsx(styles['alert'], className)} data-severity={severity} data-variant={variant}>
      <div className={styles['icon']}>
        {icon === undefined ? <GetIcons severity={severity} /> : icon}
      </div>
      <div className={styles['content']}>{children}</div>
      {action && <div className={styles['action']}>{action}</div>}
    </div>
  );
};
