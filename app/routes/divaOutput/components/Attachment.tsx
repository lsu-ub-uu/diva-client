import type { AttachmentGroup } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { createDownloadLinkFromResourceLink } from '@/utils/createDownloadLinkFromResourceLink';
import { DownloadIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatBytes } from '../utils/format';
import { AttachmentDetails } from './AttachmentDetails';

interface AttachmentProps {
  attachment: AttachmentGroup;
}

export const Attachment = ({ attachment }: AttachmentProps) => {
  const { t } = useTranslation();
  const language = useLanguage();

  if (!attachment.attachmentFile?.linkedRecord?.binary.master) {
    return null;
  }

  return (
    <div className='attachment'>
      <h3 className='icon-text'>{formatHeading(attachment, language)} </h3>
      {attachment.attachmentFile.linkedRecord.binary.large?.large && (
        <img
          className='attachment-thumbnail'
          src={createDownloadLinkFromResourceLink(
            attachment.attachmentFile.linkedRecord.binary.large.large,
          )}
          alt={attachment.__text?.[language]}
        />
      )}
      <AttachmentDetails attachment={attachment} />
      {attachment.attachmentFile.linkedRecord.binary.master?.master && (
        <a
          className='icon-text'
          href={createDownloadLinkFromResourceLink(
            attachment.attachmentFile.linkedRecord.binary.master.master,
          )}
          type={
            attachment.attachmentFile.linkedRecord.binary.master?.mimeType
              ?.value
          }
        >
          <DownloadIcon />
          {`${t('resourceLinkDownloadText')} (${formatBytes(
            attachment.attachmentFile.linkedRecord.binary.master?.fileSize
              ?.value,
          )})`}
        </a>
      )}
    </div>
  );
};

const formatHeading = (
  attachment: AttachmentGroup,
  language: 'en' | 'sv',
): string => {
  const attachmentTypeText = attachment.type?.__valueText?.[language];

  if (attachment.displayLabel) {
    let label = attachment.displayLabel.value;
    if (attachmentTypeText) {
      label += ` (${attachmentTypeText})`;
    }
    return label;
  }

  return attachmentTypeText || '';
};
