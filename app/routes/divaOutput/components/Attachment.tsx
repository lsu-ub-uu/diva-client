import type { AttachmentGroup } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { createDownloadLinkFromResourceLink } from '@/utils/createDownloadLinkFromResourceLink';
import type { TFunction } from 'i18next';
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

  if (!attachment.file?.linkedRecord?.binary.master?.master) {
    return null;
  }

  const downloadLink = createDownloadLinkFromResourceLink(
    attachment.file.linkedRecord.binary.master.master,
  );
  return (
    <div className='attachment'>
      {attachment.file.linkedRecord.binary.thumbnail?.thumbnail && (
        <a
          className='icon-text'
          href={downloadLink}
          type={attachment.file.linkedRecord.binary.master?.mimeType?.value}
        >
          <img
            className='attachment-thumbnail'
            src={createDownloadLinkFromResourceLink(
              attachment.file.linkedRecord.binary.thumbnail.thumbnail,
            )}
            alt={attachment.__text?.[language]}
          />
        </a>
      )}
      <div>
        <h3 className='attachment-heading'>
          <a
            className='icon-text'
            href={downloadLink}
            type={attachment.file.linkedRecord.binary.master?.mimeType?.value}
          >
            {formatHeading(attachment, t)}
            <DownloadIcon />
          </a>
        </h3>
        {attachment.displayLabel?.value && (
          <div>{attachment.displayLabel?.value}</div>
        )}
        {attachment.file.linkedRecord.binary.master?.mimeType?.value && (
          <div>
            {formatMimeType(
              attachment.file.linkedRecord.binary.master?.mimeType?.value,
            )}
          </div>
        )}
      </div>
      <AttachmentDetails attachment={attachment} />
    </div>
  );
};

const formatHeading = (attachment: AttachmentGroup, t: TFunction): string => {
  const attachmentTypeText = t(`${attachment._label}ItemText`);

  const fileSize = formatBytes(
    attachment.file?.linkedRecord.binary.master?.fileSize?.value,
  );
  return `${attachmentTypeText} (${fileSize})`;
};

const MIME_LABELS: Record<string, string> = {
  'application/pdf': 'PDF',
  'image/jpeg': 'JPEG',
  'image/png': 'PNG',
  'image/gif': 'GIF',
  'image/tiff': 'TIFF',
  'application/msword': 'Word',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    'Word',
  'application/vnd.ms-excel': 'Excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel',
  'application/zip': 'ZIP',
  'text/plain': 'Text',
  'text/html': 'HTML',
};

const formatMimeType = (mimeType: string): string => {
  return (
    MIME_LABELS[mimeType] ??
    mimeType.split('/').pop()?.toUpperCase() ??
    mimeType
  );
};
