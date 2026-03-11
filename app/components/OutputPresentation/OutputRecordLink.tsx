import type { RecordLink } from '@/cora/cora-data/types.server';
import type {
  FormComponentRecordLink,
  PresentationStyle,
} from '../FormGenerator/types';
import { useTranslation } from 'react-i18next';
import { href, Link } from 'react-router';
import { OutputField } from './OutputField';
import { Attributes } from './Attributes';

interface OutputRecordLinkProps {
  component: FormComponentRecordLink;
  data: RecordLink;
  parentPresentationStyle?: PresentationStyle;
}

export const OutputRecordLink = ({
  component,
  data,
  parentPresentationStyle,
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
    <OutputField
      label={component.showLabel ? t(component.label) : undefined}
      attributes={<Attributes component={component} data={data} />}
      variant={parentPresentationStyle === 'inline' ? 'inline' : 'block'}
      value={
        <Link
          to={href('/:recordType/:recordId', {
            recordType: linkedRecordType,
            recordId: linkedRecordId,
          })}
        >
          {linkedRecordType}/{linkedRecordId}
        </Link>
      }
    />
  );
};
