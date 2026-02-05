import type { AttachmentsVersionGroup } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { createDownloadLinkFromResourceLink } from '@/utils/createDownloadLinkFromResourceLink';
import styles from './Attachments.module.css';

interface AttachmentsProps {
  attachments?: AttachmentsVersionGroup;
}

export const Attachments = ({ attachments }: AttachmentsProps) => {
  const language = useLanguage();

  if (
    !attachments ||
    !attachments.attachment ||
    attachments.attachment.length === 0
  ) {
    return null;
  }

  const firstAttachment = attachments.attachment[0];
  const binary = firstAttachment?.file?.linkedRecord?.binary;
  console.log('binary', binary);
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
