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

interface RouteErrorPageProps {
  status: 401 | 403 | 404 | 409 | 500;
  coraMessage?: string;
}
/*
 * divaClient_errorPageTitleText: '{{}} - '
 * divaClient_errorPageBodyText: ''
 * */

export const RouteErrorPage = ({
  status,
  coraMessage,
}: RouteErrorPageProps) => {
  const { t } = useTranslation();
  const [detailsExpanded, setDetailsExpanded] = useState(false);

  return (
    <main className={styles['error-page']}>
      <h1>{t(`divaClient_error${status}TitleText`)}</h1>
      <p className={styles['error-body']}>
        {t(`divaClient_error${status}BodyText`)}
      </p>
      <Accordion expanded={detailsExpanded} onChange={setDetailsExpanded}>
        <AccordionTitle>{t('divaClient_showErrorDetailsText')}</AccordionTitle>
        {detailsExpanded && (
          <AccordionContent>
            <p>{coraMessage}</p>
          </AccordionContent>
        )}
      </Accordion>
    </main>
  );
};
