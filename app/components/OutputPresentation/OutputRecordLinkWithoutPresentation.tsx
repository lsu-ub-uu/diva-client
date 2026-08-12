import { href, Link } from 'react-router';

interface OutputRecordLinkWithoutPresentationProps {
  linkedRecordType: string;
  linkedRecordId: string;
  hasReadAccess: boolean;
}

export const OutputRecordLinkWithoutPresentation = ({
  linkedRecordType,
  linkedRecordId,
  hasReadAccess,
}: OutputRecordLinkWithoutPresentationProps) => {
  if (!hasReadAccess) {
    return (
      <span>
        {linkedRecordType}/{linkedRecordId}
      </span>
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
