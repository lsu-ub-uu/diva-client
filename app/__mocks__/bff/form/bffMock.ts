import type {
  BFFGuiElement,
  BFFMetadataBase,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataItemCollection,
  BFFMetadataNumberVariable,
  BFFMetadataRecordLink,
  BFFMetadataTextVariable,
  BFFPresentationBase,
  BFFPresentationContainer,
  BFFPresentationGroup,
  BFFPresentationRecordLink,
  BFFPresentationSurroundingContainer,
  BFFPresentationTextVar,
  BFFRecordType,
  BFFValidationType,
} from '@/cora/transform/bffTypes.server';

export const someValidationTypeData: BFFValidationType = {
  id: 'someValidationTypeId',
  validatesRecordTypeId: 'record123',
  // New
  newMetadataGroupId: 'someNewMetadataGroupId',
  newPresentationGroupId: 'pSomeNewMetadataGroupId',
  // Update/Edit
  metadataGroupId: 'someEditMetadataGroupId',
  presentationGroupId: 'pSomeEditMetadataGroupId',
  nameTextId: 'name123',
  defTextId: 'defName456',
};

export const someValidationTypeForMissingChildIdTypeData: BFFValidationType = {
  id: 'someValidationTypeForMissingChildIdTypeId',
  validatesRecordTypeId: 'record123',
  // New
  newMetadataGroupId: 'someNewMetadataGroupForMissingChildIdId',
  newPresentationGroupId: 'pSomeNewMetadataGroupForMissingChildIdId',
  // Update/Edit
  metadataGroupId: 'someEditMetadataGroupForMissingChildIdId',
  presentationGroupId: 'pSomeEditMetadataGroupForMissingChildIdId',
  nameTextId: 'name123',
  defTextId: 'defName456',
};

export const someNewMetadataGroupForMissingChildId: BFFMetadataGroup = {
  id: 'someNewMetadataGroupForMissingChildIdId',
  nameInData: 'divaOutput',
  type: 'group',
  textId: '',
  defTextId: '',
  children: [
    { childId: 'recordInfo', repeatMin: '1', repeatMax: '1' },
    {
      childId: 'mainTitle',
      repeatMin: '0',
      repeatMax: '1',
    },
    {
      childId: 'exampleCollectionVarId',
      repeatMin: '0',
      repeatMax: '1',
    },
  ],
};

export const pSomeNewMetadataGroupForMissingChildId: BFFPresentationGroup = {
  id: 'pSomeNewMetadataGroupForMissingChildIdId',
  type: 'pGroup',
  presentationOf: 'someNewMetadataGroupForMissingChildIdId', // metadata
  mode: 'input',

  children: [
    {
      refGroups: [
        {
          childId: 'pSomeOtherMetadataCollectionVariableWithMissingChildIdId',
          type: 'presentation',
        },
      ],
      childStyle: ['twelveChildStyle'],
    }, // pSomeMetadataCollectionVariableId
  ],
};

export const someManuscriptRecordType: BFFRecordType = {
  id: 'manuscriptRecordTypeId',
  metadataId: 'someManuscriptEditMetadataGroupId',
  textId: '',
  defTextId: '',
  presentationViewId: '',
  listPresentationViewId: '',
  groupOfRecordType: [],
  recordTypeCategory: [],
};

export const someManuscriptEditMetadataGroup: BFFMetadataGroup = {
  id: 'someManuscriptEditMetadataGroupId',
  nameInData: 'divaOutput',
  type: 'group',
  textId: '',
  defTextId: '',
  children: [
    { childId: 'recordInfo', repeatMin: '1', repeatMax: '1' },
    { childId: 'titleGroup', repeatMin: '1', repeatMax: '1' },
    { childId: 'alternativeTitle', repeatMin: '0', repeatMax: '1' },
    { childId: 'nationalSubjectCategory', repeatMin: '0', repeatMax: '1' },
    { childId: 'abstract', repeatMin: '0', repeatMax: '1' },
  ],
};

export const recordInfoMetadata: BFFMetadataGroup = {
  defTextId: '',
  textId: '',
  id: 'recordInfo',
  nameInData: 'recordInfo',
  type: 'group',
  children: [
    {
      childId: 'createdByLink',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'dataDividerLink',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'idTextVar',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'tsCreatedTextVar',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'recordTypeLink',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'updatedGroup',
      repeatMin: '1',
      repeatMax: 'X',
    },
    {
      childId: 'validationTypeLink',
      repeatMin: '1',
      repeatMax: '1',
    },
  ],
};

export const createdByLink: BFFMetadataRecordLink = {
  id: 'createdByLink',
  nameInData: 'createdBy',
  type: 'recordLink',
  textId: 'createdByDivaLinkText',
  defTextId: 'createdByDivaLinkDefText',
  linkedRecordType: 'user',
};

export const dataDividerLink: BFFMetadataRecordLink = {
  id: 'dataDividerLink',
  nameInData: 'dataDivider',
  type: 'recordLink',
  textId: 'dataDividerDivaDataLinkText',
  defTextId: 'dataDividerDivaDataLinkDefText',
  finalValue: 'divaData',
  linkedRecordType: 'system',
};

export const idTextVar: BFFMetadataTextVariable = {
  nameInData: 'id',
  regEx: '.+',
  id: 'idTextVar',
  type: 'textVariable',
  textId: 'idDivaTextVarText',
  defTextId: 'idDivaTextVarDefText',
};

export const tsCreatedTextVar: BFFMetadataTextVariable = {
  nameInData: 'tsCreated',
  regEx:
    '^((((19|20)([2468][048]|[13579][26]|0[48])|2000)-02-29|((19|20)[0-9]{2}-(0[4678]|1[02])-(0[1-9]|[12][0-9]|30|31)|(19|20)[0-9]{2}-(0[1359]|11)-(0[1-9]|[12][0-9]|3[01])|(19|20)[0-9]{2}-02-(0[1-9]|1[0-9]|2[0-8])))T([01][0-9]|2[0-3]):([012345][0-9]):([012345][0-9])\\.([0-9]{6}Z))$',
  id: 'tsCreatedTextVar',
  type: 'textVariable',
  textId: 'tsCreatedDivaTextVarText',
  defTextId: 'tsCreatedDivaTextVarDefText',
};

export const recordTypeLink: BFFMetadataRecordLink = {
  id: 'recordTypeLink',
  nameInData: 'type',
  type: 'recordLink',
  textId: 'recordTypeOutputLinkText',
  defTextId: 'recordTypeOutputLinkDefText',
  finalValue: 'diva-output',
  linkedRecordType: 'recordType',
};

export const updatedGroup: BFFMetadataGroup = {
  id: 'updatedGroup',
  nameInData: 'updated',
  type: 'group',
  textId: 'updatedDivaGroupText',
  defTextId: 'updatedDivaGroupDefText',
  children: [
    {
      childId: 'updatedByLink',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'tsUpdatedTextVar',
      repeatMin: '1',
      repeatMax: '1',
    },
  ],
};

export const updatedByLink: BFFMetadataRecordLink = {
  id: 'updatedByLink',
  nameInData: 'updatedBy',
  type: 'recordLink',
  textId: 'updatedByDivaLinkText',
  defTextId: 'updatedByDivaLinkDefText',
  linkedRecordType: 'user',
};

export const tsUpdatedTextVar: BFFMetadataTextVariable = {
  nameInData: 'tsUpdated',
  regEx:
    '^((((19|20)([2468][048]|[13579][26]|0[48])|2000)-02-29|((19|20)[0-9]{2}-(0[4678]|1[02])-(0[1-9]|[12][0-9]|30|31)|(19|20)[0-9]{2}-(0[1359]|11)-(0[1-9]|[12][0-9]|3[01])|(19|20)[0-9]{2}-02-(0[1-9]|1[0-9]|2[0-8])))T([01][0-9]|2[0-3]):([012345][0-9]):([012345][0-9])\\.([0-9]{6}Z))$',
  id: 'tsUpdatedTextVar',
  type: 'textVariable',
  textId: 'tsUpdatedTextVarText',
  defTextId: 'tsUpdatedTextVarDefText',
};

export const validationTypeLink: BFFMetadataRecordLink = {
  id: 'validationTypeLink',
  nameInData: 'validationType',
  type: 'recordLink',
  textId: 'validationTypeOutputLinkText',
  defTextId: 'validationTypeOutputLinkDefText',
  finalValue: 'diva-output',
  linkedRecordType: 'validationType',
};

export const languageCollectionVar: BFFMetadataCollectionVariable = {
  id: 'languageCollectionVar',
  nameInData: 'language',
  type: 'collectionVariable',
  textId: 'languageCollectionVarText',
  defTextId: 'languageCollectionVarDefText',
  refCollection: 'languageCollection',
};

export const languageCollection: BFFMetadataItemCollection = {
  id: 'languageCollection',
  nameInData: 'languageCollection',
  textId: '',
  type: 'itemCollection',
  defTextId: '',
  collectionItemReferences: [
    { refCollectionItemId: 'faoItem' },
    { refCollectionItemId: 'sweItem' },
    { refCollectionItemId: 'engItem' },
    { refCollectionItemId: 'epoItem' },
    { refCollectionItemId: 'kalItem' },
  ],
};

export const faoCollectionItem: BFFMetadataBase = {
  id: 'faoItem',
  nameInData: 'fao',
  type: 'collectionItem',
  textId: 'exampleFaoItemText',
  defTextId: 'exampleFaoItemDefText',
};

