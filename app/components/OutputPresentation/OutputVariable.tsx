import { useTranslation } from 'react-i18next';
import type {
  FormComponentNumVar,
  FormComponentTextVar,
} from '../FormGenerator/types';
import type { DataAtomic } from '@/cora/cora-data/types.server';
import { Attributes } from './Attributes';
import { OutputField } from './OutputField';
import type { PresentationStyle } from '@/cora/bffTypes.server';

interface OutputVariableProps {
  component: FormComponentNumVar | FormComponentTextVar;
  data: DataAtomic;
  parentPresentationStyle?: PresentationStyle;
}

export const OutputVariable = ({
  component,
  data,
  parentPresentationStyle,
}: OutputVariableProps) => {
  const { t } = useTranslation();
  if (!data.value) {
    return null;
  }

  return (
    <OutputField
      label={component.showLabel ? t(component.label) : undefined}
      attributes={<Attributes component={component} data={data} />}
      value={data.value}
      variant={parentPresentationStyle === 'inline' ? 'inline' : 'block'}
    />
  );
};
