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

import type { FormComponentCollVar } from '@/components/FormGenerator/types';
import { checkIfComponentHasValue } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { addAttributesToName } from '@/components/FormGenerator/defaultValues/defaultValues';
import { ControlledSelectField } from '@/components/Controlled';
import { useRemixFormContext } from 'remix-hook-form';
import { type ReactNode } from 'react';
import { DevInfo } from '@/components/FormGenerator/components/DevInfo';
import styles from './FormComponent.module.css';

interface CollectionVariableProps {
  reactKey: string;
  renderElementGridWrapper: boolean;
  component: FormComponentCollVar;
  name: string;
  attributes?: ReactNode;
  actionButtonGroup?: ReactNode;
}

export const CollectionVariable = ({
  reactKey,
  component,
  name,
  attributes,
  actionButtonGroup,
}: CollectionVariableProps) => {
  const { getValues, control } = useRemixFormContext();
  const hasValue = checkIfComponentHasValue(getValues, name);
  if (component.mode === 'output' && !hasValue) {
    return null;
  }
  return (
    <div
      key={reactKey}
      className={styles.component}
      id={`anchor_${addAttributesToName(component, component.name)}`}
      data-colspan={component.gridColSpan ?? 12}
    >
      <DevInfo
        component={component}
        path={name}
      />

      <ControlledSelectField
        name={name}
        isLoading={false}
        loadingError={false}
        label={component.label ?? ''}
        showLabel={component.showLabel}
        placeholder={component.placeholder}
        tooltip={component.tooltip}
        control={control}
        options={component.options}
        readOnly={!!component.finalValue}
        displayMode={component.mode}
        hasValue={hasValue}
        attributes={attributes}
        actionButtonGroup={actionButtonGroup}
      />
    </div>
  );
};
