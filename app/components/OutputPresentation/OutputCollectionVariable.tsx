import { useTranslation } from 'react-i18next';
import type { FormComponentCollVar } from '../FormGenerator/types';
import type { DataAtomic } from '@/cora/cora-data/types.server';

interface OutputCollectionVariableProps {
  component: FormComponentCollVar;
  data: DataAtomic;
}

export const OutputCollectionVariable = ({
  component,
  data,
}: OutputCollectionVariableProps) => {
  const { t } = useTranslation();
  if (!data.value) {
    return null;
  }

  const optionText =
    component.options.find((option) => option.value === data.value)?.label ||
    data.value;

  return (
    <div style={{ marginBottom: '0.5rem' }}>
      {component.showLabel && (
        <div style={{ color: 'var(--color-label)' }}>{t(component.label)}</div>
      )}
      <div style={component.showLabel ? { paddingLeft: '0.5rem' } : undefined}>
        {t(optionText)}
      </div>
    </div>
  );
};
