import type { DataAtomic } from '@/cora/cora-data/types.server';
import { useTranslation } from 'react-i18next';
import type { FormComponentNumVar } from '../FormGenerator/types';
import { Fieldset } from '../Input/Fieldset';
import { Input } from '../Input/Input';
import { InputAttributes } from './InputAttributes';
import type { PresentationStyle } from '@/cora/bffTypes.server';

interface InputNumberVariableProps {
  component: FormComponentNumVar;
  path: string;
  data?: DataAtomic;
  actionButtonGroup?: React.ReactNode;
  parentPresentationStyle?: PresentationStyle;
}

export const InputNumberVariable = ({
  component,
  path,
  data,
  actionButtonGroup,
  parentPresentationStyle,
}: InputNumberVariableProps) => {
  const { t } = useTranslation();

  return (
    <div
      className='form-component-number-variable form-component-item'
      data-colspan={component.gridColSpan ?? 12}
    >
      <Fieldset
        label={component.showLabel ? t(component.label) : undefined}
        attributes={
          <InputAttributes path={path} component={component} data={data} />
        }
        actionButtonGroup={actionButtonGroup}
        info={component.tooltip}
        variant={parentPresentationStyle === 'inline' ? 'inline' : 'block'}
      >
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
