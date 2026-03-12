import type { FormAttributeCollection } from '@/components/FormGenerator/types';
import type {
  BFFAttributeReference,
  BFFMetadata,
  BFFMetadataBase,
  BFFMetadataCollectionVariable,
  BFFPresentation,
  BFFPresentationBase,
} from '@/cora/bffTypes.server';
import type { Lookup } from 'server/dependencies/util/lookup';
import { createCommonParameters } from '../createCommonParameters.server';
import { createCollectionVariableOptions } from './createGroupOrComponent';

export const createAttributes = (
  metadataVariable: BFFMetadata,
  metadataPool: Lookup<string, BFFMetadataBase>,
  options: any,
  presentation: BFFPresentation,
): FormAttributeCollection[] | undefined => {
  if (!('attributeReferences' in metadataVariable)) {
    return undefined;
  }

  if (!('mode' in presentation)) {
    return undefined;
  }

  const presentationMode = presentation.mode;

  return metadataVariable.attributeReferences?.map(
    (attributeReference: BFFAttributeReference) => {
      const refCollectionVar = metadataPool.get(
        attributeReference.refCollectionVarId,
      ) as BFFMetadataCollectionVariable;

      const attributePresentation = createPresentationForAttributes(
        'someFakeId',
        refCollectionVar.id,
        presentationMode,
      );
      const { finalValue } = refCollectionVar;
      const {
        type,
        name,
        placeholder,
        mode,
        tooltip,
        label,
        headlineLevel,
        showLabel,
        attributesToShow,
      } = createCommonParameters(refCollectionVar, attributePresentation);
      options = createCollectionVariableOptions(metadataPool, refCollectionVar);
      return {
        type,
        name,
        placeholder,
        mode,
        tooltip,
        label,
        headlineLevel,
        showLabel,
        attributesToShow,
        options,
        finalValue,
      };
    },
  );
};

const createPresentationForAttributes = (
  id: string,
  presentationOf: string,
  mode: 'input' | 'output',
): BFFPresentationBase => ({
  id,
  presentationOf,
  type: 'pCollVar',
  mode,
  emptyTextId: 'initialEmptyValueText',
});
