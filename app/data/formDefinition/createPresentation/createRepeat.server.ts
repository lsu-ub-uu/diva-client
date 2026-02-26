import type {
  BFFMetadataChildReference,
  BFFPresentationChildReference,
} from '@/cora/bffTypes.server';
import { determineRepeatMax } from '../formDefinition.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';

export const createRepeat = (
  presentationChildReference: BFFPresentationChildReference,
  metaDataChildRef: BFFMetadataChildReference,
) => {
  const minNumberOfRepeatingToShow = getMinNumberOfRepeatingToShow(
    presentationChildReference,
  );

  const repeatMin = parseInt(metaDataChildRef.repeatMin);
  const repeatMax = determineRepeatMax(metaDataChildRef.repeatMax);

  return removeEmpty({ minNumberOfRepeatingToShow, repeatMin, repeatMax });
};

const getMinNumberOfRepeatingToShow = (
  presentationChildReference: BFFPresentationChildReference,
) => {
  let minNumberOfRepeatingToShow;
  if (presentationChildReference.minNumberOfRepeatingToShow !== undefined) {
    minNumberOfRepeatingToShow = parseInt(
      presentationChildReference.minNumberOfRepeatingToShow,
    );
  }
  return minNumberOfRepeatingToShow;
};
