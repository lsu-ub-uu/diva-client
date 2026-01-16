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
 */

import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import type {
  BFFMetadata,
  BFFMetadataChildReference,
  BFFMetadataGroup,
  BFFPresentation,
  BFFPresentationChildReference,
  BFFPresentationGroup,
} from '@/cora/transform/bffTypes.server';
import type {
  FormAttributeCollection,
  FormComponent,
  FormComponentGroup,
  FormComponentHidden,
  FormComponentRepeat,
} from '@/components/FormGenerator/types';
import { doesMetadataAndPresentationMatch } from '@/data/formDefinition/findMetadataChildReferenceByNameInDataAndAttributes.server';
import { createAttributes } from './createAttributes';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import {
  determineRepeatMax,
  type BFFMetadataTypes,
} from '../formDefinition.server';

export const createHiddenComponents = (
  dependencies: Dependencies,
  metadataChildReferences: BFFMetadataChildReference[],
  presentationChildReferences: BFFPresentationChildReference[],
): FormComponent[] => {
  return metadataChildReferences
    .map((metadataChildReference) =>
      createHiddenComponentsForMetadata(
        dependencies,
        metadataChildReference,
        presentationChildReferences,
      ),
    )
    .filter((c) => c !== undefined);
};

const createHiddenComponentsForMetadata = (
  dependencies: Dependencies,
  metadataChildReference: BFFMetadataChildReference,
  presentationChildReferences: BFFPresentationChildReference[],
): FormComponent | undefined => {
  const metadata = dependencies.metadataPool.get(
    metadataChildReference.childId,
  );

  const presentation = getPresentation(
    presentationChildReferences,
    dependencies,
    metadata,
  );

  const repeat = {
    repeatMin: parseInt(metadataChildReference.repeatMin),
    repeatMax: determineRepeatMax(metadataChildReference.repeatMax),
  };

  const attributes = createAttributes(
    metadata as BFFMetadataTypes,
    dependencies.metadataPool,
    undefined,
    'input',
  );

  if (isMetadataGroup(metadata)) {
    return createHiddenComponentsForGroup(
      dependencies,
      metadata,
      presentation as BFFPresentationGroup,
      attributes,
      repeat,
    );
  }

  const hiddenComponent = createHiddenVariable(
    presentation,
    metadata,
    attributes,
    repeat,
  );
  return hiddenComponent;
};

const createHiddenComponentsForGroup = (
  dependencies: Dependencies,
  group: BFFMetadataGroup,
  presentation: BFFPresentationGroup | undefined,
  attributes: FormAttributeCollection[] | undefined,
  repeat: FormComponentRepeat,
): FormComponent | undefined => {
  const hasPresentation = presentation !== undefined;

  if (!hasPresentation) {
    const components = createHiddenComponents(dependencies, group.children, []);

    if (components.length > 0) {
      const groupComponent = removeEmpty({
        type: 'group',
        name: group.nameInData,
        mode: 'input',
        components,
        attributes,
        repeat,
        hidden: true,
      });
      return groupComponent as FormComponentGroup;
    }
  }
};

function createHiddenVariable(
  presentation: BFFPresentation | undefined,
  metadata: BFFMetadata,
  attributes: FormAttributeCollection[] | undefined,
  repeat: FormComponentRepeat,
): FormComponentHidden | undefined {
  const hasPresentation = presentation !== undefined;
  const isFinalValue =
    'finalValue' in metadata && metadata.finalValue !== undefined;

  if (isFinalValue && !hasPresentation) {
    return {
      type: 'hidden',
      name: metadata.nameInData,
      finalValue: metadata.finalValue!,
      attributes,
      attributesToShow: 'none',
      repeat,
    };
  }
}

const isMetadataGroup = (
  metadata: BFFMetadata,
): metadata is BFFMetadataGroup => {
  return metadata.type === 'group';
};

function getPresentation(
  presentationChildReferences: BFFPresentationChildReference[],
  dependencies: Dependencies,
  metadata: BFFMetadata,
) {
  return presentationChildReferences
    .filter((ref) => ref.refGroups[0].type === 'presentation')
    .map((ref) => dependencies.presentationPool.get(ref.refGroups[0].childId))
    .find(
      (presentation) =>
        'presentationOf' in presentation &&
        doesMetadataAndPresentationMatch(
          dependencies.metadataPool,
          metadata,
          dependencies.metadataPool.get(presentation.presentationOf),
        ),
    );
}
