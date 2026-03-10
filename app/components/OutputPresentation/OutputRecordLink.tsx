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
  const linkedRecordType = data.children.find(
    (child) => child.name === 'linkedRecordType',
  )?.value;
  const linkedRecordId = data.children.find(
    (child) => child.name === 'linkedRecordId',
  )?.value;
  if (!linkedRecordType || !linkedRecordId) {
    return null;
  }
  return (
    <div style={{ marginBottom: '0.5rem' }}>
      {component.showLabel && (
        <div style={{ color: 'var(--color-label)' }}>{t(component.label)}</div>
      )}
      {component.attributes?.map((attribute) => (
        <div key={attribute.name} style={{ fontStyle: 'italic' }}>
          {t(attribute.label)}:{' '}
          {t(
            attribute.options?.find(
              (opt) => opt.value === data.attributes?.[attribute.name],
            )?.label || '',
          )}
        </div>
      ))}
      <div style={component.showLabel ? { paddingLeft: '0.5rem' } : undefined}>
        <Link
          to={href('/:recordType/:recordId', {
            recordType: linkedRecordType,
            recordId: linkedRecordId,
          })}
        >
          {linkedRecordType}/{linkedRecordId}
        </Link>
      </div>
    </div>
  );
};
