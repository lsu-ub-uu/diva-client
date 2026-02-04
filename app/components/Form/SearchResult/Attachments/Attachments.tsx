import type { AttachmentGroup } from '@/generatedTypes/divaTypes';
import styles from './Attachments.module.css';
import { createDownloadLinkFromResourceLink } from '@/utils/createDownloadLinkFromResourceLink';
import { useLanguage } from '@/i18n/useLanguage';

interface AttachmentsProps {
  attachments?: AttachmentGroup[];
}

export const Attachments = ({ attachments }: AttachmentsProps) => {
  const language = useLanguage();

  if (!attachments || attachments.length === 0) {
    return null;
  }

  const firstAttachment = attachments[0];
  const binary = firstAttachment?.file?.linkedRecord?.binary;

  if (!binary?.master?.master || !binary?.thumbnail?.thumbnail) {
    return null;
  }

  return (
    <a
      href={createDownloadLinkFromResourceLink(binary.master.master)}
      target='_blank'
      rel='noopener noreferrer'
    >
      <img
        className={styles['attachment-thumbnail']}
        src={createDownloadLinkFromResourceLink(binary.thumbnail.thumbnail)}
        alt={firstAttachment.__text?.[language]}
      />
    </a>
  );
};