export const epoCollectionItem: BFFMetadataBase = {
  id: 'epoItem',
  nameInData: 'epo',
  type: 'collectionItem',
  textId: 'exampleEpoItemText',
  defTextId: 'exampleEpoItemDefText',
};

export const kalCollectionItem: BFFMetadataBase = {
  id: 'kalItem',
  nameInData: 'kal',
  type: 'collectionItem',
  textId: 'exampleKalItemText',
  defTextId: 'exampleKalItemDefText',
};

export const newLangItemCollectionItemEng: BFFMetadataBase = {
  id: 'engItem',
  nameInData: 'english',
  type: 'collectionItem',
  textId: 'alternativeItemText',
  defTextId: 'alternativeItemDefText',
};

export const newLangItemCollectionItemSwe: BFFMetadataBase = {
  id: 'sweItem',
  nameInData: 'swedish',
  type: 'collectionItem',
  textId: 'alternativeItemText',
  defTextId: 'alternativeItemDefText',
};

export const nationalSubjectCategoryLink: BFFMetadataRecordLink = {
  id: 'nationalSubjectCategory',
  nameInData: 'nationalSubjectCategory',
  type: 'recordLink',
  textId: 'nationalSubjectCategoryLinkText',
  defTextId: 'nationalSubjectCategoryDefText',
  linkedRecordType: 'nationalSubjectCategory',
};

export const someAlternativeTitleMetadataChildGroup: BFFMetadataGroup = {
  id: 'alternativeTitle',
  nameInData: 'alternativeTitle',
  type: 'group',
  textId: '',
  defTextId: '',
  children: [
    {
      childId: 'mainTitle',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'subTitle',
      repeatMin: '0',
      repeatMax: '1',
    },
  ],
};

export const sometitleMetadataChildGroup: BFFMetadataGroup = {
  id: 'titleGroup',
  nameInData: 'title',
  type: 'group',
  textId: '',
  defTextId: '',
  children: [
    {
      childId: 'mainTitle',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'subTitle',
      repeatMin: '0',
      repeatMax: '1',
    },
  ],
  attributeReferences: [
    {
      refCollectionVarId: 'languageCollectionVar',
    },
  ],
};

export const someAbstractTextVariable: BFFMetadataTextVariable = {
  id: 'abstract',
  nameInData: 'abstract',
  type: 'textVariable',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  regEx: 'someRegex',
  attributeReferences: [{ refCollectionVarId: 'languageCollectionVar' }],
};

export const someMainTitleTextVariable: BFFMetadataTextVariable = {
  id: 'mainTitle',
  nameInData: 'mainTitle',
  type: 'textVariable',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  regEx: 'someRegex',
};

export const someSubTitleTextVariable: BFFMetadataTextVariable = {
  id: 'subTitle',
  nameInData: 'subTitle',
  type: 'textVariable',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  regEx: 'someRegex',
};

export const someNewMetadataGroup: BFFMetadataGroup = {
  id: 'someNewMetadataGroupId',
  nameInData: 'someNewMetadataGroupNameInData',
  type: 'group',
  textId: 'textId345',
  defTextId: 'defTextId678',
  attributeReferences: [
    {
      refCollectionVarId: 'exampleCollectionVarId',
    },
  ],
  children: [
    {
      childId: 'someRecordInfoId',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'someMetadataTextVariableId',
      repeatMin: '1',
      repeatMax: '3',
    },
    {
      childId: 'someMetadataTextVariable2Id',
      repeatMin: '1',
      repeatMax: 'X',
    },
    {
      childId: 'someMetadataTextVariable3Id',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'someMetadataTextVariable4Id',
      repeatMin: '1',
      repeatMax: '3',
    },
    {
      childId: 'someMetadataTextVariable5Id',
      repeatMin: '1',
      repeatMax: '3',
    },
    {
      childId: 'someMetadataTextVariable6Id',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'someMetadataNumberVarId',
      repeatMin: '0',
      repeatMax: '1',
    },
    {
      childId: 'exampleCollectionVarId',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'someMetadataCollectionVariableWithAttributeId',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'someMetadataNumberWithAttributeVarId',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'someMetadataTextVariableWithAttributeVarId',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'someMetadataChildGroupId',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'nationalSubjectCategoryLinkId',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'someNewRecordLinkId',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'someMetadataChildGroupWithSpecifiedHeadlineTextId',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'someMetadataChildGroupWithShowHeadlineFalseId',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'someManuscriptGroupId',
      repeatMin: '1',
      repeatMax: '1',
    },
  ],
};

export const someEditMetadataGroup: BFFMetadataGroup = {
  id: 'someEditMetadataGroupId',
  nameInData: 'someEditMetadataGroupNameInData',
  type: 'group',
  textId: 'textId345',
  defTextId: 'defTextId678',
  attributeReferences: [
    {
      refCollectionVarId: 'exampleCollectionVarId',
    },
  ],
  children: [
    {
      childId: 'someRecordInfoId',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'someMetadataTextVariableId',
      repeatMin: '1',
      repeatMax: '3',
    },
    {
      childId: 'someMetadataTextVariable2Id',
      repeatMin: '1',
      repeatMax: 'X',
    },
    {
      childId: 'someMetadataTextVariable3Id',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'someMetadataTextVariable4Id',
      repeatMin: '1',
      repeatMax: '3',
    },
    {
      childId: 'someMetadataTextVariable5Id',
      repeatMin: '1',
      repeatMax: '3',
    },
    {
      childId: 'someMetadataNumberVarId',
      repeatMin: '0',
      repeatMax: '1',
    },
    {
      childId: 'exampleCollectionVarId',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'someMetadataCollectionVariableWithAttributeId',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'someMetadataNumberWithAttributeVarId',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'someMetadataTextVariableWithAttributeVarId',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'someMetadataChildGroupId',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'nationalSubjectCategoryLinkId',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'someMetadataChildGroupWithSpecifiedHeadlineTextId',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'someMetadataChildGroupWithShowHeadlineFalseId',
      repeatMin: '1',
      repeatMax: '1',
    },
  ],
};

export const someMetadataChildGroup: BFFMetadataGroup = {
  id: 'someMetadataChildGroupId',
  nameInData: 'someChildGroupNameInData',
  type: 'group',
  textId: 'someChildGroupTextId',
  defTextId: 'someChildGroupDefTextId',
  children: [
    {
      childId: 'someMetadataTextVariableId',
      repeatMin: '1',
      repeatMax: '1',
    },
  ],
};

export const someMetadataChildGroupWithSpecifiedHeadlineText: BFFMetadataGroup =
  {
    id: 'someMetadataChildGroupWithSpecifiedHeadlineTextId',
    nameInData: 'someMetadataChildGroupWithSpecifiedHeadlineTextNameInData',
    type: 'group',
    textId: 'someChildGroupTextId',
    defTextId: 'someChildGroupDefTextId',
    children: [
      {
        childId: 'someMetadataTextVariableId',
        repeatMin: '1',
        repeatMax: '1',
      },
    ],
  };
export const someMetadataChildGroupWithShowHeadlineFalse: BFFMetadataGroup = {
  id: 'someMetadataChildGroupWithShowHeadlineFalseId',
  nameInData: 'someMetadataChildGroupWithShowHeadlineFalseNameInData',
  type: 'group',
  textId: 'someChildGroupTextId',
  defTextId: 'someChildGroupDefTextId',
  children: [
    {
      childId: 'someMetadataTextVariableId',
      repeatMin: '1',
      repeatMax: '1',
    },
  ],
};

export const someMetadataTextVariable: BFFMetadataTextVariable = {
  id: 'someMetadataTextVariableId',
  nameInData: 'someNameInData',
  type: 'textVariable',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  regEx: 'someRegex',
};

export const someMetadataTextVariable2: BFFMetadataTextVariable = {
  id: 'someMetadataTextVariable2Id',
  nameInData: 'someNameInData2',
  type: 'textVariable',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  regEx: 'someRegex',
};

export const someMetadataTextVariable3: BFFMetadataTextVariable = {
  id: 'someMetadataTextVariable3Id',
  nameInData: 'someNameInData3',
  type: 'textVariable',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  regEx: 'someRegex',
  finalValue: 'someFinalValue',
};
export const someMetadataTextVariable4: BFFMetadataTextVariable = {
  id: 'someMetadataTextVariable4Id',
  nameInData: 'someNameInData4',
  type: 'textVariable',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  regEx: 'someRegex',
};
export const someMetadataTextVariable5: BFFMetadataTextVariable = {
  id: 'someMetadataTextVariable5Id',
  nameInData: 'someNameInData5',
  type: 'textVariable',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  regEx: 'someRegex',
};
export const someMetadataTextVariable6: BFFMetadataTextVariable = {
  id: 'someMetadataTextVariable6Id',
  nameInData: 'someNameInData6',
  type: 'textVariable',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  regEx: 'someRegex',
};

export const someMetadataTextVariableWithAttributeVar: BFFMetadataTextVariable =
  {
    id: 'someMetadataTextVariableWithAttributeVarId',
    nameInData: 'someNameInDataTextWithAttrib',
    type: 'textVariable',
    textId: 'someTextId',
    defTextId: 'someDefTextId',
    regEx: 'someRegex',
    attributeReferences: [
      {
        refCollectionVarId: 'exampleCollectionVarId',
      },
    ],
  };

export const someMetadataNumberVar: BFFMetadataNumberVariable = {
  id: 'someMetadataNumberVarId',
  nameInData: 'someNameInDataNumberVar',
  type: 'numberVariable',
  textId: 'someNumberVarTextId',
  defTextId: 'someNumberVarDefTextId',
  min: '0',
  max: '20',
  warningMin: '2',
  warningMax: '10',
  numberOfDecimals: '0',
};

