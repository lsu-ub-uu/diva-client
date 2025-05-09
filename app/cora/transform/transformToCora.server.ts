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
  RecordLink,
  ResourceLink,
} from '@/cora/cora-data/types.server';
import type { FormMetaData } from '@/data/formDefinition/formDefinition.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import { isEmpty } from 'lodash-es';

type Data = DataGroup | DataAtomic | RecordLink | ResourceLink;

interface TransformEntryArgs {
  lookup: Record<string, FormMetaData>;
  key: string;
  value: any;
  path: string;
  repeatId?: string;
}

interface ValuableDataWrapper<T> {
  data: T;
  hasValuableData: boolean;
}

export const transformToCoraData = (
  lookup: Record<string, FormMetaData>,
  payload: any,
): Data[] => {
  return transformToCoraDataRecursively(lookup, payload).data;
};

const transformToCoraDataRecursively = (
  lookup: Record<string, FormMetaData>,
  payload: any,
  path?: string,
  repeatId?: string,
): ValuableDataWrapper<Data[]> => {
  const transformedEntries = Object.entries(payload)
    .filter(([key]) => !isAttribute(key))
    .map(([key, value]) =>
      transformEntry({
        lookup,
        key,
        value,
        path: path ? `${path}.${key}` : key,
        repeatId,
      }),
    );

  return {
    data: transformedEntries
      .flatMap((entry) => entry.data)
      .filter((entry) => entry !== undefined),
    hasValuableData: transformedEntries.some((entry) => entry.hasValuableData),
  };
};

export const transformEntry = ({
  lookup,
  key,
  value,
  path,
  repeatId,
}: TransformEntryArgs): ValuableDataWrapper<
  Data | undefined | (Data | undefined)[]
> => {
  const fieldMetadata = getFieldMetadata(lookup, path);
  const attributes = findChildrenAttributes(value);

  if (isRepeating(value)) {
    return transformRepeating(fieldMetadata, value, lookup, key, path);
  }

  if (isResourceLink(fieldMetadata)) {
    return transformResourceLink(key, attributes, value, repeatId);
  }

  if (isVariable(value)) {
    return transformLeaf(fieldMetadata, key, attributes, value, repeatId);
  }

  return transformGroup(
    fieldMetadata,
    lookup,
    value,
    path,
    key,
    attributes,
    repeatId,
  );
};

const getFieldMetadata = (
  lookup: Record<string, FormMetaData>,
  currentPath: string,
): FormMetaData => {
  const fieldMetadata = lookup[currentPath];
  if (fieldMetadata === undefined) {
    throw new Error(`Failed to find path ${currentPath} in lookup`);
  }
  return fieldMetadata;
};

export const findChildrenAttributes = (obj: any) => {
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

const transformRepeating = (
  fieldMetadata: FormMetaData,
  values: any[],
  lookup: Record<string, FormMetaData>,
  key: string,
  path: string,
) => {
  const shouldDataHaveRepeatId = fieldMetadata.repeat.repeatMax > 1;
  const entries = values.map((item, index) =>
    transformEntry({
      lookup,
      key,
      value: item,
      path,
      repeatId: shouldDataHaveRepeatId ? index.toString() : undefined,
    }),
  );

  return {
    data: entries.flatMap((entry) => entry.data),
    hasValuableData: entries.some((entry) => entry.hasValuableData),
  };
};

const isResourceLink = (fieldMetadata: FormMetaData) => {
  return fieldMetadata.type === 'resourceLink';
};

const transformResourceLink = (
  name: string,
  attributes: undefined | Record<string, string>,
  value: any,
  repeatId: string | undefined,
) => {
  return {
    data: removeEmpty({
      name: removeAttributeFromName(name, attributes),
      mimeType: value.mimeType,
      attributes,
      repeatId,
    }),
    hasValuableData: value.mimeType !== undefined,
  };
};

const transformLeaf = (
  fieldMetadata: FormMetaData,
  key: string,
  attributes: undefined | Record<string, string>,
  value: any,
  repeatId: string | undefined,
) => {
  return {
    data: createLeaf(
      fieldMetadata,
      removeAttributeFromName(key, attributes),
      value.value,
      repeatId,
      attributes,
    ),
    hasValuableData: isValuable(value.value, fieldMetadata),
  };
};

const transformGroup = (
  fieldMetadata: FormMetaData,
  lookup: Record<string, FormMetaData>,
  value: any,
  path: string,
  key: string,
  attributes: Record<string, string> | undefined,
  repeatId: string | undefined,
) => {
  const childData = transformToCoraDataRecursively(lookup, value, path);
  return {
    data: createGroup(fieldMetadata, key, attributes, repeatId, childData),
    hasValuableData: childData.hasValuableData,
  };
};

export const isAttribute = (fieldKey: string) => {
  return fieldKey.startsWith('_');
};

const isValuable = (value: string, fieldMetadata: FormMetaData) => {
  return !isEmpty(value) && !isFinalValue(fieldMetadata);
};

const isFinalValue = (currentMetadataLookup: FormMetaData) => {
  return currentMetadataLookup.finalValue !== undefined;
};
const isOptional = (fieldMetadata: FormMetaData) => {
  return fieldMetadata.repeat.repeatMin === 0;
};

export const isRepeating = (value: any) => {
  return Array.isArray(value);
};

export const isVariable = (item: DataGroup | DataAtomic) => {
  return 'value' in item;
};

export const createLeaf = (
  metaData: FormMetaData,
  name: string,
  value: string,
  repeatId: string | undefined = undefined,
  attributes: Attributes | undefined = undefined,
): DataAtomic | RecordLink | undefined => {
  if (isEmpty(value)) {
    return undefined;
  }

  if (
    ['numberVariable', 'textVariable', 'collectionVariable'].includes(
      metaData.type,
    )
  ) {
    const atomic: DataAtomic = {
      name,
      value,
    };

    if (attributes) {
      atomic.attributes = attributes;
    }

    if (repeatId) {
      atomic.repeatId = repeatId;
    }

    return atomic;
  }

  return createRecordLink(
    name,
    metaData.linkedRecordType ?? '',
    value,
    attributes,
    repeatId,
  );
};

const createGroup = (
  metaData: FormMetaData,
  key: string,
  attributes: undefined | Record<string, string>,
  repeatId: string | undefined,
  childData: ValuableDataWrapper<Data[]>,
) => {
  if (isOptional(metaData) && !childData.hasValuableData) {
    return undefined;
  }

  const group: DataGroup = {
    name: removeAttributeFromName(key, attributes),
    children: childData.data,
  };

  if (attributes) {
    group.attributes = attributes;
  }

  if (repeatId) {
    group.repeatId = repeatId;
  }
  return group;
};

export const createRecordLink = (
  name: string,
  linkedRecordType: string,
  linkedRecordId: string,
  attributes: Attributes | undefined = undefined,
  repeatId: string | undefined = undefined,
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

  if (repeatId) {
    recordLink.repeatId = repeatId;
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
