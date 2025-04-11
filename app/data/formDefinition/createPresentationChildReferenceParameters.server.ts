import { convertChildStylesToGridColSpan } from '@/cora/cora-data/CoraDataUtilsPresentations.server';
import type { BFFPresentationChildReference } from '@/cora/transform/bffTypes.server';

export const createPresentationChildReferenceParameters = (
  presentationChildReference: BFFPresentationChildReference,
) => {
  const childStyle = presentationChildReference.childStyle;
  const textStyle = presentationChildReference.textStyle;
  const gridColSpan = convertChildStylesToGridColSpan(
    presentationChildReference.childStyle ?? [],
  );
  const presentationSize = presentationChildReference.presentationSize;
  const title = presentationChildReference.title;
  const titleHeadlineLevel = presentationChildReference.titleHeadlineLevel;

  return {
    childStyle,
    textStyle,
    gridColSpan,
    presentationSize,
    title,
    titleHeadlineLevel,
  };
};
