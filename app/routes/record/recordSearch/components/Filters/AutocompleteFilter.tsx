import { Fieldset } from '@/components/Input/Fieldset';
import type { AutocompleteFilter as AutocompleteFilterDef } from '@/routes/record/recordSearch/utils/createFilterDefinition.server';
import type { BFFDataRecord } from '@/types/record';
import { useState } from 'react';
import { href, useFetcher } from 'react-router';
import { useLanguage } from '@/i18n/useLanguage';
import { getRecordTitle } from '@/utils/getRecordTitle';
import { useTranslation } from 'react-i18next';
import { Autocomplete } from '@/components/Autocomplete/Autocomplete';
import { useDebouncedCallback } from '@/utils/useDebouncedCallback';

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

  const handleAutocompleteInputChange = useDebouncedCallback(
    (autocompleteInputValue: string) => {
      const data = {
        [filter.searchTerm]: autocompleteInputValue,
      };

      fetcher.submit(data, {
        method: 'GET',
        action: href('/autocompleteSearch/:searchType', {
          searchType: filter.searchType,
        }),
      });
    },
    300,
  );

  const getAutocompleteOptions = () => {
    if (!fetcher.data) {
      return [];
    }

    if (fetcher.data.result.length === 0) {
      return [
        {
          value: '',
          presentation: t('divaClient_recordLinkAutocompleteNoResultsText'),
        },
      ];
    }

    return fetcher.data.result.map((result: BFFDataRecord) => ({
      value: result.id,
      presentation: getRecordTitle(result, language),
    }));
  };

  return (
    <Fieldset
      label={t(filter.textId)}
      size='small'
      errorMessage={validationError && t(validationError)}
    >
      <Autocomplete
        onAutocompleteInputChange={handleAutocompleteInputChange}
        options={getAutocompleteOptions()}
        value={value}
        onChange={(newValue) => {
          setValue(newValue ? `${filter.recordType}_${newValue}` : '');
          setPendingSync(true);
          forceSubmit();
        }}
        invalid={!!validationError}
        displayValue={currentValueText}
        placeholder={t('divaClient_recordLinkAutocompletePlaceholderText', {
          recordType: t(filter.textId).toLowerCase(),
        })}
      />
      <input type='hidden' name={filter.name} value={value} />
    </Fieldset>
  );
};
