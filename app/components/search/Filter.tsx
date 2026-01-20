import { useTranslation } from 'react-i18next';
import { Fieldset } from '../Input/Fieldset';
import { Input } from '../Input/Input';
import { Select } from '../Input/Select';
import type {
  FilterType,
  AutocompleteFilter,
} from '@/data/search/createFilterDefinition.server';
import { useState } from 'react';
import { useFetcher, href } from 'react-router';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@/components/Input/Combobox';
import type { BFFDataRecord } from '@/types/record';

import { get } from 'lodash-es';
import { useLanguage } from '@/i18n/useLanguage';
import { AutocompleteForm } from '../Form/AutocompleteForm';

interface FilterProps {
  filter: FilterType;
  currentValue?: string;
  onChange?: (newValue: string) => void;
  forceSubmit: () => void;
}

export const Filter = ({ filter, currentValue, forceSubmit }: FilterProps) => {
  const { t } = useTranslation();
  const [prevValue, setPrevValue] = useState(currentValue);
  const [value, setValue] = useState(currentValue ?? '');
  const [focused, setFocused] = useState(false);

  if (currentValue !== prevValue) {
    setPrevValue(currentValue);
    if (!focused) {
      setValue(currentValue ?? '');
    }
  }

  switch (filter.type) {
    case 'text':
      return (
        <Fieldset label={t(filter.textId)} size='small'>
          <Input
            name={filter.name}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </Fieldset>
      );
    case 'number':
      return (
        <Fieldset label={t(filter.textId)} size='small'>
          <Input
            type='number'
            name={filter.name}
            min={filter.min}
            max={filter.max}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </Fieldset>
      );
    case 'collection':
      return (
        <Fieldset label={t(filter.textId)} size='small'>
          <Select
            name={filter.name}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          >
            <option value=''>--</option>
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {t(option.text)}
              </option>
            ))}
          </Select>
        </Fieldset>
      );
    case 'autocomplete':
      return (
        <AutocompleteFilter
          filter={filter}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            forceSubmit();
          }}
        />
      );
  }
};

interface AutocompleteFilterProps {
  filter: AutocompleteFilter;
  value: string;
  onChange: (newValue: string) => void;
}

const AutocompleteFilter = ({
  filter,
  value,
  onChange,
}: AutocompleteFilterProps) => {
  const language = useLanguage();
  const { t } = useTranslation();
  const fetcher = useFetcher();

  const handleComboboxInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.stopPropagation();
    const comboboxInputValue = event.currentTarget.value;

    const data = {
      [filter.searchTerm]: comboboxInputValue,
    };

    fetcher.submit(data, {
      method: 'GET',
      action: href('/autocompleteSearch/:searchType', {
        searchType: filter.searchType,
      }),
    });
  };

  return (
    <Fieldset label={t(filter.textId)} size='small'>
      <Combobox
        name={filter.name}
        value={value}
        onChange={(newValue) => {
          onChange(newValue ? `diva-subject_${newValue}` : '');
        }}
      >
        <ComboboxInput onChange={handleComboboxInputChange} />
        <ComboboxOptions anchor='bottom'>
          {fetcher.state === 'idle' &&
            fetcher.data &&
            fetcher.data.result.map((result: BFFDataRecord) => (
              <ComboboxOption key={result.id} value={result.id}>
                {get(result.data, filter.presentationPath[language]) || (
                  <AutocompleteForm
                    record={result}
                    formSchema={result.presentation!}
                  />
                )}
              </ComboboxOption>
            ))}
          {fetcher.state === 'idle' &&
            fetcher.data &&
            fetcher.data.result.length === 0 && (
              <ComboboxOption disabled value=''>
                {t('divaClient_recordLinkAutocompleteNoResultsText')}
              </ComboboxOption>
            )}
          {fetcher.state === 'loading' && (
            <ComboboxOption disabled value=''>
              {t('divaClient_recordLinkAutocompleteSearchingText')}
            </ComboboxOption>
          )}
        </ComboboxOptions>
      </Combobox>
    </Fieldset>
  );
};
