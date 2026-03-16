import {
  createdByLink,
  dataDividerLink,
  exampleOtherCollectionVarId,
  idTextVar,
  pSomeArchiveNumberTextVar,
  pSomeContainer,
  pSomeEditMetadataGroup,
  pSomeGuiElementLink,
  pSomeLocalIdTextVar,
  pSomeManuscriptContainer,
  pSomeManuscriptGroup,
  pSomeMetadataChildGroup,
  pSomeMetadataChildGroupWithShowHeadlineFalse,
  pSomeMetadataChildGroupWithSpecifiedHeadlineText,
  pSomeMetadataCollectionVariable,
  pSomeMetadataCollectionVariableWithAttribute,
  pSomeMetadataNumberVar,
  pSomeMetadataNumberWithAttributeVar,
  pSomeMetadataRecordLink,
  pSomeMetadataTextVariable,
  pSomeMetadataTextVariable2,
  pSomeMetadataTextVariable3,
  pSomeMetadataTextVariable4,
  pSomeMetadataTextVariable5,
  pSomeMetadataTextVariable6,
  pSomeMetadataTextVariableWithAttributeVar,
  pSomeNewMetadataGroup,
  pSomeNewMetadataGroupForMissingChildId,
  pSomeNewMetadataGroupRepeatingTitleInfoNameInDataGroup,
  pSomeNewRecordLink,
  pSomeOtherMetadataCollectionVariableWithMissingChildId,
  pSomeRepeatingContainer,
  pSomeScopusIdTextVar,
  recordInfoMetadata,
  recordTypeLink,
  someArchiveNumberTextVar,
  someEditMetadataGroup,
  someLocalIdTextVar,
  someMainTitleTextVariable,
  someManuscriptGroup,
  someMetadataChildGroup,
  someMetadataChildGroupWithShowHeadlineFalse,
  someMetadataChildGroupWithSpecifiedHeadlineText,
  someMetadataCollectionItemBlue,
  someMetadataCollectionItemPink,
  someMetadataCollectionItemYellow,
  someMetadataCollectionVariable,
  someMetadataCollectionVariable2,
  someMetadataCollectionVariableWithAttribute,
  someMetadataCollectionWithOtherIdVariable,
  someMetadataItemCollection,
  someMetadataNumberVar,
  someMetadataNumberVarWithAttribute,
  someMetadataNumberVarWithAttributeAndOtherId,
  someMetadataNumberVarWithOtherAttributeId,
  someMetadataNumberVarWithoutAttribute,
  someMetadataRecordLink,
  someMetadataTextVariable,
  someMetadataTextVariable2,
  someMetadataTextVariable3,
  someMetadataTextVariable4,
  someMetadataTextVariable5,
  someMetadataTextVariable6,
  someMetadataTextVariableWithAttributeVar,
  someNewMetadataGroup,
  someNewMetadataGroupFaultyChildReference,
  someNewMetadataGroupForMissingChildId,
  someNewRecordLink,
  someNewSimpleMetadataGroup,
  someRecordInfo,
  someScopusIdTextVar,
  someSimpleValidationTypeData,
  someValidationTypeData,
  someValidationTypeDataFaultyChildReference,
  someValidationTypeForMissingChildIdTypeData,
  tsCreatedTextVar,
  tsUpdatedTextVar,
  updatedByLink,
  updatedGroup,
  validationTypeLink,
} from '@/__mocks__/bff/form/bffMock';
import type {
  BFFLinkedRecordPresentation,
  BFFMetadata,
  BFFMetadataBase,
  BFFMetadataChildReference,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataItemCollection,
  BFFMetadataRecordLink,
  BFFMetadataTextVariable,
  BFFPresentationChildReference,
  BFFPresentationGroup,
  BFFPresentationOfSingleMetadata,
  BFFPresentationRecordLink,
  BFFPresentationSurroundingContainer,
  BFFRecordType,
  BFFValidationType,
  Dependencies,
} from '@/cora/bffTypes.server';
import { listToPool } from 'server/dependencies/util/listToPool';

export const createTextVar = (
  id: string,
  nameInData: string,
  attributeReferenceIds: string[],
  regEx: string = '.*',
): BFFMetadataTextVariable => {
  const metadata: BFFMetadataTextVariable = {
    id,
    nameInData,
    type: 'textVariable',
    textId: 'someTextId',
    defTextId: 'someDefTextId',
    regEx,
  };
  if (attributeReferenceIds.length > 0) {
    const attributeIds = attributeReferenceIds?.map((attrId) => {
      return {
        refCollectionVarId: attrId,
      };
    });
    metadata.attributeReferences = attributeIds;
  }
  return metadata;
};

export const createPresentationVar = (
  id: string,
  presentationOf: string,
  type:
    | 'pGroup'
    | 'pVar'
    | 'pNumVar'
    | 'pCollVar'
    | 'container'
    | 'pRecordLink'
    | 'pResourceLink',
  mode: 'input' | 'output' = 'output',
  inputFormat?: 'password',
): BFFPresentationOfSingleMetadata => {
  const pVar: BFFPresentationOfSingleMetadata = {
    id,
    presentationOf,
    type,
    mode,
    inputFormat,
  };
  return pVar as BFFPresentationOfSingleMetadata;
};

