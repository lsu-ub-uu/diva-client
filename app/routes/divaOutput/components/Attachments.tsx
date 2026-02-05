import { ShowMoreOrLessButton } from '@/components/CollapsableText/ShowMoreOrLessButton';
import type { AttachmentsVersionGroup } from '@/generatedTypes/divaTypes';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Attachment } from './Attachment';
import { Term } from './Term';
import { useLanguage } from '@/i18n/useLanguage';

interface AttachmentsProps {
  attachments?: AttachmentsVersionGroup;
}
export const Attachments = ({
  attachments: attachmentsGroup,
}: AttachmentsProps) => {
  const { t } = useTranslation();
  const language = useLanguage();
  const id = useId();
  const [expanded, setExpanded] = useState(false);

  if (!attachmentsGroup) {
    return null;
  }

  const attachments = attachmentsGroup.attachment ?? [];
  const expandable = attachments.length > 1;
  const attachmentsToShow = expanded ? attachments : attachments.slice(0, 1);

  return (
    <div className='attachments'>
      {attachmentsGroup.note_type_attachment?.value && (
        <dl>
          <Term
            label={attachmentsGroup.note_type_attachment.__text?.[language]}
            value={attachmentsGroup.note_type_attachment.value}
          />
        </dl>
      )}
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
          showMoreText={t('divaClient_showAllAttachmentsText', {
            count: attachments.length,
          })}
        />
      )}
    </div>
  );
};
