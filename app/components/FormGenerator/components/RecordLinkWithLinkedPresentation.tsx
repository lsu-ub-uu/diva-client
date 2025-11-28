/*
 * Copyright 2024 Uppsala University Library
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

import type { FormComponentRecordLink } from '@/components/FormGenerator/types';
import { use, type ReactNode } from 'react';

import { Button } from '@/components/Button/Button';
import { FieldInfo } from '@/components/FieldInfo/FieldInfo';
import { DevInfo } from '@/components/FormGenerator/components/DevInfo';
import { LinkedRecord } from '@/components/LinkedRecord/LinkedPresentationRecord';
import { useTranslation } from 'react-i18next';
import { href, Link } from 'react-router';
import { useRemixFormContext } from 'remix-hook-form';
import { FormGeneratorContext } from '../FormGeneratorContext';
import {
  isComponentOptional,
  isComponentRepeating,
} from '../formGeneratorUtils/formGeneratorUtils';
import styles from './RecordLinkWithLinkedPresentation.module.css';
import { LinkIcon, XIcon } from 'lucide-react';
import { IconButton } from '@/components/IconButton/IconButton';

interface RecordLinkWithLinkedPresentationProps {
  component: FormComponentRecordLink;
  name: string;
  attributes?: ReactNode;
  actionButtonGroup?: ReactNode;
}

export const RecordLinkWithLinkedPresentation = ({
  component,
  name,
  attributes,
  actionButtonGroup,
}: RecordLinkWithLinkedPresentationProps) => {
  const { t } = useTranslation();
  const { getValues, setValue } = useRemixFormContext();
  const linkedRecordId = getValues(name);
  const { showTooltips } = use(FormGeneratorContext);

  const clearValue = () => {
    setValue(name, '');
  };

  if (!linkedRecordId || !component.linkedRecordPresentation) {
    return null;
  }

  const showClearButton =
    component.mode === 'input' &&
    !isComponentRepeating(component) &&
    !isComponentOptional(component);

  const recordHref = href('/:recordType/:recordId', {
    recordType: component.linkedRecordPresentation.presentedRecordType,
    recordId: linkedRecordId,
  });

  return (
    <div
      className='form-component-item'
      data-colspan={component.gridColSpan ?? 12}
    >
      <DevInfo
        label='RecordLinkWithLinkedPresentation'
        component={component}
        path={name}
      />

      <div className={styles['label-and-adornment-wrapper']}>
        {component.showLabel && (
          <div className={styles['label']}>{t(component.label)}</div>
        )}
        {showTooltips && component.tooltip && (
          <div className={styles['field-info']}>
            <FieldInfo {...component.tooltip} />
          </div>
        )}
        <div className={styles['adornment']}>
          {attributes} {actionButtonGroup}
          {showClearButton && (
            <IconButton
              size='small'
              onClick={clearValue}
              tooltip={t('divaClient_clearRecordLinkText')}
            >
              <XIcon />
            </IconButton>
          )}
          <IconButton
            as={Link}
            size='small'
            to={recordHref}
            tooltip={t('divaClient_linkToRecordText')}
          >
            <LinkIcon />
          </IconButton>
        </div>
      </div>

      <LinkedRecord
        recordType={component.linkedRecordPresentation.presentedRecordType}
        id={linkedRecordId}
        presentationRecordLinkId={
          component.linkedRecordPresentation.presentationId
        }
      />
    </div>
  );
};
