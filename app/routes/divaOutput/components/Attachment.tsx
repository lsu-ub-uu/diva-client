import type { AttachmentGroup } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { DownloadIcon } from '@/icons';
import { createDownloadLinkFromResourceLink } from '@/utils/createDownloadLinkFromResourceLink';
import { useTranslation } from 'react-i18next';

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
      <h3>
        {attachment.displayLabel
          ? `${attachment.displayLabel.value} (${attachment.type.__valueText[language]})`
          : attachment.type.__valueText[language]}
      </h3>
      {attachment.attachmentFile.linkedRecord.binary.large && (
        <img
          className='attachment-thumbnail'
          src={createDownloadLinkFromResourceLink(
            attachment.attachmentFile.linkedRecord.binary.large.large,
          )}
          alt={attachment.__text[language]}
        />
      )}
      <a
        className='download-link'
        href={createDownloadLinkFromResourceLink(
          attachment.attachmentFile.linkedRecord.binary.master.master,
        )}
        type={
          attachment.attachmentFile.linkedRecord.binary.master?.mimeType.value
        }
      >
        <DownloadIcon />
        {`${t('resourceLinkDownloadText')} (${formatBytes(
          attachment.attachmentFile.linkedRecord.binary.master.fileSize.value,
        )})`}
      </a>
    </div>
  );
};
const formatBytes = (bytesString: string): string => {
  const bytes = parseInt(bytesString, 10);
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
