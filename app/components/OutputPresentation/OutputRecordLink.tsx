import type { RecordLink } from '@/cora/cora-data/types.server';
import { useTranslation } from 'react-i18next';
import { href, Link } from 'react-router';
import type {
  FormComponentAnyTypeRecordLink,
  FormComponentRecordLink,
} from '../FormGenerator/types';
import { Attributes } from './Attributes';
import { OutputField } from './OutputField';
import { OutputRecordLinkWithPresentation } from './OutputRecordLinkWithPresentation';
import type { PresentationStyle } from '@/cora/bffTypes.server';

interface OutputRecordLinkProps {
  component: FormComponentRecordLink | FormComponentAnyTypeRecordLink;
  data: RecordLink;
  parentPresentationStyle?: PresentationStyle;
}

export const OutputRecordLink = ({
  component,
  data,
  parentPresentationStyle,
}: OutputRecordLinkProps) => {
  const { t } = useTranslation();

  const linkedRecordType = data.children?.find(
    (child) => child.name === 'linkedRecordType',
  )?.value;
  const linkedRecordId = data.children?.find(
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
        <RecordLinkValue
          component={component}
          linkedRecordType={linkedRecordType}
          linkedRecordId={linkedRecordId}
        />
      }
    />
  );
};

interface RecordLinkValueProps {
  component: FormComponentRecordLink | FormComponentAnyTypeRecordLink;
  linkedRecordType: string;
  linkedRecordId: string;
}
const RecordLinkValue = ({
  component,
  linkedRecordType,
  linkedRecordId,
}: RecordLinkValueProps) => {
  const { t } = useTranslation();

  if (component.presentAs === 'onlyTranslatedText') {
    return t(linkedRecordId);
  }

  if (component.linkedRecordPresentation) {
    return (
      <OutputRecordLinkWithPresentation
        linkedRecordType={linkedRecordType}
        linkedRecordId={linkedRecordId}
        presentationRecordLinkId={
          component.linkedRecordPresentation.presentationId
        }
      />
    );
  }

  return (
    <Link
      to={href('/:recordType/:recordId', {
        recordType: linkedRecordType,
        recordId: linkedRecordId,
      })}
    >
      {linkedRecordType}/{linkedRecordId}
    </Link>
  );
};
