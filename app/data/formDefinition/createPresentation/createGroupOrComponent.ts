/*
 * Copyright 2025 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import type {
  FormComponent,
  FormComponentGroup,
} from '@/components/FormGenerator/types';
import type {
  BFFCollectionItemReference,
  BFFMetadataBase,
  BFFMetadataChildReference,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataItemCollection,
  BFFMetadataNumberVariable,
  BFFMetadataRecordLink,
  BFFMetadataTextVariable,
  BFFPresentation,
  BFFPresentationBase,
  BFFPresentationChildReference,
  BFFPresentationContainer,
  BFFPresentationGroup,
  BFFPresentationResourceLink,
  BFFPresentationTextVar,
  BFFResourceLink,
} from '@/cora/transform/bffTypes.server';
import { createCollVar } from '@/data/formDefinition/createPresentation/createCollVar.server';
import { createContainer } from '@/data/formDefinition/createPresentation/createContainer.server';
import { createGroup } from '@/data/formDefinition/createPresentation/createGroup.server';
import { createGuiElement } from '@/data/formDefinition/createPresentation/createGuiElement.server';
import { createHiddenComponents } from '@/data/formDefinition/createPresentation/createHiddenComponents';
import { createNumVar } from '@/data/formDefinition/createPresentation/createNumVar.server';
import { createRecordLink } from '@/data/formDefinition/createPresentation/createRecordLink.server';
import { createResourceLink } from '@/data/formDefinition/createPresentation/createResourceLink.server';
import { createText } from '@/data/formDefinition/createPresentation/createText.server';
import { createTextVar } from '@/data/formDefinition/createPresentation/createTextVar.server';
import { findMetadataChildReferenceByNameInDataAndAttributes } from '@/data/formDefinition/findMetadataChildReferenceByNameInDataAndAttributes.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import type { Lookup } from '@/utils/structs/lookup';
import { createCommonParameters } from '@/data/formDefinition/createCommonParameters.server';
import { createPresentationChildReferenceParameters } from '@/data/formDefinition/createPresentationChildReferenceParameters.server';
import { createRepeat } from '@/data/formDefinition/createPresentation/createRepeat';

export const createGroupOrComponent = (
  dependencies: Dependencies,
  metadataChildReferences: BFFMetadataChildReference[],
  presentationChildReference: BFFPresentationChildReference,
  alternative: boolean,
  metadataOverrideId?: string,
): FormComponentGroup | FormComponent | undefined => {
  const { metadataPool, presentationPool } = dependencies;

  const presentation = getPresentation(
    presentationPool,
    presentationChildReference,
    alternative,
  );

  const alternativePresentation =
    alternative === false && presentationChildReference.refGroups.length > 1
      ? createGroupOrComponent(
          dependencies,
          metadataChildReferences,
          presentationChildReference,
          true,
          metadataOverrideId,
        )
      : undefined;

  if (presentation.type === 'container') {
    return createContainer(
      dependencies,
      metadataChildReferences,
      presentation as BFFPresentationContainer,
      presentationChildReference,
      alternativePresentation,
    );
  }

  const metadataFromPresentation = metadataPool.get(
    metadataOverrideId ?? presentation.presentationOf,
  );

  const metaDataChildReference =
    findMetadataChildReferenceByNameInDataAndAttributes(
      metadataPool,
      metadataChildReferences,
      metadataFromPresentation,
    );

  if (!metaDataChildReference) {
    return undefined;
  }

  const metadata = metadataPool.get(metaDataChildReference.childId);

  if (presentation.type === 'pVar') {
    return createTextVar(
      metadataPool,
      metadata as BFFMetadataTextVariable,
      presentation as BFFPresentationTextVar,
      metaDataChildReference,
      presentationChildReference,
      alternativePresentation,
    );
  }

  if (presentation.type === 'pNumVar') {
    return createNumVar(
      metadataPool,
      metadata as BFFMetadataNumberVariable,
      presentation,
      metaDataChildReference,
      presentationChildReference,
      alternativePresentation,
    );
  }

  if (presentation.type === 'pCollVar') {
    return createCollVar(
      metadataPool,
      metadata as BFFMetadataCollectionVariable,
      presentation,
      metaDataChildReference,
      presentationChildReference,
      alternativePresentation,
    );
  }

  if (presentation.type === 'pRecordLink') {
    return createRecordLink(
      metadataPool,
      metadata as BFFMetadataRecordLink,
      presentation,
      metaDataChildReference,
      presentationChildReference,
      alternativePresentation,
    );
  }

  if (presentation.type === 'pGroup') {
    return createGroup(
      dependencies,
      metadata as BFFMetadataGroup,
      presentation as BFFPresentationGroup,
      metaDataChildReference,
      presentationChildReference,
      alternativePresentation,
    );
  }

  if (presentation.type === 'pResourceLink') {
    return createResourceLink(
      metadata as BFFResourceLink,
      presentation as BFFPresentationResourceLink,
      metaDataChildReference,
      presentationChildReference,
      alternativePresentation,
    );
  }

  // Fall back to "generic" presentation
  return {
    presentationId: presentation.id,
    ...createCommonParameters(metadata, presentation),
    repeat: createRepeat(presentationChildReference, metaDataChildReference),
    ...createPresentationChildReferenceParameters(presentationChildReference),
  };
};

const getPresentation = (
  presentationPool: Lookup<string, BFFPresentation>,
  presentationChildReference: BFFPresentationChildReference,
  alternative: boolean,
) => {
  const refGroup = getPresentationChildRefGroup(
    presentationChildReference,
    alternative,
  );
  const presentationChildId = refGroup.childId;
  return presentationPool.get(presentationChildId) as BFFPresentationBase;
};

export const createCollectionVariableOptions = (
  metadataPool: any,
  collectionVariable: BFFMetadataCollectionVariable,
): { label: string; value: string }[] => {
  const collection = metadataPool.get(
    collectionVariable.refCollection,
  ) as BFFMetadataItemCollection;
  const itemReferences = collection.collectionItemReferences;
  return itemReferences.map((itemRef: BFFCollectionItemReference) => {
    const collectionItem = metadataPool.get(
      itemRef.refCollectionItemId,
    ) as BFFMetadataBase;
    const label = collectionItem.textId;
    const value = collectionItem.nameInData;
    return { value, label };
  });
};

export const createComponentsFromChildReferences = (
  dependencies: Dependencies,
  metadataChildReferences: BFFMetadataChildReference[],
  presentationChildReferences: BFFPresentationChildReference[],
  alternative: boolean,
): FormComponent[] => {
  const components = presentationChildReferences.map(
    (presentationChildReference) => {
      return createComponentFromChildReference(
        dependencies,
        metadataChildReferences,
        presentationChildReference,
        alternative,
      );
    },
  ) as FormComponent[];

  const hiddenComponents = alternative
    ? []
    : createHiddenComponents(
        dependencies,
        metadataChildReferences,
        presentationChildReferences,
      );

  return [...components, ...hiddenComponents];
};

export const getPresentationChildRefGroup = (
  presentationChildReference: BFFPresentationChildReference,
  alternative: boolean,
) => {
  return presentationChildReference.refGroups[alternative ? 1 : 0];
};

const createComponentFromChildReference = (
  dependencies: Dependencies,
  metadataChildReferences: BFFMetadataChildReference[],
  presentationChildReference: BFFPresentationChildReference,
  alternative: boolean,
) => {
  const refGroup = getPresentationChildRefGroup(
    presentationChildReference,
    alternative,
  );
  const presentationChildType = refGroup.type;

  if (presentationChildType === 'text') {
    return createText(
      presentationChildReference,
      presentationChildType,
      alternative,
    );
  }

  if (presentationChildType === 'guiElement') {
    return createGuiElement(
      presentationChildReference,
      dependencies.presentationPool,
      alternative,
    );
  }

  return createFormPartsForGroupOrVariable(
    dependencies,
    metadataChildReferences,
    presentationChildReference,
    alternative,
  );
};

const createFormPartsForGroupOrVariable = (
  dependencies: Dependencies,
  metadataChildReferences: BFFMetadataChildReference[],
  presentationChildReference: BFFPresentationChildReference,
  alternative: boolean,
) => {
  const { metadataPool, presentationPool } = dependencies;
  let metadataOverrideId;
  const refGroup = getPresentationChildRefGroup(
    presentationChildReference,
    alternative,
  );
  const presentationChildId = refGroup.childId;
  const presentation = presentationPool.get(presentationChildId) as
    | BFFPresentationBase
    | BFFPresentationGroup;
  if (
    presentation.type !== 'container' &&
    noIdMatchForChildRefAndPresentationOf(metadataChildReferences, presentation)
  ) {
    const metadataFromCurrentPresentation = metadataPool.get(
      presentation.presentationOf,
    );
    const foundMetadataChildReference =
      findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        metadataChildReferences,
        metadataFromCurrentPresentation,
      );

    if (!foundMetadataChildReference) {
      return undefined;
    }
    const foundMetadata = metadataPool.get(foundMetadataChildReference.childId);
    metadataOverrideId = foundMetadata.id;
  }
  return createGroupOrComponent(
    dependencies,
    metadataChildReferences,
    presentationChildReference,
    alternative,
    metadataOverrideId,
  );
};

const noIdMatchForChildRefAndPresentationOf = (
  metadataChildReferences: BFFMetadataChildReference[],
  presentation: BFFPresentationBase,
) => {
  return !metadataChildReferences.some(
    (mcr) => mcr.childId === presentation.presentationOf,
  );
};
