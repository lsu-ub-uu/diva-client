import { ShowMoreOrLessButton } from '@/components/CollapsableText/ShowMoreOrLessButton';
import type { AttachmentGroup } from '@/generatedTypes/divaTypes';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Attachment } from './Attachment';

interface AttachmentsProps {
  attachments?: AttachmentGroup[];
}
export const Attachments = ({ attachments }: AttachmentsProps) => {
  const { t } = useTranslation();
  const id = useId();
  const [expanded, setExpanded] = useState(false);

  if (!attachments) {
    return null;
  }

  const expandable = attachments.length > 1;
  const attachmentsToShow = expanded ? attachments : attachments.slice(0, 1);

  return (
    <div className='attachments'>
      <ul id={id}>
        {attachmentsToShow.map((attachment, index) => (
          <li key={index}>
            <Attachment attachment={attachment} />
          </li>
        ))}
      </ul>
      {expandable && (
        <ShowMoreOrLessButton
          onClick={() => setExpanded(!expanded)}
          expanded={expanded}
          aria-controls={id}
          showMoreText={t('divaClient_showAllAttachmentsText')}
        />
      )}
    </div>
  );
};
