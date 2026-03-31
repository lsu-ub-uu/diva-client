import type { DataAtomic } from '@/cora/cora-data/types.server';
import { useTranslation } from 'react-i18next';
import type { FormComponentCollVar } from '../FormGenerator/types';
import { Fieldset } from '../Input/Fieldset';
import { Select } from '../Input/Select';
import { InputAttributes } from './InputAttributes';
import { ValidationErrorContext } from './InputPresentation';
import { use } from 'react';

interface InputCollectionVariableProps {
  component: FormComponentCollVar;
  path: string;
  data?: DataAtomic;
}

export const InputCollectionVariable = ({
  component,
  path,
  data,
}: InputCollectionVariableProps) => {
  const { t } = useTranslation();
  const serverValidationError = use(ValidationErrorContext)[path];

  return (
    <div
      className='form-component-collection-variable form-component-item'
      data-colspan={component.gridColSpan ?? 12}
    >
      <Fieldset
        label={component.showLabel ? t(component.label) : undefined}
        errorMessage={serverValidationError?.message}
        attributes={
          <InputAttributes path={path} data={data} component={component} />
        }
      >
        <Select
          name={path}
          defaultValue={data?.value}
          aria-invalid={!!serverValidationError}
        >
          <option value=''>{t('initialEmptyValueText')}</option>
          {component.options.map((option) => (
            <option key={option.value} value={option.value}>
              {t(option.label)}
            </option>
          ))}
        </Select>
      </Fieldset>
    </div>
  );
};