export const someMetadataNumberVarWithAttribute: BFFMetadataNumberVariable = {
  id: 'someMetadataNumberWithAttributeVarId',
  nameInData: 'someNameInDataNumberWithAttributeVar',
  type: 'numberVariable',
  textId: 'someNumberVarTextId',
  defTextId: 'someNumberVarDefTextId',
  min: '0',
  max: '20',
  warningMin: '2',
  warningMax: '10',
  numberOfDecimals: '0',
  attributeReferences: [
    {
      refCollectionVarId: 'exampleCollectionVarId',
    },
  ],
};
export const someMetadataNumberVarWithAttributeAndOtherId: BFFMetadataNumberVariable =
  {
    id: 'someMetadataNumberWithAttributeVar2Id',
    nameInData: 'someNameInDataNumberWithAttributeVar',
    type: 'numberVariable',
    textId: 'someNumberVarTextId',
    defTextId: 'someNumberVarDefTextId',
    min: '0',
    max: '20',
    warningMin: '2',
    warningMax: '10',
    numberOfDecimals: '0',
    attributeReferences: [
      {
        refCollectionVarId: 'exampleCollectionVarId',
      },
    ],
  };
export const someMetadataNumberVarWithOtherAttributeId: BFFMetadataNumberVariable =
  {
    id: 'someMetadataNumberWithAttributeVar2Id',
    nameInData: 'someNameInDataNumberWithAttributeVar',
    type: 'numberVariable',
    textId: 'someNumberVarTextId',
    defTextId: 'someNumberVarDefTextId',
    min: '0',
    max: '20',
    warningMin: '2',
    warningMax: '10',
    numberOfDecimals: '0',
    attributeReferences: [
      {
        refCollectionVarId: 'exampleCollectionVarOtherId',
      },
    ],
  };

export const someMetadataNumberVarWithoutAttribute: BFFMetadataNumberVariable =
  {
    id: 'someMetadataNumberVarWithoutAttributeId',
    nameInData: 'someNameInDataNumberWithAttributeVar',
    type: 'numberVariable',
    textId: 'someNumberVarTextId',
    defTextId: 'someNumberVarDefTextId',
    min: '0',
    max: '20',
    warningMin: '2',
    warningMax: '10',
    numberOfDecimals: '0',
  };

export const someMetadataCollectionVariable: BFFMetadataCollectionVariable = {
  id: 'exampleCollectionVarId',
  nameInData: 'colour',
  type: 'collectionVariable',
  textId: 'exampleCollectionVarText',
  defTextId: 'exampleCollectionVarDefText',
  refCollection: 'exampleCollection',
  finalValue: 'pink', // added this for now
};
export const someMetadataCollectionVariable2: BFFMetadataCollectionVariable = {
  id: 'exampleCollectionVarId2',
  nameInData: 'colour2',
  type: 'collectionVariable',
  textId: 'exampleCollectionVarText',
  defTextId: 'exampleCollectionVarDefText',
  refCollection: 'exampleCollection',
  finalValue: 'pink', // added this for now
};
export const someMetadataCollectionWithOtherIdVariable: BFFMetadataCollectionVariable =
  {
    id: 'exampleCollectionVarOtherId',
    nameInData: 'colour',
    type: 'collectionVariable',
    textId: 'exampleCollectionVarText',
    defTextId: 'exampleCollectionVarDefText',
    refCollection: 'exampleCollection',
    finalValue: 'pink', // added this for now
  };

export const exampleOtherCollectionVarId: BFFMetadataCollectionVariable = {
  id: 'exampleOtherCollectionVarId',
  nameInData: 'colour',
  type: 'collectionVariable',
  textId: 'exampleCollectionVarText',
  defTextId: 'exampleCollectionVarDefText',
  refCollection: 'exampleCollection',
  finalValue: 'pink', // added this for now
};

export const someMetadataCollectionVariableWithAttribute: BFFMetadataCollectionVariable =
  {
    id: 'someMetadataCollectionVariableWithAttributeId',
    nameInData: 'colourAttributeVar',
    type: 'collectionVariable',
    textId: 'exampleCollectionVarText',
    defTextId: 'exampleCollectionVarDefText',
    refCollection: 'exampleCollection',
    attributeReferences: [
      {
        refCollectionVarId: 'exampleCollectionVarId',
      },
    ],
  };

export const someMetadataCollectionVariableWithTwoAttributes: BFFMetadataCollectionVariable =
  {
    id: 'someMetadataCollectionVariableWithAttributeId2',
    nameInData: 'colourAttributeVar',
    type: 'collectionVariable',
    textId: 'exampleCollectionVarText',
    defTextId: 'exampleCollectionVarDefText',
    refCollection: 'exampleCollection',
    attributeReferences: [
      {
        refCollectionVarId: 'exampleCollectionVarId',
      },
      {
        refCollectionVarId: 'exampleCollectionVarId2',
      },
    ],
  };

export const someMetadataItemCollection: BFFMetadataItemCollection = {
  id: 'exampleCollection',
  nameInData: 'colour',
  type: 'itemCollection',
  textId: 'exampleCollectionText',
  defTextId: 'exampleCollectionDefText',
  collectionItemReferences: [
    { refCollectionItemId: 'exampleBlueItem' },
    { refCollectionItemId: 'examplePinkItem' },
    { refCollectionItemId: 'exampleYellowItem' },
  ],
};
export const someMetadataCollectionItemBlue: BFFMetadataBase = {
  id: 'exampleBlueItem',
  nameInData: 'blue',
  type: 'collectionItem',
  textId: 'exampleBlueItemText',
  defTextId: 'exampleBlueItemDefText',
};

export const someMetadataCollectionItemPink: BFFMetadataBase = {
  id: 'examplePinkItem',
  nameInData: 'pink',
  type: 'collectionItem',
  textId: 'examplePinkItemText',
  defTextId: 'examplePinkItemDefText',
};

export const someMetadataCollectionItemYellow: BFFMetadataBase = {
  id: 'exampleYellowItem',
  nameInData: 'yellow',
  type: 'collectionItem',
  textId: 'exampleYellowItemText',
  defTextId: 'exampleYellowItemDefText',
};

export const someRecordInfo: BFFMetadataGroup = {
  id: 'someRecordInfoId',
  nameInData: 'someRecordInfoNameInData',
  type: 'group',
  textId: 'textId345',
  defTextId: 'defTextId678',
  children: [
    {
      childId: 'someMetadataTextVariableId', // change this!
      repeatMin: '1',
      repeatMax: '1',
    },
  ],
};

export const pSomeMetadataNumberVar: BFFPresentationBase = {
  id: 'pSomeMetadataNumberVariableId',
  presentationOf: 'someMetadataNumberVarId',
  mode: 'input',
  type: 'pNumVar',
  emptyTextId: 'someEmptyTextId',
  showLabel: 'false',
};

export const pSomeMetadataNumberWithAttributeVar: BFFPresentationBase = {
  id: 'pSomeMetadataNumberWithAttributeVarId',
  presentationOf: 'someMetadataNumberWithAttributeVarId',
  mode: 'input',
  type: 'pNumVar',
  emptyTextId: 'someEmptyTextId',
  attributesToShow: 'none',
};

export const pSomeMetadataTextVariable: BFFPresentationTextVar = {
  id: 'pSomeMetadataTextVariableId',
  presentationOf: 'someMetadataTextVariableId',
  mode: 'input',
  inputType: 'input',
  type: 'pVar',
  emptyTextId: 'someEmptyTextId',
};

export const pSomeMetadataTextVariableWithAttributeVar: BFFPresentationTextVar =
  {
    id: 'pSomeMetadataTextVariableWithAttributeVarId',
    presentationOf: 'someMetadataTextVariableWithAttributeVarId',
    mode: 'input',
    inputType: 'input',
    type: 'pVar',
    emptyTextId: 'someEmptyTextId',
  };

// used for repeatMax X (infinite test)

export const pSomeMetadataTextVariable2: BFFPresentationTextVar = {
  id: 'pSomeMetadataTextVariable2Id',
  presentationOf: 'someMetadataTextVariable2Id',
  mode: 'input',
  inputType: 'input',
  type: 'pVar',
  emptyTextId: 'someEmptyTextId',
  specifiedLabelTextId: 'someOtherLabelTextId',
};
export const pSomeMetadataTextVariable3: BFFPresentationTextVar = {
  id: 'pSomeMetadataTextVariable3Id',
  presentationOf: 'someMetadataTextVariable3Id',
  mode: 'input',
  inputType: 'input',
  type: 'pVar',
  emptyTextId: 'someEmptyTextId',
};
export const pSomeMetadataTextVariable4: BFFPresentationTextVar = {
  id: 'pSomeMetadataTextVariable4Id',
  presentationOf: 'someMetadataTextVariable4Id',
  mode: 'input',
  inputType: 'input',
  type: 'pVar',
  emptyTextId: 'someEmptyTextId',
};
export const pSomeMetadataTextVariable5: BFFPresentationTextVar = {
  id: 'pSomeMetadataTextVariable5Id',
  presentationOf: 'someMetadataTextVariable5Id',
  mode: 'input',
  inputType: 'input',
  type: 'pVar',
  emptyTextId: 'someEmptyTextId',
};
export const pSomeMetadataTextVariable6: BFFPresentationTextVar = {
  id: 'pSomeMetadataTextVariable6Id',
  presentationOf: 'someMetadataTextVariable6Id',
  mode: 'output',
  inputType: 'input',
  type: 'pVar',
  emptyTextId: 'someEmptyTextId',
};