export const createCollItem = (nameInData: string): BFFMetadataBase => {
  const metadata: BFFMetadataBase = {
    id: `${nameInData}Item`,
    nameInData,
    type: 'collectionItem',
    textId: 'someTextId',
    defTextId: 'someDefTextId',
  };

  return metadata;
};

export const createItemCollection = (
  id: string,
  nameInData: string,
  itemIds: string[],
): BFFMetadataItemCollection => {
  const metadata: BFFMetadataItemCollection = {
    id,
    nameInData,
    type: 'itemCollection',
    textId: 'someTextId',
    defTextId: 'someDefTextId',
    collectionItemReferences: [],
  };
  const collectionItemReferences = itemIds?.map((itemId) => {
    return {
      refCollectionItemId: itemId,
    };
  });
  metadata.collectionItemReferences = collectionItemReferences;

  return metadata;
};

export const createCollVar = (
  id: string,
  nameInData: string,
  values: string[],
  attributeReferenceIds: string[],
): BFFMetadata[] => {
  const collectionVariable: BFFMetadataCollectionVariable = {
    id,
    nameInData,
    type: 'collectionVariable',
    textId: 'someTextId',
    defTextId: 'someDefTextId',
    refCollection: `${id}Collection`,
  };

  if (attributeReferenceIds.length > 0) {
    const attributeIds = attributeReferenceIds?.map((attrId) => {
      return {
        refCollectionVarId: attrId,
      };
    });
    collectionVariable.attributeReferences = attributeIds;
  }

  const itemIds = values.map((value: string) => `${value}Item`);
  const itemCollection = createItemCollection(
    `${id}Collection`,
    'someNameInData',
    itemIds,
  );

  const collectionItems = values.map((value: string) => createCollItem(value));

  return [collectionVariable, itemCollection, ...collectionItems];
};

export const createCollVarFinal = (
  id: string,
  nameInData: string,
  finalValue: string,
  attributeReferenceIds: string[],
): BFFMetadataCollectionVariable => {
  const metadata: BFFMetadataCollectionVariable = {
    id,
    nameInData,
    type: 'collectionVariable',
    textId: 'someTextId',
    defTextId: 'someDefTextId',
    refCollection: `${id}Collection`,
    finalValue,
  };

  if (attributeReferenceIds.length > 0) {
    const attributeIds = attributeReferenceIds?.map((attrId) => {
      return {
        refCollectionVarId: attrId,
      };
    });
    metadata.attributeReferences = attributeIds;
  }

  return metadata;
};

export const createChildReferences = (
  childrenIds: string[],
): BFFMetadataChildReference[] => {
  return childrenIds.map((childId) => {
    return {
      childId,
      repeatMin: '1',
      repeatMax: '1',
    };
  });
};

export const createRecordType = (id: string): BFFRecordType => {
  const metadata: BFFRecordType = {
    id,
    metadataId: `${id}OutputGroup`,
    presentationViewId: `${id}OutputPGroup`,
    listPresentationViewId: `${id}ListPGroup`,
    textId: 'someText',
    pluralTextId: 'somePluralText',
    defTextId: 'someDefText',
    groupOfRecordType: [],
    recordTypeCategory: [],
    useTrashBin: false,
  };

  return metadata;
};

export const createGroup = (
  id: string,
  nameInData: string,
  children: string[],
): BFFMetadataGroup => {
  const metadata: BFFMetadataGroup = {
    id,
    nameInData,
    type: 'group',
    textId: 'someTextId',
    defTextId: 'someDefTextId',
    children: [],
  };

  metadata.children = createChildReferences(children);
  return metadata;
};

export const createValidationType = (id: string): BFFValidationType => {
  const metadata = {
    id,
    validatesRecordTypeId: id,
    newMetadataGroupId: `some${id}MetadataGroupId`,
    newPresentationGroupId: `pSome${id}NewMetadataGroupId`,
    // Update/Edit
    metadataGroupId: `some${id}EditMetadataGroupId`,
    presentationGroupId: `pSome${id}EditMetadataGroupId`,
    nameTextId: `some${id}TextId`,
    defTextId: `some${id}DefTextId`,
  };

  return metadata;
};

export const createPresentationGroup = (
  id: string,
  presentationOf: string,
  children: BFFPresentationChildReference[],
  mode: 'input' | 'output' = 'output',
): BFFPresentationGroup => {
  const pGroup = {
    id,
    type: 'pGroup',
    presentationOf,
    mode,
    children,
  } as BFFPresentationGroup;
  return pGroup;
};

export const createRecordLink = (
  id: string,
  linkedRecordType: string,
): BFFMetadataRecordLink => {
  const metadata = {
    id,
    nameInData: `some${id}recordLink`,
    type: 'recordLink',
    textId: `some${id}TextId`,
    defTextId: `some${id}DefTextId`,
    linkedRecordType,
  } as BFFMetadataRecordLink;
  return metadata;
};

