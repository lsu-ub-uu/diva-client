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
import type { ReactNode } from 'react';
import { DevInfo } from '@/components/FormGenerator/components/DevInfo';
import styles from '@/components/FormGenerator/components/FormComponent.module.css';
import linkedRecordStyles from './RecordLinkWithLinkedPresentation.module.css';
import { addAttributesToName } from '@/components/FormGenerator/defaultValues/defaultValues';
import { useTranslation } from 'react-i18next';
import { useValueFromData } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { LinkedRecord } from '@/components/LinkedRecord/LinkedPresentationRecord';

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
  const defaultValue = useValueFromData(name) as string | undefined;

  if (!defaultValue) {
    return null;
  }

  return (
    <div
      className={styles['component']}
      data-colspan={component.gridColSpan ?? 12}
      id={`anchor_${addAttributesToName(component, component.name)}`}
    >
      <DevInfo component={component} path={name} />
      <div className={linkedRecordStyles['label-and-adornment-wrapper']}>
        {component.showLabel && (
          <div className={linkedRecordStyles['label']}>
            {t(component.label)}
          </div>
        )}
        <div className={linkedRecordStyles['container']}>
          {attributes} {actionButtonGroup}
        </div>
      </div>
      <input type='hidden' value={defaultValue} name={name} />
      <LinkedRecord
        id={defaultValue}
        recordType={component.recordLinkType ?? ''}
        presentationRecordLinkId={component.presentationRecordLinkId ?? ''}
      />
    </div>
  );
};