export const pSomeMetadataCollectionVariable: BFFPresentationBase = {
  id: 'pSomeMetadataCollectionVariableId',
  presentationOf: 'exampleCollectionVarId',
  mode: 'input',
  type: 'pCollVar',
  emptyTextId: 'someEmptyTextId',
};

export const pSomeOtherMetadataCollectionVariableWithMissingChildId: BFFPresentationBase =
  {
    id: 'pSomeOtherMetadataCollectionVariableWithMissingChildIdId',
    presentationOf: 'exampleOtherCollectionVarId',
    mode: 'input',
    type: 'pCollVar',
    emptyTextId: 'someEmptyTextId',
  };

export const pSomeMetadataCollectionVariableWithAttribute: BFFPresentationBase =
  {
    id: 'pSomeMetadataCollectionVariableWithAttributeId',
    presentationOf: 'someMetadataCollectionVariableWithAttributeId',
    mode: 'input',
    type: 'pCollVar',
    emptyTextId: 'someEmptyTextId',
  };

export const pSomeMetadataChildGroup: BFFPresentationGroup = {
  id: 'pSomeMetadataChildGroupId',
  type: 'pGroup',
  presentationOf: 'someMetadataChildGroupId', // metadata
  presentationStyle: 'someMetadataChildGroupPresentationStyle',
  mode: 'input',
  children: [
    {
      refGroups: [
        { childId: 'pSomeMetadataTextVariableId', type: 'presentation' },
      ],
      childStyle: ['threeChildStyle'],
    },
  ],
};
export const pSomeMetadataChildGroupWithSpecifiedHeadlineText: BFFPresentationGroup =
  {
    id: 'pSomeMetadataChildGroupWithSpecifiedHeadlineTextId',
    type: 'pGroup',
    presentationOf: 'someMetadataChildGroupWithSpecifiedHeadlineTextId', // metadata
    presentationStyle: 'someMetadataChildGroupPresentationStyle',
    mode: 'input',
    specifiedHeadlineTextId: 'someOtherHeadlineTextId',
    specifiedHeadlineLevel: 'h3',
    children: [
      {
        refGroups: [
          { childId: 'pSomeMetadataTextVariableId', type: 'presentation' },
        ],
        childStyle: ['threeChildStyle'],
      },
    ],
  };
export const pSomeMetadataChildGroupWithShowHeadlineFalse: BFFPresentationGroup =
  {
    id: 'pSomeMetadataChildGroupWithShowHeadlineFalseId',
    type: 'pGroup',
    presentationOf: 'someMetadataChildGroupWithShowHeadlineFalseId', // metadata
    presentationStyle: 'someMetadataChildGroupPresentationStyle',
    mode: 'input',
    showHeadline: 'false',
    children: [
      {
        refGroups: [
          { childId: 'pSomeMetadataTextVariableId', type: 'presentation' },
        ],
        childStyle: ['threeChildStyle'],
      },
    ],
  };

export const pSomeNewMetadataGroup: BFFPresentationGroup = {
  id: 'pSomeNewMetadataGroupId',
  type: 'pGroup',
  presentationOf: 'someNewMetadataGroupId', // metadata
  mode: 'input',

  children: [
    {
      refGroups: [{ childId: 'someHeadlineTextId', type: 'text' }],
      textStyle: 'boldTextStyle',
      childStyle: ['twelveChildStyle'],
    },
    {
      refGroups: [
        { childId: 'pSomeMetadataTextVariableId', type: 'presentation' },
      ],
      childStyle: ['threeChildStyle'],
    },
    {
      refGroups: [
        { childId: 'pSomeMetadataTextVariable2Id', type: 'presentation' },
      ],
      childStyle: ['threeChildStyle'],
    },
    {
      refGroups: [
        { childId: 'pSomeMetadataTextVariable3Id', type: 'presentation' },
      ],
      childStyle: ['threeChildStyle'],
    },
    {
      refGroups: [
        { childId: 'pSomeMetadataTextVariable6Id', type: 'presentation' },
      ],
    },
    {
      refGroups: [
        { childId: 'pSomeMetadataNumberVariableId', type: 'presentation' },
      ],
      minNumberOfRepeatingToShow: '1',
      childStyle: ['threeChildStyle'],
    },
    {
      refGroups: [
        { childId: 'pSomeMetadataCollectionVariableId', type: 'presentation' },
      ],
      childStyle: ['threeChildStyle'],
    },
    {
      refGroups: [
        {
          childId: 'pSomeMetadataCollectionVariableWithAttributeId',
          type: 'presentation',
        },
      ],
      childStyle: ['threeChildStyle'],
    },
    {
      refGroups: [
        {
          childId: 'pSomeMetadataNumberWithAttributeVarId',
          type: 'presentation',
        },
      ],
    },
    {
      refGroups: [
        {
          childId: 'pSomeMetadataTextVariableWithAttributeVarId',
          type: 'presentation',
        },
      ],
    },
    {
      refGroups: [
        { childId: 'pSomeMetadataChildGroupId', type: 'presentation' },
      ],
    },
    {
      refGroups: [
        { childId: 'nationalSubjectCategoryPLinkId', type: 'presentation' },
      ],
    },
    {
      refGroups: [{ childId: 'someNewRecordPLinkId', type: 'presentation' }],
    },
    {
      refGroups: [{ childId: 'pSomeContainerId', type: 'presentation' }],
    },
    {
      refGroups: [{ childId: 'pSomeGuiElementLinkId', type: 'guiElement' }],
    },
    {
      refGroups: [
        { childId: 'pSomeRepeatingContainerId', type: 'presentation' },
      ],
    },
    {
      refGroups: [
        {
          childId: 'pSomeMetadataChildGroupWithSpecifiedHeadlineTextId',
          type: 'presentation',
        },
      ],
    },
    {
      refGroups: [
        {
          childId: 'pSomeMetadataChildGroupWithShowHeadlineFalseId',
          type: 'presentation',
        },
      ],
    },
    {
      refGroups: [{ childId: 'pSomeManuscriptGroupId', type: 'presentation' }],
    },
  ],
};

export const pSomeEditMetadataGroup: BFFPresentationGroup = {
  id: 'pSomeEditMetadataGroupId',
  type: 'pGroup',
  presentationOf: 'someEditMetadataGroupId', // metadata
  mode: 'input',
  presentationStyle: 'card',
  children: [
    {
      refGroups: [{ childId: 'someEditHeadlineTextId', type: 'text' }],
      textStyle: 'boldTextStyle',
      childStyle: ['twelveChildStyle'],
    },
    {
      refGroups: [
        { childId: 'pSomeMetadataTextVariableId', type: 'presentation' },
      ],
      childStyle: ['threeChildStyle'],
    },
    {
      refGroups: [
        { childId: 'pSomeMetadataTextVariable2Id', type: 'presentation' },
      ],
      childStyle: ['threeChildStyle'],
    },
    {
      refGroups: [
        { childId: 'pSomeMetadataTextVariable3Id', type: 'presentation' },
      ],
      childStyle: ['threeChildStyle'],
    },
    {
      refGroups: [
        { childId: 'pSomeMetadataNumberVariableId', type: 'presentation' },
      ],
      minNumberOfRepeatingToShow: '1',
      childStyle: ['threeChildStyle'],
    },
    {
      refGroups: [
        { childId: 'pSomeMetadataCollectionVariableId', type: 'presentation' },
      ],
      childStyle: ['threeChildStyle'],
    },
    {
      refGroups: [
        {
          childId: 'pSomeMetadataCollectionVariableWithAttributeId',
          type: 'presentation',
        },
      ],
      childStyle: ['threeChildStyle'],
    },
    {
      refGroups: [
        {
          childId: 'pSomeMetadataNumberWithAttributeVarId',
          type: 'presentation',
        },
      ],
    },
    {
      refGroups: [
        {
          childId: 'pSomeMetadataTextVariableWithAttributeVarId',
          type: 'presentation',
        },
      ],
    },
    {
      refGroups: [
        { childId: 'pSomeMetadataChildGroupId', type: 'presentation' },
      ],
    },
    {
      refGroups: [
        { childId: 'nationalSubjectCategoryPLinkId', type: 'presentation' },
      ],
    },
    {
      refGroups: [{ childId: 'pSomeContainerId', type: 'presentation' }],
    },
    {
      refGroups: [{ childId: 'pSomeGuiElementLinkId', type: 'guiElement' }],
    },
    {
      refGroups: [
        { childId: 'pSomeRepeatingContainerId', type: 'presentation' },
      ],
    },
    {
      refGroups: [
        {
          childId: 'pSomeMetadataChildGroupWithSpecifiedHeadlineTextId',
          type: 'presentation',
        },
      ],
    },
    {
      refGroups: [
        {
          childId: 'pSomeMetadataChildGroupWithShowHeadlineFalseId',
          type: 'presentation',
        },
      ],
    },
  ],
};

export const pSomeContainer: BFFPresentationSurroundingContainer = {
  id: 'pSomeContainerId',
  type: 'container',

  presentationsOf: ['someMetadataTextVariable4Id'], // metadata
  mode: 'input',
  children: [
    {
      refGroups: [
        { childId: 'pSomeMetadataTextVariable4Id', type: 'presentation' },
      ],
      childStyle: ['sixChildStyle'],
      minNumberOfRepeatingToShow: '1',
    },
  ],
  repeat: 'children',
};

