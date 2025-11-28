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

import { FieldContext } from '@/components/Input/Fieldset';
import { InfoIcon } from 'lucide-react';
import { use, useId } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton } from '../IconButton/IconButton';
import { Popover } from '../Popover/Popover';
import styles from './FieldInfo.module.css';

interface FieldInfoProps {
  title: string;
  body: string;
}

export const FieldInfo = ({ title, body }: FieldInfoProps) => {
  const { t } = useTranslation();
  const { ids } = use(FieldContext);
  const id = useId();

  return (
    <div className={styles['field-info']}>
      <IconButton
        size='small'
        tooltip={t('divaClient_fieldInfoText')}
        popoverTarget={id}
        className={styles['field-info-button']}
      >
        <InfoIcon />
      </IconButton>
      <Popover id={id} title={t(title)}>
        {body && <p id={ids.details}>{t(body)}</p>}
      </Popover>
    </div>
  );
};
