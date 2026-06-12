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
import { type ReactNode, use, useCallback, useId, useRef } from 'react';
import { useRemixFormContext } from 'remix-hook-form';

import { Alert } from '@/components/Alert/Alert';
import { Button } from '@/components/Button/Button';
import { DevInfo } from '@/components/FormGenerator/components/DevInfo';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import { getErrorMessageForField } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { IconButton } from '@/components/IconButton/IconButton';
import { Fieldset } from '@/components/Input/Fieldset';
import { Input } from '@/components/Input/Input';
import { CircularLoader } from '@/components/Loader/CircularLoader';
import { OutputPresentation } from '@/components/OutputPresentation/OutputPresentation';
import { transformToRaw } from '@/cora/transform/transformToRaw';
import type { BFFDataRecord } from '@/types/record';
import { assertDefined } from '@/utils/invariant';
import { useMember } from '@/utils/rootLoaderDataUtils';
import { useDebouncedCallback } from '@/utils/useDebouncedCallback';
import {
  ChevronRightCircleIcon,
  FilePlusIcon,
  LinkIcon,
  SearchIcon,
  XIcon,
} from 'lucide-react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { href, Link, useFetcher } from 'react-router';
import styles from './RecordLinkWithSearch.module.css';
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
  const dialogSearchInputRef = useRef<HTMLInputElement>(null);
  const recordLinkSearchPresentation = component.searchPresentation;
  const label = t(component.label);
  const recordTypeTempLabel = label.toLowerCase().replace('diva-', '');

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
      const comboboxInputValue = event.target.value || '';
      search(`*${comboboxInputValue}*`);
    },
    300,
  );

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
              <button
                className={styles['record-link-button']}
                type='button'
                // @ts-expect-error command and commandFor are not yet in @types/react
                // eslint-disable-next-line react/no-unknown-property
                command='show-modal'
                // eslint-disable-next-line react/no-unknown-property
                commandFor={id}
              >
                Länka {recordTypeTempLabel} <LinkIcon />
              </button>
              <dialog
                id={id}
                ref={dialogRef}
                closedby='any'
                className={styles.dialog}
                onBeforeToggle={(event) => {
                  if (event.newState === 'open') {
                    search('**');
                  }
                }}
                onToggle={(event) => {
                  if (event.newState === 'open') {
                    dialogSearchInputRef.current?.focus();
                  }
                }}
              >
                <div className={styles['dialog-header']}>
                  <h2>Länka {recordTypeTempLabel}</h2>
                  <IconButton command='close' commandFor={id} tooltip='Close'>
                    <XIcon />
                  </IconButton>
                </div>
                <div className={styles['dialog-body']}>
                  <Fieldset
                    label={`Sök efter ${recordTypeTempLabel} att länka`}
                    className={styles['dialog-search']}
                  >
                    <div className={styles['search-input-wrapper']}>
                      <Input
                        ref={dialogSearchInputRef}
                        type='search'
                        onChange={handleComboboxInputChange}
                      />
                      <div className={styles['search-icon']}>
                        {state === 'loading' ? (
                          <CircularLoader />
                        ) : (
                          <SearchIcon />
                        )}
                      </div>
                    </div>
                  </Fieldset>
                  {state === 'idle' && data && data.result.length === 0 && (
                    <Alert
                      severity='info'
                      action={
                        component.recordLinkType && (
                          <Button
                            variant='secondary'
                            as={Link}
                            to={href('/:recordType/create', {
                              recordType: component.recordLinkType,
                            })}
                            target='_blank'
                          >
                            <FilePlusIcon /> Skapa ny {recordTypeTempLabel}
                          </Button>
                        )
                      }
                    >
                      Vi hittade inga {recordTypeTempLabel} som matchade din
                      sökning.
                    </Alert>
                  )}
                  <ul
                    aria-busy={state === 'loading'}
                    className={styles['search-results']}
                  >
                    {data &&
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
                </div>
              </dialog>
            </>
          )}
        />
      </Fieldset>
    </div>
  );
};
