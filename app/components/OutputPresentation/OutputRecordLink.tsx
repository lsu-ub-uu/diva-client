import type { RecordLink } from '@/cora/cora-data/types.server';
import type { FormComponentRecordLink } from '../FormGenerator/types';
import { useTranslation } from 'react-i18next';
import { href, Link } from 'react-router';

interface OutputRecordLinkProps {
  component: FormComponentRecordLink;
  data: RecordLink;
}

export const OutputRecordLink = ({
  component,
  data,
}: OutputRecordLinkProps) => {
  const { t } = useTranslation();
  if (!data.value) {
    return null;
  }
  return (
    <div style={{ marginBottom: '0.5rem' }}>
      {component.showLabel && (
        <div style={{ color: 'var(--color-label)' }}>{t(component.label)}</div>
      )}
      <div style={component.showLabel ? { paddingLeft: '0.5rem' } : undefined}>
        <Link
          to={href('/:recordType/:recordId', {
            recordType: data.linkedRecordType,
            recordId: data.value,
          })}
        >
          {data.linkedRecordType} / {data.value}
        </Link>
      </div>
    </div>
  );
};
