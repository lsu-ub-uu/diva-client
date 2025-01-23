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
  Attributes,
  DataAtomic,
  DataGroup,
  DataListWrapper,
  RecordLink,
  RecordWrapper,
} from '@/cora/cora-data/CoraData.server';
import {
  extractIdFromRecordInfo,
  extractLinkedRecordIdFromNamedRecordLink,
} from '@/cora/cora-data/CoraDataTransforms.server';
import {
  containsChildWithNameInData,
  getAllChildrenWithNameInData,
  getFirstDataGroupWithNameInData,
} from '@/cora/cora-data/CoraDataUtils.server';
import { getFirstDataAtomicValueWithNameInData } from '@/cora/cora-data/CoraDataUtilsWrappers.server';
import type { FormMetaData } from '@/data/formDefinition/formDefinition.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import { createFormMetaDataPathLookup } from '@/utils/structs/metadataPathLookup';
import { createFormMetaData } from '@/data/formDefinition/formMetadata.server';
import type {
  BFFDataRecord,
  BFFUpdate,
  BFFUserRight,
  Metadata,
} from '@/types/record';
import { groupBy } from 'lodash-es';
import { createFieldNameWithAttributes } from '@/utils/createFieldNameWithAttributes';

/**
 * Transforms records
 * @param dependencies
 * @param dataListWrapper
 */
export const transformRecords = (
  dependencies: Dependencies,
  dataListWrapper: DataListWrapper,
): any[] => {
  if (dataListWrapper.dataList.data.length === 0) {
    return [];
  }

  const coraRecords = dataListWrapper.dataList.data;
  return coraRecords.map((recordWrapper) =>
    transformRecord(dependencies, recordWrapper),
  );
};

/**
 * Transform Record
 * @param dependencies
 * @param recordWrapper
 */
export const transformRecord = (
  dependencies: Dependencies,
  recordWrapper: RecordWrapper,
): BFFDataRecord => {
  const coraRecord = recordWrapper.record;
  const dataRecordGroup = coraRecord.data;
  let createdAt;
  let createdBy;

  const id = extractIdFromRecordInfo(dataRecordGroup);
  const recordInfo = extractRecordInfoDataGroup(dataRecordGroup);

  const recordType = extractLinkedRecordIdFromNamedRecordLink(
    recordInfo,
    'type',
  );
  const validationType = extractLinkedRecordIdFromNamedRecordLink(
    recordInfo,
    'validationType',
  );

  if (containsChildWithNameInData(recordInfo, 'tsCreated')) {
    createdAt = getFirstDataAtomicValueWithNameInData(recordInfo, 'tsCreated');
  }

  if (containsChildWithNameInData(recordInfo, 'createdBy')) {
    createdBy = extractLinkedRecordIdFromNamedRecordLink(
      recordInfo,
      'createdBy',
    );
  }
  const updated = extractRecordUpdates(recordInfo);

  let userRights: BFFUserRight[] = [];
  if (coraRecord.actionLinks !== undefined) {
    userRights = Object.keys(coraRecord.actionLinks) as BFFUserRight[];
  }

  const formMetadata = createFormMetaData(
    dependencies,
    validationType,
    'update',
  );

  const formPathLookup = createFormMetaDataPathLookup(formMetadata);

  const newData = {
    [dataRecordGroup.name]: transformDataGroup(dataRecordGroup, formMetadata),
  };

  const data = traverseDataGroup(
    dataRecordGroup,
    formPathLookup,
    dataRecordGroup.name,
  );

  console.log({
    newData,
    data,
  });

  return removeEmpty({
    id,
    recordType,
    validationType,
    createdAt,
    createdBy,
    updated,
    userRights,
    data,
  });
};

