import type { PresentationStyle } from '@/cora/bffTypes.server';
import type { DataAtomic } from '@/cora/cora-data/types.server';
import {
  use,
  useEffect,
  useState,
  type HTMLProps,
  type ReactNode,
} from 'react';
import { useTranslation } from 'react-i18next';
import type { FormComponentTextVar } from '../FormGenerator/types';
import { Fieldset } from '../Input/Fieldset';
import { Input } from '../Input/Input';
import { Textarea } from '../Input/Textarea';
import { OutputField } from '../OutputPresentation/OutputField';
import { InputAttributes } from './InputAttributes';
import { ValidationErrorContext } from './InputPresentation';
import type { ValidationError } from './validateFormData';

export interface InputVariableProps {
  component: FormComponentTextVar;
  path: string;
  data?: DataAtomic;
  actionButtonGroup?: ReactNode;
  parentPresentationStyle?: PresentationStyle;
}

export const InputVariable = ({
  component,
  path,
  data,
  actionButtonGroup,
  parentPresentationStyle,
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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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

  if (component.finalValue) {
    return (
      <>
        <input type='hidden' name={path} value={component.finalValue} />
        <OutputField label={t(component.label)} value={component.finalValue} />
      </>
    );
  }

  const inputProps: HTMLProps<HTMLInputElement> &
    HTMLProps<HTMLTextAreaElement> = {
    name: path,
    defaultValue: data?.value,
    'aria-invalid': !!validationError,
    onChange: handleChange,
    onBlur: () => setIsDirty(true),
  };

  return (
    <div
      className='form-component-text-variable form-component-item'
      data-colspan={component.gridColSpan ?? 12}
    >
      <Fieldset
        label={component.showLabel ? t(component.label) : undefined}
        errorMessage={validationError?.message}
        variant={parentPresentationStyle === 'inline' ? 'inline' : 'block'}
        attributes={
          <InputAttributes path={path} component={component} data={data} />
        }
        actionButtonGroup={actionButtonGroup}
        info={component.tooltip}
      >
        {component.inputType === 'textarea' ? (
          <Textarea {...inputProps} />
        ) : (
          <Input type={component.inputFormat ?? 'text'} {...inputProps} />
        )}
      </Fieldset>
    </div>
  );
};
