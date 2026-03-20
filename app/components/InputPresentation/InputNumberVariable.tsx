import type { DataAtomic } from '@/cora/cora-data/types.server';
import { useTranslation } from 'react-i18next';
import type { FormComponentNumVar } from '../FormGenerator/types';
import { Fieldset } from '../Input/Fieldset';
import { Input } from '../Input/Input';
import { InputAttributes } from './InputAttributes';

interface InputNumberVariableProps {
  component: FormComponentNumVar;
  path: string;
  data?: DataAtomic;
}

export const InputNumberVariable = ({
  component,
  path,
  data,
}: InputNumberVariableProps) => {
  const { t } = useTranslation();

  return (
    <div
      className='form-component-number-variable form-component-item'
      data-colspan={component.gridColSpan ?? 12}
    >
      <InputAttributes path={path} component={component} />
      <Fieldset label={component.showLabel ? t(component.label) : undefined}>
        <Input
          type='text'
          inputMode='numeric'
          name={path}
          defaultValue={data?.value}
        />
      </Fieldset>
    </div>
  );
};
