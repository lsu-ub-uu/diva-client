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

import type { Dependencies } from '@/.server/data/formDefinition/formDefinitionsDep';
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
  BFFPresentationRecordLink,
  BFFPresentationSurroundingContainer,
} from '@/.server/cora/transform/bffTypes';
import type {
  FormComponent,
  FormComponentCollVar,
  FormComponentGroup,
  FormComponentNumVar,
  FormComponentTextVar,
} from '@/components/FormGenerator/types';
import {
  convertChildStylesToGridColSpan,
  convertChildStylesToShortName,
  convertStylesToShortName,
} from '@/.server/cora/cora-data/CoraDataUtilsPresentations';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import {
  type BFFMetadataTypes,
  determineRepeatMax,
} from '@/.server/data/formDefinition/formDefinition';
import { createCommonParameters } from '@/.server/data/formDefinition/createCommonParameters';
import type { Lookup } from '@/utils/structs/lookup';
import { createGuiElement } from '@/.server/data/formDefinition/createPresentation/createGuiElement';
import { createText } from '@/.server/data/formDefinition/createPresentation/createText';
import { findMetadataChildReferenceByNameInDataAndAttributes } from '@/.server/data/formDefinition/findMetadataChildReferenceByNameInDataAndAttributes';
import { createTextVar } from '@/.server/data/formDefinition/createPresentation/createTextVar';
import { createNumVar } from '@/.server/data/formDefinition/createPresentation/createNumVar';
import { createCollVar } from '@/.server/data/formDefinition/createPresentation/createCollVar';

