/*
 * Copyright 2023 Uppsala University Library
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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import type { Control } from 'react-hook-form';
import { Controller, useFieldArray } from 'react-hook-form';
import { Button, Grid2 as Grid } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useTranslation } from 'react-i18next';
import { ActionButtonGroup } from './ActionButtonGroup';
import {
  addAttributesToName,
  createDefaultValuesFromComponent,
} from '../defaultValues/defaultValues';
import { isComponentSingularAndOptional } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { Fragment, type ReactNode } from 'react';
import type { FormComponentWithData } from '@/components/FormGenerator/types';
import { useRemixFormContext } from 'remix-hook-form';

interface FieldArrayComponentProps {
  control?: Control<any>;
  name: string;
  component: FormComponentWithData;
  renderCallback: (path: string, actionButtonGroup: ReactNode) => ReactNode;
  hasValue?: boolean;
}

export const FieldArrayComponent = (props: FieldArrayComponentProps) => {
  const { getValues } = useRemixFormContext();
  const { t } = useTranslation();
  const { fields, append, move, remove } = useFieldArray({
    control: props.control,
    name: props.name,
  });
  const handleAppend = async () => {
    append(createDefaultValuesFromComponent(props.component, true));
  };

  const handleMove = async (prev: number, next: number) => {
    move(prev, next);
  };

  const handleRemove = async (index: number) => {
    remove(index);
  };

  return (
    <Grid
      key={`${props.name}_grid`}
      size={{ xs: 12, sm: props.component.gridColSpan }}
      id={`anchor_${addAttributesToName(props.component, props.component.name)}`}
      container
      spacing={1}
    >
      <Controller
        control={props.control}
        name={props.name}
        render={({ fieldState }) => (
          <>
            {fieldState.error && (
              <span style={{ color: 'red' }}>{fieldState.error?.message}</span>
            )}
          </>
        )}
      />
      {fields.map((field, index) => {
        const actionButtonGroup = props.component.mode === 'input' && (
          <ActionButtonGroup
            entityName={`${t(props.component.label ?? '')}`}
            hideMoveButtons={isComponentSingularAndOptional(props.component)}
            moveUpButtonDisabled={index === 0}
            moveUpButtonAction={() => handleMove(index, index - 1)}
            moveDownButtonDisabled={index === fields.length - 1}
            moveDownButtonAction={() => handleMove(index, index + 1)}
            deleteButtonDisabled={
              fields.length <= (props.component.repeat?.repeatMin ?? 1)
            }
            deleteButtonAction={() => handleRemove(index)}
            entityType={props.component.type}
            key={`${field.id}_${index}_f`}
          />
        );

        return (
          <Fragment key={`${field.id}_${index}_a`}>
            {props.renderCallback(
              `${props.name}[${index}]` as const,
              actionButtonGroup,
            )}
          </Fragment>
        );
      })}

      {props.component.mode === 'input' &&
        fields.length < (props.component.repeat?.repeatMax ?? 1) && (
          <Grid size={12}>
            <Button
              fullWidth
              variant='outlined'
              disabled={
                fields.length >= (props.component.repeat?.repeatMax ?? 1)
              }
              onClick={handleAppend}
              disableRipple
              endIcon={<AddCircleOutlineIcon />}
            >
              {t(props.component.label as string)}
            </Button>
          </Grid>
        )}
    </Grid>
  );
};
