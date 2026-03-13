import type { FormComponent } from '@/components/FormGenerator/types';
import type {
  BFFMetadataChildReference,
  BFFPresentationChildReference,
  BFFPresentationChildRefGroup,
  BFFPresentationContainer,
  BFFPresentationOfSingleMetadata,
  Dependencies,
} from '@/cora/bffTypes.server';
import { createHiddenComponents } from './createHiddenComponents.server';
import { createText } from './createText.server';
import { createGuiElement } from './createGuiElement.server';
import { createContainer } from './createContainer.server';
import { createPresentationComponent } from './createPresentationComponent';
import { createRepeat } from './createRepeat.server';
import { findMetadataChildReferenceByNameInDataAndAttributes } from '../utils/findMetadataChildReferenceByNameInDataAndAttributes.server';

export const createChildComponents = (
  dependencies: Dependencies,
  metadataChildReferences: BFFMetadataChildReference[],
  presentationChildReferences: BFFPresentationChildReference[],
): FormComponent[] => {
  const components = presentationChildReferences
    .map((presentationChildReference) => {
      const [mainRefGroup, alternativeRefGroup] =
        presentationChildReference.refGroups;

      const childComponent = createChildComponent(
        dependencies,
        metadataChildReferences,
        presentationChildReference,
        mainRefGroup,
      );

      if (childComponent && alternativeRefGroup) {
        childComponent.alternativePresentation = createChildComponent(
          dependencies,
          metadataChildReferences,
          presentationChildReference,
          alternativeRefGroup,
        );
      }
      return childComponent;
    })
    .filter(
      (component): component is NonNullable<typeof component> =>
        component !== undefined,
    );

  const hiddenComponents = createHiddenComponents(
    dependencies,
    metadataChildReferences,
    presentationChildReferences,
  );

  return [...components, ...hiddenComponents];
};

const createChildComponent = (
  dependencies: Dependencies,
  metadataChildReferences: BFFMetadataChildReference[],
  presentationChildReference: BFFPresentationChildReference,
  refGroup: BFFPresentationChildRefGroup,
) => {
  if (refGroup.type === 'text') {
    return createText(presentationChildReference, refGroup);
  }

  if (refGroup.type === 'guiElement') {
    return createGuiElement(
      presentationChildReference,
      dependencies.presentationPool,
      refGroup,
    );
  }

  if (refGroup.type === 'presentation') {
    const presentation = dependencies.presentationPool.get(refGroup.childId) as
      | BFFPresentationOfSingleMetadata
      | BFFPresentationContainer;

    if (presentation.type === 'container') {
      return createContainer(
        dependencies,
        metadataChildReferences,
        presentation as BFFPresentationContainer,
        presentationChildReference,
      );
    }

    const metadataChildRef = findMatchingMetadataChildRef(
      dependencies,
      presentation,
      metadataChildReferences,
    );

    if (!metadataChildRef) {
      // Presentation child does not have matching metadata and is ignored.
      return undefined;
    }

    return createPresentationComponent(
      dependencies,
      metadataChildRef.childId,
      presentation.id,
      presentationChildReference,
      createRepeat(presentationChildReference, metadataChildRef),
    );
  }
};

const findMatchingMetadataChildRef = (
  dependencies: Dependencies,
  presentation: BFFPresentationOfSingleMetadata,
  metadataChildReferences: BFFMetadataChildReference[],
) => {
  const metadataMatchingById = metadataChildReferences.find(
    (metadataChildReference) =>
      metadataChildReference.childId === presentation.presentationOf,
  );
  if (metadataMatchingById) {
    return metadataMatchingById;
  }

  const metadataFromPresentation = dependencies.metadataPool.get(
    presentation.presentationOf,
  );

  return findMetadataChildReferenceByNameInDataAndAttributes(
    dependencies.metadataPool,
    metadataChildReferences,
    metadataFromPresentation,
  );
};