export const pSomeRepeatingContainer: BFFPresentationContainer = {
  id: 'pSomeRepeatingContainerId',
  type: 'container',
  presentationStyle: 'label',
  presentationOf: 'someMetadataTextVariable5Id',
  mode: 'input',
  children: [
    {
      refGroups: [
        { childId: 'pSomeMetadataTextVariable5Id', type: 'presentation' },
      ],
      childStyle: ['sixChildStyle'],
      minNumberOfRepeatingToShow: '1',
    },
  ],
  repeat: 'this',
};

export const someValidationTypeDataFaultyChildReference: BFFValidationType = {
  id: 'someValidationTypeDataFaultyChildReferenceId',
  validatesRecordTypeId: 'record123',
  // New
  newMetadataGroupId: 'someNewMetadataGroupFaultyChildReferenceId',
  newPresentationGroupId: 'pSomeNewMetadataGroupId',
  // Update/Edit
  metadataGroupId: 'todo',
  presentationGroupId: 'todo',
  nameTextId: 'name123',
  defTextId: 'defName456',
};

export const someNewMetadataGroupFaultyChildReference: BFFMetadataGroup = {
  id: 'someNewMetadataGroupFaultyChildReferenceId',
  nameInData: 'someNameInData',
  type: 'group',
  textId: 'textId345',
  defTextId: 'defTextId678',
  children: [
    {
      childId: 'someRecordInfoId',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'someFaultyIdNotExistingInMetadataPool',
      repeatMin: '1',
      repeatMax: '3',
    },
  ],
};

export const someMetadataRecordLink: BFFMetadataRecordLink = {
  id: 'nationalSubjectCategoryLinkId',
  nameInData: 'nationalSubjectCategory',
  type: 'recordLink',
  textId: 'nationalSubjectCategoryLinkText',
  defTextId: 'nationalSubjectCategoryLinkDefText',
  linkedRecordType: 'nationalSubjectCategory',
};
export const someNewRecordLink: BFFMetadataRecordLink = {
  id: 'someNewRecordLinkId',
  nameInData: 'someNewRecordLink',
  type: 'recordLink',
  textId: 'someNewRecordLinkText',
  defTextId: 'someNewRecordLinkDefText',
  linkedRecordType: 'someNewRecordLink',
};

export const pSomeMetadataRecordLink: BFFPresentationRecordLink = {
  id: 'nationalSubjectCategoryPLinkId',
  type: 'pRecordLink',
  presentationOf: 'nationalSubjectCategoryLinkId',
  mode: 'input',
  linkedRecordPresentations: [
    {
      presentedRecordType: 'nationalSubjectCategory',
      presentationId: 'someSubjectCategoryPresentation',
    },
  ],
};
export const pSomeNewRecordLink: BFFPresentationRecordLink = {
  id: 'someNewRecordPLinkId',
  type: 'pRecordLink',
  presentationOf: 'someNewRecordLinkId',
  mode: 'input',
  linkedRecordPresentations: [
    {
      presentedRecordType: 'someNewRecordLink',
      presentationId: 'someNewRecordLink',
    },
  ],
  search: 'someNewRecordLinkSearch',
};

export const someMetadataRecordLinkWithAttributes: BFFMetadataRecordLink = {
  id: 'nationalSubjectCategoryLinkWithAttributesId',
  nameInData: 'nationalSubjectCategoryWithAttributes',
  type: 'recordLink',
  textId: 'nationalSubjectCategoryLinkText',
  defTextId: 'nationalSubjectCategoryLinkDefText',
  linkedRecordType: 'nationalSubjectCategory2',
  attributeReferences: [
    {
      refCollectionVarId: 'exampleCollectionVarId',
    },
  ],
};

export const someMetadataRepeatingRecordLinkWithAttributes: BFFMetadataRecordLink =
  {
    id: 'nationalSubjectCategoryLinkRepeatingWithAttributesId',
    nameInData: 'nationalSubjectCategoryRepeatingWithAttributes',
    type: 'recordLink',
    textId: 'nationalSubjectCategoryLinkText',
    defTextId: 'nationalSubjectCategoryLinkDefText',
    linkedRecordType: 'nationalSubjectCategory2',
    attributeReferences: [
      {
        refCollectionVarId: 'exampleCollectionVarId',
      },
    ],
  };

export const pSomeGuiElementLink: BFFGuiElement = {
  id: 'pSomeGuiElementLinkId',
  url: 'http://www.google.se',
  elementText: 'demoTestLinkGuiElementText',
  presentAs: 'link',
  type: 'guiElementLink',
};

export const someSimpleValidationTypeData: BFFValidationType = {
  id: 'someSimpleValidationTypeId',
  validatesRecordTypeId: 'record123',
  // New
  newMetadataGroupId: 'someNewMetadataGroup2Id',
  newPresentationGroupId: 'todo',
  // Update/Edit
  metadataGroupId: 'todo',
  presentationGroupId: 'todo',
  nameTextId: 'name123',
  defTextId: 'defName456',
};

export const someNewSimpleMetadataGroup: BFFMetadataGroup = {
  id: 'someNewMetadataGroup2Id',
  nameInData: 'someNewMetadataGroupNameInData',
  type: 'group',
  textId: 'textId345',
  defTextId: 'defTextId678',
  children: [
    {
      childId: 'someMetadataTextVariableId',
      repeatMin: '1',
      repeatMax: '3',
    },
    {
      childId: 'someMetadataChildGroupId',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'nationalSubjectCategoryLinkId',
      repeatMin: '1',
      repeatMax: '1',
    },
  ],
};
export const someSimpleValidationTypeDataWithAttributes: BFFValidationType = {
  id: 'someSimpleValidationTypeWithAttributesId',
  validatesRecordTypeId: 'record123',
  // New
  newMetadataGroupId: 'someNewMetadataGroup2WithAttributesId',
  newPresentationGroupId: 'todo',
  // Update/Edit
  metadataGroupId: 'todo',
  presentationGroupId: 'todo',
  nameTextId: 'name123',
  defTextId: 'defName456',
};

export const someNewSimpleMetadataGroupWithAttributes: BFFMetadataGroup = {
  id: 'someNewMetadataGroup2WithAttributesId',
  nameInData: 'someNewMetadataGroupWithAttributesNameInData',
  type: 'group',
  textId: 'textId345',
  defTextId: 'defTextId678',
  attributeReferences: [
    {
      refCollectionVarId: 'exampleCollectionVarId',
    },
  ],
  children: [
    {
      childId: 'someMetadataTextVariableId',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'someMetadataTextVariableWithAttributeVarId',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'someMetadataNumberVarId',
      repeatMin: '1',
      repeatMax: 'X',
    },
    {
      childId: 'someMetadataNumberWithAttributeVarId',
      repeatMin: '1',
      repeatMax: '2',
    },
    {
      childId: 'nationalSubjectCategoryLinkWithAttributesId',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'nationalSubjectCategoryLinkRepeatingWithAttributesId',
      repeatMin: '1',
      repeatMax: '2',
    },
  ],
};

export const someSimpleValidationTypeRepeatingGroups: BFFValidationType = {
  id: 'someSimpleValidationTypeWithRepeatingGroupsId',
  validatesRecordTypeId: 'record123',
  // New
  newMetadataGroupId: 'someNewMetadataGroupRepeatingGroupsId',
  newPresentationGroupId: 'todo',
  // Update/Edit
  metadataGroupId: 'todo',
  presentationGroupId: 'todo',
  nameTextId: 'name123',
  defTextId: 'defName456',
};

export const someNewSimpleMetadataGroupRepeatingGroups: BFFMetadataGroup = {
  id: 'someNewMetadataGroupRepeatingGroupsId',
  nameInData: 'someNewMetadataGroupRepeatingGroupsNameInData',
  type: 'group',
  textId: 'textId345',
  defTextId: 'defTextId678',
  children: [
    {
      childId: 'someMetadataChildGroupId',
      repeatMin: '1',
      repeatMax: '2',
    },
  ],
};

export const someManuscriptGroup: BFFMetadataGroup = {
  id: 'someManuscriptGroupId',
  nameInData: 'someManuscriptGroupNameInData',
  type: 'group',
  textId: 'textId345',
  defTextId: 'defTextId678',
  children: [
    {
      childId: 'archiveNumberTextVarId',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'localIdTextVarId',
      repeatMin: '1',
      repeatMax: '1',
    },
    // {
    //   childId: 'scopusIdTextVarId',
    //   repeatMin: '1',
    //   repeatMax: '1'
    // }
  ],
};

export const pSomeManuscriptGroup: BFFPresentationGroup = {
  id: 'pSomeManuscriptGroupId',
  type: 'pGroup',
  presentationOf: 'someManuscriptGroupId', // metadata

  mode: 'input',
  children: [
    {
      refGroups: [
        { childId: 'pSomeManuscriptIdContainer', type: 'presentation' },
      ],
    },
  ],
};

export const pSomeManuscriptContainer: BFFPresentationSurroundingContainer = {
  id: 'pSomeManuscriptIdContainer',
  type: 'container',

  presentationsOf: [
    'archiveNumberTextVarId',
    'localIdTextVarId',
    'scopusIdTextVarId',
  ], // metadata
  mode: 'input',
  children: [
    {
      refGroups: [{ childId: 'pArchiveNumberTextVarId', type: 'presentation' }],

      minNumberOfRepeatingToShow: '1',
    },
    {
      refGroups: [{ childId: 'pLocalIdTextVarId', type: 'presentation' }],

      minNumberOfRepeatingToShow: '1',
    },
    {
      refGroups: [{ childId: 'pScopusIdTextVarId', type: 'presentation' }],

      minNumberOfRepeatingToShow: '1',
    },
  ],
  repeat: 'children',
};

