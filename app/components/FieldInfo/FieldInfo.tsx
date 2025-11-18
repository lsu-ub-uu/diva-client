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

import { Button } from '@/components/Button/Button';
import { FieldContext } from '@/components/Input/Fieldset';
import { InfoIcon } from '@/icons';
import { use, useId } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './FieldInfo.module.css';
import { useTooltip } from '@/components/Tooltip/useTooltip';
import { Tooltip } from '../Tooltip/Tooltip';
import { Popover } from '../Popover/Popover';

interface FieldInfoProps {
  title: string;
  body: string;
}

export const FieldInfo = ({ title, body }: FieldInfoProps) => {
  const { t } = useTranslation();
  const { ids } = use(FieldContext);
  const id = useId();

  const { wrapperProps, triggerProps, tooltipProps } = useTooltip();

  return (
    <div className={styles['field-info']} {...wrapperProps}>
      <Button
        variant='icon'
        size='small'
        aria-label={t('divaClient_fieldInfoText')}
        popoverTarget={id}
        className={styles['field-info-button']}
        {...triggerProps}
      >
        <InfoIcon />
      </Button>
      <Tooltip {...tooltipProps}>{t('divaClient_fieldInfoText')}</Tooltip>
      <Popover id={id} title={t(title)}>
        {body && <p id={ids.details}>{t(body)}</p>}
      </Popover>
    </div>
  );
};