const transformDataGroup = (
  dataRecordGroup: DataGroup,
  formMetadata: FormMetaData,
): Metadata => {
  const init = {} as Metadata;
  return dataRecordGroup.children.reduce<Metadata>((group, dataChild) => {
    const matchingMetadata = findMatchingMetadata(dataChild, formMetadata);

    if (!matchingMetadata) {
      console.warn(`Failed to find matching metadata for ${dataChild.name}`);
      return group;
    }
    const metadataAttributes = Object.entries(
      matchingMetadata.attributes ?? {},
    ).map(([name, value]) => ({ name, value }));

    const name = createFieldNameWithAttributes(
      dataChild.name,
      metadataAttributes,
    );

    group[name] = transformData(dataChild, matchingMetadata);
    return group;
  }, init);
};

const transformData = (
  data: DataGroup | DataAtomic | RecordLink,
  formMetadata: FormMetaData,
): Metadata => {
  if ('children' in data) {
    return transformDataGroup(data, formMetadata);
  }

  return undefined;
};

const findMatchingMetadata = (
  data: DataGroup | DataAtomic | RecordLink,
  metadata: FormMetaData,
) => {
  console.log('findMatchingMetadata', data, metadata);
  const matchingMetadatas = (metadata.children ?? []).filter(
    (metadata) => metadata.name === data.name,
  );

  if (matchingMetadatas.length === 0) {
    console.log('no match');
    return undefined;
  }

  if (matchingMetadatas.length === 1) {
    console.log('1 match', matchingMetadatas);
    return matchingMetadatas[0];
  }

  if (matchingMetadatas.length > 0) {
    console.log('>>>>>>>1 match', matchingMetadatas);

    return findMetadataMatchingAttributes(data, matchingMetadatas);
  }
};

const findMetadataMatchingAttributes = (
  data: DataGroup | DataAtomic | RecordLink,
  metadataCandidates: FormMetaData[],
) => {
  return metadataCandidates.reduce((bestMatchSoFar, candidate) => {
    if (
      getNumberOfMatchingAttributes(data, candidate) >
      getNumberOfMatchingAttributes(data, bestMatchSoFar)
    ) {
      return candidate;
    }
    return bestMatchSoFar;
  });
};

const getNumberOfMatchingAttributes = (
  data: DataGroup | DataAtomic | RecordLink,
  metadata: FormMetaData,
) => {
  if (metadata === undefined) {
    return 0;
  }

  const dataAttributes = Object.entries(data.attributes ?? {});

  const candidateAttributes = metadata.attributes ?? {};

  return dataAttributes.filter(([name, value]) => {
    return candidateAttributes[name] === value;
  }).length;
};

const extractRecordInfoDataGroup = (coraRecordGroup: DataGroup): DataGroup => {
  return getFirstDataGroupWithNameInData(coraRecordGroup, 'recordInfo');
};

const extractRecordUpdates = (recordInfo: DataGroup): BFFUpdate[] => {
  const updates = getAllChildrenWithNameInData(recordInfo, 'updated');
  return updates.map((update) => {
    const updatedGroup = update as DataGroup;
    const updatedBy = extractLinkedRecordIdFromNamedRecordLink(
      updatedGroup,
      'updatedBy',
    );
    const updateAt = getFirstDataAtomicValueWithNameInData(
      updatedGroup,
      'tsUpdated',
    );
    return { updateAt, updatedBy };
  });
};