export const someArchiveNumberTextVar: BFFMetadataTextVariable = {
  id: 'archiveNumberTextVarId',
  nameInData: 'archiveNumber',
  type: 'textVariable',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  regEx: 'someRegex',
};

export const someLocalIdTextVar: BFFMetadataTextVariable = {
  id: 'localIdTextVarId',
  nameInData: 'localId',
  type: 'textVariable',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  regEx: 'someRegex',
};

export const someScopusIdTextVar: BFFMetadataTextVariable = {
  id: 'scopusIdTextVarId',
  nameInData: 'scopusId',
  type: 'textVariable',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  regEx: 'someRegex',
};

export const pSomeArchiveNumberTextVar: BFFPresentationTextVar = {
  id: 'pArchiveNumberTextVarId',
  presentationOf: 'archiveNumberTextVarId',
  mode: 'input',
  inputType: 'input',
  type: 'pVar',
  emptyTextId: 'someEmptyTextId',
};
export const pSomeLocalIdTextVar: BFFPresentationTextVar = {
  id: 'pLocalIdTextVarId',
  presentationOf: 'localIdTextVarId',
  mode: 'input',
  inputType: 'input',
  type: 'pVar',
  emptyTextId: 'someEmptyTextId',
};
export const pSomeScopusIdTextVar: BFFPresentationTextVar = {
  id: 'pScopusIdTextVarId',
  presentationOf: 'scopusIdTextVarId',
  mode: 'input',
  inputType: 'input',
  type: 'pVar',
  emptyTextId: 'someEmptyTextId',
};

export const newNationSubjectCategoryValidationType: BFFValidationType = {
  id: 'nationalSubjectCategory',
  validatesRecordTypeId: 'record123',
  // New
  newMetadataGroupId: 'nationalSubjectCategoryRecordTypeNewGroup',
  newPresentationGroupId: 'nationalSubjectCategoryRecordTypePGroup',
  // Update/Edit
  metadataGroupId: 'nationalSubjectCategoryRecordTypeGroup',
  presentationGroupId: 'nationalSubjectCategoryRecordTypePGroup',
  nameTextId: 'name123',
  defTextId: 'defName456',
};

export const someNationalSubjectCategoryRecordType: BFFRecordType = {
  id: 'nationalSubjectCategory',
  // New
  // Update/Edit
  metadataId: 'someEditMetadataGroupId',
  presentationViewId: 'pSomeEditMetadataGroupId',

  textId: '',
  defTextId: '',
  listPresentationViewId: '',
  groupOfRecordType: [],
  recordTypeCategory: [],
};

export const newNationalSubjectCategoryRecordTypeNewGroup: BFFMetadataGroup = {
  id: 'nationalSubjectCategoryRecordTypeNewGroup',
  nameInData: 'nationalSubjectCategory',
  type: 'group',
  textId: 'nationalSubjectCategoryRecordTypeNewGroupText',
  defTextId: 'nationalSubjectCategoryRecordTypeNewGroupDefText',
  children: [
    {
      childId: 'subjectSweTextVar',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'subjectEngTextVar',
      repeatMin: '1',
      repeatMax: '1',
    },
  ],
};

export const newNationalSubjectCategoryRecordTypeGroup: BFFMetadataGroup = {
  id: 'nationalSubjectCategoryRecordTypeGroup',
  nameInData: 'nationalSubjectCategory',
  type: 'group',
  textId: 'nationalSubjectCategoryRecordTypeNewGroupText',
  defTextId: 'nationalSubjectCategoryRecordTypeNewGroupDefText',
  children: [
    {
      childId: 'subjectSweTextVar',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'subjectEngTextVar',
      repeatMin: '1',
      repeatMax: '1',
    },
  ],
};

export const newNationSubjectCategoryMetadataSubjectSweTextVariable: BFFMetadataTextVariable =
  {
    id: 'subjectSweTextVar',
    nameInData: 'subject',
    type: 'textVariable',
    textId: 'subjectSweTextVarText',
    defTextId: 'subjectSweTextVarDefText',
    regEx: '.+',
    attributeReferences: [
      {
        refCollectionVarId: 'languageSweCollectionVar',
      },
    ],
  };
export const newNationSubjectCategoryMetadataSubjectEngTextVariable: BFFMetadataTextVariable =
  {
    id: 'subjectEngTextVar',
    nameInData: 'subject',
    type: 'textVariable',
    textId: 'subjectEngTextVarText',
    defTextId: 'subjectEngTextVarDefText',
    regEx: '.+',
    attributeReferences: [
      {
        refCollectionVarId: 'languageEngCollectionVar',
      },
    ],
  };

export const newNationSubjectCategoryMetadataSubjectSweLangCollVariable: BFFMetadataCollectionVariable =
  {
    id: 'languageSweCollectionVar',
    nameInData: 'language',
    type: 'collectionVariable',
    textId: 'languageCollectionVarText',
    defTextId: 'languageCollectionVarDefText',
    refCollection: 'languageCollection',
    finalValue: 'swe', // added this for now
  };

export const newNationSubjectCategoryMetadataSubjectEngLangCollVariable: BFFMetadataCollectionVariable =
  {
    id: 'languageEngCollectionVar',
    nameInData: 'language',
    type: 'collectionVariable',
    textId: 'languageCollectionVarText',
    defTextId: 'languageCollectionVarDefText',
    refCollection: 'languageCollection',
    finalValue: 'eng', // added this for now
  };

export const pNewNationSubjectCategoryMetadataGroup: BFFPresentationGroup = {
  id: 'nationalSubjectCategoryRecordTypePGroup',
  type: 'pGroup',
  presentationOf: 'nationalSubjectCategoryRecordTypeGroup', // metadata
  mode: 'input',
  children: [
    {
      refGroups: [{ childId: 'subjectSwePVar', type: 'presentation' }],
    },
    {
      refGroups: [{ childId: 'subjectEngPVar', type: 'presentation' }],
    },
  ],
};
export const pNewNationSubjectCategorySweVar: BFFPresentationBase = {
  id: 'subjectSwePVar',
  type: 'pVar',
  presentationOf: 'subjectSweTextVar',
  mode: 'input',
};

export const pNewNationSubjectCategoryEngVar: BFFPresentationBase = {
  id: 'subjectEngPVar',
  type: 'pVar',
  presentationOf: 'subjectEngTextVar',
  mode: 'input',
};

export const divaOutputValidationType: BFFValidationType = {
  id: 'preprint',
  validatesRecordTypeId: 'divaOutput',
  // New
  newMetadataGroupId: 'preprintNewGroup',
  newPresentationGroupId: 'divaOutputPGroup',
  // Update/Edit
  metadataGroupId: 'divaOutputPGroup',
  presentationGroupId: 'divaOutputPGroup',
  nameTextId: 'name123',
  defTextId: 'defName456',
};

export const preprintNewGroup: BFFMetadataGroup = {
  id: 'preprintNewGroup',
  nameInData: 'divaOutput',
  type: 'group',
  textId: '',
  defTextId: '',
  children: [
    { childId: 'recordInfo', repeatMin: '1', repeatMax: '1' },
    {
      childId: 'domainCollectionVar',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'outputTypeGroup',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'titleGroup',
      repeatMin: '0',
      repeatMax: '1',
    },
  ],
};

export const domainCollectionVar: BFFMetadataCollectionVariable = {
  id: 'domainCollectionVar',
  nameInData: 'domain',
  type: 'collectionVariable',
  textId: 'exampleCollectionVarText',
  defTextId: 'exampleCollectionVarDefText',
  refCollection: 'exampleCollection',
};

export const outputTypeGroup: BFFMetadataGroup = {
  id: 'outputTypeGroup',
  nameInData: 'outputType',
  type: 'group',
  textId: '',
  defTextId: '',
  children: [
    {
      childId: 'outputTypeCollectionVar',
      repeatMin: '1',
      repeatMax: '1',
    },
  ],
};
export const outputTypeCollectionVar: BFFMetadataCollectionVariable = {
  id: 'outputTypeCollectionVar',
  nameInData: 'genre',
  type: 'collectionVariable',
  textId: 'exampleCollectionVarText',
  defTextId: 'exampleCollectionVarDefText',
  refCollection: 'exampleCollection',
  attributeReferences: [
    {
      refCollectionVarId: 'typeOutputTypeCollectionVar',
    },
  ],
};

export const typeOutputTypeCollectionVar: BFFMetadataCollectionVariable = {
  id: 'typeOutputTypeCollectionVar',
  nameInData: 'type',
  type: 'collectionVariable',
  textId: 'exampleCollectionVarText',
  defTextId: 'exampleCollectionVarDefText',
  refCollection: 'exampleCollection',
  finalValue: 'outputType',
};

export const titleGroup: BFFMetadataGroup = {
  id: 'titleGroup',
  nameInData: 'title',
  type: 'group',
  textId: '',
  defTextId: '',
  children: [
    {
      childId: 'mainTitle',
      repeatMin: '1',
      repeatMax: '1',
    },
  ],
};

export const mainTitleTextVar: BFFMetadataTextVariable = {
  id: 'mainTitle',
  nameInData: 'mainTitle',
  type: 'textVariable',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  regEx: '.+',
};

