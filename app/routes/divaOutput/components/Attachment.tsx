import { useLanguage } from '@/i18n/useLanguage';
import { createDownloadLinkFromResourceLink } from '@/utils/createDownloadLinkFromResourceLink';
import { DownloadIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatBytes } from '../utils/format';
import { AttachmentDetails } from './AttachmentDetails';
import type { AttachmentVersionGroup } from '@/generatedTypes/divaTypes';

interface AttachmentProps {
  attachment: AttachmentVersionGroup;
}

export const Attachment = ({ attachment }: AttachmentProps) => {
  const { t } = useTranslation();
  const language = useLanguage();

  if (!attachment.file?.linkedRecord?.binary.master) {
    return null;
  }

  return (
    <div className='attachment'>
      <h3>{formatHeading(attachment, language)} </h3>
      {attachment.file.linkedRecord.binary.large?.large && (
        <img
          className='attachment-thumbnail'
          src={createDownloadLinkFromResourceLink(
            attachment.file.linkedRecord.binary.large.large,
          )}
          alt={attachment.__text?.[language]}
        />
      )}
      <AttachmentDetails attachment={attachment} />
      {attachment.file.linkedRecord.binary.master?.master && (
        <a
          className='icon-text'
          href={createDownloadLinkFromResourceLink(
            attachment.file.linkedRecord.binary.master.master,
          )}
          type={attachment.file.linkedRecord.binary.master?.mimeType?.value}
        >
          <DownloadIcon />
          {`${t('resourceLinkDownloadText')} (${formatBytes(
            attachment.file.linkedRecord.binary.master?.fileSize?.value,
          )})`}
        </a>
      )}
    </div>
  );
};

const formatHeading = (
  attachment: AttachmentVersionGroup,
  language: 'en' | 'sv',
): string => {
  const attachmentTypeText = attachment.label?.__valueText?.[language];

  if (attachment.displayLabel) {
    let label = attachment.displayLabel.value;
    if (attachmentTypeText) {
      label += ` (${attachmentTypeText})`;
    }
    return label;
  }

  return attachmentTypeText || '';
};
