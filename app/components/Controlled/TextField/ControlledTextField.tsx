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
 */

import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  TextField,
} from '@mui/material';
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';
import { Tooltip } from '@/components/Tooltip/Tooltip';

interface ControlledTextFieldProps {
  name: string;
  control?: Control<any>;
  label: string;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  multiline?: boolean;
  tooltip?: { title: string; body: string };
  displayMode?: string;
  parentPresentationStyle?: string;
  showLabel?: boolean;
  hasValue?: boolean;
  inputFormat?: 'password';
  attributes?: ReactNode;
  actionButtonGroup?: ReactNode;
  linkedDataToShow?: string;
}

export const ControlledTextField = (props: ControlledTextFieldProps) => {
  const { t } = useTranslation();
  const displayMode = props.displayMode ?? 'input';
  const showLabel = !props.linkedDataToShow && props.showLabel;

  if (displayMode === 'output' && !props.hasValue) {
    return null;
  }
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field, fieldState: { error } }) => {
        const fieldWithoutRef = { ...field, ref: undefined };
        return (
          <FormControl
            fullWidth
            sx={{
              flexDirection:
                props.parentPresentationStyle === 'inline' ? 'row' : 'column',
              alignItems: 'baseline',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              {showLabel ? (
                <FormLabel
                  id={`${props.name}-label`}
                  htmlFor={field.name}
                  required={props.required}
                  error={error !== undefined}
                  sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    mr: 'auto',
                  }}
                >
                  {t(props.label)}
                  {props.tooltip && (
                    <Tooltip
                      title={t(props.tooltip.title)}
                      body={t(props.tooltip.body)}
                    >
                      <IconButton
                        edge='end'
                        aria-label='Help'
                        disableRipple
                        color='default'
                      >
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </FormLabel>
              ) : null}

              {props.attributes}
              {props.actionButtonGroup}
            </Box>
            {displayMode === 'input' ? (
              <TextField
                multiline={props.multiline ?? false}
                rows={props.multiline ? 3 : 1}
                id={field.name}
                size='small'
                error={error !== undefined}
                {...fieldWithoutRef}
                inputRef={field.ref}
                onBlur={field.onBlur}
                autoComplete='off'
                placeholder={
                  props.placeholder !== undefined
                    ? (t(props.placeholder) as string)
                    : ''
                }
                value={props.linkedDataToShow ?? fieldWithoutRef.value}
                fullWidth
                variant='outlined'
                helperText={error !== undefined ? error.message : ' '}
                InputProps={{
                  readOnly: props.readOnly,
                  endAdornment: (
                    <ErrorIcon
                      sx={{
                        color: '#ff0000',
                        visibility: error !== undefined ? 'visible' : 'hidden',
                      }}
                    />
                  ),
                }}
                type={props.inputFormat}
              />
            ) : (
              <>
                <Box
                  aria-labelledby={`${props.name}-label`}
                  component='span'
                  sx={{ pl: 2, mb: 1 }}
                >
                  {field.value || props.linkedDataToShow}
                </Box>
                <input
                  type='hidden'
                  value={field.value}
                  name={field.name}
                />
              </>
            )}
          </FormControl>
        );
      }}
    />
  );
};
