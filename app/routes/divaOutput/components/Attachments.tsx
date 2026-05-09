import type { AttachmentsGroup } from '@/generatedTypes/divaTypes';
import { useId } from 'react';
import { Attachment } from './Attachment';
import { DataText } from './DataText';

interface AttachmentsProps {
  attachments?: AttachmentsGroup;
}
export const Attachments = ({
  attachments: attachmentsGroup,
}: AttachmentsProps) => {
  const id = useId();

  if (!attachmentsGroup) {
    return null;
  }

  const attachments =
    attachmentsGroup.attachment
      ?.filter((attachment) => attachment._label !== 'previewImage')
      .filter(
        (attachment) => attachment.file?.linkedRecord?.binary?.master != null,
      ) ?? [];

  return (
    <div className='attachments'>
      <h2>
        <DataText data={attachmentsGroup} />
      </h2>
      <ul id={id}>
        {attachments.map((attachment, index) => (
          <li key={index}>
            <Attachment attachment={attachment} />
          </li>
        ))}
      </ul>
    </div>
  );
};
