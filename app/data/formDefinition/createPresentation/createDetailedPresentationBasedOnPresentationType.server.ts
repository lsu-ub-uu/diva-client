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

import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import type {
  BFFAttributeReference,
  BFFCollectionItemReference,
  BFFMetadataBase,
  BFFMetadataChildReference,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataItemCollection,
  BFFMetadataNumberVariable,
  BFFMetadataRecordLink,
  BFFMetadataTextVariable,
  BFFPresentationBase,
  BFFPresentationChildReference,
  BFFPresentationContainer,
  BFFPresentationGroup,
} from '@/cora/transform/bffTypes.server';
import type {
  FormComponent,
  FormComponentCollVar,
  FormComponentContainer,
  FormComponentGroup,
  FormComponentHidden,
  FormComponentNumVar,
  FormComponentTextVar,
} from '@/components/FormGenerator/types';
import {
  convertChildStylesToGridColSpan,
  convertChildStylesToShortName,
} from '@/cora/cora-data/CoraDataUtilsPresentations.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import {
  type BFFMetadataTypes,
  determineRepeatMax,
} from '@/data/formDefinition/formDefinition.server';
import { createCommonParameters } from '@/data/formDefinition/createCommonParameters.server';
import type { Lookup } from '@/utils/structs/lookup';
import { createGuiElement } from '@/data/formDefinition/createPresentation/createGuiElement.server';
import { createText } from '@/data/formDefinition/createPresentation/createText.server';
import { findMetadataChildReferenceByNameInDataAndAttributes } from '@/data/formDefinition/findMetadataChildReferenceByNameInDataAndAttributes.server';
import { createTextVar } from '@/data/formDefinition/createPresentation/createTextVar.server';
import { createNumVar } from '@/data/formDefinition/createPresentation/createNumVar.server';
import { createCollVar } from '@/data/formDefinition/createPresentation/createCollVar.server';
import { createRecordLink } from '@/data/formDefinition/createPresentation/createRecordLink.server';
import { createGroup } from '@/data/formDefinition/createPresentation/createGroup.server';
import { createContainer } from '@/data/formDefinition/createPresentation/createContainer.server';

export const createDetailedPresentationBasedOnPresentationType = (
  dependencies: Dependencies,
  metadataChildReferences: BFFMetadataChildReference[],
  presentationChildReference: BFFPresentationChildReference,
  metadataOverrideId?: string,
): FormComponentGroup | FormComponent | undefined => {
  const { metadataPool, presentationPool } = dependencies;

  let metaDataChildRef;
  let repeat;
  let metadata;
  let commonParameters;

  const childStyle = convertChildStylesToShortName(
    presentationChildReference.childStyle,
  );
  const gridColSpan = convertChildStylesToGridColSpan(
    presentationChildReference.childStyle ?? [],
  );
  const presentationChildId = presentationChildReference.childId;
  const presentation = presentationPool.get(presentationChildId) as
    | BFFPresentationBase
    | BFFPresentationGroup;
  // containers does not have presentationOf, it has presentationsOf
  if (presentation.type !== 'container') {
    const metadataFromPresentation = metadataPool.get(
      metadataOverrideId ?? presentation.presentationOf,
    );
    metaDataChildRef = findMetadataChildReferenceByNameInDataAndAttributes(
      metadataPool,
      metadataChildReferences,
      metadataFromPresentation,
    );
    if (!metaDataChildRef) {
      return;
    }
    metadata = metadataPool.get(metaDataChildRef.childId);

    repeat = createRepeat(presentationChildReference, metaDataChildRef);
    commonParameters = createCommonParameters(metadata, presentation);
  }

  if (presentation.type === 'pVar') {
    const textVar = createTextVar(
      metadataPool,
      metadata as BFFMetadataTextVariable,
      presentation,
    );

    return {
      repeat,
      childStyle,
      gridColSpan,
      ...textVar,
    } as FormComponentTextVar;
  }

  if (presentation.type === 'pNumVar') {
    const numVar = createNumVar(
      metadataPool,
      metadata as BFFMetadataNumberVariable,
      presentation,
    );
    return {
      repeat,
      childStyle,
      gridColSpan,
      ...numVar,
    } as FormComponentNumVar;
  }

  if (presentation.type === 'pCollVar') {
    const collVar = createCollVar(
      metadataPool,
      metadata as BFFMetadataCollectionVariable,
      presentation,
    );
    return {
      repeat,
      childStyle,
      gridColSpan,
      ...collVar,
    } as FormComponentCollVar;
  }

  if (presentation.type === 'pRecordLink') {
    const recordLink = createRecordLink(
      metadataPool,
      metadata as BFFMetadataRecordLink,
      presentation,
    );
    return {
      repeat,
      childStyle,
      gridColSpan,
      ...recordLink,
    } as FormComponentCollVar;
  }

  if (presentation.type === 'container') {
    const container = createContainer(
      dependencies,
      metadataChildReferences,
      presentation as BFFPresentationContainer,
    );
    return { childStyle, gridColSpan, ...container } as FormComponentContainer;
  }

  if (presentation.type === 'pGroup') {
    const group = createGroup(
      dependencies,
      metadata as BFFMetadataGroup,
      presentation,
    );
    return {
      repeat,
      childStyle,
      gridColSpan,
      ...group,
    } as FormComponentGroup;
  }

  return removeEmpty({
    ...commonParameters,
    repeat,
    childStyle,
    gridColSpan,
  }) as FormComponentGroup;
};

