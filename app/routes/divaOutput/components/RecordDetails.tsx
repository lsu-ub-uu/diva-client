import { CollapsableText } from '@/components/CollapsableText/CollapsableText';
import type { DivaOutputGroup } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import {
  CheckCircleIcon,
  ChevronDownIcon,
  InfoIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import { href, Link } from 'react-router';
import { Term } from './Term';
import { useTranslation } from 'react-i18next';

interface RecordDetailsProps {
  output: DivaOutputGroup;
}

export const RecordDetails = ({ output }: RecordDetailsProps) => {
  const language = useLanguage();
  const { t } = useTranslation();
  return (
    <details className='record-details'>
      <summary>
        <ChevronDownIcon className='expand-chevron' />
        <h2>{t('divaClient_recordDetailsText')}</h2>
        <InfoIcon />
      </summary>
      <dl>
        <Term
          label={t('divaClient_createdText')}
          value={
            <TimestampAndUser
              timestamp={output.recordInfo.tsCreated?.value}
              userId={output.recordInfo.createdBy?.value}
            />
          }
        />
        <Term
          label={t('divaClient_updatedText')}
          value={
            <TimestampAndUser
              timestamp={output.recordInfo.updated?.at(-1)?.tsUpdated?.value}
              userId={output.recordInfo.updated?.at(-1)?.updatedBy?.value}
            />
          }
        />
        <Term
          label={output.recordInfo?.visibility?.__text?.[language]}
          value={
            <span>
              {output.recordInfo?.visibility?.__valueText?.[language]} (
              {formatTimestamp(output.recordInfo.tsVisibility?.value)})
            </span>
          }
        />
        <Term
          label={t('divaClient_memberText')}
          value={output.recordInfo?.permissionUnit?.value}
        />

        <Term
          label={output.note_type_external?.__text?.[language]}
          value={
            output.note_type_external?.value && (
              <CollapsableText text={output.note_type_external?.value} />
            )
          }
        />
        <Term
          label={output.dataQuality?.__text?.[language]}
          value={
            <span className='icon-text'>
              {getDataQualityIcon(output.dataQuality?.value)}{' '}
              {output.dataQuality?.__valueText?.[language]}
            </span>
          }
        />
        <Term
          label={output.adminInfo?.note_type_internal?.__text?.[language]}
          value={output.adminInfo?.note_type_internal?.value}
        />

        <Term
          label={output.adminInfo?.failed?.__text?.[language]}
          value={output.adminInfo?.failed?.__valueText?.[language]}
        />
        <Term
          label={output.adminInfo?.reviewed?.__text?.[language]}
          value={output.adminInfo?.reviewed?.__valueText?.[language]}
        />
      </dl>
    </details>
  );
};

const TimestampAndUser = ({
  timestamp,
  userId,
}: {
  timestamp?: string;
  userId?: string;
}) => {
  if (!timestamp && !userId) {
    return null;
  }
  return (
    <span>
      {userId && (
        <Link
          to={href('/:recordType/:recordId', {
            recordType: 'user',
            recordId: userId,
          })}
        >
          {userId}
        </Link>
      )}
      {timestamp && <> ({formatTimestamp(timestamp)})</>}
    </span>
  );
};

const formatTimestamp = (timestamp?: string) => {
  if (!timestamp) {
    return undefined;
  }
  const date = new Date(timestamp);
  return date.toLocaleString();
};

const getDataQualityIcon = (dataQuality?: string) => {
  switch (dataQuality) {
    case '2026':
      return <CheckCircleIcon color='var(--color-success-main)' />;
    case 'classic':
      return <TriangleAlertIcon color='var(--color-error-main)' />;
    default:
      return null;
  }
};
