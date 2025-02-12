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

import type { SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';
import ChevronDownIcon from '@/icons/ChevronDown.svg';

import {
  Autocomplete as MuiAutocomplete,
  IconButton,
  TextField,
} from '@mui/material';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import type { SelectItem } from '../../index';

interface MultiAutoCompleteProps {
  loading: boolean;
  values: string[];
  placeholder?: string;
  options: SelectItem[];
  onChange?: (id: string[]) => void;
  onBrowseButtonClicked?: () => void;
}

export const MultiAutoComplete = (
  props: MultiAutoCompleteProps,
): JSX.Element => {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setSelected(props.values);
  }, [props.values]);

  const getItemsFromIds = () => {
    return props.options.filter((item) => selected.indexOf(item.id) > -1);
  };

  return (
    <MuiAutocomplete
      value={getItemsFromIds()}
      onChange={(event: SyntheticEvent, selectItems: SelectItem[]) => {
        const ids = selectItems.map((item) => item.id);
        setSelected(ids);
        if (props.onChange) props.onChange(ids);
      }}
      loading={props.loading}
      clearText='Clear all'
      size='small'
      multiple
      popupIcon={<ChevronDownIcon />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      id='autocomplete-multi-select'
      sx={{ width: '100%' }}
      options={props.options}
      getOptionDisabled={(option) => option.disabled ?? false}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          // inputRef={ref}
          variant='outlined'
          {...params}
          // error={error !== undefined}
          placeholder='Search'
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                <IconButton
                  title='Browse'
                  aria-label='browse'
                  onClick={() => {
                    if (props.onBrowseButtonClicked) {
                      props.onBrowseButtonClicked();
                    }
                  }}
                >
                  {/*<AccountTreeIcon />*/}
                </IconButton>
                {params.InputProps.startAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(renderProps, option, { inputValue }) => {
        const matches = match(option.name, inputValue, { insideWords: true });
        const parts = parse(option.name, matches);

        return (
          <li {...renderProps}>
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        );
      }}
    />
  );
};
