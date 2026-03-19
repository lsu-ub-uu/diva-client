import { useTranslation } from 'react-i18next';
import type { FormComponentTextVar } from '../FormGenerator/types';
import { Fieldset } from '../Input/Fieldset';
import { Input } from '../Input/Input';
import { InputAttributes } from './InputAttributes';

export interface InputVariableProps {
  component: FormComponentTextVar;
  path: string;
}

export const InputVariable = ({ component, path }: InputVariableProps) => {
  const { t } = useTranslation();

  return (
    <div
      className='form-component-text-variable form-component-item'
      data-colspan={component.gridColSpan ?? 12}
    >
      <InputAttributes path={path} component={component} />
      <Fieldset label={component.showLabel ? t(component.label) : undefined}>
        <Input type='text' name={`${path}`} />
      </Fieldset>
    </div>
  );
};
