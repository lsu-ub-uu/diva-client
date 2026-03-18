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
  CoraData,
  DataAtomic,
  DataGroup,
  RecordLink,
  ResourceLink,
} from '@/cora/cora-data/types.server';
import type { BFFDataRecordData, BFFDataResourceLink } from '@/types/record';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import { isEmpty } from 'lodash-es';

interface TransformEntryArgs {
  key: string;
  value: any;
  path: string;
  repeatId?: string;
}

export const transformToRaw = (data: BFFDataRecordData): DataGroup => {
  return transformToRawRecursively(data)[0] as DataGroup;
};

const transformToRawRecursively = (payload: any, path?: string): CoraData[] => {
  const transformedEntries = Object.entries(payload)
    .filter(([key]) => !isAttribute(key))
    .map(([key, value]) =>
      transformEntry({
        key,
        value,
        path: path ? `${path}.${key}` : key,
      }),
    );

  return transformedEntries
    .flatMap((entry) => entry)
    .filter((entry) => entry !== undefined);
};

export const transformEntry = ({
  key,
  value,
  path,
}: TransformEntryArgs): CoraData | undefined | (CoraData | undefined)[] => {
  if (!value || typeof value !== 'object') {
    return undefined;
  }

  const attributes = findChildrenAttributes(value);

  if (isRepeating(value) && value !== undefined) {
    return transformRepeating(value, key, path);
  }

  if (isResourceLink(value) && value !== undefined) {
    return transformResourceLink(key, attributes, value as BFFDataResourceLink);
  }

  if (isVariable(value)) {
    return transformLeaf(key, attributes, value);
  }

  return transformGroup(value, path, key, attributes);
};

export const findChildrenAttributes = (obj: any) => {
  if (!obj) {
    return undefined;
  }
  const attributesArray: Record<string, string>[] = [];
  Object.keys(obj).forEach((key) => {
    if (Object.hasOwn(obj, key) && key.startsWith('_')) {
      const value = obj[key];
      attributesArray.push({ [key.substring(1)]: value });
    }
  });
  if (!attributesArray.length) {
    return undefined;
  }
  return Object.assign({}, ...attributesArray);
};

const transformRepeating = (values: any[], key: string, path: string) => {
  const entries = values.map((item) =>
    transformEntry({
      key,
      value: item,
      path,
    }),
  );

  return entries.flatMap((entry) => entry);
};

const isResourceLink = (value: any) => {
  return 'mimeType' in value && 'id' in value;
};

const transformResourceLink = (
  name: string,
  attributes: undefined | Record<string, string>,
  value: BFFDataResourceLink,
): ResourceLink => {
  return removeEmpty({
    name: removeAttributeFromName(name, attributes),
    children: [
      { name: 'linkedRecordType', value: 'binary' },
      { name: 'linkedRecordId', value: value.id },
      {
        name: 'mimeType',
        value: value.mimeType,
      },
    ],
    attributes,
  });
};

const transformLeaf = (
  key: string,
  attributes: undefined | Record<string, string>,
  value: any,
) => {
  if ('linkedRecordType' in value) {
    return createRecordLink(
      removeAttributeFromName(key, attributes),
      value.linkedRecordType,
      value.value,
      attributes,
    );
  }
  return createLeaf(
    removeAttributeFromName(key, attributes),
    value.value,
    attributes,
  );
};

const transformGroup = (
  value: any,
  path: string,
  key: string,
  attributes: Record<string, string> | undefined,
) => {
  const childData = transformToRawRecursively(value, path);
  return createGroup(key, attributes, childData);
};

export const isAttribute = (fieldKey: string) => {
  return fieldKey.startsWith('_');
};

export const isRepeating = (value: any) => {
  return Array.isArray(value);
};

export const isVariable = (item: DataGroup | DataAtomic) => {
  return 'value' in item;
};

export const createLeaf = (
  name: string,
  value: string,
  attributes: Attributes | undefined = undefined,
): DataAtomic | RecordLink | undefined => {
  if (isEmpty(value)) {
    return undefined;
  }

  const atomic: DataAtomic = {
    name,
    value,
  };

  if (attributes) {
    atomic.attributes = attributes;
  }

  return atomic;
};

const createGroup = (
  key: string,
  attributes: undefined | Record<string, string>,
  childData: CoraData[],
) => {
  const group: DataGroup = {
    name: removeAttributeFromName(key, attributes),
    children: childData,
  };

  if (attributes) {
    group.attributes = attributes;
  }

  return group;
};

export const createRecordLink = (
  name: string,
  linkedRecordType: string,
  linkedRecordId: string,
  attributes: Attributes | undefined = undefined,
): RecordLink => {
  const recordLink: RecordLink = {
    name,
    children: [
      generateAtomicValue('linkedRecordType', linkedRecordType),
      generateAtomicValue('linkedRecordId', linkedRecordId),
    ],
  };

  if (attributes) {
    recordLink.attributes = attributes;
  }

  return recordLink;
};

export const generateAtomicValue = (name: string, value: any): DataAtomic => ({
  name,
  value,
});

export const removeAttributeFromName = (
  name: string,
  value: { [key: string]: string } | undefined,
) => {
  if (value === undefined) {
    return name;
  }
  return name.split('_')[0];
};
