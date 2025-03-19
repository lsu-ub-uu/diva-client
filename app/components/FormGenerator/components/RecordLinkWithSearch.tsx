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

import type { FormComponentRecordLink } from '@/components/FormGenerator/types';
import { useRemixFormContext } from 'remix-hook-form';
import { addAttributesToName } from '@/components/FormGenerator/defaultValues/defaultValues';
import { type ReactNode, use } from 'react';

import styles from './FormComponent.module.css';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import { getErrorMessageForField } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { useTranslation } from 'react-i18next';
import { useFetcher } from 'react-router';
import type { BFFDataRecord } from '@/types/record';
import { ComboboxInput } from '@/components/Input/ComboboxInput';
import { AutocompleteForm } from '@/components/Form/AutocompleteForm';
import {
  Combobox,
  ComboboxOption,
  ComboboxOptions,
} from '@/components/Input/Combobox';
import { DevInfo } from '@/components/FormGenerator/components/DevInfo';
import { Fieldset } from '@/components/Input/Fieldset';

interface RecordLinkWithSearchProps {
  reactKey: string;
  component: FormComponentRecordLink;
  path: string;
  attributes?: ReactNode;
  actionButtonGroup?: ReactNode;
}

export const RecordLinkWithSearch = ({
  reactKey,
  component,
  path,
  attributes,
  actionButtonGroup,
}: RecordLinkWithSearchProps) => {
  const { t } = useTranslation();
  const { formState, setValue } = useRemixFormContext();
  const { showTooltips } = use(FormGeneratorContext);
  const errorMessage = getErrorMessageForField(formState, path);
  const fetcher = useFetcher();

  return (
    <div
      className={styles['component']}
      key={reactKey}
      data-colspan={component.gridColSpan ?? 12}
      id={`anchor_${addAttributesToName(component, component.name)}`}
    >
      <DevInfo component={component} path={path} />
      <Fieldset
        label={component.showLabel ? t(component.label) : undefined}
        errorMessage={errorMessage}
        info={showTooltips ? component.tooltip : undefined}
        attributes={attributes}
        actionButtonGroup={actionButtonGroup}
      >
        <Combobox onChange={(recordId) => setValue(path, recordId)}>
          <ComboboxInput
            aria-busy={fetcher.state !== 'idle'}
            placeholder={t('divaClient_recordLinkAutocompletePlaceholderText')}
            onChange={(event) =>
              fetcher.load(
                `/autocompleteSearch?searchType=${component.search}&searchTermValue=${event.target.value}`,
              )
            }
          />
          <ComboboxOptions anchor='bottom'>
            {fetcher.state === 'idle' &&
              fetcher.data &&
              fetcher.data.result.map((result: BFFDataRecord) => (
                <ComboboxOption key={result.id} value={result.id}>
                  <AutocompleteForm
                    record={result}
                    formSchema={result.presentation!}
                  />
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
    </div>
  );
};
