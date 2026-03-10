import { useTranslation } from 'react-i18next';
import type {
  FormComponentNumVar,
  FormComponentTextVar,
} from '../FormGenerator/types';
import type { DataAtomic } from '@/cora/cora-data/types.server';
import { Attributes } from './Attributes';

interface OutputVariableProps {
  component: FormComponentNumVar | FormComponentTextVar;
  data: DataAtomic;
}

export const OutputVariable = ({ component, data }: OutputVariableProps) => {
  const { t } = useTranslation();
  if (!data.value) {
    return null;
  }
  return (
    <div style={{ marginBottom: '0.5rem' }}>
      {component.showLabel && (
        <div style={{ color: 'var(--color-label)' }}>{t(component.label)}</div>
      )}
      <Attributes component={component} data={data} />

      <div style={component.showLabel ? { paddingLeft: '0.5rem' } : undefined}>
        {data.value}
      </div>
    </div>
  );
};
