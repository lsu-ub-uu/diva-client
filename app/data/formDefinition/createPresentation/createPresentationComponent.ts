import type {
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataNumberVariable,
  BFFMetadataRecordLink,
  BFFMetadataTextVariable,
  BFFPresentationBase,
  BFFPresentationChildReference,
  BFFPresentationGroup,
  BFFPresentationRecordLink,
  BFFPresentationResourceLink,
  BFFPresentationTextVar,
  BFFResourceLink,
  Dependencies,
} from '@/cora/bffTypes.server';
import { convertChildStylesToGridColSpan } from '@/cora/cora-data/CoraDataUtilsPresentations.server';
import { createCommonParameters } from '../utils/createCommonParameters.server';
import { createAttributes } from './createAttributes';
import { createCollVar } from './createCollVar.server';
import { createGroup } from './createGroup.server';
import { createNumVar } from './createNumVar.server';
import { createRecordLink } from './createRecordLink.server';
import { createResourceLink } from './createResourceLink.server';
import { createTextVar } from './createTextVar.server';

export interface Repeat {
  repeatMin: number;
  repeatMax: number;
  minNumberOfRepeatingToShow?: number;
}

export type PresentationChildReferenceData = Omit<
  BFFPresentationChildReference,
  'refGroups'
>;

export const createPresentationComponent = (
  dependencies: Dependencies,
  metadataId: string,
  presentationId: string,
  presentationChildReference: BFFPresentationChildReference,
  repeat: Repeat,
) => {
  const { metadataPool, presentationPool } = dependencies;
  const presentation = presentationPool.get(presentationId);
  const metadata = metadataPool.get(metadataId);

  const attributes = createAttributes(metadata, metadataPool, presentation);

  const commonParameters = createCommonParameters(metadata, presentation);

  switch (presentation?.type) {
    case 'pVar':
      return createTextVar(
        metadata as BFFMetadataTextVariable,
        presentation as BFFPresentationTextVar,
        attributes,
        repeat,
        presentationChildReference,
        commonParameters,
      );
    case 'pNumVar':
      return createNumVar(
        metadata as BFFMetadataNumberVariable,
        presentation as BFFPresentationBase,
        attributes,
        repeat,
        presentationChildReference,
        commonParameters,
      );

    case 'pCollVar':
      return createCollVar(
        dependencies,
        metadata as BFFMetadataCollectionVariable,
        presentation as BFFPresentationBase,
        attributes,
        repeat,
        presentationChildReference,
        commonParameters,
      );
    case 'pRecordLink':
      return createRecordLink(
        dependencies,
        metadata as BFFMetadataRecordLink,
        presentation as BFFPresentationRecordLink,
        attributes,
        repeat,
        presentationChildReference,
        commonParameters,
      );
    case 'pGroup':
      return createGroup(
        dependencies,
        metadata as BFFMetadataGroup,
        presentation as BFFPresentationGroup,
        attributes,
        repeat,
        presentationChildReference,
        commonParameters,
      );
    case 'pResourceLink':
      return createResourceLink(
        metadata as BFFResourceLink,
        presentation as BFFPresentationResourceLink,
        attributes,
        repeat,
        presentationChildReference,
        commonParameters,
      );
  }
};

export const createPresentationChildReferenceParameters = (
  presentationChildReference: PresentationChildReferenceData,
) => {
  const childStyle = presentationChildReference.childStyle;
  const textStyle = presentationChildReference.textStyle;
  const gridColSpan = convertChildStylesToGridColSpan(
    presentationChildReference.childStyle ?? [],
  );
  const presentationSize = presentationChildReference.presentationSize;
  const title = presentationChildReference.title;
  const titleHeadlineLevel = presentationChildReference.titleHeadlineLevel;
  const addText = presentationChildReference.addText;

  return {
    childStyle,
    textStyle,
    gridColSpan,
    presentationSize,
    title,
    titleHeadlineLevel,
    addText,
  };
};
