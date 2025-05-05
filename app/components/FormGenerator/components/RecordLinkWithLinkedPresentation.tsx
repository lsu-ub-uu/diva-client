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

import { checkIfComponentHasValue } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import type { FormComponentRecordLink } from '@/components/FormGenerator/types';
import { use, type ReactNode } from 'react';

import { ControlledLinkedRecord } from '@/components/Controlled/LinkedRecord/ControlledLinkedRecord';
import { FieldInfo } from '@/components/FieldInfo/FieldInfo';
import { DevInfo } from '@/components/FormGenerator/components/DevInfo';
import formComponentStyles from '@/components/FormGenerator/components/FormComponent.module.css';
import { addAttributesToName } from '@/components/FormGenerator/defaultValues/defaultValues';
import { useTranslation } from 'react-i18next';
import { useRemixFormContext } from 'remix-hook-form';
import { FormGeneratorContext } from '../FormGeneratorContext';
import styles from './RecordLinkWithLinkedPresentation.module.css';

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
  const { getValues, control } = useRemixFormContext();
  const hasValue = checkIfComponentHasValue(getValues, name);
  const { showTooltips } = use(FormGeneratorContext);

  return hasValue ? (
    <div
      className={formComponentStyles['component']}
      data-colspan={component.gridColSpan ?? 12}
      id={`anchor_${addAttributesToName(component, component.name)}`}
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
        </div>
      </div>
      <div className={styles['linked-record-wrapper']}>
        <ControlledLinkedRecord
          control={control}
          name={name}
          recordType={
            component.linkedRecordPresentation?.presentedRecordType ?? ''
          }
          presentationRecordLinkId={
            component.linkedRecordPresentation?.presentationId ?? ''
          }
        />
      </div>
    </div>
  ) : null;
};
