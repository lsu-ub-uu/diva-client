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

import { useTranslation } from 'react-i18next';
import styles from './RouteErrorPage.module.css';
import { Accordion } from '@/components/Accordion/Accordion';
import { useState } from 'react';
import { AccordionTitle } from '@/components/Accordion/AccordionTitle';
import { AccordionContent } from '@/components/Accordion/AccordionContent';
import { href, Link } from 'react-router';
import {
  KeyOffIcon,
  LockIcon,
  SentimentNeutralIcon,
  SentimentStressedIcon,
  SentimentVeryDissatisfiedIcon, SentimentWorriedIcon,
} from '@/icons';

type Status = 400 | 401 | 403 | 404 | 409 | 500;

interface RouteErrorPageProps {
  status: Status;
  recordType: string;
  recordId: string;
  otherMessage?: string;
  coraMessage?: string;
}

export const RouteErrorPage = ({
  status,
  recordType,
  recordId,
  otherMessage,
  coraMessage,
}: RouteErrorPageProps) => {
  const { t } = useTranslation();
  const [detailsExpanded, setDetailsExpanded] = useState(false);

  return (
    <main className={styles['error-page']}>
      {getIcon(status)}

      <h1>{t(`divaClient_error${status}TitleText`)}</h1>
      <p className={styles['error-body']}>
        {otherMessage ? t(otherMessage) : t(`divaClient_error${status}BodyText`, { recordType, recordId })}
      </p>
      <Link to={href('/:recordType', { recordType })}>
        {t('divaClient_errorGoToSearchText', { recordType })}
      </Link>
      {coraMessage && (
        <div className={styles['accordion']}>
          <Accordion expanded={detailsExpanded} onChange={setDetailsExpanded}>
            <AccordionTitle>
              {t('divaClient_showErrorDetailsText')}
            </AccordionTitle>

            {detailsExpanded && (
              <AccordionContent>
                <p className={styles['cora-message']}>{coraMessage}</p>
              </AccordionContent>
            )}
          </Accordion>
        </div>
      )}
    </main>
  );
};

function getIcon(status: Status) {
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
      return <SentimentVeryDissatisfiedIcon />;
  }
}