export const traverseDataGroup = (
  dataGroup: DataGroup,
  formPathLookup?: Record<string, FormMetaData>,
  path?: string,
) => {
  const validChildren = dataGroup.children;
  const groupedByName = groupBy(validChildren, 'name');
  const groupedEntries = Object.entries(groupedByName);
  path = path === undefined ? dataGroup.name : path;
  const groupAttributes = transformObjectAttributes(dataGroup.attributes);
  const object: unknown[] = [];

  groupedEntries.forEach(([name, groupedChildren]) => {
    const currentPath = path ? `${path}.${name}` : name;
    let repeating = false;
    let isGroup = false;

    const thisLevelChildren = groupedChildren.map((child) => {
      const possibleAttributes = addAttributesToArray(child);

      const correctChild = hasCoraAttributes(
        currentPath,
        possibleAttributes,
        formPathLookup as Record<string, FormMetaData>,
      );

      const metaDataChildren = getMetadataChildrenWithSiblings(formPathLookup);
      const nameInDataArray = getSameNameInDatas(
        groupedChildren,
        addAttributesToNameForRecords(child, correctChild),
      );
      const possiblyNameWithAttribute = hasSameNameInDatas(
        groupedChildren,
        child.name,
        metaDataChildren,
      )
        ? addAttributesToNameForRecords(
            child,
            correctChild,
            nameInDataArray,
            formPathLookup,
            currentPath,
          )
        : name;

      if (
        isRecordLink(child) &&
        !isRepeating(child, currentPath, formPathLookup)
      ) {
        const childGroup = child as DataGroup;
        const recordLinkAttributes = transformObjectAttributes(
          childGroup.attributes,
        );
        const recordId = getFirstDataAtomicValueWithNameInData(
          childGroup,
          'linkedRecordId',
        );
        return {
          [possiblyNameWithAttribute]: Object.assign(
            { value: recordId },
            ...recordLinkAttributes,
          ),
        };
      }

      if (
        isRecordLink(child) &&
        isRepeating(child, currentPath, formPathLookup)
      ) {
        repeating = true;
        const childGroup = child as DataGroup;
        const recordLinkAttributes = transformObjectAttributes(
          childGroup.attributes,
        );
        const recordId = getFirstDataAtomicValueWithNameInData(
          childGroup,
          'linkedRecordId',
        );
        return Object.assign({ value: recordId }, ...recordLinkAttributes);
      }

      if (
        isDataGroup(child) &&
        !isRepeating(child, currentPath, formPathLookup)
      ) {
        repeating = false;
        isGroup = true;
        const childGroup = updateGroupWithPossibleNewNameWithAttribute(
          child as DataGroup,
          possiblyNameWithAttribute,
        );
        return traverseDataGroup(childGroup, formPathLookup, currentPath);
      }

      if (
        isDataGroup(child) &&
        isRepeating(child, currentPath, formPathLookup)
      ) {
        repeating = true;
        isGroup = true;

        const childGroup = updateGroupWithPossibleNewNameWithAttribute(
          child as DataGroup,
          possiblyNameWithAttribute,
        );
        return traverseDataGroup(childGroup, formPathLookup, currentPath);
      }

      if (
        isDataAtomic(child) &&
        !isRepeating(child, currentPath, formPathLookup)
      ) {
        repeating = false;
        isGroup = false;
        const dataAtomic = child as DataAtomic;
        const atomicAttributes = transformObjectAttributes(
          dataAtomic.attributes,
        );
        const { value } = child as DataAtomic;
        return {
          [possiblyNameWithAttribute]: Object.assign(
            { value },
            ...atomicAttributes,
          ),
        };
      }

      if (
        isDataAtomic(child) &&
        isRepeating(child, currentPath, formPathLookup)
      ) {
        repeating = true;
        isGroup = false;
        const dataAtomic = child as DataAtomic;
        const atomicAttributes = transformObjectAttributes(
          dataAtomic.attributes,
        );
        const { value } = child as DataAtomic;
        if (formPathLookup) {
          name = possiblyNameWithAttribute;
        }
        return Object.assign({ value }, ...atomicAttributes);
      }
    });

    const childrenNames = getNamesFromChildren(thisLevelChildren);
    let isChildSingular;
    if (isGroup) {
      childrenNames.forEach((child) => {
        isChildSingular = getChildSingular(path, child, formPathLookup);
        if (isChildSingular || !repeating) {
          const childArray = thisLevelChildren.map((item) => {
            return item;
          });
          object.push(...childArray);
        } else {
          object.push({
            [child]: thisLevelChildren.map((item) => {
              return item[child];
            }),
          });
        }
      });
    } else if (repeating && !isGroup) {
      object.push({ [name]: thisLevelChildren });
    } else {
      object.push(Object.assign({}, ...thisLevelChildren));
    }
  });
  return removeEmpty({
    [dataGroup.name]: Object.assign({}, ...[...object, ...groupAttributes]),
  });
};