const createRepeat = (
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

export const checkForAttributes = (
  metadataVariable: BFFMetadataTypes,
  metadataPool: Lookup<string, BFFMetadataBase>,
  options: any,
  presentation: BFFPresentationBase,
) => {
  let attributes;
  if (metadataVariable.attributeReferences !== undefined) {
    attributes = createAttributes(
      metadataVariable,
      metadataPool,
      options,
      presentation.mode,
    );
  }
  return attributes;
};

const createAttributes = (
  metadataVariable:
    | BFFMetadataCollectionVariable
    | BFFMetadataNumberVariable
    | BFFMetadataTextVariable
    | BFFMetadataRecordLink
    | BFFMetadataGroup,
  metadataPool: any,
  options: unknown[] | undefined,
  variablePresentationMode: 'input' | 'output',
) => {
  return metadataVariable.attributeReferences?.map(
    (attributeReference: BFFAttributeReference) => {
      const refCollectionVar = metadataPool.get(
        attributeReference.refCollectionVarId,
      ) as BFFMetadataCollectionVariable;

      const presentation = createPresentationForCollectionVar(
        'someFakeId',
        refCollectionVar.id,
        variablePresentationMode,
      );
      const { finalValue } = refCollectionVar;
      const commonParameters = createCommonParameters(
        refCollectionVar,
        presentation,
      );
      options = createCollectionVariableOptions(metadataPool, refCollectionVar);
      return removeEmpty({ ...commonParameters, options, finalValue });
    },
  );
};

/**
 * Helper method to create a presentation for collection var.
 *
 * @remarks
 *
 * Used for creating a presentation for attributes since Cora
 * lacks support for this.
 *
 * @param id
 * @param presentationOf
 * @param mode
 */
const createPresentationForCollectionVar = (
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
): FormComponent[] => {
  return presentationChildReferences.map((presentationChildReference) => {
    return createComponentFromChildReference(
      dependencies,
      metadataChildReferences,
      presentationChildReference,
    );
  }) as FormComponent[];
};

export const createHiddenComponentsFromMetadataChildReferences = (
  dependencies: Dependencies,
  metadataChildReferences: BFFMetadataChildReference[],
): FormComponent[] => {
  return metadataChildReferences
    .map((metadataChildReference) => {
      const metadata = dependencies.metadataPool.get(
        metadataChildReference.childId,
      );

      if (metadata.type === 'group') {
        const group = metadata as BFFMetadataGroup;
        const components = createHiddenComponentsFromMetadataChildReferences(
          dependencies,
          group.children,
        );

        if (components.length > 0) {
          return {
            type: 'group',
            name: group.nameInData,
            components,
          } as FormComponentGroup;
        }
      }

      if ('finalValue' in metadata && metadata.finalValue !== undefined) {
        return removeEmpty({
          type: 'hidden',
          name: metadata.nameInData,
          finalValue: metadata.finalValue,
        }) as FormComponentHidden;
      }
    })
    .filter((c) => c !== undefined);
};

const createComponentFromChildReference = (
  dependencies: Dependencies,
  metadataChildReferences: BFFMetadataChildReference[],
  presentationChildReference: BFFPresentationChildReference,
) => {
  const presentationChildType = presentationChildReference.type;

  if (presentationChildType === 'text') {
    return createText(presentationChildReference, presentationChildType);
  }

  if (presentationChildType === 'guiElement') {
    return createGuiElement(
      presentationChildReference,
      dependencies.presentationPool,
    );
  }

  return createFormPartsForGroupOrVariable(
    dependencies,
    metadataChildReferences,
    presentationChildReference,
  );
};

const createFormPartsForGroupOrVariable = (
  dependencies: Dependencies,
  metadataChildReferences: BFFMetadataChildReference[],
  presentationChildReference: BFFPresentationChildReference,
) => {
  const { metadataPool, presentationPool } = dependencies;
  let metadataOverrideId;
  const presentationChildId = presentationChildReference.childId;
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
  return createDetailedPresentationBasedOnPresentationType(
    dependencies,
    metadataChildReferences,
    presentationChildReference,
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
