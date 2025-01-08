import type { Dependencies } from '@/.server/data/formDefinition/formDefinitionsDep';
import type { RecordFormSchema } from '@/components/FormGenerator/types';
import type {
  BFFMetadataGroup,
  BFFPresentationGroup,
  BFFRecordType,
  BFFValidationType,
} from '@/.server/cora/transform/bffTypes';

import { createDefinitionFromMetadataGroupAndPresentationGroup } from '@/.server/data/formDefinition/createDefinitionFromMetadataGroupAndPresentationGroup';

/**
 * Creates a complete form definition
 *
 * @remarks
 *
 * Creates the form definition used by the form generator
 * based on validationTypes in Cora.
 *
 * @param dependencies
 * @param validationTypeId
 * @param mode
 */
export const createFormDefinition = (
  dependencies: Dependencies,
  validationTypeId: string,
  mode: 'create' | 'update' | 'view' | 'list',
): RecordFormSchema => {
  switch (mode) {
    case 'create':
      return {
        validationTypeId,
        form: createFormDefinitionForCreate(dependencies, validationTypeId),
      };

    case 'update':
      return {
        validationTypeId,
        form: createFormDefinitionForUpdate(dependencies, validationTypeId),
      };
    case 'list':
      return {
        validationTypeId,
        form: createFormDefinitionForList(dependencies, validationTypeId),
      };

    default:
      return {
        validationTypeId,
        form: createFormDefinitionForView(dependencies, validationTypeId),
      };
  }
};

const createFormDefinitionForCreate = (
  dependencies: Dependencies,
  validationTypeId: string,
) => {
  const metadataKey = 'newMetadataGroupId';
  const presentationKey = 'newPresentationGroupId';

  return createFormDefinitionFromValidationTypeUsingKeys(
    dependencies,
    validationTypeId,
    metadataKey,
    presentationKey,
  );
};

const createFormDefinitionForUpdate = (
  dependencies: Dependencies,
  validationTypeId: string,
) => {
  const metadataKey = 'metadataGroupId';
  const presentationKey = 'presentationGroupId';

  return createFormDefinitionFromValidationTypeUsingKeys(
    dependencies,
    validationTypeId,
    metadataKey,
    presentationKey,
  );
};

const createFormDefinitionForList = (
  dependencies: Dependencies,
  validationTypeId: string,
) => {
  const presentationKey = 'listPresentationViewId';

  return createFormDefinitionFromRecordTypeUsingKey(
    dependencies,
    validationTypeId,
    presentationKey,
  );
};

const createFormDefinitionForView = (
  dependencies: Dependencies,
  validationTypeId: string,
) => {
  const presentationKey = 'presentationViewId';

  return createFormDefinitionFromRecordTypeUsingKey(
    dependencies,
    validationTypeId,
    presentationKey,
  );
};

const createFormDefinitionFromValidationTypeUsingKeys = (
  dependencies: Dependencies,
  validationTypeId: string,
  metadataKey: keyof BFFValidationType,
  presentationKey: keyof BFFValidationType,
) => {
  const { validationTypePool, metadataPool, presentationPool } = dependencies;
  const validationType = validationTypePool.get(validationTypeId);

  const metadataId = validationType[metadataKey];
  const metadataGroup = metadataPool.get(metadataId) as BFFMetadataGroup;
  const presentationId = validationType[presentationKey];
  const presentationGroup = presentationPool.get(
    presentationId,
  ) as BFFPresentationGroup;
  return createDefinitionFromMetadataGroupAndPresentationGroup(
    dependencies,
    metadataGroup,
    presentationGroup,
  );
};

const createFormDefinitionFromRecordTypeUsingKey = (
  dependencies: Dependencies,
  validationTypeId: string,
  presentationKey: keyof BFFRecordType,
) => {
  const { validationTypePool, metadataPool, presentationPool, recordTypePool } =
    dependencies;
  const validationType = validationTypePool.get(validationTypeId);

  const recordType = recordTypePool.get(validationType.validatesRecordTypeId);
  const metadataGroup = metadataPool.get(
    recordType.metadataId,
  ) as BFFMetadataGroup;
  const presentationId = recordType[presentationKey] as string;
  const presentationGroup = presentationPool.get(
    presentationId,
  ) as BFFPresentationGroup;
  return createDefinitionFromMetadataGroupAndPresentationGroup(
    dependencies,
    metadataGroup,
    presentationGroup,
  );
};
