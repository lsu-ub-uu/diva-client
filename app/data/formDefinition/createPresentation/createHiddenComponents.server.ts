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

import type {
  FormAttributeCollection,
  FormComponent,
  FormComponentGroup,
  FormComponentHidden,
  FormComponentRepeat,
} from '@/components/FormGenerator/types';
import type {
  BFFMetadata,
  BFFMetadataChildReference,
  BFFMetadataGroup,
  BFFPresentation,
  BFFPresentationChildReference,
  Dependencies,
} from '@/cora/bffTypes.server';
import { doesMetadataAndPresentationMatch } from '@/data/formDefinition/utils/findMetadataChildReferenceByNameInDataAndAttributes.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import {
  determineRepeatMax,
  type BFFMetadataTypes,
} from '../utils/formDefinitionUtils.server';
import { createAttributes } from './createAttributes';

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

  if (hasPresentation(presentationChildReferences, dependencies, metadata)) {
    return undefined;
  }

  const repeat = {
    repeatMin: parseInt(metadataChildReference.repeatMin),
    repeatMax: determineRepeatMax(metadataChildReference.repeatMax),
  };

  const attributes = createAttributes(
    metadata as BFFMetadataTypes,
    dependencies.metadataPool,
    { mode: 'input' } as BFFPresentation,
  );

  if (isMetadataGroup(metadata)) {
    return createHiddenComponentsForGroup(
      dependencies,
      metadata,
      attributes,
      repeat,
    );
  }

  return createHiddenComponentForVariable(metadata, attributes, repeat);
};

const createHiddenComponentsForGroup = (
  dependencies: Dependencies,
  group: BFFMetadataGroup,
  attributes: FormAttributeCollection[] | undefined,
  repeat: FormComponentRepeat,
): FormComponentGroup | undefined => {
  const components = createHiddenComponents(dependencies, group.children, []);

  if (components.length > 0) {
    return removeEmpty({
      type: 'group',
      name: group.nameInData,
      mode: 'input',
      components,
      attributes,
      repeat,
      hidden: true,
      label: '',
      showLabel: false,
    });
  }
  return undefined;
};

function createHiddenComponentForVariable(
  metadata: BFFMetadata,
  attributes: FormAttributeCollection[] | undefined,
  repeat: FormComponentRepeat,
): FormComponentHidden | undefined {
  if ('finalValue' in metadata && metadata.finalValue !== undefined) {
    return {
      type: 'hidden',
      name: metadata.nameInData,
      finalValue: metadata.finalValue,
      attributes,
      attributesToShow: 'none',
      repeat,
    };
  }
  return undefined;
}

const isMetadataGroup = (
  metadata: BFFMetadata,
): metadata is BFFMetadataGroup => {
  return metadata.type === 'group';
};

const hasPresentation = (
  presentationChildReferences: BFFPresentationChildReference[],
  dependencies: Dependencies,
  metadata: BFFMetadata,
) => {
  return presentationChildReferences
    .filter((ref) => ref.refGroups[0].type === 'presentation')
    .map((ref) => dependencies.presentationPool.get(ref.refGroups[0].childId))
    .some((presentation) =>
      isMetadataPresentedByPresentation(metadata, presentation!, dependencies),
    );
};

const isMetadataPresentedByPresentation = (
  metadata: BFFMetadata,
  presentation: BFFPresentation,
  dependencies: Dependencies,
) => {
  if ('presentationsOf' in presentation) {
    return presentation.presentationsOf?.some((presentationMetadataId) => {
      return doesMetadataAndPresentationMatch(
        dependencies.metadataPool,
        metadata,
        dependencies.metadataPool.get(presentationMetadataId)!,
      );
    });
  }

  return (
    'presentationOf' in presentation &&
    doesMetadataAndPresentationMatch(
      dependencies.metadataPool,
      metadata,
      dependencies.metadataPool.get(presentation.presentationOf),
    )
  );
};
