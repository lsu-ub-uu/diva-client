/*
 * Copyright 2023 Uppsala University Library
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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import type {
  DataGroup,
  DataListWrapper,
  RecordWrapper,
} from '@/cora/cora-data/types.server';
import {
  extractAttributeValueByName,
  extractIdFromRecordInfo,
  extractLinkedRecordIdFromNamedRecordLink,
} from '@/cora/cora-data/CoraDataTransforms.server';
import {
  getFirstDataAtomicValueWithNameInData,
  getOptionalAtomicValueByName,
} from '@/cora/cora-data/CoraDataUtilsWrappers.server';
import type {
  BFFGuiElement,
  BFFLinkedRecordPresentation,
  BFFPresentationBase,
  BFFPresentationChildRefGroup,
  BFFPresentationGroup,
  BFFPresentationRecordLink,
  BFFPresentationResourceLink,
  BFFPresentationSurroundingContainer,
} from './bffTypes.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import { getChildReferencesListFromGroup } from './transformMetadata.server';
import {
  containsChildWithNameInData,
  getAllDataAtomicsWithNameInData,
  getAllDataGroupsWithNameInDataAndAttributes,
  getAllRecordLinksWithNameInData,
  getFirstChildWithNameInData,
  getFirstDataGroupWithNameInDataAndAttributes,
  hasChildWithNameInData,
} from '@/cora/cora-data/CoraDataUtils.server';

export const transformCoraPresentations = (
  dataListWrapper: DataListWrapper,
): (BFFPresentationBase | BFFPresentationGroup)[] => {
  if (dataListWrapper.dataList.data.length === 0) {
    return [];
  }

  const coraRecordWrappers = dataListWrapper.dataList.data;

  const presentations = coraRecordWrappers.map(
    transformCoraPresentationToBFFPresentation,
  );
  return presentations.filter((item) => item !== undefined) as (
    | BFFPresentationBase
    | BFFPresentationGroup
  )[];
};

const transformCoraPresentationToBFFPresentation = (
  coraRecordWrapper: RecordWrapper,
):
  | BFFPresentationBase
  | BFFPresentationGroup
  | BFFPresentationSurroundingContainer
  | BFFGuiElement
  | BFFPresentationRecordLink
  | BFFPresentationResourceLink
  | undefined => {
  const dataRecordGroup = coraRecordWrapper.record.data;
  const type = extractAttributeValueByName(dataRecordGroup, 'type');

  switch (type) {
    case 'pGroup': {
      return transformCoraPresentationGroupToBFFPresentationGroup(
        coraRecordWrapper,
      );
    }
    case 'pNumVar': {
      return transformBasicCoraPresentationVariableToBFFPresentation(
        coraRecordWrapper,
      );
    }
    case 'pVar': {
      return transformCoraPresentationPVarToBFFPresentation(coraRecordWrapper);
    }
    case 'pCollVar': {
      return transformBasicCoraPresentationVariableToBFFPresentation(
        coraRecordWrapper,
      );
    }
    case 'pRecordLink': {
      return transformCoraPresentationPLinkToBFFPresentation(coraRecordWrapper);
    }
    case 'container': {
      return transformCoraPresentationContainerToBFFContainer(
        coraRecordWrapper,
      );
    }
    case 'guiElementLink': {
      return transformCoraPresentationGuiElementLinkToBFFGuiElement(
        coraRecordWrapper,
      );
    }
    case 'pResourceLink': {
      return transformCoraPresentationResourceLinkToBFFPresentation(
        coraRecordWrapper,
      );
    }

    default: {
      return undefined;
    }
  }
};

// Handle pNumVar
const transformBasicCoraPresentationVariableToBFFPresentation = (
  coraRecordWrapper: RecordWrapper,
): BFFPresentationBase => {
  const dataRecordGroup = coraRecordWrapper.record.data;
  const id = extractIdFromRecordInfo(dataRecordGroup);
  const type = extractAttributeValueByName(dataRecordGroup, 'type');
  const presentationOf = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'presentationOf',
  );

  let mode;
  if (containsChildWithNameInData(dataRecordGroup, 'mode')) {
    mode = getFirstDataAtomicValueWithNameInData(dataRecordGroup, 'mode');
  }

  let emptyTextId;
  if (containsChildWithNameInData(dataRecordGroup, 'emptyTextId')) {
    emptyTextId = extractLinkedRecordIdFromNamedRecordLink(
      dataRecordGroup,
      'emptyTextId',
    );
  }

  let specifiedLabelTextId;
  if (containsChildWithNameInData(dataRecordGroup, 'specifiedLabelText')) {
    specifiedLabelTextId = extractLinkedRecordIdFromNamedRecordLink(
      dataRecordGroup,
      'specifiedLabelText',
    );
  }

  let inputFormat;
  if (containsChildWithNameInData(dataRecordGroup, 'inputFormat')) {
    inputFormat = getFirstDataAtomicValueWithNameInData(
      dataRecordGroup,
      'inputFormat',
    );
  }

  let showLabel;
  if (containsChildWithNameInData(dataRecordGroup, 'showLabel')) {
    showLabel = getFirstDataAtomicValueWithNameInData(
      dataRecordGroup,
      'showLabel',
    );
  }

  let attributesToShow;
  if (containsChildWithNameInData(dataRecordGroup, 'attributesToShow')) {
    attributesToShow = getFirstDataAtomicValueWithNameInData(
      dataRecordGroup,
      'attributesToShow',
    );
  }

  return removeEmpty({
    id,
    presentationOf,
    mode,
    emptyTextId,
    type,
    specifiedLabelTextId,
    showLabel,
    inputFormat,
    attributesToShow,
  } as BFFPresentationBase);
};

// Handle pRecordLink
const transformCoraPresentationPLinkToBFFPresentation = (
  coraRecordWrapper: RecordWrapper,
): BFFPresentationRecordLink => {
  const dataRecordGroup = coraRecordWrapper.record.data;
  const basic =
    transformBasicCoraPresentationVariableToBFFPresentation(coraRecordWrapper);
  let linkedRecordPresentations;
  let search;

  if (
    containsChildWithNameInData(dataRecordGroup, 'linkedRecordPresentations')
  ) {
    const linkedPresentationsGroup =
      getFirstDataGroupWithNameInDataAndAttributes(
        dataRecordGroup,
        'linkedRecordPresentations',
      );

    linkedRecordPresentations = linkedPresentationsGroup.children.map(
      (linkedPresentation) => {
        const group = linkedPresentation as DataGroup;
        const presentedRecordType = extractLinkedRecordIdFromNamedRecordLink(
          group,
          'presentedRecordType',
        );
        const presentationId = extractLinkedRecordIdFromNamedRecordLink(
          group,
          'presentation',
        );
        return {
          presentedRecordType,
          presentationId,
        } as BFFLinkedRecordPresentation;
      },
    );
  }
  if (containsChildWithNameInData(dataRecordGroup, 'search')) {
    search = extractLinkedRecordIdFromNamedRecordLink(
      dataRecordGroup,
      'search',
    );
  }

  return removeEmpty({
    ...basic,
    linkedRecordPresentations,
    search,
    presentAs: containsChildWithNameInData(dataRecordGroup, 'presentAs')
      ? getOptionalAtomicValueByName(dataRecordGroup, 'presentAs')
      : undefined,
  } as BFFPresentationRecordLink);
};

// Handle pVar
const transformCoraPresentationPVarToBFFPresentation = (
  coraRecordWrapper: RecordWrapper,
): BFFPresentationBase => {
  const dataRecordGroup = coraRecordWrapper.record.data;
  const basic =
    transformBasicCoraPresentationVariableToBFFPresentation(coraRecordWrapper);
  const inputType = getFirstDataAtomicValueWithNameInData(
    dataRecordGroup,
    'inputType',
  );

  return removeEmpty({ ...basic, inputType } as BFFPresentationBase);
};

const transformCoraPresentationGroupToBFFPresentationGroup = (
  coraRecordWrapper: RecordWrapper,
): BFFPresentationGroup => {
  const dataRecordGroup = coraRecordWrapper.record.data;
  const id = extractIdFromRecordInfo(dataRecordGroup);
  const presentationOf = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'presentationOf',
  );
  const mode = getFirstDataAtomicValueWithNameInData(dataRecordGroup, 'mode');
  const type = extractAttributeValueByName(dataRecordGroup, 'type');
  const childReferencesList = getChildReferencesListFromGroup(dataRecordGroup);
  const children = childReferencesList.map((childReference) => {
    return transformChildReference(childReference);
  });

  const presentationStyle = getOptionalAtomicValueByName(
    dataRecordGroup,
    'presentationStyle',
  );

  const specifiedHeadlineTextId = containsChildWithNameInData(
    dataRecordGroup,
    'specifiedHeadlineText',
  )
    ? extractLinkedRecordIdFromNamedRecordLink(
        dataRecordGroup,
        'specifiedHeadlineText',
      )
    : undefined;

  const specifiedHeadlineLevel = getOptionalAtomicValueByName(
    dataRecordGroup,
    'specifiedHeadlineLevel',
  );

  const showHeadline = getOptionalAtomicValueByName(
    dataRecordGroup,
    'showHeadline',
  );

  const attributesToShow = getOptionalAtomicValueByName(
    dataRecordGroup,
    'attributesToShow',
  );

  const presentAs = getOptionalAtomicValueByName(dataRecordGroup, 'presentAs');

  return removeEmpty({
    id,
    presentationOf,
    presentationStyle,
    specifiedHeadlineTextId,
    showHeadline,
    specifiedHeadlineLevel,
    attributesToShow,
    mode,
    children,
    type,
    presentAs,
  }) as BFFPresentationGroup;
};

const transformRefGroup = (
  refGroup: DataGroup,
): BFFPresentationChildRefGroup => {
  const ref = getFirstChildWithNameInData(refGroup, 'ref');
  const type = extractAttributeValueByName(
    ref as DataGroup,
    'type',
  ) as BFFPresentationChildRefGroup['type'];

  const childId = extractLinkedRecordIdFromNamedRecordLink(refGroup, 'ref');

  return { childId, type };
};

// Group Child references
const transformChildReference = (childReference: DataGroup) => {
  const refGroups = getAllDataGroupsWithNameInDataAndAttributes(
    childReference,
    'refGroup',
  ).map(transformRefGroup);

  const minNumberOfRepeatingToShow =
    getOptionalAtomicValueByName(
      childReference,
      'minNumberOfRepeatingToShow',
    ) ?? '1';

  const textStyle = getOptionalAtomicValueByName(childReference, 'textStyle');
  const presentationSize = getOptionalAtomicValueByName(
    childReference,
    'presentationSize',
  );

  const childStyleAtomics = getAllDataAtomicsWithNameInData(
    childReference,
    'childStyle',
  );

  const title = hasChildWithNameInData(childReference, 'title')
    ? extractLinkedRecordIdFromNamedRecordLink(childReference, 'title')
    : undefined;
  const titleHeadlineLevel = hasChildWithNameInData(
    childReference,
    'titleHeadlineLevel',
  )
    ? getFirstDataAtomicValueWithNameInData(
        childReference,
        'titleHeadlineLevel',
      )
    : undefined;

  const childStyle = childStyleAtomics.map(
    (childStyleAtomic) => childStyleAtomic.value,
  );

  return removeEmpty({
    refGroups,
    minNumberOfRepeatingToShow,
    textStyle,
    presentationSize,
    childStyle,
    title,
    titleHeadlineLevel,
  });
};

const transformCoraPresentationContainerToBFFContainer = (
  coraRecordWrapper: RecordWrapper,
): BFFPresentationSurroundingContainer => {
  const dataRecordGroup = coraRecordWrapper.record.data;
  const id = extractIdFromRecordInfo(dataRecordGroup);
  const type = extractAttributeValueByName(dataRecordGroup, 'type');

  const repeat = extractAttributeValueByName(dataRecordGroup, 'repeat');

  let presentationsOf;
  let presentationOf;
  let mode = 'input'; // default value

  if (containsChildWithNameInData(dataRecordGroup, 'presentationsOf')) {
    // SContainer
    const presentationRecordLinks =
      getPresentationOfFromRecordLinks(dataRecordGroup);
    presentationsOf = presentationRecordLinks.map(
      (presentationRecordLink) => presentationRecordLink.id,
    );
  }

  if (containsChildWithNameInData(dataRecordGroup, 'presentationOf')) {
    // RContainer
    presentationOf = extractLinkedRecordIdFromNamedRecordLink(
      dataRecordGroup,
      'presentationOf',
    );
  }

  if (containsChildWithNameInData(dataRecordGroup, 'mode')) {
    mode = getFirstDataAtomicValueWithNameInData(dataRecordGroup, 'mode');
  }

  let presentationStyle;
  if (containsChildWithNameInData(dataRecordGroup, 'presentationStyle')) {
    presentationStyle = getFirstDataAtomicValueWithNameInData(
      dataRecordGroup,
      'presentationStyle',
    );
  }

  const childReferencesList = getChildReferencesListFromGroup(dataRecordGroup);
  const children = childReferencesList.map((childReference) =>
    transformChildReference(childReference),
  );

  return removeEmpty({
    id,
    presentationsOf,
    presentationOf,
    mode,
    children,
    type,
    repeat,
    presentationStyle,
  }) as BFFPresentationSurroundingContainer;
};
const transformCoraPresentationGuiElementLinkToBFFGuiElement = (
  coraRecordWrapper: RecordWrapper,
): BFFGuiElement => {
  const dataRecordGroup = coraRecordWrapper.record.data;
  const id = extractIdFromRecordInfo(dataRecordGroup);
  const type = extractAttributeValueByName(dataRecordGroup, 'type');
  const url = getFirstDataAtomicValueWithNameInData(dataRecordGroup, 'url');
  const presentAs = getFirstDataAtomicValueWithNameInData(
    dataRecordGroup,
    'presentAs',
  ) as BFFGuiElement['presentAs'];
  const elementText = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'elementText',
  );

  return { id, type, url, presentAs, elementText };
};

const transformCoraPresentationResourceLinkToBFFPresentation = (
  coraRecordWrapper: RecordWrapper,
) => {
  const basicPresentation =
    transformBasicCoraPresentationVariableToBFFPresentation(coraRecordWrapper);

  const dataRecordGroup = coraRecordWrapper.record.data;
  const outputFormat = getOptionalAtomicValueByName(
    dataRecordGroup,
    'outputFormat',
  );

  return { ...basicPresentation, outputFormat };
};

const getPresentationOfFromRecordLinks = (dataRecordGroup: DataGroup) => {
  const presentationsOfArray = getFirstDataGroupWithNameInDataAndAttributes(
    dataRecordGroup,
    'presentationsOf',
  );

  return getAllRecordLinksWithNameInData(
    presentationsOfArray,
    'presentationOf',
  );
};
