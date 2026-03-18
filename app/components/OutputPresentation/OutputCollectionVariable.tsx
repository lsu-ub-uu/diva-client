import type { DataAtomic } from '@/cora/cora-data/types.server';
import { useTranslation } from 'react-i18next';
import type { FormComponentCollVar } from '../FormGenerator/types';
import { Attributes } from './Attributes';
import { OutputField } from './OutputField';
import type { PresentationStyle } from '@/cora/bffTypes.server';

interface OutputCollectionVariableProps {
  component: FormComponentCollVar;
  data: DataAtomic;
  parentPresentationStyle?: PresentationStyle;
}

export const OutputCollectionVariable = ({
  component,
  data,
  parentPresentationStyle,
}: OutputCollectionVariableProps) => {
  const { t } = useTranslation();
  if (!data.value) {
    return null;
  }

  const optionText =
    component.options.find((option) => option.value === data.value)?.label ||
    data.value;

  return (
    <OutputField
      label={component.showLabel ? t(component.label) : undefined}
      attributes={<Attributes component={component} data={data} />}
      value={t(optionText)}
      variant={parentPresentationStyle === 'inline' ? 'inline' : 'block'}
      colspan={component.gridColSpan}
    />
  );
};
