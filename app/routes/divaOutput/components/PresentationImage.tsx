import type {
  AttachmentGroup,
  DivaOutputGroup,
} from '@/generatedTypes/divaTypes';
import { createDownloadLinkFromResourceLink } from '@/utils/createDownloadLinkFromResourceLink';

interface PresentationImageProps {
  output: DivaOutputGroup;
}

export const PresentationImage = ({ output }: PresentationImageProps) => {
  const firstAttachment = output.attachments?.attachment?.[0];
  const previewImage = output.attachments?.attachment?.find(
    (attachment) => attachment._label === 'previewImage',
  );
  const fulltextImage = output.attachments?.attachment?.find(
    (attachment) => attachment._label === 'fullText',
  );

  const imageUrl = getImageUrlFromAttachment(
    previewImage || fulltextImage || firstAttachment,
  );

  if (!imageUrl) {
    return null;
  }

  return (
    <img
      className='presentation-image'
      src={imageUrl}
      alt='Presentationsbild'
    />
  );
};

const getImageUrlFromAttachment = (attachment: AttachmentGroup | undefined) => {
  const resourceLink = attachment?.file?.linkedRecord?.binary?.large?.large;
  if (!resourceLink) {
    return null;
  }

  return createDownloadLinkFromResourceLink(resourceLink);
};
