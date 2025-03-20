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

import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react';
import { Button } from '@/components/Button/Button';
import { CloseIcon, InfoIcon } from '@/icons';
import { useTranslation } from 'react-i18next';
import styles from './FieldInfo.module.css';
import { FieldContext } from '@/components/Input/Fieldset';
import { use } from 'react';

interface FieldInfoProps {
  title: string;
  body: string;
}

export const FieldInfo = ({ title, body }: FieldInfoProps) => {
  const { t } = useTranslation();
  const { ids } = use(FieldContext);
  return (
    <Popover className={styles['popover']}>
      <PopoverButton
        as={Button}
        variant='icon'
        size='small'
        aria-label={t('divaClient_fieldInfoText')}
      >
        <InfoIcon />
      </PopoverButton>
      <PopoverPanel
        anchor='top'
        className={styles['field-info-panel']}
        role='definition'
        unmount={false}
      >
        <div className={styles['label-wrapper']}>
          {title && <h4>{t(title)}</h4>}
          <CloseButton
            as={Button}
            variant='icon'
            size='small'
            aria-label={t('divaClient_closeText')}
          >
            <CloseIcon />
          </CloseButton>
        </div>
        {body && <p id={ids.details}>{t(body)}</p>}
      </PopoverPanel>
    </Popover>
  );
};
