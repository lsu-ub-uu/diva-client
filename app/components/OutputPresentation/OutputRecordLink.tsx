import type { DataRecordLink } from '@/cora/cora-data/types.server';
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
import { OutputRecordLinkWithoutPresentation } from './OutputRecordLinkWithoutPresentation';

interface OutputRecordLinkProps {
  component: FormComponentRecordLink | FormComponentAnyTypeRecordLink;
  data: DataRecordLink;
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
      colspan={component.gridColSpan}
      value={
        <RecordLinkValue
          component={component}
          linkedRecordType={linkedRecordType}
          linkedRecordId={linkedRecordId}
          hasReadAccess={data.actionLinks?.read !== undefined}
        />
      }
    />
  );
};

interface RecordLinkValueProps {
  component: FormComponentRecordLink | FormComponentAnyTypeRecordLink;
  linkedRecordType: string;
  linkedRecordId: string;
  hasReadAccess: boolean;
}
const RecordLinkValue = ({
  component,
  linkedRecordType,
  linkedRecordId,
  hasReadAccess,
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
        hasReadAccess={hasReadAccess}
      />
    );
  }

  return (
    <OutputRecordLinkWithoutPresentation
      linkedRecordType={linkedRecordType}
      linkedRecordId={linkedRecordId}
      hasReadAccess={hasReadAccess}
    />
  );
};
