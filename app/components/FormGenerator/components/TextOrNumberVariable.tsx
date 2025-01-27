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

import type {
  FormComponentNumVar,
  FormComponentTextVar,
} from '@/components/FormGenerator/types';
import { checkIfComponentHasValue } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { Grid2 as Grid } from '@mui/material';
import { addAttributesToName } from '@/components/FormGenerator/defaultValues/defaultValues';
import { useRemixFormContext } from 'remix-hook-form';
import { DevInfo } from '@/components/FormGenerator/components/DevInfo';
import { ControlledTextField } from '@/components/Controlled';
import { type ReactNode, useContext } from 'react';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import { getIdFromBFFRecordInfo } from '@/utils/getIdFromBFFRecordInfo';

interface TextOrNumberVariableProps {
  reactKey: string;
  renderElementGridWrapper: boolean;
  component: FormComponentTextVar | FormComponentNumVar;
  name: string;
  parentPresentationStyle: string | undefined;
  attributes?: ReactNode;
  actionButtonGroup?: ReactNode;
}

export const TextOrNumberVariable = ({
  reactKey,
  renderElementGridWrapper,
  component,
  name,
  parentPresentationStyle,
  attributes,
  actionButtonGroup,
}: TextOrNumberVariableProps) => {
  const { getValues, control } = useRemixFormContext();
  const { linkedData } = useContext(FormGeneratorContext);
  const hasValue = checkIfComponentHasValue(getValues, name);

  if (component.mode === 'output' && !hasValue) {
    return null;
  }

  const linkedDataToShow = getIdFromBFFRecordInfo(linkedData);

  return (
    <Grid
      key={reactKey}
      size={{
        xs: 12,
        sm: renderElementGridWrapper ? component.gridColSpan : 12,
      }}
      id={`anchor_${addAttributesToName(component, component.name)}`}
    >
      <DevInfo
        component={component}
        path={name}
      />

      <ControlledTextField
        multiline={
          'inputType' in component
            ? component.inputType === 'textarea'
            : undefined
        }
        label={component.label ?? ''}
        showLabel={component.showLabel}
        name={name}
        placeholder={component.placeholder}
        tooltip={component.tooltip}
        control={control}
        readOnly={!!component.finalValue}
        displayMode={component.mode}
        parentPresentationStyle={parentPresentationStyle}
        hasValue={hasValue}
        inputFormat={
          'inputFormat' in component ? component.inputFormat : undefined
        }
        attributes={attributes}
        actionButtonGroup={actionButtonGroup}
        linkedDataToShow={linkedDataToShow ?? undefined}
      />
    </Grid>
  );
};
