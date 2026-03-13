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
  presentation: BFFPresentation,
): FormAttributeCollection[] | undefined => {
  if (!('attributeReferences' in metadataVariable)) {
    return undefined;
  }

  if (!('mode' in presentation)) {
    return undefined;
  }

  const presentationMode = presentation.mode;

  return metadataVariable.attributeReferences?.map((attributeReference) =>
    createAttribute(attributeReference, metadataPool, presentationMode),
  );
};

const createAttribute = (
  attributeReference: BFFAttributeReference,
  metadataPool: Lookup<string, BFFMetadataBase>,
  presentationMode: 'input' | 'output',
): FormAttributeCollection => {
  const refCollectionVar = metadataPool.get(
    attributeReference.refCollectionVarId,
  ) as BFFMetadataCollectionVariable;

  const attributePresentation = createPresentationForAttributes(
    refCollectionVar.id,
    presentationMode,
  );
  const { finalValue } = refCollectionVar;
  const {
    type,
    name,
    placeholder,
    tooltip,
    label,
    headlineLevel,
    showLabel,
    attributesToShow,
  } = createCommonParameters(refCollectionVar, attributePresentation);

  const options = createCollectionVariableOptions(
    metadataPool,
    refCollectionVar,
  );
  return {
    type,
    name,
    placeholder,
    mode: presentationMode,
    tooltip,
    label,
    headlineLevel,
    showLabel,
    attributesToShow,
    options,
    finalValue,
  };
};

const createPresentationForAttributes = (
  id: string,
  mode: 'input' | 'output',
): BFFPresentationBase => ({
  id,
  type: 'pCollVar',
  mode,
  emptyTextId: 'initialEmptyValueText',
});
