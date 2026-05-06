import { CollapsableText } from '@/components/CollapsableText/CollapsableText';
import type { DivaOutputGroup } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import {
  CheckCircleIcon,
  ChevronDownIcon,
  FileExclamationPointIcon,
  InfoIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatTimestamp } from '../utils/format';
import { Term } from './Term';
import { useUser } from '@/utils/rootLoaderDataUtils';

interface RecordDetailsProps {
  output: DivaOutputGroup;
}

export const RecordDetails = ({ output }: RecordDetailsProps) => {
  const language = useLanguage();
  const { t } = useTranslation();
  const user = useUser();
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
          value={<Timestamp timestamp={output.recordInfo.tsCreated?.value} />}
        />
        <Term
          label={t('divaClient_updatedText')}
          value={
            <Timestamp
              timestamp={output.recordInfo.updated?.at(-1)?.tsUpdated?.value}
            />
          }
        />
        <Term
          label={output.recordInfo?.visibility?.__text?.[language]}
          value={
            <span>
              {output.recordInfo?.visibility?.__valueText?.[language]} (
              {formatTimestamp(output.recordInfo.tsVisibility?.value, language)}
              )
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
        {user && (
          <Term
            label={output.dataQuality?.__text?.[language]}
            value={
              <span className='icon-text'>
                {getDataQualityIcon(output.dataQuality?.value)}{' '}
                {output.dataQuality?.__valueText?.[language]}
              </span>
            }
          />
        )}
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
        <Term
          label={output.attachments?.note_type_attachment?.__text?.[language]}
          value={output.attachments?.note_type_attachment?.value}
        />
        <Term
          label={output.attachments?.reviewed?.__text?.[language]}
          value={output.attachments?.reviewed?.__valueText?.[language]}
        />
      </dl>
    </details>
  );
};

const Timestamp = ({ timestamp }: { timestamp?: string }) => {
  const language = useLanguage();
  if (!timestamp) {
    return null;
  }
  return <span>{formatTimestamp(timestamp, language)}</span>;
};

const getDataQualityIcon = (dataQuality?: string) => {
  switch (dataQuality) {
    case '2026':
      return <CheckCircleIcon color='var(--color-alert-success-icon)' />;
    case 'classic':
      return (
        <FileExclamationPointIcon color='var(--color-alert-warning-icon)' />
      );
    default:
      return null;
  }
};