export const createPresentationRecordLink = (
  id: string,
  presentedRecordType: string,
  presentationId: string,
  presentAs?: BFFPresentationRecordLink['presentAs'],
): BFFPresentationRecordLink => {
  const linkedRecordPresentations: BFFLinkedRecordPresentation[] = [
    {
      presentedRecordType,
      presentationId,
    },
  ];
  const pLink = {
    id,
    type: 'pRecordLink',
    mode: 'output',
    presentationOf: id,
    linkedRecordPresentations,
    presentAs,
  } as BFFPresentationRecordLink;

  return pLink;
};
export const createPresentationSContainer = (
  id: string,
  presentationsOf: string[],
  children: BFFPresentationChildReference[],
): BFFPresentationSurroundingContainer => {
  const container = {
    id,
    type: 'container',
    presentationsOf,
    mode: 'output',
    children,
    repeat: 'children',
  } as BFFPresentationSurroundingContainer;

  return container;
};

export const createBasicDependencies = (): Dependencies => {
  return {
    validationTypePool: listToPool<BFFValidationType>([
      someValidationTypeData,
      someValidationTypeDataFaultyChildReference,
      someSimpleValidationTypeData,
      someValidationTypeForMissingChildIdTypeData,
    ]),
    metadataPool: listToPool<BFFMetadata>([
      someMetadataTextVariable,
      someMetadataTextVariable2,
      someMetadataTextVariable3,
      someMetadataTextVariable4,
      someMetadataTextVariable5,
      someMetadataTextVariable6,
      someMetadataNumberVar,
      someNewMetadataGroup,
      someRecordInfo,
      someNewMetadataGroupFaultyChildReference,
      someMetadataCollectionVariable,
      someMetadataItemCollection,
      someMetadataCollectionItemBlue,
      someMetadataCollectionItemPink,
      someMetadataCollectionItemYellow,
      someMetadataCollectionVariableWithAttribute,
      someMetadataNumberVarWithAttribute,
      someMetadataTextVariableWithAttributeVar,
      someMetadataChildGroup,
      someMetadataRecordLink,
      someMetadataChildGroupWithSpecifiedHeadlineText,
      someMetadataChildGroupWithShowHeadlineFalse,
      someNewSimpleMetadataGroup,
      someEditMetadataGroup,
      someArchiveNumberTextVar,
      someManuscriptGroup,
      someLocalIdTextVar,
      someScopusIdTextVar,
      someNewMetadataGroupForMissingChildId,
      exampleOtherCollectionVarId,
      someMainTitleTextVariable,
      someMetadataNumberVarWithoutAttribute,
      someMetadataNumberVarWithAttributeAndOtherId,
      someMetadataNumberVarWithOtherAttributeId,
      someMetadataCollectionWithOtherIdVariable,
      someMetadataCollectionVariable2,
      someNewRecordLink,
      recordInfoMetadata,
      createdByLink,
      dataDividerLink,
      idTextVar,
      tsCreatedTextVar,
      recordTypeLink,
      updatedGroup,
      updatedByLink,
      tsUpdatedTextVar,
      validationTypeLink,
    ]),
    presentationPool: listToPool([
      pSomeMetadataTextVariable,
      pSomeMetadataTextVariable2,
      pSomeMetadataTextVariable3,
      pSomeMetadataTextVariable4,
      pSomeMetadataTextVariable5,
      pSomeMetadataTextVariable6,
      pSomeMetadataNumberVar,
      pSomeNewMetadataGroup,
      pSomeMetadataCollectionVariable,
      pSomeMetadataCollectionVariableWithAttribute,
      pSomeMetadataNumberWithAttributeVar,
      pSomeMetadataTextVariableWithAttributeVar,
      pSomeMetadataChildGroup,
      pSomeMetadataRecordLink,
      pSomeContainer,
      pSomeGuiElementLink,
      pSomeRepeatingContainer,
      pSomeMetadataChildGroupWithSpecifiedHeadlineText,
      pSomeMetadataChildGroupWithShowHeadlineFalse,
      pSomeEditMetadataGroup,
      pSomeManuscriptGroup,
      pSomeManuscriptContainer,
      pSomeArchiveNumberTextVar,
      pSomeLocalIdTextVar,
      pSomeScopusIdTextVar,
      pSomeNewMetadataGroupForMissingChildId,
      pSomeOtherMetadataCollectionVariableWithMissingChildId,
      pSomeNewRecordLink,
      pSomeNewMetadataGroupRepeatingTitleInfoNameInDataGroup,
    ]),
    searchPool: listToPool([]),
    textPool: listToPool([]),
    recordTypePool: listToPool([]),
    loginUnitPool: listToPool([]),
    loginPool: listToPool([]),
    memberPool: listToPool([]),
    organisationPool: listToPool([]),
  };
};
