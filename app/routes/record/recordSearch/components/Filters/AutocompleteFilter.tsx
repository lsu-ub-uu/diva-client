import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@/components/Input/Combobox';
import { Fieldset } from '@/components/Input/Fieldset';
import type { AutocompleteFilter as AutocompleteFilterDef } from '@/routes/record/recordSearch/utils/createFilterDefinition.server';
import type { BFFDataRecord } from '@/types/record';
import { useState } from 'react';
import { href, useFetcher } from 'react-router';
import { useLanguage } from '@/i18n/useLanguage';
import { getRecordTitle } from '@/utils/getRecordTitle';
import { useTranslation } from 'react-i18next';

interface AutocompleteFilterProps {
  filter: AutocompleteFilterDef;
  currentValue?: string;
  forceSubmit: () => void;
  currentValueText?: string;
  validationError?: string;
}

export const AutocompleteFilter = ({
  filter,
  currentValue,
  forceSubmit,
  currentValueText,
  validationError,
}: AutocompleteFilterProps) => {
  const language = useLanguage();
  const { t } = useTranslation();
  const fetcher = useFetcher();
  const [value, setValue] = useState(currentValue ?? '');
  const [prevCurrentValue, setPrevCurrentValue] = useState(currentValue);
  const [pendingSync, setPendingSync] = useState(false);

  if (prevCurrentValue !== currentValue) {
    setPrevCurrentValue(currentValue);
    if (!pendingSync) {
      setValue(currentValue ?? '');
    } else {
      setPendingSync(false);
    }
  }

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
          setValue(newValue ? `${filter.recordType}_${newValue}` : '');
          setPendingSync(true);
          forceSubmit();
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
