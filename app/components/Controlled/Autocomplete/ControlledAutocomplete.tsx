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

import { type ReactNode, useEffect, useState } from 'react';

import {
  Autocomplete as MuiAutocomplete,
  Box,
  FormControl,
  FormLabel,
  IconButton,
  TextField,
} from '@mui/material';

import axios from 'axios';
import { ChevronDownIcon, InfoIcon } from '@/icons';
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { BFFDataRecord } from '@/types/record';
import { AutocompleteForm } from '@/components/Form/AutocompleteForm';
import { LinkedRecord } from '@/components/LinkedRecord/LinkedPresentationRecord';
import { Tooltip } from '@/components/Tooltip/Tooltip';

interface AutoCompleteProps {
  name: string;
  placeholder?: string;
  label: string;
  readOnly?: boolean;
  displayMode?: string;
  parentPresentationStyle?: string;
  onSelected?: (id: string) => void;
  searchLink?: string;
  control?: Control<any>;
  showLabel?: boolean;
  tooltip?: { title: string; body: string };
  presentationRecordLinkId?: string;
  recordType?: string;
  attributes?: ReactNode;
  actionButtonGroup?: ReactNode;
}

export const ControlledAutocomplete = (
  props: AutoCompleteProps,
): JSX.Element => {
  const { t } = useTranslation();
  const [options, setOptions] = useState<BFFDataRecord[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [presentationValue, setPresentationValue] =
    useState<BFFDataRecord | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (inputValue === '' || inputValue.length < 2) {
          return undefined;
        }
        if (inputValue === presentationValue?.id) {
          return undefined;
        }
        const response = await axios.get(
          `${import.meta.env.BASE_URL}autocompleteSearch?searchType=${props.searchLink}&searchTermValue=${inputValue}`,
        );

        if (isMounted) {
          setOptions(response.data);
        }
      } catch (err: unknown) {
        console.error('err', err);
      }
    };

    fetchData().then();
    return () => {
      isMounted = false;
    };
  }, [inputValue, props.searchLink, presentationValue]);

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
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <FormLabel
                htmlFor={field.name}
                aria-label={props.label}
                error={error !== undefined}
                sx={{
                  p: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {props.showLabel === true ? t(props.label) : null}
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
              {props.attributes}
              {props.actionButtonGroup}
            </Box>
            <MuiAutocomplete
              size='small'
              noOptionsText={t('divaClient_NoOptionsText' as string)}
              popupIcon={<ChevronDownIcon />}
              onChange={(
                event: React.SyntheticEvent,
                newValue: BFFDataRecord | null,
              ) => {
                field.onChange(newValue?.id);
                setPresentationValue(newValue);
              }}
              disablePortal
              id={field.name}
              sx={{ width: '100%' }}
              filterOptions={(x) => x}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={options}
              getOptionLabel={(option) => option.id as string}
              clearOnBlur={false}
              renderInput={(params) => (
                <>
                  {presentationValue !== null ? (
                    <LinkedRecord
                      recordType={props.recordType as string}
                      id={field.value}
                      presentationRecordLinkId={
                        props.presentationRecordLinkId as string
                      }
                    />
                  ) : (
                    <TextField
                      {...params}
                      {...fieldWithoutRef}
                      sx={{ marginTop: '0' }}
                      placeholder={t(props.placeholder as string) ?? ''}
                      margin='normal'
                      error={error !== undefined}
                    />
                  )}
                </>
              )}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              renderOption={(renderProps, option) => {
                return (
                  <li {...renderProps} key={option.id}>
                    <AutocompleteForm
                      record={option}
                      formSchema={option.presentation!}
                    />
                  </li>
                );
              }}
            />
          </FormControl>
        );
      }}
    />
  );
};
