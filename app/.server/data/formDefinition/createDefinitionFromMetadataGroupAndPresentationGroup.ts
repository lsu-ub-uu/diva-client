import type { Dependencies } from '@/.server/data/formDefinition/formDefinitionsDep';
import type {
  BFFMetadataGroup,
  BFFPresentationGroup,
} from '@/.server/cora/transform/bffTypes';
import type { FormComponentGroup } from '@/components/FormGenerator/types';
import { createBFFMetadataReference } from '@/.server/data/formDefinition/formMetadata';
import { createBFFPresentationReference } from '@/.server/data/formDefinition/formPresentation';
import { createDetailedPresentationBasedOnPresentationType } from '@/.server/data/formDefinition/createPresentation/createDetailedPresentationBasedOnPresentationType';

export const createDefinitionFromMetadataGroupAndPresentationGroup = (
  dependencies: Dependencies,
  metadataGroup: BFFMetadataGroup,
  presentationGroup: BFFPresentationGroup,
): FormComponentGroup => {
  const formRootReference = createBFFMetadataReference(metadataGroup.id);
  const formRootPresentationReference = createBFFPresentationReference(
    presentationGroup.id,
  );

  const form = createDetailedPresentationBasedOnPresentationType(
    dependencies,
    [formRootReference],
    formRootPresentationReference,
    metadataGroup.id,
  );

  if (!form) {
    throw new Error('Failed to create form definition');
  }

  return form;
};
