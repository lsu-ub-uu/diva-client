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

import { Alert, AlertTitle } from '@/components/Alert/Alert';
import styles from './Messages.module.css';

interface MessagesProps {
  severity: 'success' | 'info' | 'warning' | 'error';
  title: {
    sv: string;
    en?: string;
  };
  message: {
    sv: string;
    en?: string;
  };
  createdBy: string;
  createdAt: string;
}

export const Message = ({
  severity,
  title,
  message,
  createdBy,
  createdAt,
}: MessagesProps) => {
  return (
    <Alert severity={severity}>
      <AlertTitle>{title.sv}</AlertTitle>
      <div className={styles['message']}>
        <div>{message.sv}</div>
        <div className={styles['info-group']}>
          <p className={styles['created-at']}>{createdAt}</p>
          <p className={styles['created-by']}>{createdBy}</p>
        </div>
      </div>
    </Alert>
  );
};
