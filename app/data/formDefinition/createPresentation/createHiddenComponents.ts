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
  FormComponent,
  FormComponentHidden,
} from '@/components/FormGenerator/types';
import { doesMetadataAndPresentationMatch } from '@/data/formDefinition/findMetadataChildReferenceByNameInDataAndAttributes.server';

export const createHiddenComponents = (
  dependencies: Dependencies,
  metadataChildReferences: BFFMetadataChildReference[],
  presentationChildReferences: BFFPresentationChildReference[],
  path: string = '',
): FormComponent[] => {
  return metadataChildReferences
    .map((metadataChildReference) =>
      dependencies.metadataPool.get(metadataChildReference.childId),
    )
    .flatMap((metadata) =>
      createHiddenComponentsForMetadata(
        dependencies,
        metadata,
        presentationChildReferences,
        path,
      ),
    )
    .filter((c) => c !== undefined);
};

const createHiddenComponentsForMetadata = (
  dependencies: Dependencies,
  metadata: BFFMetadata,
  presentationChildReferences: BFFPresentationChildReference[],
  path: string,
) => {
  const currentPath = `${path ? `${path}.` : ''}${metadata.nameInData}`;
  const presentation = getPresentation(
    presentationChildReferences,
    dependencies,
    metadata,
  );

  if (isMetadataGroup(metadata)) {
    return createHiddenComponentsForGroup(
      dependencies,
      metadata,
      presentation as BFFPresentationGroup,
      currentPath,
    );
  }

  return [createHiddenVariable(presentation, metadata, currentPath)];
};

const createHiddenComponentsForGroup = (
  dependencies: Dependencies,
  group: BFFMetadataGroup,
  presentation: BFFPresentationGroup | undefined,
  currentPath: string = '',
) => {
  const components = createHiddenComponents(
    dependencies,
    group.children,
    presentation?.children ?? [],
    currentPath,
  );

  const containsOnlyHidden = components.length === group.children.length;

  if (components.length > 0 && containsOnlyHidden) {
    return components;
  }
};

function createHiddenVariable(
  presentation: BFFPresentation | undefined,
  metadata: BFFMetadata,
  currentPath: string,
): FormComponentHidden | undefined {
  const hasPresentation = presentation !== undefined;
  const isFinalValue =
    'finalValue' in metadata && metadata.finalValue !== undefined;

  if (isFinalValue && !hasPresentation) {
    return {
      type: 'hidden',
      name: currentPath,
      finalValue: metadata.finalValue!,
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
    .filter((ref) => ref.type === 'presentation')
    .map((ref) => dependencies.presentationPool.get(ref.childId))
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
