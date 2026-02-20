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
import { type ReactNode, use, useEffect, useState } from 'react';
import { useRemixFormContext } from 'remix-hook-form';

import { DevInfo } from '@/components/FormGenerator/components/DevInfo';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import { getErrorMessageForField } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import inputStyles from '@/components/Input/Input.module.css';
import comboboxStyles from '@/components/Input/Combobox.module.css';
import { Fieldset } from '@/components/Input/Fieldset';
import { CircularLoader } from '@/components/Loader/CircularLoader';
import { useLanguage } from '@/i18n/useLanguage';
import type { BFFDataRecord } from '@/types/record';
import { getRecordTitle } from '@/utils/getRecordTitle';
import { assertDefined } from '@/utils/invariant';
import { useMember } from '@/utils/rootLoaderDataUtils';
import { Combobox } from '@base-ui/react/combobox';
import {
  CheckIcon,
  ChevronDownIcon,
  SearchSlashIcon,
  TextSearchIcon,
  XIcon,
} from 'lucide-react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { href, useFetcher } from 'react-router';
import { useDebouncedCallback } from '@/utils/useDebouncedCallback';
import { AutocompleteForm } from '@/components/Form/AutocompleteForm';
interface RecordLinkWithSearchProps {
  component: FormComponentRecordLink;
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
  const language = useLanguage();
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
            <RecordLinkCombobox
              component={component}
              name={name}
              value={value}
              onChange={onChange}
            />
            // <Combobox
            //   name={name}
            //   value={value}
            //   onChange={(recordId) => onChange(recordId)}
            // >
            //   <ComboboxInput
            //     aria-invalid={errorMessage !== undefined}
            //     aria-busy={fetcher.state !== 'idle'}
            //     placeholder={t(
            //       'divaClient_recordLinkAutocompletePlaceholderText',
            //       { recordType: label.toLowerCase() },
            //     )}
            //     name={recordLinkSearchPresentation.autocompleteSearchTerm.name}
            //     onChange={handleComboboxInputChange}
            //   />
            //   <ComboboxOptions anchor='bottom'>
            //     {fetcher.state === 'idle' &&
            //       fetcher.data &&
            //       fetcher.data.result.map((result: BFFDataRecord) => (
            //         <ComboboxOption key={result.id} value={result.id}>
            //           <AutocompleteForm
            //             record={result}
            //             formSchema={result.presentation!}
            //           />
            //         </ComboboxOption>
            //       ))}
            //     {fetcher.state === 'idle' &&
            //       fetcher.data &&
            //       fetcher.data.result.length === 0 && (
            //         <ComboboxOption disabled value=''>
            //           {t('divaClient_recordLinkAutocompleteNoResultsText')}
            //         </ComboboxOption>
            //       )}
            //     {fetcher.state === 'loading' && (
            //       <ComboboxOption disabled value=''>
            //         {t('divaClient_recordLinkAutocompleteSearchingText')}
            //       </ComboboxOption>
            //     )}
            //   </ComboboxOptions>
            // </Combobox>
          )}
        />
      </Fieldset>
    </div>
  );
};

interface RecordLinkComboboxProps {
  component: FormComponentRecordLink;
  value: string | null;
  onChange: (value: string | null) => void;
}

const RecordLinkCombobox = ({
  component,
  value,
  onChange,
}: RecordLinkComboboxProps) => {
  const { t } = useTranslation();
  const { load: loadCurrentValue, data: currentValueData } = useFetcher();
  const searchResultsFetcher = useFetcher();
  const [searchValue, setSearchValue] = useState('');
  const language = useLanguage();
  const searchResults = searchResultsFetcher.data?.result || [];
  const isPending = searchResultsFetcher.state === 'loading';
  useEffect(() => {
    if (value) {
      loadCurrentValue(
        href('/:recordType/:recordId', {
          recordType: component.recordLinkType!,
          recordId: value,
        }),
      );
    }
  }, [value, component.recordLinkType, loadCurrentValue]);

  const search = useDebouncedCallback((query: string) => {
    searchResultsFetcher.submit(
      {
        [component.searchPresentation!.autocompleteSearchTerm.name]: query,
      },
      {
        method: 'GET',
        action: href('/autocompleteSearch/:searchType', {
          searchType: component.searchPresentation!.searchType,
        }),
      },
    );
  }, 300);

  return (
    <div>
      <Combobox.Root
        items={searchResults}
        itemToStringLabel={(record: BFFDataRecord) =>
          getRecordTitle(record, language) ?? record.id
        }
        onInputValueChange={(newValue, { reason }) => {
          setSearchValue(newValue);
          if (reason === 'item-press') {
            return;
          }
          search(newValue);
        }}
        onValueChange={(nextSelectedValue) => {
          onChange(nextSelectedValue?.id || null);
        }}
        onOpenChange={(open) => {
          if (open) {
            search('**');
          }
        }}
        value={currentValueData?.record ?? { id: value }}
      >
        <div className={comboboxStyles['combobox-input-wrapper']}>
          <Combobox.Input
            className={inputStyles['combobox-input']}
            placeholder={t('divaClient_recordLinkAutocompletePlaceholderText', {
              recordType: component.label.toLowerCase(),
            })}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                const firstResult = searchResults[0];
                if (firstResult) {
                  onChange(firstResult.id);
                }
              }
            }}
          />
          <div className={comboboxStyles['combobox-input-icons']}>
            <Combobox.Trigger aria-label='Open popup'>
              <TextSearchIcon />
            </Combobox.Trigger>
          </div>
        </div>

        <Combobox.Portal>
          <Combobox.Positioner>
            <Combobox.Popup
              aria-busy={isPending || undefined}
              className={comboboxStyles['combobox-popup']}
            >
              <Combobox.Empty>
                {searchResultsFetcher.state === 'idle' &&
                  searchResults.length === 0 && (
                    <div className={comboboxStyles['status']}>
                      <SearchSlashIcon />
                      {t('divaClient_recordLinkAutocompleteNoResultsText')}
                    </div>
                  )}
              </Combobox.Empty>
              <Combobox.List>
                {(record: BFFDataRecord) => (
                  <Combobox.Item
                    key={record.id}
                    value={record}
                    className={comboboxStyles['combobox-option']}
                  >
                    <Combobox.ItemIndicator>
                      <CheckIcon />
                    </Combobox.ItemIndicator>
                    <AutocompleteForm
                      record={record}
                      formSchema={record.presentation!}
                    />
                  </Combobox.Item>
                )}
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
    </div>
  );
};
