import type { DataAtomic } from '@/cora/cora-data/types.server';
import { useTranslation } from 'react-i18next';
import type { FormComponentCollVar } from '../FormGenerator/types';
import { Fieldset } from '../Input/Fieldset';
import { Select } from '../Input/Select';
import { InputAttributes } from './InputAttributes';

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

  return (
    <div
      className='form-component-collection-variable form-component-item'
      data-colspan={component.gridColSpan ?? 12}
    >
      <InputAttributes path={path} component={component} />
      <Fieldset label={component.showLabel ? t(component.label) : undefined}>
        <Select name={path} defaultValue={data?.value}>
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