export const someValidationTypeForRepeatingGroupsNameInDataId: BFFValidationType =
  {
    id: 'someValidationTypeForRepeatingGroupsNameInDataId',
    validatesRecordTypeId: 'record123',
    // New
    newMetadataGroupId: 'someNewMetadataGroupRepeatingGroupsNameInDataGroup',
    newPresentationGroupId: 'nationalSubjectCategoryRecordTypePGroup',
    // Update/Edit
    metadataGroupId: 'nationalSubjectCategoryRecordTypeGroup',
    presentationGroupId: 'nationalSubjectCategoryRecordTypePGroup',
    nameTextId: 'name123',
    defTextId: 'defName456',
  };

export const someNewMetadataGroupRepeatingGroupsNameInDataGroup: BFFMetadataGroup =
  {
    id: 'someNewMetadataGroupRepeatingGroupsNameInDataGroup',
    nameInData: 'someRootNameInData',
    type: 'group',
    textId: '',
    defTextId: '',
    children: [
      {
        childId: 'authorGroup',
        repeatMin: '1',
        repeatMax: '1',
      },
      {
        childId: 'authorOtherGroup',
        repeatMin: '1',
        repeatMax: '1',
      },
    ],
  };

export const authorGroup: BFFMetadataGroup = {
  id: 'authorGroup',
  nameInData: 'author',
  type: 'group',
  textId: '',
  defTextId: '',

  children: [
    {
      childId: 'givenNameTextVar',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'familyNameTextVar',
      repeatMin: '1',
      repeatMax: '1',
    },
  ],
  attributeReferences: [
    {
      refCollectionVarId: 'languageSweCollectionVar',
    },
  ],
};
export const authorGroup2: BFFMetadataGroup = {
  id: 'authorOtherGroup',
  nameInData: 'author',
  type: 'group',
  textId: '',
  defTextId: '',
  children: [
    {
      childId: 'givenNameTextVar',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'familyNameTextVar',
      repeatMin: '1',
      repeatMax: '1',
    },
  ],
  attributeReferences: [
    {
      refCollectionVarId: 'languageEngCollectionVar',
    },
  ],
};

export const givenNameTextVar: BFFMetadataTextVariable = {
  id: 'givenNameTextVar',
  nameInData: 'givenName',
  type: 'textVariable',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  regEx: 'someRegex',
};
export const familyNameTextVar: BFFMetadataTextVariable = {
  id: 'familyNameTextVar',
  nameInData: 'familyName',
  type: 'textVariable',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  regEx: 'someRegex',
};

export const someValidationTypeForRepeatingCollectionsNameInDataId: BFFValidationType =
  {
    id: 'someValidationTypeForRepeatingCollectionsNameInDataId',
    validatesRecordTypeId: 'record123',
    // New
    newMetadataGroupId:
      'someNewMetadataGroupRepeatingCollectionNameInDataGroup',
    newPresentationGroupId: 'nationalSubjectCategoryRecordTypePGroup',
    // Update/Edit
    metadataGroupId: 'nationalSubjectCategoryRecordTypeGroup',
    presentationGroupId: 'nationalSubjectCategoryRecordTypePGroup',
    nameTextId: 'name123',
    defTextId: 'defName456',
  };

export const someNewMetadataGroupRepeatingCollectionNameInDataGroup: BFFMetadataGroup =
  {
    id: 'someNewMetadataGroupRepeatingCollectionNameInDataGroup',
    nameInData: 'genreGroup',
    type: 'group',
    textId: '',
    defTextId: '',
    children: [
      {
        childId: 'genreCollectionVar',
        repeatMin: '1',
        repeatMax: '1',
      },
      {
        childId: 'genreOtherCollectionVar',
        repeatMin: '1',
        repeatMax: '1',
      },
    ],
  };

export const genreCollectionVar: BFFMetadataCollectionVariable = {
  id: 'genreCollectionVar',
  nameInData: 'genre',
  type: 'collectionVariable',
  textId: 'exampleCollectionVarText',
  defTextId: 'exampleCollectionVarDefText',
  refCollection: 'exampleCollection',
  attributeReferences: [
    {
      refCollectionVarId: 'languageSweCollectionVar',
    },
  ],
};

export const genreOtherCollectionVar: BFFMetadataCollectionVariable = {
  id: 'genreOtherCollectionVar',
  nameInData: 'genre',
  type: 'collectionVariable',
  textId: 'exampleCollectionVarText',
  defTextId: 'exampleCollectionVarDefText',
  refCollection: 'exampleCollection',
  attributeReferences: [
    {
      refCollectionVarId: 'languageEngCollectionVar',
    },
  ],
};

export const someValidationTypeForRepeatingRecordLinksNameInDataId: BFFValidationType =
  {
    id: 'someValidationTypeForRepeatingRecordLinksNameInDataId',
    validatesRecordTypeId: 'record123',
    // New
    newMetadataGroupId:
      'someNewMetadataGroupRepeatingRecordLinksNameInDataGroup',
    newPresentationGroupId: 'nationalSubjectCategoryRecordTypePGroup',
    // Update/Edit
    metadataGroupId: 'nationalSubjectCategoryRecordTypeGroup',
    presentationGroupId: 'nationalSubjectCategoryRecordTypePGroup',
    nameTextId: 'name123',
    defTextId: 'defName456',
  };

export const someNewMetadataGroupRepeatingRecordLinksNameInDataGroup: BFFMetadataGroup =
  {
    id: 'someNewMetadataGroupRepeatingRecordLinksNameInDataGroup',
    nameInData: 'recordLinkGroup',
    type: 'group',
    textId: '',
    defTextId: '',
    children: [
      {
        childId: 'someNewRecordLinkId',
        repeatMin: '1',
        repeatMax: '1',
      },
      {
        childId: 'someOtherNewRecordLinkId',
        repeatMin: '1',
        repeatMax: '1',
      },
    ],
  };

export const someNewRecordLinkId: BFFMetadataRecordLink = {
  id: 'someNewRecordLinkId',
  nameInData: 'newRecordLink',
  type: 'recordLink',
  textId: 'nationalSubjectCategoryLinkText',
  defTextId: 'nationalSubjectCategoryLinkDefText',
  linkedRecordType: 'nationalSubjectCategory',
  attributeReferences: [
    {
      refCollectionVarId: 'languageSweCollectionVar',
    },
  ],
};

export const someOtherNewRecordLinkId: BFFMetadataRecordLink = {
  id: 'someOtherNewRecordLinkId',
  nameInData: 'newRecordLink',
  type: 'recordLink',
  textId: 'nationalSubjectCategoryLinkText',
  defTextId: 'nationalSubjectCategoryLinkDefText',
  linkedRecordType: 'nationalSubjectCategory',
  attributeReferences: [
    {
      refCollectionVarId: 'languageEngCollectionVar',
    },
  ],
};

export const someValidationTypeForRepeatingTitleInfoId: BFFValidationType = {
  id: 'divaOutputSwepub',
  validatesRecordTypeId: 'divaOutputSwepub',
  // New
  newMetadataGroupId: 'someNewMetadataGroupRepeatingTitleInfoNameInDataGroup',
  newPresentationGroupId:
    'someNewMetadataGroupRepeatingTitleInfoNameInDataPGroup',
  // Update/Edit
  metadataGroupId: 'someNewMetadataGroupRepeatingTitleInfoNameInDataGroup',
  presentationGroupId: 'someNewMetadataGroupRepeatingTitleInfoNameInDataPGroup',
  nameTextId: 'name123',
  defTextId: 'defName456',
};

export const someRecordTypeForRepeatingTitleInfo: BFFRecordType = {
  id: 'divaOutputSwepub',
  metadataId: 'someNewMetadataGroupRepeatingTitleInfoNameInDataGroup',
  textId: 'name123',
  defTextId: 'defName456',
  presentationViewId: '',
  listPresentationViewId: '',
  groupOfRecordType: [],
  recordTypeCategory: [],
};

export const someNewMetadataGroupRepeatingTitleInfoNameInDataGroup: BFFMetadataGroup =
  {
    id: 'someNewMetadataGroupRepeatingTitleInfoNameInDataGroup',
    nameInData: 'output',
    type: 'group',
    textId: '',
    defTextId: '',
    children: [
      { childId: 'recordInfo', repeatMin: '1', repeatMax: '1' },
      {
        childId: 'someNewMetadataGroupTitleInfoGroup',
        repeatMin: '1',
        repeatMax: '1',
      },
      {
        childId: 'someNewMetadataGroupTitleInfoAlternativeGroup',
        repeatMin: '0',
        repeatMax: '1',
      },
    ],
  };

export const pSomeNewMetadataGroupRepeatingTitleInfoNameInDataGroup: BFFPresentationGroup =
  {
    id: 'someNewMetadataGroupRepeatingTitleInfoNameInDataPGroup',
    type: 'pGroup',
    presentationOf: 'someNewMetadataGroupRepeatingTitleInfoNameInDataGroup', // metadata
    mode: 'input',
    children: [
      {
        refGroups: [
          {
            childId: 'someNewMetadataGroupTitleInfoGroup',
            type: 'presentation',
          },
        ],
      },
      {
        refGroups: [
          {
            childId: 'someNewMetadataGroupTitleInfoAlternativeGroup',
            type: 'presentation',
          },
        ],
      },
    ],
  };

export const someNewMetadataGroupTitleInfoGroup: BFFMetadataGroup = {
  id: 'someNewMetadataGroupTitleInfoGroup',
  nameInData: 'titleInfo',
  type: 'group',
  textId: '',
  defTextId: '',
  children: [
    {
      childId: 'someMainTitleVar',
      repeatMin: '1',
      repeatMax: '1',
    },
  ],
  attributeReferences: [
    {
      refCollectionVarId: 'newLangCollectionVar',
    },
  ],
};

