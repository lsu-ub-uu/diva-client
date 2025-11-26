import type { AttachmentGroup } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { ChevronDownIcon, InfoIcon } from 'lucide-react';
import { formatBytes, formatTimestamp } from '../utils/format';
import { DateDisplay } from './DateDisplay';
import { Term } from './Term';
import { useTranslation } from 'react-i18next';

interface AttachmentProps {
  attachment: AttachmentGroup;
}

export const AttachmentDetails = ({ attachment }: AttachmentProps) => {
  const { t } = useTranslation();
  const language = useLanguage();
  const binaryRecord = attachment?.attachmentFile?.linkedRecord?.binary;

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
          label={attachment.type?.__text?.[language]}
          value={attachment.type?.__valueText?.[language]}
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
          value={formatBytes(binaryRecord?.master?.fileSize?.value)}
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
          label={attachment?.note_type_attachmentVersion?.__text?.[language]}
          value={
            attachment?.note_type_attachmentVersion?.__valueText?.[language]
          }
        />
        <Term
          label={
            attachment?.adminInfo?.identifier_type_registrationNumber?.__text?.[
              language
            ]
          }
          value={
            attachment?.adminInfo?.identifier_type_registrationNumber?.value
          }
        />
        <Term
          label={attachment?.adminInfo?.availability?.__text?.[language]}
          value={attachment?.adminInfo?.availability?.__valueText?.[language]}
        />
        <Term
          label={attachment?.adminInfo?.dateAvailability?.__text?.[language]}
          value={<DateDisplay date={attachment?.adminInfo?.dateAvailability} />}
        />
        <Term
          label={attachment?.adminInfo?.secrecy?.__text?.[language]}
          value={attachment?.adminInfo?.secrecy?.__valueText?.[language]}
        />
        <Term
          label={
            attachment?.adminInfo?.note_type_attachment?.__text?.[language]
          }
          value={attachment?.adminInfo?.note_type_attachment?.value}
        />
      </dl>
    </details>
  );
};
