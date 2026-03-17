import type { FormComponent } from '@/components/FormGenerator/types';
import type {
  BFFMetadataChildReference,
  BFFPresentationChildReference,
  BFFPresentationChildRefGroup,
  BFFPresentationContainer,
  BFFPresentationOfSingleMetadata,
  Dependencies,
} from '@/cora/bffTypes.server';
import { findMetadataChildReferenceByNameInDataAndAttributes } from '../utils/findMetadataChildReferenceByNameInDataAndAttributes.server';
import { createContainer } from './createContainer.server';
import { createGuiElement } from './createGuiElement.server';
import { createPresentationComponent } from './createPresentationComponent';
import { createRepeat } from './createRepeat.server';
import { createText } from './createText.server';

export const createChildComponents = (
  dependencies: Dependencies,
  metadataChildReferences: BFFMetadataChildReference[],
  presentationChildReferences: BFFPresentationChildReference[],
): FormComponent[] => {
  const components = presentationChildReferences.flatMap(
    (presentationChildReference) => {
      const [mainRefGroup, alternativeRefGroup] =
        presentationChildReference.refGroups;

      const childComponents = createChildComponentsForPresentationChildRef(
        dependencies,
        metadataChildReferences,
        presentationChildReference,
        mainRefGroup,
      );

      if (childComponents && alternativeRefGroup) {
        childComponents.forEach((childComponent) => {
          childComponent.alternativePresentation =
            createChildComponentsForPresentationChildRef(
              dependencies,
              metadataChildReferences,
              presentationChildReference,
              alternativeRefGroup,
            )[0];
        });
      }
      return childComponents;
    },
  );

  return components;
};

const createChildComponentsForPresentationChildRef = (
  dependencies: Dependencies,
  metadataChildReferences: BFFMetadataChildReference[],
  presentationChildReference: BFFPresentationChildReference,
  refGroup: BFFPresentationChildRefGroup,
): FormComponent[] => {
  if (refGroup.type === 'text') {
    return [createText(presentationChildReference, refGroup)];
  }

  if (refGroup.type === 'guiElement') {
    return [
      createGuiElement(
        presentationChildReference,
        dependencies.presentationPool,
        refGroup,
      ),
    ];
  }

  if (refGroup.type === 'presentation') {
    const presentation = dependencies.presentationPool.get(refGroup.childId) as
      | BFFPresentationOfSingleMetadata
      | BFFPresentationContainer;

    if (presentation.type === 'container') {
      const container = createContainer(
        dependencies,
        metadataChildReferences,
        presentation as BFFPresentationContainer,
        presentationChildReference,
      );

      if (!container) {
        return [];
      }

      return [container];
    }

    const metadataChildRefs = findMatchingMetadataChildRefs(
      dependencies,
      presentation,
      metadataChildReferences,
    );

    if (!metadataChildRefs || metadataChildRefs.length === 0) {
      // Presentation child does not have matching metadata and is ignored.
      return [];
    }

    return metadataChildRefs
      .map((metadataChildRef) =>
        createPresentationComponent(
          dependencies,
          metadataChildRef.childId,
          presentation.id,
          presentationChildReference,
          createRepeat(presentationChildReference, metadataChildRef),
        ),
      )
      .filter(
        (component): component is NonNullable<typeof component> =>
          component !== undefined,
      );
  }

  return [];
};

const findMatchingMetadataChildRefs = (
  dependencies: Dependencies,
  presentation: BFFPresentationOfSingleMetadata,
  metadataChildReferences: BFFMetadataChildReference[],
) => {
  const metadataFromPresentation = dependencies.metadataPool.get(
    presentation.presentationOf,
  );

  return findMetadataChildReferenceByNameInDataAndAttributes(
    dependencies.metadataPool,
    metadataChildReferences,
    metadataFromPresentation,
  );
};
