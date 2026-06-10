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
import {
  type ReactNode,
  use,
  useCallback,
  useEffect,
  useId,
  useRef,
} from 'react';
import { useRemixFormContext } from 'remix-hook-form';

import { DevInfo } from '@/components/FormGenerator/components/DevInfo';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import { getErrorMessageForField } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { Fieldset } from '@/components/Input/Fieldset';
import { OutputPresentation } from '@/components/OutputPresentation/OutputPresentation';
import { transformToRaw } from '@/cora/transform/transformToRaw';
import type { BFFDataRecord } from '@/types/record';
import { assertDefined } from '@/utils/invariant';
import { useMember } from '@/utils/rootLoaderDataUtils';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { href, useFetcher } from 'react-router';
import { Button } from '@/components/Button/Button';
import { ChevronRightCircleIcon, LinkIcon, XIcon } from 'lucide-react';
import styles from './RecordLinkWithSearch.module.css';
import { Input } from '@/components/Input/Input';
import { Alert } from '@/components/Alert/Alert';
import { CircularLoader } from '@/components/Loader/CircularLoader';
import { useDebouncedCallback } from '@/utils/useDebouncedCallback';
import { IconButton } from '@/components/IconButton/IconButton';

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
  const id = useId();
  const { t } = useTranslation();
  const { formState, control } = useRemixFormContext();
  const { showTooltips } = use(FormGeneratorContext);
  const errorMessage = getErrorMessageForField(formState, `${path}.value`);
  const member = useMember();
  const { submit, state, data } = useFetcher({ key: id });
  const dialogRef = useRef<HTMLDialogElement>(null);
  const recordLinkSearchPresentation = component.searchPresentation;
  const label = t(component.label);

  assertDefined(
    recordLinkSearchPresentation,
    'Record link has no search presentation',
  );

  const search = useCallback(
    (searchTerm: string) => {
      const data = {
        [recordLinkSearchPresentation.autocompleteSearchTerm.name]: searchTerm,
      };

      if (
        recordLinkSearchPresentation.permissionUnitLinkedRecordIdSearchTerm &&
        member?.memberPermissionUnit
      ) {
        data[
          recordLinkSearchPresentation.permissionUnitLinkedRecordIdSearchTerm.name
        ] = `permissionUnit_${member?.memberPermissionUnit}`;
      }

      submit(data, {
        method: 'GET',
        action: href('/autocompleteSearch/:searchType', {
          searchType: recordLinkSearchPresentation.searchType,
        }),
      });
    },
    [
      submit,
      member?.memberPermissionUnit,
      recordLinkSearchPresentation.autocompleteSearchTerm.name,
      recordLinkSearchPresentation.permissionUnitLinkedRecordIdSearchTerm,
      recordLinkSearchPresentation.searchType,
    ],
  );

  const handleComboboxInputChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const comboboxInputValue = event.target.value ?? '**';
      search(comboboxInputValue);
    },
    300,
  );

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    const handleBeforeToggle = (event: ToggleEvent) => {
      if (event.newState === 'open') {
        search('**');
      }
    };

    dialog.addEventListener('beforetoggle', handleBeforeToggle);

    return () => {
      dialog.removeEventListener('beforetoggle', handleBeforeToggle);
    };
  }, [search]);

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
          render={({ field: { onChange } }) => (
            <>
              <Button variant='secondary' command='show-modal' commandfor={id}>
                Länka {label.toLowerCase()} <LinkIcon />
              </Button>
              <dialog
                id={id}
                ref={dialogRef}
                closedby='any'
                className={styles.dialog}
              >
                <div className={styles['dialog-header']}>
                  <h2>Länka {label.toLowerCase()}</h2>
                  <IconButton command='close' commandfor={id} tooltip='Close'>
                    <XIcon />
                  </IconButton>
                </div>
                <Fieldset
                  label={`Sök efter ${label.toLowerCase()}`}
                  className={styles['dialog-search']}
                >
                  <Input
                    autoFocus
                    type='text'
                    onChange={handleComboboxInputChange}
                  />
                </Fieldset>
                {state === 'idle' && data && data.result.length === 0 && (
                  <Alert severity='info'>
                    {t('divaClient_recordLinkAutocompleteNoResultsText')}
                  </Alert>
                )}
                {state === 'loading' && (
                  <div>
                    {t('divaClient_recordLinkAutocompleteSearchingText')}{' '}
                    <CircularLoader />
                  </div>
                )}
                <ul>
                  {state === 'idle' &&
                    data &&
                    data.result.map((result: BFFDataRecord) => (
                      <li key={result.id}>
                        <div key={result.id} className={styles['result']}>
                          <OutputPresentation
                            data={transformToRaw(result.data)}
                            formSchema={result.presentation!}
                            compact
                          />
                          <Button
                            variant='secondary'
                            onClick={() => {
                              onChange({
                                linkedRecordType: component.recordLinkType,
                                value: result.id,
                              });
                            }}
                          >
                            Välj <ChevronRightCircleIcon />
                          </Button>
                        </div>
                      </li>
                    ))}
                </ul>
              </dialog>
            </>
          )}
        />
      </Fieldset>
    </div>
  );
};