function getChildSingular(
  path: string | undefined,
  child: string,
  formPathLookup?: Record<string, FormMetaData>,
) {
  const lookup = formPathLookup ?? {};
  return (
    lookup[`${path}.${child}`]?.repeat.repeatMin === 1 &&
    lookup[`${path}.${child}`]?.repeat.repeatMax === 1
  );
}

/**
 * Transform object attributes with _ prefix to key
 * @param attributes
 */
export const transformObjectAttributes = (
  attributes: Attributes | undefined,
) => {
  if (attributes === undefined) {
    return [];
  }

  return Object.keys(attributes).map((key) => {
    const value = attributes[key];
    return { [`_${key}`]: value };
  });
};

export const getSameNameInDatas = (
  children: (DataGroup | DataAtomic | RecordLink)[],
  newNameInData: string,
) => {
  const nameArray: string[] = [];
  children.forEach((child) => {
    nameArray.push(child.name);
  });
  const arrayWithoutDuplicates = nameArray.filter(
    (item, index) => nameArray.indexOf(item) !== index,
  );
  arrayWithoutDuplicates.push(newNameInData);
  return arrayWithoutDuplicates;
};

export const hasCoraAttributes = (
  currentPath: string,
  possibleAttributes: string[],
  formPathLookup: Record<string, FormMetaData>,
) => {
  const lookup = formPathLookup ?? {};
  if (possibleAttributes?.length === 0) {
    return lookup[currentPath];
  }
  const currentMetadata = possibleAttributes.map((attribute) => {
    const currentLookup = lookup[`${currentPath}_${attribute}`];
    if (currentLookup !== undefined) {
      return lookup[`${currentPath}_${attribute}`];
    }
    return currentLookup;
  });
  return removeEmpty(currentMetadata)[0];
};

export const addAttributesToArray = (
  metaDataGroup: FormMetaData | (DataGroup | DataAtomic | RecordLink),
) => {
  if (metaDataGroup.attributes === undefined) {
    return [];
  }
  const nameArray: any[] = [];
  Object.entries(metaDataGroup.attributes).forEach(([key, value]) => {
    nameArray.push(`${key}_${value}`);
  });
  return nameArray;
};

export const hasSameNameInDatas = (
  children: (DataGroup | DataAtomic | RecordLink)[],
  currentName: string,
  metadataChildren?: any[],
) => {
  const nameInDatas: string[] = [];
  children.forEach((child) => {
    nameInDatas.push(child.name);
  });
  if (metadataChildren) {
    nameInDatas.push(...(metadataChildren as string[]));
  }
  const numberOfOccurrences = nameInDatas.reduce(
    (a, v) => (v === currentName ? a + 1 : a),
    0,
  );
  return numberOfOccurrences > 1;
};

export const addAttributesToNameForRecords = (
  metaDataGroup: FormMetaData | DataGroup | DataAtomic | RecordLink,
  correctChild: any,
  nameInDataArray?: string[],
  formPathLookup?: Record<string, FormMetaData>,
  currentPath?: string,
) => {
  let formComponent;
  const correctArray: any[] = [];
  if (
    nameInDataArray !== undefined &&
    formPathLookup !== undefined &&
    currentPath !== undefined
  ) {
    const searchPart = findSearchPart(nameInDataArray, currentPath);
    const lookup = formPathLookup ?? {};
    formComponent = lookup[searchPart === '' ? currentPath : searchPart];
  }

  if (correctChild !== undefined) {
    if (correctChild.attributes === undefined) {
      return metaDataGroup.name;
    }

    Object.entries(correctChild.attributes).forEach(([key, value]) => {
      correctArray.push(`${key}_${value}`);
    });
    return correctArray.length > 0
      ? `${metaDataGroup.name}_${correctArray.join('_')}`
      : metaDataGroup.name;
  }
  if (formComponent !== undefined) {
    if (isComponentSingle(nameInDataArray)) {
      return metaDataGroup.name;
    }
    if (!hasComponentAttributes(formComponent)) {
      return metaDataGroup.name;
    }

    Object.entries(hasComponentAttributes(formComponent)).forEach(
      ([key, value]) => {
        correctArray.push(`${key}_${value}`);
      },
    );
    return correctArray.length > 0
      ? `${metaDataGroup.name}_${correctArray.join('_')}`
      : metaDataGroup.name;
  }

  if (metaDataGroup.attributes === undefined) {
    return metaDataGroup.name;
  }

  Object.entries(metaDataGroup.attributes).forEach(([key, value]) => {
    correctArray.push(`${key}_${value}`);
  });
  return correctArray.length > 0
    ? `${metaDataGroup.name}_${correctArray.join('_')}`
    : metaDataGroup.name;
};

