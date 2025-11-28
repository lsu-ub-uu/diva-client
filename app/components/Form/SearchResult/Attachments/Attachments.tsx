import type { AttachmentGroup } from '@/generatedTypes/divaTypes';
import styles from './Attachments.module.css';
import { createDownloadLinkFromResourceLink } from '@/utils/createDownloadLinkFromResourceLink';
import { useLanguage } from '@/i18n/useLanguage';

interface AttachmentsProps {
  attachments?: AttachmentGroup[];
}

export const Attachments = ({ attachments }: AttachmentsProps) => {
  const language = useLanguage();

  if (!attachments) {
    return null;
  }

  return (
    <ul className={styles['attachments']}>
      {attachments.map((attachment, i) => {
        if (!attachment.attachmentFile?.linkedRecord?.binary.master) {
          return null;
        }
        return (
          <li key={i}>
            {attachment?.attachmentFile?.linkedRecord.binary.thumbnail
              ?.thumbnail && (
              <img
                className={styles['attachment-thumbnail']}
                src={createDownloadLinkFromResourceLink(
                  attachment?.attachmentFile?.linkedRecord.binary.thumbnail
                    .thumbnail,
                )}
                alt={attachment.__text?.[language]}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};
