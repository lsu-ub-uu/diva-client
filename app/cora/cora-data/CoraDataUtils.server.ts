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

import { isEqual as _isEqual } from 'lodash-es';
import type {
  Attributes,
  DataAtomic,
  DataElement,
  DataGroup,
  RecordLink,
} from '@/cora/cora-data/types.server';
import type { BFFRecordLink } from '../transform/bffTypes.server';

export function getAllRecordLinksWithNameInData(
  dataGroup: DataGroup,
  nameInData: string,
): BFFRecordLink[] {
  const recordLinks = <RecordLink[]>dataGroup.children.filter((child) => {
    if (Object.hasOwn(child, 'children')) {
      const dGChild = child as DataGroup;
      return (
        dGChild.children.filter((grandChild: DataElement) => {
          return (
            grandChild.name === 'linkedRecordType' ||
            grandChild.name === 'linkedRecordId'
          );
        }).length > 0
      );
    }
    return false;
  });

  const matchingRecordLinks = recordLinks.filter((recordLink) => {
    return recordLink.name === nameInData;
  });

  return matchingRecordLinks.map((recordLink) => {
    return {
      name: recordLink.name,
      recordType: getFirstDataAtomicWithNameInData(
        recordLink,
        'linkedRecordType',
      )?.value,
      id: getFirstDataAtomicWithNameInData(recordLink, 'linkedRecordId')?.value,
      readLink: recordLink.actionLinks?.read,
    };
  });
}

export function getFirstRecordLinkWithNameInData(
  dataGroup: DataGroup,
  nameInData: string,
) {
  throw new Error(`RecordLink with name [${nameInData}] does not exist`);
}

export function getFirstChildWithNameInData(
  dataGroup: DataGroup,
  nameInData: string,
): DataAtomic | DataGroup {
  if (dataGroup.children.length === 0) {
    throw new Error(
      `DataGroup with name [${dataGroup.name}] does not have any children`,
    );
  }

  const matchingChild = dataGroup.children.find((child) => {
    return child.name === nameInData;
  });

  if (matchingChild === undefined) {
    throw new Error(`Child with name [${nameInData}] could not be found`);
  }

  return matchingChild;
}

export function getAllChildrenWithNameInData(
  dataGroup: DataGroup,
  nameInData: string,
): (DataAtomic | DataGroup)[] {
  const childrenToReturn = dataGroup.children.filter((child) => {
    return child.name === nameInData;
  });

  return childrenToReturn;
}
export const containsChildWithNameInData = (
  dataGroup: DataGroup,
  nameInData: string,
): boolean => {
  return dataGroup.children.some((child) => {
    return child.name === nameInData;
  });
};

export function getFirstDataAtomicWithNameInData(
  dataGroup: DataGroup,
  nameInData: string,
): DataAtomic {
  if (dataGroup.children.length === 0) {
    throw new Error(
      `DataGroup with name [${dataGroup.name}] does not have any children`,
    );
  }

  const dataAtomics = <DataAtomic[]>dataGroup.children.filter((child) => {
    return Object.hasOwn(child, 'value');
  });

  const firstMatchingDataAtomic = dataAtomics.find((dataAtomic) => {
    return dataAtomic.name === nameInData;
  });

  if (firstMatchingDataAtomic === undefined) {
    throw new Error(
      `DataGroup with name [${dataGroup.name}] does not have atomic child with name [${nameInData}]`,
    );
  }

  return firstMatchingDataAtomic;
}

export function getAllDataAtomicsWithNameInData(
  dataGroup: DataGroup,
  nameInData: string,
): DataAtomic[] {
  const dataAtomics = <DataAtomic[]>dataGroup.children.filter((child) => {
    return Object.hasOwn(child, 'value');
  });

  const matchingDataAtomics = dataAtomics.filter((dataAtomic) => {
    return dataAtomic.name === nameInData;
  });

  return matchingDataAtomics;
}

export function getFirstDataGroupWithNameInData(
  dataGroup: DataGroup,
  nameInData: string,
): DataGroup {
  const dataGroups = <DataGroup[]>dataGroup.children.filter((child) => {
    return Object.hasOwn(child, 'children');
  });

  const firstMatchingDataGroup = dataGroups.find((child) => {
    return child.name === nameInData;
  });

  if (firstMatchingDataGroup === undefined) {
    throw new Error(`Child with name [${nameInData}] does not exist`);
  }

  return firstMatchingDataGroup;
}

export function getFirstDataGroupWithNameInDataAndAttributes(
  dataGroup: DataGroup,
  nameInData: string,
  attributesToMatch?: Attributes,
): DataGroup {
  const matchingDataGroups = getAllDataGroupsWithNameInDataAndAttributes(
    dataGroup,
    nameInData,
    attributesToMatch,
  );

  if (matchingDataGroups.length === 0) {
    throw new Error(`DataGroup with name [${nameInData}] does not exist`);
  }

  return matchingDataGroups[0];
}

export const getAllDataGroupsWithNameInDataAndAttributes = (
  dataGroup: DataGroup,
  nameInData: string,
  attributesToMatch?: Attributes,
): DataGroup[] => {
  const dataGroups = <DataGroup[]>dataGroup.children.filter((child) => {
    return Object.hasOwn(child, 'children');
  });

  const matchingDataGroups = dataGroups.filter((child) => {
    const matchingNameInData = child.name === nameInData;
    let matchingAttributes = false;
    if (attributesToMatch === undefined && child.attributes === undefined) {
      return matchingNameInData;
    }
    if (attributesToMatch !== undefined && child.attributes !== undefined) {
      matchingAttributes = _isEqual(attributesToMatch, child.attributes);
    }

    return matchingAttributes && matchingNameInData;
  });

  return matchingDataGroups;
};

export const getAllDataAtomicValueFromDataGroup = (
  dataRecordGroup: DataGroup,
) => {
  return reduceAtomics(getAtomicChildren(dataRecordGroup));
};
const reduceAtomics = (atomics: DataAtomic[]) => {
  return atomics.reduce<Record<string, string>>((prev, current) => {
    prev[current.name] = current.value;
    return prev;
  }, {});
};
const getAtomicChildren = (dataRecordGroup: DataGroup) => {
  return dataRecordGroup.children.filter((record) =>
    Object.hasOwn(record, 'value'),
  ) as DataAtomic[];
};

export const hasChildWithNameInData = (
  dataGroup: DataGroup,
  nameInData: string,
) => {
  return dataGroup.children.some((child) => child.name === nameInData);
};

export default {
  // getFirstRecordLinkWithNameInData,
  getFirstChildWithNameInData,
  getAllChildrenWithNameInData,
  getFirstDataAtomicWithNameInData,
  getAllDataAtomicsWithNameInData,
  getFirstDataGroupWithNameInData,
  getFirstDataGroupWithNameInDataAndAttributes,
  getAllDataGroupsWithNameInDataAndAttributes,
};
