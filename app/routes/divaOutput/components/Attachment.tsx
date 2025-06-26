import type { AttachmentGroup } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { DownloadIcon } from '@/icons';
import { createDownloadLinkFromResourceLink } from '@/utils/createDownloadLinkFromResourceLink';
import { useTranslation } from 'react-i18next';

interface AttachementProps {
  attachement: AttachmentGroup;
}

export const Attachement = ({ attachement }: AttachementProps) => {
  const { t } = useTranslation();
  const language = useLanguage();

  if (!attachement.attachmentFile?.linkedRecord) {
    return null;
  }

  return (
    <div>
      <h3>
        {attachement.displayLabel
          ? `${attachement.displayLabel.value} (${attachement.type.__valueText[language]})`
          : attachement.type.__valueText[language]}
      </h3>
      {attachement.attachmentFile.linkedRecord.binary.thumbnail && (
        <img
          src={createDownloadLinkFromResourceLink(
            attachement.attachmentFile.linkedRecord.binary.thumbnail.thumbnail,
          )}
          alt={attachement.__text[language]}
        />
      )}
      <a
        className='download-link'
        href={createDownloadLinkFromResourceLink(
          attachement.attachmentFile.linkedRecord.binary.master!.master,
        )}
        type={
          attachement.attachmentFile.linkedRecord.binary.master?.mimeType.value
        }
      >
        <DownloadIcon />
        {`${t('resourceLinkDownloadText')} (${formatBytes(
          attachement.attachmentFile.linkedRecord.binary.master!.fileSize.value,
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
