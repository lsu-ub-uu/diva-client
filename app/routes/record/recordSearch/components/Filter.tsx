import { useTranslation } from 'react-i18next';

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@/components/Input/Combobox';
import type {
  AutocompleteFilter,
  FilterDefinition,
} from '@/routes/record/recordSearch/utils/createFilterDefinition.server';
import type { BFFDataRecord } from '@/types/record';
import { useState } from 'react';
import { href, useFetcher } from 'react-router';

import { ComboboxSelect } from '@/components/FormGenerator/components/ComboboxSelect';
import { Fieldset } from '@/components/Input/Fieldset';
import { Input } from '@/components/Input/Input';
import { Select } from '@/components/Input/Select';
import { useLanguage } from '@/i18n/useLanguage';
import { getRecordTitle } from '@/utils/getRecordTitle';
import { useHydrated } from '@/utils/useHydrated';

interface FilterProps {
  filter: FilterDefinition;
  currentValue?: string;
  onChange?: (newValue: string) => void;
  forceSubmit: () => void;
  currentValueText?: string;
  validationError?: string;
}

export const Filter = ({
  filter,
  currentValue,
  forceSubmit,
  currentValueText,
  validationError,
}: FilterProps) => {
  const { t } = useTranslation();
  const [prevValue, setPrevValue] = useState(currentValue);
  const [value, setValue] = useState(currentValue ?? '');
  const [focused, setFocused] = useState(false);
  const hydrated = useHydrated();

  if (currentValue !== prevValue) {
    setPrevValue(currentValue);
    if (!focused) {
      setValue(currentValue ?? '');
    }
  }

  switch (filter.type) {
    case 'text':
      return (
        <Fieldset
          label={t(filter.textId)}
          size='small'
          errorMessage={validationError && t(validationError)}
        >
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
        <Fieldset
          label={t(filter.textId)}
          size='small'
          errorMessage={validationError && t(validationError)}
        >
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
      if (hydrated && filter.options.length > 20) {
        return (
          <Fieldset
            label={t(filter.textId)}
            size='small'
            errorMessage={validationError && t(validationError)}
          >
            <ComboboxSelect
              name={filter.name}
              value={value}
              onChange={(newValue) => {
                setValue(newValue as string);
                forceSubmit();
              }}
              options={filter.options.map((option) => ({
                value: option.value,
                label: option.text,
              }))}
            />
          </Fieldset>
        );
      }
      return (
        <Fieldset
          label={t(filter.textId)}
          size='small'
          errorMessage={validationError && t(validationError)}
        >
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
          currentValueText={currentValueText}
          validationError={validationError}
        />
      );
  }
};

interface AutocompleteFilterProps {
  filter: AutocompleteFilter;
  value: string;
  onChange: (newValue: string) => void;
  currentValueText?: string;
  validationError?: string;
}

const AutocompleteFilter = ({
  filter,
  value,
  onChange,
  currentValueText,
  validationError,
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
    <Fieldset
      label={t(filter.textId)}
      size='small'
      errorMessage={validationError && t(validationError)}
    >
      <Combobox
        name={filter.name}
        value={value}
        onChange={(newValue) => {
          onChange(newValue ? `${filter.recordType}_${newValue}` : '');
        }}
      >
        <ComboboxInput
          onChange={handleComboboxInputChange}
          placeholder={t('divaClient_recordLinkAutocompletePlaceholderText', {
            recordType: t(filter.textId).toLowerCase(),
          })}
          displayValue={(item) => currentValueText ?? item}
        />
        <ComboboxOptions anchor='bottom'>
          {fetcher.state === 'idle' &&
            fetcher.data &&
            fetcher.data.result.map((result: BFFDataRecord) => (
              <ComboboxOption key={result.id} value={result.id}>
                {getRecordTitle(result, language)}
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