export const findSearchPart = (
  nameInDataArray?: string[],
  currentPath?: string,
) => {
  const path = (currentPath as string).split('.');

  const searchPart = path[path.length - 1];
  const findWithSearchPart = (nameInDataArray as string[]).find(
    (element) => element === searchPart,
  );
  return findWithSearchPart ? (currentPath as string) : '';
};

const isComponentSingle = (nameInDataArray: string[] | undefined) => {
  return nameInDataArray !== undefined && nameInDataArray?.length === 1;
};

export const hasComponentAttributes = (component: any) => {
  return component.attributes !== undefined;
};

/**
 * Detects a RecordLink
 * @param item
 */
export const isRecordLink = (item: DataGroup | DataAtomic | RecordLink) => {
  if (!isDataGroup(item)) {
    return false;
  }
  const group = item as DataGroup;
  const recordLinkChildren = group.children.filter(
    (child: DataGroup | DataAtomic | RecordLink) => {
      return (
        child.name === 'linkedRecordType' || child.name === 'linkedRecordId'
      );
    },
  );
  return recordLinkChildren.length === 2;
};

/**
 * Detects a DataGroup
 * @param item
 */
export const isDataGroup = (item: DataGroup | DataAtomic | RecordLink) => {
  return Object.hasOwn(item, 'name') && Object.hasOwn(item, 'children');
};

/**
 * Detects a DataAtomic
 * @param item
 */
export const isDataAtomic = (item: DataGroup | DataAtomic | RecordLink) => {
  return Object.hasOwn(item, 'name') && Object.hasOwn(item, 'value');
};

export const isRepeating = (
  item: DataGroup | DataAtomic | RecordLink,
  currentPath: string,
  formPathLookup?: Record<string, FormMetaData>,
) => {
  const lookup = formPathLookup ?? {};
  const formComponent = lookup[currentPath];
  let isFormDataRepeating = false;
  if (formComponent) {
    isFormDataRepeating = formComponent.repeat.repeatMin === 0;
  }
  return Object.hasOwn(item, 'repeatId') || isFormDataRepeating;
};

export const updateGroupWithPossibleNewNameWithAttribute = (
  childGroup: DataGroup,
  possiblyNameWithAttribute: string,
) => {
  return {
    ...childGroup,
    name: possiblyNameWithAttribute,
  } as DataGroup;
};

export const getNamesFromChildren = (children: any[]) => {
  const nameArray: string[] = [];
  children.forEach((child) => {
    Object.keys(child).forEach((obj) => {
      nameArray.push(obj);
    });
  });
  return nameArray;
};

export const getMetadataChildrenWithSiblings = (
  formPathLookup?: Record<string, FormMetaData>,
): any[] => {
  const nameArray: string[] = [];
  const lookup = formPathLookup ?? {};
  let arrayWithoutDuplicates;
  Object.keys(lookup).forEach((obj) => {
    const newName = obj.split('.')[obj.split('.').length - 1].split('_')[0];
    nameArray.push(newName);
    arrayWithoutDuplicates = nameArray.filter(
      (item, index) => nameArray.indexOf(item) !== index,
    );
  });
  return arrayWithoutDuplicates ?? [];
};
