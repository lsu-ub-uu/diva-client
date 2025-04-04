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

import styles from './ErrorPage.module.css';
import { type ReactNode } from 'react';
import {
  KeyOffIcon,
  LockIcon,
  SentimentNeutralIcon,
  SentimentStressedIcon,
  SentimentVeryDissatisfiedIcon,
  SentimentWorriedIcon,
} from '@/icons';
import { TechnicalInfoAccordion } from '@/errorHandling/TechnicalInfoAccordion';

interface RouteErrorPageProps {
  icon: ReactNode;
  titleText?: string;
  bodyText?: string;
  links?: ReactNode;
  technicalInfo?: ReactNode;
}

export const ErrorPage = ({
  icon,
  titleText,
  bodyText,
  technicalInfo,
  links,
}: RouteErrorPageProps) => {
  return (
    <main className={styles['error-page']}>
      <span className={styles['error-icon']}> {icon}</span>
      <h1>{titleText}</h1>
      <p className={styles['error-body']}>{bodyText}</p>
      {links}
      {technicalInfo && <TechnicalInfoAccordion infoText={technicalInfo} />}
    </main>
  );
};

export const getIconByHTTPStatus = (status: number) => {
  switch (status) {
    case 400:
      return <SentimentWorriedIcon />;
    case 401:
      return <LockIcon />;
    case 403:
      return <KeyOffIcon />;
    case 404:
      return <SentimentNeutralIcon />;
    case 409:
      return <SentimentStressedIcon />;
    case 500:
    default:
      return <SentimentVeryDissatisfiedIcon />;
  }
};
