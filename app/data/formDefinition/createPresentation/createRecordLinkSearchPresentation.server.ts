import type {
  BFFMetadata,
  BFFMetadataChildReference,
  BFFMetadataGroup,
  Dependencies,
} from '@/cora/bffTypes.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';

export interface RecordLinkSearchPresentation {
  searchType: string;
  autocompleteSearchTerm: {
    name: string;
  };
  permissionUnitLinkedRecordIdSearchTerm?: {
    name: string;
  };
}

export const createRecordLinkSearchPresentation = (
  dependencies: Dependencies,
  searchType: string,
): RecordLinkSearchPresentation | undefined => {
  if (!dependencies.searchPool.has(searchType)) {
    return undefined;
  }
  const search = dependencies.searchPool.get(searchType);

  if (!dependencies.metadataPool.has(search.metadataId)) {
    return undefined;
  }
  const metadataGroup = dependencies.metadataPool.get(
    search.metadataId,
  ) as BFFMetadataGroup;

  const includeGroupChildRef = metadataGroup.children[0];

  if (!dependencies.metadataPool.has(includeGroupChildRef.childId)) {
    return undefined;
  }
  const includeGroup = dependencies.metadataPool.get(
    includeGroupChildRef.childId,
  ) as BFFMetadataGroup;

  const includePartGroupChildRef = includeGroup.children[0];
  if (!dependencies.metadataPool.has(includePartGroupChildRef.childId)) {
    return undefined;
  }
  const includePartGroup = dependencies.metadataPool.get(
    includePartGroupChildRef.childId,
  ) as BFFMetadataGroup;

  const autocompleteSearchTermChildRef = includePartGroup.children[0];
  const autocompleteSearchTerm = dependencies.metadataPool.get(
    autocompleteSearchTermChildRef.childId,
  );

  const searchPath = getFieldPathSegment(metadataGroup);
  const includeGroupPath = getFieldPathSegment(
    includeGroup,
    includeGroupChildRef,
  );
  const includePartGroupPath = getFieldPathSegment(
    includePartGroup,
    includePartGroupChildRef,
  );
  const autocompleteSearchTermPath = getFieldPathSegment(
    autocompleteSearchTerm,
    autocompleteSearchTermChildRef,
  );
  const permissionUnitLinkedRecordIdSearchTermPath =
    getPermissionUnitLinkedRecordIdSearchTermPath(
      dependencies,
      includePartGroup,
    );

  return removeEmpty({
    searchType,
    autocompleteSearchTerm: {
      name: `${searchPath}.${includeGroupPath}.${includePartGroupPath}.${autocompleteSearchTermPath}.value`,
    },
    permissionUnitLinkedRecordIdSearchTerm:
      permissionUnitLinkedRecordIdSearchTermPath
        ? {
            name: `${searchPath}.${includeGroupPath}.${includePartGroupPath}.${permissionUnitLinkedRecordIdSearchTermPath}.value`,
          }
        : undefined,
  });
};

const getPermissionUnitLinkedRecordIdSearchTermPath = (
  dependencies: Dependencies,
  includePartGroup: BFFMetadataGroup,
) => {
  const permissionUnitLinkedRecordIdSearchTermData = includePartGroup.children
    .map((childRef) => ({
      childRef,
      metadata: dependencies.metadataPool.get(childRef.childId),
    }))
    .find(
      ({ metadata }) =>
        metadata.nameInData === 'permissionUnitLinkedRecordIdSearchTerm',
    );

  if (!permissionUnitLinkedRecordIdSearchTermData) {
    return undefined;
  }

  return getFieldPathSegment(
    permissionUnitLinkedRecordIdSearchTermData.metadata,
    permissionUnitLinkedRecordIdSearchTermData.childRef,
  );
};

const getFieldPathSegment = (
  metadata: BFFMetadata,
  childRef?: BFFMetadataChildReference,
) => {
  if (childRef?.repeatMin === '0') {
    return `${metadata.nameInData}[0]`;
  }
  return metadata.nameInData;
};
