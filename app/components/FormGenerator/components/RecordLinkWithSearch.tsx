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
  FormComponentAnyTypeRecordLink,
  FormComponentRecordLink,
} from '@/components/FormGenerator/types';
import { type ReactNode, use } from 'react';
import { useRemixFormContext } from 'remix-hook-form';

import { AutocompleteForm } from '@/components/Form/AutocompleteForm';
import { DevInfo } from '@/components/FormGenerator/components/DevInfo';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import { getErrorMessageForField } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@/components/Input/Combobox';
import { Fieldset } from '@/components/Input/Fieldset';
import type { BFFDataRecord } from '@/types/record';
import { assertDefined } from '@/utils/invariant';
import { useMember } from '@/utils/rootLoaderDataUtils';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { href, useFetcher } from 'react-router';

interface RecordLinkWithSearchProps {
  component: FormComponentRecordLink | FormComponentAnyTypeRecordLink;
  path: string;
  attributes?: ReactNode;
  actionButtonGroup?: ReactNode;
}

export const RecordLinkWithSearch = ({
  component,
  path,
  attributes,
  actionButtonGroup,
}: RecordLinkWithSearchProps) => {
  const { t } = useTranslation();
  const { formState, control } = useRemixFormContext();
  const { showTooltips } = use(FormGeneratorContext);
  const errorMessage = getErrorMessageForField(formState, path);
  const member = useMember();
  const fetcher = useFetcher();
  const recordLinkSearchPresentation = component.searchPresentation;
  const label = t(component.label);

  assertDefined(
    recordLinkSearchPresentation,
    'Record link has no search presentation',
  );

  const handleComboboxInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const comboboxInputValue = event.currentTarget.value;

    const data = {
      [recordLinkSearchPresentation.autocompleteSearchTerm.name]:
        comboboxInputValue,
    };

    if (
      recordLinkSearchPresentation.permissionUnitSearchTerm &&
      member?.memberPermissionUnit
    ) {
      data[recordLinkSearchPresentation.permissionUnitSearchTerm.name] =
        `permissionUnit_${member?.memberPermissionUnit}`;
    }

    fetcher.submit(data, {
      method: 'GET',
      action: href('/autocompleteSearch/:searchType', {
        searchType: recordLinkSearchPresentation.searchType,
      }),
    });
  };

  return (
    <div
      className='form-component-item'
      data-colspan={component.gridColSpan ?? 12}
    >
      <DevInfo
        label='PermissionUnitRecordLink'
        component={component}
        path={path}
      />
      <Fieldset
        label={component.showLabel ? label : undefined}
        errorMessage={errorMessage}
        info={showTooltips ? component.tooltip : undefined}
        attributes={attributes}
        actionButtonGroup={actionButtonGroup}
      >
        <Controller
          control={control}
          name={path}
          render={({ field: { name, value, onChange } }) => (
            <Combobox
              name={name}
              value={value}
              onChange={(recordId) => onChange(recordId)}
            >
              <ComboboxInput
                aria-invalid={errorMessage !== undefined}
                aria-busy={fetcher.state !== 'idle'}
                placeholder={t(
                  'divaClient_recordLinkAutocompletePlaceholderText',
                  { recordType: label.toLowerCase() },
                )}
                name={recordLinkSearchPresentation.autocompleteSearchTerm.name}
                onChange={handleComboboxInputChange}
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
          )}
        />
      </Fieldset>
    </div>
  );
};
