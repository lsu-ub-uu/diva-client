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

import styles from '@/errorHandling/ErrorPage.module.css';
import { Accordion } from '@/components/Accordion/Accordion';
import { AccordionTitle } from '@/components/Accordion/AccordionTitle';
import { AccordionContent } from '@/components/Accordion/AccordionContent';
import { useTranslation } from 'react-i18next';
import { type ReactNode, useState } from 'react';

interface TechnicalInfoAccordionProps {
  infoText?: ReactNode;
}

export const TechnicalInfoAccordion = ({
  infoText,
}: TechnicalInfoAccordionProps) => {
  const { t } = useTranslation();
  const [detailsExpanded, setDetailsExpanded] = useState(false);

  if (!infoText) {
    return null;
  }

  return (
    <div className={styles['accordion']}>
      <Accordion expanded={detailsExpanded} onChange={setDetailsExpanded}>
        <AccordionTitle>{t('divaClient_showErrorDetailsText')}</AccordionTitle>

        {detailsExpanded && (
          <AccordionContent>
            <p className={styles['cora-message']}>{infoText}</p>
          </AccordionContent>
        )}
      </Accordion>
    </div>
  );
};
