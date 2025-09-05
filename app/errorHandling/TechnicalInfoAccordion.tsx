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
import { useTranslation } from 'react-i18next';
import { type ReactNode, useState } from 'react';
import { Card } from '@/components/Card/Card';
import { CardHeader } from '@/components/Card/CardHeader';
import { CardTitle } from '@/components/Card/CardTitle';
import { CardExpandButton } from '@/components/Card/CardExpandButton';
import { CardContent } from '@/components/Card/CardContent';

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
      <Card expanded={detailsExpanded} boxed>
        <CardHeader>
          <CardTitle>
            <CardExpandButton
              expanded={detailsExpanded}
              onClick={() => setDetailsExpanded(!detailsExpanded)}
            >
              {t('divaClient_showErrorDetailsText')}
            </CardExpandButton>
          </CardTitle>
        </CardHeader>
        <CardContent hidden={!detailsExpanded}>
          <p className={styles['cora-message']}>{infoText}</p>
        </CardContent>
      </Card>
    </div>
  );
};
