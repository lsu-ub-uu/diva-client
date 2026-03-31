import { useTranslation } from 'react-i18next';
import type { FormComponentTextVar } from '../FormGenerator/types';
import { Fieldset } from '../Input/Fieldset';
import { Input } from '../Input/Input';
import { InputAttributes } from './InputAttributes';
import type { DataAtomic } from '@/cora/cora-data/types.server';
import { use, useEffect, useState } from 'react';
import { ValidationErrorContext } from './InputPresentation';
import type { ValidationError } from './validateFormData';

export interface InputVariableProps {
  component: FormComponentTextVar;
  path: string;
  data?: DataAtomic;
}

export const InputVariable = ({
  component,
  path,
  data,
}: InputVariableProps) => {
  const { t } = useTranslation();
  const [isDirty, setIsDirty] = useState(false);
  const serverValidationError = use(ValidationErrorContext)[path];
  const [clientValidationError, setClientValidationError] = useState<
    ValidationError | null | undefined
  >(serverValidationError);

  useEffect(() => {
    setClientValidationError(serverValidationError);
  }, [serverValidationError]);

  const validationError =
    isDirty && clientValidationError !== undefined
      ? clientValidationError
      : serverValidationError;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (component.validation?.pattern) {
      if (
        event.target.value &&
        !new RegExp(component.validation.pattern).test(event.target.value)
      ) {
        setClientValidationError({
          message: t('divaClient_fieldInvalidFormatText'),
          label: t(component.label),
          type: 'invalidFormat',
        });
      } else {
        setClientValidationError(null);
      }
    }
  };

  return (
    <div
      className='form-component-text-variable form-component-item'
      data-colspan={component.gridColSpan ?? 12}
    >
      <Fieldset
        label={component.showLabel ? t(component.label) : undefined}
        errorMessage={validationError?.message}
        attributes={
          <InputAttributes path={path} component={component} data={data} />
        }
      >
        <Input
          type='text'
          name={path}
          defaultValue={data?.value}
          aria-invalid={!!validationError}
          onChange={handleChange}
          onBlur={() => setIsDirty(true)}
        />
      </Fieldset>
    </div>
  );
};