export const pSomeNewMetadataGroupTitleInfoPGroup: BFFPresentationGroup = {
  id: 'pSomeNewMetadataGroupTitleInfoGroup',
  type: 'pGroup',
  presentationOf: 'someNewMetadataGroupTitleInfoGroup', // metadata
  mode: 'input',
  children: [
    {
      refGroups: [{ childId: 'someMainTitlePVar', type: 'presentation' }],
    },
  ],
};
export const pSomeNewMetadataGroupTitleInfoAlternativePGroup: BFFPresentationGroup =
  {
    id: 'pSomeNewMetadataGroupTitleInfoAlternativeGroup',
    type: 'pGroup',
    presentationOf: 'someNewMetadataGroupTitleInfoAlternativeGroup', // metadata
    mode: 'input',
    attributesToShow: 'selectable',
    children: [
      {
        refGroups: [{ childId: 'someMainTitlePVar', type: 'presentation' }],
      },
    ],
  };

export const someNewMetadataGroupTitleInfoAlternativeGroup: BFFMetadataGroup = {
  id: 'someNewMetadataGroupTitleInfoAlternativeGroup',
  nameInData: 'titleInfo',
  type: 'group',
  textId: '',
  defTextId: '',
  children: [
    {
      childId: 'someMainTitleVar',
      repeatMin: '1',
      repeatMax: '1',
    },
  ],
  attributeReferences: [
    {
      refCollectionVarId: 'newLangCollectionVar',
    },
    {
      refCollectionVarId: 'typeCollectionVar',
    },
  ],
};

export const typeCollVariable: BFFMetadataCollectionVariable = {
  id: 'typeCollectionVar',
  nameInData: 'type',
  type: 'collectionVariable',
  textId: 'typeCollectionVarText',
  defTextId: 'typeCollectionVarDefText',
  refCollection: 'typeCollection',
  finalValue: 'alternative',
};

export const newLangCollVariable: BFFMetadataCollectionVariable = {
  id: 'newLangCollectionVar',
  nameInData: 'language',
  type: 'collectionVariable',
  textId: 'engCollectionVarText',
  defTextId: 'engCollectionVarDefText',
  refCollection: 'newLangCollection',
};

export const typeItemCollection: BFFMetadataItemCollection = {
  id: 'typeCollection',
  nameInData: 'type',
  type: 'itemCollection',
  textId: 'typeCollectionText',
  defTextId: 'typeCollectionDefText',
  collectionItemReferences: [{ refCollectionItemId: 'alternativeItem' }],
};

export const newLangItemCollection: BFFMetadataItemCollection = {
  id: 'newLangCollection',
  nameInData: 'type',
  type: 'itemCollection',
  textId: 'typeCollectionText',
  defTextId: 'typeCollectionDefText',
  collectionItemReferences: [
    { refCollectionItemId: 'engItem' },
    { refCollectionItemId: 'sweItem' },
  ],
};

export const typeCollectionItemAlternative: BFFMetadataBase = {
  id: 'alternativeItem',
  nameInData: 'alternative',
  type: 'collectionItem',
  textId: 'alternativeItemText',
  defTextId: 'alternativeItemDefText',
};

export const someMainTitleTitleInfoATextVariable: BFFMetadataTextVariable = {
  id: 'someMainTitleVar',
  nameInData: 'title',
  type: 'textVariable',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  regEx: 'someRegex',
};

export const pSomeMainTitleTitleInfoTextVariable: BFFPresentationTextVar = {
  id: 'someMainTitlePVar',
  presentationOf: 'someMainTitleVar',
  mode: 'input',
  inputType: 'input',
  type: 'pVar',
  emptyTextId: 'someEmptyTextId',
};

export const someRecordTypeNamePart: BFFRecordType = {
  id: 'namePartValidationTypeId',
  metadataId: 'someNewMetadataGroupNamePartGroup',
  textId: 'name123',
  defTextId: 'defName456',
  presentationViewId: '',
  listPresentationViewId: '',
  groupOfRecordType: [],
  recordTypeCategory: [],
};

export const someNewMetadataGroupRepeatingNamePartGroup: BFFMetadataGroup = {
  id: 'someNewMetadataGroupNamePartGroup',
  nameInData: 'name',
  type: 'group',
  textId: '',
  defTextId: '',
  children: [
    { childId: 'recordInfo', repeatMin: '1', repeatMax: '1' },
    {
      childId: 'someNamePartTextVar',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'someOtherNamePartTextVar',
      repeatMin: '1',
      repeatMax: '1',
    },
  ],
};

export const someNamePartTextVariable: BFFMetadataTextVariable = {
  id: 'someNamePartTextVar',
  nameInData: 'namePart',
  type: 'textVariable',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  regEx: 'someRegex',
};

export const someOtherNamePartTextVariable: BFFMetadataTextVariable = {
  id: 'someOtherNamePartTextVar',
  nameInData: 'namePart',
  type: 'textVariable',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  regEx: 'someRegex',
  attributeReferences: [
    {
      refCollectionVarId: 'languageEngCollectionVar',
    },
  ],
};

export const someRecordTypeNamePartWithAttributes: BFFRecordType = {
  id: 'namePartPartWithAttributesRecordTypeId',
  metadataId: 'someNewMetadataGroupRepeatingNamePartWithAttributesGroup',
  textId: 'name123',
  defTextId: 'defName456',
  presentationViewId: '',
  listPresentationViewId: '',
  groupOfRecordType: [],
  recordTypeCategory: [],
};

export const someNewMetadataGroupRepeatingNamePartWithAttributesGroup: BFFMetadataGroup =
  {
    id: 'someNewMetadataGroupRepeatingNamePartWithAttributesGroup',
    nameInData: 'name',
    type: 'group',
    textId: '',
    defTextId: '',
    children: [
      { childId: 'recordInfo', repeatMin: '1', repeatMax: '1' },
      {
        childId: 'someNamePartTextVar',
        repeatMin: '0',
        repeatMax: '1',
      },
      {
        childId: 'someOtherNamePartTextVar',
        repeatMin: '0',
        repeatMax: '1',
      },
    ],
  };

export const someNamePartWithAttributesTextVariable: BFFMetadataTextVariable = {
  id: 'someNamePartWithAttributesTextVariable',
  nameInData: 'namePart',
  type: 'textVariable',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  regEx: 'someRegex',
  attributeReferences: [
    {
      refCollectionVarId: 'languageSweCollectionVar',
    },
  ],
};

export const someOtherNamePartWithAttributesTextVariable: BFFMetadataTextVariable =
  {
    id: 'someOtherNamePartWithAttributesTextVariable',
    nameInData: 'namePart',
    type: 'textVariable',
    textId: 'someTextId',
    defTextId: 'someDefTextId',
    regEx: 'someRegex',
    attributeReferences: [
      {
        refCollectionVarId: 'languageEngCollectionVar',
      },
    ],
  };

export const someValidationTypeForRequiredAndRepeatingId: BFFValidationType = {
  id: 'someValidationTypeForRequiredAndRepeatingId',
  validatesRecordTypeId: 'someValidationTypeForRequiredAndRepeatingId',
  // New
  newMetadataGroupId: 'someNewMetadataRequiredAndRepeatingRootGroup',
  newPresentationGroupId: 'someNewMetadataRequiredAndRepeatingPGroup',
  // Update/Edit
  metadataGroupId: 'someNewMetadataRequiredAndRepeatingRootGroup',
  presentationGroupId: 'someNewMetadataRequiredAndRepeatingPGroup',
  nameTextId: 'name123',
  defTextId: 'defName456',
};

export const someNewMetadataRequiredAndRepeatingRootGroup: BFFMetadataGroup = {
  id: 'someNewMetadataRequiredAndRepeatingRootGroup',
  nameInData: 'output',
  type: 'group',
  textId: '',
  defTextId: '',
  children: [
    {
      childId: 'someNewMetadataRequiredAndRepeatingGroup',
      repeatMin: '1',
      repeatMax: '1',
    },
  ],
};

export const someNewMetadataRequiredAndRepeatingGroup: BFFMetadataGroup = {
  id: 'someNewMetadataRequiredAndRepeatingGroup',
  nameInData: 'language',
  type: 'group',
  textId: '',
  defTextId: '',
  children: [
    {
      childId: 'someLanguageTerm',
      repeatMin: '1',
      repeatMax: 'X',
    },
  ],
};

export const someLanguageTerm: BFFMetadataTextVariable = {
  id: 'someLanguageTerm',
  nameInData: 'languageTerm',
  type: 'textVariable',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  regEx: 'someRegex',
  attributeReferences: [
    {
      refCollectionVarId: 'typeCodeCollectionVar',
    },
    {
      refCollectionVarId: 'authorityLanguageTermCollectionVar',
    },
  ],
};

export const typeCodeCollectionVar: BFFMetadataCollectionVariable = {
  id: 'typeCodeCollectionVar',
  nameInData: 'type',
  type: 'collectionVariable',
  textId: 'typeCollectionVarText',
  defTextId: 'typeCollectionVarDefText',
  refCollection: 'typeCollection',
  finalValue: 'code',
};
export const authorityLanguageTermCollectionVar: BFFMetadataCollectionVariable =
  {
    id: 'authorityLanguageTermCollectionVar',
    nameInData: 'authority',
    type: 'collectionVariable',
    textId: 'authorityCollectionVarText',
    defTextId: 'authorityCollectionVarDefText',
    refCollection: 'authorityCollection',
    finalValue: 'iso639-2b',
  };
