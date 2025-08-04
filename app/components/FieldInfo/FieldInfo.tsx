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
import { CloseIcon, InfoIcon } from '@/icons';
import { usePopover } from '@/utils/usePopover';
import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import { use } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './FieldInfo.module.css';

interface FieldInfoProps {
  title: string;
  body: string;
}

export const FieldInfo = ({ title, body }: FieldInfoProps) => {
  const { t } = useTranslation();
  const { ids } = use(FieldContext);

  const {
    isOpen,
    setIsOpen,
    refs,
    floatingStyles,
    context,
    getReferenceProps,
    getFloatingProps,
  } = usePopover();

  return (
    <div className={styles['popover']}>
      <Button
        variant='icon'
        size='small'
        aria-label={t('divaClient_fieldInfoText')}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <InfoIcon />
      </Button>
      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context}>
            <div
              className={styles['field-info-panel']}
              role='definition'
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              <div className={styles['label-wrapper']}>
                {title && <h4>{t(title)}</h4>}
                <Button
                  onClick={() => setIsOpen(false)}
                  as={Button}
                  variant='icon'
                  size='small'
                  aria-label={t('divaClient_closeText')}
                  tooltipPosition='left'
                >
                  <CloseIcon />
                </Button>
              </div>
              {body && <p id={ids.details}>{t(body)}</p>}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </div>
  );
};
