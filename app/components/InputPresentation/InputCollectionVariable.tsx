import type { DataAtomic } from '@/cora/cora-data/types.server';
import { useTranslation } from 'react-i18next';
import type { FormComponentCollVar } from '../FormGenerator/types';
import { Fieldset } from '../Input/Fieldset';
import { Select } from '../Input/Select';
import { InputAttributes } from './InputAttributes';
import { ValidationErrorContext } from './InputPresentation';
import { use, type ReactNode } from 'react';
import type { PresentationStyle } from '@/cora/bffTypes.server';
import { OutputField } from '../OutputPresentation/OutputField';

interface InputCollectionVariableProps {
  component: FormComponentCollVar;
  path: string;
  data?: DataAtomic;
  actionButtonGroup?: ReactNode;
  parentPresentationStyle?: PresentationStyle;
}

export const InputCollectionVariable = ({
  component,
  path,
  data,
  actionButtonGroup,
  parentPresentationStyle,
}: InputCollectionVariableProps) => {
  const { t } = useTranslation();
  const serverValidationError = use(ValidationErrorContext)[path];

  if (component.finalValue) {
    return (
      <>
        <input type='hidden' name={path} value={component.finalValue} />
        <OutputField
          label={t(component.label)}
          value={t(
            component.options.find(
              (option) => option.value === component.finalValue,
            )?.label ?? component.finalValue,
          )}
        />
      </>
    );
  }

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
        actionButtonGroup={actionButtonGroup}
        info={component.tooltip}
        variant={parentPresentationStyle === 'inline' ? 'inline' : 'block'}
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
