import { useLanguage } from '@/i18n/useLanguage';
import { ChevronDownIcon, InfoIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatBytes, formatRawBytes, formatTimestamp } from '../utils/format';
import { DateDisplay } from './DateDisplay';
import { Term } from './Term';
import type { AttachmentVersionGroup } from '@/generatedTypes/divaTypes';

interface AttachmentProps {
  attachment: AttachmentVersionGroup;
}

export const AttachmentDetails = ({ attachment }: AttachmentProps) => {
  const { t } = useTranslation();
  const language = useLanguage();
  const binaryRecord = attachment?.file?.linkedRecord?.binary;

  return (
    <details className='record-details'>
      <summary>
        <ChevronDownIcon className='expand-chevron' />
        <h2>{t('divaClient_attachmentDetailsText')}</h2>
        <InfoIcon />
      </summary>
      <dl>
        <Term
          label={attachment.displayLabel?.__text?.[language]}
          value={attachment.displayLabel?.value}
        />
        <Term
          label={attachment.label?.__text?.[language]}
          value={attachment.label?.__valueText?.[language]}
        />
        <Term
          label={binaryRecord?.originalFileName?.__text?.[language]}
          value={binaryRecord?.originalFileName?.value}
        />
        <Term
          label={binaryRecord?.master?.mimeType?.__text?.[language]}
          value={binaryRecord?.master?.mimeType?.value}
        />
        <Term
          label={binaryRecord?.master?.fileSize?.__text?.[language]}
          value={
            <span>
              {formatRawBytes(binaryRecord?.master?.fileSize?.value, language)}{' '}
              ({formatBytes(binaryRecord?.master?.fileSize?.value)})
            </span>
          }
        />
        <Term
          label={binaryRecord?.recordInfo?.visibility?.__text?.[language]}
          value={
            <span>
              {binaryRecord?.recordInfo?.visibility?.__valueText?.[language]} (
              {formatTimestamp(
                binaryRecord?.recordInfo?.tsVisibility?.value,
                language,
              )}
              )
            </span>
          }
        />
        <Term
          label={attachment?.digitized?.__text?.[language]}
          value={attachment?.digitized?.__valueText?.[language]}
        />
        <Term
          label={attachment?.printReadyFile?.__text?.[language]}
          value={attachment?.printReadyFile?.__valueText?.[language]}
        />
        <Term
          label={attachment?.note_type_attachmentVersion?.__text?.[language]}
          value={
            attachment?.note_type_attachmentVersion?.__valueText?.[language]
          }
        />
        <Term
          label={
            attachment?.identifier_type_registrationNumber?.__text?.[language]
          }
          value={attachment?.identifier_type_registrationNumber?.value}
        />
        <Term
          label={attachment?.availability?.__text?.[language]}
          value={attachment?.availability?.__valueText?.[language]}
        />
        <Term
          label={attachment?.dateToBePublished?.__text?.[language]}
          value={<DateDisplay date={attachment?.dateToBePublished} />}
        />
        <Term
          label={attachment?.dateToBeUnpublished?.__text?.[language]}
          value={<DateDisplay date={attachment?.dateToBeUnpublished} />}
        />
      </dl>
    </details>
  );
};
