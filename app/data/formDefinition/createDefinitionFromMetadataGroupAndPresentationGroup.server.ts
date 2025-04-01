import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import type {
  BFFMetadataGroup,
  BFFPresentationGroup,
} from '@/cora/transform/bffTypes.server';
import type { FormComponentGroup } from '@/components/FormGenerator/types';
import { createBFFMetadataReference } from '@/data/formDefinition/formMetadata.server';
import { createBFFPresentationReference } from '@/data/formDefinition/formPresentation.server';
import { createGroupOrComponent } from '@/data/formDefinition/createPresentation/createGroupOrComponent';

export const createDefinitionFromMetadataGroupAndPresentationGroup = (
  dependencies: Dependencies,
  metadataGroup: BFFMetadataGroup,
  presentationGroup: BFFPresentationGroup,
): FormComponentGroup => {
  const formRootReference = createBFFMetadataReference(metadataGroup.id);
  const formRootPresentationReference = createBFFPresentationReference(
    presentationGroup.id,
  );

  const form = createGroupOrComponent(
    dependencies,
    [formRootReference],
    formRootPresentationReference,
    false,
    metadataGroup.id,
  ) as FormComponentGroup;

  if (!form) {
    throw new Error('Failed to create form definition');
  }

  return form;
};
