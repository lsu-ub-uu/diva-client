import type {
  AttachmentGroup,
  AttachmentsGroup,
} from '@/generatedTypes/divaTypes';
import { formatAttachmentHeading } from '@/routes/divaOutput/components/Attachment';
import { createDownloadLinkFromResourceLink } from '@/utils/createDownloadLinkFromResourceLink';
import { useTranslation } from 'react-i18next';
import styles from './Attachments.module.css';
import type { TFunction } from 'i18next';

interface AttachmentsProps {
  attachments?: AttachmentsGroup;
}

export const Attachments = ({ attachments }: AttachmentsProps) => {
  const { t } = useTranslation();

  if (
    !attachments ||
    !attachments.attachment ||
    attachments.attachment.length === 0
  ) {
    return null;
  }

  const firstAttachment = attachments.attachment[0];
  const binary = firstAttachment?.file?.linkedRecord?.binary;

  const previewImage = attachments?.attachment?.find(
    (attachment) => attachment._label === 'previewImage',
  );
  const previewImageThumbnail =
    previewImage?.file?.linkedRecord?.binary.thumbnail?.thumbnail;

  if (!binary?.master?.master || !binary?.thumbnail?.thumbnail) {
    if (previewImageThumbnail) {
      return (
        <img
          className={styles['attachment-thumbnail']}
          src={createDownloadLinkFromResourceLink(previewImageThumbnail)}
          alt=''
        />
      );
    }
    return null;
  }

  return (
    <a
      href={createDownloadLinkFromResourceLink(binary.master.master)}
      target='_blank'
      rel='noopener noreferrer'
      className={styles['attachment-link']}
    >
      <img
        className={styles['attachment-thumbnail']}
        src={createDownloadLinkFromResourceLink(binary.thumbnail.thumbnail)}
        alt={formatAttachmentAltText(firstAttachment, t)}
      />
    </a>
  );
};

const formatAttachmentAltText = (attachment: AttachmentGroup, t: TFunction) => {
  return attachment.displayLabel?.value
    ? `${attachment.displayLabel?.value}, ${formatAttachmentHeading(
        attachment,
        t,
      )}`
    : formatAttachmentHeading(attachment, t);
};
