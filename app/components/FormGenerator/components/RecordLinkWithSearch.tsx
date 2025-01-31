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
import { useRemixFormContext } from 'remix-hook-form';
import { addAttributesToName } from '@/components/FormGenerator/defaultValues/defaultValues';
import { ControlledAutocomplete } from '@/components/Controlled/Autocomplete/ControlledAutocomplete';
import { type ReactNode, useContext } from 'react';
import { DevInfo } from '@/components/FormGenerator/components/DevInfo';

import styles from './FormComponent.module.css';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';

interface RecordLinkWithSearchProps {
  reactKey: string;
  component: FormComponentRecordLink;
  name: string;
  attributes?: ReactNode;
  actionButtonGroup?: ReactNode;
}

export const RecordLinkWithSearch = ({
  reactKey,
  component,
  name,
  attributes,
  actionButtonGroup,
}: RecordLinkWithSearchProps) => {
  const { control } = useRemixFormContext();
  const { showTooltips } = useContext(FormGeneratorContext);

  return (
    <div
      className={styles.component}
      key={reactKey}
      data-colspan={component.gridColSpan ?? 12}
      id={`anchor_${addAttributesToName(component, component.name)}`}
    >
      <DevInfo
        component={component}
        path={name}
      />

      <ControlledAutocomplete
        label={component.label ?? ''}
        name={name}
        showLabel={component.showLabel}
        placeholder={component.placeholder}
        tooltip={showTooltips ? component.tooltip : undefined}
        control={control}
        readOnly={!!component.finalValue}
        displayMode={component.mode}
        searchLink={component.search}
        presentationRecordLinkId={component.presentationRecordLinkId ?? ''}
        recordType={component.recordLinkType ?? ''}
        attributes={attributes}
        actionButtonGroup={actionButtonGroup}
      />
    </div>
  );
};
