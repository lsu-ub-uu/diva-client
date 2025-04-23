import type { Lookup } from '@/utils/structs/lookup';
import type { BFFMetadataTypes } from '../formDefinition.server';
import type {
  BFFAttributeReference,
  BFFMetadataBase,
  BFFMetadataCollectionVariable,
  BFFPresentationBase,
} from '@/cora/transform/bffTypes.server';
import type { FormAttributeCollection } from '@/components/FormGenerator/types';
import { createCommonParameters } from '../createCommonParameters.server';
import { createCollectionVariableOptions } from './createGroupOrComponent';

export const createAttributes = (
  metadataVariable: BFFMetadataTypes,
  metadataPool: Lookup<string, BFFMetadataBase>,
  options: any,
  presentation: BFFPresentationBase,
): FormAttributeCollection[] | undefined => {
  if (metadataVariable.attributeReferences === undefined) {
    return undefined;
  }

  return metadataVariable.attributeReferences?.map(
    (attributeReference: BFFAttributeReference) => {
      const refCollectionVar = metadataPool.get(
        attributeReference.refCollectionVarId,
      ) as BFFMetadataCollectionVariable;

      const attributePresentation = createPresentationForAttributes(
        'someFakeId',
        refCollectionVar.id,
        presentation.mode,
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
        presentationId: attributePresentation.id,
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