export const createDetailedPresentationBasedOnPresentationType = (
  dependencies: Dependencies,
  metadataChildReferences: BFFMetadataChildReference[],
  presentationChildReference: BFFPresentationChildReference,
  metadataOverrideId?: string,
): FormComponentGroup | FormComponent | undefined => {
  const { metadataPool, presentationPool } = dependencies;

  let options;
  let finalValue;
  let attributes;
  let components;
  let containerType;
  let presentationStyle;
  let metadataId;
  let metaDataChildRef;
  let repeat;
  let metadata;
  let commonParameters;
  let recordLinkType;
  let presentationRecordLinkId;
  let search;
  let linkedRecordPresentation;
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
    metadataId = metadataOverrideId ?? presentation.presentationOf;
    const metadataFormPresentation = metadataPool.get(
      metadataOverrideId ?? presentation.presentationOf,
    );
    metaDataChildRef = findMetadataChildReferenceByNameInDataAndAttributes(
      metadataPool,
      metadataChildReferences,
      metadataFormPresentation,
    );
    if (!metaDataChildRef) {
      return;
    }
    metadata = metadataPool.get(metaDataChildRef.childId);

    repeat = createRepeat(presentationChildReference, metaDataChildRef);
    commonParameters = createCommonParameters(metadata, presentation);
  }

  if (presentation.type === 'pVar') {
    const textVariable = metadata as BFFMetadataTextVariable;
    const createdTextVar = createTextVar(
      metadataPool,
      textVariable,
      presentation,
    );

    return {
      repeat,
      childStyle,
      gridColSpan,
      ...createdTextVar,
    } as FormComponentTextVar;
  }

  if (presentation.type === 'pNumVar') {
    const numberVariable = metadata as BFFMetadataNumberVariable;
    const createdNumVar = createNumVar(
      metadataPool,
      numberVariable,
      presentation,
    );
    return {
      repeat,
      childStyle,
      gridColSpan,
      ...createdNumVar,
    } as FormComponentNumVar;
  }

  if (presentation.type === 'pCollVar') {
    const collectionVariable = metadata as BFFMetadataCollectionVariable;
    const createdCollVar = createCollVar(
      metadataPool,
      collectionVariable,
      presentation,
    );
    return {
      repeat,
      childStyle,
      gridColSpan,
      ...createdCollVar,
    } as FormComponentCollVar;
  }

  if (presentation.type === 'pRecordLink') {
    const recordLink = metadata as BFFMetadataRecordLink;
    recordLinkType = recordLink.linkedRecordType;
    const presentationRecordLink = presentation as BFFPresentationRecordLink;
    if (presentationRecordLink.search !== undefined) {
      search = presentationRecordLink.search;
    }
    if (presentationRecordLink.linkedRecordPresentations !== undefined) {
      linkedRecordPresentation =
        presentationRecordLink.linkedRecordPresentations[0];
    }
    presentationRecordLinkId = presentation.id;

    attributes = checkForAttributes(
      recordLink,
      metadataPool,
      options,
      presentation,
    );
  }

  if (presentation.type === 'container') {
    const presentationContainer = presentation as BFFPresentationContainer;
    const name = presentation.id; // container does not have a nameInData so use id instead.
    const { type, mode } = presentation;
    containerType = getContainerType(presentationContainer);
    presentationStyle = convertStylesToShortName(
      presentationContainer.presentationStyle ?? '',
    );

    let definitionFilteredChildRefs: BFFMetadataChildReference[] = [];

    if (containerType === 'surrounding') {
      const presentationMetadataIds =
        (presentationContainer as BFFPresentationSurroundingContainer)
          .presentationsOf ?? [];
      definitionFilteredChildRefs = metadataChildReferences.filter(
        (definitionChildRef) => {
          if (
            checkIfPresentationIncludesMetadataId(
              presentationMetadataIds,
              definitionChildRef,
            )
          ) {
            return true;
          }

          return matchPresentationWithMetadata(
            metadataPool,
            presentationMetadataIds,
            definitionChildRef,
          );
        },
      );
    } else if (containerType === 'repeating') {
      metadataId = presentationContainer.presentationOf;
      metaDataChildRef = findMetadataChildReferenceById(
        metadataId,
        metadataChildReferences,
      );
      definitionFilteredChildRefs = [metaDataChildRef];
    }

    commonParameters = { type, name, mode };
    components = createComponentsFromChildReferences(
      dependencies,
      definitionFilteredChildRefs,
      presentationContainer.children,
    );
  }

  if (presentation.type === 'pGroup') {
    const group = metadata as BFFMetadataGroup;
    const presentationGroup = presentationPool.get(
      presentation.id,
    ) as BFFPresentationGroup;
    presentationStyle = convertStylesToShortName(
      presentationGroup.presentationStyle ?? '',
    );
    attributes = checkForAttributes(group, metadataPool, options, presentation);

    components = createComponentsFromChildReferences(
      dependencies,
      group.children,
      presentationGroup.children,
    );
  }

  return removeEmpty({
    ...commonParameters,
    repeat,
    options,
    attributes,
    components,
    presentationStyle,
    containerType,
    childStyle,
    gridColSpan,
    recordLinkType,
    presentationRecordLinkId,
    search,
    linkedRecordPresentation,
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

  return { minNumberOfRepeatingToShow, repeatMin, repeatMax };
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

const getContainerType = (presentationContainer: BFFPresentationContainer) => {
  return presentationContainer.repeat === 'children'
    ? 'surrounding'
    : 'repeating';
};

const checkIfPresentationIncludesMetadataId = (
  presentationMetadataIds: string[],
  definitionChildRef: BFFMetadataChildReference,
) => {
  return presentationMetadataIds.includes(definitionChildRef.childId);
};

const matchPresentationWithMetadata = (
  metadataPool: Lookup<string, BFFMetadataBase>,
  presentationMetadataIds: string[],
  definitionChildRef: BFFMetadataChildReference,
) => {
  const metadataFromCurrentPresentation = metadataPool.get(
    presentationMetadataIds[0],
  );

  return findMetadataChildReferenceByNameInDataAndAttributes(
    metadataPool,
    [definitionChildRef],
    metadataFromCurrentPresentation,
  );
};

const findMetadataChildReferenceById = (
  childId: string,
  metadataChildReferences: BFFMetadataChildReference[],
) => {
  const metaDataChildRef = metadataChildReferences.find(
    (reference) => reference.childId === childId,
  );
  if (metaDataChildRef === undefined) {
    throw new Error(`Child reference with childId [${childId}] does not exist`);
  }
  return metaDataChildRef;
};

const createComponentsFromChildReferences = (
  dependencies: Dependencies,
  metadataChildReferences: BFFMetadataChildReference[],
  presentationChildReferences: BFFPresentationChildReference[],
): unknown => {
  return presentationChildReferences.map((presentationChildReference) => {
    return createComponentFromChildReference(
      dependencies,
      metadataChildReferences,
      presentationChildReference,
    );
  });
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
