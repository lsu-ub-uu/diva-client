import type { DataRecordLink } from '@/cora/cora-data/types.server';
import { transformToRaw } from '@/cora/transform/transformToRaw';
import type { BFFDataRecord } from '@/types/record';
import { useMember } from '@/utils/rootLoaderDataUtils';
import { useTranslation } from 'react-i18next';
import { href, useFetcher } from 'react-router';
import type { FormComponentRecordLink } from '../FormGenerator/types';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '../Input/Combobox';
import { Fieldset } from '../Input/Fieldset';
import { OutputPresentation } from '../OutputPresentation/OutputPresentation';
import { InputAttributes } from './InputAttributes';
import type { ReactNode } from 'react';
import type { PresentationStyle } from '@/cora/bffTypes.server';

interface InputRecordLinkProps {
  path: string;
  component: FormComponentRecordLink;
  data?: DataRecordLink;
  actionButtonGroup?: ReactNode;
  parentPresentationStyle?: PresentationStyle;
}

export const InputRecordLink = ({
  path,
  component,
  data,
  actionButtonGroup,
  parentPresentationStyle,
}: InputRecordLinkProps) => {
  const fetcher = useFetcher();
  const member = useMember();
  const { t } = useTranslation();
  const linkedRecordId = data?.children?.find(
    (child) => child.name === 'linkedRecordId',
  )?.value;
  const recordLinkSearchPresentation = component.searchPresentation;

  if (!recordLinkSearchPresentation) {
    return <div>Record link component is missing search presentation</div>;
  }

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
      <input
        type='hidden'
        name={`${path}.linkedRecordType`}
        value={component.recordLinkType}
      />
      <Fieldset
        label={component.showLabel ? t(component.label) : undefined}
        attributes={
          <InputAttributes path={path} component={component} data={data} />
        }
        actionButtonGroup={actionButtonGroup}
        info={component.tooltip}
        variant={parentPresentationStyle === 'inline' ? 'inline' : 'block'}
      >
        <Combobox name={`${path}.linkedRecordId`} defaultValue={linkedRecordId}>
          <ComboboxInput onChange={handleComboboxInputChange} />
          <ComboboxOptions anchor='bottom'>
            {fetcher.state === 'idle' &&
              fetcher.data &&
              fetcher.data.result.map((result: BFFDataRecord) => (
                <ComboboxOption key={result.id} value={result.id}>
                  <OutputPresentation
                    data={transformToRaw(result.data)}
                    formSchema={result.presentation!}
                    compact
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
