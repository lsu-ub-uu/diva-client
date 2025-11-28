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
        const binary = attachment?.attachmentFile?.linkedRecord?.binary;

        if (!binary?.master?.master) {
          return null;
        }
        return (
          <li key={i}>
            {binary?.thumbnail?.thumbnail && (
              <a
                href={createDownloadLinkFromResourceLink(binary.master.master)}
              >
                <img
                  className={styles['attachment-thumbnail']}
                  src={createDownloadLinkFromResourceLink(
                    binary.thumbnail.thumbnail,
                  )}
                  alt={attachment.__text?.[language]}
                />
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
};
